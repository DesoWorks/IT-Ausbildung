/* Minimaler CDP-Client über WebSocket (ohne Abhängigkeiten) für headless Chrome auf :9223. */
const net = require('node:net'), crypto = require('node:crypto'), http = require('node:http');

function getJson(p) {
  return new Promise((resolve, reject) => http.get('http://127.0.0.1:9223' + p, r => {
    let s = ''; r.on('data', x => s += x); r.on('end', () => resolve(JSON.parse(s)));
  }).on('error', reject));
}

function connect(url) {
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    const c = net.connect(+u.port, u.hostname, () => {
      const key = crypto.randomBytes(16).toString('base64');
      c.write(`GET ${u.pathname}${u.search} HTTP/1.1\r\nHost: ${u.host}\r\nUpgrade: websocket\r\nConnection: Upgrade\r\nSec-WebSocket-Key: ${key}\r\nSec-WebSocket-Version: 13\r\n\r\n`);
    });
    let buf = Buffer.alloc(0), up = false, id = 0;
    const waits = new Map();
    const send = (method, params = {}) => new Promise((res, rej) => {
      const n = ++id; waits.set(n, res);
      const p = Buffer.from(JSON.stringify({ id: n, method, params }));
      let h;
      if (p.length < 126) h = Buffer.from([129, 128 | p.length]);
      else if (p.length < 65536) h = Buffer.from([129, 254, p.length >> 8, p.length & 255]);
      else { h = Buffer.alloc(10); h[0] = 129; h[1] = 255; h.writeBigUInt64BE(BigInt(p.length), 2); }
      const m = crypto.randomBytes(4), o = Buffer.alloc(h.length + 4 + p.length);
      h.copy(o); m.copy(o, h.length);
      for (let i = 0; i < p.length; i++) o[h.length + 4 + i] = p[i] ^ m[i % 4];
      c.write(o);
      setTimeout(() => rej(Error('CDP timeout ' + method)), 8000);
    });
    c.on('data', d => {
      buf = Buffer.concat([buf, d]);
      if (!up) {
        const i = buf.indexOf('\r\n\r\n'); if (i < 0) return;
        up = true; buf = buf.subarray(i + 4);
        resolve({ send, close: () => c.destroy() });
      }
      while (buf.length >= 2) {
        let n = buf[1] & 127, o = 2;
        if (n === 126) { if (buf.length < 4) return; n = buf.readUInt16BE(2); o = 4; }
        else if (n === 127) { if (buf.length < 10) return; n = Number(buf.readBigUInt64BE(2)); o = 10; }
        if (buf.length < o + n) return;
        const opcode = buf[0] & 15;
        const p = buf.subarray(o, o + n);
        buf = buf.subarray(o + n);
        if (opcode === 1) {
          const x = JSON.parse(p.toString());
          if (x.id && waits.has(x.id)) { waits.get(x.id)(x); waits.delete(x.id); }
        }
      }
    });
    c.on('error', reject);
  });
}

module.exports = { getJson, connect };
