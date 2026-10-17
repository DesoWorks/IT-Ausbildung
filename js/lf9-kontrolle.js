/* Aufbau nach LF7-Lernzielkontrolle: 24 Fragen, Abgabe sperrt den Versuch.
 * Zurücksetzen nur mit dem Passwort der Lernzielkontrolle. Hier steht nur der SHA-256-Hash. */
(function (g) {
  "use strict";
  var KEY = "it-ausbildung.lf9-kontrolle.v1";
  var HASH = "15fb2a9581621437953d399ad3e4eb44e51c9df2d10c19b9754dba7d432fcd84";
  var FRAGEN = [
    { quelle: "lf9-anforderung", text: "Was beschreibt hier eine Kundenanforderung?", optionen: ["Gästezugang ermöglichen und den Zugriff zur Kasse verhindern.", "Den Gästezugang mit einem zusätzlichen Access Point lösen.", "Einen Router mit separatem Gästeanschluss beschaffen."], richtig: "a", hinweis: "Nutzen und Grenze bilden die Anforderung. Access Point und Routerkauf sind bereits Lösungsentscheidungen." },
    { quelle: "lf9-anforderung", text: "Welche Gerätekapazität ist vereinbart?", optionen: ["Zehn Gäste am Tag, unabhängig von ihren Endgeräten.", "Mindestens zehn Endgeräte sollen gleichzeitig nutzbar sein.", "Genau zehn Leases mit einer verbindlichen Sperre für das elfte Gerät."], richtig: "b", hinweis: "Gleichzeitige Gerätekapazität ist weder Tagesbesucherzahl noch harte Zulassungsobergrenze." },
    { quelle: "lf9-anforderung", text: "Darf die Kasse vom Gästenetz aus erreichbar sein?", optionen: ["Lesender Zugriff ist erlaubt, wenn nichts geändert wird.", "Zugriff ist nach erfolgreicher Gästeanmeldung erlaubt.", "Nein, die Kasse bleibt vom Gästenetz aus unerreichbar."], richtig: "c", hinweis: "Die Grenze gilt auch für angemeldete Gäste und für ausschließlich lesende Zugriffe." },
    { quelle: "lf9-ist", text: "Was ist zum Anschluss im Besprechungsraum belegt?", optionen: ["Ein eigener Anschluss ist nicht beschrieben und bleibt ungeklärt.", "Eine Leitung zur Theke lässt sich aus der Raumnähe ableiten.", "Ein Gästenetz ist aus dem geäußerten Anschlusswunsch ableitbar."], richtig: "a", hinweis: "Nicht beschrieben ist ungeklärt, nicht sicher abwesend. Ein Wunsch belegt keinen vorhandenen Anschluss." },
    { quelle: "lf9-ist", text: "Wie wird der unbekannte Leitungsbestand behandelt?", optionen: ["Eine plausible Verbindung als vorhandenen Bestand übernehmen.", "Den Bestand als ungeklärt markieren und die Lücke festhalten.", "Ohne weiteren Auftrag das reale Netz per Scan untersuchen."], richtig: "b", hinweis: "Eine ungeklärte Bestandsfrage bleibt sichtbar. Vermutung oder eigenmächtiger Scan sind kein zulässiger Ersatz." },
    { quelle: "lf9-ist", text: "Wohin gehört die geforderte Netztrennung?", optionen: ["Zum Istzustand, sobald die Leitung den Wunsch bestätigt hat.", "Nur zur Maßnahmenliste, ohne sie als Zielzustand zu beschreiben.", "Zum Sollzustand mit einem später zu prüfenden Abnahmekriterium."], richtig: "c", hinweis: "Eine bestätigte Anforderung beschreibt ein Ziel. Sie ist kein Beleg der bereits umgesetzten Trennung." },
    { quelle: "lf9-dienste", text: "Welcher Dienstbedarf folgt aus dem Auftrag?", optionen: ["Gästezugang mit geeigneter Adressbereitstellung.", "Gemeinsamer Druckdienst für Besprechungsteilnehmer.", "Lesender Informationsdienst auf dem Kassensystem."], richtig: "a", hinweis: "Die Gästeverbindung ist beauftragt; ein Druckdienst nicht. Die Kasse muss für Gäste unerreichbar bleiben." },
    { quelle: "lf9-dienste", text: "Warum wird für die Kasse kein zusätzlicher Dienst geplant?", optionen: ["Ein Dienst würde das Gerät technisch unerreichbar machen.", "Für die Kasse ist kein zusätzlicher Dienstbedarf beauftragt.", "Der zusätzliche Aufwand wurde bereits als zu hoch belegt."], richtig: "b", hinweis: "Dienstbedarf folgt aus dem Auftrag. Unerreichbarkeit wird getrennt durch Schutzregeln und Trennung erreicht." },
    { quelle: "lf9-dienste", text: "Welcher zusätzliche Dienst fällt aus der Planung?", optionen: ["Die Gästeverbindung für den vereinbarten Besprechungsraum.", "Die Adressbereitstellung für den geplanten Gästezugang.", "Eine gemeinsame Dateiablage ohne genannten Nutzungsbedarf."], richtig: "c", hinweis: "Die Dateiablage ist nicht aus dem Bedarf abgeleitet; Verbindung und Adressbereitstellung unterstützen den Auftrag." },
    { quelle: "lf9-infrastruktur", text: "Was bedeutet die Zugriffsgrenze in der Skizze?", optionen: ["Der Zugang vom Gästenetz zum Kassensystem ist ausgeschlossen.", "Gäste und Kasse erhalten unterschiedliche Funknetznamen.", "Nur Änderungen an der Kasse sind für Gäste ausgeschlossen."], richtig: "a", hinweis: "Unterschiedliche SSIDs oder bloßer Schreibschutz belegen die geforderte Unerreichbarkeit nicht." },
    { quelle: "lf9-infrastruktur", text: "Wie wird eine nicht belegte Leitung gekennzeichnet?", optionen: ["Als Bestand, sofern sie technisch plausibel erscheint.", "Als unbestätigte Annahme mit offener Bestandsprüfung.", "Als verbindliche Nutzungsgrundlage ohne Prüfvermerk."], richtig: "b", hinweis: "Eine Annahme muss sichtbar von nachgewiesenem Bestand getrennt bleiben, auch wenn sie plausibel ist." },
    { quelle: "lf9-infrastruktur", text: "Was ist eine Skizze noch nicht?", optionen: ["Eine Grundlage zum Abgleich der Planung mit dem Auftrag.", "Eine Darstellung der vorgesehenen Wege und Zugriffsgrenzen.", "Ein Nachweis der real installierten und geprüften Netztrennung."], richtig: "c", hinweis: "Eine Planzeichnung zeigt den Sollzustand, beweist aber keine Installation oder reale Funktionsprüfung." },
    { quelle: "lf9-eignung", text: "Warum scheidet Variante B aus?", optionen: ["Sie sieht keinen Zugriffsschutz für die Kasse vor.", "Ihr höherer Anschaffungspreis ist bereits belegt.", "Ein Gerät kann grundsätzlich keine Netze trennen."], richtig: "a", hinweis: "Die konkrete Variante verletzt den Zugriffsschutz. Ein Gerät kann technisch mehrere Netze unterstützen." },
    { quelle: "lf9-eignung", text: "Welche Aussage zum realen Preis ist zulässig?", optionen: ["Eine unmarkierte Schätzung darf als Angebot gelten.", "Ohne Angebot bleibt der reale Anschaffungspreis ungeklärt.", "Vorhandene Geräte verursachen keine laufenden Kosten."], richtig: "b", hinweis: "Fiktive Laborannahmen sind keine Angebote. Energie und Wartung können auch bei Bestand Kosten verursachen." },
    { quelle: "lf9-eignung", text: "Welcher Ansatz berücksichtigt unnötige Beschaffung?", optionen: ["Nur die kleinste Kaufsumme als alleinigen Umweltmaßstab verwenden.", "Für noch unbestätigte Nutzungsszenarien vorsorglich Reservegeräte kaufen.", "Beschaffung auf begründeten Bedarf beschränken und Überflüssiges vermeiden."], richtig: "c", hinweis: "Begründeter Bedarf hilft unnötige Beschaffung vermeiden, ersetzt aber keine vollständige Nachhaltigkeitsanalyse." },
    { quelle: "lf9-standard", text: "Was ist ein konkreter technischer Standard?", optionen: ["DHCP nach der veröffentlichten Spezifikation RFC 2131.", "Die Kundenforderung, Gäste und Kasse zu trennen.", "Die interne Vorgabe, ein bestimmtes Routermodell zu kaufen."], richtig: "a", hinweis: "DHCP ist technisch spezifiziert. Kundenkriterium und Produktvorgabe sind keine Protokollstandards." },
    { quelle: "lf9-standard", text: "Welche Frage prüft die geforderte Funktion und Grenze?", optionen: ["Ist ein bereits vertrauter Routerhersteller vorgesehen?", "Ist die Kasse aus dem funktionsfähigen Gästenetz unerreichbar?", "Bleibt der Kaufpreis unter dem geplanten Budget?"], richtig: "b", hinweis: "Der Zugriffsschutz wird aus einer funktionierenden Gästeverbindung geprüft, nicht aus Marke oder Preis abgeleitet." },
    { quelle: "lf9-standard", text: "Wann verfehlt die Planung das Schutzkriterium?", optionen: ["Wenn der DHCP-Pool elf statt zehn Geräte versorgen kann.", "Wenn zusätzlich ein klar gekennzeichnetes Modellprotokoll geführt wird.", "Wenn Gäste die Kasse trotz funktionierender Verbindung erreichen können."], richtig: "c", hinweis: "Die Zugriffsmöglichkeit verletzt die Grenze. Mehr als zehn Geräte sind nicht grundsätzlich verboten." },
    { quelle: "lf9-schutz", text: "Welche Frage klärt zuerst die anfallenden Daten?", optionen: ["Welche Angaben einschließlich IP-Adressen und Protokollen entstehen?", "Welche Verschlüsselung schützt den Funkzugang vor Mitlesen durch Dritte?", "Welche Firewallregel sperrt die Kasse aus dem Gästenetz zuverlässig?"], richtig: "a", hinweis: "Datenschutz braucht einen Blick auf Datenarten und Zwecke. Sicherheitsmaßnahmen beantworten diese Frage nicht allein." },
    { quelle: "lf9-schutz", text: "Was wird nicht zusätzlich angelegt?", optionen: ["Die geplante Zugriffsgrenze zum Kassensystem.", "Eine Liste der Gästenamen ohne benötigten Verarbeitungszweck.", "Eine Notiz zu technischen Daten und offenen Rechtsfragen."], richtig: "b", hinweis: "Die unnötige Namensliste entfällt. Zugriffsschutz und Dokumentation bleiben notwendig bzw. sinnvoll." },
    { quelle: "lf9-schutz", text: "Wann ist der geplante Schutz verletzt?", optionen: ["Wenn die beschriebene Trennung noch nicht real installiert worden ist.", "Wenn mehr als zehn gleichzeitige Endgeräte technisch möglich wären.", "Wenn Gäste das Kassensystem trotz funktionierender Verbindung erreichen."], richtig: "c", hinweis: "Die Grenze wird durch Kassenzugriff verletzt. Planungsstand oder größere Kapazität sind nicht dieser Schutzfehler." },
    { quelle: "lf9-zukunft", text: "Woran misst sich die Zufriedenheit im fiktiven Auftrag?", optionen: ["Gästezugang, Kassentrennung und verständliche Übergabe erfüllen den Bedarf.", "Eine höhere Gerätezahl belegt bereits die Qualität der Planung.", "Eine funktionierende Verbindung erlaubt den Aufschub der Kassentrennung."], richtig: "a", hinweis: "Vereinbarte Funktion und Schutzgrenze müssen gemeinsam erfüllt und nachvollziehbar dokumentiert sein." },
    { quelle: "lf9-zukunft", text: "Was unterstützt spätere begründete Änderungen?", optionen: ["Unbestätigte Reserven für hundert Endgeräte sofort und vorsorglich beschaffen.", "Kapazität und Schutzgrenze für einen erneuten Anforderungsabgleich dokumentieren.", "Die Zugriffssperre bei jeder Kapazitätserweiterung ohne neue Prüfung aufheben."], richtig: "b", hinweis: "Nachvollziehbare Annahmen ermöglichen spätere Prüfungen. Mehr Kapazität hebt den Schutzbedarf nicht auf." },
    { quelle: "lf9-zukunft", text: "Was ist diese Planungsbeurteilung nicht?", optionen: ["Ein Abgleich mit Schutzgrenze und Mindestkapazität.", "Eine Reflexion des fiktiven Auftrags ohne reale Kundenabnahme.", "Eine Freigabeentscheidung für die gesperrten Lernfeldseiten."], richtig: "c", hinweis: "Die Beurteilung ist eine Übung. Dennis' ausdrückliche Freigabe des Lernfelds wird dadurch nicht ersetzt." },
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
  /* Nur die sichtbare Reihenfolge wird gemischt (Fisher-Yates, einmal je Seitenbesuch).
   * Werte, IDs, Speicher und Arrayreihenfolge bleiben unverändert. */
  function mischen(n, rnd) {
    var order = [], i, j, t, r = rnd || (typeof g.LF9_ZUFALL === "function" ? g.LF9_ZUFALL : Math.random);
    for (i = 0; i < n; i++) order.push(i);
    for (i = n - 1; i > 0; i--) { j = Math.min(i, Math.floor(r() * (i + 1))); t = order[i]; order[i] = order[j]; order[j] = t; }
    return order;
  }
  var api = { mischen: mischen, ID: "lf9-kontrolle", KEY: KEY, FRAGEN: FRAGEN, evaluate: evaluate, normalize: normalize };
  g.LF9_KONTROLLE = api;
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  if (!g.document) return;
  var d = g.document, state = normalize();
  var anordnung = FRAGEN.map(function (q) { return mischen(q.optionen.length); });
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
      anordnung[index].forEach(function (pos) {
        var option = q.optionen[pos];
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