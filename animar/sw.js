/* SikoAnimar — Service Worker v7 */
const CACHE = 'sikoanimar-v7';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './gif.js',
  './gif.worker.js',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png',
  './icons/apple-touch-icon.png',
  './icons/favicon-32.png'
];

self.addEventListener('install', ev => {
  ev.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', ev => {
  ev.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', ev => {
  const req = ev.request;
  if (req.method !== 'GET') return;               // nunca tocamos POST (uploads IA)
  const url = new URL(req.url);

  // APIs de Pollinations: siempre red, jamás caché
  if (url.hostname.includes('pollinations.ai')) return;

  // Fuentes de Google: red primero, respaldo en caché (stale-while-revalidate)
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    ev.respondWith(
      caches.open(CACHE).then(async c => {
        const cacheada = await c.match(req);
        const red = fetch(req).then(r => {
          if (r && (r.ok || r.type === 'opaque')) c.put(req, r.clone());
          return r;
        }).catch(() => cacheada);
        return cacheada || red;
      })
    );
    return;
  }

  // Mis origen: caché primero, red de respaldo, y guardamos lo nuevo
  if (url.origin === location.origin) {
    ev.respondWith(
      caches.match(req).then(hit => {
        if (hit) return hit;
        return fetch(req).then(r => {
          if (r && r.ok) {
            const copia = r.clone();
            caches.open(CACHE).then(c => c.put(req, copia));
          }
          return r;
        }).catch(() => caches.match('./index.html'));
      })
    );
  }
});
