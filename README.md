# 💬 Sikodark Chat — Estilo MSN Messenger

Chat en vivo **aparte** de sikodark radio, con la estética de siempre (negro + naranja `#f59d3d` + Montserrat). Entras solo con tu **nombre + tu carita** (la clave es opcional, más abajo te digo cómo activarla).

- 📺 **TABLERO ARREGLADO PARA TV (v28)**: en varias televisiones el tablero de damas (y de todos los jueguitos) salía **APLASTADO**, como una tira chata — pasa porque el **navegador de la TV es viejo** y no conoce la medida CSS `aspect-ratio` que mantenía cuadradas las casillas. Ahora el chat **mide cada casilla y le pone el alto justo con JavaScript**: casilleros bien cuadrados en **cualquier TV, PC o cel**, y si girás o cambiás el tamaño de la ventana se re-cuadra solo. Además la **mesa grande** ahora arranca desde **900px** de ancho (varios navegadores de TV avisan menos ancho del que tienen)
- 🏁 **TERMINAR LA PARTIDA (v27)**: mientras jugás tenés **🏁 Terminar** al lado de **🚪 Salir** — la partida se cierra **para los dos**: al otro le queda el cartel "🏁 Partida terminada · 🎉 ¡GANASTE!" con su **🔄 REVANCHA** por si quiere la desquite. Y se arregló lo de que **el juego aparecía siempre**: si salís de una partida a medio jugar, **ya no se reabre sola** cuando recargás el chat (queda guardado en tu dispositivo — si el otro mueve, te avisa con una tostadita y volvés tocando **🎮**). Ojo: **Salir** = cerrar del lado tuyo (la partida sigue viva); **Terminar** = cerrarla para los dos
- 📺 **MESA A PANTALLA GRANDE (v27)**: en **PC y TV** el tablero, las fichas, el marcador y los botones de los jueguitos se **agrandan** para aprovechar la pantalla (antes quedaba una ventanita chiquita en el medio)
- 🎮 **JUEGOS EN LÍNEA DE 2 (v26)**: jugá con los demás **sin salir del chat** — **DAMAS**, **AJEDREZ**, **TA-TE-TI**, **CONECTA 4** y **PIEDRA·PAPEL·TIJERA** (al mejor de 3). Tocás el **🎮** en la barra del privado (o el 🎮 junto a cada contacto de la lista), elegís el jueguito y al otro **le salta la invitación tipo llamada** arriba de todo: **✅ ACEPTAR / ✖**. Juegan **en vivo cada uno desde su pantalla** (las jugadas viajan por Firestore, colección `chat_juegos`), con turno marcado, fichas resaltadas, soniditos, resultado y **🔄 REVANCHA**. Si cerraste el chat a mitad de partida, al volver **se retoma sola**. Ojo: esta versión usa una **colección nueva** — agregá el bloque `chat_juegos` de `firestore-reglas.txt` en Firebase, si no las partidas no conectan
- 🔙 **Botón ← INICIO (v25)**: cuando entrás al **chat grupal** o a un **privado**, arriba a la izquierda aparece **← INICIO** — un toque y volvés a la lista de contactos (como la flechita de WhatsApp). En los privados reemplaza al viejo "← CHAT GRUPAL" dentro del cel (de la lista entrás al grupo tocando **💬 CHAT GRUPAL**); en PC todo sigue igual
- 🔊 **VOLUMEN de sonidos y avisos (v25)**: en **🎵 Tonos** ahora hay una **barra de volumen** (0–100%) con botones **− / +** — controla el sonido de los mensajes, el zumbido y las pruebas de tonos, y **se guarda en tu dispositivo**. En **0%** todo queda mudo (y los avisos del chat saltan sin sonido). El volumen del **aviso del celular** cuando el chat está cerrado lo manejás con los **botones de volumen del teléfono**
- 📲 **PUSH ACTIVABLE DESDE EL CHAT (v24)**: el servidor de empuje ahora se configura **ADENTRO del chat, sin editar código y sin volver a subir nada**: 🔔 Avisos → **📲 ACTIVAR PUSH** → **PASO 1** copiás el código del servidor (botón COPIAR) → **PASO 2** lo pegás en Cloudflare (gratis, 5 min) → **PASO 3** pegás la URL que te dio y tocás **GUARDAR Y PROBAR**. La URL queda guardada en **Firestore** (`chat_usuarios/__config__`) y **sirve para todos los que usan el chat**. La Central además **checa el servidor en vivo** y te dice si está OK, si es una versión vieja (habría que re-pegar el código) o si no responde. Las suscripciones de cada cel ahora viven en `chat_usuarios/{uid}.push` — **sin colección nueva ni reglas extra de Firestore**
- 🧹 **Bandeja limpia tipo WhatsApp (v23)**: la barra de notificaciones del celu quedó como la de WhatsApp — **se eliminó el aviso “🟢 Fulano se conectó”** (no avisamos más cuando alguien entra: solo llenaba la bandeja), los avisos de mensajes llegan **limpios**: el título es **solo el nombre del que escribe** (sin caritas ni corazones) y **su foto de perfil** es la imagen del aviso; el grupo llega como WhatsApp: arriba **💬 CHAT GRUPAL** y abajo **“juan: hola”**. Si el chat está a la vista, el aviso chico de “se conectó” queda adentro como siempre. **Ojo con la dirección** (`github.io`): ese rótulo lo pinta el **navegador** en cada aviso web por seguridad (para saber de qué sitio viene) y **no se puede sacar por código** — si instalás la app (⋮ → Instalar aplicación), Chrome puede mostrar **SikoChat** en su lugar
- 📨 **PUSH REAL con la app cerrada (v22)**: cada cel se **suscribe al empuje** (Web Push con llaves VAPID) y cuando alguien escribe, un **servidorcito gratis** (Cloudflare Worker — desde la v24 se activa desde el chat, mirá la bullet de arriba) manda el aviso cifrado **aunque la PWA esté totalmente cerrada** — el único requisito para que lleguen con la app cerrada. Mientras no lo actives, el chat sigue funcionando igual. La **Central de Avisos** muestra el estado del empuje 📲 y el botón **PROBAR AVISO** también manda un **🚀 Push de prueba** para verificar el camino completo (cerrá el chat del todo y fijate si llega)
- 🔁 **Sin duplicado en la lista (v21)**: tu nombre aparece **UNA sola vez** — se quitó la fila **“(vos)”** de la lista de contactos **y** la tarjeta repetida que quedaba debajo de CONTACTOS (la que marcaste con la X ✗). Tu **barra de usuario** de arriba es tu tarjeta de siempre: carita + nombre + En línea + tu frase, y tocás tu **carita** para editar el perfil. Los contadores ya no te cuentan a vos: **— N conectados**, **👥 CONTACTOS (N)**, la franja y el botón 👥 marcan a los **demás**. Si todavía no entró nadie más, la lista te lo dice: “Nadie más por acá 😴”
- 📱 **Navegación tipo app en el cel (v19)**: al entrar ves **la lista de contactos a pantalla completa** (tu tarjeta, 💬 CHAT GRUPAL, los conectados y los desconectados — como la ventana de MSN de siempre). **Tocás alguien y la conversación ocupa todo el cel** (con su barra privada y los botones de siempre). Para volver a la lista tocás el botón **👥 CONTACTOS** de la barra de abajo — está **también dentro de los privados**. Y como WhatsApp: mientras estás en la lista **te avisan todos los mensajes** (privados y del grupo). Si girás el cel a horizontal se ve la pantalla completa de PC como siempre
- 🚨 **Central de avisos (v20)**: botón **🔔 Avisos** en la barra — te muestra el **estado real en tu dispositivo** (permiso del navegador, campanita, motor de avisos y si ya probaste el aviso de prueba), un botón **🔔 PROBAR AVISO AHORA**, ayuda paso a paso para **Android e iPhone** y el **🫀 MODO SIEMPRE ACTIVO**: un tono inaudible evita que Chrome “duerma” el chat cuando lo cambiás por otra app, así los avisos **siguen llegando en segundo plano**. Y apenas entrás, el chat te guía solo si algo falta en tu dispositivo
- 🔔 **Avisos tipo WhatsApp (v17/v18)**: en el inicio aparece el botón **🔔 ACTIVAR AVISOS AL CEL** — un toque, das PERMITIR y te llega **al instante un aviso de prueba** para que veas cómo funciona. Cuando alguien te escribe te salta el aviso **en la entrada del cel** (bandeja / pantalla de bloqueo) con su **nombre y su carita** y el mensaje; si era un privado, al tocarlo se abre esa conversación. Y como WhatsApp: si estás mirando otra conversación, el aviso también aparece; si estás justo en la que te escriben, no molesta. Desde v19, si estás en la lista de contactos también avisan los del grupo
- 🚪 **Entrada sin registro**: poné tu nombre, elegí tu carita y adentro. **Sin contraseña** desde la v16 (queda opcional por si la querés de vuelta)
- 📲 **Instalar como app**: en Android/PC aparece solo el botón 📥 INSTALAR (cartelito oficial del navegador). En iPhone el botón te da la receta: Compartir ⬆️ → “Agregar a pantalla de inicio”. Queda como app con su ícono, sin barra del navegador
- 🎨 **Pizarrita Paint (v15)**: igual que el Paint de siempre — ✏️ lápiz, 🖌️ pincel grueso, 🪣 **bote de pintura** (tocás una mancha y se rellena entera del color elegido), 🧽 goma y ↩️ **deshacer** por si se equivoca. 14 colores y 3 grosores con botones más grandes, pensada para que los peques dibujen, pinten y manden su obra al chat
- 🖤🧡 Hecho para la comunidad de la radio
- 📱 **Panel del cel estilo MSN (v16)**: la lista del cel se ve como la ventana de contactos de siempre — **tu barra de usuario arriba** (carita, nombre, En línea/Ausente y tu mensaje personal “hola”; tocás tu carita y editás tu perfil — desde la v21 la tarjeta vieja del panel se retiró porque repetía lo mismo), el botón grande **💬 CHAT GRUPAL**, los conectados con su estado y la sección **DESCONECTADOS** con “visto hace”. En PC/TV el panel queda exactamente como estaba
- 📲 **Puntito de mensajes sin leer en el ícono (v16)**: con el chat instalado como app, el ícono muestra el **número de privados sin leer** mientras la app está viva en segundo plano (Android/PC con Chrome)
- 📳 Zumbido (timbre) con sacudida de pantalla, sonido y **vibración del cel**
- 😀 34 emoticons + 🎟️ 24 stikers grandes + 🎞️ 8 GIFs animados propios (carpeta `gifs/`)
- 📷 Mandar **fotos y GIFs de la galería** del cel (se achican solos) — botón 📷 Foto/GIF o botón 📂 dentro de la pestaña GIFs: se abre el explorador, elegís la imagen y la mandás
- 📻 **Radio en vivo dentro del chat**: botón 📻 Radio con mini-player (play/pausa + la canción que suena al aire) y botón 📨 para **compartir la radio al chat**: aparece una tarjeta y cualquiera toca 🎧 ESCUCHAR y se sintoniza sin salir del chat
- 📤 **Compartir el chat por WhatsApp** (botón 📤): abre el compartir del celu o WhatsApp directo con el link del chat + la radio
- 🎨 **Modos de diseño**: botón 🎨 Tema para cambiar entre **modo oscuro** y **modo claro**, y elegir el **color principal** (naranja, verde, celeste, violeta, rosa o rojo). Se guarda en cada dispositivo y también pinta la pantalla de ingreso
- 💙 **Logo SiKO CHAT en todo**: versión transparente **naranja** en la pantalla de bienvenida (como en la referencia), versión oscura para el modo claro y la carita en la barra de título; íconos de app y favicon
- 🧹 **Portada limpia (v13)**: la pantalla de ingreso quedó sin carteles de más — solo el logo, tu nombre, la clave y tu carita. Y el logo ahora se ve **un poco más chico** para que todo entre mejor en pantalla
- 👤 **Perfil con foto**: subí tu foto de perfil y **se ajusta sola a la ventanita** (recorte cuadrado, sin estirarse ni repetirse), cambiá tu nombre y tu avatar (botón/círculo arriba a la izquierda)
- 🎵 **Tonos configurables**: elegí el sonido de mensajes y del zumbido, y desde la **v25** también el **VOLUMEN** con una barra deslizable (botón 🎵 Tonos)
- 👥 Panel de conectados en vivo con estados (en línea / ausente / escribiendo…)
- 📱 **Conectados siempre a la vista en el cel**: en vertical, arriba del chat sigue la franja de chips con quien está conectado (punto verde/naranja, carita y 🔴 de mensajes sin leer); tocás un chip y abrís su privado. Desde la **v19** la lista ya no es un cajón: es una **pantalla propia** a la que volvés con 👥 CONTACTOS
- ❤️ **Reacciones estilo WhatsApp (¡me gusta!)**: tocá el botón **⋯** junto a cualquier mensaje (foto, comentario, dibujo, stiker o GIF) y elegí ❤️ 😂 😮 😢 👍 o 🔥. Debajo de la burbuja aparecen los chips con la cuenta (❤️ 2) y quién reaccionó — tocás tu chip y la quitás
- ↪️ **Reenviar**: en el mismo menú ⋯ mandás el mensaje **al grupo o en privado** a cualquiera conectado. Lo reenviado marca “↪️ reenviado”
- 🗑️ **Borrar**: borrás **tus propios** mensajes para todos; queda el cartel “🚫 Este mensaje fue eliminado” como en WhatsApp
- 💾 **Guardar imágenes**: fotos, dibujos y GIFs se descargan a tu dispositivo (botón 💾 del menú ⋯ o de la imagen ampliada). En iPhone: mantener apretada la imagen → Guardar
- ⭐ **Guardar en favoritos**: los stikers y GIFs que mandan otros los guardás con ⋯ → ⭐ y quedan en la pestaña **⭐ Guardados** del picker para usarlos vos también
- 👻 **Todos en la lista (v14)**: los usuarios aparecen **aunque estén desconectados** — el panel los muestra abajo con “⚪ Visto hace X”. Le escribís igual y cuando entre le salta el aviso “💬 N mensajes nuevos” + el 🔴 en tu nombre. Si tiene el chat abierto en segundo plano, le llega la notificación al toque
- 💬 **Botón CHAT GRUPAL (v14)**: para volver de un privado a la sala de todos hay un botón grande **← CHAT GRUPAL** arriba, un chip **💬 GRUPO** primero en la franja del cel y una fila **💬 CHAT GRUPAL** arriba del panel de contactos. Se acabó la flechita chiquita que no se veía. Y si le hablás a alguien desconectado, la barra te avisa “⚪ desconectado — le llega cuando entre”
- 🔒 **Chat privado 1 a 1**: tocá cualquier usuario del panel (o su 💬) y abrís una conversación aparte que solo ven ustedes dos, con aviso de mensajes sin leer (🔴) y zumbido privado. Botón **← CHAT GRUPAL** para volver a la sala de todos
- 🔔 **Notificaciones estilo WhatsApp**: con el chat en segundo plano (otra app, otra pestaña o el cel bloqueado) te llega el aviso del sistema — mensajes, privados 🔒 y zumbidos 📳 (desde la v23 solo avisos de mensajes, limpios y sin “se conectó”). Tocás el aviso y saltás al chat (si era privado, se abre solo esa conversación). La campanita 🔔 de la barra de arriba las enciende o apaga (y desde la v17/v18 funciona de verdad: antes un botón decorativo le pisaba el clic)

