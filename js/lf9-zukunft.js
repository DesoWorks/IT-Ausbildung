/* Fiktives Lernbeispiel, keine reale Anlage und kein Produktivsystem. */
(function (g) {
  "use strict";
  var engine = typeof module !== "undefined" && module.exports ? require("./lf9-lektion.js") : g.LF9_LEKTION;
  var api = engine.create({
    id: "lf9-zukunft", title: "Kundenzufriedenheit und Zukunftsfähigkeit der Planung beurteilen",
    goals: ["Kundenzufriedenheit an der erfüllten Anforderung messen.", "Zukunftsfähigkeit von einem unnötigen Ausbau unterscheiden."],
    theory: [
      ["Zufriedenheit", "Die Caféleitung ist im Beispiel zufrieden, wenn Gäste im Besprechungsraum ankommen, die Kasse getrennt bleibt und die Notiz das nachvollziehbar sagt. Ein zusätzliches Gerät, das niemand gefordert hat, erhöht die Zufriedenheit nicht."],
      ["Zukunft", "Zukunftsfähig heißt hier: die Grenze und die Mindestkapazität sind so notiert, dass eine spätere Änderung sichtbar wird. Es heißt nicht, schon heute Geräte für hundert Gäste einzuplanen. Zehn gleichzeitige Endgeräte bleiben die vereinbarte Planungskapazität."],
      ["Keine Abnahme", "Diese Beurteilung gibt das Lernfeld nicht frei. Lernfeld 9 bleibt im Katalog auf In Kürze, bis Dennis es ausdrücklich freigibt. Die Planung ist eine Übung, kein beauftragter Umbau."],
    ],
    questions: [
      { id: "q1", prompt: "Wann gilt die Caféleitung im Beispiel als zufrieden?", correct: "drei", options: [
        { id: "drei", label: "Gästezugang, Kassentrennung und nachvollziehbare Übergabe erfüllen den Auftrag.", feedback: "Richtig. Die Zufriedenheit wird im Modell an vereinbarten Ergebnissen gemessen, nicht an Zusatzgeräten." },
        { id: "mehr", label: "Die vorgesehene Gerätezahl übersteigt die Anforderung und belegt damit die Qualität.", feedback: "Zusätzliche Geräte beweisen weder Zugriffsschutz noch eine verständliche Übergabe der Planung." },
        { id: "live", label: "Die Verbindung funktioniert; die Prüfung der Kasse kann in den Betrieb verschoben werden.", feedback: "Die Grenze zur Kasse ist Bestandteil der Anforderungen und darf nicht als spätere Nebensache entfallen." },
      ] },
      { id: "q2", prompt: "Was heißt zukunftsfähig in dieser Übung?", correct: "sichtbar", options: [
        { id: "hundert", label: "Unbestätigte Reserven für hundert Endgeräte sofort beschaffen.", feedback: "Unbegründete Vorratsbeschaffung ist keine nachgewiesene Zukunftsfähigkeit. Erweiterungen brauchen Bedarf." },
        { id: "sichtbar", label: "Kapazität und Schutzgrenze so dokumentieren, dass Änderungen prüfbar bleiben.", feedback: "Richtig. Ein geänderter Bedarf kann dann gegen die nachvollziehbaren Annahmen und Grenzen geprüft werden." },
        { id: "weg", label: "Die Schutzgrenze bei Erweiterungen ohne neue Prüfung aufheben.", feedback: "Eine Kapazitätserweiterung hebt den Zugriffsschutz nicht auf. Änderungen sind erneut gegen den Auftrag zu prüfen." },
      ] },
      { id: "q3", prompt: "Was erhöht die Zufriedenheit hier nicht?", correct: "extra", options: [
        { id: "notiz", label: "Eine verständliche Notiz mit Schutzgrenze und Gerätekapazität.", feedback: "Diese Notiz macht die Planung nachvollziehbar und unterstützt die vereinbarte Übergabe." },
        { id: "trennung", label: "Ein Gästezugang ohne Zugriffsmöglichkeit auf das Kassensystem.", feedback: "Die Zugriffssperre erfüllt eine ausdrückliche Anforderung und verbessert damit die Passung." },
        { id: "extra", label: "Zusatzhardware ohne belegten Nutzen für die vereinbarten Anforderungen.", feedback: "Richtig. Mehr Hardware an sich erfüllt keinen zusätzlichen Kundenbedarf und ist kein Qualitätsnachweis." },
      ] },
      { id: "q4", prompt: "Was ist diese Beurteilung nicht?", correct: "frei", options: [
        { id: "frei", label: "Eine Freigabeentscheidung für die gesperrten Lernfeldseiten.", feedback: "Richtig. Die Planungsbeurteilung ersetzt Dennis' ausdrückliche Freigabe des Lernfelds nicht." },
        { id: "blick", label: "Ein Abgleich der Planung mit Schutzgrenze und Mindestkapazität.", feedback: "Dieser Abgleich ist der Zweck der Beurteilung, keine produktive oder didaktische Freigabe." },
        { id: "uebung", label: "Eine Reflexion des fiktiven Auftrags ohne reale Kundenabnahme.", feedback: "Die Reflexion ist als Übung vorgesehen. Eine wirkliche Kundenabnahme wird damit nicht behauptet." },
      ] },
    ]
  });
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})(typeof window !== "undefined" ? window : globalThis);
