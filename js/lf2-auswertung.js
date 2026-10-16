/* LF2.12 – Auswertung eines ausdrücklich fiktiven Arbeitsplatzauftrags. */
(function (g) {
  "use strict";
  var ID = "lf2-auswertung", KEY = "it-ausbildung.lf2-auswertung.v1";
  var STEPS = ["start", "case", "exercise", "finish"];
  var Q = [
    { id: "q1", correct: "kriterium", prompt: "Woran richtest du die Auswertung des fiktiven Auftrags zuerst aus?", options: [
      { id: "gefuehl", label: "Nur daran, ob die beteiligte Person den Ablauf spontan gut fand und zufrieden wirkte.", feedback: "Eine Einschätzung ist nützlich, ersetzt aber kein vorher bekanntes Ziel. Benenne zuerst, was erreicht werden sollte." },
      { id: "preis", label: "Ausschließlich am niedrigsten genannten Einzelpreis, weil er leicht zu vergleichen ist.", feedback: "Der Einzelpreis sagt nicht, ob alle Bestandteile geliefert und geprüft wurden. Nutze die Kriterien des gesamten Auftrags." },
      { id: "kriterium", label: "An vorher genannten Kriterien, etwa vollständiger Lieferung und dokumentierter Prüfung.", feedback: "Richtig. Vorab bekannte Kriterien machen sichtbar, woran der Auftrag gemessen wird." }
    ] },
    { id: "q2", correct: "fakten", prompt: "Welche Aussage trennt den Befund am besten von einer Vermutung?", options: [
      { id: "schuld", label: "Die Lieferung war sicher schlecht geplant, deshalb fehlte der Filter zunächst.", feedback: "Das ist eine Vermutung über die Ursache. Die vorliegenden Angaben belegen sie nicht." },
      { id: "immer", label: "Lieferungen sind grundsätzlich unzuverlässig, das zeigt dieser Fall deutlich.", feedback: "Eine einzelne Übungssituation erlaubt keine allgemeine Aussage über Lieferungen." },
      { id: "fakten", label: "Laut Checkliste fehlte der Filter zunächst; die Nachprüfung ist dokumentiert.", feedback: "Richtig. Das beschreibt die dokumentierten Schritte, ohne eine nicht belegte Ursache zu behaupten." }
    ] },
    { id: "q3", correct: "massnahme", prompt: "Die fiktive Rückmeldung sagt, die Einrichtung dauerte länger als erwartet. Welche Maßnahme ist überprüfbar?", options: [
      { id: "massnahme", label: "Vor dem nächsten Aufbau eine Schrittliste anlegen; danach Vollständigkeit und Zeit prüfen.", feedback: "Richtig. Die Maßnahme nennt Handlung und später prüfbares Ergebnis." },
      { id: "schneller", label: "Beim nächsten Aufbau sollen sich alle deutlich mehr beeilen, dann passt die Zeit schon sicher.", feedback: "Das ist unklar und liefert kein überprüfbares Kriterium. Eine konkrete Vorbereitung ist besser prüfbar." },
      { id: "ignorieren", label: "Die Rückmeldung nicht beachten, weil alle sechs Prüfpunkte bestanden waren und das genügt.", feedback: "Ein bestandener Check schließt Verbesserungen am Ablauf nicht aus. Die Rückmeldung ist ein Hinweis, den du prüfen kannst." }
    ] },
    { id: "q4", correct: "einordnen", prompt: "Was darfst du aus der einen fiktiven Rückmeldung schließen?", options: [
      { id: "allgemein", label: "Alle Kundinnen und Kunden finden die Anmeldung verständlich und brauchen keine Hilfe.", feedback: "Eine einzelne Rückmeldung belegt nicht die Meinung aller Kundinnen und Kunden." },
      { id: "wertlos", label: "Die Rückmeldung ist wertlos, weil sie von nur einer Seite stammt, und wird nicht berücksichtigt.", feedback: "Sie ist kein allgemeiner Beweis, kann aber einen Anlass für eine gezielte Prüfung liefern." },
      { id: "einordnen", label: "In diesem Fall wurde die Erklärung als hilfreich erlebt; für ein Muster fehlen weitere Fälle.", feedback: "Richtig. Du hältst den konkreten Hinweis fest und verallgemeinerst ihn nicht." }
    ] },
    { id: "q5", correct: "pruefen", prompt: "Wie erkennst du beim nächsten fiktiven Auftrag, ob die Maßnahme geholfen hat?", options: [
      { id: "annahme", label: "Annehmen, dass es besser wird, weil die Schrittliste neu ist und sorgfältig gestaltet wurde.", feedback: "Eine neue Liste beweist noch keine Verbesserung. Prüfe die Ergebnisse." },
      { id: "pruefen", label: "Die Liste anwenden und Vollständigkeit sowie Zeit mit den festgelegten Kriterien vergleichen.", feedback: "Richtig. So wird die Maßnahme an beobachtbaren Kriterien überprüft." },
      { id: "loeschen", label: "Frühere Prüfergebnisse löschen, damit nur der neue Eindruck zählt und nichts vergleichbar bleibt, auch später.", feedback: "Das verhindert einen nachvollziehbaren Vergleich. Bewahre die relevanten Übungsbefunde auf." }
    ] }
  ];
  function evaluate(a) {
    a = a || {};
    var results = Q.map(function (q) { var o = q.options.find(function (x) { return x.id === a[q.id]; }); return { id:q.id, status:!o?"empty":o.id===q.correct?"correct":"wrong", optionId:o?o.id:"", feedback:o?o.feedback:"" }; });
    return { results:results, correct:results.filter(function(x){return x.status==="correct";}).length, wrong:results.filter(function(x){return x.status==="wrong";}).length, empty:results.filter(function(x){return x.status==="empty";}).length, allCorrect:results.every(function(x){return x.status==="correct";}) };
  }
  function progress(s) { s=s||{}; return Math.round(((s.checked?evaluate(s.answers).correct:0)+(s.finish?1:0))/(Q.length+1)*100); }
  function progressText(s) { s=s||{}; var done=(s.checked?evaluate(s.answers).correct:0)+(s.finish?1:0); return "Fortschritt: "+done+" von "+(Q.length+1)+" Schritten \u00b7 Abschluss "+(s.finish?"ge\u00f6ffnet":"noch nicht ge\u00f6ffnet"); }
  var api={ID:ID,KEY:KEY,STEPS:STEPS,QUESTIONS:Q,evaluate:evaluate,progress:progress,progressText:progressText};
  g.LF2_AUSWERTUNG=api; if(typeof module!=="undefined"&&module.exports)module.exports=api; if(!g.document)return;
  var d=g.document,s={answers:{},checked:false,finish:false},EMPTY="Noch nicht beantwortet. Wähle eine Antwort und prüfe erneut.";
  function $(id){return d.getElementById(id);} function load(){try{var x=JSON.parse(g.localStorage.getItem(KEY)||"null");if(x)s=x;}catch(e){}} function save(){try{g.localStorage.setItem(KEY,JSON.stringify(s));}catch(e){}}
  function update(){var n=progress(s);$("bar").style.width=n+"%";$("pct").textContent=progressText(s);}
  function go(id){STEPS.forEach(function(x){$(x).hidden=x!==id;});d.querySelectorAll("[data-step]").forEach(function(b){if(b.dataset.step===id)b.setAttribute("aria-current","step");else b.removeAttribute("aria-current");});if(id==="finish"){s.finish=true;save();$("done").textContent=s.checked&&evaluate(s.answers).allCorrect?"Lektion abgeschlossen. Du kannst sie jederzeit wiederholen.":"Du kannst den Fall erneut ansehen und die Übung später bearbeiten.";}update();$("main").focus();g.scrollTo(0,0);}
  function clear(){var b=$("result");b.hidden=true;b.textContent="";Q.forEach(function(q){var f=$("fb-"+q.id);f.hidden=true;f.textContent="";});}
  function build(){Q.forEach(function(q,i){var f=d.createElement("fieldset"),l=d.createElement("legend"),group=d.createElement("div"),fb=d.createElement("p");f.className="question";l.textContent=(i+1)+". "+q.prompt;f.appendChild(l);group.className="opts";q.options.forEach(function(o){var label=d.createElement("label"),input=d.createElement("input"),span=d.createElement("span");input.type="radio";input.name=q.id;input.value=o.id;span.textContent=o.label;label.className="opt";label.append(input,span);input.addEventListener("change",function(){s.answers[q.id]=o.id;s.checked=false;clear();save();update();});group.appendChild(label);});f.appendChild(group);fb.id="fb-"+q.id;fb.hidden=true;fb.setAttribute("aria-live","polite");f.appendChild(fb);$("questions").appendChild(f);});}
  function render(){var ev=evaluate(s.answers),box=$("result"),h=d.createElement("h3");box.textContent="";h.textContent=ev.allCorrect?"Alle Antworten richtig":ev.correct?"Teilweise richtig":ev.empty===Q.length?"Noch keine Antwort gewählt":"Noch nicht richtig";box.appendChild(h);ev.results.forEach(function(r,i){var q=Q[i],o=q.options.find(function(x){return x.id===r.optionId;}),p=d.createElement("p");p.textContent=(r.status==="correct"?"✓ Richtig: ":r.status==="wrong"?"✗ Noch nicht richtig: ":"○ Nicht beantwortet: ")+"Aufgabe "+(i+1)+" – "+q.prompt+" "+(o?"Deine Antwort: "+o.label+" ":"")+(o?o.feedback:EMPTY);box.appendChild(p);var fb=$("fb-"+q.id);fb.textContent=o?o.feedback:EMPTY;fb.hidden=false;});var p=d.createElement("p");p.textContent=ev.empty?ev.empty+" Aufgabe(n) sind unbeantwortet.":ev.allCorrect?"Du hast Befund, Maßnahme und nächste Prüfung nachvollziehbar verbunden.":"Lies die Erklärungen und versuche es erneut. Kein Zeitdruck.";box.appendChild(p);box.hidden=false;}
  function check(){s.answers={};Q.forEach(function(q){var i=d.querySelector('input[name="'+q.id+'"]:checked');if(i)s.answers[q.id]=i.value;});s.checked=true;render();save();update();}
  function reset(){s={answers:{},checked:false,finish:false};d.querySelectorAll('#questions input[type="radio"]').forEach(function(i){i.checked=false;});clear();$("done").textContent="";save();update();}
  d.querySelectorAll("[data-step]").forEach(function(b){b.addEventListener("click",function(){go(b.dataset.step);});});d.querySelectorAll("[data-next]").forEach(function(b){b.addEventListener("click",function(){go(b.dataset.next);});});$("check").addEventListener("click",check);$("reset").addEventListener("click",reset);$("reset-all").addEventListener("click",function(){if(g.confirm("Gespeicherten Lernfortschritt dieser Lektion zurücksetzen?")){reset();go("start");}});
  load();build();Q.forEach(function(q){var o=q.options.find(function(x){return x.id===s.answers[q.id];});if(o){var i=d.querySelector('input[name="'+q.id+'"][value="'+o.id+'"]');if(i)i.checked=true;}});if(s.checked)render();update();
})(typeof window!=="undefined"?window:globalThis);