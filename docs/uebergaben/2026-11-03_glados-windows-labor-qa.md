# Unabhängige QA: Windows-Werkzeuglabor

**Datum:** 03.11.2026
**Prüfobjekt:** `feature/windows-werkzeugkiste`, HEAD bei Prüfstart `949cf82325ba93b051bd7b55aa27fd925f3e3774` plus uncommittete Änderungen.
**Live-Vorschau:** `http://127.0.0.1:8145/module/windows-werkzeugkiste.html`
**Erkennbarer Stand in der Oberfläche:** Windows-Werkzeugkiste, Version 0.16.3-alpha.1.
**Prüfgrenze:** gezielte UI-/Bedienprüfung, keine Komplettabnahme. Keine echten Windows-Befehle ausgeführt. Keine Projektdateien außerhalb dieses Berichts verändert; kein Git-, Installations- oder Vorschauprozess aus Terminus' Umgebung angefasst. Screenshotbeleg: `qa-labor.png` (320px-Ansicht, im Projektordner).

## Ergebnis

**Im geprüften Umfang keine Fehler festgestellt.** Die oben genannten Detailkorrekturen zu `Get-WinEvent` und `Get-Disk` wurden in dieser laufenden Vorschau sichtbar umgesetzt; keine neue inhaltliche Abweichung ist mir dabei aufgefallen. Das ist keine fachliche Freigabe aller 29 Befehlsprofile.

## Geprüfte Abläufe und Beobachtungen

- Die Seite zeigt den Modus **„Diagnose- und Administrationslabor“**. Beim Öffnen meldet die Oberfläche **„29 von 29 Befehlen gefunden.“** Die Profilauswahl listet 29 Optionen; der Testkatalog weist 15 CMD- und 14 PowerShell-Profile aus.
- Im ausgewählten Profil waren Abschnitte zu Zweck, Syntax, Praxisfall, simulierter Ausgabe, Deutung, Fehlerursachen, Rechten, möglichen Änderungen, Sicherheit/Grenzen und Quellen vorhanden. Die Oberfläche weist ausdrücklich auf **Simulation – keine echte Konsole** hin.
- Auswahlwechsel aktualisierte das Profil. Kategorie-/Shell-Filter reduzierten die Liste; die Kombination PowerShell plus gewählter Kategorie ergab 14 Treffer. Eine Suche ohne Treffer zeigte **„0 von 29 Befehlen gefunden.“** und den Hinweis **„Keine passenden Befehle. Suche kürzen oder Filter zurücksetzen.“**; der Auswahlbereich war dabei verborgen. **„Filter zurücksetzen“** stellte 29 Profile wieder her.
- Im Diagnosemodus führte die Tastaturprüfung (Tab-Navigation auf dem Modusbereich) zu den sichtbaren interaktiven Elementen; die vollständige Prüfung aller Einzelprofile/aller Tabstops wurde nicht durchgeführt.
- Die vorhandenen Lernkarten blieben erreichbar: nach Rückkehr waren 7 Tastenkombinationskarten und 9 Ausführen-Karten sichtbar. Übung: ohne Antwort kam **„Bitte wähle zuerst eine Antwort aus. Es wird noch nichts gewertet.“**; mit richtiger Auswahl erschien **„Richtig“** plus Erklärung zu Win+L. Die vorhandenen Modi wurden damit nicht ersetzt.
- Responsive Maße: mit Browser-Emulation bei 1440, 768 und 320 CSS-Pixeln. Dokumentbreite: 1425/753/320 CSS-Pixel bei Viewport 1440/768/320; somit kein zusätzlicher horizontaler Dokumentüberlauf an diesen drei getesteten Größen. Die lange Seite bleibt vertikal scrollbar. Ausgabe-/Codebereiche waren vorhanden; ein systematischer Überlauftest aller 29 langen Ausgaben wurde nicht gemacht.
- Die ursprüngliche Browserprüfung konnte nicht über die Standard-Navigationswerkzeuge localhost öffnen. Die unabhängige Prüfung wurde danach in einer eigens gestarteten Chrome-Instanz über deren separaten CDP-Port vorgenommen; nicht Terminus' Port 9241. Es gab keine Konsolenmeldungen in der Browserprobe.

## Tests

Ausgeführt, ohne Dateien zu verändern:

- `node tests/windows-labor.test.js` — bestanden: 29 Pflichtprofile, Datenvalidierung, 87 Antwortfälle, Quellen-/Sicherheits-/Fachregressionen.
- `node tests/startseite.test.js` — bestanden.
- `node tests/logic.test.js` — 13 bestanden, 0 fehlgeschlagen.

Das sind automatisierte Regressionstests, kein Ersatz für die oben beschriebene Browserprüfung. Eine separate umfassende „87 Profil/Breite/Antwort“-Eigenprobe und weitere frühere Prüfungen wurden laut Übergabe bereits von Terminus als grün gemeldet; ich übernehme sie nicht als eigene Beobachtung.

## Nicht geprüft / Einschränkungen

- Keine Vollprüfung jedes der 29 Profile oder jeder acht Feldinhalte; einzelne PowerShell-/Storage-Ausgaben und alle Quellen nicht vollständig fachlich gegengeprüft.
- Tastatur nur stichprobenartig; kein Screenreader, kein vollständiger Accessibility-/Kontrast-Audit.
- Responsive Prüfung an drei Breiten, nicht auf realen Mobilgeräten; keine vollständige Prüfung jeder Beispielausgabe auf internes Scrollen/Abschneiden.
- Kein Windows-Livebetrieb, keine Rechteprüfung auf realem Windows, keine Ausführung von Diagnose- oder Reparaturbefehlen.
- Kein vollständiges Testen sämtlicher Altübungs-/Quizfragen und aller Antwortvarianten; gezielt nur Übungsleerlauf und korrekte Rückmeldung geprüft.
- Die Vorschau `8145` wurde nicht beendet. Nur der von mir gestartete isolierte Chrome-Prozess und lokale Hilfsproxy werden nach dem Bericht beendet.
