/* Rendern und Filtern des zentralen Glossars. */
(function () {
  "use strict";
  var list = document.getElementById("glossar-liste");
  var search = document.getElementById("glossar-suche");
  var back = document.getElementById("glossar-zurueck");
  if (!list || !search || !back) return;
  var allowed = { "index.html": true, "computer-grundlagen.html": true, "netzwerkgrundlagen.html": true };
  var from = new URLSearchParams(location.search).get("von") || "index.html";
  var candidate = allowed[from] ? from : null;
  if (candidate && from !== "index.html") candidate = "module/" + from;
  back.href = candidate || "index.html";
  back.textContent = candidate && from !== "index.html" ? "← Zur vorherigen Lernseite" : "← Zur Themenübersicht";
  var entries = window.GLOSSAR || [];
  function render() {
    var query = search.value.trim().toLocaleLowerCase("de");
    list.textContent = "";
    var found = 0;
    entries.forEach(function (entry) {
      if ((entry.begriff + " " + entry.erklaerung).toLocaleLowerCase("de").indexOf(query) < 0) return;
      found++;
      var details = document.createElement("details"); details.className = "glossar-eintrag";
      var summary = document.createElement("summary"); summary.textContent = entry.begriff; details.appendChild(summary);
      var text = document.createElement("p"); text.textContent = entry.erklaerung; details.appendChild(text); list.appendChild(details);
    });
    document.getElementById("glossar-treffer").textContent = found ? found + " Begriffe gefunden." : "Keine passenden Begriffe gefunden.";
  }
  search.addEventListener("input", render);
  render();
})();
