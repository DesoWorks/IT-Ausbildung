# PC-Explorer auf Windows prüfen

Dies ist ein **nicht fachlich freigegebener Teststand**. Er liegt auf dem Branch `feature/pc-explorer-grafik-2026-11-02`, nicht auf `main` und nicht auf `dev`.

## Herunterladen

ZIP dieses Branches:

https://github.com/DesoWorks/IT-Ausbildung/archive/refs/heads/feature/pc-explorer-grafik-2026-11-02.zip

Nach dem Entpacken heißt der Ordner ungefähr `IT-Ausbildung-feature-pc-explorer-grafik-2026-11-02`. Nicht die ZIP von `main`, `dev` oder einem anderen Feature-Branch nehmen.

Dieser Branch enthält den PC-Explorer einschließlich der Grafikphase. Die BWL-Werkstatt ist nicht Teil dieses Testumfangs.

## Starten

Keine zusätzliche Software und kein Internet. Die Bilder und Skripte liegen im Ordner.

1. Ordner entpacken.
2. `start-pc-explorer.bat` doppelklicken.

Die Datei öffnet `module\pc-explorer.html` im Standardbrowser. Edge oder Chrome reichen. Ein lokaler Webserver ist nicht nötig.

Alternativ die Datei direkt öffnen:

`module\pc-explorer.html`

Über die Plattform: `index.html` öffnen. Unter **Tools & Nachschlagen** steht **PC-Explorer**. Die linke Navigation merkt sich die Scrollposition beim Wechsel der Themenseite. Der Explorer bleibt als Entwurf gekennzeichnet.

## Was du prüfen kannst

- Zwischen **Desktop**, **Notebook**, **Rückseite**, **Mainboard** und **Ältere Anschlüsse** wechseln (soweit die jeweilige Ansicht verfügbar ist).
- In **Mainboard** und **Rückseite** gibt es keine separate rechte Bauteilliste: Die Grafik nutzt die volle Breite; die HTML-Auswahllegende steht darunter. Beim Mainboard bleiben die Nummern und Marken in der Grafik auch mobil sichtbar. Die Erklärung des gewählten Bauteils steht unter Grafik und Legende über die volle Breite.
- In **Desktop** und **Notebook** bleiben Darstellung und Bauteilauswahl unverändert; bei schmalen Ansichten bleiben dort die SVG-Etiketten ausgeblendet. Auch **Ältere Anschlüsse** wurde für diese Layoutoptimierung nicht geändert.
- Ein Bauteil direkt in der Grafik wählen (Maus/Touch) oder über die HTML-Auswahllegende darunter wählen. Beide Wege aktualisieren dieselbe Bauteilerklärung.
- In **Rückseite** die Anschlüsse am Mainboard-I/O von den getrennten Grafikkarten-Ausgängen unterscheiden.
- In **Mainboard** die schematische Platinenübersicht und die auswählbaren Anschlüsse ansehen. Sie ist keine maßstäbliche Herstellerzeichnung.
- In **Ältere Anschlüsse** die getrennte Vergleichsansicht ansehen.
- Weiter unten **PGA**, **LGA** und **BGA** wählen. Nur dort erscheinen echte Fotos.
- Unter jedem Foto stehen Urheber, Lizenz und der Link zu Wikimedia Commons.
- Tastatur: Mit Tab zur HTML-Auswahllegende navigieren. Pfeiltasten wechseln die Auswahl; Home und End springen zum ersten beziehungsweise letzten Eintrag; Enter oder Leertaste aktivieren die Auswahl. Prüfen, dass Fokus sichtbar ist und die Erklärung passend aktualisiert wird. Die SVG-Auswahl bleibt ebenfalls per Tastatur erreichbar.
- Maus: SVG-Bauteil oder Eintrag der HTML-Legende anklicken und prüfen, dass beide Wege dieselbe Erklärung anzeigen.
- Touch: SVG-Bauteil und Einträge der HTML-Legende antippen. Eine Touch-Simulation im Browser ist nur ein technischer Hinweis und ersetzt keinen Test auf einem echten Mobilgerät.
- Das Fenster bei **1440 px**, **768 px** und **320 px** prüfen. Es darf kein horizontaler Seitenüberlauf und kein abgeschnittener Inhalt auftreten. Bei Mainboard und Rückseite müssen Grafik, vollständige HTML-Auswahllegende und Erklärung darunter sichtbar und bedienbar bleiben. Bei Desktop und Notebook bleiben auf schmalen Ansichten die SVG-Etiketten ausgeblendet.
- Beim Mainboard die nummerierten Marken auf der Grafik mit den Einträgen der Legende abgleichen, auch bei 320 px. Bei der Rückseite die Anschlussbeschriftungen und zugehörigen Auswahlknöpfe abgleichen. Kleine Maß- und Dekorationstexte können bei schmaler Darstellung unlesbar sein; die Bauteilauswahl und -erklärung müssen dennoch verfügbar bleiben.

Terminus hat den Layoutstand bei 1440/768/320 px einschließlich simulierter Touch-Bedienung geprüft. GLaDOS hat unabhängig im gezielt geprüften Layoutumfang keine reproduzierbaren Fehler festgestellt; Umfang und Grenzen stehen in `docs/uebergaben/2026-11-03_glados-pc-explorer-layout-qa.md`. Dies ist keine vollständige oder fachliche Abnahme. Eine Touch-Simulation ersetzt keinen Test auf einem echten Mobilgerät.

Die Lizenzlinks brauchen Internet, wenn du sie anklickst. Die Seite selbst nicht.

## Was dieser Stand nicht ist

- Keine fachliche Freigabe.
- Keine Server-Ansicht.
- Keine echten Fotos für Desktop-Teile oder das Notebook. Die auswählbare HTML-Legende ist die alternative Bedienung; bei Mainboard und Rückseite steht sie unter der Grafik.
- Die drei Fotos sind unveränderte Wikimedia-Commons-Dateien. Das BGA-Foto zeigt Lotkugeln nach Entfernung des Chips, nicht eine vollständige CPU.
- Wikipedia-Angaben im Modul sind vorläufig gekennzeichnet.

## Nachprüfung: Kontexttexte und USB (03.11.2026)

- Beim Wechsel aller fünf Ansichten den Erklärungstext direkt unter dem Schaubild prüfen: „Kühlung durchsichtig“ gehört ausschließlich zu Desktop und Notebook. Mainboard erklärt die Nummernlegende, Rückseite die Trennung von Buchsen und USB-Standardplaketten, ältere Anschlüsse ihren Vergleichszweck.
- Rückseite: USB-A und USB-C sind physische Steckerformen. USB 2.0, USB 3.2 und USB4 stehen in einem eigenen gestrichelten Bereich als Standards/Standardfamilien, nicht als zusätzliche Buchsentypen. Die Standards bleiben anwählbar und erklären sich wie die Buchsen über Grafik oder HTML-Legende.
- USB4 verwendet USB-C; daraus folgt nicht, dass jeder USB-C-Port USB4 unterstützt. Die Farbe einer Buchse beweist keine Geschwindigkeit. Bei 320 px die lesbaren Einleitungs-/Detailtexte und die HTML-Legende nutzen: der verkleinerte Grafiktext ist keine alleinige Informationsquelle.
- Erneut bei 1440/768/320 px auf Seitenüberlauf, sichtbaren Tastaturfokus und passende Detailaktualisierung achten. Technische Ergebnisse dieser Korrekturphase werden getrennt im neuen QA-/Abschlussbericht dokumentiert; ältere Prüfnachweise oben beziehen sich auf die vorangegangene Layoutphase.