### 🚨 Si NO te llega la notificación, arreglalo así (v20: desde el chat mismo)
Tocá el botón **🔔 Avisos** de la barra de abajo (está también dentro de los privados) — la **CENTRAL DE AVISOS** te muestra qué está fallando:
1. Mirá la fila **permiso del navegador**: si dice ⛔ BLOQUEADO → tocá el candado 🔒 junto a la dirección → **Notificaciones → Permitir**. Si dice ❓ → tocá **🔓 PERMITIR AVISOS EN ESTE CEL**
2. Tocá **🔔 PROBAR AVISO AHORA** — tiene que aparecerte **al instante** en la entrada del cel. Si aparece, todo el camino está bien
3. Si ni la prueba llega: **Ajustes del cel → Aplicaciones → Chrome → Notificaciones → activadas** (en iPhone: primero instalá el chat como app con Compartir ⬆️ → “Agregar a pantalla de inicio”, iOS 16.4+)
4. Prendé el **🫀 MODO SIEMPRE ACTIVO** — si cambiás el chat por otra app, Chrome lo “duerme” y ahí no llegan avisos; con este modo queda despierto (o dejá la radio 📻 sonando, que hace lo mismo)
5. El chat tiene que estar **abierto** (aunque esté en segundo plano) para los avisos de siempre. Con la app **totalmente cerrada** los avisos llegan con el **empuje** 📲 — mirá la sección **📨 Avisos con la app CERRADA** de abajo para activarlo en 5 minutos
6. Para probar con un mensaje real: que **otro dispositivo** te escriba (de vos a vos no te avisás)
- 📲 PWA instalable (manifest + service worker incluidos)

