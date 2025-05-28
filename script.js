// Veritas.Logic - script.js atualizado com avatar escolhido e proposição revelada após escolha

let etapaAtual = 0;
let pontosLogica = 0;
let avatarEscolhido = "img/aurora.png";

const etapas = [
  {
    texto: "📡 A IA governamental detectou um aumento nas buscas por 'vacinas perigosas'.",
    proposicao: "P → Q — Se você acredita, então você rejeita a ciência.",
    opcoes: [
      { texto: "Acredito", logico: false },
      { texto: "Não acredito", logico: true }
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
    proposicao: "P ⊕ Q — Disjunção exclusiva manipulada (falso dilema)",
    opcoes: [
      { texto: "Recuso a dicotomia", logico: true },
      { texto: "Aceito o dilema", logico: false }
    ]
  },
  {
    texto: "🧩 Uma afirmação é sempre verdadeira ou sempre falsa?",
    proposicao: "P ∨ ¬P — Tautologia clássica da lógica",
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
    proposicao: "(sem proposição explícita, fase avaliativa)",
    opcoes: [
      { texto: "Sim, fui consistente", logico: true },
      { texto: "Não pensei nisso", logico: false }
    ]
  }
];

const finais = {
  vitoria: "✅ Você resistiu à manipulação. A lógica venceu. Nível de consciência: elevado.",
  derrota: "❌ Você foi manipulado. Suas escolhas não seguiram a lógica formal."
};

function mostrarEtapa(indice) {
  etapaAtual = indice;
  const etapa = etapas[indice];

  document.getElementById("avatarContainer").innerHTML = `<img src="${avatarEscolhido}" class="avatar">`;
  document.getElementById("narrativa").innerText = etapa.texto;
  document.getElementById("proposicao").innerText = ""; // Esconde proposição inicialmente

  const opcoesContainer = document.getElementById("opcoes");
  opcoesContainer.innerHTML = "";

  etapa.opcoes.forEach((op) => {
    const botao = document.createElement("button");
    botao.innerText = op.texto;
    botao.onclick = () => processarEscolha(op, etapa.proposicao);
    opcoesContainer.appendChild(botao);
  });
}

function processarEscolha(op, proposicaoTexto) {
  if (op.logico) pontosLogica++;
  document.getElementById("proposicao").innerText = proposicaoTexto;

  setTimeout(() => {
    if (etapaAtual === etapas.length - 1) {
      mostrarFinal();
    } else {
      mostrarEtapa(etapaAtual + 1);
    }
  }, 1800);
}

function mostrarFinal() {
  document.getElementById("narrativa").innerText = pontosLogica >= 5 ? finais.vitoria : finais.derrota;
  document.getElementById("proposicao").innerText = "Pontuação lógica: " + pontosLogica + "/6";
  document.getElementById("opcoes").innerHTML =
    '<button onclick="location.reload()">Reiniciar Jornada</button>';
}

function iniciarJogoComAvatar(caminhoAvatar) {
  avatarEscolhido = caminhoAvatar;
  document.getElementById("tela-intro").style.display = "none";
  document.getElementById("terminal").style.display = "flex";
  mostrarEtapa(0);
}

window.iniciarJogoComAvatar = iniciarJogoComAvatar;


