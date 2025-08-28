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

  // Perfect infinite scroll setup
  const logoScroll = document.getElementById('logoScroll');
  if (logoScroll) {
    // First, duplicate the content
    const scrollContent = logoScroll.innerHTML;
    logoScroll.innerHTML = scrollContent + scrollContent;
    
    // Wait for images to load, then calculate exact width
    setTimeout(() => {
      const firstHalf = logoScroll.children.length / 2;
      let totalWidth = 0;
      
      // Calculate width of first half (original content)
      for (let i = 0; i < firstHalf; i++) {
        const img = logoScroll.children[i];
        const imgWidth = img.offsetWidth;
        const imgMargin = parseInt(getComputedStyle(img).marginRight);
        totalWidth += imgWidth + imgMargin;
      }
      
      // Apply the exact animation distance
      logoScroll.style.setProperty('--scroll-distance', `-${totalWidth}px`);
      console.log('Scroll distance set to:', `-${totalWidth}px`);
    }, 100);
  }

  // Initialize AOS
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 1500,
      once: true,
      offset: 0,
      anchorPlacement: 'top-bottom',
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