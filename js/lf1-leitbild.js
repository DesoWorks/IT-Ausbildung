/* Lernfeld 1.2: Woran orientiert sich ein Betrieb? Ziele und Leitbild im fiktiven Beispielbetrieb. */
(function (global) {
  "use strict";

  var ID = "lf1-leitbild-ziele";
  var KEY = "it-ausbildung.lf1-leitbild-ziele.v1";
  var STEPS = ["start", "erklaerung", "beispiel", "uebung", "abschluss"];
  var TERMS = ["Leitbild", "Ökonomisches Ziel", "Ökologisches Ziel", "Soziales Ziel", "Zielkonflikt", "Nachhaltigkeit"];

  // Reihenfolge der Optionen ist fest; die richtige Antwort steht bewusst an wechselnden Positionen.
  var QUESTIONS = [
    {
      id: "q1",
      prompt: "Wofür ist ein Leitbild in einem Betrieb gedacht?",
      correct: "q1-orientierung",
      options: [
        { id: "q1-vertrag", label: "Es ersetzt Arbeitsverträge und gesetzliche Vorgaben im Betrieb.",
          feedback: "Ein Leitbild ersetzt weder Verträge noch Gesetze. Es ist eine Selbstverpflichtung des Betriebs und steht neben diesen Regeln." },
        { id: "q1-orientierung", label: "Es beschreibt Werte und Ziele, an denen sich Entscheidungen orientieren sollen.",
          feedback: "Richtig. Ein Leitbild gibt eine gemeinsame Richtung vor. Daran können Beschäftigte und Kundschaft erkennen, wofür der Betrieb steht." },
        { id: "q1-aufgaben", label: "Es legt fest, welche Aufgaben jede Person an jedem Tag erledigt.",
          feedback: "Tägliche Aufgaben stehen in Arbeitsanweisungen oder Absprachen. Ein Leitbild bleibt allgemeiner und beschreibt die Richtung." }
      ]
    },
    {
      id: "q2",
      prompt: "Im fiktiven Leitbild von Nordlicht IT-Service steht: „Wir verlängern die Nutzungsdauer von Geräten und geben Altgeräte in ein geordnetes Recycling.“ Welche Zielart ist das?",
      correct: "q2-oekologisch",
      options: [
        { id: "q2-oekonomisch", label: "Ein ökonomisches Ziel, weil es um Geräte und deren Wert geht.",
          feedback: "Geräte haben zwar einen Wert, die Aussage zielt aber auf Ressourcen und Abfall. Das ist der ökologische Blickwinkel." },
        { id: "q2-sozial", label: "Ein soziales Ziel, weil Menschen die Geräte nutzen.",
          feedback: "Menschen nutzen die Geräte, die Aussage beschreibt aber den Umgang mit Ressourcen und Altgeräten, nicht den Umgang mit Menschen." },
        { id: "q2-oekologisch", label: "Ein ökologisches Ziel, weil es um Ressourcen und Abfall geht.",
          feedback: "Richtig. Längere Nutzung und Recycling schonen Ressourcen und verringern Abfall. Das sind ökologische Ziele." }
      ]
    },
    {
      id: "q3",
      prompt: "Im Leitbild steht außerdem: „Wir sorgen für verlässliche Arbeitszeiten und fördern Weiterbildung.“ Welche Zielart ist das?",
      correct: "q3-sozial",
      options: [
        { id: "q3-sozial", label: "Ein soziales Ziel, weil es um die Beschäftigten geht.",
          feedback: "Richtig. Arbeitsbedingungen und Weiterbildung betreffen die Menschen im Betrieb. Das gehört zu den sozialen Zielen." },
        { id: "q3-oekonomisch", label: "Ein ökonomisches Ziel, weil Weiterbildung Geld kostet.",
          feedback: "Weiterbildung verursacht Kosten, die Aussage beschreibt aber den Umgang mit Beschäftigten. Maßgeblich ist, worauf sich das Ziel richtet." },
        { id: "q3-oekologisch", label: "Ein ökologisches Ziel, weil es um langfristige Entwicklung geht.",
          feedback: "Langfristigkeit allein macht ein Ziel nicht ökologisch. Ökologisch ist es, wenn Umwelt und Ressourcen im Mittelpunkt stehen." }
      ]
    },
    {
      id: "q4",
      prompt: "Ein weiterer Satz im Leitbild lautet: „Wir arbeiten kostendeckend und investieren verlässlich in unsere Technik.“ Welche Zielart ist das?",
      correct: "q4-oekonomisch",
      options: [
        { id: "q4-sozial", label: "Ein soziales Ziel, weil gute Technik die Arbeit erleichtert.",
          feedback: "Technik kann Arbeit erleichtern, die Aussage beschreibt aber Kosten und Investitionen. Das ist der wirtschaftliche Blickwinkel." },
        { id: "q4-oekonomisch", label: "Ein ökonomisches Ziel, weil es um Kosten und Investitionen geht.",
          feedback: "Richtig. Kostendeckung und Investitionen sichern, dass der Betrieb wirtschaftlich bestehen kann. Das sind ökonomische Ziele." },
        { id: "q4-oekologisch", label: "Ein ökologisches Ziel, weil Technik Energie verbraucht.",
          feedback: "Energieverbrauch ist ein ökologischer Aspekt, kommt in dieser Aussage aber nicht vor. Hier geht es um Kosten und Investitionen." }
      ]
    },
    {
      id: "q5",
      prompt: "Nordlicht plant neue Bildschirme für Arbeitsplätze. Modell A ist im Beispiel günstiger, aber nur kürzer nutzbar. Modell B kostet mehr, ist länger nutzbar und reparierbar. Was beschreibt den Zielkonflikt am besten?",
      correct: "q5-abwaegen",
      options: [
        { id: "q5-leitbild", label: "Das Leitbild entscheidet automatisch, deshalb müssen Kosten nicht betrachtet werden.",
          feedback: "Ein Leitbild gibt Richtung vor, ersetzt aber keine Abwägung. Kosten bleiben ein berechtigter Teil der Entscheidung." },
        { id: "q5-teuer", label: "Das teurere Modell ist in jedem Fall auch das wirtschaftlich bessere.",
          feedback: "Das lässt sich nicht pauschal sagen. Erst ein Vergleich der Gesamtkosten über die Nutzungsdauer zeigt, was sich lohnt." },
        { id: "q5-abwaegen", label: "Niedrige Anschaffungskosten und geringerer Ressourcenverbrauch lassen sich hier nur abwägen.",
          feedback: "Richtig. Wirtschaftliche und ökologische Ziele ziehen hier in verschiedene Richtungen. Man vergleicht Kriterien und stimmt die Entscheidung ab." },
        { id: "q5-kein", label: "Es gibt keinen Konflikt, weil ökonomische und ökologische Ziele nie gegeneinander stehen.",
          feedback: "Manchmal passen Ziele zusammen, oft aber nicht. Genau dann spricht man von einem Zielkonflikt." }
      ]
    }
  ];

  function findOption(q, optionId) {
    for (var i = 0; i < q.options.length; i++) if (q.options[i].id === optionId) return q.options[i];
    return null;
  }

  // Auswertung ausschließlich über stabile Antwort-IDs.
  function evaluate(answers) {
    answers = answers || {};
    var results = QUESTIONS.map(function (q) {
      var option = findOption(q, answers[q.id]);
      var status = !option ? "empty" : (option.id === q.correct ? "correct" : "wrong");
      return { id: q.id, status: status, optionId: option ? option.id : "", feedback: option ? option.feedback : "" };
    });
    var count = function (s) { return results.filter(function (r) { return r.status === s; }).length; };
    return { results: results, correct: count("correct"), wrong: count("wrong"), empty: count("empty"), allCorrect: count("correct") === QUESTIONS.length };
  }

  // Nur eine aktuelle, geprüfte Auswertung zählt; nach einer Antwortänderung (checked=false) entfällt sie.
  function progress(state) {
    state = state || {};
    var correct = state.checked ? evaluate(state.answers).correct : 0;
    return Math.round((correct + (state.finish ? 1 : 0)) / (QUESTIONS.length + 1) * 100);
  }

  function isComplete(state) {
    state = state || {};
    return !!state.finish && !!state.checked && evaluate(state.answers).allCorrect;
  }

  var api = { ID: ID, KEY: KEY, STEPS: STEPS, QUESTIONS: QUESTIONS, TERMS: TERMS, evaluate: evaluate, progress: progress, isComplete: isComplete };
  global.LF1_LEITBILD = api;
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  if (!global.document) return;

  var doc = global.document;
  var state = { answers: {}, checked: false, finish: false };

  function $(id) { return doc.getElementById(id); }

  function load() {
    try {
      var saved = JSON.parse(global.localStorage.getItem(KEY) || "null");
      if (saved) {
        state.answers = saved.answers || {};
        state.checked = !!saved.checked;
        state.finish = !!saved.finish;
      }
    } catch (e) { /* ohne Speicher weiterlernen */ }
  }

  function save() {
    try { global.localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* ohne Speicher weiterlernen */ }
  }

  function update() {
    var n = progress(state);
    $("fortschritt-balken").style.width = n + "%";
    $("fortschritt-text").textContent = "Fortschritt: " + n + " %";
  }

  function goTo(id) {
    STEPS.forEach(function (s) { $(s).hidden = s !== id; });
    doc.querySelectorAll(".schritt-knopf").forEach(function (b) {
      if (b.dataset.ziel === id) b.setAttribute("aria-current", "step"); else b.removeAttribute("aria-current");
    });
    if (id === "abschluss") { state.finish = true; save(); }
    update();
    $("hauptinhalt").focus();
    global.scrollTo(0, 0);
  }

  function glossaryItem(term) {
    return (global.GLOSSAR || []).filter(function (g) { return g.begriff === term; })[0] || null;
  }

  function termDetails(term) {
    var item = glossaryItem(term);
    if (!item) return null;
    var d = doc.createElement("details"), s = doc.createElement("summary"), p = doc.createElement("p"), a = doc.createElement("a");
    d.className = "fachwort-hinweis";
    s.textContent = item.begriff;
    p.textContent = item.erklaerung + " ";
    a.href = "../glossar.html?von=lf1-leitbild.html";
    a.textContent = "Im Glossar ansehen";
    p.appendChild(a);
    d.append(s, p);
    return d;
  }

  function buildTerms() {
    // Fachwörter direkt am jeweiligen Inhalt und gesammelt auf der Startseite.
    doc.querySelectorAll("[data-begriffe]").forEach(function (host) {
      host.dataset.begriffe.split("|").forEach(function (term) {
        var d = termDetails(term);
        if (d) host.appendChild(d);
      });
    });
    var all = $("fachwoerter-liste");
    TERMS.concat(["Betrieb"]).forEach(function (term) {
      var d = termDetails(term);
      if (d) all.appendChild(d);
    });
  }

  function buildQuestions() {
    var host = $("leitbild-fragen");
    QUESTIONS.forEach(function (q, index) {
      var field = doc.createElement("fieldset"), legend = doc.createElement("legend"), group = doc.createElement("div"), feedback = doc.createElement("p");
      field.className = "rollen-frage";
      legend.textContent = (index + 1) + ". " + q.prompt;
      field.appendChild(legend);
      group.className = "rollen-optionen";
      q.options.forEach(function (o) {
        var label = doc.createElement("label"), input = doc.createElement("input"), text = doc.createElement("span");
        input.type = "radio";
        input.name = q.id;
        input.value = o.id;
        input.checked = false;
        label.className = "rollen-option";
        text.textContent = o.label;
        label.append(input, text);
        input.addEventListener("change", function () { onChange(q.id, o.id); });
        group.appendChild(label);
      });
      field.appendChild(group);
      feedback.id = "feedback-" + q.id;
      feedback.className = "rollen-feedback";
      feedback.hidden = true;
      feedback.setAttribute("aria-live", "polite");
      field.appendChild(feedback);
      host.appendChild(field);
    });
  }

  function restoreSelection() {
    QUESTIONS.forEach(function (q) {
      var option = findOption(q, state.answers[q.id]);
      if (!option) { delete state.answers[q.id]; return; }
      var input = doc.querySelector('input[name="' + q.id + '"][value="' + option.id + '"]');
      if (input) input.checked = true;
    });
  }

  function selected(q) {
    var input = doc.querySelector('input[name="' + q.id + '"]:checked');
    return input ? input.value : "";
  }

  function hideResult() {
    var box = $("leitbild-ergebnis");
    box.hidden = true;
    box.textContent = "";
    QUESTIONS.forEach(function (q) {
      var f = $("feedback-" + q.id);
      f.hidden = true;
      f.textContent = "";
    });
  }

  function onChange(questionId, optionId) {
    state.answers[questionId] = optionId;
    state.checked = false;
    hideResult();
    save();
    update();
  }

  function renderResult() {
    var ev = evaluate(state.answers), box = $("leitbild-ergebnis"), h = doc.createElement("h3"), summary = doc.createElement("p");
    box.textContent = "";
    box.appendChild(h);
    ev.results.forEach(function (r, index) {
      var q = QUESTIONS[index], row = doc.createElement("p"), option = findOption(q, r.optionId), f = $("feedback-" + q.id);
      var head = r.status === "correct" ? "✓ Richtig: " : r.status === "wrong" ? "✗ Noch nicht richtig: " : "○ Nicht beantwortet: ";
      var text = r.status === "empty" ? "Wähle eine Antwort und prüfe erneut." : r.feedback;
      row.textContent = head + "Aufgabe " + (index + 1) + ". " + (option ? "Deine Antwort: " + option.label + " " : "") + text;
      box.appendChild(row);
      f.textContent = r.status === "empty" ? "Noch nicht beantwortet. Wähle eine Antwort und prüfe erneut." : r.feedback;
      f.hidden = false;
    });
    h.textContent = ev.allCorrect ? "Alle Antworten richtig" : ev.correct ? "Teilweise richtig" : ev.empty === QUESTIONS.length ? "Noch keine Antwort gewählt" : "Noch nicht richtig";
    summary.textContent = ev.empty ? ev.empty + " Aufgabe(n) sind unbeantwortet." :
      ev.allCorrect ? "Du hast alle Aussagen passend eingeordnet." : "Lies die Hinweise und versuche es erneut. Es gibt keinen Zeitdruck.";
    box.appendChild(summary);
    box.hidden = false;
  }

  function check() {
    QUESTIONS.forEach(function (q) {
      var value = selected(q);
      if (value) state.answers[q.id] = value; else delete state.answers[q.id];
    });
    state.checked = true;
    renderResult();
    save();
    update();
  }

  function reset() {
    state = { answers: {}, checked: false, finish: false };
    save();
    doc.querySelectorAll('#leitbild-fragen input[type="radio"]').forEach(function (i) { i.checked = false; });
    hideResult();
    update();
  }

  doc.querySelectorAll("[data-ziel]").forEach(function (b) { b.addEventListener("click", function () { goTo(b.dataset.ziel); }); });
  doc.querySelectorAll("[data-weiter]").forEach(function (b) { b.addEventListener("click", function () { goTo(b.dataset.weiter); }); });
  $("antworten-pruefen").addEventListener("click", check);
  $("uebung-reset").addEventListener("click", reset);
  $("reset-alles").addEventListener("click", function () {
    if (global.confirm("Gespeicherten Lernfortschritt dieser Lektion zurücksetzen?")) { reset(); goTo("start"); }
  });

  load();
  buildTerms();
  buildQuestions();
  restoreSelection();
  if (state.checked) renderResult();
  update();
})(typeof window !== "undefined" ? window : globalThis);
