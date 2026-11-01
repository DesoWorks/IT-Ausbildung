# Favicon-Befund auf der dev-Basis

Datum: 01.11.2026
Geprüft auf: lokalem Branch `dev`, Commit der Übertragung `01b2c3d`, Elterncommit `e3b9e02` (`origin/prototype/computer-grundlagen`).

## Ergebnis

Der bekannte Favicon-Fehler ist auf dieser Basis vorhanden. Er gehört nicht zur Windows-Werkzeugkiste.

Ausgeführt: `node tests/branding-assets.test.js`
Exit-Code: 1
Meldung: `module/lf3-abnahme.html: SVG favicon`

`module/lf3-abnahme.html` enthält keine Favicon-Verweise. Eine Suche über alle HTML-Seiten dieser Basis fand nur diese eine Seite ohne `assets/desoworks/favicon.svg`.

Die neue Seite `module/windows-werkzeugkiste.html` enthält die drei Favicon-Verweise und das Logo. Sie ist nicht die Ursache des Fehlers.

Die Datei `module/lf3-abnahme.html` ist im Diff der Werkzeugkisten-Übertragung nicht enthalten. Sie wurde nicht geändert.

## Abgrenzung

Alle übrigen `tests/*.test.js` auf diesem Stand sind in demselben Prüflauf bestanden, einschließlich `tests/windows-werkzeugkiste.test.js` und `tests/startseite.test.js`.
