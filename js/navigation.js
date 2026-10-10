/* Zentrale, dateipfadbasierte Navigation fuer den Offline-Start. */
(function () {
  "use strict";
  var body = document.body;
  var page = body.getAttribute("data-page") || "overview";
  var base = body.getAttribute("data-base") || "";
  var modules = window.MODULE_DATEN || [];
  var registry = [
    { id: "overview", label: "Themenübersicht", href: base + "index.html", page: "overview" },
    { id: "computer-grundlagen", label: "Den Computer kennenlernen", href: base + "module/computer-grundlagen.html", page: "computer-grundlagen", status: "verfuegbar", jahr: 1 },
    { id: "netzwerkgrundlagen", label: "Netzwerkgrundlagen · IPv4", href: base + "module/netzwerkgrundlagen.html", page: "netzwerkgrundlagen", status: "verfuegbar", jahr: 1 },
    { id: "glossary", label: "Wörter & Begriffe", href: base + "glossar.html", page: "glossary" }
  ];
  var host = document.createElement("div");
  host.className = "site-navigation";
  var toggle = document.createElement("button");
  toggle.type = "button"; toggle.className = "nav-toggle"; toggle.textContent = "Menü";
  toggle.setAttribute("aria-expanded", "false"); toggle.setAttribute("aria-controls", "site-nav");
  var nav = document.createElement("nav"); nav.id = "site-nav"; nav.className = "site-nav"; nav.setAttribute("aria-label", "Hauptnavigation");
  var title = document.createElement("p"); title.className = "site-nav-title"; title.textContent = "Lernplattform"; nav.appendChild(title);
  var list = document.createElement("ul");
  function item(entry) {
    var li = document.createElement("li");
    var a = document.createElement("a"); a.textContent = entry.label; a.href = entry.href;
    if (entry.page === page) a.setAttribute("aria-current", "page");
    li.appendChild(a); return li;
  }
  list.appendChild(item(registry[0]));
  var activeYear = page === "computer-grundlagen" || page === "netzwerkgrundlagen" ? 1 : null;
  var yearData = modules.filter(function (y) { return y.jahr === 1; })[0];
  if (yearData) {
    var group = document.createElement("li"); group.className = "nav-category";
    var details = document.createElement("details"); details.open = activeYear === 1;
    var summary = document.createElement("summary"); summary.textContent = "1. Ausbildungsjahr"; details.appendChild(summary);
    var sub = document.createElement("ul");
    registry.filter(function (e) { return e.jahr === 1; }).forEach(function (e) { sub.appendChild(item(e)); });
    var planned = document.createElement("li");
    var plannedGroup = document.createElement("details");
    var plannedHeading = document.createElement("summary");
    plannedHeading.textContent = "Weitere Themen · In Kürze";
    plannedGroup.appendChild(plannedHeading);
    var plannedList = document.createElement("ul");
    (yearData.module || []).forEach(function (m) {
      if (m.id === "computer-grundlagen") return;
      if (m.id === "lf3") {
        var net = document.createElement("li");
        var netLink = document.createElement("a"); netLink.href = base + "module/netzwerkgrundlagen.html"; netLink.textContent = "Netzwerkgrundlagen · IPv4";
        if (page === "netzwerkgrundlagen") netLink.setAttribute("aria-current", "page");
        net.appendChild(netLink); sub.appendChild(net);
        (m.unterthemen || []).filter(function (u) { return u.status !== "verfuegbar"; }).forEach(function (u) {
          var plannedSub = document.createElement("li"); plannedSub.className = "nav-planned"; plannedSub.setAttribute("aria-disabled", "true"); plannedSub.textContent = u.titel + " — In Kürze"; plannedList.appendChild(plannedSub);
        });
        return;
      }
      var li = document.createElement("li"); li.className = "nav-planned"; li.setAttribute("aria-disabled", "true");
      li.textContent = (m.lernfeld ? m.lernfeld + " · " : "") + m.titel + " — In Kürze"; plannedList.appendChild(li);
    });
    plannedGroup.appendChild(plannedList); planned.appendChild(plannedGroup); sub.appendChild(planned);
    (yearData.module || []).forEach(function (m) {
      if (m.id !== "lf3") return;
      (m.unterthemen || []).filter(function (u) { return u.status !== "verfuegbar"; }).forEach(function (u) {
        var plannedSub = document.createElement("li"); plannedSub.className = "nav-planned"; plannedSub.setAttribute("aria-disabled", "true"); plannedSub.textContent = u.titel + " — In Kürze"; plannedList.appendChild(plannedSub);
      });
    });
    plannedGroup.appendChild(plannedList); planned.appendChild(plannedGroup);
    details.appendChild(sub); group.appendChild(details); list.appendChild(group);
  }
  list.appendChild(item(registry[3])); nav.appendChild(list);
  var optionsHost = document.createElement("div"); optionsHost.className = "nav-options"; optionsHost.id = "nav-options"; nav.appendChild(optionsHost);
  host.append(toggle, nav); body.insertBefore(host, body.firstChild);
  function closeMenu() { nav.classList.remove("is-open"); toggle.setAttribute("aria-expanded", "false"); }
  toggle.addEventListener("click", function () {
    var open = toggle.getAttribute("aria-expanded") !== "true";
    toggle.setAttribute("aria-expanded", String(open)); nav.classList.toggle("is-open", open);
    if (open) nav.querySelector("a") && nav.querySelector("a").focus();
  });
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") { closeMenu(); toggle.focus(); }
  });
  document.addEventListener("click", function (event) {
    if (toggle.getAttribute("aria-expanded") === "true" && !host.contains(event.target)) closeMenu();
  });
  nav.addEventListener("click", function (event) { if (event.target.closest("a")) closeMenu(); });
  var glossaryLink = nav.querySelector('a[href*="glossar.html"]');
  if (glossaryLink) glossaryLink.href += "?von=" + encodeURIComponent(location.pathname.slice(location.pathname.lastIndexOf("/") + 1) || "index.html");
})();
