/* Lernfeld 6: Eine Lösung im eigenen Support-Level wählen und weitergehende Arbeit abgeben. Kein echtes Ticketsystem. */
(function (g) {
  "use strict";
  var ID = "lf6-loesung";
  var KEY = "it-ausbildung.lf6-loesung.v1";
  var STEPS = ["start", "case", "exercise", "finish"];
  var Q = [
    { id: "q1", prompt: "Der Monitor ist schwarz. Welche Lösung darf Samira im First-Level versuchen?", correct: "stecker", options: [
      { id: "gehaeuse", label: "Das Gehäuse öffnen und ein Bauteil im Inneren selbst austauschen, damit es schneller geht.", feedback: "Das Öffnen und Tauschen von Bauteilen geht über das First-Level hinaus. Solche Arbeit wird abgegeben." },
      { id: "stecker", label: "Den Stecker prüfen und fest einstecken.", feedback: "Richtig. Das ist ein kleiner Schritt ohne Eingriff ins Gerät und liegt im First-Level." },
      { id: "bestellen", label: "Auf eigene Faust einen neuen Monitor bestellen, ohne dass jemand die Beschaffung freigegeben hat.", feedback: "Ohne Freigabe gibt es keine Bestellung. Das ist keine Lösung des First-Levels, sondern eine Entscheidung anderer." }
    ] },
    { id: "q2", prompt: "Nach dem Prüfen der Stecker bleibt der Monitor schwarz. Die nächste Maßnahme wäre ein Eingriff ins Gerät. Was tut Samira?", correct: "abgeben", options: [
      { id: "selbst", label: "Sie versucht es selbst, weil ein Versuch das Gerät schon nicht verschlimmern wird.", feedback: "Ein Versuch ohne Befugnis kann Schaden anrichten und Spuren verwischen. Dafür ist das Second-Level da." },
      { id: "warten", label: "Sie lässt den Fall liegen, bis die Kundin von allein wieder nachfragt, und notiert nichts.", feedback: "Liegenlassen hilft nicht. Der Fall wird mit einer Notiz abgegeben, damit er weiterbearbeitet wird." },
      { id: "abgeben", label: "Sie gibt den Fall an das Second-Level ab.", feedback: "Richtig. Arbeit über dem eigenen Level wird abgegeben. Samira greift nicht selbst ins Gerät ein." }
    ] },
    { id: "q3", prompt: "Was gehört in die Übergabe an das Second-Level?", correct: "uebergabe", options: [
      { id: "uebergabe", label: "Beobachtung, bisherige Schritte und die Ansprechperson.", feedback: "Richtig. Mit diesen Angaben muss das Second-Level nicht neu fragen und kann direkt weiterarbeiten." },
      { id: "vermutung", label: "Eine feste Vermutung zur Ursache, auch wenn sie noch nicht geprüft wurde, damit sie sicher klingt.", feedback: "Vermutungen gehören nicht als Tatsache in die Übergabe. Sie führen das Second-Level auf eine falsche Spur." },
      { id: "nichts", label: "Nur der Hinweis „bitte übernehmen“, weil alles Weitere das Second-Level ohnehin selbst herausfindet.", feedback: "Eine leere Übergabe kostet Zeit und Rückfragen. Beobachtung und bisherige Schritte gehören hinein." }
    ] },
    { id: "q4", prompt: "Was sagt Samira Herrn Berger nach der Übergabe?", correct: "info", options: [
      { id: "versprechen", label: "Dass der Monitor morgen sicher repariert ist, damit er sich keine Sorgen mehr machen muss.", feedback: "Zusagen ohne Grundlage kann Samira nicht halten. Ehrlich ist, den nächsten Schritt zu nennen." },
      { id: "info", label: "Wer jetzt weiterarbeitet und wann die nächste Rückmeldung kommt.", feedback: "Richtig. So weiß Herr Berger, wie es weitergeht, ohne dass Samira etwas zusagt, was sie nicht halten kann." },
      { id: "schweigen", label: "Gar nichts, weil der Fall jetzt nicht mehr in ihrer Zuständigkeit liegt und sie nicht stören möchte.", feedback: "Schweigen lässt die Kundschaft im Unklaren. Ein kurzer Hinweis auf den weiteren Weg gehört dazu." }
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
  g.LF6_LOESUNG = api;
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
    if (fromHistory) {
      update();
      var zurueck = $(id);
      if (zurueck && zurueck.focus) zurueck.focus();
      return;
    }
    s.step = id;
    if (id === "finish" && !s.finish) {
      s.finish = true;
      save();
      $("done").textContent = s.checked && evaluate(s.answers).allCorrect ? "Lektion abgeschlossen. Du kannst sie jederzeit wiederholen." : "Du kannst das Beispiel noch einmal ansehen und die Übung später bearbeiten.";
    }
    if (id !== "start" || s.checked || s.finish) save();
    update();
    if (g.history && g.history.pushState) g.history.pushState({ lf6Step: id }, "", "");
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
  function render() {
    var ev = evaluate(s.answers), box = $("result"), heading = d.createElement("h3"); box.textContent = "";
    heading.textContent = ev.allCorrect ? "Alle Antworten richtig" : ev.correct ? "Teilweise richtig" : ev.empty === Q.length ? "Noch keine Antwort gewählt" : "Noch nicht richtig"; box.appendChild(heading);
    ev.results.forEach(function (r, index) {
      var q = Q[index], option = q.options.find(function (x) { return x.id === r.optionId; }), p = d.createElement("p");
      p.textContent = (r.status === "correct" ? "✓ Richtig: " : r.status === "wrong" ? "✗ Noch nicht richtig: " : "○ Nicht beantwortet: ") + "Aufgabe " + (index + 1) + " – " + q.prompt + " " + (option ? "Deine Antwort: " + option.label + " " : "") + (option ? option.feedback : "Noch nicht beantwortet. Wähle eine Antwort und prüfe erneut."); box.appendChild(p);
      var fb = $("fb-" + q.id); fb.textContent = option ? option.feedback : "Noch nicht beantwortet. Wähle eine Antwort und prüfe erneut."; fb.hidden = false;
    });
    var summary = d.createElement("p"); summary.textContent = ev.empty ? ev.empty + " Aufgabe(n) sind unbeantwortet." : ev.allCorrect ? "Du hast im eigenen Level gelöst, darüber hinaus abgegeben und Herrn Berger ehrlich informiert." : "Lies die Erklärungen und versuche es erneut. Kein Zeitdruck."; box.appendChild(summary); box.hidden = false;
  }
  function check() {
    s.answers = {};
    Q.forEach(function (q) { var input = d.querySelector('input[name="' + q.id + '"]:checked'); if (input) s.answers[q.id] = input.value; });
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
  if (s.finish) $("done").textContent = s.checked && evaluate(s.answers).allCorrect ? "Lektion abgeschlossen. Du kannst sie jederzeit wiederholen." : "Du kannst das Beispiel noch einmal ansehen und die Übung später bearbeiten.";
  go(s.step, true);
  if (g.history && g.history.replaceState) g.history.replaceState({ lf6Step: s.step }, "", "");
})(typeof window !== "undefined" ? window : globalThis);
