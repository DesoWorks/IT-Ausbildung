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
        { id: "regel", label: "DHCP nach der öffentlich beschriebenen Spezifikation RFC 2131.", feedback: "Richtig. Das ist eine konkrete technische Spezifikation; Kundenanforderung und Standard sind zu trennen." },
        { id: "marke", label: "Die Kundenforderung, Gästezugang und Kasse zu trennen.", feedback: "Das ist eine Kundenanforderung und ein Abnahmekriterium, keine technische Protokollspezifikation." },
        { id: "kabel", label: "Die interne Vorgabe, nur ein bestimmtes Routermodell zu kaufen.", feedback: "Eine interne Produktauswahl ist kein technischer Standard zur Funktionsweise eines Protokolls." },
      ] },
      { id: "q2", prompt: "Welche Frage gehört in die Funktionsprüfung?", correct: "kasse", options: [
        { id: "farbe", label: "Ist der Router eines bereits vertrauten Herstellers?", feedback: "Herstellerkenntnis beweist keine Funktion oder Zugriffssperre. Die Prüfung braucht beobachtbare Kriterien." },
        { id: "kasse", label: "Ist die Kasse aus dem funktionsfähigen Gästenetz unerreichbar?", feedback: "Richtig. Das prüft die geforderte Grenze, ohne eine fehlende Gästeverbindung als Schutzbeleg zu missverstehen." },
        { id: "preis", label: "Liegt der Anschaffungspreis unter dem geplanten Budget?", feedback: "Das ist ein wirtschaftliches Kriterium, aber kein Funktionstest für die Netztrennung." },
      ] },
      { id: "q3", prompt: "Wann ist die Planung nicht bestanden?", correct: "weg", options: [
        { id: "gaeste", label: "Wenn der DHCP-Pool elf statt zehn Geräte versorgen kann.", feedback: "Zehn Geräte sind die Mindestkapazität. Eine größere Kapazität verletzt die Anforderung nicht." },
        { id: "papier", label: "Wenn die Zugangsfunktion zusätzlich als Modell protokolliert wird.", feedback: "Ein klar als Modell markiertes Protokoll ist kein Fehler, ersetzt aber keine echte Installationsprüfung." },
        { id: "weg", label: "Wenn Gäste die Kasse trotz funktionierender Verbindung erreichen können.", feedback: "Richtig. Funktion und Schutz müssen gemeinsam erfüllt sein. Ein Zugriffspfad zur Kasse verletzt den Auftrag." },
      ] },
      { id: "q4", prompt: "Was gehört noch nicht zur Papierprüfung dieser Lektion?", correct: "mess", options: [
        { id: "mess", label: "Ein reales Messgerät an die vorhandene Infrastruktur anschließen.", feedback: "Richtig. Papierprüfung und Browsermodell sind keine Messung an echter Infrastruktur." },
        { id: "frage", label: "Eine Prüfung der geforderten gleichzeitigen Endgerätezahl festlegen.", feedback: "Die Kapazitätsfrage gehört zum Kriterienkatalog. Ihre Festlegung ist noch keine reale Messung." },
        { id: "grenze", label: "Die erwartete Zugriffssperre zur Kasse als Ergebnis beschreiben.", feedback: "Das erwartete Ergebnis gehört in die Prüfliste und wird nicht durch einen Geräteanschluss ersetzt." },
      ] },
    ]
  });
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})(typeof window !== "undefined" ? window : globalThis);
