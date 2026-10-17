# Lernfeld 7 – Cyber-physische Systeme ergänzen

Stand: 17.10.2026. Erste vollständige Inhaltsfassung, noch keine Freigabe durch Glados.

## Grundlage und Umfang

KMK-Rahmenlehrplan Fachinformatiker, Seite 18, gemäß dem von Rick bereitgestellten Quellenauszug: zweites Ausbildungsjahr, Zeitrichtwert 80 Stunden. Kompetenz: physische Welt und IT-Systeme funktional zu einem cyber-physischen System zusammenführen.

Die acht Lektionen und die Lernzielkontrolle bilden alle beauftragten Themen als Einstieg ab. Sie sind **keine Durchführung eines 80-stündigen Praxisunterrichts** und kein Nachweis einer realen beruflichen Inbetriebnahme.

## Gemeinsames Beispiel

Samira bei Nordlicht IT-Service untersucht eine erfundene kleine Raumklima-Station in einem erfundenen Besprechungsraum. Sensor → Steuerung → Hinweisleuchte; die Steuerung übermittelt Werte an eine fiktive Übersichtsseite. Kundenauftrag: Temperatur anzeigen und oberhalb von 26 °C einen Leuchthinweis geben. Bei genau 26 °C bleibt die Leuchte aus. Es gibt keinen Ventilator, keine Pumpe und keine Verbindung zu einem echten Gebäude, einer echten Steuerung oder einem Produktivsystem.

## Lektionen und Lernziele

| Reihenfolge / ID | Sichtbarer Titel | Lernziel und Rahmenlehrplanbezug |
| --- | --- | --- |
| 1 / `lf7-system` | Ein cyber-physisches System erkennen | Kundenauftrag abgrenzen; Sensor, Steuerung, Aktor und IT-System unterscheiden. |
| 2 / `lf7-schnittstelle` | Den Datenfluss an der Schnittstelle beschreiben | Übergang physische Größe → digitaler Wert; Richtung, Quelle, Ziel, Einheit und Zeitpunkt; Kommunikation im bestehenden Netzwerk nur planen. |
| 3 / `lf7-fluesse` | Energiefluss, Stofffluss und Informationsfluss unterscheiden | Drei Betrachtungen trennen; fehlenden angetriebenen Stofftransport ehrlich benennen. |
| 4 / `lf7-auswahl` | Kriterien für Energieversorgung, Hardware und Software aufstellen | Versorgung, Messbereich, Auflösung versus Genauigkeit, Schnittstellen, Softwarebibliothek und Protokoll vergleichen; kein Kauf. |
| 5 / `lf7-unterlage` | Eine technische Unterlage lesen und eine fehlende Angabe erkennen | Fiktiven Auszug R1, Stand A lesen; fehlende Genauigkeit erkennen; eigene Notiz mit Quelle, Stand und offener Frage ergänzen. |
| 6 / `lf7-zusammenfuehren` | Komponenten funktional zusammenführen | Funktionspfeile für Messwert, Entscheidung, Anzeige und Energie; Datenlücke als Störung behandeln. |
| 7 / `lf7-pruefung` | Funktion, Messwert und Energiebedarf prüfen | Grenzfälle, Erwartung und Beobachtung; fiktive Betriebswerte 5 V und 0,2 A auswerten; 1 W × 10 h = 10 Wh = 0,01 kWh; Abweichung und nächsten Prüfschritt protokollieren und reflektieren. |
| 8 / `lf7-sicherheit` | Betriebssicherheit und Datensicherheit unterscheiden | Betriebssicherheit, Vertraulichkeit, Integrität, Verfügbarkeit und Datenminimierung unterscheiden; keine Schutzfunktion aus einer Leuchte ableiten. |
| 9 / `lf7-kontrolle` | LF7 Lernzielkontrolle | 24 Wissensfragen, jeweils drei aus jeder der acht neuen Lektionen. Keine Fragen aus anderen Lernfeldern. |

## Umsetzung

