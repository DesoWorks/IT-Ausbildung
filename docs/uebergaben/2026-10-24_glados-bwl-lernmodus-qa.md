# QA-Bericht: BWL-Werkstatt inklusive Lernmodus

**Urteil: EINGESCHRÄNKT BESTANDEN**  
**Projekt:** `/home/starnet/projects/IT-Ausbildung`  
**Prüfdatum:** 24.10.2026  
**Geprüfter Stand:** Branch `prototype/computer-grundlagen`, HEAD `e3b9e02` (`Lernzielkontrollen vereinheitlichen und Abschlussseiten entfernen.`); Änderungen im Arbeitsbaum uncommittet.  
**Browserumgebung:** automatisierte, headless Chromium-Testseite, lokal unter `http://127.0.0.1:8080/module/bwl-werkstatt.html`; Server aus `start.sh` gestartet und nach dem Test beendet.

Das Urteil ist eingeschränkt, weil die automatisierten Node-Prüfungen und ein Teil der Browseroberfläche geprüft wurden, aber der vollständige browsergestützte Durchlauf aller neun Lernschritte sowie eine belastbare reine Tastatur- und Screenreader-Abnahme nicht abgeschlossen werden konnten. Daraus folgt weder ein bestätigter Produktfehler noch ein Nachweis vollständiger Bedienbarkeit.

## 1. Bestand und Prüfbasis

Zuerst gelesen wurden die drei vorgegebenen Übergaben:

- `docs/uebergaben/2026-10-24_jarvis-bwl-lernmodus-implementierung.md`
- `docs/uebergaben/2026-10-23_glados-bwl-testplan.md`
- `docs/uebergaben/2026-10-23_c3po-bwl-lernaufgaben-lrs.md`

Git-Ausgangslage: Branch `prototype/computer-grundlagen`, HEAD wie oben. Uncommittete Änderungen bzw. neue Dateien umfassen unter anderem `js/module-daten.js`, `tests/startseite.test.js`, `css/bwl-werkstatt.css`, `js/bwl-werkstatt.js`, `module/bwl-werkstatt.html` und die beiden BWL-Testdateien. Dies ist der tatsächliche Arbeitsbaum, nicht ein freigegebener/committeter Release-Stand.

`js/lf2-angebot.js` ist gegenüber HEAD unverändert (`git diff --quiet HEAD -- js/lf2-angebot.js`, Exitcode 0). Die Datei enthält laut Quelltest keinen Werkstatt-Verweis. Es wurde kein Projektcode verändert; einzige beabsichtigte Projektänderung dieses Auftrags ist dieser Bericht.

## 2. Automatisierte Tests und Rechenkern

Alle fünf von Jarvis genannten Prüfschritte wurden erneut ausgeführt:

1. `node --test tests/bwl-werkstatt.test.js tests/lf2-angebot.test.js tests/lf2-angebote.test.js` — **bestanden**, 3/3 Tests.
2. `node --test tests/bwl-lernmodus.test.js tests/startseite.test.js` — **bestanden**, 2/2 Tests.
3. `node --check js/bwl-werkstatt.js` — **bestanden**, keine Syntaxausgabe/Fehler.

Die Test-Suites bestätigen unter anderem Referenzwerte in Cent: Positionssumme 285.000 Cent (2.850,00 €), Handlungskosten 19.950 Cent (199,50 €), Selbstkosten 304.950 Cent (3.049,50 €), Gewinn 15.248 Cent (152,48 €), Nettoangebotspreis 320.198 Cent (3.201,98 €). Der Prozent-Halbcent 3.049,50 € × 5 % = 152,475 € wird auf 152,48 € gerundet.