**🔗 URL del chat:** `https://TU-USUARIO.github.io/NOMBRE-DEL-REPO/` — abre directo, sin buscar archivos.

---

## 📦 Estructura

```
/                        ← raíz del repo
├── index.html           ← toda la app (HTML + CSS + JS en un solo archivo)
├── manifest.json        ← configuración PWA
├── sw.js                ← service worker (cache sikodark-chat-v26)
├── logo-blanco.png      ← logo SiKO CHAT transparente (se ve en modo oscuro)
├── logo-negro.png       ← logo para el modo claro
├── logo-cara.png        ← la carita del logo (barra de título)
├── favicon.png          ← logo chico de la pestaña del navegador
├── apple-touch-icon.png ← ícono al agregar a pantalla de inicio en iPhone
├── icon-maskable-192.png┐
├── icon-maskable-512.png┘ ← íconos para Android (zona segura del launcher)
├── icon-192.png         ← ícono PWA
├── icon-512.png         ← ícono PWA
├── gifs/                ← stikers animados del chat (podés agregar los tuyos)
│   ├── hola.gif · jajaja.gif · corazon.gif · musica.gif
│   └── vinilo.gif · vamos.gif · gol.gif · estrellas.gif
├── .nojekyll            ← le dice a GitHub Pages que no toque nada
├── README.md            ← este archivo
├── firestore-reglas.txt ← reglas a pegar en Firebase si usás reglas cerradas
└── PUSH-servidor-cloudflare.js ← el servidor de push (NO se sube a ninguna parte: se pega en Cloudflare, pasos abajo)
```