- Je Lektion vier Fragen, insgesamt 32; Antworten untereinander, wechselnde richtige Positionen, richtige Antwort nicht die längste, erklärendes Feedback ab 40 Zeichen.
- Acht eigene Inhaltsdateien `js/lf7-<id>.js` und acht eigene Seiten `module/lf7-<id>.html`; gemeinsamer Ablauf ausschließlich für LF7 in `js/lf7-lektion.js`.
- Jede Lektion speichert unter `it-ausbildung.<id>.v1` die Felder `answers`, `checked`, `finish`, `step`. Vier richtig geprüfte Antworten plus geöffneter Abschluss ergeben fünf von fünf Schritten. Nur den Abschluss öffnen ist kein vollständiger Lernabschluss.
- Die Kontrolle folgt dem vorhandenen LF5-Kontrollaufbau: 24 Fragen, Abgabe erst nach vollständiger Auswahl, gespeichertes Ergebnis, danach gesperrte Antworten. Bestanden nur mit 24 richtigen Antworten.
- **Bewusste Abweichung vom LF5-Muster:** Der Auftrag schließt ein Passwort aus. Deshalb bestätigt man das lokale Zurücksetzen mit einem Dialog; keine Zugangsdaten und keine Zugangssperre. Andere Lektionen werden dabei nicht verändert. Dies ist keine geschützte Prüfung. Rick muss vor der Freigabe beachten, dass dieses Verhalten vom bisherigen LF5-Muster abweicht.
- Speicherfehler werden angezeigt; die Übungen bleiben während des Besuchs bedienbar. Ein gesperrter oder nicht beschreibbarer Browserspeicher erlaubt keine dauerhafte Ergebnisgarantie.
- Favicon und vorhandene gemeinsame Skripte entsprechen dem LF6-Seitenmuster. Zwischen den neuen LF7-Seiten gibt es Links; der Katalog bleibt unverändert.

## Ehrliche Grenze: keine echte Inbetriebnahme

Keine physische Verkabelung, keine Anschlüsse an echte Geräte, keine reale Messung oder Raumregelung, kein Kauf, kein aktiver Netzwerkzugriff aus der Übung. Physikalische Betriebswerte werden ausschließlich aus einem fiktiven Protokoll gelesen und eingeordnet. Bibliotheken und Protokolle werden anhand von Kriterien behandelt, nicht installiert oder konfiguriert. Die Energiebetrachtung ist eine Rechnung mit angenommenen konstanten Werten, kein Nachweis aller Zustände und Verluste. Die Inhalte ersetzen keine fachgerechte Praxis, Sicherheitsbewertung oder Freigabe.

Es gibt keine zusätzliche Seite „Zusammenfassung und Übungsaufgabe“. Lernfelder 6, 8 und 9 sowie gemeinsame Katalog-, Fortschritts-, Versions- und Änderungsdateien sind nicht Bestandteil dieses Auftrags.

## Katalog und nächste Prüfung

`docs/lf7-katalog-einschub.md` enthält das vorbereitete Katalogobjekt und alle neun Fortschrittsschlüssel samt Abschlussregeln. Es ist noch nicht eingebaut. Das Feld bleibt `kommt-bald`, obwohl die vorbereiteten Unterthemen `verfuegbar` sind. Rick führt den Einschub nach der parallelen LF6-Arbeit zusammen. Erst Glados prüft das ganze Feld sichtbar im Browser; bei Fehlern folgt Reparatur. Keine Freigabe, kein Commit und kein Push durch diesen Auftrag.

## Ausgeführte technische Prüfungen

- `node --check` für alle zehn neuen Dateien `js/lf7-*.js` und beide neuen Testdateien: jeweils Exit 0.
- `node tests/lf7-inhalte.test.js`: Exit 0. Unabhängige Lösungsschlüssel, 32 Übungs- und 24 Kontrollfragen, Positionen, Antwortlängen, Feedback, Fortschritt, Speicherform, Seitentitel, Favicon und lokale Verweisziele geprüft.
- `node tests/lf7-browser.test.js`: Exit 0. Eigener temporärer Headless-Chrome und lokaler HTTP-Server: alle neun Seiten geladen, Auswahl und Auswertung, Wiederladen, Fortschritt, Rücksetzen, Browser-Zurück, Abgabe und Sperre, bestanden/nicht bestanden, Speicherfehler sowie mobile Überbreite geprüft. Keine unbehandelten Browserfehler und keine HTTP-Fehler bei den geladenen Ressourcen. Der Test beendet seinen Browser und Server selbst.
- Vorläufe erkannten eine wiederholte richtige Antwortposition in `lf7-unterlage`, einen Fehler beim Aufräumen des temporären Browserprofils und eine falsch vorbereitete Speicherfehlerprüfung an einem bereits gesperrten Versuch. Diese wurden korrigiert; die anschließend wiederholten Prüfungen bestanden. Das ist noch keine unabhängige Glados-Abnahme.