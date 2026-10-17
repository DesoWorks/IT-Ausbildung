# Übernahme IT-Ausbildung durch Terminus

Stand: 17.10.2026. Ausführender Lead: TERMINUS, mit Befugnis zur Teilkoordination gemäß Ricks Übergabe. Kein Push, keine Veröffentlichung.

## Geprüfte Ausgangslage

- Tatsächliche Projektwurzel: `/home/starnet/projects/IT-Ausbildung`.
- Branch: `lehrjahr-2/serviceanfragen`. Bei Übernahme sauber; HEAD `d23145e`, zwei Commits vor dem vorhandenen Remote-Tracking-Branch. Kein Fetch/Remote-Abgleich in diesem Lauf.
- Vorhandene Sicherungen: `1385888` enthält die 54 Dateien der LF8/LF9-Vorbereitung einschließlich Katalog, Fortschritt und Sichtprüfnotizen; `d23145e` korrigiert die Standnotiz.
- Ricks Übergabedokument lag nicht im Projekt. Es war unter `/home/starnet/.local/share/StarNet/workspaces/agent/projects/IT-Ausbildung/docs/uebergabe-an-terminus-2026-10-17.md` lesbar. Eine inhaltlich unveränderte Kopie liegt jetzt in `docs/uebergabe-an-terminus-2026-10-17.md`; lediglich ein abschließendes Leerzeichen wurde für `git diff --check` entfernt. Das Original bleibt unverändert. Die dortigen Angaben sind der historische Übergabestand, keine neue unabhängige Prüfung.
- Gelesen: README, aktueller Verweis im Fortsetzungsplan, Standnotiz, Pläne LF6–LF9, LF8/LF9-Prüfnotiz, Katalog, Ablaufskripte und vorhandene Tests. Ältere Fortsetzungsplaneinträge und LF7-Einschubhinweise sind teilweise durch die neueren Commits überholt; sie sind kein Auftrag, bereits erledigte Integrationen zu wiederholen.
- Jahr 1 wartet auf Dennis' Abnahme. Keine neuen Abnahmefehler vorliegend; keine Änderung an seinen Lektionen. Jahr 3 bleibt unberührt.
- LF6/LF7 sind verfügbar. LF8/LF9 bleiben `kommt-bald`. Dass ihre Unterthemen intern `verfuegbar` heißen, hebt die Feldsperre nicht auf.

## Abgearbeitetes offenes Paket

Die bestehende Prüfnotiz nannte 14 noch nicht angeklickte Lektionen. Dafür wurde `tests/lf8-lf9-browser.test.js` ergänzt. Er prüft alle 16 Lektionen und beide Lernzielkontrollen mit eigenem temporären Chromium-Profil und eigenem Loopback-Server, ohne zusätzliche Pakete. Browser und Server werden danach beendet.

Prüfumfang:

- Lektionen: leere, teilweise, falsche und richtige Antworten; Abschluss allein genügt nicht; Fortschrittsableitung; Antwortänderung verwirft altes Feedback und Abschluss; Zurücksetzen; echtes Neuladen; Browser-Zurück mitten im Ablauf.
- Zurück wechselt gemäß dem vorhandenen LF6-Muster nur die Ansicht und schreibt keinen neuen Lernstand. Nach Neuladen wird der letzte ausdrücklich gespeicherte Schritt wiederhergestellt. Ein zunächst anders formulierter neuer Test wurde nach Lesen der Implementierung und `tests/lf6-gespraech-zurueck.test.js` an dieses belegte Verhalten angepasst; kein Produktcode wurde dafür geändert.
- Kontrollen: 24 Fragen; leere/teilweise Abgabe bleibt offen; Antworten überleben Reload; bestanden/nicht bestanden; nach Abgabe 72 Antwortfelder gesperrt, auch nach Reload; leeres/falsches Reset-Passwort lässt den gespeicherten Versuch unverändert.
- Schreibfehler des Browserspeichers werden bei je einer Lektion und der Kontrolle pro Feld sichtbar gemeldet.
- Alle 18 Seiten auf horizontale Überbreite bei 320 und 390 CSS-Pixeln geprüft; Antwortanordnung der Lektionen untereinander geprüft.
- Katalog: LF8/LF9 ohne Lektionslinks, je neun geplante Einträge; LF6 weiter erreichbar. Keine unbehandelten Browserausnahmen oder Ressourcenfehler im Durchlauf.
- Vier mobile Screenshotdateien unter `.output/lf8-lf9/` erzeugt (absichtlich nicht versioniert). Die sichtbaren Übungsausschnitte für LF8/LF9 wurden gelesen: lesbarer Umbruch, untereinander stehende Optionen, keine erkennbare Überlagerung. Keine vollständige visuelle Abnahme aller Ansichten.

