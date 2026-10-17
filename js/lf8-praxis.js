/* Isolierte Datenwerkstatt: keine echten Daten, keine Netzverbindung. */
(function (g) {
  "use strict";
  var KEY = "it-ausbildung.lf8-praxis.v1";
  var CSV = "datum,umsatz,waehrung\n2026-10-12,1234.5,EUR\n2026-10-13,0,EUR\n2026-10-14,,EUR\n2026-10-15,987.25,EUR";
  var SHIFTS = [
    { tag: "2026-10-12", schicht: "Früh", personen: 2 },
    { tag: "2026-10-12", schicht: "Spät", personen: 1 },
    { tag: "2026-10-13", schicht: "Früh", personen: 1 },
    { tag: "2026-10-14", schicht: "Früh", personen: 2 },
    { tag: "2026-10-14", schicht: "Spät", personen: 2 },
    { tag: "2026-10-15", schicht: "Spät", personen: 1 }
  ];
  function dateOK(value) {
    return typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value) &&
      Number.isFinite(Date.parse(value)) && new Date(value).toISOString().slice(0, 10) === value;
  }
  function transform(csv, json, mapping) {
    if (typeof csv !== "string" || typeof json !== "string" || csv.length > 50000 || json.length > 50000) throw Error("Nutze höchstens 50.000 Zeichen je fiktiver Quelle.");
    var lines = csv.trim().split(/\r?\n/), header = lines.shift().split(",");
    if (header.join(",") !== "datum,umsatz,waehrung") throw Error("CSV-Kopf erwartet: datum,umsatz,waehrung (Komma als Trennzeichen, Punkt als Dezimalzeichen).");
    if (!lines.length || lines.length > 100) throw Error("Die Kassenquelle braucht 1 bis 100 Datenzeilen.");
    var cash = new Map();
    lines.forEach(function (line, index) {
      var fields = line.split(",");
      if (fields.length !== 3 || !dateOK(fields[0])) throw Error("Kassenzeile " + (index + 2) + ": drei Felder und ein gültiges ISO-Datum benötigt.");
      if (cash.has(fields[0])) throw Error("Kassenquelle: Datum " + fields[0] + " ist doppelt. Erst fachlich klären, nicht still summieren.");
      if (fields[2] !== "EUR") throw Error("Kassenzeile " + (index + 2) + ": nur belegte EUR-Werte; fehlende oder andere Einheit klären.");
      if (fields[1] !== "" && (!/^\d+(\.\d{1,2})?$/.test(fields[1]) || !Number.isSafeInteger(Math.round(Number(fields[1]) * 100)))) throw Error("Umsatz: nichtnegative Zahl mit höchstens zwei Nachkommastellen; keine automatische Rundung.");
      cash.set(fields[0], fields[1] === "" ? null : Number(fields[1]));
    });
    var shifts;
    try { shifts = JSON.parse(json); } catch (_) { throw Error("Schichtquelle: ungültiges JSON. Prüfe Anführungszeichen, Kommas und eckige Klammern."); }
    if (!Array.isArray(shifts) || !shifts.length || shifts.length > 100) throw Error("Schichtquelle: Liste mit 1 bis 100 Zeilen benötigt.");
    if (mapping !== "tag") throw Error("Feldmapping prüfen: Das Datum heißt in der Schichtquelle tag, nicht schicht oder personen.");
    var grouped = new Map(), seen = new Set();
    shifts.forEach(function (row, index) {
      if (!row || !dateOK(row.tag) || typeof row.schicht !== "string" || !/^[\p{L}][\p{L} -]{0,39}$/u.test(row.schicht) || !Number.isInteger(row.personen) || row.personen < 0 || row.personen > 100) throw Error("Schichtzeile " + (index + 1) + ": gültiges tag-Datum, Schichtname und ganze Personenzahl 0–100 benötigt.");
      var identity = row.tag + "/" + row.schicht;
      if (seen.has(identity)) throw Error("Doppelte Schicht " + identity + ": vor Bereitstellung klären.");
      seen.add(identity);
      if (!grouped.has(row.tag)) grouped.set(row.tag, []);
      grouped.get(row.tag).push({ schicht: row.schicht, personen: row.personen });
    });
    return Array.from(new Set(Array.from(cash.keys()).concat(Array.from(grouped.keys())))).sort().map(function (date) {
      return { datum: date, umsatz: cash.has(date) ? cash.get(date) : null, waehrung: "EUR", status: !cash.has(date) || cash.get(date) === null ? "fehlend" : "belegt", schichten: grouped.get(date) || [], schichtstatus: grouped.has(date) ? "belegt" : "fehlend" };
    });
  }
  function csvOutput(rows) {
    function quote(v) { return '"' + String(v).replace(/"/g, '""') + '"'; }
    return "datum,umsatz,waehrung,status,schichten,schichtstatus\r\n" + rows.map(function (r) {
      return [r.datum, r.umsatz === null ? "" : r.umsatz.toFixed(2), r.waehrung, r.status, r.schichten.map(function (s) { return s.schicht + ": " + s.personen; }).join(" | "), r.schichtstatus].map(quote).join(",");
    }).join("\r\n");
  }
  var api = { KEY: KEY, CSV: CSV, SHIFTS: SHIFTS, transform: transform, csvOutput: csvOutput };
  g.LF8_PRAXIS = api;
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  if (!g.document || !g.document.getElementById("lf8-praxis")) return;
  var d = g.document, $ = function (id) { return d.getElementById(id); }, rows = null, downloadURL = null;
  var csv = $("praxis-kasse"), json = $("praxis-schichten"), mapping = $("praxis-mapping"), note = $("praxis-notiz"), status = $("praxis-status");
  csv.value = CSV; json.value = JSON.stringify(SHIFTS, null, 2);
  function save() {
    try { g.localStorage.setItem(KEY, JSON.stringify({ csv: csv.value, json: json.value, mapping: mapping.value, note: note.value })); $("praxis-speicher").textContent = "Eingaben lokal gespeichert. Ergebnisse nach Neuladen neu erzeugen."; }
    catch (_) { $("praxis-speicher").textContent = "Speicherung nicht möglich. Kopiere Eingaben und Ergebnis vor dem Verlassen."; }
  }
  function invalidate() {
    rows = null; $("praxis-ergebnis").hidden = true; $("praxis-ausgabe").value = "";
    $("praxis-download").hidden = true;
    if (downloadURL) { g.URL.revokeObjectURL(downloadURL); downloadURL = null; }
    status.textContent = "Eingaben geändert. Ergebnis neu erzeugen; das vorige Ergebnis gilt nicht mehr.";
    save();
  }
  try {
    var raw = JSON.parse(g.localStorage.getItem(KEY) || "null");
    if (raw && typeof raw.csv === "string" && typeof raw.json === "string" && raw.csv.length <= 50000 && raw.json.length <= 50000) {
      csv.value = raw.csv; json.value = raw.json;
      mapping.value = ["tag", "schicht", "personen"].indexOf(raw.mapping) >= 0 ? raw.mapping : "tag";
      note.value = typeof raw.note === "string" ? raw.note.slice(0, 5000) : "";
      status.textContent = "Gespeicherte Eingaben wiederhergestellt. Bitte Ergebnis neu erzeugen.";
    }
  } catch (_) { $("praxis-speicher").textContent = "Gespeicherte Eingaben nicht lesbar. Die Beispieldaten bleiben nutzbar."; }
  [csv, json, mapping].forEach(function (el) { el.addEventListener("input", invalidate); el.addEventListener("change", invalidate); });
  note.addEventListener("input", save);
  $("praxis-beispiel").addEventListener("click", function () { csv.value = CSV; json.value = JSON.stringify(SHIFTS, null, 2); mapping.value = "tag"; invalidate(); });
  $("praxis-erzeugen").addEventListener("click", function () {
    invalidate();
    try {
      rows = transform(csv.value, json.value, mapping.value);
      var tbody = $("praxis-zeilen"); tbody.textContent = "";
      rows.forEach(function (r) {
        var tr = d.createElement("tr");
        [r.datum, r.umsatz === null ? "fehlend" : r.umsatz.toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " EUR", r.schichten.map(function (s) { return s.schicht + ": " + s.personen + " Personen"; }).join("; ") || "Schichtangaben fehlen"].forEach(function (value, index) {
          var td = d.createElement("td"); td.dataset.label = ["Datum", "Tagesumsatz", "Schichten"][index]; td.textContent = value; tr.appendChild(td);
        }); tbody.appendChild(tr);
      });
      var output = csvOutput(rows); $("praxis-ausgabe").value = output; $("praxis-ergebnis").hidden = false;
      downloadURL = g.URL.createObjectURL(new Blob([output], { type: "text/csv;charset=utf-8" }));
      $("praxis-download").href = downloadURL; $("praxis-download").hidden = false;
      status.textContent = rows.length + " Tage bereitgestellt. Prüfe Null/fehlend, sämtliche Schichten und die Übergabe. Das ist kein automatischer Kompetenznachweis.";
    } catch (error) { status.textContent = "Nicht bereitgestellt: " + error.message; }
  });
  $("praxis-kopieren").addEventListener("click", function () {
    if (!rows) return;
    $("praxis-ausgabe").focus(); $("praxis-ausgabe").select();
    status.textContent = "CSV markiert. Mit Strg+C bzw. der Kopierfunktion deines Geräts übernehmen.";
  });
})(typeof window !== "undefined" ? window : globalThis);
