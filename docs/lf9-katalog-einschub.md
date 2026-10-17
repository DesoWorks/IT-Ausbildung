# LF9 – vorbereiteter Katalog- und Fortschrittseinschub

Stand: 17.10.2026. Übergabe an Rick; noch nicht in die gemeinsamen JavaScript-Dateien eingebaut.

Feldstatus bleibt `kommt-bald`, bis die sichtbare Prüfung durch ist. Kein Commit, kein Push, keine Freigabe.

Grundlagen: `docs/plan-lf9.md`, LF7-Muster in `js/module-daten.js` und `js/fortschritt.js`, vorhandene LF9-Seiten und Skripte sowie `tests/lf9-inhalte.test.js`. Keine neue Lektion, kein neues Lernziel, keine Installation und kein echtes Gerät.

## 1. Katalogobjekt

Erst nach Ende von Jarvis' Änderungen und ausdrücklicher Übergabe durch Rick einsetzen. In `js/module-daten.js` ausschließlich dieses bisherige Objekt ersetzen (nicht auf eine feste Zeilennummer verlassen):

```javascript
{ id: "lf9", lernfeld: "Lernfeld 9", titel: "Planung und Einrichtung von Netzwerken und Diensten", status: "kommt-bald" }
```

Ersatzobjekt nach dem LF7-Schema; Feldstatus unverändert, alle neun Unterthemen `verfuegbar`:

```javascript
{ id: "lf9", lernfeld: "Lernfeld 9", titel: "Planung und Einrichtung von Netzwerken und Diensten", status: "kommt-bald",
  unterthemen: [
    { id: "lf9-anforderung", typ: "lektion", titel: "Anforderungen an das Netzwerk mit dem Kunden klären", beschreibung: "Anforderungen an das Netzwerk im fiktiven Kundenauftrag klären.", page: "lf9-anforderung", status: "verfuegbar", datei: "module/lf9-anforderung.html" },
    { id: "lf9-ist", typ: "lektion", titel: "Den vorhandenen Zustand beschreiben, ohne ihn zu verändern", beschreibung: "Den vorhandenen Zustand im fiktiven Beispiel beschreiben, ohne ihn zu verändern.", page: "lf9-ist", status: "verfuegbar", datei: "module/lf9-ist.html" },
    { id: "lf9-dienste", typ: "lektion", titel: "Benötigte Dienste vom Kundenauftrag ableiten", beschreibung: "Benötigte Dienste aus dem fiktiven Kundenauftrag ableiten.", page: "lf9-dienste", status: "verfuegbar", datei: "module/lf9-dienste.html" },
    { id: "lf9-infrastruktur", typ: "lektion", titel: "Infrastruktur skizzieren: Trennung, Weg und Grenze", beschreibung: "Trennung, Weg und Grenze der fiktiven Infrastruktur auf Papier skizzieren.", page: "lf9-infrastruktur", status: "verfuegbar", datei: "module/lf9-infrastruktur.html" },
    { id: "lf9-eignung", typ: "lektion", titel: "Technische, wirtschaftliche und nachhaltige Eignung vergleichen", beschreibung: "Die technische, wirtschaftliche und nachhaltige Eignung der fiktiven Planung vergleichen.", page: "lf9-eignung", status: "verfuegbar", datei: "module/lf9-eignung.html" },
    { id: "lf9-standard", typ: "lektion", titel: "Einen Standard und eine Funktionsprüfung festlegen", beschreibung: "Einen Standard und eine Funktionsprüfung für die fiktive Planung festlegen.", page: "lf9-standard", status: "verfuegbar", datei: "module/lf9-standard.html" },
    { id: "lf9-schutz", typ: "lektion", titel: "Datenschutz und Datensicherheit am geplanten Dienst beurteilen", beschreibung: "Datenschutz und Datensicherheit am fiktiv geplanten Dienst beurteilen.", page: "lf9-schutz", status: "verfuegbar", datei: "module/lf9-schutz.html" },
    { id: "lf9-zukunft", typ: "lektion", titel: "Kundenzufriedenheit und Zukunftsfähigkeit der Planung beurteilen", beschreibung: "Kundenzufriedenheit und Zukunftsfähigkeit der fiktiven Planung beurteilen.", page: "lf9-zukunft", status: "verfuegbar", datei: "module/lf9-zukunft.html" },
    { id: "lf9-kontrolle", typ: "lernzielkontrolle", titel: "LF9 Lernzielkontrolle", beschreibung: "24 Fragen zu den acht LF9-Lektionen. Nach der Abgabe gesperrt. Zurücksetzen nur mit dem Passwort der Lernzielkontrolle.", page: "lf9-kontrolle", status: "verfuegbar", datei: "module/lf9-kontrolle.html" }
  ] }
```

## 2. Fortschrittsschlüssel

Diese neun Eigenschaften später im vorhandenen Schlüsselobjekt in `js/fortschritt.js` ergänzen. Beim Einfügen auf das Trennkomma zwischen der bisherigen letzten Eigenschaft und dem ersten neuen Eintrag achten; vorhandene LF8-Einträge erhalten.

```javascript
"lf9-anforderung": "it-ausbildung.lf9-anforderung.v1",
"lf9-ist": "it-ausbildung.lf9-ist.v1",
"lf9-dienste": "it-ausbildung.lf9-dienste.v1",
"lf9-infrastruktur": "it-ausbildung.lf9-infrastruktur.v1",
"lf9-eignung": "it-ausbildung.lf9-eignung.v1",
"lf9-standard": "it-ausbildung.lf9-standard.v1",
"lf9-schutz": "it-ausbildung.lf9-schutz.v1",
"lf9-zukunft": "it-ausbildung.lf9-zukunft.v1",
"lf9-kontrolle": "it-ausbildung.lf9-kontrolle.v1"
```

