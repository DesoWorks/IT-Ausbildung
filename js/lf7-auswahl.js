(function (g) {
  "use strict";
  var engine = typeof module !== "undefined" && module.exports ? require("./lf7-lektion.js") : g.LF7_LEKTION;
  var api = engine.create({
    id: "lf7-auswahl", title: "Kriterien für Energieversorgung, Hardware und Software aufstellen",
    goals: ["Anforderungen vor einer Auswahl festhalten, ohne etwas zu kaufen.", "Versorgung, Messbereich, Schnittstellen, Bibliotheken und Protokolle auf Passung prüfen."],
    theory: [
      ["Kriterien aus dem Auftrag", "Samira erstellt bei Nordlicht IT-Service nur eine Kriterienliste für die fiktive Raumklima-Station. Die Temperatur soll im angenommenen Bereich von 15 bis 35 °C erfasst werden. Die Auflösung beschreibt die kleinste angezeigte Abstufung; die Genauigkeit beschreibt die mögliche Abweichung vom tatsächlichen Wert. Viele Nachkommastellen beweisen keine hohe Genauigkeit."],
      ["Versorgung und Hardware", "Die fiktive Unterlage fordert 5 V Gleichspannung. Samira prüft passende Spannung, Stromart, ausreichende Strombelastbarkeit und den erwarteten Leistungsbedarf aller Komponenten samt Reserve. Ein passender Stecker allein beweist keine Eignung. Auf dem Papier prüft sie außerdem Sensorbereich, Genauigkeit, Schnittstellen und die Bedingungen des vorgesehenen Raums. Es erfolgt weder Kauf noch elektrischer Anschluss."],
      ["Software, Bibliothek und Protokoll", "Eine Bibliothek ist wiederverwendbarer Programmcode, etwa zum Lesen eines Sensors. Samira prüft dokumentierte Kompatibilität mit der geplanten Steuerung, unterstützte Version, Pflege und Nutzungsbedingungen. Das Protokoll regelt den Nachrichtenaustausch; es muss auf Sender und Empfänger unterstützt sein. Gleiche Funktechnik allein bedeutet noch keine verständlichen Daten. Samira vergleicht Anforderungen und belegte Angaben; fehlende Angaben bleiben offen."]
    ],
    questions: [
      { id: "q1", prompt: "Was prüft Samira für die Versorgung zuerst?", correct: "passung", options: [
        { id: "farbe", label: "Nur die Gehäusefarbe, weil daraus Spannung und Belastbarkeit zuverlässig abgelesen werden können.", feedback: "Die Farbe belegt keine elektrischen Eigenschaften. Spannung, Stromart und Belastbarkeit müssen dokumentiert passen." },
        { id: "passung", label: "Spannung, Stromart und Belastbarkeit.", feedback: "Richtig. Die Versorgung muss zu den Anforderungen passen und den geplanten Bedarf mit Reserve abdecken." },
        { id: "stecker", label: "Nur die äußere Steckerform, auch wenn die Unterlage eine andere Spannung als vorgesehen nennt.", feedback: "Ein passender Stecker genügt nicht. Unpassende Spannung darf nicht durch die Steckerform als geeignet gelten." }
      ] },
      { id: "q2", prompt: "Was bedeutet eine Anzeige mit vielen Nachkommastellen?", correct: "aufloesung", options: [
        { id: "genau", label: "Sie beweist ohne weitere Angaben, dass jede Temperatur bis zur letzten Stelle richtig gemessen wird.", feedback: "Auflösung und Genauigkeit sind verschieden. Viele Stellen allein belegen keine geringe Messabweichung." },
        { id: "bereich", label: "Sie garantiert automatisch den gesamten benötigten Messbereich und alle zulässigen Raumbedingungen.", feedback: "Messbereich und Betriebsbedingungen sind eigene Kriterien. Sie folgen nicht aus der Zahl der angezeigten Stellen." },
        { id: "aufloesung", label: "Feine Darstellung, nicht bewiesene Genauigkeit.", feedback: "Richtig. Kleine Anzeigeschritte beschreiben Auflösung; die Genauigkeit muss gesondert belegt werden." }
      ] },
      { id: "q3", prompt: "Welches Kriterium passt zur Sensorbibliothek?", correct: "kompatibel", options: [
        { id: "kompatibel", label: "Dokumentierte Kompatibilität und Pflege.", feedback: "Richtig. Die Bibliothek muss zur Steuerung und Version passen; auch Pflege und Nutzungsbedingungen werden geprüft." },
        { id: "name", label: "Ein möglichst auffälliger Name genügt, auch ohne Angaben zur Steuerung oder zur unterstützten Version.", feedback: "Ein Name ist kein Kompatibilitätsnachweis. Samira braucht dokumentierte Angaben zum geplanten Einsatz." },
        { id: "preis", label: "Jeder beliebige Preis ersetzt alle Angaben zu unterstützten Geräten, Pflege und Nutzungsbedingungen.", feedback: "Ein Preis beantwortet keine technischen Fragen. Kompatibilität und Nutzungsbedingungen bleiben zu prüfen." }
      ] },
      { id: "q4", prompt: "Was ist das Ergebnis dieser Auswahl-Lektion?", correct: "liste", options: [
        { id: "kaufen", label: "Eine abgeschlossene Bestellung mit bereits elektrisch angeschlossenen Geräten im echten Besprechungsraum.", feedback: "Hier wird weder bestellt noch angeschlossen. Das Ergebnis bleibt eine begründete Kriterienliste auf dem Papier." },
        { id: "liste", label: "Eine begründete Kriterienliste.", feedback: "Richtig. Die Kriterien bereiten eine Auswahl vor; fehlende Belege werden benannt und kein Produkt wird gekauft." },
        { id: "behaupten", label: "Eine pauschale Eignungszusage für alle Bauteile, selbst wenn wesentliche technische Angaben fehlen.", feedback: "Fehlende Angaben verhindern eine belegte Eignungszusage. Samira hält sie offen, statt sie zu erfinden." }
      ] }
    ]
  });
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})(typeof window !== "undefined" ? window : globalThis);