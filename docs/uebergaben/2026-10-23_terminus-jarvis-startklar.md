# BWL-Werkstatt – Startklar-Übergabe für Jarvis

**Stand geprüft:** 23.10.2026 · **Projekt:** `/home/starnet/projects/IT-Ausbildung` · **Nur Bestandsaufnahme; kein Code geändert.**

## 1. Tatsächlicher Projektstand

- Branch: `prototype/computer-grundlagen`; HEAD: `e3b9e024cb445c948fcfc59646d76e4c2b169020`; Tracking laut Status `origin/prototype/computer-grundlagen`.
- Worktree ist nicht sauber. Bereits geänderte, getrackte Dateien: `/home/starnet/projects/IT-Ausbildung/js/module-daten.js` und `/home/starnet/projects/IT-Ausbildung/tests/startseite.test.js`. Diese Änderungen katalogisieren die BWL-Werkstatt und testen ihre Startseitenverfügbarkeit. Nicht überschreiben.
- BWL-Arbeitsstand liegt lokal und unversioniert vor: `/home/starnet/projects/IT-Ausbildung/module/bwl-werkstatt.html`, `/home/starnet/projects/IT-Ausbildung/js/bwl-werkstatt.js`, `/home/starnet/projects/IT-Ausbildung/css/bwl-werkstatt.css`, `/home/starnet/projects/IT-Ausbildung/tests/bwl-werkstatt.test.js`. Auch `/home/starnet/projects/IT-Ausbildung/docs/rahmenlehrplan-abgleich.md` und mehrere Übergaben sind unversioniert.
- `package.json` ist im Projektstamm nicht vorhanden; README nennt direkte Node-Testaufrufe. Keine Git-Mutation ausgeführt. Neue Zieldatei war vor dem Schreiben nicht vorhanden.

## 2. Relevante Dateien und Integrationspunkte

- **Seitenstruktur und Modus-Umschaltung:** `/home/starnet/projects/IT-Ausbildung/module/bwl-werkstatt.html`. In der Überschrift „Rechnung wählen“ und vor `#bwl-tabs` passt eine separate Moduswahl (Freier Rechner/Lernmodus), ohne die vorhandenen vier Rechnungstabs dafür umzuwidmen. Bestehendes Formular `#bwl-form`, Ergebnis `#bwl-ergebnis` und Fehlerregion `#bwl-fehler` beibehalten. Aktuell gibt es nur den freien Rechner; keine Lernmoduswahl/-ansicht.
- **UI-Verhalten:** `/home/starnet/projects/IT-Ausbildung/js/bwl-werkstatt.js`, IIFE und Initialisierung am Dateiende. `calculate()` dispatcht nach aktivem `[data-rechner]`; dort können die Lernaufgaben dieselben Kernfunktionen aufrufen. `activePanel()`, `readPositions()`, `show()`/`showError()`, `clearResult()` und `setPanel()` sind die naheliegenden Anschlussstellen. Den Modus-/Aufgaben-/Schrittzustand in UI-Logik halten; keine parallelen Formeln hinzufügen.
- **Berechnungskern:** dieselbe Datei exportiert `window.BWL_WERKSTATT` und CommonJS. API: `angebot(input)`, `gewinn(input)`, `rabatt(input)`, `steuer(input)`, Parser `money`/`qty`/`rate`, Format `fmt`, Rundung `percentFein`/`percent`, Referenz `lf2Referenz()`. Angebotsresultat liefert Centwerte `positionssumme`, `handlungskosten`, `selbstkosten`, `gewinn`, `netto` plus `steps`. `angebot()` akzeptiert Positionen `{menge, einzelpreis}`; leer gelassene Zeilen werden ignoriert, halbe Eingaben abgelehnt. Artikelbezeichnungen sind derzeit weder Eingabefelder noch Teil des Kernresultats; sie können als UI-Metadaten neben den vorhandenen Mengen/Preisen geführt werden.
- **Vorhandene Lerninhalte:** `/home/starnet/projects/IT-Ausbildung/js/lf2-angebot.js` enthält `ITEMS`, `QUESTIONS`, `evaluate()`, `progress()`, `progressText()` und `calc()` für eine andere, vorhandene LF2-Lektion. Das belegt vorhandene Muster für strukturierte Aufgaben/Feedback/Fortschritt, ist aber ein eigenständiges Modell mit eigener Rechnung und Speicherung. Für die Werkstatt-Aufgaben besser deren Inhalte übernehmen und ihre Antworten gegen `BWL_WERKSTATT` validieren; LF2-Datei nicht als zweiten Werkstatt-Rechenkern importieren oder verändern.
- **Katalog:** `/home/starnet/projects/IT-Ausbildung/js/module-daten.js` enthält bereits die lokal geänderte Werkzeugregistrierung. Änderungen dort sind außerhalb des eigentlichen Lernmodusumfangs und müssen die vorhandene Änderung erhalten.
- **CSS:** `/home/starnet/projects/IT-Ausbildung/css/bwl-werkstatt.css` enthält Fokusstil, Positionenlayout und Breakpoint bei 640 px; für neue Modus-/Aufgabenbereiche gezielt erweitern.