## 3. Abschlussregeln

Lektionen gelten nur mit `state.finish`, `state.checked` und allen vier richtigen Antworten als abgeschlossen. Antworten liegen in `state.answers` unter `q1` bis `q4`.

| ID | q1 | q2 | q3 | q4 |
| --- | --- | --- | --- | --- |
| lf9-anforderung | trennung | zehn | nein | an |
| lf9-ist | ohne | luecke | adresse | soll |
| lf9-dienste | gast | getrennt | geraet | datei |
| lf9-infrastruktur | keinweg | annahme | papier | live |
| lf9-eignung | grenze | offen | nur | grund |
| lf9-standard | regel | kasse | weg | mess |
| lf9-schutz | erheben | liste | sichtbar | nicht |
| lf9-zukunft | drei | sichtbar | extra | frei |

Die Lernzielkontrolle verlangt `state.finish` und alle 24 Antworten richtig, kein `state.checked`. Antworten liegen unter den Indizes `0` bis `23`; der Schlüssel ist achtmal `a, b, c`:

```text
0:a  1:b  2:c  3:a  4:b  5:c  6:a  7:b  8:c  9:a  10:b  11:c
12:a  13:b  14:c  15:a  16:b  17:c  18:a  19:b  20:c  21:a  22:b  23:c
```

Folgenden Block später innerhalb der vorhandenen Abschlussableitung in `js/fortschritt.js` einsetzen, wo `id` und `state` bereits vorliegen, vor dem abschließenden Fallback `return false`. Bestehende Regeln erhalten. Der Block verwendet keine zusätzlichen globalen Abhängigkeiten.

```javascript
if (id === "lf9-anforderung") {
  var lf9_anforderung = state.answers || {};
  return !!state.finish && !!state.checked && lf9_anforderung.q1 === "trennung" && lf9_anforderung.q2 === "zehn" && lf9_anforderung.q3 === "nein" && lf9_anforderung.q4 === "an";
}
if (id === "lf9-ist") {
  var lf9_ist = state.answers || {};
  return !!state.finish && !!state.checked && lf9_ist.q1 === "ohne" && lf9_ist.q2 === "luecke" && lf9_ist.q3 === "adresse" && lf9_ist.q4 === "soll";
}
if (id === "lf9-dienste") {
  var lf9_dienste = state.answers || {};
  return !!state.finish && !!state.checked && lf9_dienste.q1 === "gast" && lf9_dienste.q2 === "getrennt" && lf9_dienste.q3 === "geraet" && lf9_dienste.q4 === "datei";
}
if (id === "lf9-infrastruktur") {
  var lf9_infrastruktur = state.answers || {};
  return !!state.finish && !!state.checked && lf9_infrastruktur.q1 === "keinweg" && lf9_infrastruktur.q2 === "annahme" && lf9_infrastruktur.q3 === "papier" && lf9_infrastruktur.q4 === "live";
}
if (id === "lf9-eignung") {
  var lf9_eignung = state.answers || {};
  return !!state.finish && !!state.checked && lf9_eignung.q1 === "grenze" && lf9_eignung.q2 === "offen" && lf9_eignung.q3 === "nur" && lf9_eignung.q4 === "grund";
}
if (id === "lf9-standard") {
  var lf9_standard = state.answers || {};
  return !!state.finish && !!state.checked && lf9_standard.q1 === "regel" && lf9_standard.q2 === "kasse" && lf9_standard.q3 === "weg" && lf9_standard.q4 === "mess";
}
if (id === "lf9-schutz") {
  var lf9_schutz = state.answers || {};
  return !!state.finish && !!state.checked && lf9_schutz.q1 === "erheben" && lf9_schutz.q2 === "liste" && lf9_schutz.q3 === "sichtbar" && lf9_schutz.q4 === "nicht";
}
if (id === "lf9-zukunft") {
  var lf9_zukunft = state.answers || {};
  return !!state.finish && !!state.checked && lf9_zukunft.q1 === "drei" && lf9_zukunft.q2 === "sichtbar" && lf9_zukunft.q3 === "extra" && lf9_zukunft.q4 === "frei";
}
if (id === "lf9-kontrolle") {
  var lf9_kontrolle = state.answers || {};
  var lf9_schluessel = ["a", "b", "c", "a", "b", "c", "a", "b", "c", "a", "b", "c", "a", "b", "c", "a", "b", "c", "a", "b", "c", "a", "b", "c"];
  return !!state.finish && lf9_schluessel.every(function (antwort, index) {
    return lf9_kontrolle[index] === antwort;
  });
}
```

## 4. Abgrenzung dieses Schritts

Nur diese neue Markdown-Datei wird erstellt. `js/module-daten.js`, `js/fortschritt.js`, Lektionsdateien, Tests und alle anderen bestehenden Dateien bleiben durch Terminus unverändert. LF6, LF7, LF8 und Jahr 1 werden nicht bearbeitet. Ein späterer Einbau ist nicht Teil dieses Schritts und setzt Ricks ausdrückliche Übergabe voraus. Die sichtbare Prüfung und eine etwaige spätere Freigabe werden durch diesen Einschub nicht vorweggenommen.

Prüfkommando für diesen Schritt: `node tests/lf9-inhalte.test.js`.

Nachtrag 17.10.2026: Der vorbereitete LF9-Block ist nach Ricks Übergabe in Katalog und Fortschrittsableitung eingebaut; der Feldstatus bleibt `kommt-bald`.
