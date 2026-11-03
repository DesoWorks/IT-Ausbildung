/* Fiktives Lernbeispiel, keine reale Anlage und kein Produktivsystem. */
(function (g) {
  "use strict";
  var engine = typeof module !== "undefined" && module.exports ? require("./lf9-lektion.js") : g.LF9_LEKTION;
  var api = engine.create({
    id: "lf9-eignung", title: "Technische, wirtschaftliche und nachhaltige Eignung vergleichen",
    goals: ["Drei Eignungsfragen getrennt beantworten.", "Eine Variante ablehnen, die die Grenze verletzt."],
    theory: [
      ["Zwei Varianten auf Papier", "Variante A trennt Gästenetz und Kasse und trägt mindestens zehn gleichzeitige Endgeräte. Variante B lässt Gäste und Kasse im selben Netz ohne Zugriffsschutz für die Kasse, weil das weniger Geräte brauchte. Weniger Geräte ist noch kein Vorteil, wenn die Anforderung bricht."],
      ["Drei Fragen", "Technisch: hält die Variante die Trennung und die Mindestkapazität von zehn Endgeräten? Wirtschaftlich: ist der Aufwand für diese Kapazität nachvollziehbar, ohne einen Preis zu erfinden? Nachhaltig: wird nichts beschafft, was der Auftrag nicht braucht?"],
      ["Entscheidung", "Samira wählt A, weil B keinen Zugriffsschutz für die Kasse vorsieht und damit die geforderte Trennung nicht erfüllt. Den Preis lässt sie offen, wenn er nicht belegt ist. Eine Entscheidung ohne diesen Grund wäre nur Geschmack."],
    ],
    questions: [
      { id: "q1", prompt: "Warum fällt Variante B heraus?", correct: "grenze", options: [
        { id: "grenze", label: "Sie sieht keinen Zugriffsschutz für die Kasse vor.", feedback: "Richtig. Der fehlende Zugriffsschutz verletzt die Anforderung; nicht allein dasselbe Netz ist der Beleg." },
        { id: "teuer", label: "Ihr höherer Anschaffungspreis wurde bereits belegt.", feedback: "Im Papiervergleich ist kein Preis belegt. Der fachliche Ablehnungsgrund ist der fehlende Zugriffsschutz." },
        { id: "name", label: "Ein gemeinsames Gerät kann technisch keine Netze trennen.", feedback: "Ein Gerät kann mehrere Netze unterstützen. Entscheidend ist die konkrete Konfiguration der Variante." },
      ] },
      { id: "q2", prompt: "Welche wirtschaftliche Aussage ist hier zulässig?", correct: "offen", options: [
        { id: "preis", label: "Ein geschätzter Betrag darf ohne Kennzeichnung als Angebot dienen.", feedback: "Eine Schätzung ist kein belegtes Angebot. Im zusätzlichen Labor sind Annahmen ausdrücklich fiktiv markiert." },
        { id: "offen", label: "Ohne Angebot bleibt der reale Anschaffungspreis ungeklärt.", feedback: "Richtig. Fiktive Laborwerte ersetzen keine tatsächlichen Preise für eine reale Beschaffungsentscheidung." },
        { id: "gratis", label: "Vorhandene Geräte bedeuten, dass keine laufenden Kosten entstehen.", feedback: "Auch vorhandene Hardware kann Energie- und Wartungskosten verursachen. Nullkosten sind nicht belegt." },
      ] },
      { id: "q3", prompt: "Was bedeutet nachhaltig in diesem Vergleich?", correct: "nur", options: [
        { id: "logo", label: "Die geringste Anschaffungssumme als alleinigen Umweltmaßstab wählen.", feedback: "Der Kaufpreis bildet Energieverbrauch, Nutzungsdauer, Wartung und unnötige Beschaffung nicht ab." },
        { id: "mehr", label: "Für unbestätigte Nutzungsszenarien bereits Reservegeräte beschaffen.", feedback: "Unbestätigte Reserven können unnötige Beschaffung sein. Erweiterbarkeit ist anhand des Bedarfs zu begründen." },
        { id: "nur", label: "Unnötige Beschaffung vermeiden und begründeten Bedarf zugrunde legen.", feedback: "Richtig. Das ist ein Nachhaltigkeitsaspekt, keine vollständige Ökobilanz und noch keine Kaufentscheidung." },
      ] },
      { id: "q4", prompt: "Warum wählt Samira Variante A?", correct: "grund", options: [
        { id: "grund", label: "A erfüllt die Trennung und die geforderte gleichzeitige Gerätekapazität.", feedback: "Richtig. Die Wahl ist mit den Anforderungen begründet und nicht allein mit Preis oder Gerätezählung." },
        { id: "geschmack", label: "A verwendet eine vertraute Marke; damit sind die Anforderungen belegt.", feedback: "Markenkenntnis beweist weder Zugriffsschutz noch Kapazität. Die Variante muss sachlich geprüft werden." },
        { id: "kauf", label: "A ist bereits vorgesehen; eine Prüfung der Grenze kann daher entfallen.", feedback: "Eine Vorauswahl ersetzt den Anforderungsabgleich nicht. Gerade die Grenze zur Kasse ist zu prüfen." },
      ] },
    ]
  });
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})(typeof window !== "undefined" ? window : globalThis);
