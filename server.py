# -*- coding: utf-8 -*-
"""
MathLand Adventure - Local Web & Southern Vietnamese Female TTS Server
Voice: vi-VN-HoaiMyNeural (Microsoft Hoài My - Giọng Nữ Miền Nam)
"""
import os
import sys
import re
import hashlib
import subprocess
import urllib.parse
from http.server import HTTPServer, SimpleHTTPRequestHandler

sys.stdout.reconfigure(encoding='utf-8')
sys.stderr.reconfigure(encoding='utf-8')

PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 3000
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
TTS_DIR = os.path.join(BASE_DIR, 'audio', 'tts')
os.makedirs(TTS_DIR, exist_ok=True)

# Regex to strip emojis and markdown characters from speech text
EMOJI_PATTERN = re.compile(r'[\U00010000-\U0010ffff\u2600-\u27bf\u2300-\u23ff\u2b50]', flags=re.UNICODE)

def clean_speech_text(text):
    t = EMOJI_PATTERN.sub('', text)
    t = re.sub(r'[\{\}\[\]\*\#]', '', t)
    t = re.sub(r'\s+', ' ', t).strip()
    return t

def generate_hoaimy_tts(text, dest_path):
    cmd = [
        sys.executable,
        "-m",
        "edge_tts",
        "--text",
        text,
        "--write-media",
        dest_path,
        "--voice",
        "vi-VN-HoaiMyNeural"
    ]
    env = os.environ.copy()
    env["PYTHONUTF8"] = "1"
    env["PYTHONIOENCODING"] = "utf-8"
    res = subprocess.run(cmd, capture_output=True, text=True, encoding="utf-8", env=env)
    if res.returncode != 0:
        raise RuntimeError(f"edge_tts failed (code {res.returncode}): {res.stderr}")

class MathLandRequestHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=BASE_DIR, **kwargs)

    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        super().end_headers()

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        if parsed.path == '/api/tts':
            params = urllib.parse.parse_qs(parsed.query)
            raw_text = params.get('text', [''])[0].strip()
            if not raw_text:
                self.send_error(400, "Missing 'text' parameter")
                return

            speech_text = clean_speech_text(raw_text)
            if not speech_text:
                self.send_error(400, "Empty speech text after cleaning")
                return

            text_hash = hashlib.md5(speech_text.encode('utf-8')).hexdigest()
            cache_file = os.path.join(TTS_DIR, f"{text_hash}.mp3")

            # Generate if not cached
            if not os.path.exists(cache_file) or os.path.getsize(cache_file) == 0:
                try:
                    generate_hoaimy_tts(speech_text, cache_file)
                    print(f"[Hoài My TTS] Synthesized: {speech_text[:50]}...")
                except Exception as e:
                    print(f"[TTS ERROR] Failed to generate voice for '{speech_text}': {e}")
                    self.send_error(500, f"TTS generation failed: {e}")
                    return

            # Serve the generated MP3
            try:
                with open(cache_file, 'rb') as f:
                    data = f.read()
                self.send_response(200)
                self.send_header('Content-Type', 'audio/mpeg')
                self.send_header('Content-Length', str(len(data)))
                self.send_header('Cache-Control', 'public, max-age=86400')
                self.end_headers()
                self.wfile.write(data)
                return
            except Exception as e:
                self.send_error(500, f"Failed to read cached audio: {e}")
                return

        return super().do_GET()

def run_server():
    server_address = ('', PORT)
    httpd = HTTPServer(server_address, MathLandRequestHandler)
    print(f"================================================================")
    print(f" MathLand Adventure Server Running on http://localhost:{PORT}")
    print(f" Southern Vietnamese Female TTS: vi-VN-HoaiMyNeural (Hoài My)")
    print(f" Audio Directory: {TTS_DIR}")
    print(f"================================================================")
    sys.stdout.flush()
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nShutting down server...")
        httpd.server_close()

if __name__ == '__main__':
    run_server()
