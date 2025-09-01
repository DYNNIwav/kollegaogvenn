// Industry-standard viewport height solution for iOS Safari and mobile browsers
// This prevents stuttering and jumping caused by dynamic viewport units (dvh/dvw)
function setViewportHeight() {
  // Calculate 1% of the current viewport height
  const vh = window.innerHeight * 0.01;
  // Set CSS custom property --vh to the root element
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// Set initial value
setViewportHeight();

// Update on resize (throttled to prevent performance issues)
let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(setViewportHeight, 100);
});

// Update on orientation change (iOS Safari specific)
window.addEventListener('orientationchange', () => {
  // Delay to ensure new viewport dimensions are available after rotation
  setTimeout(setViewportHeight, 150);
});

document.addEventListener('DOMContentLoaded', function() {
  // Hamburger menu functionality
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function() {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
      if (!hamburger.contains(event.target) && !navLinks.contains(event.target)) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
      }
    });
    
    // Close menu when clicking on a link
    const navLinkElements = navLinks.querySelectorAll('a');
    navLinkElements.forEach(link => {
      link.addEventListener('click', function() {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });
  }

  

  // Initialize AOS with minimal, proven settings
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 600,
      once: true,
      offset: 120
    });
  }

  // Accordion functionality
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  accordionHeaders.forEach(header => {
    header.addEventListener('click', function() {
      const accordionItem = this.parentElement;
      const accordionContent = accordionItem.querySelector('.accordion-content');
      const isExpanded = this.getAttribute('aria-expanded') === 'true';

      // Close all other accordions
      accordionHeaders.forEach(otherHeader => {
        if (otherHeader !== this) {
          otherHeader.setAttribute('aria-expanded', 'false');
          const otherContent = otherHeader.parentElement.querySelector('.accordion-content');
          if (otherContent) {
            otherContent.classList.remove('active');
          }
        }
      });

      // Toggle current accordion
      this.setAttribute('aria-expanded', !isExpanded);
      accordionContent.classList.toggle('active');
    });
  });
});