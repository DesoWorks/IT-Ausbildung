# Plan Lernfeld 6: Serviceanfragen bearbeiten

Stand: 17.10.2026. Katalog-ID `lf6`, 2. Ausbildungsjahr, Zeitrichtwert 40 Stunden.
Quelle: KMK-Rahmenlehrplan Fachinformatiker, Seite 17. Der Text der Seite lag dem Bau als Auszug im Auftrag vor. Das PDF selbst wurde in diesem Lauf nicht neu geöffnet.

Kompetenz: Serviceanfragen einordnen, Fehlerursachen ermitteln und beheben.

## Zuordnung der Lernziele zu den Lektionen

| Lernziel aus Seite 17 | Lektion |
|---|---|
| Serviceanfragen entgegennehmen, direkter und indirekter Kundenkontakt | `lf6-kontakt` (neu), `lf6-anfrage` |
| Serviceanfragen analysieren | `lf6-anfrage`, `lf6-fragen` |
| Vertragliche Grundlage (SLA) prüfen, Reaktionszeit ermitteln | `lf6-sla` |
| Status im Service-Management-System dokumentieren | `lf6-status`, `lf6-notiz` |
| Durch systematisches Fragen unter Berücksichtigung des Support-Levels einordnen | `lf6-fragen`, `lf6-level` |
| Lösungsmöglichkeiten im Rahmen des Support-Levels ermitteln | `lf6-loesung` (neu), `lf6-level` |
| Problem bearbeiten und Bearbeitungsstatus dokumentieren | `lf6-ursache` (neu), `lf6-status`, `lf6-notiz` |
| Situationsgerecht kommunizieren, auch in einer Fremdsprache, Kommunikationsmodelle, Deeskalation | `lf6-gespraech` (neu) |
| Bearbeitungsprozess und Gesprächsverhalten reflektieren | `lf6-qualitaet` (neu) |
| Servicefälle diskutieren, Maßnahmen zur Qualitätssteigerung vorschlagen | `lf6-qualitaet` (neu) |
| Überprüfung des Gelernten | `lf6-kontrolle` (neu, "LF6 Lernzielkontrolle", 24 Fragen) |

Die sechs Lektionen `lf6-anfrage`, `lf6-fragen`, `lf6-level`, `lf6-notiz`, `lf6-sla` und `lf6-status` waren schon vorhanden und sind unverändert eingebunden. Neu gebaut: fünf Lektionen und die Lernzielkontrolle.

## Rahmen
Fiktiver Betrieb Nordlicht IT-Service, Auszubildende Samira. Vier Fragen je Lektion, Schritte als Fortschritt, Speicher-Schlüssel `it-ausbildung.<id>.v1`. Die Kontrolle übernimmt das Muster von LF1 bis LF5: Abgabe sperrt, Zurücksetzen nur mit Passwort (nur der Hash steht im Code). Der Katalogeintrag der Kontrolle heißt `lf6-kontrolle`, nicht `lf6-lernziel` wie in LF1 bis LF5. Das folgt dem Auftrag.

## Ehrliche Restlücke
- Kommunikationsmodelle (zum Beispiel Vier-Seiten-Modell) sind nur indirekt über "Sache und Gefühl trennen" und Ich-Botschaft berührt, nicht als Modell benannt.
- Fremdsprache: genau ein einfacher englischer Satz. Kein eigenes Sprachtraining.
- Mehrere Fragen stützen sich auf denselben Monitor-Fall. Andere Störungsarten fehlen.
- Reaktionszeit wird nur in `lf6-sla` an einem Fall gerechnet.
- Die Seiten wurden mit Node-Tests geprüft, nicht im Browser angesehen.

## Bewusst draußen
Echte Fehlerbehebung am Produktivsystem, echte Ticketsysteme, echte Kunden, Angriffe, Passwörter. Keine Zusammenfassungsseite, keine zusammenhängende Übungsaufgabe. Kein Lernfeld 7.
