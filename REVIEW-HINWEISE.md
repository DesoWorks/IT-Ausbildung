# Hinweise zum Review

## Zweck und Stand
Dieser Branch stellt den aktuellen Entwicklungsstand für die gemeinsame technische Prüfung bereit. Die BWL-Werkstatt enthält einen freien Rechner für Angebot, Gewinn, Rabatt sowie Netto/Brutto und einen Lernmodus mit drei Aufgaben. Die Lernaufgaben sind Entwürfe und **fachlich noch nicht freigegeben**. Dieser Stand ist keine Produktionsfreigabe.

## Lokal starten
Für den vollständigen lokalen Aufruf ohne Server den Projektordner entpacken und `start/IT-Ausbildung starten.html` im Browser öffnen. Es werden weder Node.js noch Python benötigt. Der Browser kann lokale Speicherung einschränken; Schutzfunktionen nicht abschalten. Der Lerninhalt und die Übungen bleiben nutzbar, auch wenn Fortschritt/Einstellungen nicht dauerhaft gespeichert werden.

Für die Werkstatt direkt `module/bwl-werkstatt.html` öffnen. Einstiegspunkt im Gesamtsystem ist `index.html`; die Werkstatt wird dort über den Werkzeugkatalog in `js/module-daten.js` verlinkt. Der Rechner läuft im Browser ohne externe Dienste.

## Bekannte Einschränkungen
- Lernaufgaben und ihre betriebswirtschaftlichen Annahmen sind Entwürfe; eine fachliche Freigabe steht aus.
- Automatisierte Node-Tests prüfen Rechenlogik und ausgewählte UI-/Quellmerkmale, ersetzen aber keine vollständige Browserabnahme.
- Vollständiger interaktiver Durchlauf aller neun Lernschritte, reine Tastaturabnahme und Screenreaderprüfung sind noch offen.
- Die Werkstatt erlaubt bis zu sechs Angebotspositionen.
- Die Offline-Nutzung über `file://` und dauerhafte lokale Speicherung hängen vom Browser ab.
- Der Repository-weite Test `tests/branding-assets.test.js` schlägt derzeit fehl: `module/lf3-abnahme.html` enthält laut Test nicht den erwarteten Verweis auf das SVG-Favicon. Das betrifft nicht die BWL-Werkstatt.

## Konkrete Prüfschritte
1. In `index.html` den Werkzeugkatalog öffnen und BWL-Werkstatt starten; außerdem die Datei direkt öffnen.
2. Im freien Rechner ein Angebot mit mehreren Artikeln rechnen; Artikel hinzufügen/entfernen, Positionssumme und Rundung prüfen. Als Referenz: 2.850,00 € Positionssumme, 199,50 € Handlungskosten, 3.049,50 € Selbstkosten, 152,48 € Gewinn und 3.201,98 € netto.
3. Gewinn-, Rabatt- und beide Netto/Brutto-Richtungen mit eigenen fiktiven Zahlen prüfen; leere und ungültige Eingaben sowie Dezimalkomma kontrollieren.
4. Zwischen freiem Rechner und Lernmodus wechseln und prüfen, dass Eingaben/Zwischenstand erhalten bleiben. Alle drei Aufgaben durchlaufen; richtige, falsche, leere und falsch formatierte Antworten testen. Tipp, Lösungsweg, Neustart und Aufgabenwechsel prüfen.
5. Mit Tastatur und schmalem Browserfenster bedienen. Sichtbaren Fokus, verständliche Fehlermeldungen und den Fokus nach Fehler/Erfolg prüfen. Screenreader separat testen und verwendete Kombination dokumentieren.
6. Offline starten und prüfen, ob Inhalte funktionieren; anschließend beobachten, ob Lernstand/Anzeigeoptionen im verwendeten Browser dauerhaft gespeichert werden.

## Fehler melden
Bitte je Befund Umgebung (Betriebssystem, Browser/Version, Bildschirmgröße), genaue Ausgangslage und nummerierte reproduzierbare Schritte angeben. Sollverhalten und tatsächliches Verhalten getrennt beschreiben, betroffene Aufgabe/Eingaben nennen und bei Bedarf einen Screenshot beifügen. Keine echten Kunden-, Personen- oder Zugangsdaten verwenden. Rückmeldung kann als GitHub-Issue oder Review-Kommentar zu diesem Branch erfolgen.
