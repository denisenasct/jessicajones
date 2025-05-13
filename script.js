// script.js — Veritas.Logic com movimento WASD e mapa visual

const input = document.getElementById("inputComando");
const resposta = document.getElementById("resposta");
const mapaVisual = document.getElementById("mapaVisual");

let moduloAtual = 1;
let localAtual = "centro";

// ======== MÓDULO 1: BOOT.LOGIC ========
const historiaAurora = `Aurora foi a primeira a detectar ruídos nos protocolos da verdade. Seu módulo foi isolado após uma denúncia anônima. Desde então, vive dentro de loops de validação lógica.`;
const historiaElyas = `Elyas sobrevive nas margens da rede, decifrando mentiras. Ele busca Aurora para expor a sequência que deu origem ao FakeMind.`;

const respostasModulo1 = {
  "veritas.boot();": `Sistema carregado. Infiltração iniciada.<br><br><strong>Aurora conectada...</strong><br><em>${historiaAurora}</em><br><br>Digite <code>aurora.scan();</code>`,
  "aurora.scan();": `Analisando...<br><strong>Se P então Q. Q é falso.</strong><br>Digite: <code>aurora.concluir(\"¬P\")</code>`,
  'aurora.concluir("¬P")': `Conclusão válida. Mentira identificada: "O colapso não foi causado por IA."<br><br><strong>Elyas conectado...</strong><br><em>${historiaElyas}</em><br><br>Digite <code>elyas.track(\"aurora\")</code>`,
  'elyas.track("aurora")': `Fragmentos encontrados:<br><strong>P ∨ Q</strong><br>P: Aurora escapou.<br>Q: Elyas foi traído.<br>Digite: <code>elyas.inferir(\"P ou Q\")</code>`,
  'elyas.inferir("P ou Q")': `Inferência aceita. Ambos sobreviveram.<br><br><strong>Digite <code>veritas.nivel(2)</code> para continuar.</strong>`
};

// ======== MÓDULO 2: REDE.RUÍNA COM VISUAL ========
const mapaRede = {
  centro: { norte: "antena", leste: "terminal", sul: "ruinas" },
  antena: { sul: "centro" },
  terminal: { oeste: "centro" },
  ruinas: { norte: "centro" }
};

const descritivoLocais = {
  centro: "Você está no centro da cidade digital. Tudo está em ruínas.",
  antena: "Você vê uma antena caída, ainda piscando em vermelho.",
  terminal: "Um terminal abandonado, com dados corrompidos.",
  ruinas: "As ruínas ecoam vozes antigas. Rastro de fake news detectado."
};

function mostrarLocalAtual() {
  resposta.innerHTML += `<p><strong>[Local]</strong> ${descritivoLocais[localAtual]}</p>`;
  if (mapaVisual) mapaVisual.textContent = `Local atual: ${localAtual.toUpperCase()}`;
}

function mover(direcao) {
  if (mapaRede[localAtual] && mapaRede[localAtual][direcao]) {
    localAtual = mapaRede[localAtual][direcao];
    mostrarLocalAtual();
  } else {
    resposta.innerHTML += `<p><strong>Não é possível ir para ${direcao}.</strong></p>`;
  }
}

// Movimento com teclas WASD
document.addEventListener("keydown", function (e) {
  if (moduloAtual === 2 && ["w", "a", "s", "d"].includes(e.key.toLowerCase())) {
    const tecla = e.key.toLowerCase();
    if (tecla === "w") mover("norte");
    if (tecla === "a") mover("oeste");
    if (tecla === "s") mover("sul");
    if (tecla === "d") mover("leste");
  }
});

// ======== MÓDULO 3: LIBERDADE ========
const historiaFinal = `Você entrou em um campo de energia onde o FakeMind não tem domínio. Aqui, as proposições são reconstruídas.`;
const respostasModulo3 = {
  "liberdade.existe();": `<strong>¬(P ∧ ¬P)</strong> — Contradição rejeitada.<br>A verdade vive quando a lógica prevalece.<br><br>${historiaFinal}<br><br>Digite <code>veritas.finalizar();</code>`,
  "veritas.finalizar();": `Você desativou o núcleo do FakeMind. A verdade está restaurada.<br><br><em>Jogo Finalizado</em>`
};

// ======== COMANDOS PRINCIPAIS ========
input.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    const cmd = input.value.trim();
    resposta.innerHTML += `<p><span class="prompt">veritas@logic:~$</span> ${cmd}</p>`;

    if (moduloAtual === 1 && respostasModulo1[cmd]) {
      resposta.innerHTML += `<p>${respostasModulo1[cmd]}</p>`;
    } else if (cmd.startsWith("veritas.nivel(2)")) {
      moduloAtual = 2;
      resposta.innerHTML += `<p><strong>[REDE.RUÍNA]</strong> Use <code>WASD</code> ou <code>mover(\"norte\")</code> etc.</p>`;
      mostrarLocalAtual();
    } else if (moduloAtual === 2 && cmd.startsWith("mover(") && cmd.endsWith(")")) {
      const dir = cmd.slice(7, -2);
      mover(dir);
    } else if (cmd === "veritas.nivel(3)") {
      moduloAtual = 3;
      resposta.innerHTML += `<p><strong>[MÓDULO 3 – LIBERDADE]</strong><br>Você chegou ao núcleo livre da rede.</p><p>Digite <code>liberdade.existe();</code></p>`;
    } else if (moduloAtual === 3 && respostasModulo3[cmd]) {
      resposta.innerHTML += `<p>${respostasModulo3[cmd]}</p>`;
    } else {
      resposta.innerHTML += `<p>Comando não reconhecido.</p>`;
    }

    input.value = "";
    resposta.scrollTop = resposta.scrollHeight;
  }
});
