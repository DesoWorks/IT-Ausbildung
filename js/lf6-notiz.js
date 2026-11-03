/* Lernfeld 6: Den Bearbeitungsstand einer fiktiven Serviceanfrage notieren. Kein echtes Ticketsystem. */
(function (g) {
  "use strict";
  var ID = "lf6-notiz";
  var KEY = "it-ausbildung.lf6-notiz.v1";
  var STEPS = ["start", "case", "exercise", "finish"];
  var Q = [
    { id: "q1", prompt: "Samira hat den schwarzen Monitor gesehen. Was gehört in die Notiz zum Stand?", correct: "beobachtet", options: [
      { id: "ursache", label: "Eine erfundene Ursache, weil eine Notiz ohne Vermutung über das defekte Netzteil unvollständig wäre.", feedback: "Die Notiz nennt den beobachteten Stand, nicht eine erfundene Ursache. Samira schreibt, was sie gesehen hat." },
      { id: "loeschen", label: "Den bisherigen Verlauf löschen, damit nur die neueste Vermutung in der Notiz stehen bleibt.", feedback: "Der bisherige Verlauf bleibt. Eine brauchbare Notiz ergänzt den Stand und löscht nichts." },
      { id: "beobachtet", label: "Der beobachtete Stand.", feedback: "Richtig. Die Notiz nennt, was beobachtet wurde. Eine Ursache erfindet Samira dabei nicht." }
    ] },
    { id: "q2", prompt: "Der Stand ist notiert. Was fehlt noch für eine brauchbare Notiz?", correct: "naechster", options: [
      { id: "naechster", label: "Der nächste Schritt.", feedback: "Richtig. Neben dem Stand nennt die Notiz, was als Nächstes passiert. So bleibt der Fall nachvollziehbar." },
      { id: "ursache", label: "Eine festgelegte Ursache, obwohl Samira das Netzteil nur vermutet und noch nichts geprüft hat.", feedback: "Eine Vermutung ist keine Ursache. Der nächste Schritt gehört in die Notiz, nicht eine festgelegte Erklärung." },
      { id: "loeschen", label: "Die erste Meldung löschen, weil der neue Schritt die bisherige Notiz überflüssig macht.", feedback: "Die erste Meldung bleibt. Der nächste Schritt wird ergänzt, der Verlauf wird nicht gelöscht." }
    ] },
    { id: "q3", prompt: "Samira hat Herrn Berger gesagt, dass sie nach der Anzeige fragt. Was kommt zusätzlich in die Notiz?", correct: "informiert", options: [
      { id: "ursache", label: "Die Ursache sei das Kabel, weil eine Information an Herrn Berger automatisch eine technische Erklärung ersetzt.", feedback: "Informieren ersetzt keine Ursache. Die Notiz hält fest, wer informiert wurde, und erfindet das Kabel nicht als Grund." },
      { id: "informiert", label: "Wer informiert wurde.", feedback: "Richtig. Herr Berger wurde informiert. Das gehört in die Notiz, zusammen mit Stand und nächstem Schritt." },
      { id: "loeschen", label: "Die bisherige Notiz löschen, weil die Information an Herrn Berger den alten Verlauf ersetzt.", feedback: "Die Information ergänzt die Notiz. Sie löscht nicht, was vorher beobachtet und notiert wurde." }
    ] },
    { id: "q4", prompt: "Was tut eine brauchbare Notiz in diesem Fall nicht?", correct: "keine-ursache", options: [
      { id: "keine-ursache", label: "Keine Ursache erfinden.", feedback: "Richtig. Die Notiz bleibt beim beobachteten Stand, beim nächsten Schritt und bei der Information. Eine Ursache erfindet sie nicht." },
      { id: "stand", label: "Den beobachteten Stand, den nächsten Schritt und die informierte Person nachvollziehbar festhalten.", feedback: "Genau das gehört in die Notiz. Sie lässt diese drei Punkte nicht weg und löscht den Verlauf nicht." },
      { id: "verlauf", label: "Den bisherigen Verlauf behalten, damit später erkennbar bleibt, was gesehen und gesagt wurde.", feedback: "Der Verlauf bleibt. Eine brauchbare Notiz löscht ihn nicht, nur weil ein neuer Satz hinzukommt." }
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
  g.LF6_NOTIZ = api;
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  if (!g.document) return;
  var d = g.document, s = { answers: {}, checked: false, finish: false, step: "start" };
  function $(id) { return d.getElementById(id); }
  function load() { try { var x = JSON.parse(g.localStorage.getItem(KEY) || "null"); if (x) s = x; } catch (e) { /* Speicher kann gesperrt sein. */ } }
  function save() { try { g.localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) { /* Lektion bleibt ohne Speicherung bedienbar. */ } if (g.LERNFORTSCHRITT) g.LERNFORTSCHRITT.benachrichtigen(); }
  function update() { $("bar").style.width = barWidth(s) + "%"; $("pct").textContent = progressText(s); }
  function go(id, fromHistory) {
    if (STEPS.indexOf(id) < 0) id = "start";
    STEPS.forEach(function (x) { $(x).hidden = x !== id; });
    d.querySelectorAll("[data-step]").forEach(function (b) { if (b.dataset.step === id) b.setAttribute("aria-current", "step"); else b.removeAttribute("aria-current"); });
    s.step = id;
    if (id === "finish" && !s.finish) { s.finish = true; save(); }
    update();
    if (!fromHistory && g.history && g.history.pushState) g.history.pushState({ lf6Step: id }, "", "");
    var ziel = $(id);
    if (ziel && ziel.focus) ziel.focus();
  }
  function hide() { var box = $("result"); if (box) { box.hidden = true; box.textContent = ""; } }
  function build() {
    Q.forEach(function (q, index) {
      var field = d.createElement("fieldset"), legend = d.createElement("legend"), group = d.createElement("div"), feedback = d.createElement("p");
      field.className = "frage"; legend.textContent = (index + 1) + ". " + q.prompt; field.appendChild(legend); group.className = "opts";
      q.options.forEach(function (o) {
        var label = d.createElement("label"), input = d.createElement("input");
        label.className = "opt"; input.type = "radio"; input.name = q.id; input.value = o.id; label.appendChild(input); label.appendChild(d.createTextNode(" " + o.label));
        input.addEventListener("change", function () { s.answers[q.id] = o.id; s.checked = false; hide(); save(); update(); }); group.appendChild(label);
      });
      field.appendChild(group); feedback.id = "fb-" + q.id; feedback.hidden = true; feedback.setAttribute("aria-live", "polite"); field.appendChild(feedback); $("questions").appendChild(field);
    });
  }
  function render(answers) {
    var ev = evaluate(answers === undefined ? s.answers : answers), box = $("result"), heading = d.createElement("h3"); box.textContent = ""; box.children = [];
    heading.textContent = ev.allCorrect ? "Alle Antworten richtig" : ev.correct ? "Teilweise richtig" : ev.empty === Q.length ? "Noch keine Antwort gewählt" : "Noch nicht richtig"; box.appendChild(heading);
    ev.results.forEach(function (r, index) {
      var q = Q[index], option = q.options.find(function (x) { return x.id === r.optionId; }), p = d.createElement("p");
      p.textContent = (r.status === "correct" ? "✓ Richtig: " : r.status === "wrong" ? "✗ Noch nicht richtig: " : "○ Nicht beantwortet: ") + "Aufgabe " + (index + 1) + " – " + q.prompt + " " + (option ? "Deine Antwort: " + option.label + " " : "") + (option ? option.feedback : "Noch nicht beantwortet. Wähle eine Antwort und prüfe erneut."); box.appendChild(p);
      var fb = $("fb-" + q.id); fb.textContent = option ? option.feedback : "Noch nicht beantwortet. Wähle eine Antwort und prüfe erneut."; fb.hidden = false;
    });
    var summary = d.createElement("p"); summary.textContent = ev.empty ? ev.empty + " Aufgabe(n) sind unbeantwortet." : ev.allCorrect ? "Du hast Stand, nächsten Schritt und informierte Person notiert. Eine Ursache wurde nicht erfunden und der Verlauf nicht gelöscht." : "Lies die Erklärungen und versuche es erneut. Kein Zeitdruck."; box.appendChild(summary); box.hidden = false;
  }
  function selectedAnswers() {
    var answers = {};
    Q.forEach(function (q) { var input = d.querySelector('input[name="' + q.id + '"]:checked'); if (input) answers[q.id] = input.value; });
    return answers;
  }
  function check() {
    var answers = selectedAnswers();
    if (!Object.keys(answers).length) {
      render({});
      return;
    }
    s.answers = answers;
    s.checked = true; render(); save(); update();
  }
  function reset() {
    s = { answers: {}, checked: false, finish: false, step: s.step || "start" }; d.querySelectorAll('#questions input[type="radio"]').forEach(function (input) { input.checked = false; }); hide();
    Q.forEach(function (q) { $("fb-" + q.id).hidden = true; $("fb-" + q.id).textContent = ""; }); $("done").textContent = ""; save(); update();
  }
  d.querySelectorAll("[data-step]").forEach(function (b) { b.addEventListener("click", function () { go(b.dataset.step); }); });
  d.querySelectorAll("[data-next]").forEach(function (b) { b.addEventListener("click", function () { go(b.dataset.next); }); });
  if (g.addEventListener) g.addEventListener("popstate", function (event) {
    var back = event && event.state ? event.state.lf6Step : "start";
    go(back, true);
  });
  $("check").addEventListener("click", check); $("reset").addEventListener("click", reset);
  $("reset-all").addEventListener("click", function () { if (g.confirm("Gespeicherten Lernfortschritt dieser Lektion zurücksetzen?")) { reset(); go("start"); } });
  load(); build();
  if (STEPS.indexOf(s.step) < 0) s.step = "start";
  Q.forEach(function (q) { var option = q.options.find(function (o) { return o.id === s.answers[q.id]; }); if (option) { var input = d.querySelector('input[name="' + q.id + '"][value="' + option.id + '"]'); if (input) input.checked = true; } });
  if (s.checked) render();
  go(s.step, true);
  if (g.history && g.history.replaceState) g.history.replaceState({ lf6Step: s.step }, "", "");
})(typeof window !== "undefined" ? window : globalThis);
