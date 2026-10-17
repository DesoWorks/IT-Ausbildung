/* Fiktives Lernbeispiel, keine reale Anlage und kein Produktivsystem. */
(function (g) {
  "use strict";
  var engine = typeof module !== "undefined" && module.exports ? require("./lf9-lektion.js") : g.LF9_LEKTION;
  var api = engine.create({
    id: "lf9-standard", title: "Einen Standard und eine Funktionsprüfung festlegen",
    goals: ["Einen Standard als vereinbarte Regel benennen, nicht als Gerätenamen.", "Eine Funktionsprüfung so formulieren, dass sie die Grenze prüft."],
    theory: [
      ["Was ein Standard hier ist", "Samira schreibt: das Gästenetz bleibt vom Kassennetz getrennt, höchstens zehn gleichzeitige Gäste, kein Weg zur Kasse. Das ist die vereinbarte Regel für dieses Beispiel. Ein Markenname ist kein Standard."],
      ["Prüfung auf Papier", "Die Funktionsprüfung fragt drei Dinge: Kommen die Gäste nur im Besprechungsraum an? Bleibt die Kasse vom Gästenetz aus unerreichbar? Ist die Gästezahl auf zehn begrenzt? Ein echtes Messgerät wird nicht angeschlossen."],
      ["Nicht bestanden", "Wenn eine Prüfung die Kasse erreichen könnte, ist die Planung nicht bestanden, auch wenn das Gästenetz funktioniert. Funktion der Gäste ersetzt nicht die Grenze."],
    ],
    questions: [
      { id: "q1", prompt: "Was gilt im Beispiel als Standard?", correct: "regel", options: [
        { id: "regel", label: "Trennung und höchstens zehn Gäste.", feedback: "Richtig. Die vereinbarte Regel ist der Standard dieser Planung. Ein Markenname ersetzt sie nicht." },
        { id: "marke", label: "Der Name eines Routerherstellers, weil ein Standard immer eine Marke sein muss.", feedback: "Die Marke ist keine Regel. Der Standard nennt Trennung, Grenze und Gästezahl." },
        { id: "kabel", label: "Eine Kabelmarke, weil ohne Markennamen keine Prüfung möglich ist.", feedback: "Die Prüfung braucht die vereinbarte Regel, nicht eine Kabelmarke." },
      ] },
      { id: "q2", prompt: "Welche Frage gehört in die Funktionsprüfung?", correct: "kasse", options: [
        { id: "farbe", label: "Welche Farbe der Router hat, weil die Farbe die Trennung automatisch belegt.", feedback: "Die Farbe belegt keine Trennung. Geprüft wird, ob die Kasse unerreichbar bleibt." },
        { id: "kasse", label: "Bleibt die Kasse unerreichbar?", feedback: "Richtig. Die Prüfung fragt Grenze, Ort und Gästezahl. Ein Messgerät wird nicht angeschlossen." },
        { id: "preis", label: "Ob der Router im Angebot der günstigste ist, auch ohne belegten Preis.", feedback: "Der Preis ist eine andere Frage und hier nicht belegt. Die Funktionsprüfung prüft die Regel." },
      ] },
      { id: "q3", prompt: "Wann ist die Planung nicht bestanden?", correct: "weg", options: [
        { id: "gaeste", label: "Sobald Gäste überhaupt eine Verbindung bekommen, unabhängig von der Grenze zur Kasse.", feedback: "Eine Gästeverbindung ist gewollt. Nicht bestanden ist sie nur, wenn dabei die Grenze fällt." },
        { id: "papier", label: "Sobald die Prüfung auf Papier steht, weil eine schriftliche Prüfung immer ein Fehlschlag ist.", feedback: "Die schriftliche Prüfung ist das Mittel. Ein Fehlschlag ist eine verletzte Regel, nicht das Papier." },
        { id: "weg", label: "Wenn ein Weg zur Kasse bliebe.", feedback: "Richtig. Ein funktionierendes Gästenetz besteht nicht, wenn die Kasse vom Gästenetz aus erreichbar wäre." },
      ] },
      { id: "q4", prompt: "Was wird in dieser Lektion nicht angeschlossen?", correct: "mess", options: [
        { id: "mess", label: "Ein echtes Messgerät.", feedback: "Richtig. Die Prüfung ist eine Fragenliste auf Papier. Nichts wird gemessen, nichts wird konfiguriert." },
        { id: "frage", label: "Die Frage nach der Gästezahl, obwohl die Regel genau diese Grenze enthält.", feedback: "Die Frage gehört in die Prüfung. Angeschlossen wird nur kein Gerät." },
        { id: "grenze", label: "Die Prüfung der Trennung, weil eine Funktionsprüfung Grenzen auslassen muss.", feedback: "Die Trennung ist der Kern der Prüfung. Ohne sie wäre die Liste unvollständig." },
      ] },
    ]
  });
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})(typeof window !== "undefined" ? window : globalThis);
