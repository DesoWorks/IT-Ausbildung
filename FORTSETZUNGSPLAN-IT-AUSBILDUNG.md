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


## Fortsetzung: dokumentierte App-Prüfungen und Netzwerkmodul

### Bestehende App-Prüfungen (aus dem vorherigen Laufbericht übernommen)

Der vorherige Laufbericht meldet als bestanden: automatisierte `startseite.test.js` und `logic.test.js` (13/13); interaktive Chromium-Prüfung des lokalen `file://`-Starts, Modulnavigation, Übungsauswahl und Rückmeldung, Rücknavigation, Glossaröffnung und Anzeigeoptionen; außerdem kein horizontaler Überlauf bei 320 und 390 CSS-Pixeln. Das sind übergebene Testergebnisse; in dieser Fortsetzung wurden sie nicht erneut ausgeführt. Eine vollständige manuelle visuelle Prüfung bei 200-%-Zoom und ein Screenreader-Test blieben offen. Die damalige Aussage zum Remote-Head ist seit dem Git-Abgleich überholt.

### Git-/PR-Grundlage dieser Fortsetzung

- Arbeitszweig `prototype/computer-grundlagen`; Arbeitsbaum zu Beginn sauber.
- `git fetch origin` erfolgreich. Lokaler `HEAD` `5d228342390731448620c352fa9eb87fee6cea18` enthielt `origin/prototype/computer-grundlagen` `a233ca2b1a745319050cd49c0ee586132476db98` als Vorfahren; der lokale Fortsetzungsplan und Reconciliation-Commits waren bereits darüber aufgebaut. Keine auseinanderlaufenden Dateiänderungen beim aktuellen Stand.
- PR #1 offen, Basis `main`, Branch `prototype/computer-grundlagen`; Connector bestätigte Head `a233ca2b1a745319050cd49c0ee586132476db98` zum Prüfzeitpunkt.

### Modulentwicklung

- Das erste Netzwerkmodul ist auf eine einzelne kleine Scheibe begrenzt: IPv4-Adresse, vier Oktette, Wertebereich und Validierung. Netzmaske und Subnetting bleiben weitere geplante Lektionen; sie sind nicht Teil der gelieferten Scheibe.
- Die Scheibe gilt erst nach fachlicher Kontrolle, automatisierten Prüfungen und interaktiver Bedienungsprüfung als abgeschlossen. DOM-/Quelltextprüfungen sind nicht als interaktive Tests zu bezeichnen.
- Prüfgrenzen sind nach den tatsächlich ausgeführten Tests in diesem Abschnitt nachzutragen. Insbesondere bleiben 200-%-Zoom und Screenreader offen, wenn nicht real geprüft.


### Verifikation dieser Fortsetzung (10.10.2026)

- `node tests/startseite.test.js`: bestanden.
- `node tests/logic.test.js`: 13 bestanden, 0 fehlgeschlagen.
- `node tests/netzwerk-lektion1.test.js`: 14 Prüfungen bestanden.
- `node --check js/netzwerk-lektion1.js`, `node --check js/startseite.js` und `git diff --check`: bestanden.
- Interaktive Bedienungsprüfung in isoliertem Headless Chrome gegen den lokalen Entwicklungsserver: gestartet, Schritte Erklärung → Schaubild → Übung bedient, Glossarbegriffe geladen, falsche Quizantwort mit Erklärung gewählt und danach korrigiert, ungültige `192.168.1.256` und gültige `192.168.1.20` im Formular geprüft (jeweils korrekte Rückmeldung und Oktettzerlegung), Formular per Enter bedient, Rücklink zur Themenübersicht geprüft.
- Responsive Prüfung durch Chromium bei 320, 390 und 1280 CSS-Pixeln: Dokumentbreite 320, 390 bzw. 1265 CSS-Pixel; kein horizontaler Seitenüberlauf.
- Prüfgrenzen: Diese interaktive Prüfung wurde von uns per lokalem Chrome DevTools Protocol (CDP) durchgeführt, nicht über den integrierten Station-Browser. Die integrierte Testnavigation verweigerte die lokale URL trotz aktivem Server; GLaDOS stoppte richtliniengemäß nach diesem verweigerten Zugriff. Kein Screenreader-Test und keine echte manuelle Windows-Dateidoppelklickprüfung in dieser Fortsetzung. Kein Nachweis vollständiger WCAG-2.2-AA-Konformität.


## Navigation/Glossar-Überarbeitung (2026-10-10)

### Umgesetzt
- `js/navigation.js` erzeugt eine gemeinsame responsiv angeordnete Navigation; die Jahreskategorie ist nur auf Modulseiten standardmäßig geöffnet.
- Anzeigeoptionen werden in den Navigationsbereich gesetzt; Speicherungsschlüssel und Modul-Fortschrittsschlüssel wurden nicht geändert.
- Vollständige Glossarliste aus `js/anzeige-glossar.js` entfernt; eigenständige `glossar.html` verwendet `js/glossar-daten.js` und bietet Suche.
- Glossar-Rückweg nutzt eine erlaubte Liste von Dateinamen, sonst Rückfall auf Übersicht.
- Startseite und beide Lernmodule binden Navigation ein; kurze Fachwortdetails und vorhandene Lernschritte bleiben erhalten.
- Version `0.3.0-alpha.1`, Changelog, README und dieser Fortsetzungsplan aktualisiert.

### Geprüft
- `node --check` für `js/navigation.js`, `js/glossar-seite.js`, `js/anzeige-glossar.js` erfolgreich.
- `node tests/startseite.test.js` erfolgreich; `node tests/logic.test.js`: 13/13; `node tests/netzwerk-lektion1.test.js`: 14 Prüfungen.
- `git diff --check` erfolgreich.
- Google Chrome headless kann die lokale `file://`-Startseite laden; HTML-Ausgabe enthielt Anzeigeoptionen und gerenderte Übersicht. Das belegt Laden/DOM-Ausgabe, keine Interaktion.

### Noch offen / Grenzen
- Keine echte Bedienungsprüfung der Menüinteraktion, Tastatur-Escape, Suchfilter oder Glossar-Rückkehr abgeschlossen. GLaDOS' Browser-/Dateizugriff auf diesen Projektordner war isoliert; lokaler Testbrowser wies den Servernachweis zurück, Loopback im öffentlichen Browser ist gesperrt. Ein Versuch, Playwright-Skript auszuführen, scheiterte, weil das Node-Paket `playwright` hier nicht installiert ist. Keine Bibliothek nachinstalliert.
- Schmale Bildschirmansicht/200%-Zoom nicht interaktiv oder visuell verifiziert.
- Persistenz über Navigation wurde nicht getestet; lokale Speicherschlüssel sind unverändert.
- Screenreader und vorgesehener Windows-Doppelklick-Start nicht geprüft.
- Der zuvor bestätigte PR-Head `e9f094bcafef46cbae47d6d4756be39a31c90a0d` stimmt mit lokalem Ausgangscommit überein; PR wird erst nach Abschluss von Tests normal aktualisiert. Kein Merge/Release.


