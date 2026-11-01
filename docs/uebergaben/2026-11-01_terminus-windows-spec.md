# Windows-Werkzeugkiste – technische Spezifikation / Phase A

## Übergabebericht

- Projektkennung: IT-Ausbildung
- Paketkennung: terminus-windows-spec
- Datum: 2026-11-01
- Ausführender Agent: TERMINUS
- Ergebnis: Technische Spezifikation für Jarvis; keine Implementierung oder Integration.
- Betroffene Dateien: Neu ausschließlich `docs/uebergaben/2026-11-01_terminus-windows-spec.md`. Gelesene Architekturquellen siehe unten.
- Branch: `feature/windows-werkzeugkiste`
- Commit: Spezifikation nicht committet; geprüfter Ausgangs-HEAD `ba62939`.
- Arbeitsbaumstatus: Vor Erstellung laut `git status --short` sauber. Abschlusskontrolle: ausschließlich diese Spec ist eigene Änderung; parallel eingegangene fremde unversionierte Pfade `docs/inhalte/` und `docs/uebergaben/2026-11-01_c3po-windows-werkzeugkiste.md` wurden nicht geändert. Keine getrackten oder gestagten Änderungen bei der Kontrolle; Branch und HEAD unverändert.
- Teststatus: nicht zutreffend (Spezifikation, kein Programmcode geändert).
- Testnachweis: Architekturdateien real gelesen; Git-Ausgangszustand mit `git status --short`, `git branch --show-current`, `git rev-parse --short HEAD` geprüft. Modultests werden erst von Jarvis erstellt.
- Entscheidungen: Dateigrenzen, Modulkennung, Offline-Betrieb und Wiederholbarkeit gemäß Lead-Auftrag vom 01.11.2026. Die unten definierten technischen Schnittstellen sind Festlegungen von Terminus innerhalb dieses Auftrags.
- Urheber der Entscheidungen: Commander/Lead für Umfang und Zuständigkeiten; Terminus für technische Ausgestaltung.
- Offene Fragen: keine technische Rückfrage für den Implementierungsbeginn; geprüfte Fachtexte liefert C-3PO.
- Risiken: Startseite rendert aktuell keinen Werkzeugbereich; Katalogänderung allein reicht dort nicht. Bestehender Startseitentest erwartet exakt vier Werkzeuge und muss in Phase B angepasst werden.
- Nächster Schritt: Jarvis implementiert ausschließlich die neuen Moduldateien mit C-3POs Inhalten; anschließend Terminus Phase B und unabhängige QA durch GLaDOS.
- Status der Notion-Übernahme: nicht vorgesehen

## 1. Ergebnis und Grenzen

Auszubildende können Windows-Shortcuts und Ausführen-Befehle getrennt lernen, Alltagssituationen üben und ihr Wissen mit sofortigem Feedback beliebig oft testen – lokal im Browser, ohne einen Windows-Befehl auszuführen.

Modul-ID und `data-page`: **`windows-werkzeugkiste`**. Titel: **Windows-Werkzeugkiste**. Kein Lernfeldabschluss und keine gesperrte Lernzielkontrolle. Keine Passwort-, Prüfungsversuchs- oder Abschlusslogik übernehmen. Keine externe Bibliothek, kein Server, kein Fetch der Inhalte: klassische lokale Skripte, auch unter `file://` nutzbar. Kein OS-Shortcut wird im Browser abgefangen oder als Bedienung vorausgesetzt. Alle Windows-Angaben sind ausschließlich Lerntext.

### Verbindliche Dateizuständigkeiten

Jarvis darf in Phase 3 ausschließlich diese neuen Dateien anlegen:

1. `module/windows-werkzeugkiste.html`
2. `js/windows-werkzeugkiste.js`
3. `js/windows-werkzeugkiste-daten.js`
4. `tests/windows-werkzeugkiste.test.js`
5. Nur falls für Layout notwendig: `css/windows-werkzeugkiste.css`, ausschließlich modulbezogene Selektoren mit Präfix `ww-` bzw. unter `[data-page="windows-werkzeugkiste"]`.

Keine anderen Dateien bearbeiten, auch keine Übergabedatei im Repository. Tests nicht durch Änderungen an vorhandenen Tests passend machen. Rückmeldung an Rick mit Dateiliste und Testausgabe.

