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

exec /usr/bin/env python3 bridge.py
