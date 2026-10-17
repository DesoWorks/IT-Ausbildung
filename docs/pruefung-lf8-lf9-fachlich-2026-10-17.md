# LF8/LF9: KMK-Abgleich und fachliche Prüfung

Stand: 17.10.2026. Prüfender: TERMINUS. Geprüfter Produktstand: `922005881c9a2c72b89deb1534fe81698b090f97`, Branch `lehrjahr-2/serviceanfragen`.

## Ergebnis und Freigabegrenze

LF8 und LF9 bleiben `kommt-bald`. Dennis hat in dieser Fortsetzung entschieden: **„Gesperrt lassen; zuerst KMK-Abgleich und fachliche Prüfung“**. Das vorliegende Dokument erledigt dieses Prüfpaket, nicht die anschließende Korrektur oder eine menschliche Abnahme.

Die beiden Felder sind begrenzte Einstiege in passende Themen des zweiten Ausbildungsjahrs. Sie bilden die vollständigen KMK-Handlungskompetenzen nicht ab. Das allein verbietet eine ausdrücklich als Einstieg bezeichnete Veröffentlichung nicht; eine solche Freigabe liegt hier aber nicht vor. Zusätzlich gibt es fachliche Fehlverallgemeinerungen und deutliche Antwort-Hinweise. Deshalb ist auch eine Freigabe als Erstfassung derzeit nicht zu empfehlen.

Jahr 1 bleibt unverändert bei Dennis zur menschlichen Abnahme. Keine neuen Lektionen, keine Katalogänderung, kein Push, kein Deployment und keine zusätzliche Agentenbeauftragung in diesem Prüfpaket.

## Was jetzt belegt ist und was aus früheren Berichten stammt

### In dieser Fortsetzung neu geprüft

- Projektzugriff erfolgreich; zu Beginn sauberer Arbeitsbaum auf `lehrjahr-2/serviceanfragen`, HEAD `9220058`, drei Commits vor dem vorhandenen Remote-Tracking-Branch. Kein Fetch; damit keine Aussage über den aktuellen Serverstand.
- `1385888` ist Vorfahr von `d23145e`, dieser ist Vorfahr von HEAD. Der erste Commit bereitet LF8/LF9 ohne Katalogfreigabe vor; der zweite korrigiert die Standnotiz.
- `git diff --name-only d23145e -- js css module index.html` ist leer. Der Produktcode ist seit der dokumentierten technischen Prüfgrundlage unverändert. `9220058` ergänzt Tests und Dokumentation, keinen Produktcode.
- KMK-Original direkt heruntergeladen und Seiten 19/20 gelesen. Titel, Zuordnung zum zweiten Ausbildungsjahr und jeweils 80 Stunden sind dort belegt. Nachlesbarer Auszug und PDF-Prüfsumme: [kmk-lf8-lf9-auszug-2026-10-17.md](kmk-lf8-lf9-auszug-2026-10-17.md).
- Alle acht Inhaltsdateien pro Feld mit Lernzielen, Erklärungen, vier Fragen, Optionen und Feedback gelesen; beide Kontroll-Fragenkataloge mit je 24 Fragen gelesen. Die gemeinsamen Ablaufskripte liefern daraus die Lerntexte. Der statische HTML-Text aller 18 Seiten wurde ebenfalls gelesen. Kein erneuter Browserdurchlauf.
- Lösungsschlüssel auf inhaltliche Plausibilität geprüft, nicht nur mit dem gleichen Schlüssel automatisch verglichen. Befunde stehen unten. Die problematischen Verallgemeinerungen stecken teilweise in als richtig markiertem Feedback; ein bestandener Logiktest widerlegt sie nicht.
- Neue, eng begrenzte Auswertung der Antwort-Hinweise: 32 von 32 Lektionsfragen je Feld haben eine eindeutig kürzeste richtige Antwort. Beide Kontrollschlüssel lauten `abcabcabcabcabcabcabcabc`, je achtmal a/b/c. Das ist Quelltext-/Datenanalyse, kein Nutzertest.

### Vorhandene technische Prüfbelege, nicht erneut ausgeführt