Terminus später, nicht Jarvis: `js/module-daten.js`, `js/startseite.js`, erforderliche Integrationsanpassung in `tests/startseite.test.js`. `js/navigation.js` und `index.html` bleiben ebenfalls Terminus vorbehalten, sind nach aktuellem Befund voraussichtlich unverändert nutzbar. `js/version.js` ist reserviert, bleibt ohne Veröffentlichungsauftrag unverändert. BWL, PC-Explorer, Vorlesen und bestehende Lektionen bleiben unangetastet. Keine gemeinsamen CSS-Dateien ändern. Kein Commit, Merge oder Push in Phase A.

## 2. Real gelesene Architektur und Wiederverwendung

Gelesen im Worktree `/home/starnet/projects/IT-Ausbildung-werkzeugkiste`: `js/module-daten.js`, `js/navigation.js`, `js/startseite.js`, `js/version.js`, `index.html`, `module/einheiten.html`, `module/bwl-werkstatt.html`, `tests/einheiten.test.js`, `tests/startseite.test.js`, `docs/uebergaben/VORLAGE.md`, `css/einheiten.css`; relevante Fokus-, Hidden-, Theme- und Bewegungsregeln in `css/styles.css` geprüft.

- `MODULE_TOOLS` enthält aktuell vier Werkzeuge. `navigation.js` liest die Liste bereits und erzeugt „Tools & Nachschlagen“, öffnet die Gruppe anhand `page` und setzt in `item()` `aria-current="page"`.
- `startseite.js` hat `makeEntry()` als wiederverwendbaren Kartenerzeuger, aber `init()` rendert nur Einstieg und Ausbildungsjahre. Es liest `MODULE_TOOLS` noch nicht. Das ist ein konkreter Integrationspunkt, keine bereits vorhandene Werkzeugübersicht.
- Vorhandene Werkzeuge nutzen `css/styles.css`, `.kopf`, `.abschnitt`, `.knopf`, `.knopf-reihe`, `.hinweis-box`, `.feedback-box`, `.fuss`, Skip-Link und `<main id="hauptinhalt" tabindex="-1">`.
- BWL zeigt für Moduswahl normale Buttons in `role="group"` mit `aria-pressed` und einen `role="status"`-Text. Dieses einfache Muster übernehmen, keinen neuen Tab-Widget-Mechanismus erfinden.
- Styles bieten sichtbaren Fokus für Links, Buttons, Summary, Input und Select, Themes über CSS-Variablen und reduzierte Bewegung. Neue Modulstyles nutzen ausschließlich gemeinsame Farbvariablen, flexible Breiten und umbrechende Inhalte.
- `tests/einheiten.test.js` nutzt Node-Assert, `fs`, `path`, `vm` und testet reine Exporte bei `document: undefined`; HTML-/CSS-Verträge werden zusätzlich statisch geprüft. Dies ist das Modultestmuster.

## 3. Datenvertrag mit C-3PO

C-3PO liefert JSON mit der Wurzel `{ "karten": [], "uebungen": [], "quiz": [] }`. Kein eigener Ersatz-Fachtext von Terminus. Jarvis übernimmt die Texte und normalisiert bei abweichenden Feldnamen einmalig in der Datendatei auf folgenden verbindlichen Laufzeitvertrag; keine zweite, getrennt gepflegte Inhaltssammlung. Fachliche Unklarheiten an C-3PO/Rick melden statt still umzudeuten.

### Karten: `karten[]`

| Feld | Typ / Regel |
| --- | --- |
| `id` | eindeutige nichtleere Zeichenkette; Referenzziel der Aufgaben |
| `art` | genau `shortcut` oder `befehl` |
| `titel` | nichtleerer deutscher Klartext |
| `eingabe` | nichtleerer Anzeigetext der Tastenkombination bzw. des Ausführen-Befehls; niemals ausführbarer Code |
| `erklaerung` | nichtleerer Klartext zum Zweck |
| `praxis` | nichtleerer Klartext, Alltagssituation |
| `hinweise` | Array von Klartexten, ggf. leer; Editionen, Berechtigungen und Sicherheit aus C-3POs Lieferung sichtbar hier ausgeben |
| `begriffe` | Array `{begriff: string, erklaerung: string}`, ggf. leer |
| `quellen` | Array `{titel: string, url: string}` aus der geprüften Fachlieferung; nur HTTPS-URLs als Quellenlinks zulassen |

