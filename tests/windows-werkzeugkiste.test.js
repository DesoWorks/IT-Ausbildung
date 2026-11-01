"use strict";
/* Modultest Windows-Werkzeugkiste. Nur Node-Bordmittel, kein Browser.
   Aufruf: node tests/windows-werkzeugkiste.test.js */
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const wurzel = path.join(__dirname, "..");
const lies = (rel) => fs.readFileSync(path.join(wurzel, rel), "utf8");

function laden(rel) {
  const sandbox = { module: { exports: {} } };
  sandbox.globalThis = sandbox;
  vm.createContext(sandbox);
  vm.runInContext(lies(rel), sandbox, { filename: rel });
  assert.equal(typeof sandbox.document, "undefined", "Test läuft bewusst ohne DOM");
  return { exports: sandbox.module.exports, sandbox };
}

const datenGeladen = laden("js/windows-werkzeugkiste-daten.js");
const DATEN = datenGeladen.exports;
const logikGeladen = laden("js/windows-werkzeugkiste.js");
const L = logikGeladen.exports;
const klon = (x) => JSON.parse(JSON.stringify(x));
/* Objekte aus dem vm-Kontext haben einen anderen Prototyp: strukturell über JSON vergleichen. */
const deepEqual = (ist, soll, meldung) => assert.deepEqual(klon(ist), klon(soll), meldung);
function nurDaten(x, pfad) {
  const t = typeof x;
  assert.ok(t !== "function" && t !== "undefined" && t !== "symbol", "Nicht serialisierbarer Wert bei " + pfad);
  if (x !== null && t === "object") { Object.keys(x).forEach((k) => nurDaten(x[k], pfad + "." + k)); }
}

let anzahl = 0;
function test(name, fn) {
  try { fn(); anzahl += 1; console.log("ok - " + name); }
  catch (e) { console.error("FEHLER - " + name + "\n" + (e && e.stack ? e.stack : e)); process.exitCode = 1; }
}

const SHORTCUTS = ["win-l", "win-r", "win-e", "win-i", "win-d", "win-x", "strg-umschalt-esc"];
const BEFEHLE = ["ncpa-cpl", "sysdm-cpl", "powercfg-cpl", "compmgmt-msc", "secpol-msc", "devmgmt-msc", "services-msc", "gpedit-msc", "msconfig"];

/* ---------- 1. Daten ---------- */
test("Namespace und CommonJS-Export der Daten sind dasselbe Objekt", () => {
  assert.equal(datenGeladen.sandbox.WINDOWS_WERKZEUGKISTE_DATEN, DATEN);
  nurDaten(DATEN, "DATEN");
});

test("alle 16 Pflichtkarten vorhanden, Arten sauber getrennt, IDs eindeutig", () => {
  const ids = DATEN.karten.map((k) => k.id);
  assert.equal(new Set(ids).size, ids.length);
  assert.equal(DATEN.karten.length, 16);
  SHORTCUTS.forEach((id) => assert.equal(DATEN.karten.find((k) => k.id === id).art, "shortcut", id));
  BEFEHLE.forEach((id) => assert.equal(DATEN.karten.find((k) => k.id === id).art, "befehl", id));
});

test("gelieferte Daten sind gültig", () => {
  const r = L.validiereDaten(DATEN);
  deepEqual(r.fehler, []);
  assert.equal(r.ok, true);
});

