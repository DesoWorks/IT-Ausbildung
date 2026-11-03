/* Lernfeld 6: Eine Fehlerursache eingrenzen, ohne sie vorher zu behaupten. Kein echtes Ticketsystem. */
(function (g) {
  "use strict";
  var ID = "lf6-ursache";
  var KEY = "it-ausbildung.lf6-ursache.v1";
  var STEPS = ["start", "case", "exercise", "finish"];
  var Q = [
    { id: "q1", prompt: "Samira sieht, dass die Betriebslampe des Monitors aus ist. Was darf sie als Beobachtung notieren?", correct: "lampe", options: [
      { id: "netzteil", label: "Das Netzteil des Monitors ist defekt, weil die Lampe nicht leuchtet und sonst nichts auffällt.", feedback: "Dass die Lampe aus ist, beweist kein defektes Netzteil. Das wäre eine Vermutung, die nicht beobachtet wurde." },
      { id: "tot", label: "Der Monitor ist endgültig kaputt und muss sofort ersetzt werden, bevor weitergesucht wird.", feedback: "Ein Ersatz setzt eine geklärte Ursache voraus. Bisher ist nur bekannt, dass die Lampe aus ist." },
      { id: "lampe", label: "Die Betriebslampe ist aus.", feedback: "Richtig. Das ist sichtbar und überprüfbar. Es ist eine Beobachtung und noch keine Ursache." }
    ] },
    { id: "q2", prompt: "Es kommen drei Möglichkeiten in Frage: Stromkabel, Signalkabel oder der Monitor selbst. Was ist der nächste sichere Schritt?", correct: "stecker", options: [
      { id: "stecker", label: "Den festen Sitz der Stecker ansehen.", feedback: "Richtig. Das ist ein kleiner Schritt ohne Eingriff ins Gerät und schließt eine Möglichkeit aus oder bestätigt sie." },
      { id: "oeffnen", label: "Das Gehäuse des Monitors öffnen und die Bauteile im Inneren genau untersuchen.", feedback: "Geräte werden auf Samiras Stufe nicht geöffnet. Der sichere Schritt ist ein Blick auf die Stecker." },
      { id: "alle", label: "Alle drei Teile gleichzeitig austauschen, damit die Ursache später gar nicht mehr nötig ist.", feedback: "Wer alles zugleich tauscht, erfährt nicht, was die Ursache war. Eingrenzen heißt: ein Schritt nach dem anderen." }
    ] },
    { id: "q3", prompt: "Samira steckt das lose Stromkabel fest ein, die Lampe leuchtet und das Bild kommt. Was darf sie jetzt festhalten?", correct: "lose", options: [
      { id: "unklar", label: "Die Ursache bleibt unbekannt, auch wenn das Bild zurückkam und sich nichts anderes geändert hat.", feedback: "Hier trägt die Beobachtung die Aussage. Ein lose sitzendes Kabel und ein zurückkehrendes Bild gehören zusammen." },
      { id: "lose", label: "Das Stromkabel saß lose, danach kam das Bild.", feedback: "Richtig. Die Beobachtung trägt die Aussage. Samira notiert, was sie gesehen und getan hat." },
      { id: "monitor", label: "Der Monitor war defekt und hat sich von selbst repariert, ohne dass etwas nötig war.", feedback: "Das passt nicht zur Beobachtung. Samira hat etwas getan, und danach kam das Bild zurück." }
    ] },
    { id: "q4", prompt: "Bei einem anderen Monitor bleibt das Bild nach dem Prüfen der Stecker schwarz. Was gilt für die Ursache?", correct: "offen", options: [
      { id: "netz", label: "Das Netzteil muss es sein, weil nach dem Ausschlussverfahren nur noch dieses Bauteil übrig bleibt.", feedback: "Es wurden nicht alle Möglichkeiten geprüft. Ein Ausschlussverfahren ohne vollständige Prüfung beweist nichts." },
      { id: "ersetzen", label: "Der Monitor wird als Ursache eingetragen, damit die Anfrage nicht ohne Eintrag stehenbleibt.", feedback: "Ein Eintrag nur zur Ordnung wäre eine erfundene Ursache. Ehrlicher ist, offen zu lassen, was offen ist." },
      { id: "offen", label: "Sie bleibt offen, Samira notiert den Stand.", feedback: "Richtig. Was nicht gezeigt ist, bleibt offen. Samira notiert den Stand und gibt den Fall bei Bedarf weiter." }
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
  g.LF6_URSACHE = api;
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
    var summary = d.createElement("p"); summary.textContent = ev.empty ? ev.empty + " Aufgabe(n) sind unbeantwortet." : ev.allCorrect ? "Du hast beobachtet, eingegrenzt und eine Ursache erst genannt, als die Beobachtung sie getragen hat. Was offen ist, bleibt offen." : "Lies die Erklärungen und versuche es erneut. Kein Zeitdruck."; box.appendChild(summary); box.hidden = false;
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
