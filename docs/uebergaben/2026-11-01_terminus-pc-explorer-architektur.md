# PC-Explorer: Erweiterungsspezifikation für Jarvis

Stand: 01.11.2026. Grundlage: tatsächlich gelesene Dateien `js/pc-explorer.js`, `module/pc-explorer.html`, `css/pc-explorer.css`, `tests/pc-explorer.test.js`. Dies ist eine Spezifikation, keine Implementierung oder fachliche Freigabe.

## Ziel und Reihenfolge

Auszubildende können Desktop- und Notebook-Komponenten in derselben offline nutzbaren, schematischen Oberfläche auswählen und Aufgabe, Einbauort, Zusammenarbeit, Bauformen und ein Praxisbeispiel lesen. Zuerst Desktop vervollständigen, danach Notebook ergänzen. Server bleibt ausschließlich ein dokumentierter Plan.

Bestehenden Code erweitern, nicht ersetzen. Die bisherigen IDs `cpu`, `cool`, `ram`, `gpu`, `ssd`, `hdd`, `psu`, `board`, `pga`, `lga`, `bga`, `atx`, `microatx`, `miniitx` bleiben erhalten. Keine neue Illustration oder Bibliothek.

## Dateizuständigkeiten

- Jarvis: ausschließlich Implementierung in `js/pc-explorer.js`, `module/pc-explorer.html`, `css/pc-explorer.css`; vorhandene Testannahmen in `tests/pc-explorer.test.js` nach Abstimmung mit GLaDOS aktualisieren. Kein gleichzeitiges Schreiben an der Testdatei: GLaDOS erhält sie erst nach Jarvis' Übergabe für Ergänzungen.
- Terminus: dieses Dokument; keine Änderungen an Implementierung oder Tests.
- GLaDOS: anschließend Daten-, DOM-, Tastatur-, Browser- und Offlineprüfung. Automatisierte Datenprüfung ersetzt weder Browserprüfung noch Quellenlektüre.
- Quellenmetadaten gehören in das vorhandene `QUELLEN`-Register. Keine zweite Inhalts- oder Rendererimplementierung pro Geräteart.

## Datenvertrag

Die vorhandene CommonJS-/Browser-API und die Ausführung ohne `document` erhalten. `DATEN` erhält zusätzlich `ansichten`:

```js
var ANSICHTEN = {
  desktop: {
    name: "Desktop-PC",
    teile: TEILE,
    sockel: SOCKEL,
    formen: FORMEN
  },
  notebook: {
    name: "Notebook",
    teile: NOTEBOOK_TEILE,
    sockel: [],
    formen: []
  },
  server: null
};
var DATEN = {
  ansichten: ANSICHTEN,
  teile: TEILE, sockel: SOCKEL, formen: FORMEN,
  quellen: QUELLEN
};
```

Die bisherigen Top-Level-Arrays bleiben als Referenzen auf Desktop-Daten erhalten; keine Kopien. `server: null` ist ausschließlich reservierter Daten-Slot, kein auswählbarer Zustand. Ansicht und Bauteil-ID bilden gemeinsam die Identität; innerhalb jeder Ansicht sind IDs eindeutig. Eine ID wie `ram` darf in beiden Ansichten vorkommen.

Jeder Eintrag in `teile`, `sockel` und `formen` hat `id`, `name`, `glossar`, `funktion`, `ort`, `zusammen`, `merk`, `fakt`, `q` sowie neu **`bauformen` und `praxis`**. Die Textfelder sind Strings; `fakt` darf leer sein, die übrigen Erklärfelder sind aussagekräftig und nicht leer. Fehlendes `fakt` bestehender Sockel-/Formeinträge auf `""` normalisieren. `q` ist ein Array gültiger Quellen-IDs. `glossar` darf leer sein und garantiert niemals, dass ein Glossareintrag existiert. `layout` ist nur für `teile` Pflicht: `[x, y, breite, hoehe]` in schematischen SVG-Koordinaten, keine realen Bauteilmaße.

## Darstellung und Zustand

