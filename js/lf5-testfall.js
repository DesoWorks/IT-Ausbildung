/* Lernfeld 5: Einen Testfall formulieren (Ausgangslage, Handlung, erwartetes Ergebnis, Abweichung) an einer fiktiven Karte. */
(function (g) {
  "use strict";
  var ID = "lf5-testfall";
  var KEY = "it-ausbildung.lf5-testfall.v1";
  var STEPS = ["start", "case", "exercise", "finish"];
  var Q = [
    { id: "q1", prompt: "Was gehört in die Ausgangslage?", correct: "lage", options: [
      { id: "ergebnis", label: "Dass die Karte am Ende Mira-01 zeigt und Samira damit sicher weiß, dass der Test bestanden ist.", feedback: "Das ist schon das erwartete Ergebnis. Die Ausgangslage beschreibt, wie es vor dem Test aussieht." },
      { id: "lage", label: "Die Karte ist geöffnet und zeigt noch keinen Namen.", feedback: "Richtig. Die Ausgangslage sagt, womit der Test beginnt: Die Karte ist offen und noch ohne Namen." },
      { id: "handlung", label: "Das Eintragen des Namens, weil der Test erst mit dem ersten Handgriff beginnt und alles davor egal ist.", feedback: "Das Eintragen ist die Handlung. Vorher muss klar sein, in welchem Zustand der Test startet." }
    ] },
    { id: "q2", prompt: "Welche Handlung prüft sie?", correct: "handlung", options: [
      { id: "lage", label: "Sie schaut nur, ob die Karte geöffnet ist, und schreibt dann auf, dass alles in Ordnung sei.", feedback: "Nur hinschauen prüft den Namen nicht. Die Handlung muss etwas auslösen, das man danach vergleichen kann." },
      { id: "aendern", label: "Sie ändert den Namen auf der Karte so lange, bis er zu dem passt, was sie sehen möchte.", feedback: "So wird nichts geprüft. Die Handlung ist festgelegt, und das Ergebnis wird danach nur verglichen." },
      { id: "handlung", label: "Sie trägt Mira-01 ein und lässt die Karte anzeigen.", feedback: "Richtig. Die Handlung ist genau der Schritt, dessen Wirkung geprüft wird: Name eintragen, Karte anzeigen." }
    ] },
    { id: "q3", prompt: "Was ist das erwartete Ergebnis?", correct: "erwartet", options: [
      { id: "erwartet", label: "Die Karte zeigt genau Mira-01.", feedback: "Richtig. Das erwartete Ergebnis steht vorher fest und ist so genau, dass man es danach vergleichen kann." },
      { id: "irgendeiner", label: "Die Karte zeigt irgendeinen Namen, der ungefähr nach einem Gerät klingt.", feedback: "Zu ungenau. Ohne genauen Namen lässt sich später nicht sagen, ob das Ergebnis stimmt oder nicht." },
      { id: "spaeter", label: "Samira entscheidet erst beim Hinsehen, was ihr richtig vorkommt, und notiert es danach.", feedback: "Das Ergebnis muss vor dem Test feststehen. Sonst passt am Ende scheinbar immer alles." }
    ] },
    { id: "q4", prompt: "Was tut sie, wenn etwas anderes erscheint?", correct: "abweichung", options: [
      { id: "weiter", label: "Sie ändert still den erwarteten Wert und markiert den Test trotzdem als bestanden, damit es ordentlich aussieht.", feedback: "Das verfälscht den Test. Eine Abweichung wird nicht versteckt, sondern gemeldet." },
      { id: "abweichung", label: "Sie stoppt und fragt die ausbildende Person, statt selbst zu ändern.", feedback: "Richtig. Bei einer Abweichung hört Samira auf und fragt nach. Sie ändert nichts auf eigene Faust." },
      { id: "ignorieren", label: "Sie ignoriert die Abweichung, weil ein kleiner Unterschied beim Namen sicher nicht wichtig genug ist.", feedback: "Auch ein kleiner Unterschied zählt. Der Test sagt genau, was erscheinen soll, alles andere ist eine Abweichung." }
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
  g.LF5_TESTFALL = api;
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
    var summary = d.createElement("p"); summary.textContent = ev.empty ? ev.empty + " Aufgabe(n) sind unbeantwortet." : ev.allCorrect ? "Du hast Ausgangslage, Handlung, erwartetes Ergebnis und Abweichung des Testfalls richtig formuliert." : "Lies die Erklärungen und versuche es erneut. Kein Zeitdruck."; box.appendChild(summary); box.hidden = false;
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
