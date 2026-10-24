/* BWL-Werkstatt. Eigenständiger Rechenkern.
   Beträge intern in ganzen Cent. Keine externen Dienste.
   Rundung: kaufmännisch auf volle Cent, gleiche ganzzahlige Regel wie
   js/lf2-angebot.js percent(). Diese Datei wird hier nicht importiert
   und nicht verändert. Die Regel steht bewusst noch einmal hier, damit
   die Werkstatt ohne die LF2-Lektion läuft.

   Regel für ganze Prozentsätze: percent(cents, rate) = floor((cents * rate + 50) / 100).
   Ein Satz mit Nachkommastellen wird intern in Hundertstel Prozent geführt
   (7,50 % = 750). Dann gilt floor((cents * hundertstel + 5000) / 10000).
   Bei genau einem halben Cent wird aufgerundet. Keine zweite Rundung im Prozentweg.
   Eine Menge mit Nachkommastellen wird in Tausendsteln geführt. Die Positionssumme
   einer Zeile wird einmal auf volle Cent gerundet, danach nicht erneut.
   fmt schreibt den Cent-Betrag als deutsche Euro-Schreibweise.
   Die Seite bietet genau sechs Angebotspositionen. */
(function (g) {
  "use strict";

  var ID = "bwl-werkstatt";
  var MAX_CENTS = 100000000000;
  var MAX_QTY_MILLI = 1000000000;
  var MAX_RATE = 10000;

  function percentFein(cents, hundertstel) {
    return Math.floor((cents * hundertstel + 5000) / 10000);
  }

  function percent(cents, rate) {
    return Math.floor((cents * rate + 50) / 100);
  }

  function fmt(cents) {
    var sign = cents < 0 ? "-" : "";
    var n = Math.abs(cents);
    var e = Math.floor(n / 100);
    var c = n % 100;
    return sign + String(e).replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "," + (c < 10 ? "0" : "") + c;
  }

  function money(text) {
    var raw = String(text == null ? "" : text).trim().replace(/\s/g, "");
    if (raw.indexOf(".") >= 0 && raw.indexOf(",") < 0) {
      return { ok: false, error: "Verwende das Komma als Dezimalzeichen, zum Beispiel 12,50. Der Punkt ist nur das Tausenderzeichen." };
    }
    raw = raw.replace(/\./g, "").replace(",", ".");
    if (!/^\d+(\.\d{1,2})?$/.test(raw)) {
      return { ok: false, error: "Gib einen Geldbetrag mit höchstens zwei Nachkommastellen ein, zum Beispiel 12,50." };
    }
    var parts = raw.split(".");
    var cents = Number(parts[0]) * 100 + (parts[1] ? Number((parts[1] + "00").slice(0, 2)) : 0);
    if (!Number.isSafeInteger(cents) || cents > MAX_CENTS) {
      return { ok: false, error: "Der Betrag ist zu groß. Höchstens 1.000.000.000,00 Euro." };
    }
    return { ok: true, cents: cents };
  }

  function qty(text) {
    var raw = String(text == null ? "" : text).trim().replace(/\s/g, "").replace(",", ".");
    if (!/^\d+(\.\d{1,3})?$/.test(raw)) {
      return { ok: false, error: "Gib eine Menge als Zahl ein, zum Beispiel 3 oder 1,5." };
    }
    var parts = raw.split(".");
    var milli = Number(parts[0]) * 1000 + (parts[1] ? Number((parts[1] + "000").slice(0, 3)) : 0);
    if (!Number.isSafeInteger(milli) || milli > MAX_QTY_MILLI) {
      return { ok: false, error: "Die Menge darf höchstens 1.000.000 sein." };
    }
    return { ok: true, milli: milli };
  }

  function rate(text) {
    var raw = String(text == null ? "" : text).trim().replace(/\s/g, "").replace("%", "").replace(",", ".");
    if (raw === "") return { ok: false, error: "Gib einen Prozentsatz ein, zum Beispiel 7 oder 19,00." };
    if (!/^\d+(\.\d{1,2})?$/.test(raw)) {
      return { ok: false, error: "Ein Prozentsatz hat höchstens zwei Nachkommastellen, zum Beispiel 7,50." };
    }
    var parts = raw.split(".");
    var hundertstel = Number(parts[0]) * 100 + (parts[1] ? Number((parts[1] + "00").slice(0, 2)) : 0);
    if (hundertstel > MAX_RATE) return { ok: false, error: "Der Prozentsatz darf nicht über 100,00 liegen." };
    return { ok: true, hundertstel: hundertstel, label: fmt(hundertstel) };
  }

  function fmtQty(milli) {
    var ganz = Math.floor(milli / 1000);
    var rest = milli % 1000;
    if (!rest) return String(ganz);
    return ganz + "," + String(rest).padStart(3, "0").replace(/0+$/, "");
  }

  function line(item) {
    var q = qty(item.menge);
    if (!q.ok) return q;
    var u = money(item.einzelpreis);
    if (!u.ok) return u;
    var total = Math.round(q.milli * u.cents / 1000);
    if (!Number.isSafeInteger(total) || total > MAX_CENTS) return { ok: false, error: "Eine Position wird zu groß." };
    return { ok: true, cents: total, menge: q.milli, einzel: u.cents };
  }

  function angebot(input) {
    input = input || {};
    var positionen = (Array.isArray(input.positionen) ? input.positionen : []).filter(function (item) {
      var menge = String(item && item.menge != null ? item.menge : "").trim();
      var preis = String(item && item.einzelpreis != null ? item.einzelpreis : "").trim();
      return menge !== "" || preis !== "";
    });
    if (!positionen.length) return { ok: false, error: "Mindestens eine Position fehlt. Ungenutzte Zeilen bleiben leer." };
    var steps = [];
    var zeilen = [];
    var summe = 0;
    for (var i = 0; i < positionen.length; i++) {
      var p = line(positionen[i]);
      if (!p.ok) return p;
      summe += p.cents;
      zeilen.push({
        name: String(positionen[i] && positionen[i].name != null ? positionen[i].name : "").trim().slice(0, 80),
        menge: fmtQty(p.menge), einzelpreis: fmt(p.einzel), betrag: fmt(p.cents), cents: p.cents
      });
      steps.push("Position " + (i + 1) + ": Menge " + fmtQty(p.menge) + " × " + fmt(p.einzel) + " Euro = " + fmt(p.cents) + " Euro.");
    }
    if (summe > MAX_CENTS) return { ok: false, error: "Die Positionssumme ist zu groß." };
    steps.push("Positionssumme: " + fmt(summe) + " Euro.");
    var hk = rate(input.handlungskostenSatz);
    if (!hk.ok) return { ok: false, error: "Handlungskostenzuschlag: " + hk.error };
    var hkCents = percentFein(summe, hk.hundertstel);
    var selbst = summe + hkCents;
    steps.push("Handlungskostenzuschlag " + hk.label + " % auf die Positionssumme: " + fmt(hkCents) + " Euro.");
    steps.push("Selbstkosten = Positionssumme + Handlungskostenzuschlag = " + fmt(selbst) + " Euro.");
    var gw = rate(input.gewinnSatz);
    if (!gw.ok) return { ok: false, error: "Gewinnzuschlag: " + gw.error };
    var gwCents = percentFein(selbst, gw.hundertstel);
    var netto = selbst + gwCents;
    steps.push("Gewinnzuschlag " + gw.label + " % auf die Selbstkosten: " + fmt(gwCents) + " Euro.");
    steps.push("Nettoangebotspreis = Selbstkosten + Gewinnzuschlag = " + fmt(netto) + " Euro.");
    return { ok: true, positionssumme: summe, handlungskosten: hkCents, selbstkosten: selbst, gewinn: gwCents, netto: netto, steps: steps, zeilen: zeilen };
  }

  function gewinn(input) {
    input = input || {};
    var weg = input.weg === "differenz" ? "differenz" : "zuschlag";
    if (weg === "differenz") {
      var erloes = money(input.erloes);
      if (!erloes.ok) return { ok: false, error: "Erlös: " + erloes.error };
      var kosten = money(input.kosten);
      if (!kosten.ok) return { ok: false, error: "Kosten: " + kosten.error };
      var diff = erloes.cents - kosten.cents;
      return {
        ok: true, weg: weg, erloes: erloes.cents, kosten: kosten.cents, gewinn: diff,
        steps: [
          "Weg: Gewinn als Differenz. Dieser Weg verwendet keinen Zuschlagssatz.",
          "Gewinn = Erlös − Kosten = " + fmt(erloes.cents) + " − " + fmt(kosten.cents) + " = " + fmt(diff) + " Euro."
        ]
      };
    }
    var basis = money(input.basis);
    if (!basis.ok) return { ok: false, error: "Basis: " + basis.error };
    var satz = rate(input.satz);
    if (!satz.ok) return { ok: false, error: "Gewinnzuschlag: " + satz.error };
    var betrag = percentFein(basis.cents, satz.hundertstel);
    return {
      ok: true, weg: weg, basis: basis.cents, satz: satz.hundertstel, gewinn: betrag,
      steps: [
        "Weg: Gewinn als Zuschlag. Die Basis ist der eingegebene Betrag.",
        "Gewinnzuschlag " + satz.label + " % von " + fmt(basis.cents) + " Euro = " + fmt(betrag) + " Euro."
      ]
    };
  }

  function rabatt(input) {
    input = input || {};
    var basis = money(input.basis);
    if (!basis.ok) return { ok: false, error: "Basis: " + basis.error };
    var art = input.art === "betrag" ? "betrag" : "prozent";
    var abzug;
    var satzText;
    if (art === "betrag") {
      var betrag = money(input.betrag);
      if (!betrag.ok) return { ok: false, error: "Rabattbetrag: " + betrag.error };
      if (betrag.cents > basis.cents) return { ok: false, error: "Der Rabattbetrag darf nicht größer sein als die Basis." };
      abzug = betrag.cents;
      satzText = "Rabatt als Betrag: " + fmt(abzug) + " Euro.";
    } else {
      var satz = rate(input.satz);
      if (!satz.ok) return { ok: false, error: "Rabattsatz: " + satz.error };
      abzug = percentFein(basis.cents, satz.hundertstel);
      satzText = "Rabatt " + satz.label + " % von " + fmt(basis.cents) + " Euro = " + fmt(abzug) + " Euro.";
    }
    return {
      ok: true, art: art, basis: basis.cents, rabatt: abzug, ergebnis: basis.cents - abzug,
      steps: [
        "Basis des Rabatts: " + fmt(basis.cents) + " Euro. Der Rabatt wird nicht mit einem Zuschlag verrechnet.",
        satzText,
        "Betrag nach Rabatt = Basis − Rabatt = " + fmt(basis.cents - abzug) + " Euro."
      ]
    };
  }

  function steuer(input) {
    input = input || {};
    var betrag = money(input.betrag);
    if (!betrag.ok) return { ok: false, error: "Betrag: " + betrag.error };
    var satz = rate(input.satz);
    if (!satz.ok) return { ok: false, error: "Steuersatz: " + satz.error };
    var richtung = input.richtung === "brutto-zu-netto" ? "brutto-zu-netto" : "netto-zu-brutto";
    if (richtung === "netto-zu-brutto") {
      var steuerCents = percentFein(betrag.cents, satz.hundertstel);
      return {
        ok: true, richtung: richtung, netto: betrag.cents, steuer: steuerCents, brutto: betrag.cents + steuerCents, satz: satz.hundertstel,
        steps: [
          "Richtung: von Netto nach Brutto. Der Steuersatz ist eine Eingabe, kein fest eingebauter Satz.",
          "Steuerbetrag = " + fmt(betrag.cents) + " Euro × " + satz.label + " % = " + fmt(steuerCents) + " Euro.",
          "Brutto = Netto + Steuerbetrag = " + fmt(betrag.cents + steuerCents) + " Euro."
        ]
      };
    }
    var teiler = 10000 + satz.hundertstel;
    var netto = Math.floor((betrag.cents * 10000 + Math.floor(teiler / 2)) / teiler);
    return {
      ok: true, richtung: richtung, brutto: betrag.cents, steuer: betrag.cents - netto, netto: netto, satz: satz.hundertstel,
      steps: [
        "Richtung: von Brutto nach Netto. Netto = Brutto × 100 ÷ (100 + Satz), kaufmännisch auf volle Cent.",
        "Netto = " + fmt(netto) + " Euro. Steuerbetrag = " + fmt(betrag.cents - netto) + " Euro. Brutto bleibt " + fmt(betrag.cents) + " Euro."
      ]
    };
  }

  function lf2Referenz() {
    return angebot({
      positionen: [
        { menge: "3", einzelpreis: "640,00" },
        { menge: "3", einzelpreis: "150,00" },
        { menge: "3", einzelpreis: "30,00" },
        { menge: "3", einzelpreis: "40,00" },
        { menge: "1", einzelpreis: "0,00" },
        { menge: "3", einzelpreis: "90,00" }
      ],
      handlungskostenSatz: "7",
      gewinnSatz: "5"
    });
  }

  /* Angebotspositionen der Oberfläche: Anzahl und Entfernen. Keine Rechenlogik. */
  var MAX_POSITIONEN = 6;

  function positionenHinzufuegen(anzahl) {
    var n = Math.floor(Number(anzahl));
    if (!(n >= 1)) return 1;
    return Math.min(n + 1, MAX_POSITIONEN);
  }

  function positionenEntfernen(zeilen, index) {
    var liste = Array.isArray(zeilen) ? zeilen.slice(0, MAX_POSITIONEN) : [];
    if (!Number.isInteger(index) || index < 1 || index >= liste.length) return liste;
    liste.splice(index, 1);
    return liste;
  }

  /* Lernmodus: Aufgabendaten (fachlich NICHT freigegeben, Entwürfe von C-3PO).
     Alle Sollwerte kommen aus angebot() und rabatt(). Hier steht keine eigene Formel. */
  var LERN_AUFGABEN = [
    {
      art: "angebot", titel: "Aufgabe 1: Drei Arbeitsplätze für eine Praxis",
      situation: [
        "Nordlicht IT-Service erstellt ein Angebot für die Praxis am Park. Beide Namen sind erfunden.",
        "Die Praxis braucht drei gleiche Arbeitsplätze. Die Tabelle zeigt, wie oft jede Position gebraucht wird. Der Versand kostet einmalig 0,00 €.",
        "Die Handlungskosten betragen 7 Prozent der Positionssumme. Der Gewinn beträgt 5 Prozent der Selbstkosten."
      ],
      frage: "Wie hoch ist der Nettoangebotspreis? Du rechnest ihn in drei Schritten aus.",
      positionen: [
        { name: "Rechner", menge: "3", einzelpreis: "640,00" },
        { name: "Bildschirm", menge: "3", einzelpreis: "150,00" },
        { name: "Blickschutzfilter", menge: "3", einzelpreis: "30,00" },
        { name: "Tastatur und Maus", menge: "3", einzelpreis: "40,00" },
        { name: "Einrichtung vor Ort", menge: "3", einzelpreis: "90,00" },
        { name: "Versand", menge: "1", einzelpreis: "0,00" }
      ],
      hk: "7", gw: "5",
      tipp0: "Prüfe zuerst die Menge. Jede der fünf Positionen wird dreimal gebraucht. Der Versand kommt nur einmal dazu."
    },
    {
      art: "angebot", titel: "Aufgabe 2: Wartungspaket für einen kleinen Betrieb",
      situation: [
        "Pixelhilfe IT bietet einem kleinen Betrieb ein Wartungspaket an. Der Name ist erfunden.",
        "Das Paket enthält vier Stunden Einrichtung und zwei Netzwerkadapter. Der Versand kostet einmalig 12,00 €.",
        "Die Handlungskosten betragen 6 Prozent der Positionssumme. Der Gewinn beträgt 8 Prozent der Selbstkosten."
      ],
      frage: "Wie hoch ist der Nettoangebotspreis? Du rechnest ihn in drei Schritten aus.",
      positionen: [
        { name: "Einrichtung (Stunden)", menge: "4", einzelpreis: "55,00" },
        { name: "Netzwerkadapter", menge: "2", einzelpreis: "18,50" },
        { name: "Versand", menge: "1", einzelpreis: "12,00" }
      ],
      hk: "6", gw: "8",
      tipp0: "Berechne jede Position einzeln: Menge mal Einzelpreis. Der Versand kommt nur einmal dazu."
    },
    {
      art: "rabatt", titel: "Aufgabe 3: Mengenrabatt auf Zubehör",
      situation: [
        "Ein IT-Dienstleister bestellt fünf Dockingstationen für einen Kunden.",
        "Der Lieferant gibt in dieser Übung 10 Prozent Rabatt auf den Warenwert. Versand wird nicht berechnet."
      ],
      frage: "Wie viel kostet die Ware nach dem Rabatt? Du rechnest es in drei Schritten aus.",
      positionen: [{ name: "Dockingstation", menge: "5", einzelpreis: "84,00" }],
      satz: "10"
    }
  ];

  function lernLoesung(i) {
    var a = LERN_AUFGABEN[i];
    var w, r;
    if (a.art === "rabatt") {
      w = angebot({ positionen: a.positionen, handlungskostenSatz: "0", gewinnSatz: "0" });
      r = rabatt({ basis: fmt(w.positionssumme), art: "prozent", satz: a.satz });
      return {
        aufgabe: a,
        phasen: [
          { titel: "Warenwert berechnen", anweisung: "Rechne Menge mal Einzelpreis. Das ist der Warenwert vor dem Rabatt.",
            tipp: "Berechne zuerst Menge mal Einzelpreis. Das ergibt den Warenwert.",
            felder: [{ key: "warenwert", label: "Warenwert vor Rabatt in Euro", cents: w.positionssumme }], weg: w.steps.slice(0, 1) },
          { titel: "Rabatt berechnen", anweisung: "Berechne " + a.satz + " Prozent vom Warenwert. Das ist der Rabatt.",
            tipp: "Der Rabatt sind " + a.satz + " von 100 Teilen des Warenwerts. Runde auf volle Cent.",
            felder: [{ key: "rabatt", label: "Rabatt in Euro", cents: r.rabatt }], weg: r.steps.slice(1, 2) },
          { titel: "Betrag nach Rabatt", anweisung: "Ziehe den Rabatt vom Warenwert ab.",
            tipp: "Ziehe den Rabattbetrag vom Warenwert ab. Warenwert minus Rabatt.",
            felder: [{ key: "ergebnis", label: "Betrag nach dem Rabatt in Euro", cents: r.ergebnis }], weg: r.steps.slice(2) }
        ]
      };
    }
    w = angebot({ positionen: a.positionen, handlungskostenSatz: a.hk, gewinnSatz: a.gw });
    var n = w.zeilen.length;
    return {
      aufgabe: a,
      phasen: [
        { titel: "Positionen übertragen", anweisung: "Rechne bei jeder Position Menge mal Einzelpreis. Trage jeden Positionsbetrag ein. Trage danach die Positionssumme ein.",
          tipp: a.tipp0,
          felder: w.zeilen.map(function (z, k) { return { key: "pos" + k, label: "Positionsbetrag " + (z.name || ("Position " + (k + 1))) + " in Euro", cents: z.cents }; })
            .concat([{ key: "positionssumme", label: "Positionssumme in Euro", cents: w.positionssumme }]),
          weg: w.steps.slice(0, n + 1) },
        { titel: "Handlungskosten und Selbstkosten", anweisung: "Berechne die Handlungskosten: " + a.hk + " Prozent der Positionssumme. Berechne danach die Selbstkosten.",
          tipp: "Die Handlungskosten sind " + a.hk + " Prozent der Positionssumme. Die Selbstkosten sind Positionssumme plus Handlungskosten.",
          felder: [{ key: "handlungskosten", label: "Handlungskosten in Euro", cents: w.handlungskosten }, { key: "selbstkosten", label: "Selbstkosten in Euro", cents: w.selbstkosten }],
          weg: w.steps.slice(n + 1, n + 3) },
        { titel: "Gewinn und Nettoangebotspreis", anweisung: "Berechne den Gewinn: " + a.gw + " Prozent der Selbstkosten. Berechne danach den Nettoangebotspreis.",
          tipp: "Der Gewinnsatz gilt für die Selbstkosten, nicht für die Positionssumme. Runde den Gewinn kaufmännisch auf volle Cent. Der Nettoangebotspreis ist Selbstkosten plus Gewinn.",
          felder: [{ key: "gewinn", label: "Gewinn in Euro", cents: w.gewinn }, { key: "netto", label: "Nettoangebotspreis in Euro", cents: w.netto }],
          weg: w.steps.slice(n + 3) }
      ]
    };
  }

  function lernPruefe(i, phase, antworten) {
    var ph = lernLoesung(i).phasen[phase];
    var felder = ph.felder.map(function (f) {
      var roh = String(antworten && antworten[f.key] != null ? antworten[f.key] : "").replace(/€|euro/gi, "").trim();
      if (roh === "") return { key: f.key, ok: false, art: "format", meldung: "Eingabe prüfen: Trage hier einen Betrag ein, zum Beispiel 12,50." };
      var m = money(roh);
      if (!m.ok) return { key: f.key, ok: false, art: "format", meldung: "Eingabe prüfen: " + m.error };
      if (m.cents === f.cents) return { key: f.key, ok: true, art: "ok", meldung: "Richtig." };
      return { key: f.key, ok: false, art: "wert", meldung: "Nicht richtig. Rechne diesen Wert noch einmal. Du kannst den Tipp ansehen." };
    });
    return { ok: felder.every(function (f) { return f.ok; }), felder: felder };
  }

  var api = {
    ID: ID, MAX_CENTS: MAX_CENTS, percent: percent, percentFein: percentFein, fmt: fmt,
    money: money, qty: qty, rate: rate, angebot: angebot, gewinn: gewinn, rabatt: rabatt,
    steuer: steuer, lf2Referenz: lf2Referenz,
    MAX_POSITIONEN: MAX_POSITIONEN, positionenHinzufuegen: positionenHinzufuegen, positionenEntfernen: positionenEntfernen,
    lernAufgaben: LERN_AUFGABEN, lernLoesung: lernLoesung, lernPruefe: lernPruefe
  };
  g.BWL_WERKSTATT = api;
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  if (!g.document) return;

  var d = g.document;
  function $(id) { return d.getElementById(id); }
  function field(id) { var el = $(id); return el ? el.value : ""; }
  function showError(text) {
    var box = $("bwl-fehler");
    box.textContent = text;
    box.hidden = false;
    $("bwl-ergebnis").hidden = true;
    box.focus();
  }
  function clearResult() {
    var fehler = $("bwl-fehler");
    var ergebnis = $("bwl-ergebnis");
    if (fehler) { fehler.hidden = true; fehler.textContent = ""; }
    if (ergebnis) ergebnis.hidden = true;
  }
  function makeCell(tag, text, cls, scope) {
    var cell = d.createElement(tag);
    cell.textContent = text;
    if (cls) cell.className = cls;
    if (scope) cell.setAttribute("scope", scope);
    return cell;
  }
  function makeTable(box, caption, heads, rows, zahlSpalten) {
    var wrap = d.createElement("div");
    wrap.className = "bwl-tabelle-wrap";
    wrap.tabIndex = 0;
    wrap.setAttribute("role", "region");
    wrap.setAttribute("aria-label", caption);
    var table = d.createElement("table");
    table.className = "bwl-tabelle";
    var cap = d.createElement("caption");
    cap.textContent = caption;
    table.appendChild(cap);
    var thead = d.createElement("thead");
    var hr = d.createElement("tr");
    heads.forEach(function (h, i) { hr.appendChild(makeCell("th", h, zahlSpalten.indexOf(i) >= 0 ? "bwl-zahl" : "", "col")); });
    thead.appendChild(hr);
    table.appendChild(thead);
    var tbody = d.createElement("tbody");
    rows.forEach(function (row) {
      var tr = d.createElement("tr");
      row.forEach(function (text, i) {
        tr.appendChild(i === 0 ? makeCell("th", text, "", "row") : makeCell("td", text, zahlSpalten.indexOf(i) >= 0 ? "bwl-zahl" : ""));
      });
      tbody.appendChild(tr);
    });
    table.appendChild(tbody);
    wrap.appendChild(table);
    box.appendChild(wrap);
  }
  function appendAngebotTabellen(box, r) {
    makeTable(box, "Positionen des Angebots", ["Artikel", "Menge", "Einzelpreis netto", "Positionsbetrag"],
      r.zeilen.map(function (z, i) { return [z.name || ("Position " + (i + 1)), z.menge, z.einzelpreis + " €", z.betrag + " €"]; }), [1, 2, 3]);
    makeTable(box, "Summen", ["Posten", "Betrag"], [
      ["Positionssumme", fmt(r.positionssumme) + " €"],
      ["Handlungskosten", fmt(r.handlungskosten) + " €"],
      ["Selbstkosten", fmt(r.selbstkosten) + " €"],
      ["Gewinn", fmt(r.gewinn) + " €"],
      ["Nettoangebotspreis", fmt(r.netto) + " €"]
    ], [1]);
  }
  function show(result, titel) {
    if (!result.ok) { showError(result.error); return; }
    var box = $("bwl-ergebnis");
    box.textContent = "";
    var h = d.createElement("h3");
    h.textContent = titel;
    box.appendChild(h);
    var annahme = d.createElement("p");
    annahme.textContent = "Übungsannahme: Die Zahlen und Sätze sind Beispiele für die Rechnung, keine Vorgabe aus dem Unterricht und keine Steuer- oder Rechtsberatung.";
    box.appendChild(annahme);
    if (result.zeilen) appendAngebotTabellen(box, result);
    var wegTitel = d.createElement("h4");
    wegTitel.textContent = "Rechenweg";
    box.appendChild(wegTitel);
    result.steps.forEach(function (step) {
      var p = d.createElement("p");
      p.textContent = step;
      box.appendChild(p);
    });
    box.hidden = false;
    box.focus();
  }
  function activePanel() { return d.querySelector(".bwl-panel:not([hidden])"); }
  function readPositions(panel) {
    return Array.prototype.map.call(panel.querySelectorAll("[data-position]:not([hidden])"), function (row) {
      var nameEl = row.querySelector("[data-name]");
      return { name: nameEl ? nameEl.value : "", menge: row.querySelector("[data-menge]").value, einzelpreis: row.querySelector("[data-preis]").value };
    });
  }
  function calculate() {
    var panel = activePanel();
    var art = panel.getAttribute("data-rechner");
    if (art === "angebot") {
      show(angebot({
        positionen: readPositions(panel),
        handlungskostenSatz: panel.querySelector("[data-hk]").value,
        gewinnSatz: panel.querySelector("[data-gw]").value
      }), "Angebotsrechnung");
    } else if (art === "gewinn") {
      var weg = panel.querySelector("[name='gewinn-weg']:checked");
      show(gewinn({ weg: weg ? weg.value : "zuschlag", basis: field("gw-basis"), satz: field("gw-satz"), erloes: field("gw-erloes"), kosten: field("gw-kosten") }), "Gewinnberechnung");
    } else if (art === "rabatt") {
      var rabattArt = panel.querySelector("[name='rabatt-art']:checked");
      show(rabatt({ basis: field("rb-basis"), art: rabattArt ? rabattArt.value : "prozent", satz: field("rb-satz"), betrag: field("rb-betrag") }), "Rabattberechnung");
    } else {
      var richtung = panel.querySelector("[name='steuer-richtung']:checked");
      show(steuer({ betrag: field("st-betrag"), satz: field("st-satz"), richtung: richtung ? richtung.value : "netto-zu-brutto" }), "Netto-Brutto-Berechnung");
    }
  }
  function setPanel(id) {
    d.querySelectorAll(".bwl-panel").forEach(function (panel) { panel.hidden = panel.id !== id; });
    d.querySelectorAll("[data-bwl-tab]").forEach(function (tab) {
      var on = tab.getAttribute("data-bwl-tab") === id;
      tab.setAttribute("aria-selected", on ? "true" : "false");
      tab.tabIndex = on ? 0 : -1;
    });
    clearResult();
  }
  function fillExample() {
    var panel = activePanel();
    var art = panel.getAttribute("data-rechner");
    if (art === "angebot") {
      var werte = [["3", "640,00"], ["3", "150,00"], ["3", "30,00"], ["3", "40,00"], ["1", "0,00"], ["3", "90,00"]];
      var namen = ["Rechner", "Bildschirm", "Blickschutzfilter", "Tastatur und Maus", "Versand", "Einrichtung vor Ort"];
      setPositionen(MAX_POSITIONEN);
      panel.querySelectorAll("[data-position]").forEach(function (row, i) {
        row.querySelector("[data-name]").value = namen[i];
        row.querySelector("[data-menge]").value = werte[i][0];
        row.querySelector("[data-preis]").value = werte[i][1];
      });
      panel.querySelector("[data-hk]").value = "7";
      panel.querySelector("[data-gw]").value = "5";
    } else if (art === "gewinn") {
      $("gw-basis").value = "3.049,50"; $("gw-satz").value = "5";
      $("gw-erloes").value = "3.201,98"; $("gw-kosten").value = "3.049,50";
    } else if (art === "rabatt") {
      $("rb-basis").value = "1.000,00"; $("rb-satz").value = "10"; $("rb-betrag").value = "100,00";
    } else {
      $("st-betrag").value = "100,00"; $("st-satz").value = "19";
    }
    clearResult();
  }
  function clearInputs() {
    activePanel().querySelectorAll("input").forEach(function (input) {
      if (input.type === "radio") return;
      input.value = "";
    });
    if (activePanel().getAttribute("data-rechner") === "angebot") setPositionen(1);
    clearResult();
  }

  d.querySelectorAll("[data-bwl-tab]").forEach(function (tab) {
    tab.addEventListener("click", function () { setPanel(tab.getAttribute("data-bwl-tab")); });
  });
  $("bwl-tabs").addEventListener("keydown", function (event) {
    var tabs = Array.prototype.slice.call(d.querySelectorAll("[data-bwl-tab]"));
    var index = tabs.indexOf(d.activeElement);
    if (index < 0) return;
    var next = index;
    if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
    else if (event.key === "ArrowLeft") next = (index - 1 + tabs.length) % tabs.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = tabs.length - 1;
    else return;
    event.preventDefault();
    tabs[next].focus();
    setPanel(tabs[next].getAttribute("data-bwl-tab"));
  });
  $("bwl-form").addEventListener("submit", function (event) { event.preventDefault(); calculate(); });
  $("bwl-beispiel").addEventListener("click", fillExample);
  $("bwl-leeren").addEventListener("click", clearInputs);
  $("bwl-form").addEventListener("input", clearResult);
  d.querySelectorAll("[name='gewinn-weg']").forEach(function (input) {
    input.addEventListener("change", function () {
      var diff = input.value === "differenz" && input.checked;
      $("gw-zuschlag-felder").hidden = diff;
      $("gw-differenz-felder").hidden = !diff;
      clearResult();
    });
  });
  d.querySelectorAll("[name='rabatt-art']").forEach(function (input) {
    input.addEventListener("change", function () {
      var betrag = input.value === "betrag" && input.checked;
      $("rb-satz-feld").hidden = betrag;
      $("rb-betrag-feld").hidden = !betrag;
      clearResult();
    });
  });

  /* ---- Angebotspositionen: hinzufügen und entfernen ----
     Ausgeblendete Zeilen werden geleert und nie gelesen. */
  function posRows() { return Array.prototype.slice.call(d.querySelectorAll("#panel-angebot [data-position]")); }
  function posAnzahl() { return posRows().filter(function (row) { return !row.hidden; }).length; }
  function posWerte(row) {
    return { name: row.querySelector("[data-name]").value, menge: row.querySelector("[data-menge]").value, einzelpreis: row.querySelector("[data-preis]").value };
  }
  function posSchreiben(row, p) {
    row.querySelector("[data-name]").value = p.name;
    row.querySelector("[data-menge]").value = p.menge;
    row.querySelector("[data-preis]").value = p.einzelpreis;
  }
  function posStatus(text) { $("bwl-position-status").textContent = text; }
  function setPositionen(anzahl) {
    posRows().forEach(function (row, i) {
      var n = i + 1;
      var an = i < anzahl;
      row.hidden = !an;
      if (!an) posSchreiben(row, { name: "", menge: "", einzelpreis: "" });
      row.setAttribute("aria-label", "Position " + n);
      row.querySelector("[data-titel]").textContent = "Artikel " + n;
      row.querySelector("[data-label-menge]").textContent = "Menge " + n;
      row.querySelector("[data-label-preis]").textContent = "Einzelpreis " + n + " in Euro";
      var rem = row.querySelector("[data-entfernen]");
      if (rem) rem.setAttribute("aria-label", "Artikel " + n + " entfernen");
    });
    $("bwl-artikel-plus").disabled = anzahl >= MAX_POSITIONEN;
    $("bwl-artikel-max").hidden = anzahl < MAX_POSITIONEN;
  }
  $("bwl-artikel-plus").addEventListener("click", function () {
    var alt = posAnzahl();
    var neu = positionenHinzufuegen(alt);
    if (neu === alt) { posStatus("Du kannst bis zu 6 Artikel hinzufügen."); return; }
    setPositionen(neu);
    clearResult();
    posStatus("Artikel " + neu + " wurde hinzugefügt. Es sind " + neu + " von höchstens " + MAX_POSITIONEN + " Artikeln sichtbar.");
    posRows()[neu - 1].querySelector("[data-name]").focus();
  });
  posRows().forEach(function (row, i) {
    var rem = row.querySelector("[data-entfernen]");
    if (!rem) return;
    rem.addEventListener("click", function () {
      var rows = posRows();
      var rest = positionenEntfernen(rows.slice(0, posAnzahl()).map(posWerte), i);
      rest.forEach(function (p, k) { posSchreiben(rows[k], p); });
      setPositionen(rest.length);
      clearResult();
      posStatus("Artikel " + (i + 1) + " wurde entfernt. Die übrigen Artikel sind neu nummeriert. Es sind " + rest.length + " Artikel sichtbar.");
      rows[Math.min(i, rest.length - 1)].querySelector("[data-name]").focus();
    });
  });
  setPositionen(1);

  /* ---- Moduswahl und Lernmodus (nur Oberfläche, Rechnen über lernLoesung/lernPruefe) ---- */
  function el(tag, cls, text) {
    var e = d.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }
  function neuerStand() { return { phase: 0, werte: {}, fehler: {}, richtig: {}, versuche: 0, tipp: false, weg: false }; }
  var lern = { aufgabe: 0, stand: LERN_AUFGABEN.map(neuerStand) };
  function lernStatus(text) { $("bwl-lern-status").textContent = text; }

  function setModus(modus) {
    var lernen = modus === "lern";
    $("bwl-frei").hidden = lernen;
    $("bwl-lern").hidden = !lernen;
    $("modus-frei").setAttribute("aria-pressed", lernen ? "false" : "true");
    $("modus-lern").setAttribute("aria-pressed", lernen ? "true" : "false");
    $("bwl-modus-status").textContent = lernen
      ? "Lernmodus ist aktiv. Du löst Übungsaufgaben Schritt für Schritt. Deine Eingaben im freien Rechner bleiben erhalten."
      : "Freier Rechner ist aktiv. Du rechnest mit deinen eigenen Zahlen.";
  }

  function lernPhase(i, sol, p, s) {
    var ph = sol.phasen[p];
    var fertig = p < s.phase;
    var li = el("li", "bwl-phase " + (fertig ? "bwl-phase-fertig" : "bwl-phase-aktiv"));
    var h = el("h4", "", "Schritt " + (p + 1) + " von 3: " + ph.titel + (fertig ? " (erledigt)" : ""));
    h.id = "lern-schritt-" + p;
    h.tabIndex = -1;
    li.appendChild(h);
    if (fertig) {
      var ul = el("ul");
      ph.felder.forEach(function (f) { ul.appendChild(el("li", "", f.label.replace(/ in Euro$/, "") + ": " + fmt(f.cents) + " €")); });
      li.appendChild(ul);
      li.appendChild(el("p", "bwl-fortschritt", "Rechenweg"));
      ph.weg.forEach(function (t) { li.appendChild(el("p", "", t)); });
      return li;
    }
    li.appendChild(el("p", "", ph.anweisung));
    var form = el("form", "bwl-form bwl-lern-form");
    form.noValidate = true;
    ph.felder.forEach(function (f) {
      var id = "lern-" + f.key;
      var wrap = el("div", "bwl-feld");
      var lab = el("label", "", f.label);
      lab.setAttribute("for", id);
      var inp = el("input");
      inp.id = id;
      inp.type = "text";
      inp.setAttribute("inputmode", "decimal");
      inp.setAttribute("autocomplete", "off");
      inp.value = s.werte[f.key] || "";
      inp.setAttribute("aria-describedby", id + "-meldung");
      inp.addEventListener("input", function () { s.werte[f.key] = inp.value; });
      var meld = el("p", "bwl-feld-meldung");
      meld.id = id + "-meldung";
      var fehler = s.fehler[f.key];
      if (fehler) {
        meld.textContent = fehler.meldung;
        meld.className += " bwl-nok";
        inp.setAttribute("aria-invalid", "true");
      } else if (s.richtig[f.key]) {
        meld.textContent = "Richtig.";
        meld.className += " bwl-ok";
      } else {
        meld.hidden = true;
      }
      wrap.appendChild(lab);
      wrap.appendChild(inp);
      wrap.appendChild(meld);
      form.appendChild(wrap);
    });
    var reihe = el("div", "knopf-reihe");
    var pruef = el("button", "knopf knopf-haupt", "Antwort prüfen");
    pruef.type = "submit";
    reihe.appendChild(pruef);
    var tipp = el("button", "knopf", "Tipp zeigen");
    tipp.type = "button";
    tipp.addEventListener("click", function () { s.tipp = true; lernStatus("Der Tipp steht unter den Knöpfen."); lernRender("lern-tipp"); });
    reihe.appendChild(tipp);
    if (s.versuche > 0) {
      var weg = el("button", "knopf", "Lösungsweg zeigen");
      weg.type = "button";
      weg.addEventListener("click", function () { s.weg = true; lernStatus("Der Lösungsweg steht unter den Knöpfen. Trage die Werte danach selbst ein."); lernRender("lern-weg"); });
      reihe.appendChild(weg);
    }
    form.appendChild(reihe);
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var res = lernPruefe(i, p, s.werte);
      var richtige = 0;
      var erster = null;
      s.versuche += 1;
      s.fehler = {};
      s.richtig = {};
      res.felder.forEach(function (r) {
        if (r.ok) { s.richtig[r.key] = true; richtige += 1; }
        else { s.fehler[r.key] = { art: r.art, meldung: r.meldung }; if (!erster) erster = r.key; }
      });
      if (res.ok) {
        s.phase = p + 1;
        s.versuche = 0; s.tipp = false; s.weg = false; s.fehler = {}; s.richtig = {};
        if (s.phase >= 3) { lernStatus("Richtig. Schritt 3 von 3 ist geschafft. Die Aufgabe ist fertig."); lernRender("lern-fertig"); }
        else { lernStatus("Richtig. Schritt " + (p + 1) + " von 3 ist geschafft. Jetzt kommt Schritt " + (p + 2) + " von 3."); lernRender("lern-schritt-" + s.phase); }
      } else {
        lernStatus("Noch nicht richtig. " + richtige + " von " + res.felder.length + " Feldern stimmen. Lies die Meldung am Feld und versuche es noch einmal.");
        lernRender("lern-" + erster);
      }
    });
    li.appendChild(form);
    if (s.tipp) {
      var tb = el("div", "bwl-lern-box");
      tb.id = "lern-tipp";
      tb.tabIndex = -1;
      tb.appendChild(el("p", "bwl-fortschritt", "Tipp"));
      tb.appendChild(el("p", "", ph.tipp));
      li.appendChild(tb);
    }
    if (s.weg) {
      var wb = el("div", "bwl-lern-box");
      wb.id = "lern-weg";
      wb.tabIndex = -1;
      wb.appendChild(el("p", "bwl-fortschritt", "Lösungsweg"));
      ph.weg.forEach(function (t) { wb.appendChild(el("p", "", t)); });
      li.appendChild(wb);
    }
    return li;
  }

  function lernRender(fokusId) {
    var i = lern.aufgabe;
    var sol = lernLoesung(i);
    var a = sol.aufgabe;
    var s = lern.stand[i];
    d.querySelectorAll("[data-bwl-aufgabe]").forEach(function (b) {
      b.setAttribute("aria-pressed", Number(b.getAttribute("data-bwl-aufgabe")) === i ? "true" : "false");
    });
    var root = $("bwl-lern-aufgabe");
    root.textContent = "";
    var box = el("div", "bwl-lern-aufgabe-box");
    box.appendChild(el("h3", "", a.titel));
    a.situation.forEach(function (t) { box.appendChild(el("p", "", t)); });
    makeTable(box, "Angaben zur Aufgabe", ["Artikel", "Menge", "Einzelpreis netto"],
      a.positionen.map(function (z) { return [z.name, z.menge, z.einzelpreis + " €"]; }), [1, 2]);
    box.appendChild(el("p", "", a.frage));
    box.appendChild(el("p", "bwl-fortschritt", s.phase >= 3 ? "Aufgabe geschafft: 3 von 3 Schritten" : "Schritt " + (s.phase + 1) + " von 3"));
    var ol = el("ol", "bwl-phasen");
    for (var p = 0; p <= Math.min(s.phase, 2); p++) ol.appendChild(lernPhase(i, sol, p, s));
    box.appendChild(ol);
    if (s.phase >= 3) {
      var ende = el("div", "bwl-lern-fertig");
      ende.id = "lern-fertig";
      ende.tabIndex = -1;
      ende.appendChild(el("p", "bwl-fortschritt", "Geschafft"));
      ende.appendChild(el("p", "", "Du hast alle drei Schritte gelöst. Diese Aufgabe ist ein Entwurf und fachlich noch nicht geprüft."));
      if (i < LERN_AUFGABEN.length - 1) {
        var weiter = el("button", "knopf knopf-haupt", "Zur nächsten Aufgabe");
        weiter.type = "button";
        weiter.addEventListener("click", function () { lern.aufgabe = i + 1; lernStatus("Aufgabe " + (i + 2) + " ist geöffnet."); lernRender("lern-schritt-" + lern.stand[i + 1].phase); });
        ende.appendChild(weiter);
      }
      box.appendChild(ende);
    }
    root.appendChild(box);
    if (fokusId && $(fokusId)) $(fokusId).focus();
  }

  d.querySelectorAll("[data-bwl-modus]").forEach(function (b) {
    b.addEventListener("click", function () { setModus(b.getAttribute("data-bwl-modus")); });
  });
  d.querySelectorAll("[data-bwl-aufgabe]").forEach(function (b) {
    b.addEventListener("click", function () {
      lern.aufgabe = Number(b.getAttribute("data-bwl-aufgabe"));
      lernStatus("Aufgabe " + (lern.aufgabe + 1) + " ist geöffnet. Dein Stand bleibt erhalten.");
      lernRender();
    });
  });
  $("bwl-lern-neu").addEventListener("click", function () {
    lern.stand[lern.aufgabe] = neuerStand();
    lernStatus("Die Aufgabe wurde neu gestartet.");
    lernRender("lern-schritt-0");
  });
  lernRender();
})(typeof window !== "undefined" ? window : globalThis);
