// Veritas.Logic - script.js atualizado com avatar, reinício, e proposições ocultas

let etapaAtual = 0;
let pontosLogica = 0;
let avatarEscolhido = "";

const etapas = [
  {
    texto: "📡 A IA governamental detectou um aumento nas buscas por 'vacinas perigosas'.",
    proposicao: "P → Q — P: Você acredita. Q: Você rejeita a ciência.",
    opcoes: [
      { texto: "Acredito", logico: true },
      { texto: "Não acredito", logico: false }
    ]
  },
  {
    texto: "📰 Manchete: 'Nova vacina altera o DNA, dizem especialistas anônimos.'",
    proposicao: "P ↔ Q — Se e somente se você verifica a fonte, a informação é útil.",
    opcoes: [
      { texto: "Verifico a fonte", logico: true },
      { texto: "Confio sem checar", logico: false }
    ]
  },
  {
    texto: "⚖️ Dilema: Ou você apoia o líder, ou é inimigo do povo.",
    proposicao: "P ⊕ Q — disjunção exclusiva manipulada",
    opcoes: [
      { texto: "Recuso a dicotomia", logico: true },
      { texto: "Aceito o dilema", logico: false }
    ]
  },
  {
    texto: "🧩 Análise: Uma afirmação é sempre verdadeira ou sempre falsa?",
    proposicao: "Tautologia: P ∨ ¬P",
    opcoes: [
      { texto: "Sim, é sempre verdadeira", logico: true },
      { texto: "Depende do contexto", logico: false }
    ]
  },
  {
    texto: "📢 Propaganda: 'Se você questiona, então é traidor.'",
    proposicao: "Contrapositiva de P → Q",
    opcoes: [
      { texto: "Negar é pensar", logico: true },
      { texto: "Aceito sem pensar", logico: false }
    ]
  },
  {
    texto: "🔍 Reflexão: As decisões tomadas até aqui formam um padrão lógico coerente?",
    proposicao: "Consistência lógica acumulada.",
    opcoes: [
      { texto: "Sim, fui consistente", logico: true },
      { texto: "Não pensei nisso", logico: false }
    ]
  },
  {
    texto: "🎯 Caminho oculto desbloqueado! Você resistiu logicamente à manipulação da IA.",
    proposicao: "Pontuação lógica suficiente para final secreto.",
    opcoes: [
      { texto: "Finalizar com consciência", logico: true }]
  },
  {
    texto: "🔒 Você foi manipulado. Suas escolhas não seguiram a lógica formal.",
    proposicao: "Pontuação insuficiente. Fim alternativo.",
    opcoes: [
      { texto: "Reiniciar", logico: false }]
  }
];

function mostrarEtapa(indice) {
  etapaAtual = indice;
  const etapa = etapas[indice];
  const narrativa = document.getElementById("narrativa");
  const avatarContainer = document.getElementById("avatarContainer");
  const opcoesContainer = document.getElementById("opcoes");

  narrativa.innerText = etapa.texto;
  avatarContainer.innerHTML = `<img src="${avatarEscolhido}" class="avatar">`;
  opcoesContainer.innerHTML = "";

  etapa.opcoes.forEach((op, i) => {
    const botao = document.createElement("button");
    botao.innerText = op.texto;
    botao.onclick = () => processarEscolha(op, etapa);
    opcoesContainer.appendChild(botao);
  });
}

function processarEscolha(op, etapa) {
  if (op.logico) pontosLogica++;

  if (etapaAtual === 5) {
    if (pontosLogica >= 5) mostrarEtapa(6);
    else mostrarEtapa(7);
    return;
  }

  mostrarEtapa(etapaAtual + 1);

  setTimeout(() => {
    const proposicaoEl = document.createElement("div");
    proposicaoEl.className = "proposicao";
    proposicaoEl.innerHTML = `💡 ${etapa.proposicao}`;
    document.getElementById("narrativa").appendChild(proposicaoEl);
  }, 300);
}

function escolherAvatar(avatar) {
  avatarEscolhido = avatar;
  document.getElementById("intro").style.display = "none";
  document.getElementById("terminal").style.display = "flex";
  mostrarEtapa(0);
}

function reiniciarJogo() {
  window.location.reload();
}


