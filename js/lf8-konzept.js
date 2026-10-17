/* Fiktives Lernbeispiel, keine reale Anlage und kein Produktivsystem. */
(function (g) {
  "use strict";
  var engine = typeof module !== "undefined" && module.exports ? require("./lf8-lektion.js") : g.LF8_LEKTION;
  var api = engine.create({
    id: "lf8-konzept", title: "Ein Bereitstellungskonzept mit Schutzbedarf skizzieren",
    goals: ["Empfänger, Inhalt und Schutzbedarf in einem Konzept nennen.", "Ein Konzept von einer fertigen Einrichtung unterscheiden."],
    theory: [
      ["Was das Konzept sagt", "Samiras Papierkonzept nennt Empfänger, Inhalt, Quelle, Aktualisierung und Schutzbedarf. Empfänger ist die Caféleitung. Inhalt sind Tagesumsatz und geplante Schichten. Die Aktualisierung ist einmal am Tagesende, nicht live. Das ist eine Skizze, keine eingerichtete Seite."],
      ["Schutzbedarf", "Umsätze sollen vertraulich bleiben und unverändert ankommen. Die Übersicht soll an Werktagen für die Leitung verfügbar sein. Vertraulichkeit, Integrität und Verfügbarkeit werden getrennt notiert, nicht als ein Wort abgehakt."],
      ["Nicht einrichten", "Samira richtet kein Konto ein, vergibt kein Passwort und schaltet keine Freigabe. Wer das Konzept später umsetzt, braucht eine eigene Freigabe. Diese Lektion endet bei der Skizze."],
    ],
    questions: [
      { id: "q1", prompt: "Wer ist der Empfänger im Papierkonzept?", correct: "leitung", options: [
        { id: "leitung", label: "Die Caféleitung.", feedback: "Richtig. Das Konzept nennt die Caféleitung. Gäste und beliebige Kollegen sind nicht Empfänger." },
        { id: "alle", label: "Alle Personen mit Internetzugang, weil eine Übersicht grundsätzlich öffentlich sein muss.", feedback: "Öffentlichkeit widerspricht dem Schutzbedarf. Der Empfänger bleibt die Caféleitung." },
        { id: "gaeste", label: "Die Gäste, weil Umsatzzahlen zur Bewirtung automatisch mit ausgehängt werden.", feedback: "Gäste sehen im Beispiel weder Umsätze noch Schichtnamen. Das Konzept sagt das ausdrücklich." },
      ] },
      { id: "q2", prompt: "Wie oft soll die Übersicht im Konzept aktualisiert werden?", correct: "ende", options: [
        { id: "live", label: "Ständig und live, obwohl der Auftrag nur den Stand am Tagesende verlangt.", feedback: "Live ist nicht vereinbart. Ein häufigerer Takt wäre eine andere Anforderung." },
        { id: "ende", label: "Einmal am Tagesende.", feedback: "Richtig. Das Konzept sieht eine Aktualisierung am Tagesende vor, nicht eine dauerhafte Verbindung." },
        { id: "nie", label: "Nie, weil eine einmal gezeichnete Skizze alle späteren Tage automatisch enthält.", feedback: "Die Skizze beschreibt den Takt. Sie enthält nicht von selbst die Umsätze späterer Tage." },
      ] },
      { id: "q3", prompt: "Welche Schutzziele notiert Samira getrennt?", correct: "drei", options: [
        { id: "farbe", label: "Nur die Farbe der Seite, weil Gestaltung alle Schutzziele gleichzeitig erfüllt.", feedback: "Gestaltung ist kein Schutzziel. Vertraulichkeit, Integrität und Verfügbarkeit bleiben getrennt." },
        { id: "einwort", label: "Ein einzelnes Wort Sicherheit, das alle drei Ziele ersetzt und keine Lücke mehr zeigt.", feedback: "Ein Sammelwort verdeckt, welches Ziel gemeint ist. Die drei Ziele werden einzeln notiert." },
        { id: "drei", label: "Vertraulichkeit, Integrität, Verfügbarkeit.", feedback: "Richtig. Umsätze bleiben vertraulich, kommen unverändert an und sind an Werktagen für die Leitung verfügbar." },
      ] },
      { id: "q4", prompt: "Was ist das Konzept in dieser Lektion nicht?", correct: "live", options: [
        { id: "live", label: "Eine eingerichtete Seite.", feedback: "Richtig. Die Skizze richtet nichts ein. Kein Konto, kein Passwort, keine Freigabe." },
        { id: "skizze", label: "Eine Skizze auf Papier, obwohl genau das der vereinbarte Arbeitsstand ist.", feedback: "Die Skizze ist der Arbeitsstand. Sie ist nicht schon die fertige Einrichtung." },
        { id: "notiz", label: "Eine Notiz zu Empfänger und Schutzbedarf, weil solche Angaben in einem Konzept verboten sind.", feedback: "Empfänger und Schutzbedarf gehören in das Konzept. Verboten ist nur, die Einrichtung vorzutäuschen." },
      ] },
    ]
  });
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})(typeof window !== "undefined" ? window : globalThis);
