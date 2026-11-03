# Gemeinsame IT-Ausbildung unter Windows testen

Dieser Feature-Stand enthält die bisherigen Lernmodule und Werkzeuge gemeinsam. Kein Deployment und keine Produktionsfreigabe.

1. Das komplette ZIP entpacken, nicht einzelne HTML-Dateien herausziehen.
2. `start/IT-Ausbildung starten.html` oder `index.html` doppelklicken.
3. In der Themenübersicht zwischen BWL-Werkstatt, PC-Explorer, Windows-Werkzeugkiste und RAID-Lernlabor wechseln.
4. Unter „Anzeige & Lesen“ das Theme wählen. Es wird über die bestehende zentrale Anzeigeverwaltung gespeichert. Die Speicherung lokaler Dateien hängt vom Browser ab; Browser-Sicherheit nicht deaktivieren.

## RAID zuerst ausprobieren

Der Einstieg ist RAID 60: 16 Laufwerke mit je 2 TB, vier Gruppen mit je vier Laufwerken. Erwartet werden 32 TB Rohkapazität, 16 TB Nutzkapazität und 16 TB Paritätsanteil.

- Auf einen Schacht klicken: auswählen. Das einzige Detailfeld darunter zeigt Kapazität, RAID-Gruppe und Aktionen. Auswahl allein löst keinen Ausfall aus.
- Im Detailfeld „Ausfall simulieren“ wählen.
- Zwei Ausfälle je Gruppe bleiben im Modell rekonstruierbar, drei in derselben Gruppe nicht.
- Ausgefallenen Schacht auswählen und „Defektes Laufwerk austauschen“ wählen. Gruppe bleibt erhalten; Ersatz ist noch nicht synchronisiert.
- Anschließend „Rebuild starten“ wählen, sofern rekonstruierbar und Ersatz groß genug. Für das Standardbeispiel mindestens 2 TB.
- Der orange Rebuild-Zustand bleibt bestehen, bis du den Abschluss ausdrücklich auswählst.
- „Ausfallsimulation zurücksetzen“ stellt die vor dem Ausfall gesicherte gesunde Konfiguration wieder her. „Passendes Beispiel laden“ lädt ein gesundes Beispiel des aktuellen Levels. „Gesamtes RAID-Experiment zurücksetzen“ stellt RAID 60, 16 × 2 TB, alle Gruppen und Auswahl 01 wieder her. Alle drei verlangen Bestätigung und sind keine Datenrekonstruktion.
- P0-Positivtest: RAID 60 → Schacht 06 → Ausfall → Austausch → Rebuild starten → Rebuild abschließen. Gruppe 2 muss ohne manuelle Umgruppierung wieder funktionsfähig sein.
- P0-Gegentest: Schacht 05, 06 und 07 ausfallen lassen. Nach Austausch bleibt Rebuild gesperrt; Datenverlust kann nicht durch Austausch oder Umgruppierung geheilt werden.
- „Kompakte Laufwerksübersicht – alternative Auswahl“ bietet alle Schächte auch ohne grafische Auswahl; dieselben Einstellungen bleiben im gemeinsamen Detailfeld bedienbar.

Die Serverfront hat am Desktop vier mal vier Schächte; auf schmalen Bildschirmen zwei Spalten mit größeren Bedienflächen. Freie Laufwerke sind keine automatischen Hotspares. Gemischte Größen sind möglich; das vereinfachte Modell begrenzt alle Mitgliedsanteile auf die kleinste Platte.

**RAID ersetzt kein Backup.** P/Q-Blöcke sind schematische unabhängige Paritätsinformationen, keine Datenkopien und keine berechneten Paritätsbytes.

## Prüfstatus und Grenzen

Die Unified-Basis wurde vom Commander unter Windows bestätigt. Die aktuelle kompakte UI folgt dem direkt beigefügten Nexus-Screenshot (Rack, Gruppenkennzeichen, Status-LED, Auswahlrand, ein Detailfeld), angepasst an die vorhandenen Plattform-Themes. Die erneute Windows-Sichtprüfung dieser Iteration, Screenreader, echte Touchgeräte und weitere Browser bleiben offen. Eigene Tests verwenden Linux-Chrome; Touch wird nur simuliert.

Ausführliche Sollprüfungen: `docs/uebergaben/2026-11-03_unified-testanleitung.md`.
Eigene Testergebnisse: `docs/uebergaben/2026-11-03_terminus-unified-pruefung.md`.
