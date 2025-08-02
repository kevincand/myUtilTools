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