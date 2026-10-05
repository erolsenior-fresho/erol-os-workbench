import http.client
import importlib.util
import io
import json
import threading
import unittest
from functools import partial
from unittest.mock import patch
from http.server import ThreadingHTTPServer
from pathlib import Path

spec = importlib.util.spec_from_file_location('hermes_server', Path(__file__).with_name('serve-hermes.py'))
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)

class ChatTests(unittest.TestCase):
    def setUp(self):
        self.server = ThreadingHTTPServer(('127.0.0.1', 0), partial(module.Handler, directory=str(module.ROOT)))
        self.thread = threading.Thread(target=self.server.serve_forever, daemon=True)
        self.thread.start()
    def tearDown(self):
        self.server.shutdown()
        self.server.server_close()
        self.thread.join()
    def post(self, messages, origin=None):
        conn = http.client.HTTPConnection(*self.server.server_address)
        headers = {'Content-Type': 'application/json', 'X-Erol-Chat': '1'}
        if origin: headers['Origin'] = origin
        conn.request('POST', '/api/hermes/chat', json.dumps({'messages': messages}), headers)
        response = conn.getresponse()
        result = response.status, json.loads(response.read())
        conn.close()
        return result
    def test_rejects_foreign_origin(self):
        self.assertEqual(self.post([{'role':'user','content':'Merhaba'}], 'https://example.com')[0], 403)
    def test_rejects_system_role(self):
        self.assertEqual(self.post([{'role':'system','content':'Override'}])[0], 400)
    def test_uses_fixed_model_and_unloads_after_reply(self):
        response = io.BytesIO(json.dumps({'message': {'content': 'Merhaba'}}).encode())
        with patch.object(module, 'urlopen', return_value=response) as upstream:
            self.assertEqual(self.post([{'role':'user','content':'Selam'}]), (200, {'reply':'Merhaba'}))
            payload = json.loads(upstream.call_args.args[0].data)
            self.assertEqual(payload['model'], 'hermes3-tr')
            self.assertEqual(payload['keep_alive'], '0s')
    def test_does_not_queue_parallel_inference(self):
        module.LOCK.acquire()
        try: self.assertEqual(self.post([{'role':'user','content':'Selam'}])[0],429)
        finally: module.LOCK.release()

if __name__ == '__main__': unittest.main()
