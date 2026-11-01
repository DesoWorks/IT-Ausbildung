# Übergabe: Didaktische Inhalte – Windows-Werkzeugkiste

**Datum:** 01.11.2026  
**Zielgruppe:** Auszubildende Fachinformatik Systemintegration, 1. Ausbildungsjahr

## Umfang

Die JSON-Datei `docs/inhalte/windows-werkzeugkiste.json` enthält genau 14 Lernkarten: sieben Tastenkombinationen und sieben Befehle für den Dialog **Ausführen**. Dazu kommen sieben Übungssituationen und zehn Quizfragen.

## Didaktische Leitlinien

- Kurze Sätze und einfache Wörter verwenden.
- Fachwörter direkt erklären.
- Tastenkombinationen klar von Befehlen für **Win+R** trennen.
- Befehle nicht automatisch ausführen. Das Modul ändert keine Einstellungen.
- `secpol.msc` ist nicht in jeder Windows-Edition verfügbar.
- Die Darstellung von Energieoptionen kann je nach Windows-Version unterschiedlich sein.
- `compmgmt.msc` endet auf `.msc`, nicht auf `.msd`.
- Sicherheitsrichtlinie und Dienste werden nur erklärt. Die Lernenden sollen dort nichts konfigurieren.
- Wiederholung ist unbegrenzt. Es gibt keine Sperre durch Punkte.

## Inhalt der Übergabe

Die JSON-Datei ist für die direkte Einbindung vorgesehen und hat die Wurzelstruktur `karten`, `uebungen`, `quiz` und `hinweise`. Übungs- und Quizrückmeldungen sind kurz gehalten. Jede Übung hat genau eine richtige Antwort und verweist auf die Karten-ID.

**Fachliche Grundlage:** Unterrichtswunsch „Windows-Shortcuts und Systemwerkzeuge – Unterrichtswunsch 30.10.2026“ sowie die im Auftrag festgelegten Pflichtinhalte. Aussagen zu Windows-Funktionen sind auf diese Vorgaben begrenzt.
