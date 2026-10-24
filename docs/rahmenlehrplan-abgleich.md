# Abgleich: Bestand der IT-Ausbildung gegen den KMK-Rahmenlehrplan

Stand: 18.10.2026. Branch `prototype/computer-grundlagen`, Ausgangs-Commit `e3b9e02`, Arbeitsbaum zu Beginn sauber.
Dieses Dokument ändert keine Lektion, keine Modul-ID und keine Fortschritts-ID. Es ist nur eine Bestandsaufnahme.

## 1. Belegte Fakten

### 1.1 Gemeinter Beruf

- `README.md`: "Fachinformatiker / Fachinformatikerin für Systemintegration".
- `index.html` (Meta-Beschreibung und Kopfzeile): "Fachinformatiker/-in für Systemintegration · drei Ausbildungsjahre".
- `js/module-daten.js` führt im 3. Jahr die Lernfelder 10b, 11b und 12b. Das sind die Systemintegrations-Lernfelder.
- Im Projekt kommen keine Begriffe der anderen Fachrichtungen oder Berufe vor (Suche nach Anwendungsentwicklung, Daten- und Prozessanalyse, Digitale Vernetzung, IT-System-Elektroniker: keine Treffer).
- Der Beruf wurde nicht von der Verwaltung-Ausbildung übernommen. Er stammt aus den Projektdateien.
- Eine `AGENTS.md` existiert im Projekt nicht (`cat` meldet: Datei nicht vorhanden). Als Planung dienen `FORTSETZUNGSPLAN-IT-AUSBILDUNG.md`, `PLAN-NAVIGATION-GLOSSAR.md` und `docs/plan-*.md`.

### 1.2 Quelle des Plans

- KMK, Rahmenlehrplan für die Ausbildungsberufe Fachinformatiker und Fachinformatikerin / IT-System-Elektroniker und IT-System-Elektronikerin, Beschluss vom 13.12.2019.
- PDF: https://www.kmk.org/fileadmin/Dateien/pdf/Bildung/BeruflicheBildung/rlp/Fachinformatiker_19-12-13_EL.pdf
- Am 18.10.2026 heruntergeladen (68 Seiten) und mit `pdftotext` ausgelesen. Lernfelder, Lehrjahre und Zeitrichtwerte stammen aus der Übersicht auf Seite 10 und den Lernfeldseiten 12 bis 27.
- Gültig für die Fachrichtung Systemintegration sind die Lernfelder 1 bis 9 sowie 10b, 11b und 12b. Die Lernfelder 10a/11a/12a, 10c/11c/12c, 10d/11d/12d und die SE-Lernfelder gehören zu anderen Fachrichtungen und sind hier nicht aufgeführt.
- Der RLP nennt die Lernfelder 1 bis 6 als prüfungsrelevant vor Teil 1 der Abschlussprüfung.

### 1.3 Fortschrittsanzeige

- `js/fortschritt.js` leitet den Abschluss je Lektion aus dem lokalen Browser-Speicher ab (`it-ausbildung.<id>.v1`). Es gibt keinen eigenen Abschlusswert.
- `js/startseite.js` zeigt je Lernfeld: "N verfügbar · M In Kürze · K abgeschlossen". Lernfelder ohne Lektionen zeigen "In Kürze".
- Der Wert "abgeschlossen" gilt je Lernende und je Browser. Er lässt sich aus dem Repository nicht zählen.
- Fortschrittsschlüssel ohne Katalogeintrag: `lf1-abschluss`, `lf2-abschluss`, `lf3-abschluss`, `lf4-abschluss`, `lf5-abschluss`. Es gibt keine `*-abschluss.html` mehr in `module/`. Die Schlüssel bleiben in `js/fortschritt.js` stehen.
- Katalogeinträge ohne Fortschrittsschlüssel: die drei Werkzeuge `lf3-zahlensysteme`, `lf3-einheiten`, `lf3-ipv4-rechner`. Sie zählen nicht als Lektionen.
- Katalog: 52 Einträge mit Datei in Lernfeldern, alle Dateien vorhanden (per Skript geprüft).

### 1.4 Hinweise zur Konsistenz im Projekt

- `README.md` nennt am Ende "0.15.1-alpha.1", im Abschnitt Inhalte "0.16.2-alpha.1". `js/version.js` steht auf `0.16.3-alpha.1`. Die README ist hier uneinheitlich.
- `docs/plan-lf3.md` beschreibt LF3 als `kommt-bald`. `js/module-daten.js` führt LF3 inzwischen als `verfuegbar`.
- Die Lernfeldtitel im Katalog weichen teils von den KMK-Titeln ab (siehe Tabellen). Ob das gewollt ist, ist offen. Titel wurden nicht geändert.

## 2. Zeitrichtwerte (KMK, Systemintegration)

| Lehrjahr | Lernfelder | Summe Stunden |
|---|---|---|
| 1 | LF1 40, LF2 80, LF3 80, LF4 40, LF5 80 | 320 |
| 2 | LF6 40, LF7 80, LF8 80, LF9 80 | 280 |
| 3 | LF10b 80, LF11b 80, LF12b 120 | 280 |

