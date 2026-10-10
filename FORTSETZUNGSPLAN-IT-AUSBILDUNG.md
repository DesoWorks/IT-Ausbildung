# Fortsetzungsplan – IT-Ausbildung

Stand der Bestandsaufnahme: 10.10.2026, 18:19 CEST  
Projektwurzel: `/home/starnet/projects/IT-Ausbildung`  
Arbeitszweig: `prototype/computer-grundlagen`

## Ziel

Ein geprüftes, praktisch nutzbares erstes Ausbildungsjahr für Fachinformatiker/-innen Systemintegration auf dem vorhandenen statischen HTML/CSS/JS-Fundament. Inhalte werden schrittweise geliefert; keine Veröffentlichung, Sichtbarkeitsänderung oder Merge.

## Gelesener Bestand

- `README.md`: Windows-Start über `start/IT-Ausbildung starten.html` ist vorgesehen, der interaktive Windows-file://-End-to-End-Test ist ausdrücklich offen. Tests dokumentieren, dass der Logiktest ein DOM-Mock und kein echter Browser ist.
- `js/module-daten.js`: vorhandenes Modul „Den Computer kennenlernen“ ist verfügbar; LF 1–5 sind als kommende Themen aufgeführt. IPv4 und Subnetting sind nur geplante Unterthemen von LF 3.
- `js/glossar-daten.js` und `js/anzeige-glossar.js`: zentrales Glossar und Anzeigeoptionen existieren; neue Lektionen sollen diese wiederverwenden.
- `tests/logic.test.js`, `tests/startseite.test.js`: vorhandene automatisierte Testdateien.
- Lokaler `HEAD`: `5810f34309b37d7e8f75604c8dd0814e746428dc` („Add reading controls, glossary and local start guide“). `git status --short --branch` zeigte `## prototype/computer-grundlagen` ohne geänderte Dateien. Lokale Branchliste enthält keinen Remote-Tracking-Branch.
- GitHub PR #1 ist offen, nicht gemergt. Connector meldet PR-Head `a233ca2b1a745319050cd49c0ee586132476db98`, Basis `main` `6e6217778ea7148fc02c142b39072a2f573ce8ba`. Das PR-Diff beschreibt frühere Tests und offene interaktive Prüfungen.
- `git fetch origin pull/1/head:refs/remotes/origin/pr-1 --no-tags` scheiterte an der fehlenden HTTPS-Authentifizierung im Git-Prozess („could not read Username“). Keine Änderungen wurden verworfen oder zusammengeführt. Der PR-Diff aus dem GitHub-Connector ist lesbar, aber kein Ersatz für den lokalen Git-Abgleich.

## Offizielle Grundlagen – Prüfstatus

- Offizielle KMK-Downloadseite erklärt, dass KMK-Rahmenlehrplan (Berufsschule) und Ausbildungsordnung des Bundes (Betrieb) gemeinsam die Grundlage bilden. Sie listet „Fachinformatiker und Fachinformatikerin“ mit Datum 13.12.2019.
- FIAusbV ist auf `https://www.gesetze-im-internet.de/fiausbv/` abrufbar; die Inhaltsübersicht weist Ausbildungsrahmenplan und getrennte Prüfungsinhalte für Systemintegration aus.
- Der KMK-PDF-Abgleich ist **nicht abgeschlossen**: der zuletzt bekannte, vermutete Direktlink lieferte 404, und die KMK-Suchmaschine konnte über die verfügbaren Suchergebnisse nicht verlässlich zum PDF führen. Keine Lernfeldbezeichnung oder Sachzuordnung in diesem Plan wird deshalb als bereits original-PDF-verifiziert ausgegeben.
- Quellen:
  - KMK Downloadbereich: https://www.kmk.org/service/servicebereich-berufliche-schulen/downloadbereich-rahmenlehrplaene.html
  - FIAusbV: https://www.gesetze-im-internet.de/fiausbv/
  - Externe Lernfeldübersicht als Such-/Orientierungshilfe, nicht als amtliche Quelle: https://ausbildung-in-der-it.de/lernen/systemintegration/lernfelder/lf-1

## Sequenzielle Arbeitsschritte