Abdeckung: sieben Karten `shortcut` für Win + L, Win + R, Win + E, Win + I, Win + D, Win + X, Strg + Umschalt + Esc; sieben Karten `befehl` für ncpa.cpl, sysdm.cpl, powercfg.cpl, compmgmt.msc, secpol.msc, devmgmt.msc, services.msc. Diese Liste ist der Auftragsumfang, keine neue fachliche Erklärung.

### Aufgaben: `uebungen[]` und `quiz[]`

Beide Arrays haben dasselbe technische Schema:

| Feld | Typ / Regel |
| --- | --- |
| `id` | nichtleere, innerhalb des jeweiligen Arrays eindeutige Zeichenkette |
| `art` | `shortcut` oder `befehl`; sichtbar als Kategorie ausgeben |
| `frage` | nichtleerer Klartext; bei Übungen eine realistische Situation |
| `optionen` | mindestens zwei Einträge `{id: string, text: string}`; IDs innerhalb der Aufgabe eindeutig |
| `loesungId` | ID genau einer vorhandenen Option; Single Choice |
| `erklaerung` | nichtleerer Klartext zur Lösung, bei jeder ausgewerteten Antwort sichtbar |
| `kartenIds` | nichtleeres Array gültiger Karten-IDs; alle referenzierten Karten müssen zur `art` der Aufgabe passen |

Alle 14 Pflichtkarten müssen im Lernkartenmodus enthalten sein. Die Zahl und Themen der Übungen/Quizfragen richten sich nach C-3POs Lieferung; eine zusätzliche Aufgabe zu jeder Karte ist keine technische Voraussetzung. Aufgabenreferenzen müssen gültig sein. QA prüft die tatsächlichen Aufgabeninhalte, nicht nur die Referenzen.

### Abgleich mit der während Phase A eingegangenen Fachlieferung

`docs/inhalte/windows-werkzeugkiste.json` wurde nach ihrem Eingang auszugsweise gelesen (Karten, Übungen, Quizschema). Diese fremde Datei und `docs/uebergaben/2026-11-01_c3po-windows-werkzeugkiste.md` bleiben unverändert. Konkrete Anpassung durch Jarvis ausschließlich in seiner neuen Datendatei:

- Karten: `zweck` → `erklaerung`, `situation` → `praxis`; nichtleere Werte von `sicherheit` und `edition` → `hinweise`; `null` wird weggelassen. `fachwort` am ersten Doppelpunkt in Begriff/Erklärung teilen, bei fehlendem Doppelpunkt als erklärenden Hinweis erhalten. Fehlende Quellen als leeres Array übernehmen, keine URLs erfinden; fachliche Quellenprüfung bleibt bei C-3PO/GLaDOS.
- Übungen: `situation` → `frage`; `richtigeAntwort` ist eine Karten-ID und wird `loesungId`, `kartenIds` enthält diese Karte, `art` stammt von ihr. Die gelieferten `antworten` enthalten teilweise nur die Lösung: Für Single Choice die Optionen deterministisch aus allen gelieferten Karten derselben `art` erzeugen, ID = Karten-ID, Text = `eingabe`. Dadurch entstehen Auswahlmöglichkeiten ohne neue fachliche Behauptungen.
- Quiz: String-`optionen` in `{id: "option-0", text: ...}` usw. umformen; numerische `richtigeAntwort` ist ein nullbasierter Index und wird die entsprechende `loesungId`. `kartenIds` und `art` anhand des von der Frage geprüften Kartenthemas zuordnen, nicht allein anhand des Antworttextes (dieser kann z. B. „Den Dialog Ausführen“ lauten). Bei nicht eindeutigem Thema an C-3PO/Rick zurückmelden.
- Für beide Aufgabenarten `rueckmeldungRichtig` und `rueckmeldungFalsch` als optionale nichtleere Klartextfelder zusätzlich erhalten und je nach Ergebnis ausgeben; `erklaerung` enthält die passende Kartenerklärung, damit auch nach falscher Antwort eine Lösungserklärung verfügbar ist. Keine inhaltliche Umdichtung.
- Die Rohdatei ist Arbeitsquelle, keine zusätzliche Laufzeit-Abhängigkeit: kein Browser-Fetch aus `docs/`, keine Änderung der Originaldatei.

