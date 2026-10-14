/* LF2.5 – Arbeitsplatzvarianten vergleichen. Vollständig fiktive Varianten, Werte, Punkteskala und Gewichte. */
(function (g) {
  "use strict";
  var ID = "lf2-varianten";
  var KEY = "it-ausbildung.lf2-varianten.v1";
  var STEPS = ["start", "case", "method", "exercise", "finish"];

  var CRITERIA = [
    { id: "technik", label: "Technik (Leistungsreserve, Erweiterbarkeit)", weight: 3 },
    { id: "ergonomie", label: "Ergonomie", weight: 3 },
    { id: "energie", label: "Energie (typische Last)", weight: 2 },
    { id: "recycling", label: "Recycling und Reparierbarkeit", weight: 2 }
  ];
  var VARIANTS = [
    { id: "lumo", name: "Lumo Kompakt", points: { technik: 3, ergonomie: 2, energie: 3, recycling: 2 } },
    { id: "terra", name: "Terra Modular", points: { technik: 5, ergonomie: 4, energie: 4, recycling: 5 } },
    { id: "vento", name: "Vento Allround", points: { technik: 4, ergonomie: 5, energie: 5, recycling: 3 } }
  ];
  var WEIGHTS = {};
  CRITERIA.forEach(function (c) { WEIGHTS[c.id] = c.weight; });
  var ALT_WEIGHTS = { technik: 3, ergonomie: 4, energie: 2, recycling: 1 };

  function total(variantId, weights) {
    var v = VARIANTS.find(function (x) { return x.id === variantId; });
    if (!v) return NaN;
    weights = weights || WEIGHTS;
    return CRITERIA.reduce(function (sum, c) { return sum + v.points[c.id] * weights[c.id]; }, 0);
  }

  var Q = [
    { id: "q1", correct: "pflicht",
      prompt: "Alle drei Varianten sollen bewertet werden. Was gehört vor die Punktevergabe?",
      options: [
        { id: "alle", label: "Nichts. Alle Varianten bekommen Punkte, und ein verfehltes Pflichtkriterium gleicht man durch Punkte in anderen Kriterien aus.", feedback: "Ein Pflichtkriterium lässt sich nicht ausgleichen. Wer es verfehlt, scheidet aus, auch wenn die Variante sonst viele Punkte hätte." },
        { id: "pflicht", label: "Zuerst prüfen, ob jede Variante alle Pflichtkriterien erfüllt. Wer eines verfehlt, scheidet aus und wird nicht bewertet.", feedback: "Richtig. Pflichtkriterien sind der Filter. Die Nutzwertanalyse vergleicht nur Varianten, die den Auftrag überhaupt erfüllen." },
        { id: "gewicht", label: "Nichts. Die Gewichte legt man am besten erst nach der Punktevergabe fest, damit das Ergebnis passt.", feedback: "Das wäre unfair, weil man das Ergebnis dann zurechtbiegen kann. Die Gewichte werden vor den Punkten festgelegt und offen genannt." }
      ] },
    { id: "q2", correct: "verschraubt",
      prompt: "Welche Angabe aus dem Datenblatt gehört zum Kriterium „Recycling und Reparierbarkeit“?",
      options: [
        { id: "strom", label: "Typische Leistungsaufnahme von 18 W im normalen Betrieb am Empfang.", feedback: "Die Leistungsaufnahme gehört zum eigenen Kriterium „Energie“. Sie sagt nichts darüber, wie gut sich das Gerät reparieren oder verwerten lässt." },
        { id: "hoehe", label: "Bildschirm höhenverstellbar und drehbar, dazu ein ergonomisches Tastaturset.", feedback: "Das ist eine ergonomische Angabe. Sie beschreibt, wie gut der Platz zum Menschen passt, nicht wie sich das Gerät später verwerten lässt." },
        { id: "verschraubt", label: "Gehäuse verschraubt, Teile einzeln austauschbar, Rücknahme zugesagt.", feedback: "Richtig. Verschraubte Gehäuse und austauschbare Teile erleichtern Reparatur und Recycling. Eine zugesagte Rücknahme gehört ebenfalls dazu." }
      ] },
    { id: "q3", correct: "c43",
      prompt: "Rechne mit den Gewichten aus der Tabelle (Technik 3, Ergonomie 3, Energie 2, Recycling 2). Wie viele gewichtete Punkte erhält Vento Allround mit den Punkten Technik 4, Ergonomie 5, Energie 5 und Recycling 3?",
      options: [
        { id: "c43", label: "43 Punkte (4 × 3 + 5 × 3 + 5 × 2 + 3 × 2)", feedback: "Richtig: 12 + 15 + 10 + 6 = 43. Jeder Punktwert wird mit seinem Gewicht multipliziert, danach werden die Teilsummen addiert." },
        { id: "c17", label: "17 Punkte (4 + 5 + 5 + 3)", feedback: "Hier wurden die Punkte nur addiert. Dann zählen alle Kriterien gleich, die Gewichtung wird ignoriert." },
        { id: "c40", label: "40 Punkte (Recycling nur einfach gerechnet)", feedback: "Beim Recycling fehlt das Gewicht 2: 3 × 2 = 6, nicht 3. Jede Zeile wird mit ihrem eigenen Gewicht gerechnet." }
      ] },
    { id: "q4", correct: "vento",
      prompt: "Die Praxis möchte andere Gewichte: Technik 3, Ergonomie 4, Energie 2, Recycling 1 (Summe weiter 10). Rechne für Terra Modular (5 / 4 / 4 / 5) und Vento Allround (4 / 5 / 5 / 3) neu. Was ist das Ergebnis?",
      options: [
        { id: "terra", label: "Terra bleibt vorn, denn die Rangfolge ändert sich durch andere Gewichte nie.", feedback: "Doch, sie kann sich ändern. Gewichte sind eine Wertung. Rechne nach: Terra 15 + 16 + 8 + 5 = 44, Vento 12 + 20 + 10 + 3 = 45." },
        { id: "gleich", label: "Beide haben genau 44 Punkte, es gibt einen Gleichstand.", feedback: "44 Punkte hat nur Terra. Vento kommt auf 12 + 20 + 10 + 3 = 45 Punkte." },
        { id: "vento", label: "Vento liegt jetzt vorn: 45 zu 44 Punkten.", feedback: "Richtig. Mit mehr Gewicht auf Ergonomie und weniger auf Recycling dreht sich die knappe Rangfolge. Darum werden Gewichte vorher begründet und offen genannt." }
      ] },
    { id: "q5", correct: "offen",
      prompt: "Mit den ursprünglichen Gewichten gewinnt Terra mit 45 zu 43 Punkten. Die Empfangskraft sitzt fast den ganzen Tag am Platz. Was ist die beste Rückmeldung an die Praxis?",
      options: [
        { id: "nurzahl", label: "Terra empfehlen. Die höhere Zahl entscheidet, weitere Erklärung ist nicht nötig, und die Praxis muss die Gewichte nicht nachprüfen.", feedback: "Bei einem so knappen Abstand ist die Zahl allein zu wenig. Die Praxis sollte wissen, wo Terra schwächer ist und wie stark die Gewichte das Ergebnis beeinflussen." },
        { id: "offen", label: "Terra empfehlen und offen sagen: Vento ist ergonomischer und sparsamer, Terra besser erweiterbar. Der Abstand ist klein, die Praxis prüft die Gewichte.", feedback: "Richtig. So wird der Trade-off sichtbar: Wer mehr Ergonomie will, verzichtet auf Reserve und Recycling. Die Entscheidung bleibt bei der Kundschaft." },
        { id: "vento", label: "Vento empfehlen, weil Ergonomie bei Ganztagsarbeit immer wichtiger ist als alle anderen Kriterien, auch wenn die Gewichte etwas anderes sagen.", feedback: "Das widerspricht der vereinbarten Gewichtung. Wenn Ergonomie wichtiger sein soll, werden die Gewichte offen geändert und neu gerechnet, nicht das Ergebnis umgedeutet." }
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

  var api = { ID: ID, KEY: KEY, STEPS: STEPS, CRITERIA: CRITERIA, VARIANTS: VARIANTS, WEIGHTS: WEIGHTS, ALT_WEIGHTS: ALT_WEIGHTS, QUESTIONS: Q, total: total, evaluate: evaluate, progress: progress, progressText: progressText };
  g.LF2_VARIANTEN = api;
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
        : "Du kannst die Bewertung erneut ansehen und die Übung später bearbeiten.";
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
    p.textContent = ev.empty ? ev.empty + " Aufgabe(n) sind unbeantwortet." : ev.allCorrect ? "Du hast die Varianten nachvollziehbar bewertet und das Ergebnis ehrlich eingeordnet." : "Lies die Erklärungen und versuche es erneut. Kein Zeitdruck.";
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
