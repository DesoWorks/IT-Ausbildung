# Technische Abnahme, Jahr 1

Stand: Mittwoch, 14.10.2026. Branch `prototype/computer-grundlagen`, Stand `feeb4aa` („Add a Lernfeld 5 lesson on reviewing the work process.“), Version `0.16.2-alpha.1`. Kein Commit, kein Push, keine Nachricht nach außen.

Die Prüfung gilt der Technik. Der Inhalt bleibt bei Dennis.

## Ergebnis

Die geprüften Abläufe laufen. Zwei veraltete Browserprüfungen erwarteten alte Zahlen und sind an die sichtbare Anzeige angepasst. Der Feldstatus von Lernfeld 3 in den Daten ist veraltet, sperrt die Lektionen aber nicht. Das ist die offene Entscheidung.

## Katalog

Sichtbar auf der Themenübersicht und in den Dateien:

- Einstieg „Den Computer kennenlernen“
- Lernfeld 1: 11 Lektionen, verfügbar
- Lernfeld 2: 13 Lektionen, verfügbar
- Lernfeld 3: 10 Lektionen, in der Übersicht „10 verfügbar“ und verlinkt
- Lernfeld 4: 7 Lektionen, verfügbar
- Lernfeld 5: 11 Lektionen, verfügbar
- Lernfeld 6: noch nicht gebaut, „kommt bald“
- Drei Werkzeuge: Zahlensystemrechner, Einheitenrechner, IPv4-Subnetzrechner

56 Katalogdateien sind vorhanden. Keine verwaiste HTML-Datei im Modulordner. Keine kaputte relative Verlinkung in den HTML-Seiten.

In `js/module-daten.js` steht das Feld Lernfeld 3 selbst noch auf `kommt-bald`. Die Übersicht und die Navigation zählen und verlinken die einzelnen Lektionen nach deren eigenem Status. Deshalb ist Lernfeld 3 bedienbar, obwohl der Feldstatus alt ist. Diesen Status habe ich nicht geändert.

## Automatische Prüfungen

`node tests/*.test.js`: 62 bestanden, 0 fehlgeschlagen, Exit 0.

Browserprüfungen über die lokale Seite `http://127.0.0.1:8099` und eine eigene Headless-Chrome-Instanz:

- Tastatur und Menü: bestanden
- Farbmodi und Kontrast: bestanden
- Einheitenrechner: bestanden
- IPv4-Rechner: bestanden, nach Anpassung der Erwartung
- Navigation und Glossar: bestanden, nach Anpassung der Erwartung

## Sichtbar geprüft

Zahlensystemrechner: 192 wird als `C0` gezeigt, 190 als `BE`. Kein `0x` in der Ergebniszeile. Der alte Satz zu `0b` und `0x` ist auf der Seite nicht mehr zu sehen.

Einheitenrechner: 1 TB wird als ungefähr `931,322575 GiB` gezeigt, mit Hinweis auf die Rundung.

IPv4-Rechner: `/0` zeigt `4.294.967.296` Adressen. `/24`, `/25`, `/30`, `/31` und `/32` liefern Netz, Broadcast und Adresszahl ohne `undefined` oder `NaN`. Bei 1440, 390 und 320 Pixel Breite kein seitlicher Überlauf.

Glossar: 109 Einträge. Unter 1100 Pixel eine Spalte, ab 1100 Pixel drei Spalten, ab 1600 Pixel vier Spalten. Kein seitlicher Überlauf. Die Suche nach „Oktett“ trifft den Begriff und zusätzlich „Byte“, weil die Erklärung dort ein Oktett nennt. Das ist die vorgesehene Suche in Begriff und Erklärung.

Stichprobe „Ein Datenformat wählen“: leeres und falsches Prüfen zeigt sichtbares Feedback. Ein Neuladen erhält die Antworten und den Fortschrittstext. Der sichtbare Schritt springt dabei auf den Überblick zurück, der Übungsschritt selbst wird nicht gemerkt. Ein Doppelklick auf „Weiter“ springt nicht zwei Schritte. Der Abschlussreiter lässt sich öffnen, der Haken in der Übersicht bleibt bei falschen Antworten aus. Das entspricht der vorhandenen Fortschrittslogik.

Tastatur: der erste Stopp ist „Direkt zum Inhalt springen“, sichtbarer Fokus, Menü lässt sich öffnen und mit Escape schließen.

## Geändert

Nur Prüfungen, kein Lerninhalt:

- `tests/browser-ipv4-cdp.js`: Erwartung für `/0` ist jetzt `4.294.967.296`, wie die Seite es zeigt.
- `tests/browser-navigation-cdp.js`: Glossar erwartet 109 Einträge. Die Suche nach „Oktett“ erwartet 2 Treffer. Die Protokollzeile nennt ebenfalls 109.

Beide Prüfungen danach erneut grün. Die Bildschirmfotos aus dem Farbtest habe ich zurückgesetzt, damit sie den Stand nicht verändern.

## Nicht geprüft

Nicht jede Lektion wurde Satz für Satz gelesen. Ein Screenreader wurde nicht mit einer echten Sprachausgabe geprüft. Der entfernte Git-Stand wurde nicht neu abgefragt. Ob Lernfeld 5 den Rahmenlehrplan vollständig abdeckt, ist eine Inhaltsfrage, keine technische. Die bewusste Lücke bleibt: kein echtes Teamprojekt, keine Datenbank, kein SQL, kein ausführbarer Code.

## Offene Entscheidung

Soll der Feldstatus von Lernfeld 3 in den Daten von „kommt bald“ auf „verfügbar“ gestellt werden? Die Lektionen sind bereits erreichbar. Ohne diese Änderung bleibt nur ein veralteter Datenwert, keine Sperre.