Eine zusätzliche Regressionprüfung fand eine veraltete Quelltext-Assertion in `tests/overview-disclosures.test.js`: Sie erwartete noch `completionCount(lessons)` ohne Feldstatus. Die Änderung aus `1385888` übergibt bewusst `field`, damit gesperrte Lernfelder nicht freigegeben erscheinen. Der Test wurde korrigiert und prüft nun zusätzlich das reale Verhalten dieser Hilfsfunktionen für verfügbare und gesperrte Felder. Keine Produktionsdatei geändert.

## Tatsächlich ausgeführte Prüfungen

Alle zuletzt genannten Befehle endeten mit Exitcode 0:

```sh
node --check tests/lf8-lf9-browser.test.js
node tests/lf8-lf9-browser.test.js
node tests/lf8-inhalte.test.js
node tests/lf9-inhalte.test.js
node tests/fortschritt.test.js
node tests/startseite.test.js
node tests/navigation-glossar.test.js
node tests/overview-disclosures.test.js
```

Der erste Browser-Testlauf scheiterte an der oben beschriebenen falschen neuen Erwartung zu Zurück+Reload; der anschließende vollständige Lauf bestand. Der erste Regressionlauf scheiterte am veralteten Signaturvergleich; nach der belegten Testkorrektur bestand die komplette genannte Regressionsequenz. Keine vollständige Gesamtsuite behauptet.

## Crew, Dateiverantwortung und Grenzen

- Rick hat parallele Änderungen ausdrücklich beendet. Der Checkout war bei Beginn sauber; keine lokalen Projekt-/Agentenprozesse waren in der Prozessprüfung sichtbar. Terminus hat als einziger Ausführender dieses Pakets Dateien geändert und übernimmt den lokalen Commit.
- Die Werkzeugsuche lieferte in diesem Lauf keine internen `team.dispatch`-/Session-Werkzeuge. Deshalb wurden Jarvis, GLaDOS und C3PO nicht beauftragt; Prüfung und Dokumentation wurden direkt erledigt. Keine unabhängige GLaDOS-Abnahme und keine C3PO-Autorschaft behauptet.
- Technischer Browserdurchlauf mit DOM-Klicks, kein menschlicher Bedienungstest. Lösungsschlüssel werden aus den Inhalten gelesen: keine fachliche Richtigkeitsabnahme.
- Nicht geprüft: gültiges Reset-Passwort, Screenreader, echter 200-%-Browserzoom, vollständige Tastaturbedienung, Windows-`file://`-Start und alle Darstellungsmodi. Keine Passwortwerte neu in den Test aufgenommen.
- LF8/LF9-Pläne nennen bisher nur eine sekundäre Lernfeldübersicht. Ein direkter KMK-Abgleich und fachliche Abnahme sind durch diesen Lauf nicht erledigt.

## Nächster Schritt / notwendige Entscheidung

LF8/LF9 bleiben bis zu Dennis' ausdrücklicher Freigabe auf „In Kürze“. Keine neuen Lektionen oder Jahr-3-Aufgaben beginnen. Sobald ein autorisierter interner Delegationsweg verfügbar ist, kann GLaDOS die unabhängige Prüfung übernehmen und C3PO diese Notiz konsolidieren; technische Reparaturpakete für Jarvis nur bei konkret belegten Fehlern. Die fehlende Katalogfreigabe ist keine Erlaubnis, sie selbst zu setzen.