- `el`, `svgEl`, `finde`, `naechsterIndex`, `baueGruppe` und `zeigeDetail` wiederverwenden. `zeigeDetail` ergänzt die Beschriftungen „Bauformen und Unterschiede“ sowie „Praxisbeispiel“. Funktion/Ort/Zusammenarbeit und Merksatz bleiben kurz; Fakt und ausführliche Quellen können in einem nativen `details`-Element stehen.
- Die bisherige SVG-Erzeugung aus `start` in eine wiederverwendbare Zeichenfunktion auslagern, die dieselben `layout`-Daten für jede Ansicht verwendet. Kein gesonderter Notebook-Renderer.
- Aktuelle Lücke: `board` wird nur als Hintergrund gezeichnet und hat weder `.pe-teil` noch Auswahl-Listener. Mainboard künftig wie alle Komponenten mit `data-id`, Klickauswahl und aktiver Markierung versehen. Gehäuse als Hintergrund zuerst, Mainboard danach, übrige Komponenten darüber zeichnen. Ausgewählte Hintergrundkonturen müssen sichtbar bleiben; verdeckte Flächen dürfen andere Bauteile nicht abfangen.
- Im HTML eine beschriftete Gruppe mit nativen Buttons „Desktop“ und „Notebook“ ergänzen, z. B. `pe-ansichten`. Keine Tabrollen ohne Tab-Implementierung. Genau ein Button hat `aria-pressed="true"`; beide sind per Tab erreichbar, Enter/Leertaste aktivieren nativ. `:focus-visible` gilt auch hier.
- Startzustand: Desktop, `cpu` ausgewählt. Beim Wechsel SVG, Komponentenliste und Detail leeren und aus der gewählten Ansicht neu aufbauen; danach `cpu` der neuen Ansicht auswählen. Keine alten Eventhandler oder doppelten Elemente. Der Fokus bleibt auf dem auslösenden Ansichtsbutton. Keine automatische Fokussierung des Live-Bereichs.
- Titel, Gruppenbeschriftung und sichtbare Geräteüberschrift zur Ansicht passend aktualisieren. CPU-Bauformen- und Mainboard-Formfaktor-Abschnitte nur bei nicht leeren jeweiligen Arrays anzeigen (`hidden` am gesamten Abschnitt), im Notebook also ausblenden. Notebook-Bauformen stehen in den betreffenden Komponentendetails.
- `baueGruppe` behält Roving-Tabindex: Pfeile/Home/End bewegen den Fokus, erst Enter/Leertaste oder Klick ändern die Auswahl. SVG-Klick synchronisiert Auswahl, `aria-pressed`, Roving-Tabindex und Detail. SVG bleibt `aria-hidden`, nicht fokussierbar; die vollständige gleichwertige Bedienung erfolgt über die Liste.
- Quellenliste einmal aus `QUELLEN` aufbauen, nicht bei jedem Wechsel vervielfachen. Keine Laufzeitabfragen, externen Bilder, Fonts oder Daten. Quellenlinks sind optionale Nachweise; alle Lerntexte sind lokal verfügbar.
- Glossarlink nur bei nachgewiesen vorhandenem Begriff rendern. Jarvis liest dazu die tatsächliche Struktur und exportierte Schnittstelle von `js/glossar-daten.js` ausschließlich lesend. Exakte vorhandene Begriffe verwenden, sonst Link weglassen; fehlt die Glossardaten-Schnittstelle, ebenfalls weglassen, ohne Absturz. Keine erfundene globale Variable voraussetzen. Laut Lead fehlen CPU, RAM, GPU, SSD, HDD, Netzteil und Mainboard im aktuellen Glossar.
- Vorhandenes responsives Raster und Farbvariablen erhalten. Beschriftungen dürfen bei schmaler Ansicht weder überlappen noch horizontalen Seitenüberlauf verursachen. Kurze SVG-Labels dürfen vom ausführlichen Listennamen abweichen. Keine Animationen.

## Mindestinhalt

### Desktop

