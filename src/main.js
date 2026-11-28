import "./styles/base.css";
import "./styles/site.css";
import "./styles/blog.css";
import { renderFooter, renderHeader } from "./components/layout.js";
import servicesData from "./data/servicesData.js";
import { getPageMetadata, renderPage } from "./pages/index.js";

const app = document.querySelector("#app");
let activePortfolioFilter = "all";
let activeBlogCategory = "الكل";
let serviceShowcaseTimer = null;

function initializeServiceShowcase() {
  window.clearInterval(serviceShowcaseTimer);
  serviceShowcaseTimer = null;

  const showcase = app.querySelector("[data-service-showcase]");
  if (!showcase) return;

  const slides = [...showcase.querySelectorAll("[data-service-slide]")];
  const copySlides = [...showcase.querySelectorAll("[data-service-copy]")];
  const controls = [...showcase.querySelectorAll("[data-service-slide-index]")];
  const stepControls = [...showcase.querySelectorAll("[data-service-slide-step]")];
  let activeIndex = 0;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const showSlide = (index) => {
    activeIndex = (index + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => {
      const isActive = slideIndex === activeIndex;
      slide.classList.toggle("is-active", isActive);
      slide.setAttribute("aria-hidden", String(!isActive));
      slide.tabIndex = isActive ? 0 : -1;
    });
    copySlides.forEach((slide, slideIndex) => {
      const isActive = slideIndex === activeIndex;
      slide.classList.toggle("is-active", isActive);
      slide.setAttribute("aria-hidden", String(!isActive));
      slide.inert = !isActive;
    });
    controls.forEach((control, controlIndex) => {
      control.setAttribute("aria-pressed", String(controlIndex === activeIndex));
    });
  };

  const pause = () => {
    window.clearInterval(serviceShowcaseTimer);
    serviceShowcaseTimer = null;
  };
  const start = () => {
    pause();
    if (
      reducedMotion ||
      showcase.matches(":hover") ||
      showcase.contains(document.activeElement)
    ) {
      return;
    }
    serviceShowcaseTimer = window.setInterval(() => showSlide(activeIndex + 1), 4500);
  };
  const handleFocusOut = (event) => {
    if (!showcase.contains(event.relatedTarget)) start();
  };

  controls.forEach((control, index) => {
    control.addEventListener("click", (event) => {
      showSlide(index);
      if (event.detail > 0) control.blur();
      start();
    });
  });
  stepControls.forEach((control) => {
    control.addEventListener("click", (event) => {
      showSlide(activeIndex + Number(control.dataset.serviceSlideStep));
      if (event.detail > 0) control.blur();
      start();
    });
  });
  showcase.addEventListener("pointerenter", pause);
  showcase.addEventListener("pointerleave", start);
  showcase.addEventListener("focusin", pause);
  showcase.addEventListener("focusout", handleFocusOut);

  showSlide(0);
  start();
}

function updateMetadata(pathname) {
  const metadata = getPageMetadata(pathname);
  document.title = metadata.title;
  document
    .querySelector('meta[name="description"]')
    ?.setAttribute("content", metadata.description);
}

function scrollToLocation() {
  if (window.location.hash) {
    const targetId = decodeURIComponent(window.location.hash.slice(1));
    document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
    return;
  }
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderApp({ preserveScroll = false } = {}) {
  const scrollY = window.scrollY;
  const pathname = window.location.pathname.replace(/\/+$/, "") || "/";
  const page = renderPage(pathname, {
    portfolioFilter: activePortfolioFilter,
    blogCategory: activeBlogCategory,
  });

  app.innerHTML = `${renderHeader(pathname)}<main>${page}</main>${renderFooter()}`;
  initializeServiceShowcase();
  updateMetadata(pathname);

  if (preserveScroll) {
    window.scrollTo({ top: scrollY });
  } else {
    requestAnimationFrame(scrollToLocation);
  }
}

app.addEventListener("click", (event) => {
  const menuToggle = event.target.closest(".menu-toggle");
  if (menuToggle) {
    const navigation = document.querySelector("#primary-navigation");
    const isOpen = menuToggle.getAttribute("aria-expanded") !== "true";
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "إغلاق القائمة" : "فتح القائمة");
    menuToggle.classList.toggle("is-open", isOpen);
    navigation.classList.toggle("is-open", isOpen);
    return;
  }

  const filterButton = event.target.closest("[data-filter-kind]");
  if (filterButton) {
    if (filterButton.dataset.filterKind === "portfolio") {
      activePortfolioFilter = filterButton.dataset.filter;
    } else {
      activeBlogCategory = filterButton.dataset.filter;
    }
    renderApp({ preserveScroll: true });
    return;
  }

  const anchor = event.target.closest("a[href]");
  if (
    !anchor ||
    event.defaultPrevented ||
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey ||
    anchor.target ||
    anchor.hasAttribute("download")
  ) {
    return;
  }

  const destination = new URL(anchor.href, window.location.href);
  if (destination.origin !== window.location.origin) return;

  event.preventDefault();
  const nextURL = `${destination.pathname}${destination.search}${destination.hash}`;
  if (
    destination.pathname === window.location.pathname &&
    destination.search === window.location.search
  ) {
    if (destination.hash !== window.location.hash) {
      window.history.pushState({}, "", nextURL);
      scrollToLocation();
    }
    return;
  }

  window.history.pushState({}, "", nextURL);
  renderApp();
});

app.addEventListener("submit", (event) => {
  if (event.target.id !== "contact-form") return;
  event.preventDefault();
  const form = event.target;
  if (!form.reportValidity()) return;

  const formData = new FormData(form);
  const service = servicesData.find((item) => item.id === formData.get("service"));
  const message = [
    "طلب خدمة جديد - حلول سوفت",
    `الاسم: ${formData.get("name")}`,
    `الهاتف / واتساب: ${formData.get("phone")}`,
    `البريد الإلكتروني: ${formData.get("email")}`,
    `الخدمة: ${service ? service.title : "غير محددة"}`,
    `تفاصيل المشروع: ${formData.get("details")}`,
  ].join("\n");
  window.location.assign(
    `https://wa.me/967771351576?text=${encodeURIComponent(message)}`,
  );
});

window.addEventListener("popstate", () => renderApp());

renderApp();
