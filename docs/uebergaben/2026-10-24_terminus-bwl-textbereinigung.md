# BWL-Werkstatt: Bereinigung sichtbarer Entwicklungstexte

**Datum:** 24.10.2026  
**Änderungsumfang:** Nur Hilfetexte zur Angebotspositionen-Begrenzung und veraltete Quellkommentare/Testannahme. Keine Änderungen an Berechnungen, Aufgaben oder Funktionslogik.

## Änderungen

- `module/bwl-werkstatt.html`: Erklärtext unter dem Tab-Angebot von MVP-/Paket-/Erstfassungsbezug befreit. Fachlich erforderliche Erklärung zu leeren Zeilen, Mengen/Einzelpreisen und Zuschlagsbasen bleibt erhalten. Der Hinweis lautet nun „Du kannst bis zu 6 Artikel hinzufügen.“
- `module/bwl-werkstatt.html`: Der bei sechs Positionen eingeblendete Hinweis verwendet denselben kurzen Wortlaut.
- `js/bwl-werkstatt.js`: Veraltete interne Paket-/MVP-Kommentare bereinigt. Die Begrenzung auf sechs Positionen und die Verhaltenslogik bleiben unverändert; beim Versuch, über sechs hinauszugehen, wird derselbe kurze Hinweis ausgegeben. „Paket“ im Beispiel „Wartungspaket“ bleibt erhalten, da es einen fachlichen Gegenstand der Lernaufgabe bezeichnet.
- `tests/bwl-werkstatt.test.js`: Die alte Assertion auf die sichtbare MVP-Erklärung durch eine Assertion auf den verlangten kurzen Hinweis ersetzt.

## Prüfung

- `node tests/bwl-lernmodus.test.js` — bestanden.
- `node tests/bwl-positionen.test.js` — bestanden; einschließlich `MAX_POSITIONEN === 6`, Begrenzung auch nach vielen Klicks, genau sechs Artikelzeilen und ausgeblendeter Anfangspositionen.
- `node tests/bwl-werkstatt.test.js` — bestanden nach Aktualisierung der veralteten Text-Assertion.
- Sichtbare Lernoberfläche und Werkstattcode nach `MVP`, `erste Fassung` und `Paket` durchsucht: Entwicklungsformulierungen entfernt; „Wartungspaket“ ist fachlicher Aufgabeninhalt und bleibt stehen.
- Keine Berechnungs- oder Lernaufgabenlogik geändert. Kein Commit und kein Deployment.

## Hinweis zum Arbeitsbaum

Der Checkout `prototype/computer-grundlagen` enthält bereits vor dieser Änderung andere uncommittete und neue Arbeiten. Diese wurden nicht verändert. Die BWL-Werkstatt-Dateien selbst waren ebenfalls bereits unversioniert; die zugehörigen Dateien sind in diesem Checkout nicht als getrackter Git-Diff darstellbar. Die oben genannten Tests prüfen den aktuellen gemeinsamen Stand.