[uebernahme-terminus-2026-10-17.md](uebernahme-terminus-2026-10-17.md) dokumentiert einen bestandenen Chromium-Durchlauf aller 16 Lektionen und beider Kontrollen: leer/teilweise/falsch/richtig, Speichern, Reload, Zurück, Reset-Schutz, Speicherfehler und 320/390 CSS-Pixel. Außerdem dokumentiert die Notiz bestandene Inhalts-, Fortschritts-, Startseiten-, Navigations-/Glossar- und Übersichtsregressionstests. Der zugehörige reproduzierbare Browser-Test liegt seit `9220058` in `tests/lf8-lf9-browser.test.js`.

Diese Ergebnisse sind dokumentierte Vorprüfungen, keine in diesem Lauf erneut beobachteten Testerfolge. Ein Testskript und eine Notiz allein sind kein neu ausgeführter Test. Die alte Notiz [pruefung-lf8-lf9-sichtbar.md](pruefung-lf8-lf9-sichtbar.md) mit 14 ungeprüften Lektionen beschreibt den früheren Stand; diese konkrete technische Lücke ist laut späterem Bericht geschlossen. Es gibt keinen Anlass, dafür denselben Browserlauf zu wiederholen.

Die technischen Prüfungen beweisen weder fachliche Richtigkeit noch vollständige KMK-Abdeckung. Die dort genannten Grenzen bleiben bestehen: gültiges Reset-Passwort, Screenreader, echter 200-%-Zoom, vollständige Tastaturbedienung, Windows-`file://` und vollständige visuelle Abnahme sind durch diesen Bericht nicht nachgeprüft.

## Quellen

1. **KMK-Rahmenlehrplan vom 13.12.2019**, gedruckte Seiten 19 und 20: https://www.kmk.org/fileadmin/Dateien/pdf/Bildung/BeruflicheBildung/rlp/Fachinformatiker_19-12-13_EL.pdf. Maßstab der folgenden Abdeckungsmatrix. Die Prüfung bezieht sich auf diese abgerufene Fassung, nicht auf sämtliche Länderlehrpläne.
2. **DSGVO im amtlichen EUR-Lex-Text**: https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX:32016R0679. Gelesene Belegstellen: Art. 4 Nr. 1 (identifizierte/identifizierbare natürliche Person), Art. 5 Abs. 1 Buchst. b/c (Zweckbindung/Datenminimierung), Art. 6 Abs. 1 (Rechtmäßigkeit), Art. 32 (Sicherheit); Erwägungsgründe 26 und 30 (anonyme Informationen bzw. Online-Kennungen). Keine Rechtsberatung und keine Festlegung einer Rechtsgrundlage für ein reales Café.
3. **RFC 2131, Einleitung**: https://www.rfc-editor.org/rfc/rfc2131.html. DHCP als konkretes Beispiel eines Dienstes mit Protokoll, Client/Server-Modell und Konfigurationsfunktion; die Quelle verlangt keine DHCP-Lektion als einzig zulässige KMK-Umsetzung.
4. **RFC 2979, Einleitung und Abschnitt 2**: https://www.rfc-editor.org/rfc/rfc2979.html. Firewall-Funktionen können Verkehr anhand von Quellen, Zielen und Ports filtern. Grundlage gegen die pauschale Gleichsetzung „Dienst auf der Kasse = automatisch Gästezugriff“. Das Dokument ist ausdrücklich **Informational**, kein Internetstandard; es wird nicht als Norm ausgegeben.

## Abdeckungsmatrix LF8

„Teilweise“ bedeutet: Thema im Einstieg erkennbar, aber die geforderte Handlung wird nicht ausreichend demonstriert oder geprüft. Multiple Choice allein belegt keine praktische Handlungskompetenz.

