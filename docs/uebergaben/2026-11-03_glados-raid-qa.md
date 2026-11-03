# Unabhängige RAID-Phasenprüfung – 03.11.2026

**Ergebnis:** Im geprüften Umfang keine Fehler festgestellt.

## Prüfstand und Abgrenzung

- Worktree: `/home/starnet/projects/IT-Ausbildung-raid`, Branch `feature/raid-lernlabor`, HEAD `8e060705108e58130d7eabae6f1aceb49f3d0b26`.
- RAID-Dateien lagen als nicht versionierte Arbeitsdateien vor; der Commit-Hash benennt daher nur die gemeinsame Basis, nicht einen Commit der RAID-Änderungen.
- Vollständig gelesen: `docs/planung/2026-11-03_raid-modell.md`, `docs/planung/2026-11-03_raid-labor-fortsetzung.md`, Rechenkern, Kern-Testdatei, Labor-HTML, Labor-JavaScript, Labor-CSS und Browser-Testdatei.
- Oberfläche: `http://127.0.0.1:8151/module/raid-labor.html` im ausdrücklich bereitgestellten Terminus-Chrome an CDP-Port 46019. Ausschließlich ein eigens neu geöffneter Tab wurde für diese Prüfung verwendet; ein vorhandener Tab wurde nicht bedient.
- Zusätzlich zur vorherigen Prüfung wurde laut Nachtrag nur der Startseiten-Katalogeintrag und die CSS-Regel `hyphens:auto` geändert. Die beiden Punkte wurden gezielt erneut betrachtet.
- Es wurden keine Dateien außer diesem QA-Bericht geändert. Keine System- oder Datenträgerbefehle ausgeführt.

## Phase A – Rechenkern `js/raid-kern.js`

Den Kern unabhängig von Terminus’ Testlauf direkt mit `node` auf gezielte Randfälle aufgerufen und Ergebnisse mit erwarteten Zuständen/Kapazitäten verglichen:

- RAID 1 als N-Wege-Spiegel mit fünf Platten: vier Ausfälle lassen eine Kopie und den Zustand „degradiert“; der Ausfall aller fünf meldet „datenverlust“. Bei Größen 1/2/2/2/2 TB: 9 TB roh, 1 TB nutzbar, 4 TB Spiegelanteil, 4 TB ungenutzt.
- RAID 10: je ein Ausfall in zwei Spiegelgruppen bleibt degradiert; beide Ausfälle innerhalb derselben Zweiergruppe melden Datenverlust.
- RAID 50: ein Ausfall je Paritätsgruppe bleibt degradiert; zwei in derselben RAID-5-Gruppe melden Datenverlust.
- RAID 60: je ein Ausfall in zwei RAID-6-Gruppen bleibt degradiert; drei in derselben Gruppe melden Datenverlust.
- RAID 5 mit gemischten Größen 1/2/2/2 TB: gültig, 7 TB roh, 3 TB nutzbar, 1 TB Paritätsanteil und 3 TB ungenutzt; die Teilwerte summieren sich auf die Rohkapazität.
- RAID 0: Ein einzelner Laufwerksausfall meldet Datenverlust.
- Fehlergrenzen: leere IDs, doppelte Ausfall-IDs und doppelte IDs mit Leerzeichen wurden jeweils als ungültig zurückgewiesen.

**Befund:** Die für diese Phase geprüften Berechnungen und gruppenabhängigen Ausfallzustände entsprachen dem festgelegten Lehrmodell. RAID 1 verwendet ausdrücklich N-Wege-Spiegelung; gemischte Größen werden nicht pauschal abgelehnt.

**Nicht als eigener Nachweis ausgegeben:** `node tests/raid-kern.test.js` wurde nach dem Nachtrag erneut ausgeführt und meldete 790 bestandene Assertions. Das ist Terminus’ Testdatei, kein unabhängiger QA-Test. Ebenso werden Terminus’ 21 Level-/Breitenkombinationen und Browser-Testresultate nicht als eigene Ergebnisse gezählt.

## Phase B – Lernlabor-Oberfläche

Sichtprüfung und Bedienhandlungen auf der Live-Vorschau:

- Viewports 1440 × 1000, 768 × 1000 und 320 × 812 CSS-Pixel geprüft. Die drei Fenstergrößen waren erreichbar; die Oberfläche blieb innerhalb der jeweiligen Breite. Im separaten CDP-Nachlauf betrugen Dokumentbreite und Viewportbreite auf der RAID-Seite jeweils 1440, 768 beziehungsweise 320 Pixel.
- Die vom Commander nachgetragene Startseitenverknüpfung war bei 320 Pixel sichtbar, als anklickbarer Eintrag „RAID-Lernlabor“ mit dem Ziel `module/raid-labor.html`. Die Karte lag innerhalb des 320-Pixel-Layouts; die Startseite hatte dort keine horizontale Überbreite.
- Die Überschrift „Dein Speicherexperiment“ war bei 320 Pixel vollständig im Element sichtbar (kein Textüberlauf). `hyphens:auto` war auf dem Abschnitt berechnet; die geprüfte Überschrift hat ein `scrollWidth` von 257 bei `clientWidth` 257 Pixel. Kein reproduzierbarer Darstellungsfehler festgestellt.
- Quiz: Abgabe ohne Antwort zeigt „Bitte eine Antwort wählen.“; die korrekte Antwort zeigt eine positive Rückmeldung mit Erklärung.
- Schreibdurchlauf: die drei Betätigungen führten nacheinander zu Schritt 1, 2 und 3 mit den jeweils erwarteten Beschriftungen.
- Tastatur/Fokus: der Add-Button wurde fokussiert und betätigt; ein neues Laufwerk erschien und der Fokus wechselte auf dessen Kapazitätseingabe (`cap-d8`). Sichtbarer Fokusrahmen am fokussierten Steuerelement war vorhanden.
- Im Browser wurden keine Konsolenmeldungen ausgegeben.

**Für diese Prüfung nicht ausgeführt:** Der vom Terminus-Testskript beschriebene vollständige UI-Matrixlauf (alle sieben RAID-Level in allen drei Breiten, automatisierte Grenzfallfolgen und Tastatur-Tabs) wurde nicht erneut ausgeführt; die genannten Entwicklerresultate werden nicht als unabhängige Befunde übernommen.

## Nicht geprüfte Bereiche und Grenzen

- Keine echte Touch-Hardware und kein Screenreader verfügbar beziehungsweise eingesetzt; Bedienbarkeit mit diesen Geräten/Technologien bleibt offen.
- Keine Aussage zur fachlichen Richtigkeit über das dokumentierte Lehrmodell hinaus. RAID-Controller, Dateisystemkosten, Metadaten, Ersatzlaufwerke, Rebuild-Verlauf und herstellerspezifische Mischgrößenregeln wurden nicht real getestet.
- Keine produktive Bereitstellung, keine Integration, keine Git-Änderung und keine echte Datenträgeroperation geprüft.

## Schluss

Im geprüften Umfang keine Fehler festgestellt. Die unabhängige Prüfung deckte ausgewählte Kern-Grenzfälle, zentrale sichtbare Lernlabor-Abläufe sowie die nachgetragenen Katalog- und 320-Pixel-Layoutpunkte ab; sie ist keine Vollabnahme aller Oberflächenzustände oder Assistenztechnologien.