### Nachtrag: interaktive Bedienungsprüfung erfolgreich (2026-10-10)
- Mit separatem Headless Chrome über CDP gegen die echte lokale `file://`-App ausgeführt, ohne Browser-Schutzfunktionen abzuschalten.
- Tatsächlich per Browser-Interaktion geprüft: Menütaste per Aktivierung geöffnet, Escape geschlossen; Glossar-Link aus Übersicht mit `von=index.html`; alle 11 Glossareinträge sichtbar; Suche nach „Oktett“ filtert; Rückkehr zur Übersicht; Glossaraufruf und Rückweg von Netzwerkmodul.
- 320 CSS-Pixel: `scrollWidth=320`, `clientWidth=320`; die Ausbildungsjahr-Kategorie ist beim Modul kontextbezogen geöffnet. Bei 200% Page-Scale blieb der Menüknopf sichtbar und Dokumentbreite passte in die Viewportbreite.
- Persistenz: Glossar- und Anzeigepräferenzspeicher werden von den jeweiligen Skripten weiter unterstützt. In dieser Browserprüfung wurde nicht belastbar bestätigt, dass zuvor bestehender Übungsfortschritt nach Navigation/Reload wiederhergestellt wird; daher bleibt diese Persistenz-E2E-Prüfung teilweise offen.
- Screenreader und physischer Windows-Doppelklick bleiben offen. Kein vollständiger WCAG-Konformitätsanspruch.


## Layout- und Fortschrittskorrektur (10.10.2026)

### Änderungen
- Gemeinsames Desktoplayout: Seitenleiste 17rem und Body-Einzug 17rem statt 18rem; Header, Main, Lernschritte, Footer und Startseiteninhalt starten links im verfügbaren Inhaltsbereich und verwenden keine zusätzliche zentrierte schmale Startseitenbreite.
- Lange Kopf-, Navigations- und Kartentexte dürfen mit `overflow-wrap:anywhere` umbrechen. Kein `overflow:hidden` wurde für Seiten-/Inhaltsbereiche ergänzt; vorhandenes Clipping der kleinen Fortschrittsleiste dient ausschließlich der gerundeten Balkenform.
- `js/fortschritt.js` leitet den Abschluss ausschließlich aus bestehenden Lernschlüsseln ab. Für Computer-Grundlagen verlangt es gelesene Karten, richtige Übungsantworten, sämtliche richtigen Quizantworten und aufgerufenen Abschluss. IPv4 erfordert richtige Quizantworten, gültige eigene Adresse und gesehenen Abschluss. Kein LF3-/Gesamtmodulstatus wird daraus abgeleitet.
- Abschluss-Haken mit zugänglicher Beschriftung „Abgeschlossen“ werden beim zugehörigen Thema in der Übersicht und Navigation gerendert. Fortschrittsreset sendet ein lokales Aktualisierungsereignis; Rückkehr/Neuladen liest denselben bestehenden Speicher erneut. Keine separate Abschlussmarkierung wird gespeichert.
- Navigationseinträge nutzen Thema-ID `lf3-ipv4`; Subnetting und weitere geplante Inhalte erhalten weiterhin keinen Link oder Abschlussstatus.

### Verifikation
- `node tests/fortschritt.test.js`: bestanden. Prüft Layoutabstände/kein Content-Overflow-Verstecken, echte Zustandsableitung für beide vorhanden Themen, falsches Quiz, Reset-Äquivalent (entfernter Speicher), keine LF3-Markierung, zugängliche Beschriftung.
- `node tests/startseite.test.js`: bestanden.
- `node tests/logic.test.js`: 13/13 bestanden.
- `node tests/navigation-glossar.test.js`: bestanden.
- `node tests/netzwerk-lektion1.test.js`: 14 bestanden.
- Syntaxprüfungen für `fortschritt.js`, `startseite.js`, `navigation.js`, `app.js`, `netzwerk-lektion1.js` sowie `git diff --check`: bestanden.
- Interaktive/responsive Browserprüfung bleibt offen. Der kontrollierte Testbrowser wies den lokalen Server als nicht dem Agenten zugehörig zurück; `browser.navigate` akzeptiert keine `file://`-URLs. Chrome ist installiert, aber Playwright/Puppeteer/Selenium sind nicht vorhanden. Ein lokaler HTTP-Server wurde gestartet, nicht als Testbrowser-Prüfung ausgegeben.
- Noch zu prüfen: tatsächliche Browserdarstellung bei Desktop, 320/390 CSS-Pixeln und 200% Zoom für Übersicht, beide Module und Glossar; Tastaturbedienung, Fortschrittsanzeige in gerendertem UI, Reset/Aktualisierung interaktiv. Keine Screenreader-Prüfung in diesem Schritt. Kein Konformitätsanspruch.

### Arbeitsstand
- Änderungen liegen lokal im bestehenden Branch `prototype/computer-grundlagen`; kein Commit, Push, Merge oder Release in diesem Auftrag ausgeführt.


## Layoutkorrektur und Abschlussstatus (2026-10-10)

### Änderungen
- Desktoplayout in `css/styles.css` auf ein echtes Zweispalten-Grid umgestellt: Header liegt in erster Reihe über beide Spalten; Navigation beginnt erst darunter in eigener 17rem-Spalte; Hauptinhalt steht rechts mit 2rem Seitenabstand und bis 1200px begrenzter Breite. Auf schmalen Ansichten wird die Reihenfolge per Flexlayout auf Header, Menüschalter, Rückzeile, Inhalt gestellt.
- Startseiten-Einzug wurde so angepasst, dass Titel, Einführung und Karten innerhalb desselben gepolsterten Inhaltsbereichs bündig beginnen. Lange Titel dürfen vollständig umbrechen.
- Abschluss-Haken bleiben aus denselben gespeicherten Lernzuständen abgeleitet. Karten und Navigation aktualisieren über das Fortschrittsereignis; Wiederholung bleibt möglich.

### Automatisierte Prüfungen
- `node tests/fortschritt.test.js`, `node tests/startseite.test.js`, `node tests/logic.test.js` (13/13), `node tests/navigation-glossar.test.js`, `node tests/netzwerk-lektion1.test.js` (14) bestanden.
- `node --check` für `navigation.js`, `startseite.js`, `fortschritt.js`, plus `git diff --check`: bestanden.
- Bestehendes `tests/browser-navigation-cdp.js` lief erfolgreich gegen die lokale file://-App in isoliertem Chrome: Menü per Klick öffnen und per Escape schließen; Glossarsuche und Rückwege; 320px ohne Overflow; Menü auf 200% Page Scale sichtbar.

### Visuelle Prüfung
- Mit Headless Chrome tatsächlich Screenshots erzeugt und visuell geprüft: Desktop 1440×1100 für Übersicht und Netzwerkmodul; Screenshots `screenshots/uebersicht-desktop.png` und `screenshots/lernmodul-desktop.png`.
- Zusätzlich Viewport-Screenshots bei 320px und 390px für Übersicht, beide Module und Glossar unter `screenshots/viewport-tests/`; visuelle Stichprobe zeigte Menüschalter sichtbar, gut lesbare Umbrüche und keine Überlagerung. Weitere Inhalte laufen regulär unterhalb des Screenshot-Ausschnitts weiter.
- Aufnahmen mit 200% Geräteskalierung für dieselben Seiten erstellt; Mediengröße der gerenderten Screenshots 1440×1800 (Logikviewport 720×900). Keine vollständige manuelle Interaktion bei jeder einzelnen Seite/Skalierung vorgenommen.
- Fortschrittslogik per Unit-Assertions geprüft; dedizierter ausführbarer CDP-Test zur dynamischen Karten-/Nav-Hakenanzeige, Speicherreset und Reload war nicht erfolgreich (WebSocket-Prüfskript lief in Timeout). Daher ist die visuelle E2E-Bestätigung genau dieser Statuswechsel noch offen; Quelllogik und automatisierte Ableitungstests bestanden.
- Screenreader nicht geprüft; kein WCAG-2.2-AA-Konformitätsanspruch.

### PR
- PR #1 war zum Beginn offen, Basis `main`, Head `ca1b868eb456a6a6b778bd7cd379186aa33dae42`. Änderungen sind noch lokal und müssen nach Abschluss committed und normal gepusht werden; kein Merge oder Veröffentlichung.


## Fortsetzung: Lernfeld-Navigation, Dunkelmodus und Netzmaske (10.10.2026)

