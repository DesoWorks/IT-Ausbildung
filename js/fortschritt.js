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
    "lf2-kriterien": "it-ausbildung.lf2-kriterien.v1",
    "lf2-sichere-auswahl": "it-ausbildung.lf2-sichere-auswahl.v1",
    "lf2-technische-daten": "it-ausbildung.lf2-technische-daten.v1",
    "lf2-varianten": "it-ausbildung.lf2-varianten.v1",
    "lf2-energie": "it-ausbildung.lf2-energie.v1",
    "lf2-angebote": "it-ausbildung.lf2-angebote.v1",
    "lf2-angebot": "it-ausbildung.lf2-angebot.v1",
    "lf2-beschaffung": "it-ausbildung.lf2-beschaffung.v1",
    "lf2-einrichten": "it-ausbildung.lf2-einrichten.v1",
    "lf2-uebergabe": "it-ausbildung.lf2-uebergabe.v1",
    "lf2-auswertung": "it-ausbildung.lf2-auswertung.v1",
    "lf2-abschluss": "it-ausbildung.lf2-abschluss.v1",
    "lf3-client-anbindung": "it-ausbildung.lf3-client-anbindung.v1",
    "lf3-ipv4-konfiguration": "it-ausbildung.lf3-ipv4-konfiguration.v1",
    "lf3-dhcp": "it-ausbildung.lf3-dhcp.v1",
    "lf3-dns": "it-ausbildung.lf3-dns.v1",
    "lf3-verbindung-eingrenzen": "it-ausbildung.lf3-verbindung-eingrenzen.v1",
    "lf3-fehlerbild-protokoll": "it-ausbildung.lf3-fehlerbild-protokoll.v1",
    "lf3-abschluss": "it-ausbildung.lf3-abschluss.v1",
    "lf3-ipv4": "it-ausbildung.netzwerkgrundlagen.v1",
    "lf3-netzmaske": "it-ausbildung.netzmaske.v1",
    "lf3-subnetting": "it-ausbildung.subnetting.v1",
    "lf4-schutzbedarf": "it-ausbildung.lf4-schutzbedarf.v1",
    "lf4-schutzziele": "it-ausbildung.lf4-schutzziele.v1",
    "lf4-risiken": "it-ausbildung.lf4-risiken.v1",
    "lf4-handlungen": "it-ausbildung.lf4-handlungen.v1",
    "lf4-zugang": "it-ausbildung.lf4-zugang.v1",
    "lf4-vorfall": "it-ausbildung.lf4-vorfall.v1"
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
      if (id === "lf2-kriterien") {
        var crit = state.answers || {};
        return !!state.finish && !!state.checked && crit.q1 === "pflicht" && crit.q2 === "wunsch" && crit.q3 === "messbar" && crit.q4 === "ausscheiden";
      }
      if (id === "lf2-sichere-auswahl") {
        var safe = state.answers || {};
        return !!state.finish && !!state.checked && safe.q1 === "klaeren" && safe.q2 === "getrennt" && safe.q3 === "unbelegt" && safe.q4 === "sicherheit";
      }
      if (id === "lf2-technische-daten") {
        var tech = state.answers || {};
        return !!state.finish && !!state.checked && tech.q1 === "erweiterbar" && tech.q2 === "brisa" && tech.q3 === "typisch" && tech.q4 === "einsenden";
      }
      if (id === "lf2-varianten") {
        var variants = state.answers || {};
        return !!state.finish && !!state.checked && variants.q1 === "pflicht" && variants.q2 === "verschraubt" && variants.q3 === "c43" && variants.q4 === "vento" && variants.q5 === "offen";
      }
      if (id === "lf2-energie") {
        var energy = state.answers || {};
        return !!state.finish && !!state.checked && energy.q1 === "formel" && energy.q2 === "k0116" && energy.q3 === "k3124" && energy.q4 === "diff1672" && energy.q5 === "annahmen";
      }
      if (id === "lf2-angebote") {
        var offers = state.answers || {};
        return !!state.finish && !!state.checked && offers.q1 === "ergaenzen" && offers.q2 === "s960" && offers.q3 === "p38" && offers.q4 === "bvorn" && offers.q5 === "empfehlung";
      }
      if (id === "lf2-angebot") {
        var quote = state.answers || {};
        return !!state.finish && !!state.checked && quote.q1 === "n2850" && quote.q2 === "z19950" && quote.q3 === "g15248" && quote.q4 === "e320198" && quote.q5 === "pruefen";
      }
      if (id === "lf2-beschaffung") {
        var procure = state.answers || {};
        return !!state.finish && !!state.checked && procure.q1 === "ablegen" && procure.q2 === "abgleich" && procure.q3 === "mittwoch" && procure.q4 === "fehlt" && procure.q5 === "sachlich" && procure.q6 === "melden";
      }
      if (id === "lf2-einrichten") {
        var setup = state.answers || {};
        return !!state.finish && !!state.checked && setup.q1 === "vorbereiten" && setup.q2 === "melden" && setup.q3 === "stoppen" && setup.q4 === "kabel" && setup.q5 === "eintrag" && setup.q6 === "nichtfrei";
      }
      if (id === "lf2-uebergabe") {
        var handover = state.answers || {};
        return !!state.finish && !!state.checked && handover.q1 === "nachweis" && handover.q2 === "zurueckgestellt" && handover.q3 === "mangeltext" && handover.q4 === "ehrlich" && handover.q5 === "nachpruefen" && handover.q6 === "einweisung";
      }
      if (id === "lf2-auswertung") {
        var review = state.answers || {};
        return !!state.finish && !!state.checked && review.q1 === "kriterium" && review.q2 === "fakten" && review.q3 === "massnahme" && review.q4 === "einordnen" && review.q5 === "pruefen";
      }
      if (id === "lf2-abschluss") {
        var integrated = state.answers || {};
        return !!state.finish && !!state.checked && integrated.q1 === "anforderung" && integrated.q2 === "pflicht" && integrated.q3 === "gesamt" && integrated.q4 === "melden" && integrated.q5 === "pruefen" && integrated.q6 === "massnahme";
      }
      if (id === "lf1-abschluss") {
        var finalAnswers = state.answers || {};
        return !!state.finish && !!state.checked && ["q1", "q2", "q3", "q4"].every(function (q) { return finalAnswers[q] === "yes"; });
      }
      if (id === "lf3-client-anbindung") {
        var client = state.answers || {};
        return !!state.finish && !!state.checked && client.q1 === "mira" && client.q2 === "switch" && client.q3 === "folge" && client.q4 === "fiktiv";
      }
      if (id === "lf3-ipv4-konfiguration") {
        var shown = state.answers || {};
        return !!state.finish && !!state.checked && shown.q1 === "adresse" && shown.q2 === "praefix" && shown.q3 === "gateway" && shown.q4 === "passt";
      }
      if (id === "lf3-dhcp") {
        var dhcp = state.answers || {};
        return !!state.finish && !!state.checked && dhcp.q1 === "automatisch" && dhcp.q2 === "adresse" && dhcp.q3 === "vier" && dhcp.q4 === "grenze";
      }
      if (id === "lf3-dns") {
        var dns = state.answers || {};
        return !!state.finish && !!state.checked && dns.q1 === "zuordnen" && dns.q2 === "wert" && dns.q3 === "dnsserver" && dns.q4 === "erreichbar";
      }
      if (id === "lf3-verbindung-eingrenzen") {
        var eingrenzen = state.answers || {};
        return !!state.finish && !!state.checked && eingrenzen.q1 === "adresse" && eingrenzen.q2 === "getrennt" && eingrenzen.q3 === "tabelle" && eingrenzen.q4 === "echt";
      }
      if (id === "lf3-fehlerbild-protokoll") {
        var protokoll = state.answers || {};
        return !!state.finish && !!state.checked && protokoll.q1 === "link" && protokoll.q2 === "schritt" && protokoll.q3 === "getrennt" && protokoll.q4 === "frist";
      }
      if (id === "lf3-abschluss") {
        var zusammen = state.answers || {};
        return !!state.finish && !!state.checked && zusammen.q1 === "oktett" && zusammen.q2 === "passt" && zusammen.q3 === "dienst" && zusammen.q4 === "zuordnung" && zusammen.q5 === "naechste" && zusammen.q6 === "getrennt";
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
      if (id === "lf4-schutzbedarf") {
        var schutzbedarf = state.answers || {};
        return !!state.finish && !!state.checked && schutzbedarf.q1 === "hoch" && schutzbedarf.q2 === "mittel" && schutzbedarf.q3 === "niedrig" && schutzbedarf.q4 === "abstimmen";
      }
      if (id === "lf4-schutzziele") {
        var schutzziele = state.answers || {};
        return !!state.finish && !!state.checked && schutzziele.q1 === "vertraulichkeit" && schutzziele.q2 === "integritaet" && schutzziele.q3 === "verfuegbarkeit" && schutzziele.q4 === "abstimmen";
      }
      if (id === "lf4-risiken") {
        var risiken = state.answers || {};
        return !!state.finish && !!state.checked && risiken.q1 === "offen" && risiken.q2 === "melden" && risiken.q3 === "zettel" && risiken.q4 === "nichtprobieren";
      }
      if (id === "lf4-handlungen") {
        var handlungen = state.answers || {};
        return !!state.finish && !!state.checked && handlungen.q1 === "sperren" && handlungen.q2 === "liegenlassen" && handlungen.q3 === "fragen" && handlungen.q4 === "nichttesten";
      }
      if (id === "lf4-zugang") {
        var zugang = state.answers || {};
        return !!state.finish && !!state.checked && zugang.q1 === "eigen" && zugang.q2 === "nichtteilen" && zugang.q3 === "zettelweg" && zugang.q4 === "abstimmen";
      }
      if (id === "lf4-vorfall") {
        var vorfall = state.answers || {};
        return !!state.finish && !!state.checked && vorfall.q1 === "beobachten" && vorfall.q2 === "nichtvermuten" && vorfall.q3 === "melden" && vorfall.q4 === "nichtuntersuchen";
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