### 📲 Avisos con la app CERRADA (push real — v24: se activa DESDE el chat, 3 pasos)

Los avisos **mientras el chat está abierto** (aunque esté en otra app) llegan solos. Para que lleguen **con el chat totalmente cerrado** hace falta un mini-servidor de empuje (los navegadores no dejan que una página avise a otra cerrada — es una regla de seguridad de Chrome). Es **gratis** y desde la v24 se activa **desde adentro del chat, una sola vez**:

1. Entrá al chat → botón **🔔 Avisos** de la barra → tocá **📲 ACTIVAR PUSH — avisos con el chat cerrado**
2. **PASO 1**: tocá **📋 COPIAR CÓDIGO DEL SERVIDOR** (el código viaja dentro del chat; el mismo está en el archivo `PUSH-servidor-cloudflare.js` por si lo preferís)
3. **PASO 2**: abrí `dash.cloudflare.com` (cuenta gratis) → **Workers & Pages** → **Create** → **Create Worker** → nombre (ej: `sikodark-push`) → **Deploy** → **Edit code** → borrá todo → **pegá** el código → **Deploy**
4. **PASO 3**: copiá la URL que te dio (tipo `https://sikodark-push.tu-cuenta.workers.dev`) → volvé al chat → pegala en el campo del **PASO 3** → tocá **✅ GUARDAR Y PROBAR**. Tiene que quedar la fila del servidor en **✅ ACTIVO**
5. Listo 🎉 — la URL queda guardada **para todos** (no hay que tocar más archivos ni re-subir nada). Probalo: tocá **PROBAR AVISO** → **cerrá el chat del todo** → si te llega el **🚀 Push de prueba**, anduvo