test("Normalisierung gegen die Fachquelle: Texte unverändert, Zuordnung nachvollziehbar", () => {
  const quelle = JSON.parse(lies("docs/inhalte/windows-werkzeugkiste.json"));
  quelle.karten.forEach((q) => {
    const k = DATEN.karten.find((x) => x.id === q.id);
    assert.ok(k, q.id);
    assert.equal(k.erklaerung, q.zweck);
    assert.equal(k.praxis, q.situation);
    assert.equal(k.eingabe, q.eingabe);
    assert.equal(k.titel, q.titel);
    if (q.sicherheit) { assert.ok(k.hinweise.some((h) => h.includes(q.sicherheit)), q.id + " Sicherheit"); }
    if (q.edition) { assert.ok(k.hinweise.some((h) => h.includes(q.edition)), q.id + " Edition"); }
    deepEqual(k.quellen, [], "keine erfundenen Quellen");
  });
  assert.equal(DATEN.uebungen.length, quelle.uebungen.length);
  quelle.uebungen.forEach((q) => {
    const u = DATEN.uebungen.find((x) => x.id === q.id);
    assert.equal(u.frage, q.situation);
    assert.equal(u.loesungId, q.richtigeAntwort);
    deepEqual(u.kartenIds, [q.richtigeAntwort]);
    assert.equal(u.rueckmeldungRichtig, q.rueckmeldungRichtig);
    assert.equal(u.rueckmeldungFalsch, q.rueckmeldungFalsch);
    const karte = DATEN.karten.find((k) => k.id === q.richtigeAntwort);
    assert.equal(u.art, karte.art);
    assert.ok(u.optionen.length >= 2);
    assert.ok(u.optionen.every((o) => DATEN.karten.find((k) => k.id === o.id).art === u.art));
    assert.equal(u.optionen.find((o) => o.id === u.loesungId).text, karte.eingabe);
  });
  assert.equal(DATEN.quiz.length, quelle.quiz.length);
  quelle.quiz.forEach((q) => {
    const a = DATEN.quiz.find((x) => x.id === q.id);
    assert.equal(a.frage, q.frage);
    deepEqual(a.optionen.map((o) => o.text), q.optionen);
    assert.equal(a.loesungId, "option-" + q.richtigeAntwort);
    assert.equal(a.optionen.find((o) => o.id === a.loesungId).text, q.optionen[q.richtigeAntwort]);
    assert.equal(a.rueckmeldungRichtig, q.rueckmeldungRichtig);
  });
});

test("Quiz-Zuordnung Frage -> Karte (Thema der Frage zählt)", () => {
  const erwartet = {
    "quiz-1": "win-l", "quiz-2": "win-r", "quiz-3": "win-e", "quiz-4": "sysdm-cpl", "quiz-5": "powercfg-cpl",
    "quiz-6": "compmgmt-msc", "quiz-7": "secpol-msc", "quiz-8": "strg-umschalt-esc", "quiz-9": "ncpa-cpl", "quiz-10": "powercfg-cpl",
    "quiz-11": "gpedit-msc", "quiz-12": "msconfig"
  };
  Object.keys(erwartet).forEach((id) => deepEqual(DATEN.quiz.find((q) => q.id === id).kartenIds, [erwartet[id]], id));
});

test("Edition und Sicherheit sind auf den Karten sichtbar", () => {
  const secpol = DATEN.karten.find((k) => k.id === "secpol-msc");
  assert.ok(secpol.hinweise.some((h) => h.includes("Nicht in jeder Windows-Edition")));
  assert.ok(secpol.hinweise.some((h) => h.startsWith("Sicherheit:")));
  assert.ok(DATEN.allgemeineHinweise.length === 3);
});

