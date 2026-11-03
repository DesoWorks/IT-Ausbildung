# Unabhängige QA – OPERATION UNIFIED LAB

- Projektkennung: IT-Ausbildung-unified
- Paketkennung: glados-unified-qa
- Datum: 2026-11-03 (Stationszeit)
- Ausführender Agent: GLaDOS / apptester
- Ergebnis: **Zwei reproduzierbare UI-Befunde** zur RAID-Gruppensteuerung: verborgen markiertes Label bleibt sichtbar und zeigt bei RAID 60 eine veraltete Gruppenzahl; zusätzlich lässt die HTML-Alternative bei RAID 0/1/5/6 semantisch irreführende freie Gruppenzuordnung zu. In den gezielt interaktiv geprüften RAID-Ausfall- und Rebuild-Abläufen keine weiteren Fehler festgestellt. Plattformweite Navigation, Themen, Theme-Persistenz und alle geforderten Ansichten nur teilweise/nicht vollständig unabhängig geprüft.
- Betroffene Dateien: keine Produktdateien geändert. Bericht: `docs/uebergaben/2026-11-03_glados-unified-qa.md`.
- Branch: `feature/unified-it-labs-2026-11-03`
- Commit: `f90407ece7ccb29dcbf926ca25d942fc737fbb12`
- Arbeitsbaumstatus: vor Prüfung laut `git status --short --branch`: `module/raid-labor.html`, `tests/raid-integration.test.js`, `css/raid-rack.css`, `js/raid-rack-modell.js`, `js/raid-rack.js`, `tests/raid-rack-modell.test.js`, `tests/unified-platform-browser.test.js` sowie zwei `.output-changelog-*`-Dateien uncommitted/untracked. Diese Dateien stammen nicht von GLaDOS. Terminus hatte Produktfreeze während dieser QA zugesagt; der gelesene Status war zu Beginn.
- Teststatus: teilweise geprüft; siehe Umfang/Grenzen.
- Testnachweis: Read-only `git status --short --branch`, `git rev-parse HEAD`, `git worktree list --porcelain`; Live-HTTP-Vorschau `http://127.0.0.1:8151/`, Chrome 154, eigener CDP Chrome auf Port 9333 (Terminus-Port 9331 nicht übernommen). Die Anwendung lud „IT-Ausbildung – Themenübersicht“, Versionsanzeige `0.16.3-alpha.1`. RAID-Seite `http://127.0.0.1:8151/module/raid-labor.html` interaktiv in einer separaten CDP-Session geladen. Direkte Laufzeitauswertung im eigenen Chrome, nur in der bereitgestellten lokalen Vorschau.

## Reproduzierbarer Befund – einfache RAID-Level zeigen auswählbare Gruppen als Array-Gruppen

**Priorität: mittel (Verständlichkeit / fachliche Darstellung), keine falsche Berechnung in den geprüften Fällen.**

1. RAID-Labor direkt laden, z. B. `http://127.0.0.1:8151/module/raid-labor.html`.
2. In „RAID-Level“ nacheinander `0`, `1`, `5`, `6` wählen und jeweils „Passendes Beispiel laden“ auslösen.
3. Unter „Vollständige Laufwerksübersicht und Bedienung“ lässt sich bei den Array-Mitgliedern das Feld „RAID-Gruppe“ wählen. Bei RAID 5 etwa die erste Platte von „Gruppe 1“ auf „Gruppe 4“ umstellen.

**Beobachtet, reproduzierbar:** Die HTML-Auswahl enthält auch bei RAID 0/1/5/6 die Gruppen 1–8. Bereits nach einer Platte auf Gruppe 4 zeigt die Grafik nur noch `Gruppe 4 · Funktionsfähig · 0 nicht verfügbar (Grenze 1)`; die zwei anderen RAID-5-Mitglieder bleiben Gruppe 1, erscheinen aber nicht als Gruppenabschnitt. Das Ergebnis behauptet weiterhin „Funktionsfähig“ und berechnet 6 TB roh/4 TB nutzbar für die drei RAID-5-Platten. Für RAID 0 kann der Titel „Gruppe 4 … (Grenze 0)“ lauten. Die RAID-Kernregeln behandeln einfache Levels dagegen als ein Array (eine gemeinsame Gruppe aller Mitglieder); die freie Gruppenzuweisung gilt laut Oberfläche für RAID 10/50/60.

