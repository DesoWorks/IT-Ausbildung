/* LF2.8 – Ein nachvollziehbares Angebot erstellen. Vollständig fiktive Mengen, Einzelpreise und Zuschlagssätze. Alle Beträge intern in ganzen Cent. */
(function (g) {
  "use strict";
  var ID = "lf2-angebot";
  var KEY = "it-ausbildung.lf2-angebot.v1";
  var STEPS = ["start", "case", "positions", "surcharges", "exercise", "finish"];

  // Positionen: Menge und Einzelpreis (netto, in Cent). Einzelpreise stammen aus dem fiktiven Angebot A der Lektion LF2.7.
  var ITEMS = [
    { id: "rechner", label: "Arbeitsplatzrechner Terra Modular", qty: 3, unit: 64000 },
    { id: "bildschirm", label: "Bildschirm", qty: 3, unit: 15000 },
    { id: "filter", label: "Blickschutzfilter", qty: 3, unit: 3000 },
    { id: "tastatur", label: "Tastatur und Maus", qty: 3, unit: 4000 },
    { id: "versand", label: "Versand (Pauschale)", qty: 1, unit: 0 },
    { id: "einrichtung", label: "Einrichtung vor Ort", qty: 3, unit: 9000 }
  ];
  var RATE_HK = 7;      // Handlungskostenzuschlag in Prozent (fiktiv, vorgegeben), Basis: Summe der Positionen
  var RATE_GEWINN = 5;  // Gewinnzuschlag in Prozent (fiktiv, vorgegeben), Basis: Selbstkosten
  var WORKPLACES = 3;
  var BUDGET_PER_WORKPLACE = 120000; // 1.200 Euro Beispielbudget je Arbeitsplatz (netto angenommen)

  function lineTotal(id) {
    var it = ITEMS.find(function (x) { return x.id === id; });
    return it ? it.qty * it.unit : NaN;
  }
  function positionsSum() {
    return ITEMS.reduce(function (s, it) { return s + it.qty * it.unit; }, 0);
  }
  // Prozentbetrag, kaufmännisch auf volle Cent gerundet (ganzzahlig, daher ohne Gleitkomma-Fehler)
  function percent(cents, rate) {
    return Math.floor((cents * rate + 50) / 100);
  }
  function calc() {
    var base = positionsSum();
    var hk = percent(base, RATE_HK);
    var selbst = base + hk;
    var gewinn = percent(selbst, RATE_GEWINN);
    return { positions: base, hk: hk, selbstkosten: selbst, gewinn: gewinn, netto: selbst + gewinn };
  }
  function fmt(cents) {
    var e = Math.floor(cents / 100), c = cents % 100;
    return String(e).replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "," + (c < 10 ? "0" : "") + c;
  }

  var Q = [
    { id: "q1", correct: "n2850",
      prompt: "Berechne die Summe aller Positionen (netto): 3 Rechner zu 640 Euro, 3 Bildschirme zu 150 Euro, 3 Filter zu 30 Euro, 3 Tastaturen mit Maus zu 40 Euro, Versand 0 Euro, 3 Einrichtungen zu 90 Euro.",
      options: [
        { id: "n950", label: "950,00 Euro", feedback: "Das sind die Kosten für einen einzigen Arbeitsplatz. Das Angebot gilt aber für drei Arbeitsplätze, also wird jede Position mit der Menge multipliziert: Menge × Einzelpreis." },
        { id: "n2580", label: "2.580,00 Euro", feedback: "Hier fehlt eine Position. Mit Rechner 1.920, Bildschirm 450, Filter 90, Tastatur und Maus 120 und Einrichtung 270 sind es 2.850 Euro, denn die Einrichtung (3 × 90 = 270) gehört dazu." },
        { id: "n2850", label: "2.850,00 Euro", feedback: "Richtig. 1.920 + 450 + 90 + 120 + 0 + 270 = 2.850 Euro. Jede Position wird erst mit ihrer Menge multipliziert, danach werden alle Gesamtpreise addiert." }
      ] },
    { id: "q2", correct: "z19950",
      prompt: "Auf die Positionssumme von 2.850,00 Euro kommt ein Handlungskostenzuschlag von 7 % (fiktiver Satz). Wie hoch ist der Zuschlagsbetrag?",
      options: [
        { id: "z19950", label: "199,50 Euro (2.850,00 × 7 ÷ 100)", feedback: "Richtig. 7 Prozent bedeuten 7 von 100 Teilen: 2.850 × 7 = 19.950, geteilt durch 100 ergibt 199,50 Euro." },
        { id: "z1995", label: "19,95 Euro (2.850,00 × 7 ÷ 1.000)", feedback: "Das Komma ist um eine Stelle verrutscht. Überschlag: 10 % von 2.850 Euro wären 285 Euro, 7 % liegen etwas darunter, also bei rund 200 Euro und nicht bei 19,95 Euro." },
        { id: "z304950", label: "3.049,50 Euro (2.850,00 + 199,50)", feedback: "Das ist nicht der Zuschlag, sondern schon die Summe aus Positionen und Zuschlag (2.850,00 + 199,50). Gefragt ist nur der Zuschlagsbetrag." }
      ] },
    { id: "q3", correct: "g15248",
      prompt: "Die Selbstkosten betragen 3.049,50 Euro. Darauf wird ein Gewinnzuschlag von 5 % gerechnet (fiktiver Satz, Basis sind die Selbstkosten). Wie lautet der Zuschlagsbetrag, kaufmännisch auf volle Cent gerundet?",
      options: [
        { id: "g14250", label: "142,50 Euro (5 % von 2.850,00 Euro)", feedback: "Hier wurde die falsche Basis genommen. Im Übungsfall bezieht sich der Gewinnzuschlag auf die Selbstkosten, also auf 3.049,50 Euro, nicht auf die reine Positionssumme." },
        { id: "g15248", label: "152,48 Euro (152,475 kaufmännisch gerundet)", feedback: "Richtig. 3.049,50 × 5 ÷ 100 = 152,475. Die dritte Nachkommastelle ist eine 5, deshalb wird kaufmännisch aufgerundet auf 152,48 Euro." },
        { id: "g15247", label: "152,47 Euro (152,475 abgeschnitten)", feedback: "Abschneiden ist keine kaufmännische Rundung. Bei einer 5 an der dritten Nachkommastelle wird aufgerundet, also 152,48 Euro." }
      ] },
    { id: "q4", correct: "e320198",
      prompt: "Wie hoch ist der Nettoangebotspreis? Positionssumme 2.850,00 Euro, Handlungskostenzuschlag 199,50 Euro, Gewinnzuschlag 152,48 Euro.",
      options: [
        { id: "e319200", label: "3.192,00 Euro", feedback: "Das entspricht 12 % Gesamtzuschlag auf 2.850 Euro, weil die beiden Sätze 7 % und 5 % einfach addiert wurden. Der Gewinn wird aber auf die Selbstkosten gerechnet, nicht auf die Positionssumme. Deshalb ergibt sich ein anderer Betrag." },
        { id: "e304950", label: "3.049,50 Euro", feedback: "Das sind die Selbstkosten. Der Gewinnzuschlag von 152,48 Euro fehlt noch, erst dann ist es der Angebotspreis." },
        { id: "e320198", label: "3.201,98 Euro", feedback: "Richtig. 2.850,00 + 199,50 = 3.049,50 Euro Selbstkosten, dazu 152,48 Euro Gewinnzuschlag ergibt 3.201,98 Euro netto. Das liegt unter dem Beispielbudget von 3 × 1.200 = 3.600 Euro." }
      ] },
    { id: "q5", correct: "pruefen",
      prompt: "Eine Kollegin hat denselben Auftrag gerechnet und kommt auf 3.100,00 Euro statt 3.201,98 Euro. Was machst du?",
      options: [
        { id: "angleichen", label: "Meinen Betrag auf 3.100,00 Euro ändern, damit beide Angebote gleich sind und es keine Rückfragen gibt.", feedback: "Ein Betrag darf nicht angepasst werden, nur damit er passt. Erst muss klar sein, wo der Unterschied entsteht." },
        { id: "pruefen", label: "Beide Rechenwege Schritt für Schritt vergleichen: Positionssumme, Zuschläge, Selbstkosten, Rundung.", feedback: "Richtig. Ein sichtbarer Rechenweg macht den Fehler auffindbar, zum Beispiel eine fehlende Menge, eine falsche Basis oder eine abgeschnittene Rundung. Erst danach wird der richtige Betrag festgelegt." },
        { id: "uebernehmen", label: "Den Betrag der Kollegin übernehmen, weil sie schneller fertig war und es keinen Streit gibt.", feedback: "Schnelligkeit sagt nichts über Richtigkeit. Ohne Rechenweg weißt du nicht, welcher Betrag stimmt." }
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

  var api = { ID: ID, KEY: KEY, STEPS: STEPS, ITEMS: ITEMS, RATE_HK: RATE_HK, RATE_GEWINN: RATE_GEWINN, WORKPLACES: WORKPLACES, BUDGET_PER_WORKPLACE: BUDGET_PER_WORKPLACE, QUESTIONS: Q, lineTotal: lineTotal, positionsSum: positionsSum, percent: percent, calc: calc, fmt: fmt, evaluate: evaluate, progress: progress, progressText: progressText };
  g.LF2_ANGEBOT = api;
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
        : "Du kannst die Rechnung erneut ansehen und die Übung später bearbeiten.";
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
    p.textContent = ev.empty ? ev.empty + " Aufgabe(n) sind unbeantwortet." : ev.allCorrect ? "Du hast den Angebotspreis Schritt für Schritt, mit sichtbarem Rechenweg und klarer Rundung berechnet." : "Lies die Erklärungen und versuche es erneut. Kein Zeitdruck.";
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
