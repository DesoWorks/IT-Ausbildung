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
- Ein Bauteil in der Liste oder in der Skizze wählen.
- In **Rückseite** die Anschlüsse am Mainboard-I/O von den getrennten Grafikkarten-Ausgängen unterscheiden.
- In **Mainboard** die schematische Platinenübersicht und die auswählbaren Anschlüsse ansehen. Sie ist keine maßstäbliche Herstellerzeichnung.
- In **Ältere Anschlüsse** die getrennte Vergleichsansicht ansehen.
- Weiter unten **PGA**, **LGA** und **BGA** wählen. Nur dort erscheinen echte Fotos.
- Unter jedem Foto stehen Urheber, Lizenz und der Link zu Wikimedia Commons.
- Mit der Tastatur: Tab in die Liste, Pfeiltasten, Enter oder Leertaste.
- Das Fenster schmal ziehen. Die Seite soll nicht seitlich überlaufen.

Bei der Browserprüfung durch Terminus am 2026-11-03 blieb die Seite bei 320 px ohne seitlichen Überlauf. Die Mainboardgrafik wird stark verkleinert; die Beschriftungslegende und nummerierten Marken werden unter 600 px ausgeblendet. Kleine Maß- und Dekorationstexte sind dann nicht sinnvoll lesbar. Nutze auf schmalen Bildschirmen die darunterstehende Bauteilliste und die ausführliche Beschreibung. Die Grafik ist dort eine Übersicht, keine lesbare Detailzeichnung.

Die Lizenzlinks brauchen Internet, wenn du sie anklickst. Die Seite selbst nicht.

## Was dieser Stand nicht ist

- Keine fachliche Freigabe.
- Keine Server-Ansicht.
- Keine echten Fotos für Desktop-Teile oder das Notebook. Die Liste bleibt die gleichwertige Bedienung.
- Die drei Fotos sind unveränderte Wikimedia-Commons-Dateien. Das BGA-Foto zeigt Lotkugeln nach Entfernung des Chips, nicht eine vollständige CPU.
- Wikipedia-Angaben im Modul sind vorläufig gekennzeichnet.
