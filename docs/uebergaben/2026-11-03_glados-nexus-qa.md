# Unabhängige QA – RAID-Labor Nexus-Iteration

**Datum:** 03.11.2026  
**Ergebnis:** Im gezielt geprüften Umfang keine reproduzierbaren Produktfehler festgestellt. Keine vollständige Abnahme der gesamten Unified-Plattform.

## Prüfstand und Grenzen

- Projekt: `/home/starnet/projects/IT-Ausbildung-unified`
- Branch: `feature/unified-it-labs-2026-11-03`
- HEAD bei Prüfstart: `7f2353ea5ec794f17e8d0052d79ac80442804b86`
- Vorschau: `http://127.0.0.1:8155/module/raid-labor.html`
- Bedienung in dem dem QA-Lauf zugewiesenen Chrome an CDP-Port 9335. Gezielte Aktionen über den vorhandenen Helfer `tests/cdp-helper.js`. Produkt-/Testdateien und Git wurden nicht verändert; keine Datenträgeroperationen.
- `js/raid-rack.js`, `css/raid-rack.css` und `tests/raid-rack-browser.test.js` lagen bereits als modifizierte Dateien im Worktree. Sie wurden weder bearbeitet noch committet.
- Der verbindliche Nexus-Screenshot ist im Commanderauftrag vorhanden. Die im Auftrag genannten Merkmale wurden an der Oberfläche geprüft: dunkle Rackfläche, 4×4 Front, Gruppenkennzeichnung/-status, grüne Betriebs-LED, ausgewählter Schacht und ein dynamisches Detailfeld darunter. Kein Befund „Referenz fehlt“. Kein pixelgenauer Bild-Overlay-Vergleich in diesem Lauf.

## Geprüfte Abläufe und Ergebnisse

### Serverfront, Auswahl und responsive Darstellung

- Live-Seite: 16 Schacht-Buttons vorhanden. Jeder Schacht ließ sich im geladenen Szenario mit bestückten Laufwerken einzeln wählen; Überschrift des Detailfelds wechselte auf den gewählten Schacht. Jeweils ein Kapazitätsfeld und genau ein ausgewählter Schacht (`aria-pressed=true`). Kein Seitenreload.
- Leere Schächte zeigen kein Kapazitätsfeld; dort ist „Laufwerk einsetzen“ die passende Aktion.
- Viewports 320, 768 und 1440 CSS-Pixel geprüft. `scrollWidth` entsprach jeweils `documentElement.clientWidth` (305, 753 und 1425 Pixel nach Scrollbarabzug); kein horizontaler Dokumentüberlauf. Alle drei Breiten zeigten 16 Schächte und ein Detailfeld. Die bestehende 42er Level-/Breiten-/Theme-Matrix wurde laut vorliegendem Abnahmestatus bereits grün ausgeführt und nicht wiederholt.
- Alternative Auswahl vorhanden als „Kompakte Laufwerksübersicht – alternative Auswahl“, mit 16 auswählbaren Schacht-Steuerelementen; sie war im untersuchten Zustand geöffnet. Eine vollständige Tastaturdurchquerung dieser Alternativliste wurde nicht durchgeführt.
- Tastaturfokus am Rack-Schacht 01 geprüft: Element fokussierbar, sichtbarer 4-Pixel-Outline. Keine vollständige reine Tastaturbedienung aller Arbeitsabläufe abgenommen.

### RAID-Gruppen und dynamischer Zustand

- RAID 60 mit vier Gruppen geladen: Ergebnisgrafik zeigte vier Gruppen, je „Funktionsfähig“ und Ausfallgrenze 2. Rackdaten zeigten Zuordnung 1–4 zu Gruppe 1, 5–8 zu Gruppe 2, 9–12 zu Gruppe 3 und 13–16 zu Gruppe 4.
- Positionsunabhängigkeit geprüft: Schacht 04 von Gruppe 1 nach Gruppe 2 und Schacht 05 von Gruppe 2 nach Gruppe 1 verschoben. Die Live-Zuordnung folgte den Konfigurationsdaten; RAID 60 blieb funktionsfähig. Die Reihen werden nicht als unveränderliche Zuordnungsquelle verwendet.
- Schacht 01 in Gruppe 1 ausgefallen: Zustand `failed`, Gesamtergebnis und Gruppenstatus synchron „Degradiert“ mit „1 nicht verfügbar“. Rebuild-Aktion vorhanden. Rebuild-Beginn zeigte `rebuild` und „Rebuild – noch nicht verfügbar“; Abschluss setzte den Zustand auf bereit und Array sowie Gruppe wieder auf „Funktionsfähig“.
- RAID 0 gezielt: Laufwerksausfall meldete „Datenverlust im Modell“ und sperrte „Rebuild beginnen“. „Ausfallszenario zurückgesetzt“ setzte den Schacht auf bereit und entfernte die Szenario-Datenverlustmarkierung. Die Rückmeldung erklärt ausdrücklich, dass das keine Datenrekonstruktion ist.
- Im bereits mit RAID 5 bestückten Live-Szenario Kapazität von Schacht 01 auf 3 TB geändert: Feld zeigte 3 TB, Rohkapazität 7 TB, Nutzkapazität 4 TB. Gruppenzuordnung auf „nicht zugewiesen“ aktualisierte die zugängliche Bezeichnung und machte RAID 5 wegen zu weniger Mitglieder ungültig; Rückzuordnung auf Array-Mitglied stellte eine gültige Konfiguration her.

