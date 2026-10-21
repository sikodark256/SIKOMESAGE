/* ============================================================
   📨 SERVIDOR DE PUSH — SIKODARK CHAT (v22)
   ============================================================
   ESTE ES EL SERVIDOR QUE MANDA LOS AVISOS CUANDO EL CHAT ESTÁ CERRADO.

   CÓMO INSTALARLO (5 minutos, todo desde el navegador, gratis):
   1) Entrá a https://dash.cloudflare.com y creá una cuenta (gratis)
   2) Menú izquierdo → Workers & Pages → Create → Create Worker
   3) Ponle un nombre (ej: sikodark-push) → Deploy → Edit code
   4) Borrá TODO lo que trae y PEGÁ este archivo entero
   5) Deploy (botón arriba a la derecha) → te da una URL como:
        https://sikodark-push.TU-CUENTA.workers.dev
   6) Copiá esa URL y pegala en index.html, en la línea:
        var PUSH_URL = 'https://sikodark-push.TU-CUENTA.workers.dev';
      (buscá PUSH_URL con Ctrl+F, está arriba cerca de la configuración de Firebase)
   7) Subí el index.html al repo → listo: los avisos llegan aunque
      la PWA esté totalmente cerrada 🎉

   NO NECESITA NADA MÁS: lee las suscripciones de tu Firestore con la
   misma clave pública del chat y manda los avisos cifrados a cada cel.
   ============================================================ */

/* ---- CONFIGURACIÓN (ya viene lista, no toques nada) ---- */
const VAPID_PUB  = 'BIoCuSouVQoW3N4QuFeXiCDjHHItZSxs80A8XzLq7hpF3R2Gja1ippl7HC25vBFC2OM_z1RoYWYuA5tyO1Iczw0';
const VAPID_PRIV = 'MIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQgfIvPk261fEZUCERcmrqk7EHphrnWavPL1xcmwu_GP4ChRANCAASKArkqLlUKFtzeELhXl4gg4xxyLWUsbPNAPF8y6u4aRd0dho2tYqaZexwtubwRQtjjP89UaGFmLgObcjtSHM8N';
const FIREBASE_PROJECT = 'sikodarkradio-26a07';
const FIREBASE_API_KEY = 'AIzaSyC9Q9N1TTqWRUpeh2lo7tGuG8lwTrvbHrA';
const SUBS_COL = 'chat_push_subs';
const CLAVE = 'sikodark-push-2026';              /* tiene que ser igual a PUSH_CLAVE en index.html */
const MAILTO = 'mailto:sikodark-chat@push.local'; /* contacto VAPID (obligatorio, no se muestra) */
const TTL = '2419200';                            /* 28 días de vida del aviso */

/* ---- utilidades base64url ---- */
function b64uDecode(s){
  s = s.replace(/-/g, '+').replace(/_/g, '/');
  while (s.length % 4) s += '=';
  const bin = atob(s);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}
function bufToB64u(buf){
  let bin = '';
  const b = new Uint8Array(buf);
  for (let i = 0; i < b.length; i++) bin += String.fromCharCode(b[i]);
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}
function concat(...arrs){
  let len = 0;
  arrs.forEach(a => len += a.length);
  const out = new Uint8Array(len);
  let o = 0;
  arrs.forEach(a => { out.set(a, o); o += a.length; });
  return out;
}
const TE = s => new TextEncoder().encode(s);

/* ---- HKDF (SHA-256) ---- */
async function hkdf(ikm, salt, info, len){
  const key = await crypto.subtle.importKey('raw', ikm, 'HKDF', false, ['deriveBits']);
  const bits = await crypto.subtle.deriveBits(
    { name: 'HKDF', hash: 'SHA-256', salt: salt, info: info }, key, len * 8);
  return new Uint8Array(bits);
}

/* ---- JWT VAPID (RFC 8292) ---- */
async function vapidJwt(aud){
  const h = bufToB64u(TE(JSON.stringify({ typ: 'JWT', alg: 'ES256' })));
  const p = bufToB64u(TE(JSON.stringify({
    aud: aud,
    exp: Math.floor(Date.now() / 1000) + 43200,
    sub: MAILTO
  })));
  const key = await crypto.subtle.importKey(
    'pkcs8', b64uDecode(VAPID_PRIV),
    { name: 'ECDSA', namedCurve: 'P-256' }, false, ['sign']);
  const sig = await crypto.subtle.sign(
    { name: 'ECDSA', hash: 'SHA-256' }, key, TE(h + '.' + p));
  return h + '.' + p + '.' + bufToB64u(sig);
}

/* ---- cifrado del payload (RFC 8291 · aes128gcm) ----
   Devuelve el cuerpo binario que va al endpoint del navegador */
