# RAID-Labor P0 – Implementierung und Prüfung

## Ausgangslage
Unified-Featurebranch `feature/unified-it-labs-2026-11-03`, Ausgangscommit `ebf8e06352f1c1faa14308aa04dfceda715f9ca9`; zu Beginn sauber und mit Remote identisch. Andere Worktrees unverändert. Nexus-Screenshotserie des Commanders ist die Bedienreferenz: gezielter Ausfall, Ersatz-Zwischenzustand, ausdrücklicher Rebuild-Start und -Abschluss, genau ein Detailfeld.

## Ursachen und Reparatur
- Das alte Modell hatte keine Austauschaktion und keinen unsynchronisierten Ersatzstatus. Ergänzt: `failed → ersatz → rebuild → bereit`.
- Entfernen löschte die Gruppe und änderte die logische Arraygeometrie. Die gültige Geometrie wird nun vor dem ersten Ausfall/Entfernen eingefroren. Fehlende Mitglieder zählen weiterhin als nicht verfügbar; Austausch erhält Schacht und Gruppe.
- Eine ungültige Gruppenstruktur konnte die Verlustsperre umgehen. Strukturänderungen sind während eines Experiments gesperrt; Verlust und betroffene Gruppen bleiben bis ausdrücklichem Szenarioreset markiert. Kein erfolgreiches Rebuild nach Datenverlust.
- Reset änderte nur Statusfelder und stellte die ursprüngliche Konfiguration nicht wieder her. Nun gesunder Ausgangssnapshot; zusätzlich passende Beispiele und vollständiger Standardreset mit eigener Beschriftung und Bestätigung.
- Die Gruppencheckbox änderte zuvor nur einen Rahmenfarbwert; Überschriften und Gruppentexte blieben. Jetzt werden Gruppenzusammenfassung und Schachtdekoration ausgeblendet, nicht die Schächte/LEDs. Logische Gruppen werden aus Daten ausgewertet, nicht aus Reihen abgeleitet.

## Eigene Prüfungen
- Vor Reparatur neuer Regressionstest rot an fehlender `austauschen`-Aktion; nach Reparatur `node tests/raid-lebenszyklus.test.js`: 110 Assertions grün.
- `node tests/raid-rack-modell.test.js`: 26 Prüfungen grün. `node tests/raid-kern.test.js`: 790 Assertions grün.
- 97 nicht browserbasierte `.test.js`-Dateien einzeln mit Node ausgeführt: alle Exit 0.
- `CDP_PORT=9335 BASE_URL=http://127.0.0.1:8154/ node tests/raid-lebenszyklus-browser.test.js`: 102 Szenario-/Breiten-/Theme-Fälle grün. Derselbe Test vollständig über `file://` grün.
- Abgedeckt: RAID1/5/6/10/50/60 positiver Austausch/Rebuild; RAID0 und überschrittene Gruppentoleranz ohne Rebuild; RAID6/60 zwei Ausfälle rekonstruierbar; RAID10 ein Ausfall je Gruppe; zu kleiner Ersatz; weitere Ausfälle während Rebuild tolerierbar und nicht tolerierbar; Schacht06 ohne Umgruppierung; 16 Auswahlen/ein Detailfeld; Gruppenumschaltung und nicht benachbarte Zuordnung; vollständiger Reset; echte Enter-Tastaturaktivierung mit Fokus; kein Seitenüberlauf bei 320/768/1440 und Hell/Dunkel.
- `tests/raid-rack-browser.test.js`: 42 Level-/Breiten-/Theme-Kombinationen grün; einschließlich Touchsimulation. Alte Testannahme korrigiert: Entfernen verkleinert logisches Array nicht mehr, sondern degradiert es.
- `tests/unified-platform-browser.test.js`: je 24 Kombinationen über HTTP und file grün.
- `tests/unified-pages-browser.test.js`: 102 HTML-Seiten ohne erfasste Runtime-/Ressourcenfehler; Browser-Zurück/Vorwärts grün.
- Syntax und `git diff --check` grün. Sichtprüfung eigener Rasterbelege einschließlich 320 px.

## Modellgrenzen
Kein echter Datenträgerzugriff, kein realer Rebuild oder Erfolgsversprechen. Logische konfigurierte Kapazität bleibt während des Experiments erhalten; physische Ersatzgröße erweitert das Array nicht. Ersatz benötigt mindestens den ursprünglichen global kleinsten Mitgliederanteil. Gruppen/Level sind während des Experiments bewusst gesperrt. P/Q symbolisch. Keine Simulation von Laufzeit, Lesefehlern und Controllerdetails. RAID ersetzt kein Backup.

GLaDOS führt unabhängige gezielte Browser-QA durch; separater Bericht. Neue Windows-Sichtprüfung, echte Touchgeräte, Screenreader und andere Browser bleiben offen. Keine Produktionsfreigabe; kein Merge nach dev/main und kein Deployment.

## Enger Grenzwertnachtrag
Eigener Review reproduzierte, dass eingefrorene logische Kapazität die obere Ersatzkapazitätsgrenze verdeckte. `tests/raid-ersatzgrenzen.test.js` zuerst rot bei 1000001 TB, nach expliziter Prüfung wie im bestehenden Kern grün: 12 Assertions. Anschließend 110 Lifecycle-Assertions und 102 Browserfälle erneut grün. GLaDOS über diese enge Änderung informiert. Der abschließende nicht-browserbasierte Umfang umfasst damit 98 Testdateien.

## Unabhängige QA
GLaDOS bestätigte mit eigenem Script im separaten Chrome auf CDP9337: Schacht06 kompletter Lebenszyklus bei durchgehend Gruppe2 und abschließend funktionsfähig; Ausfälle05/06/07 und nach Austausch gesperrterRebuild mit Datenverlustmeldung; übergroßerErsatz1000001TB gesperrt. Der anfänglich gescheiterte Browsersteuerweg ist im QA-Bericht transparent dokumentiert und durch den frischen unabhängigen Chrome-Pfad überwunden. Die breitere Responsive-/Theme-/Levelmatrix bleibt eigener Entwicklertest, keine unabhängige Vollabnahme. Produktfreigabe weiterhin nicht erteilt.
