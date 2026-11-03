# Lernfeld 7 – vorbereiteter Katalog-Einschub

Stand: 17.10.2026. Eingebaut in `js/module-daten.js` und `js/fortschritt.js`. Feldstatus `verfuegbar`. Zurücksetzen der Lernzielkontrolle nur mit Passwort.

Der folgende Block ersetzt später ausschließlich das bisherige Objekt mit `id: "lf7"` im zweiten Ausbildungsjahr. Das ganze Feld bleibt bis zur vollständigen Prüfung und Freigabe durch Glados `kommt-bald`. Die neun vorhandenen neuen Seiten stehen als Unterthemen bereits auf `verfuegbar`. **Das ist keine Freigabe und kein Auftrag, den Feldstatus jetzt zu ändern.**

```javascript
{
  id: "lf7",
  lernfeld: "Lernfeld 7",
  titel: "Cyber-physische Systeme ergänzen",
  status: "verfuegbar",
  unterthemen: [
    { id: "lf7-system", typ: "lektion", titel: "Ein cyber-physisches System erkennen", beschreibung: "Kundenauftrag, Sensor, Steuerung, Aktor und IT-System an einer fiktiven Raumklima-Station unterscheiden.", page: "lf7-system", status: "verfuegbar", datei: "module/lf7-system.html" },
    { id: "lf7-schnittstelle", typ: "lektion", titel: "Den Datenfluss an der Schnittstelle beschreiben", beschreibung: "Physische Größe, digitalen Messwert, Einheit, Zeitpunkt und vorgesehenen Nachrichtenaustausch unterscheiden.", page: "lf7-schnittstelle", status: "verfuegbar", datei: "module/lf7-schnittstelle.html" },
    { id: "lf7-fluesse", typ: "lektion", titel: "Energiefluss, Stofffluss und Informationsfluss unterscheiden", beschreibung: "Energie, Materietransport und Information im fiktiven Funktionsplan getrennt betrachten.", page: "lf7-fluesse", status: "verfuegbar", datei: "module/lf7-fluesse.html" },
    { id: "lf7-auswahl", typ: "lektion", titel: "Kriterien für Energieversorgung, Hardware und Software aufstellen", beschreibung: "Versorgung, Sensor, Schnittstellen, Bibliotheken und Protokolle nach belegten Kriterien vergleichen, ohne einen Kauf.", page: "lf7-auswahl", status: "verfuegbar", datei: "module/lf7-auswahl.html" },
    { id: "lf7-unterlage", typ: "lektion", titel: "Eine technische Unterlage lesen und eine fehlende Angabe erkennen", beschreibung: "Fiktiven Auszug lesen, fehlende Genauigkeit erkennen und die eigene technische Notiz nachvollziehbar ergänzen.", page: "lf7-unterlage", status: "verfuegbar", datei: "module/lf7-unterlage.html" },
    { id: "lf7-zusammenfuehren", typ: "lektion", titel: "Komponenten funktional zusammenführen", beschreibung: "Quelle, Ziel und Aufgabe von Funktionspfeilen benennen, ohne echte Komponenten anzuschließen.", page: "lf7-zusammenfuehren", status: "verfuegbar", datei: "module/lf7-zusammenfuehren.html" },
    { id: "lf7-pruefung", typ: "lektion", titel: "Funktion, Messwert und Energiebedarf prüfen", beschreibung: "Fiktive Testfälle, Betriebswerte und Energiebedarf auswerten; Abweichungen und nächste Schritte protokollieren.", page: "lf7-pruefung", status: "verfuegbar", datei: "module/lf7-pruefung.html" },
    { id: "lf7-sicherheit", typ: "lektion", titel: "Betriebssicherheit und Datensicherheit unterscheiden", beschreibung: "Sicheren Betrieb, Vertraulichkeit, Integrität und Verfügbarkeit am Lernmodell abgrenzen.", page: "lf7-sicherheit", status: "verfuegbar", datei: "module/lf7-sicherheit.html" },
    { id: "lf7-kontrolle", typ: "lernzielkontrolle", titel: "LF7 Lernzielkontrolle", beschreibung: "24 Fragen nur zu den acht neuen LF7-Lektionen. Nach der Abgabe gesperrt. Zurücksetzen nur mit dem Passwort der Lernzielkontrolle.", page: "lf7-kontrolle", status: "verfuegbar", datei: "module/lf7-kontrolle.html" }
  ]
}
```

