/* Reines Browsermodell: sendet keine Pakete und konfiguriert kein echtes Gerät. */
(function (g) {
  "use strict";
  var KEY = "it-ausbildung.lf9-praxis.v1";
  var DEFAULT = { guest: "192.0.2", cash: "198.51.100", gateway: "192.0.2.1", start: "20", end: "29", dhcp: true, block: true };
  function prefixOK(value) { return typeof value === "string" && /^\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(value) && value.split(".").every(function (part) { return Number(part) <= 255 && String(Number(part)) === part; }); }
  function configure(raw) {
    if (!raw || !prefixOK(raw.guest) || !prefixOK(raw.cash)) throw Error("Netzpräfix als drei IPv4-Oktette eingeben, z. B. 192.0.2. Das Modell verwendet ausschließlich /24-Netze.");
    if (!/^\d+$/.test(String(raw.start)) || !/^\d+$/.test(String(raw.end))) throw Error("Poolgrenzen müssen ganze Oktettwerte sein.");
    var start = Number(raw.start), end = Number(raw.end);
    if (start < 1 || end > 254 || start > end) throw Error("Pool: Start bis Ende innerhalb 1–254, Start nicht größer als Ende.");
    if (raw.gateway !== raw.guest + ".1") throw Error("Modellgateway muss die .1 im Gästenetz sein (" + raw.guest + ".1). Kein Netz-/Broadcastwert.");
    if (start <= 1 && end >= 1) throw Error("Gateway .1 darf nicht im Vergabepool liegen.");
    return { guest: raw.guest, cash: raw.cash, gateway: raw.gateway, start: start, end: end, dhcp: raw.dhcp === true, block: raw.block === true };
  }
  function simulate(config, count) {
    if (!Number.isInteger(count) || count < 1 || count > 50) throw Error("Modelltest: 1 bis 50 Endgeräte wählen.");
    var c = configure(config), available = c.end - c.start + 1;
    var separated = c.guest !== c.cash, isolated = separated && c.block;
    var clients = Array.from({ length: count }, function (_, index) {
      var assigned = c.dhcp && index < available;
      return { geraet: index + 1, adresse: assigned ? c.guest + "." + (c.start + index) : "keine Lease", dhcp: assigned, gateway: assigned, kasseErreichbar: assigned ? !isolated : null };
    });
    var leases = clients.filter(function (r) { return r.dhcp; }).length;
    var pass = leases === count && isolated;
    return { count: count, clients: clients, leases: leases, available: available, separated: separated, isolated: isolated, pass: pass,
      summary: "MODELLTEST, keine echte Messung: " + leases + "/" + count + " Leases; Pool " + available + " Adressen; Netze " + (separated ? "getrennt" : "gleich") + "; Regel Gast→Kasse " + (c.block ? "sperren" : "erlauben") + ". " + (pass ? "Modellkriterien erfüllt." : "Modellkriterien nicht erfüllt.") + (count < 10 ? " Unter zehn Geräten ist die vereinbarte Mindestkapazität noch nicht geprüft." : "") };
  }
  function cost(watts, price, years, rate) {
    if (![watts, price, years, rate].every(function (v) { return typeof v === "number" && Number.isFinite(v) && v >= 0; }) || years < 1 || years > 10 || rate > 2) throw Error("Kostenmodell: gültige nichtnegative Werte; Nutzungsdauer 1–10 Jahre, Strompreis 0–2 EUR/kWh.");
    var kwh = watts / 1000 * 24 * 365 * years;
    return { kwh: kwh, total: price + kwh * rate };
  }
  var api = { KEY: KEY, DEFAULT: DEFAULT, configure: configure, simulate: simulate, cost: cost };
  g.LF9_PRAXIS = api;
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  if (!g.document || !g.document.getElementById("lf9-praxis")) return;
  var d = g.document, $ = function (id) { return d.getElementById(id); }, applied = null;
  var ids = ["guest", "cash", "gateway", "start", "end", "dhcp", "block"];
  function read() {
    var raw = {}; ids.forEach(function (id) { var el = $("netz-" + id); raw[id] = el.type === "checkbox" ? el.checked : el.value; }); return raw;
  }
  function fill(raw) { ids.forEach(function (id) { var el = $("netz-" + id); if (el.type === "checkbox") el.checked = raw[id] === true; else el.value = typeof raw[id] === "string" || typeof raw[id] === "number" ? raw[id] : DEFAULT[id]; }); }
  function save() {
    try { g.localStorage.setItem(KEY, JSON.stringify({ config: read(), note: $("netz-notiz").value, count: $("netz-count").value, rate: $("netz-rate").value, years: $("netz-years").value })); $("netz-speicher").textContent = "Eingaben gespeichert. Nach Neuladen Konfiguration erneut anwenden und testen."; }
    catch (_) { $("netz-speicher").textContent = "Speicherung nicht möglich. Konfiguration und Protokoll selbst kopieren."; }
  }
  function hideResults() { $("netz-ergebnis").hidden = true; $("netz-protokoll").value = ""; }
  function dirty() { applied = null; hideResults(); $("netz-status").textContent = "Konfiguration geändert. Erneut anwenden und Modelltests starten."; save(); }
  fill(DEFAULT);
  try {
    var old = JSON.parse(g.localStorage.getItem(KEY) || "null");
    if (old && old.config) {
      fill(old.config); $("netz-notiz").value = typeof old.note === "string" ? old.note.slice(0, 5000) : "";
      if (/^\d{1,2}$/.test(old.count)) $("netz-count").value = old.count;
      if (Number.isFinite(Number(old.rate))) $("netz-rate").value = old.rate;
      if (Number.isFinite(Number(old.years))) $("netz-years").value = old.years;
      $("netz-status").textContent = "Gespeicherte Eingaben geladen. Konfiguration neu anwenden; alte Ergebnisse werden nicht als aktuell ausgegeben.";
    }
  } catch (_) { $("netz-speicher").textContent = "Gespeicherte Eingaben nicht lesbar. Beispielkonfiguration geladen."; }
  ids.forEach(function (id) { $("netz-" + id).addEventListener("input", dirty); $("netz-" + id).addEventListener("change", dirty); });
  $("netz-notiz").addEventListener("input", save);
  $("netz-count").addEventListener("input", function () { hideResults(); $("netz-status").textContent = "Gerätezahl geändert. Modelltest erneut starten."; save(); });
  $("netz-beispiel").addEventListener("click", function () { fill(DEFAULT); dirty(); });
  $("netz-anwenden").addEventListener("click", function () {
    hideResults(); applied = null;
    try { applied = configure(read()); $("netz-status").textContent = "Modellkonfiguration angewendet, noch nicht geprüft. Jetzt Modelltests starten."; }
    catch (error) { $("netz-status").textContent = "Nicht angewendet: " + error.message; }
    save();
  });
  $("netz-testen").addEventListener("click", function () {
    hideResults();
    if (!applied) { $("netz-status").textContent = "Zuerst die aktuelle Konfiguration anwenden."; return; }
    try {
      var result = simulate(applied, Number($("netz-count").value)), host = $("netz-zeilen"); host.textContent = "";
      result.clients.forEach(function (r) {
        var tr = d.createElement("tr");
        [String(r.geraet), r.adresse, r.gateway ? "erreichbar (Modell)" : "nicht prüfbar ohne Lease", r.kasseErreichbar === null ? "nicht prüfbar ohne Lease" : r.kasseErreichbar ? "ERREICHBAR: Schutzfehler" : "gesperrt (Modell)"].forEach(function (value, index) {
          var td = d.createElement("td"); td.dataset.label = ["Gerät", "DHCP-Adresse", "Gateway", "Kasse"][index]; td.textContent = value; tr.appendChild(td);
        }); host.appendChild(tr);
      });
      $("netz-status").textContent = result.summary;
      $("netz-protokoll").value = result.summary + "\nKonfiguration:\n" + JSON.stringify(applied, null, 2) + "\nErgebnistabelle:\n" + JSON.stringify(result.clients, null, 2) + "\nGrenzen: /24, vereinfachte DHCP-Vergabe, kein echter DHCP-Paketaustausch, kein DNS/Internet/WLAN-/Durchsatztest. Ein fehlendes Lease beweist keine Sperre zur Kasse.\n";
      $("netz-ergebnis").hidden = false; save();
    } catch (error) { $("netz-status").textContent = error.message; }
  });
  $("netz-kopieren").addEventListener("click", function () { $("netz-protokoll").focus(); $("netz-protokoll").select(); $("netz-status").textContent = "Modellprotokoll markiert. Mit Strg+C bzw. der Kopierfunktion übernehmen."; });
  function costs() {
    try {
      var rate = Number($("netz-rate").value), years = Number($("netz-years").value);
      if (!$("netz-rate").value || !$("netz-years").value) throw Error("Strompreis und Nutzungsdauer ausfüllen.");
      var a = cost(8, 180, years, rate), b = cost(20, 120, years, rate);
      $("netz-kosten").textContent = "Fiktives Modell bei Dauerbetrieb: A " + a.kwh.toFixed(2) + " kWh, " + a.total.toFixed(2) + " EUR; B " + b.kwh.toFixed(2) + " kWh, " + b.total.toFixed(2) + " EUR (Kauf + Strom). Wartungszeit, Ersatzteile und Entsorgung sind nicht bepreist. Technisch unzulässige Variante B bleibt unabhängig vom Preis ausgeschlossen.";
    } catch (error) { $("netz-kosten").textContent = "Keine Rechnung: " + error.message; }
  }
  ["netz-rate", "netz-years"].forEach(function (id) { $(id).addEventListener("input", function () { $("netz-kosten").textContent = "Werte geändert. Vergleich neu berechnen."; save(); }); });
  $("netz-rechnen").addEventListener("click", costs);
})(typeof window !== "undefined" ? window : globalThis);
