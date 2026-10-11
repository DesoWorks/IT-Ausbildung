const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const root = path.resolve(__dirname, '..');
const source = '/home/starnet/projects/desoworks/logo/final-orbital-werkstatt/';
const html = ['index.html','glossar.html','start/IT-Ausbildung starten.html', ...fs.readdirSync(path.join(root,'module')).filter(f=>f.endsWith('.html')).map(f=>'module/'+f)];
for (const file of html) {
  const page = fs.readFileSync(path.join(root,file),'utf8');
  const prefix = file.startsWith('module/') || file.startsWith('start/') ? '../' : '';
  assert.match(page, new RegExp(`href=["']${prefix}assets/desoworks/favicon\\.svg["']`), `${file}: SVG favicon`);
  assert.match(page, new RegExp(`href=["']${prefix}assets/desoworks/favicon-32\\.png["']`), `${file}: PNG favicon`);
  assert.match(page, new RegExp(`href=["']${prefix}assets/desoworks/favicon\\.ico["']`), `${file}: ICO favicon`);
  if (!file.startsWith('start/')) {
    assert.match(page, new RegExp(`src=["']${prefix}assets/desoworks/logo-orbital-werkstatt\\.svg["']`), `${file}: logo`);
    assert.match(page, /<a class="kopf-logo"[^>]*aria-label="DesoWorks – zur Themenübersicht"[^>]*><img[^>]*alt=""/, `${file}: single accessible name`);
  }
}
for (const [sourceName, targetName] of [['logo-hell.svg','logo-orbital-werkstatt.svg'], ['favicon.svg','favicon.svg'], ['favicon-32.png','favicon-32.png'], ['favicon.ico','favicon.ico']]) {
  const a=fs.readFileSync(path.join(source,sourceName)); const b=fs.readFileSync(path.join(root,'assets/desoworks',targetName));
  assert.deepEqual(b,a,`${targetName} copied unchanged`);
}
console.log(`PASS: ${html.length} HTML pages use relative local logo and three favicon variants; all four assets byte-identical to final package.`);
