/* Fiktives Lernbeispiel, keine reale Anlage und kein Produktivsystem. */
(function (g) {
  "use strict";
  var engine = typeof module !== "undefined" && module.exports ? require("./lf9-lektion.js") : g.LF9_LEKTION;
  var api = engine.create({
    id: "lf9-anforderung", title: "Anforderungen an das Netzwerk mit dem Kunden klären",
    goals: ["Eine Anforderung vom Wunsch und von der Lösung unterscheiden.", "Offene Punkte als Frage stehen lassen."],
    theory: [
      ["Der Auftrag", "Die Caféleitung will, dass Gäste im Besprechungsraum ins Netz kommen und die Kasse an der Theke davon getrennt bleibt. Das ist eine Anforderung, noch keine Kabelführung und kein Gerätekauf."],
      ["Wunsch und Grenze", "Samira fragt, wie viele Gäste gleichzeitig online sein sollen und ob die Kasse vom Gästenetz aus erreichbar sein darf. Die Antwort im Beispiel: höchstens zehn Gäste, die Kasse bleibt unerreichbar. Was nicht gefragt wurde, erfindet sie nicht."],
      ["Nichts einrichten", "Samira schreibt die Anforderungen auf. Sie schließt kein Gerät an, vergibt kein Passwort und ändert kein bestehendes Netz. Das Café ist erfunden."],
    ],
    questions: [
      { id: "q1", prompt: "Was ist im Beispiel eine Anforderung?", correct: "trennung", options: [
        { id: "trennung", label: "Gästenetz und Kasse getrennt.", feedback: "Richtig. Die Trennung ist gefordert. Ein Gerätetyp oder ein Kauf ist noch keine Anforderung." },
        { id: "kabel", label: "Eine bestimmte Kabelmarke, weil jede Anforderung schon die spätere Verlegung festlegen muss.", feedback: "Die Marke ist eine spätere Auswahl. Die Anforderung nennt Trennung und Zweck, nicht das Kabel." },
        { id: "kauf", label: "Sofort einen Router kaufen, damit die Anforderung erst aus dem Karton abgelesen werden kann.", feedback: "Der Kauf folgt der geklärten Anforderung. In dieser Lektion wird nichts gekauft." },
      ] },
      { id: "q2", prompt: "Wie viele Gäste nennt das Beispiel gleichzeitig?", correct: "zehn", options: [
        { id: "unbegrenzt", label: "Beliebig viele, weil eine nicht genannte Zahl automatisch unbegrenzt bedeutet.", feedback: "Eine fehlende Zahl wäre eine Lücke. Im Beispiel ist die Zahl genannt: höchstens zehn." },
        { id: "zehn", label: "Höchstens zehn.", feedback: "Richtig. Die Caféleitung nennt höchstens zehn gleichzeitige Gäste. Mehr ist nicht vereinbart." },
        { id: "einer", label: "Genau ein Gast, weil ein Besprechungsraum nur eine Person versorgen darf.", feedback: "Der Raum begrenzt die Personenzahl nicht auf eins. Vereinbart sind höchstens zehn." },
      ] },
      { id: "q3", prompt: "Darf die Kasse vom Gästenetz aus erreichbar sein?", correct: "nein", options: [
        { id: "ja", label: "Ja, weil Gäste sonst keine Preise sehen und die Kasse deshalb offen sein muss.", feedback: "Preise stehen nicht in der Kasse des Beispiels zur öffentlichen Ansicht. Die Kasse bleibt unerreichbar." },
        { id: "egal", label: "Das ist egal, weil eine Anforderung keine Grenze für die Kasse enthalten kann.", feedback: "Die Grenze ist Teil der Anforderung. Erreichbarkeit der Kasse ist ausdrücklich nicht erlaubt." },
        { id: "nein", label: "Nein, sie bleibt unerreichbar.", feedback: "Richtig. Die Caféleitung verlangt die Trennung. Die Kasse ist vom Gästenetz aus nicht erreichbar." },
      ] },
      { id: "q4", prompt: "Was tut Samira in dieser Lektion nicht?", correct: "an", options: [
        { id: "an", label: "Ein Gerät anschließen.", feedback: "Richtig. Sie schreibt Anforderungen auf. Anschließen, Passwort und Änderung eines Netzes gehören nicht dazu." },
        { id: "fragen", label: "Die Caféleitung nach der gleichzeitigen Gästezahl fragen, obwohl genau das die Klärung ist.", feedback: "Fragen gehört zur Klärung. Nicht dazu gehört, die Antwort durch einen Anschluss zu ersetzen." },
        { id: "notiz", label: "Die genannte Grenze zur Kasse in der Notiz festhalten.", feedback: "Die Grenze gehört in die Notiz. Sie wird nicht durch eine Installation ersetzt." },
      ] },
    ]
  });
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})(typeof window !== "undefined" ? window : globalThis);
