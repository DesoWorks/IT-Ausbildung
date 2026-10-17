/* Fiktives Lernbeispiel, keine reale Anlage und kein Produktivsystem. */
(function (g) {
  "use strict";
  var engine = typeof module !== "undefined" && module.exports ? require("./lf9-lektion.js") : g.LF9_LEKTION;
  var api = engine.create({
    id: "lf9-dienste", title: "Benötigte Dienste vom Kundenauftrag ableiten",
    goals: ["Einen Dienst aus dem Auftrag ableiten, nicht aus der Gewohnheit.", "Einen Dienst ablehnen, den niemand gefordert hat."],
    theory: [
      ["Was gebraucht wird", "Gäste sollen im Besprechungsraum eine Verbindung bekommen. Dafür skizziert Samira einen fiktiven Zugangsdienst nur für Gäste. Die Kasse braucht in diesem Auftrag keinen neuen Dienst, sie soll getrennt und unerreichbar bleiben."],
      ["Nicht dazuerfinden", "Ein Druckdienst, ein Dateiserver oder ein öffentlicher Kassenzugriff stehen nicht im Auftrag. Samira schreibt sie nicht auf, nur weil andere Cafés so etwas haben könnten."],
      ["Dienst ist nicht Gerät", "Der Zugangsdienst beschreibt, was die Gäste dürfen. Er nennt noch kein Gerät, kein Passwort und keine echte Adresse. Das bleibt der späteren Planung vorbehalten und wird hier nicht eingerichtet."],
    ],
    questions: [
      { id: "q1", prompt: "Welchen Dienst leitet Samira aus dem Auftrag ab?", correct: "gast", options: [
        { id: "gast", label: "Einen Gästezugang.", feedback: "Richtig. Der Auftrag verlangt eine Verbindung für Gäste im Besprechungsraum, getrennt von der Kasse." },
        { id: "druck", label: "Einen Druckdienst, weil jedes Café automatisch einen Drucker im Netz haben muss.", feedback: "Ein Druckdienst steht nicht im Auftrag. Gewohnheit ersetzt die Anforderung nicht." },
        { id: "kasse", label: "Einen öffentlichen Kassenzugriff, damit Gäste die Preise selbst an der Kasse ändern können.", feedback: "Die Kasse soll unerreichbar bleiben. Ein öffentlicher Zugriff widerspricht der Anforderung." },
      ] },
      { id: "q2", prompt: "Warum bekommt die Kasse keinen neuen Dienst?", correct: "getrennt", options: [
        { id: "kaputt", label: "Weil die Kasse im Beispiel defekt ist und deshalb keinen Dienst mehr brauchen kann.", feedback: "Die Kasse ist nicht als defekt beschrieben. Sie bleibt getrennt, nicht reparaturbedürftig." },
        { id: "getrennt", label: "Sie soll unerreichbar bleiben.", feedback: "Richtig. Der Auftrag verlangt Trennung. Ein neuer Dienst an der Kasse würde diese Grenze aufheben." },
        { id: "teuer", label: "Weil jeder Dienst an einer Kasse grundsätzlich zu teuer für eine Planung ist.", feedback: "Der Preis ist hier nicht der Grund. Der Grund ist die geforderte Unerreichbarkeit." },
      ] },
      { id: "q3", prompt: "Was ist der Zugangsdienst in dieser Lektion nicht?", correct: "geraet", options: [
        { id: "zweck", label: "Eine Beschreibung, was Gäste dürfen, obwohl genau das aus dem Auftrag folgt.", feedback: "Die Beschreibung des Zwecks ist der Dienst. Ein Gerät ist er noch nicht." },
        { id: "grenze", label: "Die Grenze zur Kasse, obwohl die Trennung Teil des Auftrags ist.", feedback: "Die Grenze gehört zum Dienst. Sie wird nicht durch ein Gerät ersetzt." },
        { id: "geraet", label: "Ein konkretes Gerät.", feedback: "Richtig. Der Dienst nennt noch kein Gerät, kein Passwort und keine echte Adresse." },
      ] },
      { id: "q4", prompt: "Welcher Dienst fällt heraus?", correct: "datei", options: [
        { id: "datei", label: "Ein Dateiserver ohne Auftrag.", feedback: "Richtig. Ein Dateiserver steht nicht in der Anforderung. Samira erfindet ihn nicht dazu." },
        { id: "gast", label: "Der Gästezugang, obwohl die Caféleitung genau diese Verbindung verlangt hat.", feedback: "Der Gästezugang ist abgeleitet und bleibt. Heraus fällt nur, was niemand gefordert hat." },
        { id: "trennung", label: "Die Trennung von der Kasse, weil ein Dienst keine Grenze enthalten darf.", feedback: "Die Trennung ist Teil des Auftrags. Ein Dienst ohne diese Grenze wäre der falsche Dienst." },
      ] },
    ]
  });
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})(typeof window !== "undefined" ? window : globalThis);
