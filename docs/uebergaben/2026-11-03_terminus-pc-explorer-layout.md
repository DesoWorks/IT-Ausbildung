# PC-Explorer – Layoutoptimierung nach Sichtabnahme

Stand: 2026-11-03. Technisch geprüfter Feature-Teststand, keine Produktions- oder Fachfreigabe.

## Auftrag und Ausgangslage

Worktree `/home/starnet/projects/IT-Ausbildung-pc`, ausschließlich `feature/pc-explorer-grafik-2026-11-02`. Ausgangscommit `f279c84207cfeb3125b9f7eac1967257ca9aebde`, lokal und remote gleich. Keine offenen tracked Änderungen bei Übernahme. Vorhandene unversionierte Altbelege in `vorschau/` bleiben unangetastet und werden nicht committet. Keine Branchwechsel, Integration, Versionsfreigabe oder Deploymentänderungen.

Remote-Referenzen vor Beginn: dev `3b3b49fa7c8aeb7f66d0214f57536d1d2fdd2d49`, main `6e6217778ea7148fc02c142b39072a2f573ce8ba`.

## Umsetzung

- Mainboard und Rückseite verwenden die volle Auswahlbereichsbreite statt einer rechten zusätzlichen Bauteilliste.
- Die alleinige HTML-Auswahllegende liegt unter der Grafik. Mainboard-Einträge tragen die Nummern der anklickbaren Platinenmarken; für die Rückseite sind sämtliche Einträge als beschriftete Schaltflächen vorhanden.
- HTML-Auswahl bleibt auch ohne grafische Bedienung vollständig nutzbar. Pfeile, Home/End, Enter/Leertaste und sichtbare Fokusmarkierungen sind erhalten; SVG und HTML aktualisieren dieselbe Erklärung und Auswahl.
- Nummernmarken bleiben nun auch unter 600 px sichtbar. Kleine grafische Beschriftungen bleiben auf 320 px nur Übersicht; die HTML-Legende liefert lesbare vollständige Namen.
- Die Detailerklärung steht unter der gesamten Auswahl über deren volle Breite.
- Mainboard-SVG wird ohne interne rechte SVG-Textlegende auf `420 × 480` zugeschnitten. Platinengeometrie und fachliche Inhalte bleiben erhalten. Eine Höhenbegrenzung von 85vh verhindert eine übermäßig hohe Desktopgrafik.
- Desktop, Notebook und historische Anschlüsse behalten ihre bisherige Auswahlführung. Nur notwendige gemeinsame Hinweistexte und die Layoutumschaltung wurden geändert.

## Tatsächliche Aufgabenverteilung

- **Jarvis:** Implementierung in `js/pc-explorer.js`, `css/pc-explorer.css`, `module/pc-explorer.html`, Regression in `tests/pc-explorer.test.js` und `CHANGELOG.md`. Nach Terminus-Review gezielte mobile Marken-Korrektur. Keine Git-Schreiboperationen.
- **Terminus:** Ausgangs-/Remoteprüfung, Koordination und Schreibgrenzen, Diff-/Sicherheitsreview, eigene reale Browserprüfung, Sichtprüfung, Gitabschluss und Remote-Verifikation.
- **GLaDOS:** unabhängige QA, eigener Bericht `2026-11-03_glados-pc-explorer-layout-qa.md`; bei 1440/768/320 px im gezielt geprüften Umfang keine reproduzierbaren Fehler festgestellt. Grenzen: SVG-Mausauswahl synthetisch, keine isolierte Space-Nachweisprüfung und keine abschließende Kühlungsprüfung durch GLaDOS; Terminus ergänzte diese beiden funktionalen Nachweise separat.
- **C3PO:** Aktualisierung von `PC-EXPLORER-TESTANLEITUNG.md`.

Kein belastbarer Restkontingent-Zähler verfügbar. Tatsächliche reguläre Agentenläufe statt Kontingent-Testaufrufen verwendet; keine bezahlten API-Fallbacks oder Providerumstellung.

## Eigene Verifikation Terminus

Nach letzter Produktänderung:

