/* Windows-Werkzeugkiste: Logik und Oberfläche.
   Rein lehrend: Es werden keine Windows-Befehle ausgeführt, keine Einstellungen geändert,
   nichts nachgeladen und nichts gespeichert. Fachtexte werden nur per textContent ausgegeben.
   Die reinen Funktionen (validiereDaten, bewerteAntwort, neuerTest, testAntwort,
   naechsteFrage) laufen auch ohne DOM in Node. */
(function () {
  "use strict";

  var root = typeof globalThis !== "undefined" ? globalThis : (typeof window !== "undefined" ? window : this);

  var ARTEN = ["shortcut", "befehl"];
  var ART_NAME = { shortcut: "Tastenkombination", befehl: "Ausführen-Befehl" };
  /* Pflichtabdeckung laut Auftrag: sieben Tastenkombinationen, neun Ausführen-Befehle. */
  var PFLICHT_KARTEN = {
    "win-l": "shortcut", "win-r": "shortcut", "win-e": "shortcut", "win-i": "shortcut",
    "win-d": "shortcut", "win-x": "shortcut", "strg-umschalt-esc": "shortcut",
    "ncpa-cpl": "befehl", "sysdm-cpl": "befehl", "powercfg-cpl": "befehl",
    "compmgmt-msc": "befehl", "secpol-msc": "befehl", "devmgmt-msc": "befehl", "services-msc": "befehl",
    "gpedit-msc": "befehl", "msconfig": "befehl"
  };

  function nichtLeer(t) { return typeof t === "string" && t.trim() !== ""; }
  function istObjekt(o) { return o !== null && typeof o === "object" && !Array.isArray(o); }

  /* ---------- Reine Funktionen ---------- */

  function pruefeKarten(karten, fehler) {
    var ids = {};
    karten.forEach(function (k, i) {
      var n = "Karte " + (i + 1);
      if (!istObjekt(k)) { fehler.push(n + ": kein Objekt."); return; }
      if (!nichtLeer(k.id)) { fehler.push(n + ": id fehlt."); }
      else if (ids[k.id]) { fehler.push(n + ": doppelte id " + k.id + "."); }
      else { ids[k.id] = k; }
      if (ARTEN.indexOf(k.art) < 0) { fehler.push(n + ": art muss shortcut oder befehl sein."); }
      ["titel", "eingabe", "erklaerung", "praxis"].forEach(function (f) {
        if (!nichtLeer(k[f])) { fehler.push(n + ": " + f + " fehlt."); }
      });
      if (!Array.isArray(k.hinweise) || !k.hinweise.every(nichtLeer)) { fehler.push(n + ": hinweise muss ein Array aus Texten sein."); }
      if (!Array.isArray(k.begriffe) || !k.begriffe.every(function (b) { return istObjekt(b) && nichtLeer(b.begriff) && nichtLeer(b.erklaerung); })) {
        fehler.push(n + ": begriffe muss ein Array aus {begriff, erklaerung} sein.");
      }
      if (!Array.isArray(k.quellen) || !k.quellen.every(function (q) { return istObjekt(q) && nichtLeer(q.titel) && typeof q.url === "string"; })) {
        fehler.push(n + ": quellen muss ein Array aus {titel, url} sein.");
      }
    });
    Object.keys(PFLICHT_KARTEN).forEach(function (id) {
      if (!ids[id]) { fehler.push("Pflichtkarte fehlt: " + id + "."); }
      else if (ids[id].art !== PFLICHT_KARTEN[id]) { fehler.push("Pflichtkarte " + id + " hat die falsche art."); }
    });
    return ids;
  }

  function pruefeAufgaben(liste, name, kartenIdMap, fehler) {
    var ids = {};
    liste.forEach(function (a, i) {
      var n = name + " " + (i + 1);
      if (!istObjekt(a)) { fehler.push(n + ": kein Objekt."); return; }
      if (!nichtLeer(a.id)) { fehler.push(n + ": id fehlt."); }
      else if (ids[a.id]) { fehler.push(n + ": doppelte id " + a.id + "."); }
      else { ids[a.id] = true; }
      if (ARTEN.indexOf(a.art) < 0) { fehler.push(n + ": art muss shortcut oder befehl sein."); }
      if (!nichtLeer(a.frage)) { fehler.push(n + ": frage fehlt."); }
      if (!nichtLeer(a.erklaerung)) { fehler.push(n + ": erklaerung fehlt."); }
      ["rueckmeldungRichtig", "rueckmeldungFalsch"].forEach(function (f) {
        if (a[f] !== undefined && !nichtLeer(a[f])) { fehler.push(n + ": " + f + " muss ein nichtleerer Text sein."); }
      });
      var optIds = {};
      if (!Array.isArray(a.optionen) || a.optionen.length < 2) { fehler.push(n + ": mindestens zwei optionen nötig."); }
      else {
        a.optionen.forEach(function (o) {
          if (!istObjekt(o) || !nichtLeer(o.id) || !nichtLeer(o.text)) { fehler.push(n + ": Option ohne id oder text."); }
          else if (optIds[o.id]) { fehler.push(n + ": doppelte Options-id " + o.id + "."); }
          else { optIds[o.id] = true; }
        });
      }
      if (!nichtLeer(a.loesungId) || !optIds[a.loesungId]) { fehler.push(n + ": loesungId verweist auf keine Option."); }
      if (!Array.isArray(a.kartenIds) || a.kartenIds.length === 0) { fehler.push(n + ": kartenIds fehlt oder ist leer."); }
      else {
        a.kartenIds.forEach(function (kid) {
          if (!kartenIdMap[kid]) { fehler.push(n + ": unbekannte Karte " + kid + "."); }
          else if (kartenIdMap[kid].art !== a.art) { fehler.push(n + ": Karte " + kid + " passt nicht zur art."); }
        });
      }
    });
  }

  function validiereDaten(daten) {
    var fehler = [];
    if (!istObjekt(daten)) { return { ok: false, fehler: ["Keine Daten vorhanden."] }; }
    ["karten", "uebungen", "quiz"].forEach(function (f) {
      if (!Array.isArray(daten[f]) || daten[f].length === 0) { fehler.push(f + " fehlt oder ist leer."); }
    });
    if (fehler.length === 0) {
      var map = pruefeKarten(daten.karten, fehler);
      pruefeAufgaben(daten.uebungen, "Übung", map, fehler);
      pruefeAufgaben(daten.quiz, "Quizfrage", map, fehler);
    }
    return { ok: fehler.length === 0, fehler: fehler };
  }

  function findeOption(aufgabe, optionId) {
    if (!istObjekt(aufgabe) || !Array.isArray(aufgabe.optionen) || typeof optionId !== "string") { return null; }
    for (var i = 0; i < aufgabe.optionen.length; i += 1) {
      if (aufgabe.optionen[i] && aufgabe.optionen[i].id === optionId) { return aufgabe.optionen[i]; }
    }
    return null;
  }

  function bewerteAntwort(aufgabe, optionId) {
    if (!findeOption(aufgabe, optionId)) { return { gueltig: false, richtig: false, erklaerung: "" }; }
    return {
      gueltig: true,
      richtig: optionId === aufgabe.loesungId,
      erklaerung: typeof aufgabe.erklaerung === "string" ? aufgabe.erklaerung : ""
    };
  }

  /* Ungültige Anzahl: kein spielbarer Test (fertig, anzahl 0). */
  function neuerTest(anzahl) {
    if (!Number.isInteger(anzahl) || anzahl < 1) {
      return { index: 0, punkte: 0, beantwortet: false, fertig: true, anzahl: 0 };
    }
    return { index: 0, punkte: 0, beantwortet: false, fertig: false, anzahl: anzahl };
  }

  function testAntwort(state, aufgabe, optionId) {
    if (!istObjekt(state) || state.fertig || state.beantwortet) { return state; }
    var wertung = bewerteAntwort(aufgabe, optionId);
    if (!wertung.gueltig) { return state; }
    return Object.assign({}, state, { beantwortet: true, punkte: state.punkte + (wertung.richtig ? 1 : 0) });
  }

  /* Nach der letzten Frage bleibt index auf der letzten Frage (nie außerhalb), fertig wird true. */
  function naechsteFrage(state) {
    if (!istObjekt(state) || state.fertig || !state.beantwortet) { return state; }
    if (state.index + 1 >= state.anzahl) { return Object.assign({}, state, { fertig: true }); }
    return Object.assign({}, state, { index: state.index + 1, beantwortet: false });
  }

  var api = {
    PFLICHT_KARTEN: PFLICHT_KARTEN,
    validiereDaten: validiereDaten,
    bewerteAntwort: bewerteAntwort,
    neuerTest: neuerTest,
    testAntwort: testAntwort,
    naechsteFrage: naechsteFrage
  };

  /* ---------- Oberfläche (nur mit DOM) ---------- */

  function init(doc) {
    var daten = root.WINDOWS_WERKZEUGKISTE_DATEN;
    var fehlerBox = doc.getElementById("ww-fehler");
    var modusBereich = doc.getElementById("ww-modus-bereich");
    var pruefung = validiereDaten(daten);
    if (!pruefung.ok) {
      if (fehlerBox) {
        fehlerBox.textContent = "Die Lerninhalte konnten nicht geladen werden. Die Modi sind deshalb gesperrt. Bitte melde das deiner Ausbilderin oder deinem Ausbilder. Du kannst über „Zur Themenübersicht“ weiterlernen.";
        fehlerBox.hidden = false;
      }
      if (modusBereich) { modusBereich.hidden = true; }
      return;
    }

    function el(tag, klasse, text) {
      var e = doc.createElement(tag);
      if (klasse) { e.className = klasse; }
      if (text !== undefined) { e.textContent = text; }
      return e;
    }
    function leeren(node) { while (node.firstChild) { node.removeChild(node.firstChild); } }

    /* --- Lernkarten --- */
    function sichererLink(q) {
      var li = el("li");
      if (typeof q.url === "string" && /^https:\/\//i.test(q.url)) {
        var a = el("a", "", q.titel);
        a.href = q.url;
        a.rel = "noopener noreferrer";
        li.appendChild(a);
      } else { li.textContent = q.titel; }
      return li;
    }

    function karteBauen(k) {
      var art = el("article", "ww-karte");
      art.appendChild(el("h4", "ww-karte-titel", k.titel));
      var eingabeZeile = el("p", "ww-eingabe");
      eingabeZeile.appendChild(el(k.art === "shortcut" ? "kbd" : "code", "ww-eingabe-text", k.eingabe));
      art.appendChild(eingabeZeile);
      var erk = el("p"); erk.appendChild(el("strong", "", "Erklärung: ")); erk.appendChild(doc.createTextNode(k.erklaerung)); art.appendChild(erk);
      var pr = el("p"); pr.appendChild(el("strong", "", "Im Alltag: ")); pr.appendChild(doc.createTextNode(k.praxis)); art.appendChild(pr);
      if (k.hinweise.length) {
        var ul = el("ul", "ww-hinweise");
        k.hinweise.forEach(function (h) { ul.appendChild(el("li", "", h)); });
        art.appendChild(ul);
      }
      if (k.begriffe.length || k.quellen.length) {
        var det = el("details", "ww-details");
        det.appendChild(el("summary", "", "Fachbegriffe und Quellen"));
        if (k.begriffe.length) {
          var dl = el("dl");
          k.begriffe.forEach(function (b) { dl.appendChild(el("dt", "", b.begriff)); dl.appendChild(el("dd", "", b.erklaerung)); });
          det.appendChild(dl);
        }
        if (k.quellen.length) {
          var qu = el("ul");
          k.quellen.forEach(function (q) { qu.appendChild(sichererLink(q)); });
          det.appendChild(qu);
        }
        art.appendChild(det);
      }
      return art;
    }

    ARTEN.forEach(function (art) {
      var ziel = doc.getElementById("ww-liste-" + art);
      if (!ziel) { return; }
      leeren(ziel);
      daten.karten.filter(function (k) { return k.art === art; }).forEach(function (k) { ziel.appendChild(karteBauen(k)); });
    });
    var allg = doc.getElementById("ww-allgemein");
    if (allg && Array.isArray(daten.allgemeineHinweise)) {
      leeren(allg);
      daten.allgemeineHinweise.forEach(function (h) {
        if (!nichtLeer(h.text)) { return; }
        var p = el("p"); p.appendChild(el("strong", "", h.titel + ": ")); p.appendChild(doc.createTextNode(h.text)); allg.appendChild(p);
      });
    }

    /* --- Übung und Wissenstest --- */
    var laeufe = {
      uebung: { container: doc.getElementById("ww-uebung-inhalt"), aufgaben: daten.uebungen, state: null, name: "Übung", neu: "Übung neu starten" },
      test: { container: doc.getElementById("ww-test-inhalt"), aufgaben: daten.quiz, state: null, name: "Wissenstest", neu: "Wissenstest neu starten" }
    };

    function neustart(modus) {
      var lauf = laeufe[modus];
      lauf.state = neuerTest(lauf.aufgaben.length);
    }

    function fokus(node) { if (node && node.focus) { node.focus(); } }

    function renderLauf(modus, mitFokus) {
      var lauf = laeufe[modus];
      var box = lauf.container;
      if (!box) { return; }
      leeren(box);
      var s = lauf.state;
      var n = lauf.aufgaben.length;

      if (s.fertig && modus === "test" && s.anzahl > 0) {
        var kopf = el("h3", "ww-aufgabe-titel", "Ergebnis des Wissenstests");
        kopf.tabIndex = -1;
        box.appendChild(kopf);
        box.appendChild(el("p", "gross ww-ergebnis", s.punkte + " von " + s.anzahl + " richtig"));
        box.appendChild(el("p", "klein", "Du kannst den Wissenstest jederzeit und beliebig oft neu starten. Es wird nichts gespeichert."));
        var neu = el("button", "knopf knopf-haupt", lauf.neu);
        neu.type = "button";
        neu.addEventListener("click", function () { neustart(modus); renderLauf(modus, true); });
        box.appendChild(el("div", "knopf-reihe")).appendChild(neu);
        if (mitFokus) { fokus(kopf); }
        return;
      }
      if (s.fertig) {
        box.appendChild(el("p", "", "Hier gibt es gerade keine Aufgaben."));
        return;
      }

      var aufgabe = lauf.aufgaben[s.index];
      var ueberschrift = el("h3", "ww-aufgabe-titel", "Aufgabe " + (s.index + 1) + " von " + n);
      ueberschrift.tabIndex = -1;
      box.appendChild(ueberschrift);
      box.appendChild(el("p", "klein ww-kategorie", "Kategorie: " + ART_NAME[aufgabe.art]));

      var form = el("form", "ww-form");
      form.noValidate = true;
      var fs = el("fieldset", "ww-optionen");
      fs.appendChild(el("legend", "ww-frage", aufgabe.frage));
      var fehlerId = "ww-" + modus + "-fehler";
      fs.setAttribute("aria-describedby", fehlerId);
      aufgabe.optionen.forEach(function (o, i) {
        var label = el("label", "ww-option");
        var radio = doc.createElement("input");
        radio.type = "radio";
        radio.name = "ww-" + modus + "-antwort";
        radio.value = o.id;
        radio.id = "ww-" + modus + "-opt-" + i;
        label.appendChild(radio);
        label.appendChild(el("span", "ww-option-text", o.text));
        fs.appendChild(label);
      });
      form.appendChild(fs);
      var fehler = el("p", "ww-fehlertext", "");
      fehler.id = fehlerId;
      fehler.hidden = true;
      form.appendChild(fehler);

      var reihe = el("div", "knopf-reihe");
      var pruef = el("button", "knopf knopf-haupt", "Antwort prüfen");
      pruef.type = "submit";
      var weiter = el("button", "knopf", "Weiter");
      weiter.type = "button";
      weiter.hidden = true;
      reihe.appendChild(pruef);
      reihe.appendChild(weiter);
      form.appendChild(reihe);

      var fb = el("div", "feedback-box ww-feedback");
      fb.setAttribute("role", "status");
      fb.setAttribute("aria-live", "polite");
      fb.hidden = true;

      form.addEventListener("submit", function (ev) {
        ev.preventDefault();
        var gewaehlt = form.querySelector('input[name="ww-' + modus + '-antwort"]:checked');
        var wert = gewaehlt ? gewaehlt.value : null;
        var wertung = bewerteAntwort(aufgabe, wert);
        if (!wertung.gueltig) {
          fehler.textContent = "Bitte wähle zuerst eine Antwort aus. Es wird noch nichts gewertet.";
          fehler.hidden = false;
          fb.hidden = true;
          return;
        }
        fehler.hidden = true;
        if (modus === "test") {
          lauf.state = testAntwort(lauf.state, aufgabe, wert);
          fs.disabled = true;
          pruef.hidden = true;
        } else if (!lauf.state.beantwortet) {
          lauf.state = Object.assign({}, lauf.state, { beantwortet: true });
        }
        leeren(fb);
        fb.appendChild(el("p", "ww-urteil " + (wertung.richtig ? "feedback-richtig" : "feedback-falsch"), wertung.richtig ? "Richtig." : "Nicht richtig."));
        var rueck = wertung.richtig ? aufgabe.rueckmeldungRichtig : aufgabe.rueckmeldungFalsch;
        if (rueck) { fb.appendChild(el("p", "", rueck)); }
        if (!wertung.richtig) {
          var loes = findeOption(aufgabe, aufgabe.loesungId);
          if (loes) { fb.appendChild(el("p", "", "Richtige Antwort: " + loes.text)); }
        }
        fb.appendChild(el("p", "", "Erklärung: " + wertung.erklaerung));
        if (modus === "test") { fb.appendChild(el("p", "klein", "Deine erste Antwort zu dieser Frage ist gewertet.")); }
        fb.hidden = false;
        var letzte = s.index + 1 >= n;
        weiter.textContent = modus === "uebung"
          ? (letzte ? lauf.neu : "Weiter")
          : (letzte ? "Ergebnis anzeigen" : "Weiter");
        weiter.hidden = false;
        if (modus === "test") { fokus(weiter); }
      });

      weiter.addEventListener("click", function () {
        if (modus === "uebung" && lauf.state.index + 1 >= n) { neustart(modus); }
        else { lauf.state = naechsteFrage(lauf.state); }
        renderLauf(modus, true);
      });

      box.appendChild(form);
      box.appendChild(fb);
      if (mitFokus) { fokus(ueberschrift); }
    }

    /* --- Modi --- */
    var modi = {
      karten: { knopf: doc.getElementById("ww-modus-karten"), bereich: doc.getElementById("ww-bereich-karten"), text: "Lernkarten sind aktiv." },
      uebung: { knopf: doc.getElementById("ww-modus-uebung"), bereich: doc.getElementById("ww-bereich-uebung"), text: "Übung ist aktiv. Sie startet bei Aufgabe 1." },
      test: { knopf: doc.getElementById("ww-modus-test"), bereich: doc.getElementById("ww-bereich-test"), text: "Wissenstest ist aktiv. Er startet bei Frage 1." }
    };
    var status = doc.getElementById("ww-status");

    function setModus(name) {
      Object.keys(modi).forEach(function (m) {
        var aktiv = m === name;
        if (modi[m].knopf) { modi[m].knopf.setAttribute("aria-pressed", aktiv ? "true" : "false"); }
        if (modi[m].bereich) { modi[m].bereich.hidden = !aktiv; }
      });
      if (name !== "karten") { neustart(name); renderLauf(name, false); }
      if (status) { status.textContent = modi[name].text; }
    }

    Object.keys(modi).forEach(function (m) {
      if (modi[m].knopf) { modi[m].knopf.addEventListener("click", function () { setModus(m); }); }
    });
    neustart("uebung");
    neustart("test");
    setModus("karten");
  }

  root.WINDOWS_WERKZEUGKISTE = api;
  if (typeof module !== "undefined" && module.exports) { module.exports = api; }

  if (typeof document !== "undefined") {
    if (document.readyState === "loading") { document.addEventListener("DOMContentLoaded", function () { init(document); }); }
    else { init(document); }
  }
}());
