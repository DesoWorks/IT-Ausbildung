# PC-Explorer – Grafikphase ATX und rückseitige I/O-Anschlüsse

**Datum:** 2026-11-03  
**Projekt:** `/home/starnet/projects/IT-Ausbildung-pc`  
**Zweck:** Quellen- und Einordnungsnotiz zur Grafikphase; keine Umsetzungsmeldung und keine Fachfreigabe.

## Arbeitsstand und Grenzen

Laut Lead-Kontext: Branch `feature/pc-explorer-grafik-2026-11-02`, Ausgangs-HEAD `8b7177485c94b919d65281afe7cd7e7f41ffe4d7`. Bei der Statusprüfung zeigte sich derselbe Branch mit `origin/feature/pc-explorer-grafik-2026-11-02` und HEAD `8b71774`; daneben war `?? vorschau/` vorhanden. Der Lead meldet, dass Vorschau-Belege separat gesichert wurden unter `/home/starnet/pc-explorer-sicherungen/2026-11-03-fbf9ed2c/vorschau-vorher.tar.gz`. Diese Sicherung wurde für diese Dokumentation nicht unabhängig geprüft. Keine Programmdateien geändert.

Jarvis' Umsetzung und GLaDOS' spätere unabhängige Prüfung sind in diesem Dokument nicht vorweggenommen. Die zuvor vorliegende GLaDOS-QA vom 2026-11-02 betrifft den Stand `4957c3a6d5664cdbde22b390b61dac59b86f08b4` und kann nicht als Prüfung des hier genannten Ausgangs-HEAD oder späterer Änderungen gelten. Die Testanleitung behält daher den Hinweis „nicht fachlich freigegebener Teststand“.

## ATX-Abmessungen