## 3. Übergaben abgeglichen: Funktionen, Aufgaben, Unklarheiten

Gelesen: `/home/starnet/projects/IT-Ausbildung/docs/uebergaben/2026-10-23_terminus-bwl-technik.md`, `/home/starnet/projects/IT-Ausbildung/docs/uebergaben/2026-10-23_c3po-bwl-lernaufgaben.md`, `/home/starnet/projects/IT-Ausbildung/docs/uebergaben/2026-10-23_c3po-bwl-lernaufgaben-lrs.md` und `/home/starnet/projects/IT-Ausbildung/docs/uebergaben/2026-10-23_glados-bwl-testplan.md`.

- **Kein sachlicher Rechenwiderspruch in den drei Entwürfen:** Aufgaben 1/2 rechnen Handlungskosten auf Positionssumme, Selbstkosten als Summe und Gewinn auf Selbstkosten; Aufgabe 3 zieht Prozent-Rabatt vom Warenwert ab. LRS-Fassung übernimmt dieselben Werte und Rechenwege. Beide C3PO-Dokumente kennzeichnen die Aufgaben ausdrücklich als fachlich ungeprüfte Entwürfe, nicht freigegeben.
- **Referenz Aufgabe 1 eindeutig und testbar:** Positionssumme 2.850,00 €, Handlungskosten 199,50 €, Selbstkosten 3.049,50 €, Gewinn 152,48 € (3.049,50 × 5 % = 152,475 €, kaufmännisch gerundet), Nettoangebotspreis 3.201,98 €. Entspricht `lf2Referenz()` und den vorhandenen Tests.
- **Aufgabe 2:** 4×55,00 + 2×18,50 + 1×12,00 = 269,00 €; 6 % = 16,14 €; Selbstkosten 285,14 €; 8 % Gewinn = 22,81 €; netto 307,95 €. Die Versandposition ist eine einmalige Menge 1, nicht mit Stunden/Adaptern multiplizieren.
- **Aufgabe 3:** 5×84,00 = 420,00 €; 10 % Rabatt = 42,00 €; nach Rabatt 378,00 €. Kernfunktion `rabatt({basis, art:"prozent", satz})` passt direkt.
- **Dreischritt-Vorgabe kollidiert redaktionell mit Aufgabenentwürfen:** Technikpapier verlangt genau drei nummerierte Schritte je Lernaufgabe, während die beiden Angebotsaufgaben jeweils fünf Ergebniswerte abfragen und die LRS-Rechenwege 6 bzw. 8 kleinschrittige Rechenschritte ausweisen. Das muss als drei Lernphasen gebündelt werden (Positionen übertragen; Handlungskosten/Selbstkosten; Gewinn/Nettoangebotspreis), nicht die Rechenschritte/Endwerte weglassen. Aufgabe 3 hat ohnehin drei natürliche Schritte (Warenwert, Rabatt, Ergebnis); dort fachgerecht anpassen.
- **Aufgaben 1 und 2** lassen sich ohne Kernänderung mit `angebot()` abbilden. Für Schrittvalidierung nach Berechnung das passende Ergebnisfeld (`positionssumme`, `handlungskosten`, `selbstkosten`, `gewinn`, `netto`) gegen Lernantworten prüfen. Aufgabe 1 nutzt den Referenzfall; Aufgabe 2 eigene Eingaben. **Aufgabe 3** direkt mit `rabatt()` abbilden. Keine der Lernantworten benötigt eine neue fachliche Formel.
- Technikpapier lässt offen, ob weitere Modi-/Rechnungsarten in den Lernmodus kommen. Sinnvoller Umfang gemäß Papier: zuerst nur die drei vorliegenden Aufgaben (zwei Angebot, eine Rabatt); keine ungeprüften Gewinn-/Steueraufgaben erfinden.
- Der GLaDOS-Text ist ausdrücklich Testplan, keine ausgeführte QA. Browser-/Screenreader- und fachliche Freigabe sind noch offen.

