/* Aufbau nach LF7-Lernzielkontrolle: 24 Fragen, Abgabe sperrt den Versuch.
 * Zurücksetzen nur mit dem Passwort der Lernzielkontrolle. Hier steht nur der SHA-256-Hash. */
(function (g) {
  "use strict";
  var KEY = "it-ausbildung.lf9-kontrolle.v1";
  var HASH = "15fb2a9581621437953d399ad3e4eb44e51c9df2d10c19b9754dba7d432fcd84";
  var FRAGEN = [
    { quelle: "lf9-anforderung", text: "Was ist im Beispiel eine Anforderung?", optionen: ["Gästenetz und Kasse getrennt.", "Eine bestimmte Kabelmarke, weil jede Anforderung schon die spätere Verlegung festlegen muss.", "Sofort einen Router kaufen, damit die Anforderung erst aus dem Karton abgelesen werden kann."], richtig: "a", hinweis: "Die Trennung ist gefordert. Ein Gerätetyp oder ein Kauf ist noch keine Anforderung." },
    { quelle: "lf9-anforderung", text: "Wie viele Gäste nennt das Beispiel gleichzeitig?", optionen: ["Beliebig viele, weil eine nicht genannte Zahl automatisch unbegrenzt bedeutet.", "Höchstens zehn.", "Genau ein Gast, weil ein Besprechungsraum nur eine Person versorgen darf."], richtig: "b", hinweis: "Die Caféleitung nennt höchstens zehn gleichzeitige Gäste. Mehr ist nicht vereinbart." },
    { quelle: "lf9-anforderung", text: "Darf die Kasse vom Gästenetz aus erreichbar sein?", optionen: ["Ja, weil Gäste sonst keine Preise sehen und die Kasse deshalb offen sein muss.", "Das ist egal, weil eine Anforderung keine Grenze für die Kasse enthalten kann.", "Nein, sie bleibt unerreichbar."], richtig: "c", hinweis: "Die Caféleitung verlangt die Trennung. Die Kasse ist vom Gästenetz aus nicht erreichbar." },
    { quelle: "lf9-ist", text: "Was ist am Besprechungsraum belegt?", optionen: ["Kein eigener Anschluss belegt.", "Eine fertige Leitung zur Kasse, weil jeder Besprechungsraum eine haben muss.", "Ein bereits eingerichtetes Gästenetz, weil der Wunsch danach den Ist-Zustand ersetzt."], richtig: "a", hinweis: "Belegt ist nur, dass kein eigener Anschluss beschrieben ist. Eine Leitung dazwischen ist unbekannt." },
    { quelle: "lf9-ist", text: "Wie geht Samira mit der unbekannten Leitung um?", optionen: ["Sie zeichnet die Leitung ein, damit der Plan vollständig aussieht.", "Sie schreibt unbekannt.", "Sie scannt das echte Netz der Theke, weil eine Übung ohne Scan keinen Ist-Zustand hat."], richtig: "b", hinweis: "Nicht belegt bleibt unbekannt. Eine erfundene Leitung wäre eine falsche Ist-Angabe." },
    { quelle: "lf9-ist", text: "Wohin gehört die gewünschte Trennung?", optionen: ["In die Ist-Spalte, weil ein Kundenwunsch den vorhandenen Zustand automatisch verändert.", "In keine Spalte, weil eine gewünschte Trennung in einer Planung nicht vorkommen darf.", "In die Soll-Spalte."], richtig: "c", hinweis: "Gewünscht ist nicht vorhanden. Die Trennung bleibt Soll, bis sie belegt wäre." },
    { quelle: "lf9-dienste", text: "Welchen Dienst leitet Samira aus dem Auftrag ab?", optionen: ["Einen Gästezugang.", "Einen Druckdienst, weil jedes Café automatisch einen Drucker im Netz haben muss.", "Einen öffentlichen Kassenzugriff, damit Gäste die Preise selbst an der Kasse ändern können."], richtig: "a", hinweis: "Der Auftrag verlangt eine Verbindung für Gäste, getrennt von der Kasse. Ein Druckdienst steht nicht im Auftrag." },
    { quelle: "lf9-dienste", text: "Warum bekommt die Kasse keinen neuen Dienst?", optionen: ["Weil die Kasse im Beispiel defekt ist und deshalb keinen Dienst mehr brauchen kann.", "Sie soll unerreichbar bleiben.", "Weil jeder Dienst an einer Kasse grundsätzlich zu teuer für eine Planung ist."], richtig: "b", hinweis: "Der Auftrag verlangt Trennung. Ein neuer Dienst an der Kasse würde diese Grenze aufheben." },
    { quelle: "lf9-dienste", text: "Welcher Dienst fällt heraus?", optionen: ["Der Gästezugang, obwohl die Caféleitung genau diese Verbindung verlangt hat.", "Die Trennung von der Kasse, weil ein Dienst keine Grenze enthalten darf.", "Ein Dateiserver ohne Auftrag."], richtig: "c", hinweis: "Ein Dateiserver steht nicht in der Anforderung. Samira erfindet ihn nicht dazu." },
    { quelle: "lf9-infrastruktur", text: "Was zeigt die Grenze in der Skizze?", optionen: ["Kein Weg vom Gästenetz zur Kasse.", "Nur eine hübsche Farbe, weil eine Grenze in einer Skizze keine Bedeutung haben darf.", "Dass Gäste die Kasse erreichen dürfen, sobald beide Räume auf demselben Blatt stehen."], richtig: "a", hinweis: "Die Grenze bedeutet Unerreichbarkeit. Dasselbe Blatt ist keine Verbindung." },
    { quelle: "lf9-infrastruktur", text: "Wie kennzeichnet Samira eine nicht belegte Leitung?", optionen: ["Als vorhandenen Bestand, damit der Plan keine Lücken mehr zeigt.", "Als Annahme, nicht als Bestand.", "Sie radiert den Besprechungsraum aus, weil eine Lücke den ganzen Plan ungültig macht."], richtig: "b", hinweis: "Eine angenommene Linie bleibt beschriftet. Unbekannt bleibt unbekannt." },
    { quelle: "lf9-infrastruktur", text: "Was ist die Skizze nicht?", optionen: ["Ein Mittel, den Auftrag zu prüfen, obwohl genau das ihr Zweck ist.", "Die Darstellung der Trennung, weil eine Grenze in einer Infrastruktur nicht vorkommen darf.", "Eine Installation."], richtig: "c", hinweis: "Die Skizze richtet nichts ein. Eine spätere Umsetzung braucht eine eigene Freigabe." },
    { quelle: "lf9-eignung", text: "Warum fällt Variante B heraus?", optionen: ["Sie verletzt die Trennung.", "Weil sie im Beispiel als die teuerste Variante ausgerechnet wurde.", "Weil der Buchstabe B in einer Planung grundsätzlich schlechter ist als A."], richtig: "a", hinweis: "Gäste und Kasse im selben Netz widersprechen der Anforderung, auch wenn es weniger Geräte wären." },
    { quelle: "lf9-eignung", text: "Welche wirtschaftliche Aussage ist hier zulässig?", optionen: ["Ein erfundener Eurobetrag, damit die Tabelle nicht leer wirkt.", "Der Preis bleibt offen.", "Dass jede getrennte Planung automatisch kostenlos ist."], richtig: "b", hinweis: "Ein unbelegter Preis bleibt eine Lücke. Getrennt ist nicht kostenlos." },
    { quelle: "lf9-eignung", text: "Was bedeutet nachhaltig in diesem Vergleich?", optionen: ["Ein grünes Logo auf der Skizze, weil das Zeichen die Beschaffung ersetzt.", "Möglichst viele Geräte kaufen, damit später jede denkbare Nutzung schon im Schrank liegt.", "Nichts beschaffen, was der Auftrag nicht braucht."], richtig: "c", hinweis: "Die Frage prüft unnötige Beschaffung. Sie ist kein Freibrief und kein Kauf." },
    { quelle: "lf9-standard", text: "Was gilt im Beispiel als Standard?", optionen: ["Trennung und höchstens zehn Gäste.", "Der Name eines Routerherstellers, weil ein Standard immer eine Marke sein muss.", "Eine Kabelmarke, weil ohne Markennamen keine Prüfung möglich ist."], richtig: "a", hinweis: "Die vereinbarte Regel ist der Standard dieser Planung. Ein Markenname ersetzt sie nicht." },
    { quelle: "lf9-standard", text: "Welche Frage gehört in die Funktionsprüfung?", optionen: ["Welche Farbe der Router hat, weil die Farbe die Trennung automatisch belegt.", "Bleibt die Kasse unerreichbar?", "Ob der Router im Angebot der günstigste ist, auch ohne belegten Preis."], richtig: "b", hinweis: "Die Prüfung fragt Grenze, Ort und Gästezahl. Ein Messgerät wird nicht angeschlossen." },
    { quelle: "lf9-standard", text: "Wann ist die Planung nicht bestanden?", optionen: ["Sobald Gäste überhaupt eine Verbindung bekommen, unabhängig von der Grenze zur Kasse.", "Sobald die Prüfung auf Papier steht, weil eine schriftliche Prüfung immer ein Fehlschlag ist.", "Wenn ein Weg zur Kasse bliebe."], richtig: "c", hinweis: "Ein funktionierendes Gästenetz besteht nicht, wenn die Kasse vom Gästenetz aus erreichbar wäre." },
    { quelle: "lf9-schutz", text: "Welche Datenschutzfrage stellt Samira?", optionen: ["Werden Personendaten erhoben?", "Welche Farbe das Gästenetz hat, weil die Farbe über den Personenbezug entscheidet.", "Welche Routermarke den Datenschutz automatisch erfüllt, ohne die Erhebung zu prüfen."], richtig: "a", hinweis: "Im Beispiel werden keine Gästenamen, Kennungen oder Passwörter angelegt. Die Frage bleibt trotzdem stehen." },
    { quelle: "lf9-schutz", text: "Was legt Samira für den Gästezugang nicht an?", optionen: ["Die Grenze zur Kasse, obwohl die Trennung zum Schutz gehört.", "Eine Namensliste der Gäste.", "Die Notiz, dass keine Personendaten erhoben werden."], richtig: "b", hinweis: "Eine Gästeliste wäre eine unnötige Erhebung. Der Auftrag verlangt sie nicht." },
    { quelle: "lf9-schutz", text: "Wann besteht der Gästezugang den Schutz nicht?", optionen: ["Sobald er nur auf Papier beschrieben ist, weil Schutz eine Installation voraussetzt.", "Sobald höchstens zehn Gäste genannt sind, weil eine Zahl den Schutz automatisch verletzt.", "Wenn er die Kasse sichtbar macht."], richtig: "c", hinweis: "Funktion für Gäste ersetzt die Grenze nicht. Sichtbare Kasse bedeutet nicht bestanden." },
    { quelle: "lf9-zukunft", text: "Wann gilt die Caféleitung im Beispiel als zufrieden?", optionen: ["Grenze, Gäste und klare Notiz.", "Sobald mehr Geräte als gefordert im Plan stehen, auch wenn die Grenze fehlt.", "Erst wenn das echte Café bereits umgebaut ist und Gäste die Kasse sehen."], richtig: "a", hinweis: "Ankommen im Besprechungsraum, getrennte Kasse und eine nachvollziehbare Notiz erfüllen den Auftrag." },
    { quelle: "lf9-zukunft", text: "Was heißt zukunftsfähig in dieser Übung?", optionen: ["Schon heute für hundert Gäste planen, obwohl nur zehn vereinbart sind.", "Änderungen bleiben in der Notiz sichtbar.", "Die Grenze weglassen, damit spätere Wünsche nicht an einer alten Regel hängen."], richtig: "b", hinweis: "Grenze und Gästezahl sind so notiert, dass eine spätere Änderung auffällt. Es wird nichts vorgebaut." },
    { quelle: "lf9-zukunft", text: "Was ist diese Beurteilung nicht?", optionen: ["Ein Blick auf Grenze und Gästezahl, obwohl genau das die Beurteilung trägt.", "Eine Übung auf Papier, weil eine Beurteilung immer ein beauftragter Umbau ist.", "Eine Freigabe des Lernfelds."], richtig: "c", hinweis: "Die Übung bewertet die Planung. Das Feld bleibt auf In Kürze, bis es sichtbar geprüft ist." },
  ];
  function normalize(raw) {
    var s = { answers: {}, finish: false };
    if (!raw || typeof raw !== "object") return s;
    FRAGEN.forEach(function (_, index) { if (raw.answers && ["a", "b", "c"].indexOf(raw.answers[index]) !== -1) s.answers[index] = raw.answers[index]; });
    s.finish = raw.finish === true; return s;
  }
  function evaluate(answers) {
    answers = answers || {};
    var correct = 0, empty = 0;
    FRAGEN.forEach(function (q, index) { if (["a", "b", "c"].indexOf(answers[index]) === -1) empty++; else if (answers[index] === q.richtig) correct++; });
    return { correct: correct, empty: empty, wrong: FRAGEN.length - correct - empty, allCorrect: correct === FRAGEN.length };
  }
  var api = { ID: "lf9-kontrolle", KEY: KEY, FRAGEN: FRAGEN, evaluate: evaluate, normalize: normalize };
  g.LF9_KONTROLLE = api;
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  if (!g.document) return;
  var d = g.document, state = normalize();
  function $(id) { return d.getElementById(id); }
  function notify() { if (g.LERNFORTSCHRITT && g.LERNFORTSCHRITT.benachrichtigen) g.LERNFORTSCHRITT.benachrichtigen(); }
  function save() {
    try { g.localStorage.setItem(KEY, JSON.stringify(state)); $("speicher-hinweis").textContent = ""; }
    catch (e) { $("speicher-hinweis").textContent = "Der Stand kann nicht gespeichert werden. Der Versuch bleibt nur für diesen Besuch erhalten."; }
    notify();
  }
  function load() {
    try { state = normalize(JSON.parse(g.localStorage.getItem(KEY) || "null")); }
    catch (e) { $("speicher-hinweis").textContent = "Der gespeicherte Stand ließ sich nicht lesen. Die Kontrolle beginnt ohne diesen Stand."; }
  }
  function render() {
    var host = $("lernziel-fragen"); host.textContent = "";
    FRAGEN.forEach(function (q, index) {
      var field = d.createElement("fieldset"), legend = d.createElement("legend"); field.className = "frage";
      legend.textContent = (index + 1) + ". " + q.text; field.appendChild(legend);
      q.optionen.forEach(function (option, pos) {
        var label = d.createElement("label"), input = d.createElement("input"), letter = String.fromCharCode(97 + pos);
        label.className = "quiz-option"; input.type = "radio"; input.name = "f" + index; input.value = letter; input.id = "f" + index + letter;
        label.setAttribute("for", input.id); input.checked = state.answers[index] === letter; input.disabled = state.finish;
        input.addEventListener("change", function () { if (!state.finish) { state.answers[index] = letter; save(); statusText(); } });
        label.appendChild(input); label.appendChild(d.createTextNode(" " + option)); field.appendChild(label);
      });
      if (state.finish) { var feedback = d.createElement("p"); feedback.textContent = (state.answers[index] === q.richtig ? "Richtig. " : "Nicht richtig. ") + q.hinweis; field.appendChild(feedback); }
      host.appendChild(field);
    });
    $("lernziel-abgeben").hidden = state.finish; statusText();
  }
  function statusText() {
    var ev = evaluate(state.answers);
    $("lernziel-status").textContent = !state.finish ? ev.empty ? "Noch " + ev.empty + " von 24 Antworten offen." : "Alle 24 Antworten sind gewählt. Noch nicht abgegeben." : ev.allCorrect ? "Bestanden. Alle 24 Antworten sind richtig. Die Kontrolle bleibt gesperrt, bis sie mit dem Passwort zurückgesetzt wird." : ev.correct + " von 24 richtig. Die Kontrolle ist nicht bestanden und bleibt gesperrt. Ein neuer Versuch braucht das Passwort.";
  }
  $("lernziel-form").addEventListener("submit", function (event) {
    event.preventDefault(); if (state.finish) return;
    var missing = FRAGEN.map(function (_, index) { return state.answers[index] ? null : index + 1; }).filter(Boolean);
    if (missing.length) { $("lernziel-status").textContent = "Noch offen: Frage " + missing.join(", ") + "."; $("lernziel-status").focus(); return; }
    state.finish = true; save(); render(); $("lernziel-status").focus();
  });
  function passwortPasst(wort) {
    if (!g.crypto || !g.crypto.subtle || typeof wort !== "string" || wort.length === 0) return Promise.resolve(false);
    return g.crypto.subtle.digest("SHA-256", new TextEncoder().encode(wort)).then(function (digest) {
      var hex = Array.from(new Uint8Array(digest)).map(function (byte) { return byte.toString(16).padStart(2, "0"); }).join("");
      return hex === HASH;
    });
  }
  var dialog = $("reset-dialog");
  var passwort = $("reset-passwort");
  var resetHinweis = $("reset-hinweis");
  var beschaeftigt = false;
  $("lernziel-reset").addEventListener("click", function () {
    if (resetHinweis) resetHinweis.textContent = "";
    if (passwort) passwort.value = "";
    if (dialog && typeof dialog.showModal === "function") dialog.showModal();
    if (passwort) passwort.focus();
  });
  $("reset-abbrechen").addEventListener("click", function () { dialog.close(); });
  $("reset-form").addEventListener("submit", function (event) {
    event.preventDefault();
    if (beschaeftigt) return;
    var wort = passwort ? passwort.value : "";
    beschaeftigt = true;
    passwortPasst(wort).then(function (ok) {
      beschaeftigt = false;
      if (passwort) passwort.value = "";
      if (!ok) {
        if (resetHinweis) resetHinweis.textContent = wort.length === 0 ? "Kein Passwort eingegeben. Der Stand bleibt erhalten." : "Passwort nicht richtig. Der Stand bleibt erhalten.";
        if (passwort) passwort.focus();
        return;
      }
      state = normalize(); save(); render(); dialog.close(); $("lernziel-status").focus();
    }).catch(function () {
      beschaeftigt = false;
      if (resetHinweis) resetHinweis.textContent = "Prüfung nicht möglich. Der Stand bleibt erhalten.";
    });
  });
  g.addEventListener("pageshow", function (event) { if (event.persisted) { load(); render(); } });
  load(); render();
})(typeof window !== "undefined" ? window : globalThis);