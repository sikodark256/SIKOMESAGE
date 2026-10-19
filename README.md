# 💬 Sikodark Chat — Estilo MSN Messenger

Chat en vivo **aparte** de sikodark radio, con la estética de siempre (negro + naranja `#f59d3d` + Montserrat). Sin registro: entrás solo con tu nombre.

- 🖤🧡 Hecho para la comunidad de la radio
- ✏️ Pizarrita con lápiz para dibujar y mandar dibujos
- 📳 Zumbido (timbre) con sacudida de pantalla y sonido
- 😀 34 emoticons + mensaje personal estilo MSN
- 👥 Panel de conectados en vivo con estados (en línea / ausente / escribiendo…)
- 📲 PWA instalable (manifest + service worker incluidos)

---

## 📦 Estructura

```
chat/
├── chat.html            ← toda la app (HTML + CSS + JS en un solo archivo)
├── manifest.json        ← configuración PWA
├── sw.js                ← service worker (cache sikodark-chat-v1)
├── icon-192.png         ← ícono PWA
├── icon-512.png         ← ícono PWA
├── README.md            ← este archivo
└── firestore-reglas.txt ← reglas a pegar en Firebase si usás reglas cerradas
```

## 🚀 Instalación

1. **Copiá la carpeta `chat/` completa** a la raíz de tu repo (misma altura que tu `index.html` de la radio). La URL final queda `tudominio.com/chat/chat.html`.

2. **Íconos**: ya vienen incluidos. Si querés usar los de la marca, reemplazá `icon-192.png` e `icon-512.png` por los tuyos (mismos nombres).

3. **Firebase**: el chat usa el mismo proyecto (`sikodarkradio-26a07`) con dos colecciones nuevas:
   - `chat_usuarios` → presencia (quién está conectado, heartbeat cada 20 s)
   - `chat_mensajes` → mensajes (texto, dibujos y zumbidos)
   
   Si tus reglas de Firestore ya están abiertas (`allow read, write: if true`), no tocás nada. Si no, pegá el contenido de `firestore-reglas.txt`.

4. **Botón en la radio** (opcional): agregá esto donde quieras en tu `index.html`:

   ```html
   <a href="chat/" style="display:inline-flex;align-items:center;gap:6px;background:#f59d3d;color:#000;font-weight:900;padding:10px 16px;border-radius:12px;text-decoration:none">💬 CHAT MSN</a>
   ```

5. **Actualizaciones**: cuando cambies `chat.html`, subí el número de cache en `sw.js` (línea `var CACHE = 'sikodark-chat-v1'` → `v2`, `v3`…).

## 🧹 Limpieza automática

- Los mensajes se borran solos a las **12 horas** (el primer usuario que entra los elimina).
- Los usuarios fantasma (sin ping hace 24 h) también se borran.
- Se guardan en memoria los últimos **80 mensajes** por dispositivo.

## 🔧 Notas técnicas

- El `firebaseConfig` usa solo `apiKey` / `authDomain` / `projectId` / `storageBucket` — a Firestore le alcanza con eso.
- Los dibujos viajan como imagen JPEG base64 (~30 KB), dentro del límite de documento de Firestore.
- Los sonidos se generan con Web Audio API: cero archivos de audio.
- Anti-spam: 1 mensaje cada 1,2 s y un zumbido cada 12 s.
