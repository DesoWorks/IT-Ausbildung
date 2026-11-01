# Browserprüfung Tastatur, nachgezogen durch Rick

GLaDOS hat die Browserprüfung in der Abschlussrunde nicht ausgeführt. Der erste Lauf endete ohne Bericht am Zeitlimit. Der zweite Lauf hat die Befehle geprüft und die Browserprüfung ausdrücklich offen gelassen.

Rick hat dieselbe `dev`-Fassung danach mit Headless Chrome und CDP gegen `http://127.0.0.1:8092` geprüft. Der Server bediente `/home/starnet/projects/IT-Ausbildung-dev`.

## Windows-Werkzeugkiste

- Die Schaltflächen Lernkarten, Übung und Wissenstest ließen sich fokussieren. Der Fokusrahmen war `solid 3px`.
- Enter auf der fokussierten Schaltfläche hat den jeweiligen Modus geöffnet.
- Im gerenderten Text standen danach `gpedit.msc`, `msconfig`, `Windows 11 Home`, `Abgesicherter Start` und der Hinweis zum konkreten Auftrag.
- Weitere Tabs landeten auf Übung, Wissenstest und der Aufklappliste Fachbegriffe, jeweils mit 3px-Fokusrahmen.
- Bei 320 Pixel Breite war `scrollWidth` nicht größer als `clientWidth`.

## LF3-Abnahme

- Die drei Favicon-Links und der Kopf-Logo-Link sind im DOM.
- Tab erreicht Sprunglink, Logo und die Lektionsauswahl. Fokusrahmen `solid 3px rgb(7, 84, 166)`.
- Bei 320 Pixel Breite kein horizontaler Überlauf.
- Das Logo ist sichtbar und nicht in Originalbreite 708 Pixel aufgeblasen.

Keine Datei des Moduls wurde durch diese Prüfung geändert.
