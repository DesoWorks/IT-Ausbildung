# Windows-Werkzeuglabor öffnen und prüfen

Feature-Teststand, keine Produktions- oder Fachfreigabe.

1. [Branch als ZIP herunterladen](https://github.com/DesoWorks/IT-Ausbildung/archive/refs/heads/feature/windows-werkzeugkiste.zip).
2. Gesamten Ordner entpacken. `module/windows-werkzeugkiste.html` direkt im Browser öffnen; alternativ den vorhandenen lokalen Start verwenden.
3. „Diagnose- und Administrationslabor“ wählen. Es ist keine Konsole: Alle Ausgaben sind erfundene, simulierte Lernbeispiele. Kein Befehl wird auf deinem Gerät ausgeführt.
4. Prüfen: insgesamt 32 Befehle, CMD-Filter 18, PowerShell-Filter 14. Zum Beispiel nach DNS oder Get-Disk suchen. Nulltreffer sollen erklärt werden. „Filter zurücksetzen“ stellt alle Befehle wieder her.
5. Einen Befehl auswählen: Zweck, Syntax, Praxisfall, simulierte Ausgabe, Deutung, Fehler, Rechte, Änderungen, Sicherheit, Miniübung und Quellen müssen vorhanden sein. Lange Ausgaben bei Bedarf innerhalb ihres Rahmens scrollen.
6. Miniübung leer absenden, falsch beantworten und anschließend richtig: verständliche Rückmeldungen und Erklärung, keine Sperre und keine Speicherung. Der Wechsel des Befehls entfernt altes Feedback.
7. Tastatur: Tab/Shift+Tab zu Filtern, Auswahl, Antworten und Buttons. Native Auswahl mit Pfeilen bzw. Home/End und Enter; Radios mit Pfeilen; Buttons mit Enter oder Leertaste. Der Fokus muss sichtbar bleiben. Die Ausgabebox per Tab fokussieren und mit Pfeilen scrollen.
8. Bei 1440, 768 und 320 CSS-px prüfen: keine horizontalen Seitenüberläufe, Formfelder passen auf die Seite. Touch auf einem echten Gerät und Screenreader separat prüfen; technische Simulation ersetzt beides nicht.
9. Die bisherigen Lernkarten, Übung und Wissenstest bleiben nutzbar. Übung und Wissenstest beginnen beim Öffnen jeweils neu. Laborfilter bleiben beim Moduswechsel erhalten.

## Fachliche Merkpunkte

Windows PowerShell 5.1 und PowerShell 7 unterscheiden sich; `Get-EventLog` fehlt in Version 7. Namensauflösung, ICMP-Antwort, TCP-Verbindung und Anwendungsfunktion sind getrennte Beobachtungen. Lesende Abfragen nicht mit Reparatur- und Änderungsschaltern verwechseln. Aus diesem Lernstand keine Freigabe für Eingriffe auf Produktionssystemen ableiten. Ein Storage-Inventar beweist keine RAID-Topologie.

## Technische Prüfungen und Berichte

```sh
node tests/windows-labor.test.js
node tests/windows-werkzeugkiste.test.js
node tests/navigation-glossar.test.js
node tests/startseite.test.js
```

Unabhängige QA und Grenzen: `docs/uebergaben/2026-11-03_glados-windows-labor-qa.md`. Quellenabdeckung: C-3PO-Quellenbericht im selben Ordner. Tatsächliche Umsetzung, Tests und Rollenabweichung: `2026-11-03_terminus-windows-labor-abschluss.md`.
