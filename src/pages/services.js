import { renderCtaBanner, renderPageHero, escapeHTML } from "../components/layout.js";
import servicesData from "../data/servicesData.js";

export function renderServicesPage() {
  const services = servicesData
    .map(
      (service) => `
        <article class="service-product-card" id="${escapeHTML(service.id)}">
          <div class="service-product-art">
            <img src="/assets/images/services/${escapeHTML(service.id)}.svg"
              alt="" loading="lazy" decoding="async">
          </div>
          <div class="service-product-content">
            <span class="service-icon" aria-hidden="true">${escapeHTML(service.icon)}</span>
            <h2>${escapeHTML(service.title)}</h2>
            <p class="service-product-summary">${escapeHTML(service.shortDescription)}</p>
            <a class="button button-outline service-product-more" href="/services/${encodeURIComponent(service.id)}">
              تفاصيل أكثر <span aria-hidden="true">←</span>
            </a>
          </div>
        </article>`,
    )
    .join("");

  return `
    ${renderPageHero("خدماتنا", 'حلول تقنية تناسب <span>احتياجك</span>', "من موقعك الأول إلى منصتك المتكاملة، نساعدك في اختيار الحل المناسب وتنفيذه.")}
    <section class="section services-catalog-section">
      <div class="container">
        <div class="services-catalog-heading">
          <span class="section-kicker">خدمات حلول سوفت</span>
          <h2>اكتشف الخدمة المناسبة لمشروعك</h2>
          <p>استعرض الخدمات، وانتقل إلى صفحة التفاصيل لمعرفة ما تتضمنه كل خدمة.</p>
        </div>
        <div class="services-catalog-grid">${services}</div>
      </div>
    </section>
    ${renderCtaBanner()}`;
}
