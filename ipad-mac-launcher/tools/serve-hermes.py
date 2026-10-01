"""Serve Erol OS and fixed-model Ollama chat on loopback only."""
import json
import threading
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.error import URLError
from urllib.request import Request, urlopen
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parents[1]
LOCK = threading.Lock()

class Handler(SimpleHTTPRequestHandler):
    def reply(self, code, data):
        body = json.dumps(data, ensure_ascii=False).encode()
        self.send_response(code)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.send_header('Cache-Control', 'no-store')
        self.send_header('Content-Length', str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_POST(self):
        if self.path != '/api/hermes/chat':
            return self.reply(404, {'error': 'Bilinmeyen istek.'})
        host = self.headers.get('Host', '')
        origin = self.headers.get('Origin')
        if (self.headers.get('X-Erol-Chat') != '1' or
            (origin and urlparse(origin).netloc != host)):
            return self.reply(403, {'error': 'İstek bu Erol OS sayfasından gelmeli.'})
        try:
            length = int(self.headers.get('Content-Length', '0'))
            if not 0 < length <= 80000:
                raise ValueError()
            data = json.loads(self.rfile.read(length))
            messages = data['messages']
            if not isinstance(messages, list) or not 1 <= len(messages) <= 12:
                raise ValueError()
            for message in messages:
                if (not isinstance(message, dict) or message.get('role') not in ('user', 'assistant') or
                    not isinstance(message.get('content'), str) or not 1 <= len(message['content']) <= 6000):
                    raise ValueError()
        except (ValueError, KeyError, TypeError):
            return self.reply(400, {'error': 'Geçersiz veya çok uzun mesaj.'})
        if not LOCK.acquire(blocking=False):
            return self.reply(429, {'error': 'Hermes şu an başka bir yanıt hazırlıyor. Biraz sonra tekrar dene.'})
        try:
            payload = {'model': 'hermes3-tr', 'messages': messages, 'stream': False,
                       'keep_alive': '0s', 'options': {'num_ctx': 2048, 'num_predict': 512}}
            req = Request('http://127.0.0.1:11434/api/chat', data=json.dumps(payload).encode(), headers={'Content-Type': 'application/json'})
            with urlopen(req, timeout=300) as result:
                reply = json.load(result)['message']['content']
            self.reply(200, {'reply': reply})
        except (URLError, TimeoutError, KeyError, ValueError):
            self.reply(503, {'error': 'Hermes yanıt veremedi. Ollama servisini ve hermes3-tr modelini kontrol et.'})
        finally:
            LOCK.release()

if __name__ == '__main__':
    print('Erol OS + Hermes: http://127.0.0.1:4173', flush=True)
    ThreadingHTTPServer(('127.0.0.1', 4173), partial(Handler, directory=str(ROOT))).serve_forever()