Weitere in Tests belegte Rechenfälle: leere Angebotszeilen werden ignoriert; eine teilweise ausgefüllte Zeile wird abgewiesen; nur ein Artikelname ergibt keine Position; der Name ändert den Zahlenwert nicht; `abc`, leere Geldwerte, negative Werte, Punkt als Dezimaltrennzeichen (`12.50`) und drei Geld-Nachkommastellen (`12,505`) werden abgewiesen. Die freie Eingabe rechnet unabhängig vom Referenzfall. Die Rabattaufgabe ergibt 420,00 €, 42,00 €, 378,00 €. Diese Aussagen beruhen auf automatisierten Funktions-/Quelltests, nicht auf menschlicher Abnahme jedes Rechenwegs.

Der Lernmodus holt seine Aufgaben-Sollwerte in `js/bwl-werkstatt.js` aus `angebot()` bzw. `rabatt()` und prüft über `lernPruefe()`; im Abschnitt `lernLoesung()` findet sich keine eigenständige Prozentformel. Das vermindert das Risiko abweichender Lernlösungen. Die gemeinsame Prozentberechnung der Werkstatt verwendet intern die Cent-Regel `percentFein`; das ist eine Implementierung im selben gemeinsamen Rechenkern, keine separat berechnete Lernmodus-Formel.

## 3. Automatisierte Browserprüfung

Die Projektvorschau war im zunächst notierten Port 8107 nicht aktiv. `start.sh` im aktuellen Stand startet ausschließlich lokal auf Port 8080; dieser wurde geprüft und verwendet. Die Browserprüfung erfolgte headless und mit synthetischer Eingabe, nicht durch einen Menschen am physischen Gerät.

Tatsächlich beobachtet:

- Seite geladen, sichtbarer Titel „BWL-Werkstatt“, vier Rechnungsarten, sechs Positionen sowie Hinweise zur Übungsannahme und MVP-Grenze sichtbar.
- Wechsel in den Lernmodus: Status „Entwurf“, expliziter Hinweis „fachlich noch nicht geprüft und nicht freigegeben“, drei Aufgaben, Schritt 1 von 3 und Eingabefelder für Aufgabe 1 sichtbar.
- Aufgabenwahl zu Aufgabe 2: sichtbarer Aufgabentext, drei Positionen und Schritt 1 von 3 erschienen.
- Bei 375×812 px (unter 640 px) ist die Seite weiterhin vorhanden; Aufgabenwahl und Neustart-Schaltfläche sind sichtbar. Das belegt keine vollständige Layout-/Zoom-Abnahme und keine Aussage über horizontales Überlaufen aller Zustände.
- Browserkonsole: keine Meldungen beim beobachteten Seitenstart/Zustand.

Der Versuch, die Aufgaben per Browser-Testbedienung durchzuspielen, erreichte keinen vollständigen Eingabe-/Abgabeablauf. Es wurden daher nicht alle drei Aufgaben, keine neun Schritte und keine komplette Runde mit korrekten/falschen/formatierten Antworten per Browser verifiziert. Die Jest/Node-Tests prüfen ausgewählte Antworten und Lösungswerte programmgesteuert, sind aber kein Ersatz für diesen Nutzerablauf.

## 4. Barrierefreiheit und Bedienung

Quell- und automatisierte Tests bestätigen Vorhandensein von `aria-pressed`, einer Statusmeldung (`role="status"`/`aria-live`), `aria-invalid`, programmatischer Zuordnung der Lernfeldmeldung über `aria-describedby` und CSS-Regeln für `:focus-visible`. Das ist ein Code-/DOM-bezogener Nachweis, keine Prüfung, dass assistive Technik diese Informationen tatsächlich verständlich ausgibt.

Die Oberfläche rendert im Fehlerfall laut Code eine Feldmeldung, setzt `aria-invalid="true"` und fokussiert das erste fehlerhafte Feld; bei Erfolg wird der nächste Schritt fokussiert. Tipps, Lösungsweg (nach mindestens einem Versuch), Neustart und Aufgabenwechsel sind implementiert. Die vollständige Bedienung dieser Funktionen im Browser wurde nicht abgeschlossen.

