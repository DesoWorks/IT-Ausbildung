# PC-Explorer Phase 2 – Grafikvorgaben für Jarvis

Stand: 2026-11-02. Terminus: Gestaltung; Jarvis: Integration; C-3PO: Quellen; GLaDOS: unabhängige QA. Diese Übergabe ändert nur diese Datei.

## Ziel und Rahmen

`zeichneAnschlussTeil` in `js/pc-explorer.js`, Zeile 784, ersetzt Rechtecke durch erkennbare Anschlussformen. Der Ausschnitt 784–818 wurde gelesen und bestätigt die bisherige Rechteckdarstellung. Weitere Codebereiche wurden nicht neu gelesen. IDs, Klasse `pe-haupt`, `data-id` und ViewBox `0 0 780 480` bleiben. Bestehender Klick bleibt am Gruppen-Element mit `pe-haupt`; einzelne Formteile bekommen keine eigenen Aktionen oder Tabstopps. Bestehende Selektoren bei einer Verlagerung der Klasse an die Gruppe prüfen. Die Liste bleibt alternative Auswahl und mit Grafik und Erklärung synchronisiert. Desktop- und Notebook-Zeichnung nicht anfassen.

Vom Lead übernommener, hier nicht erneut geprüfter Stand: Worktree `/home/starnet/projects/IT-Ausbildung-pc`, Branch `feature/pc-explorer-grafik-2026-11-02`, HEAD `4957c3a`, sauber außer `?? vorschau/`. Kein Commit, Push, Branchwechsel, weiterer Worktree oder Bilddownload durch Terminus.

IDs nicht umbenennen: `usb-a usb-c usb2 usb3 usb4 rj45 audio hdmi-mb dp-mb ps2 wlan hdmi-gpu dp-gpu atx24 eps pcie-lang pcie-kurz m2 sata ramslot cpu-fan sys-fan aio usb-header frontpanel front-audio rgb argb ide pci agp`.

## Wiederverwendbare Funktionen

Neu in derselben JS-Datei, nicht als Framework: `buchseUsbA`, `buchseUsbC`, `buchseRj45`, `buchseKlinke`, `buchseHdmi`, `buchseDisplayPort`, `buchsePs2`, `buchseAntenne`, `steckplatzPcie`, `leisteIde`, `kopfZweireihig`.

Jede Funktion zeichnet nur die Form in eine übergebene Gruppe, etwa mit `(g, x, y, w, h)`. Kerbenvarianten dürfen reine Geometrieparameter sein. Zuordnung nach bestehenden IDs in `zeichneAnschlussTeil`; keine neue Auswahl- oder Erklärungslogik. Texte getrennt von Formen halten. Innenöffnung, Zunge, Kerbe und Kontakte über Konturen statt allein über Farbe unterscheiden. Bestehende ausreichend große Trefferflächen erhalten; kleine Kontakte sind nicht die einzigen klickbaren Flächen.

## Rückseite – Beispiel, nicht jedes Board

- Linke Blende x 48–500: Mainboard-I/O. Rechte Slotblende x 530–760: nur Grafikkarte, Beschriftung „Nur mit dedizierter Grafikkarte“. Rahmen und sichtbare Lücke trennen beide Bereiche.
- `ps2`: oben links, Kreis mit angedeuteten Kontaktöffnungen, Beschriftung „PS/2 · älter“.
- `usb-a`: flache Rechteckbuchse mit Innenzunge, gestapelt erlaubt. `usb-c`: kleine ovale Buchse daneben. Nicht als USB 2.0/3.2/USB4 beschriften.
- `usb2`, `usb3`, `usb4` bleiben auswählbar. Als USB-A-Form mit Standardnamen daneben zeichnen, nicht als eigene Steckerart. Hinweis: „USB-Standards; Buchsenform hier schematisch, nicht aus dem Standardnamen ableiten.“
- `rj45`: breiter als eine USB-A-Buchse, Rastnasenausschnitt oben, Kontaktkante angedeutet.
- `audio`: drei runde Klinken als gemeinsame Auswahl. Falls nur eine Buchse dargestellt wird: Hinweis „oft mehrere“. Keine neuen IDs.
- HDMI: Trapez. DisplayPort: Rechteck mit einer abgeschrägten Ecke. Beide auf Mainboard-Blende UND getrennt auf Grafikkartenblende: `hdmi-mb`, `dp-mb`, `hdmi-gpu`, `dp-gpu`.
- `wlan`: zwei kleine Kreise für Antennenanschlüsse als gemeinsame Auswahl; „optional, nicht jedes Board“.
- Mehrere Reihen sind erlaubt. Relative Proportionen dienen der Erkennung, sind keine Normmaße. Freie Beschriftungsflächen vorsehen, keine Überlagerung von Text und Buchsen.

## Mainboard – beispielhafte ATX-Draufsicht

Keine Millimeter, keine Pinnummern, keine Spannung. Platinenrechteck als Deko, keine Behauptung eines bestimmten Modells.

