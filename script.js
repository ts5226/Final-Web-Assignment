// Wait for the DOM to be fully loaded before executing JavaScript
document.addEventListener('DOMContentLoaded', function() {
  // ========== HEADER SCROLL EFFECT ==========
  // Change header style when user scrolls down 50px
  const header = document.getElementById('header');
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      header.classList.add('scrolled'); // Add class for scrolled state
    } else {
      header.classList.remove('scrolled'); // Remove class when back at top
    }
  });

  // ========== PARALLAX EFFECT ==========
  // Create parallax scrolling effect for background layers
  const parallaxLayers = document.querySelectorAll('.parallax-layer');
  window.addEventListener('scroll', function() {
    const scrollPosition = window.pageYOffset;
    
    parallaxLayers.forEach(layer => {
      // Get speed from data-speed attribute or default to 0.5
      const speed = parseFloat(layer.getAttribute('data-speed')) || 0.5;
      const yPos = -(scrollPosition * speed);
      // Apply transform to create parallax movement
      layer.style.transform = `translate3d(0, ${yPos}px, 0)`;
    });
  });

  // ========== SMOOTH SCROLLING ==========
  // Add smooth scrolling behavior to all anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault(); // Prevent default jump behavior
      const targetId = this.getAttribute('href');
      if (targetId === '#') return; // Skip empty hash links
      
      // Find target element and scroll to it with offset for header
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Adjust for fixed header
          behavior: 'smooth' // Enable smooth scrolling
        });
      }
    });
  });

  // ========== PROJECT HOVER EFFECTS ==========
  // Add hover effects to project cards
  const projects = document.querySelectorAll('.project');
  projects.forEach(project => {
    // Lift project card on hover
    project.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px)';
    });
    // Return to original position when mouse leaves
    project.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });

  // ========== ANIMATE ON SCROLL ==========
  // Function to animate elements when they enter the viewport
  const animateOnScroll = function() {
    const elements = document.querySelectorAll('.intro-text, .intro-image, .project, .contact-links a');
    
    elements.forEach(element => {
      // Calculate element's position relative to viewport
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      // If element is within 100px of viewport bottom, animate it in
      if (elementPosition < windowHeight - 100) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }
    });
  };

  // Initialize animated elements with hidden state
  const animatedElements = document.querySelectorAll('.intro-text, .intro-image, .project, .contact-links a');
  animatedElements.forEach(el => {
    el.style.opacity = '0'; // Start invisible
    el.style.transform = 'translateY(20px)'; // Start slightly below
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease'; // Smooth transition
  });

  // Run animation check on page load
  animateOnScroll();
  
  // Continue checking for elements to animate during scroll
  window.addEventListener('scroll', animateOnScroll);

  // ========== FORCE REDRAW ==========
  // Temporary hide/show to trigger animations for certain sections
  setTimeout(function() {
    // Projects section redraw
    document.querySelector('.projects').style.display = 'none';
    document.querySelector('.projects').offsetHeight; // Trigger reflow
    document.querySelector('.projects').style.display = 'block';
    
    // Contact section redraw
    document.querySelector('.contact').style.display = 'none';
    document.querySelector('.contact').offsetHeight; // Trigger reflow
    document.querySelector('.contact').style.display = 'block';
  }, 100);

  // ========== MOBILE MENU ==========
  // Hamburger menu functionality for mobile navigation
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  
  // Toggle mobile menu visibility when hamburger is clicked
  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("show");
    // Update ARIA attribute for accessibility
    hamburger.setAttribute('aria-expanded', navLinks.classList.contains('show'));
  });

  // Close mobile menu when a link is clicked (for better UX)
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) { // Only on mobile views
        navLinks.classList.remove('show');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  });
  
  // ========== HOME LINK ==========
  // Scroll to top when clicking the home link
  document.querySelector('a[href="#"]').addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Smooth scroll to top
    });
  });
});