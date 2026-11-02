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
    "camm2": { titel: "JEDEC-Pressemitteilung zu CAMM2 (JESD318), 5. Dezember 2023", url: "https://www.jedec.org/news/pressreleases/jedec-publishes-new-camm2-memory-module-standard", abruf: "2026-11-01" }
  };

  /* Pflicht-Texte je Bauteil: Funktion, Einbauort, Zusammenarbeit, Bauformen, Praxisbeispiel, Merksatz.
     "q" = Quellen-IDs, leer = reiner Lerntext ohne Zahl. "kurz" = kurze Beschriftung in der Zeichnung. */
  var TEILE = [
    { id: "cpu", name: "Prozessor (CPU)", kurz: "Prozessor", glossar: "CPU", layout: [50, 60, 100, 90],
      funktion: "Führt Programmbefehle aus und steuert den Rechenablauf.",
      ort: "Im CPU-Sockel auf dem Mainboard. Darüber sitzt der Kühler.",
      zusammen: "Holt Daten aus dem Arbeitsspeicher. Das Mainboard liefert Strom und Anschlüsse.",
      bauformen: "PGA: Stifte sitzen an der CPU. LGA: Kontaktstifte sitzen im Sockel. BGA: Das Bauteil wird fest auf die Platine gelötet. Diese Begriffe beschreiben die Kontaktanordnung, nicht allein die Kompatibilität.",
      praxis: "Ausbildungsbeispiel: Vor einem CPU-Tausch vergleichst du CPU und Sockel anhand der Herstellerangaben; gleiche Bauform allein beweist keine Kompatibilität.",
      merk: "Der Sockel entscheidet, welche CPU passt. Gleiche Größe heißt nicht gleich kompatibel.",
      fakt: "Ein Desktop-Mainboard hat einen Sockel, in den die CPU ohne Löten gesteckt oder aufgelegt wird.", q: ["cpu-socket"] },
    { id: "cool", name: "Kühlung", kurz: "Kühlung", glossar: "Kühlung", layout: [170, 60, 100, 90],
      funktion: "Führt Wärme von CPU und Grafikkarte ab.",
      ort: "Der Kühler sitzt auf der CPU, Gehäuselüfter sitzen im Gehäuse.",
      zusammen: "Hält die CPU im zulässigen Temperaturbereich, damit sie nicht drosselt.",
      bauformen: "Es gibt unterschiedliche Kühler- und Lüfterbauarten. Die passende Befestigung hängt von CPU-Sockel und Kühler ab; konkrete Kompatibilität muss geprüft werden.",
      praxis: "Ausbildungsbeispiel: Bei einer Wartung prüfst du, ob der Kühler sicher befestigt ist und ob Lüfter nicht blockiert sind.",
      merk: "Kühlerbefestigung und CPU-Sockel sind getrennte Fragen.",
      fakt: "Moderne CPU-Sockel werden fast immer zusammen mit einem Befestigungssystem für den Kühler entworfen.", q: ["cpu-socket"] },
    { id: "ram", name: "Arbeitsspeicher (RAM)", kurz: "Arbeitsspeicher", glossar: "RAM", layout: [300, 60, 120, 110],
      funktion: "Hält Programme und Daten, mit denen die CPU gerade arbeitet.",
      ort: "In den Speicher-Steckplätzen neben dem CPU-Sockel.",
      zusammen: "Die CPU spricht über ihren Speichercontroller mit dem RAM. Die Speichergeneration muss zu Board und CPU passen.",
      bauformen: "DIMM ist ein Speichermodulformat, das laut IBM häufig in Desktop-PCs und Servern eingesetzt wird. SO-DIMM ist die kompaktere Modulbauart, die IBM für Laptops beschreibt. Die passenden Steckplätze müssen zum jeweiligen Modul passen.",
      praxis: "Ausbildungsbeispiel: Vor einer Speichererweiterung vergleichst du Modulbauart und Systemangaben; ein Modul passt nicht allein deshalb, weil es RAM ist.",
      merk: "Bei neuen Bauformen zählt nicht nur der Name, sondern auch die Speichertechnik.",
      fakt: "CAMM2 gibt es in zwei Ausführungen (DDR5 und LPDDR5/5X) mit gleichem Stecker, aber anderer Pinbelegung und anderer Befestigung. Sie sind nicht austauschbar.", q: ["camm2", "ibm-dimm"] },
    { id: "gpu", name: "Grafikkarte (GPU)", kurz: "Grafikkarte", glossar: "GPU", layout: [50, 230, 300, 44],
      funktion: "Berechnet Bilder und Grafik und gibt das Bild an den Monitor aus.",
      ort: "Im PCIe-Erweiterungssteckplatz des Mainboards.",
      zusammen: "Bekommt Daten von CPU und RAM. Das Netzteil versorgt sie mit Strom.",
      bauformen: "Grafik kann als eigenes Erweiterungsbauteil oder integriert in einem anderen Bauteil bereitgestellt werden. Konkrete Steckplatz- und Stromanforderungen hängen vom Gerät ab.",
      praxis: "Ausbildungsbeispiel: Du klärst, ob ein Arbeitsplatz eine eigene Grafikkarte benötigt und prüfst vor dem Einbau die Angaben von Mainboard, Gehäuse und Netzteil.",
      merk: "Integrierte Grafik sitzt in der CPU. Eine Grafikkarte ist ein eigenes Bauteil.", fakt: "", q: [] },
    { id: "ssd", name: "SSD", kurz: "SSD", glossar: "SSD", layout: [50, 300, 140, 32],
      funktion: "Speichert Daten dauerhaft ohne bewegte Teile.",
      ort: "Als M.2-Stick direkt auf dem Mainboard oder als Laufwerk im Gehäuse.",
      zusammen: "Das Betriebssystem wird von hier in den Arbeitsspeicher geladen.",
      bauformen: "SATA ist eine Speicher-Schnittstelle, die laut SATA-IO unter anderem für SSDs und HDDs eingesetzt wird. NVMe ist ein offener Standard für Speicherzugriff; die NVMe-Spezifikation beschreibt ein Register-Interface und einen Befehlssatz für Speicher über PCI Express. M.2 bezeichnet nicht automatisch SATA oder NVMe.",
      praxis: "Ausbildungsbeispiel: Vor dem Austausch einer SSD prüfst du Anschluss, unterstützte Schnittstelle und Bauform in den Geräteangaben.",
      merk: "M.2 beschreibt die Bauform. SATA und NVMe sind Wege, wie die SSD angebunden ist.",
      fakt: "NVMe ist die Schnittstellenspezifikation für Speicher, der über PCI Express angebunden ist.", q: ["nvme", "sata-io"] },
    { id: "hdd", name: "Festplatte (HDD)", kurz: "Festplatte", glossar: "HDD", layout: [470, 60, 150, 90],
      funktion: "Speichert Daten magnetisch auf rotierenden Scheiben. Sie ist günstig und groß.",
      ort: "Im Laufwerksschacht des Gehäuses, per Datenkabel mit dem Mainboard verbunden.",
      zusammen: "Daten laufen über das Datenkabel zum Mainboard, Strom kommt vom Netzteil.",
      bauformen: "Festplatten gibt es in verschiedenen Gehäuse- und Anschlussvarianten. Konkrete Maße und Kompatibilität sind hier nicht festgelegt.",
      praxis: "Ausbildungsbeispiel: Bei einer Speichererweiterung prüfst du Laufwerksschacht, Anschluss und Gerätevorgaben, bevor du ein Laufwerk auswählst.",
      merk: "Sie enthält bewegte Teile und ist deshalb stoßempfindlicher als eine SSD.", fakt: "", q: [] },
    { id: "psu", name: "Netzteil", kurz: "Netzteil", glossar: "Netzteil", layout: [470, 290, 150, 80],
      funktion: "Wandelt die Netzspannung in niedrige Gleichspannungen für die Bauteile um.",
      ort: "Im Gehäuse, meist unten oder hinten.",
      zusammen: "Versorgt Mainboard, Grafikkarte und Laufwerke über Kabel.",
      bauformen: "Netzteile unterscheiden sich unter anderem durch Bauform, Anschlüsse und Leistungsdaten. Eine passende Auswahl muss anhand der konkreten Komponenten geprüft werden.",
      praxis: "Ausbildungsbeispiel: Bei einer PC-Planung prüfst du, ob die erforderlichen Stromanschlüsse vorhanden sind und ob das Netzteil laut Herstellerangaben zur Konfiguration passt.",
      merk: "Ein geöffnetes Netzteil nicht berühren: Es kann auch nach dem Ausschalten gefährlich sein.", fakt: "", q: [] },
    { id: "board", name: "Mainboard und Verbindungen", kurz: "Mainboard", glossar: "Mainboard", layout: [20, 20, 420, 360], label: [30, 372], grund: true,
      funktion: "Verbindet alle Bauteile und verteilt Strom und Daten.",
      ort: "Im Gehäuse verschraubt. Die Bauform (Formfaktor) bestimmt, ob es ins Gehäuse passt.",
      zusammen: "Trägt CPU-Sockel, Speicher-Steckplätze, PCIe-Steckplätze, M.2- und SATA-Anschlüsse sowie die Stromanschlüsse vom Netzteil.",
      bauformen: "ATX, microATX und Mini-ITX sind Mainboard-Formfaktoren. Formfaktor und Gehäuse müssen zueinander passen. Die verfügbaren Ausführungen unterscheiden sich je nach Board; die hier vorliegenden Formfaktorquellen sind Wikipedia und keine Normtexte.",
      praxis: "Ausbildungsbeispiel: Bei der Zusammenstellung eines Rechners prüfst du in den Herstellerangaben, ob Mainboard-Bauform und Gehäuse zusammenpassen.",
      merk: "Wichtige Verbindungen: PCIe für Erweiterungskarten, M.2 und SATA für Laufwerke, Stromkabel vom Netzteil.",
      fakt: "Das Mainboard ist die zentrale Platine, an der die anderen Bauteile angeschlossen werden, und verteilt Strom an andere Platinen.", q: ["formfaktor"] },
    { id: "gehaeuse", name: "Gehäuse und Anschlüsse", kurz: "Gehäuse", glossar: "Gehäuse", layout: [4, 4, 632, 392], label: [450, 388], grund: true,
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
      ort: "Gehäuse für ATX. Größter der drei Formfaktoren hier: 12 × 9,6 Zoll.",
      zusammen: "ATX löste 1995 den älteren AT-Standard ab. Kleinere Boards wurden passend zu ATX-Befestigungspunkten entworfen.",
      bauformen: "ATX, microATX und Mini-ITX unterscheiden sich vor allem in Größe und Anzahl der Erweiterungsplätze. Die Angaben stammen aus Wikipedia und sind vorläufig, keine Normtexte.",
      praxis: "Ausbildungsbeispiel: Du prüfst in den Herstellerangaben, ob Mainboard-Formfaktor und Gehäuse zusammenpassen. Mechanisch passend heißt nicht vollständig kompatibel.",
      merk: "ATX ist der Maßstab, an dem sich die kleineren Formen ausrichten.", fakt: "", q: ["formfaktor", "microatx"] },
    { id: "microatx", name: "microATX", glossar: "Mainboard",
      funktion: "Eine kleinere Variante, die bewusst zu ATX rückwärtskompatibel ist.",
      ort: "Höchstens 9,6 × 9,6 Zoll. Eingeführt im Dezember 1997. Es gibt auch kleinere Boards, die sich microATX nennen.",
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
      merk: "Mini-ITX: klein, ein Erweiterungsplatz.", fakt: "", q: ["mini-itx"] }
  ];

  /* Notebook: modellneutrales Schema. Alles, was vom Gerät abhängt, steht als Lerntext ohne Maß
     und ohne Kompatibilitätszusage. Texte stammen aus docs/inhalte/2026-11-01-pc-explorer-inhalte.json. */
  var CAMM2_TEXT = "JEDEC hat am 5. Dezember 2023 den Standard JESD318 veröffentlicht: Compression Attached Memory Module, kurz CAMM2. " +
    "Er beschreibt DDR5-CAMM2 und LPDDR5/5X-CAMM2. DDR5-CAMM2 ist für leistungsstarke Notebooks und übliche Desktop-PCs gedacht, " +
    "LPDDR5/5X-CAMM2 für eine breitere Notebook-Spanne und manche Server. Beide nutzen dasselbe Steckerdesign, aber unterschiedliche Pinbelegung. " +
    "Unterschiedliche Befestigung soll verhindern, dass ein Modul dort sitzt, wo es nicht hingehört. Die Varianten sind nicht austauschbar. " +
    "Der vollständige Standardtext wurde nicht geöffnet; die Aussage stammt aus der Pressemitteilung.";

  var NOTEBOOK_TEILE = [
    { id: "board", name: "Systemplatine", kurz: "Systemplatine", glossar: "Mainboard", layout: [16, 16, 446, 356], label: [26, 364], grund: true,
      funktion: "Verbindet die Bauteile des Notebooks.",
      ort: "Im Inneren des Gehäuses. Lage und Aufbau hängen vom Modell ab.",
      zusammen: "Sie verbindet Prozessor, Speicher, Laufwerk, Anschlüsse und Stromversorgung.",
      bauformen: "Auf der Systemplatine können Bauteile fest verlötet oder über Steckplätze angeschlossen sein. Das ist modellabhängig.",
      praxis: "Ausbildungsbeispiel: Vor einer Reparatur suchst du die Wartungsunterlagen des konkreten Modells.",
      merk: "Im Notebook ist vieles fest eingebaut. Prüfe immer das genaue Modell.", fakt: "", q: [] },
    { id: "cpu", name: "Prozessor", kurz: "Prozessor", glossar: "CPU", layout: [36, 40, 100, 80],
      funktion: "Führt Befehle aus und steuert Rechenaufgaben.",
      ort: "Auf oder an der Systemplatine, in der Nähe der Kühlung. Der genaue Aufbau hängt vom Modell ab.",
      zusammen: "Arbeitet mit Arbeitsspeicher und Kühlung zusammen.",
      bauformen: "Kann je nach Gerät fest auf der Platine sitzen oder anders befestigt sein. Für das konkrete Gerät prüfen.",
      praxis: "Ausbildungsbeispiel: Bei einer Fehlerdiagnose prüfst du zuerst die Modellunterlagen, bevor du einen Austausch annimmst.",
      merk: "Nicht jede Notebook-CPU lässt sich tauschen. Prüfe das Modell.", fakt: "", q: [] },
    { id: "cool", name: "Kühlung", kurz: "Kühlung", glossar: "Kühlung", layout: [156, 40, 130, 80],
      funktion: "Führt Wärme aus dem engen Geräteinneren ab.",
      ort: "Im Inneren des Gehäuses, nahe der Wärmequellen. Lüftungsöffnungen im Gehäuse bilden den Luftweg.",
      zusammen: "Lüfter und Kühlflächen müssen zum verfügbaren Platz und zum Luftweg passen.",
      bauformen: "Kühlteile sind Teil des modellabhängigen Innenaufbaus. Der knappe Platz begrenzt Anordnung und Luftweg; konkrete Aussagen sind vom Modell abhängig.",
      praxis: "Ausbildungsbeispiel: Bei einer Wartung kontrollierst du nach Herstelleranleitung, ob Lüftungsöffnungen frei sind.",
      merk: "Wenig Platz heißt wenig Luft: Lüftungsöffnungen müssen frei bleiben.", fakt: "", q: [] },
    { id: "ram", name: "Arbeitsspeicher (RAM)", kurz: "Arbeitsspeicher", glossar: "RAM", layout: [306, 40, 140, 64],
      funktion: "Hält aktuell benötigte Daten und Programme bereit.",
      ort: "Fest auf der Systemplatine verlötet oder in einem Steckplatz beziehungsweise Modulsystem. Das Modell entscheidet.",
      zusammen: "Der Prozessor greift auf den Arbeitsspeicher zu.",
      bauformen: "Verlöteter RAM ist fest mit der Platine verbunden und nicht als gewöhnliches Steckmodul entnehmbar. Austauschbarer RAM sitzt in einem dafür vorgesehenen Steckplatz oder Modulsystem. Ob ein bestimmtes Notebook das unterstützt, muss in dessen Unterlagen geprüft werden. SO-DIMM ist laut IBM ein kompaktes Speichermodulformat, das häufig in Laptops verwendet wird. Neuere Bauform: CAMM2, ein JEDEC-Standard (JESD318). Die beiden CAMM2-Varianten sind nicht austauschbar. Die Namen allein belegen keine Kompatibilität.",
      praxis: "Ausbildungsbeispiel: Vor einer Speichererweiterung prüfst du die Wartungs- und Spezifikationsangaben des genauen Notebookmodells.",
      merk: "Verlötet oder steckbar: Das entscheidet das Modell, nicht der RAM-Name.",
      fakt: CAMM2_TEXT, q: ["camm2", "ibm-dimm"] },
    { id: "gpu", name: "Grafik (GPU)", kurz: "Grafik", glossar: "GPU", layout: [306, 124, 140, 56],
      funktion: "Berechnet Bilder und Grafik für den Bildschirm.",
      ort: "Je nach Modell in einem anderen Bauteil integriert oder als eigener Grafikchip vorhanden. Das steht in den Modellunterlagen.",
      zusammen: "Bekommt Daten von Prozessor und Arbeitsspeicher.",
      bauformen: "Grafik kann in einem anderen Bauteil integriert sein oder als eigener Grafikchip vorhanden sein. Das hängt vom Modell ab. Einen austauschbaren Steckplatz wie im Desktop solltest du nicht voraussetzen.",
      praxis: "Ausbildungsbeispiel: Eine Kundin wünscht mehr Grafikleistung. Du prüfst in den Modellunterlagen, welche Grafik das Gerät hat und ob sie überhaupt erweiterbar ist.",
      merk: "Grafik im Notebook ist modellabhängig: integriert oder als eigener Chip.", fakt: "", q: [] },
    { id: "ssd", name: "SSD", kurz: "SSD", glossar: "SSD", layout: [36, 140, 130, 44],
      funktion: "Speichert Betriebssystem und Dateien dauerhaft.",
      ort: "Im Inneren des Gehäuses, je nach Modell auf der Platine oder an einem Laufwerksplatz.",
      zusammen: "Beim Start werden benötigte Daten vom Speicher in den Arbeitsspeicher geladen.",
      bauformen: "Ob eine SSD austauschbar ist, hängt vom Modell und seiner Bauweise ab. M.2 beschreibt die Bauform und bezeichnet nicht automatisch SATA oder NVMe. SATA ist laut SATA-IO eine Speicher-Schnittstelle unter anderem für SSDs und HDDs. NVMe beschreibt Speicher über PCI Express. Bauform und unterstützte Anbindung sind geräteabhängig.",
      praxis: "Ausbildungsbeispiel: Du prüfst vor einem Tausch die Modellunterlagen und sicherst wichtige Daten nach Auftrag.",
      merk: "M.2 ist die Bauform, nicht die Schnittstelle.",
      fakt: "NVMe ist die Schnittstellenspezifikation für Speicher, der über PCI Express angebunden ist.", q: ["nvme", "sata-io"] },
    { id: "akku", name: "Akku", kurz: "Akku", glossar: "Akku", layout: [36, 220, 410, 110],
      funktion: "Versorgt das Notebook unterwegs mit Energie.",
      ort: "Im Gehäuse. Ob er von außen oder nur nach dem Öffnen erreichbar ist, hängt vom Modell ab.",
      zusammen: "Der Akku arbeitet mit Ladeelektronik und Stromversorgung zusammen.",
      bauformen: "Austauschbarkeit und Wartungsweg sind modellabhängig.",
      praxis: "Ausbildungsbeispiel: Vor Wartung oder Ersatz beachtest du die Herstelleranleitung und Sicherheitsvorgaben.",
      merk: "Vor Arbeiten am Akku immer die Herstelleranleitung lesen.", fakt: "", q: [] },
    { id: "netzteil", name: "Externes Netzteil", kurz: "Netzteil extern", glossar: "Netzteil", layout: [490, 290, 140, 70],
      funktion: "Wandelt die Netzspannung in eine Spannung zum Laden und Betreiben des Notebooks um.",
      ort: "Außerhalb des Notebooks, über ein Kabel mit dem Gerät verbunden. Das ist modellabhängig.",
      zusammen: "Arbeitet mit Ladeelektronik und Akku zusammen.",
      bauformen: "Netzteile unterscheiden sich je nach Gerät. Welches Netzteil passt, steht in den Modellunterlagen; Anschlussform und Leistungsangaben werden hier nicht festgelegt.",
      praxis: "Ausbildungsbeispiel: Lädt ein Notebook nicht, prüfst du anhand der Modellunterlagen, welches Netzteil zum Gerät gehört, bevor du Teile tauschst.",
      merk: "Das Netzteil gehört zum Gerät. Ein anderes passt nicht automatisch.", fakt: "", q: [] },
    { id: "gehaeuse", name: "Gehäuse und Anschlüsse", kurz: "Gehäuse", glossar: "Gehäuse", layout: [4, 4, 470, 392], label: [14, 390], grund: true,
      funktion: "Das Gehäuse hält die Bauteile des Notebooks zusammen und schützt sie. Anschlüsse und Lüftungsöffnungen sind modellabhängig.",
      ort: "Es umschließt alle Bauteile. Die Anschlüsse sitzen an den Seiten oder an der Rückseite, je nach Modell.",
      zusammen: "Das Gehäuse gibt Platz und Befestigung für Systemplatine, Akku, Kühlung und Speicher vor. Lüftungsöffnungen bilden den Luftweg.",
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

  var BILDHINWEIS = "Die Zeichnung ist eine schematische Skizze. Echte Fotos gibt es bisher nur für PGA, LGA und BGA bei den CPU-Bauformen.";
  var BILDHINWEIS_NOTEBOOK = " Für das Notebook liegt noch kein freigegebenes Komponentenbild vor, die Liste bleibt gleichwertig.";

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

  /* Zeichenreihenfolge: Gehäuse zuerst, Mainboard darüber, übrige Teile oben. */
  function zeichenReihenfolge(teile) {
    function z(t) { return t.id === "gehaeuse" ? 0 : t.id === "board" ? 1 : 2; }
    return teile.map(function (t, i) { return { t: t, i: i }; })
      .sort(function (a, b) { return z(a.t) - z(b.t) || a.i - b.i; })
      .map(function (x) { return x.t; });
  }

  var api = { DATEN: DATEN, naechsterIndex: naechsterIndex, finde: finde, glossarVorhanden: glossarVorhanden, zeichenReihenfolge: zeichenReihenfolge };
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

  function zeigeDetail(box, eintrag) {
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
        tabstopp(n);
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
        if (g.getAttribute("data-id") === id) g.classList.add("pe-aktiv"); else g.classList.remove("pe-aktiv");
      });
    }

    /* Zeichnet dieselbe schematische Zeichnung für jede Ansicht aus den layout-Daten. */
    function zeichne(ansicht, gruppeTeile) {
      zeichenReihenfolge(ansicht.teile).forEach(function (t) {
        var r = t.layout;
        var g = svgEl("g", { "class": "pe-teil" + (t.grund ? " pe-grund" : ""), "data-id": t.id });
        g.appendChild(svgEl("rect", { x: r[0], y: r[1], width: r[2], height: r[3], rx: t.grund ? 12 : 6 }));
        var pos = t.label || [r[0] + 8, r[1] + r[3] / 2 + 5];
        g.appendChild(svgEl("text", { x: pos[0], y: pos[1] }, t.kurz || t.name));
        g.addEventListener("click", function () { gruppeTeile.waehle(t.id); });
        svg.appendChild(g);
      });
    }

    function zeigeAnsicht(key) {
      var a = ANSICHTEN[key];
      if (!a) return;
      [svg, teileBox, detail, sockelWahl, sockelDetail, formWahl, formDetail].forEach(function (n) { n.textContent = ""; });
      Array.prototype.forEach.call(ansichtBox.querySelectorAll("button"), function (b) {
        b.setAttribute("aria-pressed", b.getAttribute("data-ansicht") === key ? "true" : "false");
      });
      titel.textContent = a.titel;
      einleitung.textContent = a.einleitung;
      if (hinweis) hinweis.textContent = BILDHINWEIS + (key === "notebook" ? BILDHINWEIS_NOTEBOOK : "");
      document.title = a.titel + " (Entwurf)";
      teileBox.setAttribute("aria-label", a.gruppe);
      var gruppeTeile = baueGruppe(teileBox, a.teile, function (t) { markiere(t.id); zeigeDetail(detail, t); });
      zeichne(a, gruppeTeile);
      abschnittSockel.hidden = !a.sockel.length;
      abschnittForm.hidden = !a.formen.length;
      if (a.sockel.length) { baueGruppe(sockelWahl, a.sockel, function (s) { zeigeDetail(sockelDetail, s); }); sockelDetail.textContent = "Wähle eine Bauform."; }
      if (a.formen.length) { baueGruppe(formWahl, a.formen, function (f) { zeigeDetail(formDetail, f); }); formDetail.textContent = "Wähle einen Formfaktor."; }
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
    zeigeAnsicht("desktop");
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start); else start();
})(typeof window !== "undefined" ? window : globalThis);