**Erwartung/Grundlage:** Bei einfachen Levels sollte die Gruppensteuerung nicht verfügbar oder semantisch wirkungslos sein und es sollte genau ein Array-/Gruppenabschnitt alle Mitglieder repräsentieren. Die Hilfebeschriftung grenzt freie Zuordnung ausdrücklich auf RAID 10/50/60 ein. Keine Kapazitäts- oder Ausfallfehlberechnung in den geprüften Standardfällen behauptet; der Befund betrifft inkonsistente Benutzersteuerung und irreführende grafische Gruppierung.

**Auswirkung:** Lernende können durch eine für diesen Level fachlich nicht gemeinte Gruppenwahl Platten aus der angezeigten Gruppe verschwinden sehen und eine willkürliche Gruppe 4 für das Gesamtarray halten. Das erschwert die Interpretation des Lernmodells. Sicher mit Live-UI reproduziert.

### Ergänzender reproduzierbarer Befund – Gruppenfeld bleibt sichtbar, Auswahlwert stimmt nicht mit RAID-60-Preset überein

**Priorität: mittel (Bedienverständnis / Konfigurationsvertrauen).** Der nachgereichte Hinweis wurde im Live-Browser unabhängig verifiziert.

1. `http://127.0.0.1:8151/module/raid-labor.html` laden.
2. Auf RAID 60 wechseln und „Passendes Beispiel laden“ betätigen.
3. Im oberen Bereich „Gruppen bei RAID 10 / 50 / 60“ betrachten.

**Beobachtet, reproduzierbar:** Direkt nach Laden von RAID 60 meldet das Label des Selects `hidden=true`, aber der berechnete Stil lautet `display:block` und sein gerendertes Rechteck ist 473 × 73 CSS-Pixel. Das native Select zeigt weiterhin „2 Gruppen“, während das Rackpreset vier Gruppen mit je vier Laufwerken ausweist. Der sichtbare Auswahlwert widerspricht somit dem aktuellen RAID-60-Szenario. Bei RAID 5 wurde ebenfalls `hidden=true`, `display:block` und ein sichtbares Rechteck gemessen; dort ist die Gruppenwahl ohnehin nicht vorgesehen.

**Erwartung:** Die anhand des Levels nicht benötigte Gruppenauswahl ist tatsächlich verborgen; beim RAID-60-Preset muss die sichtbare Gruppenzahl 4 widerspiegeln. Das ist ein zusätzlicher, UI-seitig beobachteter Mangel zur zuvor beschriebenen freien Gruppenzuordnung bei RAID 0/1/5/6. Keine fehlerhafte Gruppenkonfiguration des RAID-60-Presets selbst beobachtet.

## Geprüfte RAID-Abläufe / Ergebnisse

- Beim ersten Laden der Vorschau waren 16 Rack-Schächte als nativ benannte Buttons vorhanden; Desktop-Ausgangskonfiguration war RAID 60 mit vier Gruppen à vier Laufwerken. Anfangswerte: 32 TB roh, 16 TB konfigurierte Nutzkapazität, 16 TB Spiegel-/Paritätsanteil, 0 TB ungenutzt. Die Ausgabe unterscheidet 16 physische Schächte von 16 konfigurierten Arraymitgliedern; 60-Platten-Interpretation wurde nicht beobachtet.
- Interaktiv in der Laufzeit: in RAID 60 je zwei Ausfälle pro Gruppe durch Buttons an Schacht 01/02, 05/06, 09/10, 13/14. UI zeigte vier degradierte Gruppen, je „2 nicht verfügbar (Grenze 2)“ und Gesamtzustand degradiert. Dritter Ausfall in Gruppe 1 (Schacht 03) zeigte „Datenverlust im Szenario bleibt markiert“ und Gruppe 1 mit 3 nicht verfügbar; andere Gruppen blieben in ihren Gruppenstatus getrennt. Weiterer Zustandswechsel stellte den Verlustmarker nicht wieder her.
- Neues Beispiel startete erkennbar ein neues Szenario und setzte den Verlustmarker zurück. Schacht 01: Ausfall simuliert → Rebuild beginnen → sichtbarer Status „Rebuild – noch nicht verfügbar“ und Gesamtzustand degradiert → separater Klick „Rebuild abschließen“ → „Betriebsbereit“ und „Funktionsfähig“. Der Rebuild begann also sichtbar und blieb bis zum zusätzlichen Abschluss nicht verfügbar. Keine vorzeitige automatische Wiederherstellung beobachtet.
- Bei 320 CSS-px: 16 Buttons weiterhin im DOM; erste vier Rack-Bays standen in zwei Spalten (je ca. 102 px, x≈47 und 157); Dokumentbreite 305 bei Viewportbreite 320. RAID 5 ebenfalls ohne horizontalen Dokumentüberlauf gemessen. Diese gezielte Beobachtung ist kein vollständiger Responsive-Audit bei 1440/768/320 und beiden Themes.
- Die sichtbare Seite führte die „Vollständige Laufwerksübersicht und Bedienung“ und einen separaten Text mit „Blockverteilung als lesbare Liste“. Der Text erklärte Simulation, Rebuild und dessen separaten Abschluss. Nicht interaktiv geprüft: alle HTML-Alternativaktionen für freie Schächte, Kapazitätsänderung, Gruppenänderung, Laufwerk entfernen sowie Tastatur- und Touchbedienung. Die Gruppenwahl wurde gezielt geprüft, wie oben berichtet.
- Browser-Konsole während des beobachteten RAID-Laufs: keine Meldungen. Das ist kein Beweis für Fehlerfreiheit aller Ressourcen/Seiten.

