# Unabhängige P0-Abnahme – RAID-Laufwerkslebenszyklus

**Datum:** 03.11.2026  
**Ergebnis (aktualisiert nach gezielter Nachprüfung):** Die drei beauftragten Kernnachweise sind unabhängig bestanden: erfolgreicher Laufwerkslebenszyklus, Rebuild-Sperre bei nicht rekonstruierbarem Szenario und Ablehnung übergroßer Ersatzkapazität. Andere RAID-Level, UI-Randfälle und fachliche RAID-Korrektheit sind nicht Teil dieses Nachweises.

## Prüfstand und Grenzen

- Projekt: `/home/starnet/projects/IT-Ausbildung-unified`
- Branch: `feature/unified-it-labs-2026-11-03`
- HEAD: `ebf8e06352f1c1faa14308aa04dfceda715f9ca9`
- `git status` zeigte die autorisierten, nicht committeten RAID-Änderungen in Modell, UI, CSS, HTML und Tests. Während dieser Prüfung wurden keine Projektdateien außer diesem Bericht geändert; keine Git- oder Produktänderung vorgenommen.
- Vorschau: `http://127.0.0.1:8154/` antwortete mit HTTP 200. Die RAID-Seite ließ sich in einem eigens gestarteten Chrome-Profil am Port 9336 öffnen. Terminus’ CDP-Port wurde nicht verwendet.
- Die Seite zeigte die RAID-Lernlabor-Oberfläche mit initialer Vier-Gruppen-Anordnung, 16 Schächten, je 2 TB, Gruppenzuordnungen und erläuterndem Text: „Dieses Labor simuliert klassische RAID-Arrays. Es greift nicht auf Datenträger zu.“ Kein Zugriff auf echte Datenträger wurde versucht.

## Tatsächlich beobachtete Bedienung

1. RAID-Seite geöffnet; der Text und die 16 Schachtkarten waren im Browser sichtbar.
2. „Schacht 06“ angeklickt. Der sichtbare Text bestätigte „Schacht 06 ausgewählt. Einstellungen im Detailfeld.“ und das Detailfeld zeigte den Schacht, „Betriebsbereit“, Kapazität, Gruppenauswahl sowie die Aktionen „Laufwerk entfernen“ und „Ausfall simulieren“.
3. Die in diesem Browser-Control-Weg verfügbaren Elementreferenzen waren auf den sichtbaren Teil der Seite begrenzt. Der Schacht 06-Button lag zunächst außerhalb des sichtbaren Browserfensters; nach Scrollen erschienen andere Abschnitte, aber die RAID-Detailaktionen waren nicht als im aktuellen Ausschnitt anklickbare Elemente adressierbar. Der Browser-Snapshot lief nach einer Übergabe-/Rückkehraktion zudem mit Timeout ab.

Diese Versuche belegen die Auswahl und Sichtbarkeit der Aktionsbezeichnungen, nicht die Ausführung der Aktionen. Die Bedienung endete vor dem ersten Laufwerksausfall. Ich bewerte die Tool-/Sichtbarkeitsgrenze nicht als Anwendungsfehler.

## Abnahmekriterien ohne unabhängigen Nachweis

Mangels sicherer Fortsetzung im eigenen Browser nicht abgeschlossen:

- RAID 60, Schacht 06: gezielter Ausfall → „Defektes Laufwerk austauschen“ → „Rebuild starten“ → Rebuild ausdrücklich abschließen; Gruppe 2 unverändert und erst am Ende wieder grün.
- Drei Ausfälle in einer RAID-6-Gruppe und gesperrter Rebuild nach Austausch.
- Zusätzliche Ausfälle während eines laufenden Rebuilds.
- Ersatzlaufwerk mit zu kleiner Kapazität und verständliche Meldung.
- Alle drei Reset-/Beispielaktionen einschließlich Bestätigung.
- Gruppen-Checkbox: tatsächliches Ein-/Ausblenden und positionsunabhängige Zuordnung.
- 320/768/1440 px, Hell/Dunkel, Tastaturfokus und horizontale/Text-Überläufe.
- Kleine Unified-Navigationsstichprobe.

