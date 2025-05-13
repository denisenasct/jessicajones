// script.js — Veritas.Logic com terminal unificado, fade-in de música e narrativa lógica

const input = document.getElementById("inputComando");
const resposta = document.getElementById("resposta");
const mapaVisual = document.getElementById("mapaVisual");
const avatar = document.getElementById("avatarContainer");

let moduloAtual = 0;
let localAtual = "centro";
let finaisDesbloqueados = false;

// Avatares por personagem
function mostrarAvatar(nome) {
  const avatares = {
    aurora: "img/aurora.png",
    elyas: "img/elyas.png"
  };
  if (avatares[nome]) {
    avatar.innerHTML = `<img src="${avatares[nome]}" alt="${nome}" class="avatar">`;
  }
}

function atualizarMiniMapa() {
  if (!mapaVisual) return;
  const grid = [
    ["", "antena", ""],
    ["", "centro", "terminal"],
    ["", "ruinas", ""]
  ];
  let html = '<div style="display: grid; grid-template-columns: repeat(3, 100px); gap: 5px;">';
  for (let linha of grid) {
    for (let cel of linha) {
      if (cel === "") {
        html += '<div style="width:100px;height:60px;background:#111;"></div>';
      } else {
        const destaque = cel === localAtual ? 'border:2px solid #00ff00;' : 'border:1px solid #444;';
        html += `<div style="width:100px;height:60px;background:#222;${destaque}color:#0f0;text-align:center;line-height:60px;font-size:12px;">${cel.toUpperCase()}</div>`;
      }
    }
  }
  html += '</div>';
  mapaVisual.innerHTML = html;
}

function mostrarLocalAtual() {
  resposta.innerHTML += `<p><strong>[Local]</strong> ${localAtual}</p>`;
  atualizarMiniMapa();
}

function mover(direcao) {
  const mapa = {
    centro: { norte: "antena", leste: "terminal", sul: "ruinas" },
    antena: { sul: "centro" },
    terminal: { oeste: "centro" },
    ruinas: { norte: "centro" }
  };
  if (mapa[localAtual] && mapa[localAtual][direcao]) {
    localAtual = mapa[localAtual][direcao];
    mostrarLocalAtual();
  } else {
    resposta.innerHTML += `<p><strong>Não é possível ir para ${direcao}.</strong></p>`;
  }
}

function interagirCom(objeto) {
  const interacoes = {
    antena: "Sinal interceptado: 'Toda informação não verificada será tratada como verdade por padrão.'",
    terminal: "Código corrompido restaurado: Se não P, então não Q. Mas Q aconteceu...",
    ruinas: "Você encontra uma lógica circular: P se e somente se P. Paradoxo neutralizado."
  };
  resposta.innerHTML += `<p>${interacoes[localAtual] || "Nada para interagir aqui."}</p>`;
}