> **Si ya habías armado el servidor con la v22**: volvé a hacer el PASO 1 y **pegale el código nuevo** (el de v24 lee las suscripciones del lugar nuevo) → Deploy de nuevo — la URL no cambia. La Central te avisa si el servidor está viejo con un cartel ⚠️.
>
> **Reglas de Firestore**: no hay que tocar NADA — las suscripciones viven en `chat_usuarios` (las mismas reglas de siempre) y la URL en `chat_usuarios/__config__`. En **iPhone** el empuje funciona si el chat está **instalado como app** (Compartir ⬆️ → Agregar a inicio, iOS 16.4+). En **Xiaomi/Huawei** si no llega nada: Ajustes → Aplicaciones → Chrome → permití **inicio automático** y Notificaciones.

### 🔑 ¿Cómo cambio la contraseña? (es OPCIONAL)

Desde la **v16 el chat entra SIN clave** (solo nombre + carita). Si la querés de vuelta:

1. Abrí `index.html`, buscá con Ctrl+F la palabra `CLAVE_CHAT` (está cerca del inicio del `<script>`, con un cartelito 🔑).
2. Cambiá la línea `var CLAVE_CHAT = '';` y poné tu clave entre las comillas. Ej: `var CLAVE_CHAT = 'sikolaplata2026';` — el campo reaparece solo en la portada.
3. Commit y listo: la próxima vez que alguien entre le va a pedir la nueva (los que ya la tenían guardada también, así que avisale a la banda).

