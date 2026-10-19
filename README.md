# 💬 Sikodark Chat — Estilo MSN Messenger

Chat en vivo **aparte** de sikodark radio, con la estética de siempre (negro + naranja `#f59d3d` + Montserrat). Sin registro: entrás solo con tu nombre.

- 🖤🧡 Hecho para la comunidad de la radio
- ✏️ Pizarrita con lápiz para dibujar y mandar dibujos
- 📳 Zumbido (timbre) con sacudida de pantalla y sonido
- 😀 34 emoticons + mensaje personal estilo MSN
- 👥 Panel de conectados en vivo con estados (en línea / ausente / escribiendo…)
- 📲 PWA instalable (manifest + service worker incluidos)

**🔗 URL del chat:** `https://TU-USUARIO.github.io/NOMBRE-DEL-REPO/` — abre directo, sin buscar archivos.

---

## 📦 Estructura

```
/                        ← raíz del repo
├── index.html           ← toda la app (HTML + CSS + JS en un solo archivo)
├── manifest.json        ← configuración PWA
├── sw.js                ← service worker (cache sikodark-chat-v2)
├── icon-192.png         ← ícono PWA
├── icon-512.png         ← ícono PWA
├── .nojekyll            ← le dice a GitHub Pages que no toque nada
├── README.md            ← este archivo
└── firestore-reglas.txt ← reglas a pegar en Firebase si usás reglas cerradas
```

## 🚀 Instalación en GitHub Pages

1. Subí **todos los archivos de este zip a la raíz del repo** (botón *Add file → Upload files*, arrastrá todo, commit).
   - ⚠️ Si antes subiste `chat.html`, borralo del repo para no duplicar (la app ahora se llama `index.html`).
2. Andá a **Settings → Pages** y verificá: *Source: Deploy from a branch* → *Branch: main* → *Folder: / (root)*.
3. Esperá el deploy (1-2 min) y entrá a la URL del Pages: el chat abre solo. ✅

## 🚀 Alternativa: carpeta `chat/` en el repo de la radio

Si lo preferís dentro del sitio de la radio, subí estos mismos archivos a una carpeta `chat/` — como la app se llama `index.html`, al entrar a `tudominio.com/chat/` abre solo.

## 🔥 Firebase

El chat usa el mismo proyecto (`sikodarkradio-26a07`) con dos colecciones nuevas:
- `chat_usuarios` → presencia (quién está conectado, heartbeat cada 20 s)
- `chat_mensajes` → mensajes (texto, dibujos y zumbidos)

Si tus reglas de Firestore ya están abiertas (`allow read, write: if true`), no tocás nada. Si no, pegá el contenido de `firestore-reglas.txt`.

## 🧹 Limpieza automática

- Los mensajes se borran solos a las **12 horas** (el primer usuario que entra los elimina).
- Los usuarios fantasma (sin ping hace 24 h) también se borran.
- Se guardan en memoria los últimos **80 mensajes** por dispositivo.

## 🔧 Notas técnicas

- El `firebaseConfig` usa solo `apiKey` / `authDomain` / `projectId` / `storageBucket` — a Firestore le alcanza con eso.
- Los dibujos viajan como imagen JPEG base64 (~30 KB), dentro del límite de documento de Firestore.
- Los sonidos se generan con Web Audio API: cero archivos de audio.
- Anti-spam: 1 mensaje cada 1,2 s y un zumbido cada 12 s.
- `.nojekyll` evita que GitHub Pages procese los archivos con Jekyll.
- Para actualizar el chat: cambiá `index.html` y subí el número de cache en `sw.js` (`sikodark-chat-v2` → `v3`…).
