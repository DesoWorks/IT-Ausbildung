# PC-Explorer – Grafikphase ATX / I/O, Integrationsbericht

Stand: 2026-11-03. Beauftragter Teststand, keine Produktions- oder Fachfreigabe.

## Rahmen und Sicherung

Repository `DesoWorks/IT-Ausbildung`, Worktree `/home/starnet/projects/IT-Ausbildung-pc`, ausschließlich Branch `feature/pc-explorer-grafik-2026-11-02`. Ausgangscommit `8b7177485c94b919d65281afe7cd7e7f41ffe4d7` war lokal und remote identisch. Bei Übernahme keine tracked Änderungen; vorhandene 32 Dateien unter `vorschau/` bleiben untracked und unangetastet. Zusätzliche Sicherung außerhalb des Repositorys: `/home/starnet/pc-explorer-sicherungen/2026-11-03-fbf9ed2c/vorschau-vorher.tar.gz`, Archivinhalt gelesen (33 Einträge inklusive Verzeichnis), Gitstatus daneben gespeichert.

Remote-Referenzen vor Beginn: `dev` = `3b3b49fa7c8aeb7f66d0214f57536d1d2fdd2d49`, `main` = `6e6217778ea7148fc02c142b39072a2f573ce8ba`. Kein Branchwechsel, Merge oder Eingriff in andere Worktrees und keine GitHub-Pages-Änderungen.

## Tatsächliche Aufgabenverteilung

- **Terminus:** Ausgangslage/Sicherung, Planung und Dateigrenzen; Delegation; eigene Integrations-/Browserprüfung; fachlich falsche erste ATX-Orientierung erkannt und zurückgewiesen; Quellenbeleg Audio/PS/2 ergänzt; finale Tests, gezielter Commit/Push und Remote-Verifikation.
- **Jarvis:** Implementierung in `js/pc-explorer.js`, `css/pc-explorer.css` sowie Regression in `tests/pc-explorer.test.js`; nach Terminus-Review Portraitkorrektur und Textkorrektur zur PCIe-Anordnung. Keine Git-Schreiboperationen.
- **C3PO:** `PC-EXPLORER-TESTANLEITUNG.md` auf Grafikbranch/ZIP aktualisiert und Quellen-/Einordnungsnotiz erstellt. Terminus ergänzte anschließend ASUS-Beleg und aktuellen 320-px-Hinweis.
- **GLaDOS:** unabhängige Prüfung des nachgebesserten Stands; Ergebnis steht in `2026-11-03_glados-pc-explorer-atx-io-qa.md`, separat vom Implementierungsbericht.

Restkontingente konnten in den verfügbaren Stationsdiagnosen/-einstellungen nicht belastbar ausgelesen werden. Die tatsächlichen Jarvis-/QA-/Dokumentationsläufe waren erreichbar. Keine Modellaufrufe allein zum Quota-Test, keine Änderung der Providerkonfiguration und keine kostenpflichtigen API-Fallbacks.

## Umgesetzter Umfang

- Mainboard-Draufsicht: Full-Size-ATX-Proportion **244 mm Breite × 305 mm Höhe**, SVG-Umriss 305 × 381,25 Einheiten bei Maßstab 1,25. I/O links, CPU-Sockel oben, DIMM rechts vertikal, EPS oben links, ATX24 rechts, M.2 unterhalb Sockel, PCIe darunter, SATA unten rechts und Header am unteren Rand. Modellabhängiges Beispiel, keine vermessene Herstellerzeichnung.
- Sockel, VRM-Drosseln/Kühlkörper, Chipsatzkühler, Batterie, Schraubpunkte und RAM-Details ergänzt; keine erfundenen funktionalen Leiterbahnverbindungen.
- Nummerierte Marken mit separater Legende statt kreuzender Beschriftungslinien. Interaktive IDs und Auswahlwege bleiben bestehen.
- Rückseite mit differenzierten Buchsenformen für USB-A, USB-C, HDMI, DisplayPort, RJ45, Audio, PS/2 und WLAN. Grafikkartenausgänge bleiben klar getrennt. USB-Standardnamen bleiben ausdrücklich Plaketten, keine erfundenen Buchsen.
- Audio-/PS/2-Farben als konkretes ASUS-Herstellerbeispiel erklärt, nicht als universelle Norm. Audio-Umschaltung im Mehrkanalbetrieb erwähnt. USB-Farbe und Steckerform garantieren weder Standard noch Leistung.
- Desktop-/Notebook-Daten und Zeichnungen nicht umgebaut; gemeinsame Anschluss-Hilfsfunktionen können auch historische Anschlussansichten betreffen und wurden entsprechend mitgeprüft.

## Eigene Verifikation Terminus

Nach letzter Produktcodeänderung ausgeführt:

