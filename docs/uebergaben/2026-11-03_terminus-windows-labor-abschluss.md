# Phase 2 – Windows-Diagnose- und Administrationslabor

Stand: 03.11.2026. Feature-Teststand, keine Produktions- oder Fachfreigabe.

- Worktree: `/home/starnet/projects/IT-Ausbildung-werkzeugkiste`
- Branch: `feature/windows-werkzeugkiste`
- Ausgangscommit: `949cf82325ba93b051bd7b55aa27fd925f3e3774`
- Keine Integration nach `dev` oder `main`, kein Deployment.

## Implementierte Funktionen

Die bestehende Route `module/windows-werkzeugkiste.html`, 16 Bedienkarten, neun Alltagsübungen und zwölf Quizfragen bleiben erhalten. Der zusätzliche Labormodus enthält alle 15 CMD- und 14 PowerShell-Befehle einschließlich beider Eventlog-Cmdlets.

Suche, Umgebungsfilter, Lernbereichsfilter und native Befehlsauswahl erschließen die Inhalte. Nulltreffer werden erklärt; ein Reset stellt alle Befehle wieder her. Jedes Profil zeigt Zweck, Syntax und Parameter, Praxisfall, ausdrücklich simulierte gekürzte Ausgabe, Deutung, häufige Fehler, Rechte, mögliche Änderungen, Sicherheit, eine Miniübung mit Erklärung und offizielle Quellen.

Die Miniübungen sind wiederholbar und speichern nichts. Eine andere Befehlsauswahl entfernt altes Feedback. Das Labor führt keine Befehle aus und greift weder auf Betriebssystem noch Netzwerk zu.

Lesende Diagnose, Netzwerkproben und verändernde Aufrufe werden unterschieden. Reparaturschalter sind separat erklärt. Windows PowerShell 5.1 dient als Beispielumgebung; Unterschiede zu PowerShell 7 und Windows-Modulgrenzen stehen dabei. `Get-EventLog` fehlt in PowerShell 7. Storage-Inventar beweist keine RAID-Topologie. Ping beweist weder DNS als Auflösungsquelle noch die Funktion einer Anwendung. Ein ICMP-Timeout beweist keinen Ausfall.

Der optionale mehrstufige Diagnoseassistent wurde bewusst zurückgestellt: vollständige Befehlsprofile und fachliche Korrekturen hatten Vorrang.

## Tatsächliche Aufgabenverteilung

Jarvis erstellte die 29 Rohprofile. Sein Lauf wurde nach einem im Laufprotokoll beobachteten kostenpflichtigen Folgeprovider entgegen der Auftragsgrenze gestoppt. Der Ersatzlauf auf Codex hatte keinen Projektzugriff und änderte nichts. Terminus übernahm deshalb begründet die Fachkorrekturen, UI-Anbindung und Tests sowie Review und Git-Abschluss.

C-3PO lieferte Quellen, Bestandsmatrix und einen gezielten Fachreview. GLaDOS prüft unabhängig; ihre tatsächlichen Beobachtungen und Grenzen stehen separat in `2026-11-03_glados-windows-labor-qa.md`. Details zur Providerabweichung und zum gesicherten Zwischenstand stehen in `2026-11-03_terminus-providerabweichung.md`. Keine Stationseinstellungen wurden geändert, Jarvis wurde nicht erneut gestartet.

## Eigene reale Prüfungen

