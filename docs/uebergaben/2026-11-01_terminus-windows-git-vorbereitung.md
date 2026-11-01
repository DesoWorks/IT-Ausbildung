# Windows-Werkzeugkiste – Integrationsprüfung und Git-Vorbereitung

Stand: 01.11.2026 · TERMINUS · Übergabe an Rick

## Auftrag und Grenze

Lesende Prüfung in `/home/starnet/projects/IT-Ausbildung-werkzeugkiste`; einzige Schreibausnahme ist diese ausdrücklich angeforderte Übergabedatei. Keine Implementierungsdatei geändert. Anderer Checkout unangetastet. Kein Commit, Push, Merge, Branchwechsel, Stash, Fetch, Deployment oder Anlegen von `dev` durchgeführt.

## Ergebnis der Daten- und Integrationsprüfung

**Beide neuen Karten sind vollständig integriert. Keiner der drei älteren Commits ist technisch für die Windows-Werkzeugkiste erforderlich.**

- `docs/inhalte/windows-werkzeugkiste.json` und die eingebetteten Rohdaten in `js/windows-werkzeugkiste-daten.js` enthalten `gpedit-msc` und `msconfig`. Ein Node-/VM-Abgleich bestätigt für beide Karten identische vollständige Rohobjekte, nicht nur gleiche IDs. Die VM-Instrumentierung erfolgte ausschließlich im Arbeitsspeicher.
- gpedit: Befehl, Funktion, Ausbildungsbeispiel, normalerweise fehlende Verfügbarkeit unter Windows 11 Home und Verbot einer Änderung ohne konkreten Auftrag sind enthalten.
- msconfig: Befehl, Funktion, Ausbildungsbeispiel, Verfügbarkeit unter Windows 11, abgesicherter Modus sowie Fortwirkung der Option „Abgesicherter Start“ bei weiteren Neustarts bis zur Deaktivierung sind enthalten. Keine automatische Ausführung und keine Schrittfolge zur Systemänderung.
- `PFLICHT_KARTEN` in `js/windows-werkzeugkiste.js` führt beide IDs als `befehl`. Insgesamt: 16 Karten, davon sieben Tastenkombinationen und neun Befehle; neun Übungen und zwölf Quizfragen. Neue Übungen `uebung-8`/`uebung-9` und Quizfragen `quiz-11`/`quiz-12` verweisen auf die richtigen Karten.
- Der vorhandene neue Katalogeintrag in `js/module-daten.js` verweist auf `module/windows-werkzeugkiste.html`. Die zwei zusätzlichen Karten brauchen **keine weitere Katalogzeile**, weder im Modulkatalog noch auf der Startseite. Der bestehende Startseitenrenderer übernimmt Werkzeuge aus `MODULE_TOOLS`.
- Die Moduldatei bindet `navigation.js` ein, verwendet aber keine durch den Scrollpositions-Fix neu eingeführte Schnittstelle. Alle bestehenden Plattformskripte, Styles und Bildressourcen, auf die das Modul verweist, sind bereits auf `e3b9e02` vorhanden; nur die eigenen neuen Werkzeugkisten-Dateien müssen ergänzt werden.

## Ausgeführte Prüfungen

- `node tests/windows-werkzeugkiste.test.js`: **18 Prüfungen bestanden**; Datenvalidierung, Normalisierung gegenüber Fachquelle, Referenzen, Bewertung, Wiederholung, HTML-/CSS-/Sicherheitsmerkmale.
- `node tests/startseite.test.js`: **alle Prüfungen bestanden** auf dem jetzigen Worktree einschließlich BWL. Das ist kein Nachweis für den unveränderten Test auf einer BWL-freien Basis.
- Zusätzlicher Node-/VM-Abgleich: beide Rohkarten vollständig identisch; alle vorhandenen Plattformressourcen auf `e3b9e02` nachgewiesen; dort drei Werkzeuge im Katalog bestätigt.
- `git diff --check`: bestanden.
- Git-Historie, gezielte Commit-Diffs, Status, lokale und Remote-Tracking-Branches sowie aktuelle Server-Branchliste mit `git ls-remote --heads origin` gelesen.

