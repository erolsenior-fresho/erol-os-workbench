#!/bin/bash
set -euo pipefail

PROJECT_DIR="$(cd "$(dirname "$0")" && pwd)"
PLIST_LABEL="com.erolos.ipad-mac-ai-bridge"
PLIST_PATH="$HOME/Library/LaunchAgents/$PLIST_LABEL.plist"
LOG_PATH="$HOME/Library/Logs/ipad-mac-ai-bridge.log"

if [[ "$(uname -s)" != "Darwin" ]]; then
  echo "This setup script must run on macOS." >&2
  exit 1
fi

if ! command -v python3 >/dev/null 2>&1; then
  echo "Python 3 is required. Install it and run this script again." >&2
  exit 1
fi

if [[ ! -f "$PROJECT_DIR/config.json" ]]; then
  cp "$PROJECT_DIR/config.example.json" "$PROJECT_DIR/config.json"
fi

if [[ ! -f "$PROJECT_DIR/.env" ]]; then
  if ! command -v openssl >/dev/null 2>&1; then
    echo "openssl is required to generate an API token." >&2
    exit 1
  fi
  TOKEN="$(openssl rand -hex 24)"
  cat >"$PROJECT_DIR/.env" <<EOF
BRIDGE_API_TOKEN=$TOKEN
OLLAMA_MODEL=qwen2.5:3b
BRIDGE_HOST=0.0.0.0
BRIDGE_PORT=8765
EOF
  chmod 600 "$PROJECT_DIR/.env"
fi

chmod +x "$PROJECT_DIR/run.sh"
mkdir -p "$HOME/Library/LaunchAgents" "$HOME/Library/Logs"

cat >"$PLIST_PATH" <<EOF
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key>
  <string>$PLIST_LABEL</string>
  <key>ProgramArguments</key>
  <array>
    <string>/bin/bash</string>
    <string>$PROJECT_DIR/run.sh</string>
  </array>
  <key>WorkingDirectory</key>
  <string>$PROJECT_DIR</string>
  <key>RunAtLoad</key>
  <true/>
  <key>KeepAlive</key>
  <true/>
  <key>StandardOutPath</key>
  <string>$LOG_PATH</string>
  <key>StandardErrorPath</key>
  <string>$LOG_PATH</string>
</dict>
</plist>
EOF

launchctl bootout "gui/$(id -u)/$PLIST_LABEL" >/dev/null 2>&1 || true
launchctl bootstrap "gui/$(id -u)" "$PLIST_PATH"

TOKEN="$(awk -F= '$1 == "BRIDGE_API_TOKEN" {print $2}' "$PROJECT_DIR/.env")"
LOCAL_IP="$(ipconfig getifaddr en0 2>/dev/null || ipconfig getifaddr en1 2>/dev/null || true)"

echo
echo "Bridge installed and started."
echo "Health check: curl http://127.0.0.1:8765/health"
echo "API token: $TOKEN"
if [[ -n "$LOCAL_IP" ]]; then
  echo "iPad base URL: http://$LOCAL_IP:8765"
else
  echo "Could not detect the Mac IP. Check System Settings > Wi-Fi > Details."
fi
echo
echo "Keep the token private. Never expose port 8765 directly to the internet."
if ! command -v ollama >/dev/null 2>&1; then
  echo "Ollama was not found. Install it, then run: ollama pull qwen2.5:3b"
fi