### Git-/PR-Grundlage
- Lokaler Branch `prototype/computer-grundlagen`, Start-HEAD `e0cb7ad22e52d53f4f31ebe6919b4d3400f4f83f`; `git fetch origin` erfolgreich; `origin/prototype/computer-grundlagen` und PR #1 meldeten denselben Head. Arbeitsbaum vor Beginn sauber.
- Kein Merge oder Release vorgenommen.

### Änderungen
- Geplante Karten/Unterthemen nutzen gemeinsame CSS-Farbwerte für hell, dunkel und hohen Kontrast. Navigation gruppiert Module aus `MODULE_DATEN` nach Ausbildungsjahr und ordnet Themen unter Lernfeldüberschriften; Einstieg „Den Computer kennenlernen“ bleibt separat. Der Sammelbereich „Weitere Themen“ entfällt. Geplante Items sind disabled-Text, kein Link.
- Anzeige-&-Lesen-Schalter und aktiver Navigationseintrag verwenden modusabhängige Vordergrundfarben; geplante Nummern/Titel/Status bleiben lesbar.
- Lektion 2 `module/netzmaske.html`: /24, 255.255.255.0, Netz-/Geräteanteil, Netzadresse, Broadcast und 254 nutzbare Adressen; SVG mit Textalternative und Tabelle; wiederholbare Aussagen- und Eingabeübungen mit fachbezogenem Feedback. Subnetting bleibt geplant.
- Glossar um Netzmaske, Präfixlänge, Netzanteil, Geräteanteil, Netzadresse und Broadcastadresse ergänzt. Lektion nutzt bestehende Anzeigeoptionen, eigener Schlüssel `it-ausbildung.netzmaske.v1`; Abschluss wird nur aus dieser Lektion abgeleitet.
- Version `0.4.0-alpha.1`, README und Changelog angepasst.

### Tests
- `node tests/netzmaske.test.js`, `tests/startseite.test.js`, `tests/logic.test.js` (13/13), `tests/navigation-glossar.test.js`, `tests/fortschritt.test.js`, `tests/netzwerk-lektion1.test.js` (14), Syntaxchecks und `git diff --check` bestanden.
- Headless Chrome-CDP-Prüfung gegen lokale `file://`-App bestanden; Screenshots: `screenshots/uebersicht-dunkel-navigation.png`, `screenshots/netzmaske-uebung-desktop.png`, `screenshots/netzmaske-200-prozent.png`, `screenshots/glossar-dunkel.png`. Übersichtsscreenshot visuell geprüft: Dunkelmodus aktiv, geplante Karten und ihre Beschriftungen sichtbar. Lektion-Screenshot zeigt die neue Seite gerendert.
- Interaktiv geprüft: drei Jahresgruppen, separater Einstieg, geplante Items ohne Links, Quiz-Falschantwort samt Erklärung und Korrektur, fehlerhafte Netz-/Broadcastwerte mit Feedback, danach richtige Adressen, Menüöffnung und Escape-Schließung.
- Responsive Prüfung: 320/390 CSS-Pixel zeigen das Menü; Dokumentbreite passt jeweils zum Viewport. Desktop 1440px ohne horizontalen Überlauf. Bei 200% Page-Scale (Logikviewport 720 CSS-Pixel) bleibt Menü sichtbar und Dokumentbreite 705px; Screenshot gespeichert.
- Kontrastwerte aus den gerenderten Farben, WCAG-Luminanzformel: geplante Fläche/Text 10.07:1; Lernfeldbeschriftung 10.07:1; Anzeige-&-Lesen-Schalter 11.46:1; aktive Navigation 8.71:1. Alle über 4.5:1.
- Kein Screenreader- oder echter Windows-Doppelklick-Test in dieser Fortsetzung; keine vollständige WCAG-Konformität behauptet.

### Offene Risiken
- Der Arbeitsbranch hatte vor der Bearbeitung denselben Head wie PR #1. Branch-Head nach den Änderungen ist noch nicht gepusht oder per GitHub bestätigt.
- Keine echte Windows-Doppelklick- oder Screenreaderprüfung in dieser Fortsetzung. Vor Merge/öffentlicher Freigabe verbleiben diese manuellen Prüfungen.


## Fortsetzung: Navigation, Feedback und Subnetting (Arbeitsstand)

- Arbeitszweig `prototype/computer-grundlagen` und origin/PR-Head stimmten vor Beginn auf `53ad8afd2b0185e25d3d7964f8efa9dc00564f88` überein.
- Lernfeldgruppen in der gemeinsamen Navigation verwenden native, einzeln aufklappbare `details/summary`; das zur aktuellen Lektion passende Lernfeld ist beim Seitenaufruf geöffnet. Geplante Unterthemen bleiben ohne Link als „In Kürze“.
- Übungsfeedback wurde in der Computer-Einheit, IPv4-, Netzmasken- und neuen Subnetting-Übungen auf sichtbare Einzelbewertungen, unbeantwortete Aufgaben und Ergebnisüberschriften umgestellt; Antwortänderungen leeren das vorherige Sammelergebnis. Die Netzmasken-Eingaben sind nun ebenfalls einzeln ausgewertet.
- Neue Lektion `/24` zu zwei `/25`-Netzen: Maske `255.255.255.128`; Netzadressen `.0` und `.128`; Broadcasts `.127` und `.255`; nutzbare Bereiche `.1–.126` und `.129–.254`. Schaubild mit SVG-Textalternative, Begriffe aus zentralem Glossar und Übung.
- Version `0.5.0-alpha.1`; Changelog aktualisiert.
- Erfolgreich: `node --check` für App-/Netzwerkskripte; `startseite.test.js`, `fortschritt.test.js`, `logic.test.js` (13/13), `navigation-glossar.test.js`, `netzmaske.test.js`, `netzwerk-lektion1.test.js` (14) und `subnetting.test.js`; `git diff --check`. Ein interaktiver Chrome-CDP-Test über lokale `file://`-Seiten besteht für Navigation/Escape, Glossar-Suche/-Rückweg, gespeicherte Anzeigeeinstellung, 320 px und Page-Scale 200 %. Der vorhandene CDP-Test wurde an die hinzugefügten Glossarbegriffe und aktuelle Linkbeschriftung angepasst.
- Sichtbare Screenshots aufgenommen: `screenshots/subnetting-desktop.png`, `screenshots/subnetting-320.png`, `screenshots/subnetting-200.png`. Desktop/Mobil-Screenshots sind visuell durchgesehen. Screenshot-Emulation ist jedoch kein Nachweis browserseitiger echter 200-%-Textvergrößerung. Hell/Dunkel/hoher Kontrast in dieser Runde nicht vollständig visuell getestet; Screenreader nicht getestet.
- Der Agent-Browser verweigerte lokalen Servernachweis; HTML-interaktive Prüfung gelang stattdessen mittels bestehendem Chrome-CDP-Skript über `file://`. Lokaler `python -m http.server` wurde gestartet, Port 8765 war belegt, Port 8766 lief; der UI-Test nicht auf diesem Server ausgeführt.
- Stand zum Dokumentationszeitpunkt noch uncommitted. Vor PR-Abschluss: endgültige vollständige Test-/Diff-Prüfung, Commit, normaler Push und PR-Head nach Fetch/GitHub bestätigen. Kein Merge/Release.


## Bestandsprüfung und Vorbereitung: Subnetting-UI / Tools & Nachschlagen (10.10.2026)

