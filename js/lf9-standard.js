/* Fiktives Lernbeispiel, keine reale Anlage und kein Produktivsystem. */
(function (g) {
  "use strict";
  var engine = typeof module !== "undefined" && module.exports ? require("./lf9-lektion.js") : g.LF9_LEKTION;
  var api = engine.create({
    id: "lf9-standard", title: "Einen Standard und eine Funktionsprüfung festlegen",
    goals: ["Eine Kundenanforderung von einem technischen Standard unterscheiden.", "Eine Funktionsprüfung so formulieren, dass sie die Grenze prüft."],
    theory: [
      ["Was ein Standard hier ist", "Die Regel „Gästenetz getrennt vom Kassennetz, mindestens zehn gleichzeitige Endgeräte, kein Weg zur Kasse“ ist eine Kundenanforderung und dient als Abnahmekriterium. Ein technischer Standard ist etwas anderes: eine öffentlich beschriebene Spezifikation, zum Beispiel DHCP nach RFC 2131 für die automatische Adressvergabe. Eine prüfbare Eigenschaft daraus wäre: Ein Endgerät im Gästenetz erhält per DHCP eine Adresse aus dem Gästebereich. Ein Markenname ist weder Anforderung noch Standard."],
      ["Prüfung auf Papier", "Die Funktionsprüfung fragt drei Dinge: Wird das Gästenetz im Besprechungsraum genutzt, ohne dass eine raumgenaue Funkgrenze behauptet wird? Bleibt die Kasse vom Gästenetz aus unerreichbar? Reicht die Planung für mindestens zehn gleichzeitige Endgeräte? Ein echtes Messgerät wird nicht angeschlossen."],
      ["Nicht bestanden", "Wenn eine Prüfung die Kasse erreichen könnte, ist die Planung nicht bestanden, auch wenn das Gästenetz funktioniert. Funktion der Gäste ersetzt nicht die Grenze."],
    ],
    questions: [
      { id: "q1", prompt: "Was gilt im Beispiel als Standard?", correct: "regel", options: [
        { id: "regel", label: "Eine öffentlich beschriebene Spezifikation, etwa DHCP nach RFC 2131.", feedback: "Richtig. Ein technischer Standard ist eine öffentlich beschriebene Spezifikation. Die Kundenregel zur Trennung ist ein Abnahmekriterium, und ein Markenname ersetzt beides nicht." },
        { id: "marke", label: "Der Name eines Routerherstellers, weil ein Standard immer eine Marke sein muss.", feedback: "Die Marke ist weder Spezifikation noch Kundenanforderung. Ein Standard ist öffentlich beschrieben, die Trennung zur Kasse ist ein Abnahmekriterium." },
        { id: "kabel", label: "Eine Kabelmarke, weil ohne Markennamen keine Prüfung möglich ist.", feedback: "Die Prüfung braucht die vereinbarte Regel, nicht eine Kabelmarke." },
      ] },
      { id: "q2", prompt: "Welche Frage gehört in die Funktionsprüfung?", correct: "kasse", options: [
        { id: "farbe", label: "Welche Farbe der Router hat, weil die Farbe die Trennung automatisch belegt.", feedback: "Die Farbe belegt keine Trennung. Geprüft wird, ob die Kasse unerreichbar bleibt." },
        { id: "kasse", label: "Bleibt die Kasse unerreichbar?", feedback: "Richtig. Die Prüfung fragt Grenze, Nutzungsort und Mindestkapazität. Ein Messgerät wird nicht angeschlossen." },
        { id: "preis", label: "Ob der Router im Angebot der günstigste ist, auch ohne belegten Preis.", feedback: "Der Preis ist eine andere Frage und hier nicht belegt. Die Funktionsprüfung prüft die Regel." },
      ] },
      { id: "q3", prompt: "Wann ist die Planung nicht bestanden?", correct: "weg", options: [
        { id: "gaeste", label: "Sobald Gäste überhaupt eine Verbindung bekommen, unabhängig von der Grenze zur Kasse.", feedback: "Eine Gästeverbindung ist gewollt. Nicht bestanden ist sie nur, wenn dabei die Grenze fällt." },
        { id: "papier", label: "Sobald die Prüfung auf Papier steht, weil eine schriftliche Prüfung immer ein Fehlschlag ist.", feedback: "Die schriftliche Prüfung ist das Mittel. Ein Fehlschlag ist eine verletzte Regel, nicht das Papier." },
        { id: "weg", label: "Wenn ein Weg zur Kasse bliebe.", feedback: "Richtig. Ein funktionierendes Gästenetz besteht nicht, wenn die Kasse vom Gästenetz aus erreichbar wäre." },
      ] },
      { id: "q4", prompt: "Was wird in dieser Lektion nicht angeschlossen?", correct: "mess", options: [
        { id: "mess", label: "Ein echtes Messgerät.", feedback: "Richtig. Die Prüfung ist eine Fragenliste auf Papier. Nichts wird gemessen, nichts wird konfiguriert." },
        { id: "frage", label: "Die Frage nach der Mindestkapazität, obwohl die Anforderung genau diese Grenze enthält.", feedback: "Die Frage gehört in die Prüfung. Angeschlossen wird nur kein Gerät." },
        { id: "grenze", label: "Die Prüfung der Trennung, weil eine Funktionsprüfung Grenzen auslassen muss.", feedback: "Die Trennung ist der Kern der Prüfung. Ohne sie wäre die Liste unvollständig." },
      ] },
    ]
  });
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})(typeof window !== "undefined" ? window : globalThis);
