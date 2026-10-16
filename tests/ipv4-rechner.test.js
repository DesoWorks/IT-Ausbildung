"use strict";
const assert=require("node:assert/strict"),fs=require("node:fs"),path=require("node:path"),vm=require("node:vm");
const root=path.resolve(__dirname,"..");const source=fs.readFileSync(path.join(root,"js/ipv4-rechner.js"),"utf8");
const ctx={window:{},module:{exports:{}},document:undefined};vm.runInNewContext(source,ctx);const ip=ctx.module.exports;
function check(addr,mask,prefix,network,broadcast,count,range){const r=ip.calculate(addr,mask);assert.equal(r.ok,true);assert.equal(r.prefix,prefix);assert.equal(r.maskText,ip.formatIP(r.mask));assert.equal(r.networkText,network);assert.equal(r.broadcastText,broadcast);assert.equal(r.count,count);assert.equal(r.usable,range);return r;}
const r24=check("192.168.1.20","/24",24,"192.168.1.0","192.168.1.255","256","192.168.1.1 bis 192.168.1.254");assert.equal(r24.usableCount,"254");
check("10.20.30.40","255.255.255.0",24,"10.20.30.0","10.20.30.255","256","10.20.30.1 bis 10.20.30.254");
check("192.168.1.200","/25",25,"192.168.1.128","192.168.1.255","128","192.168.1.129 bis 192.168.1.254");
check("192.168.1.5","/30",30,"192.168.1.4","192.168.1.7","4","192.168.1.5 bis 192.168.1.6");
const r31=check("192.0.2.10","/31",31,"192.0.2.10","192.0.2.11","2","192.0.2.10 bis 192.0.2.11 (beide Adressen auf einem Punkt-zu-Punkt-Link gemäß RFC 3021 verwendbar).");assert.match(r31.usableCount,/2 auf Punkt-zu-Punkt/);
const r32=check("203.0.113.8","/32",32,"203.0.113.8","203.0.113.8","1","Einzelne Adresse 203.0.113.8 (Hostroute; kein gewöhnlicher Hostbereich).");assert.match(r32.usableCount,/Hostroute/);
const zero=check("192.168.1.20","/0",0,"0.0.0.0","255.255.255.255","4294967296","0.0.0.1 bis 255.255.255.254");assert.equal(zero.hostBits,32);assert.equal(zero.usableCount,"4294967294");
assert.equal(ip.groupNumber(zero.count),"4.294.967.296");assert.equal(ip.groupNumber("65536"),"65.536");
assert.match(r24.maskSteps,/binären NETZMASKE.*Netzbits auf 1.*Gerätebits auf 0.*nicht die Bitwerte/);
assert.match(r24.networkSteps,/UND \(AND\).*beide Bits 1/);assert.match(r24.broadcastSteps,/ODER \(OR\)/);
assert.equal(ip.parseMask("255.0.255.0").ok,false);assert.match(ip.parseMask("255.0.255.0").error,/nicht zusammenhängend/);assert.equal(ip.parseMask("/33").ok,false);assert.equal(ip.calculate("256.1.1.1","/24").ok,false);assert.equal(ip.calculate("1.2.3","/24").ok,false);assert.equal(ip.calculate("1.2.3.4","").ok,false);
const html=fs.readFileSync(path.join(root,"module/ipv4-rechner.html"),"utf8"),css=fs.readFileSync(path.join(root,"css/ipv4-rechner.css"),"utf8"),data=fs.readFileSync(path.join(root,"js/module-daten.js"),"utf8");
for(const s of ["navigation.js","anzeige-glossar.js","glossar-daten.js","version.js","ipv4-rechner.js"])assert(html.includes(s));assert(html.includes('aria-live="polite"')&&html.includes('role="alert"'));assert(data.includes('page: "ipv4-rechner"')&&data.includes("module/ipv4-rechner.html"));assert(css.includes("var(--farbe-")&&!/#[0-9a-f]{3,6}\\b/i.test(css));
console.log("ipv4-rechner.test.js: PASS");
