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
