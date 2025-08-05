// script.js

// Get the checkbox element from the page
const themeToggle = document.getElementById('theme-toggle');

// Get the body element to apply the theme class to it
const body = document.body;

// Add an event listener that waits for the checkbox to be changed
themeToggle.addEventListener('change', function() {
  // Toggle the 'dark-mode' class on the body element
  body.classList.toggle('dark-mode');
});