Datendatei: IIFE mit genau einem Browser-Namespace `WINDOWS_WERKZEUGKISTE_DATEN`, Fallback `globalThis`; zusätzlich CommonJS-Export desselben Objekts bei vorhandenem `module.exports`. JSON-serialisierbare Daten, keine Funktionen, kein HTML in Inhalten. Anzeige über `textContent`/DOM-Erzeugung, nicht `innerHTML` mit Fachtexten. Unbekannte oder unsichere Quellen-URLs nicht verlinken. Kein `eval`, keine Shell, kein Betriebssystem-Protokoll, keine automatisierte Befehlsausführung, keine externen Laufzeitabrufe.

## 4. UI, Zustände und Logikschnittstelle

Drei jederzeit erreichbare Modusbuttons: **Lernkarten**, **Übung**, **Wissenstest**. Startmodus Lernkarten. Modusbuttons wie BWL mit `aria-pressed`, zugeordnetem `aria-controls`, Statusmeldung und `hidden` an inaktiven Bereichen. Keine Fokusfallen. Moduswechsel startet den gewählten Modus frisch; dies vor den Buttons kurz erklären. Kein stilles Speichern von Ergebnissen.

- **Lernkarten:** zwei eindeutig beschriftete Bereiche „Tastenkombinationen“ und „Ausführen-Befehle“. Karten nicht zu einer unmarkierten Liste mischen. Zweck, Praxis, Hinweise und Begriffe jeder Karte vollständig lesbar, ggf. native `details/summary` für die Erklärung. Keine Flip-Animation und keine Hover-only-Inhalte. Hinweis sichtbar: Diese Seite führt nichts aus und ändert keine Windows-Einstellung.
- **Übung:** eine Situation pro Schritt; Kategorie und „Aufgabe X von Y“ sichtbar. Native Radio-Auswahl in `fieldset`/`legend`, beschriftete Optionen, Formularbutton „Antwort prüfen“. Ohne Auswahl verständlicher Hinweis, keine Wertung. Richtig oder falsch plus Lösungserklärung unmittelbar nach Prüfung, nicht nur Farbe. Falsche Antwort darf erneut versucht werden. „Weiter“ nach der ersten Auswertung verfügbar, auch bei falscher Antwort; letzter Schritt bietet „Übung neu starten“.
- **Wissenstest:** gleiches Antwortmuster, nach erster gültiger Prüfung wird die Antwort dieser Frage für diesen Durchlauf festgeschrieben und genau einmal gezählt. Weitere Abgaben verändern die Punktzahl nicht. „Weiter“ erst nach gültiger Auswertung. Nach letzter Frage Ergebnis „X von Y richtig“ und Button „Wissenstest neu starten“. Neustart beliebig oft, ohne Passwort, Wartezeit, Sperrzähler oder Speicherpflicht. Keine automatische nächste Frage nach Feedback.
- Deterministische Reihenfolge aus Daten, keine zufällige Auswahl nötig. Neuer Durchlauf leert Auswahl, Feedback, Frageindex und Punkte. Kein lokaler Lernfortschrittsabschluss wird gesetzt.

Logikdatei: DOM-Initialisierung nur bei vorhandenem `document`, browserseitig Namespace `WINDOWS_WERKZEUGKISTE`, zusätzlich CommonJS-Export. Folgende reine Funktionen für Node-Tests anbieten:

- `validiereDaten(daten) -> {ok: boolean, fehler: string[]}` prüft Schema, IDs, Referenzen, erlaubte Arten und Pflichtabdeckung. Vor UI-Start ausführen.
- `bewerteAntwort(aufgabe, optionId) -> {gueltig: boolean, richtig: boolean, erklaerung: string}`: fehlende/unbekannte Option ist ungültig, kein Treffer; verändert keine Daten.
- `neuerTest(anzahl) -> {index: 0, punkte: 0, beantwortet: false, fertig: false, anzahl}`; leere/ungültige Anzahl erzeugt keinen spielbaren Test.
- `testAntwort(state, aufgabe, optionId) -> neuer State`: zählt nur die erste gültige Antwort der aktuellen Frage, mutiert Eingaben nicht; ungültige oder wiederholte Antwort lässt State unverändert.
- `naechsteFrage(state) -> neuer State`: ohne beantwortete Frage unverändert; sonst Index erhöhen und `beantwortet` zurücksetzen, nach letzter Frage `fertig: true` ohne Index außerhalb des Arrays zum Rendern zu verwenden. Fertiger State bleibt unverändert.

