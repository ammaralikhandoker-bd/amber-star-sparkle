#!/usr/bin/env bash
# Polls a URL until it returns HTTP 200 or times out.
# Usage: ./scripts/health-check.sh [URL] [TIMEOUT_SECONDS]
# Defaults: URL=http://localhost:8080  TIMEOUT=60
set -euo pipefail

URL="${1:-${HEALTH_URL:-http://localhost:8080}}"
TIMEOUT="${2:-${HEALTH_TIMEOUT:-60}}"
INTERVAL=2

echo "Health check: $URL (timeout ${TIMEOUT}s)"
elapsed=0
while [ "$elapsed" -lt "$TIMEOUT" ]; do
  code=$(curl -o /dev/null -s -w "%{http_code}" --max-time 5 "$URL" || echo "000")
  if [ "$code" = "200" ]; then
    echo "OK: $URL responded 200 after ${elapsed}s"
    exit 0
  fi
  echo "  [${elapsed}s] status=$code, retrying in ${INTERVAL}s..."
  sleep "$INTERVAL"
  elapsed=$((elapsed + INTERVAL))
done

echo "FAIL: $URL did not return 200 within ${TIMEOUT}s" >&2
exit 1
