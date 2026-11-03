(function (g) {
  "use strict";
  var engine = typeof module !== "undefined" && module.exports ? require("./lf7-lektion.js") : g.LF7_LEKTION;
  var api = engine.create({
    id: "lf7-sicherheit", title: "Betriebssicherheit und Datensicherheit unterscheiden",
    goals: ["Sicheren Betrieb von Schutz der Daten unterscheiden.", "Grenzen des Leuchthinweises, veraltete Werte und offene Fragen ehrlich benennen."],
    theory: [
      ["Betriebssicherheit", "Samira bespricht bei Nordlicht IT-Service die erfundene Raumklima-Station. Betriebssicherheit betrifft hier den sicheren Betrieb ohne gefährliche Auswirkungen, zum Beispiel passende Versorgung, geschützte Komponenten und erkennbare Störungen. Eine ausbleibende Leuchte bei fehlendem Messwert beweist keine unbedenkliche Raumtemperatur. Der Hinweis ist kein zugelassenes Schutzsystem und steuert keine echte Anlage."],
      ["Datensicherheit", "Datensicherheit betrifft Vertraulichkeit, Integrität und Verfügbarkeit der Daten. Vertraulichkeit: Nur vorgesehene Personen sehen die Werte. Integrität: Messwert, Einheit und Zeitpunkt dürfen nicht unbemerkt verändert werden. Verfügbarkeit: Der vereinbarte Datenzugang soll funktionieren; fehlende neue Werte werden erkennbar statt als frisch dargestellt. Auch bei erfundenen Temperaturdaten bleiben diese Ziele verschieden."],
      ["Abwägen und reflektieren", "Samira hält im Papierplan fest: nur erforderliche Raumkennung statt Personennamen übertragen, Zugriffsrollen vorsehen, Datenalter anzeigen und offene Versorgungs- und Genauigkeitsfragen klären. Eine funktionierende Anzeige beweist weder einen sicheren Betrieb noch umfassenden Datenschutz. Samira trennt Beobachtung, Bewertung und offene Punkte. Das Ergebnis bleibt eine erste Inhaltsfassung ohne echte Inbetriebnahme oder Sicherheitsfreigabe."]
    ],
    questions: [
      { id: "q1", prompt: "Welche Frage gehört vor allem zur Betriebssicherheit?", correct: "versorgung", options: [
        { id: "versorgung", label: "Passt die Versorgung zum sicheren Betrieb?", feedback: "Richtig. Eine geeignete Versorgung und erkennbare Störungen betreffen den sicheren Betrieb des Systems." },
        { id: "lesen", label: "Welche vorgesehenen Personen dürfen die Temperaturdaten auf der Übersichtsseite lesen?", feedback: "Das ist eine Frage der Vertraulichkeit von Daten. Sie gehört zur Datensicherheit und ersetzt keine Betriebsprüfung." },
        { id: "veraendern", label: "Wurde der übertragene Temperaturwert auf dem Weg zur Übersichtsseite unbemerkt verändert?", feedback: "Das betrifft die Integrität der Daten. Betriebssicherheit betrachtet dagegen hier den sicheren Betrieb ohne gefährliche Wirkung." }
      ] },
      { id: "q2", prompt: "Ein Messwert wurde unbemerkt verändert. Welches Schutzziel ist betroffen?", correct: "integritaet", options: [
        { id: "versorgung", label: "Nur die Strombelastbarkeit, weil jede Datenänderung unmittelbar eine andere Versorgungsspannung beweist.", feedback: "Eine Datenänderung belegt keine andere Versorgung. Unbemerkte Veränderung betrifft die Integrität." },
        { id: "integritaet", label: "Integrität.", feedback: "Richtig. Integrität bedeutet hier, dass Messwert, Einheit und Zeitpunkt nicht unbemerkt verändert werden." },
        { id: "bereich", label: "Nur der Temperaturmessbereich, der bei jeder veränderten Nachricht automatisch größer werden muss.", feedback: "Der Messbereich ist eine Sensoreigenschaft. Eine unbemerkte Änderung übertragener Daten verletzt die Integrität." }
      ] },
      { id: "q3", prompt: "Was darf Samira aus einer nicht leuchtenden Hinweisleuchte nicht folgern?", correct: "sicher", options: [
        { id: "offen", label: "Dass sie bei fehlendem Sensorwert die Störung und das Alter der Daten getrennt prüfen muss.", feedback: "Diese Prüfung ist sinnvoll. Nicht zulässig ist dagegen, die Leuchte allein als Beweis für eine unbedenkliche Temperatur zu nehmen." },
        { id: "grenze", label: "Dass die Leuchte im fiktiven Plan nur einen Hinweis gibt und keine zugelassene Schutzfunktion ersetzt.", feedback: "Das ist eine wichtige Grenze des Beispiels. Ein bloßer Hinweis ersetzt keine geprüfte Schutzfunktion." },
        { id: "sicher", label: "Der Raum ist sicher unbedenklich.", feedback: "Richtig. Bei fehlenden Messwerten ist die Temperatur unbekannt. Die Leuchte allein ist kein Sicherheitsnachweis." }
      ] },
      { id: "q4", prompt: "Welche Daten plant Samira für die Übertragung ein?", correct: "noetig", options: [
        { id: "alle", label: "Zusätzlich Namen aller anwesenden Personen, obwohl der Auftrag nur den Raumklimawert benötigt.", feedback: "Personennamen werden für den beschriebenen Zweck nicht gebraucht. Samira beschränkt den Datensatz auf das Erforderliche." },
        { id: "noetig", label: "Raumkennung, Messwert, Einheit und Zeitpunkt.", feedback: "Richtig. Diese Angaben beschreiben den erforderlichen Klimawert; unnötige Personennamen gehören nicht hinein." },
        { id: "beliebig", label: "Beliebige zusätzliche persönliche Angaben, damit später ohne festgelegten Zweck möglichst viel gesammelt ist.", feedback: "Vorsorgliches Sammeln beliebiger persönlicher Daten gehört nicht zum Auftrag. Der Plan bleibt beim notwendigen Datensatz." }
      ] }
    ]
  });
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})(typeof window !== "undefined" ? window : globalThis);