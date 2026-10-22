const menuToggle = document.querySelector(".menu-toggle");
const siteNavigation = document.querySelector(".site-nav");
const logo = document.querySelector(".brand-logo");
const currentYear = document.querySelector("[data-current-year]");
const gallery = document.querySelector(".hero-gallery");

if (logo) {
  logo.addEventListener("error", () => {
    logo.hidden = true;
  });
}

if (menuToggle && siteNavigation) {
  const closeMenu = () => {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menú");
    siteNavigation.classList.remove("is-open");
  };

  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Abrir menú" : "Cerrar menú");
    siteNavigation.classList.toggle("is-open", !isOpen);
  });

  siteNavigation.addEventListener("click", (event) => {
    if (event.target instanceof Element && event.target.closest("a")) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
      menuToggle.focus();
    }
  });
}

if (currentYear) {
  currentYear.textContent = String(new Date().getFullYear());
}

if (gallery) {
  const slides = Array.from(gallery.querySelectorAll("[data-carousel-slide]"));
  const indicators = Array.from(gallery.querySelectorAll("[data-carousel-to]"));
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let activeSlide = slides.findIndex((slide) => slide.classList.contains("is-active"));
  let autoAdvance;

  const showSlide = (index) => {
    activeSlide = (index + slides.length) % slides.length;

    slides.forEach((slide, slideIndex) => {
      const isActive = slideIndex === activeSlide;
      slide.classList.toggle("is-active", isActive);
      slide.setAttribute("aria-hidden", String(!isActive));
    });

    indicators.forEach((indicator, indicatorIndex) => {
      indicator.setAttribute("aria-current", String(indicatorIndex === activeSlide));
    });
  };

  const stopAutoAdvance = () => {
    window.clearInterval(autoAdvance);
    autoAdvance = undefined;
  };

  const startAutoAdvance = () => {
    if (
      reducedMotion.matches ||
      document.hidden ||
      autoAdvance ||
      gallery.matches(":hover") ||
      gallery.contains(document.activeElement)
    ) {
      return;
    }

    autoAdvance = window.setInterval(() => showSlide(activeSlide + 1), 6000);
  };

  gallery.querySelector("[data-carousel-prev]")?.addEventListener("click", () => {
    showSlide(activeSlide - 1);
    stopAutoAdvance();
    startAutoAdvance();
  });

  gallery.querySelector("[data-carousel-next]")?.addEventListener("click", () => {
    showSlide(activeSlide + 1);
    stopAutoAdvance();
    startAutoAdvance();
  });

  indicators.forEach((indicator) => {
    indicator.addEventListener("click", () => {
      showSlide(Number(indicator.dataset.carouselTo));
      stopAutoAdvance();
      startAutoAdvance();
    });
  });

  gallery.addEventListener("pointerenter", stopAutoAdvance);
  gallery.addEventListener("pointerleave", startAutoAdvance);
  gallery.addEventListener("focusin", stopAutoAdvance);
  gallery.addEventListener("focusout", (event) => {
    if (!(event.relatedTarget instanceof Node) || !gallery.contains(event.relatedTarget)) {
      startAutoAdvance();
    }
  });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      stopAutoAdvance();
    } else {
      startAutoAdvance();
    }
  });

  reducedMotion.addEventListener("change", () => {
    if (reducedMotion.matches) {
      stopAutoAdvance();
    } else {
      startAutoAdvance();
    }
  });

  startAutoAdvance();
}