Keine Browser- oder Windows-Sichtprüfung in diesem Teilauftrag; unabhängige Gesamt-QA und erneute Commander-Sichtprüfung bleiben getrennte Abnahmeschritte. Der im Leitkontext bereits dokumentierte `patch --dry-run` wurde nicht wiederholt und wird nicht als eigener Test ausgegeben.

## Git-Zustand

- Branch: `feature/windows-werkzeugkiste`.
- HEAD: `ba62939eb87f2cbc0d5200e02b6ad565a0a01fe2`.
- `origin/prototype/computer-grundlagen`: `e3b9e024cb445c948fcfc59646d76e4c2b169020`; laut Leitkontext öffentlicher Seiten-Branch, Server-Ref in diesem Lauf bestätigt.
- `origin/main`: `6e6217778ea7148fc02c142b39072a2f573ce8ba`, nur `Initial commit`.
- **Kein `dev`**, weder als lokaler Branch noch in Remote-Tracking-Refs noch in der abgefragten aktuellen Branchliste auf origin.
- Drei getrackte, nicht committete Änderungen: `js/module-daten.js`, `js/startseite.js`, `tests/startseite.test.js`.
- Ungetrackt: die neuen Werkzeugkisten-Dateien (`css/windows-werkzeugkiste.css`, beide Werkzeugkisten-JS-Dateien, Modul-HTML und Modultest), `docs/inhalte/` sowie mehrere bestehende Windows-Übergaben. Diese Übergabe kommt als einzige eigene Datei hinzu. Bestehende Änderungen wurden nicht aufgenommen, verschoben oder überschrieben.

## Die drei älteren Commits

| Commit | Tatsächlicher Inhalt | Für Werkzeugkiste erforderlich? |
| --- | --- | --- |
| `17fd7fd919aac0dd27e23c85092989bec2af14f3` | BWL-Reviewstand: 21 Dateien, 2407 Einfügungen/2 Löschungen; BWL-HTML/CSS/JS, drei BWL-Tests, Rahmenlehrplan- und Übergabedokumente, Reviewhinweise; zusätzlicher BWL-Katalogeintrag und Startseitentest von drei auf vier Werkzeuge plus BWL-Assertions. | **Nein.** Die BWL-Kopplung liegt im aktuellen Startseitentest, nicht im Windows-Modul. Nicht übernehmen. |
| `2445309d6aaf54749de09cf569392807675de005` | Drei Dateien, 172 Einfügungen: Ergänzung in `js/navigation.js` für Speichern/Wiederherstellen der Navigationsscrollposition, Browser-Regressionstest und Übergabe. | **Nein.** Separater Navigationskomfort-Fix. Bestehende Navigation auf der empfohlenen Basis reicht für das Modul; keine Abhängigkeit von diesen neuen Funktionen. |
| `ba62939eb87f2cbc0d5200e02b6ad565a0a01fe2` | Drei Dateien, 157 Einfügungen/103 Löschungen: Ausbau des Navigations-Browsertests mit dynamischem Port, Cleanup, Aufblitz-Probe und sichtbarem Modus; optionales Portargument in `tests/cdp-helper.js`, Dokumentation. Keine Produktivcodeänderung. | **Nein.** Tests des separaten Scroll-Fixes, keine Voraussetzung für Werkzeugkisten-Code oder die ausgeführten Node-Tests. |

Der aktuelle HEAD enthält alle drei Commits als Vorfahren. `dev` einfach dort anzulegen würde sie bewusst oder unbewusst vollständig mit übernehmen. Das ist für diesen Auftrag nicht die saubere Auswahl.

## Branch-Entscheidung: ein Problem, drei Wege

