// Combined Lenis + AOS system for smooth scrolling with beautiful animations

// DYNNI-inspired smooth scrolling with requestAnimationFrame (fallback)
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

// Initialize scroll-based animations (fallback)
window.addEventListener('scroll', onScroll);

document.addEventListener('DOMContentLoaded', function() {
  // Initialize Lenis for smooth scrolling with native-like feel
  if (window.Lenis) {
    const lenis = new Lenis({
      duration: 0.1, // Very fast, almost instant
      easing: (t) => t, // Linear for natural feel
      smooth: true,
      smoothTouch: false, // Keep native touch scrolling
      lerp: 0.05, // Very low lerp for instant response
      wheelMultiplier: 1.2, // Slightly enhanced wheel sensitivity
      touchMultiplier: 1, // Standard touch sensitivity
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }

  // Initialize AOS with optimized settings for smooth scrolling
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      once: true,
      offset: 120,
      easing: 'ease-out'
    });
  }

  // Trigger initial animation check (fallback)
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