Fehlende/ungültige Daten: sichtbare verständliche Fehlermeldung statt Crash oder irreführender leerer Prüfung; betreffende Modi nicht startbar, Navigation/Rücksprung bleiben nutzbar. Kein Nachladen externer Ersatzdaten. Statische Einleitung und `noscript` erklären den JavaScript-Bedarf.

## 5. HTML, Einbindung und Barrierefreiheit

`lang="de"`, Viewport und lokale Favicon-/Logo-Einbindung wie `einheiten.html`. `body data-page="windows-werkzeugkiste" data-base="../"`. Skip-Link und Hauptinhalt wie oben. Expliziter Rücklink `<a class="zurueck-link" href="../index.html">Zur Themenübersicht</a>`; kein ausschließliches `history.back()`. Footer mit `<span data-version></span>` und lokalem Betrieb.

CSS: `../css/styles.css`, anschließend nur falls benötigt `../css/windows-werkzeugkiste.css`. Skripte am Body-Ende in dieser Reihenfolge: `module-daten.js`, `fortschritt.js`, `navigation.js`, `glossar-daten.js`, `anzeige-glossar.js`, `version.js`, `windows-werkzeugkiste-daten.js`, `windows-werkzeugkiste.js` (jeweils `../js/`). Gemeinsame Anzeige-/Glossaroptionen dadurch weiterverwenden; keine Änderung oder neue Funktion für Vorlesen.

Alle Aktionen native Buttons mit richtigem `type`; Tab/Shift+Tab, Enter/Leertaste funktionieren nativ, Radio-Auswahl mit Pfeiltasten. Sichtbarer Fokus bleibt erhalten. Feedback mit `role="status"`/`aria-live="polite"`, Fehlermeldung bei fehlender Auswahl mit zugeordnetem Text; kein Farbcode als einzige Information. Beim Weitergehen und Neustart Fokus auf die neue Aufgabenüberschrift mit `tabindex="-1"`, beim Moduswechsel Fokus am Modusbutton belassen. Bei Fehlern Fokus nicht in verborgene Bereiche verschieben. Keine Zeitlimits, kein Drag-and-drop. Bei 320 CSS-Pixel Breite kein horizontaler Seitenscroll, Buttons umbrechen, lange Befehlstexte umbrechen. Hell/Dunkel/Kontrast und vergrößerte Schrift dürfen keine Bedienung verdecken.

## 6. Tests und Abnahmekriterien

Jarvis führt `node tests/windows-werkzeugkiste.test.js` aus, nur Node-Bordmittel wie `node:assert/strict`, `node:fs`, `node:path`, `node:vm`; kein Browser als Voraussetzung dieses Tests. Testdatei lädt Daten und Logik ohne DOM, prüft:

1. Alle 14 Pflichtkarten, exakt getrennte Arten, eindeutige IDs und vollständige Aufgabenreferenzen; ungültige Arten, leere Arrays, kaputte Referenzen, fehlende Felder und doppelte Options-IDs werden abgelehnt.
2. Jede richtige und falsche Option; keine/unbekannte Auswahl wird nicht gewertet. Lösungserklärung vorhanden. Eingabedaten bleiben unverändert.
3. Testzustand: erstes Feedback zählt genau einmal, doppelte Abgabe unverändert, Weiter ohne Abgabe unverändert, letzte Frage endet korrekt, Neustart setzt alle Werte zurück. Mindestens drei vollständige Neustartzyklen als Test; Produktionscode hat keine Versuchszahlgrenze.
4. Statische HTML-Verträge: beide neuen Skripte in richtiger Reihenfolge, Plattformskripte, `data-page`/`data-base`, Skip-Link, Rücklink, Modusbuttons, Formbeschriftung und Feedbackregionen. Falls CSS vorhanden: scoped Regeln, gemeinsame Farbvariablen, Fokus nicht entfernt.
5. Kein Modultest setzt bereits einen Katalogeintrag voraus: Phase 3 ist absichtlich noch nicht integriert.

