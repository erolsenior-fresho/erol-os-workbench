import json
import subprocess
import tempfile
import threading
import unittest
from pathlib import Path
from urllib import error, request

from bridge import BridgeError, BridgeServer, execute_action, load_config


CONFIG = {
    "allowed_apps": {"safari": "Safari"},
    "allowed_urls": {"github": "https://github.com"},
    "allowed_shortcuts": {"brief": "Daily Brief"},
}
TOKEN = "test-token-with-at-least-24-characters"


class ConfigTests(unittest.TestCase):
    def test_load_config_supplies_empty_allowlists(self):
        with tempfile.TemporaryDirectory() as directory:
            path = Path(directory) / "config.json"
            path.write_text("{}", encoding="utf-8")
            config = load_config(path)
        self.assertEqual(config["allowed_apps"], {})
        self.assertEqual(config["allowed_urls"], {})
        self.assertEqual(config["allowed_shortcuts"], {})

    def test_invalid_allowlist_is_rejected(self):
        with tempfile.TemporaryDirectory() as directory:
            path = Path(directory) / "config.json"
            path.write_text('{"allowed_apps": ["Safari"]}', encoding="utf-8")
            with self.assertRaises(BridgeError):
                load_config(path)


class ActionTests(unittest.TestCase):
    def test_open_app_uses_argument_list_without_shell(self):
        calls = []

        def runner(command, **kwargs):
            calls.append((command, kwargs))
            return subprocess.CompletedProcess(command, 0)

        result = execute_action(CONFIG, "open_app", "safari", runner)

        self.assertEqual(result["status"], "ok")
        self.assertEqual(calls[0][0], ["open", "-a", "Safari"])
        self.assertNotIn("shell", calls[0][1])

    def test_unknown_target_is_rejected(self):
        with self.assertRaisesRegex(BridgeError, "not allowed"):
            execute_action(CONFIG, "open_app", "terminal")

    def test_arbitrary_commands_are_rejected(self):
        with self.assertRaisesRegex(BridgeError, "Unsupported action"):
            execute_action(CONFIG, "run_command", "rm -rf ~")


class HttpTests(unittest.TestCase):
    def setUp(self):
        self.server = BridgeServer(
            ("127.0.0.1", 0),
            CONFIG,
            TOKEN,
            chat=lambda message: {"reply": f"Echo: {message}", "model": "test"},
        )
        self.thread = threading.Thread(target=self.server.serve_forever, daemon=True)
        self.thread.start()
        host, port = self.server.server_address
        self.base_url = f"http://{host}:{port}"

    def tearDown(self):
        self.server.shutdown()
        self.server.server_close()
        self.thread.join(timeout=2)

    def post(self, path, payload, token=TOKEN):
        headers = {
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json",
        }
        return request.urlopen(
            request.Request(
                f"{self.base_url}{path}",
                data=json.dumps(payload).encode(),
                headers=headers,
                method="POST",
            ),
            timeout=2,
        )

    def test_health_endpoint(self):
        with request.urlopen(f"{self.base_url}/health", timeout=2) as response:
            self.assertEqual(json.load(response), {"status": "ok"})

    def test_chat_endpoint(self):
        with self.post("/v1/chat", {"message": "Merhaba"}) as response:
            self.assertEqual(json.load(response)["reply"], "Echo: Merhaba")

    def test_authentication_is_required(self):
        with self.assertRaises(error.HTTPError) as context:
            self.post("/v1/chat", {"message": "Merhaba"}, token="wrong")
        self.assertEqual(context.exception.code, 401)


if __name__ == "__main__":
    unittest.main()
