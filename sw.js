/* ============================================================
   SERVICE WORKER — SIKODARK CHAT (MSN) · chat-v34
   + v34: 🔤 TEXTO CON FUENTES + PANELES QUE SE CIERRAN — herramienta TEXTO nueva (la T): tocás el papel, escribís y queda pintado en la capa elegida con tu color y la fuente elegida (Montserrat, Arial, Impact, Cómic… tamaño 14–72; los selectores viven en el panel de capas junto al color y también dentro del cartel de escribir) · el panel de CAPAS tiene FLECHITA para cerrarlo (en el cel el cajón tapaba la pantalla y no se podía sacar) y además se cierra tocando afuera; en PC/TV la flechita lo pliega y el botón de capas de la barra lo reabre · IMPORTAR IMAGEN abre el selector por defecto en JPG, PNG o WEBP (y si elegís otro formato avisa)
   + v33: 🎨 PIZARRA MODERNA + PANTALLA COMPLETA — barra superior con iconos SVG (deshacer/limpiar/importar/capas/⛶/cerrar), herramientas en columna con iconos modernos, color en UN botón que abre la paleta + selector adentro, zoom flotante sobre el papel, capas a la derecha (cajón en el cel) y ⛶ pantalla completa real para PC y TV
   + v32: 🔍 ZOOM + PAPEL BLANCO EN LA PIZARRA — hoja de dibujo BLANCA como la imagen de referencia, botones 🔍➕/🔍➖ con porcentaje (100% → 800%) y ⤢ Ajustar; con zoom el papel se arrastra con ✋ Mover, en el cel se estira con 2 dedos y en PC Ctrl+rueda acerca al punto del puntero; desde 300% píxeles grandes para detalle
   + v31: 🎨 PIZARRA PRO CON CAPAS — 🧱 capas de verdad (ojito para ver/ocultar, ➕ nueva, 🗑️ borrar, miniatura, hasta 6) · 🖌️ brocha con cerdas · 💨 difuminado tipo aerógrafo · 🎨 selector de color con cuadro de degradado + barra arcoíris · 🖼️ importar imagen a una capa de abajo para calcar · goma que borra la capa elegida · deshacer por capa · al mandar se aplanan las capas visibles
   + v30: 🔀 PROYECTO PROPIO DE FIREBASE PARA EL CHAT — la config vive ahora en chat-config.js (archivo aparte): pegás las claves de un proyecto nuevo y el chat deja de depender de las reglas de la radio para siempre; sin cambiar el archivo sigue todo igual (respaldo) y ACTIVAR PUSH copia el servidor con el proyecto nuevo solo
   + v29: 👥 LOS CONTACTOS NO SE BORRAN MÁS — el chat tenía una limpieza que borraba de Firebase a los contactos sin entrar hace más de 24 horas (por eso la lista quedaba solo con los que escribían): ahora quedan SIEMPRE con su "visto hace"
   + v28: 📺 ARREGLO PARA TV — en televisores con navegador viejo el tablero salía APLASTADO (una tira chata): ahora las casillas se cuadran solas midiendo el ancho real (funciona en cualquier TV, PC o cel) y la mesa grande arranca desde 900px
   + v27: 🏁 botón TERMINAR la partida en curso (la cierra para los dos, al otro le queda la revancha) · las partidas que cerrás YA NO se reabren solas al recargar (queda guardado en tu dispositivo) · 📺 la mesa de juego se agranda en PC/TV
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
var CACHE = 'sikodark-chat-v34';
var ARCHIVOS = ['./', './index.html', './chat-config.js', './manifest.json', './icon-192.png', './icon-512.png', './favicon.png', './apple-touch-icon.png', './icon-maskable-192.png', './icon-maskable-512.png', './logo-blanco.png', './logo-negro.png', './logo-cara.png'];

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
