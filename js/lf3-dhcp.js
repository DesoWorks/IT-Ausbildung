/* Lernfeld 3: vereinfachte fiktive DHCP-Adressvergabe in einem Ablaufbild lesen. */
(function (g) {
  "use strict";
  var ID = "lf3-dhcp";
  var KEY = "it-ausbildung.lf3-dhcp.v1";
  var STEPS = ["start", "case", "exercise", "finish"];
  var Q = [
    { id: "q1", prompt: "Wozu dient DHCP in diesem Übungsfall?", correct: "automatisch", options: [
      { id: "automatisch", label: "Es gibt dem Client automatisch Konfigurationsangaben.", feedback: "Richtig. In der Simulation liefert der Dienst die Angaben, ohne dass sie fest am Client eingetragen sind." },
      { id: "kabel", label: "Es ersetzt das Netzwerkkabel zwischen Laptop und Dose.", feedback: "Nein. DHCP ist ein Konfigurationsdienst, kein Kabel und keine physische Verbindung." },
      { id: "name", label: "Es beweist, dass ein Name im Internet erreichbar ist.", feedback: "Nein. Die Simulation vergibt Übungsangaben. Sie beweist keine Erreichbarkeit und löst keinen Namen auf." }
    ]},
    { id: "q2", prompt: "Welche Angabe liefert die Simulation für Mira-01 als IPv4-Adresse?", correct: "adresse", options: [
      { id: "adresse", label: "192.168.10.25", feedback: "Richtig. Das ist die Adresse in der simulierten Antwort. Präfix, Gateway und DNS-Server stehen daneben." },
      { id: "gateway", label: "192.168.10.1", feedback: "Nein. 192.168.10.1 ist in der Simulation das Gateway, nicht die Adresse des Clients." },
      { id: "dns", label: "192.168.10.2", feedback: "Nein. 192.168.10.2 ist in der Simulation der DNS-Server, nicht die Adresse des Clients." }
    ]},
    { id: "q3", prompt: "Was gehört in dieser Simulation zur DHCP-Antwort, nicht nur die Adresse?", correct: "vier", options: [
      { id: "vier", label: "Adresse, Präfix, Gateway und DNS-Server.", feedback: "Richtig. Die Simulation liefert diese vier Angaben gemeinsam." },
      { id: "nur", label: "Nur die IPv4-Adresse. Alles andere trägt jemand von Hand ein.", feedback: "Nein. Im Ablaufbild stehen Präfix, Gateway und DNS-Server in derselben Antwort." },
      { id: "wlan", label: "Den WLAN-Namen und das Zugangskennwort des Schulungsraums.", feedback: "Nein. Die Übung enthält kein WLAN und keine Zugangsdaten." }
    ]},
    { id: "q4", prompt: "Was darfst du aus dem Ablaufbild nicht schließen?", correct: "grenze", options: [
      { id: "grenze", label: "Dass ein echter DHCP-Server damit installiert, reserviert oder als sicher bewertet ist.", feedback: "Richtig. Das Bild erklärt den Zweck einer vereinfachten Vergabe. Installation, Reservierung und Sicherheitsbewertung bleiben draußen." },
      { id: "zweck", label: "Dass der Client die Angaben in der Simulation automatisch erhält.", feedback: "Doch, genau das zeigt das Bild: Mira-01 erhält die Übungsangaben ohne feste Eintragung." },
      { id: "lesen", label: "Dass Adresse und Gateway in der Antwort verschiedene Werte sind.", feedback: "Doch. 192.168.10.25 und 192.168.10.1 sind in der Simulation verschiedene Angaben." }
    ]}
  ];
  function evaluate(answers) {
    answers = answers || {};
    var results = Q.map(function (q) {
      var option = q.options.find(function (o) { return o.id === answers[q.id]; });
      return { id: q.id, status: !option ? "empty" : (option.id === q.correct ? "correct" : "wrong"), optionId: option ? option.id : "", feedback: option ? option.feedback : "" };
    });
    var correct = results.filter(function (r) { return r.status === "correct"; }).length;
    var empty = results.filter(function (r) { return r.status === "empty"; }).length;
    return { results: results, correct: correct, wrong: results.length - correct - empty, empty: empty, allCorrect: correct === Q.length };
  }
  function progress(s) { s = s || {}; return Math.round(((s.checked ? evaluate(s.answers).correct : 0) + (s.finish ? 1 : 0)) / (Q.length + 1) * 100); }
  function progressText(s) { return "Fortschritt: " + progress(s) + " %"; }
  var api = { ID: ID, KEY: KEY, STEPS: STEPS, QUESTIONS: Q, evaluate: evaluate, progress: progress, progressText: progressText };
  g.LF3_DHCP = api;
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  if (!g.document) return;
  var d = g.document, s = { answers: {}, checked: false, finish: false };
  function $(id) { return d.getElementById(id); }
  function load() { try { var x = JSON.parse(g.localStorage.getItem(KEY) || "null"); if (x) s = x; } catch (e) { /* Speicher kann gesperrt sein. */ } }
  function save() { try { g.localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) { /* Lektion bleibt ohne Speicherung bedienbar. */ } if (g.LERNFORTSCHRITT) g.LERNFORTSCHRITT.benachrichtigen(); }
  function update() { var n = progress(s); $("bar").style.width = n + "%"; $("pct").textContent = progressText(s); }
  function go(id) {
    STEPS.forEach(function (x) { $(x).hidden = x !== id; });
    d.querySelectorAll("[data-step]").forEach(function (b) { if (b.dataset.step === id) b.setAttribute("aria-current", "step"); else b.removeAttribute("aria-current"); });
    if (id === "finish") { s.finish = true; save(); $("done").textContent = s.checked && evaluate(s.answers).allCorrect ? "Lektion abgeschlossen. Du kannst sie jederzeit wiederholen." : "Du kannst den Ablauf erneut ansehen und die Übung später bearbeiten."; }
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
    var summary = d.createElement("p"); summary.textContent = ev.empty ? ev.empty + " Aufgabe(n) sind unbeantwortet." : ev.allCorrect ? "Du hast den simulierten DHCP-Ablauf passend gelesen." : "Lies die Erklärungen und versuche es erneut. Kein Zeitdruck."; box.appendChild(summary); box.hidden = false;
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
