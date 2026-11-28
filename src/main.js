import "./styles/base.css";
import "./styles/site.css";
import "./styles/blog.css";
import { renderFooter, renderHeader } from "./components/layout.js";
import servicesData from "./data/servicesData.js";
import { getPageMetadata, renderPage } from "./pages/index.js";

const app = document.querySelector("#app");
let activePortfolioFilter = "all";
let activeBlogCategory = "الكل";

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
