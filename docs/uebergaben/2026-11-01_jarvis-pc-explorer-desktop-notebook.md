# Übergabe: PC-Explorer Desktop und Notebook

Datum: 01.11.2026 · Agent: JARVIS · Worktree: `/home/starnet/projects/IT-Ausbildung-pc`
Branch: `feature/pc-explorer-2026-11-01` (Basis 7939c32). Kein `git add`, kein Commit, kein Push, kein Merge, kein Rebase.

## Geändert
- `js/pc-explorer.js`: Daten und Darstellung erweitert.
- `css/pc-explorer.css`: Stile für Gehäuse/Mainboard als Hintergrund, Detailliste, „Mehr dazu“.
- `module/pc-explorer.html`: Ansichtsschalter `#pe-ansichten`, Überschrift und Einleitung dynamisch.
- `tests/pc-explorer.test.js`: erweitert, nichts abgeschwächt.
- neu: diese Übergabe.

Nicht angefasst: index.html, module-daten.js, glossar-daten.js, andere Module, Inhalts-JSON, Terminus-Spec, Serverplan, Katalog, die fünf Werkzeuge.

## Umgesetzt
- `DATEN.ansichten.desktop` und `.notebook`; `DATEN.ansichten.server = null`, kein Server-Button. Aliase `teile`, `sockel`, `formen`, `quellen` bleiben (Referenzen auf die Desktop-Daten).
- Desktop-IDs: cpu, cool, ram, gpu, ssd, hdd, psu, board, gehaeuse. Neu: `gehaeuse` (Liste und SVG). `board` ist als `pe-teil` anklickbar.
- Zeichenreihenfolge: Gehäuse, dann Mainboard, dann übrige Teile (`zeichenReihenfolge`). Hintergrundflächen liegen unten und fangen keine Klicks auf obere Teile ab.
- Notebook-IDs: board, cpu, cool, ram, gpu, ssd, akku, netzteil, gehaeuse. Das ist eine neunte ID (`netzteil`), weil die Spec es nennt; kurzer Lerntext ohne Wattzahlen. GPU und Netzteil sind als modellabhängig formuliert.
- Detailansicht: Funktion, Einbauort, Zusammenarbeit, Bauformen und Unterschiede, Praxisbeispiel, Merksatz. Fakt und Quellenlinks in `<details>` „Mehr dazu“.
- Ansichtswechsel: Buttons mit `aria-pressed`, leeren SVG, Liste und Detail und bauen neu auf. Start: Desktop, CPU ausgewählt. CPU-Bauformen und Formfaktoren erscheinen nur in der Desktop-Ansicht (Abschnitte werden im Notebook versteckt).
- Glossarlink nur, wenn `window.GLOSSAR` den Begriff enthält. Die Begriffe CPU, RAM, GPU u. a. fehlen aktuell im Glossar, daher erscheinen für sie keine Links. `glossar-daten.js` wurde nicht geändert.
- CAMM2-Text wortgleich zur Vorgabe (Notebook-RAM, „Mehr dazu“), mit JESD318 und „nicht austauschbar“.
- Keine neuen Maße, Wattzahlen, Pinzahlen oder Steckerhöhen. Die schon belegten Formfaktor-Maße (ATX, microATX, Mini-ITX) bleiben.
- Wikipedia-Quellen sind als „vorläufig, keine Norm“ markiert.

## Prüfung
- `node --check js/pc-explorer.js` und `node --check tests/pc-explorer.test.js`: ohne Fehler.
- `node tests/pc-explorer.test.js`: „alle Prüfungen bestanden“, Exit 0. Ein erster Lauf scheiterte an der SVG-Namespace-Kennung `http://www.w3.org/2000/svg` in der Offline-Prüfung. Das ist keine Netzabfrage; die Prüfung nimmt sie jetzt gezielt aus.
- `git diff --check`: sauber.
- Die Tests prüfen Daten, HTML-Struktur und Textregeln. Sie führen die Darstellung nicht im Browser aus.

## Nicht geprüft / offen
- Keine Browserprüfung: Ansichtswechsel, Fokus nach dem Wechsel, Tastaturbedienung, Klick auf Gehäuse und Mainboard in der echten Seite, Darstellung auf kleinen Bildschirmen und im Dunkelmodus. GLaDOS sollte das im Browser prüfen.
- Fachliche Prüfung der Texte steht aus. Der vollständige JESD318-Standardtext wurde nicht geöffnet.
- Glossarbegriffe CPU, RAM, GPU u. a. fehlen in `glossar-daten.js` (nicht in meinem Auftrag).
- Server-Ansicht: nicht implementiert, nur Daten-Slot `null`.
- Keine Katalog- oder Startseitenintegration; Modul bleibt unverbunden.

## Test erneut ausführen
`cd /home/starnet/projects/IT-Ausbildung-pc && node tests/pc-explorer.test.js`
