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