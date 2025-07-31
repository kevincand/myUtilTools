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
  document.getElementById("tab-texto").style.display = tab === 'texto' ? 'block' : 'none';
  document.getElementById("tab-morse").style.display = tab === 'morse' ? 'block' : 'none';
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

function toMorse() {
  const input = document.getElementById("morse-input").value.toUpperCase();
  const output = input.split('').map(char => morseCodeMap[char] || '').join(' ');
  document.getElementById("morse-input").value = output;
}

function fromMorse() {
  const input = document.getElementById("morse-input").value.trim();
  const output = input.split(' ').map(code => reverseMorseCodeMap[code] || '').join('');
  document.getElementById("morse-input").value = output;
}