1. **Nach 20:30 Uhr: Verfügbarkeit prüfen.** Zuerst Jarvis’ Kontingent/Erreichbarkeit bestätigen. Vorher keine neue Arbeit an Jarvis delegieren. Falls nicht verfügbar: bei diesem gesicherten Stand stoppen und „bereit für Jarvis“ melden; keine wiederholten Startversuche.
2. **Git-Zustand sicher abgleichen.** PR-Head und lokale Inhalte dateiweise vergleichen. Für den HTTPS-Fetch einen authentifizierten, verfügbaren Git-Zugriff nutzen; falls nicht verfügbar, lokale Unterschiede zu den via GitHub auslesbaren PR-Dateien konkret dokumentieren. Vor jeder Integration Backup/Arbeitszweig anlegen, Änderungen erhalten, Tests auf genau dem integrierten Commit laufen lassen. Keine Merge-Aktion am PR.
3. **Offizielle Planungsquelle verifizieren.** KMK-PDF über den aktuellen amtlichen Downloadbereich ermitteln und LF 1–5 direkt lesen. FIAusbV-Anlage und Prüfungsvorschriften ergänzend abgleichen. Bei weiter blockiertem PDF die fehlende Primärquellenprüfung offen markieren statt amtliche Bestätigung zu behaupten.
4. **Offene App-Prüfungen schließen.** Browserinteraktion für Navigation, Karten, Übungswahl, Korrekturrückmeldung, Wiederholung, lokale Speicherung und Anzeigeoptionen; zusätzlich 320 CSS-Pixel und 200 % Zoom. Screenreaderprüfung durchführen, wenn verfügbar; andernfalls konkret offen dokumentieren. DOM-/Mocktests getrennt als automatisierte Tests ausweisen.
5. **Kompakten Ausbauplan LF 1–5 erstellen.** Je Lernfeld Zielkompetenzen, einzelne kleine Lektionen, mindestens eine aktive Übung mit verständlicher Rückmeldung und Wiederholung sowie eine Lernfeld-Abschlussprüfung definieren. Das vorhandene Einstiegsmodul als Einstieg/Voraussetzung einordnen, nicht als zusätzliches Lernfeld. Keine ungeprüfte Lektionenserie bauen. Jahr 2 und 3 bleiben Übersichtsplanung.
6. **Neues Modul in kleinen Scheiben bauen.** IPv4-Adressen und Netzanteile → Netzmaske/Präfix → kleine Subnetting-Beispiele. Vor jeder Scheibe Inhalte mit Glossar/Anzeigeoptionen integrieren; Diagramm mit Textalternative; Tastaturbedienbare Übungen, Feedback, Wiederholung. Eine Scheibe erst nach Erklärung, Übungen, Rückmeldung und realer Bedienungsprüfung als fertig werten.
7. **Abschluss und Übergabe.** Tests auf dem protokollierten finalen lokalen Commit ausführen; PR-Inhalt mit diesem Ergebnis abgleichen und nur passende Änderungen in PR #1 aktualisieren. Repository-Inhalt und Git-Historie für eine spätere öffentliche Freigabe prüfen, ohne zu veröffentlichen oder zu mergen. HOSHI genau einmal bei Abschluss oder einem konkreten Blocker informieren.

## Geplante Inhaltsstruktur – Entwurf, noch gegen KMK-Original zu prüfen

Die folgende Gliederung ist eine Arbeitsvorlage für den Ausbauplan, keine amtlich verifizierte Lernfeldzuordnung. Unterrichtsreihenfolge und Gewichtung können je Berufsschule und Betrieb abweichen.

- **LF 1 – Betrieb und berufliche Rolle:** Lernziele: Betrieb/Leistungen beschreiben, Rolle und Zusammenarbeit einordnen. Lektionen: Betrieb und IT-Aufgaben; Zuständigkeiten/Kommunikation; Arbeits- und Ausbildungsalltag. Übungen: kurze Betriebsbeschreibung, Zuständigkeiten zuordnen. Abschluss: Fallaufgabe „neue IT-Anfrage im Betrieb“ mit begründeter Zuständigkeit und verständlicher Übergabe.
- **LF 2 – Arbeitsplatz und IT-Systeme:** Lernziele: Anforderungen erfassen und Arbeitsplatzkomponenten passend auswählen/erklären. Lektionen: Computer-Einstieg (bestehendes Modul); Eingabe/Verarbeitung/Ausgabe; Komponenten und Betriebssystem; ergonomische und sichere Arbeitsplatzgrundlagen. Übungen: Gerätefunktionen zuordnen, Ausstattung für ein Profil auswählen. Abschluss: begründeter Arbeitsplatzvorschlag. Das bestehende Modul ist als niedrigschwellige Einstiegseinheit vor bzw. in LF 2 einzuordnen.
- **LF 3 – Vernetzung von Clients:** Lernziele: einfache Netzwerkverbindungen und Client-Anbindung verstehen und beschreiben. Lektionen: Netzwerkbegriffe und Übertragungswege; IPv4-Adresse; Netzmaske/Präfix; einfache Subnetting-Schritte; Client-Konfiguration. Übungen: Adressanteile markieren, kleine Netze bestimmen, Konfiguration anhand einer Fallkarte prüfen. Abschluss: kleine Client-Anbindung samt Erklärung. IPv4/Subnetting zunächst nur als geplantes Thema auf der Startseite belassen, bis vorherige App-Prüfung und Plan abgeschlossen sind.
- **LF 4 – Schutzbedarf und IT-Sicherheit:** Lernziele: Informationen und Arbeitsbereiche nach Schutzbedarf einordnen sowie angemessene Grundmaßnahmen erklären. Lektionen: Schutzziele; Risiken/Schutzbedarf; Zugang, Daten und Arbeitsplatz; Vorfall melden. Übungen: kurze Fallsituationen bewerten, Maßnahme passend zuordnen. Abschluss: Schutzbedarf und Maßnahmen für einen einfachen Arbeitsplatz begründen.
- **LF 5 – Daten und Software:** Lernziele: Daten strukturiert verwalten und einfache Software-/Datenlösungen anwenden bzw. anpassen. Lektionen: Daten/Dateiformate; Tabellen und Datenstrukturen; einfache Abfragen/Auswertungen; Qualität und Datenschutz. Übungen: Datensätze prüfen, einfache Filter/Sortierung wählen, Fehler erkennen. Abschluss: kleine Datenaufgabe mit nachvollziehbarem Ergebnis und Datenschutzbegründung.

