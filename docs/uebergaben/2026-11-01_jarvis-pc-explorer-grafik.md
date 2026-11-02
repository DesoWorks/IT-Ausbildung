# PC-Explorer: grafische Ergänzung (Vorschlag und Vorbereitung)

Stand 2026-11-01, Branch `feature/pc-explorer-2026-11-01`, Ausgangs-HEAD 92d2bbd. Nicht committet, nicht gepusht. Keine fachliche Freigabe.

## Was jetzt sichtbar ist
- Bei den CPU-Bauformen PGA, LGA und BGA erscheint unter dem Detailtext ein echtes Foto (unverändert, `object-fit: contain`, `max-width: 100%`, Höhe auf 20 rem begrenzt, kein Beschnitt).
- Neben dem Bild stehen die Pflichtunterschrift mit Urheber und Lizenz sowie zwei echte Links: Lizenz und Wikimedia-Commons-Quelle.
  - PGA: Pentium 4 von 2001, Liam McSherry, CC BY-SA 3.0
  - LGA: konkreter LGA-1155-Sockel, © Raimond Spekking / CC BY-SA 4.0
  - BGA: Lötkugeln auf der Leiterplatte nach Entfernung des Chips (nicht eine vollständige CPU), Janke, CC BY-SA 3.0
- Unter der Zeichnung steht ein Hinweis: schematische Skizze, echte Fotos bisher nur für PGA, LGA, BGA. Beim Notebook zusätzlich: noch kein freigegebenes Komponentenbild, die Liste bleibt gleichwertig.
- Daten liegen als Feld `foto` an den SOCKEL-Einträgen in `js/pc-explorer.js` (Pfad, Alt-Text, Urheber, Lizenz, Lizenz-URL, Commons-URL, Unterschrift).

## Was bewusst unverändert bleibt
- HTML-Bauteilliste als gleichwertige Bedienung; SVG-Zeichnung schematisch und `aria-hidden`.
- Alle Lerntexte; Wikipedia-Quellen weiterhin als vorläufig gekennzeichnet.
- Konzeptgrafik vom 22.10. nicht eingebunden (nur Layoutreferenz). Keine neuen Hardwarefotos erzeugt. Kein Eintrag in Katalog oder Startseite.
- Fotodateien bytegleich (SHA-1 im Test geprüft).

## Prüfung
- `node tests/pc-explorer.test.js` bestanden; `node --test tests/*.test.js`: 65 von 65 bestanden.
- Neu im Test: Dateien vorhanden, SHA-1, Urheber, Lizenz, URLs, Pflichtsätze, Notebook ohne Bild. Die Prüfung "keine externen Adressen im Code" nimmt jetzt auch `lizenzUrl` und `commonsUrl` aus (reine Linkdaten, kein Laden).
- Nicht geprüft: Sichtprüfung im echten Browser (Darstellung, Fokus, Bildgröße auf Mobil). Das ist für GLaDOS offen.

## Für später noch nötig
- Notebook: kein freigegebenes Komponentenbild; Liste bleibt gleichwertig. Es braucht lizenzgeprüfte Fotos je Bauteil (Mainboard, RAM, SSD, Akku, Kühlung) oder eigene Zeichnungen.
- Gesamtansicht: kein Gesamtfoto eines geöffneten Desktops oder Notebooks; die Fotos sind nur Detailansichten. Hotspots auf einem echten Gesamtbild brauchen ein freigegebenes Bild und eine gleichwertige Listenbedienung.
- Fotos der übrigen Desktop-Bauteile (CPU-Kühler, RAM, GPU, SSD, Netzteil) fehlen.
- Primärquellen für die bisher vorläufigen Wikipedia-Angaben nachziehen, wo verfügbar.
- Eine sichtbare Sammelübersicht der Bildnachweise auf der Seite wäre sinnvoll; die Namensnennung steht aktuell direkt am Bild.
- Share-Alike gilt für die Fotodateien; Bearbeitung (Zuschnitt, Neukomprimierung) wird vermieden. Entscheidung, ob die Fotos in Git aufgenommen werden, steht aus (derzeit untracked).
