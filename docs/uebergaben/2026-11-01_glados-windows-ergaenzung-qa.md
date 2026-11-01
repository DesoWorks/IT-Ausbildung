# Unabhängige QA: Ergänzung der Windows-Werkzeugkiste

**Datum:** 01.11.2026  
**Projekt/Branch:** `/home/starnet/projects/IT-Ausbildung-werkzeugkiste`, `feature/windows-werkzeugkiste`  
**Ausgangs-HEAD:** `ba62939` (Arbeitsbaum enthält lokale Änderungen).  
**Änderungen durch QA:** keine. Kein Commit, Push oder Merge.

## Urteil

**Nicht freigabefähig für die Commander-Sichtprüfung auf Grundlage dieser QA.** Die Pflichtinhalte, Datenzuordnung, Testlogik und statischen Tastatur-/Fokusverträge sind in den gelesenen Dateien und bestandenen Prüfungen vorhanden. Es wurde dabei kein neuer kritischer Fehler festgestellt. Die tatsächliche Browserprüfung der Vorschau war jedoch blockiert; daher konnte ich Bedienung, gerenderten Fokus, Karten/Feedback, Responsive-Verhalten und Browserkonsole nicht unabhängig bestätigen. Das ist ein Prüfblocker, kein belegter Fehler der Anwendung. Die Sichtprüfung durch den Commander sollte nicht als Ersatz für diese fehlende QA-Prüfung missverstanden werden.

## Pflichtanforderungen, statisch geprüft

- `gpedit.msc`: Karte nennt `Win+R, dann gpedit.msc`, erklärt den Lokalen Gruppenrichtlinien-Editor und enthält eine Alltagssituation. Der Hinweis „Unter Windows 11 Home ist der Editor normalerweise nicht verfügbar“ sowie „Gruppenrichtlinien nicht ohne konkreten Auftrag verändern“ sind enthalten.
- `msconfig`: Karte nennt `Win+R, dann msconfig`, erklärt Systemkonfiguration und nennt eine Alltagssituation. Windows-11-Verfügbarkeit sowie der abgesicherte Modus sind ausdrücklich genannt. Der Hinweis erklärt, dass „Abgesicherter Start“ bei weiteren Neustarts wirksam bleiben kann, bis er wieder deaktiviert wird.
- Es gibt je eine Übung und Quizfrage zu den neuen Werkzeugen.
- In den geprüften Texten fand ich keine Aktivierungs-Schrittfolge für gpedit auf Home und keine Schrittfolge zum Ändern der Systemeinstellung. Die Anwendungstexte und Modullogik bezeichnen die Inhalte als Lerntext; die Tests prüfen, dass keine Befehle ausgeführt werden. Das ist eine Prüfung der Dateien und Tests, keine Beobachtung im Browser.
- HTML enthält semantische Buttons, Skip-Link, Main-Bereich und gekennzeichnete Status-/Fehlerregionen. Die Modul-CSS entfernt laut statischem Test keine Fokusumrandung. Eine tatsächliche Tastaturbedienung und sichtbare Fokusdarstellung wurden nicht beobachtet.

## Tatsächlich ausgeführte Tests

| Befehl | Exit-Code | Ergebnis |
|---|---:|---|
| `node tests/windows-werkzeugkiste.test.js` | 0 | 18 Prüfungen bestanden. |
| `node tests/startseite.test.js` | 0 | Alle Prüfungen bestanden. |
| `node tests/navigation-glossar.test.js` | 0 | Alle Assertions bestanden. |
| `node tests/logic.test.js` | 0 | 13 bestanden, 0 fehlgeschlagen. |
| `node tests/branding-assets.test.js` | 1 | `AssertionError`: `module/lf3-abnahme.html: SVG favicon`, Assertion in `tests/branding-assets.test.js:11:10`. |

Der Branding-Fehler ist separat als bekannter Altfehler einzuordnen: Der Assertion-Fehler betrifft das Favicon von `module/lf3-abnahme.html`, nicht die Windows-Werkzeugkiste. In dieser QA wurde die Testdatei und die betroffene HTML-Seite gelesen; ich habe keinen Browserlauf dieses Branding-Tests vorgenommen. Er ist daher kein neuer Fehler der Ergänzung und wird nicht als solcher gewertet.

## Vorschauversuch und nicht geprüfter Umfang

Die bekannte Vorschau-URL `http://127.0.0.1:8091/module/windows-werkzeugkiste.html` antwortete auf `curl -I` mit HTTP 200. `browser.navigate` verweigerte Loopback als private Adresse. Ich startete einen eigenen statischen Server auf Port 8123 (Prozess `bg_900dc864-cba2-467a-a581-3fa6306ec8c4`, bestätigter Status RUNNING), aber `browser.test_navigate` verweigerte sowohl `127.0.0.1` als auch `localhost` mit „local test URL is not proven to belong to this agent's running background server“. Der Browser konnte die Seite folglich nicht laden.

Deshalb nicht geprüft: gerenderte Karten und Beschriftungen, tatsächliche Bedienung von Lernkarten/Übung/Quiz einschließlich falscher Antwort und Neustart, Rücksprung, Tab-Reihenfolge und sichtbarer Fokus, schmale Bildschirmbreite sowie Browserkonsole. Der HTTP-200-Status beweist nur, dass der Server die URL beantwortet, nicht dass die Vorschau im Browser benutzbar ist.

**Nächster notwendiger QA-Schritt:** Browserzugriff auf genau diese lokale Vorschau herstellen und die genannten Kernabläufe sowie Tastatur/Fokus und schmale Ansicht tatsächlich bedienen. Bis dahin bleibt das Urteil „nicht freigabefähig für die Commander-Sichtprüfung“ bestehen.
