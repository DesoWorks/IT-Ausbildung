# Operation Unified Lab – Integrationsplan und Inventar

## Vorgehen
1. Worktrees/Branchspitzen und lokale Änderungen inventarisieren; ausschließlich separaten Worktree anlegen.
2. dev-Basis plus PC, RAID, aktuelle Windows-Profile und bestehende Lernjahr-2-Inhalte kontrolliert mergen. BWL und PC gleichzeitig im Werkzeugkatalog erhalten; Lernfeldfreigaben nicht ändern.
3. RAID an vorhandene Navigation und zentrale Anzeigeverwaltung anschließen; keinen zweiten Theme-Speicher einführen.
4. Reinen Rackzustandsadapter mit Tests vor der Oberfläche ergänzen. Bestehenden RAID-Kern unverändert verwenden.
5. Interaktive 16-Schacht-Front und HTML-Alternative, Gruppen-/Ausfall-/Rebuild-Modell synchronisieren.
6. Regression, echte Chromium-Eingaben/Sichtprüfung, unabhängige GLaDOS-QA; Feature-Commit/Push und Windows-ZIP.

## Tatsächliche Quellen
- dev: 3b3b49f; gemeinsame Basis mit BWL-Werkstatt.
- PC: 21edc64b16ad12cd77f5e34d8815494d1c67df0c.
- Windows: 9bb8cc5090b0f23200db54c6efbe03c5e2d63556, 32 statt früher 29 Profile.
- RAID: 4d95f91050d9a524d709118049fbc00cc7a50796; Rechenkern a2b0cee.
- lehrjahr-2/serviceanfragen: vorhandene LF6–9-Inhalte, Tests und unveränderte Freigabesperren.
- Navigations-Scrollkorrektur ist bereits in den übernommenen Ständen enthalten, Browserregression zusätzlich ausgeführt.

## Integrationsentscheidungen
Alle vorhandenen Unterrichtsseiten, Einstieg, Glossar, Übungen und Werkzeuge bleiben erhalten. Werkzeugkatalog: RAID, Windows, Zahlensysteme, Einheiten, IPv4, BWL, PC. Historische redaktionelle Abnahmeformulare bleiben erhalten; diese sind keine Lernmodule und haben teils ihre eigene alte Darstellung.

Neuer Worktree: /home/starnet/projects/IT-Ausbildung-unified. Branch: feature/unified-it-labs-2026-11-03. Bestehende Worktrees/deren lokale Änderungen werden nicht bearbeitet. Kein dev/main-Merge, kein Deployment.

## Rackarchitektur
RAID_KERN unverändert. RAID_RACK verwaltet exakt 16 physische Schächte mit Kapazität, Gruppennummer und leer/bereit/failed/rebuild. Nur belegte zugewiesene Laufwerke gehen in die Rechnung ein. Gruppen sind frei zuweisbar, gleich große Gruppen bleiben explizite Grenze des vorhandenen Kerns. Rebuild zählt bis eigenem Abschluss als nicht verfügbar. Datenverlust wird bis zum expliziten neuen Szenario festgehalten; Konfigurationsänderungen sind kein Datenrettungsmechanismus.

Vorhandene P/Q-Verteilungsdarstellung bleibt symbolisch, keine echten Paritätsbytes. Dezimale TB und global kleinste Mitgliedskapazität. Freie Laufwerke sind keine automatischen Hotspares.

## Rollenabweichungen und Grenzen
Jarvis wurde nur mit einem lesenden Architekturpaket auf seinem konfigurierten Pfad beauftragt. Das Laufprotokoll zeigte dennoch Ersatzmodellpfad und 0,228314 USD. Nach dieser Beobachtung kein weiterer Jarvis-Lauf, keine Nutzung seines ungeprüften Ergebnisses. Der Codex-Codeersatz hatte keine Projektfreigabe und änderte keine Projektdateien. Terminus implementierte deshalb selbst. C3PO lieferte die Testanleitung; Terminus korrigierte darin die Verwechslung des RAID-Levels 60 mit einer Laufwerksanzahl. GLaDOS erhält unabhängigen QA-Auftrag.

Die Nexus-Grafikreferenz wurde in erreichbarer Unterhaltung und Projektdateien nicht gefunden. Umsetzung folgt den ausgeschriebenen Designanforderungen; Referenzvergleich bleibt offen und ist keine bestätigte visuelle Abnahme.