**Problem:** Eine nachvollziehbare `dev`-Basis wählen, ohne fremde beziehungsweise separat zu entscheidende Entwicklung aus der jetzigen Historie mitzuführen.

- **A – Öffentlichen Stand `e3b9e024cb445c948fcfc59646d76e4c2b169020` wählen (empfohlen):** vorhandene Plattform bleibt erhalten; die drei älteren Commits sind nicht enthalten. Nachteil: Werkzeugkisten-Paket muss gezielt übertragen und der Startseitentest an die BWL-freie Basis angepasst werden.
- **B – Aktuellen HEAD `ba62939…` wählen:** geringster Übertragungsaufwand und aktuelle Tests unmittelbar nutzbar. Nachteil: übernimmt alle drei älteren Commits einschließlich nicht beauftragter BWL-Entwicklung; widerspricht der gewünschten Abgrenzung und wird nicht empfohlen.
- **C – `origin/main` (`6e62177…`) wählen:** formaler Neubeginn ab Initial Commit. Nachteil: praktisch gesamte heutige Plattform müsste neu ausgewählt und integriert werden; unnötig große Prüffläche für zwei zusätzliche Lernkarten.

### Empfehlung und spätere Umsetzung – nicht ausgeführt

**Option A:** `dev` erst nach Commander-Entscheidung vom exakt benannten öffentlichen Stand `e3b9e024cb445c948fcfc59646d76e4c2b169020` ableiten. Kein Merge des aktuellen Featurebranches und keine pauschale Übernahme seines gesamten Diffs oder seiner drei älteren Commits.

Danach in einem gesondert freigegebenen, isolierten Arbeitsbereich ausschließlich das Windows-Paket auswählen: Modul, eigenes CSS, Daten/Logik, Fachquelle, Modultest, einzelne Windows-Katalogzeile und generische Werkzeugsektion im Startseitenrenderer. Dokumente separat sichten und nur auftragszugehörige Übergaben auswählen. Keine BWL-, PC-Explorer- oder Vorlesen-Arbeiten als zusätzliches Paket mitnehmen; bereits in der bewusst gewählten Basis enthaltene Historie wird dadurch nicht rückwirkend bereinigt.

Der aktuelle Startseitentest ist **nicht unverändert übertragbar**: Auf der Basis sind drei Werkzeuge vorhanden, mit Windows-Werkzeugkiste sind es vier, nicht fünf. BWL-spezifische Assertions und die feste Fünfer-Erwartung müssen bei der späteren Übertragung entfallen beziehungsweise auf vier angepasst werden. Die generischen Rendererprüfungen und Windows-Zielprüfung bleiben erhalten. Der Leitkontext bestätigt dazu: Katalog-/Renderer-Patches lassen sich auf `e3b9e02` mit kleiner Unschärfe anwenden; der Testpatch nicht. Das ist eine Anpassungsaufgabe, kein technischer Grund, BWL einzubeziehen.

Danach das ausgewählte Gesamtpaket erneut prüfen: Modultest, angepasster Startseitentest, passende Navigation-/Plattformregressionen und Sichtprüfung. Zielkriterium: vier Werkzeuge auf dieser Basis, Windows-Modul vollständig bedienbar, die drei ausgeschlossenen Commit-IDs nicht als neue Vorfahren übernommen und keine zusätzlichen BWL-/PC-Explorer-/Vorlesen-Diffs. Erst dann lokale Git-Versionierung im ausdrücklich vereinbarten Umfang; Push, Merge und Veröffentlichung bleiben gesondert gesperrt.

## Offene Entscheidung beim Commander

Nach unabhängiger QA und erneuter Sichtprüfung entscheidet der Commander, ob `dev` tatsächlich auf `e3b9e02` eingerichtet und das abgegrenzte Windows-Paket darauf integriert werden soll. Die drei älteren Commits werden nicht stillschweigend übernommen. Ein eventuell später gewünschter Navigations-Scrollfix wäre ein eigener ausdrücklich auszuwählender und zu prüfender Auftrag.