## Fortschrittsschlüssel – Liste zur späteren Einbindung

| ID | Schlüssel |
| --- | --- |
| `lf7-system` | `it-ausbildung.lf7-system.v1` |
| `lf7-schnittstelle` | `it-ausbildung.lf7-schnittstelle.v1` |
| `lf7-fluesse` | `it-ausbildung.lf7-fluesse.v1` |
| `lf7-auswahl` | `it-ausbildung.lf7-auswahl.v1` |
| `lf7-unterlage` | `it-ausbildung.lf7-unterlage.v1` |
| `lf7-zusammenfuehren` | `it-ausbildung.lf7-zusammenfuehren.v1` |
| `lf7-pruefung` | `it-ausbildung.lf7-pruefung.v1` |
| `lf7-sicherheit` | `it-ausbildung.lf7-sicherheit.v1` |
| `lf7-kontrolle` | `it-ausbildung.lf7-kontrolle.v1` |

Nur die Schlüssel zu ergänzen genügt nicht: Für die globale Anzeige müssen später auch die Abschlussregeln eingebunden werden. Vorher bleiben globale LF7-Häkchen bewusst unverdrahtet; der lokale Fortschritt der neuen Seiten funktioniert bereits.

### Abschlussregeln für die acht Lektionen

Jeweils `state.finish === true` **und** `state.checked === true`, dazu alle vier richtigen Antworten in `state.answers`:

| ID | q1 | q2 | q3 | q4 |
| --- | --- | --- | --- | --- |
| `lf7-system` | `sensor` | `steuerung` | `leuchte` | `ziel` |
| `lf7-schnittstelle` | `kontext` | `uebergang` | `format` | `alt` |
| `lf7-fluesse` | `energie` | `information` | `kein` | `trennen` |
| `lf7-auswahl` | `passung` | `aufloesung` | `kompatibel` | `liste` |
| `lf7-unterlage` | `genauigkeit` | `ja` | `schritte` | `offen` |
| `lf7-zusammenfuehren` | `sensor` | `steuerung` | `stoerung` | `funktionsplan` |
| `lf7-pruefung` | `abweichung` | `ein` | `zehn` | `protokoll` |
| `lf7-sicherheit` | `versorgung` | `integritaet` | `sicher` | `noetig` |

### Abschlussregel der Lernzielkontrolle

`state.finish === true` und alle 24 Einträge in `state.answers` richtig. Die Schlüssel sind hier **nullbasierte Zahlenindizes** (`0` bis `23`, in JSON Objektschlüssel als Zeichenfolge), nicht `q1` bis `q24`. Lösung in Reihenfolge: `a, b, c, a, b, c, a, b, c, a, b, c, a, b, c, a, b, c, a, b, c, a, b, c`.

Kein zusätzlicher gemeinsamer Schlüssel und keine Fortschrittsdatei wurden angelegt. `js/lf7-kontrolle.js` exportiert die Auswertung als `LF7_KONTROLLE.evaluate`, die acht Lektionen liegen in `LF7_INHALTE[id]` mit `evaluate`. Bei einer späteren Einbindung in die gemeinsame Fortschrittsanzeige deren bisheriges eigenständiges Muster beibehalten, statt unbedacht alle Lektionen global zu laden.

## Übergabe an Rick und Glados

- Nach Abschluss der parallelen LF6-Arbeit einschieben und Fortschrittsableitung ergänzen; vorher die beiden gemeinsamen Dateien nicht überschreiben.
- Glados prüft das gesamte Lernfeld sichtbar im Browser und ändert keine Projektdateien. Bekannte Abweichung: lokale bestätigte Rücksetzung statt der Zugangssperre im LF5-Muster, da der LF7-Auftrag Zugangsdaten ausschließt.
- Fehler reparieren und erneut prüfen. Erst nach Freigabe den Feldstatus freischalten und nach Ricks Auftrag committen und pushen. Dieser Auftrag enthält ausdrücklich keinen Commit oder Push.