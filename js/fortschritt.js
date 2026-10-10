/* Gemeinsame Abschlussableitung aus den bestehenden Lernzuständen.
 * Es wird kein eigener Abschlusswert gespeichert. */
(function (global) {
  "use strict";
  var SCHLUESSEL = {
    "computer-grundlagen": "it-ausbildung.computer-grundlagen.v1",
    "lf3-ipv4": "it-ausbildung.netzwerkgrundlagen.v1",
    "lf3-netzmaske": "it-ausbildung.netzmaske.v1"
  };

  function abgeschlossen(id) {
    var key = SCHLUESSEL[id];
    if (!key) return false;
    try {
      var raw = global.localStorage.getItem(key);
      if (!raw) return false;
      var state = JSON.parse(raw);
      if (id === "computer-grundlagen") {
        var cards = ["computer", "bildschirm", "tastatur", "maus", "netzwerk"];
        var exercise = [
          ["u-tastatur", "eingabe"], ["u-bildschirm", "ausgabe"],
          ["u-computer", "verarbeitung"], ["u-maus", "eingabe"], ["u-drucker", "ausgabe"]
        ];
        var quiz = ["q1", "q2", "q3", "q4", "q5"];
        return !!state.abschlussGesehen && cards.every(function (k) { return !!state.karten[k]; }) &&
          exercise.every(function (e) { return state.uebung[e[0]] === e[1]; }) &&
          quiz.every(function (q) {
            var answer = state.quiz[q];
            return typeof answer === "number" && answer >= 0;
          }) && quiz.every(function (q) { return [1, 0, 1, 0, 1][quiz.indexOf(q)] === state.quiz[q]; });
      }
      if (id === "lf3-ipv4") {
        var questions = ["anzahl", "wertebereich", "gueltig"];
        var correct = { anzahl: 1, wertebereich: 2, gueltig: 0 };
        return !!state.abschlussGesehen && !!state.eigeneGueltig &&
          questions.every(function (q) { return state.antworten && state.antworten[q] === correct[q]; });
      }
      if (id === "lf3-netzmaske") {
        var answers = state.answers || {};
        return !!state.finish && !!state.network && !!state.broadcast &&
          answers[0] === true && answers[1] === true && answers[2] === true;
      }
    } catch (e) { return false; }
    return false;
  }

  function abschlusszeichen() {
    var mark = global.document.createElement("span");
    mark.className = "abschlusszeichen";
    mark.setAttribute("role", "img");
    mark.setAttribute("aria-label", "Abgeschlossen");
    mark.textContent = "✓";
    return mark;
  }

  function benachrichtigen() {
    try { global.dispatchEvent(new Event("lernfortschritt-geaendert")); } catch (e) { /* nicht jeder Browser stellt Custom Events bereit */ }
  }

  global.LERNFORTSCHRITT = { abgeschlossen: abgeschlossen, abschlusszeichen: abschlusszeichen, benachrichtigen: benachrichtigen };
})(typeof window !== "undefined" ? window : globalThis);
