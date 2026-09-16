#!/usr/bin/env python3
"""Small, authenticated bridge between iPad Shortcuts and a Mac."""

from __future__ import annotations

import argparse
import hmac
import json
import os
import subprocess
import sys
from http import HTTPStatus
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from typing import Any, Callable
from urllib import error, request

BASE_DIR = Path(__file__).resolve().parent
DEFAULT_CONFIG_PATH = BASE_DIR / "config.json"
MAX_BODY_BYTES = 64 * 1024
MAX_MESSAGE_CHARS = 10_000


class BridgeError(Exception):
    """An expected request or configuration failure."""

    def __init__(self, message: str, status: int = HTTPStatus.BAD_REQUEST):
        super().__init__(message)
        self.status = status


def load_config(path: Path) -> dict[str, Any]:
    try:
        with path.open(encoding="utf-8") as config_file:
            config = json.load(config_file)
    except FileNotFoundError as exc:
        raise BridgeError(
            f"Configuration file not found: {path}. Copy config.example.json first."
        ) from exc
    except json.JSONDecodeError as exc:
        raise BridgeError(f"Invalid JSON in {path}: {exc}") from exc

    for key in ("allowed_apps", "allowed_urls", "allowed_shortcuts"):
        value = config.get(key, {})
        if not isinstance(value, dict) or not all(
            isinstance(name, str) and isinstance(target, str)
            for name, target in value.items()
        ):
            raise BridgeError(f"{key} must be an object containing string values.")
        config[key] = value
    return config


def require_token() -> str:
    token = os.environ.get("BRIDGE_API_TOKEN", "")
    if len(token) < 24:
        raise BridgeError(
            "BRIDGE_API_TOKEN must contain at least 24 characters.",
            HTTPStatus.INTERNAL_SERVER_ERROR,
        )
    return token


def ollama_chat(message: str) -> dict[str, str]:
    if not isinstance(message, str) or not message.strip():
        raise BridgeError("message must be a non-empty string.")
    if len(message) > MAX_MESSAGE_CHARS:
        raise BridgeError(f"message cannot exceed {MAX_MESSAGE_CHARS} characters.")

    base_url = os.environ.get("OLLAMA_URL", "http://127.0.0.1:11434").rstrip("/")
    model = os.environ.get("OLLAMA_MODEL", "qwen2.5:3b")
    payload = json.dumps(
        {
            "model": model,
            "messages": [{"role": "user", "content": message.strip()}],
            "stream": False,
        }
    ).encode()
    ollama_request = request.Request(
        f"{base_url}/api/chat",
        data=payload,
        headers={"Content-Type": "application/json"},
        method="POST",
    )

    try:
        with request.urlopen(ollama_request, timeout=120) as response:
            result = json.load(response)
    except error.HTTPError as exc:
        detail = exc.read().decode(errors="replace")
        raise BridgeError(
            f"Ollama returned HTTP {exc.code}: {detail[:300]}",
            HTTPStatus.BAD_GATEWAY,
        ) from exc
    except (error.URLError, TimeoutError) as exc:
        raise BridgeError(
            "Ollama is unavailable. Start Ollama and verify OLLAMA_URL.",
            HTTPStatus.BAD_GATEWAY,
        ) from exc
    except json.JSONDecodeError as exc:
        raise BridgeError(
            "Ollama returned invalid JSON.", HTTPStatus.BAD_GATEWAY
        ) from exc

    reply = result.get("message", {}).get("content")
    if not isinstance(reply, str):
        raise BridgeError(
            "Ollama response did not contain a message.", HTTPStatus.BAD_GATEWAY
        )
    return {"reply": reply, "model": model}


Runner = Callable[..., subprocess.CompletedProcess[str]]


