# BWL-Werkstatt: technische Implementierungsspezifikation

**Projekt:** IT-Ausbildung · **Paket:** BWL-Werkstatt · **Adressat:** Jarvis  
**Status:** Planungsdokument; keine Änderung am Projektcode.  
**Grundlage:** vorhandene `module/bwl-werkstatt.html`, `js/bwl-werkstatt.js`, `css/bwl-werkstatt.css` und `tests/bwl-werkstatt.test.js`.

## Ziel

Die bestehende BWL-Werkstatt erhält zwei Betriebsarten: **Freier Rechner** und **Lernmodus**. Beide verwenden denselben gegenwärtigen Berechnungskern (`window.BWL_WERKSTATT`). Der Lernmodus ergänzt eine geführte Oberfläche, nicht eine zweite Berechnungsimplementierung. Die bestehenden vier Rechnungsarten (Angebot, Gewinn, Rabatt, Netto/Brutto), Berechnungswege und Eingaberegeln bleiben verfügbar.

## Umsetzungsvorgaben

1. **Gemeinsamer Kern, zwei Modi**
   - Berechnungen weiterhin ausschließlich über die bestehenden Funktionen `angebot`, `gewinn`, `rabatt` und `steuer` aus `js/bwl-werkstatt.js` ausführen.
   - UI-Zustand (freier Rechner/Lernmodus, Aufgabe und Schritt) getrennt von Rechenlogik halten. Lernantworten mit denselben Eingaben/Regeln validieren; nicht eigene Formeln nachbilden.
   - Wechsel der Betriebsart darf Werte und Ergebnisse nicht unbemerkt verändern. Moduswechsel löscht keine Lernantworten; explizites „Neu starten“ darf den Lernfortschritt der aktuellen Aufgabe zurücksetzen.

2. **Artikel und Ergebnistabelle (Angebotsrechnung)**
   - Jede der bestehenden bis zu sechs Positionen bekommt zusätzlich ein Textfeld **Artikelbezeichnung**; Menge und Einzelpreis netto bleiben die vorhandenen Eingaben. Bezeichnung optional lassen, damit vorhandene Nutzung unverändert möglich bleibt.
   - Ergebnis als semantische Tabelle mit Kopfzeile und klaren Spalten **Artikel**, **Menge**, **Einzelpreis netto**, **Positionsbetrag** darstellen; Bezeichnungen und Zahlen aus Eingabe bzw. vorhandenem Rechenergebnis übernehmen. Leer gelassene Positionen nicht anzeigen.
   - Darunter getrennte Summenzeilen: **Positionssumme**, **Handlungskosten**, **Selbstkosten**, **Gewinn**, **Nettoangebotspreis**. Eurobeträge und Rechenweg sichtbar halten. Für schmale Ansichten Tabelle horizontal scrollbar oder strukturiert umbrechen, ohne Werte abzuschneiden.
   - Bei Gewinn-, Rabatt- und Netto/Brutto-Rechnungen die jeweilige passende Ergebnisdarstellung mit benannten Basis-/Ergebniswerten beibehalten; die Artikeltabelle betrifft die Angebotsrechnung.

3. **Drei aufeinanderfolgende Übungsschritte**
   - Jede Aufgabe besteht aus genau drei nummerierten, nacheinander freigeschalteten Schritten: **1. Werte/Artikel in die Positionen übertragen**, **2. Handlungskosten und Selbstkosten nachvollziehen/eintragen**, **3. Gewinn und Nettoangebotspreis berechnen/eintragen**.
   - Erst nach korrekter Antwort den nächsten Schritt freigeben. Vorherige Schritte bleiben sichtbar und als erledigt markiert. Fortschritt zusätzlich als Text „Schritt 1 von 3“ ausgeben; nicht nur farblich vermitteln.
   - Für eine Aufgabe ohne passende Angebotsrechnung (z. B. Rabatt oder Steuer) dürfen die drei Lernschritte fachlich auf deren Rechenweg zugeschnitten sein; der gemeinsame Kern bleibt maßgeblich. Aufgabenwerte und fachliche Musterlösungen kommen aus dem abgestimmten Lerninhaltsdokument, nicht aus diesem technischen Papier.

4. **Fehler- und Hilfetexte**
   - Vorhandene Validierungsmeldungen des Rechenkerns unverändert nutzbar lassen. Keine rohen Exceptions, technischen Codes oder alleinigen Farbsignale anzeigen.
   - Fehlende bzw. ungültige Eingaben direkt und handlungsorientiert benennen, z. B. „Gib eine Menge ein, zum Beispiel 3“ oder „Verwende das Komma als Dezimalzeichen, zum Beispiel 12,50“.
   - Lernantwort falsch: freundlich und konkret, ohne Lösung sofort zu verraten, z. B. „Das stimmt noch nicht. Rechne zuerst Menge × Einzelpreis. Du kannst es erneut versuchen.“ Hilfe auf Anforderung darf den nächsten Rechenschritt erklären; Lösung erst nach Versuch oder bewusster Auflösung zeigen.
   - Rückmeldungen programmatisch mit `role="status"`/`aria-live="polite"` ausgeben; Fehler mit geeignetem Alert. Nach Absenden Fokus sinnvoll auf Rückmeldung oder nächsten Schritt setzen.

