/* ============================================================
   📄 CONFIG DE FIREBASE DEL CHAT — EL ÚNICO ARCHIVO QUE TOCÁS
   SikoChat v30 · reglas del chat 100% separadas de la radio
   ============================================================

   ⚠️ ESTE ARCHIVO ES EL QUE DECIDE EN QUÉ PROYECTO DE FIREBASE
      VIVE EL CHAT. La radio ya no tiene nada que ver: podés
      cambiar las reglas de la radio MIL VECES que el chat
      no se entera más.

   ══════════════════════════════════════════════════════════
   PARA MIGRAR EL CHAT A SU PROYECTO NUEVO (1 sola vez):
   ══════════════════════════════════════════════════════════

   1) console.firebase.google.com → "Agregar proyecto"
      → nombre: sikochat → Crear (Analytics: no hace falta)

   2) Adentro del proyecto, tocá el ícono WEB </> para crear
      una app web → nombre: chat → Registrar → te muestra un
      bloque "firebaseConfig" con las claves nuevas

   3) COPIÁ las claves acá abajo: reemplazá lo que está entre
      comillas por lo que te dio Firebase (projectId y apiKey
      son los importantes; si te da más campos, agregalos igual)

   4) En el proyecto nuevo: Firestore Database → Crear base →
      pestaña "Reglas" → pegá el archivo REGLAS-SOLO-CHAT.txt
      ENTERO → PUBLICAR

   5) Subí este archivo (chat-config.js) al repo del chat
      (GitHub → Add file → upload) y abrí el chat 2 veces

   LISTO — el chat vive en SU PROPIO proyecto:
   ✔ las reglas de la radio nunca más lo rompen
   ✔ la lista de contactos arranca de cero: cada persona
     vuelve a aparecer apenas abre el chat (se guarda sola)
   ✔ después de migrar, andá a 🔔 Avisos → 📲 ACTIVAR PUSH
     y pegá el código otra vez en Cloudflare: el botón COPIAR
     ya te lo da con el proyecto nuevo puesto

   ──────────────────────────────────────────────────────────
   IMPORTANTE: mientras NO cambies nada, el chat sigue con el
   proyecto de siempre y funciona EXACTAMENTE igual que hoy.
   Este archivo de abajo es la config actual (respaldo).
   ────────────────────────────────────────────────────────── */

var SIKOCHAT_CONFIG = {
  apiKey: "AIzaSyC9Q9N1TTqWRUpeh2lo7tGuG8lwTrvbHrA",
  authDomain: "sikodarkradio-26a07.firebaseapp.com",
  projectId: "sikodarkradio-26a07",
  storageBucket: "sikodarkradio-26a07.appspot.com"
};
