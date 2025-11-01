document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.querySelector(".navbar");
  const navLinks = document.querySelectorAll(".navbar a");
  const mobileToggle = document.querySelector(".navbar-toggler");
  const fadeContainer = document.querySelector("main") || document.body;
  const newsletterForm = document.querySelector("#newsletter-form");
  let loadingSpinner = document.querySelector(".loading-spinner");

  // Add calming hover effects to wellness cards
  const wellnessCards = document.querySelectorAll('.wellness-card');
  wellnessCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-2px)';
      this.style.transition = 'all 0.3s ease-in-out';
      this.style.boxShadow = '0 6px 8px rgba(0, 0, 0, 0.05)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
      this.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
    });
  });

  function setNavbar() {
    if (!navbar) return;
    if (window.scrollY > 50) navbar.classList.add("scrolled");
    else navbar.classList.remove("scrolled");
  }

  function setActiveLink() {
    let current = window.location.pathname;
    navLinks.forEach((link) => {
      if (link.getAttribute("href") === current) link.classList.add("active");
      else link.classList.remove("active");
    });
  }

  function collapseMobileMenu() {
    const menu = document.querySelector(".navbar-collapse");
    if (menu && menu.classList.contains("show")) {
      menu.classList.remove("show");
      if (mobileToggle) mobileToggle.classList.add("collapsed");
    }
  }

  function fadeIn() {
    fadeContainer.style.opacity = 0;
    fadeContainer.style.transition = "opacity 0.6s ease-in-out";
    requestAnimationFrame(() => (fadeContainer.style.opacity = 1));
  }

  function fadeOut(url) {
    fadeContainer.style.opacity = 1;
    fadeContainer.style.transition = "opacity 0.4s ease-in-out";
    fadeContainer.style.opacity = 0;
    setTimeout(() => (window.location.href = url), 400);
  }

  document.querySelectorAll("a:not([target='_blank'])").forEach((a) => {
    a.addEventListener("click", function (e) {
      const url = this.getAttribute("href");
      if (url && url.startsWith("/") && !url.startsWith("#")) {
        e.preventDefault();
        fadeOut(url);
      }
    });
  });

  window.addEventListener("scroll", setNavbar);
  window.addEventListener("load", setNavbar);
  fadeIn();
  setActiveLink();

  if (mobileToggle)
    mobileToggle.addEventListener("click", () => mobileToggle.classList.toggle("active"));
  navLinks.forEach((link) => link.addEventListener("click", collapseMobileMenu));

  if (newsletterForm) {
    newsletterForm.addEventListener("submit", async function (e) {
      e.preventDefault();
      const btn = this.querySelector("button[type='submit']");
      let msg = this.querySelector(".newsletter-message");
      if (!msg) {
        msg = document.createElement("div");
        msg.className = "newsletter-message";
        this.appendChild(msg);
      }
      btn.disabled = true;
      loadingSpinner.style.display = "flex";
      const formData = new FormData(this);
      try {
        const response = await fetch("/newsletter/subscribe/", {
          method: "POST",
          body: formData,
          headers: { "X-Requested-With": "XMLHttpRequest" },
        });
        const result = await response.json();
        msg.textContent = result.success
          ? "Thank you for subscribing!"
          : result.error || "Subscription failed.";
        msg.className = "newsletter-message " + (result.success ? "success" : "error");
        if (result.success) this.reset();
      } catch {
        msg.textContent = "Network error. Please try again.";
        msg.className = "newsletter-message error";
      } finally {
        btn.disabled = false;
        loadingSpinner.style.display = "none";
      }
    });
  }

  const focusable = document.querySelectorAll("a, button, input, textarea, select, [tabindex]");
  focusable.forEach((el) => {
    el.addEventListener("focus", () => el.classList.add("focused"));
    el.addEventListener("blur", () => el.classList.remove("focused"));
  });
  
  // Add gentle hover effects to buttons
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(button => {
    button.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-1px)';
      this.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
      this.style.transition = 'all 0.3s ease-in-out';
    });
    
    button.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
      this.style.boxShadow = 'none';
    });
  });
  
  // Add subtle floating animation to elements with float class
  const floatElements = document.querySelectorAll('.animate-float');
  floatElements.forEach(el => {
    el.style.transition = 'transform 0.5s ease-in-out';
    
    el.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-3px)';
    });
    
    el.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });
  
  // Implement Intersection Observer for fade-in and slide-up animations
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);
  
  // Observe elements with fade-in-slide-up class
  const fadeElements = document.querySelectorAll('.fade-in-slide-up');
  fadeElements.forEach(element => {
    observer.observe(element);
  });
  
  // Add thematic interactions based on keywords
  // Calmness interaction - slow, smooth transitions
  const calmElements = document.querySelectorAll('.calmness, .btn-calmness');
  calmElements.forEach(el => {
    el.addEventListener('mouseenter', function() {
      this.style.transition = 'all 0.8s ease-in-out';
    });
  });
  
  // Empathy interaction - gentle color shifts
  const empathyElements = document.querySelectorAll('.empathy, .btn-empathy');
  empathyElements.forEach(el => {
    el.addEventListener('mouseenter', function() {
      this.style.filter = 'brightness(1.05)';
    });
    
    el.addEventListener('mouseleave', function() {
      this.style.filter = 'brightness(1)';
    });
  });
  
  // Hope interaction - subtle lightening effect
  const hopeElements = document.querySelectorAll('.hope, .btn-hope');
  hopeElements.forEach(el => {
    el.addEventListener('mouseenter', function() {
      this.style.filter = 'brightness(1.1)';
    });
    
    el.addEventListener('mouseleave', function() {
      this.style.filter = 'brightness(1)';
    });
  });
  
  // Wellness interaction - gentle pulse
  const wellnessElements = document.querySelectorAll('.wellness, .btn-wellness');
  wellnessElements.forEach(el => {
    el.addEventListener('mouseenter', function() {
      this.style.animation = 'gentlePulse 2s ease-in-out infinite';
    });
    
    el.addEventListener('mouseleave', function() {
      this.style.animation = '';
    });
  });
  
  // Connection interaction - subtle border glow
  const connectionElements = document.querySelectorAll('.connection, .btn-connection');
  connectionElements.forEach(el => {
    el.addEventListener('mouseenter', function() {
      this.style.boxShadow = '0 0 8px rgba(156, 39, 176, 0.3)';
    });
    
    el.addEventListener('mouseleave', function() {
      this.style.boxShadow = '';
    });
  });
  
  // Safety interaction - protective shield effect
  const safetyElements = document.querySelectorAll('.safety, .btn-safety');
  safetyElements.forEach(el => {
    el.addEventListener('mouseenter', function() {
      this.style.boxShadow = '0 0 10px rgba(255, 152, 0, 0.3)';
    });
    
    el.addEventListener('mouseleave', function() {
      this.style.boxShadow = '';
    });
  });
  
  // Balance interaction - centered stability
  const balanceElements = document.querySelectorAll('.balance, .btn-balance');
  balanceElements.forEach(el => {
    el.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-1px) scale(1.01)';
    });
    
    el.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });
});