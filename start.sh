#!/usr/bin/env bash
#
# Startet einen lokalen Webserver für die Lerneinheit "Den Computer kennenlernen".
# Bindet absichtlich nur an 127.0.0.1 (nicht öffentlich erreichbar).
#
# Beenden: Taste Strg + C drücken.

set -euo pipefail

HOST="127.0.0.1"
PORT="8080"

# In das Verzeichnis dieses Skripts wechseln, damit die Dateien gefunden werden.
cd "$(dirname "$0")"

# Python 3 suchen.
if command -v python3 >/dev/null 2>&1; then
  PY="python3"
elif command -v python >/dev/null 2>&1; then
  PY="python"
else
  echo "Fehler: Python 3 wurde nicht gefunden. Bitte Python 3 installieren." >&2
  exit 1
fi

echo "Starte lokalen Webserver ..."
echo "Adresse:  http://${HOST}:${PORT}/"
echo "Beenden:  Strg + C"
echo

# Nur an die lokale Adresse binden -> keine automatische öffentliche Bereitstellung.
exec "$PY" -m http.server "$PORT" --bind "$HOST"
