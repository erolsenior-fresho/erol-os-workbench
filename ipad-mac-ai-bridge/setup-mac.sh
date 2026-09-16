#!/bin/bash
set -euo pipefail

PROJECT_DIR="$(cd "$(dirname "$0")" && pwd)"
BRIDGE_LABEL="com.erolos.ipad-mac-ai-bridge"
LLAMA_LABEL="com.erolos.ipad-mac-llama-server"
BRIDGE_PLIST="$HOME/Library/LaunchAgents/$BRIDGE_LABEL.plist"
LLAMA_PLIST="$HOME/Library/LaunchAgents/$LLAMA_LABEL.plist"
BRIDGE_LOG="$HOME/Library/Logs/ipad-mac-ai-bridge.log"
LLAMA_LOG="$HOME/Library/Logs/ipad-mac-llama-server.log"
DEFAULT_MODEL="$HOME/Models/qwen2.5-7b-instruct-q4_k_m.gguf"

if [[ "$(uname -s)" != "Darwin" ]]; then
  echo "This setup script must run on macOS." >&2
  exit 1
fi

if ! command -v python3 >/dev/null 2>&1; then
  echo "Python 3 is required. Install it and run this script again." >&2
  exit 1
fi

LLAMA_SERVER_BIN="${LLAMA_SERVER_BIN:-$(command -v llama-server || true)}"
if [[ -z "$LLAMA_SERVER_BIN" ]]; then
  echo "llama-server was not found." >&2
  echo "Install it first with: brew install llama.cpp" >&2
  exit 1
fi

LLAMA_MODEL_PATH="${LLAMA_MODEL_PATH:-$DEFAULT_MODEL}"
if [[ ! -f "$LLAMA_MODEL_PATH" ]]; then
  echo "GGUF model was not found: $LLAMA_MODEL_PATH" >&2
  echo "Download the recommended model using the command in README.md." >&2
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
BRIDGE_HOST=0.0.0.0
BRIDGE_PORT=8765
LOCAL_LLM_URL=http://127.0.0.1:8080/v1/chat/completions
LOCAL_LLM_MODEL=local
LLAMA_SERVER_BIN="$LLAMA_SERVER_BIN"
LLAMA_MODEL_PATH="$LLAMA_MODEL_PATH"
LLAMA_GPU_LAYERS=8
EOF
  chmod 600 "$PROJECT_DIR/.env"
fi

set -a
# shellcheck disable=SC1091
source "$PROJECT_DIR/.env"
set +a

for variable in BRIDGE_API_TOKEN LLAMA_SERVER_BIN LLAMA_MODEL_PATH; do
  if [[ -z "${!variable:-}" ]]; then
    echo "$variable is missing from $PROJECT_DIR/.env." >&2
    echo "Remove the old .env and run setup again." >&2
    exit 1
  fi
done

chmod +x "$PROJECT_DIR/run.sh" "$PROJECT_DIR/run-llama.sh"
mkdir -p "$HOME/Library/LaunchAgents" "$HOME/Library/Logs"

cat >"$LLAMA_PLIST" <<EOF
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key>
  <string>$LLAMA_LABEL</string>
  <key>ProgramArguments</key>
  <array>
    <string>/bin/bash</string>
    <string>$PROJECT_DIR/run-llama.sh</string>
  </array>
  <key>WorkingDirectory</key>
  <string>$PROJECT_DIR</string>
  <key>RunAtLoad</key>
  <true/>
  <key>KeepAlive</key>
  <true/>
  <key>StandardOutPath</key>
  <string>$LLAMA_LOG</string>
  <key>StandardErrorPath</key>
  <string>$LLAMA_LOG</string>
</dict>
</plist>
EOF

cat >"$BRIDGE_PLIST" <<EOF
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key>
  <string>$BRIDGE_LABEL</string>
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
  <string>$BRIDGE_LOG</string>
  <key>StandardErrorPath</key>
  <string>$BRIDGE_LOG</string>
</dict>
</plist>
EOF

launchctl bootout "gui/$(id -u)/$LLAMA_LABEL" >/dev/null 2>&1 || true
launchctl bootout "gui/$(id -u)/$BRIDGE_LABEL" >/dev/null 2>&1 || true
launchctl bootstrap "gui/$(id -u)" "$LLAMA_PLIST"
launchctl bootstrap "gui/$(id -u)" "$BRIDGE_PLIST"

LOCAL_IP="$(ipconfig getifaddr en0 2>/dev/null || ipconfig getifaddr en1 2>/dev/null || true)"

echo
echo "Local model and bridge installed and started."
echo "Health check: curl http://127.0.0.1:8765/health"
echo "API token: $BRIDGE_API_TOKEN"
if [[ -n "$LOCAL_IP" ]]; then
  echo "iPad base URL: http://$LOCAL_IP:8765"
else
  echo "Could not detect the Mac IP. Check System Settings > Wi-Fi > Details."
fi
echo
echo "Keep the token private. Never expose ports 8765 or 8080 to the internet."
