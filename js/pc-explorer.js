/* PC-Explorer (Desktop und Notebook). Läuft offline, ohne Bibliotheken. Daten und Darstellung sind getrennt,
   damit die Daten ohne Browser testbar sind. Maße stehen nur, wo eine Quelle sie nennt. */
(function (global) {
  "use strict";

  /* Quellen. Jede technische Aussage in DATEN verweist über "q" auf eine dieser IDs.
     vorlaeufig: Wikipedia ist keine Norm; die Aussage gilt nur als vorläufiger Beleg. */
  var QUELLEN = {
    "cpu-socket": { titel: "Wikipedia: CPU socket (Abschnitte Einleitung und Function)", url: "https://en.wikipedia.org/wiki/CPU_socket", abruf: "2026-11-01", vorlaeufig: true },
    "bga": { titel: "Wikipedia: Ball grid array (Einleitung und Description)", url: "https://en.wikipedia.org/wiki/Ball_grid_array", abruf: "2026-11-01", vorlaeufig: true },
    "formfaktor": { titel: "Wikipedia: Motherboard form factor (Einleitung und Overview)", url: "https://en.wikipedia.org/wiki/Motherboard_form_factor", abruf: "2026-11-01", vorlaeufig: true },
    "microatx": { titel: "Wikipedia: microATX (Einleitung und Backward compatibility)", url: "https://en.wikipedia.org/wiki/MicroATX", abruf: "2026-11-01", vorlaeufig: true },
    "mini-itx": { titel: "Wikipedia: Mini-ITX (Einleitung)", url: "https://en.wikipedia.org/wiki/Mini-ITX", abruf: "2026-11-01", vorlaeufig: true },
    "nvme": { titel: "NVM Express: About", url: "https://nvmexpress.org/about/", abruf: "2026-11-01" },
    "sata-io": { titel: "SATA-IO: Home", url: "https://www.sata-io.org/", abruf: "2026-11-01" },
    "ibm-dimm": { titel: "IBM Think: Qu’est-ce qu’un module de mémoire double en ligne (DIMM) ?", url: "https://www.ibm.com/fr-fr/think/topics/dimm", abruf: "2026-11-01" },
    "camm2": { titel: "JEDEC-Pressemitteilung zu CAMM2 (JESD318), 5. Dezember 2023", url: "https://www.jedec.org/news/pressreleases/jedec-publishes-new-camm2-memory-module-standard", abruf: "2026-11-01" },
    "m2": { titel: "Wikipedia: M.2 (Einleitung, Features, Form factors and keying)", url: "https://en.wikipedia.org/wiki/M.2", abruf: "2026-11-02", vorlaeufig: true },
    "btx": { titel: "Wikipedia: BTX (form factor)", url: "https://en.wikipedia.org/wiki/BTX_(form_factor)", abruf: "2026-11-02", vorlaeufig: true },
    "msi-pz": { titel: "MSI: Project Zero Desktop, Back-Connect", url: "https://www.msi.com/Landing/project-zero/desktop", abruf: "2026-11-02" },
    "usb-if": { titel: "USB Implementers Forum: Startseite (USB4, USB 3.2, USB 2.0 und USB Type-C als Themenbereiche)", url: "https://www.usb.org/", abruf: "2026-11-02" },
    "hdmi-org": { titel: "HDMI Licensing Administrator: Startseite", url: "https://www.hdmi.org/", abruf: "2026-11-02" },
    "displayport": { titel: "VESA: DisplayPort", url: "https://www.displayport.org/", abruf: "2026-11-02" },
    "legrand-rj45": { titel: "Legrand: Tout savoir sur la prise RJ45 (französisch)", url: "https://www.legrand.fr/guides/tout-savoir-sur-la-prise-rj45", abruf: "2026-11-02" },
    "ps2-wiki": { titel: "Wikipedia: PS/2 port", url: "https://en.wikipedia.org/wiki/PS/2_port", abruf: "2026-11-02", vorlaeufig: true },
    "atx-wiki": { titel: "Wikipedia: ATX (Einleitung)", url: "https://en.wikipedia.org/wiki/ATX", abruf: "2026-11-02", vorlaeufig: true },
    "pcie-wiki": { titel: "Wikipedia: PCI Express (Einleitung)", url: "https://en.wikipedia.org/wiki/Peripheral_Component_Interconnect_Express", abruf: "2026-11-02", vorlaeufig: true },
    "pata-wiki": { titel: "Wikipedia: Parallel ATA", url: "https://en.wikipedia.org/wiki/Parallel_ATA", abruf: "2026-11-02", vorlaeufig: true },
    "pci-wiki": { titel: "Wikipedia: Peripheral Component Interconnect", url: "https://en.wikipedia.org/wiki/Peripheral_Component_Interconnect", abruf: "2026-11-02", vorlaeufig: true },
    "agp-wiki": { titel: "Wikipedia: Accelerated Graphics Port", url: "https://en.wikipedia.org/wiki/Accelerated_Graphics_Port", abruf: "2026-11-02", vorlaeufig: true }
  };

  /* Pflicht-Texte je Bauteil: Funktion, Einbauort, Zusammenarbeit, Bauformen, Praxisbeispiel, Merksatz.
     "q" = Quellen-IDs, leer = reiner Lerntext ohne Zahl. "kurz" = kurze Beschriftung in der Zeichnung. */
  var TEILE = [
    { id: "cpu", name: "Prozessor (CPU)", kurz: "CPU", glossar: "CPU", layout: [308, 84, 84, 84],
      funktion: "Führt Programmbefehle aus und steuert den Rechenablauf.",
      ort: "Im CPU-Sockel auf dem Mainboard. Darüber sitzt der Kühler.",
      zusammen: "Holt Daten aus dem Arbeitsspeicher. Das Mainboard liefert Strom und Anschlüsse.",
      bauformen: "PGA: Stifte sitzen an der CPU. LGA: Kontaktstifte sitzen im Sockel. BGA: Das Bauteil wird fest auf die Platine gelötet. Diese Begriffe beschreiben die Kontaktanordnung, nicht allein die Kompatibilität.",
      praxis: "Ausbildungsbeispiel: Vor einem CPU-Tausch vergleichst du CPU und Sockel anhand der Herstellerangaben; gleiche Bauform allein beweist keine Kompatibilität.",
      merk: "Der Sockel entscheidet, welche CPU passt. Gleiche Größe heißt nicht gleich kompatibel.",
      fakt: "Ein Desktop-Mainboard hat einen Sockel, in den die CPU ohne Löten gesteckt oder aufgelegt wird.", q: ["cpu-socket"] },
    { id: "cool", name: "Kühlung", kurz: "Kühlung", glossar: "Kühlung", layout: [272, 48, 156, 156],
      funktion: "Führt Wärme von CPU und Grafikkarte ab.",
      ort: "Der Kühler sitzt auf der CPU, Gehäuselüfter sitzen im Gehäuse.",
      zusammen: "Hält die CPU im zulässigen Temperaturbereich, damit sie nicht drosselt.",
      bauformen: "Es gibt unterschiedliche Kühler- und Lüfterbauarten. Die passende Befestigung hängt von CPU-Sockel und Kühler ab; konkrete Kompatibilität muss geprüft werden.",
      praxis: "Ausbildungsbeispiel: Bei einer Wartung prüfst du, ob der Kühler sicher befestigt ist und ob Lüfter nicht blockiert sind.",
      merk: "Kühlerbefestigung und CPU-Sockel sind getrennte Fragen.",
      fakt: "Moderne CPU-Sockel werden fast immer zusammen mit einem Befestigungssystem für den Kühler entworfen.", q: ["cpu-socket"] },
    { id: "ram", name: "Arbeitsspeicher (RAM)", kurz: "RAM", glossar: "RAM", layout: [456, 48, 104, 150],
      funktion: "Hält Programme und Daten, mit denen die CPU gerade arbeitet.",
      ort: "In den Speicher-Steckplätzen neben dem CPU-Sockel.",
      zusammen: "Die CPU spricht über ihren Speichercontroller mit dem RAM. Die Speichergeneration muss zu Board und CPU passen.",
      bauformen: "DIMM ist ein Speichermodulformat, das laut IBM häufig in Desktop-PCs und Servern eingesetzt wird. SO-DIMM ist die kompaktere Modulbauart, die IBM für Laptops beschreibt. Die passenden Steckplätze müssen zum jeweiligen Modul passen.",
      praxis: "Ausbildungsbeispiel: Vor einer Speichererweiterung vergleichst du Modulbauart und Systemangaben; ein Modul passt nicht allein deshalb, weil es RAM ist.",
      merk: "Bei neuen Bauformen zählt nicht nur der Name, sondern auch die Speichertechnik.",
      fakt: "CAMM2 gibt es in zwei Ausführungen (DDR5 und LPDDR5/5X) mit gleichem Stecker, aber anderer Pinbelegung und anderer Befestigung. Sie sind nicht austauschbar.", q: ["camm2", "ibm-dimm"] },
    { id: "gpu", name: "Grafikkarte (GPU)", kurz: "GPU", glossar: "GPU", layout: [250, 248, 340, 64],
      funktion: "Berechnet Bilder und Grafik und gibt das Bild an den Monitor aus.",
      ort: "Im PCIe-Erweiterungssteckplatz des Mainboards.",
      zusammen: "Bekommt Daten von CPU und RAM. Das Netzteil versorgt sie mit Strom.",
      bauformen: "Grafik kann als eigenes Erweiterungsbauteil oder integriert in einem anderen Bauteil bereitgestellt werden. Konkrete Steckplatz- und Stromanforderungen hängen vom Gerät ab.",
      praxis: "Ausbildungsbeispiel: Du klärst, ob ein Arbeitsplatz eine eigene Grafikkarte benötigt und prüfst vor dem Einbau die Angaben von Mainboard, Gehäuse und Netzteil.",
      merk: "Integrierte Grafik sitzt in der CPU. Eine Grafikkarte ist ein eigenes Bauteil.", fakt: "", q: [] },
    { id: "ssd", name: "SSD", kurz: "SSD", glossar: "SSD", layout: [300, 212, 120, 22],
      funktion: "Speichert Daten dauerhaft ohne bewegte Teile.",
      ort: "Als M.2-Stick direkt auf dem Mainboard oder als Laufwerk im Gehäuse.",
      zusammen: "Das Betriebssystem wird von hier in den Arbeitsspeicher geladen.",
      bauformen: "M.2 ist ein Standard für kompakte Erweiterungsmodule und deren Steckverbindung. Er umfasst Bauform, Stecker und Kontaktbelegung, aber nicht automatisch die Datenübertragung. Eine M.2-SSD kann zum Beispiel SATA oder PCIe nutzen. NVMe ist ein Protokoll für den Zugriff auf nichtflüchtigen Speicher und wird typischerweise über PCIe eingesetzt. M.2 ist nicht dasselbe wie SATA, PCIe oder NVMe. Vergleich: M.2 ist die Schublade, SATA oder PCIe der Weg, NVMe die Sprache auf dem PCIe-Weg. M.2 bezeichnet nicht automatisch SATA oder NVMe. Die übliche Laufwerksbezeichnung 2,5-Zoll ist kein M.2-Maß.",
      praxis: "Ausbildungsbeispiel: Vor dem Austausch einer SSD prüfst du Anschluss, unterstützte Schnittstelle und Bauform in den Geräteangaben.",
      merk: "M.2 ist nicht dasselbe wie SATA, PCIe oder NVMe.",
      fakt: "Wikipedia beschreibt M.2 als Spezifikation für interne Erweiterungsmodule. Genannt werden eine Breite von 22 mm und Längen von 30, 42, 60, 80 oder 110 mm. Vorläufig, kein gelesener PCI-SIG-Normtext.", q: ["nvme", "sata-io", "m2"] },
    { id: "hdd", name: "Festplatte (HDD)", kurz: "HDD", glossar: "HDD", layout: [446, 392, 176, 36],
      funktion: "Speichert Daten magnetisch auf rotierenden Scheiben. Sie ist günstig und groß.",
      ort: "Im Laufwerksschacht des Gehäuses, per Datenkabel mit dem Mainboard verbunden.",
      zusammen: "Daten laufen über das Datenkabel zum Mainboard, Strom kommt vom Netzteil.",
      bauformen: "Festplatten gibt es in verschiedenen Gehäuse- und Anschlussvarianten. Im Desktop sitzt sie typischerweise als 3,5-Zoll-Laufwerk in einem Laufwerksschacht. Konkrete Maße stehen hier nicht.",
      praxis: "Ausbildungsbeispiel: Bei einer Speichererweiterung prüfst du Laufwerksschacht, Anschluss und Gerätevorgaben, bevor du ein Laufwerk auswählst.",
      merk: "Sie enthält bewegte Teile und ist deshalb stoßempfindlicher als eine SSD.", fakt: "", q: [] },
    { id: "psu", name: "Netzteil (PSU)", kurz: "Netzteil", glossar: "Netzteil", layout: [176, 384, 232, 70],
      funktion: "Wandelt die Netzspannung in niedrige Gleichspannungen für die Bauteile um.",
      ort: "Im Gehäuse, meist unten oder hinten.",
      zusammen: "Versorgt Mainboard, Grafikkarte und Laufwerke über Kabel.",
      bauformen: "Netzteile unterscheiden sich unter anderem durch Bauform, Anschlüsse und Leistungsdaten. Eine passende Auswahl muss anhand der konkreten Komponenten geprüft werden.",
      praxis: "Ausbildungsbeispiel: Bei einer PC-Planung prüfst du, ob die erforderlichen Stromanschlüsse vorhanden sind und ob das Netzteil laut Herstellerangaben zur Konfiguration passt.",
      merk: "Ein geöffnetes Netzteil nicht berühren: Es kann auch nach dem Ausschalten gefährlich sein.", fakt: "", q: [] },
    { id: "board", name: "Mainboard", kurz: "Mainboard", glossar: "Mainboard", layout: [236, 32, 350, 300], grund: true,
      funktion: "Verbindet alle Bauteile und verteilt Strom und Daten.",
      ort: "Im Gehäuse verschraubt. Die Bauform (Formfaktor) bestimmt, ob es ins Gehäuse passt.",
      zusammen: "Trägt CPU-Sockel, Speicher-Steckplätze, PCIe-Steckplätze, M.2- und SATA-Anschlüsse sowie die Stromanschlüsse vom Netzteil.",
      bauformen: "ATX, microATX und Mini-ITX sind Mainboard-Formfaktoren. Formfaktor und Gehäuse müssen zueinander passen. Die verfügbaren Ausführungen unterscheiden sich je nach Board; die hier vorliegenden Formfaktorquellen sind Wikipedia und keine Normtexte.",
      praxis: "Ausbildungsbeispiel: Bei der Zusammenstellung eines Rechners prüfst du in den Herstellerangaben, ob Mainboard-Bauform und Gehäuse zusammenpassen.",
      merk: "Wichtige Verbindungen: PCIe für Erweiterungskarten, M.2 und SATA für Laufwerke, Stromkabel vom Netzteil.",
      fakt: "Das Mainboard ist die zentrale Platine, an der die anderen Bauteile angeschlossen werden, und verteilt Strom an andere Platinen.", q: ["formfaktor"] },
    { id: "gehaeuse", name: "Gehäuse und Anschlüsse", kurz: "Gehäuse", glossar: "Gehäuse", layout: [140, 12, 500, 450], grund: true,
      funktion: "Das Gehäuse umschließt die Bauteile. Es bietet Befestigungspunkte und Öffnungen für Kabel und Anschlüsse.",
      ort: "Die Bauteile werden im Inneren am Gehäuse befestigt. Anschlüsse an der Vorder- oder Rückseite sind von außen erreichbar.",
      zusammen: "Das Gehäuse muss Platz und Befestigung für Mainboard, Netzteil und Laufwerke bieten. Öffnungen und Lüfter unterstützen den Luftweg. Prüfe vor dem Einbau die Angaben der jeweiligen Geräte.",
      anschluesse: {
        aussen: ["Stromversorgung des Rechners", "Bildausgabe zu einem Bildschirm", "Anschluss von USB-Geräten", "Verbindung mit einem Netzwerk"],
        innen: ["Stromkabel vom Netzteil zu Mainboard, Grafikkarte und Laufwerken", "Datenkabel von den Laufwerken zum Mainboard"]
      },
      bauformen: "Gehäuse unterscheiden sich durch Größe, Innenaufteilung und unterstützte Mainboard-Bauformen. Die genaue Passung hängt vom konkreten Gehäuse und den Bauteilen ab.",
      praxis: "Ausbildungsbeispiel: Bei einer Systemintegration prüfst du vor dem Einbau, ob Mainboard und Laufwerke befestigt werden können und ob die benötigten Anschlüsse zugänglich sind. Das Beispiel nennt keine konkrete Produktspezifikation.",
      merk: "Passt etwas mechanisch, ist es noch nicht automatisch kompatibel. Eine Buchsenform allein sagt nichts über die Funktion.",
      fakt: "", q: [] }
  ];

  var SOCKEL = [
    { id: "pga", name: "PGA (Pin Grid Array)", glossar: "CPU",
      funktion: "Die Kontakte sind Stifte an der Unterseite der CPU.",
      ort: "Die CPU wird in den Sockel gesteckt. Wenn der Sockel einen Hebel hat, wird er danach geschlossen.",
      zusammen: "Der Sockel hat für jeden Stift einen Metallkontakt und ist oft so geformt, dass die CPU nur richtig herum passt.",
      bauformen: "PGA, LGA und BGA beschreiben, wo die Kontakte sitzen. Sie sagen nicht allein, ob eine CPU zu einem Mainboard passt.",
      praxis: "Ausbildungsbeispiel: Vor einem CPU-Tausch vergleichst du CPU und Sockel anhand der Herstellerangaben. Gleiche Bauform allein beweist keine Kompatibilität.",
      merk: "PGA: Stifte an der CPU.", fakt: "", q: ["cpu-socket"],
      foto: { pfad: "../assets/pc-explorer/commons/Pentium_4_Underside_Demonstrating_PGA_Socket.JPG",
        alt: "Unterseite eines Pentium-4-Prozessors mit dem dichten Feld goldfarbener Kontaktstifte (PGA).",
        urheber: "Liam McSherry", lizenz: "CC BY-SA 3.0", lizenzUrl: "https://creativecommons.org/licenses/by-sa/3.0",
        commonsUrl: "https://commons.wikimedia.org/wiki/File:Pentium_4_Underside_Demonstrating_PGA_Socket.JPG",
        unterschrift: "Echtes Foto der Unterseite eines Pentium 4 von 2001. Foto: Liam McSherry, CC BY-SA 3.0 (via Wikimedia Commons)." } },
    { id: "lga", name: "LGA (Land Grid Array)", glossar: "CPU",
      funktion: "Die CPU hat flache Kontaktflächen, die Kontaktstifte sitzen im Sockel.",
      ort: "Die CPU wird in den Sockel gelegt, eine Halteplatte wird darüber geklappt und der Hebel verriegelt. Das drückt die Kontakte der CPU fest auf die Kontakte des Sockels.",
      zusammen: "Der Anpressdruck sorgt für guten Kontakt und mehr mechanische Stabilität.",
      bauformen: "Bei LGA sitzen die Kontaktstifte im Sockel, bei PGA an der CPU. Die Bauform nennt nur die Kontaktanordnung.",
      praxis: "Ausbildungsbeispiel: Beim Einbau legst du die CPU vorsichtig in den Sockel, schließt Halteplatte und Hebel und folgst dabei der Anleitung des Herstellers.",
      merk: "LGA: Kontaktflächen an der CPU, Stifte im Sockel.", fakt: "", q: ["cpu-socket"],
      foto: { pfad: "../assets/pc-explorer/commons/LGA_1155_socket-6510.jpg",
        alt: "Ein konkreter LGA-1155-Sockel mit den Kontaktstiften im Sockel.",
        urheber: "Raimond Spekking", lizenz: "CC BY-SA 4.0", lizenzUrl: "https://creativecommons.org/licenses/by-sa/4.0",
        commonsUrl: "https://commons.wikimedia.org/wiki/File:LGA_1155_socket-6510.jpg",
        unterschrift: "Echtes Foto eines konkreten LGA-1155-Sockels. © Raimond Spekking / CC BY-SA 4.0 (via Wikimedia Commons)." } },
    { id: "bga", name: "BGA (Ball Grid Array)", glossar: "CPU",
      funktion: "Die Kontakte sind Lötkugeln. Das Bauteil wird fest auf die Platine gelötet.",
      ort: "Direkt auf der Platine, ohne Sockel. Notebooks nutzen häufig aufgelötete CPUs, Desktop-Boards haben meist einen Sockel.",
      zusammen: "Die CPU lässt sich nicht ohne Löten tauschen. Dafür braucht sie weniger Platz auf dem Mainboard.",
      bauformen: "Ein BGA-Bauteil ist nicht regulär ohne Löt- und Spezialarbeiten austauschbar. Ob ein Gerät das zulässt, hängt vom Gerät ab.",
      praxis: "Ausbildungsbeispiel: Bei einem Notebook mit aufgelöteter CPU rechnest du nicht mit einem normalen CPU-Tausch, sondern klärst mit den Wartungsunterlagen, was möglich ist.",
      merk: "BGA: festgelötet, kein Sockel, Tausch nur mit Spezialarbeit.", fakt: "", q: ["bga", "cpu-socket"],
      foto: { pfad: "../assets/pc-explorer/commons/Solder_ball_grid.jpg",
        alt: "Lötkugeln in einem Raster auf einer Leiterplatte, nachdem der Chip entfernt wurde.",
        urheber: "Janke", lizenz: "CC BY-SA 3.0", lizenzUrl: "https://creativecommons.org/licenses/by-sa/3.0",
        commonsUrl: "https://commons.wikimedia.org/wiki/File:Solder_ball_grid.jpg",
        unterschrift: "Lotkugeln auf der Leiterplatte nach Entfernung des Chips, nicht die Unterseite einer vollständigen CPU. Foto: Janke, CC BY-SA 3.0 (via Wikimedia Commons)." } }
  ];

  var FORMEN = [
    { id: "atx", name: "ATX", glossar: "Mainboard",
      funktion: "Der verbreitete Standard-Formfaktor für Desktop-Mainboards.",
      ort: "305 × 244 mm. Wikipedia nennt das als Größe eines ATX-Boards. Vorläufig, kein gelesener Intel-Normtext.",
      zusammen: "ATX löste 1995 den älteren AT-Standard ab. Kleinere Boards wurden passend zu ATX-Befestigungspunkten entworfen.",
      bauformen: "ATX, microATX und Mini-ITX unterscheiden sich vor allem in Größe und Anzahl der Erweiterungsplätze. E-ATX und BTX stehen extra. Die Angaben stammen aus Wikipedia und sind vorläufig, keine Normtexte.",
      praxis: "Ausbildungsbeispiel: Du prüfst in den Herstellerangaben, ob Mainboard-Formfaktor und Gehäuse zusammenpassen. Mechanisch passend heißt nicht vollständig kompatibel.",
      merk: "ATX ist der Maßstab, an dem sich die kleineren Formen ausrichten.", fakt: "", q: ["formfaktor", "microatx"] },
    { id: "microatx", name: "microATX", glossar: "Mainboard",
      funktion: "Eine kleinere Variante, die bewusst zu ATX rückwärtskompatibel ist.",
      ort: "Höchstens 244 × 244 mm. Eingeführt im Dezember 1997. Es gibt auch kleinere Boards, die sich microATX nennen.",
      zusammen: "Die Befestigungspunkte sind auf ATX-Gehäuse abgestimmt. Das Board passt daher in viele ATX-Gehäuse.",
      bauformen: "microATX ist kleiner als ATX und bewusst rückwärtskompatibel zu ATX-Befestigungen. Es gibt aber auch kleinere Boards, die sich microATX nennen.",
      praxis: "Ausbildungsbeispiel: Ein microATX-Board soll in ein ATX-Gehäuse. Du prüfst die Gehäuseangaben, bevor du es einbaust.",
      merk: "microATX: kleiner als ATX, passt oft in ATX-Gehäuse.", fakt: "", q: ["microatx"] },
    { id: "miniitx", name: "Mini-ITX", glossar: "Mainboard",
      funktion: "Ein sehr kleiner Formfaktor für kompakte Rechner.",
      ort: "170 × 170 mm, entwickelt von VIA Technologies, 2001. Vier Befestigungslöcher passen zu vier Löchern der ATX-Boards.",
      zusammen: "Es hat nur einen Erweiterungssteckplatz. Dadurch passt es oft auch in ATX- und microATX-Gehäuse.",
      bauformen: "Mini-ITX ist sehr klein und hat nur einen Erweiterungsplatz. Du brauchst weniger Platz, musst Erweiterungen aber sorgfältig wählen.",
      praxis: "Ausbildungsbeispiel: Für einen kompakten Arbeitsplatz-PC prüfst du, ob ein einziger Erweiterungsplatz für den Bedarf reicht.",
      merk: "Mini-ITX: klein, ein Erweiterungsplatz.", fakt: "", q: ["mini-itx"] },
    { id: "eatx", name: "Extended ATX (E-ATX)", glossar: "Mainboard",
      funktion: "Eine Herstellerbezeichnung für Boards, die größer sind als ATX. Kein einzelner Standard mit festen Maßen.",
      ort: "Größer als ATX. Es gibt keine einheitliche Größe. Manche Übersichten nennen 305 × 330 mm. Das gilt nicht für jedes Board mit der Bezeichnung E-ATX.",
      zusammen: "Ob ein E-ATX-Board in ein Gehäuse passt, steht in den Angaben zu genau diesem Board und diesem Gehäuse.",
      bauformen: "E-ATX ist kein Formfaktor mit einer einzigen Abmessung. Hersteller definieren die Bezeichnung unterschiedlich.",
      praxis: "Ausbildungsbeispiel: Ein Gehäuse wirbt mit E-ATX. Du vergleichst die Maße des konkreten Boards mit der Gehäuseangabe, statt dich auf den Namen zu verlassen.",
      merk: "E-ATX heißt nicht: alle diese Boards sind gleich groß.", fakt: "", q: ["formfaktor", "microatx"] },
    { id: "btx", name: "BTX (Balanced Technology Extended)", glossar: "Mainboard",
      funktion: "Historisches Format. Intel wollte damit ATX ersetzen. Die Weiterentwicklung für den Handel wurde 2006 eingestellt. Heute selten.",
      ort: "Wikipedia nennt für BTX 325 × 267 mm. Vorläufig, kein gelesener Intel-Normtext.",
      zusammen: "BTX ändert Anordnung und Befestigung gegenüber ATX. Es ist kein aktueller Standard für neue Arbeitsplatzrechner.",
      bauformen: "BTX ist historisch und heute selten. Nicht mit ATX oder E-ATX verwechseln.",
      praxis: "Ausbildungsbeispiel: In einem alten Gerät steht BTX. Du behandelst es als historisches Format und prüfst die Unterlagen, statt ein ATX-Board einzusetzen.",
      merk: "BTX ist historisch und heute selten.", fakt: "", q: ["btx", "formfaktor"] }
  ];

  var CAMM2_TEXT = "JEDEC hat am 5. Dezember 2023 den Standard JESD318 veröffentlicht: Compression Attached Memory Module, kurz CAMM2. " +
    "Er beschreibt DDR5-CAMM2 und LPDDR5/5X-CAMM2. DDR5-CAMM2 ist für leistungsstarke Notebooks und übliche Desktop-PCs gedacht, " +
    "LPDDR5/5X-CAMM2 für eine breitere Notebook-Spanne und manche Server. Beide nutzen dasselbe Steckerdesign, aber unterschiedliche Pinbelegung. " +
    "Unterschiedliche Befestigung soll verhindern, dass ein Modul dort sitzt, wo es nicht hingehört. Die Varianten sind nicht austauschbar. " +
    "Der vollständige Standardtext wurde nicht geöffnet; die Aussage stammt aus der Pressemitteilung.";

  var NOTEBOOK_TEILE = [
    { id: "board", name: "Mainboard", kurz: "Mainboard", glossar: "Mainboard", layout: [162, 84, 280, 206], grund: true,
      funktion: "Verbindet die Bauteile des Notebooks.",
      ort: "Im Inneren des Gehäuses. Lage und Aufbau hängen vom Modell ab.",
      zusammen: "Sie verbindet Prozessor, Speicher, Laufwerk, Anschlüsse und Stromversorgung.",
      bauformen: "Auf der Mainboard können Bauteile fest verlötet oder über Steckplätze angeschlossen sein. Das ist modellabhängig.",
      praxis: "Ausbildungsbeispiel: Vor einer Reparatur suchst du die Wartungsunterlagen des konkreten Modells.",
      merk: "Im Notebook ist vieles fest eingebaut. Prüfe immer das genaue Modell.", fakt: "", q: [] },
    { id: "cpu", name: "Prozessor (CPU)", kurz: "CPU", glossar: "CPU", layout: [270, 118, 56, 56],
      funktion: "Führt Befehle aus und steuert Rechenaufgaben.",
      ort: "Auf der Platine, oft unter dem Kühlkörper. Ob er verlötet oder auswechselbar ist, steht in den Modellunterlagen.",
      zusammen: "Arbeitet mit Arbeitsspeicher und Kühlung zusammen.",
      bauformen: "Bei vielen modernen Notebooks ist der Prozessor als BGA fest auf die Platine gelötet. Ein austauschbarer Prozessor kommt vor, ist aber die Ausnahme und steht in den Wartungsunterlagen des Modells. PGA und LGA sind typische Desktop-Sockel und hier nicht der Normalfall.",
      praxis: "Ausbildungsbeispiel: Bei einer Fehlerdiagnose prüfst du zuerst die Modellunterlagen, bevor du einen Austausch annimmst.",
      merk: "Nicht jede Notebook-CPU lässt sich tauschen. Prüfe das Modell.", fakt: "", q: [] },
    { id: "cool", name: "Kühlung", kurz: "Kühlung", glossar: "Kühlung", layout: [266, 114, 252, 142],
      funktion: "Führt Wärme aus dem engen Geräteinneren ab.",
      ort: "Im Inneren des Gehäuses, nahe der Wärmequellen. Lüftungsöffnungen im Gehäuse bilden den Luftweg.",
      zusammen: "Lüfter und Kühlflächen müssen zum verfügbaren Platz und zum Luftweg passen.",
      bauformen: "Kühlteile sind Teil des modellabhängigen Innenaufbaus. Der knappe Platz begrenzt Anordnung und Luftweg; konkrete Aussagen sind vom Modell abhängig. Die Zeichnung zeigt ein Beispiel: Wärmeverteiler über CPU und GPU, Heatpipes zum Lüfter und Kühlrippen am Luftauslass. Sie verdecken die Chips, diese bleiben aber auswählbar.",
      praxis: "Ausbildungsbeispiel: Bei einer Wartung kontrollierst du nach Herstelleranleitung, ob Lüftungsöffnungen frei sind.",
      merk: "Wenig Platz heißt wenig Luft: Lüftungsöffnungen müssen frei bleiben.", fakt: "", q: [] },
    { id: "ram", name: "Arbeitsspeicher (RAM)", kurz: "RAM", glossar: "RAM", layout: [348, 244, 90, 40],
      funktion: "Hält aktuell benötigte Daten und Programme bereit.",
      ort: "Fest auf der Mainboard verlötet oder in einem Steckplatz beziehungsweise Modulsystem. Das Modell entscheidet.",
      zusammen: "Der Prozessor greift auf den Arbeitsspeicher zu.",
      bauformen: "Verlöteter RAM ist fest mit der Platine verbunden und nicht als gewöhnliches Steckmodul entnehmbar. Austauschbarer RAM sitzt in einem dafür vorgesehenen Steckplatz oder Modulsystem. Ob ein bestimmtes Notebook das unterstützt, muss in dessen Unterlagen geprüft werden. SO-DIMM ist laut IBM ein kompaktes Speichermodulformat, das häufig in Laptops verwendet wird. Neuere Bauform: CAMM2, ein JEDEC-Standard (JESD318). Die beiden CAMM2-Varianten sind nicht austauschbar. Die Namen allein belegen keine Kompatibilität.",
      praxis: "Ausbildungsbeispiel: Vor einer Speichererweiterung prüfst du die Wartungs- und Spezifikationsangaben des genauen Notebookmodells.",
      merk: "Verlötet oder steckbar: Das entscheidet das Modell, nicht der RAM-Name.",
      fakt: CAMM2_TEXT, q: ["camm2", "ibm-dimm"] },
    { id: "gpu", name: "Grafikeinheit (GPU)", kurz: "GPU", glossar: "GPU", layout: [270, 200, 64, 52],
      funktion: "Berechnet Bilder und Grafik für den Bildschirm.",
      ort: "Je nach Modell in einem anderen Bauteil integriert oder als eigener Grafikchip vorhanden. Das steht in den Modellunterlagen.",
      zusammen: "Bekommt Daten von Prozessor und Arbeitsspeicher.",
      bauformen: "Integrierte Grafik sitzt im Prozessor. Eine separate Grafiklösung ist ein eigener Chip auf der Platine. Einen Steckplatz wie im Desktop-PC solltest du nicht voraussetzen. Was das Gerät hat, steht in den Modellunterlagen.",
      praxis: "Ausbildungsbeispiel: Eine Kundin wünscht mehr Grafikleistung. Du prüfst in den Modellunterlagen, welche Grafik das Gerät hat und ob sie überhaupt erweiterbar ist.",
      merk: "Grafik im Notebook ist modellabhängig: integriert oder als eigener Chip.", fakt: "", q: [] },
    { id: "ssd", name: "SSD", kurz: "SSD", glossar: "SSD", layout: [172, 110, 82, 22],
      funktion: "Speichert Betriebssystem und Dateien dauerhaft.",
      ort: "Im Inneren des Gehäuses, je nach Modell auf der Platine oder an einem Laufwerksplatz.",
      zusammen: "Beim Start werden benötigte Daten vom Speicher in den Arbeitsspeicher geladen.",
      bauformen: "Ob eine SSD austauschbar ist, hängt vom Modell ab. M.2 ist ein Standard für kompakte Erweiterungsmodule und deren Steckverbindung, nicht automatisch die Datenübertragung. Eine M.2-SSD kann SATA oder PCIe nutzen. NVMe ist ein Protokoll und typischerweise über PCIe im Einsatz. M.2 ist nicht dasselbe wie SATA, PCIe oder NVMe. M.2 bezeichnet nicht automatisch SATA oder NVMe.",
      praxis: "Ausbildungsbeispiel: Du prüfst vor einem Tausch die Modellunterlagen und sicherst wichtige Daten nach Auftrag.",
      merk: "M.2 ist nicht dasselbe wie SATA, PCIe oder NVMe.",
      fakt: "Wikipedia beschreibt M.2 als Spezifikation für interne Erweiterungsmodule. Genannt werden eine Breite von 22 mm und Längen von 30, 42, 60, 80 oder 110 mm. Vorläufig, kein gelesener PCI-SIG-Normtext.", q: ["nvme", "sata-io", "m2"] },
    { id: "akku", name: "Akku", kurz: "Akku", glossar: "Akku", layout: [176, 300, 330, 72],
      funktion: "Versorgt das Notebook unterwegs mit Energie.",
      ort: "Im Gehäuse. Ob er von außen oder nur nach dem Öffnen erreichbar ist, hängt vom Modell ab.",
      zusammen: "Der Akku arbeitet mit Ladeelektronik und Stromversorgung zusammen.",
      bauformen: "Austauschbarkeit und Wartungsweg sind modellabhängig.",
      praxis: "Ausbildungsbeispiel: Vor Wartung oder Ersatz beachtest du die Herstelleranleitung und Sicherheitsvorgaben.",
      merk: "Vor Arbeiten am Akku immer die Herstelleranleitung lesen.", fakt: "", q: [] },
    { id: "netzteil", name: "Externes Netzteil", kurz: "Netzteil", glossar: "Netzteil", layout: [588, 330, 130, 60],
      funktion: "Wandelt die Netzspannung in eine Spannung zum Laden und Betreiben des Notebooks um.",
      ort: "Außerhalb des Notebooks, über ein Kabel mit dem Gerät verbunden. Das ist modellabhängig.",
      zusammen: "Arbeitet mit Ladeelektronik und Akku zusammen.",
      bauformen: "Netzteile unterscheiden sich je nach Gerät. Welches Netzteil passt, steht in den Modellunterlagen; Anschlussform und Leistungsangaben werden hier nicht festgelegt.",
      praxis: "Ausbildungsbeispiel: Lädt ein Notebook nicht, prüfst du anhand der Modellunterlagen, welches Netzteil zum Gerät gehört, bevor du Teile tauschst.",
      merk: "Das Netzteil gehört zum Gerät. Ein anderes passt nicht automatisch.", fakt: "", q: [] },
    { id: "gehaeuse", name: "Gehäuse und Anschlüsse", kurz: "Gehäuse", glossar: "Gehäuse", layout: [140, 60, 420, 330], grund: true,
      funktion: "Das Gehäuse hält die Bauteile des Notebooks zusammen und schützt sie. Anschlüsse und Lüftungsöffnungen sind modellabhängig.",
      ort: "Es umschließt alle Bauteile. Die Anschlüsse sitzen an den Seiten oder an der Rückseite, je nach Modell.",
      zusammen: "Das Gehäuse gibt Platz und Befestigung für Mainboard, Akku, Kühlung und Speicher vor. Lüftungsöffnungen bilden den Luftweg.",
      bauformen: "Notebooks bündeln viele Funktionen in einem kleinen Gehäuse. Der knappe Innenraum begrenzt Anordnung, Erweiterung und Luftweg; konkrete Aussagen sind vom Modell abhängig. Eine Anschlussform wie USB-C sagt allein nicht, ob damit geladen oder ein Bild ausgegeben werden kann.",
      praxis: "Ausbildungsbeispiel: Vor dem Öffnen liest du die Wartungsanleitung des Modells und beachtest die Sicherheitsvorgaben.",
      merk: "Das Gehäuse ist eng: Platz und Luftweg setzen Grenzen.", fakt: "", q: [] }
  ];

  /* ---------- Anschlussansichten: Rückseite, Mainboard-Detail, historische Technik ----------
     Jeder Eintrag trägt "gruppe" (mainboard-io, erweiterungskarte, mainboard, historisch), "layout" (Teil in der Zeichnung)
     und "lab" = [x, y, Ausrichtung] der Beschriftung (fehlt, wenn der Text im Teil selbst steht).
     Alle Einträge sind Beispiele und keine Ausstattungsliste. Quellengrenzen stehen in "fakt" und in der Quellenliste. */
  var GRUPPEN = {
    "mainboard-io": "Mainboard-I/O (fest am Mainboard)",
    "erweiterungskarte": "Erweiterungskarte (dedizierte Grafikkarte)",
    "mainboard": "Mainboard-Detail (Beispiel-Mainboard)",
    "historisch": "Historisch, nicht typisch für aktuelle Mainboards"
  };

  var HDMI_FAKT = "Der HDMI Licensing Administrator führt die HDMI Specification als Spezifikation für das HDMI-Ökosystem und nennt „Approved Connectors“ als Ressource. Die Version eines konkreten PC-Anschlusses lässt sich daraus nicht ableiten.";
  var DP_FAKT = "VESA nennt DisplayPort den de-facto-Standard für PC-Monitore und eingebettete Displays. Als Steckeroptionen werden der einrastende Standardstecker, Mini-DP und USB Type-C genannt. Daraus folgt nicht, dass jeder PC oder jeder USB-C-Port DisplayPort bietet.";
  var PCIE_FAKT = "Wikipedia (vorläufig): PCI Express, abgekürzt PCIe, ist ein schneller Standard, um Hardwarekomponenten im Inneren von Computern zu verbinden. Genannt werden unter anderem Grafikkarten und Speichergeräte; die Seite zeigt unterschiedliche Steckplatz-Ausführungen. Eine Aussage über die Kompatibilität einzelner Karten mit einzelnen Steckplätzen macht sie nicht.";
  var ATX_FAKT = "Wikipedia (vorläufig): ATX ist ein Mainboard-Standard, der unter anderem Maße, Befestigungspunkte, die Anschlussblende, die Lage der Erweiterungssteckplätze und Stromversorgungsanschlüsse festlegt. Der konkrete Stecker wird in diesem Artikel nicht belegt.";

  var RUECK_TEILE = [
    { id: "usb-a", name: "USB-A-Anschluss", kurz: "USB-A", glossar: "USB", gruppe: "mainboard-io", layout: [152, 80, 110, 50], lab: [207, 148, "middle"],
      funktion: "Hier wird ein USB-Gerät angeschlossen.",
      ort: "Beispiel: In der Anschlussblende des Mainboards auf der Rückseite. Anzahl und Anordnung sind je nach Board verschieden.",
      zusammen: "Das Mainboard stellt den Anschluss bereit. Welcher USB-Standard dahintersteckt, sagt die Steckerform allein nicht.",
      bauformen: "USB-A bezeichnet die Steckerform. Die Form des Steckers ist hier nicht durch eine USB-IF-Quelle belegt. USB 2.0, USB 3.2 und USB4 sind Standardnamen und keine Steckerformen.",
      praxis: "Ausbildungsbeispiel: Eine Kundin fragt, wo sie ein USB-Gerät anstecken kann. Du zeigst ihr die Buchsen und liest in den Herstellerangaben nach, welchen Standard sie bieten.",
      merk: "Steckerform und USB-Standard sind zwei verschiedene Fragen.", fakt: "", q: ["usb-if"] },
    { id: "usb-c", name: "USB-C-Anschluss (USB Type-C)", kurz: "USB-C", glossar: "USB", gruppe: "mainboard-io", layout: [282, 80, 56, 50], lab: [310, 148, "middle"],
      funktion: "Ein USB-Anschluss mit der Bezeichnung USB Type-C.",
      ort: "Beispiel: In der Anschlussblende des Mainboards. Nicht jedes Board hat einen solchen Anschluss.",
      zusammen: "Das Mainboard stellt den Anschluss bereit. Was darüber läuft, hängt vom Board und vom angeschlossenen Gerät ab.",
      bauformen: "USB-C beschreibt hier den Anschluss, nicht automatisch einen bestimmten USB-Standard. Ob darüber nur Daten oder auch ein Bild laufen, ist eine eigene Frage. Ein USB-C-Anschluss bietet nicht automatisch DisplayPort.",
      praxis: "Ausbildungsbeispiel: Ein Monitor soll an einen USB-C-Anschluss. Du prüfst in den Herstellerangaben, ob dieser Anschluss Bildausgabe unterstützt, bevor du ein Kabel kaufst.",
      merk: "Gleicher Stecker heißt nicht gleiche Fähigkeiten.",
      fakt: "Die USB-IF-Startseite führt USB Type-C als eigenen Themenbereich neben USB 2.0, USB 3.2 und USB4. Eine Beschreibung der Steckerform steht dort nicht. Laut VESA ist USB Type-C eine der Steckeroptionen für DisplayPort; daraus folgt nicht, dass jeder USB-C-Port DisplayPort kann.", q: ["usb-if", "displayport"] },
    { id: "usb2", name: "USB 2.0 (Standardname)", kurz: "USB 2.0", glossar: "USB", gruppe: "mainboard-io", layout: [72, 204, 80, 30],
      funktion: "USB 2.0 ist der Name eines USB-Standards.",
      ort: "Die Plakette in der Zeichnung steht für den Standardnamen, nicht für eine bestimmte Buchse. Welche Buchse welchen Standard bietet, steht in den Angaben zum Board.",
      zusammen: "Ein Anschluss wie USB-A oder USB-C kann zu unterschiedlichen Standards gehören. Das Board legt fest, zu welchem.",
      bauformen: "Ein Standardname sagt nichts über die Steckerform. Er benennt die Technik, nicht den Stecker.",
      praxis: "Ausbildungsbeispiel: Im Datenblatt eines Boards steht ein USB-Standard neben der Anzahl der Anschlüsse. Du ordnest ihn den Buchsen am Gerät zu.",
      merk: "Nicht jeder USB-Port kann jeden USB-Standard.",
      fakt: "Die USB-IF-Startseite führt USB 2.0 als eigenen Technologiebereich neben USB 3.2 und USB4.", q: ["usb-if"] },
    { id: "usb3", name: "USB 3.x (hier USB 3.2, Standardname)", kurz: "USB 3.2", glossar: "USB", gruppe: "mainboard-io", layout: [172, 204, 80, 30],
      funktion: "USB 3.x steht für eine Familie von USB-Standards. Die USB-IF-Startseite nennt USB 3.2.",
      ort: "Die Plakette in der Zeichnung steht für den Standardnamen, nicht für eine bestimmte Buchse. Welche Buchse welchen Standard bietet, steht in den Angaben zum Board.",
      zusammen: "Ein Anschluss wie USB-A oder USB-C kann zu unterschiedlichen Standards gehören. Das Board legt fest, zu welchem.",
      bauformen: "Ein Standardname sagt nichts über die Steckerform. Er benennt die Technik, nicht den Stecker.",
      praxis: "Ausbildungsbeispiel: Zwei Buchsen sehen gleich aus. Du liest im Handbuch nach, ob beide denselben Standard bieten.",
      merk: "Ähnliche Buchsen können zu verschiedenen Standards gehören.",
      fakt: "Die USB-IF-Startseite führt USB 3.2 als eigenen Technologiebereich neben USB 2.0 und USB4. Andere Versionen der USB-3-Familie werden hier nicht behandelt.", q: ["usb-if"] },
    { id: "usb4", name: "USB4 (Standardname)", kurz: "USB4", glossar: "USB", gruppe: "mainboard-io", layout: [272, 204, 80, 30],
      funktion: "USB4 ist der Name eines USB-Standards.",
      ort: "Die Plakette in der Zeichnung steht für den Standardnamen, nicht für eine bestimmte Buchse. Nicht jedes Board bietet USB4.",
      zusammen: "Ob und an welcher Buchse ein Board USB4 bietet, steht in den Angaben zum Board.",
      bauformen: "Ein Standardname sagt nichts über die Steckerform. Er benennt die Technik, nicht den Stecker.",
      praxis: "Ausbildungsbeispiel: Eine Kundin will ein Gerät mit USB4 betreiben. Du prüfst in den Boardangaben, ob und wo ein solcher Anschluss vorhanden ist.",
      merk: "Der Name auf dem Datenblatt zählt, nicht die Annahme, dass jeder USB-Port das kann.",
      fakt: "Die USB-IF-Startseite führt USB4 als eigenen Technologiebereich neben USB 3.2 und USB 2.0.", q: ["usb-if"] },
    { id: "rj45", name: "RJ45-Netzwerkanschluss (Ethernet)", kurz: "RJ45", glossar: "Netzwerk", gruppe: "mainboard-io", layout: [358, 80, 100, 60], lab: [408, 158, "middle"],
      funktion: "Hier wird ein Netzwerkkabel angeschlossen, um den Rechner mit einem Netzwerk zu verbinden.",
      ort: "Beispiel: In der Anschlussblende des Mainboards. Anzahl und Lage sind je nach Board verschieden.",
      zusammen: "Das Kabel führt zu einem Router, Switch oder einer Netzwerkdose. Die Netzwerkkarte im Mainboard wertet die Signale aus.",
      bauformen: "RJ45 bezeichnet die Buchsenform. Geschwindigkeit und Kabelart sind eine andere Frage und stehen in den Angaben zu Gerät und Kabel.",
      praxis: "Ausbildungsbeispiel: Ein Arbeitsplatz hat keine Netzwerkverbindung. Du prüfst, ob das Kabel in der richtigen Buchse steckt und ob an der Buchse eine Anzeige leuchtet.",
      merk: "RJ45 ist die Buchse. Wie schnell sie arbeitet, sagt die Form allein nicht.",
      fakt: "Legrand (französischsprachig) nennt die RJ45-Buchse auch „prise Ethernet“ und beschreibt sie als Anschlussstandard unter anderem für den Zugang zum Internet.", q: ["legrand-rj45"] },
    { id: "audio", name: "Audioanschlüsse (Klinkenbuchsen)", kurz: "Audio", glossar: "Mainboard", gruppe: "mainboard-io", layout: [72, 262, 100, 50], lab: [122, 328, "middle"],
      funktion: "Hier werden Lautsprecher, Kopfhörer oder ein Mikrofon angeschlossen.",
      ort: "Beispiel: In der Anschlussblende des Mainboards. Anzahl, Beschriftung und Farben hängen vom Board ab.",
      zusammen: "Ein Audiochip auf dem Mainboard liefert und verarbeitet die Signale. Welche Buchse welche Aufgabe hat, steht im Handbuch.",
      bauformen: "Die Zeichnung zeigt ein Beispiel mit mehreren Buchsen. Bezeichnung und Belegung hängen vom Board ab und sind hier nicht belegt.",
      praxis: "Ausbildungsbeispiel: Ein Headset bleibt stumm. Du prüfst, ob es in der Buchse steckt, die laut Handbuch dafür vorgesehen ist.",
      merk: "Gleich aussehende Buchsen können unterschiedliche Aufgaben haben.", fakt: "", q: [] },
    { id: "hdmi-mb", name: "HDMI-Anschluss am Mainboard", kurz: "HDMI", glossar: "HDMI", gruppe: "mainboard-io", layout: [192, 262, 90, 40], lab: [237, 318, "middle"],
      funktion: "HDMI ist eine Bildschnittstelle im HDMI-Ökosystem. Hier wird ein Monitor angeschlossen.",
      ort: "Beispiel: In der Anschlussblende des Mainboards. Ob ein Board Bildausgänge hat, steht in den Angaben zum Board.",
      zusammen: "Die Ausgänge der Grafikkarte sind eine eigene Gruppe auf der rechten Seite der Zeichnung. Prüfe in den Herstellerangaben, welcher Ausgang für dein Gerät vorgesehen ist.",
      bauformen: "Die Zeichnung ist schematisch. Sie sagt nichts über die HDMI-Version dieses Anschlusses.",
      praxis: "Ausbildungsbeispiel: Der Monitor bleibt dunkel. Du prüfst, an welchen Ausgang das Kabel angeschlossen ist und ob dieser Ausgang laut Herstellerangaben aktiv ist.",
      merk: "Ausgang am Mainboard und Ausgang an der Grafikkarte sind zwei verschiedene Anschlüsse.",
      fakt: HDMI_FAKT, q: ["hdmi-org"] },
    { id: "dp-mb", name: "DisplayPort am Mainboard", kurz: "DisplayPort", glossar: "DisplayPort", gruppe: "mainboard-io", layout: [302, 262, 110, 40], lab: [347, 318, "middle"],
      funktion: "DisplayPort ist eine Bildschnittstelle. Hier wird ein Monitor angeschlossen.",
      ort: "Beispiel: In der Anschlussblende des Mainboards. Ob ein Board einen solchen Ausgang hat, steht in den Angaben zum Board.",
      zusammen: "Die Ausgänge der Grafikkarte sind eine eigene Gruppe auf der rechten Seite der Zeichnung.",
      bauformen: "Die Zeichnung legt sich nicht auf Standardstecker, Mini-DP oder USB-C fest. Welche Ausführung ein Anschluss hat, steht in den Herstellerangaben.",
      praxis: "Ausbildungsbeispiel: Ein Monitorkabel hat zwei verschiedene Enden. Du prüfst, welche Steckerform Gerät und Monitor tatsächlich haben.",
      merk: "DisplayPort ist die Schnittstelle. Der Stecker kann unterschiedlich aussehen.",
      fakt: DP_FAKT, q: ["displayport"] },
    { id: "ps2", name: "PS/2-Anschluss (älteres Beispiel)", kurz: "PS/2", glossar: "Mainboard", gruppe: "mainboard-io", layout: [72, 80, 60, 50], lab: [102, 148, "middle"],
      funktion: "Älterer Anschluss für Tastatur und Maus.",
      ort: "Beispiel: In der Anschlussblende mancher Mainboards. Ob ein Board ihn hat, hängt vom Board ab.",
      zusammen: "Wikipedia nennt USB als Nachfolger. Neuere Peripherie nutzt in der Regel USB.",
      bauformen: "PS/2 ist ein Mini-DIN-Stecker. Er ist ein älterer Anschluss und keine Standardausstattung aktueller PCs.",
      praxis: "Ausbildungsbeispiel: Ein sehr altes Gerät hat noch einen PS/2-Anschluss. Du erkennst ihn als ältere Technik und prüfst, ob das Board ihn überhaupt bietet.",
      merk: "PS/2 ist älter als USB und kein Standard von heute.",
      fakt: "Wikipedia (vorläufig): Der PS/2-Port ist ein Mini-DIN-Stecker für Tastaturen und Mäuse an PC-kompatiblen Systemen. Der Name stammt von der IBM-Reihe Personal System/2. Die Seite nennt USB als Nachfolger.", q: ["ps2-wiki"] },
    { id: "wlan", name: "WLAN-Antennenanschluss (Beispiel)", kurz: "WLAN", glossar: "WLAN", gruppe: "mainboard-io", layout: [432, 262, 60, 60], lab: [440, 338, "middle"],
      funktion: "Hier werden Antennen für ein WLAN-Modul des Mainboards angeschlossen.",
      ort: "Beispiel: Nur bei Mainboards mit WLAN. Dieser Anschluss ist keine Standardausstattung.",
      zusammen: "Das WLAN-Modul auf dem Mainboard empfängt und sendet über die angeschlossenen Antennen. Wie viele Antennen ein Board nutzt, hängt vom Board ab.",
      bauformen: "Die Zeichnung zeigt ein Beispiel ohne belegte Antennenzahl. Form und Anzahl der Anschlüsse sind je nach Board verschieden.",
      praxis: "Ausbildungsbeispiel: Das WLAN-Signal ist schwach. Du prüfst, ob die Antennen am Board angeschlossen sind.",
      merk: "Antennenanschlüsse gibt es nur bei Boards mit WLAN.", fakt: "", q: [] },
    { id: "hdmi-gpu", name: "HDMI-Ausgang der Grafikkarte", kurz: "HDMI (Karte)", glossar: "HDMI", gruppe: "erweiterungskarte", layout: [568, 110, 110, 36], lab: [623, 168, "middle"],
      funktion: "HDMI ist eine Bildschnittstelle im HDMI-Ökosystem. Dieser Ausgang gehört zur Grafikkarte.",
      ort: "Beispiel: An der Slotblende einer dedizierten Grafikkarte, die im PCIe-Steckplatz des Mainboards steckt. Er gehört zur Erweiterungskarte, nicht zum Mainboard-I/O.",
      zusammen: "Die Grafikkarte berechnet das Bild und gibt es hier aus. Anzahl und Art der Ausgänge hängen von der Karte ab.",
      bauformen: "Die Zeichnung ist schematisch. Sie sagt nichts über die HDMI-Version dieses Anschlusses.",
      praxis: "Ausbildungsbeispiel: Ein Arbeitsplatz hat eine eigene Grafikkarte. Du steckst das Monitorkabel an einen Ausgang der Karte und nicht an die Blende des Mainboards, soweit die Herstellerangaben nichts anderes sagen.",
      merk: "Dieser Ausgang gehört zur Karte und nicht zum Mainboard.",
      fakt: HDMI_FAKT, q: ["hdmi-org"] },
    { id: "dp-gpu", name: "DisplayPort-Ausgang der Grafikkarte", kurz: "DP (Karte)", glossar: "DisplayPort", gruppe: "erweiterungskarte", layout: [568, 200, 110, 36], lab: [623, 258, "middle"],
      funktion: "DisplayPort ist eine Bildschnittstelle. Dieser Ausgang gehört zur Grafikkarte.",
      ort: "Beispiel: An der Slotblende einer dedizierten Grafikkarte. Er gehört zur Erweiterungskarte, nicht zum Mainboard-I/O.",
      zusammen: "Die Grafikkarte berechnet das Bild und gibt es hier aus. Anzahl und Art der Ausgänge hängen von der Karte ab.",
      bauformen: "Die Zeichnung legt sich nicht auf Standardstecker, Mini-DP oder USB-C fest. Welche Ausführung ein Ausgang hat, steht in den Herstellerangaben der Karte.",
      praxis: "Ausbildungsbeispiel: Ein Monitor soll an die Grafikkarte. Du prüfst die Steckerform am Monitorkabel und am Ausgang der Karte.",
      merk: "Karten-Ausgänge und Mainboard-Ausgänge sind zwei Gruppen.",
      fakt: DP_FAKT, q: ["displayport"] }
  ];

  var BEGRIFFE = [
    { begriff: "Anschluss", text: "Sichtbare Buchse oder Kontaktstelle, an der Kabel oder Bauteile verbunden werden." },
    { begriff: "Steckplatz", text: "Mechanisch passende Aufnahme auf einer Platine, in die ein Modul oder eine Karte gesetzt wird." },
    { begriff: "Schnittstelle", text: "Vereinbarte Verbindung zwischen Komponenten. Sie kann elektrische und logische Merkmale umfassen." },
    { begriff: "Protokoll", text: "Regeln, nach denen Geräte Daten austauschen." },
    { begriff: "Bauform", text: "Größe und mechanische Gestalt eines Bauteils oder Moduls." }
  ];

  var MAINBOARD_TEILE = [
    { id: "atx24", name: "24-Pin-ATX", kurz: "ATX-Strom", glossar: "Mainboard", gruppe: "mainboard", layout: [690, 90, 40, 200], lab: [698, 182, "end"],
      funktion: "Stromanschluss des Mainboards: Hier kommt Strom vom Netzteil an.",
      ort: "Beispiel: Am Rand des Mainboards. Lage und Stecker sind je nach Board verschieden.",
      zusammen: "Das Netzteil liefert den Strom über ein Kabel, das Mainboard verteilt ihn an seine Bauteile.",
      bauformen: "Die ATX-Seite bei Wikipedia nennt nur allgemein Stromversorgungsanschlüsse und belegt den konkreten Stecker nicht. Der Name steht hier, weil er im Alltag so verwendet wird. Einzelheiten zu Kontakten und Spannungen gehören in die Herstellerunterlagen.",
      praxis: "Ausbildungsbeispiel: Beim Zusammenbau steckst du Netzteilkabel nur an, wenn Handbuch und Netzteilangaben dazu passen. Belegung und Spannungen prüfst du in den Herstellerunterlagen.",
      merk: "Stromstecker nicht nach Gefühl, sondern nach Herstellerangaben anschließen.",
      fakt: ATX_FAKT, q: ["atx-wiki"] },
    { id: "eps", name: "4-/8-Pin-EPS", kurz: "EPS/CPU-Strom", glossar: "Mainboard", gruppe: "mainboard", layout: [60, 50, 130, 28], lab: [128, 82, "middle"],
      funktion: "Zusätzliche Stromversorgung für den Bereich des Prozessors (CPU-Strom).",
      ort: "Beispiel: Am Rand des Mainboards in der Nähe des CPU-Sockels. Ob und wie viele solcher Anschlüsse ein Board hat, hängt vom Board ab.",
      zusammen: "Das Netzteil muss einen passenden Stecker haben. Das prüfst du in den Angaben von Board und Netzteil.",
      bauformen: "Die Anzahl der Kontakte steht hier nur im Namen. Der ATX-Artikel bei Wikipedia führt eine EPS-Variante nur als verwandten Abschnitt. Einzelheiten zu diesem Stecker sind nicht belegt und werden hier nicht behauptet.",
      praxis: "Ausbildungsbeispiel: Ein Board bleibt nach dem Einschalten dunkel. Du prüfst, ob alle Stromanschlüsse laut Handbuch belegt sind.",
      merk: "CPU-Strom und Hauptstrom sind getrennte Anschlüsse. Welche das Board braucht, steht im Handbuch.",
      fakt: "", q: ["atx-wiki"] },
    { id: "pcie-lang", name: "PCI-Express-Steckplatz (lang)", kurz: "PCIe lang", glossar: "GPU", gruppe: "mainboard", layout: [200, 400, 420, 28], lab: [358, 342, "start"],
      funktion: "Steckplatz für Erweiterungskarten, zum Beispiel eine Grafikkarte.",
      ort: "Beispiel: Unterhalb des CPU-Sockels auf dem Mainboard. Anzahl und Lage sind je nach Board verschieden.",
      zusammen: "Die Karte wird in den Steckplatz gesteckt und über PCIe mit dem Mainboard verbunden. Strom kann zusätzlich nötig sein.",
      bauformen: "PCIe-Steckplätze gibt es in unterschiedlichen Längen. Die Länge allein sagt nicht, welche Karte läuft; das steht in den Angaben zu Board und Karte. Der Steckplatz ist die mechanische Aufnahme, PCIe der Standard der Verbindung.",
      praxis: "Ausbildungsbeispiel: Du sollst eine Karte einbauen und vergleichst Steckplatz, Kartenangaben und Platz im Gehäuse, bevor du etwas bestellst.",
      merk: "Steckplatz und Standard sind zwei Begriffe: der eine ist mechanisch, der andere beschreibt die Verbindung.",
      fakt: PCIE_FAKT, q: ["pcie-wiki"] },
    { id: "pcie-kurz", name: "PCI-Express-Steckplatz (kürzer)", kurz: "PCIe kurz", glossar: "Mainboard", gruppe: "mainboard", layout: [200, 360, 200, 28], lab: [208, 388, "start"],
      funktion: "Kürzerer Steckplatz für Erweiterungskarten.",
      ort: "Beispiel: Unter dem langen Steckplatz. Ob ein Board kürzere Steckplätze hat, hängt vom Board ab.",
      zusammen: "Auch hier wird die Karte gesteckt und über PCIe mit dem Mainboard verbunden.",
      bauformen: "Ein kürzerer Steckplatz ist ein eigener Steckplatz. Ob eine bestimmte Karte darin funktioniert, lässt sich nicht pauschal sagen; die Angaben von Board und Karte entscheiden.",
      praxis: "Ausbildungsbeispiel: Eine Netzwerkkarte soll eingebaut werden. Du suchst im Handbuch, welche Steckplätze das Board dafür anbietet.",
      merk: "Länge des Steckplatzes und Eignung der Karte sind zwei verschiedene Fragen.",
      fakt: PCIE_FAKT, q: ["pcie-wiki"] },
    { id: "m2", name: "M.2-Steckplatz", kurz: "M.2", glossar: "SSD", gruppe: "mainboard", layout: [60, 100, 130, 28], lab: [180, 276, "start"],
      funktion: "Steckplatz für kompakte Erweiterungsmodule, zum Beispiel eine M.2-SSD.",
      ort: "Beispiel: Direkt auf dem Mainboard, flach liegend. Anzahl und Lage hängen vom Board ab.",
      zusammen: "Das Modul wird eingesteckt und befestigt. Welche Schnittstelle dahinter liegt, hängt von Board und Modul ab.",
      bauformen: "M.2 beschreibt Bauform und Steckverbindung. M.2 ist nicht automatisch NVMe: Die unterstützten Schnittstellen hängen von Gerät und Board ab. NVMe ist ein Protokoll, das zum Beispiel über PCIe laufen kann.",
      praxis: "Ausbildungsbeispiel: Vor dem Kauf einer M.2-SSD prüfst du im Handbuch, welche Schnittstellen der Steckplatz unterstützt.",
      merk: "M.2 sagt, wie das Modul aussieht und steckt, nicht automatisch, wie es Daten überträgt.",
      fakt: "NVM Express nennt M.2 als eine SSD-Bauform und beschreibt NVMe als Spezifikation, die über Transporte wie PCI Express laufen kann. Wikipedia (vorläufig): Die unterstützten Schnittstellen variieren je nach Gerät und Host-Umsetzung.", q: ["nvme", "m2"] },
    { id: "sata", name: "SATA-Anschluss", kurz: "SATA", glossar: "SATA", gruppe: "mainboard", layout: [60, 150, 130, 28], lab: [528, 334, "middle"],
      funktion: "Datenanschluss für Laufwerke wie Festplatten oder SSDs.",
      ort: "Beispiel: Am Rand des Mainboards. Die Anzahl hängt vom Board ab.",
      zusammen: "Das Datenkabel führt zum Laufwerk. Den Strom bekommt das Laufwerk getrennt vom Netzteil.",
      bauformen: "SATA ist eine Schnittstelle für Speichergeräte. Ein M.2-Steckplatz kann ebenfalls SATA nutzen, muss es aber nicht.",
      praxis: "Ausbildungsbeispiel: Eine zweite Festplatte soll eingebaut werden. Du prüfst, ob das Board einen freien SATA-Anschluss hat.",
      merk: "SATA ist die Schnittstelle, nicht die Bauform des Laufwerks.",
      fakt: "SATA-IO nennt SATA den de-facto-Standard für PC-Speicher und führt Festplatten, optische Laufwerke, SSDs und Hybrid-Festplatten als Einsatzbereiche auf.", q: ["sata-io"] },
    { id: "ramslot", name: "RAM-Steckplätze (DIMM)", kurz: "RAM-Steckplätze", glossar: "RAM", gruppe: "mainboard", layout: [540, 90, 110, 200], lab: [412, 298, "middle"],
      funktion: "Steckplätze für Arbeitsspeicher-Module.",
      ort: "Beispiel: Neben dem CPU-Sockel. Die Anzahl der Steckplätze ist je nach Board verschieden.",
      zusammen: "Die CPU spricht über ihren Speichercontroller mit dem RAM. Die Speichergeneration muss zu Board und CPU passen.",
      bauformen: "DIMM ist ein Speichermodulformat, das laut IBM häufig in Desktop-PCs und Servern eingesetzt wird. Welche Module ein Board aufnimmt, steht in den Angaben zum Board.",
      praxis: "Ausbildungsbeispiel: Vor einer Speichererweiterung vergleichst du Modulart und Boardangaben.",
      merk: "Ein Modul passt nicht allein deshalb, weil es RAM ist.",
      fakt: "Laut IBM ist DIMM ein Speichermodulformat, das häufig in Desktop-PCs und Servern verwendet wird.", q: ["ibm-dimm"] },
    { id: "cpu-fan", name: "CPU_FAN (Lüfter-Header)", kurz: "CPU_FAN", glossar: "Kühlung", gruppe: "mainboard", layout: [210, 50, 100, 28], lab: [355, 82, "middle"],
      funktion: "Anschluss für den Lüfter des CPU-Kühlers.",
      ort: "Beispiel: In der Nähe des CPU-Sockels. Die Bezeichnung CPU_FAN ist ein Beispiel; Boards beschriften ihre Header unterschiedlich.",
      zusammen: "Das Mainboard kann den Lüfter über diesen Header versorgen und überwachen. Was genau möglich ist, steht im Handbuch des Boards.",
      bauformen: "Header sind interne Steckverbinder. Bezeichnung, Anzahl der Kontakte und Belegung hängen vom Board ab und sind hier nicht belegt.",
      praxis: "Ausbildungsbeispiel: Du schließt einen CPU-Kühler an. Im Handbuch suchst du den Header, den das Board dafür vorsieht.",
      merk: "Beschriftung auf dem Board und Handbuch zählen, nicht die Gewohnheit.", fakt: "", q: [] },
    { id: "sys-fan", name: "SYS_FAN / CHA_FAN (Gehäuselüfter-Header)", kurz: "SYS_FAN", glossar: "Kühlung", gruppe: "mainboard", layout: [330, 50, 100, 28], lab: [585, 82, "middle"],
      funktion: "Anschluss für Gehäuselüfter.",
      ort: "Beispiel: Am Rand des Mainboards. Die Namen SYS_FAN und CHA_FAN sind Beispiele; Anzahl und Bezeichnung hängen vom Board ab.",
      zusammen: "Gehäuselüfter bewegen die Luft durch das Gehäuse. Das Mainboard kann sie über diesen Header versorgen und überwachen, soweit das Board es vorsieht.",
      bauformen: "Header sind interne Steckverbinder. Bezeichnung, Anzahl der Kontakte und Belegung hängen vom Board ab und sind hier nicht belegt.",
      praxis: "Ausbildungsbeispiel: Ein Gehäuselüfter soll angeschlossen werden. Du suchst im Handbuch den Header, den das Board dafür vorsieht.",
      merk: "Gleiche Lüfter können an unterschiedlich benannten Headern hängen.", fakt: "", q: [] },
    { id: "aio", name: "AIO_PUMP / PUMP (Pumpen-Header, soweit vorhanden)", kurz: "AIO_PUMP", glossar: "Kühlung", gruppe: "mainboard", layout: [450, 50, 110, 28], lab: [665, 82, "middle"],
      funktion: "Anschluss für die Pumpe einer Wasserkühlung (All-in-One), soweit das Board einen solchen Header hat.",
      ort: "Beispiel: Am Rand des Mainboards. Nicht jedes Board hat einen eigenen Pumpen-Header.",
      zusammen: "Die Pumpe fördert die Kühlflüssigkeit. Wie das Board sie versorgt, steht im Handbuch des Boards.",
      bauformen: "Header sind interne Steckverbinder. Bezeichnung, Anzahl der Kontakte und Belegung hängen vom Board ab und sind hier nicht belegt.",
      praxis: "Ausbildungsbeispiel: Eine Wasserkühlung wird eingebaut. Du liest im Handbuch von Board und Kühler, wo die Pumpe angeschlossen wird.",
      merk: "Pumpe und Lüfter können unterschiedliche Header brauchen.", fakt: "", q: [] },
    { id: "usb-header", name: "USB-Header (intern)", kurz: "USB-Header", glossar: "USB", gruppe: "mainboard", layout: [60, 200, 130, 28], lab: [630, 368, "middle"],
      funktion: "Interner Anschluss, über den USB-Anschlüsse des Gehäuses mit dem Mainboard verbunden werden.",
      ort: "Beispiel: Am Rand des Mainboards. Anzahl und Art hängen vom Board ab.",
      zusammen: "Das Gehäusekabel verbindet die vordere USB-Buchse mit diesem Header. Welcher Standard dahintersteckt, steht im Handbuch.",
      bauformen: "Ein interner Header ist keine USB-A- oder USB-C-Buchse. Bezeichnung, Anzahl der Kontakte, Standard und Belegung hängen vom Board ab und sind hier nicht belegt.",
      praxis: "Ausbildungsbeispiel: Die vorderen USB-Buchsen funktionieren nicht. Du prüfst, ob das Gehäusekabel am richtigen Header steckt.",
      merk: "Header und Buchse am Gehäuse sind zwei Teile einer Verbindung.", fakt: "", q: [] },
    { id: "frontpanel", name: "Front-Panel-Anschlüsse (Power, Reset, LEDs)", kurz: "Front-Panel", glossar: "Mainboard", gruppe: "mainboard", layout: [60, 300, 130, 28], lab: [520, 438, "middle"],
      funktion: "Anschlüsse für Einschalttaster, Reset-Taster und Leuchtanzeigen des Gehäuses.",
      ort: "Beispiel: Am Rand des Mainboards. Lage und Aufbau sind je nach Board verschieden.",
      zusammen: "Die dünnen Kabel des Gehäuses werden hier angeschlossen. Das Handbuch des Boards zeigt, welches Kabel wohin gehört.",
      bauformen: "Die Kabel sind einzeln beschriftet. Lage und Belegung unterscheiden sich je nach Board und sind hier nicht belegt.",
      praxis: "Ausbildungsbeispiel: Der Rechner startet nicht, wenn man den Taster drückt. Du prüfst anhand des Handbuchs, ob das Power-Kabel richtig steckt.",
      merk: "Hier hilft nur das Handbuch, nicht das Raten.", fakt: "", q: [] },
    { id: "front-audio", name: "Front-Audio-Header", kurz: "Front-Audio", glossar: "Mainboard", gruppe: "mainboard", layout: [60, 250, 130, 28], lab: [620, 438, "middle"],
      funktion: "Interner Anschluss für die Audiobuchsen an der Gehäusefront.",
      ort: "Beispiel: Am Rand des Mainboards. Nicht jedes Board und nicht jedes Gehäuse nutzt ihn gleich.",
      zusammen: "Das Gehäusekabel verbindet die Frontbuchsen mit dem Audioteil des Mainboards.",
      bauformen: "Bezeichnung, Anzahl der Kontakte und Belegung hängen vom Board ab und sind hier nicht belegt.",
      praxis: "Ausbildungsbeispiel: Der Kopfhörer an der Gehäusefront bleibt stumm. Du prüfst, ob das Audiokabel am Front-Audio-Header steckt.",
      merk: "Frontbuchse und Header gehören zusammen.", fakt: "", q: [] },
    { id: "rgb", name: "RGB-Header (optional, Beispiel)", kurz: "RGB", glossar: "Mainboard", gruppe: "mainboard", layout: [560, 310, 70, 28], lab: [710, 352, "middle"],
      funktion: "Optionaler Anschluss für Beleuchtung.",
      ort: "Beispiel: Am Rand des Mainboards. Viele Boards haben ihn nicht.",
      zusammen: "Beleuchtungsteile können hier angeschlossen werden, soweit das Board und das Teil zusammenpassen.",
      bauformen: "Bezeichnung und Belegung hängen vom Board und von der Beleuchtung ab und sind hier nicht belegt.",
      praxis: "Ausbildungsbeispiel: Ein Lichtstreifen soll angeschlossen werden. Du prüfst, welchen Anschluss das Teil braucht und welchen das Board bietet.",
      merk: "Beleuchtungsanschlüsse sind optional und boardabhängig.", fakt: "", q: [] },
    { id: "argb", name: "ARGB-Header (optional, Beispiel)", kurz: "ARGB", glossar: "Mainboard", gruppe: "mainboard", layout: [650, 310, 70, 28], lab: [710, 412, "middle"],
      funktion: "Zweiter optionaler Anschluss für Beleuchtung.",
      ort: "Beispiel: Am Rand des Mainboards. Viele Boards haben ihn nicht.",
      zusammen: "Beleuchtungsteile können hier angeschlossen werden, soweit das Board und das Teil zusammenpassen.",
      bauformen: "RGB und ARGB sind Bezeichnungen für Beleuchtungsanschlüsse. Ob ein Teil an einen RGB- oder ARGB-Header passt, lässt sich nicht pauschal sagen: Bezeichnung und Belegung hängen vom Board und von der Beleuchtung ab.",
      praxis: "Ausbildungsbeispiel: Ein Lichtstreifen hat einen anderen Stecker als erwartet. Du liest die Angaben von Board und Teil, bevor du etwas anschließt.",
      merk: "Ähnliche Namen heißen nicht, dass die Teile zueinander passen.", fakt: "", q: [] }
  ];

  var HIST_TEILE = [
    { id: "ide", name: "IDE/PATA (historisch)", kurz: "IDE/PATA", glossar: "IDE/PATA", gruppe: "historisch", layout: [44, 160, 192, 56], lab: [140, 238, "middle"],
      funktion: "Ältere Verbindung zwischen Mainboard und Speichergeräten (Parallel ATA).",
      ort: "Historische Technik. Sie gehört nicht auf ein aktuelles Mainboard und wird hier getrennt gezeigt.",
      zusammen: "Speichergeräte wurden darüber mit dem Mainboard verbunden. Als Nachfolger wird SATA genannt.",
      bauformen: "Unterschied zu heute: Aktuelle Desktop-Boards bieten für Laufwerke zum Beispiel SATA oder M.2. IDE/PATA ist eine andere, ältere Schnittstelle.",
      praxis: "Ausbildungsbeispiel: In einem sehr alten Rechner findest du einen Anschluss, der zu keinem heutigen Laufwerk passt. Du ordnest ihn als historische Technik ein und suchst in den Gerätedaten nach der Schnittstelle.",
      merk: "IDE/PATA ist älter, SATA ist der Nachfolger.",
      fakt: "Wikipedia (vorläufig) beschreibt PATA als Schnittstellenstandard für Computerspeicher, führt den Abschnitt „Primacy and obsolescence“ und ordnet Serial ATA als Nachfolger ein. Jahreszahlen werden aus dieser Quelle nicht übernommen.", q: ["pata-wiki"] },
    { id: "pci", name: "PCI (historisch)", kurz: "PCI", glossar: "PCI", gruppe: "historisch", layout: [294, 160, 192, 28], lab: [390, 238, "middle"],
      funktion: "Älterer Erweiterungsbus, an den Hardware-Steckkarten angeschlossen wurden.",
      ort: "Historische Technik. Er gehört nicht zur typischen Ausstattung aktueller Mainboards und wird hier getrennt gezeigt.",
      zusammen: "Laut Wikipedia gehörten zu den typischen Karten zum Beispiel Netzwerk- und Soundkarten. PCI Express wird als Nachfolger eingeordnet.",
      bauformen: "Unterschied zu heute: PCI Express (PCIe) ist der heutige Standard für Erweiterungskarten. Der ähnliche Name bedeutet nicht, dass Karten für beide Standards zueinander passen.",
      praxis: "Ausbildungsbeispiel: Ein älteres Gerät hat eine Steckkarte mit anderem Anschluss als heutige Karten. Du ordnest sie als PCI ein und prüfst, was der Nachfolger PCIe heute leistet.",
      merk: "PCI ist der ältere Erweiterungsbus, PCIe der Nachfolger.",
      fakt: "Wikipedia (vorläufig): Peripheral Component Interconnect (PCI) ist ein lokaler Computerbus, um Hardwaregeräte in einem Computer anzuschließen. Die Seite nennt Netzwerk- und Soundkarten als typische Karten und ordnet PCI Express als Nachfolger ein. Jahreszahlen werden nicht übernommen.", q: ["pci-wiki"] },
    { id: "agp", name: "AGP (historisch)", kurz: "AGP", glossar: "AGP", gruppe: "historisch", layout: [544, 160, 192, 24], lab: [640, 238, "middle"],
      funktion: "Veralteter Steckplatz für Grafikkarten.",
      ort: "Historische Technik. Er gehört nicht zur typischen Ausstattung aktueller Mainboards und wird hier getrennt gezeigt.",
      zusammen: "AGP wurde von Intel unabhängig von der PCI-SIG entworfen, um eine Grafikkarte anzuschließen. PCI Express hat AGP abgelöst.",
      bauformen: "Unterschied zu heute: Aktuelle Grafikkarten stecken in PCI-Express-Steckplätzen. Ein AGP-Steckplatz gehört nicht zur typischen Ausstattung aktueller Mainboards.",
      praxis: "Ausbildungsbeispiel: Ein sehr altes Mainboard hat einen Grafikkartensteckplatz, der zu heutigen Karten nicht passt. Du ordnest ihn als AGP ein.",
      merk: "AGP ist veraltet, PCIe hat ihn abgelöst.",
      fakt: "Wikipedia (vorläufig) nennt AGP einen veralteten parallelen Erweiterungskartenstandard, den Intel unabhängig von der PCI-SIG entworfen hat, um eine Grafikkarte an ein Computersystem anzuschließen. Eine allgemeine Jahreszahl wird nicht übernommen.", q: ["agp-wiki"] }
  ];

  var HINWEIS_SCHEMA = "Die Abbildung ist eine schematische Zeichnung aus einzeln auswählbaren Elementen, nicht maßstäblich und kein Foto eines bestimmten Geräts. Für diese Ansicht liegen keine Fotos vor. Die Liste enthält alle Einträge und ist der vollständige Weg zur Auswahl.";

  var ANSICHTEN = {
    desktop: {
      name: "Desktop-PC", titel: "PC-Explorer: Der Desktop-PC von innen", gruppe: "Bauteile des Desktop-PCs",
      einleitung: "Desktop-Ansicht: Wähle ein Bauteil des Desktop-PCs.",
      teile: TEILE, sockel: SOCKEL, formen: FORMEN
    },
    notebook: {
      name: "Notebook", titel: "PC-Explorer: Das Notebook von innen", gruppe: "Bauteile des Notebooks",
      einleitung: "Notebook-Ansicht: Wähle ein Bauteil des tragbaren Computers. Aufbau und Austauschbarkeit unterscheiden sich je nach Modell. " +
        "Notebooks bündeln viele Funktionen in einem kleinen Gehäuse. Der knappe Innenraum begrenzt Anordnung, Erweiterung und Luftweg; konkrete Aussagen sind vom Modell abhängig.",
      teile: NOTEBOOK_TEILE, sockel: [], formen: []
    },
    rueckseite: {
      name: "Rückseite", titel: "PC-Explorer: Die Rückseite eines Desktop-PCs", gruppe: "Anschlüsse auf der Rückseite (Beispiel)",
      einleitung: "Rückseiten-Ansicht: Die gezeigten Anschlüsse sind ein Beispiel. Nicht jeder PC hat sie, und Anzahl, Anordnung und Standards unterscheiden sich je nach Mainboard und Grafikkarte. " +
        "Unterschieden wird zwischen den Anschlüssen des Mainboards (Mainboard-I/O) und den Anschlüssen einer Erweiterungskarte, zum Beispiel einer Grafikkarte. " +
        "USB-A und USB-C sind Steckerformen. USB 2.0, USB 3.2 und USB4 sind Standardnamen und hier keine eigenen Buchsenformen. Die Formen sind eine didaktische Näherung, kein Normmaß.",
      teile: RUECK_TEILE, sockel: [], formen: []
    },
    mainboard: {
      name: "Mainboard", titel: "PC-Explorer: Das Mainboard im Detail", gruppe: "Anschlüsse und Steckplätze eines Mainboards (Beispiel)",
      einleitung: "Mainboard-Ansicht: Die Zeichnung zeigt ein Beispiel, kein bestimmtes Board; Ausstattung, Pinbelegung und unterstützte Standards sind je nach Modell verschieden. " +
        "Kurz erklärt: Ein Anschluss ist die Stelle, an der ein Stecker verbunden wird. Ein Steckplatz nimmt eine Karte oder ein Modul auf. " +
        "Die Schnittstelle beschreibt, wie zwei Teile miteinander verbunden sind, das Protokoll die Regeln des Datenaustauschs. Die Bauform ist die äußere Gestalt und Größe.",
      teile: MAINBOARD_TEILE, sockel: [], formen: []
    },
    historisch: {
      name: "Ältere Anschlüsse", titel: "PC-Explorer: Ältere Anschlüsse und Steckplätze", gruppe: "Historische Technik",
      einleitung: "Dieser Bereich zeigt ältere Technik zum Vergleich. Diese Anschlüsse gehören nicht zur typischen Ausstattung aktueller Mainboards. " +
        "IDE/PATA erkennst du an der breiten zweireihigen Kontaktleiste. PCI und AGP sind Steckplätze mit unterschiedlicher Kerbe. Eine Farbe wäre nur eine didaktische Konvention, keine belegte Normfarbe.",
      teile: HIST_TEILE, sockel: [], formen: []
    },
    server: null /* reservierter Daten-Slot, kein auswählbarer Zustand */
  };

  var BILDHINWEIS = "Die Abbildung besteht aus einzeln auswählbaren Bauteilen. Sie ist ein farbiges Beispiel, nicht maßstäblich und kein Foto eines bestimmten Geräts. Echte Fotos gibt es bisher nur für PGA, LGA und BGA.";
  var BILDHINWEIS_NOTEBOOK = " Die Notebook-Ansicht ist eine eigene Zeichnung, kein verkleinerter Desktop. Für das Notebook liegt noch kein freigegebenes Komponentenbild vor. Die Liste bleibt gleichwertig.";
var aktuelleAnsicht = "desktop";
  /* Beschriftungen: [Platte x, Platte y, Zielpunkt x, Zielpunkt y, optional "o" = Linie startet oben an der Platte].
     Alle Platten stehen außerhalb des Gehäuses, die Linien enden mit einem Punkt auf dem Bauteil. */
  var LABELS = {
    desktop: {
      cool: [8, 32, 300, 76], cpu: [8, 88, 322, 126], gpu: [8, 262, 256, 282], psu: [8, 408, 230, 420], gehaeuse: [8, 330, 146, 342],
      ram: [650, 8, 510, 70], board: [650, 158, 580, 170], ssd: [650, 211, 416, 223], hdd: [650, 362, 540, 410]
    },
    notebook: {
      ssd: [8, 110, 174, 121], cpu: [8, 160, 272, 148], gpu: [8, 215, 272, 226], ram: [650, 210, 432, 264], gehaeuse: [8, 330, 146, 342],
      board: [650, 56, 432, 92], cool: [650, 100, 449, 120], akku: [650, 292, 500, 336], netzteil: [588, 404, 640, 390, "o"]
    }
  };

  function svgForm(g, tag, attrs, cls) {
    attrs["class"] = "pe-form " + (cls || "");
    g.appendChild(svgEl(tag, attrs));
  }
  function svgRect(g, x, y, w, h, cls, rx) {
    svgForm(g, "rect", { x: x, y: y, width: w, height: h, rx: rx || 4 }, cls);
  }
  function svgKreis(g, cx, cy, r, cls) {
    svgForm(g, "circle", { cx: cx, cy: cy, r: r }, cls);
  }
  function svgText(g, x, y, text, cls) {
    g.appendChild(svgEl("text", { x: x, y: y, "text-anchor": "middle", "class": cls }, text));
  }
  /* Lüfter: Rahmenring, Nabe und Flügel. Nur Dekoration innerhalb des Bauteils. */
  function zeichneLuefter(g, cx, cy, r, fluegel) {
    svgKreis(g, cx, cy, r, "pe-fan");
    for (var i = 0; i < fluegel; i++) {
      var a = i * 2 * Math.PI / fluegel;
      g.appendChild(svgEl("line", {
        x1: cx + Math.cos(a) * 5, y1: cy + Math.sin(a) * 5,
        x2: cx + Math.cos(a) * (r - 4), y2: cy + Math.sin(a) * (r - 4), "class": "pe-blade"
      }));
    }
    svgKreis(g, cx, cy, 5, "pe-hub");
  }

  /* Etikettenschicht: Platte außerhalb des Gehäuses plus Verbindungslinie mit hellem Saum (auch auf dunklem Gehäuse lesbar). */
  function zeichneEtiketten(svg, teile, ansicht, waehle) {
    var tabelle = LABELS[ansicht];
    var schicht = svgEl("g", { "class": "pe-etiketten" });
    teile.forEach(function (t) {
      var p = tabelle[t.id];
      if (!p) return;
      var w = Math.max(70, Math.min(128, (t.kurz || "").length * 10.5 + 18));
      var sx = p[4] === "o" ? p[0] + w / 2 : (p[0] < 400 ? p[0] + w : p[0]);
      var sy = p[4] === "o" ? p[1] : p[1] + 14;
      var g = svgEl("g", { "class": "pe-etikett", "data-id": t.id, "aria-hidden": "true" });
      g.appendChild(svgEl("line", { x1: sx, y1: sy, x2: p[2], y2: p[3], "class": "pe-leader-saum" }));
      g.appendChild(svgEl("line", { x1: sx, y1: sy, x2: p[2], y2: p[3], "class": "pe-leader" }));
      g.appendChild(svgEl("circle", { cx: p[2], cy: p[3], r: 4, "class": "pe-punkt" }));
      g.appendChild(svgEl("rect", { x: p[0], y: p[1], width: w, height: 28, rx: 6, "class": "pe-label-platte" }));
      g.appendChild(svgEl("text", { x: p[0] + 8, y: p[1] + 20, "class": "pe-label" }, t.kurz));
      g.addEventListener("click", function () { waehle(t.id); });
      schicht.appendChild(g);
    });
    svg.appendChild(schicht);
  }
  /* Auswahlrahmen: liegt über allen Bauteilen, damit auch eine verdeckte CPU sichtbar umrandet wird. */
  function zeichneRahmen(svg, teile) {
    var schicht = svgEl("g", { "class": "pe-rahmenschicht", "aria-hidden": "true" });
    teile.forEach(function (t) {
      var r = t.layout;
      ["pe-rahmen-saum", "pe-rahmen"].forEach(function (cls) {
        schicht.appendChild(svgEl("rect", {
          x: r[0] - 3, y: r[1] - 3, width: r[2] + 6, height: r[3] + 6, rx: 8, "data-id": t.id, "class": cls
        }));
      });
    });
    svg.appendChild(schicht);
  }

  function zeichneDesktopTeil(t, g) {
    var r = t.layout, x = r[0], y = r[1], w = r[2], h = r[3];
    var i;
    if (t.id === "gehaeuse") {
      svgRect(g, x, y, w, h, "pe-case pe-haupt", 18);
      svgRect(g, x + 8, y + 16, 16, h - 32, "pe-front", 3);
      [84, 160, 236].forEach(function (cy) { zeichneLuefter(g, x + 60, cy, 26, 5); });
      svgRect(g, 170, 378, 244, 82, "pe-front", 4);                   /* Netzteilschacht unten vorn */
      svgRect(g, x + w - 24, y + 28, 14, 110, "pe-io", 2);
      for (i = 0; i < 4; i++) svgRect(g, x + w - 22, y + 32 + i * 26, 10, 18, "pe-conn", 1);
    } else if (t.id === "board") {
      svgRect(g, x, y, w, h, "pe-pcb pe-haupt", 6);
      svgRect(g, 298, 74, 104, 104, "pe-socket", 4);                 /* CPU-Sockel */
      svgRect(g, 566, 50, 14, 90, "pe-conn", 2);                      /* Hauptstrom-Stecker */
      svgRect(g, 288, 213, 12, 20, "pe-conn", 1);                     /* M.2-Steckplatz */
      svgRect(g, 244, 236, 336, 10, "pe-slot", 2);                    /* PCIe-Steckplatz */
      svgRect(g, 470, 212, 56, 22, "pe-chip", 3);                     /* Chipsatz-Kühlkörper */
      for (i = 0; i < 3; i++) svgRect(g, 252 + i * 20, 318, 16, 8, "pe-conn", 1); /* SATA-Anschlüsse */
    } else if (t.id === "cpu") {
      svgRect(g, x, y, w, h, "pe-cpu pe-haupt", 6);
      svgRect(g, x + 16, y + 16, w - 32, h - 32, "pe-die", 2);
      svgText(g, x + w / 2, y + h / 2 + 4, "CPU", "pe-dunkel");
    } else if (t.id === "cool") {
      var cx = x + w / 2, cy = y + h / 2, ro = w / 2 - 2, ri = 34, k = 8;
      svgForm(g, "path", {
        d: "M " + (x + k) + " " + (y + k) + " H " + (x + w - k) + " V " + (y + h - k) + " H " + (x + k) + " Z" +
          " M " + (cx - ri) + " " + cy + " a " + ri + " " + ri + " 0 1 0 " + (2 * ri) + " 0 a " + ri + " " + ri + " 0 1 0 " + (-2 * ri) + " 0 Z",
        "fill-rule": "evenodd"
      }, "pe-cool pe-haupt");
      svgKreis(g, cx, cy, ro - 6, "pe-ringlinie");
      for (i = 0; i < 8; i++) {
        var a = i * Math.PI / 4;
        g.appendChild(svgEl("line", {
          x1: cx + Math.cos(a) * (ri + 5), y1: cy + Math.sin(a) * (ri + 5),
          x2: cx + Math.cos(a) * (ro - 12), y2: cy + Math.sin(a) * (ro - 12), "class": "pe-blade"
        }));
      }
      [[x + 14, y + 14], [x + w - 14, y + 14], [x + 14, y + h - 14], [x + w - 14, y + h - 14]].forEach(function (p) {
        svgKreis(g, p[0], p[1], 4, "pe-screw");
      });
    } else if (t.id === "ram") {
      for (i = 0; i < 4; i++) svgRect(g, x + 4 + i * 25, y, 18, h, "pe-slotram", 3);
      [1, 3].forEach(function (s) {
        var sx = x + 4 + s * 25;
        svgRect(g, sx + 3, y + 4, 12, h - 8, "pe-ram pe-haupt", 2);
        for (var j = 0; j < 4; j++) svgRect(g, sx + 5, y + 14 + j * 31, 8, 22, "pe-chip", 1);
      });
    } else if (t.id === "gpu") {
      svgRect(g, x, y, w, h, "pe-gpu pe-haupt", 6);
      svgRect(g, x + 20, y - 4, 200, 8, "pe-gold", 1);               /* Kontaktleiste im PCIe-Steckplatz */
      zeichneLuefter(g, x + 100, y + 34, 24, 7);
      zeichneLuefter(g, x + 210, y + 34, 24, 7);
      svgRect(g, x + w - 72, y + h - 4, 34, 10, "pe-conn", 1);        /* Stromanschluss der Karte */
      svgRect(g, x + w - 4, y - 6, 8, h + 12, "pe-io", 1);            /* Slotblende */
    } else if (t.id === "ssd") {
      svgRect(g, x, y, w, h, "pe-ssd pe-haupt", 2);
      svgRect(g, x, y + 3, 8, h - 6, "pe-gold", 1);
      svgRect(g, x + 22, y + 4, 36, h - 8, "pe-chip", 2);
      svgRect(g, x + 64, y + 4, 36, h - 8, "pe-chip", 2);
      svgKreis(g, x + w - 5, y + h / 2, 4, "pe-screw");
    } else if (t.id === "hdd") {
      /* Laufwerkskäfig mit zwei Schächten (vorn unten); das Laufwerk sitzt im unteren Schacht. Das Layout ist die Laufwerksfläche. */
      svgRect(g, x - 10, y - 46, w + 20, h + 56, "pe-kaefig", 4);
      svgRect(g, x, y - 40, w, h, "pe-schacht", 2);                  /* freier oberer Schacht */
      svgRect(g, x, y, w, h, "pe-hdd pe-haupt", 3);                   /* 3,5-Zoll-Laufwerk, Seitenansicht */
      svgRect(g, x + 34, y + 6, 84, h - 12, "pe-aufkleber", 2);
      svgText(g, x + 76, y + h / 2 + 5, "HDD", "pe-dunkel");
      svgKreis(g, x + 14, y + h / 2, 3, "pe-screw");
      svgKreis(g, x + w - 30, y + h / 2, 3, "pe-screw");
      svgRect(g, x + w, y + 6, 8, 8, "pe-conn", 1);                    /* SATA-Datenanschluss */
      svgRect(g, x + w, y + 20, 8, 10, "pe-conn", 1);                 /* SATA-Stromanschluss */
    } else if (t.id === "psu") {
      svgRect(g, x, y, w, h, "pe-psu pe-haupt", 6);
      zeichneLuefter(g, x + 60, y + h / 2, 28, 7);
      svgKreis(g, x + 60, y + h / 2, 17, "pe-ringlinie");
      svgRect(g, x + w - 56, y + 16, 38, 26, "pe-conn", 2);          /* Netzanschluss */
      svgRect(g, x + w - 50, y + 50, 26, 10, "pe-chip", 2);          /* Schalter */
      svgRect(g, x + 150, y - 5, 60, 8, "pe-conn", 1);               /* Kabelausgänge */
    }
  }
  function zeichneNotebookTeil(t, g) {
    var r = t.layout, x = r[0], y = r[1], w = r[2], h = r[3];
    var i;
    if (t.id === "gehaeuse") {
      svgRect(g, x, y, w, h, "pe-base pe-haupt", 26);
      svgRect(g, x + 30, y + 2, w - 60, 10, "pe-hinge", 3);
      for (i = 0; i < 3; i++) svgRect(g, x + w - 4, y + 130 + i * 24, 8, 16, "pe-conn", 1);   /* Seitenanschlüsse */
      svgRect(g, x + w - 6, y + 286, 10, 14, "pe-conn", 1);                                    /* Ladebuchse */
    } else if (t.id === "board") {
      svgRect(g, x, y, w, h, "pe-pcb pe-haupt", 8);
      svgRect(g, 264, 112, 68, 68, "pe-socket", 4);                   /* Platz der CPU */
      svgRect(g, 252, 111, 8, 24, "pe-conn", 1);                      /* M.2-Anschluss */
      svgRect(g, 346, 242, 94, 44, "pe-slotram", 3);                  /* SO-DIMM-Steckplatz, passend zum Modul */
      svgRect(g, 343, 246, 4, 36, "pe-conn", 1);
      svgRect(g, 439, 246, 4, 36, "pe-conn", 1);
      svgRect(g, 228, 262, 10, 24, "pe-conn", 1);                     /* Akku-Anschluss */
    } else if (t.id === "cpu") {
      svgRect(g, x, y, w, h, "pe-cpu pe-haupt", 4);
      svgRect(g, x + 12, y + 12, w - 24, h - 24, "pe-die", 2);
      svgText(g, x + w / 2, y + h / 2 + 4, "CPU", "pe-dunkel");
    } else if (t.id === "cool") {
      /* Heatpipes von CPU und GPU zum Lüfter. Die Wärmeverteiler (pe-abdeckung) liegen über den Chips, fangen aber keine Klicks ab. */
      svgRect(g, x + 64, y + 22, 82, 10, "pe-heat pe-abdeckung", 5);
      svgRect(g, x + 72, y + 100, 74, 10, "pe-heat pe-abdeckung", 5);
      svgRect(g, x + 138, y + 88, 10, 22, "pe-heat pe-abdeckung", 3);
      svgRect(g, x + 144, y, 78, 88, "pe-fanhouse pe-haupt", 8);
      zeichneLuefter(g, x + 183, y + 44, 32, 6);
      svgRect(g, x + 222, y + 4, 30, 80, "pe-fin", 3);                 /* Kühlrippen am Luftauslass */
      for (i = 1; i < 4; i++) {
        g.appendChild(svgEl("line", { x1: x + 222 + i * 7.5, y1: y + 8, x2: x + 222 + i * 7.5, y2: y + 80, "class": "pe-blade" }));
      }
      svgRect(g, x, y, 64, 64, "pe-spreader pe-abdeckung", 6);        /* Wärmeverteiler über der CPU */
      svgRect(g, x, y + 82, 72, 60, "pe-spreader pe-abdeckung", 6);   /* Wärmeverteiler über der GPU */
    } else if (t.id === "ram") {
      svgRect(g, x, y, w, h, "pe-sodimm pe-haupt", 2);
      svgRect(g, x + 10, y + 6, 32, 22, "pe-chip", 2);
      svgRect(g, x + 48, y + 6, 32, 22, "pe-chip", 2);
      svgRect(g, x + 4, y + h - 8, w - 8, 5, "pe-gold", 1);           /* Kontaktleiste */
    } else if (t.id === "gpu") {
      svgRect(g, x, y, w, h, "pe-gpu pe-haupt", 4);
      svgRect(g, x + 14, y + 10, w - 28, h - 20, "pe-die", 2);
      svgText(g, x + w / 2, y + h / 2 + 4, "GPU", "pe-dunkel");
    } else if (t.id === "ssd") {
      svgRect(g, x, y, w, h, "pe-ssd pe-haupt", 2);
      svgRect(g, x + 8, y + 4, 28, h - 8, "pe-chip", 2);
      svgRect(g, x + 42, y + 4, 22, h - 8, "pe-chip", 2);
      svgRect(g, x + w - 8, y + 3, 8, h - 6, "pe-gold", 1);
    } else if (t.id === "akku") {
      svgRect(g, x, y, w, h, "pe-akku pe-haupt", 12);
      for (i = 0; i < 3; i++) svgRect(g, x + 14 + i * 104, y + 12, 96, h - 24, "pe-cell", 6);
    } else if (t.id === "netzteil") {
      svgRect(g, x, y, w, h, "pe-brick pe-haupt", 8);
      svgText(g, x + w / 2, y + h / 2 + 4, "extern", "pe-hell");
      svgKreis(g, x + w - 14, y + 14, 4, "pe-led");
    }
  }
  /* Anschlussansichten: erkennbare Formen statt Rechtecke. Didaktische Näherung, keine Normmaße, keine Pinbelegung. */
  var IO_KLASSE = { "mainboard-io": "pe-io-mb", "erweiterungskarte": "pe-io-karte", "mainboard": "pe-io-intern", "historisch": "pe-io-alt" };
  function ioKlasse(t) { return IO_KLASSE[t.gruppe] || "pe-io-intern"; }
  function buchseUsbA(g, x, y, w, h, cls) {
   var bw = Math.max(16, Math.min(w - 6, 34)), bh = Math.max(8, Math.min(h - 8, 14));
    var bx = x + (w - bw) / 2, by = y + Math.max(2, (h - bh) / 2 - 4);
    svgRect(g, bx, by, bw, bh, "pe-haupt " + cls, 1);
    svgRect(g, bx + 3, by + 3, bw - 6, Math.max(3, bh * 0.4), "pe-zunge", 1);
  }
  function buchseUsbC(g, x, y, w, h, cls) {
    var bw = Math.max(12, Math.min(w - 8, 22)), bh = Math.max(7, Math.min(h - 10, 10));
   var bx = x + (w - bw) / 2, by = y + (h - bh) / 2;
    svgRect(g, bx, by, bw, bh, "pe-haupt " + cls, bh / 2);
  }
  function buchseRj45(g, x, y, w, h, cls) {
    var bw = Math.max(20, Math.min(w - 6, 40)), bh = Math.max(14, Math.min(h - 8, 26));
   var bx = x + (w - bw) / 2, by = y + (h - bh) / 2;
   svgRect(g, bx, by + 5, bw, bh - 5, "pe-haupt " + cls, 1);
   svgRect(g, bx + bw * 0.28, by, bw * 0.44, 6, cls, 1);
  }
  function buchseKlinke(g, x, y, w, h, cls) {
   var n = w >= 70 ? 3 : 1, r = Math.max(5, Math.min(8, h * 0.22)), cy = y + h * 0.4;
   for (var i = 0; i < n; i++) {
     var cx = x + w * ((i + 1) / (n + 1));
     svgKreis(g, cx, cy, r, (i === 0 ? "pe-haupt " : "") + cls);
     svgKreis(g, cx, cy, r * 0.35, "pe-zunge");
   }
  }
  function buchseHdmi(g, x, y, w, h, cls) {
   var bw = Math.max(18, Math.min(w - 8, 38)), bh = Math.max(9, Math.min(h - 8, 15));
   var bx = x + (w - bw) / 2, by = y + (h - bh) / 2, inset = bw * 0.14;
   svgForm(g, "polygon", { points: [bx + inset, by, bx + bw - inset, by, bx + bw, by + bh, bx, by + bh].join(" ") }, "pe-haupt " + cls);
  }
  function buchseDisplayPort(g, x, y, w, h, cls) {
   var bw = Math.max(16, Math.min(w - 8, 32)), bh = Math.max(9, Math.min(h - 8, 14));
   var bx = x + (w - bw) / 2, by = y + (h - bh) / 2, cut = Math.min(6, bh * 0.45);
   svgForm(g, "polygon", { points: [bx, by, bx + bw - cut, by, bx + bw, by + cut, bx + bw, by + bh, bx, by + bh].join(" ") }, "pe-haupt " + cls);
  }
  function buchsePs2(g, x, y, w, h, cls) {
   var r = Math.max(7, Math.min(w, h) * 0.28), cx = x + w / 2, cy = y + h / 2;
   svgKreis(g, cx, cy, r, "pe-haupt " + cls);
   svgRect(g, cx - 2, cy - r - 2, 4, 4, cls, 0);
  }
  function buchseAntenne(g, x, y, w, h, cls) {
   var r = Math.max(4, Math.min(8, h * 0.18)), cy = y + h * 0.4;
   svgKreis(g, x + w * 0.32, cy, r, "pe-haupt " + cls);
   svgKreis(g, x + w * 0.68, cy, r, cls);
  }
  function steckplatzPcie(g, x, y, w, h, cls, kerbe) {
   var bh = Math.max(7, Math.min(h - 4, 14)), by = y + (h - bh) / 2;
   svgRect(g, x + 2, by, w - 4, bh, "pe-haupt " + cls, 1);
   svgRect(g, x + 2 + (kerbe || 0.18) * (w - 12), by - 2, 8, bh + 4, "pe-kerbe", 0);
  }
  function leisteIde(g, x, y, w, h, cls) {
   svgRect(g, x + 2, y + 2, w - 4, h - 4, "pe-haupt " + cls, 1);
   var cols = 20;
   for (var row = 0; row < 2; row++) {
     for (var col = 0; col < cols; col++) {
       svgRect(g, x + 6 + col * ((w - 12) / cols), y + 5 + row * ((h - 10) / 2), 2, 2, "pe-pin", 0);
     }
   }
  }
  function kopfZweireihig(g, x, y, w, h, cls) {
   var vertical = h > w * 1.3;
   svgRect(g, x + 1, y + 1, Math.max(8, w - 2), Math.max(8, h - 2), "pe-haupt " + cls, 1);
   var n = vertical ? 10 : 5;
   for (var i = 0; i < n; i++) {
     if (vertical) {
       var yy = y + 4 + i * ((h - 8) / n);
       svgRect(g, x + 4, yy, 3, 2, "pe-pin", 0);
       svgRect(g, x + w - 7, yy, 3, 2, "pe-pin", 0);
     } else {
       var xx = x + 4 + i * ((w - 8) / n);
       svgRect(g, xx, y + 3, 2, 3, "pe-pin", 0);
       svgRect(g, xx, y + h - 6, 2, 3, "pe-pin", 0);
     }
   }
  }
  function schlitzeRam(g, x, y, w, h, cls) {
   var sw = Math.max(6, (w - 10) / 4);
   for (var i = 0; i < 4; i++) {
     svgRect(g, x + 3 + i * (sw + 2), y + 2, sw, h - 4, (i === 0 ? "pe-haupt " : "") + cls, 1);
   }
  }
  function sataL(g, x, y, w, h, cls) {
   var x1 = x + 4, y1 = y + 4, ww = Math.max(20, w - 8), hh = Math.max(10, h - 8);
   svgForm(g, "path", { d: "M " + x1 + " " + y1 + " h " + (ww * 0.62) + " v " + (hh * 0.42) + " h " + (ww * 0.28) + " v " + (hh * 0.4) + " h -" + (ww * 0.18) + " v -" + (hh * 0.22) + " h -" + (ww * 0.72) + " z" }, "pe-haupt " + cls);
  }
  function m2Schlitz(g, x, y, w, h, cls) {
   svgRect(g, x + 2, y + h * 0.28, w * 0.7, Math.max(6, h * 0.4), "pe-haupt " + cls, 1);
   svgKreis(g, x + w * 0.84, y + h * 0.48, Math.min(4, h * 0.22), cls);
  }
  function beschrifteAnschluss(g, t, x, y, w, h) {
   var ty = h >= 56 ? y + h - 4 : y - 3;
   svgText(g, x + w / 2, ty, t.kurz, "pe-io-text pe-io-aussen");
  }
  function zeichneAnschlussTeil(t, g) {
   var r = t.layout, x = r[0], y = r[1], w = r[2], h = r[3], cls = ioKlasse(t), id = t.id;
   if (id === "usb-a" || id === "usb2" || id === "usb3" || id === "usb4") buchseUsbA(g, x, y, w, h, cls);
   else if (id === "usb-c") buchseUsbC(g, x, y, w, h, cls);
   else if (id === "rj45") buchseRj45(g, x, y, w, h, cls);
   else if (id === "audio") buchseKlinke(g, x, y, w, h, cls);
   else if (id === "hdmi-mb" || id === "hdmi-gpu") buchseHdmi(g, x, y, w, h, cls);
   else if (id === "dp-mb" || id === "dp-gpu") buchseDisplayPort(g, x, y, w, h, cls);
   else if (id === "ps2") buchsePs2(g, x, y, w, h, cls);
   else if (id === "wlan") buchseAntenne(g, x, y, w, h, cls);
   else if (id === "pcie-lang") steckplatzPcie(g, x, y, w, h, cls, 0.12);
   else if (id === "pcie-kurz") steckplatzPcie(g, x, y, w, h, cls, 0.4);
   else if (id === "pci") steckplatzPcie(g, x, y, w, h, cls, 0.2);
   else if (id === "agp") steckplatzPcie(g, x, y, w, h, cls, 0.68);
   else if (id === "ramslot") schlitzeRam(g, x, y, w, h, cls);
   else if (id === "m2") m2Schlitz(g, x, y, w, h, cls);
   else if (id === "sata") sataL(g, x, y, w, h, cls);
   else if (id === "ide") leisteIde(g, x, y, w, h, cls);
   else kopfZweireihig(g, x, y, w, h, cls);
   beschrifteAnschluss(g, t, x, y, w, h);
  }
  function istAnschlussAnsicht(key) { return key === "rueckseite" || key === "mainboard" || key === "historisch"; }
  function zeichneDeko(key) {
    var deko = svgEl("g", { "class": "pe-deko", "aria-hidden": "true" });
    deko.appendChild(svgEl("rect", { x: 0, y: 0, width: 780, height: 480, "class": "pe-platte" }));
    if (key === "notebook") {
      deko.appendChild(svgEl("rect", { x: 156, y: 14, width: 388, height: 34, rx: 8, "class": "pe-lid" }));
      deko.appendChild(svgEl("text", { x: 350, y: 36, "text-anchor": "middle", "class": "pe-hinweistext-hell" }, "Display-Deckel (aufgeklappt, von hinten)"));
    }
    if (key === "rueckseite") {
      deko.appendChild(svgEl("rect", { x: 52, y: 40, width: 460, height: 300, rx: 8, "class": "pe-bereich pe-bereich-mb" }));
      deko.appendChild(svgEl("text", { x: 64, y: 60, "class": "pe-bereichstext" }, "Mainboard-I/O (fest am Mainboard)"));
      deko.appendChild(svgEl("rect", { x: 524, y: 40, width: 244, height: 220, rx: 8, "class": "pe-bereich pe-bereich-karte" }));
      deko.appendChild(svgEl("text", { x: 538, y: 60, "class": "pe-bereichstext" }, "Erweiterungskarte (Grafik)"));
      deko.appendChild(svgEl("text", { x: 538, y: 250, "class": "pe-bereichstext" }, "Nur mit dedizierter Grafikkarte"));
    }
    if (key === "mainboard") {
      deko.appendChild(svgEl("rect", { x: 40, y: 30, width: 700, height: 424, rx: 10, "class": "pe-bereich pe-bereich-platine" }));
      deko.appendChild(svgEl("text", { x: 390, y: 21, "text-anchor": "middle", "class": "pe-bereichstext" }, "Beispiel-Mainboard (schematisch, kein bestimmtes Modell)"));
      deko.appendChild(svgEl("rect", { x: 220, y: 108, width: 150, height: 150, rx: 6, "class": "pe-sockel-deko" }));
      deko.appendChild(svgEl("rect", { x: 236, y: 124, width: 118, height: 118, rx: 4, "class": "pe-sockel-rahmen" }));
      deko.appendChild(svgEl("text", { x: 295, y: 190, "text-anchor": "middle", "class": "pe-bereichstext" }, "Sockel"));
    }
    if (key === "historisch") {
      deko.appendChild(svgEl("text", { x: 390, y: 120, "text-anchor": "middle", "class": "pe-bereichstext" }, "Historische Technik zum Vergleich, nicht auf aktuellen Mainboards"));
    }
    var anschlussHinweis = key === "rueckseite" || key === "mainboard" || key === "historisch";
    deko.appendChild(svgEl("text", { x: 8, y: 474, "class": "pe-hinweistext" }, anschlussHinweis ? "Beispiel, didaktische Näherung, nicht maßstäblich" : "Beispiel, nicht maßstäblich"));
    return deko;
  }
  /* Kabel: nur Dekoration über den Bauteilen, nicht anklickbar und nicht fokussierbar. Verlegt, ohne Beschriftung oder Bauteile zu verdecken. */
  function zeichneKabel(key) {
    var k = svgEl("g", { "class": "pe-kabelschicht", "aria-hidden": "true" });
    function pfad(d, cls) { k.appendChild(svgEl("path", { d: d, "class": "pe-kabel " + cls })); }
    if (key === "desktop") {
      pfad("M 380 380 C 380 350 424 352 424 326 L 604 326 C 604 200 574 190 574 142", "pe-kabel-a pe-kabel-dick"); /* Netzteil zum Mainboard */
      pfad("M 346 380 C 346 350 536 360 536 318", "pe-kabel-a");                                          /* Netzteil zur Grafikkarte */
      pfad("M 408 430 C 440 454 610 454 626 436 C 630 430 630 424 630 418", "pe-kabel-a");                /* Netzteil zur Festplatte */
      pfad("M 630 402 C 636 372 600 342 560 342 L 300 342 C 284 342 280 336 280 326", "pe-kabel-b pe-kabel-daten"); /* Festplatte zum Mainboard */
    } else if (key === "notebook") {
      pfad("M 588 360 C 574 360 572 352 558 352", "pe-kabel-a pe-kabel-dick");                            /* externes Netzteil zur Ladebuchse */
      pfad("M 233 300 L 233 288", "pe-kabel-a");                                                          /* Akku zum Mainboard */
    }
    return k;
  }


  var DATEN = { ansichten: ANSICHTEN, teile: TEILE, sockel: SOCKEL, formen: FORMEN, quellen: QUELLEN };

  /* Pfeiltasten in einer Liste mit n Einträgen: neuer Index oder -1. */
  function naechsterIndex(i, key, n) {
    if (!n) return -1;
    if (key === "ArrowRight" || key === "ArrowDown") return (i + 1) % n;
    if (key === "ArrowLeft" || key === "ArrowUp") return (i - 1 + n) % n;
    if (key === "Home") return 0;
    if (key === "End") return n - 1;
    return -1;
  }

  function finde(liste, id) {
    for (var i = 0; i < liste.length; i++) if (liste[i].id === id) return liste[i];
    return null;
  }

  /* Glossarlink nur, wenn der Begriff in der Glossarliste wirklich steht. */
  function glossarVorhanden(liste, begriff) {
    if (!begriff || !Array.isArray(liste)) return false;
    for (var i = 0; i < liste.length; i++) if (liste[i] && liste[i].begriff === begriff) return true;
    return false;
  }

  /* Merkzustand der Vertiefungen: Schlüssel ansicht:teilId:abschnitt, Wert true = offen. Fehlend = zu. */
  function fachSchluessel(ansicht, teilId, abschnitt) { return ansicht + ":" + teilId + ":" + abschnitt; }
  function fachOffen(speicher, ansicht, teilId, abschnitt) {
    return speicher[fachSchluessel(ansicht, teilId, abschnitt)] === true;
  }
  function fachUmschalten(speicher, ansicht, teilId, abschnitt) {
    var k = fachSchluessel(ansicht, teilId, abschnitt);
    speicher[k] = speicher[k] !== true;
    return speicher[k];
  }
  function fachBeschriftung(anzeigenText, offen) {
    return offen ? anzeigenText.replace(/ anzeigen$/, " ausblenden") : anzeigenText;
  }

  /* Zeichenreihenfolge: Gehäuse zuerst, Mainboard darüber, übrige Teile, Kühlung zuletzt (sie darf CPU und GPU überdecken). */
  function zeichenReihenfolge(teile) {
    function z(t) { return t.id === "gehaeuse" ? 0 : t.id === "board" ? 1 : t.id === "cool" ? 3 : 2; }
    return teile.map(function (t, i) { return { t: t, i: i }; })
      .sort(function (a, b) { return z(a.t) - z(b.t) || a.i - b.i; })
      .map(function (x) { return x.t; });
  }

  var api = { DATEN: DATEN, naechsterIndex: naechsterIndex, finde: finde, glossarVorhanden: glossarVorhanden, zeichenReihenfolge: zeichenReihenfolge,
    fachUmschalten: fachUmschalten, fachOffen: fachOffen, fachBeschriftung: fachBeschriftung };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  global.PC_EXPLORER = api;
  if (typeof document === "undefined") return;

  /* ---------- Darstellung (nur im Browser) ---------- */
  var NS = "http://www.w3.org/2000/svg";
  function el(tag, attrs, text) {
    var e = document.createElement(tag);
    for (var k in attrs || {}) e.setAttribute(k, attrs[k]);
    if (text) e.textContent = text;
    return e;
  }
  function svgEl(tag, attrs, text) {
    var e = document.createElementNS(NS, tag);
    for (var k in attrs || {}) e.setAttribute(k, attrs[k]);
    if (text) e.textContent = text;
    return e;
  }
  function liste(items) {
    var ul = el("ul");
    items.forEach(function (t) { ul.appendChild(el("li", {}, t)); });
    return ul;
  }

  /* Echtes Foto unverändert (contain, kein Beschnitt) mit sichtbarer Pflichtunterschrift und echten Links. */
  function baueFoto(f) {
    var fig = el("figure", { "class": "pe-foto" });
    fig.appendChild(el("img", { src: f.pfad, alt: f.alt, loading: "lazy" }));
    var cap = el("figcaption");
    cap.appendChild(el("span", {}, f.unterschrift));
    cap.appendChild(document.createTextNode(" "));
    cap.appendChild(el("a", { href: f.lizenzUrl, rel: "noopener" }, "Lizenz: " + f.lizenz));
    cap.appendChild(document.createTextNode(" · "));
    cap.appendChild(el("a", { href: f.commonsUrl, rel: "noopener" }, "Quelle: Wikimedia Commons"));
    fig.appendChild(cap);
    return fig;
  }

  function blendeFach() {
    ["pe-abschnitt-sockel", "pe-abschnitt-form", "pe-abschnitt-rueck"].forEach(function (id) {
      var n = document.getElementById(id);
      if (n) n.hidden = true;
    });
  }
  /* Vertiefungen werden je Ansicht und Bauteil gemerkt (fachSpeicher). Der Knopf schaltet um, setzt hidden,
     aria-expanded und Beschriftung; beim Öffnen springt der Fokus in den Abschnitt, beim Schließen bleibt er am Knopf. */
  var fachSpeicher = {};
  function fachKnopf(anzeigenText, zielId, teilId) {
    var ansicht = aktuelleAnsicht;
    var z = document.getElementById(zielId);
    var b = el("button", { type: "button", "class": "pe-fachknopf", "aria-controls": zielId }, anzeigenText);
    function zeige(offen) {
      if (z) z.hidden = !offen;
      b.setAttribute("aria-expanded", offen ? "true" : "false");
      b.textContent = fachBeschriftung(anzeigenText, offen);
    }
    zeige(fachOffen(fachSpeicher, ansicht, teilId, zielId));
    b.addEventListener("click", function () {
      var offen = fachUmschalten(fachSpeicher, ansicht, teilId, zielId);
      zeige(offen);
      if (offen && z) { z.setAttribute("tabindex", "-1"); z.focus(); }
    });
    return b;
  }
  /* haupt = true: Erklärung eines Bauteils der Abbildung (blendet Vertiefungen aus und stellt die gemerkten wieder her). */
  function zeigeDetail(box, eintrag, haupt) {
    if (haupt) blendeFach();
    box.textContent = "";
    box.appendChild(el("h3", {}, eintrag.name));
    var dl = el("dl");
    [["Funktion", eintrag.funktion], ["Einbauort", eintrag.ort], ["Zusammenarbeit", eintrag.zusammen]].forEach(function (p) {
      dl.appendChild(el("dt", {}, p[0])); dl.appendChild(el("dd", {}, p[1]));
    });
    if (eintrag.anschluesse) {
      dl.appendChild(el("dt", {}, "Wichtige Anschlüsse"));
      var dd = el("dd");
      dd.appendChild(el("p", {}, "Von außen erreichbar (je nach Gehäuse und Mainboard verschieden):"));
      dd.appendChild(liste(eintrag.anschluesse.aussen));
      dd.appendChild(el("p", {}, "Im Inneren:"));
      dd.appendChild(liste(eintrag.anschluesse.innen));
      dl.appendChild(dd);
    }
    [["Bauformen und Unterschiede", eintrag.bauformen], ["Praxisbeispiel", eintrag.praxis]].forEach(function (p) {
      dl.appendChild(el("dt", {}, p[0])); dl.appendChild(el("dd", {}, p[1]));
    });
    box.appendChild(dl);
    if (haupt && eintrag.id === "cpu") box.appendChild(fachKnopf("CPU-Bauformen anzeigen", "pe-abschnitt-sockel", eintrag.id));
    if (haupt && eintrag.id === "board" && aktuelleAnsicht === "desktop") {
      box.appendChild(fachKnopf("Formfaktoren anzeigen", "pe-abschnitt-form", eintrag.id));
      box.appendChild(fachKnopf("Anschlüsse auf der Rückseite anzeigen", "pe-abschnitt-rueck", eintrag.id));
    }
    if (eintrag.foto) box.appendChild(baueFoto(eintrag.foto));
    box.appendChild(el("p", { "class": "pe-merk" }, "Merksatz: " + eintrag.merk));
    if (glossarVorhanden(global.GLOSSAR, eintrag.glossar)) {
      var p = el("p");
      p.appendChild(el("a", { href: "../glossar.html?von=pc-explorer.html" }, "Im Glossar: " + eintrag.glossar));
      box.appendChild(p);
    }
    if (eintrag.fakt || (eintrag.q && eintrag.q.length)) {
      var d = el("details", { "class": "pe-mehr" });
      d.appendChild(el("summary", {}, "Mehr dazu"));
      if (eintrag.fakt) d.appendChild(el("p", { "class": "pe-quelle" }, "Belegt: " + eintrag.fakt));
      if (eintrag.q && eintrag.q.length) {
        d.appendChild(el("p", { "class": "pe-quelle" }, "Quellen:"));
        var ul = el("ul", { "class": "pe-quelle" });
        eintrag.q.forEach(function (id) {
          var q = QUELLEN[id], li = el("li");
          li.appendChild(el("a", { href: q.url, rel: "noopener" }, q.titel));
          li.appendChild(document.createTextNode(" · abgerufen " + q.abruf + (q.vorlaeufig ? " · vorläufig, keine Norm" : "")));
          ul.appendChild(li);
        });
        d.appendChild(ul);
      }
      box.appendChild(d);
    }
  }

  /* Eine Auswahlgruppe mit Rovingfokus: ein Tab-Stopp, Pfeiltasten bewegen den Fokus, Enter/Leertaste oder Klick wählt. */
  function baueGruppe(container, eintraege, onWahl) {
    var knoepfe = [];
    function tabstopp(n) { knoepfe.forEach(function (x, j) { x.setAttribute("tabindex", j === n ? "0" : "-1"); }); }
    function setze(i) {
      knoepfe.forEach(function (b, j) { b.setAttribute("aria-pressed", j === i ? "true" : "false"); });
      tabstopp(i);
      onWahl(eintraege[i]);
    }
    eintraege.forEach(function (eintrag, i) {
      var b = el("button", { type: "button", "aria-pressed": "false", tabindex: i === 0 ? "0" : "-1", "data-id": eintrag.id }, eintrag.name);
      b.addEventListener("click", function () { setze(i); });
      b.addEventListener("keydown", function (e) {
        var n = naechsterIndex(i, e.key, eintraege.length);
        if (n < 0) return;
        e.preventDefault();
        setze(n);
        knoepfe[n].focus();
      });
      container.appendChild(b); knoepfe.push(b);
    });
    return { waehle: function (id) { for (var i = 0; i < eintraege.length; i++) if (eintraege[i].id === id) { setze(i); return; } } };
  }

  function start() {
    var svg = document.getElementById("pe-svg"), teileBox = document.getElementById("pe-teile"), detail = document.getElementById("pe-detail");
    var ansichtBox = document.getElementById("pe-ansichten");
    if (!svg || !teileBox || !detail || !ansichtBox) return;
    var sockelWahl = document.getElementById("pe-sockel-wahl"), sockelDetail = document.getElementById("pe-sockel-detail");
    var formWahl = document.getElementById("pe-form-wahl"), formDetail = document.getElementById("pe-form-detail");
    var abschnittSockel = document.getElementById("pe-abschnitt-sockel"), abschnittForm = document.getElementById("pe-abschnitt-form");
    var hinweis = document.getElementById("pe-bildhinweis");
    var titel = document.getElementById("pe-titel"), einleitung = document.getElementById("pe-einleitung");

function markiere(id) {
      Array.prototype.forEach.call(svg.querySelectorAll(".pe-teil"), function (g) {
        var an = g.getAttribute("data-id") === id;
        g.classList.toggle("pe-aktiv", an);
        g.setAttribute("aria-pressed", an ? "true" : "false");
      });
      Array.prototype.forEach.call(svg.querySelectorAll(".pe-etikett, .pe-rahmen, .pe-rahmen-saum"), function (n) {
        n.classList.toggle("pe-aktiv", n.getAttribute("data-id") === id);
      });
    }

    function zeichne(ansicht, gruppeTeile) {
      svg.setAttribute("viewBox", "0 0 780 480");
      svg.appendChild(zeichneDeko(aktuelleAnsicht));
      zeichenReihenfolge(ansicht.teile).forEach(function (t) {
        var g = svgEl("g", {
          "class": "pe-teil pe-teil-" + t.id + (t.grund ? " pe-grund" : ""),
          "data-id": t.id, role: "button", tabindex: "0",
          "aria-label": t.name, "aria-pressed": "false"
        });
        if (istAnschlussAnsicht(aktuelleAnsicht)) zeichneAnschlussTeil(t, g);
        else if (aktuelleAnsicht === "notebook") zeichneNotebookTeil(t, g); else zeichneDesktopTeil(t, g);
        g.addEventListener("click", function () { gruppeTeile.waehle(t.id); });
        g.addEventListener("keydown", function (e) {
          if (e.key === "Enter" || e.key === " ") { e.preventDefault(); gruppeTeile.waehle(t.id); return; }
          var parts = Array.prototype.slice.call(svg.querySelectorAll(".pe-teil"));
          var i = parts.indexOf(g);
          var n = naechsterIndex(i, e.key, parts.length);
          if (n < 0) return;
          e.preventDefault();
          gruppeTeile.waehle(parts[n].getAttribute("data-id"));
          parts[n].focus();
        });
        svg.appendChild(g);
      });
      svg.appendChild(zeichneKabel(aktuelleAnsicht));
      zeichneRahmen(svg, ansicht.teile);
      if (!istAnschlussAnsicht(aktuelleAnsicht)) zeichneEtiketten(svg, ansicht.teile, aktuelleAnsicht, gruppeTeile.waehle);
    }

    function zeigeAnsicht(key) {
      var a = ANSICHTEN[key];
      if (!a) return;
      aktuelleAnsicht = key;
      [svg, teileBox, detail, sockelWahl, sockelDetail, formWahl, formDetail].forEach(function (n) { n.textContent = ""; });
      Array.prototype.forEach.call(ansichtBox.querySelectorAll("button"), function (b) {
        b.setAttribute("aria-pressed", b.getAttribute("data-ansicht") === key ? "true" : "false");
      });
      titel.textContent = a.titel;
      einleitung.textContent = a.einleitung;
      if (hinweis) hinweis.textContent = istAnschlussAnsicht(key) ? HINWEIS_SCHEMA : BILDHINWEIS + (key === "notebook" ? BILDHINWEIS_NOTEBOOK : "");
      var kuehlerKnopf = document.getElementById("pe-kuehler");
      if (kuehlerKnopf) kuehlerKnopf.hidden = istAnschlussAnsicht(key);
      document.title = a.titel + " (Entwurf)";
      teileBox.setAttribute("aria-label", a.gruppe);
      var gruppeTeile = baueGruppe(teileBox, a.teile, function (t) { markiere(t.id); zeigeDetail(detail, t, true); });
      zeichne(a, gruppeTeile);
      abschnittSockel.hidden = true;
      abschnittForm.hidden = true;
      var rueck = document.getElementById("pe-abschnitt-rueck");
      if (rueck) rueck.hidden = true;
      if (SOCKEL.length) { baueGruppe(sockelWahl, SOCKEL, function (s) { zeigeDetail(sockelDetail, s); }); sockelDetail.textContent = "Wähle eine Bauform."; }
      if (key === "desktop" && FORMEN.length) { baueGruppe(formWahl, FORMEN, function (f) { zeigeDetail(formDetail, f); }); formDetail.textContent = "Wähle einen Formfaktor."; }
      gruppeTeile.waehle(a.teile[0].id);
    }

    Array.prototype.forEach.call(ansichtBox.querySelectorAll("button"), function (b) {
      b.addEventListener("click", function () { zeigeAnsicht(b.getAttribute("data-ansicht")); });
    });

    var ul = document.getElementById("pe-quellenliste");
    Object.keys(QUELLEN).forEach(function (k) {
      var li = el("li"), q = QUELLEN[k];
      li.appendChild(el("a", { href: q.url, rel: "noopener" }, q.titel));
      li.appendChild(document.createTextNode(" · abgerufen " + q.abruf + (q.vorlaeufig ? " · vorläufig, keine Norm" : "")));
      ul.appendChild(li);
    });
    var kuehler = document.getElementById("pe-kuehler");
    if (kuehler) kuehler.addEventListener("click", function () {
      var an = kuehler.getAttribute("aria-pressed") !== "true";
      kuehler.setAttribute("aria-pressed", an ? "true" : "false");
      kuehler.textContent = an ? "Kühlung wieder deckend" : "Kühlung durchsichtig";
      var zeichnung = svg.parentNode;
      if (zeichnung) zeichnung.classList.toggle("pe-kuehler-offen", an);
    });
    zeigeAnsicht("desktop");
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start); else start();
})(typeof window !== "undefined" ? window : globalThis);
