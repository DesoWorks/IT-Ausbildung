# QA-Bericht: Windows-Werkzeugkiste

**Datum:** 01.11.2026  
**Prüfobjekt:** `/home/starnet/projects/IT-Ausbildung-werkzeugkiste`  
**Branch/HEAD:** `feature/windows-werkzeugkiste` / `ba62939eb87f2cbc0d5200e02b6ad565a0a01fe2` plus lokale Änderungen.  
**Änderungen vorgenommen:** keine. Kein Commit, Fix oder Push.

## Ergebnis

**Freigabe für die Commander-Sichtprüfung: Nein – noch nicht erteilt.** Die geforderten automatisierten Modultests und Regressionstests (außer dem bekannten Branding-Test) bestanden. Die vorgeschriebene Browserprüfung konnte nicht erreicht werden: der lokale HTTP-Server antwortete per HTTP mit 200, aber `browser.test_navigate` lehnte die URL zweimal mit „local test URL is not proven to belong to this agent's running background server“ ab. `browser.navigate` verweigerte Loopback-Adressen; auch nach Attach eines eigens gestarteten headless Chrome war keine Seite im Agent-Browser geladen (Snapshot zeigte `about:blank`). Damit fehlen belastbare Sichtbelege zu Interaktion, Tastaturfokus, Responsive-Verhalten und Browserkonsole. Das ist ein Prüfblocker, kein nachgewiesener Anwendungsfehler.

## Tests und echte Ausgaben

- `node tests/windows-werkzeugkiste.test.js` — **Exit 0**; Ausgabe: `18 Prüfungen bestanden`. Enthält u. a. Pflichtkarten/Trennung, Datenvertrag, Quiz-Zuordnung, Editions-/Sicherheitshinweise, sichere Textausgabe und wiederholte Testdurchläufe.
- `node tests/startseite.test.js` — **Exit 0**; Ausgabe: `startseite.test.js: alle Prüfungen bestanden`.
- `node tests/navigation-glossar.test.js` — **Exit 0**; Ausgabe: `navigation-glossar.test.js: all assertions passed`.
- `node tests/branding-assets.test.js` — **Exit 1**; Ausgabe: `AssertionError [ERR_ASSERTION]: module/lf3-abnahme.html: SVG favicon` bei `tests/branding-assets.test.js:11:10`. `git diff -- module/lf3-abnahme.html assets css` war leer; `git status --short -- module/lf3-abnahme.html assets` war leer. Kein Branding-Pfad und keine geprüfte LF3-Seite geändert. **Altfehler, nicht der Werkzeugkiste zugerechnet.**
- `node tests/logic.test.js` — **Exit 0**; Ausgabe: `Ergebnis: 13 bestanden, 0 fehlgeschlagen.`
- `node tests/einheiten.test.js` — **Exit 0**; Ausgabe: `einheiten.test.js: all assertions passed`.

## Browser-/Bedienprüfung

Die lokale Vorschau `http://127.0.0.1:8765/module/windows-werkzeugkiste.html` wurde über einen temporären statischen Python-Server auf Port 8765 bereitgestellt; `curl -I` erhielt `HTTP/1.0 200 OK`. Die Browserwerkzeuge konnten diese lokale Adresse nicht öffnen. Der Server und der separate Chrome-Prozess wurden danach beendet.

Daher **nicht geprüft**: sichtbare Trennung und Vollständigkeit der 14 Karten im gerenderten Browser, Alltagssituation mit Feedback, Quiz bis Ergebnis und Neustart, Rücklink per Klick, Vermeidung ausführender Links durch Browserinspektion, Tab-Reihenfolge und sichtbarer Fokus, 320px-Überlauf sowie Konsole. Die Pflichtfunktionen sind anhand des Modultests abgedeckt, aber diese Tests ersetzen die angeforderte echte Bedienprüfung nicht.

## Diff- und Fremdmodulprüfung

`git status --short` zeigte Änderungen/Neudateien nur in Startseitenintegration und Windows-Werkzeugkiste: `js/module-daten.js`, `js/startseite.js`, `tests/startseite.test.js`, `css/windows-werkzeugkiste.css`, `docs/inhalte/`, die Windows-Übergaben, `js/windows-werkzeugkiste-daten.js`, `js/windows-werkzeugkiste.js`, `module/windows-werkzeugkiste.html` und `tests/windows-werkzeugkiste.test.js`. Keine Änderungen an BWL, Lektionen oder Vorlesen festgestellt. `git diff --stat`: 3 getrackte Dateien, 68 Einfügungen, 2 Löschungen; neue, ungetrackte Dateien sind darin nicht enthalten.

## Befunde

- **Neue reproduzierbare Fehler:** keine durch die ausgeführten Tests nachgewiesen.
- **Altfehler:** fehlendes SVG-Favicon in `module/lf3-abnahme.html`, wie oben abgegrenzt.
- **Blocker:** vorgeschriebene Browserprüfung wegen nicht zugänglicher lokaler URL im kontrollierten Browser nicht durchgeführt. Deshalb keine Freigabe für Sichtprüfung, bis die Browserprüfung auf einer erreichbaren lokalen Vorschau nachgeholt ist.
