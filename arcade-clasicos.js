/* ============================================================
   ☕🥬 ARCADE-CLÁSICOS v54 — dos jueguitos propios del chat
   (los originales Cuphead y Popeye no tienen versión embebible
   legal, así que van como minis homenaje dibujados 100% en canvas)
   · ☕ CUPHEAD — batalla aérea contra el diablito (3 fases)
   · 🥬 POPEYE — pisos, escaleras, corazones, espinaca y Brutus
   Sin dependencias. Guardan récord en el celu como los demás.
   ============================================================ */

/* ============================================================
   ☕ CUPHEAD — batalla aérea · 480×640
   Manejás un avioncito con taza: el DIABLITO ataca con patrones
   de 3 fases. Las balas ROSA se "acarician" (graze) y cargan la ✨.
   ============================================================ */
function crearCuphead(){
  var yo = {
    clave: 'cuphead', nom: 'CUPHEAD', emo: '☕', ratio: [480, 640], estado: 'idle',
    t: 0, puntos: 0, vidas: 3, hsViejo: 0, gano: false,
    px: 240, py: 470, tx: null, ty: null, direccion: 0, alto: 0, disparando: false,
    balas: [], malas: [], chispas: [], carteles: [], estrellas: [],
    jefe: { hp: 100, hpMax: 100, x: 240, y: 130, rot: 0, t1: 0, t2: 0, t3: 0, fase: 1, herido: 0, cayendo: 0 },
    enfria: 0, invuln: 0, ex: 0, sacudida: 0
  };
  function estrellasNuevas(){
    yo.estrellas = [];
    for (var i = 0; i < 46; i++) yo.estrellas.push({ x: arcAzar(0, 480), y: arcAzar(0, 640), vel: arcAzar(10, 46), tam: arcAzar(0.6, 1.8) });
  }
  estrellasNuevas();
  yo.empezar = function(){
    yo.t = 0; yo.px = 240; yo.py = 470; yo.tx = null; yo.ty = null;
    yo.direccion = 0; yo.alto = 0; yo.disparando = false;
    yo.balas = []; yo.malas = []; yo.chispas = []; yo.carteles = [];
    yo.jefe = { hp: 100, hpMax: 100, x: 240, y: 130, rot: 0, t1: 1.8, t2: 2.6, t3: 3.2, fase: 1, herido: 0, cayendo: 0 };
    yo.enfria = 0; yo.invuln = 0; yo.ex = 0; yo.sacudida = 0;
    yo.vidas = 3; yo.puntos = 0; yo.gano = false;
    yo.hsViejo = arcHSleer('cuphead');
    estrellasNuevas();
    yo.carteles.push({ txt: '¡A VENCER AL DIABLITO!', vida: 2.2, maxVida: 2.2 });
    yo.estado = 'playing';
  };
  yo.explosion = function(x, y, color, n){
    n = n || 12;
    for (var i = 0; i < n; i++) {
      var ang = arcAzar(0, 6.283), v = arcAzar(40, 200);
      yo.chispas.push({ x: x, y: y, vx: Math.cos(ang) * v, vy: Math.sin(ang) * v, vida: arcAzar(0.25, 0.6), maxVida: 0.6, color: color, tam: arcAzar(1.5, 3) });
    }
  };
  yo.perder = function(gano){
    yo.gano = !!gano;
    arcHSguardar('cuphead', yo.puntos);
    arcSfx.fin();
    yo.estado = 'over';
    arcFicha('over');
  };
  yo.faseJefe = function(){
    if (yo.jefe.hp <= 0) return;
    var pct = yo.jefe.hp / yo.jefe.hpMax;
    if (pct > 0.66) { yo.jefe.fase = 1; return; }
    if (pct > 0.33 && yo.jefe.fase === 1) { yo.jefe.fase = 2; yo.carteles.push({ txt: 'FASE 2 · ESPIRALES', vida: 1.6, maxVida: 1.6 }); arcSfx.poder(); }
    else if (pct <= 0.33 && yo.jefe.fase !== 3) { yo.jefe.fase = 3; yo.carteles.push({ txt: 'FASE FINAL · ¡SE ENOJÓ!', vida: 1.8, maxVida: 1.8 }); arcSfx.bomba(); }
  };
  yo.bomba = function(){
    if (yo.estado !== 'playing' || yo.ex < 100) return;
    yo.ex = 0;
    for (var i = yo.malas.length - 1; i >= 0; i--) yo.explosion(yo.malas[i].x, yo.malas[i].y, '#ff8db0', 4);
    yo.malas = [];
    yo.jefe.hp -= 12; yo.jefe.herido = 0.3;
    yo.puntos += 150; yo.sacudida = 0.5;
    yo.explosion(yo.jefe.x, yo.jefe.y, '#ffd23f', 26);
    arcSfx.bomba();
    if (yo.jefe.hp <= 0) {
      yo.jefe.cayendo = 1.9; yo.puntos += 1200 + yo.vidas * 500;
      yo.carteles.push({ txt: '¡KNOCKOUT!', vida: 1.9, maxVida: 1.9, grande: true });
      yo.explosion(yo.jefe.x, yo.jefe.y, '#ff2d95', 40);
      arcSfx.trio(); arcSfx.bomba();
    } else yo.faseJefe();
  };
  function mala(x, y, vx, vy, rosa, r){
    yo.malas.push({ x: x, y: y, vx: vx, vy: vy, rosa: !!rosa, r: r || 7, vida: 6 });
  }
  yo.paso = function(dt){
    var jugando = yo.estado === 'playing';
    yo.t += dt;
    for (var i = 0; i < yo.estrellas.length; i++) {
      var e = yo.estrellas[i];
      e.y += e.vel * dt * (jugando ? 1 : 0.3);
      if (e.y > 640) { e.y = -2; e.x = arcAzar(0, 480); }
    }
    for (var c = yo.carteles.length - 1; c >= 0; c--) { yo.carteles[c].vida -= dt; if (yo.carteles[c].vida <= 0) yo.carteles.splice(c, 1); }
    if (yo.sacudida > 0) yo.sacudida = Math.max(0, yo.sacudida - 2 * dt);
    for (var s2 = yo.chispas.length - 1; s2 >= 0; s2--) {
      var ch = yo.chispas[s2];
      ch.x += ch.vx * dt; ch.y += ch.vy * dt; ch.vida -= dt;
      if (ch.vida <= 0) yo.chispas.splice(s2, 1);
    }
    if (!jugando) return;
    /* ---- avioncito ---- */
    var dx = 0, dy = 0;
    if (arcTeclas.ArrowLeft || arcTeclas.a || arcTeclas.A) dx -= 1;
    if (arcTeclas.ArrowRight || arcTeclas.d || arcTeclas.D) dx += 1;
    if (arcTeclas.ArrowUp || arcTeclas.w || arcTeclas.W) dy -= 1;
    if (arcTeclas.ArrowDown || arcTeclas.s || arcTeclas.S) dy += 1;
    dx += yo.direccion; dy += yo.alto;
    dx = arcRango(dx, -1, 1); dy = arcRango(dy, -1, 1);
    if (yo.tx !== null) {
      var dif = yo.tx - yo.px;
      yo.px += arcRango(dif, -420 * dt, 420 * dt);
    } else yo.px += 330 * dx * dt;
    if (yo.ty !== null) {
      var dif2 = yo.ty - yo.py;
      yo.py += arcRango(dif2, -420 * dt, 420 * dt);
    } else yo.py += 330 * dy * dt;
    yo.px = arcRango(yo.px, 26, 454); yo.py = arcRango(yo.py, 60, 610);
    /* disparo */
    yo.enfria -= dt;
    if ((yo.disparando || arcTeclas[' ']) && yo.enfria <= 0) {
      yo.enfria = 0.13;
      yo.balas.push({ x: yo.px, y: yo.py - 16, vy: -640 });
      arcSfx.disparo();
    }
    if (yo.invuln > 0) yo.invuln -= dt;
    /* balas mías */
    var j = yo.jefe;
    for (var b = yo.balas.length - 1; b >= 0; b--) {
      var bl = yo.balas[b];
      bl.y += bl.vy * dt;
      if (bl.y < -10) { yo.balas.splice(b, 1); continue; }
      if (j.cayendo <= 0 && Math.abs(bl.x - j.x) < 44 && Math.abs(bl.y - j.y) < 44) {
        yo.balas.splice(b, 1);
        j.hp -= 1; j.herido = 0.12;
        yo.puntos += 8; yo.ex = Math.min(100, yo.ex + 2.2);
        yo.explosion(bl.x, bl.y, '#ffd23f', 3);
        if (j.hp <= 0) {
          j.cayendo = 1.9; yo.puntos += 1200 + yo.vidas * 500;
          yo.carteles.push({ txt: '¡KNOCKOUT!', vida: 1.9, maxVida: 1.9, grande: true });
          yo.explosion(j.x, j.y, '#ff2d95', 40);
          arcSfx.trio(); arcSfx.bomba();
        } else yo.faseJefe();
      }
    }
    /* ---- jefe ---- */
    if (j.cayendo > 0) {
      j.cayendo -= dt;
      j.y += 320 * dt; j.rot += 5 * dt;
      if (j.cayendo <= 0) { yo.perder(true); return; }
    } else {
      j.x = 240 + 95 * Math.sin(yo.t * 0.75);
      j.y = 130 + 32 * Math.sin(yo.t * 1.4);
      if (j.herido > 0) j.herido -= dt;
      j.rot += dt * (j.fase === 3 ? 2.4 : 1.2);
      j.t1 -= dt; j.t2 -= dt; j.t3 -= dt;
      if (j.fase === 1) {
        if (j.t1 <= 0) {
          j.t1 = 2.3;
          for (var a = 0; a < 10; a++) {
            var ang = a / 10 * 6.283 + j.rot;
            mala(j.x, j.y, Math.cos(ang) * 140, Math.sin(ang) * 140, false, 7);
          }
          arcSfx.laser();
        }
        if (j.t2 <= 0) {
          j.t2 = 1.25;
          var ang2 = Math.atan2(yo.py - j.y, yo.px - j.x);
          mala(j.x, j.y, Math.cos(ang2) * 205, Math.sin(ang2) * 205, false, 6);
        }
      } else if (j.fase === 2) {
        if (j.t1 <= 0) {
          j.t1 = 0.14;
          var s = j.rot * 2.4;
          mala(j.x, j.y, Math.cos(s) * 190, Math.sin(s) * 190, false, 6);
          mala(j.x, j.y, Math.cos(s + 3.1416) * 190, Math.sin(s + 3.1416) * 190, false, 6);
        }
        if (j.t2 <= 0) {
          j.t2 = 2.6;
          var ang3 = arcAzar(0, 6.283);
          mala(j.x, j.y, Math.cos(ang3) * 90, Math.sin(ang3) * 90, true, 9); /* rosa: graze */
          arcSfx.iman();
        }
      } else {
        if (j.t1 <= 0) { j.t1 = 0.34; mala(arcAzar(20, 460), -10, arcAzar(-25, 25), arcAzar(190, 300), false, 6); }
        if (j.t2 <= 0) {
          j.t2 = 1.9;
          var ang4 = Math.atan2(yo.py - j.y, yo.px - j.x);
          for (var k2 = -2; k2 <= 2; k2++) mala(j.x, j.y, Math.cos(ang4 + k2 * 0.24) * 250, Math.sin(ang4 + k2 * 0.24) * 250, false, 6);
          arcSfx.laser();
        }
        if (j.t3 <= 0) { j.t3 = 3.4; mala(arcAzar(60, 420), j.y, 0, 130, true, 10); }
      }
      /* balas enemigas */
      for (var m = yo.malas.length - 1; m >= 0; m--) {
        var mo = yo.malas[m];
        mo.x += mo.vx * dt; mo.y += mo.vy * dt; mo.vida -= dt;
        if (mo.vida <= 0 || mo.x < -20 || mo.x > 500 || mo.y < -30 || mo.y > 660) { yo.malas.splice(m, 1); continue; }
        var d2 = Math.hypot(mo.x - yo.px, mo.y - yo.py);
        if (d2 < 30) yo.ex = Math.min(100, yo.ex + 24 * dt); /* graze rosa carga la ✨ */
        if (d2 < mo.r + 10 && yo.invuln <= 0) {
          if (mo.rosa) {
            yo.malas.splice(m, 1);
            yo.ex = Math.min(100, yo.ex + 40);
            arcSfx.combo(3);
            yo.explosion(mo.x, mo.y, '#ff8db0', 10);
            continue;
          }
          yo.malas.splice(m, 1);
          yo.vidas--; yo.invuln = 1.4; yo.sacudida = 0.5;
          yo.explosion(yo.px, yo.py, '#ff6a3d', 22);
          arcSfx.golpe();
          if (yo.vidas <= 0) { yo.explosion(yo.px, yo.py, '#ff2d95', 34); yo.perder(false); return; }
        }
      }
    }
  };
  yo.stats = function(){
    return [
      { t: 'Vidas', v: Math.max(0, yo.vidas), c: 'rosa' },
      { t: 'Jefe', v: Math.max(0, Math.ceil(yo.jefe.hp / 3)) + '%', c: 'amar' },
      { t: 'EX', v: Math.floor(yo.ex) + '%', c: 'violeta' },
      { t: 'Puntos', v: yo.puntos, c: 'verde' }
    ];
  };
  yo.pintar = function(g){
    g.save();
    if (yo.sacudida > 0) g.translate(arcAzar(-5, 5) * yo.sacudida, arcAzar(-5, 5) * yo.sacudida);
    g.fillStyle = '#0b0818'; g.fillRect(-10, -10, 500, 660);
    for (var i = 0; i < yo.estrellas.length; i++) {
      var e = yo.estrellas[i];
      g.fillStyle = 'rgba(240,235,220,' + (0.18 + e.tam * 0.2) + ')';
      g.fillRect(e.x, e.y, e.tam, e.tam);
    }
    /* jefe: el diablito */
    var j = yo.jefe;
    g.save();
    g.translate(j.x, j.y); g.rotate(j.rot * 0.12);
    var herido = j.herido > 0;
    g.fillStyle = herido ? '#ffffff' : (j.fase === 3 ? '#e0341f' : '#d24b2f');
    g.beginPath(); g.arc(0, 0, 42, 0, 6.283); g.fill();
    g.fillStyle = herido ? '#fff' : '#8f2a18';
    g.beginPath(); g.moveTo(-34, -22); g.lineTo(-48, -52); g.lineTo(-20, -36); g.closePath(); g.fill();
    g.beginPath(); g.moveTo(34, -22); g.lineTo(48, -52); g.lineTo(20, -36); g.closePath(); g.fill();
    g.fillStyle = '#ffe9c9';
    g.beginPath(); g.arc(-14, -6, 9, 0, 6.283); g.fill();
    g.beginPath(); g.arc(14, -6, 9, 0, 6.283); g.fill();
    g.fillStyle = '#301a10';
    g.beginPath(); g.arc(-14 + 3 * Math.sin(yo.t * 3), -6, 4, 0, 6.283); g.fill();
    g.beginPath(); g.arc(14 + 3 * Math.sin(yo.t * 3), -6, 4, 0, 6.283); g.fill();
    g.strokeStyle = '#301a10'; g.lineWidth = 3;
    g.beginPath(); g.arc(0, 14, 16, 0.15 * Math.PI, 0.85 * Math.PI); g.stroke();
    g.fillStyle = '#fff3da';
    g.beginPath(); g.moveTo(-10, 16); g.lineTo(10, 16); g.lineTo(0, 24); g.closePath(); g.fill();
    g.restore();
    /* barra del jefe */
    if (j.cayendo <= 0) {
      var pct = Math.max(0, j.hp / j.hpMax);
      g.fillStyle = 'rgba(5,4,10,.55)'; g.fillRect(90, 30, 300, 12);
      g.fillStyle = '#ff2d95'; g.fillRect(90, 30, 300 * pct, 12);
      g.strokeStyle = 'rgba(245,157,61,.6)'; g.strokeRect(90, 30, 300, 12);
      g.fillStyle = '#cfc8b8'; g.font = 'bold 11px Montserrat, sans-serif'; g.textAlign = 'left';
      g.fillText('EL DIABLITO · FASE ' + j.fase, 92, 26);
    }
    /* balas mías */
    for (var b2 = 0; b2 < yo.balas.length; b2++) {
      var bl2 = yo.balas[b2];
      g.fillStyle = '#ffd23f';
      g.beginPath(); g.ellipse(bl2.x, bl2.y, 4, 10, 0, 0, 6.283); g.fill();
      g.fillStyle = '#fff3c9';
      g.beginPath(); g.ellipse(bl2.x, bl2.y - 4, 2, 4, 0, 0, 6.283); g.fill();
    }
    /* balas enemigas */
    for (var m2 = 0; m2 < yo.malas.length; m2++) {
      var mo2 = yo.malas[m2];
      if (mo2.vida < 1 && Math.floor(yo.t * 10) % 2 === 0) continue;
      g.fillStyle = mo2.rosa ? '#ff8db0' : '#ff6a3d';
      g.beginPath(); g.arc(mo2.x, mo2.y, mo2.r, 0, 6.283); g.fill();
      g.fillStyle = mo2.rosa ? '#ffd3e2' : '#ffc9a3';
      g.beginPath(); g.arc(mo2.x - mo2.r * 0.25, mo2.y - mo2.r * 0.25, mo2.r * 0.45, 0, 6.283); g.fill();
    }
    /* chispas */
    for (var s3 = 0; s3 < yo.chispas.length; s3++) {
      var ch3 = yo.chispas[s3];
      g.globalAlpha = Math.max(0, ch3.vida / ch3.maxVida);
      g.fillStyle = ch3.color;
      g.fillRect(ch3.x - ch3.tam / 2, ch3.y - ch3.tam / 2, ch3.tam, ch3.tam);
    }
    g.globalAlpha = 1;
    /* avioncito: taza alada */
    if (yo.estado !== 'idle') {
      g.save();
      g.translate(yo.px, yo.py);
      if (yo.invuln > 0 && Math.floor(yo.t * 12) % 2 === 0) g.globalAlpha = 0.35;
      var incl = yo.tx !== null ? arcRango(yo.tx - yo.px, -40, 40) / 40 : yo.direccion;
      g.rotate(incl * 0.22);
      g.fillStyle = '#e8e2d2';
      g.beginPath(); g.ellipse(-22, 4, 14, 5, -0.5, 0, 6.283); g.fill();
      g.beginPath(); g.ellipse(22, 4, 14, 5, 0.5, 0, 6.283); g.fill();
      g.fillStyle = '#f2ede0';
      g.beginPath(); g.ellipse(0, 6, 12, 16, 0, 0, 6.283); g.fill();
      g.fillStyle = '#fff8ea';
      g.beginPath(); g.arc(0, -10, 15, 0, 6.283); g.fill();
      g.strokeStyle = '#c9c2b2'; g.lineWidth = 3;
      g.beginPath(); g.arc(10, -4, 8, -0.3 * Math.PI, 0.9 * Math.PI); g.stroke();
      g.fillStyle = '#ff6a3d';
      g.beginPath(); g.arc(-4, -12, 3, 0, 6.283); g.fill();
      g.beginPath(); g.arc(5, -12, 3, 0, 6.283); g.fill();
      g.strokeStyle = '#301a10'; g.lineWidth = 2;
      g.beginPath(); g.arc(0, -6, 6, 0.15 * Math.PI, 0.85 * Math.PI); g.stroke();
      if (yo.ex >= 100) {
        g.globalAlpha = 0.7 + 0.3 * Math.sin(yo.t * 9);
        g.strokeStyle = '#c9a2ff'; g.lineWidth = 2;
        g.beginPath(); g.arc(0, -10, 22, 0, 6.283); g.stroke();
      }
      g.restore();
      if (yo.ex >= 100) {
        g.fillStyle = '#c9a2ff'; g.font = 'bold 12px Montserrat, sans-serif'; g.textAlign = 'center';
        g.fillText('✨ LISTA · tocá ✨ o E', yo.px, yo.py + 34);
      }
    }
    /* carteles */
    for (var ct = 0; ct < yo.carteles.length; ct++) {
      var ca = yo.carteles[ct];
      var f = ca.vida / ca.maxVida;
      g.globalAlpha = Math.min(1, f * 2);
      g.font = (ca.grande ? 'bold 44px' : 'bold 17px') + ' Montserrat, sans-serif';
      g.textAlign = 'center';
      g.fillStyle = ca.grande ? '#ffd23f' : '#f2ede0';
      g.fillText(ca.txt, 240, ca.grande ? 320 : 210);
    }
    g.globalAlpha = 1;
    if (yo.estado === 'idle') {
      g.fillStyle = 'rgba(5,4,10,.45)'; g.fillRect(0, 250, 480, 150);
      g.fillStyle = '#f2ede0'; g.font = 'bold 34px Montserrat, sans-serif'; g.textAlign = 'center';
      g.fillText('☕ CUPHEAD', 240, 305);
      g.fillStyle = '#cfc8b8'; g.font = '13px Montserrat, sans-serif';
      g.fillText('batalla aérea contra el diablito', 240, 335);
      g.fillStyle = '#f59d3d'; g.font = 'bold 14px Montserrat, sans-serif';
      g.fillText('tocá ▶ JUGAR para volar', 240, 372);
    }
    g.restore();
  };
  return yo;
}

