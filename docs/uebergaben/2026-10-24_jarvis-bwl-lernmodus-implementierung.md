# BWL-Werkstatt: Lernmodus und verbesserter freier Rechner (Implementierung)

**Projekt:** `/home/starnet/projects/IT-Ausbildung` · **Branch:** `prototype/computer-grundlagen` · **Stand:** 24.10.2026 · **Agent:** JARVIS
**Git:** keine Commits, kein Push, kein Deployment. Alle Änderungen liegen uncommittet im Arbeitsbaum.

## Fachlicher Status
Die drei Lernaufgaben sind **Entwürfe von C-3PO und fachlich NICHT freigegeben**. Das steht auch sichtbar im Lernmodus. Eine Fachfreigabe wird nicht behauptet.

## Geänderte und neue Dateien
- `module/bwl-werkstatt.html` (unversioniert, geändert): Moduswahl, Artikelfelder, Lernmodus-Bereich.
- `js/bwl-werkstatt.js` (unversioniert, geändert): `angebot()` liefert zusätzlich `zeilen`. Neu: Lernaufgaben, `lernLoesung()`, `lernPruefe()`, Lern-Oberfläche, Moduswahl.
- `css/bwl-werkstatt.css` (unversioniert, geändert): Tabellen, Lernmodus, Fokuszustände. Keine Animationen.
- `tests/bwl-lernmodus.test.js` (neu).
- Nicht angefasst: `js/lf2-angebot.js`, `js/module-daten.js`, `tests/startseite.test.js`, alle vorhandenen Tests, StarNetOS, GalaxynetOS, TARS.

## Jetzt nutzbar
- Umschaltung **Freier Rechner / Lernmodus** (Knöpfe mit `aria-pressed`, Statusmeldung).
- Freier Rechner: freiwilliger Artikelname je Angebotsposition, zwei Ergebnistabellen (Positionen, Summen) mit Beschriftung und Spaltenköpfen, Rechenweg bleibt. Alle bisherigen Berechnungen unverändert.
- Lernmodus: drei Aufgaben mit je drei Schritten. Die beiden Angebotsaufgaben sind auf die drei Phasen gebündelt: Positionen, Handlungskosten und Selbstkosten, Gewinn und Nettoangebotspreis. Die Rabattaufgabe nutzt Warenwert, Rabatt und Betrag nach Rabatt.
- Fehlermeldung direkt am Feld (`aria-invalid`), Formatfehler getrennt von Wertfehlern, falsche Antworten verraten die Lösung nicht.
- Tipp, Lösungsweg (erst nach einem Versuch), Neustart pro Aufgabe, Fokus springt zum nächsten sinnvollen Ziel.
- Rechenkern: Sollwerte kommen nur aus `angebot()` und `rabatt()`. Es gibt keine zweite Formel.

## Tests (automatisch, tatsächlich ausgeführt)
- `node --test tests/bwl-werkstatt.test.js tests/lf2-angebot.test.js tests/lf2-angebote.test.js`: 3 Tests, 3 bestanden, 0 fehlgeschlagen.
- `node --test tests/bwl-lernmodus.test.js tests/startseite.test.js`: 2 Tests, 2 bestanden, 0 fehlgeschlagen.
- `node --check js/bwl-werkstatt.js`: ohne Fehler.
- Hinweis: Der erste Lauf des neuen Tests scheiterte an einem Testfehler (`deepEqual` über `vm`-Grenzen). Er wurde im Test behoben. Der Rechenkern war nicht betroffen.

## Browserprüfung (automatisiert über Headless-Chrome, kein Mensch)
Skript lag in `/tmp`, nicht im Projekt. Geprüft wurden: keine JS-Fehler, Moduswechsel, leere Eingabe, falscher Wert, Formatfehler (Punkt statt Komma), Tipp, alle drei Schritte von Aufgabe 1, Wechsel zu Aufgabe 2 und 3, Stand bleibt beim Zurückwechseln erhalten, Ergebnistabellen im freien Rechner mit dem Übungsbeispiel (3.201,98 €).

## Nicht geprüft / offen
- **Manuelle Tastaturprüfung** (Tab-Reihenfolge, Pfeiltasten in den Tabs, sichtbarer Fokus mit dem Auge) fehlt.
- **Screenreader-Prüfung** (NVDA/Orca) fehlt. Ob Statusmeldungen und Fokussprünge gut vorgelesen werden, ist unbestätigt.
- Sichtprüfung der Optik und schmale Ansicht (unter 640 px) nicht durch Menschen geprüft.
- Aufgabe 2 wurde nur bis zum Start geprüft, Aufgabe 3 nur bis Schritt 1. Alle Lösungswerte sind aber automatisch gegen den Kern getestet.
- Fachliche Freigabe der Aufgaben und Texte steht aus.
- Die Texte sind kurz gehalten, aber nicht von einer LRS-Fachperson geprüft.
- Grenze bleibt: sechs Angebotspositionen (MVP).

## Für GLaDOS unabhängig prüfen
1. Alle Tests oben erneut ausführen.
2. Tastaturbedienung komplett ohne Maus: Moduswahl, Tabs, Aufgabenwahl, Eingabefelder, Tipp, Lösungsweg, Neustart. Dazu sichtbarer Fokus und Fokusziel nach jeder Aktion.
3. Screenreader: Statusmeldung, Fehlertext am Feld, Tabellenvorlesen.
4. Freier Rechner: alle vier Rechnungsarten gegen die Referenzwerte (3.201,98 € beim Übungsbeispiel). Leere Zeilen, Name ohne Zahlen, halbe Cent.
5. Lernmodus: Aufgaben 2 und 3 ganz durchspielen, falsche und leere Eingaben, Wechsel zwischen Aufgaben, Neustart.
6. Schmale Ansicht und Vergrößerung der Schrift.
7. Bestätigen, dass `js/lf2-angebot.js` unverändert ist.