## 3. Abgleich je Lehrjahr und Lernfeld

Legende Status:
- **vorhanden**: Zu jedem Absatz der Kompetenzbeschreibung gibt es mindestens eine Einstiegslektion laut Katalog und Projektplan.
- **teilweise**: Es gibt Lektionen, aber mindestens ein Absatz der Kompetenzbeschreibung ist nicht abgedeckt.
- **fehlt**: Es gibt keine Lektion. Der Katalog zeigt "kommt-bald".

"Lektionen" sind Katalogeinträge vom Typ `lektion`. Die Lernzielkontrolle ist gesondert genannt.

### 3.1 Lehrjahr 1

| Lernfeld (KMK) | Std. | Katalog-ID / Katalogtitel | Lektionen (Modul-IDs) | Lernzielkontrolle | Status |
|---|---|---|---|---|---|
| LF1 Das Unternehmen und die eigene Rolle im Betrieb beschreiben | 40 | `lf1` / Ausbildungsbetrieb und berufliche Rolle | 10: `lf1-betrieb-aufgaben`, `lf1-leitbild-ziele`, `lf1-markt-kundschaft`, `lf1-wertschoepfung`, `lf1-organisation`, `lf1-handlungsspielraum`, `lf1-weiterbildung`, `lf1-praesentation`, `lf1-qualitaet`, `lf1-reflexion` | `lf1-lernziel` | vorhanden |
| LF2 Arbeitsplätze nach Kundenwunsch ausstatten | 80 | `lf2` / Arbeitsplätze nach Kundenwunsch ausstatten | 12: `lf2-kundenbedarf`, `lf2-kriterien`, `lf2-sichere-auswahl`, `lf2-technische-daten`, `lf2-varianten`, `lf2-energie`, `lf2-angebote`, `lf2-angebot`, `lf2-beschaffung`, `lf2-einrichten`, `lf2-uebergabe`, `lf2-auswertung` | `lf2-lernziel` | teilweise |
| LF3 Clients in Netzwerke einbinden | 80 | `lf3` / Netzwerkgrundlagen und Client-Anbindung | 9: `lf3-client-anbindung`, `lf3-ipv4-konfiguration`, `lf3-dhcp`, `lf3-dns`, `lf3-verbindung-eingrenzen`, `lf3-fehlerbild-protokoll`, `lf3-ipv4`, `lf3-netzmaske`, `lf3-subnetting` | `lf3-lernziel` | teilweise |
| LF4 Schutzbedarfsanalyse im eigenen Arbeitsbereich durchführen | 40 | `lf4` / Schutzbedarf und Grundlagen der IT-Sicherheit | 6: `lf4-schutzbedarf`, `lf4-schutzziele`, `lf4-risiken`, `lf4-handlungen`, `lf4-zugang`, `lf4-vorfall` | `lf4-lernziel` | teilweise |
| LF5 Software zur Verwaltung von Daten anpassen | 80 | `lf5` / Programmiergrundlagen und Datenverwaltung | 10: `lf5-anweisung`, `lf5-werte`, `lf5-ablauf`, `lf5-wiederholung`, `lf5-ablage`, `lf5-einordnen`, `lf5-testfall`, `lf5-doku`, `lf5-format`, `lf5-prozess` | `lf5-lernziel` | teilweise |

Zusätzlich im Jahr 1 außerhalb der Lernfelder: Einstieg `computer-grundlagen` (Den Computer kennenlernen) und drei Werkzeuge `lf3-zahlensysteme`, `lf3-einheiten`, `lf3-ipv4-rechner`.

### 3.2 Lehrjahr 2

| Lernfeld (KMK) | Std. | Katalog-ID / Katalogtitel | Lektionen (Modul-IDs) | Status |
|---|---|---|---|---|
| LF6 Serviceanfragen bearbeiten | 40 | `lf6` / Support und Bearbeitung von Servicefällen | keine | fehlt |
| LF7 Cyber-physische Systeme ergänzen | 80 | `lf7` / Vernetzte Geräte und cyber-physische Systeme | keine | fehlt |
| LF8 Daten systemübergreifend bereitstellen | 80 | `lf8` / Datenaustausch zwischen Systemen | keine | fehlt |
| LF9 Netzwerke und Dienste bereitstellen | 80 | `lf9` / Planung und Einrichtung von Netzwerken und Diensten | keine | fehlt |

### 3.3 Lehrjahr 3 (Fachrichtung Systemintegration)

| Lernfeld (KMK) | Std. | Katalog-ID / Katalogtitel | Lektionen (Modul-IDs) | Status |
|---|---|---|---|---|
| LF10b Serverdienste bereitstellen und Administrationsaufgaben automatisieren | 80 | `lf10b` / Serveradministration und Automatisierung | keine | fehlt |
| LF11b Betrieb und Sicherheit vernetzter Systeme gewährleisten | 80 | `lf11b` / Sicherer Betrieb vernetzter IT-Systeme | keine | fehlt |
| LF12b Kundenspezifische Systemintegration durchführen | 120 | `lf12b` / Planung und Umsetzung eines Systemintegrationsprojekts | keine | fehlt |

