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
        { id: "notiz", label: "Den dokumentierten Konzeptstand mit Quellen, Regeln und Lücken.", feedback: "Richtig. Die Übergabe beschreibt den erreichten Konzeptstand, ohne einen Produktivbetrieb vorzutäuschen." },
        { id: "seite", label: "Eine Betriebsfreigabe auf Grundlage der gezeichneten Übersicht.", feedback: "Die Skizze und ihre Notiz sind kein Nachweis einer geprüften produktiven Umsetzung oder Freigabe." },
        { id: "passwort", label: "Eine Einrichtungsvorgabe ohne die noch offenen Quellenfragen.", feedback: "Offene Quellenfragen müssen sichtbar übergeben werden, statt bereits eine fertige Vorgabe zu behaupten." },
      ] },
      { id: "q2", prompt: "Welche Grenze muss die Notiz nennen?", correct: "nicht", options: [
        { id: "fertig", label: "Die Konzeptprüfung gilt gleichzeitig als Freigabe des Betriebs.", feedback: "Konzeptstand und Betriebsfreigabe sind verschiedene Dinge. Die Notiz darf sie nicht gleichsetzen." },
        { id: "nicht", label: "Konzept beschrieben, aber kein Produktivsystem eingerichtet oder freigegeben.", feedback: "Richtig. Die Notiz benennt erreichte Arbeit und die Grenze zum echten Betrieb ausdrücklich." },
        { id: "geheim", label: "Ungeklärte Angaben werden erst nach der Übergabe nachgetragen.", feedback: "Die Übergabe muss bereits erkennen lassen, welche Angaben offen sind und deshalb noch nicht nutzbar sind." },
      ] },
      { id: "q3", prompt: "Wann setzt Samira kein Erledigt?", correct: "offen", options: [
        { id: "immer", label: "Solange die Leitung noch keine öffentliche Tagesseite sehen kann.", feedback: "Öffentlichkeit ist nicht beauftragt. Entscheidend sind die vereinbarten Arbeitsergebnisse und offenen Fragen." },
        { id: "nie", label: "Solange die Notiz weniger als eine volle Seite umfasst.", feedback: "Die Seitenzahl ist kein Abschlusskriterium. Eine kurze vollständige Notiz kann ausreichen." },
        { id: "offen", label: "Solange eine für die Nutzung nötige Angabe ungeklärt ist.", feedback: "Richtig. Eine fehlende Währung oder Berechtigung darf nicht unter einem Erledigt-Häkchen verschwinden." },
      ] },
      { id: "q4", prompt: "Was heißt übergabefähig hier?", correct: "klar", options: [
        { id: "klar", label: "Der Stand ist ohne Rückfrage verständlich, ohne Betriebsreife zu behaupten.", feedback: "Richtig. Nachvollziehbarkeit umfasst Regeln und Lücken; sie ist keine produktive Freigabe." },
        { id: "live", label: "Die Datenansicht ist veröffentlicht; Dokumentation kann später folgen.", feedback: "Veröffentlichung ersetzt keine verständliche Übergabe und ist für die interne Übersicht nicht beauftragt." },
        { id: "muendlich", label: "Eine mündliche Erläuterung reicht, wenn die Quellen selbst beigelegt sind.", feedback: "Quellen allein erklären Auswahl, Regeln und offene Punkte nicht. Diese müssen dokumentiert übergeben werden." },
      ] },
    ]
  });
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})(typeof window !== "undefined" ? window : globalThis);
