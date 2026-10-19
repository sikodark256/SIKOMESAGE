# 💬 Sikodark Chat — Estilo MSN Messenger

Chat en vivo **aparte** de sikodark radio, con la estética de siempre (negro + naranja `#f59d3d` + Montserrat). Sin registro: entrás solo con tu nombre.

- 🖤🧡 Hecho para la comunidad de la radio
- ✏️ Pizarrita con lápiz para dibujar y mandar dibujos
- 📳 Zumbido (timbre) con sacudida de pantalla, sonido y **vibración del cel**
- 😀 34 emoticons + 🎟️ 24 stikers grandes + 🎞️ 8 GIFs animados propios (carpeta `gifs/`)
- 📷 Mandar **fotos y GIFs de la galería** del cel (se achican solos)
- 👤 **Perfil con foto**: subí tu foto de perfil, cambiá tu nombre y tu avatar (botón/círculo arriba a la izquierda)
- 🎵 **Tonos configurables**: elegí el sonido de mensajes y del zumbido (botón 🎵 Tonos)
- 👥 Panel de conectados en vivo con estados (en línea / ausente / escribiendo…)
- 📲 PWA instalable (manifest + service worker incluidos)

**🔗 URL del chat:** `https://TU-USUARIO.github.io/NOMBRE-DEL-REPO/` — abre directo, sin buscar archivos.

---

## 📦 Estructura

```
/                        ← raíz del repo
├── index.html           ← toda la app (HTML + CSS + JS en un solo archivo)
├── manifest.json        ← configuración PWA
├── sw.js                ← service worker (cache sikodark-chat-v4)
├── icon-192.png         ← ícono PWA
├── icon-512.png         ← ícono PWA
├── gifs/                ← stikers animados del chat (podés agregar los tuyos)
│   ├── hola.gif · jajaja.gif · corazon.gif · musica.gif
│   └── vinilo.gif · vamos.gif · gol.gif · estrellas.gif
├── .nojekyll            ← le dice a GitHub Pages que no toque nada
├── README.md            ← este archivo
└── firestore-reglas.txt ← reglas a pegar en Firebase si usás reglas cerradas
```

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

El chat usa el mismo proyecto (`sikodarkradio-26a07`) con dos colecciones nuevas:
- `chat_usuarios` → presencia (quién está conectado, heartbeat cada 20 s, foto de perfil incluida)
- `chat_mensajes` → mensajes (texto, dibujos, fotos, stikers, gifs y zumbidos)

Si tus reglas de Firestore ya están abiertas (`allow read, write: if true`), no tocás nada. Si no, pegá el contenido de `firestore-reglas.txt`.

## 🧹 Limpieza automática

- Los mensajes se borran solos a las **12 horas** (el primer usuario que entra los elimina).
- Los usuarios fantasma (sin ping hace 24 h) también se borran.
- Se guardan en memoria los últimos **80 mensajes** por dispositivo.

## 🔧 Notas técnicas

- El `firebaseConfig` usa solo `apiKey` / `authDomain` / `projectId` / `storageBucket` — a Firestore le alcanza con eso.
- Los dibujos y fotos viajan como imagen JPEG base64 (se achican solos a máx 800 px, ~30-100 KB); los GIFs de galería viajan tal cual si pesan menos de ~650 KB.
- Los sonidos se generan con Web Audio API: cero archivos de audio. Cada usuario elige su tono (se guarda en su cel).
- Anti-spam: 1 mensaje/imagen/stiker cada 1,2 s y un zumbido cada 12 s.
- `.nojekyll` evita que GitHub Pages procese los archivos con Jekyll.
- Para actualizar el chat: cambiá `index.html` y subí el número de cache en `sw.js` (`sikodark-chat-v4` → `v5`…).
