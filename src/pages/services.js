import { renderCtaBanner, renderPageHero, escapeHTML } from "../components/layout.js";
import servicesData from "../data/servicesData.js";

export function renderServicesPage() {
  const services = servicesData
    .map(
      (service) => `
        <article class="detail-service" id="${escapeHTML(service.id)}">
          <span class="detail-service-number">${escapeHTML(service.number)}</span>
          <div class="detail-service-content">
            <span class="service-icon">${escapeHTML(service.icon)}</span>
            <h2>${escapeHTML(service.title)}</h2><p>${escapeHTML(service.description)}</p>
            <div class="service-detail-meta">
              <div><h3>لمن هذه الخدمة؟</h3><p>${escapeHTML(service.audience)}</p></div>
              <div><h3>ما الذي تتضمنه؟</h3><ul>${service.features.map((feature) => `<li>${escapeHTML(feature)}</li>`).join("")}</ul></div>
            </div>
            <a class="button button-primary" href="/contact?service=${encodeURIComponent(service.id)}">اطلب هذه الخدمة <span aria-hidden="true">↗</span></a>
          </div>
        </article>`,
    )
    .join("");

  return `
    ${renderPageHero("خدماتنا", 'حلول تقنية تناسب <span>احتياجك</span>', "من موقعك الأول إلى منصتك المتكاملة، نساعدك في اختيار الحل المناسب وتنفيذه.")}
    <section class="section detailed-services"><div class="container">${services}</div></section>
    ${renderCtaBanner()}`;
}
