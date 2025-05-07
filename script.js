document.addEventListener('DOMContentLoaded', function() {
  // Header scroll effect
  const header = document.getElementById('header');
  window.addEventListener('scroll', function() {
    header.classList.toggle('scrolled', window.scrollY > 50);
  });

  // Parallax effect
  const parallaxLayers = document.querySelectorAll('.parallax-layer');
  window.addEventListener('scroll', function() {
    const scrollPosition = window.pageYOffset;
    parallaxLayers.forEach(layer => {
      const speed = parseFloat(layer.getAttribute('data-speed')) || 0.5;
      layer.style.transform = `translate3d(0, ${-(scrollPosition * speed)}px, 0)`;
    });
  });

  // Smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  // Project hover effects
  document.querySelectorAll('.project').forEach(project => {
    project.addEventListener('mouseenter', () => project.style.transform = 'translateY(-10px)');
    project.addEventListener('mouseleave', () => project.style.transform = 'translateY(0)');
  });

  // Intersection Observer for animations
  const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  });

  document.querySelectorAll('.intro-text, .intro-image, .project, .contact-links a').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    animateOnScroll.observe(el);
  });

  // Mobile menu toggle (with null check)
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', function() {
      navLinks.classList.toggle('active');
      this.innerHTML = navLinks.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
    });

    // Close menu when clicking links (mobile only)
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', function() {
        if (window.innerWidth <= 768 && navLinks.classList.contains('active')) {
          navLinks.classList.remove('active');
          menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
      });
    });
  }

  // Force reflow (optional - might not be needed with IntersectionObserver)
  setTimeout(() => {
    ['projects', 'contact'].forEach(className => {
      const el = document.querySelector(`.${className}`);
      if (el) {
        el.style.display = 'none';
        void el.offsetHeight; // Trigger reflow
        el.style.display = 'block';
      }
    });
  }, 100);
});