/* Fiktives Lernbeispiel, keine reale Anlage und kein Produktivsystem. */
(function (g) {
  "use strict";
  var engine = typeof module !== "undefined" && module.exports ? require("./lf8-lektion.js") : g.LF8_LEKTION;
  var api = engine.create({
    id: "lf8-uebergabe", title: "Übergabe und Dokumentation vorbereiten",
    goals: ["Eine Übergabe so schreiben, dass eine andere Person sie prüfen kann.", "Offene Punkte sichtbar lassen."],
    theory: [
      ["Was mitgegeben wird", "Samira übergibt nicht die Seite, sondern die Notiz: Quellen, Zweck, Empfänger, Format, Schutzbedarf, Aufbereitungsregeln und offene Lücken. Eine andere Person muss den Stand ohne mündliche Ergänzung verstehen."],
      ["Stand und Grenze", "Die Notiz nennt den Stand, die Bearbeiterin und was nicht geschehen ist: nichts eingerichtet, keine echten Daten, keine Freigabe. Eine fehlende Währung bleibt als offene Frage stehen."],
      ["Nicht abhaken", "Samira setzt kein Häkchen für erledigt, solange die offene Frage unbeantwortet ist. Erledigt wäre eine falsche Aussage. Übergabefähig heißt nachvollziehbar, nicht fertig im Betrieb."],
    ],
    questions: [
      { id: "q1", prompt: "Was übergibt Samira in dieser Lektion?", correct: "notiz", options: [
        { id: "notiz", label: "Die nachvollziehbare Notiz.", feedback: "Richtig. Quellen, Zweck, Regeln und Lücken stehen in der Notiz. Eine echte Seite wird nicht übergeben." },
        { id: "seite", label: "Eine bereits freigegebene Produktivseite, weil eine Notiz ohne Live-System keine Übergabe ist.", feedback: "Eine Produktivseite gibt es nicht. Die Übergabe betrifft den dokumentierten Stand, nicht einen Betrieb." },
        { id: "passwort", label: "Ein Passwort für die Kasse, damit die nächste Person sofort echte Umsätze laden kann.", feedback: "Zugangsdaten gehören nicht in die Übung und nicht in die Übergabe. Es gibt kein echtes Konto." },
      ] },
      { id: "q2", prompt: "Welche Grenze muss die Notiz nennen?", correct: "nicht", options: [
        { id: "fertig", label: "Dass der Betrieb die Übersicht bereits nutzt, auch wenn nichts eingerichtet wurde.", feedback: "Eine Nutzung vorzutäuschen wäre falsch. Die Notiz sagt, dass nichts eingerichtet wurde." },
        { id: "nicht", label: "Nichts eingerichtet, keine Freigabe.", feedback: "Richtig. Stand, Bearbeiterin und die Grenze gehören in die Notiz, sonst wirkt die Skizze wie ein Betrieb." },
        { id: "geheim", label: "Dass offene Fragen absichtlich verschwiegen werden, damit die Übergabe kürzer wirkt.", feedback: "Offene Fragen bleiben sichtbar. Kürze ist kein Grund, eine Lücke zu verdecken." },
      ] },
      { id: "q3", prompt: "Wann setzt Samira kein Erledigt?", correct: "offen", options: [
        { id: "immer", label: "Niemals, auch wenn jede offene Frage beantwortet und die Notiz geprüft ist.", feedback: "Eine beantwortete und geprüfte Notiz kann später als Stand festgehalten werden. Hier fehlt noch die Antwort." },
        { id: "nie", label: "Nur wenn die Seite schon öffentlich ist, unabhängig von offenen Fragen in der Notiz.", feedback: "Öffentlichkeit ist nicht das Kriterium. Eine offene Frage verbietet das Häkchen schon vorher." },
        { id: "offen", label: "Solange eine Frage offen ist.", feedback: "Richtig. Die fehlende Währung bleibt offen. Erledigt wäre eine falsche Aussage." },
      ] },
      { id: "q4", prompt: "Was heißt übergabefähig hier?", correct: "klar", options: [
        { id: "klar", label: "Nachvollziehbar, nicht fertig im Betrieb.", feedback: "Richtig. Eine andere Person versteht Quellen, Regeln und Lücken. Der Cafébetrieb nutzt die Übersicht noch nicht." },
        { id: "live", label: "Dass Gäste die Umsätze bereits sehen und die Notiz deshalb entfallen kann.", feedback: "Gäste sind nicht Empfänger. Eine fehlende Notiz macht die Übergabe schlechter, nicht kürzer." },
        { id: "muendlich", label: "Dass Samira alles nur mündlich sagt und nichts aufschreibt.", feedback: "Mündlich allein ist nicht prüfbar. Die Notiz muss ohne mündliche Ergänzung verständlich sein." },
      ] },
    ]
  });
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})(typeof window !== "undefined" ? window : globalThis);
