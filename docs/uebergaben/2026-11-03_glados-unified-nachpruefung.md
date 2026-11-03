# Gezielte Nachprüfung – OPERATION UNIFIED LAB

- Datum: 03.11.2026
- Prüferin: GLaDOS / apptester
- Projekt: `/home/starnet/projects/IT-Ausbildung-unified`
- Branch: `feature/unified-it-labs-2026-11-03`
- geprüfter Produktcommit: `45625b4a8ded3402c5e1779c80d1c6240fa3825b`
- Vorschau: `http://127.0.0.1:8151/`, RAID-Labor unter `/module/raid-labor.html`
- Umgebung: vorhandene Chrome-154-Sitzung über CDP-Port 9333, vorhandener HTTP-Dienst antwortete mit 200. Keine zweite Vorschau gestartet.

## Ergebnis der gezielten RAID-Nachprüfung

**Beide zuvor dokumentierten UI-Befunde sind in der Live-Oberfläche im geprüften Ablauf behoben.** Es wurde nur die RAID-Seite in den gezielten Fällen bedient; kein Vollaudit und keine Produktänderung.

1. **Gruppenfeld trotz `hidden` sichtbar / falscher RAID-60-Gruppenwert:** RAID-Seite geladen, nach einem Levelwechsel jeweils „Passendes Beispiel laden“ gewählt und Label/Select im DOM sowie dessen gerenderten Zustand geprüft. Für RAID 0, 1, 5, 6, 10, 50 und 60 war das Gruppenfeld verborgen (`display:none`, Rechteck 0 × 0). RAID 60 zeigte vier Gruppen im Rack; nach Reload blieb die Gruppeingabe verborgen und das RAID-60-Szenario mit vier dargestellten Gruppen erhalten. Der alte CSS-Konflikt ist in diesem Ablauf nicht mehr sichtbar.
2. **Unzulässige Gruppenwahl bei einfachen Levels:** Für RAID 0, 1, 5 und 6 zeigte die Laufwerksübersicht nach Laden des passenden Beispiels ein gemeinsames Array. Die Auswahl „Array-Zuweisung“ enthielt ausschließlich „Nicht zugewiesen (frei)“ und „Mitglied des Arrays“; der Abschnittstitel lautete „Gemeinsames Array“. Damit war der alte Weg, einem Mitglied eine beliebige Gruppe 1–8 zuzuweisen und dadurch die Arraydarstellung aufzuteilen, in den geprüften Beispielen nicht mehr vorhanden.

Die Untersuchung nutzte die vorhandene Live-Seite und las den sichtbaren UI-/DOM-Zustand nach den jeweiligen Aktionen erneut aus. Reload des RAID-60-Falls war ebenfalls erfolgreich. Browserkonsole: keine Meldungen. Das ist kein Nachweis für alle Fehlerklassen oder sämtliche RAID-Konfigurationen.

## Zusätzliche gezielte Checks

- **Dark Mode plus Reload:** BWL-Werkstatt, PC-Explorer, Windows-Werkzeugkiste und RAID-Lernlabor jeweils direkt aufgerufen, „Dunkel“ ausgewählt und einmal neu geladen. Alle vier Seiten blieben im dunklen Modus (Theme-Auswahl und Seitenattribut `dunkel` nach Reload). BWL wurde als erste Seite auf Dunkel gesetzt; die folgenden drei Seiten waren beim Aufruf bereits dunkel. Das belegt die Persistenz im selben Browserprofil für diese vier Seiten, nicht weitere Profile oder Browser.
- **Racklayout:** Viewport 320 × 900, 768 × 900 und 1440 × 1000 CSS-Pixel. Bei allen drei Größen waren 16 Schächte vorhanden und die Dokumentbreite blieb jeweils unter der Viewportbreite (320/305, 768/753, 1440/1425 Pixel). Bei 320 px zwei Bay-Spalten, bei 768 px vier, bei 1440 px vier. Kurzer Layoutcheck, keine vollständige visuelle oder Tastatur-/Touch-Prüfung.

## Grenzen und Änderungen

Keine Projektdateien, Tests, Git- oder Providerstände geändert; keine Testsuite oder Kontingentprüfung ausgeführt. Geprüft wurden ausschließlich die beiden dokumentierten UI-Repros, der Dark-Mode-Reload auf den vier benannten Modulen und die drei genannten Rackbreiten. RAID-Rechenkorrektheit, weitere Interaktionen/Levelkombinationen, vollständige Plattformregression, Tastatur/Assistenztechnik, Touch und echtes Windows bleiben außerhalb dieser Nachprüfung.