| KMK-Kompetenz, Seite 19 | Vorhandener Beleg | Bewertung und fehlender Nachweis |
| --- | --- | --- |
| Datenquellen ermitteln; Struktur, rechtliche Bedingungen, Zugriffsmöglichkeiten und -mechanismen analysieren | `js/lf8-quellen.js`, `lf8-struktur.js`, `lf8-recht.js` | Teilweise. Quelle/Zweck, Feldnamen, Format und Leseberechtigung werden unterschieden. Kein konkreter Datenexport, kein Beispielschema und kein Zugriffsmechanismus. Zweck/Berechtigung und Rechtsgrundlage werden nicht sauber getrennt. |
| Heterogene Quellen passend zum Auftrag auswählen | `js/lf8-auswahl.js` | Teilweise. Kasse und Tabellenblatt gegenüber nicht benötigter Lieferantenliste. Keine tatsächlich vorliegenden Datensätze, an denen Format- und Qualitätsunterschiede geprüft werden. |
| Bereitstellungskonzept unter Informationssicherheit entwickeln | `js/lf8-konzept.js` | Teilweise. Empfänger, Aktualisierung und Schutzziele genannt. Kein durchgearbeitetes Schnittstellen-/Feldmapping, keine konkrete Fehlerbehandlung oder technische Schutzmaßnahme im Ablauf. |
| Konzept arbeitsteilig, auch ortsunabhängig, mit geeigneten Werkzeugen implementieren | Keine entsprechende Umsetzung; `lf8-aufbereiten.js` bleibt bei Textregeln | Fehlt. Weder Import/Transformation noch ein prüfbares Endprodukt, Zusammenarbeit oder Arbeitsteilung. Der Ausschluss echter Produktivdaten verhindert kein isoliertes Lernbeispiel, ist aber keine Implementierung. |
| Endprodukt mit Handhabungsdokumentation, auch fremdsprachlich, übergeben | `js/lf8-uebergabe.js` | Teilweise. Eine Übergabenotiz wird beschrieben. Endprodukt, konkrete Bedienungsanleitung und fremdsprachlicher Anteil fehlen. |
| Werkzeugwahl für arbeitsteilige Entwicklung und Dokumentationsqualität reflektieren | `js/lf8-reflexion.js` | Teilweise. Nachvollziehbarkeit und Werkzeugwahl werden angesprochen; kein realisierter Entwicklungsprozess oder Vergleich anhand eines Ergebnisses. |
| Übergreifend: Quellen zusammenführen, aufbereiten und zur Nutzung bereitstellen | `js/lf8-aufbereiten.js` | Nur Orientierung. Richtig: fehlend ist nicht Null, Währung nicht erfinden, Bedeutung erhalten. Kein konkreter Datensatz mit Datumsschlüssel, Mehrfachschichten, fehlenden Werten und überprüfbarem Ausgabeformat. |

Alle acht LF8-Lektionen sind berücksichtigt. Die 24 Kontrollfragen wiederholen jeweils drei Fragen pro Lektion; sie schließen die Handlungslücken nicht.

## Abdeckungsmatrix LF9