1. `node --check js/pc-explorer.js`: bestanden.
2. `node tests/pc-explorer.test.js`: bestanden, einschließlich ATX-Orientierung, Bauteile innerhalb Platine/keine Layoutüberschneidungen, Lageprüfungen und Farbtexte.
3. Alle `tests/*.test.js` einzeln mit Fehlerzählung ausgeführt: **65 Dateien, 0 fehlgeschlagen**. Dies sind Node-Tests, keine 65 Browsertests. Keine unbestätigte Erinnerung an frühere Branding-Fehler übernommen.
4. `git diff --check`: bestanden.
5. Cachefreie echte Headless-Chrome-Prüfung über CDP: fünf Ansichten (Desktop, Notebook, Rückseite, Mainboard, historisch) bei 1440 und 320 CSS-Pixeln; **98 grafische Auswahlwege**, Detailinhalt und `aria-pressed` plus Enter geprüft. Home/End der Liste und Kühlung an/aus in Desktop/Notebook geprüft. Kein horizontaler Seitenüberlauf, keine Runtime-Exceptions.
6. Screenshots Mainboard (1440/320) und Rückseite (1440) persönlich gesichtet: korrigierte Hochformatkontur, erkennbare Buchsen und getrennte Legende. Rohbelege/Prüfskript in Terminus-Workspace unter `pruefung/`; nicht als Altdateien in `vorschau/` überschrieben.
7. Diff-Review: Änderungen auf SVG/CSS, statische Erläuterungen/Quelle, Regression und Dokumentation begrenzt. Keine neuen Bibliotheken, Secrets, API-Zugänge, Netzwerkaktionen im Anwendungscode, Server- oder Deploymentkonfigurationen.

Der dedizierte lokale Browseraufruf lehnte die Serverzuordnung ab (`local test URL is not proven to belong to this agent's running background server`). Deshalb wurde ein eigener temporärer Chrome über Shell/CDP benutzt; keine fremden Profile/Prozesse verändert und keine Arbeitsplatzsperre umgangen.

## Bekannte Grenzen

- Bei 320 px ist das Diagramm nur Übersicht: Legende/nummerierte Marken unter 600 px ausgeblendet, winzige Maß-/Dekorationstexte nicht als lesbarer Detailinhalt geeignet. Bauteilliste und ausführliche Texte sind die verfügbare Alternative. Nicht als vollständige Behebung der grafischen Mobil-Lesbarkeit ausgeben.
- Keine unabhängige Hardware-Fachfreigabe, kein vollständiger Norm-/Pinout-Abgleich. Vereinfachte Buchsen, keine exakte technische Maßzeichnung.
- Kein realer Windows-/Edge-, Firefox-/Safari-, Touchgeräte- oder Screenreader-Lauf durch Terminus. Windows-Startdatei unverändert, nicht unter Windows ausgeführt.
- Eigene Enter-Prüfung nutzt synthetische KeyboardEvents; echte Browser-Keycodes und weitere Interaktionsprüfungen sind dem unabhängigen QA-Bericht zu entnehmen, nur soweit tatsächlich durchgeführt.

## Download

[Feature-Branch](https://github.com/DesoWorks/IT-Ausbildung/tree/feature/pc-explorer-grafik-2026-11-02)

[Feature-Branch als ZIP](https://github.com/DesoWorks/IT-Ausbildung/archive/refs/heads/feature/pc-explorer-grafik-2026-11-02.zip)

Nach Entpacken `start-pc-explorer.bat` oder `module/pc-explorer.html` öffnen. Dieser Bericht beschreibt die Änderungen, nicht eine Veröffentlichung auf GitHub Pages. Commit-ID und nachgewiesener Pushstatus werden nach Gitabschluss im Abschluss an den Commander genannt; die eigene Commit-ID wird nicht zirkulär in diese Datei geschrieben.

## Unabhängiges QA-Ergebnis

GLaDOS hat den finalen Produktstand im frischen Chrome über CDP unabhängig geprüft und im vereinbarten Umfang keine reproduzierbaren Bedienfehler gefunden. Alle 49 Listen-/Grafikzuordnungen, fünf Ansichten, Desktop-Tastaturbedienung und Desktop-Kühlung geprüft; Mainboard-Proportion und mobile Alternativbedienung bestätigt. Grenzen: Notebook-Kühlung nicht gleich tief visuell geprüft (Terminus prüfte den Toggle funktional), nicht jede Pfeiltaste einzeln, Fotopixel der PGA/LGA/BGA-Bilder nicht visuell bestätigt, nur DOM-/Alttexte und statische Datei-/Lizenzprüfungen. Kein Beleg für Hashpersistenz; Reload startet Desktop. Details und eigene Beobachtungen im unabhängigen QA-Bericht. Damit liegt eine technische Prüfung für den Feature-Teststand vor, keine vollständige fachliche oder plattformübergreifende Abnahme.
