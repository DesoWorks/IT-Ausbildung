# RAID-Lernlabor öffnen und nachvollziehen

Aktueller Unified-Feature-Teststand, keine Produktionsfreigabe: Branch `feature/unified-it-labs-2026-11-03`, einschließlich Windows-Labor mit 32 Profilen, PC-Explorer, BWL und Unterrichtsmodulen.

## Aktuelle kompakte Nexus-Bedienung (ersetzt die ältere Formularanleitung unten)

Vollständiges Unified-ZIP entpacken und `index.html` öffnen. Ein Schachtklick wählt ausschließlich aus; genau ein Detailfeld zeigt Kapazität, Gruppe und Aktionen. Eine kompakte alternative Auswahlliste bleibt verfügbar.

### P0-Abnahme: vollständiger Lebenszyklus

1. „Gesamtes RAID-Experiment zurücksetzen“ bestätigen: RAID 60, 16 × 2 TB, vier Gruppen, Schacht 01 ausgewählt.
2. Schacht 06 wählen und „Ausfall simulieren“: rot, Gruppe 2 degradiert.
3. „Defektes Laufwerk austauschen“: Ersatz im selben Schacht, Gruppe 2 bleibt erhalten. Orange und ausdrücklich noch nicht synchronisiert. Austausch allein stellt keine Daten wieder her.
4. Optional Ersatzkapazität ändern: unter 2 TB ist „Rebuild starten“ gesperrt und die Mindestgröße erklärt. 2 TB wieder einstellen.
5. „Rebuild starten“: Orange, Gruppe weiterhin degradiert. Erst „Rebuild abschließen“ macht das Laufwerk wieder grün und die Gruppe funktionsfähig.
6. Wiederholen und während des Rebuilds weitere Laufwerke derselben Gruppe ausfallen lassen: ein zusätzlicher Ausfall bleibt bei RAID 60 tolerierbar; zwei zusätzliche Ausfälle führen zu Datenverlust und sperren den Abschluss.
7. Drei Ausfälle derselben RAID-6-Gruppe: auch nach Austausch keine erfolgreiche Rekonstruktion. Gruppierung und RAID-Level sind während des Experiments gesperrt. Entfernen verkleinert das bestehende Array nicht; fehlende Mitglieder bleiben berücksichtigt.

### Drei getrennte Szenarioaktionen

- **Ausfallsimulation zurücksetzen:** stellt die vor dem ersten Ausfall/Entfernen gesicherte gesunde Konfiguration inklusive Kapazitäten und Gruppen wieder her.
- **Passendes Beispiel laden:** ersetzt die Konfiguration durch das gesunde Beispiel des aktuellen RAID-Levels.
- **Gesamtes RAID-Experiment zurücksetzen:** stellt das Standardbeispiel RAID 60 einschließlich aller 16 Schächte, Auswahl 01, Gruppenanzeige und Lernantwort wieder her.

Alle drei verlangen eine Bestätigung. Kein Reset ist eine echte Datenrettung. Modellgrenze: während eines Ausfallexperiments bleiben logische Array-Geometrie und konfigurierte Kapazität eingefroren; Ersatzkapazität muss mindestens dem ursprünglichen global kleinsten Mitglied entsprechen. Physisch größere Ersatzlaufwerke erweitern das Array nicht automatisch. Rebuild hat keine reale Zeit- oder Erfolgsgarantie.

RAID 60: 16 × 2 TB, vier Gruppen mit je vier Mitgliedern, 32 TB roh / 16 TB nutzbar / 16 TB Parität. Je zwei Ausfälle pro Gruppe bleiben rekonstruierbar, drei in einer Gruppe nicht. Gruppenkennzeichen werden aus den Daten abgeleitet; bei gemischter Reihe nennt die Überschrift keine gemeinsame Gruppe. Freie Laufwerke gehören nicht zum Array. Grün/Rot/Orange/LED aus bedeuten bereit/ausgefallen/Rebuild/leer, immer zusätzlich textlich beschriftet. Alle sieben RAID-Level, gemischte Größen, Blockverteilung, Schreibschritte und Quiz bleiben erhalten.

Alle 16 Schächte auswählen und bearbeiten; Hell/Dunkel und Navigation zwischen BWL, PC, Windows und RAID prüfen. Breiten 1440/768/320 px testen. Mobil zwei bedienbare Spalten statt vier winziger Ziele. Tab, Enter und Leertaste prüfen. Echte Touchgeräte und Screenreader bleiben separat offen.