async function encryptWebPush(payloadStr, sub){
  const uaPub = b64uDecode(sub.p256dh);

  /* par efímero del servidor (uno nuevo por mensaje) */
  const asKeys = await crypto.subtle.generateKey(
    { name: 'ECDH', namedCurve: 'P-256' }, true, ['deriveBits']);
  const uaKey = await crypto.subtle.importKey(
    'raw', uaPub, { name: 'ECDH', namedCurve: 'P-256' }, false, []);
  const secret = new Uint8Array(await crypto.subtle.deriveBits(
    { name: 'ECDH', public: uaKey }, asKeys.privateKey, 256));
  const asPub = new Uint8Array(await crypto.subtle.exportKey('raw', asKeys.publicKey));

  /* PRK_key = HKDF(salt=0^16, IKM=secreto ECDH, info="WebPush: info" || 0x00 || ua || as) */
  const prkKey = await hkdf(
    secret,
    new Uint8Array(16),
    concat(TE('WebPush: info'), new Uint8Array([0]), uaPub, asPub),
    32);

  const salt = crypto.getRandomValues(new Uint8Array(16));
  const cek   = await hkdf(prkKey, salt, concat(TE('Content-Encoding: aes128gcm'), new Uint8Array([1])), 16);
  const nonce = await hkdf(prkKey, salt, concat(TE('Content-Encoding: nonce'),     new Uint8Array([1])), 12);

  /* cuerpo del registro: payload || 0x02 (delimitador, sin relleno extra) */
  const body = concat(TE(payloadStr), new Uint8Array([2]));
  const encKey = await crypto.subtle.importKey('raw', cek, 'AES-GCM', false, ['encrypt']);
  const cipher = new Uint8Array(await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv: nonce, tagLength: 128 }, encKey, body));

  /* encabezado aes128gcm: salt(16) || rs(4) || idlen(1)=65 || clave pública efímera(65) */
  const rs = 4096;
  const header = concat(
    salt,
    new Uint8Array([(rs >>> 24) & 255, (rs >>> 16) & 255, (rs >>> 8) & 255, rs & 255]),
    new Uint8Array([asPub.length]),
    asPub);

  if (cipher.length > rs - 16) throw new Error('payload demasiado grande');
  return concat(header, cipher);
}

/* ---- leer suscripciones de Firestore (REST, clave pública web) ---- */
async function leerSubs(){
  const url = 'https://firestore.googleapis.com/v1/projects/' + FIREBASE_PROJECT +
              '/databases/(default)/documents/' + SUBS_COL + '?pageSize=500&key=' + FIREBASE_API_KEY;
  const r = await fetch(url);
  if (!r.ok) throw new Error('Firestore ' + r.status + ' (¿faltan las reglas de ' + SUBS_COL + '?)');
  const j = await r.json();
  const out = [];
  (j.documents || []).forEach(d => {
    const f = d.fields || {};
    const sv = x => (f[x] && f[x].stringValue) || '';
    const ep = sv('endpoint');
    const p256dh = sv('p256dh');
    const auth = sv('auth');
    if (ep && p256dh && auth) out.push({ id: d.name.split('/').pop(), uid: sv('uid'), endpoint: ep, p256dh: p256dh, auth: auth });
  });
  return out;
}
async function borrarSub(id){
  try {
    await fetch('https://firestore.googleapis.com/v1/projects/' + FIREBASE_PROJECT +
      '/databases/(default)/documents/' + SUBS_COL + '/' + id + '?key=' + FIREBASE_API_KEY,
      { method: 'DELETE' });
  } catch (e) {}
}

/* ---- enviar un push a una suscripción ---- */
async function enviarUno(sub, payload){
  const jwt = await vapidJwt(new URL(sub.endpoint).origin);
  const cuerpo = await encryptWebPush(JSON.stringify(payload), sub);
  const r = await fetch(sub.endpoint, {
    method: 'POST',
    headers: {
      TTL: TTL,
      'Content-Encoding': 'aes128gcm',
      Authorization: 'vapid t=' + jwt + ', k=' + VAPID_PUB,
      'Content-Type': 'application/octet-stream'
    },
    body: cuerpo
  });
  return r.status; /* 201 ok · 404/410 la suscripción murió */
}

/* ---- el worker ---- */
const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Max-Age': '86400'
};
const json = (obj, status) => new Response(JSON.stringify(obj), {
  status: status || 200,
  headers: Object.assign({ 'Content-Type': 'application/json' }, CORS)
});

export default {
  async fetch(req){
    if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: CORS });

    if (req.method === 'GET') {
      /* panel chico para probar que está vivo */
      let cuantas = -1;
      try { cuantas = (await leerSubs()).length; } catch (e) {}
      return json({
        servicio: 'push de SikoChat ✅',
        suscripciones: cuantas,
        firestore: cuantas < 0 ? '❌ no pude leer (revisá las reglas)' : 'ok'
      });
    }

    if (req.method !== 'POST') return json({ error: 'usá POST' }, 405);

    let m;
    try { m = await req.json(); } catch (e) { return json({ error: 'JSON inválido' }, 400); }
    if (m.clave !== CLAVE) return json({ error: 'clave incorrecta' }, 403);
    if (!m.titulo) return json({ error: 'falta el título' }, 400);

    let subs;
    try { subs = await leerSubs(); }
    catch (e) { return json({ error: String(e.message || e) }, 500); }

    /* privado → solo ese usuario · grupo → todos menos el que manda */
    const destino = subs.filter(s => m.para ? s.uid === m.para : s.uid !== m.de);
    if (!destino.length) return json({ ok: true, enviados: 0, nota: 'nadie subscripto todavía' });

    const payload = {
      titulo: m.titulo,
      cuerpo: m.cuerpo || '',
      tag: m.tag || 'siko-push',
      de: m.de || null
    };

    let ok = 0, muertas = [];
    await Promise.all(destino.map(async s => {
      try {
        const st = await enviarUno(s, payload);
        if (st >= 200 && st < 300) ok++;
        else if (st === 404 || st === 410) muertas.push(s.id);
      } catch (e) {}
    }));
    for (const id of muertas) await borrarSub(id); /* suscripciones muertas afuera */

    return json({ ok: true, enviados: ok, total: destino.length, limpiadas: muertas.length });
  }
};

/* exports solo para pruebas locales (no afectan Cloudflare) */
export { encryptWebPush, vapidJwt, b64uDecode, bufToB64u, hkdf, leerSubs };
