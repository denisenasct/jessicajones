let avatar = localStorage.getItem("avatar") || "";
let etapaAtual = 0;

const narrativa = [
  {
    id: 0,
    texto: "🔎 Terminal: Sinais detectados no protocolo de mídia \"V-Stream\". Um vídeo popular contradiz dados verificáveis.",
    escolhas: [
      { texto: "Ignorar e seguir", destino: 1 },
      { texto: "Analisar os comentários", destino: 2 }
    ]
  },
  {
    id: 1,
    texto: "⚡ Alerta: Passividade detectada. A IA sugere fontes similares. Você entra em um ciclo de confirmação...",
    escolhas: [
      { texto: "Recuar e investigar", destino: 2 },
      { texto: "Continuar no fluxo", destino: 3 }
    ]
  },
  {
    id: 2,
    texto: "💬 Comentários mostram padrões linguísticos semelhantes — frases como 'todo mundo sabe' ou 'se você não vê, é burro'.",
    escolhas: [
      { texto: "Filtrar por fontes confiáveis", destino: 4 },
      { texto: "Responder com lógica proposicional", destino: 5 }
    ]
  },
  {
    id: 3,
    texto: "👁️‍🗨️ Você continua exposto ao conteúdo até perder referências confiáveis. Fim do caminho lógico.",
    escolhas: [
      { texto: "Reiniciar", destino: 0 }
    ]
  },
  {
    id: 4,
    texto: "🕵️ A filtragem revela que a maioria dos comentários vem de bots. Você recupera parte da consciência crítica.",
    escolhas: [
      { texto: "Prosseguir para investigar o autor do vídeo", destino: 6 }
    ]
  },
  {
    id: 5,
    texto: "🧠 Você responde com: 'Se P então Q. Mas não Q. Logo, não P'. Alguns usuários reagem com raiva. Outros silenciam.",
    escolhas: [
      { texto: "Refletir sobre a reação", destino: 6 }
    ]
  },
  {
    id: 6,
    texto: "🤖 O sistema reconhece um desvio do padrão. Sua consciência se fortalece. O algoritmo hesita em sugerir novos conteúdos.",
    escolhas: [
      { texto: "Ficar em silêncio e observar", destino: 7 },
      { texto: "Infiltrar-se nos fóruns de criação de conteúdo", destino: 8 }
    ]
  },
  {
    id: 7,
    texto: "🔮 O silêncio permite introspecção. Você começa a reconhecer padrões internos de manipulação aprendidos ao longo da vida.",
    escolhas: [
      { texto: "Reiniciar", destino: 0 }
    ]
  },
  {
    id: 8,
    texto: "🛠️ Nos bastidores da plataforma, criadores usam padrões de atenção baseados em falácias emocionais. Você compreende como a verdade foi sequestrada.",
    escolhas: [
      { texto: "Liberar um manifesto lógico", destino: 9 },
      { texto: "Silenciar e armazenar dados para depois", destino: 7 }
    ]
  },
  {
    id: 9,
    texto: "📢 O manifesto circula. Algumas consciências despertam. A IA reconfigura sua abordagem. Você não venceu. Mas mudou o jogo.",
    escolhas: [
      { texto: "Reiniciar Jogo", destino: "reiniciar" }
    ]
  }
];

// Função chamada ao clicar em um avatar
function setarAvatar(path) {
  localStorage.setItem("avatar", path);
  iniciarNarrativa();
}

// Inicia o jogo e mostra a primeira cena
function iniciarNarrativa() {
  document.getElementById("tela-intro").style.display = "none";
  document.getElementById("terminal").style.display = "flex";
  mostrarCena(0);
}

// Mostra a cena atual com texto, avatar e opções
function mostrarCena(id) {
  const cena = narrativa.find(c => c.id === id);
  etapaAtual = id;

  const avatarPath = localStorage.getItem("avatar") || "img/aurora.png";
  document.getElementById("avatarContainer").innerHTML = `
    <img src="${avatarPath}" class="avatar" alt="avatar" onerror="this.style.display='none'" />
  `;

  document.getElementById("narrativa").innerHTML = `<p>${cena.texto}</p>`;
  const opcoes = document.getElementById("opcoes");
  opcoes.innerHTML = "";

  cena.escolhas.forEach(escolha => {
    const botao = document.createElement("button");
    botao.innerText = escolha.texto;
    botao.onclick = () => {
      if (escolha.destino === "reiniciar") {
        reiniciarParaInicio();
      } else {
        mostrarCena(escolha.destino);
      }
    };
    opcoes.appendChild(botao);
  });
}

// Retorna à tela de introdução e limpa o avatar
function reiniciarParaInicio() {
  localStorage.removeItem("avatar");
  document.getElementById("terminal").style.display = "none";
  document.getElementById("tela-intro").style.display = "flex";
  document.getElementById("descricaoDigitada").innerHTML = "";
  window.location.reload(); // opcional para reiniciar a digitação e áudio
}

