# RAID-Labor – Fortsetzungsplan für die nächste Entwicklungsrunde

03.11.2026. Planungsübergabe, keine implementierte Funktion und keine fachliche Abnahme.

## Startvoraussetzungen und Entscheidung

Phase 1 ist auf `feature/pc-explorer-grafik-2026-11-02` mit `21edc64b16ad12cd77f5e34d8815494d1c67df0c` geprüft und gepusht. Phase 2 ist auf `feature/windows-werkzeugkiste` mit `18ff990ae0b14b8c75100b8c38ea7191e3dd4b8c` geprüft und gepusht. Unabhängige GLaDOS-Berichte und ihre Grenzen liegen in den jeweiligen Branches.

Verbleibende Agentenkontingente sind nicht verlässlich auslesbar. Zusätzlich wurde Jarvis nach einer beobachteten unautorisierten kostenpflichtigen Providerumschaltung gestoppt; die Ersatzdelegation hatte keinen Projektzugriff. Daher wird diese Runde ohne RAID-Code abgeschlossen. Dieser dokumentierte Fortsetzungsplan ist die vom Commander ausdrücklich erlaubte Alternative, keine Behauptung einer fertigen Architektur oder Quellenprüfung.

## Ziel der nächsten Runde

Ein verständlicher, rein simulierender RAID-Konfigurator für RAID 0, 1, 5, 6, 10, 50 und 60. Lernende sollen Kapazität und Ausfälle erklären können, nicht nur eine Zahl ablesen. Keine Controllersteuerung, keine echten Datenträgerzugriffe und keine Aussagen über garantierte Datensicherheit.

Vor Arbeitsbeginn eigenen Feature-Branch und Worktree aus einem vom Commander bestätigten Integrationsstand bestimmen. Nicht stillschweigend den Werkzeug- oder PC-Branch als neue Gesamtbasis verwenden. `dev`, `main` und Deployment bleiben ohne ausdrückliche Freigabe unangetastet.

## Arbeitspakete und Rollen

1. **C-3PO – Bestand und Quellen:** vorhandene Storage-/RAID-Lektionen, Begriffe, Übungen und Tests auf Wiederverwendung prüfen. Belastbare Hersteller-/Controller- und Betriebssystemquellen für Level, Gruppengrößen, Größenmischung, Rebuild und Grenzen sammeln. Klassisches RAID von Storage Spaces, ZFS oder anderen flexiblen Technologien ausdrücklich trennen. Nicht aus deren Eigenschaften auf jeden RAID-Controller schließen.
2. **Terminus – Fach-/Architekturbrief:** anhand der Quellen ein klar benanntes vereinfachtes Modell festlegen. Regeln für Kapazität, Mindestgrößen, Gruppen, Datenträgermischung und Ausfallbewertung mit Gegenbeispielen dokumentieren. Offene Herstellergrenzen markieren, nicht als allgemeine Norm ausgeben. Fachreview vor Implementierung.
3. **Jarvis oder geeigneter Ersatz – Umsetzung:** nur bei nachweisbar verfügbarem autorisiertem Zugang und Projektzugriff. Zuerst reinen Rechenkern und Tests, dann bestehende Plattformkonventionen und zugängliche UI. Nach dem Vorfall keine erneute Jarvis-Delegation ohne geklärten Ausführungspfad. Keine bezahlten Fallbacks.
4. **GLaDOS – unabhängig prüfen:** Rechenfälle, Gruppen-Ausfälle, Mischgrößen, Eingabefehler, Tastatur, Beschriftungen und responsive Darstellung. Nicht nur vom Entwickler gemeldete Tests übernehmen.
5. **Terminus – Abschluss:** nur geprüfte Änderungen gezielt auf dem neuen Feature-Branch committen und pushen; Remote-Hash bestätigen, verbleibende Grenzen berichten.

## Architekturentwurf zur späteren Validierung

