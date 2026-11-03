/* Fiktives Lernbeispiel, keine reale Anlage und kein Produktivsystem. */
(function (g) {
  "use strict";
  var engine = typeof module !== "undefined" && module.exports ? require("./lf9-lektion.js") : g.LF9_LEKTION;
  var api = engine.create({
    id: "lf9-dienste", title: "Benötigte Dienste vom Kundenauftrag ableiten",
    goals: ["Einen Dienst aus dem Auftrag ableiten, nicht aus der Gewohnheit.", "Einen Dienst ablehnen, den niemand gefordert hat."],
    theory: [
      ["Was gebraucht wird", "Gäste sollen im Besprechungsraum eine Verbindung bekommen. Dafür skizziert Samira einen fiktiven Zugangsdienst nur für Gäste. Die Kasse braucht in diesem Auftrag keinen neuen Dienst, und sie soll vom Gästenetz aus unerreichbar bleiben."],
      ["Nicht dazuerfinden", "Ein Druckdienst, ein Dateiserver oder ein öffentlicher Kassenzugriff stehen nicht im Auftrag. Samira schreibt sie nicht auf, nur weil andere Cafés so etwas haben könnten. Ohne Bedarf wird kein Dienst geplant."],
      ["Dienst ist nicht Zugriff", "Ein Dienst, der irgendwo läuft, macht ein Gerät nicht automatisch für alle erreichbar. Ob die Kasse vom Gästenetz aus erreichbar ist, entscheiden Trennung und Zugriffsregeln. Die Unerreichbarkeit ist deshalb eine eigene Anforderung und folgt nicht aus dem Fehlen eines Dienstes."],
      ["Dienst ist nicht Gerät", "Der Zugangsdienst beschreibt, was die Gäste dürfen. Er nennt noch kein Gerät, kein Passwort und keine echte Adresse. Das bleibt der späteren Planung vorbehalten und wird hier nicht eingerichtet."],
    ],
    questions: [
      { id: "q1", prompt: "Welchen Dienst leitet Samira aus dem Auftrag ab?", correct: "gast", options: [
        { id: "gast", label: "Einen Gästezugang mit geeigneter Adressbereitstellung.", feedback: "Richtig. Die Gäste benötigen eine Verbindung; das Modell konkretisiert die Adressbereitstellung mit DHCP." },
        { id: "druck", label: "Einen gemeinsamen Druckdienst für Besprechungsteilnehmer.", feedback: "Ein Druckdienst wäre möglich, ist aber aus dem konkreten Verbindungsauftrag nicht abgeleitet." },
        { id: "kasse", label: "Einen lesenden Informationsdienst auf dem Kassensystem.", feedback: "Ein Dienst auf der Kasse für Gäste würde deren geforderte Unerreichbarkeit nicht einhalten." },
      ] },
      { id: "q2", prompt: "Warum plant Samira für die Kasse keinen neuen Dienst?", correct: "getrennt", options: [
        { id: "kaputt", label: "Ein zusätzlicher Dienst würde das Gerät technisch unerreichbar machen.", feedback: "Dienstbetrieb und Erreichbarkeit sind getrennt. Unerreichbarkeit folgt aus Trennung und Zugriffsregeln." },
        { id: "getrennt", label: "Für die Kasse ist kein zusätzlicher Dienstbedarf beauftragt.", feedback: "Richtig. Ein Dienst wird aus Bedarf abgeleitet. Die Zugriffssperre zur Kasse ist ein eigenes Kriterium." },
        { id: "teuer", label: "Der Aufwand für einen Dienst wurde bereits als zu hoch nachgewiesen.", feedback: "Ein solcher Aufwandsnachweis liegt nicht vor. Entscheidend ist hier der fehlende beauftragte Dienstbedarf." },
      ] },
      { id: "q3", prompt: "Was ist der Zugangsdienst in dieser Lektion nicht?", correct: "geraet", options: [
        { id: "zweck", label: "Eine funktionale Beschreibung der benötigten Gästeverbindung.", feedback: "Der Dienstbedarf beschreibt eine Funktion. Das ist noch keine Entscheidung für ein bestimmtes Gerät." },
        { id: "grenze", label: "Ein Zugang mit der geforderten Grenze zum Kassensystem.", feedback: "Die Gästeverbindung muss diese Randbedingung einhalten; ihre Beschreibung legt noch keine Hardware fest." },
        { id: "geraet", label: "Eine Festlegung auf ein bestimmtes Routermodell.", feedback: "Richtig. Die Funktion eines Dienstes ist von der später gewählten Hardware zu unterscheiden." },
      ] },
      { id: "q4", prompt: "Welcher Dienst fällt heraus?", correct: "datei", options: [
        { id: "datei", label: "Eine gemeinsame Dateiablage ohne genannten Nutzungsbedarf.", feedback: "Richtig. Eine Dateiablage wäre ein zusätzlicher Dienst, der aus dem Auftrag nicht hervorgeht." },
        { id: "gast", label: "Die Gästeverbindung für den vereinbarten Besprechungsraum.", feedback: "Diese Verbindung ist der beauftragte Nutzen und bleibt deshalb Teil der Planung." },
        { id: "trennung", label: "Die Adressbereitstellung für den geplanten Gästezugang.", feedback: "Eine passende Adressbereitstellung unterstützt den beauftragten Zugang und ist im Modell konkretisiert." },
      ] },
    ]
  });
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})(typeof window !== "undefined" ? window : globalThis);
