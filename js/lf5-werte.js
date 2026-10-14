/* Lernfeld 5: Einfache Werte (Text, ganze Zahl, Ja/Nein) an einer fiktiven Karte lesen. */
(function (g) {
  "use strict";
  var ID = "lf5-werte";
  var KEY = "it-ausbildung.lf5-werte.v1";
  var STEPS = ["start", "case", "exercise", "finish"];
  var Q = [
    { id: "q1", prompt: "Welcher Wert auf der Karte ist Text?", correct: "text", options: [
      { id: "zahl", label: "Die Anzahl 12, weil sie auf der Karte als Menge der Kundinnen und Kunden steht.", feedback: "Die Anzahl 12 ist eine ganze Zahl, mit der man zählen kann. Text ist hier der Gerätename." },
      { id: "janein", label: "Die Angabe gesperrt: ja, weil sie nur mit ja oder nein beantwortet werden kann.", feedback: "Eine Angabe mit nur zwei Möglichkeiten ist ein Ja/Nein-Wert. Text ist hier der Gerätename Mira-01." },
      { id: "text", label: "Der Gerätename Mira-01.", feedback: "Richtig. Ein Name besteht aus Zeichen und ist Text, auch wenn er Ziffern enthält. Er wird nicht gerechnet." }
    ] },
    { id: "q2", prompt: "Welcher Wert auf der Karte ist eine ganze Zahl?", correct: "zahl", options: [
      { id: "zahl", label: "Die Anzahl 12 auf der Karte.", feedback: "Richtig. 12 ist eine ganze Zahl ohne Komma. Man kann damit zählen." },
      { id: "name", label: "Der Gerätename Mira-01, weil er Ziffern enthält und deshalb eine ganze Zahl sein muss.", feedback: "Ein Name mit Ziffern bleibt Text. Er wird nicht gezählt oder gerechnet, deshalb ist er keine ganze Zahl." },
      { id: "janein", label: "Die Angabe ja zum gesperrten Bildschirm, weil sie auf der Karte hinter einer Zahl steht.", feedback: "Die Stelle auf der Karte macht aus ja keine Zahl. Ja oder nein sind zwei mögliche Antworten, keine Menge." }
    ] },
    { id: "q3", prompt: "Welcher Wert auf der Karte ist Ja oder Nein?", correct: "janein", options: [
      { id: "text", label: "Der Gerätename Mira-01, weil er auf der Karte mit einem Doppelpunkt eingeleitet wird.", feedback: "Der Doppelpunkt macht aus einem Namen keinen Ja/Nein-Wert. Mira-01 ist Text." },
      { id: "janein", label: "Die Karte sagt, der Bildschirm ist gesperrt: ja.", feedback: "Richtig. Die Angabe ja oder nein hat nur zwei Möglichkeiten. Hier lautet sie ja." },
      { id: "zahl", label: "Die Anzahl 12, weil sie größer als null ist und deshalb immer ja bedeutet.", feedback: "Eine Zahl bleibt eine Zahl, auch wenn sie größer als null ist. Sie ist kein Ja/Nein-Wert." }
    ] },
    { id: "q4", prompt: "Was tut Samira beim Lesen der Karte nicht?", correct: "nichtrechnen", options: [
      { id: "rechnen", label: "Sie rechnet aus den 12 Kunden einen Gesamtpreis aus und trägt ihn auf der Karte ein.", feedback: "Die Karte enthält keine Preise. Samira liest nur die vorhandenen Werte ab und rechnet nichts dazu." },
      { id: "erfinden", label: "Sie schätzt eine fehlende Zahl und schreibt sie so auf, als stünde sie auf der Karte.", feedback: "Eine fehlende Zahl wird nicht erfunden. Fehlt etwas, fragt Samira nach, statt zu schätzen." },
      { id: "nichtrechnen", label: "Sie rechnet keine Kundenpreise aus und erfindet keine fehlende Zahl.", feedback: "Richtig. Samira liest nur, was auf der Karte steht. Sie rechnet keine Preise aus und erfindet nichts dazu." }
    ] }
  ];
  function evaluate(a) {
    a = a || {};
    var results = Q.map(function (q) {
      var o = q.options.find(function (x) { return x.id === a[q.id]; });
      return { id: q.id, status: !o ? "empty" : o.id === q.correct ? "correct" : "wrong", optionId: o ? o.id : "", feedback: o ? o.feedback : "" };
    });
    return {
      results: results,
      correct: results.filter(function (x) { return x.status === "correct"; }).length,
      wrong: results.filter(function (x) { return x.status === "wrong"; }).length,
      empty: results.filter(function (x) { return x.status === "empty"; }).length,
      allCorrect: results.every(function (x) { return x.status === "correct"; })
    };
  }
  function total() { return Q.length + 1; }
  function progress(s) { s = s || {}; return (s.checked ? evaluate(s.answers).correct : 0) + (s.finish ? 1 : 0); }
  function barWidth(s) { return Math.round(progress(s) / total() * 100); }
  function progressText(s) { s = s || {}; return "Fortschritt: " + progress(s) + " von " + total() + " Schritten · Abschluss " + (s.finish ? "geöffnet" : "noch nicht geöffnet"); }
  var api = { ID: ID, KEY: KEY, STEPS: STEPS, QUESTIONS: Q, evaluate: evaluate, progress: progress, barWidth: barWidth, progressText: progressText };
  g.LF5_WERTE = api;
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  if (!g.document) return;
  var d = g.document, s = { answers: {}, checked: false, finish: false };
  function $(id) { return d.getElementById(id); }
  function load() { try { var x = JSON.parse(g.localStorage.getItem(KEY) || "null"); if (x) s = x; } catch (e) { /* Speicher kann gesperrt sein. */ } }
  function save() { try { g.localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) { /* Lektion bleibt ohne Speicherung bedienbar. */ } if (g.LERNFORTSCHRITT) g.LERNFORTSCHRITT.benachrichtigen(); }
  function update() { $("bar").style.width = barWidth(s) + "%"; $("pct").textContent = progressText(s); }
  function go(id) {
    STEPS.forEach(function (x) { $(x).hidden = x !== id; });
    d.querySelectorAll("[data-step]").forEach(function (b) { if (b.dataset.step === id) b.setAttribute("aria-current", "step"); else b.removeAttribute("aria-current"); });
    if (id === "finish") { s.finish = true; save(); $("done").textContent = s.checked && evaluate(s.answers).allCorrect ? "Lektion abgeschlossen. Du kannst sie jederzeit wiederholen." : "Du kannst die Karte noch einmal ansehen und die Übung später bearbeiten."; }
    update(); $("main").focus(); g.scrollTo(0, 0);
  }
  function hide() { var b = $("result"); b.hidden = true; b.textContent = ""; }
  function build() {
    Q.forEach(function (q, index) {
      var field = d.createElement("fieldset"), legend = d.createElement("legend"), group = d.createElement("div"), feedback = d.createElement("p");
      field.className = "question"; legend.textContent = (index + 1) + ". " + q.prompt; field.appendChild(legend); group.className = "opts";
      q.options.forEach(function (o) {
        var label = d.createElement("label"), input = d.createElement("input"), span = d.createElement("span");
        input.type = "radio"; input.name = q.id; input.value = o.id; span.textContent = o.label; label.className = "opt"; label.append(input, span);
        input.addEventListener("change", function () { s.answers[q.id] = o.id; s.checked = false; hide(); save(); update(); }); group.appendChild(label);
      });
      field.appendChild(group); feedback.id = "fb-" + q.id; feedback.hidden = true; feedback.setAttribute("aria-live", "polite"); field.appendChild(feedback); $("questions").appendChild(field);
    });
  }
  function render() {
    var ev = evaluate(s.answers), box = $("result"), heading = d.createElement("h3"); box.textContent = "";
    heading.textContent = ev.allCorrect ? "Alle Antworten richtig" : ev.correct ? "Teilweise richtig" : ev.empty === Q.length ? "Noch keine Antwort gewählt" : "Noch nicht richtig"; box.appendChild(heading);
    ev.results.forEach(function (r, index) {
      var q = Q[index], option = q.options.find(function (x) { return x.id === r.optionId; }), p = d.createElement("p");
      p.textContent = (r.status === "correct" ? "✓ Richtig: " : r.status === "wrong" ? "✗ Noch nicht richtig: " : "○ Nicht beantwortet: ") + "Aufgabe " + (index + 1) + " – " + q.prompt + " " + (option ? "Deine Antwort: " + option.label + " " : "") + (option ? option.feedback : "Noch nicht beantwortet. Wähle eine Antwort und prüfe erneut."); box.appendChild(p);
      var fb = $("fb-" + q.id); fb.textContent = option ? option.feedback : "Noch nicht beantwortet. Wähle eine Antwort und prüfe erneut."; fb.hidden = false;
    });
    var summary = d.createElement("p"); summary.textContent = ev.empty ? ev.empty + " Aufgabe(n) sind unbeantwortet." : ev.allCorrect ? "Du hast Text, ganze Zahl und Ja/Nein auf der Karte richtig unterschieden." : "Lies die Erklärungen und versuche es erneut. Kein Zeitdruck."; box.appendChild(summary); box.hidden = false;
  }
  function check() {
    s.answers = {};
    Q.forEach(function (q) { var input = d.querySelector('input[name="' + q.id + '"]:checked'); if (input) s.answers[q.id] = input.value; });
    s.checked = true; render(); save(); update();
  }
  function reset() {
    s = { answers: {}, checked: false, finish: false }; d.querySelectorAll('#questions input[type="radio"]').forEach(function (input) { input.checked = false; }); hide();
    Q.forEach(function (q) { $("fb-" + q.id).hidden = true; $("fb-" + q.id).textContent = ""; }); $("done").textContent = ""; save(); update();
  }
  d.querySelectorAll("[data-step]").forEach(function (b) { b.addEventListener("click", function () { go(b.dataset.step); }); });
  d.querySelectorAll("[data-next]").forEach(function (b) { b.addEventListener("click", function () { go(b.dataset.next); }); });
  $("check").addEventListener("click", check); $("reset").addEventListener("click", reset);
  $("reset-all").addEventListener("click", function () { if (g.confirm("Gespeicherten Lernfortschritt dieser Lektion zurücksetzen?")) { reset(); go("start"); } });
  load(); build();
  Q.forEach(function (q) { var option = q.options.find(function (o) { return o.id === s.answers[q.id]; }); if (option) { var input = d.querySelector('input[name="' + q.id + '"][value="' + option.id + '"]'); if (input) input.checked = true; } });
  if (s.checked) render(); update();
})(typeof window !== "undefined" ? window : globalThis);
