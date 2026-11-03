# RAID-Lernlabor öffnen und nachvollziehen

Feature-Teststand, keine Produktionsfreigabe. Branch `feature/raid-lernlabor` basiert auf Werkzeuglabor-Commit `8e06070`; die drei neuen Windows-Profile sind getrennt auf `feature/windows-werkzeugkiste` und nicht automatisch enthalten.

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
