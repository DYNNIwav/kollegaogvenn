// DYNNI-inspired smooth scrolling and animation system

// Animate-in on scroll using requestAnimationFrame (DYNNI approach)
let ticking = false;

function animateInOnScroll() {
  const els = document.querySelectorAll('.animate-in');
  const trigger = window.innerHeight * 0.85;
  
  els.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < trigger && rect.bottom >= 0) {
      el.classList.add('visible');
    }
  });
}

function onScroll() {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      animateInOnScroll();
      ticking = false;
    });
    ticking = true;
  }
}

// Initialize scroll-based animations
window.addEventListener('scroll', onScroll);

// Initialize Lenis smooth scroll (DYNNI's secret weapon)
document.addEventListener('DOMContentLoaded', function() {
  // Initialize Lenis for smooth scrolling
  if (window.Lenis) {
    const lenis = new Lenis({
      duration: 1.2,
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
      smooth: true,
      smoothTouch: false, // Disable on touch devices to prevent conflicts
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }

  // Trigger initial animation check
  setTimeout(() => {
    animateInOnScroll();
  }, 200);

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