| KMK-Kompetenz, Seite 20 | Vorhandener Beleg | Bewertung und fehlender Nachweis |
| --- | --- | --- |
| Anforderungen mit Kunden ermitteln | `js/lf9-anforderung.js`, `lf9-ist.js` | Teilweise. Nutzerzahl und Trennung sind konkret; Ist/Soll wird getrennt. „Höchstens zehn Gäste“ bleibt hinsichtlich Auslegung als Kapazität oder harte Zugangssperre unklar. |
| Komponenten/Dienste hinsichtlich Eigenschaften, Funktionen, Leistung und Sicherheit recherchieren; auch fremdsprachliche Quellen auswerten | `js/lf9-dienste.js` | Überwiegend offen. „Gästezugang“ ist ein Nutzen, aber keine ausgearbeitete Dienst-/Komponentenauswahl. Keine Rechercheaufgabe, keine Quelle für Lernende, keine fremdsprachliche Auswertung. DHCP gemäß RFC 2131 wäre ein mögliches konkretes Beispiel, nicht die einzig zulässige Umsetzung. |
| Dienste, Netze und Infrastruktur mit internen/externen Ressourcen planen | `js/lf9-infrastruktur.js` | Teilweise. Die gewünschte Grenze wird beschrieben. Kein konkreter Plan mit Komponentenrollen, Ressourcen, Dienstwegen und nachvollziehbaren Freigabe-/Sperrregeln. |
| Nachhaltigkeit, technische und wirtschaftliche Eignung vergleichen | `js/lf9-eignung.js` | Teilweise. Nicht benötigte Beschaffung vermeiden ist sinnvoll. Kein belastbarer Kosten-/Ressourcenvergleich; Energiebedarf, Nutzungsdauer, Wartbarkeit und Erweiterbarkeit werden nicht bewertet. Die Netzwerkvarianten sind technisch unterbestimmt. |
| Netzwerke/Infrastruktur installieren und konfigurieren; Dienste implementieren | Kein Nachweis; die Texte schließen Einrichtung ausdrücklich aus | Fehlt. Ein sicheres simuliertes oder isoliertes Lernbeispiel könnte diese Handlungen ermöglichen, ohne am Produktivnetz zu arbeiten. |
| Standards einhalten, Funktionsprüfungen und Messungen durchführen, dokumentieren | `js/lf9-standard.js` | Unzureichend. Eine Kundenregel wird „Standard“ genannt; technische Spezifikation/Protokollstandard fehlen. Prüffragen sind keine durchgeführten Messungen. Es gibt keine Ergebnistabelle oder Messdokumentation. |
| Anforderungen, Datensicherheit und Datenschutz beurteilen | `js/lf9-schutz.js` | Teilweise, mit Korrekturbedarf. Trennung und Verzicht auf unnötige Namenslisten passen. „Keine Namensliste“ beweist keine Freiheit von Personenbezug; Protokoll-/Online-Kennungen bleiben unerörtert. |
| Kundenzufriedenheit, Zukunftsfähigkeit und Vorgehen reflektieren | `js/lf9-zukunft.js` | Teilweise. Anforderungen und Änderungen dokumentieren ist sinnvoll. Keine Kundenrückmeldung, kein umgesetztes Ergebnis und keine belastbare Kapazitäts-/Erweiterungsbewertung. |

Alle acht LF9-Lektionen sind berücksichtigt. Die 24 Kontrollfragen prüfen die geschilderten Papierentscheidungen, nicht die vollständige Kompetenz „Netzwerke und Dienste bereitstellen“.

## Konkrete Befunde vor einer Freigabe

### F1 – LF8: Auftrag, Berechtigung und Personenbezug trennen

**Stellen:** `js/lf8-recht.js`, Theorie „Zweck bindet“/„Namen sind Personen“, q2-Feedback; `js/lf8-kontrolle.js`, Frage 8 und Hinweis.

Der Satz „Die Caféleitung darf ... weil der Auftrag genau das verlangt“ ist als definierte Empfängerrolle im Beispiel verständlich, aber keine Rechtsgrundlage. Ein Kundenauftrag ersetzt nicht die Prüfung der Rechtmäßigkeit einer Verarbeitung personenbezogener Daten. Bei wirklich erfundenen Namen ohne Bezug zu identifizierbaren realen Menschen liegt wiederum nicht allein wegen eines Namens tatsächlich personenbezogenes Datum vor. Das Lernmodell darf Rollen mit Personenbezug simulieren, muss diesen Unterschied aber sagen (DSGVO Art. 4 Nr. 1, Art. 6; Erwägungsgrund 26).

**Abnahmekriterium:** Modellannahme, interne Leseberechtigung und rechtliche Prüfung ausdrücklich auseinanderhalten. Kein pauschales „erfundener Name = echte betroffene Person“. Frage und Kontrollfeedback müssen dieselbe korrigierte Unterscheidung vermitteln. Keine reale Erlaubnis fingieren.

### F2 – LF9: Zusätzlicher Dienst macht die Kasse nicht automatisch erreichbar

**Stellen:** `js/lf9-dienste.js`, q2-Feedback; `js/lf9-kontrolle.js`, Frage 8/Hinweis; `js/lf9-eignung.js`, Variantenbeschreibung und Feedback.

„Ein neuer Dienst an der Kasse würde diese Grenze aufheben“ folgt nicht aus dem Auftrag. Ein nicht beauftragter Dienst fällt wegen fehlenden Bedarfs heraus; seine bloße Existenz hebt eine korrekt durchgesetzte Zugriffstrennung nicht automatisch auf. RFC 2979 beschreibt Verkehrsfilterung als eigene Funktion. Auch „im selben Netz“ allein beschreibt noch nicht sämtliche Zugriffsschutzmechanismen. Soll Variante B unzulässig sein, muss im Beispiel ein erlaubter Gästezugriff oder fehlende geforderte Segmentierung ausdrücklich als Eigenschaft feststehen.