## 4. Bestehende Tests, Abdeckung und Ergebnisse

Gezielt ausgeführt, keine Reparaturen:

`cd /home/starnet/projects/IT-Ausbildung && node --test tests/bwl-werkstatt.test.js tests/lf2-angebot.test.js tests/lf2-angebote.test.js`

**Ergebnis:** Exit 0; 3 Subtests bestanden, 0 fehlgeschlagen. Im Einzelnen:

- `node --test tests/bwl-werkstatt.test.js tests/lf2-angebot.test.js tests/lf2-angebote.test.js` – `tests/bwl-werkstatt.test.js` bestanden: Rechenkern-Referenz/Rundung/Eingabevalidierung/Angebot/Gewinn/Rabatt/Steuer, HTML/CSS-/Katalog-/A11y-Struktur per Assertion.
- Derselbe tatsächliche Gesamtbefehl – `tests/lf2-angebot.test.js` bestanden: vorhandene LF2.8-Angebotsrechnung, Lernfragen/Fortschritt, Seite/Katalog/Glossar.
- Derselbe tatsächliche Gesamtbefehl – `tests/lf2-angebote.test.js` bestanden: Angebotsvergleichslektion und Lern-/Fortschrittsprüfungen.

Diese Tests sind Node-/Assertiontests; sie beweisen keine Browserbedienung oder fachliche Freigabe. Kein vorhandener Fehler trat in diesen drei Tests auf. Neue Lernmodusfunktionen existieren noch nicht, also auch kein neues Laufzeitproblem aus Ausführung beobachtet. Die Tests decken den neuen Modus, Zustandswechsel, Antwortsequenz, Tabelle und Lern-Feedback noch nicht ab. Unverändert grün halten: vor allem `tests/bwl-werkstatt.test.js` und beide LF2-Angebotstests; zusätzlich den durch Katalogänderung betroffenen `tests/startseite.test.js` beim Entwicklungsabschluss ausführen.

## 5. Empfohlene Implementierungsreihenfolge

