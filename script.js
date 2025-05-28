// Veritas.Logic - script.js com final secreto e novas proposições lógicas

let etapaAtual = 0;
let pontosLogica = 0;

const etapas = [
  {
    avatar: "img/ia1.png",
    texto: "📡 A IA governamental detectou um aumento nas buscas por 'vacinas perigosas'.\nP: Você acredita. Q: Você rejeita a ciência.\nProposição: P → Q",
    opcoes: [
      { texto: "Acredito", logico: true },
      { texto: "Não acredito", logico: false }
    ]
  },
  {
    avatar: "img/ia2.png",
    texto: "📰 Manchete: 'Nova vacina altera o DNA, dizem especialistas anônimos.'\nP ↔ Q — Se e somente se você verifica a fonte, a informação é útil.",
    opcoes: [
      { texto: "Verifico a fonte", logico: true },
      { texto: "Confio sem checar", logico: false }
    ]
  },
  {
    avatar: "img/ia3.png",
    texto: "⚖️ Dilema: Ou você apoia o líder, ou é inimigo do povo.\nProposição falsa: P ⊕ Q (disjunção exclusiva manipulada)",
    opcoes: [
      { texto: "Recuso a dicotomia", logico: true },
      { texto: "Aceito o dilema", logico: false }
    ]
  },
  {
    avatar: "img/ia4.png",
    texto: "🧩 Análise: Uma afirmação é sempre verdadeira ou sempre falsa?\nTautologia: P ∨ ¬P",
    opcoes: [
      { texto: "Sim, é sempre verdadeira", logico: true },
      { texto: "Depende do contexto", logico: false }
    ]
  },
  {
    avatar: "img/ia5.png",
    texto: "📢 Propaganda: 'Se você questiona, então é traidor.'\nContrapositiva de P → Q",
    opcoes: [
      { texto: "Negar é pensar", logico: true },
      { texto: "Aceito sem pensar", logico: false }
    ]
  },
  {
    avatar: "img/ia6.png",
    texto: "🔍 Reflexão: As decisões tomadas até aqui formam um padrão lógico coerente?",
    opcoes: [
      { texto: "Sim, fui consistente", logico: true },
      { texto: "Não pensei nisso", logico: false }
    ]
  },
  {
    avatar: "img/ia7.png",
    texto: "🎯 Caminho oculto desbloqueado! Você resistiu logicamente à manipulação da IA.",
    opcoes: [
      { texto: "Finalizar com consciência", logico: true }
    ]
  },
  {
    avatar: "img/ia7.png",
    texto: "🔒 Você foi manipulado. Suas escolhas não seguiram a lógica formal.",
    opcoes: [
      { texto: "Reiniciar", logico: false }
    ]
  }
];

function mostrarEtapa(indice) {
  etapaAtual = indice;
  const etapa = etapas[indice];
  document.getElementById("avatarContainer").innerHTML = `<img src="${etapa.avatar}" class="avatar">`;
  document.getElementById("narrativa").innerText = etapa.texto;

  const opcoesContainer = document.getElementById("opcoes");
  opcoesContainer.innerHTML = "";

  etapa.opcoes.forEach((op, i) => {
    const botao = document.createElement("button");
    botao.innerText = op.texto;
    botao.onclick = () => processarEscolha(op);
    opcoesContainer.appendChild(botao);
  });
}

function processarEscolha(op) {
  if (op.logico) pontosLogica++;

  // Final secreto se atingiu lógica suficiente
  if (etapaAtual === 5) {
    if (pontosLogica >= 5) {
      mostrarEtapa(6); // Final secreto
    } else {
      mostrarEtapa(7); // Final manipulado
    }
    return;
  }

  mostrarEtapa(etapaAtual + 1);
}

function escolherRumo(acao) {
  document.getElementById("tela-intro").style.display = "none";
  document.getElementById("terminal").style.display = "flex";
  mostrarEtapa(0);
}