Alle bisherigen Bauteile erhalten, neu `gehaeuse` für Gehäuse und wichtige Anschlüsse. Hier externe Anschlüsse (z. B. USB, Audio, Netzwerk, Bildausgabe) von internen Anschlüssen unterscheiden; eine Buchsenform garantiert keine bestimmte Funktion. Systemintegrationsbeispiele konkret, etwa Anschlussprüfung, Aufrüstung oder Fehlersuche.

CPU/Kühlung getrennt erklären; PGA, LGA und BGA erhalten. BGA nicht als absolut „unmöglich zu tauschen“ bezeichnen, sondern nicht regulär ohne Löt-/Spezialarbeiten austauschbar. ATX, microATX, Mini-ITX erhalten; mechanische Passform nicht mit vollständiger Kompatibilität gleichsetzen. DIMM/SO-DIMM bei RAM erklären. SSD/HDD: Bauform, SATA-Anbindung und NVMe-Protokoll über PCIe unterscheiden; M.2 ist nicht automatisch NVMe. Keine pauschalen Sockel-, RAM-, Anschluss- oder Gehäuse-Kompatibilitätszusagen.

### Notebook

Konkrete IDs: `board`, `cpu`, `cool`, `ram`, `gpu`, `ssd`, `akku`, `netzteil`, `gehaeuse`. Modellneutrales Schema, keine Zusicherung, dass ein reales Notebook sämtliche gezeigten Varianten gleichzeitig besitzt. `netzteil` bezeichnet hier das externe Netzteil, `akku` den internen Energiespeicher.

- Mainboard/CPU/Grafik: häufig integrierte bzw. verlötete Teile, separate Grafik nur modellabhängig; keinen austauschbaren Desktop-GPU-Steckplatz vortäuschen.
- Kühlung: gemeinsam genutzter begrenzter Raum, Lüfter, Kühlkörper und Wärmeleitung; freie Lüftungsöffnungen und Luftweg erklären.
- RAM: DIMM als Desktop-Vergleich, SO-DIMM, verlöteter RAM und CAMM2 unterscheiden; Austauschbarkeit und Aufrüstbarkeit nur anhand des konkreten Geräts und Servicehandbuchs beurteilen.
- CAMM2 ausdrücklich mit JEDEC **JESD318** und belastbarer Quelle verknüpfen. DDR5- und LPDDR5/5X-Ausführungen nicht als beliebig austauschbar darstellen. Vorhandene Quelle `camm2` ist ein Ausgangspunkt, kein Beleg für ungeprüfte zusätzliche Aussagen.
- SSD: M.2/SATA/NVMe differenzieren; Bauform und unterstützte Anbindung geräteabhängig. HDD nicht als allgemeine Notebook-Pflichtausstattung behaupten.
- Akku/externes Netzteil und Gehäuse/Anschlüsse: Energieversorgung, sichere Wartung und eingeschränkter Platz; USB-C nicht pauschal als Lade- oder Bildanschluss bezeichnen.

### Quellenregel und Serverplan

Jede verwendete Quellen-ID muss auf existierende Metadaten mit Titel, URL und Abrufdatum zeigen. Maße und andere Zahlen mit Einheit nur mit `q` und geprüftem Nachweis der konkreten Aussage; keine erfundenen Maße. Vorhandene Maß-/Jahresangaben nicht unbelegt erweitern. Das bloße Vorhandensein einer Quelle beweist ihre Aussage nicht. Fachliche Quellenprüfung separat dokumentieren.

Späterer Server-Slot: eine konkret benannte Dell-PowerEdge-Rackserver-Konfiguration anhand des zugehörigen Herstellerhandbuchs wählen. Erst damit Sockelzahl, tatsächlich unterstützte CPU-Bestückung, ECC-Typen, RAID-Optionen und Backplane/Laufwerkseinschübe, Netzteilredundanz, Netzwerkanschlüsse, iDRAC sowie Lüfterbestückung und Luftstrom festlegen. Nicht alle PowerEdge-Systeme besitzen dieselben Fähigkeiten. Server-Implementierung, Server-Button und leerer Server-Platzhalter sind in diesem Lauf ausgeschlossen.

## Abnahme und Prüfungen

