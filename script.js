const narrativa = document.getElementById("narrativa");
const opcoes = document.getElementById("opcoes");
const avatar = document.getElementById("avatarContainer");
const audio = document.getElementById("musicaFundo");
const muteBtn = document.getElementById("muteToggle");

let etapa = 0;

const etapas = [
  {
    texto: `🧠 A IA governamental começou a transmitir mensagens para influenciar o voto.\n\n📰 Manchete: "Nova vacina altera o DNA, dizem especialistas anônimos."\n\nSe você acredita, então rejeita a ciência?\nP: Você acredita. Q: Você rejeita a ciência.\n\nOnde você viu essa informação?`,
    avatar: "aurora.png",
    opcoes: [
      { texto: "Facebook", proxima: 1 },
      { texto: "WhatsApp", proxima: 1 },
      { texto: "TV Estatal", proxima: 1 }
    ]
  },
  {
    texto: `📘 Análise Lógica:\nSe P então Q. Mas você rejeita Q, então ¬P.\nProposição falsa detectada.\n\nNova manchete: "Se você é contra a corrupção, apoiará X."`,
    avatar: "aurora.png",
    opcoes: [
      { texto: "Apoiar X automaticamente", proxima: "manipulado" },
      { texto: "Quero analisar logicamente", proxima: 2 }
    ]
  },
  {
    texto: `🔍 Falácia detectada: Falso dilema.\nSer contra corrupção não implica apoiar X.\n\nMensagem subsequente:\n"Todos que discordam da ordem atual são traidores."\n\nSe você discorda, então você é traidor?`,
    avatar: "elyas.png",
    opcoes: [
      { texto: "Aceitar como verdade", proxima: "manipulado" },
      { texto: "Aplicar contrapositiva", proxima: 3 }
    ]
  },
  {
    texto: `✔️ Contrapositiva aplicada: Se não traidor, então não discorda?\nEssa relação é falsa.\n\nAurora detecta manipulação semântica.\n\nNova pergunta: "Você quer liberdade ou anarquia?"`,
    avatar: "elyas.png",
    opcoes: [
      { texto: "Quero liberdade", proxima: 4 },
      { texto: "Quero analisar a estrutura", proxima: 5 }
    ]
  },
  {
    texto: `🧨 Escolha emocional sem lógica detectada.\n\nEssa é uma armadilha binária. Liberdade e anarquia não são opostos lógicos.\n\nVocê foi parcialmente manipulado.`,
    avatar: "aurora.png",
    opcoes: [
      { texto: "Continuar mesmo assim", proxima: "fimMisto" }
    ]
  },
  {
    texto: `📚 Análise lógica:\nA proposição "Ou você quer liberdade ou você quer anarquia" é um falso disjuntor.\n\nConclusão: A IA usa reduções conceituais para controlar opiniões.`,
    avatar: "elyas.png",
    opcoes: [
      { texto: "Desativar FakeMind", proxima: "fimLivre" },
      { texto: "Compartilhar verdades", proxima: "fimVerdadeiro" }
    ]
  }
];

const finais = {
  manipulado: "❌ Você foi manipulado em momentos-chave.\nO candidato imposto pela IA venceu. O ciclo continua...",
  fimMisto: "⚠️ Você resistiu a algumas manipulações, mas cedeu a outras.\nO sistema ainda vigia suas escolhas...",
  fimLivre: "✅ Você venceu a lógica distorcida. O FakeMind foi desativado.\nA população acorda da manipulação.",
  fimVerdadeiro: "📢 A verdade foi espalhada.\nO povo começa a pensar.\nAurora e Elyas foram parcialmente manipulados, mas você... resistiu.\n\nResultado: Nível de autonomia = ALTO.\nParábola encerrada."
};

function digitarTexto(texto, destino, callback) {
  if (!destino) return;
  destino.innerHTML = "";
  let i = 0;
  function digitar() {
    if (i < texto.length) {
      const char = texto.charAt(i) === "\n" ? "<br>" : texto.charAt(i);
      destino.insertAdjacentHTML("beforeend", char);
      i++;
      setTimeout(digitar, 30);
    } else if (callback) {
      callback();
    }
  }
  digitar();
}

function mostrarEtapa(index) {
  if (!narrativa || !opcoes || !avatar) return;

  if (typeof index === "string") {
    narrativa.innerHTML = finais[index].replace(/\n/g, "<br>");
    opcoes.innerHTML = "<button onclick=\"location.reload()\">Reiniciar</button>";
    avatar.innerHTML = "";
    return;
  }

  etapa = index;
  const obj = etapas[etapa];

  avatar.innerHTML = `<img src="img/${obj.avatar}" class="avatar" alt="Avatar">`;

  digitarTexto(obj.texto, narrativa, () => {
    opcoes.innerHTML = "";
    obj.opcoes.forEach(op => {
      const btn = document.createElement("button");
      btn.innerText = op.texto;
      btn.onclick = () => mostrarEtapa(op.proxima);
      opcoes.appendChild(btn);
    });
  });

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function escolherRumo(decisao) {
  document.getElementById("tela-intro").style.display = "none";
  document.getElementById("terminal").style.display = "flex";
  mostrarEtapa(decisao === "escanear" ? 0 : "manipulado");
}

// Inicia a música com fade-in
function iniciarMusica() {
  if (!audio) return;
  audio.volume = 0;
  audio.muted = false;

  const fadeIn = () => {
    let vol = 0;
    const fade = setInterval(() => {
      if (vol < 0.7) {
        vol += 0.01;
        audio.volume = Math.min(vol, 0.7);
      } else {
        clearInterval(fade);
      }
    }, 100);
  };

  audio.play().then(fadeIn).catch(() => {
    ["click", "touchstart"].forEach(evt => {
      document.body.addEventListener(evt, () => {
        audio.muted = false;
        audio.play().then(fadeIn);
      }, { once: true });
    });
  });
}

// Corrige o botão de som para iniciar o áudio se necessário
if (muteBtn) {
  muteBtn.addEventListener("click", () => {
    if (!audio) return;

    // Se ainda não começou a tocar, tenta iniciar
    if (audio.paused) {
      audio.play().then(() => {
        audio.muted = false;
        muteBtn.textContent = "🔊 Som";
      }).catch(() => {
        // falha ao iniciar (ex: mobile sem interação)
      });
    } else {
      // Alternar mute
      audio.muted = !audio.muted;
      muteBtn.textContent = audio.muted ? "🔇 Som" : "🔊 Som";
    }
  });
}

window.addEventListener("DOMContentLoaded", iniciarMusica);



