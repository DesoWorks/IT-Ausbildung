# IT-Ausbildung

Lernmaterial für die Ausbildung zum Fachinformatiker / zur Fachinformatikerin für Systemintegration.

## Einfach starten (Windows)

1. Lade das Projekt als ZIP herunter und entpacke den gesamten Ordner.
2. Öffne den entpackten Ordner.
3. Doppelklicke auf **IT-Ausbildung starten.html**.
4. Wähle bei Bedarf deinen Browser aus. Die App lädt ihre Dateien aus dem entpackten Ordner und kann danach offline genutzt werden.

Es muss weder Python noch Node.js installiert werden. Im Ordner `start/` liegt die eindeutig benannte Datei. Fortschritt und Anzeigeoptionen werden lokal im Browser gespeichert. Browser können diese Speicherung für lokale Dateien einschränken. In diesem Fall bleiben Inhalte und Übungen nutzbar, aber Einstellungen und Lernstand werden eventuell nicht dauerhaft gesichert. Browser-Sicherheitsfunktionen müssen nicht abgeschaltet werden.

**Hinweis zum Prüfstatus:** Der vollständige Lernweg über `file://` muss im vorgesehenen Windows-Browser interaktiv geprüft werden. Wenn dieser Browser den Zugriff zwischen lokalen Dateien blockiert, bitte nicht Schutzfunktionen ändern. Dann ist eine gebündelte Lösung mit lokalem, mitgeliefertem Laufzeitbestandteil zu evaluieren. Dieser README-Abschnitt ist keine Behauptung eines bestandenen End-to-End-Tests.

## Inhalte

Die Themenübersicht (`index.html`) zeigt drei Ausbildungsjahre. Verfügbare Einheiten sind anklickbar; geplante Inhalte sind nicht anklickbar und mit „In Kürze“ gekennzeichnet. IPv4-, Netzmasken- und Subnetting-Lektionen sowie dazugehörige Tools sind bereits im Projekt vorhanden. LF1-Lektionen werden schrittweise ergänzt; die LF1-Abschlussaufgabe und die meisten LF2-Lektionen sind noch geplant.

„LF“ bedeutet **Lernfeld**. Die Jahres- und Themenübersicht ist eine Orientierung, kein verbindlicher betrieblicher Monatsplan. Die Zuordnung kann je Berufsschule und Betrieb abweichen. Die Zuordnung der vollständigen Inhalte von Lernfeld 1 und 2 zum Rahmenlehrplan sowie die geplanten Lektionen, Übungen, Abschlussaufgaben und ausdrücklich offenen Themen sind in [`docs/plan-lf1-lf2.md`](docs/plan-lf1-lf2.md) dokumentiert. Die verfügbaren Einstiegslektionen in LF1 behandeln Ausbildungsbetrieb/Rolle, Leitbild/Ziele, Markt/Kundschaft, Wertschöpfung, Organisation/Rechtsformprofile, Handlungsspielraum, Weiterbildung, Präsentation, Qualitätsprüfung und Reflexion. Alle Fälle sind fiktive Lernorientierungen. Die LF1-Abschlussaufgabe ist eine unbenotete Selbstprüfung; LF2 ist bisher nur mit LF2.1 begonnen.

## Anzeige und Glossar

**Anzeige & Lesen** und **Wörter & Begriffe** stehen in der gemeinsamen Seitennavigation. Das vollständige Glossar mit Suche liegt auf `glossar.html`; kurze Fachworterklärungen bleiben direkt am Lerninhalt. Die Anzeigeoptionen bieten Textgröße, Zeilen-/Absatzabstand, helle/dunkle/kontrastreiche Darstellung und ruhige Ansicht. Die Wahl wird nach Möglichkeit lokal im Browser gespeichert.

Das Glossar liegt zentral in `js/glossar-daten.js`; die gemeinsame Navigation wird von `js/navigation.js` erzeugt. Beide funktionieren offline ohne externe Bibliotheken oder Netzwerkzugriffe.

## Entwickleranleitung

Technische Grundlage: statische HTML-, CSS- und JavaScript-Dateien ohne Bibliotheken, CDN oder Buildschritt. `index.html` ist die Themenübersicht. Moduldateien liegen unter `module/`. Die Startseite bezieht ihre Einträge aus `js/module-daten.js`; ein einzelnes neues Modul kann durch eine eigene HTML-Datei und einen Eintrag in dieser Datenliste ergänzt werden.

Zentrale Version: `js/version.js`. Version nur für einen bewusst freigegebenen Stand ändern. Änderungen sind in `CHANGELOG.md` einzutragen.

Automatische Prüfungen (Node.js nur für Entwickler):

```sh
node tests/startseite.test.js
node tests/logic.test.js
```

`tests/logic.test.js` verwendet einen DOM-Mock. Es ist kein Test mit echtem Browser. Tastatur, Screenreader, Browserstart und Darstellung müssen zusätzlich manuell geprüft werden.

## Lokaler Entwickler-Webserver

Für Entwickler kann `start.sh` einen lokalen Webserver über Python 3 starten; er bindet nur an `127.0.0.1:8080`. Die Windows-Nutzeranleitung oben benötigt diesen Weg nicht. Alternativ kann ein Webserver der Entwicklungsumgebung genutzt werden.

## Datenschutz und Grenzen

Es werden keine Daten an einen Server gesendet. Lernstand und Anzeigeoptionen bleiben, falls die Browserrichtlinien es erlauben, lokal auf dem Gerät. Bei nicht verfügbarer Speicherung funktioniert die App weiterhin, jedoch ohne dauerhafte Wiederherstellung.

## Quellen zur Lernstruktur

Die Übersicht orientiert sich am KMK-Rahmenlehrplan und an der Ausbildungsordnung (FIAusbV). Die Bereichstitel sind verständliche Orientierungstexte und keine vollständige Wiedergabe offizieller Titel. Die konkrete Verteilung auf Ausbildungsjahre kann abweichen.

- KMK, Downloadbereich Rahmenlehrpläne: https://www.kmk.org/service/servicebereich-berufliche-schulen/downloadbereich-rahmenlehrplaene.html
- FIAusbV: https://www.gesetze-im-internet.de/fiausbv/

Der lokale Rahmenlehrplan-PDF-Abgleich ist noch offen. Die Lernfeldnummern und Zuordnungen sind daher nicht als unabhängig gegen das Original-PDF verifiziert zu verstehen.

## Versionshinweis
Aktuelle zentrale Version: **0.10.0-alpha.1** (`js/version.js`). Änderungen stehen in `CHANGELOG.md`.
