# Unabhängiger Testplan: Windows-Werkzeugkiste

**Stand:** 01.11.2026  
**Prüfumfang:** Abnahme nach Implementierung und Integration. Das Modul ist zum Erstellen dieses Plans noch nicht vorhanden; es wurden keine Modulfunktionen geprüft.  
**Arbeitsstand laut Übergabe:** Branch `feature/windows-werkzeugkiste`, HEAD `ba62939`. Hauptcheckout bleibt unberührt.

## Vorgehen und Entscheidung

Zuerst werden die sichtbaren Abläufe in der Anwendung manuell geprüft. Tests mit Node.js ergänzen die Regression; sie ersetzen weder die Bedienung im Browser noch den Blick auf mobile Breiten. Für jede Prüfziffer wird bestanden/nicht bestanden protokolliert. Neue kritische Fehler verhindern die Freigabe. Es werden keine Windows-Befehle ausgeführt und keine Einstellungen geändert.

### 1. Inhalte: Shortcuts und Ausführen-Befehle

Prüfe sämtliche sieben Shortcuts: `Win + L`, `Win + R`, `Win + E`, `Win + I`, `Win + D`, `Win + X`, `Strg + Umschalt + Esc`. Prüfe sämtliche sieben Befehle: `ncpa.cpl`, `sysdm.cpl`, `powercfg.cpl`, `compmgmt.msc`, `secpol.msc`, `devmgmt.msc`, `services.msc`.

**Bestanden:** Jede Karte/Erklärung ordnet die Bezeichnung dem passenden Zweck zu; kein Eintrag fehlt oder ist doppelt/falsch zugeordnet. Der Befehl für die Computerverwaltung lautet exakt `compmgmt.msc` (nicht `compmgmt.msd`). Bei `secpol.msc` steht ein verständlicher Hinweis, dass Verfügbarkeit/Verwaltung von Windows-Edition und Berechtigungen abhängen kann.  
**Nicht bestanden:** Ein Pflichtinhalt fehlt, die Bedeutung ist falsch oder der Editions-/Berechtigungshinweis zu `secpol.msc` fehlt bzw. suggeriert universelle Verfügbarkeit.

### 2. Lernkarten, Übung, Quiz und Wiederholung

Öffne Lernkarten, arbeite eine Alltagssituation im Übungsmodus durch und beantworte Quizfragen richtig und falsch. Prüfe Rückmeldung unmittelbar nach der Antwort und starte eine abgeschlossene Einheit erneut.

**Bestanden:** Karten zeigen verständliche Erklärungen; die Übung enthält eine nachvollziehbare Situation und eine klare Aufgabe; das Quiz bewertet Antworten und gibt direkt eine verständliche Rückmeldung; erneutes Üben/Beantworten ist ohne Versuchslimit möglich.  
**Nicht bestanden:** Ein Modus fehlt oder ist nicht erreichbar, Rückmeldung bleibt aus/falsch oder ein erneuter Versuch wird begrenzt/verhindert.

### 3. Trennung und Sicherheit

Prüfe anhand sichtbarer Beschriftung und Bedienung, ob Tastenkombinationen klar von Befehlen für „Ausführen“ unterschieden werden. Untersuche Aktionen/Links, die zu Befehlen gehören, ohne sie auszuführen.

**Bestanden:** Beide Kategorien sind klar benannt und visuell/inhaltlich unterscheidbar; kein Klick, Quiz, Kartenwechsel oder Link startet automatisch einen Windows-Befehl oder verändert Systemeinstellungen.  
**Nicht bestanden:** Kategorien sind verwechselt oder eine Aktion führt den Befehl automatisch aus bzw. löst eine Systemeinstellung aus.

### 4. Tastatur und sichtbarer Fokus

Nur mit Tastatur durch Katalog, Modul, Karten, Übung, Quiz, Rückmeldung und Wiederholung gehen. Tab/Shift+Tab, Enter und Leertaste passend einsetzen; Fokus jeweils sichtbar beobachten.

**Bestanden:** Alle interaktiven Elemente sind erreichbar und in nachvollziehbarer Reihenfolge bedienbar; Aktionen sind mit passenden Tasten auslösbar; der Fokus bleibt sichtbar; kein Fokusfang und kein nur per Maus erreichbarer Hauptschritt.  
**Nicht bestanden:** Ein Hauptablauf ist per Tastatur blockiert, Fokus geht verloren/fängt fest oder interaktive Elemente haben keinen sichtbaren Fokus.

### 5. Responsive Darstellung

Ansichten mindestens bei breiter Desktop-, Tablet- und schmaler mobiler Breite prüfen; insbesondere lange Befehle, Karten, Aufgaben, Rückmeldung und Bedienelemente ansehen.

