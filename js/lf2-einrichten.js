/* LF2.10 – Arbeitsplatz einrichten und prüfen. Vollständig fiktiver, nicht-produktiver Musterarbeitsplatz mit simulierter Checkliste. Keine echten Systeme, keine Arbeit an Netzspannung, keine Rechtsaussagen. */
(function (g) {
  "use strict";
  var ID = "lf2-einrichten";
  var KEY = "it-ausbildung.lf2-einrichten.v1";
  var STEPS = ["start", "case", "prepare", "inspect", "exercise", "finish"];

  // Simulierte Checkliste für Musterarbeitsplatz 3 (erfunden). Ergebnis: "ok" oder "offen".
  var CHECKLIST = [
    { id: "komponenten", label: "Komponenten laut Auftrag vorhanden", soll: "Rechner, Bildschirm, Blickschutzfilter, Tastatur und Maus", ist: "Blickschutzfilter fehlt (Fehlmenge aus dem Wareneingang)", result: "offen" },
    { id: "sicht", label: "Sichtprüfung von Gehäuse, Kabeln und Steckern", soll: "keine sichtbaren Schäden", ist: "keine sichtbaren Schäden", result: "ok" },
    { id: "aufbau", label: "Aufbau und Kabelführung", soll: "Kabel ohne Zug, Platz frei, Bildschirm in Augenhöhe", ist: "wie vorgesehen", result: "ok" },
    { id: "start", label: "Rechner startet bis zur Anmeldeseite des Musterprofils", soll: "Anmeldeseite sichtbar", ist: "Anmeldeseite sichtbar", result: "ok" },
    { id: "bild", label: "Bildschirm zeigt ein Bild", soll: "stabiles Bild", ist: "zuerst schwarz, nach Prüfung des Bildkabels stabiles Bild", result: "ok" },
    { id: "eingabe", label: "Tastatur und Maus reagieren", soll: "Eingaben werden angezeigt, Zeiger bewegt sich", ist: "wie erwartet", result: "ok" }
  ];

  // Auswertung der Checkliste: ein Platz ist erst übergabefähig, wenn kein Punkt offen ist.
  function summarize(list) {
    list = list || CHECKLIST;
    var open = list.filter(function (x) { return x.result !== "ok"; });
    return { total: list.length, ok: list.length - open.length, open: open.length, openIds: open.map(function (x) { return x.id; }), ready: open.length === 0 };
  }

  var Q = [
    { id: "q1", correct: "vorbereiten",
      prompt: "Du sollst den fiktiven Musterarbeitsplatz 3 einrichten. Was gehört zur Vorbereitung, bevor du etwas zusammensteckst?",
      options: [
        { id: "losgehts", label: "Sofort alles auspacken und anschließen. Fehlendes fällt dann schon auf.", feedback: "Zu früh. Ohne Vergleich mit dem Auftrag merkst du Lücken erst spät und weißt nicht mehr, was vorher schon beschädigt oder unvollständig war." },
        { id: "vorbereiten", label: "Auftrag und Wareneingangsbefund bereitlegen, Platz freiräumen und die Teile gegen die Komponentenliste abgleichen.", feedback: "Richtig. Du weißt, was verlangt ist und was geliefert wurde. Der Platz ist frei, und Abweichungen sind vor dem Aufbau bekannt." },
        { id: "spaeter", label: "Erst aufbauen und die Liste hinterher aus dem Gedächtnis schreiben.", feedback: "Eine Liste aus dem Gedächtnis ist ein schwacher Beleg. Die Prüfpunkte gehören vorher festgelegt und werden beim Prüfen abgehakt." }
      ] },
    { id: "q2", correct: "melden",
      prompt: "Beim Aufbau von Platz 3 liegt kein Blickschutzfilter im Karton (siehe Wareneingang aus der vorigen Lektion). Wie gehst du vor?",
      options: [
        { id: "umbauen", label: "Den Filter von Platz 2 abbauen und an Platz 3 anbringen. Dann fällt es erst später auf.", feedback: "Das verschiebt nur das Problem. Platz 2 ist dann unvollständig, und der Befund ist nicht mehr nachvollziehbar." },
        { id: "abhaken", label: "Den Punkt „Komponenten vorhanden“ trotzdem abhaken, weil der Filter nur Zubehör ist.", feedback: "Der Auftrag verlangt den Filter. Eine Checkliste mit falschem Haken sagt etwas Falsches über den Platz." },
        { id: "melden", label: "Den Punkt als offen eintragen, den Aufbau der übrigen Teile fortsetzen und die Abweichung der zuständigen Person melden.", feedback: "Richtig. Du bleibst ehrlich bei der Checkliste, arbeitest an dem, was möglich ist, und gibst die Abweichung weiter." }
      ] },
    { id: "q3", correct: "stoppen",
      prompt: "Bei der Sichtprüfung siehst du am Netzkabel des Bildschirms (fiktiv) eine stark geknickte Stelle, an der die Isolierung aufgerissen ist. Was tust du?",
      options: [
        { id: "stoppen", label: "Nicht anschließen und nicht einschalten, das Kabel kennzeichnen und getrennt weglegen und die zuständige Person informieren.", feedback: "Richtig. Ein sichtbar beschädigtes Kabel nimmst du nicht in Betrieb. Du sicherst den Befund und meldest ihn, die Entscheidung trifft die zuständige Person." },
        { id: "klebeband", label: "Die Stelle mit Klebeband umwickeln und das Kabel dann normal verwenden.", feedback: "Eine Reparatur am Kabel gehört nicht zu deiner Aufgabe. Die Stelle bleibt ein Risiko, und der Mangel wird nicht dokumentiert." },
        { id: "probieren", label: "Kurz einstecken und testen, ob der Bildschirm trotzdem angeht.", feedback: "Das ist genau das, was die Sichtprüfung vermeiden soll. Beschädigtes wird nicht zum Test in Betrieb genommen." }
      ] },
    { id: "q4", correct: "kabel",
      prompt: "Bei der Funktionsprüfung bleibt der Bildschirm zuerst schwarz (simuliert). Was ist der sinnvolle nächste einfache Schritt?",
      options: [
        { id: "defekt", label: "Den Bildschirm als defekt einstufen und sofort Ersatz beantragen.", feedback: "Zu voreilig. Viele schwarze Bildschirme haben eine einfache Ursache. Zuerst prüfst du das Naheliegende." },
        { id: "kabel", label: "Prüfen, ob das Bildkabel an beiden Enden fest sitzt und der richtige Eingang am Bildschirm gewählt ist, und das Ergebnis notieren.", feedback: "Richtig. Du prüfst die einfachsten Ursachen zuerst und notierst, was du getan hast und was dabei herauskam." },
        { id: "oeffnen", label: "Das Gehäuse des Bildschirms öffnen und nachsehen.", feedback: "Geräte zu öffnen gehört nicht zu dieser Aufgabe. Das ist Sache von dafür ausgebildeten Fachkräften." }
      ] },
    { id: "q5", correct: "eintrag",
      prompt: "Welcher Checklisteneintrag zum fehlenden Blickschutzfilter ist brauchbar?",
      options: [
        { id: "alleskla", label: "Komponenten: OK.", feedback: "Das ist kein Befund, sondern ein Haken ohne Prüfung. Es fehlen Soll, Ist und Hinweis auf die Abweichung." },
        { id: "kommtnoch", label: "Komponenten: OK, der Filter kommt bestimmt noch.", feedback: "Eine Vermutung ersetzt keine Prüfung. Der Ist-Zustand ist: Der Filter fehlt jetzt, und das gehört in den Eintrag." },
        { id: "eintrag", label: "Komponenten: offen. Soll: Rechner, Bildschirm, Filter, Tastatur und Maus. Ist: Filter fehlt, Fehlmenge 1. Gemeldet an Teamleitung (fiktiv: Frau Brandt).", feedback: "Richtig. Der Eintrag nennt Soll, Ist, Ergebnis und die Meldung. Wer ihn liest, versteht den Stand ohne Rückfrage." }
      ] },
    { id: "q6", correct: "nichtfrei",
      prompt: "Alle Punkte außer „Komponenten vorhanden“ sind bestanden. Was gilt für Platz 3?",
      options: [
        { id: "nichtfrei", label: "Der Platz ist noch nicht übergabefähig. Er wird als „nicht freigegeben“ geführt, bis die zuständige Person über den offenen Punkt entschieden hat.", feedback: "Richtig. Ein offener Punkt bleibt sichtbar. Erst wenn er behoben oder von der zuständigen Person entschieden ist, geht der Platz in die Übergabe." },
        { id: "uebergeben", label: "Der Platz wird übergeben. Der Filter kann ja später nachgereicht werden.", feedback: "Das entscheidest nicht du. Ohne Abstimmung bekäme die Kundschaft einen Platz, der vom Auftrag abweicht, ohne es zu wissen." },
        { id: "abwarten", label: "Der Platz wird erst übergeben, wenn die Praxis nachfragt. Bis dahin wird nichts gesagt.", feedback: "Verschweigen ist keine Lösung. Offene Punkte werden aktiv gemeldet, nicht erst auf Nachfrage." }
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

  var api = { ID: ID, KEY: KEY, STEPS: STEPS, CHECKLIST: CHECKLIST, QUESTIONS: Q, summarize: summarize, evaluate: evaluate, progress: progress };
  g.LF2_EINRICHTEN = api;
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
    $("pct").textContent = "Fortschritt: " + n + " %";
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
    p.textContent = ev.empty ? ev.empty + " Aufgabe(n) sind unbeantwortet." : ev.allCorrect ? "Du hast den Musterarbeitsplatz nachvollziehbar vorbereitet, geprüft und die Abweichung richtig weitergegeben." : "Lies die Erklärungen und versuche es erneut. Kein Zeitdruck.";
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
