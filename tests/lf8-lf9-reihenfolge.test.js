"use strict";
/* Paket 3: Anzeigereihenfolge ist vom Speicher entkoppelt.
 * Vergleich mit dem Stand 61be195 (tests/fixtures/lf8-lf9-vor-paket3.json):
 * IDs, Schlüssel, richtige IDs, Hashes und Auswertung alter Speicherstände bleiben gleich. */
const assert = require("node:assert/strict");
const fs = require("node:fs"), path = require("node:path");
const root = path.resolve(__dirname, "..");
const fx = JSON.parse(fs.readFileSync(path.join(__dirname, "fixtures", "lf8-lf9-vor-paket3.json"), "utf8"));
assert.equal(fx.commit, "61be195");

function seeded(seed) { let a = seed >>> 0; return () => { a = (a + 0x6D2B79F5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; } // mulberry32, deterministisch
function isPermutation(order, n) { return order.length === n && [...order].sort((a, b) => a - b).every((v, i) => v === i); }

// 1) Lektionen: Struktur, IDs, Schlüssel, Auswertung alter Stände
let lessons = 0;
for (const [id, ref] of Object.entries(fx.lektionen)) {
  const L = require(path.join(root, "js", id + ".js"));
  assert.equal(L.KEY, ref.key, id + " Schlüssel");
  assert.equal(L.QUESTIONS.length, ref.fragen.length, id + " Fragenzahl");
  const correct = {}, wrong = {};
  ref.fragen.forEach((r, i) => {
    const q = L.QUESTIONS[i];
    assert.equal(q.id, r.id, id + " Frage-ID");
    assert.equal(q.correct, r.correct, id + " richtige ID " + r.id);
    assert.deepEqual(q.options.map(o => o.id), r.optionen, id + " Options-IDs und Arrayreihenfolge " + r.id);
    correct[r.id] = r.correct; wrong[r.id] = r.optionen.find(x => x !== r.correct);
  });
  const full = { answers: correct, checked: true, finish: true, step: "finish" };
  assert.equal(L.evaluate(full.answers).allCorrect, true);
  assert.equal(L.progress(full), ref.fragen.length + 1, id + " voller alter Stand");
  assert.equal(L.evaluate(wrong).wrong, ref.fragen.length);
  assert.equal(L.progress({ answers: wrong, checked: true, finish: true }), 1, id + " falscher Stand: nur Abschluss");
  const partial = { ...correct, [ref.fragen[1].id]: wrong[ref.fragen[1].id] }; delete partial[ref.fragen[3].id];
  const ev = L.evaluate(partial);
  assert.deepEqual([ev.correct, ev.wrong, ev.empty], [2, 1, 1], id + " Teilstand");
  assert.deepEqual(L.normalize({ answers: correct, checked: true, finish: true, step: "exercise" }).answers, correct, id + " normalize akzeptiert alte Antworten");
  // Mischung: gültige Permutation, deterministisch, nicht starr
  for (let seed = 1; seed <= 20; seed++) assert.ok(isPermutation(L.mischen(3, seeded(seed)), 3));
  assert.deepEqual(L.mischen(3, seeded(7)), L.mischen(3, seeded(7)), "gleicher Zufall gleiche Folge");
  lessons++;
}
assert.equal(lessons, 16);

// 2) Kontrollen
for (const f of ["lf8", "lf9"]) {
  const ref = fx.kontrollen[f];
  const K = require(path.join(root, "js", f + "-kontrolle.js"));
  const src = fs.readFileSync(path.join(root, "js", f + "-kontrolle.js"), "utf8");
  assert.equal(K.KEY, ref.key);
  assert.equal(src.match(/HASH = "([0-9a-f]{64})"/)[1], ref.hash, f + " Passwort-Hash unverändert");
  assert.equal(K.FRAGEN.length, ref.fragen.length);
  const alt = {}, falsch = {}, teil = {};
  ref.fragen.forEach((r, i) => {
    assert.equal(K.FRAGEN[i].quelle, r.quelle, f + " quelle " + i);
    assert.equal(K.FRAGEN[i].richtig, r.richtig, f + " richtig " + i);
    assert.equal(K.FRAGEN[i].optionen.length, r.n);
    alt[i] = r.richtig; falsch[i] = r.richtig === "a" ? "b" : "a";
    if (i % 4) teil[i] = r.richtig;
  });
  assert.equal(K.evaluate(alt).allCorrect, true);
  assert.equal(K.evaluate(falsch).wrong, 24);
  const t = K.evaluate(teil);
  assert.equal(t.correct, 18); assert.equal(t.empty, 6);
  assert.deepEqual(K.normalize({ answers: alt, finish: true }).answers, alt, f + " alter abgegebener Stand bleibt");
  assert.equal(K.normalize({ answers: alt, finish: true }).finish, true);
  // Anzeigeinvarianten: Buchstabe a/b/c bleibt Speicherwert, Mischung ist Permutation
  const orders = new Set();
  for (let seed = 1; seed <= 200; seed++) { const o = K.mischen(3, seeded(seed)); assert.ok(isPermutation(o, 3)); orders.add(o.join("")); }
  assert.equal(orders.size, 6, "alle sechs Anordnungen kommen vor");
  // Position der richtigen Antwort ist nicht durch Wiederholung a-b-c erratbar
  const sicht = ref.fragen.map((r, i) => K.mischen(3, seeded(1000 + i)).indexOf(r.richtig.charCodeAt(0) - 97));
  assert.ok(new Set(sicht).size === 3 && sicht.join("") !== "012".repeat(8), f + " sichtbare Positionen nicht starr");
}

// 3) Fortschritt: feste Legacy-Lösungen unverändert
const fortschritt = fs.readFileSync(path.join(root, "js", "fortschritt.js"), "utf8");
const abc = '["a", "b", "c", "a", "b", "c", "a", "b", "c", "a", "b", "c", "a", "b", "c", "a", "b", "c", "a", "b", "c", "a", "b", "c"]';
assert.ok(fortschritt.includes('"lf8-kontrolle": ' + abc) && fortschritt.includes('"lf9-kontrolle": ' + abc), "fortschritt.js Legacy-Lösungen");

console.log("LF8/LF9 Reihenfolge: 16 Lektionen + 2 Kontrollen kompatibel zu 61be195, alte Stände gleich bewertet, Mischung gültig.");
