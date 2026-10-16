(function (global) {
  "use strict";
  var mehr = [
    { text: "Samira stellt einer neuen Kollegin den Arbeitsplatzauftrag vor. Was heißt adressatengerecht?", optionen: ["Möglichst viele Fachkürzel, damit es kompetent wirkt.", "Inhalt, Sprache und Detailgrad so wählen, dass die Kollegin den Ablauf versteht.", "Nur den eigenen Namen nennen."], richtig: "b", hinweis: "Adressatengerecht heißt: verständlich und nützlich für die vorgesehenen Zuhörenden." },
    { text: "Welche Reihenfolge hilft bei einer kurzen Vorstellung?", optionen: ["Zuerst jedes Detail, dann den Zweck, falls noch Zeit ist.", "Zweck, dann die wenigen Informationen, die den Ablauf verständlich machen.", "Zuerst die Schlussfolgerung einer anderen Lektion, ohne den Auftrag zu nennen."], richtig: "b", hinweis: "Der Zweck bestimmt, welche Informationen in die kurze Vorstellung gehören." },
    { text: "Was ist ein Qualitätskriterium in dieser Lernaufgabe?", optionen: ["Eine überprüfbare Eigenschaft, anhand derer das Ergebnis beurteilt wird.", "Die private Meinung der lautesten Person.", "Nur die Farbe der Folie."], richtig: "a", hinweis: "Ein Kriterium muss sich prüfen lassen. Geschmack allein ist keins." },
    { text: "Im Kurzbericht fehlen das Prüfergebnis und der nächste Schritt. Welche Verbesserung passt?", optionen: ["Die Schriftart ändern.", "Die fehlenden Informationen ergänzen und einen konkreten nächsten Schritt nennen.", "Die Person bewerten, die den Bericht geschrieben hat."], richtig: "b", hinweis: "Die Lücke sitzt im Inhalt. Eine Farbänderung oder eine Personenbewertung schließt sie nicht." },
    { text: "Woran erkennt Samira, ob ein Mangel den Inhalt, die Verständlichkeit oder die Vollständigkeit betrifft?", optionen: ["Sie rät nach dem ersten Eindruck.", "Sie prüft die Darstellung gegen die vorher genannten Kriterien.", "Sie fragt nur, ob die Folie schön aussieht."], richtig: "b", hinweis: "Die vereinbarten Kriterien trennen die Fehlerart. Der erste Eindruck reicht nicht." },
    { text: "Was ist eine Reflexion in diesem Lernfeld?", optionen: ["Eine Schuldzuweisung an die Kollegin.", "Eine Situation betrachten: Ziel, eigenes Tun, Ergebnis und was daraus folgt.", "Ein Versprechen, dass der nächste Versuch automatisch gelingt."], richtig: "b", hinweis: "Reflexion sucht den nächsten Schritt, nicht Schuldige." },
    { text: "Samira hat einen unklaren Schritt nachgefragt und danach geprüft. Wie beschreibt sie das sachlich?", optionen: ["Ich war unsicher, habe nachgefragt, geprüft und das Ergebnis festgehalten.", "Die Anleitung war schuld, deshalb ist keine Prüfung nötig.", "Alles war perfekt, auch ohne Nachweis."], richtig: "a", hinweis: "Eine sachliche Reflexion nennt Beobachtung und nächsten Schritt, keine Pauschalbehauptung." },
    { text: "Eine pauschale Behauptung ersetzt den Nachweis nicht. Was folgt daraus für den nächsten Schritt?", optionen: ["Den konkreten Fall noch einmal gegen die Kriterien prüfen.", "Die Behauptung lauter wiederholen.", "Die Prüfung streichen, damit kein Fehler sichtbar wird."], richtig: "a", hinweis: "Ohne Nachweis bleibt die Aussage ungeprüft. Der nächste Schritt ist die Prüfung am Fall." }
  ];
  var basis = global.__LF1_FRAGEN || [];
  var behalten = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 18, 19, 20, 23];
  var FRAGEN = behalten.map(function (index) { return basis[index]; }).concat(mehr.slice(0, 5));
  var HASH = global.__LF1_HASH;
  delete global.__LF1_FRAGEN;
  delete global.__LF1_HASH;

  function passwortPasst(wort) {
    if (!global.crypto || !global.crypto.subtle || typeof wort !== "string" || wort.length === 0) return Promise.resolve(false);
    return global.crypto.subtle.digest("SHA-256", new TextEncoder().encode(wort)).then(function (digest) {
      var hex = Array.from(new Uint8Array(digest)).map(function (byte) { return byte.toString(16).padStart(2, "0"); }).join("");
      return hex === HASH;
    });
  }

  var api = { FRAGEN: FRAGEN, HASH: HASH, passwortPasst: passwortPasst };
  global.LF1_LERNZIEL = api;
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  if (!global.document) return;

  var doc = global.document;
  var key = "it-ausbildung.lf1-lernziel.v1";
  var state = { answers: {}, finish: false };
  var lesefehler = false;
  var beschaeftigt = false;
  function $(id) { return doc.getElementById(id); }
  var form = $("lernziel-form");
  var host = $("lernziel-fragen");
  var status = $("lernziel-status");
  var speicherhinweis = $("speicher-hinweis");
  var dialog = $("reset-dialog");
  var passwort = $("reset-passwort");
  var resetHinweis = $("reset-hinweis");
  if (!form || !host || !dialog || FRAGEN.length !== 24) return;

  function benachrichtigen() {
    if (global.LERNFORTSCHRITT && global.LERNFORTSCHRITT.benachrichtigen) global.LERNFORTSCHRITT.benachrichtigen();
  }
  try {
    var raw = global.localStorage.getItem(key);
    if (raw !== null) {
      var saved = JSON.parse(raw);
      if (!saved || typeof saved.answers !== "object" || saved.answers === null || Array.isArray(saved.answers) || typeof saved.finish !== "boolean") throw new Error("ungültig");
      state = { answers: saved.answers, finish: saved.finish };
    }
  } catch (e) { lesefehler = true; }

  function speichern() {
    try {
      global.localStorage.setItem(key, JSON.stringify(state));
      if (speicherhinweis) speicherhinweis.textContent = "";
      lesefehler = false;
      return true;
    } catch (e) {
      lesefehler = true;
      if (speicherhinweis) speicherhinweis.textContent = "Der Stand konnte nicht gespeichert werden. Die Kontrolle bleibt auf diesem Gerät nur für diesen Besuch sichtbar.";
      return false;
    }
  }
  function buchstabe(index) { return String.fromCharCode(97 + index); }
  function zeichnen() {
    host.textContent = "";
    FRAGEN.forEach(function (frage, index) {
      var feld = doc.createElement("fieldset");
      feld.className = "frage";
      var legende = doc.createElement("legend");
      legende.textContent = (index + 1) + ". " + frage.text;
      feld.appendChild(legende);
      frage.optionen.forEach(function (option, optionIndex) {
        var id = "f" + index + buchstabe(optionIndex);
        var label = doc.createElement("label");
        label.setAttribute("for", id);
        var input = doc.createElement("input");
        input.type = "radio";
        input.name = "f" + index;
        input.id = id;
        input.value = buchstabe(optionIndex);
        if (state.answers[index] === buchstabe(optionIndex)) input.checked = true;
        input.disabled = !!state.finish;
        input.addEventListener("change", function () {
          if (state.finish) return;
          state.answers[index] = input.value;
          speichern();
        });
        label.appendChild(input);
        label.appendChild(doc.createTextNode(" " + option));
        feld.appendChild(label);
      });
      if (state.finish) {
        var hinweis = doc.createElement("p");
        hinweis.className = "hinweis";
        hinweis.textContent = state.answers[index] === frage.richtig ? "Richtig." : "Nicht richtig. " + frage.hinweis;
        feld.appendChild(hinweis);
      }
      host.appendChild(feld);
    });
    var abgeben = $("lernziel-abgeben");
    if (abgeben) abgeben.hidden = !!state.finish;
    form.querySelectorAll("input").forEach(function (input) { input.disabled = !!state.finish; });
    var richtig = FRAGEN.filter(function (frage, index) { return state.answers[index] === frage.richtig; }).length;
    var offen = FRAGEN.filter(function (_, index) { return !state.answers[index]; }).length;
    if (!status) return;
    if (!state.finish) status.textContent = offen ? "Noch " + offen + " von 24 Antworten offen." : "Alle 24 Antworten sind gewählt. Die Kontrolle ist noch nicht abgegeben.";
    else if (richtig === 24) status.textContent = "Bestanden. Alle 24 Antworten sind richtig. Die Kontrolle bleibt gesperrt, bis sie mit dem Passwort zurückgesetzt wird.";
    else status.textContent = richtig + " von 24 richtig. Die Kontrolle ist nicht bestanden und bleibt gesperrt. Ein neuer Versuch braucht das Passwort.";
  }
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    if (state.finish || beschaeftigt) return;
    var fehlend = FRAGEN.map(function (_, index) { return state.answers[index] ? null : index + 1; }).filter(Boolean);
    if (fehlend.length) {
      if (status) status.textContent = "Noch offen: Frage " + fehlend.join(", ") + ".";
      return;
    }
    state.finish = true;
    speichern();
    benachrichtigen();
    zeichnen();
    if (status) status.focus();
  });
  var resetKnopf = $("lernziel-reset");
  if (resetKnopf) resetKnopf.addEventListener("click", function () {
    if (resetHinweis) resetHinweis.textContent = "";
    if (passwort) passwort.value = "";
    if (typeof dialog.showModal === "function") dialog.showModal();
    if (passwort) passwort.focus();
  });
  var abbrechen = $("reset-abbrechen");
  if (abbrechen) abbrechen.addEventListener("click", function () { dialog.close(); });
  var resetForm = $("reset-form");
  if (resetForm) resetForm.addEventListener("submit", function (event) {
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
      state = { answers: {}, finish: false };
      try { global.localStorage.removeItem(key); } catch (e) { speichern(); }
      dialog.close();
      benachrichtigen();
      zeichnen();
      if (status) status.textContent = "Die Lernzielkontrolle ist zurückgesetzt. Die Einzeltests der Lektionen bleiben unverändert.";
    }).catch(function () {
      beschaeftigt = false;
      if (resetHinweis) resetHinweis.textContent = "Prüfung nicht möglich. Der Stand bleibt erhalten.";
    });
  });
  zeichnen();
  if (lesefehler && speicherhinweis) speicherhinweis.textContent = "Der gespeicherte Stand ließ sich nicht lesen. Die Kontrolle startet ohne diesen Stand.";
})(typeof window !== "undefined" ? window : globalThis);