Die Intel-ATX-Spezifikation Version 2.03 nennt für das Full-Size-ATX-Board 12 × 9,6 Zoll und gibt die metrische Entsprechung 305 × 244 mm an. Primärquelle: [Intel ATX Specification 2.03 (PDF, Bitsavers-Archiv)](https://bitsavers.org/pdf/intel/ATX/ATX_Specification_2_03_199812.pdf). Der PDF-Download lieferte im Textabruf keine lesbare Textextraktion; die konkrete Maßangabe wurde in den verfügbaren Suchtreffern dieser Spezifikation wiedergegeben, nicht anhand einer lokal gerenderten PDF-Seite nachgelesen. Daher ist die URL als Spezifikationsreferenz, die Maßangabe aber nicht als im Lauf seitenweise unabhängig bestätigtes Zitat zu verstehen.

Die Maße gelten für das Full-Size-ATX-Format, nicht pauschal für jedes Mainboard. Ein schematisches Bild darf die Proportionen 305:244 darstellen; es soll nicht den Eindruck einer vermessenen Herstellerplatine oder universeller Positionen sämtlicher Anschlüsse vermitteln. Anschlusspositionen sind beispielhaft und modellabhängig.

## USB-Form, Standard und Farben

USB-IF führt USB 2.0, USB 3.2, USB4 sowie USB Type-C als getrennte Bereiche und veröffentlicht separate Type-C-Kabel-/Steckverbinder-Spezifikationen. Quelle: [USB-IF Document Library](https://www.usb.org/documents), Eintrag „USB Type-C® Cable and Connector Specification Release 2.5“ sowie USB-2.0-/USB-3.2-/USB4-Dokumente. Damit ist für die Lernillustration wichtig: USB-C bezeichnet eine Steckverbinderfamilie/-form, USB4 eine Schnittstellen-/Technologiestufe; USB-C ist nicht automatisch USB4. Auch USB-A ist eine Form und kein eindeutiger Geschwindigkeitsnachweis.

Zu Farben innen in USB-Buchsen konnte in der kurzen Recherche kein belastbarer USB-IF-Primärbeleg gefunden werden, der eine verpflichtende oder verlässliche Geschwindigkeitszuordnung festlegt. Blau wird häufig als Hinweis auf USB-3.x-Ports verwendet, aber das ist keine Garantie. Keine Farbgebung darf im Lernbild allein eine USB-Version oder Geschwindigkeit behaupten. Beschriftung und Form-/Standardinformation müssen unabhängig von der Farbe eindeutig bleiben.

## Audio und PS/2-Farbkonventionen

Die konventionelle PC-Audio-Farbzuordnung wird üblicherweise als grün = Line-out/Kopfhörer, blau = Line-in und rosa = Mikrofoneingang beschrieben; PS/2 ist häufig als violette Tastaturbuchse und grüne Mausbuchse gekennzeichnet. In dieser Recherche wurde dafür kein geeigneter Primärbeleg (etwa eine konkrete Hersteller-Handbuchseite oder einschlägige Normstelle) erfolgreich geöffnet und verifiziert. Diese Zuordnungen deshalb ausschließlich als **typische Legacy-/PC-Konvention**, nicht als universelle Norm oder Garantie darstellen. Geräte können abweichen, Buchsen können multifunktional sein, und nicht jedes Mainboard besitzt alle Anschlüsse. Die Buchsenform und Beschriftung sind wichtiger als Farbe.

PS/2 ist eine ältere, heute optionale Anschlussart; die bloße Darstellung belegt keine Ausstattung eines bestimmten aktuellen Systems. Bei Audio ist die Farbe eine Orientierungstradition, keine sichere Funktionsgarantie ohne Beschriftung/Herstellerangabe.

## Quellenlage / verbleibende Grenzen

- [USB-IF Document Library](https://www.usb.org/documents): offizielle Bibliothek, Type-C-Stecker/Kabel-Spezifikation getrennt von USB4- und USB-3.2-Themen; keine geprüfte allgemeine USB-Buchsen-Farbregel gefunden.
- [ATX Specification 2.03 PDF](https://bitsavers.org/pdf/intel/ATX/ATX_Specification_2_03_199812.pdf): Spezifikationsreferenz; Web-Extraktion des PDFs war nicht lesbar. Die 305 × 244-mm-Angabe erschien in Suchtreffern, wurde hier nicht durch manuelle PDF-Seitenansicht verifiziert.
- Für genaue USB-Farbpraxis, Audiofarben und PS/2-Farbzuordnung fehlen in dieser Recherche geöffnete Hersteller-Primärbelege. Daher Konventionen vorsichtig formulieren und keine Normbehauptung daraus machen.
- HDMI, DisplayPort, RJ45-Formen und genaue Anschlusspositionen werden durch diese Notiz nicht neu fachlich zertifiziert.
- Weder technische Umsetzung noch Regressionstests, Browserprüfung, GLaDOS-QA, Commit oder Push sind Gegenstand dieser Dokumentation.

## Status der Testanleitung

`PC-EXPLORER-TESTANLEITUNG.md` wurde auf den Grafik-Feature-Branch und dessen ZIP-URL umgestellt und um die in den vorhandenen QA-Quellen genannten aktuellen Ansichten ergänzt. Der von GLaDOS für 2026-11-02 dokumentierte Lesbarkeitshinweis bei 320 px ist ausdrücklich als berichteter QA-Befund gekennzeichnet, nicht als neue Prüfung. Der Vorbehalt „nicht fachlich freigegebener Teststand“ bleibt bestehen. Ein späterer Endstand ist durch Terminus zu dokumentieren.

## Quellen-Nachtrag Terminus nach C3POs Abschluss

Die oben dokumentierte Recherchegrenze für Audio/PS/2 wurde anschließend teilweise geschlossen: Exa lieferte einen ausführlichen Textauszug aus dem [ASUS-Herstellerhandbuch D840MA/D840MB/D840SA, E14427](https://dlcdnets.asus.com/pub/ASUS/Desktop/D840MB/XX09_D840MA_D840MB_D840SA_Win10_E14427_V1.pdf). Die gedruckte Seite 14 nennt PS/2-Maus grün und PS/2-Tastatur violett; Seite 15 nennt im normalen Audioaufbau hellblau = Line-in, hellgrün = Line-out und rosa = Mikrofon. Dieselbe Tabelle zeigt ausdrücklich abweichende Funktionen bei Mehrkanalbetrieb (etwa hellblau = hintere Lautsprecher, rosa = Bass/Center). Das belegt ein konkretes Herstellerbeispiel, keine universelle Norm. Es ist eine textbasierte Quellenprüfung durch Terminus, keine lokale PDF-Sichtprüfung. Die Grenzen zu USB-Farben und zur normativen Geometrievalidierung bleiben bestehen.
