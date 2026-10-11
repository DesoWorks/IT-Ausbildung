/* IPv4-Subnetzrechner: ganzzahlige 32-Bit-Rechnung, offline und ohne Abhängigkeiten. */
(function (root) {
  "use strict";
  var MAX = 0xffffffffn;
  function ipToBinary(value) { return [24n,16n,8n,0n].map(function (shift) { return Number((value >> shift) & 255n).toString(2).padStart(8,"0"); }).join("."); }
  function parseIPv4(text) {
    var s = String(text == null ? "" : text).trim();
    var parts = s.split(".");
    if (parts.length !== 4 || parts.some(function (p) { return !/^\d{1,3}$/.test(p) || Number(p) > 255; })) return null;
    return parts.reduce(function (n, p) { return (n << 8n) | BigInt(Number(p)); }, 0n);
  }
  function formatIP(n) { return [24n, 16n, 8n, 0n].map(function (s) { return Number((n >> s) & 255n); }).join("."); }
  function binaryOctets(n) { return [24n,16n,8n,0n].map(function (s) { return Number((n >> s) & 255n).toString(2).padStart(8,"0"); }).join("."); }
  function parseMask(value) {
    var s = String(value == null ? "" : value).trim();
    if (/^\/?\d{1,2}$/.test(s)) {
      var p = Number(s.replace("/", ""));
      if (p < 0 || p > 32) return { ok:false, error:"Das Präfix muss zwischen /0 und /32 liegen." };
      var mask = p === 0 ? 0n : (MAX << BigInt(32-p)) & MAX;
      return { ok:true, prefix:p, mask:mask };
    }
    var maskValue = parseIPv4(s);
    if (maskValue === null) return { ok:false, error:"Gib ein Präfix von /0 bis /32 oder eine Netzmaske wie 255.255.255.0 ein." };
    var bits = maskValue.toString(2).padStart(32,"0");
    if (!/^1*0*$/.test(bits)) return { ok:false, error:"Die Netzmaske ist nicht zusammenhängend. Nach dem ersten 0-Bit dürfen keine 1-Bits mehr folgen." };
    return { ok:true, prefix:(bits.match(/1/g)||[]).length, mask:maskValue };
  }
  function calculate(address, maskText) {
    var ip = parseIPv4(address);
    if (ip === null) return { ok:false, error:"IPv4-Adresse ungültig. Gib vier Zahlen von 0 bis 255 ein, zum Beispiel 192.168.1.20." };
    var parsed = parseMask(maskText);
    if (!parsed.ok) return parsed;
    var hostBits = 32 - parsed.prefix;
    var count = 1n << BigInt(hostBits);
    var network = ip & parsed.mask;
    var broadcast = network | (MAX ^ parsed.mask);
    var p = parsed.prefix, usable;
    if (p === 32) usable = "Einzelne Adresse " + formatIP(network) + " (Hostroute; kein gewöhnlicher Hostbereich).";
    else if (p === 31) usable = formatIP(network) + " bis " + formatIP(broadcast) + " (beide Adressen auf einem Punkt-zu-Punkt-Link gemäß RFC 3021 verwendbar).";
    else usable = formatIP(network + 1n) + " bis " + formatIP(broadcast - 1n);
    var usableCount = p === 32 ? "1 (einzelne Adresse; Hostroute)" : p === 31 ? "2 auf Punkt-zu-Punkt-Verbindungen (RFC 3021)" : (count - 2n).toString();
    var networkBin = binaryOctets(network), maskBin = binaryOctets(parsed.mask);
    var binary = ipToBinary(ip).split(".").map(function (octet, i) {
      var keep = Math.max(0, Math.min(8, p - i * 8));
      return '<span class="ip-netzbits">' + octet.slice(0,keep) + '</span><span class="ip-geraetebits">' + octet.slice(keep) + '</span>';
    }).join(".");
    return { ok:true, input:address.trim(), inputBinary:ipToBinary(ip), prefix:p, mask:parsed.mask, maskText:formatIP(parsed.mask), network:network, networkText:formatIP(network), broadcast:broadcast, broadcastText:formatIP(broadcast), count:count.toString(), hostBits:hostBits, usable:usable, usableCount:usableCount, networkBinary:networkBin, maskBinary:maskBin, coloredBinary:binary,
      maskSteps: parsed.prefix + " Netzbits stehen auf 1; " + hostBits + " Gerätebits stehen auf 0.",
      networkSteps: "Netzadresse = IPv4-Adresse UND Netzmaske. " + address.trim() + " AND " + formatIP(parsed.mask) + " = " + formatIP(network) + ".",
      broadcastSteps: "Broadcast = Netzadresse ODER alle Gerätebits auf 1. " + formatIP(network) + " OR " + formatIP(MAX ^ parsed.mask) + " = " + formatIP(broadcast) + ".",
      rangeNote: p >= 31 ? usable : "Bei diesem üblichen Präfix bleiben Netz- und Broadcastadresse außerhalb des gewöhnlichen Hostbereichs." };
  }
  function tableRows() { var rows=[]; for(var p=0;p<=32;p++){var r=calculate("192.0.2.1",String(p)); rows.push(r);} return rows; }
  var api={parseIPv4:parseIPv4,parseMask:parseMask,calculate:calculate,tableRows:tableRows,formatIP:formatIP};
  root.IPV4_RECHNER=api; if(typeof module!=="undefined"&&module.exports) module.exports=api;
  if(!root.document)return;
  var d=root.document, byId=function(id){return d.getElementById(id);};
  function clear(){var out=byId("ip-result"),err=byId("ip-error"); if(out){out.hidden=true;out.textContent="";} if(err){err.hidden=true;err.textContent="";} byId("ip-address").removeAttribute("aria-invalid");byId("ip-prefix-mask").removeAttribute("aria-invalid");}
  function text(tag,content,cls){var e=d.createElement(tag);if(cls)e.className=cls;e.textContent=content;return e;}
  function render(r){var out=byId("ip-result");out.textContent="";out.appendChild(text("h2","Ergebnis",""));var dl=d.createElement("dl");dl.className="ip-results";[["Präfix","/"+r.prefix],["Netzmaske",r.maskText],["Netzadresse",r.networkText],["Broadcastadresse",r.broadcastText],["Gesamtadresszahl",r.count],["Nutzbarer Bereich",r.usable]].forEach(function(pair){dl.appendChild(text("dt",pair[0]));dl.appendChild(text("dd",pair[1]));});out.appendChild(dl);
    out.appendChild(text("h2","Rechenweg mit deinen Werten"));out.appendChild(text("p","Eingegeben: "+r.input+"/"+r.prefix+". Netzbits: "+r.prefix+"; Gerätebits: "+r.hostBits+"."));out.appendChild(text("p","IPv4-Adresse binär: "+r.inputBinary,"ip-mono"));
    var figure=d.createElement("figure");figure.className="ip-binary-figure";figure.setAttribute("aria-label","Binärdarstellung der Netzadresse. Blau markiert sind Netzbits, grün markiert sind Gerätebits.");
    var cap=text("figcaption","Eingegebene IPv4-Adresse in Binärform: blau = Netzbits, grün = Gerätebits.");figure.appendChild(cap);var binary=d.createElement("p");binary.className="ip-binary";binary.innerHTML=r.coloredBinary;figure.appendChild(binary);figure.appendChild(text("p","Maske binär: "+r.maskBinary,"ip-mono"));out.appendChild(figure);
    out.appendChild(text("ol", "", "ip-steps"));var ol=out.querySelector(".ip-steps");[r.maskSteps,r.networkSteps,r.broadcastSteps,"Adresszahl = 2 hoch Gerätebits = 2^"+r.hostBits+" = "+r.count+".",r.rangeNote].forEach(function(s){ol.appendChild(text("li",s));});
    out.appendChild(text("p","Warum das funktioniert: Bei der UND-Verknüpfung bleiben nur die Netzbits der Eingabe erhalten. Für die Broadcastadresse werden alle Gerätebits auf 1 gesetzt; damit ist es die letzte Adresse des Bereichs."));out.hidden=false;
  }
  function submit(e){e.preventDefault();clear();var r=calculate(byId("ip-address").value,byId("ip-prefix-mask").value);if(!r.ok){var err=byId("ip-error");err.textContent=r.error;err.hidden=false;if(!parseIPv4(byId("ip-address").value))byId("ip-address").setAttribute("aria-invalid","true");else byId("ip-prefix-mask").setAttribute("aria-invalid","true");return;}render(r);}
  function renderTable(){var body=byId("ip-table-body");tableRows().forEach(function(r){var tr=d.createElement("tr");["/"+r.prefix,r.maskText,Number(r.count).toLocaleString("de-DE"),r.usableCount].forEach(function(v){tr.appendChild(text("td",v));});body.appendChild(tr);});}
  function init(){if(!byId("ip-form"))return;byId("ip-form").addEventListener("submit",submit);["ip-address","ip-prefix-mask"].forEach(function(id){byId(id).addEventListener("input",clear);});byId("ip-example").addEventListener("click",function(){byId("ip-address").value="192.168.1.70";byId("ip-prefix-mask").value="/26";submit({preventDefault:function(){}});});renderTable();}
  if(d.readyState==="loading")d.addEventListener("DOMContentLoaded",init);else init();
})(typeof window!=="undefined"?window:globalThis);
