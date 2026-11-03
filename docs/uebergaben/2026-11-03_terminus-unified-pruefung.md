# Operation Unified Lab – Terminus-Prüfprotokoll

03.11.2026 · Integrationsbranch `feature/unified-it-labs-2026-11-03` · Linux mit realem headless Google Chrome. Kein echter Windows-/Screenreader-/Touchgerätetest.

## Bestand und Integration
Basis origin/dev 3b3b49f, PC21edc64, RAID4d95f91, Windows9bb8cc5, Lernjahr-2abffe39 kontrolliert zusammengeführt. Alle Modul-HTML-Dateien der fünf Quellbranches existieren im Integrationsstand; keine gelöscht. 102 HTML-Seiten (Übersicht, Glossar, Modulordner). Werkzeuge: BWL, Zahlensysteme, Einheiten, Subnetz, Windows32Profile, PCalleAnsichten, RAID. Vorhandene redaktionelle Abnahmeformulare bleiben eigenständige historische Hilfsseiten. Keine Freigabesperren von Lernfeldern geändert.

## Durchgeführt
- 96 nicht-browsergebundene `tests/*.test.js` einzeln mit Node ausgeführt: 96 bestanden. Protokoll lokal `.output/unified-unit-final.json`.
- `node tests/raid-kern.test.js`:790 Assertions, unveränderter Rechenkern.
- `node tests/raid-rack-modell.test.js`:26 Checks:16x2TB60, gruppenabhängige8/3Ausfälle, RAID10/50Verteilung, Verlustsperre, freie/gemischte Laufwerke und Rebuild.
- `CDP_PORT=9331 node tests/unified-platform-browser.test.js`:24 Kombinationen aus4Modulen×3Breiten×2Themes. Navigation und zentrale Theme-Persistenz bestanden; zusätzlich gleiche24Fälle mit BASE_URL=file:///home/starnet/projects/IT-Ausbildung-unified/ bestanden.
- `CDP_PORT=9331 node tests/raid-rack-browser.test.js`:42Level/Breiten/Theme-Fälle sowie Eingabefehler, acht verteilte/drei gruppierte Ausfälle, Rebuildstart/Abschluss, Schutz vor verlorenenDaten, HTMLAlternative, freieLaufwerke,2/20TB, Quiz, Schreibschritte, echteEntereingabe/Fokus und ChromeTouchsimulation bestanden. Zusätzlich42Fälle überfile://bestanden. Alter Einstieg tests/raid-browser.test.js leitet bewusst auf die neue Regression um.
- `CDP_PORT=9331 node tests/unified-pages-browser.test.js`:102Seiten ohne erfassteJS/Resource-Fehler; BrowserZurück/Vorwärts vonBWLzuRAIDbestanden.
- `node tests/browser-nav-scroll-cdp.js`:Scrollposition bei Maus/Tastatur,Dokumentwechsel,Direktlink und320pxbestanden.
- `node tests/lf8-lf9-browser.test.js`:18Seiten/Katalog,Antwortfälle,Fortschritt,Reload,Reset,Zurückund320/390pxbestanden.
- `node tests/lf8-lf9-praxis-browser.test.js` und `node tests/lf8-lf9-reihenfolge-browser.test.js`:Praxisfälle,History,PersistenzundstabileAntwortzuordnungbestanden.
- `CDP_PORT=9331 node tests/windows-erweiterung-browser.test.js`:9Profil/Breitenfälle,Enter/Tab/RadioPfeile,Fokus,FeedbackohneÜberlaufbestanden.
- `node --check js/raid-rack.js`/Modell und `git diff --check` bestanden.
- Sichtbelege `.output/unified-rack-1440.png`,768,320. Mobil zweiSpalten mitgroßenSchachtflächen stattwinziger4Spalten; Statuswörter können umbrechen,keinInhaltabgeschnitten. Alle Schachtflächen im Browser >=44pxinbeidenAchsen.

## Grenzen und offene Abnahme
NexusOriginalreferenz nicht auffindbar, kein visueller Referenzvergleich bestätigt. WindowsZIP ist zum manuellenTest vorgesehen. file://imLinuxChromegeprüft,keineallgemeineSpeichergarantieüberBrowser. Screenreader,echtesTouchgerät,Firefox/EdgeundformalervollständigerWCAGAuditoffen. BestehendeHTMLAbnahmeformulareteilweisemitälteremeigenemLayout,nichtmitLernmodulenzuverwechseln.

RAIDverwendetglobaldie kleinste Mitgliedskapazität; Gruppengleichgröße ist expliziteLehrmodellgrenze. P/QnurverteilteSymbole,keineParitätsbyteberechnung. Rebuild ist ein manueller didaktischerZustandsablauf ohneZeit-/Erfolgsgarantie. KeineechtenSystembefehleoderDatenträgerzugriffe.

## Rollen
Terminus: Inventar,Integration,Implementierung,Review,TestsundGit. GLaDOS: separateunabhängigeQA,derenBefundein eigenemBerichtstehen. C3PO: Testanleitung,inhaltlichdurchTerminusreviewtundkorrigiert. Jarvis: nurlesenderStartauftrag,jedochunerlaubterErsatzpfadimLaufprotokoll;danachnichtweitereingesetzt. ErsatzworkerhattekeinenProjektzugriff,keineProduktänderungen.

KeineProduktions-/Fachfreigabe. dev/main/Pagesbleibenunangetastet.

## QA-Korrekturen
GLaDOS reproduzierte zwei Darstellungsfehler. Das alte Gruppenzahlfeld war trotz hidden-Attribut sichtbar, weil die Formular-CSS-Regel display:block setzte. Der Rackstil stellt nun [hidden] mit display:none sicher. Bei einfachen RAID-Leveln erlaubt die HTML-Alternative nur frei oder Arraymitglied, keine Untergruppen 2–8; die Blockdarstellung heißt Gemeinsames Array. Der Levelwechsel normalisiert zugewiesene Mitglieder auf Gruppe 1. Die Browserregression prüft beide Regeln ausdrücklich, alle 42 Kombinationen nach Reparatur bestanden. Unabhängige gezielte Nachprüfung separat beauftragt.
