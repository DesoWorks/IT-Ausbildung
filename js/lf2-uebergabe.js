/* LF2.11 – Arbeitsplatz übergeben und dokumentieren. Vollständig fiktiver Fall (Praxis am Park, Musterarbeitsplatz 3). Prüfergebnisse stammen aus der simulierten Checkliste von LF2.10. Keine echten Kundendaten, keine Rechtsaussagen. */
(function (g) {
  "use strict";
  var ID = "lf2-uebergabe";
  var KEY = "it-ausbildung.lf2-uebergabe.v1";
  var STEPS = ["start", "case", "protocol", "open", "exercise", "finish"];

  // Prüfergebnisse aus LF2.10 (erfunden). Muss mit der Checkliste dort übereinstimmen (siehe Test).
  var RESULTS = [
    { id: "komponenten", label: "Komponenten laut Auftrag vorhanden", ist: "Blickschutzfilter fehlt (Fehlmenge 1)", result: "offen" },
    { id: "sicht", label: "Sichtprüfung von Gehäuse, Kabeln und Steckern", ist: "keine sichtbaren Schäden", result: "ok" },
    { id: "aufbau", label: "Aufbau und Kabelführung", ist: "wie vorgesehen", result: "ok" },
    { id: "start", label: "Rechner startet bis zur Anmeldeseite des Musterprofils", ist: "Anmeldeseite sichtbar", result: "ok" },
    { id: "bild", label: "Bildschirm zeigt ein Bild", ist: "nach Prüfung des Bildkabels stabiles Bild", result: "ok" },
    { id: "eingabe", label: "Tastatur und Maus reagieren", ist: "wie erwartet", result: "ok" }
  ];

  // Der Übergabestatus folgt aus den Prüfergebnissen: Erst ohne offenen Punkt gilt die Übergabe als möglich.
  function status(list) {
    list = list || RESULTS;
    var open = list.filter(function (x) { return x.result !== "ok"; });
    return {
      total: list.length,
      ok: list.length - open.length,
      open: open.length,
      openIds: open.map(function (x) { return x.id; }),
      state: open.length === 0 ? "uebergabebereit" : "zurueckgestellt",
      success: open.length === 0
    };
  }

  var Q = [
    { id: "q1", correct: "nachweis",
      prompt: "Wozu dient das Übergabeprotokoll für Platz 3?",
      options: [
        { id: "formular", label: "Es ist vor allem ein Formular, das irgendwann ausgefüllt wird, damit die Akte vollständig aussieht und abgelegt werden kann.", feedback: "Zu schwach gedacht. Ein Protokoll, das nur der Form dient, hilft später niemandem. Es soll tatsächlich belegen, was übergeben wurde." },
        { id: "nachweis", label: "Es hält fest, was geprüft wurde, in welchem Zustand der Platz ist und was offen ist. So bleibt es nachvollziehbar.", feedback: "Richtig. Das Protokoll ist ein gemeinsamer Nachweis über den Stand. Dazu gehören Prüfergebnisse, offene Punkte und die Bestätigung." },
        { id: "werbung", label: "Es soll die Praxis beeindrucken, daher lässt man offene Punkte besser weg, damit alles gut aussieht.", feedback: "Das wäre irreführend. Ein Protokoll lebt davon, dass es den wahren Stand zeigt, auch wenn dieser nicht perfekt ist." }
      ] },
    { id: "q2", correct: "zurueckgestellt",
      prompt: "Die Prüfung ergab 5 von 6 Punkten bestanden, der Blickschutzfilter fehlt. Welchen Status trägst du im Protokoll für Platz 3 ein?",
      options: [
        { id: "uebergeben", label: "„Übergeben“, weil fast alles bestanden ist und der Platz in den geprüften Punkten sonst funktioniert.", feedback: "Fast ist nicht vollständig. Der Auftrag verlangt den Filter. Ein Status „übergeben“ würde der Praxis etwas Falsches zusagen." },
        { id: "mitvorbehalt", label: "„Erfolgreich übergeben mit kleinem Hinweis“, damit der Status für die Praxis möglichst positiv klingt.", feedback: "Das Wort „erfolgreich“ passt nicht, solange ein Auftragsbestandteil fehlt. Der Status soll den Stand nüchtern benennen." },
        { id: "zurueckgestellt", label: "„Übergabe zurückgestellt: 1 Punkt offen (Blickschutzfilter fehlt)“, bis behoben und nachgeprüft.", feedback: "Richtig. Der Status nennt den Grund und macht klar, was noch passieren muss. Erst danach wird die Übergabe abgeschlossen." }
      ] },
    { id: "q3", correct: "mangeltext",
      prompt: "Wie trägst du den offenen Mangel im Protokoll ein?",
      options: [
        { id: "mangeltext", label: "Mit Prüfpunkt, Soll und Ist: „Komponenten: offen. Soll: Filter vorhanden. Ist: Filter fehlt. Gemeldet an Frau Brandt.“", feedback: "Richtig. Der Eintrag ist sachlich und vollständig. Wer ihn liest, versteht Stand und Zuständigkeit ohne Rückfrage." },
        { id: "kurz", label: "Nur „Filter“ in die Bemerkungsspalte schreiben, weil die Tabelle dort wenig Platz für längere Texte bietet.", feedback: "Das ist zu knapp. Es fehlt, ob der Filter fehlt, defekt ist oder nur noch nicht angebracht wurde, und wer informiert ist." },
        { id: "schuld", label: "„Der Lieferant hat wieder geschlampt, deshalb fehlt der Filter und die Übergabe verzögert sich, das ist nicht unser Fehler.“", feedback: "Eine Schuldzuweisung gehört nicht ins Protokoll. Es zählen überprüfbare Tatsachen, nicht Bewertungen." }
      ] },
    { id: "q4", correct: "ehrlich",
      prompt: "Frau Keller von der Praxis am Park (fiktiv) fragt, ob sie Platz 3 schon nutzen kann. Was antwortest du?",
      options: [
        { id: "zusage", label: "„Ja, alles fertig, Sie können den Platz nutzen.“ Der Filter lässt sich ja später einfach nachrüsten. Das merkt kaum jemand.", feedback: "Das entscheidest nicht du, und es stimmt so nicht. Die Praxis würde einen Platz nutzen, ohne zu wissen, dass ein Teil fehlt." },
        { id: "ehrlich", label: "Du sagst sachlich: Geprüfte Punkte laufen, der Filter fehlt, die Übergabe ist zurückgestellt. Weiteres klärt die Teamleitung.", feedback: "Richtig. Du sagst, was geprüft wurde und was fehlt, ohne etwas zuzusagen, das du nicht entscheiden darfst." },
        { id: "schweigen", label: "Du sagst nichts zum Filter und hoffst, dass es nicht auffällt, bis er geliefert und angebracht wird.", feedback: "Verschweigen ist keine Lösung. Gerade bei Blickschutz kann das für die Praxis wichtig sein, und das Vertrauen leidet, wenn es später herauskommt." }
      ] },
    { id: "q5", correct: "nachpruefen",
      prompt: "Der Filter wird nachgeliefert und angebracht (simuliert). Wie geht es weiter?",
      options: [
        { id: "haken", label: "Den alten Eintrag löschen und alles auf „bestanden“ setzen, ohne Angaben zu Datum, Nachprüfung oder Vorgeschichte.", feedback: "Damit verschwindet die Spur. Später ist nicht mehr zu erkennen, dass etwas fehlte und wann es behoben wurde." },
        { id: "neu", label: "Das ganze Protokoll verwerfen und von vorn beginnen, ohne die Vorgeschichte des Mangels zu nennen.", feedback: "Zu aufwendig und intransparent. Es reicht, den betroffenen Punkt neu zu prüfen und die Änderung nachvollziehbar zu ergänzen." },
        { id: "nachpruefen", label: "Punkt erneut prüfen, Ergebnis mit Datum ergänzen (früherer Eintrag bleibt erkennbar), Status aktualisieren.", feedback: "Richtig. Nachprüfung, Datum und sichtbare Vorgeschichte machen die Änderung nachvollziehbar. Erst jetzt ist die Übergabe möglich." }
      ] },
    { id: "q6", correct: "einweisung",
      prompt: "Alle Punkte sind bestanden. Was gehört zur eigentlichen Übergabe an die Praxis dazu?",
      options: [
        { id: "einweisung", label: "Eine kurze Einweisung, ein Hinweis auf die Ansprechperson und die Bestätigung des Protokolls durch beide Seiten.", feedback: "Richtig. Die Kundschaft soll wissen, wie sie den Platz nutzt, wen sie bei Fragen erreicht, und den Stand mit bestätigen." },
        { id: "schluessel", label: "Nur den Platz stehen lassen und kurz Bescheid geben. Wer ihn braucht, findet sich schon zurecht.", feedback: "Eine Übergabe ist mehr als Abstellen. Ohne Hinweise und Bestätigung bleibt offen, ob der Platz wirklich angenommen wurde." },
        { id: "daten", label: "Persönliche Zugangsdaten der Mitarbeitenden im Protokoll auflisten, damit alles an einer Stelle steht und niemand sucht.", feedback: "Zugangsdaten gehören nie in ein Protokoll. Sie werden getrennt und geschützt weitergegeben, und hier nutzt du ohnehin nur Übungsdaten." }
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

  var api = { ID: ID, KEY: KEY, STEPS: STEPS, RESULTS: RESULTS, QUESTIONS: Q, status: status, evaluate: evaluate, progress: progress, progressText: progressText };
  g.LF2_UEBERGABE = api;
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
        : "Du kannst den Ablauf erneut ansehen und die Übung später bearbeiten.";
    }
    update();
    $("main").focus();
    g.scrollTo(0, 0);
  }
  function clearFeedback() {
    var b = $("result");
    b.hidden = true; b.textContent = "";
    $("done").textContent = "";
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
    p.textContent = ev.empty ? ev.empty + " Aufgabe(n) sind unbeantwortet." : ev.allCorrect ? "Du hast das Übergabeprotokoll ehrlich geführt: Der offene Punkt bleibt sichtbar, bis er behoben und nachgeprüft ist." : "Lies die Erklärungen und versuche es erneut. Kein Zeitdruck.";
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
