# GLaDOS – unabhängige QA PC-Explorer: ATX und rückseitige I/O

**Datum:** 2026-11-03  
**Prüfobjekt:** `http://127.0.0.1:8143/module/pc-explorer.html`  
**Projekt:** `/home/starnet/projects/IT-Ausbildung-pc`  
**Branch/HEAD zum Prüfstart:** `feature/pc-explorer-grafik-2026-11-02` / `8b7177485c94b919d65281afe7cd7e7f41ffe4d7`  
**Prüfumfang:** Grafikphase, fünf Ansichten, alle 49 Einträge, Rückseiten-I/O, Tastatur- und Desktop-/Notebook-Regression. Keine Produktions- oder fachliche Freigabe.

## Kurzurteil

**Im geprüften Umfang keine reproduzierbaren Bedienfehler festgestellt.** Die fünf Ansichten und alle 49 Listeneinträge (9 Desktop + 9 Notebook + 13 Rückseite + 15 Mainboard + 3 ältere Anschlüsse) ließen sich bedienen und zeigten eine Erklärung. Jede Grafikmarkierung ließ sich auswählen. Die Platine rendert mit 305 × 381,25 CSS-Pixeln, entsprechend 244 mm Breite × 305 mm Höhe bei 1,25 px/mm. Bei 320 px Viewport gibt es keinen horizontalen Dokumentüberlauf. Die Grafikbeschriftung ist dort nicht sinnvoll lesbar; der Hinweis empfiehlt korrekt die Liste.

## Umgebung und Belege

- Lokaler HTTP-Stand `127.0.0.1:8143`, Chrome Headless 154.0.8037.97 mit frischem QA-Profil `/tmp/glados-pc-qa-20261103`, eigenem Port 9344. CDP-Netzwerkcache deaktiviert. Terminus-Chrome auf 9237 nicht berührt; HTTP-Server 8143 blieb bestehen.
- Rückseiten-Screenshot tatsächlich angesehen: USB-A, USB-C, RJ45, Audio, HDMI, DisplayPort, PS/2 und WLAN als unterschiedliche Formen; Grafikkarten-Ausgänge visuell separat; keine überkreuzenden Linien. USB-Standards sind Plaketten und keine Buchsen.
- Mainboard-Mobile-Screenshot (320 px) tatsächlich angesehen: kein seitlicher Überlauf. Legende/nummerierte Marken sind ausgeblendet; die Platine ist stark verkleinert. Maß- und Dekorationstexte sind hier keine brauchbare Detailbeschriftung. Die Liste bleibt verfügbar; der Bildhinweis empfiehlt sie.
- Vollständige Screenshots tatsächlich erstellt: `/tmp/glados-atx-desktop.png` (1425 × 3712), `/tmp/glados-atx-mobile.png` (320 × 8606), `/tmp/glados-back-io.png` (1425 × 3563). Keine Screenshotdateien ins Projekt übernommen.
- Während der erfassten Browserläufe keine JavaScript-Ausnahme beobachtet.

## Interaktionen

1. **Desktop**, **Notebook**, **Rückseite**, **Mainboard**, **Ältere Anschlüsse** geöffnet. Listen-/SVG-Anzahlen stimmen: 9/9, 9/9, 13/13, 15/15, 3/3.
2. Alle 49 Listeneinträge einzeln gewählt: Erklärung vorhanden. Jedes Element hat eine zugehörige Grafikmarkierung; Klick darauf aktiviert die Markierung.
3. Tastatur im Browser: `ArrowDown` wechselt Auswahl auf Kühlung, `End` auf Gehäuse/Anschlüsse, `Home` auf Prozessor, `Space` aktiviert die fokussierte Auswahl. Unit-Tests umfassen zusätzlich `ArrowLeft` und Indexrundlauf. Nicht jede Pfeiltaste wurde in diesem Browserlauf einzeln ausgelöst.
4. Kühlung Desktop: Klick setzt `aria-pressed=true` und Klasse `pe-kuehler-offen`, zweiter Klick nimmt beides zurück. Notebook: Schaltfläche sichtbar. Ihr Verhalten wurde dort nicht mit derselben Tiefe visuell geprüft.
5. PGA, LGA und BGA: Auswahleinträge und Foto-Alttexte im DOM vorhanden. Die externen Bildpixel wurden im Headless-Browser nicht sichtbar bestätigt (Lazy Loading/Headless-Netzwerkdarstellung). Sichtbare Fotodarstellung daher **nicht visuell verifiziert**; vorhandene Tests prüfen Dateien, Hashes, Urheber und Lizenztext statisch.
6. Reload ohne Hash: zurück auf Desktop mit 9 Einträgen. Kein hashbasierter Status im aktuellen Verhalten; daraus folgt keine Hash-Persistenzbehauptung.
7. 320 px: keine Dokumentbreite jenseits des Viewports in den Ansichten; Listenauswahl erzeugt Erklärung.