### Arbeitsstand und Grenzen
- Projektwurzel: `/home/starnet/projects/IT-Ausbildung`; Branch `prototype/computer-grundlagen`; bei Prüfung `HEAD=7df1a7a8bc81030d3bff261016dc08979e02f59b`, Arbeitsbaum sauber. Keine Quellcodeänderungen, kein Merge oder Push vorgenommen. Jarvis nicht kontaktiert und keine Verfügbarkeitsprobe ausgeführt.
- Die im aktuellen Auftrag erwähnten Screenshots waren nicht als zusätzliche Bilddateien zugänglich. Vorhandene `screenshots/subnetting-desktop.png`, `subnetting-320.png` und `subnetting-200.png` sind lediglich Ansichten der ersten Lektionsteile; das Schaubild, die Adresseingaben und deren Prüfergebnis sind in diesen Frames nicht sichtbar. Sie belegen die benannten Defekte nicht; Ursachen unten folgen aus HTML/JS/CSS.
- Beigefügte Dateien waren nicht lesbar: `ipv4cheatsheet.pdf` (übermittelte Workspace-Angabe `.attachments/c8ee3dbd-f0b1-42eb-84dc-a144e507ea04.pdf`) und `IPv6CheatSheet.pdf` (`.attachments/23862872-52a0-4bec-a6e0-a9ca80366f73.pdf`). Die PDF-Lese- und Shell-Zugriffe im Projektordner fanden beide Pfade nicht; Inhalt daher nicht ausgewertet. Für eine spätere Themenvorlagenprüfung müssen die Anhänge erneut im Projekt verfügbar gemacht werden.

### Belegte Ursachen und gezielte Korrekturen
1. **SVG-Beschriftungen über Rahmen / mögliche Überlagerung:** `module/subnetting.html` enthält das Diagramm als statische SVG mit `viewBox="0 0 760 190"`; jede Teilnetzbox ist 355 Einheiten breit. Die langen Detailbeschriftungen („Netz .0 · Hosts … · Broadcast …“) sind jeweils ein einzelnes `<text>`-Element mit mittiger Textausrichtung, keine Zeilenaufteilung. SVG-Text wird nicht automatisch umgebrochen. `css/netzwerk.css` setzt `.svg-label` auf 24px und das SVG auf `max-width: 640px` (Dateizeilen: `module/subnetting.html` 24; `css/netzwerk.css` 11, 15, 17–19). Damit ist Überbreite/Überlappung durch lange Textläufe technisch plausibel und responsive Skalierung verkleinert zwar alles, schafft aber keinen Zeilenumbruch. **Korrektur:** Diagramm als responsive HTML-/CSS-Teilnetz-Karten mit eigener Textzeile pro Merkmal und Grid `repeat(2,minmax(0,1fr))`; unter definierter Breite eine Spalte. Alternativ gezielte SVG-Textelemente mit getesteten `<tspan>`-Zeilen. Farbflächen mit Textlabels „Teilnetz 1/2“, Netz/Host-Werte und zugänglicher Textalternative kennzeichnen. Nichts abschneiden.
2. **Eingabefelder zu flach/Browser-Default:** In `module/subnetting.html` 29 fehlen bei `#net1` und `#net2` `type="text"`. HTML lässt sie zwar als Textfelder rendern, jedoch matcht der vorhandene Selektor `css/netzwerk.css` 32–42 `.netz-eingabe-gruppe input[type="text"]` nicht. Anders als Netzmaskenfelder erhalten sie daher weder `font: inherit`, `min-height:48px`, Padding noch kontrollierte Rahmen-/Flächenfarben. **Korrektur:** Typ explizit setzen, Eingabestil robust auf `.netz-eingabe-gruppe input` oder alle Textcontrols vereinheitlichen; mindestens Schrift, Innenabstand, Bedienhöhe wie `module/netzmaske.html` und vorhandene Lektionen.
3. **Button ohne Abstand:** In `module/subnetting.html` 29 steht der Submit-Button unmittelbar nach `</div>` der Eingabegruppe. `css/netzwerk.css` 30–42 gibt nur der Eingabegruppe Gap/Margin; für den Button innerhalb desselben Formulars gibt es keine Layoutgruppe oder Margin-Regel. **Korrektur:** Formularbereich mit konsistentem vertikalem `gap`/Abstand; Ergebnisbox darunter mit eigenem Abstand. Abstände visuell gegen vorherige Module vergleichen.
4. **„undefined“ und fehlender Aufgaben-/Wertbezug:** `js/subnetting.js` 9–12 definiert freie Eingabeaufgaben mit Feld `label`, nicht `text`. In `check()` wird jede Frage aber mit `resultRow(q.text, ...)` gerendert (`js/subnetting.js` 29–38). Für `net1`/`net2` ist `q.text` undefiniert; Stringverkettung in `resultRow` rendert wörtlich `undefined`. Zusätzlich enthält die Ergebniszeile den abgegebenen Wert nicht (`resultRow` 24), und bei leerer Eingabe wird lediglich „Noch nicht beantwortet“ ausgegeben. **Korrektur:** Ergebnisdatenmodell vereinheitlichen (`prompt` + `label`/`getValue`), Antwortwert sicher auswerten und sichtbare Zeile aus Aufgabenname, eingegebenem Wert (leere Antwort explizit „keine Eingabe“), Richtig/Falsch und passender Erklärung zusammensetzen. Für fehlende Werte einen sicheren Fallback einsetzen, niemals `undefined` ausgeben.
5. **Ergebnistexttests decken den Bug nicht ab:** `tests/subnetting.test.js` prüft aktuell statischen HTML-Inhalt, Daten-/Fortschrittsflags und Zahl der Fragen/Felder. Es führt `check()` nicht mit DOM-Formular aus und behauptet/prüft keinen tatsächlich gerenderten Rückmeldungstext. Der Fehler kann daher trotz bestandenem Rechentest bestehen bleiben. **Korrektur/Abnahmekriterium:** gezielter Browser- oder DOM-Integrationstest submitet korrekt, falsch und leer; prüft `#subnet-result.innerText` tatsächlich, dass beide Aufgabenlabels, eingegebene Werte bzw. „keine Eingabe“, Erklärungen und Zusammenfassung erscheinen, dass `undefined` nie vorkommt, und dass nur eingereichte richtige Werte die „Alles richtig“-Überschrift auslösen. Nach Antwortänderung muss alte Ergebnisbox verschwinden; Tastaturbedienung und Screenreader-Ankündigung/Fokusverhalten zusätzlich prüfen.
6. **Abschlussseite/Leerraum:** Im geprüften HTML gibt es keine separate Abschlussseiten-Route; Abschluss ist `#abschluss` im selben Dokument und wird von `step()` in `js/subnetting.js` 49 eingeblendet. Die Lernnavigation samt Fortschrittsanzeige (`module/subnetting.html` 10) bleibt oberhalb des `main`; gemeinsame Regeln geben `.schritte` oben 1rem Margin (`css/styles.css` 77 ff.) und `main` zusätzlich 1rem Padding (`css/styles.css` 149). Die vorliegenden Screenshotdateien zeigen nicht den Zustand `#abschluss`. Damit ist ein genereller Abstand von Lernnavigation zu Inhalt durch die zwei Layoutabstände belegt, aber die vom Commander beschriebene besonders große Lücke auf der Abschlussansicht ist mit dem verfügbaren Frame nicht als konkrete gerenderte Ursache abschließend verifiziert. **Korrektur zur nächsten Umsetzung:** gemeinsamen Layoutabstand an einer Stelle definieren und den doppelten vertikalen Abstand zwischen `.schritte` und `main` vermeiden; Abschlusszustand per Browser-Screenshot prüfen und sicherstellen, dass dort keine leere/zusätzliche Navigationsfläche entsteht. Nicht mit `overflow:hidden` kaschieren.