1. Vor dem Editieren nochmals gemeinsamen Worktree prüfen; vorhandene Änderungen und unversionierte Dateien ausdrücklich erhalten. Aufgaben als drei Phasen strukturieren, Referenzwerte aus Aufgabenentwürfen übernehmen und fachlich ungeprüften Status kenntlich lassen.
2. In `module/bwl-werkstatt.html` Modusauswahl und zugängliche Bereiche ergänzen. Im Angebotsformular pro Position optionales Label-Feld ergänzen; Recheninputs erhalten und sechs Zeilen als MVP-Grenze darstellen. Für Ergebnis-Ausgabe Artikel/Menge/Einzelpreis/Positionsbetrag plus separate Summen strukturiert/tabellarisch aus vorhandenen Kernresultaten darstellen.
3. In `js/bwl-werkstatt.js` Moduszustand und drei Aufgaben-/Schrittzustände ergänzen; `calculate()`/Kern-API als einzige Rechenquelle verwenden, Rückmeldungen mit vorhandenen Fehler-/Statusregionen zugänglich ausgeben; Moduswechsel bewahrt Eingaben, Ergebnis und Lernfortschritt. Aufgabenantworten gegen Kernresultate prüfen, falsche Antwort darf erneuten Versuch erlauben.
4. `css/bwl-werkstatt.css` gezielt für neue Ansichten, Tabelle und schmale Displays ergänzen; Labels/Fokus/ARIA-Zustände und vorhandene Tabs-Tastaturbedienung erhalten.
5. Bestehende Tests ausführen, dann neue Assertions für Modus-/Schrittlogik und Aufgabenwerte ergänzen; danach Browser-/Tastatur-/schmale Ansicht nach GLaDOS-Testplan prüfen. Fachliche Freigabe und Screenreaderprüfung separat offenhalten.

## 6. Risiken, Konflikte und offene Punkte

- **Konfliktbereich:** Worktree-Änderungen betreffen Katalog und Startseitentest; BWL-Implementierungsdateien sind lokal unversioniert. Diese Dateien sind gemeinsamer Arbeitsstand, nicht frei überschreibbare neue Dateien. Vor Änderung `git status` erneut prüfen.
- Die Technikvorgabe „genau drei Schritte“ und die ausführlichen Mehrschritt-Musterlösungen brauchen Zusammenfassung in drei Lernphasen; sicherstellen, dass alle gefragten Zwischenwerte trotzdem geübt/angezeigt werden.
- Aufgaben und Musterlösungen sind fiktiv, aber fachlich nicht freigegeben. Nicht als verbindliche BWL-/Rechts-/Steueraussage präsentieren.
- Rechenkern nicht ändern: Ganz-Cent-Logik, kaufmännische Rundung, Dezimalkomma, Mengenpräzision, Prozentgrenze und Positionsrundung erhalten. LF2-Referenzwerte exakt halten.
- Fehlende Funktion am aktuellen Stand: Modusumschaltung, Lernaufgaben-/Antwort-Workflow, Lernfortschritt, Artikelnamen und semantische Artikeltabelle. Vorhanden: vier freie Rechnungsarten, UI-Tabs, Kernberechnungen/Validierungen, Beispiel-/Leeren-Buttons, Fehler- und Ergebnisregionen sowie unabhängige LF2-Lernmuster.
- Offene fachliche Frage ist keine Blockade für technische Erstumsetzung, sofern Aufgaben deutlich als Entwürfe ausgewiesen bleiben. Bei späterer fachlicher Freigabe Aufgabenwerte/Feedback erneut prüfen.

## 7. Jarvis: konkrete erste drei Arbeitsschritte

1. `git status --short --branch` und `git diff -- js/module-daten.js tests/startseite.test.js` lesen; unversionierte BWL-Dateien unverändert als gemeinsamen Stand behandeln.
2. `module/bwl-werkstatt.html`, `js/bwl-werkstatt.js`, `tests/bwl-werkstatt.test.js` sowie die beiden C3PO-Aufgabenentwürfe lesen; die drei Phasen und Sollwerte festlegen, ohne den Rechenkern anzutasten.
3. Moduswahl und drei Angebots-/Rabatt-Lernaufgaben in der bestehenden Werkstatt ergänzen; beide Modi über `window.BWL_WERKSTATT` rechnen lassen und die vorhandenen Tests vor/nach den UI-Änderungen grün halten.
