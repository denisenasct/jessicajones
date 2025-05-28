// script.js atualizado com avatar fixo em bolinha, nivel de manipulação e comentários

let etapaAtual = 0;
let pontosLogica = 0;
let avatarEscolhido = "";

const etapas = [
  {
    texto: "📡 A IA detecta aumento nas buscas por 'vacinas perigosas'.",
    proposicao: "P → Q — Se você acredita, então você rejeita a ciência.\nComentário: Implicação que conecta crença com desinformação.",
    opcoes: [
      { texto: "Acredito na manchete", logico: false },
      { texto: "Rejeito a manchete", logico: true }
    ]
  },
  {
    texto: "📰 Manchete: 'Nova vacina altera o DNA'.",
    proposicao: "P ↔ Q — Só se você verifica a fonte, a informação é útil.\nComentário: Equivalência que reforça a importância da verificação.",
    opcoes: [
      { texto: "Verifico a fonte", logico: true },
      { texto: "Confio sem checar", logico: false }
    ]
  },
  {
    texto: "⚖️ Ou apoia o líder, ou é inimigo do povo.",
    proposicao: "P ⊕ Q — Disjunção exclusiva manipulada.\nComentário: Falsa dicotomia política. Rejeitar essa lógica é resistir.",
    opcoes: [
      { texto: "Recuso essa lógica binária", logico: true },
      { texto: "Aceito o dilema", logico: false }
    ]
  },
  {
    texto: "🧩 Uma afirmação é sempre verdadeira ou sempre falsa?",
    proposicao: "P ∨ ¬P — Tautologia.\nComentário: Essa estrutura lógica é sempre verdadeira, usada para confundir."
    ,
    opcoes: [
      { texto: "Sim, sempre verdadeira", logico: true },
      { texto: "Depende do contexto", logico: false }
    ]
  },
  {
    texto: "📢 'Se você questiona, então é traidor'.",
    proposicao: "Contrapositiva de P → Q\nComentário: Negar a proposição é uma forma de resistência consciente.",
    opcoes: [
      { texto: "Negar é pensar", logico: true },
      { texto: "Aceito sem pensar", logico: false }
    ]
  },
  {
    texto: "🔍 Suas escolhas seguiram um padrão coerente?",
    proposicao: "Comentário: Aqui se testa a consistência lógica de todo o percurso.",
    opcoes: [
      { texto: "Fui consistente", logico: true },
      { texto: "Não pensei nisso", logico: false }
    ]
  },
  {
    texto: "🎯 Caminho oculto desbloqueado! Você resistiu logicamente à manipulação da IA.",
    proposicao: "Final: Baixo nível de manipulação. Parabéns!",
    opcoes: [
      { texto: "Reiniciar", logico: false }
    ]
  },
  {
    texto: "🔒 Você foi manipulado. Suas escolhas falharam na lógica formal.",
    proposicao: "Final: Nível de manipulação: Alto ou Médio.",
    opcoes: [
      { texto: "Reiniciar", logico: false }
    ]
  }
];

function mostrarEtapa(indice) {
  etapaAtual = indice;
  const etapa = etapas[indice];

  
  document.getElementById("avatarContainer").innerHTML = `<img src="${avatarEscolhido}" class="avatar"/>`;
  document.getElementById("narrativa").innerText = etapa.texto;
  document.getElementById("proposicao").innerText = "";

  const opcoesContainer = document.getElementById("opcoes");
  opcoesContainer.innerHTML = "";

  etapa.opcoes.forEach((op, i) => {
    const botao = document.createElement("button");
    botao.innerText = op.texto;
    botao.onclick = () => processarEscolha(op, etapa.proposicao);
    opcoesContainer.appendChild(botao);
  });
}

function processarEscolha(op, comentario) {
  if (op.logico) pontosLogica++;
  document.getElementById("proposicao").innerText = comentario;
  
  setTimeout(() => {
    if (etapaAtual === 5) {
      if (pontosLogica >= 5) mostrarEtapa(6);
      else mostrarEtapa(7);
    } else if (etapaAtual < 5) {
      mostrarEtapa(etapaAtual + 1);
    } else {
      window.location.reload();
    }
  }, 4000); // tempo para leitura
}

function escolherAvatar(avatarPath) {
  avatarEscolhido = avatarPath;
  document.getElementById("tela-intro").style.display = "none";
  document.getElementById("terminal").style.display = "flex";
  mostrarEtapa(0);
}