### Prioritäten und Abnahmekriterien für die nächste Umsetzung
1. Funktionaler Rückmeldungsfehler (Aufgaben-/Wertdatenmodell): keine „undefined“-Zeichenfolge; sichtbare Auswertung muss Aufgabenbezeichnung, eingegebenen Wert, Urteil und fachliche Erklärung jeder Antwort enthalten; richtige, falsche, teilweise richtige, leere und nachträglich geänderte Eingaben testen. Assertions auf den echten angezeigten Text, nicht nur Rechenfunktionen.
2. Layout-CSS/Formular: gleiche Schrift, Innenabstände und Mindestbedienhöhe wie bisher; klarer Abstand zwischen Eingabegruppe, Submitbutton und Ergebnisbox; Fokus sichtbar; per Tastatur vollständig.
3. Diagramm neu strukturieren und responsiv testen: zwei Teilnetz-Karten nebeneinander bei ausreichender Breite, untereinander auf schmaler Fläche/Zoom. Lange Inhalte umbrechen, kein Clipping/Überlappen. Farbe ist redundant durch Beschriftung; Textalternative fachlich vollständig.
4. Einheitlicher Vertikalabstand zwischen Lernschritt-Navigation/Fortschritt und Hauptinhalt; Abschlussansicht gezielt mitscreenshotten.
5. Auf Desktop und schmalen Viewports, 320/390 CSS-Pixeln und 200% Zoom visuell prüfen; Eingaben/Button/Feedback tatsächlich bedienen; Testzustände samt sichtbarem Ergebnistext dokumentieren. Automatisierte Rechentests separat als solche ausweisen. Dunkel/Hell/hoher Kontrast sowie vorhandene Glossar-/Anzeigeoptionen kurz regressionsprüfen.

### Tools & Nachschlagen – gemeinsame Spezifikation und Etappen
**Gemeinsames Muster für jede offlinefähige, tastaturbedienbare HTML-Seite:** 1) Eingabe(n) inklusive Einheit, Beispiel und verständlicher Validierung; 2) unmittelbar sichtbares Ergebnis; 3) Rechenweg mit den konkret eingesetzten Werten und Einheiten; 4) kurze Erklärung samt Annahmen/Grenzen; 5) Verweis zur passenden Lektion. Gemeinsame Navigation, Glossardaten/-erklärungen und Anzeigeoptionen verwenden; Fachwörter zusätzlich an der relevanten Stelle kurz erklären. Eigene Texte/Diagramme erstellen, keine Gestaltung, Logos oder wörtlichen Texte der nicht zugänglichen PDFs kopieren.

**Etappe A – Zahlensysteme:** Binär, Dezimal, Hexadezimal; Ein-/Ausgabe in allen Basen, Validierung; Stellenwertdarstellung und schrittweise Umrechnung anhand konkreter Ziffern/Werte.

**Etappe B – Datenmengen:** bit, B, kbit, Mbit, kB/MB/GB/TB, KiB/MiB/GiB/TiB; dezimale 1000er- und binäre 1024er-Schritte getrennt und klar benennen, Einheitenumrechnung mit nachvollziehbarer Rechnung.

**Etappe C – IPv4-Rechner/Tabelle:** Adresse + Präfix oder Maske; Präfix, Maske, Netzadresse, Broadcast, Gesamtadresszahl und nutzbarer Bereich. Standardbereich /0–/30 sauber unterscheiden; /31 ist gemäß RFC 3021 Sonderfall nur für Punkt-zu-Punkt-Verbindungen (beide Adressen verwendbar); /32 beschreibt genau eine Adresse/Hostroute und hat kein gewöhnliches Hostintervall. Definition und Anzeige dieser Fälle fachlich präzise und ohne pauschale „Netz/Broadcast abziehen“-Regel.

**Spätere Etappen:** D) Übertragungsdauer/Datenrate; E) Bilddatenmenge aus Pixeln/Farbtiefe; F) Video: Rohdaten aus Bildrate/Dauer sowie komprimierte Größe bei vorgegebener Bitrate getrennt ausweisen; G) elektrische Größen, Energie und USV-Laufzeitschätzung mit sichtbaren Annahmen; H) IPv6-Nachschlagen/Schreibweisenprüfung, RFC-5952-Empfehlungen. IPv6 bleibt aus dem ersten Tools-Release heraus.

**Pro Modul fertig heißt:** fachlich belegte Formeln und Randfälle; Erklärung + Beispiel; tastaturbedienbare Eingabe; validierte richtige/falsche/fehlende Eingaben; sichtbarer Ergebnistext und eingesetzter Rechenweg automatisiert geprüft; interaktive Bedienung sowie kleine/große Ansicht geprüft. Module nacheinander liefern, erst nach diesen Gates zur nächsten Etappe gehen.

### Fachliche Primärquellen geprüft
- RFC Editor, **RFC 4632 / BCP 122**, CIDR und Präfixnotation: https://www.rfc-editor.org/rfc/rfc4632 (direkt gelesen; Norm für klassenlose IPv4-Präfixkonzepte).
- RFC Editor, **RFC 3021**, /31 auf Punkt-zu-Punkt-Links: https://www.rfc-editor.org/rfc/rfc3021 (direkt gelesen; Abschnitt 2.1 erklärt, dass beide Adressen bei /31 als Hostadressen interpretiert werden).
- RFC Editor, **RFC 791**, Internet Protocol/IPv4: https://www.rfc-editor.org/rfc/rfc791 (direkt gelesen; Hintergrundquelle zum IPv4-Protokoll).
- RFC Editor, **RFC 4291**, IPv6 Addressing Architecture: https://www.rfc-editor.org/rfc/rfc4291 (direkt gelesen; Adressarchitektur, Textnotation und Typen; Seite nennt Aktualisierungen, daher bei späterer Umsetzung zusätzlich einschlägige Updates beachten).
- RFC Editor, **RFC 3879**, Site-Local formal deprecated: https://www.rfc-editor.org/rfc/rfc3879 (direkt gelesen; daher nicht als aktuelle IPv6-Empfehlung lehren).
- RFC Editor, **RFC 4007**, IPv6 scoped address architecture: https://www.rfc-editor.org/rfc/rfc4007 (direkt gelesen; erklärt, dass unicast Site-Local als veraltet behandelt wird).
- RFC Editor, **RFC 5952**, kanonische IPv6-Textdarstellung: https://www.rfc-editor.org/rfc/rfc5952 (direkt gelesen; Empfehlung zu Nullenkompression/Kleinschreibung; RFC 4291 selbst bleibt flexibler).
- PDF-Bezug: Weil beide bereitgestellten Cheatsheets konkret nicht zugänglich waren, besteht noch kein Vergleich ihrer Themenauswahl/Fehler mit diesen RFC-Quellen. IPv4-„nutzbare Adressen“ müssen abhängig von Präfix und Einsatzkontext erklärt werden; /31 nicht wie übliches Broadcast-Subnetz behandeln. IPv4-Compatible IPv6 nicht als aktuelle Betriebsempfehlung einplanen; vor späterer Umsetzung die aktuelle RFC-4291-Fassung und Updates erneut verifizieren.

### Status
- Dies ist Vorbereitung. Noch keine Korrekturen an `module/subnetting.html`, `js/subnetting.js`, CSS oder Tests implementiert; kein App-Code geändert. Keine Jarvis-Beauftragung/Probe. Keine Merge-, Push- oder Veröffentlichungsaktion.


## PDF-Auswertung und Vorbereitung „Tools & Nachschlagen“ (11.10.2026)