### Navigation, Theme und Ressourcen

- Auf der RAID-Seite waren zentrale Navigationseinträge „RAID-Lernlabor“, „Windows-Werkzeugkiste“, „BWL-Werkstatt“ und „PC-Explorer“ samt Modulzielen vorhanden. Kein kompletter Navigationswechsel in alle Module ausgeführt.
- Hell- und Dunkel-Modus über „Darstellung“ wählbar; nach Wahl „dunkel“ war Seitenhintergrund `rgb(17, 24, 32)`.
- Zum Abfragezeitpunkt keine Browser-Performance-Ressourcen mit Antwortstatus >=400. Kein umfassender Konsolen-/Netzwerkaudit.

## Abbrüche der QA-Skripte – keine Produktbefunde

1. Eine Assertion erwartete `innerWidth === 320`; tatsächlich war `innerWidth` 320, aber `documentElement.clientWidth` 305 wegen der Scrollbar. Ein anschließender Lauf bestätigte `scrollWidth === clientWidth`, also keinen horizontalen Überlauf.
2. Das Skript erwartete „3 TB Nutzkapazität“ nach Eingabe 3 TB für ein Laufwerk im bestehenden RAID-5-Szenario. Beobachtet wurden 3 TB Laufwerkskapazität, 7 TB Rohkapazität und 4 TB Nutzkapazität. Falsche Testerwartung, kein Produktfehler.
3. Ein Prüfschritt erwartete ein Gruppenauswahlfeld an Schacht 04, obwohl dieser Schacht im geladenen RAID-60-Beispiel leer war. Mit Auswahl eines bestückten Schachts bestätigte der wiederholte Test die Gruppenzuordnung über eine Zeilengrenze hinweg.

Diese Abbrüche wurden nicht als Anwendungsfehler gewertet.

## Nicht unabhängig geprüft / offen

- RAID-Level 0, 1, 5, 6, 10, 50 und 60 wurden nicht alle manuell erneut durchgespielt. Für die 42 Level-/Breiten-/Theme-Kombinationen liegt ein separater Status „bestanden“ vor, kein unabhängiger Wiederholungsnachweis in dieser QA. RAID 60 mit vier Gruppen wurde live geprüft.
- Kein vollständiger Test sämtlicher Rebuild-Bedingungen; Datenverlust-Sperre wurde gezielt an RAID 0 geprüft, nicht in jeder Level-/Fehlerkonstellation.
- Keine unabhängige Kapazitätsberechnung für sämtliche RAID-Level und keine fachliche Freigabe über das definierte Lehrmodell hinaus.
- Kein vollständiger Regressionstest der übrigen Unified-Module. Navigation/Modulinhalte von BWL, PC-Explorer und Windows wurden nicht durchgehend erneut abgenommen.
- Kein echter Windows-Browser, keine echte Touchhardware, kein Screenreader-/Assistenztechniktest.
- Der visuelle Abgleich war eine Sichtprüfung anhand der Merkmale der vorhandenen Referenz, kein Pixel-Overlay.

## Abschluss

Im geprüften Umfang keine Fehler festgestellt. Live bestätigt wurden 16-Schacht-Auswahl mit einem dynamischen Feld, eine positionsunabhängige Gruppenzuordnung, RAID 60 mit vier Gruppen, synchroner Ausfall-/Rebuild-Status, RAID-0-Datenverlustsperre und Szenarioreset sowie responsive Breiten ohne horizontalen Überlauf. Nicht erneut ausgeführte Bereiche sind ausdrücklich benannt; keine Aussage „fehlerfrei“ oder „vollständig geprüft“.