**Abnahmekriterium:** Ablehnung durch fehlenden Bedarf oder konkret verletzte Schutzanforderung begründen. Dienstexistenz, Segmentierung und Zugriffsregeln nicht gleichsetzen. Die Übung benötigt keine echte Firewall-Konfiguration, um den Unterschied richtig zu erklären.

### F3 – LF9: Keine Namensliste bedeutet nicht automatisch keine Personendaten

**Stellen:** `js/lf9-schutz.js`, gesamte Theorie sowie q1/q2-Feedback; `js/lf9-kontrolle.js`, Fragen 19/20.

Das Beispiel darf auf Gästelisten verzichten. Aus diesem Verzicht lässt sich aber nicht ableiten, dass ein realer Gästezugang keine personenbezogenen Daten verarbeitet. Online-Kennungen wie IP-Adressen können Personenbezug haben; Erhebung, Nutzung, Protokollierung und Empfänger müssen passend zum System geprüft werden (DSGVO Art. 4 Nr. 1, Erwägungsgrund 30). Für die Papierübung verarbeitet Samira ohnehin keinen echten Netzwerkverkehr. Das ist eine andere Aussage als ein datenschutzfreier späterer Betrieb.

**Abnahmekriterium:** „Keine zusätzliche Namensliste geplant; technisch anfallende Daten und Speicherfristen vor Umsetzung prüfen.“ Authentisierung/Verschlüsselung nicht als unerwünschte Personendatensammlung darstellen. Keine Rechtsberatung oder erfundene Rechtsgrundlage ergänzen.

### F4 – LF9: Kundenregel und technischer Standard sind nicht dasselbe

**Stellen:** `js/lf9-standard.js`, Lernziel 1, Theorie und q1; `js/lf9-kontrolle.js`, Frage 16.

Die selbst gewählte Regel „Trennung und höchstens zehn Gäste“ ist eine Anforderung bzw. ein Abnahmekriterium. Sie allein belegt nicht die im KMK-Text geforderte Einhaltung technischer Standards. Ein Markenname ist zwar ebenfalls kein Standard; die falsche Gegenüberstellung macht die Kundenregel aber nicht zur technischen Spezifikation. RFC 2131 zeigt ein reales Protokoll als mögliches Gegenbeispiel.

**Abnahmekriterium:** Begriff sauber abgrenzen; eine passende technische Spezifikation samt überprüfbarer Eigenschaft auswählen. Aus einer Fragenliste keine bereits durchgeführte Messung machen.

### F5 – Beide Felder: Antworten lassen sich ohne Fachwissen erraten

**Stellen:** alle 16 Lektionsdateien und beide `*-kontrolle.js`.

Neue Datenauswertung: In **64 von 64 Lektionsfragen** ist die richtige Option die eindeutig kürzeste. Falsche Optionen enthalten oft offenkundig absurde Behauptungen oder mehrere Nebensätze. In **beiden Kontrollen** wiederholt sich exakt die Lösung `a,b,c` achtmal. Dieses Muster ist kein Beweis fachlichen Verständnisses, auch wenn Antworten vollständig und technisch korrekt ausgewertet werden.

**Abnahmekriterium:** Plausible falsche Alternativen, vergleichbare sprachliche Länge, keine verlässlichen Positionsmuster. Lösung und Begründung müssen fachlich eindeutig bleiben. Beim Umordnen Kontrollen, Fortschrittsableitung und Tests konsistent ändern; bestehende gespeicherte Versuche dürfen durch neue Schlüssel nicht still falsch bewertet werden. Ein Ausbaupaket muss deshalb die Daten-/Schlüsselversionierung ausdrücklich berücksichtigen.

### F6 – LF8: Fiktiver Datenfluss ist bisher nicht nachvollziehbar ausführbar