- CPU-Sockel: Quadrat mit Halterahmen, oben mittig. Ohne vorhandene ID nicht anklickbar. Die bestehenden Header bleiben die auswählbaren Ziele.
- `ramslot`: vier parallele lange Schlitze rechts vom Sockel, nicht ein Rechteck; gemeinsame Auswahl.
- `atx24`: langer 24-poliger Kamm an der rechten Kante, ohne Pinnummern oder Pinbelegung.
- `eps`: kleinerer Kamm oben links.
- `pcie-lang`, `pcie-kurz`: untereinander im unteren Bereich, deutlich verschiedene Länge, sichtbare Kerbe. Keine Kompatibilitätsaussage.
- `m2`: kleiner flacher Steckplatz mit Schräubchen-Kreis entlang einer angedeuteten Modulachse. Nicht als „das ist NVMe“ bezeichnen; Formfaktor und Protokoll nicht gleichsetzen.
- `sata`: L-förmige Buchse, etwa rechts unten.
- `cpu-fan`, `sys-fan`, `aio`: kleine 4-polige Kämme. CPU-Fan nahe Sockel; übrige an freien Randpositionen. AIO mit „soweit vorhanden“.
- `usb-header`: zweireihig am unteren Rand; `frontpanel`: kleiner zweireihiger Kamm; `front-audio`: kleiner Block. Keine erfundene Pinbelegung.
- `rgb`, `argb`: kleine optionale Kämme; Unterschied nur durch Beschriftung kennzeichnen, nicht durch erfundene Spannung.
- Deko optisch hinter den auswählbaren Teilen; keine erfundenen elektrischen Signalwege zeichnen.

## Historisch – eigene Ansicht

Nicht auf der ATX-Platine. Drei getrennte Vergleichsobjekte, Hinweis „Historische Technik zum Vergleich“.

- `ide`: breite zweireihige 40er-Leiste, ohne unbelegte Millimeter oder Pinbelegung.
- `pci`, `agp`: längliche Steckplatzformen mit unterschiedlicher Kerbe, Innenöffnung und erkennbarer Kontaktkante.
- Farbe ausdrücklich nur als didaktische Konvention kennzeichnen: Keine neue Quelle gelesen, daher keine belegte Normfarbe behaupten. Form und Beschriftung müssen auch ohne Farbe unterscheiden.

## Kühlungsknopf und Hinweistext

Laut Lead wird `pe-kuehler` in `zeigeAnsicht`, Zeile 1088, bereits bei Anschlussansichten versteckt; hier nicht erneut gelesen. Jarvis soll im HTML prüfen, ob ein Hinweistext trotzdem sichtbar ist. Wenn nein, nicht anfassen. Keine pauschale Änderung der Kühlungsfunktion in Desktop oder Notebook.

## Quellenblock und Grenzen

Formen sind didaktische Näherungen, keine Normmaße. USB-IF-Startseite 2026-11-02 trennt USB4, USB 3.2, USB 2.0 und USB Type-C in der Navigation, belegt aber nicht die Buchsenform. HDMI/DP/PCIe/ATX-Sätze im Modul bleiben vorläufig, wie schon im Code.

Die USB-IF-Aussage ist aus dem Lead-Auftrag übernommen, nicht in diesem Lauf selbst verifiziert. Referenzziel https://www.usb.org/ ist hier ungelesen. Keine Websuche, neuen Quellen, Bilddownloads oder Lizenzprüfungen durchgeführt. Alle Formvorgaben sind Gestaltungsvorgaben, keine nachgemessenen Herstellerzeichnungen. Keine Fotos oder externe Bildabhängigkeiten einbauen. C-3POs parallele Datei `2026-11-02_c3po-pc-explorer-phase2-quellen.md` nicht anfassen.

## Prüfkriterien für Umsetzung und QA

1. Formen sind in allen drei Ansichten anhand von Öffnung, Kerbe, Rundung oder Anordnung unterscheidbar. Grafikkarten- und Mainboard-Ausgänge bleiben räumlich getrennt.
2. Alle bestehenden IDs bleiben per Grafik und Liste auswählbar; Erklärung, Auswahlzustand und Grafik bleiben synchron. Mehrteilige Formen erzeugen keine neuen Auswahlziele.
3. Maus, Tastatur und sichtbarer Fokus bleiben funktionsfähig. Keine Information nur durch Farbe vermitteln.
4. Bei 320 Pixel Breite bleiben Liste und Erklärung nutzbar; keine überlagerten Beschriftungen oder verdeckten Bedienelemente. Kleine Formen nicht durch unlesbar winzigen Text erklären.
5. Desktop und Notebook bleiben unverändert; Kühlungshinweis nur bei nachgewiesener Fehlanzeige korrigieren.
6. Jarvis ergänzt Regressionstests für Formzuordnung, IDs und Auswahl-/Ansichtswechsel. Sichtprüfung breit und bei 320 Pixel sowie Tastaturprüfung dokumentieren. Fehlgeschlagene Browserumgebung ausdrücklich „nicht geprüft“, nicht bestanden.

Diese Kriterien sind Vorgaben, keine bereits ausgeführten Tests. Umsetzung, Browserprüfung, vollständige Quellen- und Lizenzprüfung sind hier nicht erfolgt. Jarvis prüft Integrationsdetails am Code, C-3PO dokumentiert Quellen, GLaDOS prüft unabhängig, Rick führt zusammen.
