/* Fiktives Lernbeispiel, keine reale Anlage und kein Produktivsystem. */
(function (g) {
  "use strict";
  var engine = typeof module !== "undefined" && module.exports ? require("./lf8-lektion.js") : g.LF8_LEKTION;
  var api = engine.create({
    id: "lf8-reflexion", title: "Werkzeug und Dokumentationsqualität beurteilen",
    goals: ["Ein Werkzeug an der Aufgabe messen, nicht an der Gewohnheit.", "Eine Notiz auf Nachvollziehbarkeit prüfen."],
    theory: [
      ["Werkzeug", "Für diese Skizze reichen Papier und die erfundenen Beispielzeilen aus der Lektion zum Aufbereiten. Ein Datenbankserver wäre für diese wenigen Zeilen unnötig und würde eine Einrichtung vortäuschen. Samira begründet die Wahl mit der Aufgabe, nicht mit dem, was sie zuletzt benutzt hat."],
      ["Qualität der Notiz", "Eine gute Notiz nennt Quelle, Stand, Regel und offene Frage. Eine schlechte Notiz sagt nur fertig oder sieht gut aus. Samira prüft, ob eine andere Person die Ablehnung der Lieferantenliste ohne Nachfrage versteht."],
      ["Was die Reflexion nicht ist", "Die Reflexion ist keine Abnahme des Felds und keine Freigabe. Sie zeigt, was an der eigenen Notiz noch fehlt. Lernfeld 8 bleibt im Katalog auf In Kürze, bis das ganze Feld geprüft ist."],
    ],
    questions: [
      { id: "q1", prompt: "Welches Werkzeug passt zu dieser Skizze?", correct: "papier", options: [
        { id: "papier", label: "Papier und die erfundenen Beispielzeilen.", feedback: "Richtig. Die Aufgabe ist eine nachvollziehbare Skizze. Ein Server würde eine Einrichtung vortäuschen." },
        { id: "server", label: "Ein Datenbankserver, weil jede Datenaufgabe unabhängig vom Umfang einen Server braucht.", feedback: "Die wenigen erfundenen Zeilen brauchen keinen Server. Die Wahl folgt der Aufgabe, nicht der Gewohnheit." },
        { id: "konto", label: "Ein echtes Kassenkonto, weil ohne Anmeldung keine Übung möglich ist.", feedback: "Ein echtes Konto ist ausgeschlossen. Die Beispielzeilen sind erfunden und reichen für die Skizze." },
      ] },
      { id: "q2", prompt: "Woran erkennt Samira eine brauchbare Notiz?", correct: "andere", options: [
        { id: "huebsch", label: "An der Schriftfarbe, weil eine lesbare Farbe jede fehlende Quelle ersetzt.", feedback: "Aussehen ersetzt keine Quelle. Eine andere Person muss Regeln und Lücken verstehen." },
        { id: "andere", label: "Eine andere Person versteht sie.", feedback: "Richtig. Quelle, Stand, Regel und offene Frage müssen ohne mündliche Nachfrage klar sein." },
        { id: "kurz", label: "Daran, dass sie nur das Wort fertig enthält und deshalb keine Rückfrage erzeugt.", feedback: "Das Wort fertig verdeckt Lücken. Kürze ohne Inhalt ist keine Qualität." },
      ] },
      { id: "q3", prompt: "Was prüft die Reflexion an der Lieferantenliste?", correct: "grund", options: [
        { id: "kauf", label: "Ob die Liste nachträglich gekauft werden sollte, obwohl der Auftrag sie nicht verlangt.", feedback: "Ein Kauf ist nicht die Reflexion. Geprüft wird, ob der Ablehnungsgrund nachvollziehbar ist." },
        { id: "namen", label: "Ob alle Lieferantennamen öffentlich gemacht wurden, damit die Notiz vollständiger wirkt.", feedback: "Nicht gewählte personenbezogene Angaben werden nicht veröffentlicht. Die Ablehnung bleibt die richtige Entscheidung." },
        { id: "grund", label: "Ob der Ablehnungsgrund ohne Nachfrage klar ist.", feedback: "Richtig. Die Notiz muss sagen, dass der Auftrag keine Lieferdaten verlangt." },
      ] },
      { id: "q4", prompt: "Was ist diese Reflexion nicht?", correct: "abnahme", options: [
        { id: "abnahme", label: "Eine Freigabe des Lernfelds.", feedback: "Richtig. Die Reflexion bewertet die eigene Notiz. Das Feld bleibt auf In Kürze, bis es geprüft ist." },
        { id: "blick", label: "Ein Blick auf die eigene Notiz, obwohl genau das der Zweck dieser Lektion ist.", feedback: "Der Blick auf die Notiz ist der Zweck. Er ersetzt nur nicht die Prüfung des ganzen Felds." },
        { id: "luecke", label: "Das Sichtbarmachen einer Lücke, weil Lücken in einer Reflexion verboten sind.", feedback: "Lücken sichtbar zu machen gehört zur Qualität. Verboten ist, sie als erledigt zu markieren." },
      ] },
    ]
  });
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})(typeof window !== "undefined" ? window : globalThis);
