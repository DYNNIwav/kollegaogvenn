// Hamburger menu functionality
document.addEventListener('DOMContentLoaded', function() {
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
});


function handleZoomScroll() {
  const scrolled = window.pageYOffset;
  const windowHeight = window.innerHeight;
  const zoomEndPoint = windowHeight * 2;
  const revealEndPoint = windowHeight * 3;
  
  if (scrolled < zoomEndPoint) {
    const progress = scrolled / zoomEndPoint;
    
    const moveDistance = -(progress * (windowHeight / 20 - 1700));
    const textZoom = 1 + (progress * 50);
    
    // Move the container
    document.documentElement.style.setProperty('--text-move', `${moveDistance}px`);
    
    // Scale the SVG by changing its viewBox and size
    const svg = document.getElementById('zoomSVG');
    const text = document.getElementById('svgText');
    
    if (svg && text) {
      // Scale SVG dimensions
      const newWidth = 400 * textZoom;
      const newHeight = 50 * textZoom;
      svg.setAttribute('width', newWidth);
      svg.setAttribute('height', newHeight);
      
      // Scale the text element inside SVG
      text.setAttribute('font-size', 24 * textZoom);
      
      // Adjust viewBox to keep text centered while scaling
      const viewBoxSize = 400 / textZoom;
      const viewBoxOffset = (400 - viewBoxSize) / 2;
      svg.setAttribute('viewBox', `${viewBoxOffset} 0 ${viewBoxSize} 50`);
    }
    
    // Black overlay logic
    if (progress > 0.90) {
      const blackProgress = (progress - 0.10) / 0.10;
      document.documentElement.style.setProperty('--black-opacity', blackProgress);
      document.documentElement.style.setProperty('--text-opacity', '1');
    } else {
      document.documentElement.style.setProperty('--black-opacity', '0');
      document.documentElement.style.setProperty('--text-opacity', '1');
    }
    
    const arrowOpacity = progress > 0.1 ? 0 : 1;
    document.documentElement.style.setProperty('--arrow-opacity', arrowOpacity);
    
    document.documentElement.style.setProperty('--home-opacity', '1');
    document.documentElement.style.setProperty('--customers-opacity', '0');
    document.documentElement.style.setProperty('--customers-scale', '30');
    
  } else if (scrolled < revealEndPoint) {
    // Reset SVG for transition
    const svg = document.getElementById('zoomSVG');
    const text = document.getElementById('svgText');
    
    if (svg && text) {
      svg.setAttribute('width', '400');
      svg.setAttribute('height', '50');
      svg.setAttribute('viewBox', '0 0 400 50');
      text.setAttribute('font-size', '24');
    }
    
    // Phase 2: Zoom-out reveal using SVG (no pixelation)
const revealProgress = (scrolled - zoomEndPoint) / (revealEndPoint - zoomEndPoint);
const customerScale = 30 - (revealProgress * 29);

// Apply SVG scaling instead of CSS transform scaling
const customerSVG = document.getElementById('customerSVG');
const customerText = document.getElementById('customerText');

if (customerSVG && customerText) {
  // Scale the SVG directly (crisp scaling)
  customerSVG.setAttribute('width', 400 * customerScale);
  customerSVG.setAttribute('height', 50 * customerScale);
  customerText.setAttribute('font-size', 24 * customerScale);
  customerSVG.setAttribute('viewBox', '0 0 400 50');
}

const blackOpacity = Math.max(0, 1 - (revealProgress * 1.5));
document.documentElement.style.setProperty('--black-opacity', blackOpacity);

document.documentElement.style.setProperty('--home-opacity', '0');
document.documentElement.style.setProperty('--customers-opacity', '1');
// Remove this line that was causing pixelation:
// document.documentElement.style.setProperty('--customers-scale', customerScale);
document.documentElement.style.setProperty('--text-opacity', '0');
document.documentElement.style.setProperty('--arrow-opacity', '0');
    
  } else {
    // Phase 3: Final state - ensure SVG is reset
    const svg = document.getElementById('zoomSVG');
    const text = document.getElementById('svgText');
    
    if (svg && text) {
      svg.setAttribute('width', '400');
      svg.setAttribute('height', '50');
      svg.setAttribute('viewBox', '0 0 400 50');
      text.setAttribute('font-size', '24');
    }
    
    document.documentElement.style.setProperty('--home-opacity', '0');
    document.documentElement.style.setProperty('--customers-opacity', '1');
    document.documentElement.style.setProperty('--customers-scale', '1');
    document.documentElement.style.setProperty('--black-opacity', '0');
    document.documentElement.style.setProperty('--text-opacity', '0');
    document.documentElement.style.setProperty('--arrow-opacity', '0');
  }
}

window.addEventListener('scroll', handleZoomScroll);
handleZoomScroll();