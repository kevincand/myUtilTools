function toUppercase() {
      const textarea = document.getElementById("texto");
      textarea.value = textarea.value.toUpperCase();
}
function toLowercase() {
    const textarea = document.getElementById("texto");
    textarea.value = textarea.value.toLowerCase();
}
function capitalizeWords() {
    const textarea = document.getElementById("texto");
    textarea.value = textarea.value
    .toLowerCase()
    .replace(/\b(\w)/g, (s) => s.toUpperCase());
}
function toCamelCase() {
  const textarea = document.getElementById("texto");
  let words = textarea.value
    .toLowerCase()
    .trim()
    .split(/[^a-zA-Z0-9]+/);

  if (words.length === 0) {
    textarea.value = "";
    return;
  }

  let camelCaseText = words[0];
  for (let i = 1; i < words.length; i++) {
    camelCaseText += words[i].charAt(0).toUpperCase() + words[i].slice(1);
  }
  textarea.value = camelCaseText;
}
function showTab(tab) {
  // Alternar exibição das seções
  document.getElementById("tab-texto").style.display = tab === 'texto' ? 'block' : 'none';
  document.getElementById("tab-translate").style.display = tab === 'translate' ? 'block' : 'none';
  document.getElementById("tab-normalizacao").style.display = tab === 'normalizacao' ? 'block' : 'none';
  document.getElementById("tab-bases").style.display = tab === 'bases' ? 'block' : 'none';

  // Alternar classe 'active' nos botões
  const buttons = document.querySelectorAll('.tab-menu button');
  buttons.forEach(btn => btn.classList.remove('active'));
  document.querySelector(`.tab-menu button[data-tab="${tab}"]`).classList.add('active');
}
const morseCodeMap = {
  A: '.-', B: '-...', C: '-.-.', D: '-..', E: '.', F: '..-.',
  G: '--.', H: '....', I: '..', J: '.---', K: '-.-', L: '.-..',
  M: '--', N: '-.', O: '---', P: '.--.', Q: '--.-', R: '.-.',
  S: '...', T: '-', U: '..-', V: '...-', W: '.--', X: '-..-',
  Y: '-.--', Z: '--..',
  '0': '-----', '1': '.----', '2': '..---', '3': '...--',
  '4': '....-', '5': '.....', '6': '-....', '7': '--...',
  '8': '---..', '9': '----.',
  ' ': '/'
};

const reverseMorseCodeMap = Object.fromEntries(
  Object.entries(morseCodeMap).map(([k, v]) => [v, k])
);

function removeExtraSpaces() {
  const textarea = document.getElementById("texto");
  textarea.value = textarea.value.replace(/\s+/g, ' ').trim();
}

function atualizarContador() {
  const texto = document.getElementById("texto").value;

  // Contar palavras (sem contar espaços extras)
  const palavras = texto.trim().split(/\s+/).filter(Boolean).length;

  // Caracteres com e sem espaços
  const caracteres = texto.length;
  const semEspacos = texto.replace(/\s/g, "").length;

  // Contar linhas
  const linhas = texto.split(/\n/).length;

  // Atualiza os elementos do contador
  document.getElementById("countPalavras").textContent = palavras;
  document.getElementById("countCaracteres").textContent = caracteres;
  document.getElementById("countSemEspacos").textContent = semEspacos;
  document.getElementById("countLinhas").textContent = linhas;
}

// Ativa contador ao digitar
document.getElementById("texto").addEventListener("input", atualizarContador);

// Funções para aba de Cifras e Traduções
function toMorse() {
  const input = document.getElementById("translate-input").value.toUpperCase();
  const output = input.split('').map(char => morseCodeMap[char] || '').join(' ');
  document.getElementById("translate-input").value = output;
}

function fromMorse() {
  const input = document.getElementById("translate-input").value.trim();
  const output = input.split(' ').map(code => reverseMorseCodeMap[code] || '').join('');
  document.getElementById("translate-input").value = output;
}
function caesarCipher() {
  const input = document.getElementById("translate-input").value;
  const shift = parseInt(document.getElementById("cesar-shift").value);

  if (isNaN(shift)) {
    alert("Informe um número válido para o deslocamento.");
    return;
  }

  const output = input.split('').map(char => {
    const code = char.charCodeAt(0);

    if (char >= 'a' && char <= 'z') {
      return String.fromCharCode(((code - 97 + shift + 26) % 26) + 97);
    } else if (char >= 'A' && char <= 'Z') {
      return String.fromCharCode(((code - 65 + shift + 26) % 26) + 65);
    } else {
      return char;
    }
  }).join('');

  document.getElementById("translate-input").value = output;
}

