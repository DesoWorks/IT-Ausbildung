# Gemeinsame IT-Ausbildung unter Windows testen

Dieser Feature-Stand enthält die bisherigen Lernmodule und Werkzeuge gemeinsam. Kein Deployment und keine Produktionsfreigabe.

1. Das komplette ZIP entpacken, nicht einzelne HTML-Dateien herausziehen.
2. `start/IT-Ausbildung starten.html` oder `index.html` doppelklicken.
3. In der Themenübersicht zwischen BWL-Werkstatt, PC-Explorer, Windows-Werkzeugkiste und RAID-Lernlabor wechseln.
4. Unter „Anzeige & Lesen“ das Theme wählen. Es wird über die bestehende zentrale Anzeigeverwaltung gespeichert. Die Speicherung lokaler Dateien hängt vom Browser ab; Browser-Sicherheit nicht deaktivieren.

## RAID zuerst ausprobieren

Der Einstieg ist RAID 60: 16 Laufwerke mit je 2 TB, vier Gruppen mit je vier Laufwerken. Erwartet werden 32 TB Rohkapazität, 16 TB Nutzkapazität und 16 TB Paritätsanteil.

- Auf einen betriebsbereiten Schacht klicken: Ausfall simulieren.
- Zwei Ausfälle je Gruppe bleiben im Modell rekonstruierbar, drei in derselben Gruppe nicht.
- Auf einen ausgefallenen Schacht klicken: Rebuild beginnen, sofern noch rekonstruierbar.
- Der orange Rebuild-Zustand bleibt bestehen, bis du den Abschluss ausdrücklich auswählst.
- „Alle Ausfälle zurücknehmen“ startet nur das Szenario neu; es ist keine Datenrekonstruktion.
- „Vollständige Laufwerksübersicht und Bedienung“ bietet Einsetzen, Entfernen, Kapazität und Gruppenzuweisung auch ohne grafische Auswahl.

Die Serverfront hat am Desktop vier mal vier Schächte; auf schmalen Bildschirmen zwei Spalten mit größeren Bedienflächen. Freie Laufwerke sind keine automatischen Hotspares. Gemischte Größen sind möglich; das vereinfachte Modell begrenzt alle Mitgliedsanteile auf die kleinste Platte.

**RAID ersetzt kein Backup.** P/Q-Blöcke sind schematische unabhängige Paritätsinformationen, keine Datenkopien und keine berechneten Paritätsbytes.

## Prüfstatus und Grenzen

Linux-Chrome, einschließlich direktem `file://`-Start, wurde getestet. Ein echter Windows-Test, Screenreader, echte Touchgeräte und weitere Browser sind noch offen. Die externe Nexus-Grafikvorlage lag nicht vor; ein direkter Referenzvergleich wird nicht behauptet.

Ausführliche Sollprüfungen: `docs/uebergaben/2026-11-03_unified-testanleitung.md`.
Eigene Testergebnisse: `docs/uebergaben/2026-11-03_terminus-unified-pruefung.md`.
