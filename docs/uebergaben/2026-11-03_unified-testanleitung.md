# OPERATION UNIFIED LAB – Windows-Testanleitung

**Stand:** 03.11.2026 · **Projekt:** IT-Ausbildung · **Teststand:** `feature/unified-it-labs-2026-11-03`, dokumentierter HEAD `f90407ece7ccb29dcbf926ca25d942fc737fbb12`.

Dies ist eine Anleitung für eine künftige manuelle Prüfung, keine Abnahme. Die Implementierung ist noch in Arbeit. Alle Prüffälle sind Sollprüfungen; hier wird kein Ergebnis als bestanden behauptet. Keine Freigabe für `dev`/`main` oder Deployment.

## Start unter Windows

1. Lade das ZIP genau des Branches `feature/unified-it-labs-2026-11-03` aus `https://github.com/DesoWorks/IT-Ausbildung` herunter, nicht von `main`, `dev` oder einem anderen Feature-Branch.
2. Entpacke den vollständigen ZIP-Ordner, damit HTML, Skripte, Styles, Bilder und Daten zusammenbleiben.
3. Öffne im entpackten Verzeichnis per Doppelklick `start/IT-Ausbildung starten.html`. Falls nicht auffindbar, öffne `index.html` im Projektordner. Keine zusätzlichen Installationen sind vorgesehen.
4. Prüfe, dass Übersicht und Ressourcen laden. Bei Problemen keine Browser-Sicherheitsfunktionen abschalten.

Direkt geöffnet läuft die Seite unter `file://`. Browser können lokale Speicherung (`localStorage`/andere Ursprungsdaten) dort einschränken. Inhalte und Übungen können nutzbar bleiben, während Lernfortschritt oder Anzeigeoptionen nach Seitenwechsel/Neustart nicht dauerhaft erhalten bleiben. Das ist eine Browsergrenze, kein Beleg für ein ZIP-Problem. Optionaler Vergleich über einen bereits verfügbaren lokalen HTTP-Webserver ist möglich, aber nicht erforderlich und keine Installationsempfehlung; Speicherung unter HTTP ist weiterhin lokal im jeweiligen Browser, nicht synchronisiert.

**Kein echter Windows-Test wurde hier ausgeführt.** Windows-Start und Verhalten im Windows-Browser müssen noch praktisch geprüft werden.

## Navigation und Module

Von der zentralen Übersicht aus öffnen, bedienen und wieder zurücknavigieren:

- **BWL-Werkstatt** – Seite und verfügbare Bedienelemente laden.
- **PC-Explorer** – Desktop, Notebook, Rückseite, Mainboard und ältere Anschlüsse; Grafik- und HTML-Auswahl müssen erreichbar sein.
- **Windows-Werkzeugkiste / CMD-/PowerShell-Labor** – Einstieg, Filter, Profile, Übungen und Wissenstest öffnen. Integrierter Sollbestand: 32 Befehlsprofile einschließlich shutdown, ssh und diskpart. Simulationen müssen als solche erkennbar bleiben; kein Systembefehl darf ausgeführt werden.
- **RAID-Lernlabor** – aus der Plattform erreichbar und mit Rückweg, nicht als losgelöste Fremdseite.
- **Weitere vorhandene Unterrichtsmodule, Übungen und Wissenstests** – Stichproben öffnen; auf fehlende/falsch verlinkte Einträge und unbeabsichtigte Abschlusszustände achten.

Menüpunkt allein genügt nicht: Zielseite muss tatsächlich laden. Fehler und fehlende Ressourcen protokollieren.

## Theme, Reload und responsive Darstellung

Theme-Sollprüfung: dunkle Darstellung wählen, zwischen BWL/PC/Windows/RAID wechseln und Konsistenz sowie Lesbarkeit prüfen; neu laden und Persistenz kontrollieren. Mit hellem und ggf. kontrastreichem Theme wiederholen. Unter `file://` und optional HTTP getrennt protokollieren. Wenn Browser-Speicherung bei lokalen Dateien eingeschränkt ist, das als solche Einschränkung kennzeichnen – nicht als bestandene Persistenz.

Plattform und zentrale Ansichten bei **1440, 768 und 320 CSS-px** prüfen: kein horizontaler Seitenüberlauf, abgeschnittener Pflichtinhalt oder überlappende Controls; Navigation bleibt bedienbar. Tabellen/Ausgaben dürfen in eigenem Bereich scrollen. PC-Explorer-Grafik, zugängliche HTML-Auswahl und Erklärung müssen erreichbar bleiben.