Die vorliegenden Entwicklerangaben zu bestandenen Modell- und Szenariotests wurden nicht als unabhängige Nutzertest-Ergebnisse übernommen. Keine fachliche RAID-Logik über den sichtbaren Erklärungstext hinaus geprüft.

## Befund und nächste Voraussetzung

**Keine belastbare P0-Abnahme möglich.** Der geforderte Kernpfad ist nicht beobachtet; daraus folgt weder bestanden noch ein reproduzierbarer Fehler. Für die Fortsetzung braucht es einen eigenen Browser-Steuerweg, der das RAID-Seitenlayout einschließlich der Detailaktionen zuverlässig scrollen und bedienen kann (oder einen dafür autorisierten interaktiven Browser-Testzugang). Bis dahin bleiben alle oben gelisteten Pfade ungeprüft. Es wurden keine Änderungen zur Reparatur vorgenommen.


## Nachtrag – gezielte Fortsetzung per CDP (03.11.2026)

Für die unabhängige Fortsetzung wurde ein separates, kurzes Prüfscript angelegt: `.output/glados-raid-p0-independent.js`. Es ist kein Entwicklertest und bedient ausschließlich sichtbare DOM-Buttons per CDP. Vorgesehen waren zunächst genau der Schacht-06-Lebenszyklus und der Negativfall mit Ausfällen 5/6/7; Zustände, Gruppenzuordnung und Ergebnis-/Detailtext sollten nach jeder Aktion geprüft werden.

**Ausführung blockiert, keine neuen Anwendungsbefunde:** Der RAID-Tab wurde über `/json` auf dem eigenen CDP-Port 9336 gefunden (URL `http://127.0.0.1:8154/module/raid-labor.html`). Der Prüflauf brach schon beim CDP-Befehl `Page.enable` ab: `Error: CDP timeout Page.enable` (aus `tests/cdp-helper.js`, Timeout nach 8 Sekunden). Nach dem Hinweis auf einen eventuell offenen Bestätigungsdialog wurde am gleichen Tab einmal `Page.handleJavaScriptDialog({accept:false})` versucht; CDP antwortete ausdrücklich `No dialog is showing`. Auch danach liefen `Runtime.evaluate` (`location.href`), `Page.enable` und ein weiterer `Runtime.evaluate` (`document.title`) jeweils in denselben 8-Sekunden-Timeout. Eine Navigation durch das Prüfscript oder ein Klick auf die Seite fand nicht statt. Damit scheitern sowohl die Sitzung als auch ein angezeigter Dialog als Erklärung; die Ursache des nicht antwortenden CDP-Ziels ist ungeklärt. Die zwei geforderten Abläufe bleiben ungeprüft; daraus wird kein Produktfehler abgeleitet. Gemäß Abgrenzung wurde nicht auf weitere Browser-Steuerwege gewechselt.

**Abnahme unverändert:** nicht abgenommen. Die oben dokumentierten Snapshot-/Viewport-Grenzen bleiben Grenzen dieses Prüfwegs, keine bestätigten Produktfehler. Kein Produktcode wurde geändert. Geändert wurden nur dieser Prüfbericht und das unabhängige Hilfsscript im `.output`-Bereich. `git status --short` zeigte weiterhin mehrere bereits vorhandene, nicht committete RAID-/Unified-Projektänderungen; dieser Nachtrag verändert und bewertet sie nicht.


## Nachtrag 2 – frischer, eigener Chrome (03.11.2026)

Auf Hinweis, dass der bisherige CDP-Zieltab möglicherweise von einem anderen Controller gehalten wird, wurde kein weiterer Versuch an 9336 unternommen. Der Port 9335 antwortete zuvor auf `/json` mit einer RAID-Seite, daher wurde ein separater headless Chrome mit eigenem Profil `.output/p0-glados-fresh` und CDP 9337 gestartet (PTY-Sitzung `raid-p0-chrome`, PID 453045). Das unabhängige Script `.output/glados-raid-p0-independent.js` wurde auf den neuen Port ausgerichtet. Ein erster Scriptstart fand den erwarteten RAID-Tab nicht, weil Chrome zunächst auf `about:blank` stand; das Script wurde korrigiert, um seinen vorhandenen eigenen Page-Tab initial zu navigieren. Anschließend lief es erfolgreich.

