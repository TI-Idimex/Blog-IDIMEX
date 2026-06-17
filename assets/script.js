const header = document.querySelector("[data-header]");
const navToggle = document.querySelector("[data-nav-toggle]");
const nav = document.querySelector("[data-nav]");

const setHeaderState = () => {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 24);
};

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    const isOpen = document.body.classList.toggle("nav-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.addEventListener("click", (event) => {
    const target = event.target;
    if (target instanceof HTMLAnchorElement) {
      document.body.classList.remove("nav-open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
}

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14, rootMargin: "0px 0px -60px 0px" });

  revealElements.forEach((element) => observer.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}

const parallaxCards = document.querySelectorAll(".parallax-card img");

window.addEventListener("scroll", () => {
  if (!parallaxCards.length || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  parallaxCards.forEach((image) => {
    const rect = image.getBoundingClientRect();
    const progress = (rect.top - window.innerHeight) / (window.innerHeight + rect.height);
    const offset = Math.max(-18, Math.min(18, progress * -32));
    image.style.transform = `translateY(${offset}px) scale(1.06)`;
  });
}, { passive: true });

const collectionFilters = document.querySelectorAll("[data-collection-filter]");
const collectionCards = document.querySelectorAll("[data-collection-card]");

if (collectionFilters.length && collectionCards.length) {
  collectionFilters.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedFilter = button.dataset.collectionFilter || "all";

      collectionFilters.forEach((filterButton) => {
        const isActive = filterButton === button;
        filterButton.classList.toggle("is-active", isActive);
        filterButton.setAttribute("aria-pressed", String(isActive));
      });

      collectionCards.forEach((card) => {
        const shouldShow = selectedFilter === "all" || card.dataset.group === selectedFilter;
        card.classList.toggle("is-hidden", !shouldShow);
      });
    });
  });
}

document.querySelectorAll("form").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const button = form.querySelector("button[type='submit']");
    if (!button) return;

    const originalText = button.textContent;
    button.textContent = form.classList.contains("newsletter-form") ? "Inspiração registrada" : "Mensagem registrada";
    button.setAttribute("disabled", "true");

    window.setTimeout(() => {
      button.textContent = originalText;
      button.removeAttribute("disabled");
      form.reset();
    }, 2600);
  });
});
