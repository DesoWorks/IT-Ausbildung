# Unabhängige QA – Windows-Werkzeuglabor: shutdown, ssh, diskpart

**Datum:** 03.11.2026  
**Prüfumfang:** Phase 1, drei neue CMD-Lernprofile und gezielte Regression der bestehenden Werkzeugkiste.  
**Arbeitsstand:** Branch `feature/windows-werkzeugkiste`, HEAD `8e060705108e58130d7eabae6f1aceb49f3d0b26`. Die drei Quelldateien waren uncommittete Änderungen im Worktree; zusätzlich lagen Änderungen in `WINDOWS-LABOR-TESTANLEITUNG.md` und unversionierte Dateien unter `vorschau/`. Diese vorhandenen Änderungen wurden nicht verändert.  
**Umgebung:** Node.js v22.23.3; lokale HTTP-Vorschau `http://127.0.0.1:42549/module/windows-werkzeugkiste.html`; isoliertes headless Google Chrome mit CDP. Es wurde kein Windows-Systembefehl gestartet.

## Ergebnis

Im geprüften Umfang keine reproduzierbaren Nutzerfehler festgestellt. Die drei Profile erscheinen in der Benutzeroberfläche, enthalten das erwartete Schema und liefern bei den Miniübungen passende Rückmeldungen. Filter, Modi und Altinhalte blieben im gezielten Lauf nutzbar. Die fachlich kritischen Aussagen zu `/t > 0`, Host-Key-Prüfung und DiskPart-Gefahren stimmten mit den geöffneten Primärquellen überein.

## Ausgeführte Prüfungen und Beobachtungen

1. **Worktree und Prüfstand:** `git status --short --branch`, `git rev-parse HEAD`, `git worktree list --porcelain` und Diff der beauftragten Dateien ausgeführt. Angegebener Branch und HEAD stimmen. Änderungen lagen bereits in den drei Lernlabor-Dateien, Testanleitung und Vorschau. Kein Checkout, Reset oder Bearbeiten vorhandener Dateien.
2. **Unit-/Regressionstests:** `node tests/windows-labor.test.js` bestanden: 32 Profile, Schema-/Quellen-/Sicherheitsregression und 96 Bewertungsfälle. `node tests/windows-werkzeugkiste.test.js` bestanden: 18 Prüfungen einschließlich Datenvalidierung, Karten/Übung/Wissenstest und HTML/CSS-Prüfungen.
3. **Vorschau:** Eigener Node-HTTP-Server auf Loopback und freiem Port 42549. HTTP-Abruf der Moduldatei ergab Status 200; Chrome lud die Seite ohne sichtbare Fehlerbox, „Lernkarten“ war aktiv. Im Labor wurde „32 von 32 Befehlen gefunden“ angezeigt.
4. **Neue Profile:** `shutdown`, `ssh` und `diskpart` in der Oberfläche geöffnet. Bei jedem Profil waren Zweck/Einsatz, Syntax/Parameter, Praxisfall, als simuliert gekennzeichnete Ausgabe, Deutung, Fehlerursachen, Rechte, Änderungen/Risiken, Miniübung und Quellen sichtbar. Jedes hatte drei Antwortoptionen.
5. **Miniübung:** Leeres Absenden ergab „Bitte wähle eine Antwort.“; falsch ergab „Noch nicht.“ samt Erklärung; richtig ergab „Richtig.“ samt Erklärung. Die UI-Übung bewertete Antworten anhand der lokalen Daten; keine Systembefehle wurden gestartet.
6. **Filter und Navigation:** Suche nach `dns` reduzierte die Treffer auf 3. „Filter zurücksetzen“ stellte alle 32 wieder her und fokussierte das Suchfeld. Wechsel Lernkarten → Labor erhielt die DNS-Suche und drei Treffer. Lernkarten zeigten Inhalte; Übung und Wissenstest waren befüllt. Gezielter Smoke-Test, keine Vollregression aller Altfragen.
7. **Ansichten:** Bei Viewportbreiten 1440, 768 und 320 CSS-Pixeln war `documentElement.scrollWidth` 1425, 753 bzw. 305; kein horizontaler Dokumentüberlauf. Filterfelder lagen innerhalb der Seitenbreite.
8. **Fachabgleich anhand Primärquellen:** Microsoft Learn bestätigt: `shutdown /t` größer 0 impliziert `/f`; `/a` bricht einen ausstehenden Shutdown während der Frist ab und ist ein eigener Aufruf. OpenBSD `ssh(1)` bestätigt Zielsyntax `[user@]hostname` und Optionen `-p`, `-i`, `-N`, `-L`; Host-Key-Identität ist von der Benutzer-Authentifizierung zu unterscheiden. Microsoft Learn zu DiskPart bestätigt Fokus durch `select`, lesende `list`/`detail` und die Wirkung von `clean` auf Partitions-/Volumeinformationen; `clean all` setzt jeden Sektor auf Null. Das Profil kennzeichnet DiskPart ausdrücklich als Simulation.

## Offen / nicht geprüft

Die StarNet-Browser-Testwerkzeuge konnten die lokale Serverzugehörigkeit dieses Hintergrundprozesses nicht verifizieren. Die Oberfläche wurde deshalb über den bereitgestellten CDP-Helfer `tests/cdp-helper.js` und Node-22-WebSocket/CDP in Chrome real geladen und bedient, nicht über `browser.test_navigate`. Kein Screenshot- oder Accessibility-Audit. Tastatur wurde teilweise geprüft (Fokus nach Filter-Reset); vollständiger Tab-/Shift+Tab-/Radio-Lauf, Screenreader und Touch bleiben offen. Bei 320 px wurde kein separates Umbruch-Audit jeder langen Codezeile durchgeführt. Browser-Konsolenereignisse wurden nicht systematisch gesammelt. Keine RAID-Prüfung (Phase 2), Vollinventur oder Produktionsprüfung.

## Quellen

- Microsoft Learn, `shutdown`: https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/shutdown
- OpenBSD Manual Pages, `ssh(1)`: https://man.openbsd.org/ssh
- Microsoft Learn, `diskpart`: https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/diskpart
- Microsoft Learn, `clean`: https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/clean