function vigenereCipher(encode = true) {
  const input = document.getElementById("translate-input").value;
  const key = document.getElementById("vigenere-key").value;

  if (!key.match(/^[a-zA-Z]+$/)) {
    alert("A chave deve conter apenas letras.");
    return;
  }

  const cleanedKey = key.toUpperCase();
  let result = '';
  let keyIndex = 0;

  for (let i = 0; i < input.length; i++) {
    const char = input[i];
    const isUpper = char >= 'A' && char <= 'Z';
    const isLower = char >= 'a' && char <= 'z';

    if (isUpper || isLower) {
      const base = isUpper ? 65 : 97;
      const shift = cleanedKey.charCodeAt(keyIndex % cleanedKey.length) - 65;
      const code = char.charCodeAt(0) - base;
      const shifted = encode
        ? (code + shift) % 26
        : (code - shift + 26) % 26;

      result += String.fromCharCode(shifted + base);
      keyIndex++;
    } else {
      result += char; // mantém pontuação e espaços
    }
  }

  document.getElementById("translate-input").value = result;
}

function toBase64() {
  const textarea = document.getElementById("translate-input");
  try {
    const texto = textarea.value;
    const base64 = btoa(unescape(encodeURIComponent(texto)));
    textarea.value = base64;
  } catch (e) {
    alert("Erro ao codificar em Base64.");
  }
}

function fromBase64() {
  const textarea = document.getElementById("translate-input");
  try {
    const texto = textarea.value;
    const decodificado = decodeURIComponent(escape(atob(texto)));
    textarea.value = decodificado;
  } catch (e) {
    alert("Texto inválido para decodificar de Base64.");
  }
}
// Funções para aba de normalização de texto
// Pega referência ao textarea
const editor = document.getElementById("editor");

// --- FONTES ---
function setFont(fontName) {
  editor.style.fontFamily = fontName;
}

// --- TAMANHO ---
function applyFontSize() {
  const size = document.getElementById("font-size-input").value || 12;
  const verifiedSize = size >= 2 && size <= 78 ? size : 12;
  editor.style.fontSize = verifiedSize + "px";
}

// --- ESTILOS ---
function formatText(style) {
  switch (style) {
    case 'bold':
      toggleStyle("fontWeight", "bold", "normal");
      break;
    case 'italic':
      toggleStyle("fontStyle", "italic", "normal");
      break;
    case 'underline':
      toggleStyle("textDecoration", "underline", "none");
      break;
    case 'strikeThrough':
      toggleStyle("textDecoration", "line-through", "none");
      break;
  }
}

function toggleStyle(property, valueOn, valueOff) {
  if (editor.style[property] === valueOn) {
    editor.style[property] = valueOff;
  } else {
    editor.style[property] = valueOn;
  }
}

// --- LIMPAR FORMATAÇÃO ---
function clearFormatting() {
  editor.style.fontWeight = "normal";
  editor.style.fontStyle = "normal";
  editor.style.textDecoration = "none";
  editor.style.fontFamily = "inherit";
  editor.style.fontSize = "12px"; // reset padrão
}

// Toggle do menu
document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.querySelector(".menu-btn");
  const menuContainer = document.querySelector(".menu-container");

  menuBtn.addEventListener("click", () => {
    menuContainer.classList.toggle("show");
  });

  // Fecha o menu se clicar fora
  document.addEventListener("click", (e) => {
    if (!menuContainer.contains(e.target)) {
      menuContainer.classList.remove("show");
    }
  });
});

// Conversão de bases numéricas
function convertBase() {
  const inputVal = document.getElementById("inputNumber").value.trim();
  const inputBase = parseInt(document.getElementById("inputBase").value);
  const outputBase = parseInt(document.getElementById("outputBase").value);
  const outputField = document.getElementById("outputNumber");

  if (!inputVal) {
    outputField.value = "";
    return;
  }

  try {
    // Converte para decimal
    const decimalValue = parseInt(inputVal, inputBase);

    if (isNaN(decimalValue)) {
      outputField.value = "Valor inválido";
      return;
    }

    // Converte para a base desejada
    outputField.value = decimalValue.toString(outputBase).toUpperCase();
  } catch (e) {
    outputField.value = "Erro na conversão";
  }
}

function swapBases() {
  const inputSelect = document.getElementById("inputBase");
  const outputSelect = document.getElementById("outputBase");

  const temp = inputSelect.value;
  inputSelect.value = outputSelect.value;
  outputSelect.value = temp;

  // Troca os valores dos campos também
  const inputVal = document.getElementById("inputNumber").value;
  const outputVal = document.getElementById("outputNumber").value;

  document.getElementById("inputNumber").value = outputVal;
  document.getElementById("outputNumber").value = inputVal;

  convertBase();
}

// Atualiza automaticamente
document.addEventListener("DOMContentLoaded", () => {
  const inputField = document.getElementById("inputNumber");
  const inputBaseSelect = document.getElementById("inputBase");
  const outputBaseSelect = document.getElementById("outputBase");

  if (inputField && inputBaseSelect && outputBaseSelect) {
    inputField.addEventListener("input", convertBase);
    inputBaseSelect.addEventListener("change", convertBase);
    outputBaseSelect.addEventListener("change", convertBase);
  }
});
