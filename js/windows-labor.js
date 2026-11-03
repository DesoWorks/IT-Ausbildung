/* Reines Lernlabor: keine Befehlsausführung, keine System- oder Netzwerkzugriffe. */
(function () {
  "use strict";
  var root = typeof globalThis !== "undefined" ? globalThis : this;
  function text(s) { return typeof s === "string" && s.trim().length > 0; }
  function validiere(d) {
    var fehler = [];
    if (!d || !Array.isArray(d.befehle) || !Array.isArray(d.kategorien)) return { ok: false, fehler: ["Labordaten fehlen."] };
    var ids = {};
    d.befehle.forEach(function (b) {
      if (!b || !text(b.id) || ids[b.id]) { fehler.push("Ungültige oder doppelte Befehls-ID."); return; }
      ids[b.id] = true;
      ["name", "zweck", "rechte", "aenderung", "sicherheit"].forEach(function (k) { if (!text(b[k])) fehler.push(b.id + ": " + k); });
      if (["cmd", "powershell"].indexOf(b.shell) < 0 || !d.kategorien.some(function (k) { return k.id === b.kategorie; })) fehler.push(b.id + ": Kategorie/Umgebung");
      if (["lesend", "netzwerk", "aendernd"].indexOf(b.risiko) < 0) fehler.push(b.id + ": Risiko");
      [["syntax", "aufruf", "erklaerung"], ["deutung", "teil", "erklaerung"], ["fehler", "meldung", "ursache"]].forEach(function (f) {
        if (!Array.isArray(b[f[0]]) || !b[f[0]].length || !b[f[0]].every(function (x) { return x && text(x[f[1]]) && text(x[f[2]]); })) fehler.push(b.id + ": " + f[0]);
      });
      if (!b.praxis || !text(b.praxis.befehl) || !text(b.praxis.situation) || !Array.isArray(b.ausgabe) || !b.ausgabe.some(text)) fehler.push(b.id + ": Praxis/Ausgabe");
      if (!Array.isArray(b.quellen) || !b.quellen.length || !b.quellen.every(function (q) { return q && text(q.titel) && /^https:\/\/(?:learn\.microsoft\.com|man\.openbsd\.org)\//.test(q.url); })) fehler.push(b.id + ": Quellen");
      var u = b.uebung;
      if (!u || !text(u.frage) || !text(u.erklaerung) || !Array.isArray(u.optionen) || u.optionen.length < 2 || !u.optionen.every(function (o) { return o && text(o.id) && text(o.text); }) || !u.optionen.some(function (o) { return o.id === u.loesungId; })) fehler.push(b.id + ": Übung");
    });
    return { ok: !fehler.length, fehler: fehler };
  }
  function filter(d, suche, shell, kategorie) {
    var s = String(suche || "").trim().toLocaleLowerCase("de");
    return d.befehle.filter(function (b) {
      return (!shell || b.shell === shell) && (!kategorie || b.kategorie === kategorie) && (!s || [b.name, b.zweck].concat(b.stichworte || []).join(" ").toLocaleLowerCase("de").indexOf(s) >= 0);
    });
  }
  function bewerte(b, id) {
    if (!b.uebung.optionen.some(function (o) { return o.id === id; })) return { gueltig: false, richtig: false, text: "Bitte wähle eine Antwort." };
    return { gueltig: true, richtig: id === b.uebung.loesungId, text: b.uebung.erklaerung };
  }
  var api = { validiere: validiere, filter: filter, bewerte: bewerte };
  root.WINDOWS_LABOR = api;
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  function init() {
    var d = root.WINDOWS_LABOR_DATEN, box = document.getElementById("ww-labor-detail");
    if (!box) return;
    if (!validiere(d).ok) { box.textContent = "Die Labordaten konnten nicht geladen werden. Bitte den vollständigen Projektordner öffnen."; return; }
    var suche = document.getElementById("ww-labor-suche"), shell = document.getElementById("ww-labor-shell"), kat = document.getElementById("ww-labor-kategorie"), auswahl = document.getElementById("ww-labor-auswahl"), status = document.getElementById("ww-labor-status");
    function el(tag, t, parent) { var e = document.createElement(tag); if (t !== undefined) e.textContent = t; if (parent) parent.appendChild(e); return e; }
    function leer(e) { while (e.firstChild) e.removeChild(e.firstChild); }
    function abschnitt(titel, inhalt) { el("h4", titel, box); el("p", inhalt, box); }
    function liste(titel, werte, links, rechts) {
      el("h4", titel, box); var dl = el("dl", undefined, box);
      werte.forEach(function (x) { el("dt", x[links], dl); el("dd", x[rechts], dl); });
    }
    document.getElementById("ww-labor-version").textContent = d.versionshinweis;
    d.kategorien.forEach(function (k) { var o = el("option", k.titel, kat); o.value = k.id; });
    function render() {
      leer(box);
      var b = d.befehle.find(function (x) { return x.id === auswahl.value; });
      if (!b) { el("p", "Keine passenden Befehle. Suche kürzen oder Filter zurücksetzen.", box); return; }
      el("h3", b.name, box);
      el("p", (b.shell === "cmd" ? "CMD" : "PowerShell") + " · " + d.risikoTexte[b.risiko], box).className = "hinweis-box";
      abschnitt("Zweck und Einsatz", b.zweck);
      liste("Syntax und Parameter", b.syntax, "aufruf", "erklaerung");
      abschnitt("Praxisfall", b.praxis.situation);
      el("code", b.praxis.befehl, el("p", undefined, box));
      el("h4", "Simulierte Beispielausgabe (gekürzt)", box);
      el("p", d.simulationshinweis, box);
      var pre = el("pre", b.ausgabe.join("\n"), box); pre.tabIndex = 0; pre.setAttribute("role", "region"); pre.setAttribute("aria-label", "Simulierte Ausgabe für " + b.name + ", bei Bedarf horizontal scrollen");
      liste("Wichtige Ausgabezeilen verstehen", b.deutung, "teil", "erklaerung");
      liste("Häufige Fehler und Ursachen", b.fehler, "meldung", "ursache");
      abschnitt("Benötigte Rechte", b.rechte); abschnitt("Mögliche Änderungen", b.aenderung); abschnitt("Sicherheit und Grenzen", b.sicherheit);
      var form = el("form", undefined, box), feld = el("fieldset", undefined, form);
      el("legend", "Miniübung: " + b.uebung.frage, feld);
      b.uebung.optionen.forEach(function (o) {
        var label = el("label", undefined, feld); label.className = "ww-option";
        var radio = el("input", undefined, label); radio.type = "radio"; radio.name = "laborantwort"; radio.value = o.id;
        el("span", o.text, label);
      });
      var submit = el("button", "Antwort prüfen", form); submit.type = "submit"; submit.className = "knopf";
      var feedback = el("p", "", form); feedback.setAttribute("role", "status"); feedback.setAttribute("aria-live", "polite"); feedback.id = "ww-labor-feedback";
      form.addEventListener("submit", function (e) {
        e.preventDefault(); var r = form.querySelector("input:checked"), w = bewerte(b, r ? r.value : "");
        feedback.textContent = (w.gueltig ? (w.richtig ? "Richtig. " : "Noch nicht. ") : "") + w.text;
      });
      el("h4", "Offizielle Quellen zum Nachlesen", box);
      var ul = el("ul", undefined, box);
      b.quellen.forEach(function (q) { var a = el("a", q.titel, el("li", undefined, ul)); a.href = q.url; a.rel = "noopener noreferrer"; });
    }
    function aktualisiere() {
      var vorher = auswahl.value, treffer = filter(d, suche.value, shell.value, kat.value);
      leer(auswahl);
      treffer.forEach(function (b) { var o = el("option", b.name + " (" + (b.shell === "cmd" ? "CMD" : "PowerShell") + ")", auswahl); o.value = b.id; });
      if (treffer.some(function (b) { return b.id === vorher; })) auswahl.value = vorher;
      auswahl.disabled = !treffer.length;
      status.textContent = treffer.length + " von " + d.befehle.length + " Befehlen gefunden.";
      render();
    }
    suche.addEventListener("input", aktualisiere); shell.addEventListener("change", aktualisiere); kat.addEventListener("change", aktualisiere); auswahl.addEventListener("change", render);
    document.getElementById("ww-labor-reset").addEventListener("click", function () { suche.value = ""; shell.value = ""; kat.value = ""; aktualisiere(); suche.focus(); });
    aktualisiere();
  }
  if (typeof document !== "undefined") {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
  }
}());
