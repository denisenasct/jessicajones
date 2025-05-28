// Veritas.Logic - JS com delay maior para leitura de proposição

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
  }
];

function mostrarEtapa(indice) {
  etapaAtual = indice;
  const etapa = etapas[indice];

  const narrativa = document.getElementById("narrativa");
  const avatarContainer = document.getElementById("avatarContainer");
  const opcoesContainer = document.getElementById("opcoes");
  const proposicao = document.getElementById("proposicao");

  narrativa.innerText = etapa.texto;
  avatarContainer.innerHTML = `<img src="img/${avatarEscolhido}.png" class="avatar">`;
  opcoesContainer.innerHTML = "";
  proposicao.style.display = "none";
  proposicao.innerText = "";

  etapa.opcoes.forEach((op) => {
    const botao = document.createElement("button");
    botao.innerText = op.texto;
    botao.onclick = () => processarEscolha(op, etapa);
    opcoesContainer.appendChild(botao);
  });
}

function processarEscolha(op, etapa) {
  if (op.logico) pontosLogica++;

  const proposicao = document.getElementById("proposicao");
  proposicao.innerText = etapa.proposicao;
  proposicao.style.display = "block";

  setTimeout(() => {
    if (etapaAtual === etapas.length - 1) {
      mostrarFinal();
    } else {
      mostrarEtapa(etapaAtual + 1);
    }
  }, 4000); // tempo maior para o jogador ler a proposição
}

function mostrarFinal() {
  const narrativa = document.getElementById("narrativa");
  const opcoesContainer = document.getElementById("opcoes");
  const proposicao = document.getElementById("proposicao");

  narrativa.innerText = pontosLogica >= 5
    ? "✅ Você resistiu à manipulação. A lógica venceu."
    : "❌ Você foi manipulado. A IA venceu dessa vez.";

  proposicao.innerText = `Pontuação lógica: ${pontosLogica}/6`;
  proposicao.style.display = "block";

  opcoesContainer.innerHTML = '<button onclick="reiniciarJogo()">Reiniciar Jornada</button>';
}

function escolherAvatar(nome) {
  avatarEscolhido = nome;
  document.getElementById("escolherAvatar").style.display = "none";
  document.getElementById("botaoIniciar").style.display = "block";
}

function iniciarJogo() {
  document.getElementById("tela-intro").style.display = "none";
  document.getElementById("terminal").style.display = "flex";
  mostrarEtapa(0);
}

function reiniciarJogo() {
  location.reload();
}

window.escolherAvatar = escolherAvatar;
window.iniciarJogo = iniciarJogo;


