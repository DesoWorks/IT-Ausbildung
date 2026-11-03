(function (g) {
  "use strict";
  var engine = typeof module !== "undefined" && module.exports ? require("./lf7-lektion.js") : g.LF7_LEKTION;
  var api = engine.create({
    id: "lf7-unterlage", title: "Eine technische Unterlage lesen und eine fehlende Angabe erkennen",
    goals: ["Ein fiktives Datenblatt mit Anforderungen vergleichen.", "Eine fehlende Genauigkeitsangabe markieren und die technische Notiz nachvollziehbar ergänzen."],
    theory: [
      ["Fiktive Unterlage R1, Stand A", "Samira liest bei Nordlicht IT-Service einen erfundenen Auszug für die Raumklima-Station: Versorgung 5 V Gleichspannung; Messbereich 0 bis 50 °C; Auflösung 0,1 °C; Messgenauigkeit: nicht angegeben; Datensatz: station, temperatur_c, zeitpunkt; Übertragungsintervall: 60 s. Dies ist keine Unterlage eines realen Produkts und keine Anschlussanweisung."],
      ["Lesen heißt vergleichen", "Die Anforderung nennt 15 bis 35 °C. Der angegebene Messbereich von 0 bis 50 °C deckt das ab. Ob die Messgenauigkeit genügt, lässt sich ohne Angabe nicht beurteilen. Aus 0,1 °C Auflösung darf Samira nicht eine Genauigkeit von ±0,1 °C machen. Auch ein vorhandener Messbereich ersetzt die fehlende Genauigkeit nicht."],
      ["Unterlage nachvollziehbar anpassen", "Samira ergänzt ihre technische Notiz, nicht das angebliche Originaldatenblatt: Quelle: fiktiver Auszug R1, Stand A. Ergänzung: Genauigkeit fehlt; Rückfrage an die verantwortliche Person offen; Datum und Bearbeiterin Samira. Die Originalangabe bleibt erkennbar. Erst eine belegte Antwort kann die Lücke schließen. Einheiten und Datenfeldnamen werden unverändert übernommen."]
    ],
    questions: [
      { id: "q1", prompt: "Welche entscheidende Angabe fehlt im Auszug?", correct: "genauigkeit", options: [
        { id: "genauigkeit", label: "Die Messgenauigkeit.", feedback: "Richtig. Der Auszug nennt Bereich und Auflösung, aber keine Genauigkeit. Diese Lücke bleibt offen." },
        { id: "spannung", label: "Die Versorgungsspannung, obwohl der Auszug ausdrücklich 5 V Gleichspannung als Angabe enthält.", feedback: "Die Versorgung ist im Auszug genannt. Nicht angegeben ist die mögliche Messabweichung, also die Genauigkeit." },
        { id: "takt", label: "Das Übertragungsintervall, obwohl in der technischen Unterlage ausdrücklich 60 s genannt werden.", feedback: "Das Intervall von 60 Sekunden ist vorhanden. Die fehlende Angabe betrifft die Messgenauigkeit." }
      ] },
      { id: "q2", prompt: "Deckt der Bereich 0 bis 50 °C die geforderten 15 bis 35 °C ab?", correct: "ja", options: [
        { id: "nein", label: "Nein, weil ein größerer Messbereich grundsätzlich keinen kleineren Temperaturbereich enthalten kann.", feedback: "15 bis 35 °C liegen innerhalb von 0 bis 50 °C. Für den Bereich passt die Angabe; die Genauigkeit bleibt offen." },
        { id: "ja", label: "Ja, bezogen auf den Messbereich.", feedback: "Richtig. Die geforderten Temperaturen liegen im angegebenen Bereich. Das beantwortet noch nicht die Genauigkeitsfrage." },
        { id: "alles", label: "Ja, und damit sind ohne weitere Angaben auch Genauigkeit, Versorgung und sämtliche Risiken geprüft.", feedback: "Ein passender Bereich beweist nicht die gesamte Eignung. Genauigkeit und weitere Kriterien brauchen eigene Belege." }
      ] },
      { id: "q3", prompt: "Welche Schlussfolgerung aus 0,1 °C Auflösung ist zulässig?", correct: "schritte", options: [
        { id: "fehlerfrei", label: "Der Sensor misst grundsätzlich fehlerfrei und benötigt deshalb nie eine Genauigkeitsangabe.", feedback: "Eine feine Anzeige garantiert keine Fehlerfreiheit. Die Genauigkeit ist im Auszug gerade nicht angegeben." },
        { id: "genau", label: "Die Genauigkeit beträgt sicher ±0,1 °C, auch wenn der Auszug darüber keine Aussage enthält.", feedback: "Auflösung ist nicht Genauigkeit. Samira darf eine fehlende Messabweichung nicht aus der Anzeige erfinden." },
        { id: "schritte", label: "Die Abstufung beträgt 0,1 °C.", feedback: "Richtig. Die Auflösung nennt die Abstufung. Eine Aussage zur Genauigkeit braucht einen gesonderten Beleg." }
      ] },
      { id: "q4", prompt: "Wie ergänzt Samira die technische Notiz?", correct: "offen", options: [
        { id: "offen", label: "Quelle, Stand und offene Rückfrage notieren.", feedback: "Richtig. Samira dokumentiert die Herkunft und die Lücke, statt eine unbekannte Eigenschaft zu behaupten." },
        { id: "frei", label: "Sie ersetzt die fehlende Angabe still durch eine Wunschzahl und entfernt den Verweis auf den Auszug.", feedback: "Eine Wunschzahl ist kein Beleg. Quelle und offene Frage müssen nachvollziehbar in der technischen Notiz stehen." },
        { id: "fertig", label: "Sie erklärt die Lücke ohne Rückfrage für erledigt und kennzeichnet das Original als vollständig geprüft.", feedback: "Die Lücke ist noch offen. Eine belegte Rückfrage ist nötig, bevor die Genauigkeit bewertet werden kann." }
      ] }
    ]
  });
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})(typeof window !== "undefined" ? window : globalThis);