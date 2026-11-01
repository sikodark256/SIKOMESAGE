/* ============================================================
   SERVICE WORKER — SIKODARK CHAT (MSN) · chat-v43
   + v43: 🧬 HUELLA DIGITAL — cada dispositivo tiene su código fijo (H-xxxx-xxxx) que NO cambia aunque la persona cambie de nombre: el nombre viejo queda registrado en su ficha (historialNombres) con fecha, y en el panel del admin se ve la huella de cada uno, su historial de nombres, con quién comparte huella (🔗 misma persona con otro nombre) y si volvió después de ser borrada (⚠️ REINCIDENTE, registro chat_usuarios/__borrados__)
   + v42: 🛠️ PANEL DEL ADMINISTRADOR APARTE (panel.html) + ⛔ BAN GLOBAL — página nueva panel.html solo para el dueño (clave adentro del archivo) para ver la gente, banearla globalmente y borrar usuarios o mensajes de una; el chat entiende el ban global (adminBloqueado en la ficha) y los mensajes borrados por el admin desaparecen EN VIVO; panel.html entra en la lista de archivos guardados
   + v40: ✍️ PANEL DE FUENTES EN LÍNEA + 📏 TAMAÑO CON DESLIZADOR + 🧽 INTENSIDAD DE LA GOMA — el botón de fuente de la pizarra abre AHÍ MISMO el panel con TIPO DE LETRA (cada una con su letra) + TAMAÑO con deslizador + COLOR con bolitas, todo junto · la caja de texto flotante quedó ANCLADA AL PAPEL y un toque ya no la corre (umbral de arrastre 6px) · el botón Trazo trae deslizador de TAMAÑO 1–30 con bolita de vista previa y el deslizador nuevo de INTENSIDAD DE LA GOMA 5–100%
   + v38: 👆 FUERZA DEL DEDO + 📦 MOVER CADA CAPA POR SEPARADO + 📱 PIZARRA ORDENADA EN EL CEL — el Dedo (licuar) ahora tiene CONTROL DE INTENSIDAD: botón nuevo "Fuerza" en el riel con deslizador de 5% a 100% (bajo = mezcla sutil, alto = estira fuerte; queda guardado en el celu) · herramienta nueva 📦 M. CAPA: agarrás la capa elegida y la arrastrás ENTERA mientras las demás quedan quietas (se deshace con ↩️) · en el cel la pizarra es una APP: barra arriba, riel de herramientas, el PAPEL ocupa el resto y abajo solo ENVIAR/Cerrar; el ZOOM flota en el rincón del papel y CAPAS+TEXTO+FIGURITAS+COLORES entran como HOJA INFERIOR que sube desde abajo sin empujar nada
   + v37: ✍️ VISTA PREVIA DE LA LETRA + 🎃 FUENTES DE TERROR + 🧷 FIGURITAS — en el panel de la pizarra la sección TEXTO muestra una VISTA PREVIA en blanco donde se ve cómo sale la letra (fuente + tamaño + color, en vivo mientras escribís) · 5 fuentes de TERROR para Halloween (Creepster, Nosifer, Eater, Butcherman, Frijole) en un grupo propio del menú · sección nueva 🧷 FIGURITAS con 24 logitos prearmados (estrellitas, corazones, luna, murciélago, calabaza, fantasma, calavera, araña, telaraña y emojis) que flotan sobre el papel: se arrastran, se agrandan con A+/A− y se fijan con ✔ en la capa elegida
   + v36: 🎨 PALETA EN EL PANEL + 👆 DEDO (LICUAR) + CERRAR ABAJO — la paleta de colores vive ahora EN EL PANEL DE LA DERECHA debajo de las capas y el texto (14 colores + cuadro de degradado + barra arcoíris + bola grande que muestra el color en vivo); herramienta nueva 👆 DEDO para jalar y mezclar el color ya pintado, como en Photoshop; botón Cerrar abajo al lado de ENVIAR DIBUJO; el riel scrollea adentro si la pantalla es baja
   + v35: 🖌️ PIZARRA IGUAL A LA CAPTURA DEL DUEÑO — herramientas en COLUMNA de iconos a la izquierda, ARRIBA deshacer/limpiar/importar/capas/⛶/✕, capas+texto a la derecha y ENVIAR DIBUJO abajo; en el cel el riel se corre de lado (mismas funciones de siempre)
   + v34: 🎙️ RADIO Y COMPARTIR ARRIBA — los botones de la barra de abajo se mudaron como LOGITOS a la barra del título (radio con su logo naranja nuevo) · 📲 COMPARTIR CON IMAGEN: por WhatsApp sale la promo “Dibuja · Escucha Radio · Chatea” + el link (compartir nativo con imagen en el cel; en PC/TV la tarjetita la arma WhatsApp con las meta og del sitio)
   + v33: 🎨 PIZARRA REDISEÑADA (desamontonada, iconos modernos, funciones agrupadas en botones) + ⛶ PANTALLA COMPLETA (PC · TV · cel) + ✍️ HERRAMIENTA DE TEXTO con fuentes, color, ARRASTRAR a cualquier lugar y AGRANDAR + 🧱 CAPAS PLEGABLES con flecha (en el cel ya no tapa la pantalla) + 😀 EMOJIS SIEMPRE A COLOR (Twemoji: en las TVs que los mostraban negros ahora se ven de color) + 🎞️ GIFs INFINITOS con buscador de Tenor (clave gratis en gif-config.js) + importar imagen filtra JPG/PNG/WEBP
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
var CACHE = 'sikodark-chat-v44';
var ARCHIVOS = ['./', './index.html', './panel.html', './chat-config.js', './gif-config.js', './twemoji.min.js', './manifest.json', './icon-192.png', './icon-512.png', './favicon.png', './apple-touch-icon.png', './icon-maskable-192.png', './icon-maskable-512.png', './logo-blanco.png', './logo-negro.png', './logo-cara.png', './logo-radio.png', './compartir-sikochat.jpg'];

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

  /* v33: imágenes de emojis (Twemoji) y GIFs de Tenor — cache primero para que
     carguen rápido y queden guardados (el chat ya necesita internet, esto es una ayuda) */
  if (url.indexOf('cdn.jsdelivr.net') !== -1) {
    e.respondWith(
      caches.match(e.request).then(function(x){
        if (x) return x;
        return fetch(e.request).then(function(r){
          if (r && r.ok) { var cl = r.clone(); caches.open(CACHE).then(function(c){ c.put(e.request, cl); }); }
          return r;
        }).catch(function(){ return x; });
      })
    );
    return;
  }

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
