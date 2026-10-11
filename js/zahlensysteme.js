/* Zahlensystemrechner: Binär, Dezimal, Hexadezimal. Läuft offline, ohne Bibliotheken. */
(function (global) {
  "use strict";
  var MAX = 4294967295; /* 32 Bit ohne Vorzeichen */
  var NAMES = { 2: "Binär", 10: "Dezimal", 16: "Hexadezimal" };
  var PATTERN = { 2: /^[01]+$/, 10: /^[0-9]+$/, 16: /^[0-9a-f]+$/ };
  var PREFIX = { 2: "0b", 10: "", 16: "0x" };
  var MAXLEN = { 2: 32, 10: 10, 16: 8 };

  /* Prüft eine Eingabe und liefert { ok, value } oder { ok:false, error }. */
  function parse(text, base) {
    if (!NAMES[base]) return { ok: false, error: "Unbekanntes Zahlensystem." };
    var s = String(text == null ? "" : text).trim().toLowerCase().replace(/[\s_]/g, "");
    if (!s) return { ok: false, error: "Bitte gib eine Zahl ein." };
    if (PREFIX[base] && s.indexOf(PREFIX[base]) === 0) s = s.slice(2);
    if (!s) return { ok: false, error: "Nach der Vorsilbe fehlen die Ziffern." };
    if (s.charAt(0) === "-" || s.charAt(0) === "+") return { ok: false, error: "Es sind nur ganze Zahlen ohne Vorzeichen möglich (0 bis 4.294.967.295)." };
    if (!PATTERN[base].test(s)) {
      var allowed = base === 2 ? "0 und 1" : base === 10 ? "0 bis 9" : "0 bis 9 und A bis F";
      return { ok: false, error: NAMES[base] + " erlaubt nur die Ziffern " + allowed + "." };
    }
    var sig = s.replace(/^0+/, "") || "0";
    if (sig.length > MAXLEN[base]) return { ok: false, error: "Die Zahl ist zu groß. Der Rechner unterstützt 32 Bit (0 bis 4.294.967.295)." };
    var value = parseInt(sig, base);
    if (value > MAX) return { ok: false, error: "Die Zahl ist zu groß. Der Rechner unterstützt 32 Bit (0 bis 4.294.967.295)." };
    return { ok: true, value: value };
  }

  function width(value) { var w = 8; while (value >= Math.pow(2, w)) w += 8; return w; }
  function binary(value, w) { var b = value.toString(2); while (b.length < (w || width(value))) b = "0" + b; return b; }
  function groupBinary(value) { return binary(value).replace(/(.{4})(?=.)/g, "$1 "); }
  function hex(value) { return value.toString(16).toUpperCase(); }
  function all(value) { return { dec: String(value), bin: groupBinary(value), hex: "0x" + hex(value), width: width(value) }; }

  /* Stellenwerttabelle: pro Bit Exponent, Wert und Bit, höchstes Bit zuerst. */
  function placeTable(value) {
    var w = width(value), b = binary(value, w), rows = [];
    for (var i = 0; i < w; i++) { var exp = w - 1 - i; rows.push({ exp: exp, weight: Math.pow(2, exp), bit: b.charAt(i) }); }
    return rows;
  }

  /* Rechenweg als Textzeilen. Quelle bestimmt den Weg. */
  function steps(value, base) {
    var lines = [], i, total;
    if (base === 2) {
      var b = binary(value), parts = [];
      for (i = 0; i < b.length; i++) if (b.charAt(i) === "1") { var e = b.length - 1 - i; lines.push("Stelle 2^" + e + ": 1 × " + Math.pow(2, e) + " = " + Math.pow(2, e)); parts.push(Math.pow(2, e)); }
      lines.push(parts.length ? "Summe: " + parts.join(" + ") + " = " + value : "Alle Bits sind 0, die Summe ist 0.");
    } else if (base === 16) {
      var h = hex(value); total = [];
      for (i = 0; i < h.length; i++) {
        var d = parseInt(h.charAt(i), 16), p = h.length - 1 - i, w16 = Math.pow(16, p);
        lines.push("Stelle 16^" + p + ": " + h.charAt(i) + " (= " + d + ") × " + w16 + " = " + d * w16); total.push(d * w16);
      }
      lines.push("Summe: " + total.join(" + ") + " = " + value);
    } else {
      if (value === 0) lines.push("0 : 2 = 0 Rest 0");
      var n = value, rest = [];
      while (n > 0) { var q = Math.floor(n / 2), r = n % 2; lines.push(n + " : 2 = " + q + " Rest " + r); rest.push(r); n = q; }
      lines.push("Reste von unten nach oben gelesen: " + (rest.slice().reverse().join("") || "0"));
    }
    var bin = binary(value);
    var padded = bin.padStart(Math.ceil(bin.length / 4) * 4, "0");
    var groups = padded.match(/.{4}/g) || ["0000"];
    var hexGroups = groups.map(function (group) { return parseInt(group, 2).toString(16).toUpperCase(); });
    lines.push("Hex aus Binär: " + groups.join(" ") + " → " + groups.map(function (group, index) { return group + " = " + hexGroups[index]; }).join("; ") + " → 0x" + hexGroups.join(""));
    return lines;
  }

  function bitSum(value) {
    var set = placeTable(value).filter(function (row) { return row.bit === "1"; }).map(function (row) { return row.weight; });
    return set.length ? set.join(" + ") + " = " + value : "Kein Bit gesetzt; Summe: 0";
  }

  function convert(text, base) {
    var p = parse(text, base);
    if (!p.ok) return p;
    return { ok: true, value: p.value, results: all(p.value), table: placeTable(p.value), bitSum: bitSum(p.value), steps: steps(p.value, base), base: base };
  }

  var api = { parse: parse, convert: convert, placeTable: placeTable, bitSum: bitSum, steps: steps, groupBinary: groupBinary, hex: hex, width: width, max: MAX, names: NAMES };
  global.ZAHLENSYSTEME = api;

  if (typeof global.document === "undefined") { if (typeof module !== "undefined" && module.exports) module.exports = api; return; }

  var doc = global.document;
  function el(id) { return doc.getElementById(id); }
  function make(tag, cls, text) { var n = doc.createElement(tag); if (cls) n.className = cls; if (text != null) n.textContent = text; return n; }

  function clearResult() {
    var out = el("zs-ergebnis"); out.textContent = ""; out.hidden = true;
    var err = el("zs-fehler"); err.textContent = ""; err.hidden = true;
    el("zs-eingabe").removeAttribute("aria-invalid");
  }

  function renderTable(rows) {
    var host = make("div", "zs-bytes");
    for (var s = 0; s < rows.length; s += 8) {
      var chunk = rows.slice(s, s + 8), wrap = make("div", "zs-tabelle-wrap");
      wrap.tabIndex = 0; wrap.setAttribute("role", "region"); wrap.setAttribute("aria-label", "Stellenwerte Byte " + (s / 8 + 1));
      var t = make("table", "zs-tabelle"); t.appendChild(make("caption", "", "Byte " + (s / 8 + 1) + ": Stellenwerte der Bits"));
      var head = make("tr"), potenz = make("tr"), bits = make("tr");
      head.appendChild(make("th", "", "Wert")); potenz.appendChild(make("th", "", "Potenz")); bits.appendChild(make("th", "", "Bit"));
      [head, potenz, bits].forEach(function (r) { r.firstChild.scope = "row"; });
      chunk.forEach(function (r) {
        head.appendChild(make("td", "", String(r.weight))); potenz.appendChild(make("td", "", "2^" + r.exp));
        bits.appendChild(make("td", r.bit === "1" ? "zs-bit-an" : "zs-bit-aus", r.bit));
      });
      var body = make("tbody"); body.append(head, potenz, bits); t.appendChild(body); wrap.appendChild(t); host.appendChild(wrap);
    }
    return host;
  }

  function show(res) {
    clearResult();
    var out = el("zs-ergebnis"); out.appendChild(make("h3", "", "Ergebnis"));
    var dl = make("dl", "zs-werte");
    [["Dezimal", res.results.dec], ["Binär", res.results.bin], ["Hexadezimal", res.results.hex]].forEach(function (x) { dl.appendChild(make("dt", "", x[0])); dl.appendChild(make("dd", "", x[1])); });
    out.appendChild(dl);
    out.appendChild(make("h3", "", "Stellenwerte (Binär, " + res.results.width + " Bit)"));
    out.appendChild(renderTable(res.table));
    out.appendChild(make("p", "zs-bit-summe", "Summe der gesetzten Bits: " + res.bitSum));
    out.appendChild(make("p", "klein", "0b kennzeichnet eine Binärzahl; 0x kennzeichnet eine Hexadezimalzahl."));
    out.appendChild(make("h3", "", "Rechenweg (von " + NAMES[res.base] + ")"));
    var ol = make("ol", "zs-weg"); res.steps.forEach(function (l) { ol.appendChild(make("li", "", l)); }); out.appendChild(ol);
    out.hidden = false;
  }

  function submit(event) {
    if (event) event.preventDefault();
    clearResult();
    var res = convert(el("zs-eingabe").value, Number(el("zs-system").value));
    if (!res.ok) { var err = el("zs-fehler"); err.textContent = res.error; err.hidden = false; el("zs-eingabe").setAttribute("aria-invalid", "true"); return; }
    show(res);
  }

  function example() {
    el("zs-system").value = "10"; el("zs-eingabe").value = "192"; submit();
  }

  function init() {
    el("zs-form").addEventListener("submit", submit);
    el("zs-eingabe").addEventListener("input", clearResult);
    el("zs-system").addEventListener("change", clearResult);
    el("zs-beispiel").addEventListener("click", example);
    el("zs-leeren").addEventListener("click", function () { el("zs-eingabe").value = ""; clearResult(); el("zs-eingabe").focus(); });
  }
  if (doc.readyState === "loading") doc.addEventListener("DOMContentLoaded", init); else init();
})(typeof window !== "undefined" ? window : globalThis);
