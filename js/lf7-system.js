/* Fiktive Raumklima-Station, keine reale Anlage. */
(function (g) {
  "use strict";
  var engine = typeof module !== "undefined" && module.exports ? require("./lf7-lektion.js") : g.LF7_LEKTION;
  var api = engine.create({
    id: "lf7-system", title: "Ein cyber-physisches System erkennen",
    goals: ["Sensor, Steuerung, Aktor und IT-System unterscheiden.", "Den Kundenauftrag vor einer Erweiterung klären."],
    theory: [
      ["Auftrag und Grenze", "Samira bei Nordlicht IT-Service untersucht eine erfundene Raumklima-Station im Besprechungsraum. Der fiktive Kundenauftrag lautet: Temperatur anzeigen und oberhalb von 26 °C eine Hinweisleuchte einschalten. Bei genau 26 °C bleibt sie aus. Es gibt keine Verbindung zu einem echten Gebäude und keine automatische Lüftung."],
      ["Vier Rollen", "Der Sensor erfasst die Temperatur der physischen Welt. Die Steuerung vergleicht den Messwert mit der festgelegten Grenze. Der Aktor setzt die Entscheidung physisch um: Hier leuchtet eine Hinweisleuchte. Das IT-System empfängt die Werte und zeigt sie auf einer fiktiven Übersichtsseite an. Eine Anzeige allein verändert nicht die Raumtemperatur."],
      ["Warum cyber-physisch?", "Messwerte aus der physischen Welt werden digital verarbeitet; die Entscheidung wirkt über die Leuchte zurück in die physische Welt. Dieses funktionale Zusammenspiel macht das Beispiel cyber-physisch. Samira zeichnet zunächst die Rollen, statt Geräte zu bestellen oder anzuschließen."]
    ],
    questions: [
      { id: "q1", prompt: "Welche Rolle erfasst die Temperatur?", correct: "sensor", options: [
        { id: "sensor", label: "Der Sensor.", feedback: "Richtig. Der Sensor erfasst die Temperatur und liefert den Messwert an die Steuerung." },
        { id: "aktor", label: "Die Hinweisleuchte, weil jede sichtbare Ausgabe gleichzeitig die Raumtemperatur messen muss.", feedback: "Die Leuchte ist hier der Aktor. Sie zeigt eine Entscheidung, erfasst aber keinen Temperaturwert." },
        { id: "seite", label: "Die Übersichtsseite, weil ein angezeigter Zahlenwert ohne Sensor aus dem Raum entsteht.", feedback: "Die Übersichtsseite empfängt Daten. Für die Erfassung in der physischen Welt braucht das Beispiel den Sensor." }
      ] },
      { id: "q2", prompt: "Wer vergleicht den Wert mit 26 °C?", correct: "steuerung", options: [
        { id: "leuchte", label: "Nur die Leuchte, die ohne Entscheidung den Grenzwert aus ihrer Helligkeit ableitet.", feedback: "Die Leuchte setzt die Entscheidung um. Den Grenzvergleich übernimmt im Beispiel die Steuerung." },
        { id: "steuerung", label: "Die Steuerung.", feedback: "Richtig. Die Steuerung verarbeitet den Messwert und entscheidet anhand der vereinbarten Grenze." },
        { id: "raum", label: "Der Besprechungsraum selbst, weil eine Raumbezeichnung schon eine digitale Regel enthält.", feedback: "Ein Raumname ist keine Steuerung. Für die Entscheidung muss ein Messwert mit einer Regel verglichen werden." }
      ] },
      { id: "q3", prompt: "Was ist in diesem Beispiel der Aktor?", correct: "leuchte", options: [
        { id: "sensor", label: "Der Temperatursensor, weil das reine Erfassen eines Wertes schon die gewünschte Hinweiswirkung ist.", feedback: "Erfassen und Wirken sind verschiedene Rollen. Hier setzt die Hinweisleuchte die Entscheidung physisch um." },
        { id: "auftrag", label: "Der schriftliche Auftrag, weil jede Beschreibung eines Effekts diesen Effekt selbst ausführt.", feedback: "Ein Auftrag beschreibt das Ziel. Der Aktor führt eine physische Wirkung aus, hier das Leuchten." },
        { id: "leuchte", label: "Die Hinweisleuchte.", feedback: "Richtig. Die Leuchte wirkt sichtbar in der physischen Welt und ist hier der Aktor." }
      ] },
      { id: "q4", prompt: "Was muss Samira vor der Erweiterung klären?", correct: "ziel", options: [
        { id: "ziel", label: "Ziel und Grenze des Auftrags.", feedback: "Richtig. Anzeige und Hinweis oberhalb von 26 °C sind das Ziel; eine echte Lüftung gehört nicht dazu." },
        { id: "kauf", label: "Zuerst beliebige Bauteile bestellen und den Kundenauftrag erst aus den gelieferten Geräten ableiten.", feedback: "Die Auswahl folgt dem geklärten Auftrag. Eine Bestellung würde hier weder die Anforderungen klären noch zur Übung gehören." },
        { id: "heizung", label: "Die echte Gebäudeheizung einbeziehen, obwohl der fiktive Auftrag nur Anzeige und Hinweis nennt.", feedback: "Die echte Gebäudeheizung ist ausdrücklich außerhalb des Beispiels. Samira bleibt bei den vereinbarten Funktionen." }
      ] }
    ]
  });
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})(typeof window !== "undefined" ? window : globalThis);