Aktuelle Tests: `node tests/raid-kern.test.js`, `node tests/raid-rack-modell.test.js`, `node tests/raid-lebenszyklus.test.js`, `node --check js/raid-rack.js`. Mit eigenem Chrome-CDP und Vorschau: `CDP_PORT=9335 BASE_URL=http://127.0.0.1:8154/ node tests/raid-lebenszyklus-browser.test.js` sowie `tests/raid-rack-browser.test.js` und `tests/unified-platform-browser.test.js`. Für das entpackte Paket ist auch `BASE_URL=file:///vollstaendiger/pfad/` unterstützt. Keine persönlichen Browserprofile verwenden.

## Historische Anleitung der ursprünglichen RAID-Seite

Die folgende Anleitung dokumentiert die frühere isolierte Formularversion, nicht die aktuelle Rackbedienung.

1. Ganzes Branch-ZIP laden und entpacken: https://github.com/DesoWorks/IT-Ausbildung/archive/refs/heads/feature/raid-lernlabor.zip
2. `module/raid-labor.html` öffnen, direkt lokal oder über einen lokalen HTTP-Server. Kein Backend, keine Installation oder Geräteberechtigung nötig.
3. RAID-Level wählen und „Passendes Beispiel laden“. Alle sieben Level ausprobieren. Die Beispiele setzen 2 TB je Laufwerk und gültige Mindesttopologien.
4. Kapazitäten ändern, Laufwerke hinzufügen/entfernen und Gruppenzahl wählen. Leere/negative Eingaben oder unpassende Gruppen müssen deutsche Fehler anzeigen. Gemischte Größen bleiben möglich: Im vereinfachten Modell wird der Anteil oberhalb der global kleinsten Platte nicht verwendet.
5. Rohkapazität = logische Nutzkapazität + Spiegel-/Paritätsanteil + ungenutzter Größenanteil. TB sind dezimal, nicht TiB. Reale Metadaten/Dateisystemkosten sind nicht berechnet.
6. RAID 1 ist ausdrücklich ein N-Wege-Spiegel. RAID 10 hat Zweiergruppen. RAID 50/60 verwenden mindestens zwei gleich große RAID-5/6-Gruppen.
7. Ausfall-Checkboxen bedienen: RAID 10 zwei Ausfälle verteilt vs. im selben Paar; RAID 50 zwei verteilt vs. gleiche Gruppe; RAID 60 zwei vs. drei derselben Gruppe. Nicht allein die Gesamtzahl zählt. „Alle Ausfälle zurücknehmen“ setzt das Szenario zurück, führt keinen Rebuild aus.
8. Schreibdurchlauf mit dem Button in drei Schritten durchlaufen. D/M/P/Q unterscheiden. P und Q sind Prüfwerte, keine vollständigen Datenkopien; das Modell berechnet ihre Bytes nicht. Die Paritätspositionen rotieren zwischen Stripes. Lesbare Blockliste als Alternative öffnen.
9. Übung leer/falsch/richtig beantworten. Wiederholungen möglich, keine Speicherung. Rebuild-Text lesen: zusätzlicher Fehler während Rekonstruktion kann kritisch sein. RAID ersetzt kein Backup.
10. Tab/Shift+Tab, native Felder/Checkboxen, Enter/Leertaste testen. Fokus muss sichtbar bleiben. 1440/768/320 px auf Überläufe prüfen. Echte Touchgeräte und Screenreader sind separate offene Abnahmen.

## Automatisierte Reproduktion

```sh
node tests/raid-kern.test.js
node --check js/raid-labor.js
node tests/navigation-glossar.test.js
node tests/startseite.test.js
```

Browserlauf: eigenen headless Chrome mit separatem Profil und CDP-Port starten, Projekt auf Loopback-Port 8151 bereitstellen; dann `CDP_PORT=<eigener-Port> node tests/raid-browser.test.js`. Das Testskript bedient ausschließlich einen dafür bereitgestellten Testbrowser. `SCREENSHOTS=1` speichert optionale Ansichtsbelege unter docs/uebergaben/. Keine persönlichen Browserprofile verwenden.

Modell: `docs/planung/2026-11-03_raid-modell.md`. QA: `docs/uebergaben/2026-11-03_glados-raid-qa.md`. Fachquellenmatrix liegt auf dem Windows-Branch in `docs/uebergaben/2026-11-03_c3po-windows-raid-quellen.md`; Modellbegründung und Quellenlinks sind auch direkt im RAID-Modul enthalten.
