#!/bin/bash
set -euo pipefail

cd "$(dirname "$0")"

if [[ ! -f .env ]]; then
  echo "Missing .env. Run ./setup-mac.sh first." >&2
  exit 1
fi

set -a
# shellcheck disable=SC1091
source .env
set +a

: "${LLAMA_SERVER_BIN:?LLAMA_SERVER_BIN is not set}"
: "${LLAMA_MODEL_PATH:?LLAMA_MODEL_PATH is not set}"

if [[ ! -x "$LLAMA_SERVER_BIN" ]]; then
  echo "llama-server is not executable: $LLAMA_SERVER_BIN" >&2
  exit 1
fi

if [[ ! -f "$LLAMA_MODEL_PATH" ]]; then
  echo "GGUF model not found: $LLAMA_MODEL_PATH" >&2
  exit 1
fi

exec "$LLAMA_SERVER_BIN" \
  --model "$LLAMA_MODEL_PATH" \
  --host 127.0.0.1 \
  --port 8080 \
  --n-gpu-layers "${LLAMA_GPU_LAYERS:-0}"
