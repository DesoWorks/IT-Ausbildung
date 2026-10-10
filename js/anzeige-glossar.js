/* Anzeige & Lesen sowie dauerhaft bedienbare Glossar-Hinweise. */
(function () {
  "use strict";
  var KEY = "it-ausbildung.anzeige.v1";
  var defaults = { text: 100, spacing: false, theme: "hell", ruhig: false };
  var current = load();

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
    document.documentElement.classList.toggle("ruhige-ansicht", !!current.ruhig);
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

    var calm = document.createElement("button"); calm.type = "button"; calm.textContent = "Ruhige Ansicht";
    calm.setAttribute("aria-pressed", String(!!current.ruhig));
    calm.addEventListener("click", function () { current.ruhig = !current.ruhig; calm.setAttribute("aria-pressed", String(current.ruhig)); save(); });
    panel.appendChild(calm);

    var reset = document.createElement("button"); reset.type = "button"; reset.textContent = "Auf Standard zurücksetzen";
    reset.addEventListener("click", function () {
      current = Object.assign({}, defaults); size.value = "100"; value.textContent = "100%";
      space.setAttribute("aria-pressed", "false"); calm.setAttribute("aria-pressed", "false"); theme.value = "hell"; save();
    });
    panel.appendChild(reset);
    box.appendChild(panel);
    var header = document.querySelector("header");
    if (header) header.insertAdjacentElement("afterend", box); else document.body.insertBefore(box, document.body.firstChild);
  }

  function addGlossary() {
    var items = window.GLOSSAR || [];
    if (!items.length) return;
    var section = document.createElement("section"); section.className = "glossar";
    section.setAttribute("aria-labelledby", "glossar-titel");
    var h = document.createElement("h2"); h.id = "glossar-titel"; h.textContent = "Glossar"; section.appendChild(h);
    var note = document.createElement("p"); note.textContent = "Wähle einen Fachbegriff, um die Erklärung zu öffnen. Du kannst sie mit Maus, Tastatur oder Touch bedienen."; section.appendChild(note);
    items.forEach(function (item) {
      var details = document.createElement("details"); details.className = "glossar-eintrag";
      var term = document.createElement("summary"); term.textContent = item.begriff; details.appendChild(term);
      var explanation = document.createElement("p"); explanation.textContent = item.erklaerung; details.appendChild(explanation);
      section.appendChild(details);
    });
    var footer = document.querySelector("footer");
    if (footer) footer.parentNode.insertBefore(section, footer);
  }

  function init() {
    if (window.matchMedia && window.matchMedia("(prefers-contrast: more)").matches && current.theme === "hell") current.theme = "kontrast";
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) document.documentElement.classList.add("bewegung-reduziert");
    apply(); addControl(); addGlossary();
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
