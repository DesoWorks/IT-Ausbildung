/* Lernfeld 5: Eine kurze Softwaredokumentation lesen (Zweck, Eingabe, Prüfung, offener Punkt) an einer fiktiven Notiz. */
(function (g) {
  "use strict";
  var ID = "lf5-doku";
  var KEY = "it-ausbildung.lf5-doku.v1";
  var STEPS = ["start", "case", "exercise", "finish"];
  var Q = [
    { id: "q1", prompt: "Wozu ist die Notiz da?", correct: "zweck", options: [
      { id: "eingabe", label: "Sie nennt den Namen Mira-01 und soll sonst nichts erklären, damit niemand zu viel lesen muss.", feedback: "Mira-01 ist die Eingabe. Der Zweck sagt dagegen, wozu die Übungskarte und die Notiz da sind." },
      { id: "zweck", label: "Sie sagt, welchen Zweck die Übungskarte hat.", feedback: "Richtig. Der Zweck steht am Anfang der Notiz: Die Übungskarte dient dem Gerätenamen." },
      { id: "freigabe", label: "Sie hält fest, dass die ausbildende Person alles freigegeben hat und nichts mehr zu tun ist.", feedback: "Die Freigabe ist noch offen. Außerdem beschreibt das nicht, wozu die Notiz da ist." }
    ] },
    { id: "q2", prompt: "Welche Eingabe steht in der Notiz?", correct: "eingabe", options: [
      { id: "pruefung", label: "Die Anzeige auf der Karte, die Samira später anschaut und mit der Notiz vergleicht.", feedback: "Die Anzeige wird geprüft, sie ist nicht die Eingabe. Die Eingabe ist der Wert, der vorher eingetragen wird." },
      { id: "keine", label: "Es steht keine Eingabe darin, weil Samira den Namen erst beim Testen frei wählen darf.", feedback: "In der Notiz steht eine Eingabe, nämlich Mira-01. Sie ist vorher festgelegt und wird nicht frei gewählt." },
      { id: "eingabe", label: "Mira-01.", feedback: "Richtig. Die Eingabe ist der Gerätename Mira-01, genau so, wie er in der Notiz steht." }
    ] },
    { id: "q3", prompt: "Was wurde geprüft?", correct: "pruefung", options: [
      { id: "pruefung", label: "Ob die Karte genau Mira-01 anzeigt.", feedback: "Richtig. Geprüft wird die Anzeige: Die Karte soll genau den Namen Mira-01 zeigen." },
      { id: "eingabe", label: "Ob Samira den Namen Mira-01 richtig eintippen kann und dabei in der Notiz keinen Fehler macht.", feedback: "Eingetippt wird die Eingabe. Geprüft wird, was die Karte danach anzeigt." },
      { id: "freigabe", label: "Ob die ausbildende Person die Freigabe schon gegeben hat und der Test damit erledigt ist.", feedback: "Die Freigabe ist noch offen und wird nicht geprüft. Geprüft wird die Anzeige der Karte." }
    ] },
    { id: "q4", prompt: "Was bleibt offen?", correct: "offen", options: [
      { id: "name", label: "Der Gerätename Mira-01, weil die Notiz ihn nur erwähnt und Samira ihn erst noch festlegen muss.", feedback: "Der Name steht schon in der Notiz als Eingabe. Offen ist etwas anderes: die Freigabe." },
      { id: "offen", label: "Die Freigabe durch die ausbildende Person.", feedback: "Richtig. Der offene Punkt ist die Freigabe durch die ausbildende Person. Sie fehlt noch." },
      { id: "zweck", label: "Der Zweck der Übungskarte, weil die Notiz dazu nichts sagt und Samira ihn raten muss.", feedback: "Der Zweck steht in der Notiz: der Gerätename. Offen bleibt nur die Freigabe der ausbildenden Person." }
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
  g.LF5_DOKU = api;
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
    if (!fromHistory && g.history && g.history.pushState) g.history.pushState({ lf5Step: id }, "", "");
    if (id === "finish" && !s.finish) { s.finish = true; save(); $("done").textContent = s.checked && evaluate(s.answers).allCorrect ? "Lektion abgeschlossen. Du kannst sie jederzeit wiederholen." : "Du kannst die Notiz noch einmal ansehen und die Übung später bearbeiten."; }
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
    var summary = d.createElement("p"); summary.textContent = ev.empty ? ev.empty + " Aufgabe(n) sind unbeantwortet." : ev.allCorrect ? "Du hast Zweck, Eingabe, Prüfung und offenen Punkt der Notiz richtig gelesen." : "Lies die Erklärungen und versuche es erneut. Kein Zeitdruck."; box.appendChild(summary); box.hidden = false;
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
    var back = event && event.state ? event.state.lf5Step : "start";
    go(back, true);
  });
  $("check").addEventListener("click", check); $("reset").addEventListener("click", reset);
  $("reset-all").addEventListener("click", function () { if (g.confirm("Gespeicherten Lernfortschritt dieser Lektion zurücksetzen?")) { reset(); go("start"); } });
  load(); build();
  if (STEPS.indexOf(s.step) < 0) s.step = "start";
  Q.forEach(function (q) { var option = q.options.find(function (o) { return o.id === s.answers[q.id]; }); if (option) { var input = d.querySelector('input[name="' + q.id + '"][value="' + option.id + '"]'); if (input) input.checked = true; } });
  if (s.checked) render();
  go(s.step, true);
  if (g.history && g.history.replaceState) g.history.replaceState({ lf5Step: s.step }, "", "");
})(typeof window !== "undefined" ? window : globalThis);
