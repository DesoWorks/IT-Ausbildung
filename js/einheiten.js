/* Bit-/Byte- und Einheitenrechner. Läuft offline, ohne Bibliotheken. Exakte Rechnung mit BigInt. */
(function (global) {
  "use strict";
  var MAX_DIGITS = 15;
  var DECIMALS = 6;

  /* bits = Anzahl Bit pro 1 Einheit. system: basis (Bit/Byte), dez (Faktor 1000), bin (Faktor 1024). */
  var UNITS = [
    { id: "bit", name: "Bit", system: "basis", bits: 1n },
    { id: "B", name: "Byte", system: "basis", bits: 8n },
    { id: "kbit", name: "Kilobit", system: "dez", bits: 1000n },
    { id: "Mbit", name: "Megabit", system: "dez", bits: 1000000n },
    { id: "Gbit", name: "Gigabit", system: "dez", bits: 1000000000n },
    { id: "kB", name: "Kilobyte", system: "dez", bits: 8n * 1000n },
    { id: "MB", name: "Megabyte", system: "dez", bits: 8n * 1000000n },
    { id: "GB", name: "Gigabyte", system: "dez", bits: 8n * 1000000000n },
    { id: "TB", name: "Terabyte", system: "dez", bits: 8n * 1000000000000n },
    { id: "KiB", name: "Kibibyte", system: "bin", bits: 8n * 1024n },
    { id: "MiB", name: "Mebibyte", system: "bin", bits: 8n * 1024n ** 2n },
    { id: "GiB", name: "Gibibyte", system: "bin", bits: 8n * 1024n ** 3n },
    { id: "TiB", name: "Tebibyte", system: "bin", bits: 8n * 1024n ** 4n }
  ];
  var PAIRS = { kB: "KiB", MB: "MiB", GB: "GiB", TB: "TiB" };

  function unit(id) { for (var i = 0; i < UNITS.length; i++) if (UNITS[i].id === id) return UNITS[i]; return null; }
  function group(digits) { return String(digits).replace(/\B(?=(\d{3})+(?!\d))/g, "."); }

  /* Rationale Zahl n/d als deutscher Text mit höchstens 6 Nachkommastellen. */
  function fmt(n, d) {
    var scale = 10n ** BigInt(DECIMALS);
    var scaled = (n * scale * 2n + d) / (2n * d);
    var exact = (n * scale) % d === 0n;
    if (scaled === 0n && n > 0n) return { text: "weniger als 0,000001", exact: false, tiny: true };
    var ip = scaled / scale, fp = String(scaled % scale);
    while (fp.length < DECIMALS) fp = "0" + fp;
    fp = fp.replace(/0+$/, "");
    return { text: group(ip) + (fp ? "," + fp : ""), exact: exact, tiny: false };
  }

  /* Eingabe prüfen. Dezimalzeichen Komma oder Punkt, keine Tausendertrennzeichen. */
  function parse(text) {
    var s = String(text == null ? "" : text).trim().replace(/\s+/g, "");
    if (!s) return { ok: false, error: "Bitte gib eine Zahl ein." };
    if (s.charAt(0) === "-" || s.charAt(0) === "+") return { ok: false, error: "Es sind nur Zahlen ohne Vorzeichen möglich (0 oder größer)." };
    if (!/^\d+([.,]\d+)?$/.test(s)) return { ok: false, error: "Nutze nur Ziffern und höchstens ein Komma oder einen Punkt, zum Beispiel 1,5 oder 250." };
    var parts = s.split(/[.,]/), ip = parts[0].replace(/^0+(?=\d)/, ""), fp = parts[1] || "";
    if (ip.length + fp.length > MAX_DIGITS) return { ok: false, error: "Die Zahl ist zu lang. Erlaubt sind höchstens " + MAX_DIGITS + " Ziffern." };
    return { ok: true, num: BigInt(ip + fp), den: 10n ** BigInt(fp.length), display: group(ip) + (fp ? "," + fp : "") };
  }

  function bytesText(u) { return fmt(u.bits, 8n).text; }

  function comparison(from, to) {
    /* Nur vergleichen, wenn eine dezimale (kB…TB) und eine binäre Byte-Einheit (KiB…TiB) beteiligt sind. */
    var a = [from, to], decUnit = null, binUnit = null, k;
    for (var i = 0; i < a.length; i++) {
      if (PAIRS[a[i].id]) decUnit = a[i];
      for (k in PAIRS) if (PAIRS[k] === a[i].id) binUnit = a[i];
    }
    if (!decUnit || !binUnit) return null;
    var bin = binUnit, dec = null;
    for (k in PAIRS) if (PAIRS[k] === bin.id) dec = unit(k);
    return "1 " + bin.id + " = " + fmt(bin.bits, dec.bits).text + " " + dec.id + ". " + bin.id + " ist daher um " +
      fmt((bin.bits - dec.bits) * 100n, dec.bits).text + " % größer als " + dec.id + " (" + group(bin.bits / 8n) + " B gegen " + group(dec.bits / 8n) + " B).";
  }

  function convert(text, fromId, toId) {
    var from = unit(fromId), to = unit(toId);
    if (!from || !to) return { ok: false, error: "Bitte wähle eine gültige Einheit." };
    var p = parse(text);
    if (!p.ok) return p;
    var bitsN = p.num * from.bits;
    var res = fmt(bitsN, p.den * to.bits);
    var inBits = fmt(bitsN, p.den);
    var steps = [];
    steps.push("Eingabe: " + p.display + " " + from.id + " (" + from.name + ").");
    if (from.id === to.id) {
      steps.push("Quelle und Ziel sind gleich, der Wert ändert sich nicht.");
    } else {
      steps.push("Faktor Quelle: 1 " + from.id + " = " + bytesText(from) + " B = " + group(from.bits) + " bit.");
      steps.push("In Bit: " + p.display + " × " + group(from.bits) + " = " + inBits.text + " bit.");
      steps.push("Faktor Ziel: 1 " + to.id + " = " + bytesText(to) + " B = " + group(to.bits) + " bit.");
      steps.push("Teilen: " + inBits.text + " bit ÷ " + group(to.bits) + " = " + res.text + " " + to.id + ".");
    }
    return {
      ok: true, from: from, to: to, input: p.display, result: res,
      line: p.display + " " + from.id + " " + (res.exact ? "=" : "≈") + " " + res.text + (res.tiny ? "" : " ") + (res.tiny ? " " : "") + to.id,
      steps: steps, comparison: comparison(from, to)
    };
  }

  var api = { parse: parse, convert: convert, units: UNITS, unit: unit, format: fmt };
  global.EINHEITEN = api;

  if (typeof global.document === "undefined") { if (typeof module !== "undefined" && module.exports) module.exports = api; return; }

  var doc = global.document;
  function el(id) { return doc.getElementById(id); }
  function make(tag, cls, text) { var n = doc.createElement(tag); if (cls) n.className = cls; if (text != null) n.textContent = text; return n; }

  var SYSTEMS = { basis: "Bit und Byte", dez: "Dezimal (Faktor 1000)", bin: "Binär (Faktor 1024)" };

  function fillSelect(select, selected) {
    Object.keys(SYSTEMS).forEach(function (key) {
      var g = make("optgroup"); g.label = SYSTEMS[key];
      UNITS.forEach(function (u) {
        if (u.system !== key) return;
        var o = make("option", "", u.id + " – " + u.name); o.value = u.id; if (u.id === selected) o.selected = true; g.appendChild(o);
      });
      select.appendChild(g);
    });
  }

  function clearResult() {
    var out = el("eh-ergebnis"); out.textContent = ""; out.hidden = true;
    var err = el("eh-fehler"); err.textContent = ""; err.hidden = true;
    el("eh-eingabe").removeAttribute("aria-invalid");
  }

  function show(res) {
    clearResult();
    var out = el("eh-ergebnis");
    out.appendChild(make("h3", "", "Ergebnis"));
    out.appendChild(make("p", "eh-gross", res.line));
    if (!res.result.exact) out.appendChild(make("p", "klein", "Gerundet auf höchstens " + DECIMALS + " Nachkommastellen (≈)."));
    out.appendChild(make("h3", "", "Rechenweg"));
    var ol = make("ol", "eh-weg"); res.steps.forEach(function (l) { ol.appendChild(make("li", "", l)); }); out.appendChild(ol);
    if (res.comparison) { out.appendChild(make("h3", "", "Warum GB und GiB nicht gleich sind")); out.appendChild(make("p", "", res.comparison)); }
    out.hidden = false;
  }

  function submit(event) {
    if (event) event.preventDefault();
    clearResult();
    var res = convert(el("eh-eingabe").value, el("eh-von").value, el("eh-nach").value);
    if (!res.ok) { var err = el("eh-fehler"); err.textContent = res.error; err.hidden = false; el("eh-eingabe").setAttribute("aria-invalid", "true"); return; }
    show(res);
  }

  function example() { el("eh-eingabe").value = "1"; el("eh-von").value = "TB"; el("eh-nach").value = "GiB"; submit(); }

  function renderTable() {
    var host = el("eh-tabelle"); if (!host) return;
    var t = make("table", "eh-tab");
    t.appendChild(make("caption", "", "Einheiten im Überblick"));
    var head = make("tr"); ["Einheit", "Name", "Größe in Byte", "Größe in Bit"].forEach(function (h) { var th = make("th", "", h); th.scope = "col"; head.appendChild(th); });
    var thead = make("thead"); thead.appendChild(head); t.appendChild(thead);
    var body = make("tbody");
    UNITS.forEach(function (u) {
      var r = make("tr"); var th = make("th", "", u.id); th.scope = "row"; r.appendChild(th);
      r.appendChild(make("td", "", u.name)); r.appendChild(make("td", "", bytesText(u))); r.appendChild(make("td", "", group(u.bits)));
      body.appendChild(r);
    });
    t.appendChild(body); host.appendChild(t);
  }

  function init() {
    fillSelect(el("eh-von"), "GB"); fillSelect(el("eh-nach"), "GiB");
    renderTable();
    el("eh-form").addEventListener("submit", submit);
    el("eh-eingabe").addEventListener("input", clearResult);
    el("eh-von").addEventListener("change", clearResult);
    el("eh-nach").addEventListener("change", clearResult);
    el("eh-beispiel").addEventListener("click", example);
    el("eh-leeren").addEventListener("click", function () { el("eh-eingabe").value = ""; clearResult(); el("eh-eingabe").focus(); });
  }
  if (doc.readyState === "loading") doc.addEventListener("DOMContentLoaded", init); else init();
})(typeof window !== "undefined" ? window : globalThis);
