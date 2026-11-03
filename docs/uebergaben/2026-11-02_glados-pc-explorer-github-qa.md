# Unabhängige Datei-QA: PC-Explorer vor Feature-Branch-Push

Datum: 02.11.2026  
Prüfobjekt: `/home/starnet/projects/IT-Ausbildung-pc`  
Branch laut übergebenem Prüfkontext: `feature/pc-explorer-2026-11-01`  
Methode: lesende Prüfung der benannten Dateien und Existenzprüfung der drei Bilddateien. Keine Moduldatei, kein CSS, JS, Bild oder Test wurde verändert. Kein Commit, Push oder Fachfreigabe.

## Ergebnis

Für die angeforderten Datei- und Inhaltskriterien keine Abweichung festgestellt. **Browserprüfung nicht ausgeführt**; daher sind sichtbares Browserverhalten und tatsächliche Offline-Ausführung hier nicht bestätigt. Automatisierte Tests wurden in diesem Teilauftrag nicht ausgeführt; ich habe die Testdatei nur gelesen.

## Kriterien

| Kriterium | Status | Dateibeleg |
|---|---|---|
| Lokale Bildpfade relativ, kein HTTP-Bild-src | **Bestanden (Dateiprüfung)** | `js/pc-explorer.js`: `foto.pfad` für PGA `../assets/pc-explorer/commons/Pentium_4_Underside_Demonstrating_PGA_Socket.JPG`, LGA `../assets/pc-explorer/commons/LGA_1155_socket-6510.jpg`, BGA `../assets/pc-explorer/commons/Solder_ball_grid.jpg`; `baueFoto` verwendet `src: f.pfad` (Zeile 315). Test bildet Modul-relative Pfade und prüft Existenz (`tests/pc-explorer.test.js` Zeilen 153–154). Verzeichnisliste enthielt alle drei Dateien. Bytes/Hashes nicht geprüft. |
| Urheber und Lizenz in PGA/LGA/BGA-Unterschrift | **Bestanden (Daten-/Testdateiprüfung)** | `js/pc-explorer.js`: PGA „Foto: Liam McSherry, CC BY-SA 3.0“, LGA „© Raimond Spekking / CC BY-SA 4.0“, BGA „Foto: Janke, CC BY-SA 3.0“. Renderer zeigt `f.unterschrift` im `figcaption` (Zeilen 313–318). Test verlangt Urheber und Lizenz in jeder Unterschrift (Testzeilen 160–162). |
| BGA-Foto ist keine vollständige CPU | **Bestanden (Daten-/Testdateiprüfung)** | BGA-Unterschrift sagt „Lotkugeln auf der Leiterplatte nach Entfernung des Chips, nicht die Unterseite einer vollständigen CPU.“ Test prüft diesen Satz (Testzeilen 148, 160). |
| Notebook ohne Foto | **Bestanden (Daten-/Testdateiprüfung)** | Notebook-Bauteile ohne Foto-Feld im gelesenen `NOTEBOOK_TEILE`; Test verlangt `!t.foto` für alle Notebook-Bauteile (Testzeile 164). |
| Konzeptgrafik nicht eingebunden | **Bestanden (statisch)** | Test asserts `! /konzept|hardware-konzept/i.test(js + html)` (Testzeile 167); in den geprüften HTML-/JS-Inhalten keine Einbindung. |
| Kein `fetch`/`XMLHttpRequest` | **Bestanden (statisch)** | Testzeile 137 verbietet `fetch(`, `XMLHttpRequest` und `import(`; im gelesenen JS keine Verwendung. |
| Windows-Start öffnet HTML ohne Server | **Bestanden (Dateiinhalt)** | `start-pc-explorer.bat` Zeilen 1–3: Kommentar „Keine Installation, kein Server.“ und `start "" "%~dp0module\pc-explorer.html"`. Anleitung Zeilen 19–22 erläutert Doppelklick und fehlenden Serverbedarf. BAT wurde hier nicht auf Windows ausgeführt. |
| Anleitung: keine Fachfreigabe, Feature-Branch genannt | **Bestanden** | `PC-EXPLORER-TESTANLEITUNG.md` Zeile 3 sagt „nicht fachlich freigegebener Teststand“ und nennt `feature/pc-explorer-2026-11-01`. |
| `vorschau/` keine Pflicht der Anleitung | **Bestanden** | Anleitung „Herunterladen“/„Starten“, Zeilen 5–26, verlangt ZIP, Entpacken und Startdatei; keine Pflicht zu `vorschau/`. |
| Browserprüfung | **Nicht ausgeführt** | Keine lokale Browserprüfung in diesem Auftrag. Umschaltung, sichtbare Tastaturbedienung, Responsive-Rendering, Bildladen und Offline-Laufzeit nicht bestätigt. |
| PC-Explorer-Modultest und JS-Syntaxprüfung | **Nicht ausgeführt** | `tests/pc-explorer.test.js` wurde gelesen, nicht ausgeführt. In diesem Teilauftrag wurden weder `node tests/pc-explorer.test.js` noch `node --check js/pc-explorer.js` aufgerufen. |

## Grenzen

Die Bilder waren unter den erwarteten Namen vorhanden, aber ihre Bytes/Hashes wurden nicht geprüft. Keine Lizenzbewertung über sichtbare Attributions- und Lizenzangaben hinaus und keine fachliche Freigabe. Dateiprüfung ersetzt keine Browserbedienung.