1. `node tests/pc-explorer.test.js` besteht nach gezielter Erweiterung: Desktop hat die bisherigen IDs plus `gehaeuse`; Notebook hat die oben genannten IDs; `ansichten.server === null`; Desktop-Aliase zeigen auf dieselben Arrays. Keine pauschale Abschwächung bestehender Tests.
2. Alle Einträge beider Ansichten und Desktop-Untergruppen haben die Pflichtfelder, gültige Quellen-IDs und eindeutige IDs pro Liste. Bauteile haben endliche, positive und im SVG sichtbare Layouts. `fakt` mit Inhalt hat mindestens eine Quelle. Neue Felder in die Inhalts- und Maßprüfungen aufnehmen; gemessene Werte benötigen tatsächlichen Quellenabgleich, nicht nur Regex.
3. Tastaturlogik deckt Pfeile in beide Richtungen, Rundlauf, Home/End, leere und ein-elementige Listen sowie unerkannte Tasten ab. CommonJS-Import funktioniert ohne DOM.
4. Browser: Nach Start ist Desktop/CPU aktiv. Wiederholter Wechsel Desktop → Notebook → Desktop zeigt passende Überschriften, genau eine ausgewählte Komponente, keine veralteten Details, keine Duplikate und nur die passenden Zusatzabschnitte. Kein Server-Button.
5. Browser nur mit Tastatur: Ansichten schalten, sämtliche Komponenten und Desktop-Untergruppen erreichen; Pfeile/Home/End bewegen, Enter/Leertaste wählen; Fokus sichtbar, keine Falle, keine unerwarteten Fokuswechsel. Aktiver Zustand wird auch über `aria-pressed` vermittelt.
6. Browser mit Maus: Jedes Bauteil einschließlich Mainboard und Gehäuse in Liste und sichtbarer Zeichnung wählbar; Markierung, Liste und Detail stimmen überein. Alle Namen, Aufgaben, Einbauorte, Zusammenarbeit, Bauformen und Praxisbeispiele lesbar.
7. Glossarprüfung: Tatsächlich vorhandener Begriff erzeugt gültigen Link; fehlender Begriff oder fehlende Glossardaten erzeugen keinen Link und keinen Fehler. Externe Quellen sind keine Voraussetzung für Auswahl oder Details.
8. Browser schmal und breit sowie Hell/Dunkel/Kontrast prüfen: keine überlappenden Labels, kein horizontaler Seitenüberlauf, sichtbarer Fokus. Offline mit blockierten externen Anfragen bleiben beide Ansichten einschließlich aller Details bedienbar; keine neuen Konsolenfehler. Nicht durchgeführte Browser-/Offlineprüfungen ausdrücklich als ungeprüft berichten.
9. `git diff --check` prüfen; Abschlussdiff auf erlaubte Dateien begrenzen. Bestehende Testprüfungen auf Nichtintegration in Katalog/Startseite erhalten. Diese Spezifikation selbst ändert keine Tests und behauptet keinen Testlauf.

## Unveränderliche Grenzen und Übergabe

Kein Push, Merge, Rebase, Branchwechsel oder Deployment. Nur `feature/pc-explorer-2026-11-01` im Worktree `/home/starnet/projects/IT-Ausbildung-pc`; keine anderen Worktrees verändern. Keine Änderung an `index.html`, `js/module-daten.js`, `js/glossar-daten.js`, den fünf bestehenden Werkzeugen, gemeinsamen Styles, Navigation oder Stationsinfrastruktur. Bestehende fremde Änderungen nicht überschreiben. Lokale Commits sind erlaubt, jedoch nur durch den von Rick bestimmten Commit-Verantwortlichen; Terminus erstellt hier keinen Commit.

Keine offenen Architekturentscheidungen für die Umsetzung. Quellenprüfung und echte Browserabnahme bleiben auszuführende Arbeit von Jarvis/GLaDOS, keine vorweggenommene Freigabe. Übergabe nennt geänderte Dateien, tatsächliche Testergebnisse, Quellenstatus, Einschränkungen, gegebenenfalls Vorschauadresse sowie Branch/Commit.