**Bestanden:** Inhalte und Bedienelemente bleiben lesbar und erreichbar, überlappen nicht und erfordern keinen horizontalen Seiten-Scroll für den normalen Ablauf.  
**Nicht bestanden:** Überlappung, abgeschnittene wesentliche Inhalte oder nicht erreichbare Steuerung verhindert die Nutzung.

### 6. Navigation und Modulkatalog

Vom Start-/Modulkatalog in die Werkzeugkiste gehen, zwischen den Modulbereichen navigieren und über die sichtbare Rücksprungmöglichkeit zum Katalog zurückkehren. Prüfe den Diff/Arbeitsstand, ob ausschließlich die vereinbarte Integration und Werkzeugkiste betroffen sind.

**Bestanden:** Katalogeintrag ist auffindbar und korrekt beschriftet; Einstieg, Navigation und Rücksprung funktionieren; fremde Module sind durch die Änderung nicht verändert.  
**Nicht bestanden:** Einstieg oder Rücksprung fehlt/führt falsch, der Katalog weist falsche Daten aus oder der Diff enthält unbegründete Änderungen an fremden Modulen.

### 7. Plattform-Regression nach Integration

Die folgenden vorhandenen Node-Tests müssen nach der Integration laufen: `node tests/einheiten.test.js`, `node tests/startseite.test.js` sowie alle weiteren bestehenden `tests/*.test.js`-Dateien, die Navigation, Modulkatalog, Startseite oder gemeinsam genutzte Fortschritts-/Anzeigeabläufe betreffen. Bei Änderungen an gemeinsam genutzten Dateien ist die Regression auf alle bestehenden Node-Tests auszuweiten; keine Tests abschwächen oder auslassen. Browserprüfungen der Navigation/Tastatur bleiben zusätzlich erforderlich.

**Bestanden:** Alle einschlägigen Tests laufen erfolgreich; gegebenenfalls dokumentierte bekannte Altfehler sind klar vom neuen Diff getrennt.  
**Nicht bestanden:** Ein bisher nicht betroffener Test schlägt aufgrund der Werkzeugkisten-Änderung fehl oder eine Regression wird durch Entfernen/Abschwächen von Assertions verdeckt.

**Bekannter Altfehler, separat:** `node tests/branding-assets.test.js` wurde im angegebenen Worktree einmal ausgeführt und scheitert bereits an `module/lf3-abnahme.html: SVG favicon` (Assertion für relativen SVG-Favicon-Link; Fehlerzeile 11). Dieser vorhandene Fehler ist nicht als Werkzeugkistenfehler zu werten, solange der Diff weder diese Seite noch die geprüften Branding-Dateien/-Pfade verändert. Bei Berührung durch den Diff ist die Zuordnung neu zu prüfen; nicht pauschal ignorieren.

### 8. Freigaberegel

**Bestanden/Freigabe:** Kein neu eingeführter kritischer Fehler; sämtliche kritischen Hauptabläufe sind nutzbar und die einschlägige Regression ist bestanden.  
**Nicht bestanden/keine Freigabe:** Jeder neue kritische Fehler verhindert die Freigabe. Dazu zählen insbesondere ein blockierter Hauptablauf, falsche bzw. irreführende Pflichtinhalte, automatisches Ausführen von Befehlen/Systemänderungen sowie Daten-/Fortschrittsverlust, falls das Modul Fortschritt speichert. Befunde sind mit Ausgangslage, Schritten, erwartetem und beobachtetem Ergebnis sowie reproduzierbar/nicht reproduzierbar zu dokumentieren.

## Gelesene Testkonventionen und Grenzen

- `tests/einheiten.test.js`: Node `assert/strict`, liest JS/HTML/CSS und prüft Logik, Markup-Anforderungen, Navigationseinbindungen und Katalogdaten; direkter Aufruf mit Node.
- `tests/startseite.test.js`: Node-Assertionstest für Katalogdaten, Einstieg, verfügbare Dateien und Trennung typisierter Werkzeuge; direkter Aufruf mit Node.
- `tests/branding-assets.test.js`: assertions über HTML-Seiten und Asset-Bytegleichheit; einmaliger Lauf im aktuellen Worktree schlägt wie oben dokumentiert fehl.
- `tests/browser-keyboard-cdp.js`: echte CDP-Tastaturereignisse, Tab-Reihenfolge und sichtbarer Fokus; erwartet Chrome auf `:9223`, prüft derzeit vorhandene Seiten und ist kein Screenreader- oder Zoomtest. Nach Implementierung muss es, falls für das neue Modul angepasst/erweitert, explizit auch die Werkzeugkiste abdecken.
- Es wurde nur der bekannte Branding-Test ausgeführt; keine anderen Tests und keine Browserprüfung, da das Modul noch nicht existiert. Keine Projektdateien außer diesem Testplan wurden geändert.
