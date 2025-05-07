document.addEventListener('DOMContentLoaded', function() {
  // Header scroll effect
  const header = document.getElementById('header');
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Parallax effect for background layers
  const parallaxLayers = document.querySelectorAll('.parallax-layer');
  window.addEventListener('scroll', function() {
    const scrollPosition = window.pageYOffset;
    
    parallaxLayers.forEach(layer => {
      const speed = parseFloat(layer.getAttribute('data-speed')) || 0.5;
      const yPos = -(scrollPosition * speed);
      layer.style.transform = `translate3d(0, ${yPos}px, 0)`;
    });
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  // Project hover effect
  const projects = document.querySelectorAll('.project');
  projects.forEach(project => {
    project.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px)';
    });
    project.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });

  // Animate elements when they come into view
  const animateOnScroll = function() {
    const elements = document.querySelectorAll('.intro-text, .intro-image, .project, .contact-links a');
    
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (elementPosition < windowHeight - 100) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }
    });
  };

  // Set initial state for animated elements
  const animatedElements = document.querySelectorAll('.intro-text, .intro-image, .project, .contact-links a');
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });

  // Run once on load
  animateOnScroll();
  
  // Then run on scroll
  window.addEventListener('scroll', animateOnScroll);
});
// Add this to your existing script.js
document.addEventListener('DOMContentLoaded', function() {
  // Force redraw of projects and contact sections
  setTimeout(function() {
    document.querySelector('.projects').style.display = 'none';
    document.querySelector('.projects').offsetHeight; // Trigger reflow
    document.querySelector('.projects').style.display = 'block';
    
    document.querySelector('.contact').style.display = 'none';
    document.querySelector('.contact').offsetHeight; // Trigger reflow
    document.querySelector('.contact').style.display = 'block';
  }, 100);
});
document.querySelector('a[href="#"]').addEventListener('click', function(e) {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});