Tastatur: Tab/Shift+Tab, Pfeiltasten in nativen Feldern, Enter/Leertaste für Controls. Fokus muss sichtbar sein. Screenreader und echtes Touchgerät separat prüfen; Desktop-Simulation ersetzt diese Tests nicht.

## RAID: Sollprüfungen, keine bestätigten Funktionen

Die Zahlen unten sind verbindliche Testvektoren aus dem Commander-Auftrag. RAID 60 bezeichnet das RAID-Level, nicht die Anzahl der Laufwerke. Die gewünschte Nexus-Referenz war im zugänglichen Chat/Projekt bisher nicht auffindbar; der visuelle Vergleich bleibt offen.

- **Rackserver:** genau 16 Schächte, am Desktop vier Reihen mit vier Schächten; mobil bedienbar auf zwei Spalten angepasst. Physische Schächte und logische Arraymitglieder unterscheiden.
- **RAID-60-Demonstration:** 16 Laufwerke à 2 TB, vier RAID-6-Gruppen à vier Laufwerke. Erwartet: 32 TB roh, 16 TB nutzbar und 16 TB Paritätsäquivalent. Dies ist die ausdrücklich vorgegebene Topologie.
- **Ausfälle:** mit der jeweils eindeutig festgelegten Gruppentopologie zwei Ausfälle je RAID-6-Gruppe (acht bei vier Gruppen) gegen drei in einer Gruppe testen. Erwartung im Modell: zwei je Gruppe überlebbar; drei in einer Gruppe überschreiten deren Rekonstruktionsgrenze und Array nicht vollständig rekonstruierbar. Verteilung zählt, nicht nur Gesamtsumme. Das behauptet nicht, jedes reale Datenbyte sei sicher verloren.
- **Gemischte 2/20 TB:** Größenmix darf nicht pauschal abgelehnt werden. Im dokumentierten Modell begrenzt global die kleinste Platte jeden Mitgliedsanteil; pro 20-TB-Platte sind 18 TB als ungenutzter Größenrest auszuweisen. Kapazitätsteile gegen gewählte Topologie prüfen.
- **Freie/unzugewiesene Platten:** sichtbar von Arraymitgliedern unterscheiden; sie dürfen nicht unbemerkt in Arraykapazität oder Ausfallbewertung eingehen. Fehlende Darstellbarkeit als offene Funktion vermerken.
- **Rebuild:** Ausfall darf nicht als sofortige Wiederherstellung gelten. Gruppe bleibt degradiert/nicht wiederhergestellt, bis ein ausdrücklich gestarteter und als abgeschlossen erkennbarer Rebuild erfolgt. Falls kein interaktiver Rebuild implementiert ist, als offen notieren; „Ausfälle zurücknehmen“ ist kein Rebuild.
- **Gruppenbewertung:** eine nicht rekonstruierbare RAID-6-Gruppe darf nicht durch andere Gruppen als repariert ausgegeben werden; Gesamt-Stripe-Status muss Gruppen berücksichtigen.

Bekannte Grenzen des Lehrmodells: dezimale TB, global kleinste Mitgliedskapazität, vereinfachte RAID-Gruppen; reale Controller-, Metadaten-, Dateisystem-, Spare-, Rebuild- und zusätzliche Lesefehler werden nicht abgebildet. P/Q sind schematische Paritätskennzeichnungen, keine errechneten Paritätsbytes. Modellgrenzen nicht als Aussagen über jeden Hersteller verallgemeinern. RAID ersetzt kein Backup.

## Protokoll und Quellen

Je Testfall notieren: Datum/Zeit samt Zeitzone, Windows-Version, Browser/Version, ZIP-Branch/Commit, Startweg (`file://`/HTTP), Viewport, Soll, Beobachtung und ggf. Screenshot/Fehler. Status nur als **bestanden**, **fehlgeschlagen**, **nicht geprüft** oder **blockiert**; nicht geprüfte Fälle nicht zusammenfassend als bestanden melden.

Gelesene Quellen im Projekt: `README.md`; `RAID-LABOR-TESTANLEITUNG.md`; `WINDOWS-LABOR-TESTANLEITUNG.md`; `PC-EXPLORER-TESTANLEITUNG.md`; `docs/planung/2026-11-03_raid-modell.md`; `docs/planung/2026-11-03_raid-labor-fortsetzung.md`; `docs/uebergaben/2026-11-03_terminus-raid-pruefstand.md`; `docs/uebergaben/2026-11-03_glados-raid-qa.md`. Letztere enthalten berichtete Implementierungs-/QA-Ergebnisse und Grenzen, keinen hier ausgeführten Windows-Test.