def execute_action(
    config: dict[str, Any],
    action: str,
    target: str,
    runner: Runner = subprocess.run,
) -> dict[str, str]:
    if not isinstance(action, str) or not isinstance(target, str):
        raise BridgeError("action and target must be strings.")

    maps: dict[str, tuple[str, list[str]]] = {
        "open_app": ("allowed_apps", ["open", "-a"]),
        "open_url": ("allowed_urls", ["open"]),
        "run_shortcut": ("allowed_shortcuts", ["shortcuts", "run"]),
    }
    if action not in maps:
        raise BridgeError(
            "Unsupported action. Use open_app, open_url, or run_shortcut."
        )

    config_key, command = maps[action]
    allowed_targets = config[config_key]
    resolved_target = allowed_targets.get(target)
    if not resolved_target:
        raise BridgeError(f"Target '{target}' is not allowed for {action}.")

    try:
        runner(
            [*command, resolved_target],
            check=True,
            capture_output=True,
            text=True,
            timeout=60,
        )
    except FileNotFoundError as exc:
        raise BridgeError(
            f"Required macOS command is unavailable: {command[0]}.",
            HTTPStatus.INTERNAL_SERVER_ERROR,
        ) from exc
    except subprocess.TimeoutExpired as exc:
        raise BridgeError("The action timed out.", HTTPStatus.GATEWAY_TIMEOUT) from exc
    except subprocess.CalledProcessError as exc:
        detail = (exc.stderr or exc.stdout or "unknown error").strip()
        raise BridgeError(
            f"The action failed: {detail[:300]}",
            HTTPStatus.INTERNAL_SERVER_ERROR,
        ) from exc

    return {"status": "ok", "action": action, "target": target}


class BridgeHandler(BaseHTTPRequestHandler):
    server_version = "iPadMacBridge/1.0"

    @property
    def bridge_server(self) -> "BridgeServer":
        return self.server  # type: ignore[return-value]

    def _send_json(self, status: int, payload: dict[str, Any]) -> None:
        body = json.dumps(payload, ensure_ascii=False).encode()
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(body)

    def _authenticated(self) -> bool:
        expected = f"Bearer {self.bridge_server.api_token}"
        supplied = self.headers.get("Authorization", "")
        return hmac.compare_digest(supplied, expected)

    def _read_json(self) -> dict[str, Any]:
        try:
            length = int(self.headers.get("Content-Length", "0"))
        except ValueError as exc:
            raise BridgeError("Invalid Content-Length.") from exc
        if length <= 0 or length > MAX_BODY_BYTES:
            raise BridgeError(f"Body size must be between 1 and {MAX_BODY_BYTES} bytes.")
        try:
            payload = json.loads(self.rfile.read(length))
        except (UnicodeDecodeError, json.JSONDecodeError) as exc:
            raise BridgeError("Request body must be valid JSON.") from exc
        if not isinstance(payload, dict):
            raise BridgeError("Request body must be a JSON object.")
        return payload

    def do_GET(self) -> None:
        if self.path == "/health":
            self._send_json(HTTPStatus.OK, {"status": "ok"})
            return
        self._send_json(HTTPStatus.NOT_FOUND, {"error": "Not found."})

    def do_POST(self) -> None:
        if not self._authenticated():
            self._send_json(HTTPStatus.UNAUTHORIZED, {"error": "Unauthorized."})
            return

        try:
            payload = self._read_json()
            if self.path == "/v1/chat":
                result = self.bridge_server.chat(payload.get("message"))
            elif self.path == "/v1/action":
                result = execute_action(
                    self.bridge_server.config,
                    payload.get("action"),
                    payload.get("target"),
                )
            else:
                self._send_json(HTTPStatus.NOT_FOUND, {"error": "Not found."})
                return
            self._send_json(HTTPStatus.OK, result)
        except BridgeError as exc:
            self._send_json(exc.status, {"error": str(exc)})
        except Exception as exc:
            self.log_error("Unexpected server error: %s", exc)
            self._send_json(
                HTTPStatus.INTERNAL_SERVER_ERROR, {"error": "Internal server error."}
            )

    def log_message(self, format_string: str, *args: Any) -> None:
        sys.stderr.write(
            f"{self.address_string()} [{self.log_date_time_string()}] "
            f"{format_string % args}\n"
        )


class BridgeServer(ThreadingHTTPServer):
    daemon_threads = True

    def __init__(
        self,
        address: tuple[str, int],
        config: dict[str, Any],
        api_token: str,
        chat: Callable[[str], dict[str, str]] = ollama_chat,
    ):
        super().__init__(address, BridgeHandler)
        self.config = config
        self.api_token = api_token
        self.chat = chat


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--config",
        type=Path,
        default=Path(os.environ.get("BRIDGE_CONFIG", DEFAULT_CONFIG_PATH)),
    )
    parser.add_argument(
        "--host", default=os.environ.get("BRIDGE_HOST", "0.0.0.0")
    )
    parser.add_argument(
        "--port", type=int, default=int(os.environ.get("BRIDGE_PORT", "8765"))
    )
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    try:
        config = load_config(args.config)
        token = require_token()
    except BridgeError as exc:
        print(f"Configuration error: {exc}", file=sys.stderr)
        return 2

    server = BridgeServer((args.host, args.port), config, token)
    print(f"iPad–Mac bridge listening on {args.host}:{args.port}")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.server_close()
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
