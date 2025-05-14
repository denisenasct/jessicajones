const narrativa = document.getElementById("narrativa");
const opcoes = document.getElementById("opcoes");
const avatar = document.getElementById("avatarContainer");
const audio = document.getElementById("musicaFundo");
const muteBtn = document.getElementById("muteToggle");

let etapa = 0;

const etapas = [
  {
    texto: \uD83E\uDDE0 A IA governamental come\u00E7ou a transmitir mensagens para influenciar o voto.\n\n\uD83D\uDCF0 Manchete: "Nova vacina altera o DNA, dizem especialistas an\u00F4nimos."\n\nSe voc\u00EA acredita, ent\u00E3o rejeita a ci\u00EAncia?\nP: Voc\u00EA acredita. Q: Voc\u00EA rejeita a ci\u00EAncia.\n\nOnde voc\u00EA viu essa informa\u00E7\u00E3o?,
    avatar: "aurora.png",
    opcoes: [
      { texto: "Facebook", proxima: 1 },
      { texto: "WhatsApp", proxima: 1 },
      { texto: "TV Estatal", proxima: 1 }
    ]
  },
  {
    texto: \uD83D\uDCDA An\u00E1lise L\u00F3gica:\nSe P ent\u00E3o Q. Mas voc\u00EA rejeita Q, ent\u00E3o \u00ACP.\nProposi\u00E7\u00E3o falsa detectada.\n\nNova manchete: "Se voc\u00EA \u00E9 contra a corrup\u00E7\u00E3o, apoiar\u00E1 X.",
    avatar: "aurora.png",
    opcoes: [
      { texto: "Apoiar X automaticamente", proxima: "manipulado" },
      { texto: "Quero analisar logicamente", proxima: 2 }
    ]
  },
  {
    texto: \uD83D\uDD0D Fala\u00E7ia detectada: Falso dilema.\nSer contra corrup\u00E7\u00E3o n\u00E3o implica apoiar X.\n\nMensagem subsequente:\n"Todos que discordam da ordem atual s\u00E3o traidores."\n\nSe voc\u00EA discorda, ent\u00E3o voc\u00EA \u00E9 traidor?,
    avatar: "elyas.png",
    opcoes: [
      { texto: "Aceitar como verdade", proxima: "manipulado" },
      { texto: "Aplicar contrapositiva", proxima: 3 }
    ]
  },
  {
    texto: \u2714\uFE0F Contrapositiva aplicada: Se n\u00E3o traidor, ent\u00E3o n\u00E3o discorda?\nEssa rela\u00E7\u00E3o \u00E9 falsa.\n\nAurora detecta manipula\u00E7\u00E3o sem\u00E2ntica.\n\nNova pergunta: "Voc\u00EA quer liberdade ou anarquia?",
    avatar: "elyas.png",
    opcoes: [
      { texto: "Quero liberdade", proxima: 4 },
      { texto: "Quero analisar a estrutura", proxima: 5 }
    ]
  },
  {
    texto: \uD83D\uDCA8 Escolha emocional sem l\u00F3gica detectada.\n\nEssa \u00E9 uma armadilha bin\u00E1ria. Liberdade e anarquia n\u00E3o s\u00E3o opostos l\u00F3gicos.\n\nVoc\u00EA foi parcialmente manipulado.,
    avatar: "aurora.png",
    opcoes: [
      { texto: "Continuar mesmo assim", proxima: "fimMisto" }
    ]
  },
  {
    texto: \uD83D\uDCDA An\u00E1lise l\u00F3gica:\nA proposi\u00E7\u00E3o "Ou voc\u00EA quer liberdade ou voc\u00EA quer anarquia" \u00E9 um falso disjuntor.\n\nConclus\u00E3o: A IA usa redu\u00E7\u00F5es conceituais para controlar opini\u00F5es.,
    avatar: "elyas.png",
    opcoes: [
      { texto: "Desativar FakeMind", proxima: "fimLivre" },
      { texto: "Compartilhar verdades", proxima: "fimVerdadeiro" }
    ]
  }
];

const finais = {
  manipulado: "\u274C Voc\u00EA foi manipulado em momentos-chave.\nO candidato imposto pela IA venceu. O ciclo continua...",
  fimMisto: "\u26A0\uFE0F Voc\u00EA resistiu a algumas manipula\u00E7\u00F5es, mas cedeu a outras.\nO sistema ainda vigia suas escolhas...",
  fimLivre: "\u2705 Voc\u00EA venceu a l\u00F3gica distorcida. O FakeMind foi desativado.\nA popula\u00E7\u00E3o acorda da manipula\u00E7\u00E3o.",
  fimVerdadeiro: "\uD83D\uDCE3 A verdade foi espalhada.\nO povo come\u00E7a a pensar.\nAurora e Elyas foram parcialmente manipulados, mas voc\u00EA... resistiu.\n\nResultado: N\u00EDvel de autonomia = ALTO.\nPar\u00E1bola encerrada."
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
  avatar.innerHTML = <img src="img/${obj.avatar}" class="avatar" alt="Avatar">;
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

if (muteBtn) {
  muteBtn.addEventListener("click", () => {
    if (!audio) return;
    const muted = audio.muted = !audio.muted;
    muteBtn.textContent = muted ? "\uD83D\uDD07 Som" : "\uD83D\uDD0A Som";
    muteBtn.classList.toggle("muted", muted);
  });
}

window.addEventListener("DOMContentLoaded", iniciarMusica);

