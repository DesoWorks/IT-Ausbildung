/* Anzeige & Lesen sowie dauerhaft bedienbare Glossar-Hinweise. */
(function () {
  "use strict";
  var KEY = "it-ausbildung.anzeige.v1";
  var defaults = { text: 100, spacing: false, theme: "hell", ruhig: false };
  var current = load();
  var systemReduceMotion = false;

  function load() {
    try {
      var saved = JSON.parse(localStorage.getItem(KEY) || "null");
      return Object.assign({}, defaults, saved || {});
    } catch (e) { return Object.assign({}, defaults); }
  }
  function save() {
    apply();
    try { localStorage.setItem(KEY, JSON.stringify(current)); } catch (e) { /* App bleibt nutzbar. */ }
  }
  function apply() {
    document.documentElement.style.setProperty("--text-scale", String(current.text / 100));
    document.documentElement.dataset.theme = current.theme;
    document.documentElement.classList.toggle("mehr-abstand", !!current.spacing);
    document.documentElement.classList.toggle("ruhige-ansicht", !!current.ruhig || systemReduceMotion);
  }
  function addControl() {
    var box = document.createElement("details");
    box.className = "leseoptionen";
    var summary = document.createElement("summary");
    summary.textContent = "Anzeige & Lesen";
    box.appendChild(summary);
    var panel = document.createElement("div");
    panel.className = "leseoptionen-inhalt";

    var sizeLabel = document.createElement("label");
    sizeLabel.htmlFor = "textgroesse";
    sizeLabel.textContent = "Textgröße";
    var size = document.createElement("input");
    size.id = "textgroesse"; size.type = "range"; size.min = "100"; size.max = "150"; size.step = "10";
    size.value = String(current.text);
    size.setAttribute("aria-describedby", "textgroesse-wert");
    var value = document.createElement("output"); value.id = "textgroesse-wert"; value.textContent = current.text + "%";
    size.addEventListener("input", function () { current.text = Number(size.value); value.textContent = current.text + "%"; save(); });
    panel.append(sizeLabel, size, value);

    var space = document.createElement("button"); space.type = "button"; space.textContent = "Größere Zeilen- und Absatzabstände";
    space.setAttribute("aria-pressed", String(!!current.spacing));
    space.addEventListener("click", function () { current.spacing = !current.spacing; space.setAttribute("aria-pressed", String(current.spacing)); save(); });
    panel.appendChild(space);

    var themeLabel = document.createElement("label"); themeLabel.htmlFor = "farbmodus"; themeLabel.textContent = "Darstellung";
    var theme = document.createElement("select"); theme.id = "farbmodus";
    [["hell", "Hell"], ["dunkel", "Dunkel"], ["kontrast", "Hoher Kontrast"]].forEach(function (item) {
      var option = document.createElement("option"); option.value = item[0]; option.textContent = item[1]; theme.appendChild(option);
    });
    theme.value = current.theme;
    theme.addEventListener("change", function () { current.theme = theme.value; save(); });
    panel.append(themeLabel, theme);

    var calmLabel = document.createElement("label"); calmLabel.className = "bewegung-label";
    var calm = document.createElement("input"); calm.type = "checkbox"; calm.id = "bewegung-reduzieren"; calm.checked = !!current.ruhig;
    calm.addEventListener("change", function () { current.ruhig = calm.checked; save(); });
    calmLabel.append(calm, document.createTextNode(" Bewegungen reduzieren"));
    var calmHelp = document.createElement("p"); calmHelp.id = "bewegung-hilfe"; calmHelp.className = "klein";
    calmHelp.textContent = "Schaltet Animationen und Übergänge aus und verhindert weiches Scrollen. Inhalte und Rückmeldungen bleiben erhalten.";
    calm.setAttribute("aria-describedby", "bewegung-hilfe");
    panel.append(calmLabel, calmHelp);
    var motionNote = document.createElement("p"); motionNote.id = "bewegung-system-hinweis"; motionNote.className = "klein";
    motionNote.hidden = !systemReduceMotion;
    motionNote.textContent = "Dein System verlangt reduzierte Bewegung; die entsprechende Einstellung bleibt aktiv.";
    panel.appendChild(motionNote);

    var reset = document.createElement("button"); reset.type = "button"; reset.textContent = "Auf Standard zurücksetzen";
    reset.addEventListener("click", function () {
      current = Object.assign({}, defaults); size.value = "100"; value.textContent = "100%";
      space.setAttribute("aria-pressed", "false"); calm.checked = false; theme.value = "hell"; save();
    });
    panel.appendChild(reset);
    box.appendChild(panel);
    var target = document.getElementById("nav-options");
    if (target) target.appendChild(box);
    else { var header = document.querySelector("header"); if (header) header.insertAdjacentElement("afterend", box); else document.body.insertBefore(box, document.body.firstChild); }
  }

  function init() {
    if (window.matchMedia && window.matchMedia("(prefers-contrast: more)").matches && current.theme === "hell") current.theme = "kontrast";
    var motion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)");
    systemReduceMotion = !!(motion && motion.matches);
    if (motion && motion.addEventListener) motion.addEventListener("change", function (event) { systemReduceMotion = event.matches; apply(); var note = document.getElementById("bewegung-system-hinweis"); if (note) note.hidden = !systemReduceMotion; });
    else if (motion && motion.addListener) motion.addListener(function (event) { systemReduceMotion = event.matches; apply(); });
    apply(); addControl();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();

/* LF-Erklärungen erscheinen direkt in der Themenübersicht. */
(function () {
  "use strict";
  function enhanceTerms() {
  var labels = document.querySelectorAll(".modul-lernfeld");
  labels.forEach(function (label) {
    var term = label.textContent;
    var detail = document.createElement("details");
    detail.className = "fachwort-hinweis";
    var summary = document.createElement("summary");
    summary.textContent = term;
    var text = document.createElement("p");
    text.textContent = term.replace(/^LF/, "Lernfeld") + ": ein Themenbereich des Rahmenlehrplans.";
    detail.append(summary, text);
    label.replaceWith(detail);
  });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", enhanceTerms);
  else enhanceTerms();
})();
