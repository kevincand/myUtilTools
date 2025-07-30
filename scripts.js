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