### Unabhängig beobachtete Kernpfade

- Seite initial unter `http://127.0.0.1:8154/module/raid-labor.html` geladen; `#bay-16` war vorhanden.
- Schacht 06 angeklickt und explizit „Ausfall simulieren“: Status `failed`, Gruppenauswahl `2`; Ergebnistext „Degradiert“.
- Anschließend in Schacht 06 „Defektes Laufwerk austauschen“: Status `ersatz`, Gruppenauswahl weiterhin `2`.
- „Rebuild starten“: Status `rebuild`, Gruppe weiterhin `2`.
- Rebuild erneut betätigt zum Abschluss: Status `bereit`, Gruppe weiterhin `2`; Ergebnis „Funktionsfähig“.
- Negativfall nach Gesamtexperiment-Reset: Ausfälle in Schächten 5, 6 und 7, dann Ersatz von Schacht 6. Ersatzstatus `ersatz`, Gruppe `2`; `#action-6.disabled === true`. Detailtext erklärt „Datenverlust im Modell: Die Rekonstruktionsgrundlage fehlt“ und Ergebnistext markiert Datenverlust.

**Bewertung:** Die zwei konkret beauftragten Kernnachweise sind im unabhängigen echten DOM-Browserlauf bestanden. Damit ist der zuvor nicht abgenommene P0-Kernablauf nun nachgewiesen. Nicht geprüft wurden dadurch weitere RAID-Level, zu kleine Ersatzkapazität, Kapazitätsgrenzen, parallele Fehlerfälle, Gruppenanzeige/Reset-Randfälle, responsive Darstellung, Dark Mode, Tastaturbedienung oder fachliche RAID-Korrektheit. Terminus' bereits genannte weitere Testresultate werden nicht als eigene Beobachtung ausgegeben. Der von der Leitung gemeldete Grenzfall sehr großer Ersatzkapazität ist eine separate, noch nicht unabhängig verifizierte Beobachtung und bleibt außerhalb dieses Kernnachweises; gezielte Nachprüfung nach der angekündigten Reparatur steht aus. Kein Produktcode oder Git-Stand wurde geändert.


## Nachtrag 3 – gezielte Nachprüfung nach Grenzwertkorrektur (03.11.2026)

Auf aktuellem Projektstand wurde das unabhängige Browser-Script erneut ausgeführt, ohne Vollsuite. Der erfolgreiche und der gesperrte Kernpfad blieben wie zuvor: Schacht 06 absolvierte `failed` → `ersatz` → `rebuild` → `bereit` bei durchgehend Gruppe `2` und abschließend „Funktionsfähig“; nach Ausfällen 5/6/7 war der Rebuild in Schacht 06 deaktiviert und Datenverlust sichtbar.

Zusätzlich im selben echten Browserlauf gezielt geprüft: nach Reset Schacht 06 ausfallen lassen und austauschen, dann Ersatzkapazität `1000001` TB setzen. Rebuild-Aktion war deaktiviert; Detailtext lautete: „Ersatzkapazität muss eine endliche Zahl größer als 0 und höchstens 1000000 TB sein.“ Zustand `ersatz` und Gruppe `2` blieben erhalten. Damit ist die gemeldete Obergrenzenkorrektur durch Nutzerpfad bestätigt. Scriptlauf: `node .output/glados-raid-p0-independent.js` — Exit 0. Keine Vollsuite oder weiteren RAID-Fälle ausgeführt. Produktänderung lag außerhalb meiner Rolle; ich habe keine Produktdatei geändert.

**Aktualisierte Aussage:** Die drei gezielten Nachweise (erfolgreicher Lebenszyklus, Sperre bei nicht rekonstruierbarem Szenario, Ablehnung übergroßer Ersatzkapazität) sind bestanden. Die zuvor ausdrücklich genannten übrigen Prüfbereiche bleiben ungeprüft.