- Syntax aller drei betroffenen JS-Dateien mit `node --check`: bestanden.
- `node tests/windows-labor.test.js`: 29 Pflichtprofile, didaktische Felder, Filter, 87 Antwortfälle, Quellen-, Sicherheits- und fachliche Regression bestanden.
- `node tests/windows-werkzeugkiste.test.js`: alle 18 Bestandsprüfungen bestanden.
- `node tests/navigation-glossar.test.js`, `node tests/startseite.test.js` und `git diff --check`: bestanden.
- Echter Headless-Chrome/CDP-Lauf: alle 29 Profile bei 1440, 768 und 320 CSS-px, insgesamt 87 Profil-/Breitenkombinationen. Zehn konkrete Inhaltsüberschriften, Ausgaben und HTTPS-Quellen geprüft; 261 UI-Antwortprüfungen (je leer, falsch, richtig). Keine horizontalen Seitenüberläufe oder JavaScript-Laufzeitfehler.
- Nulltreffer und Filterreset bei allen drei Breiten. Native Select-Auswahl mit End/Enter wählt `Get-PhysicalDisk`; Fokusoutline ist sichtbar. Touch-Reset emuliert.
- Die bisherigen Modi Lernkarten, Übung und Wissenstest erneut bei allen drei Breiten geprüft: neun Kombinationen mit Fehler-/Antwortfeedback und Weiter-Navigation bestanden.
- Echte Screenshots bei 1440 und 320 px persönlich gesichtet: Text lesbar, passende Umbrüche, keine Seitenüberläufe. Lange Ausgaben bleiben in einem fokussierbaren, intern horizontal scrollbareren Rahmen.
- Chrome-AccessibilityTree: Suchfeld, drei Comboboxen, Antwortoptionen und Modus-/Reset-/Prüfbuttons besitzen verständliche Textnamen. PowerShell-Filter liefert 14 Optionen. Das ist kein vollständiger Screenreader-Nachweis.
- Sicherheitsreview: keine neuen Abhängigkeiten, Secrets, dynamische Codeausführung, HTML-Injektion, OS-Befehlsausführung, Netzwerkanfragen oder Speicherung durch die neuen Labor-Dateien.

Rohbelege im Terminus-Workspace: `pruefung/windows-labor-browser.cjs`, `pruefung/windows-labor-evidence.json`, `pruefung/windows-labor-{1440,768,320}.png`, `pruefung/windows-bestand-evidence.json`.

Eine frühe Browserprobe erwartete irrtümlich neun statt zehn Inhaltsüberschriften. Implementation und Check wurden gelesen; der Test wurde auf die zehn konkreten fachlich geforderten Überschriften korrigiert. Derselbe Lauf bestand anschließend. Keine Funktion wurde entfernt, um einen Test grün zu machen.

## Behandlung des C-3PO-Fachreviews

1. `Get-EventLog`: Index und InstanceID waren nicht verwechselt. Die synthetische Zeile belegt keinen Widerspruch; dieser Befund ist kein bestätigter Fehler. Der Index wird nicht als Ereignis-ID gelehrt.
2. `Get-WinEvent`: Provider ergänzt und Praxis mit explizitem `Format-List` an die Ausgabe angepasst. Sinnvolle Verbesserung umgesetzt.
3. `Get-Disk`: Pauschale Aussage zum Offline-Zustand präzisiert. Vor Zustandsänderungen Ursache und insbesondere Cluster-/Storage-Kontext klären.
4. `Get-PhysicalDisk`: Die Übung fragte bereits nach einer möglichen Erklärung, nicht einem bewiesenen RAID-Befund. Die Providergrenze steht jetzt zusätzlich explizit im Zwecktext. Keine automatische Topologiebehauptung.

## Grenzen und Empfehlung

Linux-/Chrome-Prüfumgebung, keine echten Windows-Befehle ausgeführt. Konsolenausgaben sind pädagogische Simulationen, keine vollständig editions- und sprachübergreifend verifizierten Originalausgaben. Keine physische Touch-, Screenreader- oder Crossbrowser-Prüfung. C-3PO dokumentiert seine Quellenabdeckung und verbleibende fachliche Prüfgrenzen separat; nicht jeder Satz aller 29 Microsoft-Artikel wurde doppelt geprüft.

Kontingentreste sind unbekannt. Nach erfolgreicher unabhängiger QA darf Phase 3 nur als Architektur-/Didaktikkonzept oder dokumentierter Fortsetzungsplan folgen, nicht als halbe RAID-Implementierung.

Direktes lokales Öffnen zusätzlich real geprüft: `file:///home/starnet/projects/IT-Ausbildung-werkzeugkiste/module/windows-werkzeugkiste.html` lädt den Labormodus mit 29 Optionen und Detail „hostname“, ohne JavaScript-Laufzeitfehler. Damit ist die Anleitung „entpacken und HTML öffnen“ auf dieser Chrome-Umgebung praktisch geprüft, nicht nur über HTTP vermutet.

Bestehenden Wissenstest zusätzlich im echten Browser vollständig durch alle zwölf Fragen bis zur Ergebnisanzeige (sechs von zwölf bei bewusst immer erster Option) durchgespielt. „Wissenstest neu starten“ führt wieder zu „Aufgabe 1 von 12“. Damit ist der gesamte Abschluss-/Neustartpfad praktisch geprüft.