Hinweis: Auf dem Branch `lehrjahr-2/serviceanfragen` (lokal und Remote) liegt vermutlich Arbeit zu LF6. Dieser Branch wurde nicht ausgewertet. Der Bestand gilt nur für den ausgecheckten Branch.

## 4. Fehlende Einstiegslektionen je Lernfeld

Die Liste stammt aus dem Vergleich der RLP-Kompetenzabsätze mit den Lektionstiteln und -beschreibungen im Katalog. Sie ist ein Vorschlag für Aufträge, keine Zusage und keine Bewertung der vorhandenen Lektionen. Titel sind Arbeitstitel.

### Lernfeld 1 (vorhanden)
- Keine Lücke auf Absatzebene erkennbar. Offen laut `docs/plan-lf1-lf2.md`: Prüfung der Einzelziele und interaktive Browserprüfung.

### Lernfeld 2 (teilweise)
- Kaufvertrag und Rechtsfolgen (Annahme, Mängelrechte). Der Plan spart das ausdrücklich aus.
- Normen und Vorschriften über CE, GS und Elektro-Entsorgung hinaus (Betriebssicherheit elektrischer Geräte), soweit eine Primärquelle geprüft wird.

### Lernfeld 3 (teilweise)
- Anforderungen an die Client-Integration im Kundengespräch erfassen und Leistungskriterien ableiten.
- Netzwerkpläne lesen (physisch und logisch), technische Dokumente auch in fremder Sprache, betriebliche Sicherheitsvorgaben.
- Integrationskonzept planen und Komponenten nach Leistungskriterien auswählen (Energieeffizienz, Wirtschaftlichkeit).
- Arbeitsprozess reflektieren (Optimierung, Wirtschaftlichkeit, Ökologie).

### Lernfeld 4 (teilweise)
- Sicherheitsleitlinie lesen und rechtliche Regelungen zur Informationssicherheit einordnen.
- Schadensszenarien klassifizieren und Bedrohungen gewichten.
- Schutzbedarfsanalyse im eigenen Arbeitsbereich durchführen und dokumentieren.
- Ergebnisse mit der Leitlinie abgleichen und Maßnahmen empfehlen.
- Arbeitsablauf reflektieren und Verantwortung im Sicherheitsprozess übernehmen.
- Hinweis: Die frühere Abschlussaufgabe wurde am 16.10.2026 entfernt. Laut `docs/plan-lf4.md` wurde LF4 nie gegen das PDF abgeglichen.

### Lernfeld 5 (teilweise)
- Verfügbarkeit, Datenschutz und Datensicherheit als eigener Aspekt der Datenanalyse (laut `docs/plan-lf5-luecke.md` nur angerissen).
- Speicherlösungen vergleichen (über das Datenformat hinaus).
- Anpassung einer Anwendung planen und ein Vorgehen begründen.
- Umsetzung im Team.
- Eignung der angepassten Anwendung beurteilen.

### Lernfelder 6 bis 9 und 10b bis 12b (fehlen)
Für jedes dieser Lernfelder fehlen alle Lektionen. Vorschlag: je Lernfeld mit einer Einstiegslektion zum ersten Kompetenzabsatz beginnen:
- LF6: Serviceanfrage entgegennehmen und Status dokumentieren (SLA, Reaktionszeit).
- LF7: Datenfluss zwischen physischer Welt und IT-System lesen.
- LF8: Datenquellen für einen Kundenauftrag unterscheiden.
- LF9: Anforderungen an ein Netzwerk im Kundengespräch ermitteln.
- LF10b: Serverdienste und Plattformen nach Kundenanforderung unterscheiden.
- LF11b: Schutzziele im Kundengespräch ermitteln und Risiken benennen.
- LF12b: Anforderungsanalyse und Projektziele ableiten.

## 5. Annahmen und Grenzen

Nicht belegt, sondern Annahme:
1. Der Status "vorhanden" und "teilweise" beruht auf Katalogtiteln, Katalogbeschreibungen und den Projektplänen. Die HTML-Inhalte der Lektionen wurden nicht einzeln gegen den RLP gelesen.
2. Die Lückenlisten in Abschnitt 4 sind eine Zuordnung der RLP-Absätze durch den Autor. Eine Fachprüfung durch Dennis oder Lehrkräfte steht aus.
3. "vorhanden" heißt nur, dass jeder Kompetenzabsatz einer Lektion zugeordnet werden kann. Der Zeitrichtwert ist damit nicht abgedeckt, die Lektionen sind kurze Einstiege. Eine Umrechnung auf Unterrichtsstunden wurde nicht vorgenommen.
4. Ob die Zählung "abgeschlossen" je Lernfeld auf der Startseite im Browser stimmt, wurde nicht geprüft. Die Beschreibung ergibt sich aus dem Code.
5. Laut `README.md` ist der RLP-Abgleich bislang offen. Dieses Dokument ist ein Abgleich gegen das Original-PDF, aber kein Nachweis der Abdeckung durch die Berufsschule vor Ort.
6. Der Branch `lehrjahr-2/serviceanfragen` ist nicht ausgewertet.