### Zugriff und Herkunft der Arbeitskopien
- Extraktion erfolgte aus den bestätigten absoluten Agenten-Workspace-Pfaden (Shell-CWD blieb separat `/home/starnet/projects/IT-Ausbildung`):
  - `ipv4cheatsheet.pdf`: `/home/starnet/.local/share/StarNet/workspaces/agent/.attachments/c8ee3dbd-f0b1-42eb-84dc-a144e507ea04.pdf` (53.577 Bytes, 1 Seite).
  - `IPv6CheatSheet.pdf`: `/home/starnet/.local/share/StarNet/workspaces/agent/.attachments/23862872-52a0-4bec-a6e0-a9ca80366f73.pdf` (66.959 Bytes, 2 Seiten).
- Beide Dateien vorhanden, nicht verschlüsselt und durch `pdfinfo`/`pdftotext -layout` erfolgreich lesbar. Die Anhänge wurden nicht verschoben oder verändert.
- **Arbeitsregel:** Attachment-Referenzen wie `.attachments/<Dateiname>` werden relativ zum Agenten-Workspace aufgelöst. Shell-Aufrufe starten dagegen im festgelegten Projektverzeichnis. Nicht versuchen, Attachment-Referenzen gegen die Projektwurzel oder einen Windows-PC-Pfad aufzulösen.

### Aus den PDFs extrahierte Themen
**IPv4-Cheatsheet (Adobe InDesign CC 13.0, erstellt 2017; 1 Seite):**
- CIDR-Präfixe /0–/32, Subnetzmasken, Gesamtanzahl von Adressen und Wildcard-Masken.
- Dezimal-/Binärumrechnung für Masken; Beispiel der Zerlegung einer IPv4-Adresse in vier Oktette.
- Private IPv4-Bereiche 10/8, 172.16/12 und 192.168/16; außerdem Loopback 127/8 und Link-Local 169.254/16.
- Historische Adressklassen A–E und knappe CIDR-/Wildcard-Erklärungen.

**IPv6-Cheatsheet (Adobe InDesign CC 13.0, erstellt 2018; 2 Seiten):**
- 128-Bit-Adressformat und Headerfelder; Next Header und Hop Limit.
- Textnotation: führende Nullen weglassen, aufeinanderfolgende Nullfelder komprimieren, `::` höchstens einmal; IPv6-Adressen mit Port in URLs in eckige Klammern setzen.
- Global Unicast, Link-Local, Multicast, IPv4-mapped, Dokumentationsbereich, Unique Local und Default/Unspecified/Loopback.
- Präfix-/Adressaufteilung, Extension Headers, ICMPv6 sowie Konzepte Dual Stack, Tunneling und Translation.
- Das Blatt zeigt ebenfalls Site-Local `FEC0::/10`, IPv4-Compatible IPv6, Teredo und 6to4. Diese Einträge sind als historische/Status-erklärende Beispiele zu behandeln, nicht als aktuelle Empfehlung. Es nennt zudem mehrere feste Präfix-Aufteilungen; diese nicht als universelle Regel lehren.

### Fachliche Korrekturen und Einordnung vor späterer Umsetzung
- IPv4-Klassennetz A/B/C ist historische Einordnung; heutige Subnetzplanung und Rechner müssen klassenlos mit CIDR-Präfixen arbeiten.
- Die Adressanzahl aus einer Maske ist zunächst `2^(32-Präfix)` Gesamtadressen. Nutzbare Hostadressen dürfen nicht pauschal als Gesamtzahl minus 2 dargestellt werden: insbesondere /31 kann gemäß RFC 3021 auf Punkt-zu-Punkt-Verbindungen beide Adressen als Endpunkte verwenden; /32 ist eine einzelne Adresse/Hostroute ohne gewöhnlichen Hostbereich. Auch andere Spezial-/Einsatzkontexte müssen klar abgegrenzt werden.
- Wildcard-Maske ist die bitweise Invertierung der Netzmaske und kommt insbesondere in konkreten Konfigurationskontexten vor; sie ist nicht selbst die Netzmaske und soll nicht als allgemeiner Ersatz für Präfixnotation erklärt werden.
- IPv6 hat 128 Bit und keinen Broadcast; Multicast deckt bestimmte Gruppenkommunikationsfälle ab. Die `::`-Nullkompression darf in einer Adresse nur einmal verwendet werden; kanonische Ausgabe nach RFC 5952 ist von der Menge gültiger Eingabeformen zu unterscheiden.
- Site-Local `FEC0::/10` ist deprecated (RFC 3879), nicht als aktuelle Adressart empfehlen. „IPv4-Compatible IPv6“ ist eine historische Form und soll nicht als empfohlene aktuelle Betriebsform erscheinen. IPv4-mapped Adressen sind ein bestimmter Interoperabilitäts-/API-Kontext, keine allgemeine IPv6-Adressplanung.
- Das Cheatsheet entstand 2018 und ist Themenvorlage, keine aktuelle normative Quelle. Übergangsmechanismen (insbesondere 6to4/Teredo) sind nicht als pauschale Empfehlung zu übernehmen; Status und heutige Einsatzbedingungen müssen vor inhaltlicher Darstellung jeweils aktuell anhand einschlägiger Standards geprüft werden.

### Primärquellen für die Planung und fachliche Prüfung
- RFC 791, Internet Protocol (IPv4-Grundlage; historische Spezifikation): https://www.rfc-editor.org/rfc/rfc791
- RFC 4632, CIDR; BCP 122: https://www.rfc-editor.org/rfc/rfc4632
- RFC 3021, 31-Bit-Präfixe auf IPv4-Punkt-zu-Punkt-Links: https://www.rfc-editor.org/rfc/rfc3021
- RFC 4291, IPv6 Addressing Architecture (mit auf der RFC-Seite aufgeführten Aktualisierungen): https://www.rfc-editor.org/rfc/rfc4291
- RFC 5952, kanonische Textdarstellung von IPv6; aktualisiert RFC 4291: https://www.rfc-editor.org/rfc/rfc5952
- RFC 3879, Deprecating Site Local Addresses: https://www.rfc-editor.org/rfc/rfc3879
- IANA IPv6 Special-Purpose Address Registry (aktuelle Registry, beim Abruf zuletzt aktualisiert 2025-10-09): https://www.iana.org/assignments/iana-ipv6-special-registry/iana-ipv6-special-registry.xhtml

Diese Quellen wurden für die Planungsnotiz direkt abgerufen. Vor einer konkreten Rechnerimplementierung sind einschlägige Normabschnitte, Errata und Registry-Stand erneut zu prüfen; insbesondere muss jeder angezeigte Spezialbereich seine tatsächliche Semantik und Reichweite nennen.

### Geplante Tools – erste und spätere Etappen
Gemeinsames Offline-Muster bleibt: Eingabe mit Einheit und Beispiel → sichtbares Ergebnis → Rechenweg mit eingesetzten Werten → kurze verständliche Erklärung/Annahmen → Verweis auf passende Lektion. Alle Seiten nutzen die gemeinsame Navigation, bestehende Anzeigeoptionen und Glossardaten, sind tastaturbedienbar und verwenden eigene Texte/Schaubilder.

**Erste Tools-Etappe nach den priorisierten Subnetting-Korrekturen:**
1. Zahlensystemrechner: Binär, Dezimal, Hexadezimal; Eingabevalidierung, Stellenwerte und Umrechnungsschritte.
2. Bit-/Byte- und Einheitenrechner: bit, B, kbit, Mbit, kB/MB/GB/TB sowie KiB/MiB/GiB/TiB; dezimale 1000er- und binäre 1024er-Faktoren sichtbar unterscheiden.
3. IPv4-Subnetzrechner plus Nachschlagetabelle: Adresse/Präfix oder Maske, Präfix, Maske, Netzadresse, Broadcast, Gesamtadresszahl und nutzbarer Bereich; /31 und /32 fachlich ausdrücklich behandeln.