> Sobre el cartelito rojo **“No es seguro”** del navegador: no tiene nada que ver con la clave del chat — avisa que la página la abriste por `http://` (sin candado). Entrá siempre por `https://sikodark256.github.io/SIKOMESAGE/` (con https delante) y el cartel desaparece.

### 🎞️ ¿Cómo agrego más GIFs?

1. Subí tus archivos `.gif` (chicos, ideal menos de 300 KB) a la carpeta `gifs/` del repo.
2. Abrí `index.html`, buscá `var GIFS = [` (con Ctrl+F) y agregá una línea como `{ n: 'MiGif', f: 'gifs/mi-gif.gif' },`.
3. Commit y listo: aparecen en la pestaña 🎞️ GIFs.

## 🚀 Instalación en GitHub Pages

1. Subí **todos los archivos de este zip a la raíz del repo** (botón *Add file → Upload files*, arrastrá todo, commit).
   - ⚠️ Si antes subiste `chat.html`, borralo del repo para no duplicar (la app ahora se llama `index.html`).
2. Andá a **Settings → Pages** y verificá: *Source: Deploy from a branch* → *Branch: main* → *Folder: / (root)*.
3. Esperá el deploy (1-2 min) y entrá a la URL del Pages: el chat abre solo. ✅

## 🚀 Alternativa: carpeta `chat/` en el repo de la radio

Si lo preferís dentro del sitio de la radio, subí estos mismos archivos a una carpeta `chat/` — como la app se llama `index.html`, al entrar a `tudominio.com/chat/` abre solo.

## 🔥 Firebase

El chat usa el mismo proyecto (`sikodarkradio-26a07`) con tres colecciones nuevas:
- `chat_usuarios` → presencia (quién está conectado, heartbeat cada 20 s, foto de perfil incluida)
- `chat_mensajes` → mensajes (texto, dibujos, fotos, stikers, gifs y zumbidos)
- `chat_juegos` → **partidas de los jueguitos (v26)**: cada partida es un documento con jugadores, turno y tablero — se borran solas a las 6 horas

Si tus reglas de Firestore ya están abiertas (`allow read, write: if true`), no tocás nada. Si no, pegá el contenido de `firestore-reglas.txt`.

## 🧹 Limpieza automática

- Los mensajes se borran solos a las **12 horas** (el primer usuario que entra los elimina).
- Los usuarios fantasma (sin ping hace 24 h) también se borran.
- Las partidas de los **jueguitos** abandonadas hace más de **6 horas** también se borran solas (v26).
- Se guardan en memoria los últimos **80 mensajes** por dispositivo.

## 🔧 Notas técnicas