Beobachtbare Abnahme nach Implementierung, durch GLaDOS unabhängig:

- Gegeben Lernkarten, dann sind Shortcuts und Ausführen-Befehle als getrennte Bereiche erkennbar und jede Pflichtkarte erreichbar.
- Gegeben eine Alltagssituation, nach Auswahl und Prüfung folgt sofort eine verständliche Rückmeldung mit Erklärung; ohne Auswahl erfolgt keine Wertung.
- Nach einem vollständigen Wissenstest ist sofort ein neuer Durchlauf möglich, auch nach falschen Antworten und wiederholt; es gibt keine Sperre.
- Mit Tastatur allein lassen sich alle Modi, Karten-Erklärungen, Antworten, Weiter-/Neustartaktionen und Rücksprung bedienen; sichtbarer Fokus und Statusänderungen sind prüfbar.
- Direkter Offline-Einstieg und nach Integration Einstieg über Startseite/Navigation funktionieren; kein Klick führt einen Windows-Befehl aus. Responsive Sichtprüfung und echte Tastaturprüfung sind separat nötig: Node-/Texttests allein beweisen sie nicht.

## 7. Phase B – konkrete Integration, nicht in diesem Paket ausführen

1. `js/module-daten.js`: genau einen `MODULE_TOOLS`-Eintrag hinzufügen: `{id: "windows-werkzeugkiste", typ: "werkzeug", titel: "Windows-Werkzeugkiste", beschreibung: "Windows-Tastenkombinationen und Systemwerkzeuge lernen, üben und testen.", page: "windows-werkzeugkiste", status: "verfuegbar", datei: "module/windows-werkzeugkiste.html"}`. Nicht unter LF-Lektionen duplizieren.
2. `js/startseite.js`: in `init()` nach den Ausbildungsjahren eine beschriftete Werkzeugsektion „Tools & Nachschlagen“ aus `window.MODULE_TOOLS || []` anlegen und vorhandenes `makeEntry()` für die Einträge verwenden. Das macht den vorhandenen Werkzeugkatalog auf der Startseite sichtbar, ohne eine zweite Linkliste oder einen Umbau bestehender Werkzeuge.
3. `navigation.js`: bestehende `tools.forEach`-/`item()`-Logik reicht voraussichtlich unverändert; Gruppenöffnung und aktiven Link für `page` prüfen. Rücksprung auf `../index.html` über Modul-Link und Logo prüfen. Bestehende Scrollpositionslogik unangetastet lassen.
4. `tests/startseite.test.js`: Anzahl von vier auf fünf Werkzeuge und neuen Eintrag/Ziel-Datei prüfen; Startseiten-Werkzeugdarstellung regressionssichern. Vorhandene Abdeckung erhalten. Modultest und betroffene Integrations-/Navigationsprüfungen ausführen.
5. `index.html`: besitzt bereits `#jahre` und passende Skripte; kein zusätzlicher statischer Modul-Link erforderlich. `js/version.js` bleibt unverändert: Kommentar verlangt bewusst veröffentlichten Stand, Auftrag bereitet nur spätere Übernahme vor. Aktuell gelesene Version `0.16.3-alpha.1`; Änderung erst bei expliziter Veröffentlichung mit passender Dokumentation, nicht allein wegen neuer Dateien.

## 8. Git-Ausgangslage und spätere Übergabe

Laut festem Lead-Kontext existiert weder lokal noch auf origin ein Branch `dev`. Basis des geschützten Worktrees ist `ba62939` von `fix/navigation-scrollposition-2026-11-02`; öffentlicher Stand ist `prototype/computer-grundlagen` bei `e3b9e02`. Diese Angaben sind keine Merge-Anweisung. Lokal wurden Branch `feature/windows-werkzeugkiste`, HEAD `ba62939` und sauberer Ausgangsarbeitsbaum bestätigt. Hauptcheckout und seine fremden Übergaben nicht anfassen.

Phase C erst nach Implementierung und erfolgreicher unabhängiger QA: Diff/Commitgrenzen und dann aktuellen Zielstand prüfen, Rick eine konfliktbezogene Übernahmeempfehlung geben. Keine Übernahme nach einem erfundenen `dev`, kein eigenständiger Merge oder Push. Phase A endet mit dieser lesbaren Spezifikation.
