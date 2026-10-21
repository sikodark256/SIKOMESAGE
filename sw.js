/* ============================================================
   SERVICE WORKER — SIKODARK CHAT (MSN) · chat-v20
   + central de avisos: estado del dispositivo, PROBAR AVISO, ayuda Android/iPhone y 🫀 modo siempre activo (anti-siesta)
   + navegación tipo app en el cel: LISTA a pantalla completa ↔ chat completo con botón 👥 CONTACTOS
   + avisos tipo WhatsApp: botón 🔔 en el inicio + aviso de PRUEBA al activar + avisa aunque estés en otra conversación + nombre y carita en el aviso
   + panel del cel estilo MSN (mi tarjeta + CHAT GRUPAL grande) + sin contraseña + badge en el ícono
   + todos en la lista (desconectados con "visto hace") + pendientes al entrar + botón CHAT GRUPAL
   + reacciones/me gusta, reenviar, borrar, guardar y favoritos
   Subí este número (v5, v6…) cada vez que cambies el index.html
   ============================================================ */
var CACHE = 'sikodark-chat-v20';
var ARCHIVOS = ['./', './index.html', './manifest.json', './icon-192.png', './icon-512.png', './favicon.png', './apple-touch-icon.png', './icon-maskable-192.png', './icon-maskable-512.png', './logo-blanco.png', './logo-negro.png', './logo-cara.png'];

self.addEventListener('install', function(e){
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE).then(function(c){
      return c.addAll(ARCHIVOS).catch(function(){
        /* si falta algún archivo, cacheo uno por uno para no quedarme sin nada */
        return Promise.all(ARCHIVOS.map(function(u){ return c.add(u).catch(function(){}); }));
      });
    })
  );
});

self.addEventListener('activate', function(e){
  e.waitUntil(
    caches.keys().then(function(keys){
      return Promise.all(keys.filter(function(k){ return k !== CACHE; }).map(function(k){ return caches.delete(k); }));
    }).then(function(){ return self.clients.claim(); })
  );
});

/* Clic en una notificación → abrir/enfocar el chat.
   Si el aviso era de un privado, le paso a quién abrir (data.de) */
self.addEventListener('notificationclick', function(e){
  e.notification.close();
  var data = e.notification.data || {};
  e.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(lista){
      for (var i = 0; i < lista.length; i++) {
        var c = lista[i];
        if ('focus' in c) {
          c.focus();
          if (data && data.de) c.postMessage({ tipo: 'notiPriv', de: data.de });
          return;
        }
      }
      return self.clients.openPage('./');
    })
  );
});

self.addEventListener('fetch', function(e){
  var url = e.request.url;

  if (e.request.method !== 'GET') return;

  /* NUNCA cachear datos de Firebase / Google */
  if (url.indexOf('googleapis.com') !== -1 || url.indexOf('gstatic.com') !== -1 || url.indexOf('firebaseio.com') !== -1) return;

  /* Navegación: primero red, con respaldo de cache (así el update entra solo) */
  if (e.request.mode === 'navigate') {
    e.respondWith(
      fetch(e.request).then(function(r){
        var cl = r.clone();
        caches.open(CACHE).then(function(c){ c.put(e.request, cl); });
        return r;
      }).catch(function(){
        return caches.match(e.request).then(function(x){ return x || caches.match('./index.html'); });
      })
    );
    return;
  }

  /* Resto: cache primero, con actualización en segundo plano */
  e.respondWith(
    caches.match(e.request).then(function(x){
      if (x) {
        fetch(e.request).then(function(r){
          if (r && r.ok && url.indexOf(self.location.origin) === 0) {
            var cl = r.clone();
            caches.open(CACHE).then(function(c){ c.put(e.request, cl); });
          }
        }).catch(function(){});
        return x;
      }
      return fetch(e.request).then(function(r){
        if (r && r.ok && url.indexOf(self.location.origin) === 0) {
          var cl2 = r.clone();
          caches.open(CACHE).then(function(c){ c.put(e.request, cl2); });
        }
        return r;
      });
    })
  );
});
