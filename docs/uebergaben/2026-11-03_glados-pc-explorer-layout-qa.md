# Unabhängige QA – PC-Explorer-Layout

**Auftrag:** Terminus – PC-Explorer: Layoutoptimierung nach erfolgreicher Sichtprüfung  
**Prüfung:** 3. November 2026, gezielter Headless-Chrome-Lauf  
**Vorschau:** `http://127.0.0.1:8143/module/pc-explorer.html`  
**Arbeitsstand:** Branch `feature/pc-explorer-grafik-2026-11-02`, HEAD `f279c84207cfeb3125b9f7eac1967257ca9aebde`; Vorschau enthielt die fünf uncommitteten Änderungen der Layoutarbeit.  
**Umgebung:** eigener headless Chrome mit eigenem Profil und CDP-Port 9239. Keine Installation, Projektänderung, Teständerung, Git-Aktion oder Deployment durch diese QA.

## Ergebnis

Im gezielt geprüften Layoutumfang keine reproduzierbaren Fehler festgestellt. Die angeforderten Layout- und Auswahlläufe funktionieren in der Vorschau bei 1440, 768 und 320 CSS-Pixeln. Das ist keine vollständige Prüfung des PC-Explorers und keine fachliche Freigabe.

## Beobachtungen und Belege

- **Mainboard, alle drei Breiten:** Die Arbeitsfläche hatte die Klasse `pe-breit`, die Grafik das ViewBox-Maß `0 0 420 480`; die rechte separate Bauteilspalte war nicht vorhanden. Die Auswahl lag als 15 Einträge umfassende nummerierte HTML-Legende unter der Grafik, die Erklärung darunter über dieselbe Arbeitsflächenbreite. Nummern 1–15 stimmten jeweils mit der Reihenfolge der Legende und den `data-id`-Bauteilen überein.
- **1440 px:** Grafikbreite 944 px, Legende 964 px, Erklärung 964 px; sichtbare SVG-Marken 26×26 CSS-Pixel. Kein horizontaler Seitenüberlauf.
- **768 px:** Grafikbreite 641 px, Legende und Erklärung 661 px; Marken 24×24 px. Kein horizontaler Seitenüberlauf.
- **320 px:** Grafikbreite 214 px, Legende und Erklärung 233 px; Marken wurden nicht ausgeblendet, aber auf rund 8×8 CSS-Pixel verkleinert. Alle 15 waren im SVG vorhanden und sichtbar, die Zuordnung zur HTML-Legende blieb bestehen. Dokumentbreite 320 px, somit kein horizontaler Seitenüberlauf. Die Marken sind bei dieser Breite sehr klein und nicht als verlässliche Touch-Ziele geeignet; die vollständige HTML-Auswahl ist die bedienbare Alternative.
- **Rückseite:** 13 SVG-Bauteile und 13 vollständige HTML-Auswahlknöpfe; Legende unter der Grafik, Erklärung darunter. Alle Knöpfe hatten positive Höhe (ca. 48–103 px in der gemessenen Desktopansicht); kein horizontaler Überlauf.
- **Auswahl/Erklärung:** Ein synthetisch ausgelöstes SVG-Klickereignis auf `eps` wählte genau „2. 4-/8-Pin-EPS“ in der HTML-Legende und aktualisierte die Erklärung zu diesem Bauteil. Ein Klick auf die HTML-Auswahl aktualisierte ebenso die passende Markierung und Erklärung. Die Rückseitenauswahl „DisplayPort-Ausgang der Grafikkarte“ aktualisierte die Erklärung passend. Touch-Emulation im 320-px-Modus wählte „USB-A-Anschluss“ und zeigte die zugehörige Erklärung.
- **Tastatur/Fokus:** CDP-Tastaturereignisse bestätigten Pfeil-nach-unten, Home und End auf der HTML-Legende; die aktive Auswahl und Erklärung wechselten passend. Beim fokussierten Legendenknopf war eine sichtbare CSS-Outline (`outline-style: solid`) vorhanden. Tab führte anschließend aus der Auswahl weiter in den nächsten Seitenbereich, nicht in eine Falle.
- **Angrenzende Regressionen:** Desktop, Notebook und Ältere Anschlüsse ließen sich aufrufen; die ursprüngliche 780×480-SVG-Ansicht und die getrennte, nicht breite Arbeitsfläche blieben erhalten. In diesen kurzen Prüfschritten kein horizontaler Überlauf. Kein vollständiger Funktions- oder Fachtest dieser Ansichten.

## Grenzen und offene Punkte

- Verwendet wurde Headless Chrome, kein echtes Mobilgerät. Touch wurde emuliert; das beweist keine Bedienbarkeit auf realer Hardware.
- SVG-Auswahl wurde mit einem synthetischen DOM-Mausereignis geprüft, nicht mit physischer Maus oder einem Hardwaregerät. Die übrigen Tastaturereignisse liefen über CDP. Enter wurde als Tastaturereignis gesendet; Space löste im erfassten Tastaturschritt keine zusätzliche Auswahländerung aus, weil die aktuelle Auswahl dabei bereits unverändert war. Eine separate isolierte Space-Auswahlprüfung mit frisch fokussiertem, anderem Bauteil wurde nicht belastbar nachgewiesen und bleibt offen.
- Kühlungstransparenz wurde in diesem gezielten Layoutlauf nicht abschließend geprüft. Desktop/Notebook/Ältere Anschlüsse wurden nur als kurze Ansichtsregression aufgerufen.
- Keine Screenreader-, Kontrast-, Browserkombinations-, echtes Touch- oder fachliche Quellenprüfung. Keine komplette Test-Suite ausgeführt.
- Die Browserautomatisierung stoppte bei dieser Vorschau private/Loopback-Navigation; deshalb wurde ein eigener Chrome/CDP-Prozess verwendet. Die Vorschau selbst antwortete mit HTTP 200.

## Einordnung

Keine Fehler im geprüften Umfang. Die sehr kleinen Nummern bei 320 px sind eine beobachtete Darstellungsgrenze, kein Verlust der Alternativbedienung: die beschriftete HTML-Legende bleibt vollständig. Die oben genannten nicht durchgeführten Prüfungen sind keine bestätigten Fehler. Der Branch-/Commit-/Push-Schritt liegt außerhalb dieses QA-Teilauftrags und wurde nicht vorgenommen.
