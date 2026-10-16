/* Netzwerkgrundlagen – Lektion 1: IPv4-Adresse und vier Oktette.
 * Reines JavaScript ohne Bibliotheken. Die Prüflogik (pruefeIPv4, FRAGEN,
 * berechneFortschritt) ist von der Darstellung getrennt und per Node testbar.
 * Fortschritt wird, wenn der Browser es erlaubt, lokal gespeichert. */
(function (global) {
  "use strict";

  var SPEICHER_SCHLUESSEL = "it-ausbildung.netzwerkgrundlagen.v1";
  var SCHRITTE = ["erklaerung", "schaubild", "uebung", "abschluss"];
  /* Begriffe aus dem zentralen Glossar (js/glossar-daten.js), die in der Lektion
     direkt aufklappbar erscheinen. Das volle Glossar bleibt separat. */
  var FACHWOERTER = ["IPv4", "IP-Adresse", "Oktett", "Bit"];
  var BEISPIEL_ADRESSE = "192.168.1.20";

  var FRAGEN = [
    {
      id: "anzahl",
      frage: "Aus wie vielen Oktetten besteht eine IPv4-Adresse?",
      antworten: [
        { text: "Aus zwei Oktetten", richtig: false, erklaerung: "Zwei sind zu wenig. Eine IPv4-Adresse hat vier Zahlenblöcke." },
        { text: "Aus vier Oktetten", richtig: true, erklaerung: "Richtig: vier Oktette, durch drei Punkte getrennt, zum Beispiel 192.168.1.20." },
        { text: "Aus acht Oktetten", richtig: false, erklaerung: "Acht ist die Anzahl der Bits in einem Oktett, nicht die Anzahl der Oktette." }
      ]
    },
    {
      id: "wertebereich",
      frage: "Welcher Wert kann in einem Oktett nicht vorkommen?",
      antworten: [
        { text: "0", richtig: false, erklaerung: "Die 0 ist erlaubt. Sie ist der kleinste mögliche Wert eines Oktetts." },
        { text: "255", richtig: false, erklaerung: "Die 255 ist erlaubt. Sie ist der größte mögliche Wert eines Oktetts." },
        { text: "256", richtig: true, erklaerung: "Richtig: 8 Bit ergeben 256 Möglichkeiten, also die Werte 0 bis 255. Die 256 passt nicht mehr hinein." }
      ]
    },
    {
      id: "gueltig",
      frage: "Welche Angabe ist eine gültige IPv4-Adresse?",
      antworten: [
        { text: "10.20.30.40", richtig: true, erklaerung: "Richtig: vier Oktette, jedes zwischen 0 und 255." },
        { text: "10.20.30", richtig: false, erklaerung: "Hier fehlt ein Oktett. Es sind nur drei Zahlenblöcke." },
        { text: "10.20.30.400", richtig: false, erklaerung: "Das vierte Oktett ist 400. Mehr als 255 passt nicht in 8 Bit." }
      ]
    }
  ];

  /* ---------- Prüflogik (ohne DOM) ---------- */
  function zuBinaer8(zahl) {
    return ("00000000" + Number(zahl).toString(2)).slice(-8);
  }

  function pruefeIPv4(eingabe) {
    var text = String(eingabe == null ? "" : eingabe).trim();
    if (text === "") {
      return { gueltig: false, code: "leer", hinweis: "Du hast noch nichts eingegeben. Schreibe vier Zahlen, durch Punkte getrennt." };
    }
    var teile = text.split(".");
    if (teile.length !== 4) {
      return { gueltig: false, code: "anzahl",
        hinweis: "Eine IPv4-Adresse hat genau vier Oktette, getrennt durch drei Punkte. Du hast " +
          teile.length + (teile.length === 1 ? " Teil" : " Teile") + " geschrieben." };
    }
    var oktette = [];
    for (var i = 0; i < 4; i++) {
      var t = teile[i];
      var nr = i + 1;
      if (t === "") {
        return { gueltig: false, code: "leeres-oktett", hinweis: "Oktett " + nr + " ist leer. Zwischen zwei Punkten muss eine Zahl stehen." };
      }
      if (!/^[0-9]+$/.test(t)) {
        return { gueltig: false, code: "zeichen", hinweis: "Oktett " + nr + " (\u201e" + t + "\u201c) enthält etwas anderes als Ziffern. Erlaubt sind nur die Ziffern 0 bis 9." };
      }
      if (t.length > 1 && t.charAt(0) === "0") {
        return { gueltig: false, code: "fuehrende-null", hinweis: "Oktett " + nr + " beginnt mit einer 0 (\u201e" + t + "\u201c). In dieser Übung schreiben wir Zahlen ohne führende Null, zum Beispiel 7 statt 007." };
      }
      if (Number(t) > 255) {
        return { gueltig: false, code: "zu-gross", hinweis: "Oktett " + nr + " ist " + t + ". Ein Oktett besteht aus 8 Bit und kann nur Werte von 0 bis 255 haben." };
      }
      oktette.push(Number(t));
    }
    return { gueltig: true, code: "ok", oktette: oktette,
      hinweis: "Das ist eine gültige IPv4-Adresse: vier Oktette, jedes zwischen 0 und 255." };
  }

  function frageRichtig(frage, index) {
    return index != null && !!frage.antworten[index] && frage.antworten[index].richtig === true;
  }

  function berechneFortschritt(zustand) {
    var gesamt = FRAGEN.length + 2; /* Fragen + eigene Adresse + Abschluss */
    var erledigt = 0;
    FRAGEN.forEach(function (f) { if (frageRichtig(f, zustand.antworten[f.id])) erledigt++; });
    if (zustand.eigeneGueltig) erledigt++;
    if (zustand.abschlussGesehen) erledigt++;
    return Math.round((erledigt / gesamt) * 100);
  }

  var API = {
    pruefeIPv4: pruefeIPv4,
    zuBinaer8: zuBinaer8,
    berechneFortschritt: berechneFortschritt,
    FRAGEN: FRAGEN,
    FACHWOERTER: FACHWOERTER,
    SCHRITTE: SCHRITTE,
    SPEICHER_SCHLUESSEL: SPEICHER_SCHLUESSEL
  };
  global.NETZ_L1 = API;
  if (typeof module !== "undefined" && module.exports) module.exports = API;

  /* ---------- Darstellung (nur im Browser) ---------- */
  if (typeof global.document === "undefined") return;
  var document = global.document;

  function kopieStandard() { return { antworten: {}, eigeneGueltig: false, abschlussGesehen: false }; }
  var zustand = laden();

  function laden() {
    try {
      var roh = global.localStorage.getItem(SPEICHER_SCHLUESSEL);
      if (!roh) return kopieStandard();
      var d = JSON.parse(roh);
      return {
        antworten: d.antworten && typeof d.antworten === "object" ? d.antworten : {},
        eigeneGueltig: !!d.eigeneGueltig,
        abschlussGesehen: !!d.abschlussGesehen
      };
    } catch (e) { return kopieStandard(); }
  }
  function speichern() {
    try { global.localStorage.setItem(SPEICHER_SCHLUESSEL, JSON.stringify(zustand)); }
    catch (e) { /* Speichern nicht möglich – die Lektion bleibt nutzbar. */ }
  }

  function el(id) { return document.getElementById(id); }
  function erzeuge(tag, attrs, text) {
    var k = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (a) {
      if (a === "class") k.className = attrs[a]; else k.setAttribute(a, attrs[a]);
    });
    if (text != null) k.textContent = text;
    return k;
  }

  function zeigeSchritt(ziel) {
    SCHRITTE.forEach(function (id) { var s = el(id); if (s) s.hidden = (id !== ziel); });
    document.querySelectorAll(".schritt-knopf").forEach(function (k) {
      if (k.dataset.ziel === ziel) k.setAttribute("aria-current", "true"); else k.removeAttribute("aria-current");
    });
    if (ziel === "abschluss") { zustand.abschlussGesehen = true; speichern(); aktualisiereAbschluss(); }
    aktualisiereFortschritt();
    var haupt = el("hauptinhalt");
    if (haupt) haupt.focus();
    if (global.scrollTo) global.scrollTo(0, 0);
  }

  /* Fachwörter aus dem zentralen Glossar, dauerhaft aufklappbar. */
  function baueFachwoerter() {
    var ziel = el("fachwoerter-liste");
    if (!ziel) return;
    ziel.textContent = "";
    var glossar = global.GLOSSAR || [];
    FACHWOERTER.forEach(function (wort) {
      var eintrag = glossar.filter(function (g) { return g.begriff === wort; })[0];
      if (!eintrag) return;
      var d = erzeuge("details", { class: "fachwort-hinweis" });
      d.appendChild(erzeuge("summary", null, eintrag.begriff));
      d.appendChild(erzeuge("p", null, eintrag.erklaerung));
      ziel.appendChild(d);
    });
  }

  function baueFragen() {
    var liste = el("netz-fragen");
    liste.textContent = "";
    FRAGEN.forEach(function (frage, index) {
      var feld = erzeuge("fieldset", { class: "quiz-frage" });
      feld.appendChild(erzeuge("legend", null, (index + 1) + ". " + frage.frage));
      var optionen = erzeuge("div", { class: "quiz-optionen" });
      frage.antworten.forEach(function (antwort, ai) {
        var label = erzeuge("label", { class: "quiz-option" });
        var input = erzeuge("input", { type: "radio", name: "netz-" + frage.id, value: String(ai) });
        input.addEventListener("change", function () { waehleAntwort(frage, ai, feld); });
        label.appendChild(input);
        label.appendChild(erzeuge("span", { class: "option-text" }, antwort.text));
        label.appendChild(erzeuge("span", { class: "markierung", "aria-hidden": "true" }));
        optionen.appendChild(label);
      });
      feld.appendChild(optionen);
      feld.appendChild(erzeuge("p", { class: "quiz-erklaerung", hidden: "", "aria-live": "polite" }));
      liste.appendChild(feld);

      var gespeichert = zustand.antworten[frage.id];
      if (gespeichert != null) {
        var inputs = feld.querySelectorAll("input");
        if (inputs[gespeichert]) inputs[gespeichert].checked = true;
        zeigeAntwort(frage, gespeichert, feld);
      }
    });
    aktualisiereUebungErgebnis();
  }

  function waehleAntwort(frage, index, feld) {
    zustand.antworten[frage.id] = index;
    speichern();
    zeigeAntwort(frage, index, feld);
    var summary = el("netz-ergebnis"); summary.textContent = "";
    aktualisiereUebungErgebnis();
    aktualisiereFortschritt();
  }

  function zeigeAntwort(frage, index, feld) {
    var labels = feld.querySelectorAll(".quiz-option");
    labels.forEach(function (l) { l.classList.remove("richtig", "falsch"); });
    var antwort = frage.antworten[index];
    if (!labels[index] || !antwort) return;
    labels[index].classList.add(antwort.richtig ? "richtig" : "falsch");
    var erkl = feld.querySelector(".quiz-erklaerung");
    erkl.textContent = antwort.richtig
      ? antwort.erklaerung
      : "Das stimmt noch nicht. " + antwort.erklaerung + " Du kannst jederzeit eine andere Antwort wählen.";
    erkl.hidden = false;
  }

  function aktualisiereUebungErgebnis() {
    var richtig = 0;
    FRAGEN.forEach(function (f) { if (frageRichtig(f, zustand.antworten[f.id])) richtig++; });
    var ziel = el("netz-ergebnis");
    var bewertet = FRAGEN.some(function (f) { return zustand.antworten[f.id] != null; });
    if (!bewertet) { ziel.textContent = ""; return; }
    ziel.textContent = "";
    var titel = erzeuge("strong", { class: "feedback-titel" }, richtig === FRAGEN.length ? "✓ Alle Fragen richtig" : richtig ? "◐ Teilweise richtig" : "✗ Noch nicht richtig");
    ziel.appendChild(titel);
    var liste = erzeuge("ul");
    FRAGEN.forEach(function (f) {
      var idx = zustand.antworten[f.id], a = idx != null ? f.antworten[idx] : null;
      var li = erzeuge("li", a && a.richtig ? "feedback-richtig" : "feedback-falsch");
      li.textContent = !a ? f.frage + " — Unbeantwortet." : (a.richtig ? "✓ Richtig: " : "✗ Nicht richtig: ") + f.frage + " " + a.erklaerung;
      liste.appendChild(li);
    });

    ziel.appendChild(liste);
    ziel.className = "rueckmeldung feedback-box";
  }

  function zeigeEigeneAdresse(ergebnis) {
    var ziel = el("eigene-ergebnis");
    var zerlegung = el("eigene-zerlegung");
    ziel.textContent = ergebnis.hinweis;
    ziel.className = "rueckmeldung " + (ergebnis.gueltig ? "netz-ok" : "netz-fehler");
    zerlegung.textContent = "";
    if (ergebnis.gueltig) {
      ergebnis.oktette.forEach(function (zahl, i) {
        zerlegung.appendChild(erzeuge("li", null,
          "Oktett " + (i + 1) + ": " + zahl + " (als 8 Bit geschrieben: " + zuBinaer8(zahl) + ")"));
      });
    }
  }

  function pruefeEigene(ereignis) {
    if (ereignis && ereignis.preventDefault) ereignis.preventDefault();
    var ergebnis = pruefeIPv4(el("eigene-eingabe").value);
    zeigeEigeneAdresse(ergebnis);
    if (!ergebnis.gueltig) zustand.eigeneGueltig = false;
    if (ergebnis.gueltig && !zustand.eigeneGueltig) {
      zustand.eigeneGueltig = true;
      speichern();
    }
    aktualisiereFortschritt();
  }

  function invalidiereEigeneAdresse() {
    el("eigene-ergebnis").textContent = "";
    el("eigene-zerlegung").textContent = "";
    if (zustand.eigeneGueltig) { zustand.eigeneGueltig = false; speichern(); aktualisiereFortschritt(); }
  }

  function aktualisiereFortschritt() {
    var prozent = berechneFortschritt(zustand);
    el("fortschritt-balken").style.width = prozent + "%";
    el("fortschritt-text").textContent = "Fortschritt: " + prozent + " %";
    document.querySelectorAll(".schritt-knopf").forEach(function (k) {
      var z = k.dataset.ziel;
      var fertig = false;
      if (z === "erklaerung") fertig = true;
      else if (z === "schaubild") fertig = true;
      else if (z === "uebung") fertig = zustand.eigeneGueltig && FRAGEN.every(function (f) { return frageRichtig(f, zustand.antworten[f.id]); });
      else if (z === "abschluss") fertig = zustand.abschlussGesehen;
      k.classList.toggle("erledigt", fertig);
    });
  }

  function aktualisiereAbschluss() {
    var prozent = berechneFortschritt(zustand);
    el("abschluss-status").textContent = prozent >= 100
      ? "Du hast alles bearbeitet. Dein Fortschritt bleibt, wenn der Browser es erlaubt, auf diesem Gerät gespeichert."
      : "Dein Fortschritt (" + prozent + " %) ist gespeichert. Du kannst jederzeit zur Übung zurückgehen und weitermachen.";
  }

  function setzeUebungZurueck() {
    zustand.antworten = {};
    zustand.eigeneGueltig = false;
    speichern();
    baueFragen();
    el("eigene-eingabe").value = "";
    el("eigene-ergebnis").textContent = "";
    el("eigene-ergebnis").className = "rueckmeldung";
    el("eigene-zerlegung").textContent = "";
    aktualisiereFortschritt();
  }

  function setzeAllesZurueck() {
    zustand = kopieStandard();
    try { global.localStorage.removeItem(SPEICHER_SCHLUESSEL); } catch (e) { /* ignorieren */ }
    setzeUebungZurueck();
    aktualisiereAbschluss();
    zeigeSchritt("erklaerung");
    if (global.LERNFORTSCHRITT) global.LERNFORTSCHRITT.benachrichtigen();
  }

  function init() {
    baueFachwoerter();
    baueFragen();
    document.querySelectorAll(".schritt-knopf").forEach(function (k) {
      k.addEventListener("click", function () { zeigeSchritt(k.dataset.ziel); });
    });
    document.querySelectorAll("[data-weiter]").forEach(function (b) {
      b.addEventListener("click", function () { zeigeSchritt(b.dataset.weiter); });
    });
    el("eigene-form").addEventListener("submit", pruefeEigene);
    el("eigene-eingabe").addEventListener("input", invalidiereEigeneAdresse);
    el("eigene-beispiel").addEventListener("click", function () {
      el("eigene-eingabe").value = BEISPIEL_ADRESSE;
      el("eigene-eingabe").focus();
    });
    el("uebung-reset").addEventListener("click", setzeUebungZurueck);
    el("reset-alles").addEventListener("click", function () {
      if (global.confirm("Möchtest du deinen Fortschritt in dieser Lektion wirklich zurücksetzen?")) setzeAllesZurueck();
    });
    aktualisiereFortschritt();
    zeigeSchritt("erklaerung");
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})(typeof window !== "undefined" ? window : globalThis);
