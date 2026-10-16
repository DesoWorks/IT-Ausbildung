/* Passwortschutz nur für den Knopf „Fortschritt zurücksetzen“ der Lernzielkontrolle.
 * Der Wortlaut liegt beim Commander. Hier steht nur der SHA-256-Hash.
 * Groß- und Kleinschreibung zählt. Kein Trim. Einzeltests bleiben frei. */
(function (global) {
  "use strict";
  var HASH = "15fb2a9581621437953d399ad3e4eb44e51c9df2d10c19b9754dba7d432fcd84";

  async function passt(wort) {
    if (!global.crypto || !global.crypto.subtle || typeof wort !== "string" || wort.length === 0) {
      return false;
    }
    var digest = await global.crypto.subtle.digest("SHA-256", new TextEncoder().encode(wort));
    var hex = Array.from(new Uint8Array(digest)).map(function (byte) {
      return byte.toString(16).padStart(2, "0");
    }).join("");
    return hex === HASH;
  }

  function dialog() {
    var feld = document.getElementById("lernziel-reset-dialog");
    if (feld) return feld;
    feld = document.createElement("dialog");
    feld.id = "lernziel-reset-dialog";
    feld.innerHTML = '<form><p><label for="lernziel-reset-wort">Passwort der Lernzielkontrolle</label><br><input id="lernziel-reset-wort" type="password" autocomplete="off" spellcheck="false"></p><p id="lernziel-reset-hinweis" role="status"></p><div class="knopf-reihe"><button class="knopf knopf-warn" id="lernziel-reset-ja" type="button">Bestätigen</button><button class="knopf" id="lernziel-reset-nein" type="button">Abbrechen</button></div></form>';
    document.body.appendChild(feld);
    feld.querySelector("#lernziel-reset-nein").addEventListener("click", function () {
      feld.close();
    });
    feld.querySelector("form").addEventListener("submit", function (event) {
      event.preventDefault();
    });
    feld.querySelector("#lernziel-reset-ja").addEventListener("click", function () {
      var ziel = feld._ziel;
      var wort = feld.querySelector("#lernziel-reset-wort").value;
      var hinweis = feld.querySelector("#lernziel-reset-hinweis");
      feld.querySelector("#lernziel-reset-wort").value = "";
      passt(wort).then(function (ok) {
        if (!ok || !ziel) {
          hinweis.textContent = wort.length === 0
            ? "Kein Passwort eingegeben. Der Stand bleibt erhalten."
            : "Passwort nicht richtig. Der Stand bleibt erhalten.";
          feld.querySelector("#lernziel-reset-wort").focus();
          return;
        }
        feld.close();
        ziel.dataset.lernzielErlaubt = "1";
        ziel.click();
      }).catch(function () {
        hinweis.textContent = "Prüfung nicht möglich. Der Stand bleibt erhalten.";
      });
    });
    return feld;
  }

  function oeffne(button) {
    var feld = dialog();
    feld._ziel = button;
    feld.querySelector("#lernziel-reset-hinweis").textContent = "";
    feld.querySelector("#lernziel-reset-wort").value = "";
    feld.showModal();
    feld.querySelector("#lernziel-reset-wort").focus();
  }

  function schuetze(button) {
    if (!button || button.dataset.lernzielGeschuetzt === "1") return;
    button.dataset.lernzielGeschuetzt = "1";
    button.addEventListener("click", function (event) {
      if (button.dataset.lernzielErlaubt === "1") {
        delete button.dataset.lernzielErlaubt;
        return;
      }
      event.preventDefault();
      event.stopImmediatePropagation();
      oeffne(button);
    }, true);
  }

  function starte() {
    document.querySelectorAll("#reset-all").forEach(schuetze);
  }

  var api = { HASH: HASH, passt: passt, schuetze: schuetze };
  global.LERNZIEL_RESET = api;
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  if (!global.document) return;
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", starte);
  else starte();
})(typeof window !== "undefined" ? window : globalThis);
