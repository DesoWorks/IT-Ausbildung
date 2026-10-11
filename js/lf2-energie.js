/* LF2.6 – Energiebedarf transparent vergleichen. Vollständig fiktive Übungsdaten (Leistung, Nutzungsprofil). */
(function (g) {
  "use strict";
  var ID = "lf2-energie";
  var KEY = "it-ausbildung.lf2-energie.v1";
  var STEPS = ["start", "case", "method", "exercise", "finish"];

  var VARIANTS = [
    { id: "lumo", name: "Lumo Kompakt", loadW: 30, idleW: 6 },
    { id: "terra", name: "Terra Modular", loadW: 22, idleW: 5 },
    { id: "vento", name: "Vento Allround", loadW: 18, idleW: 4 }
  ];
  var PROFILE = { loadH: 6, idleH: 2, days: 220 };

  function find(id) { return VARIANTS.find(function (x) { return x.id === id; }); }
  function dayWh(id, p) {
    var v = find(id);
    if (!v) return NaN;
    p = p || PROFILE;
    return v.loadW * p.loadH + v.idleW * p.idleH;
  }
  function yearWh(id, p) { p = p || PROFILE; return dayWh(id, p) * p.days; }
  function toKwh(wh) { return wh / 1000; }
  function fmt(n) { return String(Math.round(n * 1000) / 1000).replace(".", ","); }

  var Q = [
    { id: "q1", correct: "formel",
      prompt: "Ein Gerät nimmt 18 W auf und läuft 6 Stunden. Wie berechnest du die Energie?",
      options: [
        { id: "summe", label: "18 W + 6 h = 24", feedback: "Hier wurde addiert. Leistung und Zeit werden multipliziert, denn die Energie wächst mit beidem: mehr Watt oder mehr Stunden bedeuten mehr Energie." },
        { id: "formel", label: "18 W × 6 h = 108 Wh", feedback: "Richtig. Watt mal Stunden ergibt Wattstunden (Wh). Das ist die Energie, die das Gerät in dieser Zeit aufnimmt." },
        { id: "geteilt", label: "18 W ÷ 6 h = 3", feedback: "Eine Teilung ergibt keine Energie. Du suchst die Energie über die ganze Laufzeit, also rechnest du Watt × Stunden." }
      ] },
    { id: "q2", correct: "k0116",
      prompt: "Ein Gerät braucht an einem Tag 116 Wh. Wie viel sind das in Kilowattstunden?",
      options: [
        { id: "k116", label: "116 kWh", feedback: "Die Einheit wurde nur ausgetauscht. 1 kWh sind 1000 Wh, also muss durch 1000 geteilt werden: 116 ÷ 1000 = 0,116." },
        { id: "k116000", label: "116.000 kWh", feedback: "Hier wurde mit 1000 multipliziert. Die kWh ist die größere Einheit, deshalb wird die Zahl kleiner: 116 Wh ÷ 1000 = 0,116 kWh." },
        { id: "k0116", label: "0,116 kWh", feedback: "Richtig. Wattstunden geteilt durch 1000 ergibt Kilowattstunden: 116 ÷ 1000 = 0,116 kWh." }
      ] },
    { id: "q3", correct: "k3124",
      prompt: "Terra Modular braucht laut Übungsdaten 142 Wh pro Tag. Das Nutzungsprofil gilt an 220 Tagen im Jahr. Wie hoch ist der Jahreswert?",
      options: [
        { id: "k3124", label: "31,24 kWh (142 Wh × 220 = 31.240 Wh, dann ÷ 1000)", feedback: "Richtig. 142 × 220 = 31.240 Wh. Geteilt durch 1000 sind das 31,24 kWh." },
        { id: "k31240", label: "31.240 kWh", feedback: "Die Zahl 31.240 ist richtig, aber noch in Wattstunden. Für kWh musst du durch 1000 teilen: 31,24 kWh." },
        { id: "k142", label: "142 kWh", feedback: "142 ist der Wert für einen Tag in Wh. Für das Jahr multiplizierst du mit den 220 Tagen und rechnest danach in kWh um." }
      ] },
    { id: "q4", correct: "diff1672",
      prompt: "Lumo Kompakt kommt auf 42,24 kWh im Jahr, Vento Allround auf 25,52 kWh. Wie groß ist der Unterschied unter diesen Annahmen?",
      options: [
        { id: "w12", label: "12 kWh (30 W − 18 W)", feedback: "Der Unterschied von 12 W betrifft nur die Leistung bei typischer Last. Er ist weder eine Energie noch berücksichtigt er Leerlauf und Nutzungszeit." },
        { id: "diff1672", label: "16,72 kWh (42,24 − 25,52)", feedback: "Richtig. Für den Unterschied ziehst du die beiden Jahreswerte voneinander ab: 42,24 − 25,52 = 16,72 kWh. Er gilt nur für dieses Nutzungsprofil." },
        { id: "summe", label: "67,76 kWh (42,24 + 25,52)", feedback: "Hier wurden beide Werte addiert. Ein Unterschied entsteht durch Abziehen: größerer Wert minus kleinerer Wert." }
      ] },
    { id: "q5", correct: "annahmen",
      prompt: "Du berichtest der Praxis das Ergebnis. Welche Darstellung ist am ehrlichsten?",
      options: [
        { id: "real", label: "„Vento spart in der Praxis genau 16,72 kWh pro Jahr.“", feedback: "Das stellt Übungsdaten als reales Ergebnis dar. Echte Geräte und echte Nutzung weichen ab, deshalb ist „genau“ nicht belegbar." },
        { id: "nurzahl", label: "Nur die Ergebnisse nennen: Vento 25,52 kWh, Terra 31,24 kWh, Lumo 42,24 kWh.", feedback: "Ohne Annahmen kann niemand die Zahlen prüfen oder auf die eigene Nutzung übertragen. Nutzungsprofil und Rechenweg gehören dazu." },
        { id: "annahmen", label: "Leistungswerte, Nutzungsprofil (6 h Last, 2 h Leerlauf, 220 Tage) und Rechenweg zeigen und sagen: Übungsdaten, die reale Nutzung kann abweichen.", feedback: "Richtig. So kann die Praxis die Rechnung nachvollziehen, mit eigenen Zeiten wiederholen und weiß, wie belastbar sie ist." }
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

  var api = { ID: ID, KEY: KEY, STEPS: STEPS, VARIANTS: VARIANTS, PROFILE: PROFILE, QUESTIONS: Q, dayWh: dayWh, yearWh: yearWh, toKwh: toKwh, fmt: fmt, evaluate: evaluate, progress: progress };
  g.LF2_ENERGIE = api;
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
    $("pct").textContent = "Fortschritt: " + n + " %";
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
    p.textContent = ev.empty ? ev.empty + " Aufgabe(n) sind unbeantwortet." : ev.allCorrect ? "Du hast den Energiebedarf nachvollziehbar berechnet und die Annahmen offen genannt." : "Lies die Erklärungen und versuche es erneut. Kein Zeitdruck.";
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
