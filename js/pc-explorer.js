/* PC-Explorer (Desktop). Läuft offline, ohne Bibliotheken. Daten und Darstellung sind getrennt,
   damit die Daten ohne Browser testbar sind. Maße stehen nur, wo eine Quelle sie nennt. */
(function (global) {
  "use strict";

  /* Quellen. Jede technische Aussage in DATEN verweist über "q" auf eine dieser IDs. */
  var QUELLEN = {
    "cpu-socket": { titel: "Wikipedia: CPU socket (Abschnitte Einleitung und Function)", url: "https://en.wikipedia.org/wiki/CPU_socket", abruf: "2026-11-01" },
    "bga": { titel: "Wikipedia: Ball grid array (Einleitung und Description)", url: "https://en.wikipedia.org/wiki/Ball_grid_array", abruf: "2026-11-01" },
    "formfaktor": { titel: "Wikipedia: Motherboard form factor (Einleitung und Overview)", url: "https://en.wikipedia.org/wiki/Motherboard_form_factor", abruf: "2026-11-01" },
    "microatx": { titel: "Wikipedia: microATX (Einleitung und Backward compatibility)", url: "https://en.wikipedia.org/wiki/MicroATX", abruf: "2026-11-01" },
    "mini-itx": { titel: "Wikipedia: Mini-ITX (Einleitung)", url: "https://en.wikipedia.org/wiki/Mini-ITX", abruf: "2026-11-01" },
    "nvme": { titel: "NVM Express: About", url: "https://nvmexpress.org/about/", abruf: "2026-10-22 (Rick, quellen-pruefung.md)" },
    "camm2": { titel: "JEDEC-Pressemitteilung zu CAMM2, 5. Dezember 2023", url: "https://www.jedec.org/news/pressreleases/jedec-publishes-new-camm2-memory-module-standard", abruf: "2026-10-22 (Rick, quellen-pruefung.md)" }
  };

  /* Pflicht-Texte je Bauteil: Funktion, Einbauort, Zusammenarbeit. "q" = Quellen-IDs, leer = reiner Lerntext ohne Zahl. */
  var TEILE = [
    { id: "cpu", name: "Prozessor (CPU)", glossar: "CPU", layout: [50, 60, 100, 90],
      funktion: "Führt Programmbefehle aus und steuert den Rechenablauf.",
      ort: "Im CPU-Sockel auf dem Mainboard. Darüber sitzt der Kühler.",
      zusammen: "Holt Daten aus dem Arbeitsspeicher. Das Mainboard liefert Strom und Anschlüsse.",
      merk: "Der Sockel entscheidet, welche CPU passt. Gleiche Größe heißt nicht gleich kompatibel.",
      fakt: "Ein Desktop-Mainboard hat einen Sockel, in den die CPU ohne Löten gesteckt oder aufgelegt wird.", q: ["cpu-socket"] },
    { id: "cool", name: "Kühlung", glossar: "Kühlung", layout: [170, 60, 100, 90],
      funktion: "Führt Wärme von CPU und Grafikkarte ab.",
      ort: "Der Kühler sitzt auf der CPU, Gehäuselüfter sitzen im Gehäuse.",
      zusammen: "Hält die CPU im zulässigen Temperaturbereich, damit sie nicht drosselt.",
      merk: "Kühlerbefestigung und CPU-Sockel sind getrennte Fragen.",
      fakt: "Moderne CPU-Sockel werden fast immer zusammen mit einem Befestigungssystem für den Kühler entworfen.", q: ["cpu-socket"] },
    { id: "ram", name: "Arbeitsspeicher (RAM)", glossar: "RAM", layout: [300, 60, 120, 110],
      funktion: "Hält Programme und Daten, mit denen die CPU gerade arbeitet.",
      ort: "In den Speicher-Steckplätzen neben dem CPU-Sockel.",
      zusammen: "Die CPU spricht über ihren Speichercontroller mit dem RAM. Die Speichergeneration muss zu Board und CPU passen.",
      merk: "Bei neuen Bauformen zählt nicht nur der Name, sondern auch die Speichertechnik.",
      fakt: "CAMM2 gibt es in zwei Ausführungen (DDR5 und LPDDR5/5X) mit gleichem Stecker, aber anderer Pinbelegung und anderer Befestigung. Sie sind nicht austauschbar.", q: ["camm2"] },
    { id: "gpu", name: "Grafikkarte (GPU)", glossar: "GPU", layout: [50, 230, 300, 44],
      funktion: "Berechnet Bilder und Grafik und gibt das Bild an den Monitor aus.",
      ort: "Im PCIe-Erweiterungssteckplatz des Mainboards.",
      zusammen: "Bekommt Daten von CPU und RAM. Das Netzteil versorgt sie mit Strom.",
      merk: "Integrierte Grafik sitzt in der CPU. Eine Grafikkarte ist ein eigenes Bauteil.", fakt: "", q: [] },
    { id: "ssd", name: "SSD", glossar: "SSD", layout: [50, 300, 140, 32],
      funktion: "Speichert Daten dauerhaft ohne bewegte Teile.",
      ort: "Als M.2-Stick direkt auf dem Mainboard oder als Laufwerk im Gehäuse.",
      zusammen: "Das Betriebssystem wird von hier in den Arbeitsspeicher geladen.",
      merk: "M.2 beschreibt die Bauform. SATA und NVMe sind Wege, wie die SSD angebunden ist.",
      fakt: "NVMe ist die Schnittstellenspezifikation für Speicher, der über PCI Express angebunden ist.", q: ["nvme"] },
    { id: "hdd", name: "Festplatte (HDD)", glossar: "HDD", layout: [470, 60, 150, 90],
      funktion: "Speichert Daten magnetisch auf rotierenden Scheiben. Sie ist günstig und groß.",
      ort: "Im Laufwerksschacht des Gehäuses, per Datenkabel mit dem Mainboard verbunden.",
      zusammen: "Daten laufen über das Datenkabel zum Mainboard, Strom kommt vom Netzteil.",
      merk: "Sie enthält bewegte Teile und ist deshalb stoßempfindlicher als eine SSD.", fakt: "", q: [] },
    { id: "psu", name: "Netzteil", glossar: "Netzteil", layout: [470, 290, 150, 80],
      funktion: "Wandelt die Netzspannung in niedrige Gleichspannungen für die Bauteile um.",
      ort: "Im Gehäuse, meist unten oder hinten.",
      zusammen: "Versorgt Mainboard, Grafikkarte und Laufwerke über Kabel.",
      merk: "Ein geöffnetes Netzteil nicht berühren: Es kann auch nach dem Ausschalten gefährlich sein.", fakt: "", q: [] },
    { id: "board", name: "Mainboard und Verbindungen", glossar: "Mainboard", layout: [20, 20, 420, 360],
      funktion: "Verbindet alle Bauteile und verteilt Strom und Daten.",
      ort: "Im Gehäuse verschraubt. Die Bauform (Formfaktor) bestimmt, ob es ins Gehäuse passt.",
      zusammen: "Trägt CPU-Sockel, Speicher-Steckplätze, PCIe-Steckplätze, M.2- und SATA-Anschlüsse sowie die Stromanschlüsse vom Netzteil.",
      merk: "Wichtige Verbindungen: PCIe für Erweiterungskarten, M.2 und SATA für Laufwerke, Stromkabel vom Netzteil.",
      fakt: "Das Mainboard ist die zentrale Platine, an der die anderen Bauteile angeschlossen werden, und verteilt Strom an andere Platinen.", q: ["formfaktor"] }
  ];

  var SOCKEL = [
    { id: "pga", name: "PGA (Pin Grid Array)", glossar: "CPU",
      funktion: "Die Kontakte sind Stifte an der Unterseite der CPU.",
      ort: "Die CPU wird in den Sockel gesteckt. Wenn der Sockel einen Hebel hat, wird er danach geschlossen.",
      zusammen: "Der Sockel hat für jeden Stift einen Metallkontakt und ist oft so geformt, dass die CPU nur richtig herum passt.",
      merk: "PGA: Stifte an der CPU.", q: ["cpu-socket"] },
    { id: "lga", name: "LGA (Land Grid Array)", glossar: "CPU",
      funktion: "Die CPU hat flache Kontaktflächen, die Kontaktstifte sitzen im Sockel.",
      ort: "Die CPU wird in den Sockel gelegt, eine Halteplatte wird darüber geklappt und der Hebel verriegelt. Das drückt die Kontakte der CPU fest auf die Kontakte des Sockels.",
      zusammen: "Der Anpressdruck sorgt für guten Kontakt und mehr mechanische Stabilität.",
      merk: "LGA: Kontaktflächen an der CPU, Stifte im Sockel.", q: ["cpu-socket"] },
    { id: "bga", name: "BGA (Ball Grid Array)", glossar: "CPU",
      funktion: "Die Kontakte sind Lötkugeln. Das Bauteil wird fest auf die Platine gelötet.",
      ort: "Direkt auf der Platine, ohne Sockel. Notebooks nutzen häufig aufgelötete CPUs, Desktop-Boards haben meist einen Sockel.",
      zusammen: "Die CPU lässt sich nicht ohne Löten tauschen. Dafür braucht sie weniger Platz auf dem Mainboard.",
      merk: "BGA: festgelötet, kein Sockel, kein Tausch.", q: ["bga", "cpu-socket"] }
  ];

  var FORMEN = [
    { id: "atx", name: "ATX", glossar: "Mainboard",
      funktion: "Der verbreitete Standard-Formfaktor für Desktop-Mainboards.",
      ort: "Gehäuse für ATX. Größter der drei Formfaktoren hier: 12 × 9,6 Zoll.",
      zusammen: "ATX löste 1995 den älteren AT-Standard ab. Kleinere Boards wurden passend zu ATX-Befestigungspunkten entworfen.",
      merk: "ATX ist der Maßstab, an dem sich die kleineren Formen ausrichten.", q: ["formfaktor", "microatx"] },
    { id: "microatx", name: "microATX", glossar: "Mainboard",
      funktion: "Eine kleinere Variante, die bewusst zu ATX rückwärtskompatibel ist.",
      ort: "Höchstens 9,6 × 9,6 Zoll. Eingeführt im Dezember 1997. Es gibt auch kleinere Boards, die sich microATX nennen.",
      zusammen: "Die Befestigungspunkte sind auf ATX-Gehäuse abgestimmt. Das Board passt daher in viele ATX-Gehäuse.",
      merk: "microATX: kleiner als ATX, passt oft in ATX-Gehäuse.", q: ["microatx"] },
    { id: "miniitx", name: "Mini-ITX", glossar: "Mainboard",
      funktion: "Ein sehr kleiner Formfaktor für kompakte Rechner.",
      ort: "170 × 170 mm, entwickelt von VIA Technologies, 2001. Vier Befestigungslöcher passen zu vier Löchern der ATX-Boards.",
      zusammen: "Es hat nur einen Erweiterungssteckplatz. Dadurch passt es oft auch in ATX- und microATX-Gehäuse.",
      merk: "Mini-ITX: klein, ein Erweiterungsplatz.", q: ["mini-itx"] }
  ];

  var DATEN = { teile: TEILE, sockel: SOCKEL, formen: FORMEN, quellen: QUELLEN };

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

  var api = { DATEN: DATEN, naechsterIndex: naechsterIndex, finde: finde };
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

  function zeigeDetail(box, eintrag) {
    box.textContent = "";
    box.appendChild(el("h3", {}, eintrag.name));
    var dl = el("dl");
    [["Funktion", eintrag.funktion], ["Einbauort", eintrag.ort], ["Zusammenarbeit", eintrag.zusammen]].forEach(function (p) {
      dl.appendChild(el("dt", {}, p[0])); dl.appendChild(el("dd", {}, p[1]));
    });
    box.appendChild(dl);
    if (eintrag.fakt) box.appendChild(el("p", { "class": "pe-quelle" }, "Belegt: " + eintrag.fakt + " (Quelle: " + eintrag.q.map(function (q) { return QUELLEN[q].titel; }).join("; ") + ")"));
    else if (eintrag.q && eintrag.q.length) box.appendChild(el("p", { "class": "pe-quelle" }, "Quelle: " + eintrag.q.map(function (q) { return QUELLEN[q].titel; }).join("; ")));
    box.appendChild(el("p", { "class": "pe-merk" }, "Merksatz: " + eintrag.merk));
    var p = el("p"), a = el("a", { href: "../glossar.html?begriff=" + encodeURIComponent(eintrag.glossar) }, "Im Glossar: " + eintrag.glossar);
    p.appendChild(a); box.appendChild(p);
  }

  /* Eine Auswahlgruppe mit Rovingfokus: ein Tab-Stopp, Pfeiltasten wechseln, Enter/Leertaste wählt. */
  function baueGruppe(container, liste, onWahl) {
    var knoepfe = [];
    function setze(i, fokus) {
      knoepfe.forEach(function (b, j) { b.setAttribute("aria-pressed", j === i ? "true" : "false"); });
      if (fokus) knoepfe[i].focus();
      onWahl(liste[i]);
    }
    liste.forEach(function (eintrag, i) {
      var b = el("button", { type: "button", "aria-pressed": "false", tabindex: i === 0 ? "0" : "-1", "data-id": eintrag.id }, eintrag.name);
      b.addEventListener("click", function () { setze(i, false); knoepfe.forEach(function (x, j) { x.setAttribute("tabindex", j === i ? "0" : "-1"); }); });
      b.addEventListener("keydown", function (e) {
        var n = naechsterIndex(i, e.key, liste.length);
        if (n < 0) return;
        e.preventDefault();
        knoepfe.forEach(function (x, j) { x.setAttribute("tabindex", j === n ? "0" : "-1"); });
        knoepfe[n].focus();
      });
      container.appendChild(b); knoepfe.push(b);
    });
    return { waehle: function (id) { for (var i = 0; i < liste.length; i++) if (liste[i].id === id) { knoepfe.forEach(function (x, j) { x.setAttribute("tabindex", j === i ? "0" : "-1"); }); setze(i, false); return; } } };
  }

  function start() {
    var svg = document.getElementById("pe-svg"), teileBox = document.getElementById("pe-teile"), detail = document.getElementById("pe-detail");
    if (!svg || !teileBox || !detail) return;
    var gruppeTeile = baueGruppe(teileBox, TEILE, function (t) { markiere(t.id); zeigeDetail(detail, t); });
    function markiere(id) {
      Array.prototype.forEach.call(svg.querySelectorAll(".pe-teil"), function (g) { g.setAttribute("class", "pe-teil" + (g.getAttribute("data-id") === id ? " pe-aktiv" : "")); });
    }
    TEILE.forEach(function (t) {
      var r = t.layout;
      if (t.id === "board") {
        svg.appendChild(svgEl("rect", { "class": "pe-platine", x: r[0], y: r[1], width: r[2], height: r[3], rx: 12 }));
        svg.appendChild(svgEl("text", { "class": "pe-beschriftung", x: r[0] + 10, y: r[1] + r[3] - 8 }, "Mainboard"));
        return;
      }
      var g = svgEl("g", { "class": "pe-teil", "data-id": t.id });
      g.appendChild(svgEl("rect", { x: r[0], y: r[1], width: r[2], height: r[3], rx: 6 }));
      g.appendChild(svgEl("text", { x: r[0] + 8, y: r[1] + r[3] / 2 + 5 }, t.name.split(" (")[0]));
      g.addEventListener("click", function () { gruppeTeile.waehle(t.id); });
      svg.appendChild(g);
    });
    var gs = baueGruppe(document.getElementById("pe-sockel-wahl"), SOCKEL, function (s) { zeigeDetail(document.getElementById("pe-sockel-detail"), s); });
    var gf = baueGruppe(document.getElementById("pe-form-wahl"), FORMEN, function (f) { zeigeDetail(document.getElementById("pe-form-detail"), f); });
    void gs; void gf;
    detail.textContent = "Wähle ein Bauteil in der Liste oder in der Zeichnung.";
    document.getElementById("pe-sockel-detail").textContent = "Wähle eine Bauform.";
    document.getElementById("pe-form-detail").textContent = "Wähle einen Formfaktor.";
    var ul = document.getElementById("pe-quellenliste");
    Object.keys(QUELLEN).forEach(function (k) {
      var li = el("li"), q = QUELLEN[k];
      li.appendChild(el("a", { href: q.url, rel: "noopener" }, q.titel));
      li.appendChild(document.createTextNode(" · abgerufen " + q.abruf));
      ul.appendChild(li);
    });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start); else start();
})(typeof window !== "undefined" ? window : globalThis);
