/* Lerneinheit "Den Computer kennenlernen"
   Reines JavaScript ohne Bibliotheken.
   Fortschritt wird lokal im Browser (localStorage) gespeichert. */

(function () {
  "use strict";

  var SPEICHER_SCHLUESSEL = "it-ausbildung.computer-grundlagen.v1";

  /* ---------- Inhalte: Lernkarten ---------- */
  var KARTEN = [
    {
      id: "computer",
      symbol: "🖥",
      titel: "Computer",
      kurz: "Das rechnende Herz des Arbeitsplatzes.",
      alltag: "Stell dir den Computer wie eine Küche vor: Dort werden die Zutaten (deine Eingaben) zu einem fertigen Gericht (dem Ergebnis) verarbeitet.",
      erklaerung: "Der Computer nimmt Daten entgegen, verarbeitet sie und gibt ein Ergebnis aus. Oft steht er als Kasten (Gehäuse) unter oder auf dem Tisch; in einem Laptop steckt alles in einem Gerät.",
      begriff: { wort: "Daten", text: "Alle Informationen, mit denen ein Computer arbeitet – zum Beispiel Texte, Zahlen oder Bilder." }
    },
    {
      id: "bildschirm",
      symbol: "🖵",
      titel: "Bildschirm",
      kurz: "Zeigt dir, was der Computer macht.",
      alltag: "Der Bildschirm ist wie ein Fenster: Durch ihn siehst du, was im Computer gerade passiert.",
      erklaerung: "Der Bildschirm (auch Monitor genannt) stellt Bilder, Texte und Fenster dar. Er ist ein Ausgabegerät: Er zeigt etwas an, aber du gibst über ihn normalerweise nichts ein. Ausnahme sind Touchscreens, die man zusätzlich berühren kann.",
      begriff: { wort: "Monitor", text: "Ein anderes Wort für Bildschirm." }
    },
    {
      id: "tastatur",
      symbol: "⌨",
      titel: "Tastatur",
      kurz: "Damit schreibst du Texte und Befehle.",
      alltag: "Die Tastatur ist wie ein Notizblock mit Stift: Du tippst, und deine Worte erscheinen auf dem Bildschirm.",
      erklaerung: "Mit der Tastatur gibst du Buchstaben, Zahlen und Befehle ein. Sie ist ein Eingabegerät. Die Reihe von Tasten oben (F1 bis F12) und Zusatztasten wie Strg oder Enter helfen beim Steuern des Computers.",
      begriff: { wort: "Eingabe", text: "Alles, was du dem Computer gibst – zum Beispiel getippter Text oder ein Mausklick." }
    },
    {
      id: "maus",
      symbol: "🖱",
      titel: "Maus / Touchpad",
      kurz: "Steuert den Zeiger auf dem Bildschirm.",
      alltag: "Die Maus ist wie dein verlängerter Zeigefinger: Du bewegst sie, und der Pfeil auf dem Bildschirm folgt dir.",
      erklaerung: "Mit Maus oder Touchpad bewegst du den Zeiger und klickst auf Dinge. Beide sind Eingabegeräte. Ein Touchpad ist die berührungsempfindliche Fläche an einem Laptop und ersetzt die Maus.",
      begriff: { wort: "Touchpad", text: "Die flache, berührungsempfindliche Fläche unter der Tastatur eines Laptops, mit der man den Zeiger bewegt." }
    },
    {
      id: "netzwerk",
      symbol: "🌐",
      titel: "Netzwerk",
      kurz: "Verbindet Computer miteinander.",
      alltag: "Ein Netzwerk ist wie ein Straßennetz: Auf ihm reisen Nachrichten von einem Computer zum anderen.",
      erklaerung: "Das Netzwerk verbindet mehrere Computer – über ein Kabel (LAN) oder Funk (WLAN). So können sie Daten austauschen und das Internet erreichen. Das Internet ist das größte Netzwerk der Welt.",
      begriff: { wort: "WLAN", text: "Eine drahtlose Netzwerkverbindung über Funk, ohne Kabel." }
    }
  ];

  /* ---------- Inhalte: Zuordnungsübung ---------- */
  var UEBUNG = [
    { id: "u-tastatur", symbol: "⌨", geraet: "Tastatur", loesung: "eingabe", erklaerung: "Richtig ist Eingabe: Mit der Tastatur gibst du Text und Befehle in den Computer." },
    { id: "u-bildschirm", symbol: "🖵", geraet: "Bildschirm", loesung: "ausgabe", erklaerung: "Richtig ist Ausgabe: Der Bildschirm zeigt dir, was der Computer darstellt." },
    { id: "u-computer", symbol: "🖥", geraet: "Computer (Gehäuse)", loesung: "verarbeitung", erklaerung: "Richtig ist Verarbeitung: Im Inneren des Computers werden die Daten berechnet." },
    { id: "u-maus", symbol: "🖱", geraet: "Maus", loesung: "eingabe", erklaerung: "Richtig ist Eingabe: Mit der Maus steuerst du den Zeiger und klickst – du gibst also etwas ein." },
    { id: "u-drucker", symbol: "🖨", geraet: "Drucker", loesung: "ausgabe", erklaerung: "Richtig ist Ausgabe: Der Drucker gibt Dokumente auf Papier aus." }
  ];
  var UEBUNG_OPTIONEN = [
    { wert: "eingabe", text: "Eingabe" },
    { wert: "ausgabe", text: "Ausgabe" },
    { wert: "verarbeitung", text: "Verarbeitung" }
  ];

  /* ---------- Inhalte: Quiz ---------- */
  var QUIZ = [
    {
      id: "q1",
      frage: "Welches Gerät dient dazu, Text in den Computer einzugeben?",
      antworten: [
        { text: "Der Bildschirm", richtig: false, erklaerung: "Der Bildschirm zeigt nur an; er ist ein Ausgabegerät." },
        { text: "Die Tastatur", richtig: true, erklaerung: "Genau: Mit der Tastatur tippst du Text und Befehle ein." },
        { text: "Der Drucker", richtig: false, erklaerung: "Der Drucker gibt etwas aus, er nimmt keine Eingaben entgegen." }
      ]
    },
    {
      id: "q2",
      frage: "Wo werden die Daten im Computer verarbeitet und berechnet?",
      antworten: [
        { text: "Im Computer selbst (im Gehäuse)", richtig: true, erklaerung: "Richtig: Das rechnende Innere des Computers verarbeitet die Daten." },
        { text: "Im Bildschirm", richtig: false, erklaerung: "Der Bildschirm zeigt nur Ergebnisse an, er rechnet nicht." },
        { text: "In der Maus", richtig: false, erklaerung: "Die Maus steuert nur den Zeiger; sie verarbeitet keine Daten." }
      ]
    },
    {
      id: "q3",
      frage: "Was ist ein WLAN?",
      antworten: [
        { text: "Ein Programm zum Schreiben von Texten", richtig: false, erklaerung: "Nein, das wäre eine Textverarbeitung. WLAN gehört zum Netzwerk." },
        { text: "Eine drahtlose Netzwerkverbindung über Funk", richtig: true, erklaerung: "Richtig: WLAN verbindet Geräte ohne Kabel per Funk." },
        { text: "Ein anderes Wort für Bildschirm", richtig: false, erklaerung: "Nein, das Wort für Bildschirm ist Monitor." }
      ]
    },
    {
      id: "q4",
      frage: "Welche Aussage über den Bildschirm stimmt?",
      antworten: [
        { text: "Er ist ein Ausgabegerät und zeigt Bilder und Texte an", richtig: true, erklaerung: "Richtig: Der Bildschirm gibt aus, was der Computer darstellt." },
        { text: "Er berechnet die Daten des Computers", richtig: false, erklaerung: "Nein, das Berechnen passiert im Computer selbst." },
        { text: "Mit ihm tippt man normalerweise Text", richtig: false, erklaerung: "Zum Tippen nutzt man die Tastatur." }
      ]
    },
    {
      id: "q5",
      frage: "Wozu dient ein Netzwerk?",
      antworten: [
        { text: "Es macht den Bildschirm heller", richtig: false, erklaerung: "Nein, die Helligkeit stellt man am Bildschirm selbst ein." },
        { text: "Es verbindet Computer miteinander und mit dem Internet", richtig: true, erklaerung: "Richtig: Über das Netzwerk tauschen Computer Daten aus." },
        { text: "Es ersetzt die Tastatur", richtig: false, erklaerung: "Nein, die Eingabe erfolgt weiter über die Tastatur." }
      ]
    }
  ];

  /* ---------- Zustand ---------- */
  var standard = {
    karten: {},        // id -> true wenn gelesen
    uebung: {},        // id -> gewählte option
    quiz: {},          // id -> gewählter antwort-index
    abschlussGesehen: false
  };
  var zustand = laden();

  function laden() {
    try {
      var roh = window.localStorage.getItem(SPEICHER_SCHLUESSEL);
      if (!roh) return JSON.parse(JSON.stringify(standard));
      var daten = JSON.parse(roh);
      return {
        karten: daten.karten || {},
        uebung: daten.uebung || {},
        quiz: daten.quiz || {},
        abschlussGesehen: !!daten.abschlussGesehen
      };
    } catch (e) {
      return JSON.parse(JSON.stringify(standard));
    }
  }

  function speichern() {
    try {
      window.localStorage.setItem(SPEICHER_SCHLUESSEL, JSON.stringify(zustand));
    } catch (e) {
      /* Speichern nicht möglich (z. B. privater Modus) – App funktioniert trotzdem. */
    }
  }

  /* ---------- Hilfsfunktionen ---------- */
  function el(id) { return document.getElementById(id); }

  function erzeuge(tag, attrs, text) {
    var k = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (a) {
        if (a === "class") k.className = attrs[a];
        else k.setAttribute(a, attrs[a]);
      });
    }
    if (text != null) k.textContent = text;
    return k;
  }

  /* ---------- Navigation zwischen Schritten ---------- */
  var SCHRITTE = ["start", "karten", "uebung", "quiz", "abschluss"];

  function zeigeSchritt(ziel) {
    SCHRITTE.forEach(function (id) {
      var abschnitt = el(id);
      if (abschnitt) abschnitt.hidden = (id !== ziel);
    });
    var knoepfe = document.querySelectorAll(".schritt-knopf");
    knoepfe.forEach(function (k) {
      if (k.dataset.ziel === ziel) k.setAttribute("aria-current", "true");
      else k.removeAttribute("aria-current");
    });
    if (ziel === "abschluss") {
      zustand.abschlussGesehen = true;
      speichern();
      aktualisiereAbschluss();
    }
    aktualisiereFortschritt();
    var haupt = el("hauptinhalt");
    if (haupt) haupt.focus();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  /* ---------- Lernkarten ---------- */
  var dialogHintergrund, dialogInhalt, zuletztFokus;

  function baueKarten() {
    var raster = el("karten-raster");
    raster.innerHTML = "";
    KARTEN.forEach(function (karte) {
      var knopf = erzeuge("button", { type: "button", class: "lernkarte", role: "listitem", "data-karte": karte.id });
      knopf.appendChild(erzeuge("span", { class: "karte-symbol", "aria-hidden": "true" }, karte.symbol));
      knopf.appendChild(erzeuge("p", { class: "karte-titel" }, karte.titel));
      knopf.appendChild(erzeuge("span", { class: "karte-kurz" }, karte.kurz));
      var status = erzeuge("span", { class: "karte-status" }, zustand.karten[karte.id] ? "Gelesen" : "Noch nicht gelesen");
      knopf.appendChild(status);
      if (zustand.karten[karte.id]) knopf.classList.add("gelesen");
      knopf.addEventListener("click", function () { oeffneKarte(karte); });
      raster.appendChild(knopf);
    });
  }

  function oeffneKarte(karte) {
    zuletztFokus = document.activeElement;
    dialogInhalt.innerHTML = "";
    var titel = erzeuge("h3", { id: "dialog-titel" });
    titel.appendChild(erzeuge("span", { class: "dialog-symbol", "aria-hidden": "true" }, karte.symbol));
    titel.appendChild(document.createTextNode(karte.titel));
    dialogInhalt.appendChild(titel);

    var dl = erzeuge("dl");
    dl.appendChild(erzeuge("dt", null, "Worum geht es?"));
    dl.appendChild(erzeuge("dd", null, karte.erklaerung));
    dl.appendChild(erzeuge("dt", null, "Beispiel aus dem Alltag"));
    dl.appendChild(erzeuge("dd", null, karte.alltag));
    dialogInhalt.appendChild(dl);

    if (karte.begriff) {
      var box = erzeuge("p", { class: "begriff" });
      box.appendChild(erzeuge("strong", null, "Fachbegriff " + karte.begriff.wort + ": "));
      box.appendChild(document.createTextNode(karte.begriff.text));
      dialogInhalt.appendChild(box);
    }

    var schliessen = erzeuge("button", { type: "button", class: "knopf knopf-haupt" }, "Verstanden, schließen");
    schliessen.addEventListener("click", schliesseDialog);
    var reihe = erzeuge("div", { class: "knopf-reihe" });
    reihe.appendChild(schliessen);
    dialogInhalt.appendChild(reihe);

    dialogHintergrund.hidden = false;
    schliessen.focus();

    // als gelesen markieren
    if (!zustand.karten[karte.id]) {
      zustand.karten[karte.id] = true;
      speichern();
      baueKarten();
      aktualisiereFortschritt();
    }
  }

  function schliesseDialog() {
    dialogHintergrund.hidden = true;
    if (zuletztFokus && zuletztFokus.focus) zuletztFokus.focus();
  }

  function baueDialog() {
    dialogHintergrund = erzeuge("div", { class: "dialog-hintergrund", hidden: "" });
    dialogInhalt = erzeuge("div", { class: "dialog", role: "dialog", "aria-modal": "true", "aria-labelledby": "dialog-titel" });
    dialogHintergrund.appendChild(dialogInhalt);
    dialogHintergrund.addEventListener("click", function (e) {
      if (e.target === dialogHintergrund) schliesseDialog();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !dialogHintergrund.hidden) schliesseDialog();
    });
    document.body.appendChild(dialogHintergrund);
  }

  /* ---------- Zuordnungsübung ---------- */
  function baueUebung() {
    var liste = el("uebung-liste");
    liste.innerHTML = "";
    UEBUNG.forEach(function (eintrag) {
      var zeile = erzeuge("div", { class: "uebung-zeile" });
      var kopf = erzeuge("div", { class: "uebung-geraet" });
      kopf.appendChild(erzeuge("span", { class: "symbol", "aria-hidden": "true" }, eintrag.symbol));
      kopf.appendChild(document.createTextNode(eintrag.geraet));
      zeile.appendChild(kopf);

      var optReihe = erzeuge("div", { class: "option-reihe", role: "group", "aria-label": "Aufgabe von " + eintrag.geraet });
      UEBUNG_OPTIONEN.forEach(function (opt) {
        var b = erzeuge("button", { type: "button", class: "option-knopf", "data-wert": opt.wert }, opt.text);
        b.addEventListener("click", function () { waehleUebung(eintrag, opt.wert, zeile); });
        optReihe.appendChild(b);
      });
      zeile.appendChild(optReihe);

      var erkl = erzeuge("p", { class: "zeile-erklaerung", hidden: "" });
      zeile.appendChild(erkl);

      // gespeicherten Zustand wiederherstellen
      if (zustand.uebung[eintrag.id]) {
        zeigeUebungErgebnis(eintrag, zustand.uebung[eintrag.id], zeile);
      }
      liste.appendChild(zeile);
    });
    aktualisiereUebungErgebnis();
  }

  function waehleUebung(eintrag, wert, zeile) {
    zustand.uebung[eintrag.id] = wert;
    speichern();
    zeigeUebungErgebnis(eintrag, wert, zeile);
    aktualisiereUebungErgebnis();
    aktualisiereFortschritt();
  }

  function zeigeUebungErgebnis(eintrag, wert, zeile) {
    var knoepfe = zeile.querySelectorAll(".option-knopf");
    knoepfe.forEach(function (b) {
      b.classList.remove("gewaehlt-richtig", "gewaehlt-falsch");
      if (b.dataset.wert === wert) {
        b.classList.add(wert === eintrag.loesung ? "gewaehlt-richtig" : "gewaehlt-falsch");
      }
    });
    var erkl = zeile.querySelector(".zeile-erklaerung");
    if (wert === eintrag.loesung) {
      erkl.textContent = eintrag.erklaerung;
    } else {
      erkl.textContent = "Noch nicht ganz. Tipp: " + eintrag.erklaerung;
    }
    erkl.hidden = false;
  }

  function aktualisiereUebungErgebnis() {
    var richtig = 0;
    UEBUNG.forEach(function (e) {
      if (zustand.uebung[e.id] === e.loesung) richtig++;
    });
    var beantwortet = Object.keys(zustand.uebung).length;
    var ergebnis = el("uebung-ergebnis");
    if (beantwortet === 0) {
      ergebnis.textContent = "";
    } else if (richtig === UEBUNG.length) {
      ergebnis.textContent = "Sehr gut – alle " + UEBUNG.length + " richtig zugeordnet!";
    } else {
      ergebnis.textContent = "Richtig zugeordnet: " + richtig + " von " + UEBUNG.length + ". Du kannst jede Zeile neu wählen.";
    }
  }

  /* ---------- Quiz ---------- */
  function baueQuiz() {
    var liste = el("quiz-liste");
    liste.innerHTML = "";
    QUIZ.forEach(function (frage, index) {
      var feld = erzeuge("fieldset", { class: "quiz-frage" });
      feld.appendChild(erzeuge("legend", null, (index + 1) + ". " + frage.frage));
      var optionen = erzeuge("div", { class: "quiz-optionen", role: "radiogroup", "aria-label": frage.frage });

      frage.antworten.forEach(function (antwort, ai) {
        var label = erzeuge("label", { class: "quiz-option" });
        var input = erzeuge("input", { type: "radio", name: frage.id, value: String(ai) });
        input.addEventListener("change", function () { waehleQuiz(frage, ai, feld); });
        label.appendChild(input);
        label.appendChild(erzeuge("span", { class: "option-text" }, antwort.text));
        label.appendChild(erzeuge("span", { class: "markierung", "aria-hidden": "true" }));
        optionen.appendChild(label);
      });
      feld.appendChild(optionen);

      var erkl = erzeuge("p", { class: "quiz-erklaerung", hidden: "", "aria-live": "polite" });
      feld.appendChild(erkl);

      liste.appendChild(feld);

      if (zustand.quiz[frage.id] != null) {
        var gespeichert = zustand.quiz[frage.id];
        var inputs = feld.querySelectorAll("input");
        if (inputs[gespeichert]) inputs[gespeichert].checked = true;
        zeigeQuizErgebnis(frage, gespeichert, feld);
      }
    });
    aktualisiereQuizErgebnis();
  }

  function waehleQuiz(frage, index, feld) {
    zustand.quiz[frage.id] = index;
    speichern();
    zeigeQuizErgebnis(frage, index, feld);
    aktualisiereQuizErgebnis();
    aktualisiereFortschritt();
  }

  function zeigeQuizErgebnis(frage, index, feld) {
    var labels = feld.querySelectorAll(".quiz-option");
    labels.forEach(function (l) { l.classList.remove("richtig", "falsch"); });
    var gewaehlt = labels[index];
    var antwort = frage.antworten[index];
    if (!gewaehlt || !antwort) return;
    gewaehlt.classList.add(antwort.richtig ? "richtig" : "falsch");
    var erkl = feld.querySelector(".quiz-erklaerung");
    if (antwort.richtig) {
      erkl.textContent = antwort.erklaerung;
    } else {
      erkl.textContent = "Das stimmt noch nicht. " + antwort.erklaerung + " Versuche es gern erneut.";
    }
    erkl.hidden = false;
  }

  function aktualisiereQuizErgebnis() {
    var richtig = 0;
    QUIZ.forEach(function (f) {
      var idx = zustand.quiz[f.id];
      if (idx != null && f.antworten[idx] && f.antworten[idx].richtig) richtig++;
    });
    var beantwortet = Object.keys(zustand.quiz).length;
    var ergebnis = el("quiz-ergebnis");
    if (beantwortet === 0) {
      ergebnis.textContent = "";
    } else if (richtig === QUIZ.length) {
      ergebnis.textContent = "Perfekt – alle " + QUIZ.length + " Fragen richtig beantwortet!";
    } else {
      ergebnis.textContent = "Richtig: " + richtig + " von " + QUIZ.length + ". Kein Zeitdruck – du kannst Fragen neu beantworten.";
    }
  }

  /* ---------- Fortschritt ---------- */
  function fortschrittProzent() {
    var gesamt = KARTEN.length + UEBUNG.length + QUIZ.length + 1; // +1 Abschluss
    var erledigt = 0;
    KARTEN.forEach(function (k) { if (zustand.karten[k.id]) erledigt++; });
    UEBUNG.forEach(function (e) { if (zustand.uebung[e.id] === e.loesung) erledigt++; });
    QUIZ.forEach(function (f) {
      var idx = zustand.quiz[f.id];
      if (idx != null && f.antworten[idx] && f.antworten[idx].richtig) erledigt++;
    });
    if (zustand.abschlussGesehen) erledigt++;
    return Math.round((erledigt / gesamt) * 100);
  }

  function aktualisiereFortschritt() {
    var prozent = fortschrittProzent();
    el("fortschritt-balken").style.width = prozent + "%";
    el("fortschritt-text").textContent = "Fortschritt: " + prozent + " %";

    // Schritt-Knöpfe markieren
    document.querySelectorAll(".schritt-knopf").forEach(function (k) {
      var ziel = k.dataset.ziel;
      var fertig = false;
      if (ziel === "karten") fertig = KARTEN.every(function (c) { return zustand.karten[c.id]; });
      else if (ziel === "uebung") fertig = UEBUNG.every(function (e) { return zustand.uebung[e.id] === e.loesung; });
      else if (ziel === "quiz") fertig = QUIZ.every(function (f) {
        var idx = zustand.quiz[f.id];
        return idx != null && f.antworten[idx] && f.antworten[idx].richtig;
      });
      else if (ziel === "abschluss") fertig = zustand.abschlussGesehen;
      else if (ziel === "start") fertig = true;
      k.classList.toggle("erledigt", fertig);
    });
  }

  function aktualisiereAbschluss() {
    var status = el("abschluss-status");
    var prozent = fortschrittProzent();
    if (prozent >= 100) {
      status.textContent = "Du hast alles bearbeitet – stark! Dein Fortschritt bleibt gespeichert.";
    } else {
      status.textContent = "Dein Fortschritt (" + prozent + " %) ist gespeichert. Du kannst jederzeit zurückgehen und weitermachen.";
    }
  }

  /* ---------- Zurücksetzen ---------- */
  function setzeAllesZurueck() {
    zustand = JSON.parse(JSON.stringify(standard));
    try { window.localStorage.removeItem(SPEICHER_SCHLUESSEL); } catch (e) {}
    baueKarten();
    baueUebung();
    baueQuiz();
    aktualisiereFortschritt();
    aktualisiereAbschluss();
    zeigeSchritt("start");
    if (window.LERNFORTSCHRITT) window.LERNFORTSCHRITT.benachrichtigen();
  }

  /* ---------- Verdrahtung ---------- */
  function init() {
    baueDialog();
    baueKarten();
    baueUebung();
    baueQuiz();

    // Schritt-Navigation
    document.querySelectorAll(".schritt-knopf").forEach(function (k) {
      k.addEventListener("click", function () { zeigeSchritt(k.dataset.ziel); });
    });
    // Weiter/Zurück-Knöpfe
    document.querySelectorAll("[data-weiter]").forEach(function (b) {
      b.addEventListener("click", function () { zeigeSchritt(b.dataset.weiter); });
    });

    el("uebung-reset").addEventListener("click", function () {
      zustand.uebung = {};
      speichern();
      baueUebung();
      aktualisiereFortschritt();
    });
    el("quiz-reset").addEventListener("click", function () {
      zustand.quiz = {};
      speichern();
      baueQuiz();
      aktualisiereFortschritt();
    });
    el("reset-alles").addEventListener("click", function () {
      var sicher = window.confirm("Möchtest du deinen gesamten Fortschritt wirklich zurücksetzen?");
      if (sicher) setzeAllesZurueck();
    });

    aktualisiereFortschritt();
    zeigeSchritt("start");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
