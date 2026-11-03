# Unabhängiger QA-Bericht – PC-Explorer-Lernlabor

**Prüfobjekt:** `/home/starnet/projects/IT-Ausbildung-pc`  
**Branch / Stand:** `feature/pc-explorer-grafik-2026-11-02`, HEAD `7549ad8fe5ebd4f7ce1289cc1fa6910c6536ea78`  
**Arbeitsbaum:** uncommitted Änderungen an `js/pc-explorer.js`, `css/pc-explorer.css`, `module/pc-explorer.html`, `tests/pc-explorer.test.js`; außerdem unversionierte Übergabequellennotiz und `vorschau/`. `vorschau/` wurde nicht geöffnet oder verändert.  
**Umgebung:** Code- und Testprüfung im lokalen Worktree. Lokaler HTTP-Server wurde auf 127.0.0.1:8080 gestartet; Browser-Testwerkzeug lehnte die Verbindung ab, da die URL nicht als zum gestarteten Agent-Server gehörig nachgewiesen wurde. Daher kein eigener Browserlauf.  
**Fachfreigabe:** keine.

## Pflichtbefunde

1. **Bestanden – Ansichten und Server-Slot.** `js/pc-explorer.js:534–565`: `ANSICHTEN` enthält `rueckseite`, `mainboard` und `historisch`; `server` ist `null`. Im Node-Lauf wurden die Schlüssel `desktop, notebook, rueckseite, mainboard, historisch, server` ausgegeben.
2. **Bestanden – fünf Ansichtsknöpfe; Back-Connect-Abschnitt bleibt.** `module/pc-explorer.html:28–35` enthält fünf `data-ansicht`-Schaltflächen. Der separate `pe-abschnitt-rueck` bleibt in `module/pc-explorer.html:64–67` als erklärender Abschnitt zu Back-Connect erhalten. Der Test `node tests/pc-explorer.test.js` bestätigt die Zahl der fünf Knöpfe und den Abschnitt.
3. **Bestanden – Trennung Rückseiten-I/O und historische Ansicht.** `js/pc-explorer.js:546–550` beschreibt Mainboard-I/O getrennt von Erweiterungskarten. Die Datenlisten enthalten für die Rückseite `hdmi-gpu` und `dp-gpu` mit Gruppe `erweiterungskarte`; Mainboard-I/O-Einträge sind separat markiert. Historische IDs sind `ide`, `pci`, `agp`; ein zusätzlicher Node-Abgleich bestätigte, dass keine davon in Rückseite oder Mainboard vorkommt.
4. **Fehlgeschlagen – interne Auftragssätze in Lerntexten.** In Praxistexten der neuen Ansichten steht „soll“ als interne bzw. aufgabenförmige Formulierung, zum Beispiel `js/pc-explorer.js` (USB-C-Praxistext bei `usb-c`), DP-GPU-Praxistext bei `dp-gpu` sowie PCIe-lang-, PCIe-kurz-, SATA-, SYS_FAN- und RGB-Praxistext in der Mainboard-Ansicht. Ein Suchlauf über die Lerntextfelder meldete sieben Treffer mit „soll“. Das ist kein technischer Funktionsfehler, sondern ein nicht erfülltes Inhaltskriterium „keine internen Auftragssätze“; die konkreten Sätze sind als Ausbildungsbeispiele formuliert. Keine Fachfreigabe daraus ableiten.
5. **Bestanden – keine neuen Bilddateien; keine Voltwerte; Pinzahlen nur in Namen.** `assets/pc-explorer/` enthält ausschließlich die drei bereits vorhandenen Commons-Dateien (PGA-, LGA- und BGA-Foto); es kamen keine weiteren Bilddateien hinzu. `node tests/pc-explorer.test.js` passierte die Verbotsprüfungen für Volt- und Pin-Angaben. Eine zusätzliche Sichtprüfung der geänderten Daten fand keine gegenteiligen Werte.
6. **Bestanden – HDD/PSU-Tausch im Code.** `js/pc-explorer.js` in den Datensätzen für `hdd` und `psu` (Desktop-TEILE) weist HDD-Layout `[446, 392, 176, 36]` und PSU-Layout `[176, 384, 232, 70]` aus; damit liegt das PSU im Beispiel weiter vorn/links als die HDD. Der Testlauf bestätigte die geforderte Layoutbeziehung.
7. **Bestanden – Notebook-Zeichnung bleibt separat.** `js/pc-explorer.js:540–545` führt die eigene `NOTEBOOK_TEILE`-Liste als Notebook-Ansicht; die neuen Datenansichten haben eigene Listen. Der Testlauf bestätigt weiterhin die Notebook-IDs und separaten Layoutprüfungen.
8. **Nicht ausgeführt – Tastatur, Fokus und 320px im Browser.** Kein Browser-Test wurde erfolgreich geöffnet. Die lokalen Unit-/Quelltests und CSS-Regeln sind kein Ersatz für die geforderte Browserausführung; deshalb keine Bestätigung zu Tastaturbedienung, sichtbarem Fokus oder 320px-Layout.

## Vorgeschriebene Prüfungen

- `node tests/pc-explorer.test.js` — **bestanden**, Exit 0: `pc-explorer: alle Prüfungen bestanden`.
- `node --check js/pc-explorer.js` — **bestanden**, Exit 0 (Teil desselben Befehlslaufs).
- `node tests/startseite.test.js` — **bestanden**, Exit 0: `startseite.test.js: alle Prüfungen bestanden`.
- Browserprüfung (Tastatur/Fokus/320px) — **nicht ausgeführt**, Browserwerkzeug hat die lokale URL nicht als Agent-Server bestätigt.

## Gesamturteil

Im geprüften Umfang wurden die drei Ansichten, die HTML-Einbindung, die Datentrennung, historische IDs, HDD/PSU-Position, Notebook-Daten sowie die drei angeforderten Node-Prüfungen erfolgreich verifiziert. Ein Inhaltskriterium ist nicht erfüllt: sieben neue Praxistexte enthalten „soll“-Formulierungen, die beim Kriterium interner Auftragssätze auffallen. Die echte Bedienung mit Tastatur, Fokusdarstellung und bei 320px bleibt offen. Keine Fachfreigabe.
