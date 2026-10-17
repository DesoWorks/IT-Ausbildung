/* Fiktives Lernbeispiel, keine reale Anlage und kein Produktivsystem. */
(function (g) {
  "use strict";
  var engine = typeof module !== "undefined" && module.exports ? require("./lf9-lektion.js") : g.LF9_LEKTION;
  var api = engine.create({
    id: "lf9-zukunft", title: "Kundenzufriedenheit und Zukunftsfähigkeit der Planung beurteilen",
    goals: ["Kundenzufriedenheit an der erfüllten Anforderung messen.", "Zukunftsfähigkeit von einem unnötigen Ausbau unterscheiden."],
    theory: [
      ["Zufriedenheit", "Die Caféleitung ist im Beispiel zufrieden, wenn Gäste im Besprechungsraum ankommen, die Kasse getrennt bleibt und die Notiz das nachvollziehbar sagt. Ein zusätzliches Gerät, das niemand gefordert hat, erhöht die Zufriedenheit nicht."],
      ["Zukunft", "Zukunftsfähig heißt hier: die Grenze und die Mindestkapazität sind so notiert, dass eine spätere Änderung sichtbar wird. Es heißt nicht, schon heute Geräte für hundert Gäste einzuplanen. Zehn gleichzeitige Endgeräte bleiben die vereinbarte Planungskapazität."],
      ["Keine Abnahme", "Diese Beurteilung gibt das Lernfeld nicht frei. Lernfeld 9 bleibt im Katalog auf In Kürze, bis das ganze Feld sichtbar geprüft ist. Die Planung ist eine Übung, kein beauftragter Umbau."],
    ],
    questions: [
      { id: "q1", prompt: "Wann gilt die Caféleitung im Beispiel als zufrieden?", correct: "drei", options: [
        { id: "drei", label: "Grenze, Gäste und klare Notiz.", feedback: "Richtig. Ankommen im Besprechungsraum, getrennte Kasse und eine nachvollziehbare Notiz erfüllen den Auftrag." },
        { id: "mehr", label: "Sobald mehr Geräte als gefordert im Plan stehen, auch wenn die Grenze fehlt.", feedback: "Mehr Geräte ersetzen die Anforderung nicht. Ohne Grenze ist die Leitung nicht zufrieden." },
        { id: "live", label: "Erst wenn das echte Café bereits umgebaut ist und Gäste die Kasse sehen.", feedback: "Ein Umbau findet nicht statt. Zufriedenheit wird an der erfüllten Papierplanung gemessen." },
      ] },
      { id: "q2", prompt: "Was heißt zukunftsfähig in dieser Übung?", correct: "sichtbar", options: [
        { id: "hundert", label: "Schon heute für hundert Gäste planen, obwohl nur zehn vereinbart sind.", feedback: "Die vereinbarte Zahl bleibt zehn. Ein unnötiger Ausbau ist keine Zukunftsfähigkeit." },
        { id: "sichtbar", label: "Änderungen bleiben in der Notiz sichtbar.", feedback: "Richtig. Grenze und Mindestkapazität sind so notiert, dass eine spätere Änderung auffällt. Es wird nichts vorgebaut." },
        { id: "weg", label: "Die Grenze weglassen, damit spätere Wünsche nicht an einer alten Regel hängen.", feedback: "Die Grenze ist die Regel. Sie wegzulassen macht die Planung schlechter, nicht zukunftsfähiger." },
      ] },
      { id: "q3", prompt: "Was erhöht die Zufriedenheit hier nicht?", correct: "extra", options: [
        { id: "notiz", label: "Eine Notiz, die Grenze und Mindestkapazität ohne mündliche Nachfrage verständlich macht.", feedback: "Genau diese Notiz gehört zur Zufriedenheit. Überflüssig ist nur, was niemand gefordert hat." },
        { id: "trennung", label: "Die eingehaltene Trennung von Gästenetz und Kasse.", feedback: "Die Trennung ist der Kern des Auftrags. Sie erhöht die Passung, statt sie zu stören." },
        { id: "extra", label: "Ein Gerät, das niemand gefordert hat.", feedback: "Richtig. Zusätzliche Geräte ohne Auftrag erfüllen keine Anforderung und täuschen Vollständigkeit vor." },
      ] },
      { id: "q4", prompt: "Was ist diese Beurteilung nicht?", correct: "frei", options: [
        { id: "frei", label: "Eine Freigabe des Lernfelds.", feedback: "Richtig. Die Übung bewertet die Planung. Das Feld bleibt auf In Kürze, bis es sichtbar geprüft ist." },
        { id: "blick", label: "Ein Blick auf Grenze und Mindestkapazität, obwohl genau das die Beurteilung trägt.", feedback: "Der Blick auf die erfüllte Anforderung ist der Zweck. Er ersetzt nur nicht die Prüfung des Felds." },
        { id: "uebung", label: "Eine Übung auf Papier, weil eine Beurteilung immer ein beauftragter Umbau ist.", feedback: "Die Beurteilung bleibt eine Übung. Ein Umbau ist nicht beauftragt und findet nicht statt." },
      ] },
    ]
  });
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})(typeof window !== "undefined" ? window : globalThis);
