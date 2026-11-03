# PC-Explorer: Kontexttexte und USB-Trennung

03.11.2026, Phase1 des direkten Commander-Auftrags. Branch `feature/pc-explorer-grafik-2026-11-02`, Ausgang `9bbc8c2e2d9a901586acc262d324be5740a277d0`. Keine Änderung an dev/main/Pages, keine Produktions- oder Fachfreigabe.

## Ergebnis und Rollen

Jarvis änderte `js/pc-explorer.js`, `module/pc-explorer.html`, `css/pc-explorer.css`, `tests/pc-explorer.test.js`, `CHANGELOG.md`. Kontextabsatz wird je Ansicht gesetzt; Kühlungshinweis nur Desktop/Notebook. Mainboard erklärt nummerierte Legende, Rückseite Formen-/Standardtrennung, ältere Anschlüsse ihren Vergleichszweck. USB2.0/3.2/4 bleiben anwählbar, stehen aber als gestrichelte Plaketten in einem beschrifteten eigenen Bereich, während USB-A/C als physische Buchsen dargestellt sind. USB4 verwendet C; nicht jeder C-Port unterstützt USB4; Farbe beweist keine Geschwindigkeit. IDs und Interaktionen bleiben erhalten.

Terminus koordinierte, las Diffs und Fachquelle, führte ergänzende Tests/Sichtprüfung durch und aktualisierte `PC-EXPLORER-TESTANLEITUNG.md`. Unabhängige QA durch GLaDOS wird separat unter `2026-11-03_glados-pc-usb-kontext-qa.md` dokumentiert. C3PO recherchiert parallel ausschließlich das Werkzeuglabor, keine doppelte PC-Implementierung.

## Eigene reale Prüfungen

- `node --check js/pc-explorer.js`, `node tests/pc-explorer.test.js`, `node tests/navigation-glossar.test.js`, `node tests/startseite.test.js`, `git diff --check`: Exit0.
- Cachefreier echter Headless-Chrome/CDP-Lauf: 1440/768/320 CSS-px, alle5Ansichten =15Kombinationen,147HTML-Auswahlen mit synchroner SVG-Auswahl und passendem Detailtitel. Kontextabsatz je Ansicht geprüft, keine Runtime-Ausnahmen oder horizontalen Seitenüberläufe.
- Home/End, isolierte Space-Auswahl und sichtbare Fokusoutline in allen15Kombinationen. Simulierte Touch-Eingabe in Mainboard/Rückseite bei allen3Breiten. Kein physisches Touchgerät und kein vollständiger Screenreader-Nachweis.
- Neue Rückseitendarstellung persönlich anhand echter Screenshots bei1440/320gesichtet: klar getrennte gestrichelte Standardplaketten. Bei320ist Grafiktext klein; lesbare HTML-Einleitung/Legende/Detailerklärungen sind die vollständige Informations- und Bedienalternative.
- Prüfsystem und Rohbeleg im Terminus-Workspace: `pruefung/runde-pc-browser.cjs`, `pruefung/runde-pc-evidence.json`, `pruefung/runde-*.png`. Laufende eigene Vorschau für QA auf127.0.0.1:8144, kein öffentliches Deployment.
- Added-lines-Sicherheitsreview: keine neuen Abhängigkeiten, Netzwerkanfragen, OS-Befehlsausführung, Secrets oder Deploymentänderungen. Nur sicherer Text und SVG.

Fachquelle real abgerufen: https://www.usb.org/usb4 bestätigt USB4-Betrieb über USB-Type-C-Kabel. Herstellerfähigkeit bleibt separat zu prüfen. Keine Normbehauptung aus Buchsenfarbe.

## Grenzen

Kein Windows/Edge-/Firefox-/Safari-/physischer Touch-/Screenreadertest. Kontingentreste unbekannt, keine Prozentwerte erfunden und kein kostenpflichtiger Fallback genutzt. Vorhandenes untracked `vorschau/` bleibt unberührt. Commit und Remote-Nachweis folgen nach unabhängiger QA im Abschlussbericht.

Gezielter ergänzender Browsercheck: Kühlungsschalter Desktop und Notebook jeweils `true → false`, Schalter jeweils sichtbar, Exit0. Diese Prüfung ergänzt die vorstehende Auswahlregression ohne weitere Codeänderung.
