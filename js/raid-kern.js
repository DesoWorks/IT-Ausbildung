/* Eigenständiges klassisches RAID-Lehrmodell. Dezimal-TB, keine Gerätezugriffe. */
(function (root) {
  'use strict';
  const MIN = { '0': 2, '1': 2, '5': 3, '6': 4, '10': 4, '50': 6, '60': 8 };
  function berechne(eingabe) {
    const e = eingabe || {}, level = String(e.level), disks = e.disks;
    const fehler = [];
    if (!Object.hasOwn(MIN, level)) fehler.push('Bitte ein unterstütztes RAID-Level wählen.');
    if (!Array.isArray(disks) || disks.length < 1 || disks.length > 32) {
      return { gueltig: false, fehler: fehler.concat('Bitte 1 bis 32 Laufwerke angeben.') };
    }
    const ids = new Set();
    for (const d of disks) {
      if (!d || typeof d.id !== 'string' || !d.id.trim() || ids.has(d.id)) fehler.push('Laufwerks-IDs müssen eindeutig und nicht leer sein.');
      else ids.add(d.id);
      if (!d || typeof d.tb !== 'number' || !Number.isFinite(d.tb) || d.tb <= 0 || d.tb > 1000000) fehler.push('Jede Kapazität muss eine endliche Zahl größer als 0 und höchstens 1000000 TB sein.');
    }
    if (Object.hasOwn(MIN, level) && disks.length < MIN[level]) fehler.push('RAID ' + level + ' benötigt im Lehrmodell mindestens ' + MIN[level] + ' Laufwerke.');
    const nested = ['10', '50', '60'].includes(level);
    let groups;
    if (nested) {
      groups = e.groups;
      if (!Array.isArray(groups) || groups.length < 2 || !groups.every(g => Array.isArray(g))) {
        fehler.push('Mindestens zwei explizite Laufwerksgruppen angeben.');
        groups = [];
      } else {
        const flat = groups.flat();
        if (flat.length !== disks.length || new Set(flat).size !== flat.length || flat.some(id => !ids.has(id))) fehler.push('Jedes Laufwerk muss genau einer Gruppe zugeordnet sein.');
        const size = level === '10' ? 2 : level === '50' ? 3 : 4;
        if (groups.some(g => g.length < size || (level === '10' && g.length !== 2))) fehler.push('RAID ' + level + ' benötigt ' + (level === '10' ? 'genau zwei Laufwerke je Spiegelgruppe.' : 'mindestens ' + size + ' Laufwerke je Paritätsgruppe.'));
        if (groups.some(g => g.length !== groups[0].length)) fehler.push('Dieses vereinfachte Lehrmodell verwendet gleich große Gruppen. Andere Implementierungen können abweichen.');
      }
    } else groups = [disks.map(d => d && d.id)];
    const failed = e.failed === undefined ? [] : e.failed;
    if (!Array.isArray(failed) || new Set(failed).size !== failed.length || failed.some(id => !ids.has(id))) fehler.push('Ausfälle dürfen nur vorhandene, eindeutige Laufwerks-IDs enthalten.');
    if (fehler.length) return { gueltig: false, fehler };
    const kleinsteTB = Math.min(...disks.map(d => d.tb));
    const rohTB = disks.reduce((s, d) => s + d.tb, 0);
    const limit = level === '0' ? 0 : level === '1' ? disks.length - 1 : ['6', '60'].includes(level) ? 2 : 1;
    const dataMembers = level === '1' ? 1 : nested ? groups.reduce((s, g) => s + g.length - limit, 0) : disks.length - limit;
    const nutzTB = dataMembers * kleinsteTB;
    const ungenutztTB = Math.max(0, rohTB - disks.length * kleinsteTB);
    const overheadTB = disks.length * kleinsteTB - nutzTB;
    const gruppen = groups.map((g, i) => {
      const ausfaelle = g.filter(id => failed.includes(id)).length;
      return { ids: g.slice(), index: i, ausfaelle, toleranz: limit,
        status: ausfaelle > limit ? 'datenverlust' : ausfaelle ? 'degradiert' : 'funktionsfaehig' };
    });
    const status = gruppen.some(g => g.status === 'datenverlust') ? 'datenverlust' : failed.length ? 'degradiert' : 'funktionsfaehig';
    return { gueltig: true, fehler: [], level, minimum: MIN[level], rohTB, nutzTB, overheadTB, ungenutztTB, kleinsteTB, gruppen, status,
      toleranzText: nested ? 'Je Gruppe höchstens ' + limit + ' Ausfall' + (limit === 1 ? '' : 'e') + '. Überschreitet eine Gruppe diese Grenze, ist das gesamte Array im Modell nicht vollständig rekonstruierbar.' : 'Höchstens ' + limit + ' gleichzeitige Laufwerksausfälle im Modell.',
      modell: 'Klassisches gleichgroße-Mitglieder-Modell: Alle Laufwerke nutzen nur die Kapazität der kleinsten Platte im gesamten Array. RAID 1 ist ein N-Wege-Spiegel aller Laufwerke; RAID 10 verwendet Zweier-Spiegel. Keine Spares, Metadaten, Dateisystemkosten oder zusätzlichen Lesefehler. Reale Implementierungen können abweichen. TB sind dezimal, nicht TiB. RAID ersetzt kein Backup.' };
  }
  const api = { berechne, minimum: Object.freeze(MIN) };
  root.RAID_KERN = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
}(typeof globalThis !== 'undefined' ? globalThis : this));
