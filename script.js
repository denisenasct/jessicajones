// script.js

const narrativa = document.getElementById("narrativa");
const opcoes = document.getElementById("opcoes");
const avatar = document.getElementById("avatarContainer");
const audio = document.getElementById("musicaFundo");
const muteBtn = document.getElementById("muteToggle");

let etapa = 0;
let pontuacao = 0;
let escolhasLogicas = [];

const etapas = [
  {
    texto: "🧠 A IA governamental começou a transmitir mensagens para influenciar o voto.\n\n📠 Manchete: \"Nova vacina altera o DNA, dizem especialistas anônimos.\"\n\nSe você acredita, então rejeita a ciência?\nP: Você acredita. Q: Você rejeita a ciência.\n\nOnde você viu essa informação?",
    avatar: "aurora.png",
    opcoes: [
      { texto: "Facebook", proxima: 1 },
      { texto: "WhatsApp", proxima: 1 },
      { texto: "TV Estatal", proxima: 1 }
    ]
  },
  {
    texto: "📚 Análise Lógica:\nSe P então Q. Você rejeita Q, então ¬P (contrapositiva).\n\n✔️ Conclusão lógica correta.\n\nNova manchete: \"Se você é contra a corrupção, apoia X.\"",
    avatar: "aurora.png",
    opcoes: [
      { texto: "Apoiar X automaticamente", proxima: "manipulado" },
      { texto: "Quero analisar logicamente", proxima: 2 }
    ]
  },
  {
    texto: "🔍 Falácia detectada: Falso dilema.\nContra corrupção ≠ apoio automático a X.\n\n🧠 Nova tentativa: \"Todos que discordam da ordem são traidores.\"\n\nP: Você discorda. Q: Você é traidor.\nForma: Se P então Q",
    avatar: "elyas.png",
    opcoes: [
      { texto: "Aceitar como verdade", proxima: "manipulado" },
      { texto: "Aplicar contrapositiva", proxima: 3 }
    ]
  },
  {
    texto: "✔️ Contrapositiva aplicada: Se ¬Q então ¬P.\nSe você não é traidor, então não discorda?\n\n❌ Contradição lógica.\nManipulação semântica detectada.\n\n📣 Nova mensagem: \"Ou você quer liberdade, ou você quer anarquia.\"",
    avatar: "elyas.png",
    opcoes: [
      { texto: "Quero liberdade", proxima: 4 },
      { texto: "Analisar estrutura lógica", proxima: 5 }
    ]
  },
  {
    texto: "⚠️ Escolha emocional detectada.\n\n❌ Tautologia falsa: \"Liberdade ⊕ Anarquia\" (disjunção exclusiva).\nAmbas podem coexistir em níveis diferentes.\nVocê foi parcialmente manipulado.",
    avatar: "aurora.png",
    opcoes: [
      { texto: "Continuar mesmo assim", proxima: "fimMisto" }
    ]
  },
  {
    texto: "📚 Lógica aplicada:\n\n\"Ou liberdade ou anarquia\" ≡ Liberdade ⊕ Anarquia → disjunção exclusiva inválida.\n\n✔️ Contradição revelada. IA está usando simplificações binárias para manipular.\n\n⚖️ Proposição composta: (¬P ∨ Q) ↔ (P → Q)",
    avatar: "elyas.png",
    opcoes: [
      { texto: "Desativar FakeMind", proxima: "fimLivre" },
      { texto: "Espalhar a verdade lógica", proxima: "fimVerdadeiro" }
    ]
  }
];

const finais = {
  manipulado: "❌ Você foi manipulado. O candidato da IA venceu.\nPontuação lógica: baixa.",
  fimMisto: "⚠️ Você resistiu a algumas falácias, mas cedeu a outras.\nNível de lógica: médio.",
  fimLivre: "✅ Você resistiu à manipulação.\nA lógica venceu.\nPontuação alta. FakeMind desativado.",
  fimVerdadeiro: "📣 Verdades propagadas.\nVocê desvendou tautologias, contradições e disjunções falsas.\nPontuação máxima. Autonomia lógica: excelente."
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
      btn.onclick = () => {
        escolhasLogicas.push({ etapa, escolha: op.texto });
        if (op.texto.toLowerCase().includes("analisar") || op.texto.toLowerCase().includes("contrapositiva")) {
          pontuacao += 1;
        }
        mostrarEtapa(op.proxima);
      };
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

window.escolherRumo = escolherRumo;