## Weitere Auftragsanforderungen, nicht unabhängig bestätigt

- Plattformweite Browsermatrix 1440/768/320 × Hell/Dunkel, direkte Links, Theme-Persistenz über Reload/Navigation, Browserhistory, Navigation BWL/PC-Explorer mit fünf Ansichten/Windows-Labor mit 32 Profilen: **nicht vollständig interaktiv geprüft**. Übersicht und RAID-Einstieg wurden real bedient; BWL/PC/Windows-Routen wurden nicht vollständig im Browser abgenommen. Entwicklerseitig gemeldete 96 Unitdateien, 42 Rackkombinationen, 24 Plattformkombinationen HTTP/file, 102 HTML-Routen/History sowie weitere Tests werden als Hinweise der Auftraggeberseite behandelt, nicht als eigene GLaDOS-Testnachweise.
- 60 Laufwerke / 16×2 TB / 4×16-Layout: keine eigene Laufzeitprüfung dieser Varianten. Ausgangsmodell war das sichtbare 16-Bay-/vier Gruppen à vier RAID-60-Beispiel. Keine Aussage zur fachlichen Richtigkeit außerhalb des ausdrücklich vereinfachten Lernmodells.
- Tastaturfokus, Screenreader, echtes Touchgerät und echtes Windows: nicht geprüft. Keine entsprechende Geräte-/Assistenztechnik-Aussage.
- Nexus-Referenzvergleich: offen, Quelle war nicht auffindbar; keine visuelle Gleichwertigkeit behauptet.
- Exakte Darstellung bei 1440 und 768 sowie Hell/Dunkel für den Rackserver: nicht unabhängig belegt. Keine vollständigen Unit-, Browser- oder Regressionstests erneut ausgeführt.

## Entscheidungen und Grenzen

- Entscheidung des Commanders in diesem QA-Auftrag: unabhängig prüfen, Änderungen auf den Bericht und eigene Belege begrenzen; Produktfreeze, keine Test-/Git-/Provideränderung. Umgesetzt: keine Produktdatei, kein Test, Branch, Commit oder Provider geändert.
- Auftraggeberhinweis während QA: erwartete Ergebnisse der bestehenden Tests genannt und Reviewpunkt zu Gruppen semantisch nachgereicht. Diese Angaben sind Prüforientierung, kein unabhängiger Testbeleg.
- Offene Frage: Für die Gruppenzuweisung einfacher Levels ist zu klären, ob die UI das Feld deaktiviert/versteckt oder das Array stets als eine Gruppe darstellt. Empfehlung: ein gemeinsames Array sichtbar halten und Level-unabhängige Gruppenänderung verhindern; betrifft Terminus, nicht von GLaDOS umgesetzt.
- Risiko: Gruppenwahl bei einfachen Levels beeinflusst die angezeigte Gruppenzuordnung und Statusdarstellung, obwohl sie nicht als Subgruppenmodell erklärt wird.
- Nächster Schritt: den konkreten Gruppen-UI-Befund in der Produktarbeit behandeln und anschließend genau diesen Fall im Browser gezielt nachprüfen.
- Status der Notion-Übernahme: nicht vorgesehen.

## Schlussurteil

Reproduzierbarer, begrenzter UX-/Darstellungsbefund bei der Gruppensteuerung einfacher RAID-Level. Im geprüften RAID-Ausfall- und Rebuild-Pfad wurden die gezielten Szenarien wie beschrieben dargestellt. Die unabhängige QA deckt nicht die komplette Plattform-Regression, alle Viewports/Themes, Windows-Ausführung oder Assistenztechnik ab. Nexus-Referenzvergleich bleibt offen.
