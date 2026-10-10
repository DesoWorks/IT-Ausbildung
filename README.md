# IT-Ausbildung

Lernmaterial für die Ausbildung zum Fachinformatiker / zur Fachinformatikerin
für Systemintegration.

## Lerneinheit: „Den Computer kennenlernen"

Eine kleine, deutschsprachige Web-App für das erste Lehrjahr (erster Ausbildungsmonat).
Sie setzt keine Vorkenntnisse voraus und dauert ungefähr 10 Minuten.

**Inhalt der Einheit**

1. Begrüßung mit klarem Lernziel
2. Fünf Lernkarten: Computer, Bildschirm, Tastatur, Maus/Touchpad, Netzwerk
3. Zuordnungsübung: Eingabe, Ausgabe oder Verarbeitung?
4. Quiz mit fünf Fragen (je drei Antworten, mit Erklärungen, beliebig oft wiederholbar)
5. Zusammenfassung und eine kleine Beobachtungsaufgabe am Arbeitsplatz

**Eigenschaften**

- Reines HTML, CSS und JavaScript – keine externen Bibliotheken, kein CDN, kein Buildsystem.
- Läuft vollständig lokal im Browser.
- Nutzbar auf Smartphone und Desktop, per Tastatur bedienbar.
- Inhalte hängen nicht allein von Farben ab (zusätzlich Symbole und Text).
- Keine Anmeldung, keine personenbezogenen Daten.
- Fortschritt wird lokal im Browser gespeichert; es gibt eine Schaltfläche zum Zurücksetzen.

## Dateien

```
index.html                      Modulare Startseite (Themenübersicht)
module/computer-grundlagen.html Lerneinheit „Den Computer kennenlernen"
css/styles.css                  Gestaltung der Lerneinheit
css/startseite.css              Zusatzgestaltung der Startseite
js/module-daten.js              Modulliste (Daten) für die Startseite
js/startseite.js                Baut die Startseite aus der Modulliste
js/app.js                       Ablauf: Lernkarten, Übung, Quiz, Fortschritt
start.sh                        Startet einen lokalen Webserver mit Python 3
```

## Startseite und Module ergänzen

Die Startseite (`index.html`) zeigt die drei Ausbildungsjahre. Welche Module
es gibt, steht allein in `js/module-daten.js`. Verfügbare Module sind
anklickbar; alle anderen erscheinen grau, nicht anklickbar und mit „In Kürze“.

Ein Modul ergänzen: HTML-Datei unter `module/` anlegen, den Eintrag in
`js/module-daten.js` auf `status: "verfuegbar"` stellen und `datei` setzen.
Weitere Änderungen am Code sind nicht nötig.

Geplant, aber noch nicht umgesetzt: „IPv4“ und „Subnetting“. Sie erscheinen
als graue Unterthemen „In Kürze“ unter dem Netzwerk-Bereich (LF 3), nicht als
eigene Karten. Dafür gibt es das optionale Feld `unterthemen` im Moduleintrag.

Die Bereichstitel der Startseite sind verständliche Titel; die Nummern (LF …)
verweisen auf die offiziellen Lernfelder.

Datentest: `node tests/startseite.test.js`

## Starten

Voraussetzung: Python 3 ist installiert (`python3 --version`).

```bash
./start.sh
```

Der Server bindet bewusst nur an `127.0.0.1:8080` und ist dadurch **nicht**
automatisch aus dem Internet erreichbar.

Falls das Skript nicht ausführbar ist:

```bash
chmod +x start.sh
./start.sh
```

Alternativ ohne Skript:

```bash
python3 -m http.server 8080 --bind 127.0.0.1
```

## Stoppen

Im Terminal, in dem der Server läuft, die Tastenkombination **Strg + C** drücken.

## Zugriff

### Direkt auf demselben Rechner

Browser öffnen und aufrufen:

```
http://127.0.0.1:8080/
```

### Von deinem eigenen Rechner, wenn die App auf einer VPS läuft

Der Server ist absichtlich nur lokal auf der VPS erreichbar. Damit du ihn
trotzdem sicher von deinem eigenen Rechner aus im Browser öffnen kannst,
baust du einen **SSH-Tunnel** auf. Der Tunnel leitet einen Port deines
eigenen Rechners verschlüsselt auf den Port der VPS weiter.

1. Auf der VPS den Server starten (`./start.sh`), dieses Terminal geöffnet lassen.
2. Auf deinem **eigenen** Rechner ein neues Terminal öffnen und eingeben
   (Platzhalter `BENUTZER` und `VPS-ADRESSE` ersetzen):

   ```bash
   ssh -N -L 8080:127.0.0.1:8080 BENUTZER@VPS-ADRESSE
   ```

   - `-L 8080:127.0.0.1:8080` leitet den lokalen Port 8080 auf `127.0.0.1:8080`
     der VPS weiter.
   - `-N` bedeutet: keine zusätzliche Fernsteuerung öffnen, nur den Tunnel.
   - Das Terminal bleibt offen und „hängt" scheinbar – das ist richtig so,
     solange du den Tunnel brauchst.

3. Nun im Browser auf deinem eigenen Rechner aufrufen:

   ```
   http://127.0.0.1:8080/
   ```

4. Zum Beenden: im Tunnel-Terminal **Strg + C** drücken, danach auf der VPS
   ebenfalls **Strg + C** im Server-Terminal.

> Hinweis: Nutzt du auf deinem eigenen Rechner den Port 8080 bereits, wähle
> links eine andere Zahl, zum Beispiel `9090:127.0.0.1:8080`, und rufe dann
> `http://127.0.0.1:9090/` auf.

## Datenschutz

Die App speichert ausschließlich den Lernfortschritt lokal im Browser
(über `localStorage`). Es werden keine Daten an einen Server gesendet und
keine personenbezogenen Daten erhoben. Über die Schaltfläche
„Fortschritt zurücksetzen" kannst du alle gespeicherten Daten jederzeit löschen.

## Quellen und Hinweis zur Lernstruktur

Die Gliederung der Startseite orientiert sich an den Lernfeldern des
Rahmenlehrplans. Sie ist eine **Orientierung und kein verbindlicher
Monatsplan**; Zuordnung zu den Ausbildungsjahren und Reihenfolge können je
Berufsschule und Betrieb abweichen.

- KMK, Downloadbereich Rahmenlehrpläne:
  https://www.kmk.org/service/servicebereich-berufliche-schulen/downloadbereich-rahmenlehrplaene.html
- Ausbildungsordnung (FIAusbV), Verordnung über die Berufsausbildung zum
  Fachinformatiker und zur Fachinformatikerin:
  https://www.gesetze-im-internet.de/fiausbv/
  (Fachrichtung Systemintegration: §§ 18–25; Ausbildungsrahmenplan in der Anlage)

**Prüfstand der Quellen:** Die FIAusbV-Seite wurde abgerufen und die
Fachrichtung Systemintegration bestätigt. Die Lernfeld-Nummern und -Titel in
`js/module-daten.js` sind **noch nicht** gegen den Originalrahmenlehrplan
(PDF der KMK) abgeglichen und müssen dort verifiziert werden.
