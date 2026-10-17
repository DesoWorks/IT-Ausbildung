(function (g) {
  "use strict";
  var engine = typeof module !== "undefined" && module.exports ? require("./lf7-lektion.js") : g.LF7_LEKTION;
  var api = engine.create({
    id: "lf7-fluesse", title: "Energiefluss, Stofffluss und Informationsfluss unterscheiden",
    goals: ["Energie, Stoff und Information getrennt verfolgen.", "Einen im Beispiel nicht vorhandenen Stofftransport ausdrücklich benennen."],
    theory: [
      ["Drei Fragen an denselben Plan", "Samira zeichnet die fiktive Raumklima-Station bei Nordlicht IT-Service. Energiefluss fragt: Wodurch wird etwas betrieben? Stofffluss fragt: Welche Materie wird transportiert? Informationsfluss fragt: Welche Bedeutung oder Nachricht wird übertragen? Eine Verbindung kann mehr als eine Art tragen, aber die Flüsse werden getrennt beschrieben."],
      ["Energie und Information", "Die vorgesehene Versorgung liefert elektrische Energie an Sensor, Steuerung und Leuchte. Der Messwert vom Sensor zur Steuerung ist Information; die Steuernachricht an die Leuchte ist ebenfalls Information. Energie wird beim Betrieb unter anderem in Licht und Wärme umgewandelt. Die Nachricht enthält keine transportierte Raumluft."],
      ["Stofffluss ehrlich abgrenzen", "Die Station erfasst Temperatur und gibt einen Leuchthinweis. Sie hat keinen Ventilator und keine Pumpe; daher gibt es keinen vorgesehenen, von ihr angetriebenen Stofftransport. Ein Luftstrom wäre ein Stofffluss, wenn ein Ventilator vorgesehen wäre. Dieser gehört ausdrücklich nicht zum Beispiel. Samira erfindet keinen Stofffluss, nur um alle Kategorien zu füllen."]
    ],
    questions: [
      { id: "q1", prompt: "Die Versorgung betreibt die Leuchte. Welcher Fluss ist gemeint?", correct: "energie", options: [
        { id: "stoff", label: "Ein Stofffluss, weil die Versorgung automatisch Raumluft durch die Leuchte transportiert.", feedback: "Hier wird keine Raumluft transportiert. Die Versorgung liefert Energie für den Betrieb der Leuchte." },
        { id: "info", label: "Nur Information, weil eine Leuchte grundsätzlich keine Energie für ihre sichtbare Wirkung benötigt.", feedback: "Auch eine Leuchte benötigt Energie. Die Versorgungsverbindung wird hier als Energiefluss betrachtet." },
        { id: "energie", label: "Energiefluss.", feedback: "Richtig. Elektrische Energie ermöglicht den Betrieb und wird unter anderem in Licht und Wärme umgewandelt." }
      ] },
      { id: "q2", prompt: "Der Sensor meldet 27,0 °C an die Steuerung. Welcher Fluss ist das?", correct: "information", options: [
        { id: "information", label: "Informationsfluss.", feedback: "Richtig. Der Messwert überträgt eine Bedeutung über die Temperatur, nicht die gemessene Luft selbst." },
        { id: "luft", label: "Ein Stofffluss, bei dem die gesamte gemessene Raumluft in die Steuerung übertragen wird.", feedback: "Die Luft wird nicht in die Steuerung übertragen. Ein digitaler Wert beschreibt die gemessene Temperatur." },
        { id: "strom", label: "Nur die Energieversorgung, weil Zahlenwerte und ihre Bedeutung niemals Information sind.", feedback: "Der Zahlenwert mit Einheit ist Information. Seine Bedeutung ist von der Energieversorgung zu unterscheiden." }
      ] },
      { id: "q3", prompt: "Welcher Satz zum Stofffluss stimmt für unsere Station?", correct: "kein", options: [
        { id: "pumpe", label: "Eine eingebaute Pumpe bewegt Wasser durch den Raum, obwohl der Plan keine Pumpe enthält.", feedback: "Eine Pumpe wurde nicht vorgesehen. Samira beschreibt nur Funktionen, die im fiktiven Auftrag tatsächlich vorkommen." },
        { id: "kein", label: "Kein angetriebener Stofftransport vorgesehen.", feedback: "Richtig. Die Station misst und leuchtet. Ein Ventilator oder eine Pumpe gehören nicht zum Beispiel." },
        { id: "zahl", label: "Jede Übertragung einer Temperaturzahl bewegt zwingend auch die gemessene Luft zum Empfänger.", feedback: "Die Zahl beschreibt die Lufttemperatur. Informationsübertragung ist nicht automatisch ein Transport der Luft." }
      ] },
      { id: "q4", prompt: "Wie beschreibt Samira eine Verbindung mit Energie und Daten?", correct: "trennen", options: [
        { id: "trennen", label: "Beide Flüsse getrennt benennen.", feedback: "Richtig. Dieselbe Verbindung kann Energie und Information tragen; die Betrachtungen bleiben unterscheidbar." },
        { id: "eins", label: "Immer nur eine Kategorie nennen und alle weiteren Wirkungen aus dem Plan entfernen.", feedback: "Das würde einen Teil des Systems verschweigen. Samira kann mehrere Flüsse auf derselben Verbindung getrennt beschreiben." },
        { id: "stoff", label: "Energie und Daten pauschal als Stofffluss bezeichnen, ohne einen Stofftransport zu benennen.", feedback: "Ein Stofffluss meint Materietransport. Energie und Information dürfen nicht ohne Begründung damit gleichgesetzt werden." }
      ] }
    ]
  });
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})(typeof window !== "undefined" ? window : globalThis);