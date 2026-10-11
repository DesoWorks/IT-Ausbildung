/* Lernfeld 1: Betrieb und berufliche Rolle. Eine kleine, wiederholbare Lernorientierung. */
(function (global) {
  "use strict";
  var KEY = "it-ausbildung.lf1-betrieb-aufgaben.v1";
  var STEPS = ["start", "rollen", "uebung", "abschluss"];
  var QUESTIONS = [
    { id:"q1", prompt:"Samira soll im Beispiel einen Bildschirm für einen neuen Arbeitsplatz anschließen. Wer arbeitet im Alltag gemeinsam an solchen Aufgaben?", correct:"team", options:[
      {value:"team", label:"Das zuständige Team", feedback:"Ein Team arbeitet gemeinsam an Aufgaben. Im fiktiven Beispiel unterstützt das Support-Team Samira."},
      {value:"kunde", label:"Der ganze Kundenbetrieb", feedback:"Der Kundenbetrieb kann Auftraggeber sein. Für die gemeinsame Bearbeitung ist im Beispiel das Support-Team zuständig."},
      {value:"abteilung", label:"Immer die gesamte Abteilung allein", feedback:"Eine Abteilung bündelt möglicherweise Aufgaben. Die konkrete Arbeit kann ein Team innerhalb dieses Bereichs übernehmen."}
    ]},
    { id:"q2", prompt:"Samira soll Zugriffsrechte an einem produktiven System ändern. Was ist eine gute nächste Handlung?", correct:"abstimmen", options:[
      {value:"abstimmen", label:"Vorher mit der verantwortlichen Person abstimmen", feedback:"Richtig. Zugriffsrechte wirken sich auf andere aus. Änderungen daran vorher mit der verantwortlichen Person abstimmen."},
      {value:"sofort", label:"Sofort ändern, ohne Rückfrage", feedback:"Das kann andere beeinträchtigen oder Sicherheitsregeln verletzen. Erst Zuständigkeit und Freigabe klären."},
      {value:"ignorieren", label:"Die Aufgabe ohne Rückmeldung liegen lassen", feedback:"Wenn eine Aufgabe unklar oder nicht freigegeben ist, frage nach und erkläre, was du noch klären musst."}
    ]},
    { id:"q3", prompt:"Welche Aussage beschreibt den Begriff Betrieb am besten?", correct:"betrieb", options:[
      {value:"betrieb", label:"Die Organisation, die Leistungen anbietet oder Waren herstellt", feedback:"Richtig. Ein Betrieb ist die Organisation. Seine Größe und interne Struktur können sehr verschieden sein."},
      {value:"team", label:"Immer eine Gruppe von genau drei Personen", feedback:"Ein Team ist eine Gruppe, die zusammenarbeitet. Eine feste Personenzahl gibt es nicht."},
      {value:"abteilung", label:"Ein anderes Wort für jedes Team", feedback:"Abteilung und Team sind nicht dasselbe. Ein Team kann zu einer Abteilung gehören; die Struktur ist je Betrieb verschieden."}
    ]}
  ];
  var TERMS = ["Betrieb", "Abteilung", "Team", "Ausbilderin oder Ausbilder", "Wertschöpfungskette"];
  function progress(state) {
    var answered = QUESTIONS.reduce(function(n,q){return n + (state.answers && state.answers[q.id] === q.correct ? 1 : 0);},0);
    return Math.round((answered + (state.finish ? 1 : 0)) / (QUESTIONS.length + 1) * 100);
  }
  var api = {KEY:KEY, STEPS:STEPS, QUESTIONS:QUESTIONS, TERMS:TERMS, progress:progress};
  global.LF1_BETRIEB = api;
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  if (!global.document) return;
  var doc=global.document, state={answers:{},finish:false};
  function $(id){return doc.getElementById(id);}
  function load(){try{var s=JSON.parse(global.localStorage.getItem(KEY)||"null");if(s){state.answers=s.answers||{};state.finish=!!s.finish;}}catch(e){}}
  function save(){try{global.localStorage.setItem(KEY,JSON.stringify(state));}catch(e){}}
  function update(){var n=progress(state);$("fortschritt-balken").style.width=n+"%";$("fortschritt-text").textContent="Fortschritt: "+n+" %";}
  function step(id){STEPS.forEach(function(s){$(s).hidden=s!==id;});doc.querySelectorAll(".schritt-knopf").forEach(function(b){if(b.dataset.ziel===id)b.setAttribute("aria-current","step");else b.removeAttribute("aria-current");});if(id==="abschluss"){state.finish=true;save();}update();$("hauptinhalt").focus();global.scrollTo(0,0);}
  function buildTerms(){var host=$("fachwoerter-liste");TERMS.forEach(function(term){var item=(global.GLOSSAR||[]).find(function(g){return g.begriff===term;});if(!item)return;var d=doc.createElement("details"),s=doc.createElement("summary"),p=doc.createElement("p");d.className="fachwort-hinweis";s.textContent=item.begriff;p.textContent=item.erklaerung;d.append(s,p);host.appendChild(d);});}
  function buildQuestions(){var host=$("rollen-fragen");QUESTIONS.forEach(function(q,index){var field=doc.createElement("fieldset"),legend=doc.createElement("legend"),group=doc.createElement("div");field.className="rollen-frage";legend.textContent=(index+1)+". "+q.prompt;field.appendChild(legend);group.className="rollen-optionen";q.options.forEach(function(o){var label=doc.createElement("label"),input=doc.createElement("input");input.type="radio";input.name=q.id;input.value=o.value;label.append(input,doc.createTextNode(" "+o.label));input.addEventListener("change",clearResult);group.appendChild(label);});field.appendChild(group);var feedback=doc.createElement("p");feedback.id="feedback-"+q.id;feedback.className="rollen-feedback";feedback.hidden=true;feedback.setAttribute("aria-live","polite");field.appendChild(feedback);host.appendChild(field);});}
  function selected(q){var input=doc.querySelector('input[name="'+q.id+'"]:checked');return input?input.value:"";}
  function check(){var box=$("rollen-ergebnis"), correct=0, unanswered=0;box.textContent="";var h=doc.createElement("h3"),rows=[];box.appendChild(h);QUESTIONS.forEach(function(q,index){var value=selected(q), row=doc.createElement("p"), opt=q.options.find(function(o){return o.value===value;}), isCorrect=!!opt&&value===q.correct;row.textContent=(isCorrect?"✓ Richtig: ":value?"✗ Noch nicht richtig: ":"○ Nicht beantwortet: ")+"Aufgabe "+(index+1)+" – "+q.prompt+" Antwort: "+(opt?opt.label:"keine Auswahl")+". "+(opt?opt.feedback:"Wähle eine Antwort. Du kannst es danach erneut prüfen.");rows.push(row);if(isCorrect)correct++;if(!value)unanswered++;});h.textContent=correct===QUESTIONS.length?"Alle Antworten richtig":correct?"Teilweise richtig":"Noch nicht richtig";rows.forEach(function(row){box.appendChild(row);});var summary=doc.createElement("p");summary.textContent=unanswered?unanswered+" Aufgabe(n) sind unbeantwortet.":correct===QUESTIONS.length?"Du hast alle drei Situationen passend eingeordnet.":"Lies die Hinweise und versuche es erneut. Es gibt keinen Zeitdruck.";box.appendChild(summary);box.hidden=false;state.answers={};QUESTIONS.forEach(function(q){state.answers[q.id]=selected(q);var f=$("feedback-"+q.id);f.textContent=state.answers[q.id]?q.options.find(function(o){return o.value===state.answers[q.id];}).feedback:"Noch nicht beantwortet. Wähle eine Antwort und prüfe erneut.";f.hidden=false;});save();update();}
  function clearResult(){var box=$("rollen-ergebnis");box.hidden=true;box.textContent="";QUESTIONS.forEach(function(q){var f=$("feedback-"+q.id);f.hidden=true;f.textContent="";});}
  function reset(){state={answers:{},finish:false};save();doc.querySelectorAll('#rollen-fragen input[type="radio"]').forEach(function(i){i.checked=false;});clearResult();update();}
  doc.querySelectorAll("[data-ziel]").forEach(function(b){b.addEventListener("click",function(){step(b.dataset.ziel);});});doc.querySelectorAll("[data-weiter]").forEach(function(b){b.addEventListener("click",function(){step(b.dataset.weiter);});});
  $("antworten-pruefen").addEventListener("click",check);
  $("uebung-reset").addEventListener("click",reset);
  $("reset-alles").addEventListener("click",function(){if(global.confirm("Gespeicherten Lernfortschritt dieser Lektion zurücksetzen?")){reset();step("start");}});

  load();buildTerms();buildQuestions();update();
})(typeof window!=="undefined"?window:globalThis);