- Tab-Reihenfolge, sichtbarer Fokus und Fokusziel nach allen Aktionen: **nicht vollständig geprüft**. Ein einzelner Tab-Schritt/Focus-Zustand ist kein Tastaturabnahmetest.
- Pfeiltastenverhalten der Tabs, Enter-Absenden und vollständige Lernbedienung ohne Maus: **nicht geprüft**.
- `aria-pressed`/`aria-invalid` zur Laufzeit bei Zustandswechsel bzw. Fehler: **im Code/Testbestand nachgewiesen, nicht als vollständiger interaktiver Browserablauf geprüft**.
- Fehlermeldungszuordnung und Statusansage durch assistive Technik: **nicht geprüft**.
- Vergrößerte Schrift: **nicht geprüft**.
- Schmale Ansicht bei 375×812: **eingeschränkt beobachtet**, keine vollständige visuelle Prüfung aller Panels/Tabellen.
- Echter Screenreader (z. B. NVDA/Orca): **nicht geprüft; keine Screenreader-Abnahme durchgeführt**. Ein DOM-/ARIA-Check ersetzt diese ausdrücklich nicht.

## 5. Dokumentationsvergleich und fachliche Grenze

Stichprobenartig verglichen: Aufgabe 1 (Positionssumme 2.850,00 €, 7 % Handlungskosten, 5 % Gewinn auf Selbstkosten und daraus 3.201,98 €) sowie Aufgabe 3 (420,00 € Warenwert, 42,00 € Rabatt, 378,00 € danach). Die im Lernmodus angezeigten Situationsdaten und Rechenschritte stimmen in diesen Stichproben mit der LRS-Fassung `2026-10-23_c3po-bwl-lernaufgaben-lrs.md` überein. Aufgabe 2 ist automatisiert auf Sollwerte getestet, wurde textlich nicht vollständig stichprobenweise abgeglichen.

Die Texte und Zahlen sind als Entwürfe markiert. Die Abgrenzung, dass Handlungskosten hier auf die Positionssumme, Gewinn auf Selbstkosten und der Rabatt auf den Warenwert gerechnet werden, entspricht den vorgelegten Übungsannahmen. Ob diese kaufmännischen Annahmen für den vorgesehenen Unterrichtskontext fachlich passend sind, wurde nicht durch eine Fachquelle oder Fachperson bestätigt. **Keine fachliche Freigabe erteilt.**

## 6. Fehler, Auffälligkeiten und nicht geprüfte Bereiche

**Reproduzierbare Anwendungsfehler:** Im ausgeführten Umfang keiner nachgewiesen.  
**Einmalig beobachtete Auffälligkeiten:** Keine als Anwendungsfehler eingestuft.  
**Codebasierte Vermutungen:** Keine als Fehler eingestuft.  
**Nicht geprüft:** kompletter Browserdurchlauf aller drei Lernaufgaben/Schritte; interaktive korrekte, falsche und ungültige Eingaben samt Lösungsschutz; Tipp, Lösungsweg, Neustart und Aufgabenwechsel in einer vollständigen Browser-Session; vollständige Tastaturabnahme; Screenreader; vergrößerte Schrift; vollständige Responsive-Sichtprüfung; fachliche Freigabe der Aufgaben.

## 7. Empfehlung

Vor einer menschlichen Abnahme oder fachlichen Nutzung sollten die drei Aufgaben vollständig in einer sichtbaren Browser-Session mit Tastatur durchlaufen werden: korrekte und falsche Werte, leerer/ungültiger Geldwert, Meldungszuordnung, Fokus nach Fehler/Erfolg, Tipp/Lösungsweg, Neustart, Wechsel zwischen Aufgaben und Erhalt des Zwischenstands. Danach schmale Ansicht und vergrößerte Schrift gezielt prüfen. Für eine barrierefreie Freigabe ist zusätzlich ein echter Screenreader-Test nötig. Die Aufgabenannahmen sollten separat von einer zuständigen BWL-Fachperson freigegeben werden. Bis dahin ist die Funktion nur teilweise technisch nachgewiesen; **keine Produktionsfreigabe**.