- El `firebaseConfig` usa solo `apiKey` / `authDomain` / `projectId` / `storageBucket` — a Firestore le alcanza con eso.
- Los dibujos y fotos viajan como imagen JPEG base64 (se achican solos a máx 800 px, ~30-100 KB); los GIFs de galería viajan tal cual si pesan menos de ~650 KB.
- Los sonidos se generan con Web Audio API: cero archivos de audio. Cada usuario elige su tono (se guarda en su cel).
- La radio del chat usa el stream de Zeno.FM (`stream.zeno.fm/xdkqr4btptutv`) con un `<audio>` propio; la canción al aire llega por metadata SSE de Zeno (con fallback de polling cada 10 s).
- El botón 📤 usa `navigator.share` (el compartir nativo del celu); si el navegador no lo tiene, abre WhatsApp con el texto listo (`wa.me`).
- Los chats privados van en la MISMA colección `chat_mensajes` con un campo `para` (el uid del otro). Cada cel solo MUESTRA los suyos. Ojo: como no hay cuentas/login, la privacidad es de la app, no del servidor — privacidad total real necesitaría registro de usuarios.
- Anti-spam: 1 mensaje/imagen/stiker cada 1,2 s y un zumbido cada 12 s.
- **Contraseña (OPCIONAL desde v16)**: si `CLAVE_CHAT` tiene valor, se valida en el dispositivo (sin distinguir mayúsculas) y se guarda en `localStorage` (`siko_chat_clave`). Vacía = entrada libre. No consume Firebase ni reglas nuevas.
- **Instalar app**: usa el evento `beforeinstallprompt` (Chrome/Edge/Samsung: botón nativo de instalación) y `appinstalled` para avisar. En iOS no existe ese evento: el botón muestra la receta de Safari. Si ya está instalada (modo standalone) el botón no aparece.
- **Modos de diseño**: todo el CSS usa variables (`--naranja`, `--fondo`, `--panel`…). El modo y el color se guardan en el dispositivo (`siko_chat_tema` / `siko_chat_color`) y se aplican cambiando clases en el `body` (`tema-claro`, `color-verde`…). Para agregar otro color alcanza con una línea `body.color-xxx{--naranja:...;--naranja-osc:...;--acento-rgb:...}` + una entrada en `COLORES_TEMA` del index.html.
- **Notificaciones**: usan la Notification API del navegador + el service worker (sin Firebase Cloud Messaging). Avisan mientras la web del chat está abierta, aunque la tengas en otra app, otra pestaña o con el cel bloqueado — y desde la v17 también cuando estás dentro del chat pero en **otra conversación** (parámetro `enVista` en `aviso()`). El **aviso de prueba (v18)** sale al conceder permiso o al encender la campanita: confirma que todo el camino funciona. Si el chat está COMPLETAMENTE cerrado, el aviso llega con el **empuje** (v24: se activa desde el chat con el botón 📲 ACTIVAR PUSH — sección 📲 Avisos con la app CERRADA). En iPhone hay que instalar el chat a la pantalla de inicio (botón Compartir → “Agregar a inicio”, iOS 16.4 o más nuevo) para que iOS permita los avisos. La campanita 🔔 de la barra de título enciende/apaga por dispositivo.
- **Avisos tipo WhatsApp (v17)**: el botón **🔔 ACTIVAR AVISOS AL CEL** de la portada (`#btnAvisosLogin`) pide permiso con un solo toque (el navegador exige un gesto del usuario) y aparece solo si el navegador soporta notificaciones y el permiso está sin decidir. El título del aviso es **solo el nombre** de quien escribe (de `nombresCache`) y su **foto de perfil** es la imagen del aviso (desde v23 — antes iba nombre + carita; WhatsApp no pone adornos); el grupo llega como WhatsApp: título **💬 CHAT GRUPAL** y cuerpo **“juan: mensaje”**. Sigue saliendo por el service worker (`reg.showNotification`) con tag por remitente, vibración y el click del SW abre la conversación privada.
- **Central de avisos (v20)**: botón **🔔 Avisos** (`#btnCentral`, en la barra de acciones, visible en grupo y privados) que abre `#overlayAvisos` con 4 filas de estado (`.avFila` con chips verde/rojo/naranja): **permiso** (`Notification.permission`: ✅ concedido / ⛔ BLOQUEADO / ❓ sin decidir), **campanita** (`siko_chat_notis`), **motor** (`swListo`, se pone en true cuando `serviceWorker.ready` o `register()` resuelven) y **aviso de prueba** (`siko_chat_prueba` en localStorage, lo marca `avisoPrueba()` cuando realmente sale). Botones: **🔓 PERMITIR** (visible solo con permiso `default`, llama `pedirPermisoNotis()`), **🔔 PROBAR AVISO AHORA** (valida el permiso y dispara `avisoPrueba()`), **🫀 MODO SIEMPRE ACTIVO** y LISTO. Ayuda condicional: `esIPhone()` muestra la receta de iOS (instalar como app) y oculta la de Android.
- **Modo Siempre Activo (v20)**: Chrome congela pestañas en segundo plano y ahí mueren los avisos (y Firestore). La vigilia crea un `AudioContext` con un oscilador de 55 Hz a ganancia 0.0015 (inaudible) que mantiene la pestaña **“audible”** → Chrome no la duerme. Se guarda en `siko_chat_vigilia`, se retoma al loguear (`vigiliaAplicar()` en `iniciarSesion`) y se reanuda con cualquier `pointerdown` (gesto que el navegador exige para el audio). La radio sonando logra el mismo efecto.
- **Envío más robusto (v20)**: `aviso()` y `avisoPrueba()` ahora ponen `.catch` a la promesa de `reg.showNotification` — si el service worker falla mientras la pantalla está visible, reintenta con `new Notification` directo (antes el fallo se tragaba en silencio).
- **Guía automática (v20)**: 2,6 s después de entrar, `guiaAvisos()` muestra una tostada según el estado del dispositivo: sin soporte/iPhone sin instalar → receta de instalación; bloqueado → pasos del candado; sin decidir → invita a tocar 🔔 Avisos.
- **Conectados en el cel (v11, actualizado v19)**: arriba del chat sigue la **franja de chips** con los conectados (se arma en `pintarContactos`). El viejo cajón con velo quedó reemplazado por la navegación a pantalla completa de la v19.
- **Sin contraseña (v16)**: `CLAVE_CHAT = ''` → `SIN_CLAVE` oculta el campo en la portada y `entrar()` se salta la validación. La clave sigue existiendo: basta llenar la variable para que todo vuelva. El cartelito rojo **“No es seguro”** del navegador es HTTPS (entrá siempre por `https://sikodark256.github.io/SIKOMESAGE/`), no la clave.
- **Puntito en el ícono (v16)**: `actualizarBadgeApp()` usa `navigator.setAppBadge`/`clearAppBadge` (Badge API) con la suma de `noLeidos` — se llama en `pintarContactos` y `abrirPrivado`.
- **Campanita arreglada (v17)**: el loop decorativo de `.btnVent` (el chiste “Acá no se cierra nadie”) le pisaba el `onclick` a `#btnNotis` — la campanita nunca pedía permiso ni apagaba. Ahora la excluye con `continue`.
- **Panel del cel estilo MSN (v16)**: dentro de `#panelContactos` va una `.tarjetaYo` (carita + nombre + estado + frase) que solo se muestra en pantallas ≤ 620 px (`@media (min-width:621px)` la oculta). Se llena con `pintarTarjetaYo()`. No cambia el modelo de datos: la frase ya viajaba en el campo `frase` de `chat_usuarios`.
- **Contactos completos (v14)**: el panel ya no filtra por ping fresco — escucha TODA la colección `chat_usuarios` (los fantasmas se borran a las 24 h, ahí sí desaparecen). Estado: conectado = ping ≤ 65 s (verde/naranja), desconectado = gris con “Visto hace X”. Los mensajes pendientes se calculan con `localStorage siko_chat_visto` (uid → cuándo leíste esa conversación por última vez): al entrar, los privados para vos más nuevos que esa marca cuentan como sin leer y avisan con una tostada. Al abrir la conversación se marca leído. Sin colecciones ni reglas nuevas de Firestore. El aviso “🟢 se conectó” salta cuando alguien pasa de desconectado a conectado de verdad y, desde la **v23**, queda **solo adentro del chat** (tostada si lo estás mirando) — ya no va a la barra de notificaciones del celu, como WhatsApp.
- **Pizarrita Paint (v15)**: herramientas ✏️ lápiz, 🖌️ pincel (grosor ×3), 🪣 **bote de pintura** (rellena la mancha tocada con un flood-fill scanline propio con tolerancia 42, sin librerías), 🧽 goma (×4 pintando del color del fondo) y ↩️ deshacer (hasta 12 fotos del lienzo con `getImageData`/`putImageData`). Paleta de 14 colores, botones más grandes para dedos chicos. Todo corre en el dispositivo: no toca Firebase ni agrega colecciones.
- **Portada limpia (v13)**: se sacaron los carteles de la pantalla de ingreso (“El Messenger de la radio”, “Tu nombre, la clave de la casa…”, el 💡 de “se guarda tu nombre…” y el de “la clave la comparte la banda”) y el logo de bienvenida bajó de 250 px a 200 px (`min(200px,55vw)`). Solo HTML/CSS: no toca Firebase ni reglas.
- **Reacciones, reenviar y borrar (v12)**: viven dentro del MISMO documento de `chat_mensajes` — las reacciones se guardan en un campo `reacc` (mapa emoji → lista de uids) con `update()`, el borrado marca `borrado:true` y vacía el contenido (queda la lápida para todos). **No hay colecciones ni reglas nuevas de Firestore.** El listener ahora también atiende cambios `modified` (antes solo `added`) y re-pinta manteniendo tu lugar de lectura. El botón ⋯, los chips de reacción y el menú usan delegación de clic en `cintaMsj` (funciona con mensajes viejos nuevos). Favoritos: localStorage `siko_chat_favs` (máx 40, por dispositivo).
- `.nojekyll` evita que GitHub Pages procese los archivos con Jekyll.
- Para actualizar el chat: cambiá `index.html` y subí el número de cache en `sw.js` (`sikodark-chat-v25` → `v26`…).
