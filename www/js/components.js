/**
 * Component loader for EvolverAI website
 * 
 * This script dynamically loads HTML components into the main page
 */

document.addEventListener('DOMContentLoaded', function() {
  // Load all component placeholders
  document.querySelectorAll('[data-component]').forEach(placeholder => {
    const componentName = placeholder.getAttribute('data-component');
    fetch(`components/${componentName}.html`)
      .then(response => response.text())
      .then(html => {
        placeholder.innerHTML = html;
      })
      .catch(error => console.error(`Error loading component: ${componentName}`, error));
  });

  // Initialize scroll function (moved from inline script in header)
  window.scrollToSection = function(event, sectionId) {
    event.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Initialize mobile menu toggle
  const menuButton = document.getElementById('menu-button');
  const menu = document.getElementById('menu');
  if (menuButton && menu) {
    menuButton.addEventListener('click', () => {
      menu.classList.toggle('hidden');
    });
  }
});