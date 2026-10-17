/* Fiktives Lernbeispiel, keine reale Anlage und kein Produktivsystem. */
(function (g) {
  "use strict";
  var engine = typeof module !== "undefined" && module.exports ? require("./lf9-lektion.js") : g.LF9_LEKTION;
  var api = engine.create({
    id: "lf9-infrastruktur", title: "Infrastruktur skizzieren: Trennung, Weg und Grenze",
    goals: ["Trennung, Weg und Grenze in einer Skizze unterscheiden.", "Eine Skizze nicht mit einer Installation verwechseln."],
    theory: [
      ["Drei Wörter", "Samiras Skizze zeigt den Besprechungsraum, die Theke und eine Grenze dazwischen. Der Weg der Gäste endet im Gästenetz. Der Weg der Kasse endet an der Theke. Die Grenze sagt: vom Gästenetz führt kein Weg zur Kasse."],
      ["Unbekannt bleibt leer", "Wo eine Leitung liegen könnte, schreibt sie unbekannt, wenn der Ist-Zustand das nicht belegt. Eine Linie in der Skizze ist eine Annahme und wird als Annahme beschriftet, nicht als Bestand."],
      ["Papier, nicht Schrank", "Die Skizze hängt nicht im echten Schrank und schaltet nichts. Sie hilft, den Auftrag zu prüfen. Wer später baut, braucht eine eigene Freigabe. Diese Lektion endet auf dem Papier."],
    ],
    questions: [
      { id: "q1", prompt: "Was zeigt die Grenze in der Skizze?", correct: "keinweg", options: [
        { id: "keinweg", label: "Kein Weg vom Gästenetz zur Kasse.", feedback: "Richtig. Die Grenze bedeutet Unerreichbarkeit. Sie ist kein Dekor und kein Kabelfarbcode." },
        { id: "farbe", label: "Nur eine hübsche Farbe, weil eine Grenze in einer Skizze keine Bedeutung haben darf.", feedback: "Die Farbe trägt keine Bedeutung. Die Grenze ist die geforderte Trennung." },
        { id: "offen", label: "Dass Gäste die Kasse erreichen dürfen, sobald beide Räume auf demselben Blatt stehen.", feedback: "Dasselbe Blatt ist keine Verbindung. Die Grenze verbietet den Weg zur Kasse." },
      ] },
      { id: "q2", prompt: "Wie kennzeichnet Samira eine nicht belegte Leitung?", correct: "annahme", options: [
        { id: "bestand", label: "Als vorhandenen Bestand, damit der Plan keine Lücken mehr zeigt.", feedback: "Nicht belegt ist kein Bestand. Eine solche Linie wäre eine falsche Ist-Angabe." },
        { id: "annahme", label: "Als Annahme, nicht als Bestand.", feedback: "Richtig. Eine angenommene Linie bleibt beschriftet. Unbekannt bleibt unbekannt." },
        { id: "weg", label: "Sie radiert den Besprechungsraum aus, weil eine Lücke den ganzen Plan ungültig macht.", feedback: "Der Raum bleibt in der Skizze. Nur die unbelegte Leitung wird nicht als Bestand gezeichnet." },
      ] },
      { id: "q3", prompt: "Wo endet diese Lektion?", correct: "papier", options: [
        { id: "schrank", label: "Im echten Verteilerschrank, weil eine Skizze erst gilt, wenn sie angeschlossen ist.", feedback: "Ein echter Schrank gehört nicht zur Übung. Die Skizze schaltet nichts." },
        { id: "kauf", label: "Beim Gerätekauf, weil eine Grenze ohne Karton keine Planung ist.", feedback: "Der Kauf ist nicht Teil dieser Lektion. Die Skizze prüft den Auftrag, bevor irgendetwas beschafft wird." },
        { id: "papier", label: "Auf dem Papier.", feedback: "Richtig. Trennung, Weg und Grenze sind gezeichnet. Nichts ist installiert oder freigegeben." },
      ] },
      { id: "q4", prompt: "Was ist die Skizze nicht?", correct: "live", options: [
        { id: "live", label: "Eine Installation.", feedback: "Richtig. Die Skizze richtet nichts ein. Eine spätere Umsetzung braucht eine eigene Freigabe." },
        { id: "pruef", label: "Ein Mittel, den Auftrag zu prüfen, obwohl genau das ihr Zweck ist.", feedback: "Prüfen ist der Zweck. Verboten ist nur, die Skizze als fertiges Netz auszugeben." },
        { id: "grenze", label: "Die Darstellung der Trennung, weil eine Grenze in einer Infrastruktur nicht vorkommen darf.", feedback: "Die Trennung ist der Kern der Skizze. Ohne Grenze wäre der Auftrag verfehlt." },
      ] },
    ]
  });
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})(typeof window !== "undefined" ? window : globalThis);
