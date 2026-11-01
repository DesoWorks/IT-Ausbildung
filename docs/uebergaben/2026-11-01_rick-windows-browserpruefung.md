# Browserprüfung nach GLaDOS-Blocker – 01.11.2026

GLaDOS hat die automatisierten Tests ausgeführt und die Sichtprüfung nicht freigegeben, weil `browser.test_navigate` den lokalen Server nicht öffnen konnte. Das ist ein Prüfwerkzeug-Blocker, kein nachgewiesener Modulfehler.

Rick hat danach denselben Worktree über `http://127.0.0.1:8091` mit headless Chrome und dem vorhandenen CDP-Helfer geprüft.

Beobachtet:

- Lernkarten: Überschriften „Tastenkombinationen“ und „Ausführen-Befehle“, je 7 Karten, Sicherheitshinweis sichtbar, Version 0.16.3-alpha.1.
- Kein Link mit `.cpl`, `.msc`, `shell:` oder `ms-settings:`.
- Übung ohne Auswahl: „Bitte wähle zuerst eine Antwort aus. Es wird noch nichts gewertet.“
- Übung mit Win+L: sofort „Richtig. Win+L sperrt die Sitzung.“
- Wissenstest bis Ergebnis, Beispiel „2 von 10 richtig“, Button „Wissenstest neu starten“, danach wieder Aufgabe 1 von 10.
- Tab-Fokus auf einer Antwort: Outline `rgb(29, 95, 180) solid 3px`.
- Viewport 320px: `scrollWidth` 320, kein horizontaler Überlauf.
- Startseite: Abschnitt „Tools & Nachschlagen“, Link `module/windows-werkzeugkiste.html`.

Diese Prüfung ersetzt nicht die Sichtprüfung des Commanders.