## Grafik-/Inhaltsbeobachtungen

- `getBBox()` der Platine: x=60, y=48, 305 × 381,25 px. Das Verhältnis entspricht 244:305 mm. I/O links, CPU oben, RAM vertikal, PCIe-Slots horizontal im unteren Bereich. Plausible schematische Positionen, keine normierte Herstellerzeichnung.
- 15 Teile und 15 nummerierte Marken/Legendenzeilen. Liste und Zeichnung synchronisieren Auswahl. Keine visuell verdeckenden oder überlappenden Markierungen festgestellt.
- Rückseitenformen unterscheidbar, darunter drei farbige Klinkenöffnungen und zwei PS/2-Buchsen. Erklärungstexte ordnen Audio-/PS2-Farben als Herstellerbeispiel/Konvention ein, nicht als universelle Norm. USB-Zungenfarbe wird nicht als verlässlicher Standardnachweis dargestellt. Das bestätigt Darstellung/Formulierung, nicht normative Fachrichtigkeit sämtlicher Quellen.
- Desktop/Notebook: Wechsel, Liste, Grafik und Erklärung funktionierten. Vollständige Regression jedes einzelnen früheren Features war nicht Gegenstand.

## Statische Prüfung und kurzes Review

```text
node tests/pc-explorer.test.js          -> pc-explorer: alle Prüfungen bestanden
node --check js/pc-explorer.js          -> Exit 0
node --check tests/pc-explorer.test.js  -> Exit 0
git diff --check                       -> Exit 0
```

Kurzes Review des Diffs in CSS, JavaScript und Tests: keine offensichtliche Sicherheitsänderung oder reproduzierbarer Logikfehler erkannt. Keine vollständige Sicherheitsprüfung.

## Grenzen und Arbeitsstand

- Kein Produktcode geändert; kein Git-Staging, Commit oder Push.
- Normgerechte ATX-Seitenprüfung und genaue Bauteilpositionen wurden nicht gegen eine konkrete Norm-/Herstellerseite fachlich zertifiziert. Modellabhängige Lage bleibt plausibel, nicht universell.
- Fotos: DOM-/Alttexte geprüft, gerenderte Bildpixel nicht visuell bestätigt.
- Tastaturereignisse über CDP, nicht mit echter Hardware.
- Keine Produktionsdaten, Veröffentlichung, GitHub Pages oder Produktions-/Fachfreigabe.
- QA änderte den Git-Stand nicht. Prüfstart und Abschluss: Branch `feature/pc-explorer-grafik-2026-11-02`, HEAD `8b7177485c94b919d65281afe7cd7e7f41ffe4d7`. Vorhanden blieben Änderungen an `PC-EXPLORER-TESTANLEITUNG.md`, `css/pc-explorer.css`, `js/pc-explorer.js`, `tests/pc-explorer.test.js`, untracked `docs/uebergaben/2026-11-03_c3po-pc-explorer-atx-io.md` und `vorschau/`. Die extern gemeldete Sicherung von `vorschau/` wurde von GLaDOS nicht unabhängig verifiziert.
- Eigener CDP-Tab und Chrome-Prozess wurden nach dem Lauf beendet; Server 8143 wurde nicht gestoppt.
