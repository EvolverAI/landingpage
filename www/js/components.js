/**
 * Component loader for EvolverAI website
 * 
 * This script dynamically loads HTML components into the main page
 */

// Global container for event handlers
const EvolverAI = {
  // Store toggle function at module level so it's consistent
  toggleMobileMenu: null,
  
  initMobileMenu: function() {
    const menuButton = document.getElementById('mobile-menu-button');
    const menu = document.getElementById('menu');
    
    if (menuButton && menu) {
      console.log('Mobile menu elements found, setting up event listener');
      
      // Define the toggle function only once and store it
      if (!EvolverAI.toggleMobileMenu) {
        EvolverAI.toggleMobileMenu = function() {
          console.log('Mobile menu button clicked');
          menu.classList.toggle('hidden');
        };
      }
      
      // Remove any existing event listeners to prevent duplicates
      menuButton.removeEventListener('click', EvolverAI.toggleMobileMenu);
      
      // Add the event listener
      menuButton.addEventListener('click', EvolverAI.toggleMobileMenu);
      
      console.log('Mobile menu initialized successfully');
    } else {
      console.log('Mobile menu elements not found yet');
    }
  }
};

// Initialize components
document.addEventListener('DOMContentLoaded', function() {
  // Store the hash to use after components are loaded
  const initialHash = window.location.hash ? window.location.hash.substring(1) : null;
  
  // Load all component placeholders
  const placeholders = document.querySelectorAll('[data-component]');
  let loadedCount = 0;
  
  // Try to initialize menu as early as possible
  setTimeout(EvolverAI.initMobileMenu, 50);
  
  placeholders.forEach(placeholder => {
    const componentName = placeholder.getAttribute('data-component');
    fetch(`components/${componentName}.html`)
      .then(response => response.text())
      .then(html => {
        placeholder.innerHTML = html;
        loadedCount++;
        
        // Check if all components are loaded
        if (loadedCount === placeholders.length) {
          console.log('All components loaded, initializing mobile menu');
          // Try multiple times with increasing delays to ensure it catches
          setTimeout(EvolverAI.initMobileMenu, 100);
          setTimeout(EvolverAI.initMobileMenu, 300);
          setTimeout(EvolverAI.initMobileMenu, 500);
          
          // If we arrived with a hash in the URL, scroll to that section now that components are loaded
          if (initialHash) {
            setTimeout(() => {
              const targetSection = document.getElementById(initialHash);
              if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }, 300); // Small delay to ensure DOM is fully updated
          }
        }
      })
      .catch(error => console.error(`Error loading component: ${componentName}`, error));
  });

  // Initialize scroll function
  window.scrollToSection = function(event, sectionId) {
    event.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      
      // Close mobile menu when clicking a link (on mobile)
      if (window.innerWidth < 768) {
        const menu = document.getElementById('menu');
        if (menu) menu.classList.add('hidden');
      }
    }
  };
  
  // Handle navigation between pages
  window.handleNavigation = function(event, sectionId) {
    event.preventDefault();
    
    // Check if we're on the index page
    const isIndexPage = window.location.pathname.endsWith('index.html') || 
                        window.location.pathname.endsWith('/') ||
                        window.location.pathname.split('/').pop() === '';
    
    if (isIndexPage) {
      // We're on index.html, use local scrolling
      scrollToSection(event, sectionId);
    } else {
      // We're on another page, navigate to index.html with the anchor
      window.location.href = `index.html#${sectionId}`;
    }
  };
});

// Try to initialize again once everything is fully loaded
window.addEventListener('load', function() {
  console.log('Window fully loaded, initializing mobile menu again');
  setTimeout(EvolverAI.initMobileMenu, 100);
  setTimeout(EvolverAI.initMobileMenu, 300);
  setTimeout(EvolverAI.initMobileMenu, 500);
});

// Add a mutation observer to detect when the header is added to the DOM
window.addEventListener('DOMContentLoaded', function() {
  // Create a mutation observer to watch for changes in the DOM
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.addedNodes.length) {
        // Check if our mobile menu button is now in the DOM
        if (document.getElementById('mobile-menu-button')) {
          console.log('Mobile menu button detected by observer');
          EvolverAI.initMobileMenu();
        }
      }
    });
  });
  
  // Start observing the document body for DOM changes
  observer.observe(document.body, { childList: true, subtree: true });
});