/* ============================================================
   🥬 POPEYE — 640×480 · pisos + escaleras (16 celdas de 32 px de alto → 15 filas)
   Olive lanza corazones desde arriba: juntá 10 para pasar de nivel.
   Brutus persigue; comé la ESPINACA y pegale (+300).
   ============================================================ */
var POP_CELDA = 32;
function crearPopeye(){
  var yo = {
    clave: 'popeye', nom: 'POPEYE', emo: '🥬', ratio: [640, 480], estado: 'idle',
    t: 0, puntos: 0, nivel: 1, vidas: 3, hsViejo: 0,
    mapa: [], escaleras: [], pisos: [13, 9, 5, 1],
    px: 64, py: 400, pvx: 0, pvy: 0,
    bx: 528, by: 400,
    bTic: 0, bMeta: null, bTumbado: 0,
    poder: 0, spinT: 7, spin: null,
    corazones: [], coraT: 1, juntados: 0, meta: 10,
    invuln: 0, held: [-9, -9, -9, -9], desliz: -1, deslizT: 0,
    carteles: [], chispas: []
  };
  function celda(col, fila){
    if (fila < 0 || fila > 14 || col < 0 || col > 19) return '#';
    return yo.mapa[fila].charAt(col);
  }
  function mapaNuevo(nivel){
    yo.mapa = [];
    for (var f = 0; f < 15; f++) yo.mapa.push('');
    var huecoCol = nivel % 3 === 1 ? [8, 9] : (nivel % 3 === 2 ? [4, 5, 14, 15] : [11]);
    for (var p = 0; p < 4; p++) {
      var fila = yo.pisos[p], s = '';
      for (var c = 0; c < 20; c++) s += (p > 0 && huecoCol.indexOf(c) >= 0) ? ' ' : '#';
      yo.mapa[fila] = s;
    }
    /* escaleras entre pisos: columnas que no caigan en huecos */
    yo.escaleras = [];
    var candidatos = nivel % 2 === 1 ? [2, 6, 9, 12, 16] : [3, 7, 11, 15, 18];
    for (var e2 = 0; e2 < 3; e2++) {
      var col = -1;
      for (var ci = 0; ci < candidatos.length; ci++) {
        var cand = candidatos[(ci + e2) % candidatos.length];
        if (huecoCol.indexOf(cand) < 0 && !yo.escaleras.some(function(x){ return x.col === cand; })) { col = cand; break; }
      }
      if (col < 0) col = 2 + e2;
      var abajo = yo.pisos[e2], arriba = yo.pisos[e2 + 1];
      yo.escaleras.push({ col: col, filaAbajo: abajo, filaArriba: arriba });
      for (var fr = arriba + 1; fr <= abajo; fr++) {
        var s2 = yo.mapa[fr] || '';
        while (s2.length < 20) s2 += ' ';
        yo.mapa[fr] = s2.substring(0, col) + 'H' + s2.substring(col + 1);
      }
    }
  }
  yo.empezar = function(){
    yo.t = 0; yo.puntos = 0; yo.nivel = 1; yo.vidas = 3;
    yo.hsViejo = arcHSleer('popeye');
    yo.chispas = []; yo.carteles = []; yo.corazones = []; yo.spin = null;
    yo.poder = 0; yo.spinT = 7; yo.coraT = 1; yo.juntados = 0; yo.meta = 10;
    yo.invuln = 0; yo.held = [-9, -9, -9, -9]; yo.desliz = -1; yo.deslizT = 0;
    mapaNuevo(1);
    yo.px = 3 * POP_CELDA + 16; yo.py = 13 * POP_CELDA - 16;
    yo.bx = 16 * POP_CELDA + 16; yo.by = 13 * POP_CELDA - 16;
    yo.bTic = 0; yo.bMeta = null; yo.bTumbado = 0;
    yo.carteles.push({ txt: '¡JUNTÁ 10 CORAZONES!', vida: 2, maxVida: 2 });
    yo.estado = 'playing';
  };
  yo.tecla = function(i){ yo.held[i] = yo.t; };
  yo.soltarTecla = function(i){ yo.held[i] = -9; };
  yo.soltarTodo = function(){ yo.held = [-9, -9, -9, -9]; yo.desliz = -1; };
  yo.deslizar = function(d){ yo.desliz = d; yo.deslizT = 0.18; };
  yo.perder = function(){
    arcHSguardar('popeye', yo.puntos);
    arcSfx.fin();
    yo.estado = 'over';
    arcFicha('over');
  };
  yo.explosion = function(x, y, color, n){
    for (var i = 0; i < n; i++) {
      var ang = arcAzar(0, 6.283), v = arcAzar(30, 170);
      yo.chispas.push({ x: x, y: y, vx: Math.cos(ang) * v, vy: Math.sin(ang) * v, vida: arcAzar(0.3, 0.6), maxVida: 0.6, color: color, tam: arcAzar(1.5, 3) });
    }
  };
  function dirHeld(){
    if (arcTeclas.ArrowLeft || arcTeclas.a || arcTeclas.A) return 0;
    if (arcTeclas.ArrowRight || arcTeclas.d || arcTeclas.D) return 1;
    if (arcTeclas.ArrowUp || arcTeclas.w || arcTeclas.W) return 2;
    if (arcTeclas.ArrowDown || arcTeclas.s || arcTeclas.S) return 3;
    var mejor = -1, tMejor = -9;
    for (var i = 0; i < 4; i++) if (yo.held[i] > tMejor) { tMejor = yo.held[i]; mejor = i; }
    if (mejor >= 0) return mejor;
    if (yo.desliz >= 0) return yo.desliz;
    return -1;
  }
  /* física de un ente (Popeye o Brutus) en pisos + escaleras */
  function pasoEnte(ent, dir, velX, velY, dt){
    var col = Math.floor(ent.x / POP_CELDA);
    /* vertical por escalera */
    if (dir === 2 || dir === 3) {
      for (var e = 0; e < yo.escaleras.length; e++) {
        var esc = yo.escaleras[e];
        if (esc.col !== col) continue;
        var pies = Math.floor((ent.y + 16 + 3) / POP_CELDA);
        if (dir === 2 && esc.filaAbajo >= pies && esc.filaArriba < pies) {
          ent.y -= velY * dt;
          if (ent.y <= esc.filaArriba * POP_CELDA - 16) ent.y = esc.filaArriba * POP_CELDA - 16;
          ent.x = esc.col * POP_CELDA + POP_CELDA / 2;
          return;
        }
        if (dir === 3 && esc.filaArriba <= pies && esc.filaAbajo > pies) {
          ent.y += velY * dt;
          if (ent.y >= esc.filaAbajo * POP_CELDA - 16) ent.y = esc.filaAbajo * POP_CELDA - 16;
          ent.x = esc.col * POP_CELDA + POP_CELDA / 2;
          return;
        }
      }
    } else if (dir === 0 || dir === 1) {
      ent.x += (dir === 0 ? -velX : velX) * dt;
    }
    ent.x = arcRango(ent.x, 16, 624);
    ent.y = arcRango(ent.y, 16, 14 * POP_CELDA - 16);
    /* gravedad: caer por los huecos (con margen de 3 px para no vibrar) */
    var colC = Math.floor(ent.x / POP_CELDA);
    var filaPies = Math.floor((ent.y + 16 + 3) / POP_CELDA);
    var bajo = celda(colC, filaPies);
    if (bajo !== '#' && bajo !== 'H') {
      ent.y += 340 * dt;
      var fila2 = Math.floor((ent.y + 16 + 3) / POP_CELDA);
      var bajo2 = celda(Math.floor(ent.x / POP_CELDA), fila2);
      if (bajo2 === '#' || bajo2 === 'H') ent.y = fila2 * POP_CELDA - 16;
    }
  }
  yo.paso = function(dt){
    var jugando = yo.estado === 'playing';
    yo.t += dt;
    for (var c = yo.carteles.length - 1; c >= 0; c--) { yo.carteles[c].vida -= dt; if (yo.carteles[c].vida <= 0) yo.carteles.splice(c, 1); }
    if (!jugando) return;
    /* ---- Popeye ---- (pasoEnte trabaja con x/y: uso un proxy y vuelvo a copiar) */
    var pop = { x: yo.px, y: yo.py };
    pasoEnte(pop, dirHeld(), 170, 130, dt);
    yo.px = pop.x; yo.py = pop.y;
    if (yo.deslizT > 0) { yo.deslizT -= dt; if (yo.deslizT <= 0) yo.desliz = -1; }
    if (yo.invuln > 0) yo.invuln -= dt;
    if (yo.poder > 0) yo.poder -= dt;
    /* ---- corazones que lanza Olive ---- */
    yo.coraT -= dt;
    if (yo.coraT <= 0) {
      yo.coraT = 2.3;
      yo.corazones.push({ x: arcEntero(1, 18) * POP_CELDA + 16, y: 16, vy: 120, vida: 9, fijado: false });
    }
    for (var h = yo.corazones.length - 1; h >= 0; h--) {
      var co = yo.corazones[h];
      co.vida -= dt;
      if (!co.fijado) {
        co.y += co.vy * dt;
        var colCo = Math.floor(co.x / POP_CELDA), filaCo = Math.floor((co.y + 12) / POP_CELDA);
        var celdaCo = celda(colCo, filaCo);
        /* caen ATRAVESANDO el piso de Olive (fila 1) y descansan en los pisos de abajo */
        if ((celdaCo === '#' || celdaCo === 'H') && filaCo > 1) { co.y = filaCo * POP_CELDA - 12; co.fijado = true; }
        if (co.y > 14 * POP_CELDA) { co.y = 14 * POP_CELDA - 12; co.fijado = true; }
      }
      if (Math.abs(co.x - yo.px) < 22 && Math.abs(co.y - yo.py) < 26) {
        yo.corazones.splice(h, 1);
        yo.juntados++; yo.puntos += 100;
        arcSfx.hueco();
        if (yo.juntados >= yo.meta) {
          yo.nivel++; yo.juntados = 0; yo.puntos += 400;
          mapaNuevo(yo.nivel);
          yo.px = 3 * POP_CELDA + 16; yo.py = 13 * POP_CELDA - 16;
          yo.bx = 16 * POP_CELDA + 16; yo.by = 13 * POP_CELDA - 16; yo.bMeta = null;
          yo.carteles.push({ txt: '¡NIVEL ' + yo.nivel + '!', vida: 1.6, maxVida: 1.6 });
          arcSfx.nivel();
        }
        continue;
      }
      if (co.vida <= 0) yo.corazones.splice(h, 1);
    }
    /* ---- espinaca ---- */
    if (!yo.spin && yo.poder <= 0) {
      yo.spinT -= dt;
      if (yo.spinT <= 0) {
        yo.spin = { x: arcEntero(1, 18) * POP_CELDA + 16, y: 16, vy: 130, vida: 8, fijado: false };
        yo.carteles.push({ txt: '🥬 ¡ESPINACA!', vida: 1.2, maxVida: 1.2 });
        arcSfx.iman();
      }
    }
    if (yo.spin) {
      if (!yo.spin.fijado) {
        yo.spin.y += yo.spin.vy * dt;
        var colSp = Math.floor(yo.spin.x / POP_CELDA), filaSp = Math.floor((yo.spin.y + 12) / POP_CELDA);
        var celdaSp = celda(colSp, filaSp);
        if ((celdaSp === '#' || celdaSp === 'H') && filaSp > 1) { yo.spin.y = filaSp * POP_CELDA - 12; yo.spin.fijado = true; }
        if (yo.spin.y > 14 * POP_CELDA) { yo.spin.y = 14 * POP_CELDA - 12; yo.spin.fijado = true; }
      }
      yo.spin.vida -= dt;
      if (Math.abs(yo.spin.x - yo.px) < 22 && Math.abs(yo.spin.y - yo.py) < 26) {
        yo.spin = null; yo.poder = 5.5; yo.spinT = arcAzar(13, 18);
        arcSfx.poder(); arcSfx.trio();
        yo.carteles.push({ txt: '💪 ¡PODER!', vida: 1.2, maxVida: 1.2 });
      } else if (yo.spin.vida <= 0) yo.spin = null;
    }
    /* ---- Brutus ---- */
    var bToca = Math.abs(yo.bx - yo.px) < 26 && Math.abs(yo.by - yo.py) < 26;
    if (yo.bTumbado > 0) {
      yo.bTumbado -= dt;
      if (yo.bTumbado <= 0) {
        yo.bx = arcEntero(1, 18) * POP_CELDA + 16; yo.by = 13 * POP_CELDA - 16; yo.bMeta = null;
      }
    } else {
      var velB = 95 + 14 * yo.nivel;
      if (yo.poder > 0) velB = 55;
      yo.bTic -= dt;
      if (yo.bTic <= 0) {
        yo.bTic = 0.8;
        if (Math.abs(yo.by - yo.py) < 46) yo.bMeta = { tipo: 'x', x: yo.px };
        else {
          var mejor = null, mejorD = 99999;
          for (var e3 = 0; e3 < yo.escaleras.length; e3++) {
            var esc3 = yo.escaleras[e3];
            var dE = Math.abs(yo.bx - (esc3.col * POP_CELDA + 16)) + Math.abs(yo.py - (esc3.filaAbajo * POP_CELDA - 16));
            if (dE < mejorD) { mejorD = dE; mejor = esc3; }
          }
          if (mejor) yo.bMeta = { tipo: 'esc', col: mejor.col, filaAbajo: mejor.filaAbajo };
        }
      }
      var dirB = -1;
      if (yo.bMeta) {
        var filaB = Math.floor((yo.by + 19) / POP_CELDA), colBc = Math.floor(yo.bx / POP_CELDA);
        if (yo.bMeta.tipo === 'x') dirB = yo.poder > 0 ? (yo.bx < yo.px ? 0 : 1) : (yo.bx < yo.bMeta.x ? 1 : 0);
        else {
          if (colBc === yo.bMeta.col) dirB = yo.py < yo.by ? 2 : 3;
          else dirB = yo.poder > 0 ? (yo.bx < yo.bMeta.col * POP_CELDA + 16 ? 0 : 1) : (yo.bx < yo.bMeta.col * POP_CELDA + 16 ? 1 : 0);
        }
      }
      var bru = { x: yo.bx, y: yo.by };
      pasoEnte(bru, dirB, velB, velB * 0.9, dt);
      yo.bx = bru.x; yo.by = bru.y;
      if (yo.poder > 0) {
        if (bToca) {
          yo.bTumbado = 2.6; yo.puntos += 300;
          yo.explosion(yo.bx, yo.by, '#7cfc9a', 18);
          arcSfx.golpe(); arcSfx.combo(4);
          yo.carteles.push({ txt: '🥊 ¡PUÑETAZO! +300', vida: 1.4, maxVida: 1.4 });
        }
      } else if (bToca && yo.invuln <= 0) {
        yo.vidas--; yo.invuln = 2.2;
        yo.explosion(yo.px, yo.py, '#ff6a3d', 24);
        arcSfx.mordida();
        yo.carteles.push({ txt: '¡Brutus te agarró!', vida: 1.4, maxVida: 1.4 });
        /* y a Brutus lo mandan a otro piso para que no quede encima tuyo */
        yo.bx = arcEntero(1, 18) * POP_CELDA + 16;
        yo.by = (yo.pisos[arcEntero(0, 2)]) * POP_CELDA - 16;
        yo.bMeta = null; yo.bTic = 0;
        if (yo.vidas <= 0) { yo.perder(); return; }
      }
    }
    for (var s2 = yo.chispas.length - 1; s2 >= 0; s2--) {
      var ch = yo.chispas[s2];
      ch.x += ch.vx * dt; ch.y += ch.vy * dt; ch.vida -= dt;
      if (ch.vida <= 0) yo.chispas.splice(s2, 1);
    }
  };
  yo.stats = function(){
    return [
      { t: 'Corazones', v: yo.juntados + '/' + yo.meta, c: 'rosa' },
      { t: 'Nivel', v: yo.nivel, c: 'amar' },
      { t: 'Vidas', v: Math.max(0, yo.vidas), c: 'rosa' },
      { t: 'Puntos', v: yo.puntos, c: 'verde' }
    ];
  };
  function pintaPiso(g, fila, colorA, colorB){
    for (var c = 0; c < 20; c++) {
      var cc = celda(c, fila);
      if (cc === ' ') continue;
      g.fillStyle = colorA;
      g.fillRect(c * POP_CELDA, fila * POP_CELDA, POP_CELDA, 10);
      g.fillStyle = colorB;
      g.fillRect(c * POP_CELDA + 2, fila * POP_CELDA + 8, POP_CELDA - 4, 4);
    }
  }
  function pintaEscalera(g, esc){
    var x = esc.col * POP_CELDA;
    g.strokeStyle = '#d9a05b'; g.lineWidth = 4;
    for (var f = esc.filaArriba; f <= esc.filaAbajo; f++) {
      g.beginPath(); g.moveTo(x + 7, f * POP_CELDA); g.lineTo(x + 7, f * POP_CELDA + POP_CELDA); g.stroke();
      g.beginPath(); g.moveTo(x + POP_CELDA - 7, f * POP_CELDA); g.lineTo(x + POP_CELDA - 7, f * POP_CELDA + POP_CELDA); g.stroke();
      g.beginPath(); g.moveTo(x + 5, f * POP_CELDA + 16); g.lineTo(x + POP_CELDA - 5, f * POP_CELDA + 16); g.stroke();
    }
  }
  function pintaPopeye(g, x, y, pega){
    g.save(); g.translate(x, y);
    g.fillStyle = '#e8e2d2'; g.fillRect(-8, -2, 16, 16);
    g.fillStyle = '#2e4d8f'; g.fillRect(-8, 8, 16, 8);
    g.fillStyle = '#f2c9a0'; g.beginPath(); g.arc(0, -10, 9, 0, 6.283); g.fill();
    g.fillStyle = '#e8e2d2'; g.fillRect(-9, -18, 18, 6);
    g.fillStyle = '#301a10'; g.fillRect(-5, -8, 3, 3); g.fillRect(2, -8, 3, 3);
    g.fillStyle = '#d97b3f'; g.fillRect(5, -4, 7, 3);
    if (pega) { g.strokeStyle = '#f2c9a0'; g.lineWidth = 5; g.beginPath(); g.moveTo(8, 2); g.lineTo(22, -8); g.stroke(); }
    if (yo.poder > 0) { g.shadowColor = '#7cfc9a'; g.shadowBlur = 12; }
    g.restore();
  }
  yo.pintar = function(g){
    g.fillStyle = '#0d0a14'; g.fillRect(0, 0, 640, 480);
    g.fillStyle = 'rgba(245,157,61,.07)';
    for (var d = 0; d < 640; d += 64) g.fillRect(d, 60, 32, 4);
    pintaPiso(g, 1, '#c9a2ff', '#9d76d9');
    pintaPiso(g, 5, '#ff8db0', '#d96a8f');
    pintaPiso(g, 9, '#ffd23f', '#d9a73f');
    pintaPiso(g, 13, '#7cfc9a', '#5cc97f');
    for (var e = 0; e < yo.escaleras.length; e++) pintaEscalera(g, yo.escaleras[e]);
    /* Olive arriba (decorativa) */
    g.fillStyle = '#f2c9a0'; g.beginPath(); g.arc(610, 16, 8, 0, 6.283); g.fill();
    g.fillStyle = '#ff2d95'; g.fillRect(602, 24, 16, 10);
    /* corazones */
    for (var h = 0; h < yo.corazones.length; h++) {
      var co = yo.corazones[h];
      if (co.fijado && co.vida < 2 && Math.floor(yo.t * 8) % 2 === 0) continue;
      g.font = '20px sans-serif'; g.textAlign = 'center';
      g.fillText('🖤', co.x, co.y + 8);
    }
    /* espinaca */
    if (yo.spin && !(yo.spin.vida < 2.5 && Math.floor(yo.t * 8) % 2 === 0)) {
      g.fillStyle = '#5cc97f'; g.fillRect(yo.spin.x - 9, yo.spin.y - 11, 18, 20);
      g.fillStyle = '#2e6b4f'; g.fillRect(yo.spin.x - 9, yo.spin.y - 3, 18, 5);
      g.fillStyle = '#fff'; g.font = 'bold 9px Montserrat, sans-serif'; g.textAlign = 'center';
      g.fillText('SPIN', yo.spin.x, yo.spin.y + 6);
    }
    /* Brutus */
    if (yo.bTumbado <= 0) {
      var azul = yo.poder > 0;
      g.save(); g.translate(yo.bx, yo.by);
      g.fillStyle = azul ? '#6aa9ff' : '#c96a4f';
      g.beginPath(); g.arc(0, -6, 14, 0, 6.283); g.fill();
      g.fillStyle = azul ? '#4d7fd9' : '#8f4a33';
      g.fillRect(-12, 6, 24, 12);
      g.fillStyle = '#fff';
      g.beginPath(); g.arc(-5, -9, 4, 0, 6.283); g.fill();
      g.beginPath(); g.arc(5, -9, 4, 0, 6.283); g.fill();
      g.fillStyle = '#301a10';
      g.beginPath(); g.arc(-5, -9, 2, 0, 6.283); g.fill();
      g.beginPath(); g.arc(5, -9, 2, 0, 6.283); g.fill();
      g.restore();
    } else {
      g.font = '18px sans-serif'; g.textAlign = 'center';
      g.fillText('💫', yo.bx, yo.by - 6);
    }
    /* Popeye */
    if (yo.estado !== 'idle' && (yo.invuln <= 0 || Math.floor(yo.t * 10) % 2 === 0)) pintaPopeye(g, yo.px, yo.py, yo.poder > 0);
    /* chispas */
    for (var s = 0; s < yo.chispas.length; s++) {
      var ch = yo.chispas[s];
      g.globalAlpha = Math.max(0, ch.vida / ch.maxVida);
      g.fillStyle = ch.color;
      g.fillRect(ch.x - ch.tam / 2, ch.y - ch.tam / 2, ch.tam, ch.tam);
    }
    g.globalAlpha = 1;
    /* barra de poder */
    if (yo.poder > 0) {
      g.fillStyle = 'rgba(5,4,10,.5)'; g.fillRect(180, 464, 280, 10);
      g.fillStyle = '#7cfc9a'; g.fillRect(180, 464, 280 * Math.max(0, yo.poder / 5.5), 10);
    }
    /* carteles */
    for (var ct = 0; ct < yo.carteles.length; ct++) {
      var ca = yo.carteles[ct];
      g.globalAlpha = Math.min(1, ca.vida / ca.maxVida * 2);
      g.fillStyle = '#f2ede0'; g.font = 'bold 20px Montserrat, sans-serif'; g.textAlign = 'center';
      g.fillText(ca.txt, 320, 250);
    }
    g.globalAlpha = 1;
    if (yo.estado === 'idle') {
      g.fillStyle = 'rgba(5,4,10,.45)'; g.fillRect(120, 180, 400, 130);
      g.fillStyle = '#f2ede0'; g.font = 'bold 34px Montserrat, sans-serif'; g.textAlign = 'center';
      g.fillText('🥬 POPEYE', 320, 232);
      g.fillStyle = '#cfc8b8'; g.font = '13px Montserrat, sans-serif';
      g.fillText('corazones, espinaca y Brutus de paseo', 320, 262);
      g.fillStyle = '#f59d3d'; g.font = 'bold 14px Montserrat, sans-serif';
      g.fillText('tocá ▶ JUGAR para empezar', 320, 292);
    }
  };
  return yo;
}
if (typeof window !== 'undefined') { window.crearCuphead = crearCuphead; window.crearPopeye = crearPopeye; }
