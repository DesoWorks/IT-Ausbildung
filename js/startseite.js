/* Baut die modulare Startseite aus MODULE_DATEN auf. */
(function () {
  "use strict";

  function erzeuge(tag, klasse, text) {
    var e = document.createElement(tag);
    if (klasse) e.className = klasse;
    if (text !== undefined) e.textContent = text;
    return e;
  }

  function baueModul(m) {
    var li = erzeuge("li", "modul");
    var verfuegbar = m.status === "verfuegbar" && m.datei;
    var inhalt;

    if (verfuegbar) {
      li.classList.add("modul-verfuegbar");
      inhalt = erzeuge("a", "modul-inhalt");
      inhalt.href = m.datei;
    } else {
      li.classList.add("modul-gesperrt");
      li.setAttribute("aria-disabled", "true");
      inhalt = erzeuge("div", "modul-inhalt");
    }

    if (m.lernfeld) inhalt.appendChild(erzeuge("span", "modul-lernfeld", m.lernfeld));
    inhalt.appendChild(erzeuge("span", "modul-titel", m.titel));
    if (m.beschreibung) inhalt.appendChild(erzeuge("span", "modul-beschreibung", m.beschreibung));
    if (m.unterthemen && m.unterthemen.length) {
      var unterliste = erzeuge("ul", "unterthemen");
      unterliste.setAttribute("aria-label", "Geplante Unterthemen: " + m.titel);
      m.unterthemen.forEach(function (u) {
        var uli = erzeuge("li", "unterthema unterthema-gesperrt");
        uli.setAttribute("aria-disabled", "true");
        uli.appendChild(erzeuge("span", "unterthema-titel", u.titel));
        uli.appendChild(erzeuge("span", "modul-status", "◷ In Kürze"));
        unterliste.appendChild(uli);
      });
      /* In der Karte statt darunter, damit die Zugehörigkeit klar ist. */
      inhalt.appendChild(unterliste);
    }
    inhalt.appendChild(erzeuge("span", "modul-status",
      verfuegbar ? "▸ Jetzt lernen" : "◷ In Kürze"));

    li.appendChild(inhalt);
    return li;
  }

  function init() {
    var ziel = document.getElementById("jahre");
    var daten = window.MODULE_DATEN || [];
    if (!ziel) return;
    ziel.textContent = "";

    daten.forEach(function (jahr) {
      var abschnitt = erzeuge("section", "jahr");
      var ueberschriftId = "jahr-" + jahr.jahr + "-titel";
      abschnitt.setAttribute("aria-labelledby", ueberschriftId);
      var h = erzeuge("h2", null, jahr.titel);
      h.id = ueberschriftId;
      abschnitt.appendChild(h);

      var liste = erzeuge("ul", "modul-liste");
      jahr.module.forEach(function (m) { liste.appendChild(baueModul(m)); });
      abschnitt.appendChild(liste);
      ziel.appendChild(abschnitt);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
