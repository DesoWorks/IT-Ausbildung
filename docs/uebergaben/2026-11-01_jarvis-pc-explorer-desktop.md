# Übergabe: PC-Explorer Desktop (Priorität A)

Datum: 01.11.2026 · Agent: JARVIS · Arbeitsordner: `/home/starnet/projects/IT-Ausbildung-pc`
Branch: `feature/pc-explorer-2026-11-01` auf `origin/dev` 909c5e2. Kein `git add`, kein Commit, kein Push.

## Ergebnis
Eigenständiges Modul, bewusst **nicht** in Katalog, Startseite oder `js/module-daten.js` eingehängt.
Der Prototyp (`prototype.html`) wurde als Struktur übernommen (Daten getrennt von Darstellung,
Rovingfokus, schematische Zeichnung), nicht kopiert. Notebook-Modus, Speicher-Vergleich und
CAMM2-Übung gehören nicht zu Priorität A und sind nicht enthalten.

Dateien:
- `module/pc-explorer.html`
- `js/pc-explorer.js`
- `css/pc-explorer.css`
- `tests/pc-explorer.test.js`
- `docs/uebergaben/2026-11-01_jarvis-pc-explorer-desktop.md`

Inhalt, jeweils mit Funktion, Einbauort und Zusammenarbeit, per Maus und Tastatur wählbar
(Tab in die Gruppe, Pfeiltasten, Home/End, Enter/Leertaste):
Prozessor, Kühlung, Arbeitsspeicher, Grafikkarte, SSD, Festplatte, Netzteil,
Mainboard und Verbindungen, CPU-Bauformen PGA/LGA/BGA, Formfaktoren ATX/microATX/Mini-ITX.
Die Zeichnung ist `aria-hidden`; die Bedienung läuft über die Buttonlisten.

## Prüfung
- `node --check js/pc-explorer.js`: Exit 0
- `node --check tests/pc-explorer.test.js`: Exit 0
- `node tests/pc-explorer.test.js`: Exit 0 ("alle Prüfungen bestanden")
- Zwei Testfehler unterwegs waren Testfehler (vm-Prototyp bei Array-Vergleich, zu strenge Namenslänge), nicht Datenfehler; beide behoben.

Der Test prüft Datenvollständigkeit, Quellenbindung, dass Zahlen mit Einheit nur bei den drei Formfaktoren stehen,
Tastaturlogik, Pflicht-IDs im HTML und dass das Modul nirgends eingehängt ist.

## Quellen (abgerufen 01.11.2026, sofern nicht anders vermerkt)
- CPU socket: https://en.wikipedia.org/wiki/CPU_socket (PGA/LGA, Sockel, Kühlerbefestigung, Notebooks mit Surface-Mount-CPU)
- Ball grid array: https://en.wikipedia.org/wiki/Ball_grid_array (Lötkugeln, dauerhafte Montage)
- Motherboard form factor: https://en.wikipedia.org/wiki/Motherboard_form_factor (Aufgaben des Mainboards, ATX löste 1995 AT ab)
- microATX: https://en.wikipedia.org/wiki/MicroATX (9,6 × 9,6 Zoll, Dezember 1997, ATX 12 × 9,6 Zoll, rückwärtskompatibel)
- Mini-ITX: https://en.wikipedia.org/wiki/Mini-ITX (170 × 170 mm, VIA, 2001, vier passende Löcher, ein Erweiterungsplatz)
- NVMe: https://nvmexpress.org/about/ (geprüft 22.10.2026 laut `quellen-pruefung.md`)
- CAMM2: https://www.jedec.org/news/pressreleases/jedec-publishes-new-camm2-memory-module-standard (geprüft 22.10.2026 laut `quellen-pruefung.md`)

## Einschränkungen und offene Punkte
- Die Quellen für Sockel und Formfaktoren sind Wikipedia, keine Normtexte (ATX-Spezifikation, Intel-Mini-ITX-Spezifikation nicht geöffnet).
  Für eine Fachfreigabe sollte ein Primärbeleg nachgezogen werden. Zwei Mini-ITX-Primärlinks im Wikipedia-Artikel sind als tot markiert.
- Die Texte zu Grafikkarte, Festplatte, Netzteil und die allgemeinen Erklärtexte sind Lerntext ohne Zahl und ohne Einzelquelle.
  Die Einbauorte "meist unten oder hinten" (Netzteil), M.2/SATA-Aussagen und "PCIe-Steckplatz" sind didaktische Vereinfachung, nicht belegt.
  SATA-Spezifikationsquelle fehlt weiterhin (siehe `quellen-pruefung.md`).
- Keine Browser- oder Tastaturprüfung im echten Browser durchgeführt, nur Node-Tests auf Daten und HTML-Struktur. Offen.
- Glossarlinks (`glossar.html?begriff=...`) sind nicht gegen `js/glossar-daten.js` abgeglichen; die Begriffe CPU, Kühlung, RAM, GPU, SSD, HDD, Netzteil, Mainboard müssten dort existieren. Offen.
- Keine Fachfreigabe.
