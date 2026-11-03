# RAID-Phasen: technischer Prüfstand

03.11.2026. Basis 8e06070, eigener Worktree IT-Ausbildung-raid, Branch feature/raid-lernlabor. Keine Windows-Neuprofile integriert, kein PC-Explorer geändert. Terminus implementiert ausdrücklich autorisiert, da Jarvis nicht eingeplant werden darf. C3PO liefert gemeinsame Quellenmatrix auf Windows-Branch; GLaDOS prüft unabhängig. Kein bezahlter Ersatzprovider, Restkontingente unbekannt.

## Phase 2: Rechenkern

`js/raid-kern.js` ist DOM-/netzwerkfrei, CommonJS und Browser-Namespace. Level 0/1/5/6/10/50/60, explizite Gruppenzuordnung und Ausfall-IDs. Ausgaben: Mindestanzahl, Roh-/Nutzkapazität, Redundanzanteil, ungenutzter Größenrest, Gruppenstatus. Lehrmodell ausdrücklich global kleinste Platte, RAID1 N-Wege und RAID10 Zweiergruppen; Controllerabweichungen erklärt.

`node tests/raid-kern.test.js`: 790 Assertions bestanden, darunter alle Ausfallkombinationen der Mindesttopologien, Mischgrößen, ungültige Zahlen, doppelte IDs, falsche Gruppen und unveränderte Eingaben. Eigene unabhängige QA wird im GLaDOS-Bericht abgegrenzt.

## Phase 3: Oberfläche

Native Level-/Gruppenwahl; Platten hinzufügen/entfernen und Kapazität ändern; unmittelbare Neuberechnung und deutsche Fehler. Laufwerksgruppen mit Daten-/Spiegel-/P-/Q-Blöcken, wechselnden Paritätspositionen und vollständiger Textalternative. Drei manuelle Schreibschritte statt automatisch laufender Animation. P/Q werden symbolisch dargestellt, nicht als echte Bytes errechnet. Einstieg über Werkzeugkatalog auf der Feature-Startseite.

`CDP_PORT=46019 SCREENSHOTS=1 node tests/raid-browser.test.js`: 21 Level-/Breitenkombinationen bei 1440/768/320 bestanden; ungültige Kapazität, Ausfälle, Quiz, Enter-Aktivierung und Fokus. Erste Läufe fanden Fehler im Testaufbau (CDP Enter benötigte Textzeichen; Quizradio musste zwischen Breiten zurückgesetzt werden). Nach konkreter Prüfung wurde nur der Test repariert, kein Produktfehler verschleiert.

Sichtprüfung durch Terminus: Anfangsbereich320 und Blockbereich320/1440 betrachtet. Kein abgeschnittener Seiteninhalt; mobile Gruppen stehen untereinander. Lange Überschrift erhielt automatische deutsche Silbentrennung. Belege: raid-320.png, raid-blokken-320.png, raid-blokken-1440.png (weitere Breiten ebenfalls erfasst).

Touch per CDP touchStart/touchEnd am Schreibschritt getestet, Schritt1 wurde ausgelöst. Kein echtes Touchgerät. Vollständige Screenreaderprüfung offen.

## Phase 4: begrenzte, abgeschlossene Lernfunktion

Einzelne Plattenausfälle per Checkbox; funktionsfähig/degradiert/Datenverlust je Gruppe und Gesamtarray. Konfigurierte Kapazität bleibt als solche markiert und wird nicht mit aktueller Verfügbarkeit verwechselt. Szenario-Reset ausdrücklich kein Rebuild. Rebuild-Ablauf und zusätzliche Risiken textlich erklärt. Praktische Vergleichsaufgaben RAID10/50/60 und eine wiederholbare Wissensfrage mit Leer-/Falsch-/Richtig-Feedback. Kein zeitlicher Rebuild-Simulator, kein dauerhaft gespeicherter Fortschritt.

## Regression und Sicherheit

Bestanden: node tests/raid-integration.test.js, navigation-glossar.test.js, startseite.test.js, overview-disclosures.test.js, fortschritt.test.js, windows-labor.test.js (29er Basis), windows-werkzeugkiste.test.js. Gezielte Prüfung auf keine dynamische HTML-Injektion, Systembefehle, Netzwerk- oder Speicher-APIs in Kern/UI. git diff --check bestanden. Die vorhandenen zwei festen Werkzeuganzahl-Assertions wurden nach dem neuen Katalogeintrag von5auf6 angepasst; Rendering aller sechs Karten bleibt geprüft.

Grenzen: keine echten Controller-/Datenträgerversuche; echte Touchhardware, Screenreader, andere Browser und umfassender WCAG-Audit offen. RAID01 optional nicht implementiert. Keine Rebuild-Animation oder echte P/Q-Berechnung; keine Produktions-/Fachfreigabe. Quellen: Linux md(4) und Kernel-RAID-Dokumentation tatsächlich abgerufen; Linuxfunktionen sind keine herstellerübergreifenden Controllerregeln.