- `node --check js/pc-explorer.js`: Exit 0.
- `node tests/pc-explorer.test.js`: bestanden, inklusive Layout-/Markenregression.
- `node tests/navigation-glossar.test.js`, `node tests/sichtfehler-navigation-glossar.test.js`, `node tests/startseite.test.js`: jeweils bestanden.
- `git diff --check`: bestanden.
- Reale cachefreie Headless-Chrome/CDP-Prüfung bei **1440, 768 und 320 CSS-px** über alle fünf Ansichten: **15 Ansichts-/Breitenkombinationen, 147 HTML-Auswahlprüfungen** mit passender Detailüberschrift und synchronem SVG-/HTML-aria-pressed; keine Seitenüberläufe oder Runtime-Exceptions.
- Breiten-/Positionsprüfungen bestätigen die breite Grafik, HTML-Legende darunter und volle Detailbreite in Mainboard/Rückseite.
- Home/End/Enter mit CDP-Keyevents und sichtbarer Fokusoutline in allen 15 Kombinationen geprüft. Initialfokus dafür programmatisch gesetzt, kein vollständiger physischer Tabdurchlauf daraus ableitbar.
- Simulierte Touch-Start/-End-Ereignisse in beiden Zielansichten bei allen drei Breiten bestanden. Kein physisches Touchgerät.
- Screenshots Mainboard/Rückseite persönlich gesichtet, insbesondere Mainboard 320 nach Marken-Korrektur und Rückseite1440/768. Belege und Prüfsystem im Terminus-Workspace unter `pruefung/layout-*`.
- Review hinzugefügter Codezeilen: keine neuen Netzwerkanfragen, Geheimnisse, Abhängigkeiten, dynamische Codeausführung oder Änderungen an Deploymentkonfigurationen.

Der dedizierte lokale Browserweg scheiterte an der Serverzuordnung (`local test URL is not proven to belong to this agent's running background server`). Geprüft wurde deshalb mit eigenem temporärem Chromeprofil über Shell/CDP, ohne fremde Browserprofile oder Dienste zu verändern. Keine Workspace-Sperre aufgetreten.

## Grenzen und Download

Keine Prüfung auf physischem Mobilgerät, Windows/Edge, Firefox, Safari oder mit echtem Screenreader. Diese Layoutphase enthält keine neue Hardware-Fachfreigabe. Auf 320 px sind Platinenmarken klein; lesbare HTML-Auswahl ist die gleichwertige Bedienalternative. Unabhängiger QA-Bericht ergänzt diese eigenen Prüfnachweise, ersetzt sie nicht.

[Feature-Branch](https://github.com/DesoWorks/IT-Ausbildung/tree/feature/pc-explorer-grafik-2026-11-02) · [ZIP-Download](https://github.com/DesoWorks/IT-Ausbildung/archive/refs/heads/feature/pc-explorer-grafik-2026-11-02.zip)

Commit-ID und Push-Nachweis folgen im Abschlussbericht, nicht zirkulär im eigenen Commitinhalt.

Zusätzliche gezielte Regression: Kühlungsschalter in Desktop und Notebook jeweils `true → false` geprüft (CDP, Exit 0). Ein erster Prüfaufruf verwendete irrtümlich eine nicht vorhandene `evaluate`-Hilfsfunktion; nach Lesen von `tests/cdp-helper.js` wurde nur der Prüfaufruf auf `send('Runtime.evaluate', ...)` korrigiert. Kein Anwendungsdefekt und keine Produktänderung daraus.

Nach unabhängiger QA ergänzte Terminus den dort offenen isolierten Leertasten-Nachweis: In Mainboard und Rückseite jeweils einen anderen, zuvor nicht ausgewählten HTML-Knopf und ein anderes SVG-Bauteil fokussiert, echte CDP Space-down/up-Ereignisse gesendet und passende Auswahl/Detailüberschrift bestätigt (**4 Nachweise, Exit 0**). GLaDOS-Bericht bleibt als unabhängige Beobachtung unverändert. Keine Produktänderungen nach QA.
