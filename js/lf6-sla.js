/* Lernfeld 6: Fiktives SLA lesen, keine Zusatzleistungen erfinden. */
(function (g) {
  "use strict";
  var ID = "lf6-sla";
  var KEY = "it-ausbildung.lf6-sla.v1";
  var STEPS = ["start", "case", "exercise", "finish"];
  var Q = [
    { id: "q1", prompt: "Die Anfrage geht am Montag um 10 Uhr ein. Welche Reaktionsfrist gilt laut Übungs-SLA?", correct: "reaktion", options: [
      { id: "reparatur", label: "Die Störung muss bis 12 Uhr vollständig repariert und das Gerät wieder einsatzbereit sein.", feedback: "Die zwei Servicestunden gelten für die erste qualifizierte Rückmeldung. Eine fertige Reparatur bis 12 Uhr ist nicht vereinbart." },
      { id: "reaktion", label: "Erste qualifizierte Rückmeldung bis 12 Uhr.", feedback: "Richtig. Montag 10 bis 12 Uhr liegt innerhalb der Servicezeit. Die Reaktionsfrist verspricht keine abgeschlossene Reparatur." },
      { id: "morgen", label: "Samira darf bis Dienstag warten, weil die Frist grundsätzlich erst am nächsten Tag beginnt.", feedback: "Die Anfrage kommt innerhalb der Servicezeit an. Deshalb beginnen die zwei Servicestunden schon am Montag um 10 Uhr." }
    ] },
    { id: "q2", prompt: "Was gehört bei der Meldung zum schwarzen Empfangsmonitor zum vereinbarten Umfang?", correct: "aufnahme", options: [
      { id: "ersatz", label: "Samira bestellt einen neuen Monitor und verspricht eine kostenlose Lieferung an den Empfang.", feedback: "Gerätekauf und Austausch sind nicht enthalten. Samira darf diese Leistungen nicht eigenmächtig als kostenlos zusagen." },
      { id: "reparieren", label: "Samira führt vor Ort eine vollständige Reparatur durch und erklärt sie zur Vertragsleistung.", feedback: "Vor-Ort-Reparaturen sind ausgeschlossen. Vereinbart sind hier nur Aufnahme und erste Eingrenzung per Telefon." },
      { id: "aufnahme", label: "Aufnahme und erste Eingrenzung per Telefon.", feedback: "Richtig. Samira kann die Meldung aufnehmen und erste Angaben telefonisch sammeln. Das ist noch keine Zusage für eine Reparatur." }
    ] },
    { id: "q3", prompt: "Welche Leistung ist im fiktiven SLA ausdrücklich nicht enthalten?", correct: "vorort", options: [
      { id: "vorort", label: "Eine Vor-Ort-Reparatur.", feedback: "Richtig. Vor-Ort-Reparaturen sind ausgeschlossen. Samira klärt eine solche Anfrage, statt sie als enthalten zu behandeln." },
      { id: "erfassen", label: "Die Aufnahme der Störungsmeldung während der vereinbarten Servicezeit.", feedback: "Die Aufnahme einer Störungsmeldung ist vereinbart. Vor-Ort-Reparaturen stehen dagegen ausdrücklich bei den Ausschlüssen." },
      { id: "telefon", label: "Die erste telefonische Eingrenzung einer Störung am betreuten Empfangsarbeitsplatz.", feedback: "Die erste telefonische Eingrenzung gehört zum Umfang. Eine Vor-Ort-Reparatur gehört ausdrücklich nicht dazu." }
    ] },
    { id: "q4", prompt: "Die anfragende Person möchte einen sofortigen Vor-Ort-Austausch. Was darf Samira tun?", correct: "klaeren", options: [
      { id: "heimlich", label: "Samira fährt heimlich hin und tauscht das Gerät, ohne die zusätzliche Leistung abzustimmen.", feedback: "Ein heimlicher Austausch überschreitet die Vereinbarung. Samira dokumentiert den Wunsch und klärt das weitere Vorgehen." },
      { id: "klaeren", label: "Wunsch dokumentieren und Freigabe klären.", feedback: "Richtig. Samira gibt die Anfrage an die zuständige Serviceleitung weiter. Sie verspricht keine Zusatzleistung oder Frist ohne Freigabe." },
      { id: "erfinden", label: "Samira erklärt den Austausch zur enthaltenen Leistung und verspricht ihn sofort kostenlos.", feedback: "Samira darf den Umfang nicht selbst erweitern. Zusatzleistungen müssen vorher mit der zuständigen Stelle geklärt und freigegeben werden." }
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
  g.LF6_SLA = api;
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  if (!g.document) return;
  var d = g.document, s = { answers: {}, checked: false, finish: false, step: "start" };
  function $(id) { return d.getElementById(id); }
  function load() {
    try {
      var x = JSON.parse(g.localStorage.getItem(KEY) || "null");
      if (x && typeof x === "object" && !Array.isArray(x)) {
        s.answers = x.answers && typeof x.answers === "object" && !Array.isArray(x.answers) ? x.answers : {};
        s.checked = x.checked === true;
        s.finish = x.finish === true;
        s.step = STEPS.indexOf(x.step) >= 0 ? x.step : "start";
      }
    } catch (e) { /* Speicher kann gesperrt sein. */ }
  }
  function save() { try { g.localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) { /* Lektion bleibt ohne Speicherung bedienbar. */ } if (g.LERNFORTSCHRITT) g.LERNFORTSCHRITT.benachrichtigen(); }
  function update() {
    $("bar").style.width = barWidth(s) + "%";
    $("pct").textContent = progressText(s);
    $("done").textContent = s.finish ? s.checked && evaluate(s.answers).allCorrect ? "Lektion abgeschlossen. Du kannst sie jederzeit wiederholen." : "Du kannst das Beispiel noch einmal ansehen und die Übung später bearbeiten." : "";
  }
  function go(id, fromHistory) {
    if (STEPS.indexOf(id) < 0) id = "start";
    STEPS.forEach(function (x) { $(x).hidden = x !== id; });
    d.querySelectorAll("[data-step]").forEach(function (b) { if (b.dataset.step === id) b.setAttribute("aria-current", "step"); else b.removeAttribute("aria-current"); });
    s.step = id;
    if (!fromHistory && g.history && g.history.pushState) g.history.pushState({ lf6SlaStep: id }, "", "");
    if (id === "finish") s.finish = true;
    save(); update(); $("main").focus(); g.scrollTo(0, 0);
  }
  function hide() {
    $("result").hidden = true; $("result").textContent = "";
    Q.forEach(function (q) { $("fb-" + q.id).hidden = true; $("fb-" + q.id).textContent = ""; });
  }
  function build() {
    Q.forEach(function (q, index) {
      var field = d.createElement("fieldset"), legend = d.createElement("legend"), group = d.createElement("div"), feedback = d.createElement("p");
      field.className = "question"; legend.textContent = (index + 1) + ". " + q.prompt; field.appendChild(legend); group.className = "opts";
      q.options.forEach(function (o) {
        var label = d.createElement("label"), input = d.createElement("input"), span = d.createElement("span");
        input.type = "radio"; input.name = q.id; input.value = o.id; input.setAttribute("aria-describedby", "fb-" + q.id); span.textContent = o.label; label.className = "opt"; label.append(input, span);
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
    var summary = d.createElement("p"); summary.textContent = ev.empty ? ev.empty + " Aufgabe(n) sind unbeantwortet." : ev.allCorrect ? "Du unterscheidest Reaktionszeit, Leistungsumfang und Ausschlüsse und klärst Zusatzwünsche, statt Leistungen zu erfinden." : "Lies die Erklärungen und versuche es erneut. Kein Zeitdruck."; box.appendChild(summary); box.hidden = false;
  }
  function check() {
    s.answers = {};
    Q.forEach(function (q) { var input = d.querySelector('input[name="' + q.id + '"]:checked'); if (input) s.answers[q.id] = input.value; });
    s.checked = true; render(); save(); update();
  }
  function reset() {
    s = { answers: {}, checked: false, finish: false, step: s.step || "start" }; d.querySelectorAll('#questions input[type="radio"]').forEach(function (input) { input.checked = false; }); hide(); save(); update();
  }
  d.querySelectorAll("[data-step]").forEach(function (b) { b.addEventListener("click", function () { go(b.dataset.step); }); });
  d.querySelectorAll("[data-next]").forEach(function (b) { b.addEventListener("click", function () { go(b.dataset.next); }); });
  if (g.addEventListener) g.addEventListener("popstate", function (event) { go(event && event.state ? event.state.lf6SlaStep : "start", true); });
  $("check").addEventListener("click", check); $("reset").addEventListener("click", reset);
  $("reset-all").addEventListener("click", function () { if (g.confirm("Gespeicherten Lernfortschritt dieser Lektion zurücksetzen?")) { reset(); go("start"); } });
  load(); build();
  Q.forEach(function (q) { var option = q.options.find(function (o) { return o.id === s.answers[q.id]; }); if (option) { var input = d.querySelector('input[name="' + q.id + '"][value="' + option.id + '"]'); if (input) input.checked = true; } });
  if (s.checked) render();
  go(s.step, true);
  if (g.history && g.history.replaceState) g.history.replaceState({ lf6SlaStep: s.step }, "", "");
})(typeof window !== "undefined" ? window : globalThis);
