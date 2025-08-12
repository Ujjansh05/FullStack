
const textarea = document.getElementById('textInput');
const charCount = document.getElementById('charCount');

textarea.addEventListener('input', () => {
  charCount.textContent = textarea.value.length;
});
