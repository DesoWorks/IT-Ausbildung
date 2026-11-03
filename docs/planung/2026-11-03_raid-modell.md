# RAID-Lernlabor: Modell und Umsetzung

Feature-Basis: bestätigter Werkzeuglabor-Stand 8e06070. Separater Worktree IT-Ausbildung-raid, Branch feature/raid-lernlabor. Keine Integration nach dev/main, keine Bereitstellung. Windows-Erweiterungen werden getrennt abgeschlossen.

## Festgelegtes Lehrmodell

Klassisches Array mit global einheitlicher Mitgliedskapazität = kleinste Laufwerkskapazität. Gemischte Größen sind erlaubt, der Rest wird als ungenutzt ausgewiesen. Das ist eine bewusste Vereinfachung: manche Implementierungen nutzen zunächst pro Gruppe unterschiedliche Größen und begrenzen dann den darüberliegenden Stripe. Flexible Speicherpools sind keine Eigenschaft jedes RAID-Controllers.

- RAID 0: mindestens 2, Striping ohne Redundanz.
- RAID 1: mindestens 2, ausdrücklich N-Wege-Vollspiegel. Nutzkapazität genau ein Mitglied; N-1 Ausfälle möglich, sofern eine vollständige Kopie bleibt.
- RAID 5/6: mindestens 3/4, ein/zwei Paritätsäquivalente je Stripe.
- RAID 10: mindestens zwei explizite Zweier-Spiegelgruppen, darüber Striping.
- RAID 50/60: mindestens zwei gleich große Gruppen mit mindestens 3/4 Mitgliedern. Jede Untergruppe ist RAID 5/6. Übergreifendes Striping benötigt jede Gruppe.
- Mindestanzahlen sind Modellregeln, keine pauschalen Aussagen über alle Controller.
- Kapazitäten in dezimalen TB. Rohkapazität = Summe. Nutzkapazität = Datenmitglieder × kleinste Kapazität. Overhead = Spiegel-/Paritätsmitglieder × kleinste Kapazität. Ungenutzt = Rohkapazität minus ausgerichtete Mitgliedskapazität. Die drei Anteile summieren sich zur Rohkapazität.
- Ausfälle verändern nicht die konfigurierte logische Nutzkapazität; Zustand zeigt ihre Verfügbarkeit. Eine überschrittene Gruppengrenze bedeutet Verlust der vollständigen Rekonstruierbarkeit, nicht dass garantiert jedes Byte vernichtet ist.
- Rebuild ist nicht sofortige Heilung. Zusätzliche Lesefehler, Controllerfehler, Metadaten, Spares, Dateisystemkosten, Löschung, Malware und gemeinsame Ausfallursachen sind nicht simuliert. RAID ersetzt kein Backup.

## Darstellung

Bestehende Plattformfarben und Segoe-UI-Schrift: Hintergrund #f4f7fb, Fläche #ffffff, Text #1b2430, Akzent #1d5fb4, Warnung #8a4b00, Fehler #b4251d. Vorhandene CSS-Variablen statt neuer visueller Identität. Links ausgerichtete Konfiguration, darunter Ergebnisse und echte Laufwerksgruppen; farbige Blöcke immer zusätzlich mit D/M/P/Q beschriftet. Mobile: dieselben Elemente untereinander. Keine dekorative Dashboard-Kennzahlenwand.

Rechenkern ohne DOM/Netzwerk; automatisierte Rechen- und Fehlerkombinationstests vor der UI. UI verwendet ausschließlich diesen Kern. Schreibdurchlauf manuell schrittweise, keine automatische Animation. RAID5-Parität rotiert; RAID6 zeigt P und Q als unterschiedliche Prüfwerte, nicht zwei Datenkopien. Blockbild ist ein Schema, kein realer Controller-Algorithmus.

## Phasen und Nachweis

1. Windows-Profile mit unveränderten IDs des Altbestands; Fachprüfung und GLaDOS.
2. Rechenkern und vollständige Ausfallkombinationen der Mindesttopologien; unabhängiger Review.
3. Native Formulare, Live-Neuberechnung, Laufwerke hinzufügen/entfernen, Gruppenwahl, HTML-Alternative, mobile Sichtprüfung.
4. Ausfall-Schalter, expliziter simulierte-Rebuild-Schritt, Übungen; nur bei tragfähiger Abnahme.

Einziger Git-Schreiber Terminus. C3PO nur Quellenbericht, GLaDOS nur QA-Berichte. Kein Jarvis-Aufruf wegen ausdrücklichem Kontingentausschluss. Kontingente unbekannt, kein bezahlter Ersatzprovider. Screenreader/echte Touchgeräte nur als getestet melden, wenn tatsächlich verfügbar.