5. **Tastatur und LRS-freundliche Darstellung**
   - Sämtliche Steuerung ohne Maus bedienbar; natürliche Tab-Reihenfolge, sichtbarer `:focus-visible`, Enter zum Absenden und verständliche Beschriftungen. Tabs/Moduswahl mit konsistenten ARIA-Zuständen; vorhandene Pfeiltasten-/Home-/End-Bedienung erhalten, sofern Tabs weiterverwendet werden.
   - Kurze Sätze, vertraute Wörter, klare Überschriften und genau eine erkennbare Hauptaufgabe pro Ansicht. Schrittfolge und Zahlen nicht ausschließlich über Farbe/Position markieren.
   - Lesbare Schriftgröße, großzügiger Zeilen-/Absatzabstand, ausreichender Kontrast, ruhiges Layout ohne Zeitdruck oder unnötige Animation. Bestehende Anzeigeoptionen und zentrale Farbvariablen weiterverwenden. Bei 640px und schmaler keine abgeschnittenen Eingaben/Ergebnisse.
   - Auf kleinen Bildschirmen Reihenfolge Artikel → Menge → Einzelpreis klar beibehalten. Labels dauerhaft sichtbar; Platzhalter ersetzen keine Labels.

## Unveränderliche Rechen-/Referenzanforderungen

Nicht ändern: Ganz-Cent-Beträge, kaufmännische Rundung auf volle Cent, Dezimal-Komma-Regeln, Mengenpräzision bis drei Nachkommastellen, Prozentpräzision bis zwei Nachkommastellen, Prozentgrenze 100,00, die explizite Basis jedes Zuschlags/Rabatts sowie die Einmalrundung einer Positionszeile. Kein stilles Wechseln zu einem Dezimalpunkt als Geldtrennzeichen. Sechs Angebotszeilen bleiben die bekannte MVP-Grenze, nicht als fachliches Maximum ausgeben.

Bestehenden Referenzfall `lf2Referenz()` unverändert erhalten. Erwartungswerte gemäß bestehendem Test: Positionssumme **2.850,00 €**, Handlungskosten **199,50 €**, Selbstkosten **3.049,50 €**, Gewinn **152,48 €**, Nettoangebotspreis **3.201,98 €**. Der vorhandene `percent()`-Vergleich mit LF2 muss dieselben Centwerte liefern. Bestehende Beispiele und Berechnungen dürfen nicht durch Lerninhalte überschrieben werden.

## Abnahmekriterien für Jarvis

- Beide Modi rufen nachweislich denselben bestehenden Kern auf; kein duplizierter Rechenweg.
- Freier Modus unterstützt weiter die vier vorhandenen Rechnungsarten.
- Angebotspositionen zeigen Artikelbezeichnung und tabellarische, nachvollziehbare Summen.
- Im Lernmodus sind genau drei sequenzielle Schritte je Aufgabe erkennbar; falsche Antworten blockieren nur den Schrittfortschritt, nicht die Korrektur.
- Fehlermeldungen, Hilfe und Rückmeldungen sind verständlich und assistive-Technologien können sie erkennen.
- Tastatur, sichtbarer Fokus und schmale Darstellung sind geprüft.
- Der Referenzfall liefert exakt die oben aufgeführten Werte; bestehende Testfälle zu Rundung und ungültigen Eingaben bleiben gültig und grün.

## Abhängigkeiten / offen

- Der eigentliche BWL-Werkstatt-Code ist im Checkout bereits vorhanden und lokal verändert/unversioniert. Dieses Dokument enthält keine Codeänderung. Jarvis muss vor einer Implementierung den aktuellen gemeinsamen Checkout prüfen und fremde/offene Änderungen erhalten.
- Inhaltliche Musterlösungen, Aufgaben und Feedbacktexte für den Lernmodus müssen mit C-3POs als fachlich zu prüfende Entwürfe gekennzeichnetem Dokument abgeglichen werden.
- Nicht spezifiziert ist, ob der Lernmodus anfänglich nur Angebotsaufgaben oder auch Gewinn-, Rabatt- und Steueraufgaben enthält. Vorgabe für die Implementierung: den Angebotsablauf zuerst unterstützen; weitere Rechnungsarten im Lernmodus nur dann aufnehmen, wenn passende geprüfte Aufgaben vorliegen.
- Fachliche Freigabe der Aufgaben und menschlicher Screenreader-/Browser-Abnahmetest bleiben separat erforderlich.
