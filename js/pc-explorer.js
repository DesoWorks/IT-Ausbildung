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
    "msi-pz": { titel: "MSI: Project Zero Desktop, Back-Connect", url: "https://www.msi.com/Landing/project-zero/desktop", abruf: "2026-11-02" }
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
    { id: "hdd", name: "Festplatte (HDD)", kurz: "HDD", glossar: "HDD", layout: [180, 392, 176, 36],
      funktion: "Speichert Daten magnetisch auf rotierenden Scheiben. Sie ist günstig und groß.",
      ort: "Im Laufwerksschacht des Gehäuses, per Datenkabel mit dem Mainboard verbunden.",
      zusammen: "Daten laufen über das Datenkabel zum Mainboard, Strom kommt vom Netzteil.",
      bauformen: "Festplatten gibt es in verschiedenen Gehäuse- und Anschlussvarianten. Im Desktop sitzt sie typischerweise als 3,5-Zoll-Laufwerk in einem Laufwerksschacht. Konkrete Maße stehen hier nicht.",
      praxis: "Ausbildungsbeispiel: Bei einer Speichererweiterung prüfst du Laufwerksschacht, Anschluss und Gerätevorgaben, bevor du ein Laufwerk auswählst.",
      merk: "Sie enthält bewegte Teile und ist deshalb stoßempfindlicher als eine SSD.", fakt: "", q: [] },
    { id: "psu", name: "Netzteil (PSU)", kurz: "Netzteil", glossar: "Netzteil", layout: [396, 384, 232, 70],
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
    server: null /* reservierter Daten-Slot, kein auswählbarer Zustand */
  };

  var BILDHINWEIS = "Die Abbildung besteht aus einzeln auswählbaren Bauteilen. Sie ist ein farbiges Beispiel, nicht maßstäblich und kein Foto eines bestimmten Geräts. Echte Fotos gibt es bisher nur für PGA, LGA und BGA.";
  var BILDHINWEIS_NOTEBOOK = " Die Notebook-Ansicht ist eine eigene Zeichnung, kein verkleinerter Desktop. Für das Notebook liegt noch kein freigegebenes Komponentenbild vor. Die Liste bleibt gleichwertig.";
var aktuelleAnsicht = "desktop";
  /* Beschriftungen: [Platte x, Platte y, Zielpunkt x, Zielpunkt y, optional "o" = Linie startet oben an der Platte].
     Alle Platten stehen außerhalb des Gehäuses, die Linien enden mit einem Punkt auf dem Bauteil. */
  var LABELS = {
    desktop: {
      cool: [8, 32, 300, 76], cpu: [8, 88, 322, 126], gpu: [8, 262, 256, 282], hdd: [8, 398, 196, 410], gehaeuse: [8, 330, 146, 342],
      ram: [650, 8, 510, 70], board: [650, 158, 580, 170], ssd: [650, 211, 416, 223], psu: [650, 408, 620, 420]
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
      svgRect(g, 388, 378, 246, 82, "pe-front", 4);                   /* Netzteilschacht unten hinten */
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
  function zeichneDeko(key) {
    var deko = svgEl("g", { "class": "pe-deko", "aria-hidden": "true" });
    deko.appendChild(svgEl("rect", { x: 0, y: 0, width: 780, height: 480, "class": "pe-platte" }));
    if (key === "notebook") {
      deko.appendChild(svgEl("rect", { x: 156, y: 14, width: 388, height: 34, rx: 8, "class": "pe-lid" }));
      deko.appendChild(svgEl("text", { x: 350, y: 36, "text-anchor": "middle", "class": "pe-hinweistext-hell" }, "Display-Deckel (aufgeklappt, von hinten)"));
    }
    deko.appendChild(svgEl("text", { x: 8, y: 474, "class": "pe-hinweistext" }, "Beispiel, nicht maßstäblich"));
    return deko;
  }
  /* Kabel: nur Dekoration über den Bauteilen, nicht anklickbar und nicht fokussierbar. Verlegt, ohne Beschriftung oder Bauteile zu verdecken. */
  function zeichneKabel(key) {
    var k = svgEl("g", { "class": "pe-kabelschicht", "aria-hidden": "true" });
    function pfad(d, cls) { k.appendChild(svgEl("path", { d: d, "class": "pe-kabel " + cls })); }
    if (key === "desktop") {
      pfad("M 592 386 C 606 356 604 300 604 260 C 604 200 574 190 574 142", "pe-kabel-a pe-kabel-dick");  /* Netzteil zum Mainboard */
      pfad("M 556 386 C 556 356 536 344 536 318", "pe-kabel-a");                                          /* Netzteil zur Grafikkarte */
      pfad("M 396 417 L 364 417", "pe-kabel-a");                                                          /* Netzteil zur Festplatte */
      pfad("M 364 402 C 382 402 382 346 340 342 C 300 338 282 338 280 326", "pe-kabel-b pe-kabel-daten"); /* Festplatte zum Mainboard */
    } else {
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
        if (aktuelleAnsicht === "notebook") zeichneNotebookTeil(t, g); else zeichneDesktopTeil(t, g);
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
      zeichneEtiketten(svg, ansicht.teile, aktuelleAnsicht, gruppeTeile.waehle);
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
      if (hinweis) hinweis.textContent = BILDHINWEIS + (key === "notebook" ? BILDHINWEIS_NOTEBOOK : "");
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
      gruppeTeile.waehle("cpu");
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