test("kein HTML und keine Befehlsausführung in Fachtexten", () => {
  const alles = JSON.stringify(DATEN);
  assert.ok(!/<\/?[a-z][^>]*>/i.test(alles), "kein HTML in Daten");
  assert.ok(!/https?:\/\//i.test(alles), "keine erfundenen URLs");
});

test("Daten werden abgelehnt: ungültige art, leere Arrays, fehlende Felder, kaputte Referenzen, doppelte IDs", () => {
  const fall = (mut, teil) => {
    const d = klon(DATEN); mut(d);
    const r = L.validiereDaten(d);
    assert.equal(r.ok, false, teil);
    assert.ok(r.fehler.some((f) => f.toLowerCase().includes(teil.toLowerCase())), teil + " in " + JSON.stringify(r.fehler));
  };
  fall((d) => { d.karten[0].art = "makro"; }, "art muss");
  fall((d) => { d.quiz = []; }, "quiz fehlt");
  fall((d) => { d.uebungen = []; }, "uebungen fehlt");
  fall((d) => { d.karten = []; }, "karten fehlt");
  fall((d) => { delete d.karten[2].praxis; }, "praxis fehlt");
  fall((d) => { delete d.karten[2].erklaerung; }, "erklaerung fehlt");
  fall((d) => { d.karten[3].hinweise = "text"; }, "hinweise");
  fall((d) => { d.karten[3].begriffe = [{ begriff: "x" }]; }, "begriffe");
  fall((d) => { d.karten[1].id = d.karten[0].id; }, "doppelte id");
  fall((d) => { d.karten.pop(); }, "Pflichtkarte fehlt");
  fall((d) => { d.karten.find((k) => k.id === "win-l").art = "befehl"; }, "falsche art");
  fall((d) => { d.uebungen[0].kartenIds = ["gibt-es-nicht"]; }, "unbekannte Karte");
  fall((d) => { d.uebungen[0].kartenIds = []; }, "kartenIds");
  fall((d) => { d.uebungen[0].kartenIds = ["ncpa-cpl"]; }, "passt nicht zur art");
  fall((d) => { d.quiz[0].loesungId = "nix"; }, "loesungId");
  fall((d) => { d.quiz[0].optionen[1].id = d.quiz[0].optionen[0].id; }, "doppelte Options-id");
  fall((d) => { d.quiz[0].optionen = [d.quiz[0].optionen[0]]; }, "mindestens zwei");
  fall((d) => { d.quiz[1].id = d.quiz[0].id; }, "doppelte id");
  fall((d) => { d.quiz[0].erklaerung = ""; }, "erklaerung fehlt");
  fall((d) => { d.quiz[0].frage = "  "; }, "frage fehlt");
  [null, undefined, 42, "x", []].forEach((x) => assert.equal(L.validiereDaten(x).ok, false));
});

/* ---------- 2. Bewertung ---------- */
test("jede richtige und jede falsche Option wird korrekt gewertet, Erklärung vorhanden, Eingaben unverändert", () => {
  [].concat(DATEN.uebungen, DATEN.quiz).forEach((a) => {
    const vorher = JSON.stringify(a);
    a.optionen.forEach((o) => {
      const r = L.bewerteAntwort(a, o.id);
      assert.equal(r.gueltig, true);
      assert.equal(r.richtig, o.id === a.loesungId, a.id + " " + o.id);
      assert.ok(r.erklaerung.length > 0, "Lösungserklärung bei " + a.id);
    });
    assert.equal(JSON.stringify(a), vorher, "keine Mutation");
    assert.equal(a.optionen.filter((o) => L.bewerteAntwort(a, o.id).richtig).length, 1, "genau eine richtige Option");
  });
});

test("fehlende oder unbekannte Auswahl wird nicht gewertet", () => {
  const a = DATEN.quiz[0];
  [null, undefined, "", "unbekannt", 0, {}].forEach((x) => {
    deepEqual(L.bewerteAntwort(a, x), { gueltig: false, richtig: false, erklaerung: "" });
  });
  assert.equal(L.bewerteAntwort(null, "option-0").gueltig, false);
  assert.equal(L.bewerteAntwort({}, "option-0").gueltig, false);
});

/* ---------- 3. Testzustand ---------- */
test("neuerTest: gültige und ungültige Anzahl", () => {
  deepEqual(L.neuerTest(3), { index: 0, punkte: 0, beantwortet: false, fertig: false, anzahl: 3 });
  [0, -1, 1.5, NaN, null, undefined, "3"].forEach((x) => assert.equal(L.neuerTest(x).fertig, true, String(x)));
  assert.equal(L.neuerTest(0).anzahl, 0);
});

test("testAntwort zählt nur die erste gültige Antwort genau einmal und mutiert nicht", () => {
  const a = DATEN.quiz[0];
  const falsch = a.optionen.find((o) => o.id !== a.loesungId).id;
  const s0 = L.neuerTest(2);
  const eingefroren = klon(s0);
  assert.equal(L.testAntwort(s0, a, "unbekannt"), s0, "ungültig lässt State unverändert");
  assert.equal(L.testAntwort(s0, a, null), s0);
  const s1 = L.testAntwort(s0, a, a.loesungId);
  deepEqual(s0, eingefroren, "Eingabe-State unverändert");
  deepEqual(s1, { index: 0, punkte: 1, beantwortet: true, fertig: false, anzahl: 2 });
  assert.equal(L.testAntwort(s1, a, a.loesungId), s1, "doppelte Abgabe zählt nicht");
  assert.equal(L.testAntwort(s1, a, falsch), s1, "spätere Abgabe ändert nichts");
  const sf = L.testAntwort(s0, a, falsch);
  assert.equal(sf.punkte, 0);
  assert.equal(sf.beantwortet, true);
});

test("naechsteFrage: ohne Antwort unverändert, sonst weiter, am Ende fertig", () => {
  const a = DATEN.quiz[0];
  const s0 = L.neuerTest(2);
  assert.equal(L.naechsteFrage(s0), s0, "Weiter ohne Abgabe");
  const s1 = L.naechsteFrage(L.testAntwort(s0, a, a.loesungId));
  deepEqual(s1, { index: 1, punkte: 1, beantwortet: false, fertig: false, anzahl: 2 });
  const s2 = L.naechsteFrage(L.testAntwort(s1, a, a.optionen.find((o) => o.id !== a.loesungId).id));
  assert.equal(s2.fertig, true);
  assert.ok(s2.index < s2.anzahl, "Index bleibt im gültigen Bereich");
  assert.equal(s2.punkte, 1);
  assert.equal(L.naechsteFrage(s2), s2, "fertiger State bleibt unverändert");
  assert.equal(L.testAntwort(s2, a, a.loesungId), s2, "nach dem Ende wird nichts mehr gezählt");
});

test("Neustart: mindestens drei vollständige Durchläufe ohne Sperre, auch nach falschen Antworten", () => {
  const fragen = DATEN.quiz;
  const ergebnisse = [];
  for (let durchlauf = 0; durchlauf < 4; durchlauf += 1) {
    let s = L.neuerTest(fragen.length);
    deepEqual(s, { index: 0, punkte: 0, beantwortet: false, fertig: false, anzahl: fragen.length }, "frischer Zustand in Durchlauf " + durchlauf);
    const richtigeAnzahl = durchlauf; /* 0, 1, 2, 3 richtige Antworten, Rest bewusst falsch */
    fragen.forEach((f, i) => {
      assert.equal(s.index, i);
      const wahl = i < richtigeAnzahl ? f.loesungId : f.optionen.find((o) => o.id !== f.loesungId).id;
      s = L.testAntwort(s, f, wahl);
      s = L.naechsteFrage(s);
    });
    assert.equal(s.fertig, true);
    ergebnisse.push(s.punkte);
  }
  deepEqual(ergebnisse, [0, 1, 2, 3]);
});

/* ---------- 4. Statische Verträge ---------- */
test("HTML: Plattform, Skripte in Reihenfolge, Rücklink, Modi, Regionen", () => {
  const h = lies("module/windows-werkzeugkiste.html");
  assert.ok(h.includes('<html lang="de">'));
  assert.ok(h.includes('data-page="windows-werkzeugkiste"') && h.includes('data-base="../"'));
  assert.ok(h.includes('class="skip-link" href="#hauptinhalt"'));
  assert.ok(h.includes('<main id="hauptinhalt" tabindex="-1">'));
  assert.ok(h.includes('<a class="zurueck-link" href="../index.html">Zur Themenübersicht</a>'));
  assert.ok(h.includes("<span data-version></span>"));
  const reihenfolge = ["module-daten.js", "fortschritt.js", "navigation.js", "glossar-daten.js", "anzeige-glossar.js", "version.js", "windows-werkzeugkiste-daten.js", "windows-werkzeugkiste.js"];
  let pos = -1;
  reihenfolge.forEach((s) => {
    const p = h.indexOf('<script src="../js/' + s + '"></script>');
    assert.ok(p > pos, "Skript " + s + " fehlt oder steht an falscher Stelle");
    pos = p;
  });
  ["ww-modus-karten", "ww-modus-uebung", "ww-modus-test"].forEach((id) => {
    assert.ok(new RegExp('<button type="button" class="knopf" id="' + id + '" aria-pressed="(true|false)" aria-controls="ww-bereich-').test(h), id);
  });
  ["ww-bereich-karten", "ww-bereich-uebung", "ww-bereich-test", "ww-liste-shortcut", "ww-liste-befehl", "ww-uebung-inhalt", "ww-test-inhalt"].forEach((id) => assert.ok(h.includes('id="' + id + '"'), id));
  assert.ok(/id="ww-status"[^>]*role="status"[^>]*aria-live="polite"/.test(h));
  assert.ok(/id="ww-fehler"[^>]*role="alert"/.test(h));
  assert.ok(h.includes("<noscript>"));
  assert.ok(h.includes("Tastenkombinationen") && h.includes("Ausführen-Befehle"));
  assert.ok(!/<script(?![^>]*src=)/i.test(h), "kein Inline-Skript");
  assert.ok(!/https?:\/\//i.test(h), "keine externen Ressourcen");
});

test("Logikdatei: Formularbeschriftung, Feedbackregionen, keine unsicheren APIs", () => {
  const j = lies("js/windows-werkzeugkiste.js");
  const d = lies("js/windows-werkzeugkiste-daten.js");
  [j, d].forEach((code) => {
    assert.ok(!/innerHTML|outerHTML|insertAdjacentHTML|document\.write/.test(code), "kein HTML-Einfügen");
    assert.ok(!/\beval\s*\(|new Function|\bfetch\s*\(|XMLHttpRequest|child_process|localStorage|sessionStorage|window\.open|location\s*=/.test(code), "keine unsicheren/externen Zugriffe");
  });
  assert.ok(j.includes('el("legend"') && j.includes('el("fieldset"') && j.includes('el("label"'));
  assert.ok(j.includes('"role", "status"') && j.includes('"aria-live", "polite"'));
  assert.ok(j.includes("tabIndex = -1"));
  assert.ok(j.includes('"Antwort prüfen"') && j.includes("Wissenstest neu starten") && j.includes("Übung neu starten"));
  assert.ok(j.includes("noopener noreferrer") && j.includes("https:"), "Quellenlinks nur über HTTPS");
});

test("CSS: nur modulbezogene Selektoren, gemeinsame Farbvariablen, Fokus nicht entfernt", () => {
  const css = lies("css/windows-werkzeugkiste.css");
  const ohneKommentar = css.replace(/\/\*[\s\S]*?\*\//g, "");
  const regeln = ohneKommentar.match(/[^{}]+\{/g).map((s) => s.trim());
  regeln.forEach((sel) => {
    if (sel.startsWith("@media")) { return; }
    assert.ok(sel.split(",").every((t) => t.trim().startsWith('[data-page="windows-werkzeugkiste"]')), "nicht gescoped: " + sel);
  });
  assert.ok(!/#[0-9a-f]{3,8}\b/i.test(ohneKommentar), "keine festen Farben");
  assert.ok(/var\(--farbe-/.test(ohneKommentar));
  assert.ok(!/outline\s*:\s*(none|0)/i.test(ohneKommentar), "Fokusmarkierung bleibt");
  assert.ok(!/:focus\s*\{[^}]*outline/.test(ohneKommentar));
});

test("Isolation: Modultest und Moduldateien laden weder Katalog noch Startseite (Phase 3 ist nicht integriert)", () => {
  [fs.readFileSync(__filename, "utf8"), lies("js/windows-werkzeugkiste.js"), lies("js/windows-werkzeugkiste-daten.js")].forEach((code) => {
    assert.ok(!/require\([^)]*(module-daten|startseite|navigation)/.test(code));
  });
});

console.log("\n" + anzahl + " Prüfungen bestanden" + (process.exitCode ? ", mit Fehlern" : ""));