## Abgrenzung und Status

- Noch kein IPv4-/Subnetting-Lernmodul erstellt.
- Kein Merge, keine Veröffentlichung, keine Sichtbarkeitsänderung.
- Jarvis bis nach 20:30 Uhr nicht beauftragt.
- In dieser Bestandsaufnahme wurden keine Tests erneut ausgeführt; frühere Testergebnisse sind nur als im PR-Text bzw. README dokumentierte Angaben wiedergegeben.
- Nächster sinnvoller Fortsetzungspunkt: Schritt 1 oben, danach Jarvis erst bei bestätigter Verfügbarkeit beauftragen.


## Fortsetzung 10.10.2026, 18:44 CEST

- `git fetch origin` war erfolgreich; `origin/prototype/computer-grundlagen` zeigt auf `a233ca2b1a745319050cd49c0ee586132476db98`.
- Der lokale Stand vor dem Abgleich war `5810f34309b37d7e8f75604c8dd0814e746428dc`. Er und der Remote-Head haben keinen gemeinsamen Git-Vorfahren, enthalten aber jeweils denselben Änderungsstand zur Baseline (Commitnachricht „Add reading controls, glossary and local start guide“). Der inhaltsgleiche Commit auf Remote baut auf `96f3051`, der lokale auf `d0e478b` auf.
- Unterschiede im Arbeitsbaumvergleich betrafen `css/startseite.css`, `css/styles.css` und den Dateimodus von `start.sh`. Die Remote-Fassung von `css/startseite.css` wurde übernommen. Die lokalen Erweiterungen in `css/styles.css` (Navigation, Leseoptionen, Glossar und Kontrast) blieben erhalten. Der Dateimodus von `start.sh` wurde auf ausführbar zurückgesetzt. Es wurde kein bestehender Dateiinhalt verworfen.
- Der untracked Fortsetzungsplan wurde vor der Integration in Commit `b619e14` gesichert. Die Abgleichintegration ist Commit `d580e446a2e5890857f90fd574a126fbfe3df4c5`; der vorherige lokale Stand ist zusätzlich als `backup/pre-remote-reconcile-5810f34` erreichbar. Der Arbeitsbaum ist danach sauber.
- Der PR-Head selbst wurde nicht verändert; kein Push, Merge nach main oder Veröffentlichung. Lokaler Integrationscommit und PR-Head sind verschiedene Commits. Dateien aus dem PR-Arbeitsstand sind lokal eingebunden; für einen PR-Update wäre gesonderte Remote-Schreibaktion erforderlich.
- Verfügbarkeitsprobe für Jarvis: `team.dispatch` lieferte `reason=error`, leeren Text, 0 Tokens und 0 Tools, mit Vermerk über kontaminierte/replayte GitHub-Connector-Ausgabe. Das ist kein Nachweis eines Kontingentfehlers und erlaubt keine belastbare Aussage über das Kontingent. Jarvis' separate Session steht im Stationsstatus als „online“, was ebenfalls keine Kontingentbestätigung ist.
- Noch nicht ausgeführt: offene App-Bedienungsprüfungen, Ausbauplan-Verifikation gegen das KMK-Original-PDF sowie Entwicklung oder Test eines nächsten Moduls. Nächster sicherer Schritt: nach dem angekündigten Reset die Verfügbarkeit einmal bestätigen; nur bei verwertbarem Agentenlauf mit den offenen Prüfungen beginnen. Keine wiederholten Startversuche.
