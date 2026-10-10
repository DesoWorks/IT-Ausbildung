# Arbeitsplan: gemeinsame Navigation und Glossarseite

## Ziel
Alle vorhandenen Seiten erhalten eine konsistente, offlinefähige Navigation; das vollständige Glossar liegt separat mit Suche, während kurze Begriffserklärungen am Lerninhalt erhalten bleiben.

## Bestand
- Statische HTML/CSS/JS-App; Übersicht `index.html`, Module `module/*.html`, Startverweis `start/IT-Ausbildung starten.html`.
- Glossardaten zentral in `js/glossar-daten.js`; `js/anzeige-glossar.js` injiziert derzeit Anzeigeoptionen und vollständiges Glossar auf jeder Seite.
- Startseitendaten liegen in `js/module-daten.js`; Modulfortschritt und Anzeigepräferenzen haben bestehende lokale Speicherschlüssel.
- PR #1 ist offen; lokaler Branch und PR-Head stehen beide auf `e9f094bcafef46cbae47d6d4756be39a31c90a0d`; Arbeitsbaum war sauber.

## Umsetzung in überprüfbaren Schritten
1. Zentrale Navigationsdaten/-renderer und Seitentypen festlegen; breite Ansicht als linke Seitenleiste, schmale Ansicht als aufklappbares Menü mit Fokus-/Esc-/Klick-aus-Verhalten.
2. Anzeigeoptionen zugänglich in die gemeinsame Navigationsleiste integrieren; existierende Schlüssel und Lernfortschritt unverändert lassen.
3. `glossar.html` mit zentralen Daten, Suche und sicherem Rückweg (`?von=` gegen erlaubte Seiten prüfen, sonst Übersicht) ergänzen; Glossarblock aus übrigen Seiten entfernen.
4. Geplante Einträge der Seiten-Navigation als nicht anklickbaren „In Kürze“-Text rendern; verfügbare Module verlinken und aktuelle Seite mit `aria-current="page"` kennzeichnen.
5. Version/Changelog und Regressionstests aktualisieren.
6. Tests automatisiert und interaktiv ausführen, einschließlich Tastatur, Menü, Suchfilter, Rückweg, Speicherung, file://, 320px und 200% Zoom.
7. Änderungen sichern und PR #1 ausschließlich per normalem Push aktualisieren; PR-Head zurücklesen.

## Risiken und Verifikation
- `file://`-Browser können lokale Speicherung unterschiedlich behandeln; im Fehlerfall darf die App weiter nutzbar bleiben.
- Git/PR remote soll ohne Force-Push/merge geändert werden.
- Verifikation: vorhandene Node-Tests plus neue Prüftests; echte Browser-Interaktion getrennt von DOM-Tests dokumentieren. Screenreader-Aussage nur nach realem Test.

## Außerhalb des Umfangs
Keine neuen Lernlektionen, kein IPv4-/Subnetting-Ausbau, kein Merge nach `main`, keine Veröffentlichung.