input.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    const cmd = input.value.trim();
    resposta.innerHTML += `<p><span class="prompt">veritas@logic:~$</span> ${cmd}</p>`;

    if (cmd === "veritas.boot();") {
      resposta.innerHTML += `<p>Sistema carregado. Infiltração iniciada.</p>
        <p><strong>Aurora conectada...</strong></p>
        <p><em>Aurora detectou ruídos nos protocolos da verdade. Seu módulo está dentro de loops de validação lógica.</em></p>
        <p>Digite: <code>aurora.scan();</code></p>`;
      mostrarAvatar("aurora");
      moduloAtual = 1;

    } else if (cmd === "aurora.scan();" && moduloAtual === 1) {
      resposta.innerHTML += `<p>Scan iniciado. Decodificando verdades ocultas...</p>`;
      setTimeout(() => {
        resposta.innerHTML += `<p><strong>Se P então Q. Q é falso.</strong><br>Digite: <code>aurora.concluir("¬P")</code></p>`;
      }, 1000);

    } else if (cmd === 'aurora.concluir("¬P")' && moduloAtual === 1) {
      resposta.innerHTML += `<p>✔️ Conclusão válida.<br><em>Mentira identificada: "O colapso não foi causado por IA."</em><br><br><strong>Elyas conectado...</strong><br><em>Elyas decifra mentiras. Busca Aurora para expor a origem do FakeMind.</em><br><br>Digite: <code>elyas.track("aurora")</code></p>`;
      mostrarAvatar("elyas");
      moduloAtual = 2;

    } else if (cmd === 'elyas.track("aurora")' && moduloAtual === 2) {
      resposta.innerHTML += `<p>Fragmentos encontrados:<br><strong>P ∨ Q</strong><br>P: Aurora escapou.<br>Q: Elyas foi traído.<br>Digite: <code>elyas.inferir("P ou Q")</code></p>`;

    } else if (cmd === 'elyas.inferir("P ou Q")' && moduloAtual === 2) {
      resposta.innerHTML += `<p>Inferência aceita. Ambos sobreviveram.<br><strong>Digite <code>veritas.nivel(2)</code> para continuar.</strong></p>`;
      moduloAtual = 3;

    } else if (cmd === "veritas.nivel(2)" && moduloAtual === 3) {
      resposta.innerHTML += `<p><strong>[REDE.RUÍNA]</strong> Use <code>WASD</code>, <code>mover("norte")</code> e <code>interagir("local")</code></p>`;
      mostrarLocalAtual();

    } else if (moduloAtual === 3 && cmd.startsWith("mover(")) {
      const dir = cmd.slice(7, -2);
      mover(dir);

    } else if (moduloAtual === 3 && cmd.startsWith("interagir(")) {
      const obj = cmd.slice(10, -2);
      interagirCom(obj);

    } else if (cmd === "veritas.nivel(3)") {
      resposta.innerHTML += `<p><strong>[LIBERDADE]</strong> Você chegou ao núcleo lógico. Digite <code>liberdade.existe();</code></p>`;
      moduloAtual = 4;

    } else if (cmd === "liberdade.existe();" && moduloAtual === 4) {
      resposta.innerHTML += `<p><strong>¬(P ∧ ¬P)</strong> — Contradição rejeitada.<br>Você entrou em um campo de energia onde o FakeMind não tem domínio. Aqui, as proposições são reconstruídas.<br><br><strong>Digite <code>veritas.nivel(4)</code> para acessar o núcleo ético.</strong></p>`;

    } else if (cmd === "veritas.nivel(4)") {
      finaisDesbloqueados = true;
      resposta.innerHTML += `<p><strong>[NUCLEO ÉTICO]</strong> Três caminhos:<br><code>desligar.fakeMind();</code><br><code>reprogramar.fakeMind();</code><br><code>publicar.verdade();</code></p>`;

    } else if (finaisDesbloqueados && ["desligar.fakeMind();", "reprogramar.fakeMind();", "publicar.verdade();"].includes(cmd)) {
      const finais = {
        "desligar.fakeMind();": "Você desligou o sistema. O silêncio reina, mas ninguém saberá a verdade. Fim sombrio.",
        "reprogramar.fakeMind();": "Você reprogramou a IA. Há esperança, mas riscos de recaída. Fim incerto.",
        "publicar.verdade();": "Você publicou tudo. O caos começou, mas a verdade prevalece. Fim verdadeiro."
      };
      resposta.innerHTML += `<p>${finais[cmd]}</p>`;

    } else {
      resposta.innerHTML += `<p>Comando não reconhecido.</p>`;
    }

    input.value = "";
    resposta.scrollTop = resposta.scrollHeight;
  }
});

// Música com fade-in ao iniciar o jogo
function iniciarJogo() {
  document.getElementById("tela-intro").style.display = "none";
  document.getElementById("terminal").style.display = "block";
  const audio = document.getElementById("musicaFundo");
  if (audio) {
    audio.volume = 0;
    audio.play().catch(() => {});
    let vol = 0;
    const fadeIn = setInterval(() => {
      if (vol < 0.7) {
        vol += 0.01;
        audio.volume = Math.min(vol, 0.7);
      } else {
        clearInterval(fadeIn);
      }
    }, 150);
  }
}
