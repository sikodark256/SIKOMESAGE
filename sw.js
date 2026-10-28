/* ============================================================
   SERVICE WORKER — SIKODARK CHAT (MSN) · chat-v26
   + v26: 🎮 JUEGOS EN LÍNEA DE 2 — damas, ajedrez, ta-te-ti, conecta 4 y piedra-papel-tijera: invitás desde el privado o la lista, juegan en vivo cada uno en su pantalla (colección chat_juegos)
   + v25: botón ← INICIO arriba para volver a los contactos (grupo y privados, cel) y VOLUMEN de sonidos en 🎵 Tonos
   + PUSH ACTIVABLE DESDE EL CHAT: el servidor se configura adentro (🔔 Avisos → 📲 ACTIVAR PUSH) y queda guardado para todos en Firestore; las suscripciones viven en chat_usuarios/{uid}.push (sin colección nueva)
   + BANDEJA LIMPIA TIPO WHATSAPP: sin avisos de "se conectó" y los avisos de mensajes llegan limpios — título = solo el nombre del que escribe, foto del remitente como imagen y grupo como WhatsApp (💬 CHAT GRUPAL · "juan: mensaje")
   + EMPUJE REAL: avisos con la app TOTALMENTE cerrada (el servidor de push manda el aviso cifrado acá)
   + sin duplicado en la lista: tu nombre ya no sale dos veces y los contadores no te cuentan a vos
   + central de avisos: estado del dispositivo, PROBAR AVISO, ayuda Android/iPhone y 🫀 modo siempre activo (anti-siesta)
   + navegación tipo app en el cel: LISTA a pantalla completa ↔ chat completo con botón 👥 CONTACTOS
   + avisos tipo WhatsApp: botón 🔔 en el inicio + aviso de PRUEBA al activar + avisa aunque estés en otra conversación + nombre y carita en el aviso
   + panel del cel estilo MSN + sin contraseña + badge en el ícono
   + todos en la lista (desconectados con "visto hace") + pendientes al entrar + botón CHAT GRUPAL
   + reacciones/me gusta, reenviar, borrar, guardar y favoritos
   Subí este número (v5, v6…) cada vez que cambies el index.html
   ============================================================ */
var CACHE = 'sikodark-chat-v26';
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

/* 📨 v22 · EMPUJE (Web Push): alguien escribió y tu chat está CERRADO → el servidor de push
   manda el aviso cifrado acá. Si el chat está a la vista, se lo pasamos a la página (que sabe
   si estás justo en esa conversación y no molesta); si no, mostramos el aviso directo. */
self.addEventListener('push', function(e){
  var d = {};
  try { d = e.data.json(); }
  catch (err) { try { if (e.data) d = { titulo: '💬 Sikodark Chat', cuerpo: e.data.text() }; } catch (e2) {} }
  e.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(lista){
      var visibles = lista.filter(function(c){ return c.visibilityState === 'visible'; });
      if (visibles.length) {
        lista.forEach(function(c){ c.postMessage({ tipo: 'pushExt', data: d }); });
        return;
      }
      return self.registration.showNotification(d.titulo || '💬 SikoChat', {
        body: d.cuerpo || '',
        icon: d.icono || 'icon-192.png', /* v23: si el que escribe tiene foto, esa es la imagen del aviso (como WhatsApp) */
        badge: 'favicon.png',
        tag: d.tag || 'siko-push',
        renotify: true,
        silent: String(d.cuerpo || '').indexOf('ZUMBIDO') !== -1,
        vibrate: [90, 50, 90],
        data: { de: d.de || null }
      });
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