**Stellen:** `js/lf8-reflexion.js`, Theorie „Werkzeug“ („acht erfundene Zeilen“, „Beispieldateien“); `js/lf8-aufbereiten.js`, Theorie und q4.

Die gelesenen Lerntexte zeigen weder die behaupteten acht Zeilen noch nutzbare Beispiel-Dateiinhalte oder ein Ergebnis. „1234,5“ zu „1.234,50“ ist ohne Präzisionsverlust zunächst Formatierung, nicht eine tatsächlich notwendige Rundung. Eine benannte Rechenregel allein macht außerdem keine Summe sachlich sinnvoll: Größen/Einheiten und Mehrfachzeilen müssen passen.

**Abnahmekriterium:** Datensätze direkt bereitstellen oder den Verweis entfernen; an wenigen fiktiven Zeilen Datum, fehlend versus Null, Einheiten und mehrere Schichten pro Tag zeigen. Formatierung von Rundung unterscheiden. Keine vollständige neue Anwendung nötig, um den vorhandenen Einstieg nachvollziehbar zu machen.

### F7 – LF9: Kapazität und räumlicher Zugang sind nicht eindeutig definiert

**Stellen:** `js/lf9-anforderung.js`, „höchstens zehn Gäste“; `js/lf9-standard.js`, Prüfung „nur im Besprechungsraum“ und „auf zehn begrenzt“.

Eine geplante Kapazität für zehn gleichzeitige Geräte ist nicht automatisch eine harte Zugangssperre für Gerät elf. Gästezahl und Gerätezahl können außerdem auseinanderfallen. Der Auftrag nennt zunächst Zugang im Besprechungsraum; „nur dort“ ist eine zusätzliche Einschränkung. Insbesondere eine reine WLAN-Abdeckung wäre kein Beleg einer strikt raumgenauen Zugangssperre.

**Abnahmekriterium:** Vor der Variantenbewertung präzisieren: Nutzer oder Endgeräte, Mindestkapazität oder harte Obergrenze, Nutzungsort oder technische räumliche Sperre. Die Prüfung darf nur die tatsächlich definierten Eigenschaften verlangen.

## Begrenzte nächste Pakete, noch nicht umgesetzt

1. **Fachliche Textkorrektur im vorhandenen Einstieg:** F1–F4, F6/F7 beheben; betroffene Lektionsfragen und Kontrollhinweise mitziehen. Keine neue Lektion, keine Katalogfreigabe. Danach nur betroffene Inhalts-/Fortschrittstests sowie die geänderten sichtbaren Rückmeldungen prüfen.
2. **Lernkontrollen überarbeiten:** F5 einschließlich sicherer Behandlung bestehender Speicherstände. Ein bloßer Buchstabentausch ohne Speicher-/Fortschrittsprüfung reicht nicht.
3. **Kompetenzlücken planen:** Kleine isolierte Datenbereitstellung für LF8 und nachvollziehbares Netzwerk-/Dienstmodell für LF9; Dokumentation, englische Quellenanteile und überprüfbare Ergebnisse mitplanen. Das ist ein Folgeumfang, kein mit diesem Bericht bereits umgesetzter Ausbau.
4. **Erst danach Freigabevorlage:** Behobene Befunde, tatsächliche Tests und verbleibende Einstiegslücken benennen. Dennis entscheidet über den Katalog. Vollständige KMK-Abdeckung darf nicht behauptet werden.

## Warum die Sperre bestehen bleibt

Die älteren Feldpläne nannten zunächst die ausstehende Sichtprüfung. Die spätere Übernahmenotiz ergänzt ausdrücklich Dennis' Freigabe und offene fachliche Grenzen. Die technische Sichtprüfung allein hebt diese Grenze nicht auf. Mit Dennis' aktueller Entscheidung und den hier belegten fachlichen Befunden ist die Sperre sachlich begründet und bleibt unverändert.

Dieser Bericht ist eine quellenbasierte Prüfung durch TERMINUS, keine unabhängige GLaDOS-Abnahme und kein menschlicher Unterrichtstest. Kein anderer Agent wurde dafür erneut eingesetzt. Der Bericht ändert weder vorhandene Prüfprotokolle rückwirkend noch den Produktcode.
