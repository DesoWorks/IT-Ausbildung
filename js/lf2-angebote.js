/* LF2.7 – Angebote und Bezugsquellen vergleichen. Vollständig fiktive Anbieter, Preise, Lieferzeiten und Servicestufen. */
(function (g) {
  "use strict";
  var ID = "lf2-angebote";
  var KEY = "it-ausbildung.lf2-angebote.v1";
  var STEPS = ["start", "case", "method", "exercise", "finish"];

  var ITEMS = [
    { id: "rechner", label: "Arbeitsplatzrechner Terra Modular" },
    { id: "bildschirm", label: "Bildschirm" },
    { id: "filter", label: "Blickschutzfilter" },
    { id: "tastatur", label: "Tastatur und Maus" },
    { id: "versand", label: "Versand" },
    { id: "einrichtung", label: "Einrichtung vor Ort" }
  ];
  var BUDGET = 1200;
  var OFFERS = [
    { id: "kueste", name: "Küstenblick Bürotechnik", days: 4,
      items: { rechner: 640, bildschirm: 150, filter: 30, tastatur: 40, versand: 0, einrichtung: 90 }, estimates: {},
      points: { kosten: 4, lieferzeit: 4, service: 4, vollstaendigkeit: 5 } },
    { id: "nordwind", name: "Nordwind Systemhaus", days: 10,
      items: { rechner: 610, bildschirm: 140, filter: 30, tastatur: 35, versand: 25, einrichtung: 120 }, estimates: {},
      points: { kosten: 3, lieferzeit: 3, service: 5, vollstaendigkeit: 5 } },
    { id: "klarwerk", name: "Klarwerk Onlinehandel", days: 2,
      items: { rechner: 590, bildschirm: 130, filter: null, tastatur: 30, versand: 15, einrichtung: null }, estimates: { filter: 30, einrichtung: 100 },
      points: { kosten: 5, lieferzeit: 5, service: 2, vollstaendigkeit: 2 } }
  ];
  var CRITERIA = [
    { id: "kosten", label: "Gesamtkosten (vollständig gerechnet)", weight: 4 },
    { id: "lieferzeit", label: "Lieferzeit", weight: 2 },
    { id: "service", label: "Serviceumfang", weight: 3 },
    { id: "vollstaendigkeit", label: "Vollständigkeit (Aufwand für Zukäufe)", weight: 1 }
  ];
  var WEIGHTS = {};
  CRITERIA.forEach(function (c) { WEIGHTS[c.id] = c.weight; });
  var ALT_WEIGHTS = { kosten: 2, lieferzeit: 2, service: 5, vollstaendigkeit: 1 };

  function find(id) { return OFFERS.find(function (x) { return x.id === id; }); }
  function offerSum(id) {
    var o = find(id);
    if (!o) return NaN;
    return ITEMS.reduce(function (s, it) { return s + (o.items[it.id] || 0); }, 0);
  }
  function adjustedSum(id) {
    var o = find(id);
    if (!o) return NaN;
    return ITEMS.reduce(function (s, it) { return s + (o.items[it.id] === null ? (o.estimates[it.id] || 0) : o.items[it.id]); }, 0);
  }
  function total(id, weights) {
    var o = find(id);
    if (!o) return NaN;
    weights = weights || WEIGHTS;
    return CRITERIA.reduce(function (s, c) { return s + o.points[c.id] * weights[c.id]; }, 0);
  }

  var Q = [
    { id: "q1", correct: "ergaenzen",
      prompt: "Angebot C nennt 765 Euro, enthält aber weder Blickschutzfilter noch Einrichtung. Wie machst du es fair vergleichbar?",
      options: [
        { id: "summe765", label: "Die 765 Euro aus dem Angebot übernehmen, weil nur Angebotszahlen zählen.", feedback: "Dann wirkt C billiger, als es für die Praxis ist. Der Filter und die Einrichtung werden trotzdem gebraucht und kosten Geld, nur bei einer anderen Stelle." },
        { id: "ergaenzen", label: "Fehlendes als gekennzeichnete Schätzung ergänzen: 765 + 30 + 100 = 895 Euro.", feedback: "Richtig. Du rechnest alle sechs Bestandteile ein und sagst offen, dass 30 und 100 Euro Schätzungen sind. Erst dann sind die drei Angebote vergleichbar." },
        { id: "ausschluss", label: "Angebot C ausschließen, weil ein unvollständiges Angebot nicht vergleichbar ist.", feedback: "Fehlende Teile sind kein Pflichtkriterium. Sie lassen sich ergänzen oder zukaufen. Ausgeschlossen wird nur, wer ein Pflichtkriterium wie die 1.200 Euro verfehlt." }
      ] },
    { id: "q2", correct: "s960",
      prompt: "Wie hoch sind die Gesamtkosten von Angebot B (Nordwind Systemhaus)? Rechnung: Rechner 610, Bildschirm 140, Filter 30, Tastatur und Maus 35, Versand 25, Einrichtung 120 Euro.",
      options: [
        { id: "s815", label: "815 Euro (nur Geräte und Zubehör)", feedback: "Versand (25 Euro) und Einrichtung (120 Euro) fehlen. Zu den Gesamtkosten gehören alle Bestandteile, die die Praxis bezahlen muss." },
        { id: "s985", label: "985 Euro (Versand doppelt gezählt)", feedback: "Der Versand ist nur einmal enthalten. 610 + 140 + 30 + 35 + 25 + 120 ergibt 960, nicht 985." },
        { id: "s960", label: "960 Euro (alle sechs Bestandteile)", feedback: "Richtig. 610 + 140 + 30 + 35 + 25 + 120 = 960 Euro. Alle Bestandteile werden addiert, auch Versand und Einrichtung." }
      ] },
    { id: "q3", correct: "p38",
      prompt: "Berechne den Nutzwert von Angebot B. Punkte: Kosten 3, Lieferzeit 3, Service 5, Vollständigkeit 5. Gewichte: Kosten 4, Lieferzeit 2, Service 3, Vollständigkeit 1.",
      options: [
        { id: "p38", label: "38 Punkte (3 × 4 + 3 × 2 + 5 × 3 + 5 × 1)", feedback: "Richtig: 12 + 6 + 15 + 5 = 38. Jeder Punktwert wird mit seinem Gewicht multipliziert, danach werden die Teilsummen addiert." },
        { id: "p16", label: "16 Punkte (3 + 3 + 5 + 5)", feedback: "Hier wurden nur die Punkte addiert. Dann zählen alle Kriterien gleich viel, die Gewichte werden ignoriert." },
        { id: "p33", label: "33 Punkte (Vollständigkeit vergessen)", feedback: "Die Zeile Vollständigkeit fehlt: 5 × 1 = 5. Mit allen vier Zeilen ergibt sich 12 + 6 + 15 + 5 = 38." }
      ] },
    { id: "q4", correct: "bvorn",
      prompt: "Die Praxis braucht schnelle Hilfe bei Störungen und ändert die Gewichte: Kosten 2, Lieferzeit 2, Service 5, Vollständigkeit 1. Angebot A hat dann 41 Punkte. Was gilt für Angebot B (Punkte 3 / 3 / 5 / 5)?",
      options: [
        { id: "avorn", label: "A bleibt vorn, denn die Rangfolge ändert sich durch andere Gewichte nie.", feedback: "Doch, sie kann sich ändern. Gewichte sind eine Wertung. Rechne nach: B erreicht 3 × 2 + 3 × 2 + 5 × 5 + 5 × 1 = 42." },
        { id: "cvorn", label: "C gewinnt, weil C die niedrigsten Kosten hat.", feedback: "C hat nur 2 Punkte beim Service. Mit dem hohen Servicegewicht erreicht C 10 + 10 + 10 + 2 = 32 Punkte und fällt zurück." },
        { id: "bvorn", label: "B liegt jetzt vorn: 42 zu 41 Punkten.", feedback: "Richtig. Mit mehr Gewicht auf dem Service gewinnt B knapp. Darum werden Gewichte vorher begründet und offen genannt." }
      ] },
    { id: "q5", correct: "empfehlung",
      prompt: "Nordlicht berichtet der Praxis das Ergebnis mit den ursprünglichen Gewichten (A 41, B 38, C 38 Punkte). Welche Rückmeldung ist am besten?",
      options: [
        { id: "nurpreis", label: "C empfehlen, weil C mit 765 Euro am billigsten ist und das Budget der Praxis schont.", feedback: "Der Preis von 765 Euro ist unvollständig. Mit Filter und Einrichtung sind es etwa 895 Euro, und der Service ist schwach. Der günstigste Angebotspreis ist nicht automatisch das beste Angebot." },
        { id: "empfehlung", label: "A empfehlen (41 Punkte), B als Servicestärke und C als schnellste Option nennen; die Praxis entscheidet.", feedback: "Richtig. Die Empfehlung ist begründet, die Stärken der anderen Angebote sind sichtbar, und die Entscheidung bleibt bei der Kundschaft." },
        { id: "nurzahl", label: "Nur die Punkte nennen (A 41, B 38, C 38), weil Zahlen für sich sprechen und kurz sind.", feedback: "Ohne Kriterien, Gewichte und Rechenweg kann die Praxis die Zahlen nicht prüfen. Der Vergleich gehört mit dazu." }
      ] }
  ];

  function evaluate(a) {
    a = a || {};
    var r = Q.map(function (q) {
      var o = q.options.find(function (x) { return x.id === a[q.id]; });
      return { id: q.id, status: !o ? "empty" : o.id === q.correct ? "correct" : "wrong", optionId: o ? o.id : "", feedback: o ? o.feedback : "" };
    });
    return {
      results: r,
      correct: r.filter(function (x) { return x.status === "correct"; }).length,
      wrong: r.filter(function (x) { return x.status === "wrong"; }).length,
      empty: r.filter(function (x) { return x.status === "empty"; }).length,
      allCorrect: r.every(function (x) { return x.status === "correct"; })
    };
  }

  function progress(s) {
    s = s || {};
    return Math.round(((s.checked ? evaluate(s.answers).correct : 0) + (s.finish ? 1 : 0)) / (Q.length + 1) * 100);
  }

  function progressText(s) {
    s = s || {};
    var done = (s.checked ? evaluate(s.answers).correct : 0) + (s.finish ? 1 : 0);
    return "Fortschritt: " + done + " von " + (Q.length + 1) + " Schritten \u00b7 Abschluss " + (s.finish ? "ge\u00f6ffnet" : "noch nicht ge\u00f6ffnet");
  }

  var api = { ID: ID, KEY: KEY, STEPS: STEPS, ITEMS: ITEMS, BUDGET: BUDGET, OFFERS: OFFERS, CRITERIA: CRITERIA, WEIGHTS: WEIGHTS, ALT_WEIGHTS: ALT_WEIGHTS, QUESTIONS: Q, offerSum: offerSum, adjustedSum: adjustedSum, total: total, evaluate: evaluate, progress: progress, progressText: progressText };
  g.LF2_ANGEBOTE = api;
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  if (!g.document) return;

  var d = g.document;
  var s = { answers: {}, checked: false, finish: false };
  var EMPTY = "Noch nicht beantwortet. Wähle eine Antwort und prüfe erneut.";
  function $(id) { return d.getElementById(id); }
  function load() { try { var x = JSON.parse(g.localStorage.getItem(KEY) || "null"); if (x) s = x; } catch (e) {} }
  function save() { try { g.localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) {} }
  function update() {
    var n = progress(s);
    $("bar").style.width = n + "%";
    $("pct").textContent = progressText(s);
  }
  function go(id) {
    STEPS.forEach(function (x) { $(x).hidden = x !== id; });
    d.querySelectorAll("[data-step]").forEach(function (b) {
      if (b.dataset.step === id) b.setAttribute("aria-current", "step"); else b.removeAttribute("aria-current");
    });
    if (id === "finish") {
      s.finish = true; save();
      $("done").textContent = s.checked && evaluate(s.answers).allCorrect
        ? "Lektion abgeschlossen. Du kannst sie jederzeit wiederholen."
        : "Du kannst den Vergleich erneut ansehen und die Übung später bearbeiten.";
    }
    update();
    $("main").focus();
    g.scrollTo(0, 0);
  }
  function clearFeedback() {
    var b = $("result");
    b.hidden = true; b.textContent = "";
    Q.forEach(function (q) { var fb = $("fb-" + q.id); fb.hidden = true; fb.textContent = ""; });
  }
  function build() {
    Q.forEach(function (q, i) {
      var f = d.createElement("fieldset"), l = d.createElement("legend"), group = d.createElement("div"), fb = d.createElement("p");
      f.className = "question";
      l.textContent = (i + 1) + ". " + q.prompt;
      f.appendChild(l);
      group.className = "opts";
      q.options.forEach(function (o) {
        var label = d.createElement("label"), input = d.createElement("input"), span = d.createElement("span");
        input.type = "radio"; input.name = q.id; input.value = o.id;
        span.textContent = o.label;
        label.className = "opt";
        label.append(input, span);
        input.addEventListener("change", function () { s.answers[q.id] = o.id; s.checked = false; clearFeedback(); save(); update(); });
        group.appendChild(label);
      });
      f.appendChild(group);
      fb.id = "fb-" + q.id; fb.hidden = true; fb.setAttribute("aria-live", "polite");
      f.appendChild(fb);
      $("questions").appendChild(f);
    });
  }
  function render() {
    var ev = evaluate(s.answers), box = $("result"), h = d.createElement("h3");
    box.textContent = "";
    h.textContent = ev.allCorrect ? "Alle Antworten richtig" : ev.correct ? "Teilweise richtig" : ev.empty === Q.length ? "Noch keine Antwort gewählt" : "Noch nicht richtig";
    box.appendChild(h);
    ev.results.forEach(function (r, i) {
      var q = Q[i], o = q.options.find(function (x) { return x.id === r.optionId; }), p = d.createElement("p");
      p.textContent = (r.status === "correct" ? "✓ Richtig: " : r.status === "wrong" ? "✗ Noch nicht richtig: " : "○ Nicht beantwortet: ") +
        "Aufgabe " + (i + 1) + " – " + q.prompt + " " + (o ? "Deine Antwort: " + o.label + " " : "") + (o ? o.feedback : EMPTY);
      box.appendChild(p);
      var fb = $("fb-" + q.id);
      fb.textContent = o ? o.feedback : EMPTY;
      fb.hidden = false;
    });
    var p = d.createElement("p");
    p.textContent = ev.empty ? ev.empty + " Aufgabe(n) sind unbeantwortet." : ev.allCorrect ? "Du hast die drei Angebote vollständig, nachvollziehbar und mit offenen Annahmen verglichen." : "Lies die Erklärungen und versuche es erneut. Kein Zeitdruck.";
    box.appendChild(p);
    box.hidden = false;
  }
  function check() {
    s.answers = {};
    Q.forEach(function (q) { var i = d.querySelector('input[name="' + q.id + '"]:checked'); if (i) s.answers[q.id] = i.value; });
    s.checked = true; render(); save(); update();
  }
  function reset() {
    s = { answers: {}, checked: false, finish: false };
    d.querySelectorAll('#questions input[type="radio"]').forEach(function (i) { i.checked = false; });
    clearFeedback();
    $("done").textContent = "";
    save(); update();
  }

  d.querySelectorAll("[data-step]").forEach(function (b) { b.addEventListener("click", function () { go(b.dataset.step); }); });
  d.querySelectorAll("[data-next]").forEach(function (b) { b.addEventListener("click", function () { go(b.dataset.next); }); });
  $("check").addEventListener("click", check);
  $("reset").addEventListener("click", reset);
  $("reset-all").addEventListener("click", function () {
    if (g.confirm("Gespeicherten Lernfortschritt dieser Lektion zurücksetzen?")) { reset(); go("start"); }
  });
  load();
  build();
  Q.forEach(function (q) {
    var o = q.options.find(function (x) { return x.id === s.answers[q.id]; });
    if (o) { var i = d.querySelector('input[name="' + q.id + '"][value="' + o.id + '"]'); if (i) i.checked = true; }
  });
  if (s.checked) render();
  update();
})(typeof window !== "undefined" ? window : globalThis);
