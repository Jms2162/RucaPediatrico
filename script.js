const menuToggle = document.querySelector(".menu-toggle");
const siteNavigation = document.querySelector(".site-nav");
const logo = document.querySelector(".brand-logo");
const currentYear = document.querySelector("[data-current-year]");
const professionalCards = document.querySelectorAll(".professional-card");

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

professionalCards.forEach((card) => {
  const front = card.querySelector(".professional-front");
  const back = card.querySelector(".professional-back");
  const name = card.dataset.professional;

  if (!front || !back || !name) {
    return;
  }

  card.addEventListener("click", () => {
    const isFlipped = card.classList.toggle("is-flipped");
    card.setAttribute("aria-pressed", String(isFlipped));
    card.setAttribute(
      "aria-label",
      `${isFlipped ? "Ver perfil de" : "Ver descripción de"} ${name}`,
    );
    front.setAttribute("aria-hidden", String(isFlipped));
    back.setAttribute("aria-hidden", String(!isFlipped));
  });
});