- Rechenkern ohne DOM, Netzwerk oder persistente Zustände. Eingabe: Level, Platten mit stabilen IDs und Kapazitäten, explizite Gruppenzuordnung, ausgefallene IDs, Modellannahmen.
- Ergebnis getrennt: gültig/ungültig mit Gründen, nutzbare Kapazität, ungenutzter Größenanteil, Gruppenstatus, rekonstruierbare bzw. verlorene Daten im Modell, Grenzen der Aussage. Kein irreführendes pauschales „sicher“.
- Gruppen sind bei 10/50/60 fachliche Daten, nicht bloße Dekoration. Ein Ausfallszenario muss konkrete Platten innerhalb konkreter Spiegel-/Paritätsgruppen benennen.
- Darstellung erklärt Striping, Spiegelung und Parität. Parität nicht als zusätzliche vollständige Kopie darstellen. Schematische Blöcke sind keine sektorgetreue Implementierung eines Controllers.
- Vollständige HTML-Tabelle und verständlicher Ergebnistext als Alternative zur Grafik. Native Auswahl, sichtbarer Fokus und bedienbare Ausfall-Schalter. Keine Information allein über Farbe.
- Kapazitäten eindeutig mit Einheit und Modellannahmen ausgeben; Dezimal-TB und Binär-TiB nicht vermischen. Dateisystem-, Metadaten-, Spare- und Controller-Overhead nicht stillschweigend als verfügbare Nutzdaten zählen.

## Fachliche Fragen vor Codeabschluss

- Unterschiedlich große Datenträger nicht grundsätzlich ablehnen. Für das gewählte klassische Modell den kleinsten verwendbaren Anteil und den ungenutzten Rest erklären; andere Technologien separat behandeln. Welche Kombination ein bestimmter Controller erlaubt, ist eine eigene Frage.
- Für RAID 1 Mehrfachspiegel nicht ohne Kennzeichnung auf genau zwei Platten beschränken. Für RAID 10 die konkrete Spiegelgruppenstruktur festlegen.
- RAID 50/60 brauchen mehrere Paritätsgruppen mit jeweils ausreichender Größe. Gesamtplattenzahl allein genügt nicht zur Beschreibung der Topologie.
- Ausfalltoleranz gruppenbezogen formulieren: gleich viele ausgefallene Platten können je nach Verteilung unterschiedliche Ergebnisse erzeugen. Bei einer verlorenen Untergruppe darf die Gesamt-Stripe-Struktur nicht als vollständig erhalten gemeldet werden.
- Rebuild, zusätzliche Lesefehler, gemeinsame Fehlerursachen, versehentliches Löschen und Schadsoftware begrenzen reale Sicherheit. **RAID ersetzt kein Backup.** Keine Haltbarkeitsgarantien aus einem Modell ableiten.

## Abnahmefälle für die spätere Spezifikation

Vor Implementierung erwartete Ergebnisse mit Quellen belegen; dieser Plan enthält bewusst noch keine freigegebenen Rechenformeln.

- Für jedes Level: gültige Mindestkonfiguration und eine ungültige Konfiguration darunter; Kapazitätsbeispiel mit identischen Platten.
- Gemischte Kapazitäten: nutzbarer und ungenutzter Anteil nachvollziehbar, kein pauschales Verbot.
- RAID 0: einzelner Plattenausfall; RAID 1: Ausfälle innerhalb der Spiegelmenge; RAID 5/6: unterhalb, an und über der jeweiligen Paritätsgrenze.
- RAID 10: zwei Ausfälle in verschiedenen Spiegelgruppen gegenüber zwei Ausfällen derselben Gruppe.
- RAID 50: zwei Ausfälle verteilt gegenüber zwei in einer Paritätsgruppe. RAID 60: gruppenweise zulässige gegenüber überschrittener Grenze. Uneinheitliche Gruppengrößen nur bei explizit erklärtem Modell.
- Keine, negative, nicht endliche und mehrdeutige Kapazitätseingaben; doppelte IDs, unzugeordnete Platten, widersprüchliche Gruppen, zurückgenommene Ausfälle.
- UI bei 1440, 768 und 320 CSS-px; Tastatur, sichtbarer Fokus, Labels, nichtfarbliche Statusanzeige und HTML-Alternative; kein horizontaler Seitenüberlauf.
- Bestehende Plattformnavigation und Storage-Lektionen unverändert funktionsfähig; keine echte Befehlsausführung.

## Nächster konkreter Schritt

Ausführungspfad und Projektzugriff für die Codekraft klären, dann C-3PO mit Bestands-/Quellenmatrix und Terminus mit einem fachlich reviewbaren Modellbrief beauftragen. Erst danach Formeln implementieren. Bis dahin bleibt dieser Branch ein Werkzeuglabor-Teststand; kein RAID-Menüpunkt oder unfertiger Konfigurator wird eingebaut.
