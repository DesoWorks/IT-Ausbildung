/* Gemeinsame Abschlussableitung aus den bestehenden Lernzuständen.
 * Es wird kein eigener Abschlusswert gespeichert. */
(function (global) {
  "use strict";
  var SCHLUESSEL = {
    "computer-grundlagen": "it-ausbildung.computer-grundlagen.v1",
    "lf1-betrieb-aufgaben": "it-ausbildung.lf1-betrieb-aufgaben.v1",
    "lf1-leitbild-ziele": "it-ausbildung.lf1-leitbild-ziele.v1",
    "lf1-markt-kundschaft": "it-ausbildung.lf1-markt-kundschaft.v1",
    "lf1-wertschoepfung": "it-ausbildung.lf1-wertschoepfung.v1",
    "lf1-organisation": "it-ausbildung.lf1-organisation.v1",
    "lf1-handlungsspielraum": "it-ausbildung.lf1-handlungsspielraum.v1",
    "lf1-weiterbildung": "it-ausbildung.lf1-weiterbildung.v1",
    "lf1-praesentation": "it-ausbildung.lf1-praesentation.v1",
    "lf1-qualitaet": "it-ausbildung.lf1-qualitaet.v1",
    "lf1-reflexion": "it-ausbildung.lf1-reflexion.v1",
    "lf1-abschluss": "it-ausbildung.lf1-abschluss.v1",
    "lf2-kundenbedarf": "it-ausbildung.lf2-kundenbedarf.v1",
    "lf3-ipv4": "it-ausbildung.netzwerkgrundlagen.v1",
    "lf3-netzmaske": "it-ausbildung.netzmaske.v1",
    "lf3-subnetting": "it-ausbildung.subnetting.v1"
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
      if (id === "lf1-betrieb-aufgaben") {
        var lf1 = state.answers || {};
        return !!state.finish && lf1.q1 === "team" && lf1.q2 === "abstimmen" && lf1.q3 === "betrieb";
      }
      if (id === "lf1-leitbild-ziele") {
        var lf12 = state.answers || {};
        return !!state.finish && !!state.checked && lf12.q1 === "q1-orientierung" && lf12.q2 === "q2-oekologisch" &&
          lf12.q3 === "q3-sozial" && lf12.q4 === "q4-oekonomisch" && lf12.q5 === "q5-abwaegen";
      }
      if (id === "lf1-markt-kundschaft") {
        var market = state.answers || {};
        return !!state.finish && !!state.checked && market.q1 === "kunde" && market.q2 === "lieferant" &&
          market.q3 === "intern" && market.q4 === "wettbewerber";
      }
      if (id === "lf1-wertschoepfung") {
        return !!state.finish && !!state.checked && state.answer === "plan";
      }
      if (id === "lf1-organisation") {
        var org = state.answers || {};
        return !!state.finish && !!state.checked && org.q1 === "service" && org.q2 === "zuordnung" && org.q3 === "leitung";
      }
      if (id === "lf1-handlungsspielraum") {
        var action = state.answers || {};
        return !!state.finish && !!state.checked && action.q1 === "selbst" && action.q2 === "klaeren" && action.q3 === "fragen";
      }
      if (id === "lf1-weiterbildung") {
        return !!state.finish && !!state.checked && state.answer === "step";
      }
      if (id === "lf1-praesentation" || id === "lf1-qualitaet" || id === "lf1-reflexion") {
        var expected = { "lf1-praesentation": "purpose", "lf1-qualitaet": "add", "lf1-reflexion": "learn" };
        return !!state.finish && !!state.checked && state.answer === expected[id];
      }
      if (id === "lf2-kundenbedarf") {
        var need = state.answers || {};
        return !!state.finish && !!state.checked && need.q1 === "anforderung" && need.q2 === "software" && need.q3 === "rahmen" && need.q4 === "klaeren";
      }
      if (id === "lf1-abschluss") {
        var finalAnswers = state.answers || {};
        return !!state.finish && !!state.checked && ["q1", "q2", "q3", "q4"].every(function (q) { return finalAnswers[q] === "yes"; });
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
      if (id === "lf3-subnetting") {
        var subnetAnswers = state.answers || {};
        return !!state.finish && subnetAnswers.q1 === "true" && subnetAnswers.q2 === "true" &&
          subnetAnswers.net1 === "192.168.1.127" && subnetAnswers.net2 === "192.168.1.129";
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
