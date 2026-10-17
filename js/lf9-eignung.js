/* Fiktives Lernbeispiel, keine reale Anlage und kein Produktivsystem. */
(function (g) {
  "use strict";
  var engine = typeof module !== "undefined" && module.exports ? require("./lf9-lektion.js") : g.LF9_LEKTION;
  var api = engine.create({
    id: "lf9-eignung", title: "Technische, wirtschaftliche und nachhaltige Eignung vergleichen",
    goals: ["Drei Eignungsfragen getrennt beantworten.", "Eine Variante ablehnen, die die Grenze verletzt."],
    theory: [
      ["Zwei Varianten auf Papier", "Variante A trennt Gästenetz und Kasse und reicht für höchstens zehn Gäste. Variante B lässt Gäste und Kasse im selben Netz, weil das weniger Geräte brauchte. Weniger Geräte ist noch kein Vorteil, wenn die Anforderung bricht."],
      ["Drei Fragen", "Technisch: hält die Variante die Trennung und die Gästezahl? Wirtschaftlich: ist der Aufwand für zehn Gäste nachvollziehbar, ohne einen Preis zu erfinden? Nachhaltig: wird nichts beschafft, was der Auftrag nicht braucht?"],
      ["Entscheidung", "Samira wählt A, weil B die Kasse erreichbar machen würde. Den Preis lässt sie offen, wenn er nicht belegt ist. Eine Entscheidung ohne diesen Grund wäre nur Geschmack."],
    ],
    questions: [
      { id: "q1", prompt: "Warum fällt Variante B heraus?", correct: "grenze", options: [
        { id: "grenze", label: "Sie verletzt die Trennung.", feedback: "Richtig. Gäste und Kasse im selben Netz widersprechen der Anforderung, auch wenn es weniger Geräte wären." },
        { id: "teuer", label: "Weil sie im Beispiel als die teuerste Variante ausgerechnet wurde.", feedback: "Ein Preis ist nicht belegt. Der Ablehnungsgrund ist die verletzte Grenze, nicht eine erfundene Summe." },
        { id: "name", label: "Weil der Buchstabe B in einer Planung grundsätzlich schlechter ist als A.", feedback: "Der Buchstabe entscheidet nichts. Der Inhalt der Variante entscheidet." },
      ] },
      { id: "q2", prompt: "Welche wirtschaftliche Aussage ist hier zulässig?", correct: "offen", options: [
        { id: "preis", label: "Ein erfundener Eurobetrag, damit die Tabelle nicht leer wirkt.", feedback: "Ein unbelegter Preis wäre eine falsche Angabe. Die Zelle bleibt offen." },
        { id: "offen", label: "Der Preis bleibt offen.", feedback: "Richtig. Wirtschaftlich heißt hier: Aufwand nur so weit bewerten, wie er belegt ist. Fehlende Preise bleiben Lücken." },
        { id: "gratis", label: "Dass jede getrennte Planung automatisch kostenlos ist.", feedback: "Getrennt ist nicht kostenlos. Die Kostenfrage bleibt offen, statt mit null beantwortet zu werden." },
      ] },
      { id: "q3", prompt: "Was bedeutet nachhaltig in diesem Vergleich?", correct: "nur", options: [
        { id: "logo", label: "Ein grünes Logo auf der Skizze, weil das Zeichen die Beschaffung ersetzt.", feedback: "Ein Zeichen beantwortet die Frage nicht. Nachhaltig heißt hier: nichts beschaffen, was der Auftrag nicht braucht." },
        { id: "mehr", label: "Möglichst viele Geräte kaufen, damit später jede denkbare Nutzung schon im Schrank liegt.", feedback: "Vorrat ohne Auftrag widerspricht der nachhaltigen Frage. Beschafft wird in dieser Übung ohnehin nichts." },
        { id: "nur", label: "Nichts beschaffen, was der Auftrag nicht braucht.", feedback: "Richtig. Die Frage prüft unnötige Beschaffung. Sie ist kein Freibrief und kein Kauf." },
      ] },
      { id: "q4", prompt: "Warum wählt Samira Variante A?", correct: "grund", options: [
        { id: "grund", label: "Weil sie die Grenze hält.", feedback: "Richtig. A hält die Trennung und reicht für zehn Gäste. Der Grund steht in der Notiz, nicht nur der Buchstabe." },
        { id: "geschmack", label: "Weil ihr der Buchstabe besser gefällt und ein Grund die Tabelle nur verlängert.", feedback: "Geschmack ist kein Eignungsgrund. Ohne die Grenze wäre die Wahl nicht nachvollziehbar." },
        { id: "kauf", label: "Weil sie die Geräte dafür bereits bestellt hat und die Wahl nur noch nachzieht.", feedback: "Es wird nichts bestellt. Die Wahl ist eine Papierentscheidung mit Begründung." },
      ] },
    ]
  });
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})(typeof window !== "undefined" ? window : globalThis);
