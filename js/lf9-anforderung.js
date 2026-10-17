/* Fiktives Lernbeispiel, keine reale Anlage und kein Produktivsystem. */
(function (g) {
  "use strict";
  var engine = typeof module !== "undefined" && module.exports ? require("./lf9-lektion.js") : g.LF9_LEKTION;
  var api = engine.create({
    id: "lf9-anforderung", title: "Anforderungen an das Netzwerk mit dem Kunden klären",
    goals: ["Eine Anforderung vom Wunsch und von der Lösung unterscheiden.", "Offene Punkte als Frage stehen lassen."],
    theory: [
      ["Der Auftrag", "Die Caféleitung will, dass Gäste im Besprechungsraum ins Netz kommen und die Kasse an der Theke davon getrennt bleibt. Das ist eine Anforderung, noch keine Kabelführung und kein Gerätekauf."],
      ["Wunsch und Grenze", "Samira fragt, wie viele Endgeräte gleichzeitig online sein sollen, ob das eine Mindestkapazität oder eine harte Obergrenze ist und ob die Kasse erreichbar sein darf. Die Antwort im Beispiel: Das Netz soll mindestens zehn gleichzeitige Endgeräte tragen. Das ist eine Planungskapazität, keine harte Sperre für das elfte Gerät. Genutzt wird es im Besprechungsraum; eine raumgenaue Funkgrenze ist nicht verlangt. Die Kasse bleibt unerreichbar. Was nicht gefragt wurde, erfindet sie nicht."],
      ["Nichts einrichten", "Samira schreibt die Anforderungen auf. Sie schließt kein Gerät an, vergibt kein Passwort und ändert kein bestehendes Netz. Das Café ist erfunden."],
    ],
    questions: [
      { id: "q1", prompt: "Was ist im Beispiel eine Anforderung?", correct: "trennung", options: [
        { id: "trennung", label: "Gästezugang ermöglichen und den Zugriff zur Kasse verhindern.", feedback: "Richtig. Das beschreibt den geforderten Nutzen und die Grenze, ohne schon ein Produkt festzulegen." },
        { id: "kabel", label: "Den Gästezugang über einen zusätzlichen Access Point lösen.", feedback: "Ein Access Point wäre eine mögliche Lösungswahl. Die Anforderung beschreibt zunächst Nutzen und Grenze." },
        { id: "kauf", label: "Einen Router mit separatem Gästeanschluss beschaffen.", feedback: "Das ist eine Beschaffungs- bzw. Lösungsvorgabe, nicht die hier zunächst zu klärende Kundenanforderung." },
      ] },
      { id: "q2", prompt: "Welche Kapazität nennt das Beispiel für das Gästenetz?", correct: "zehn", options: [
        { id: "unbegrenzt", label: "Zehn Gäste pro Tag, unabhängig von ihren Endgeräten.", feedback: "Tagesbesucherzahl ist nicht gleichzeitige Gerätekapazität. Eine Person kann mehrere Geräte verwenden." },
        { id: "zehn", label: "Mindestens zehn Endgeräte sollen gleichzeitig nutzbar sein.", feedback: "Richtig. Das ist die Planungskapazität, keine verbindliche Sperre für ein elftes Gerät." },
        { id: "einer", label: "Genau zehn Leases; eine elfte Verbindung muss gesperrt werden.", feedback: "Eine harte Obergrenze ist nicht beauftragt. Geplant werden mindestens zehn gleichzeitige Endgeräte." },
      ] },
      { id: "q3", prompt: "Darf die Kasse vom Gästenetz aus erreichbar sein?", correct: "nein", options: [
        { id: "ja", label: "Lesender Zugriff ist erlaubt, solange keine Umsätze geändert werden.", feedback: "Auch ein nur lesender Zugriff würde die geforderte Unerreichbarkeit der Kasse verletzen." },
        { id: "egal", label: "Der Zugriff darf nach erfolgreicher Gästeanmeldung möglich sein.", feedback: "Eine Gästeanmeldung ändert nichts an der vereinbarten Grenze zum Kassensystem." },
        { id: "nein", label: "Nein, die Kasse muss vom Gästenetz aus unerreichbar bleiben.", feedback: "Richtig. Diese Grenze gilt unabhängig davon, ob Gäste angemeldet sind oder nur lesen wollten." },
      ] },
      { id: "q4", prompt: "Was tut Samira in dieser Lektion nicht?", correct: "an", options: [
        { id: "an", label: "Den Gästeanschluss bereits am vorhandenen Router aktivieren.", feedback: "Richtig. Diese Lektion klärt Anforderungen. Eine reale Aktivierung gehört noch nicht dazu." },
        { id: "fragen", label: "Gleichzeitige Endgerätezahl und gewünschte Nutzungsorte klären.", feedback: "Diese Fragen konkretisieren den Bedarf und gehören deshalb zur Anforderungsklärung." },
        { id: "notiz", label: "Die Zugriffsgrenze zur Kasse als Abnahmekriterium festhalten.", feedback: "Die Grenze wird dokumentiert, damit spätere Lösungswahl und Prüfung am Auftrag messbar bleiben." },
      ] },
    ]
  });
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})(typeof window !== "undefined" ? window : globalThis);
