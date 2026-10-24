# BWL-Werkstatt: QA-Testplan

**Projekt:** IT-Ausbildung · **Paket:** BWL-Werkstatt · **Agent:** GLaDOS  
**Status:** Testplanung erstellt; nicht ausgeführt. Keine Codeänderung, kein Commit, kein Deployment.  
**Testumgebung:** Vor Ausführung lokale Vorschau, URL, Browser und Arbeitsstand protokollieren; nur fiktive Testdaten verwenden.

## Grundlage

- Technik: `2026-10-23_terminus-bwl-technik.md`.
- Aufgaben: `2026-10-23_c3po-bwl-lernaufgaben.md` (dort als fachlich noch zu prüfende Entwürfe gekennzeichnet).
- Referenz: Positionssumme 2.850,00 €, Handlungskosten 199,50 €, Selbstkosten 3.049,50 €, Gewinn 152,48 €, Nettoangebotspreis 3.201,98 €. Handlungskostenbasis = Positionssumme; Gewinnbasis = Selbstkosten.
- Testresultat ist kein Beleg für fachliche Freigabe realer Angebots- oder Steuerregeln.

## Testfälle

### QA-01 – Bestehende Angebotsberechnung
**Schritte:** Freien Rechner mit dem LF2-Referenzfall befüllen: Mengen/Einzelpreise 3×640,00 €, 3×150,00 €, 3×30,00 €, 3×40,00 €, Versand 1×0,00 €, Einrichtung 3×90,00 €; Handlungskosten 7 %, Gewinn 5 %; berechnen.  
**Erwartet:** Sichtbarer Rechenweg und genau die Referenzwerte oben. Basen der Zuschläge sind erkennbar. Ergebnis belegen.

### QA-02 – Wechsel zwischen Rechner und Lernmodus
**Schritte:** Im Rechner Eingaben und Ergebnis erzeugen; in Lernmodus und zurück wechseln; zusätzlich während eines offenen Lernschritts wechseln.  
**Erwartet:** Kein unbemerkter Verlust oder Wechsel von Eingaben, Ergebnis oder Lernfortschritt; Modus und Schritt bleiben verständlich erkennbar. Wenn eine Betriebsart im geprüften Stand fehlt: „nicht prüfbar – Funktion fehlt im Stand“ dokumentieren, nicht als Rechenfehler.

### QA-03 – Richtige Antworten
**Schritte:** Eine verfügbare Lernaufgabe der Reihe nach korrekt beantworten. Werte vorher mit dem Aufgabenentwurf abgleichen.  
**Erwartet:** Korrekte Antwort verständlich bestätigt; Folgeschritt erst dann freigegeben; erledigte Schritte sichtbar; Fortschritt textlich, z. B. „Schritt 2 von 3“; ein erreichbarer und erkennbarer Abschluss.

### QA-04 – Falsche Antwort und Hilfe
**Schritte:** In einem offenen Lernschritt eine plausible falsche Antwort absenden; Meldung lesen; Hilfe aufrufen; erneut versuchen und korrekte Antwort eingeben.  
**Erwartet:** Verständlicher, freundlicher Hinweis auf den nächsten Rechenschritt; Endlösung nicht ungefragt verraten; erneuter Versuch möglich; falsche Antwort schaltet nicht weiter, richtige Antwort schon.

### QA-05 – Rundung und gleiche Berechnung
**Schritte:** Referenzfall berechnen; außerdem 3.049,50 € × 5 % testen; identische Eingaben, soweit möglich, in freiem Rechner und Lernmodus vergleichen.  
**Erwartet:** Kaufmännische Cent-Rundung, der Halbcent wird aufgerundet und der Gewinn beträgt 152,48 €. Gleiche Eingaben ergeben in beiden Modi gleiche Werte, ohne abweichende Rundungslogik.

### QA-06 – Ungültige Eingaben
**Schritte:** Ohne Position berechnen; unvollständige Position (nur Menge bzw. Preis); `abc`; Geldbetrag `12.50`; `12,505`; Menge mit mehr als drei Dezimalstellen; Prozentsatz über 100,00 eingeben. Fehler jeweils korrigieren und erneut berechnen.  
**Erwartet:** Ungültige Eingabe wird nicht stillschweigend akzeptiert. Meldung benennt Problem und Korrekturmöglichkeit. Leere ungenutzte Zeilen sind erlaubt, halb ausgefüllte nicht. Nach Korrektur ist Berechnung möglich.

### QA-07 – Tastatur und Fokus
**Schritte:** Ohne Maus mit Tabulator durch Moduswahl, Felder und Aktionen; unterstützte Pfeiltasten, Pos1/Ende; mit Enter absenden; Fehler erzeugen; vollständigen Lernschritt per Tastatur durchführen.  
**Erwartet:** Alle Aktionen erreichbar; sichtbarer Fokus und logische Reihenfolge; Enter funktioniert; Fokus landet nicht verloren oder in verborgenem Inhalt; Fehler/Ergebnis wahrnehmbar; keine unbeabsichtigte Doppelauslösung.

### QA-08 – Verständliche Rückmeldungen
**Schritte:** Aufgabe, Anweisung, Hilfe sowie Fehler-, Erfolgs- und Abschlussmeldung prüfen; Verhalten nach richtiger/falscher Antwort beobachten; Texte unabhängig von Farbe beurteilen.  
**Erwartet:** Kurze, konkrete Sätze; klarer nächster Schritt und Fortschritt; keine alleinige Farbcodierung; Hilfe unterstützt den Rechenweg, ohne ungefragt die Lösung vorwegzunehmen. Status und Fehler sind für assistive Technik programmatisch angekündigt. Konkrete Screenreader-Abnahme separat protokollieren.

## Protokoll bei Ausführung

Je Fall Status (bestanden / fehlgeschlagen / nicht prüfbar), URL und erkennbarer Stand, Ausgangslage, tatsächlich ausgeführte nummerierte Schritte, Soll/Ist, Häufigkeit und Beleg ohne unnötige personenbezogene Daten notieren. Sichere Reproduktion nur ohne Daten-/Fortschrittsrisiko; nicht wiederholte Auffälligkeiten als einmalig kennzeichnen.

## Offene Grenzen

Dies ist ein Testplan, kein Ausführungsbericht; Browser- und Screenreader-Tests wurden nicht durchgeführt. Fachliche Freigabe der Aufgaben bleibt offen. Verfügbarkeit des Lernmodus ist am aktuellen Stand zu prüfen.