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
      ["Papier, nicht Schrank", "Die Skizze hängt nicht im echten Schrank und schaltet nichts. Sie hilft, den Auftrag zu prüfen. Wer später baut, braucht eine eigene Freigabe. Der Skizzenschritt endet auf dem Papier; das zusätzliche Netz- und Dienstlabor übt die Umsetzung getrennt in einem lokalen Browsermodell, ohne reale Geräte."],
    ],
    questions: [
      { id: "q1", prompt: "Was zeigt die Grenze in der Skizze?", correct: "keinweg", options: [
        { id: "keinweg", label: "Der Zugang vom Gästenetz zum Kassensystem ist ausgeschlossen.", feedback: "Richtig. Die Skizzengrenze beschreibt den geforderten Zugriffsschutz, nicht bereits dessen Umsetzung." },
        { id: "farbe", label: "Gäste und Kasse erhalten unterschiedliche Funknetznamen.", feedback: "Unterschiedliche SSIDs allein belegen keine Trennung der Zugriffe. Die Grenze muss den Zugang verhindern." },
        { id: "offen", label: "Nur Änderungen an der Kasse sind für Gäste ausgeschlossen.", feedback: "Das wäre nur Schreibschutz. Gefordert ist die Unerreichbarkeit, auch für lesende Gästezugriffe." },
      ] },
      { id: "q2", prompt: "Wie kennzeichnet Samira eine nicht belegte Leitung?", correct: "annahme", options: [
        { id: "bestand", label: "Als vorhandene Verbindung, wenn sie technisch plausibel wäre.", feedback: "Plausibilität ist kein Bestandsbeleg. Eine angenommene Verbindung braucht eine sichtbare Kennzeichnung." },
        { id: "annahme", label: "Als unbestätigte Annahme mit einer offenen Bestandsprüfung.", feedback: "Richtig. Damit wird die gedachte Verbindung nicht mit dem tatsächlich belegten Istzustand verwechselt." },
        { id: "weg", label: "Als verbindlich zu nutzende Leitung ohne weiteren Prüfvermerk.", feedback: "Eine ungeprüfte Leitung darf nicht als verbindliche Grundlage gelten. Ihr Bestand bleibt offen." },
      ] },
      { id: "q3", prompt: "Wo endet der ursprüngliche Skizzenschritt vor dem zusätzlichen Modelllabor?", correct: "papier", options: [
        { id: "schrank", label: "Bei einer überprüften realen Verkabelung im Verteilerschrank.", feedback: "Eine Skizze belegt keine Verkabelung. Reale Eingriffe sind weder Skizzenschritt noch Browsermodell." },
        { id: "kauf", label: "Bei einer freigegebenen Bestellung der Netzkomponenten.", feedback: "Die Skizze ist keine Bestellung oder Beschaffungsfreigabe; sie hält zunächst den Planungsstand fest." },
        { id: "papier", label: "Bei der dokumentierten Trennung, dem Weg und der Zugriffsgrenze.", feedback: "Richtig. Der Skizzenschritt bleibt ein Plan. Das neue Browserlabor setzt getrennt davon ein Modell um." },
      ] },
      { id: "q4", prompt: "Was ist die Skizze nicht?", correct: "live", options: [
        { id: "live", label: "Ein Nachweis der real installierten und geprüften Netztrennung.", feedback: "Richtig. Eine Skizze beschreibt den Plan, beweist aber weder Installation noch reale Funktionsprüfung." },
        { id: "pruef", label: "Eine Grundlage zum Abgleich der Planung mit dem Auftrag.", feedback: "Der Auftragsabgleich ist ein sinnvoller Zweck der Skizze, nicht gleichzusetzen mit einer realen Prüfung." },
        { id: "grenze", label: "Eine Darstellung der vorgesehenen Wege und Zugriffsgrenzen.", feedback: "Wege und Zugriffsgrenzen sind genau der Inhalt der Skizze und noch keine produktive Umsetzung." },
      ] },
    ]
  });
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})(typeof window !== "undefined" ? window : globalThis);
