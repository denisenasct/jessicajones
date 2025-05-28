// Veritas.Logic - script.js atualizado com comentários lógicos e nível de manipulação

let etapaAtual = 0;
let pontosLogica = 0;
let avatarEscolhido = "";

const etapas = [
  {
    avatar: "img/ia1.png",
    texto: "📡 A IA detecta: buscas por 'vacinas perigosas' cresceram.",
    proposicao: "P → Q",
    comentario: "Se você acredita (P), então rejeita a ciência (Q). Uma implicação manipuladora.",
    opcoes: [
      { texto: "Acredito na manchete", logico: false },
      { texto: "Investigo fontes confiáveis", logico: true }
    ]
  },
  {
    avatar: "img/ia2.png",
    texto: "📰 Notícia: 'Nova vacina altera seu DNA'.",
    proposicao: "P ↔ Q",
    comentario: "Apenas se você verifica a fonte (P), a informação será útil (Q). Relação bicondicional.",
    opcoes: [
      { texto: "Verifico a fonte", logico: true },
      { texto: "Confio sem checar", logico: false }
    ]
  },
  {
    avatar: "img/ia3.png",
    texto: "⚖️ Campanha: 'Ou você apoia o governo, ou é traidor'.",
    proposicao: "P ⊕ Q",
    comentario: "Falsa disjunção exclusiva: a realidade não é binária.",
    opcoes: [
      { texto: "Rejeito a dicotomia", logico: true },
      { texto: "Aceito sem questionar", logico: false }
    ]
  },
  {
    avatar: "img/ia4.png",
    texto: "🧠 Alguém diz: 'tudo é mentira!'",
    proposicao: "P ∨ ¬P",
    comentario: "Tautologia: essa proposição é sempre verdadeira, independente de P.",
    opcoes: [
      { texto: "Entendo o paradoxo", logico: true },
      { texto: "Concordo cegamente", logico: false }
    ]
  },
  {
    avatar: "img/ia5.png",
    texto: "📢 'Quem critica o sistema quer destruí-lo'.",
    proposicao: "¬Q → ¬P",
    comentario: "Contrapositiva de uma implicação. Negar não significa ser contra.",
    opcoes: [
      { texto: "Questionar é pensar", logico: true },
      { texto: "Aceito a repressão", logico: false }
    ]
  },
  {
    avatar: "img/ia6.png",
    texto: "🔍 Reflexão: suas escolhas foram lógicas?",
    proposicao: "Meta-análise",
    comentario: "Consistência lógica indica pensamento crítico.",
    opcoes: [
      { texto: "Sim, segui a lógica", logico: true },
      { texto: "Fui levado pela emoção", logico: false }
    ]
  },
  {
    avatar: "img/ia7.png",
    texto: "🎯 Caminho secreto desbloqueado! Você resistiu logicamente à IA.",
    final: true,
    opcoes: [
      { texto: "Reiniciar jornada", logico: true, reiniciar: true }
    ]
  },
  {
    avatar: "img/ia7.png",
    texto: "🔒 Manipulação detectada. Suas escolhas foram inconsistentes.",
    final: true,
    opcoes: [
      { texto: "Reiniciar jornada", logico: false, reiniciar: true }
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

  etapa.opcoes.forEach(op => {
    const botao = document.createElement("button");
    botao.innerText = op.texto;
    botao.onclick = () => processarEscolha(op);
    opcoesContainer.appendChild(botao);
  });
}

function mostrarComentario(proposicao, comentario) {
  const narrativa = document.getElementById("narrativa");
  narrativa.innerHTML += `<div class='comentario-logico'><strong>${proposicao}</strong><br>${comentario}</div>`;
}

function processarEscolha(op) {
  if (op.reiniciar) {
    window.location.reload();
    return;
  }

  if (op.logico) pontosLogica++;

  const etapa = etapas[etapaAtual];
  mostrarComentario(etapa.proposicao, etapa.comentario);

  setTimeout(() => {
    if (etapaAtual === 5) {
      if (pontosLogica >= 5) {
        mostrarEtapa(6); // Final secreto
      } else {
        mostrarEtapa(7); // Final manipulado
      }
      mostrarNivelManipulacao();
    } else {
      mostrarEtapa(etapaAtual + 1);
    }
  }, 1800);
}

function mostrarNivelManipulacao() {
  let nivel;
  if (pontosLogica >= 5) {
    nivel = "Manipulação: Baixa. Você pensou criticamente.";
  } else if (pontosLogica >= 3) {
    nivel = "Manipulação: Média. Alerta para influências externas.";
  } else {
    nivel = "Manipulação: Alta. Você foi enganado.";
  }
  const resultado = document.createElement("div");
  resultado.className = "resultado-final";
  resultado.innerText = nivel;
  document.getElementById("opcoes").appendChild(resultado);
}

function escolherAvatar(nome) {
  avatarEscolhido = nome;
  document.getElementById("tela-intro").style.display = "none";
  document.getElementById("terminal").style.display = "flex";
  mostrarEtapa(0);
}

