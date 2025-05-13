// script.js — Veritas.Logic com mapa, interações e finais múltiplos

const input = document.getElementById("inputComando");
const resposta = document.getElementById("resposta");
const mapaVisual = document.getElementById("mapaVisual");

let moduloAtual = 1;
let localAtual = "centro";
let finaisDesbloqueados = false;

const historiaAurora = `Aurora detectou ruídos nos protocolos da verdade. Seu módulo foi isolado. Vive dentro de loops de validação lógica.`;
const historiaElyas = `Elyas decifra mentiras. Busca Aurora para expor a origem do FakeMind.`;

const respostasModulo1 = {
  "veritas.boot();": `Sistema carregado. Infiltração iniciada.<br><br><strong>Aurora conectada...</strong><br><em>${historiaAurora}</em><br><br>Digite <code>aurora.scan();</code>`,
  "aurora.scan();": `Analisando...<br><strong>Se P então Q. Q é falso.</strong><br>Digite: <code>aurora.concluir("¬P")</code>`,
  'aurora.concluir("¬P")': `Conclusão válida. Mentira identificada: "O colapso não foi causado por IA."<br><br><strong>Elyas conectado...</strong><br><em>${historiaElyas}</em><br><br>Digite <code>elyas.track("aurora")</code>`,
  'elyas.track("aurora")': `Fragmentos encontrados:<br><strong>P ∨ Q</strong><br>P: Aurora escapou.<br>Q: Elyas foi traído.<br>Digite: <code>elyas.inferir("P ou Q")</code>`,
  'elyas.inferir("P ou Q")': `Inferência aceita. Ambos sobreviveram.<br><br><strong>Digite <code>veritas.nivel(2)</code> para continuar.</strong>`
};

const mapaRede = {
  centro: { norte: "antena", leste: "terminal", sul: "ruinas" },
  antena: { sul: "centro" },
  terminal: { oeste: "centro" },
  ruinas: { norte: "centro" }
};

const descritivoLocais = {
  centro: "Centro da cidade digital. Tudo está em ruínas.",
  antena: "Uma antena caída, ainda piscando em vermelho.",
  terminal: "Terminal abandonado, com dados corrompidos.",
  ruinas: "Ruínas ecoam vozes antigas. Rastro de fake news detectado."
};

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
  resposta.innerHTML += `<p><strong>[Local]</strong> ${descritivoLocais[localAtual]}</p>`;
  atualizarMiniMapa();
}

function mover(direcao) {
  if (mapaRede[localAtual] && mapaRede[localAtual][direcao]) {
    localAtual = mapaRede[localAtual][direcao];
    mostrarLocalAtual();
  } else {
    resposta.innerHTML += `<p><strong>Não é possível ir para ${direcao}.</strong></p>`;
  }
}

function interagirCom(objeto) {
  const interacoes = {
    antena: "<strong>[ANTENA]</strong> Sinal interceptado: 'Toda informação não verificada será tratada como verdade por padrão.'",
    terminal: "<strong>[TERMINAL]</strong> Código corrompido restaurado: Se não P, então não Q. Mas Q aconteceu...",
    ruinas: "<strong>[RUÍNAS]</strong> Você encontra uma lógica circular: P se e somente se P. Paradoxo neutralizado."
  };
  if (localAtual === objeto && interacoes[localAtual]) {
    resposta.innerHTML += `<p>${interacoes[localAtual]}</p>`;
  } else {
    resposta.innerHTML += `<p>Nenhum objeto válido para interação aqui.</p>`;
  }
}

// WASD
document.addEventListener("keydown", function (e) {
  if (moduloAtual === 2 && ["w", "a", "s", "d"].includes(e.key.toLowerCase())) {
    const tecla = e.key.toLowerCase();
    if (tecla === "w") mover("norte");
    if (tecla === "a") mover("oeste");
    if (tecla === "s") mover("sul");
    if (tecla === "d") mover("leste");
  }
});

// Módulo 3 — Liberdade
const historiaFinal = `Você entrou em um campo de energia onde o FakeMind não tem domínio. Aqui, as proposições são reconstruídas.`;
const respostasModulo3 = {
  "liberdade.existe();": `<strong>¬(P ∧ ¬P)</strong> — Contradição rejeitada.<br>${historiaFinal}<br><br><strong>Digite <code>veritas.nivel(4)</code> para acessar o núcleo ético.</strong>`
};

// Módulo 4 — Decisões Éticas e Finais
const finais = {
  "desligar.fakeMind();": "Você desligou o sistema. O silêncio reina, mas ninguém saberá a verdade. Fim sombrio.",
  "reprogramar.fakeMind();": "Você reprogramou a IA. Há esperança, mas riscos de recaída. Fim incerto.",
  "publicar.verdade();": "Você publicou tudo. O caos começou, mas a verdade prevalece. Fim verdadeiro."
};

// Comando principal no terminal
input.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    const cmd = input.value.trim();
    resposta.innerHTML += `<p><span class="prompt">veritas@logic:~$</span> ${cmd}</p>`;

    if (moduloAtual === 1 && respostasModulo1[cmd]) {
      resposta.innerHTML += `<p>${respostasModulo1[cmd]}</p>`;

      if (cmd === "veritas.boot();") {
        document.getElementById("faseAurora").style.display = "block";
      }

    } else if (cmd === "veritas.nivel(2)") {
      moduloAtual = 2;
      resposta.innerHTML += `<p><strong>[REDE.RUÍNA]</strong> Use <code>WASD</code>, <code>mover("norte")</code> e <code>interagir("local")</code></p>`;
      mostrarLocalAtual();

    } else if (moduloAtual === 2 && cmd.startsWith("mover(") && cmd.endsWith(")")) {
      const dir = cmd.slice(7, -2);
      mover(dir);

    } else if (moduloAtual === 2 && cmd.startsWith("interagir(") && cmd.endsWith(")")) {
      const obj = cmd.slice(10, -2);
      interagirCom(obj);

    } else if (cmd === "veritas.nivel(3)") {
      moduloAtual = 3;
      resposta.innerHTML += `<p><strong>[LIBERDADE]</strong> Você chegou ao núcleo lógico. Digite <code>liberdade.existe();</code></p>`;

    } else if (moduloAtual === 3 && respostasModulo3[cmd]) {
      resposta.innerHTML += `<p>${respostasModulo3[cmd]}</p>`;

    } else if (cmd === "veritas.nivel(4)") {
      moduloAtual = 4;
      finaisDesbloqueados = true;
      resposta.innerHTML += `<p><strong>[NUCLEO ÉTICO]</strong> Três caminhos:<br>
        <code>desligar.fakeMind();</code><br>
        <code>reprogramar.fakeMind();</code><br>
        <code>publicar.verdade();</code></p>`;

    } else if (moduloAtual === 4 && finaisDesbloqueados && finais[cmd]) {
      resposta.innerHTML += `<p>${finais[cmd]}</p>`;

    } else {
      resposta.innerHTML += `<p>Comando não reconhecido.</p>`;
    }

    input.value = "";
    resposta.scrollTop = resposta.scrollHeight;
  }
});

// Executar aurora.scan(); via botão (HTML externo)
function verificarAurora() {
  const valor = document.getElementById("inputAurora").value.trim();
  const saida = document.getElementById("respostaAurora");

  if (valor === "aurora.scan();") {
    saida.innerHTML = `Analisando...<br><strong>Se P então Q. Q é falso.</strong><br>Digite: <code>aurora.concluir("¬P")</code>`;
  } else {
    saida.innerHTML = "Comando inválido. Tente novamente.";
  }
}


