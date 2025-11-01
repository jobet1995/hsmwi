document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.querySelector(".navbar");
  const navLinks = document.querySelectorAll(".navbar a");
  const mobileToggle = document.querySelector(".navbar-toggler");
  const fadeContainer = document.querySelector("main") || document.body;
  const newsletterForm = document.querySelector("#newsletter-form");
  let loadingSpinner = document.querySelector(".loading-spinner");

  if (!loadingSpinner) {
    loadingSpinner = document.createElement("div");
    loadingSpinner.className = "loading-spinner";
    loadingSpinner.innerHTML = "<div></div><div></div><div></div><div></div>";
    document.body.appendChild(loadingSpinner);
  }

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
});