**Spätere Etappen:** Übertragungsdauer/Datenrate; Bildgröße aus Pixelzahl und Farbtiefe; Videodatenmenge aus Bildrate/Dauer und separat aus Bitrate (Rohdaten vs. komprimiert); Strom/Leistung/Energie und USV-Laufzeitschätzung mit offengelegten Annahmen; IPv6-Nachschlagen und Schreibweisenprüfung. IPv6 bleibt zunächst später eingeplant.

### Priorität und Abnahme
1. Zuerst die dokumentierten sichtbaren Subnetting-Fehler in `module/subnetting.html`, `js/subnetting.js` und den zugehörigen Styles korrigieren: SVG-Beschriftungsüberlauf/Überlappung; zu flache Adressfelder durch fehlende passende Eingabeklasse bzw. `type`; fehlender Abstand vor Prüfung/Feedback; `q.text`/`label`-Namensabweichung, die im Feedback `undefined` erzeugt; Einheitlichkeit des Abstands zwischen Navigation und Inhalt. Screenshotbefund nicht als Codeursache ausgeben, wenn der Zustand nicht reproduziert ist.
2. Für die Korrektur gezielte Regressionstests ergänzen, die den tatsächlich gerenderten Feedbacktext prüfen (Aufgabenbezeichnung, eingegebener Wert, Erklärung, kein `undefined`), außerdem Diagramm-Layout bei breit/schmal, Eingabehöhe/-schrift/Abstände und Abschlussansicht. Rechentests allein genügen nicht.
3. Erst nach diesen Korrekturen mit Tools-Etappe 1 beginnen. Jedes Tool separat bauen, fachlich prüfen, Ergebnis/Rechenweg/Fehlertexte testen und Tastatur-/responsive Interaktion vor dem nächsten Tool abnehmen.
4. Jarvis erst nach dem Reset und einer einmaligen erfolgreichen, verwertbaren Verfügbarkeitsprobe beauftragen. Keine Wiederholungsversuche bei Fehlschlag; Plan und vorhandene Ergebnisse erhalten.

Keine Codeänderung, kein Commit/Push/Merge oder Release in dieser Vorbereitungsarbeit. Die PDFs dienten ausschließlich als Themenvorlage; Layout, Logos oder Formulierungen werden nicht übernommen.


## Fortsetzung nach kontrolliertem Neustart: Subnetting-Korrekturen

- Laufprüfung vor Delegation: `station.inspect` meldete den Sidecar gesund und keine Jarvis-Agentenläufe als aktiv. Der zuvor uncommitted Plan blieb erhalten. Branch `prototype/computer-grundlagen`, Ausgangs-HEAD `7df1a7a`; Fortsetzungsplan war bereits geändert und wurde nicht überschrieben.
- Genau ein Umsetzungslauf an JARVIS (custom-chefingenieur) wurde gestartet. Der Agent lieferte innerhalb des dispatch-Zeitfensters nur Teilfortschritt und wurde wegen Zeitlimit gestoppt; dieser Teamauftrag ist daher nicht als abgeschlossen bestätigt.
- Der sichtbare Zwischenstand wurde von mir geprüft und die eigentliche Subnetting-Etappe selbst lokal verifiziert. Änderungen: `module/subnetting.html`, `js/subnetting.js`, `css/netzwerk.css`, `css/styles.css`, `tests/subnetting.test.js`, `tests/browser-subnetting-cdp.js`, Screenshots in `screenshots/subnetting-fix/`.
- SVG mit langen, nicht umbrechenden Textläufen wurde durch responsive beschriftete HTML-Karten ersetzt. Bei schmalem Layout stapeln die Karten; die Datentabelle wird auf kleineren Ansichten zu beschrifteten Blöcken.
- Eingaben sind explizit `type=text` und erhalten 48px Mindesthöhe, `font: inherit`, Polsterung und Rahmen. Formularaktionen und Ergebnisbox haben sichtbare Abstände.
- Feedback verwendet `label` als sichere Aufgabenbezeichnung, enthält Eingabewert/„keine Eingabe“ und Erklärung; alle vier Fragen werden einzeln beurteilt. Antwortänderung löscht/verbirgt das alte Ergebnis. Tests lesen den tatsächlich erzeugten Feedbacktext und decken leer, falsch, teilweise richtig, alles richtig und geänderte Antworten ab; keine `undefined`.
- Gemeinsames Desktop-Grid wurde mit expliziten Zeilenbereichen ergänzt, damit die linke Navigation nicht eine implizite Zeile erzwingt. Abschlusszustand wird im CDP-Test direkt erfasst.

### Verifikation dieser Etappe
- `node tests/subnetting.test.js`: bestanden, einschließlich Fake-DOM-Integrationstest mit angezeigten Feedbacktexten (leer/falsch/teilweise/geändert/richtig). Das ist automatisierte DOM-Logikprüfung, kein Browser-Interaktionstest.
- Regression: `node tests/startseite.test.js`, `tests/logic.test.js` (13/13), `tests/navigation-glossar.test.js`, `tests/netzmaske.test.js`, `tests/netzwerk-lektion1.test.js` (14) und `tests/fortschritt.test.js`: bestanden. `node --check js/subnetting.js` und `git diff --check`: bestanden.
- `node tests/browser-subnetting-cdp.js`: interaktive Prüfung im Chrome via CDP über vorhandene lokale `file://`-App. Tatsächlicher `#subnet-result.innerText` geprüft; leere, falsche, teilweise richtige und richtige Antworten durch Browser-Submit; Änderung nach Submit verbirgt alte Auswertung. Tastatur/Fokusnavigation dabei nicht vollständig geprüft.
- Responsiv: 320 und 390 CSS-Pixel stapeln Karten sauber; Desktop 1440px nebeneinander; 200%-Page-Scale-Emulation bei 720px geprüft. Eingaben gerendert mit min. 53.3px (schmal) und 71.8px (Desktop/Scale); Abstand zweites Eingabefeld→Prüfbutton 20.4px bzw. 28.1px. Keine Kartenüberlappung oder Dokument-Überbreite.
- Abschlussansicht gerendert: Fortschrittstext→Inhalt 34.6px (320/390), 47.6px (1440/200%-Emulation); Inhalt→Footer 42.5–58.5px. Die früher auffällige Lücke ist in den erfassten Zuständen nicht vorhanden. Screenshots: `screenshots/subnetting-fix/beispiel-1440.png`, `beispiel-390.png`, `beispiel-320.png`, `beispiel-720-zoom200.png`, `uebung-leer-1440.png`, `uebung-leer-390.png`, `uebung-leer-320.png`, `uebung-leer-720-zoom200.png`, `uebung-teilweise-1440.png`, `uebung-teilweise-390.png`, `uebung-teilweise-320.png`, `uebung-teilweise-720-zoom200.png`, `abschluss-1440.png`, `abschluss-390.png`, `abschluss-320.png`, `abschluss-720-zoom200.png`.
- Grenzen: 200% war Page-Scale-Emulation, nicht echter Browser-Zoom oder echte Textvergrößerung. Hell/Dunkel/hoher Kontrast in dieser Runde nicht visuell regressionsgeprüft. Kein Screenreader-Test. Kein Commit/Push/PR-Update. Tools-Etappen beginnen erst nach eigenständiger Prüfung und Sicherung der fertigen Subnetting-Arbeit; laufende Umsetzung nicht durch einen zweiten Jarvis-Auftrag ersetzen.


## Fortsetzung Nachtauftrag (11.10.2026, aktueller Arbeitsstand)

