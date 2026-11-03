# Unabhängige QA – PC-Explorer: Kontexttexte und USB-Ansicht

**Prüfdatum:** 3. November 2026  
**Prüfobjekt:** `/home/starnet/projects/IT-Ausbildung-pc`, Branch `feature/pc-explorer-grafik-2026-11-02`, HEAD `9bbc8c2e2d9a901586acc262d324be5740a277d0` plus uncommittierte, gezielte Änderungen  
**Vorschau:** `http://127.0.0.1:8144/module/pc-explorer.html` (HTTP 200; laufender Server ordnete sich dem genannten Worktree zu)  
**Browser:** eigener headless Chrome-Prozess, eigenes Profil `/tmp/glados-pc-qa-20261103`, CDP-Port 9242. Terminus-Chrome auf 9241 wurde nicht verwendet oder verändert.  
**Arbeitsgrenze:** Nur Live-UI-Prüfung und dieser Bericht. Keine Code-/Teständerung, Git-Aktion, Installation, Deployment oder Providerwechsel. Keine Testsuite.

## Ergebnis

Im geprüften Funktionsumfang keine reproduzierbaren Fehler festgestellt. Die ansichtsspezifischen Texte und die fachlich gewünschte Trennung zwischen USB-Steckerformen und Standardplaketten waren in der Live-Vorschau vorhanden. Die Auswahl per sichtbarer HTML-Legende und die zugehörige Erklärung funktionierten in den geprüften Fällen. Das ist eine gezielte unabhängige Prüfung, keine vollständige Explorer-, Barrierefreiheits- oder fachliche Freigabe.

## Live-Beobachtungen

- **Kontexttexte:** Mainboard zeigte den eigenen erläuternden Absatz zu Anschlüssen/Steckplätzen/Schnittstellen/Protokollen/Bauformen; er enthielt keinen Hinweis auf durchsichtige Kühlung. Ältere Anschlüsse zeigte den eigenen historischen Kontextabsatz, ebenfalls ohne Kühlungshinweis. Rückseite zeigte den eigenen Kontextabsatz zu Mainboard-I/O, Erweiterungskarte und USB-Unterscheidung. Desktop zeigte seinen eigenen Absatz zur auswählbaren, überdeckten CPU und zum Button „Kühlung durchsichtig“. Notebook zeigte einen eigenen Notebook-Kontextabsatz mit modellabhängigem Aufbau sowie denselben Hinweis zu Kühlungstransparenz. Damit wurde der Kühlungshinweis auf Desktop/Notebook beschränkt.
- **USB-Rückseitenansicht:** Sichtbar waren USB-A und USB-C als Buchsen-/Steckerformen und in einem eigenen, getrennten Bereich die gestrichelten Plaketten „USB 2.0“, „USB 3.2“ (Auswahlliste bezeichnet „USB 3.x (hier USB 3.2, Standardname)“) und „USB4“. Der Beschreibungstext sagt ausdrücklich, eine Plakette sei keine Buchse. Ein weiterer Hinweis sagt USB4 verwende USB-C, aber nicht jedes USB-C sei USB4 und Farbe beweise keine Geschwindigkeit. Die Einzelbeschreibung zu USB4 sagt: USB4 ist Standardname, nutzt USB-C, hat keine eigene USB4-Buchse; umgekehrt unterstütze nicht jeder USB-C-Anschluss USB4. Die Einzelbeschreibung zu USB-A weist darauf hin, dass die Steckerform allein den unterstützten Standard nicht verrät.
- **Auswahl und Erklärung:** In der Rückseitenansicht löste Auswahl des sichtbaren USB4-Standard-Plakettenknopfs die passende Detailerklärung aus („USB4 ist der Name eines USB-Standards“; erläuternde Abschnitte folgten). Danach löste Auswahl des USB-A-Knopfs dessen passende Erklärung aus. Die Ansichtswechsel von und zu Notebook sowie zu Desktop waren per sichtbaren Tabs/Buttons erreichbar.
- **Kühlungsfunktion:** In Desktop blieb „Kühlung durchsichtig“ als Button sichtbar; in Notebook wechselte die Beschriftung passend zu „Kühlung wieder deckend“. Das Umschalten wurde nicht visuell gegen einzelne Grafikpixel bewertet. Erhalt der Interaktion ist damit durch Vorhandensein und Beschriftungswechsel belegt, nicht als vollständiger visueller Overlay-Test.
- **Tastatur/Bedienbarkeit:** Die Seite nennt Tab, Pfeiltasten, Enter und Leertaste als Bedienhinweis. Die getesteten Auswahlaktionen erfolgten überwiegend durch reale Browser-Klickbedienung. Eine isolierte Keyboard-Prüfung von Enter/Space mit beobachtetem Fokuswechsel und Zustandsänderung wurde in diesem Lauf nicht sicher nachgewiesen und bleibt offen. Touch wurde nicht auf echter Hardware geprüft.
- **Responsive Darstellung:** 1440 CSS-Pixel breite Ansicht: Tabs, USB-Formen, Standardplaketten und separate Auswahl waren sichtbar. Bei 320 CSS-Pixeln zeigte die Seite den mobilen Menüknopf und einen lesbaren, schmal umbrochenen Haupttext; kein belastbarer Nachweis eines horizontalen Seitenüberlaufs oder fehlender Textinformation. Bei 768 Pixeln wurde der Vorschauinhalt durch den langen Seiten-Navigationsbereich nach oben verdrängt; in diesem kurzen Lauf keine gezielte Messung der Grafik-/Plakettengeometrie möglich. Mobile Grafikschrift war klein, der vollständige Text und die HTML-Auswahlliste blieben im gerenderten Seiteninhalt vorhanden; gemäß Prüfauftrag wird die kleine Grafikschrift allein nicht als Fehler gewertet.

## Abgrenzung und offene Prüfungen

- Keine vollständige Prüfung aller 15 Mainboard-Auswahlen oder aller USB-Einzelbeschreibungen; auf der Rückseite wurden USB4 und USB-A direkt ausgewählt, weitere Aussagen anhand des sichtbaren Live-Texts geprüft.
- Keine belastbare separate Enter-/Space-Auswahlprüfung, kein Screenreader, keine echte Maus-/Touch-Hardware, keine Browsermatrix und keine Kontrastmessung.
- Responsiver Überblick bei 320/768/1440 CSS-Pixeln, aber keine vollständige Layout-/Überlaufvermessung jeder Ansicht. Der Beobachtungsumfang ist kurz und gezielt.
- Keine unabhängige Quellenrecherche zur fachlichen Normativität. Hier wurde nur geprüft, was die Anwendung sicht- und auswählbar vermittelt; der Inhaltsfooter kennzeichnet den Entwurf selbst als nicht fachlich freigegeben.
- Terminus meldet eigenen unabhängigen Lauf mit 15 Ansichten und 147 Auswahlen grün; das ist fremde Prüfungsinformation und wurde nicht als Ersatz für diesen Befund verwendet.

## Laufende Testressourcen

Der eigene Chrome wurde nach der Prüfung beendet; Vorschau-Server blieb unangetastet. Eigene Belegdatei: `shots/shot-62d6973702f1.png` (1440×1000, Mainboard-Ansicht); sie zeigt Kontexttext ohne Kühlungshinweis. Zusätzlich liegt ein mobiler Screenshot in `shots/shot-31c77072c150.png`, aufgenommen bei 320 CSS-Pixeln in der Ansicht „Ältere Anschlüsse“.
