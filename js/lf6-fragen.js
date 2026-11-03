/* Lernfeld 6: Eine fiktive Störung durch sichere Rückfragen eingrenzen, nicht reparieren. */
(function (g) {
  "use strict";
  var ID = "lf6-fragen";
  var KEY = "it-ausbildung.lf6-fragen.v1";
  var STEPS = ["start", "case", "exercise", "finish"];
  var Q = [
    { id: "q1", prompt: "Samira kennt die Meldung, aber noch nicht den Beginn. Welche Frage hilft weiter?", correct: "seitwann", options: [
      { id: "bestellen", label: "Soll ich sofort einen neuen Monitor für den Empfang bestellen, ohne weitere Angaben zur Störung einzuholen?", feedback: "Eine Bestellung wäre verfrüht. Frage erst, seit wann der Monitor schwarz bleibt; die Ursache ist noch offen." },
      { id: "seitwann", label: "Seit wann bleibt der Monitor schwarz?", feedback: "Richtig. Der Beginn grenzt die Störung zeitlich ein. Damit steht noch keine Ursache fest und es wird nichts verändert." },
      { id: "netzwerk", label: "Ist das Netzwerk also tot, sodass ich diesen Grund schon als feststehende Ursache in die Anfrage schreiben kann?", feedback: "Ein schwarzer Monitor belegt keinen Netzwerkausfall. Samira fragt nach dem Beginn, statt eine Ursache festzulegen." }
    ] },
    { id: "q2", prompt: "Herr Berger sagt: „Seit heute Morgen.“ Der Umfang ist noch offen. Was fragt Samira?", correct: "umfang", options: [
      { id: "passwort", label: "Wie lautet das Passwort des Empfangs, damit ich mich ohne weitere Rückfragen gleich an Ihrem Arbeitsplatz anmelden kann?", feedback: "Für die Eingrenzung braucht Samira kein Passwort. Sie fragt, ob nur dieser eine Monitor betroffen ist." },
      { id: "festlegen", label: "Dann steht doch bereits fest, dass das gesamte Netzwerk ausgefallen ist und wir keine weiteren Beobachtungen brauchen?", feedback: "Der Beginn sagt nichts über einen Netzwerkausfall aus. Frage nach dem Umfang, ohne die Ursache vorwegzunehmen." },
      { id: "umfang", label: "Bleibt nur dieser eine Monitor schwarz?", feedback: "Richtig. Diese Frage grenzt den Umfang ein. Ob ein oder mehrere Monitore betroffen sind, ist eine Beobachtung, keine Diagnose." }
    ] },
    { id: "q3", prompt: "Nur dieser Monitor ist betroffen. Welche Frage sammelt eine weitere sichtbare Beobachtung?", correct: "lampe", options: [
      { id: "lampe", label: "Leuchtet eine Lampe am Monitor?", feedback: "Richtig. Eine sichtbare Lampe lässt sich beschreiben, ohne etwas zu verändern. Ihre Anzeige beweist allein noch keine Ursache." },
      { id: "tausch", label: "Soll ich den Monitor gleich als defekt einstufen und ein Ersatzgerät bestellen, damit wir uns weitere Fragen sparen?", feedback: "Ein Defekt ist noch nicht belegt. Frage erst nach der sichtbaren Lampe, statt sofort einen Austausch vorzusehen." },
      { id: "zugang", label: "Können Sie mir das Passwort des Empfangs nennen, damit ich statt weiterer Beobachtungen selbst am System nachsehe?", feedback: "Ein Passwort ist für diese Rückfrage nicht nötig. Samira sammelt nur sichtbare Beobachtungen und greift auf kein System zu." }
    ] },
    { id: "q4", prompt: "Herr Berger sagt: „Da leuchtet etwas.“ Welche Rückfrage bleibt bei der Beobachtung?", correct: "anzeige", options: [
      { id: "diagnose", label: "Dann ist das Netzwerk also sicher tot und ich kann diesen Grund ohne weitere Beobachtung als Ursache festhalten?", feedback: "Eine leuchtende Lampe belegt keinen Netzwerkausfall. Frage genauer nach der Anzeige und halte die Ursache weiter offen." },
      { id: "anzeige", label: "Leuchtet die Lampe dauerhaft oder blinkt sie?", feedback: "Richtig. Die Rückfrage präzisiert die Beobachtung, ohne zu reparieren. Auch eine genauere Anzeige legt die Ursache noch nicht fest." },
      { id: "neukauf", label: "Soll ich jetzt ohne weitere Rückfragen einen neuen Monitor bestellen, weil eine leuchtende Lampe einen Defekt beweist?", feedback: "Die Lampe beweist keinen Defekt. Eine genauere Beschreibung hilft beim Eingrenzen; eine Bestellung gehört hier nicht dazu." }
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
  g.LF6_FRAGEN = api;
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
    if (!fromHistory && g.history && g.history.pushState) g.history.pushState({ lf6FragenStep: id }, "", "");
    if (id === "finish" && !s.finish) { s.finish = true; save(); $("done").textContent = s.checked && evaluate(s.answers).allCorrect ? "Lektion abgeschlossen. Du kannst sie jederzeit wiederholen." : "Du kannst das Beispiel noch einmal ansehen und die Übung später bearbeiten."; }
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
  function render(answers) {
    var ev = evaluate(answers === undefined ? s.answers : answers), box = $("result"), heading = d.createElement("h3"); box.textContent = ""; box.children = [];
    heading.textContent = ev.allCorrect ? "Alle Antworten richtig" : ev.correct ? "Teilweise richtig" : ev.empty === Q.length ? "Noch keine Antwort gewählt" : "Noch nicht richtig"; box.appendChild(heading);
    ev.results.forEach(function (r, index) {
      var q = Q[index], option = q.options.find(function (x) { return x.id === r.optionId; }), p = d.createElement("p");
      p.textContent = (r.status === "correct" ? "✓ Richtig: " : r.status === "wrong" ? "✗ Noch nicht richtig: " : "○ Nicht beantwortet: ") + "Aufgabe " + (index + 1) + " – " + q.prompt + " " + (option ? "Deine Antwort: " + option.label + " " : "") + (option ? option.feedback : "Noch nicht beantwortet. Wähle eine Antwort und prüfe erneut."); box.appendChild(p);
      var fb = $("fb-" + q.id); fb.textContent = option ? option.feedback : "Noch nicht beantwortet. Wähle eine Antwort und prüfe erneut."; fb.hidden = false;
    });
    var summary = d.createElement("p"); summary.textContent = ev.empty ? ev.empty + " Aufgabe(n) sind unbeantwortet." : ev.allCorrect ? "Du hast Beginn, Umfang und sichtbare Beobachtungen erfragt, ohne eine Ursache festzulegen oder etwas zu reparieren." : "Lies die Erklärungen und versuche es erneut. Kein Zeitdruck."; box.appendChild(summary); box.hidden = false;
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
    var back = event && event.state ? event.state.lf6FragenStep : "start";
    go(back, true);
  });
  $("check").addEventListener("click", check); $("reset").addEventListener("click", reset);
  $("reset-all").addEventListener("click", function () { if (g.confirm("Gespeicherten Lernfortschritt dieser Lektion zurücksetzen?")) { reset(); go("start"); } });
  load(); build();
  if (STEPS.indexOf(s.step) < 0) s.step = "start";
  Q.forEach(function (q) { var option = q.options.find(function (o) { return o.id === s.answers[q.id]; }); if (option) { var input = d.querySelector('input[name="' + q.id + '"][value="' + option.id + '"]'); if (input) input.checked = true; } });
  if (s.checked) render();
  go(s.step, true);
  if (g.history && g.history.replaceState) g.history.replaceState({ lf6FragenStep: s.step }, "", "");
})(typeof window !== "undefined" ? window : globalThis);