### Laufstatus und Subnetting
- Zu Beginn lokaler Branch `prototype/computer-grundlagen`, HEAD `7df1a7a8bc81030d3bff261016dc08979e02f59b`, origin/branch derselbe Commit. Vorhandene Änderungen im Baum erhalten.
- Der Status-Agent sah keinen aktiven Jarvis-Lauf, aber konnte nicht belegen, ob der zuletzt beendete Lauf der Subnetting-Run war. Es wurde kein weiterer Subnetting-Umsetzungslauf gestartet. Bereits vorhandene Subnetting-Änderungen wurden selbst geprüft.
- Automatisierte Suite bestanden: `subnetting.test.js` (echte DOM-Test-Fixture liest Feedbacktexte für leer/falsch/teilweise/geändert/richtig), `startseite.test.js`, `logic.test.js` (13), `navigation-glossar.test.js`, `netzmaske.test.js`, `netzwerk-lektion1.test.js` (14), `fortschritt.test.js`, `zahlensysteme.test.js`; Syntax und `git diff --check` bestanden.
- `tests/browser-subnetting-cdp.js` lief gegen die tatsächlich gerenderte lokale file://-Seite. Eingaben 53.3px mobil / 71.8px Desktop, Eingabe-Button-Abstand 20.4px mobil / 28.1px Desktop. Ergebnistext bei leer/falsch/teilweise/richtig enthielt Aufgabe, Wert und Erklärung; kein `undefined`; Änderung verbarg alte Bestätigung. Abschlussansicht Abstand Fortschritt→Inhalt 34.6px mobil / 47.6px Desktop, kein extremer Leerraum. Karten waren bei 320px zunächst Zeichen-für-Zeichen umgebrochen; auf Basis visueller Screenshotprüfung CSS geändert und erneut gerendert. Neuer Screenshot `screenshots/subnetting-fix/beispiel-320.png` zeigt gestapelte Karten, lesbare Oktettwerte und Labels. Weitere Screenshots zuvor aufgenommen für Desktop, 390px und Page-Scale-Emulation.
- Visuelle Nachprüfung der neuen mobilen Ansicht erfolgte anhand Screenshot. Echte Maus-/Tastaturinteraktion mit fokussierten Inputs und Navigation ist nicht vollständig abgenommen; GLaDOS konnte lokal nicht browsen (`refusing to navigate to private/loopback/intranet host: localhost`). Screenreader fehlt. Hell/Dunkel/hoher Kontrast visuell und rechnerisch noch offen. Die 200%-Prüfung ist ausschließlich Page-Scale-Emulation, kein echter Browser- oder Textzoom.

### Einstieg
- `MODULE_EINSTIEG` enthält nun „Den Computer kennenlernen“ mit unveränderter ID und Dateipfad. Startseite rendert eigene Sektion „Einstieg“ vor den drei Ausbildungsjahren; Einstieg wurde aus Jahr 1 entfernt, das Jahr beginnt mit LF1.
- Navigation liest Einstiegsdaten bevorzugt aus der neuen Liste, mit altem Fallback. Lernfortschritt bleibt an der ID gebunden.
- Daten-/Startseitentest wurde angepasst und `node tests/startseite.test.js` bestanden. Browserprüfung der Reihenfolge, des Links und eines bereits abgeschlossenen Häkchens noch offen.

### Tools Etappe 1
- Zahlensystemrechner implementiert: `module/zahlensysteme.html`, `js/zahlensysteme.js`, `css/zahlensysteme.css`, Test `tests/zahlensysteme.test.js`; Eintrag in Lernfeld 3, zentrale Glossarbegriffe ergänzt. Binär/Dezimal/Hex, 32-Bit-Grenze, Eingabevalidierung, Beispiel/Leeren, Stellenwerttabelle, Rechenweg; Ergebnis wird bei Änderungen gelöscht.
- Review fand didaktische Schwäche in der Hex-Konversion: Vierergruppen waren nicht eindeutig den Hexziffern zugeordnet und führende Nullen fehlten im Endwert. Code und Tests korrigiert; je Gruppe wird `0001 = 1` etc. angezeigt und Endwert mit passender Gruppenschreibweise ausgegeben.
- Automatisierter Test bestanden; keine Browser-/Tastatur-/Theme-Prüfung des Rechners. Kein Bit-/Byte- oder IPv4-Rechner begonnen.

### Version/Git/PR/Übergabe
- Version `0.6.0-alpha.1`; Changelog um die abgeschlossenen Änderungen ergänzt.
- Keine Commit-/Push-Aktion bisher. Arbeitsbaum enthält dokumentierte Subnetting-Arbeit, Einstieg und Zahlensystem-Rechner. PR #1 normal aktualisieren und lokalen Commit/Remote-Head abgleichen bleibt offen.
- Keine Merge-/Release-/Sichtbarkeitsaktion.
- Nächster Punkt: Zahlensystemrechner interaktiv samt Tastatur/Theme/320px prüfen, fehlende Einstieg-Browserprüfung abschließen; erst nach akzeptabler Etappenprüfung Änderungen commiten und normal pushen. Danach Etappe Bit/Byte, danach IPv4-Rechner.


## Etappenabschluss Subnetting/Einstieg/Zahlensysteme (11.10.2026)

- Übernommene manuelle Terminalprüfungen (vom Commander gemeldet, hier nur ausgelesen): `/tmp/themes-run2.json` Ergebnis PASS, `badCount` 0 für Übersicht, Subnetting und Zahlensystemrechner in Hell, Dunkel und hohem Kontrast (kleinster gemessener Kontrast 6,27:1). `/tmp/kbd-run2.json` Ergebnis PASS (Exit-Code 0 laut Meldung), keine Stopps ohne sichtbaren Fokus auf den drei Seiten; Enter-Bedienung von Subnetting-Übung und Zahlensystemrechner bestätigt. Das ist keine vollständige WCAG-Konformitätsprüfung.
- Laufprüfung: keine aktiven Jarvis-Prozesse, `station.inspect` ohne laufenden Agentenlauf.
- Automatisierte Tests auf dem Arbeitsstand erneut bestanden: alle `tests/*.test.js`, `node --check js/*.js`, `git diff --check`.
- Weiterhin offen: Screenreader, echter Windows-Doppelklick-Start, echter Browser-Zoom (nur Page-Scale-Emulation geprüft).
- Nächste Etappe: Bit-/Byte- und Einheitenrechner (GB/GiB). IPv4-Rechner erst danach.


## Etappe Bit-/Byte- und Einheitenrechner (11.10.2026)

- Neu: `module/einheiten.html`, `js/einheiten.js`, `css/einheiten.css`, `tests/einheiten.test.js`, `tests/browser-einheiten-cdp.js`; Eintrag in LF 3, Glossar um Byte, GB, GiB ergänzt; Version `0.7.0-alpha.1`.
- Exakte Rechnung mit BigInt (Basis Bit); dezimal Faktor 1000 (kB–TB, kbit–Gbit), binär Faktor 1024 (KiB–TiB); Rechenweg mit eingesetzten Werten; GB/GiB-Vergleich nur bei Paar dezimal/binär; Rundung auf höchstens 6 Nachkommastellen mit ≈-Kennzeichnung.
- Fehler während der Etappe behoben: Vergleich erschien fälschlich bei MB nach kbit; Dunkelmodus-Kontrast des Fließtext-Links (1,61:1, Browser-Standardfarbe) per Themenvariable korrigiert.
- Geprüft: alle `tests/*.test.js`, Syntaxchecks, `git diff --check`, Browser-CDP-Test (Bedienung, Fehlerfall, Enter, Ergebnis löschen, kein Überlauf bei 320/390/1280/Page-Scale 2), Kontrast `themes` PASS inkl. Einheitenseite, Tastatur PASS. Keine vollständige WCAG-Prüfung; kein Screenreader; 200 % nur als Page-Scale-Emulation.
- Weiterhin offen: IPv4-Rechner (nächste Etappe, nicht begonnen), /31- und /32-Behandlung dort beachten.
