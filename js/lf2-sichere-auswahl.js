/* LF2.3 – Sicher auswählen und Kennzeichnungen prüfen. Fiktive Produktkarten, keine echten Produkte oder Daten. */
(function (g) {
  "use strict";
  var ID = "lf2-sichere-auswahl";
  var KEY = "it-ausbildung.lf2-sichere-auswahl.v1";
  var STEPS = ["start", "case", "exercise", "finish"];
  var Q = [
    { id: "q1", correct: "klaeren",
      prompt: "Karte B (Netzteil „Voltix N-65“) zeigt keine CE-Kennzeichnung. Das Netzteil soll am Empfangsplatz eingesetzt werden. Was ist der richtige nächste Schritt?",
      options: [
        { id: "egal", label: "Nichts. Hauptsache, es ist günstig.", feedback: "Eine fehlende Sicherheitsangabe ist kein Preisthema. Ein Kriterium wie „CE-Kennzeichnung vorhanden“ ist ein Pflichtkriterium: Fehlt sie, scheidet die Karte vorerst aus." },
        { id: "klaeren", label: "Karte B zurückstellen und beim Anbieter nachfragen, ob und wo die Kennzeichnung angebracht ist.", feedback: "Richtig. Fehlende Pflichtangaben werden geklärt, bevor eine Auswahl fällt. Bis dahin gilt die Karte nicht als geeignet." },
        { id: "selbst", label: "Selbst ein CE-Zeichen anbringen, damit die Karte vollständig aussieht.", feedback: "Das ist nicht erlaubt. Verantwortlich für die CE-Kennzeichnung ist der Hersteller, und sie darf erst nach erfolgreicher Konformitätsbewertung angebracht werden." }
      ] },
    { id: "q2", correct: "getrennt",
      prompt: "Karte A (Monitor „Lumo 24“) zeigt das Symbol der durchgestrichenen Abfalltonne auf Rädern. Was sagt dieses Symbol aus?",
      options: [
        { id: "geprueft", label: "Das Gerät wurde besonders streng auf Sicherheit geprüft.", feedback: "Das Symbol hat nichts mit einer Sicherheitsprüfung zu tun. Es betrifft die Entsorgung." },
        { id: "recycelt", label: "Das Gerät besteht vollständig aus recyceltem Material.", feedback: "Über das Material sagt das Symbol nichts. Es zeigt, wie das Altgerät später entsorgt werden soll." },
        { id: "getrennt", label: "Das Altgerät soll nicht in den unsortierten Abfall, sondern an einer getrennten Sammelstelle abgegeben werden.", feedback: "Richtig. Das Symbol kennzeichnet Elektro- und Elektronikgeräte für die getrennte Sammlung. Es ist ein Entsorgungshinweis, kein Sicherheitszeichen." }
      ] },
    { id: "q3", correct: "unbelegt",
      prompt: "Karte C (Headset „Klangtal H3“) trägt ein Logo „Top Quality Approved“ ohne Angabe einer Prüfstelle. Wie gehst du damit um?",
      options: [
        { id: "unbelegt", label: "Als nicht belegte Werbeaussage behandeln: Es ersetzt weder CE noch ein Prüfzeichen, und die Prüfstelle fehlt.", feedback: "Richtig. Ein Logo ohne nachvollziehbare Prüfstelle belegt nichts. Für die Auswahl zählen nur Angaben, die du prüfen kannst." },
        { id: "ersatz", label: "Als vollwertigen Ersatz für die CE-Kennzeichnung werten.", feedback: "Die CE-Kennzeichnung hat einen festen Rechtsrahmen. Ein frei gestaltetes Logo ersetzt sie nicht." },
        { id: "gs", label: "Als GS-Zeichen werten, weil es ähnlich klingt.", feedback: "Das GS-Zeichen steht für „geprüfte Sicherheit“ und hat eine feste Form. Ein ähnlicher Name genügt nicht." }
      ] },
    { id: "q4", correct: "sicherheit",
      prompt: "Auf Karte D (Leuchte „Lichtblick L1“) ist ein GS-Zeichen abgebildet. Welche Schlussfolgerung ist fachlich passend?",
      options: [
        { id: "leistung", label: "Die Leuchte hält besonders lange und ist besonders hell.", feedback: "Zu Lebensdauer und Leistung sagt das GS-Zeichen nichts. Es ist kein umfassendes Qualitätssiegel." },
        { id: "sicherheit", label: "Es weist auf eine geprüfte Sicherheit des Produkts hin, sagt aber nichts über Leistung oder Lebensdauer.", feedback: "Richtig. GS steht für „geprüfte Sicherheit“. Es ist kein Qualitätssiegel für Leistung oder Haltbarkeit." },
        { id: "entsorgung", label: "Die Leuchte darf im Hausmüll entsorgt werden.", feedback: "Das GS-Zeichen hat mit der Entsorgung nichts zu tun. Dafür steht ein anderes Symbol." }
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

  function progressText(s) {
    s = s || {};
    var done = (s.checked ? evaluate(s.answers).correct : 0) + (s.finish ? 1 : 0);
    return "Fortschritt: " + done + " von " + (Q.length + 1) + " Schritten \u00b7 Abschluss " + (s.finish ? "ge\u00f6ffnet" : "noch nicht ge\u00f6ffnet");
  }

  var api = { ID: ID, KEY: KEY, STEPS: STEPS, QUESTIONS: Q, evaluate: evaluate, progress: progress, progressText: progressText };
  g.LF2_SICHERE_AUSWAHL = api;
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
    $("pct").textContent = progressText(s);
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
        : "Du kannst die Produktkarten erneut ansehen und die Übung später bearbeiten.";
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
    p.textContent = ev.empty ? ev.empty + " Aufgabe(n) sind unbeantwortet." : ev.allCorrect ? "Du hast die Kennzeichnungen sicher eingeordnet." : "Lies die Erklärungen und versuche es erneut. Kein Zeitdruck.";
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
