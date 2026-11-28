import { escapeHTML, renderCtaBanner } from "../components/layout.js";
import servicesData from "../data/servicesData.js";

export function renderServiceDetailPage(serviceId) {
  const service = servicesData.find((item) => item.id === serviceId);
  if (!service) {
    return `
      <section class="page-hero">
        <div class="container page-hero-content">
          <span class="section-kicker">خدماتنا</span>
          <h1>لم نعثر على هذه الخدمة</h1>
          <p>قد يكون الرابط غير صحيح أو أن الخدمة لم تعد متاحة.</p>
          <a class="button button-primary" href="/services">العودة إلى خدماتنا</a>
        </div>
      </section>`;
  }

  const features = service.features
    .map((feature) => `<li>${escapeHTML(feature)}</li>`)
    .join("");

  return `
    <article class="service-detail-page">
      <header class="service-detail-header">
        <div class="container">
          <a class="service-detail-back" href="/services">
            <span aria-hidden="true">→</span> العودة إلى خدماتنا
          </a>
          <div class="service-detail-hero">
            <div class="service-detail-intro">
              <span class="section-kicker">خدمات حلول سوفت</span>
              <h1 id="service-detail-title">${escapeHTML(service.title)}</h1>
              <p class="service-detail-lead">${escapeHTML(service.shortDescription)}</p>
              <p>${escapeHTML(service.description)}</p>
              <a class="button button-primary" href="/contact?service=${encodeURIComponent(service.id)}">
                اطلب هذه الخدمة <span aria-hidden="true">↗</span>
              </a>
            </div>
            <div class="service-detail-art">
              <img src="/assets/images/services/${escapeHTML(service.id)}.svg"
                alt="" fetchpriority="high" decoding="async">
            </div>
          </div>
        </div>
      </header>
      <section class="section service-detail-information" aria-labelledby="service-detail-title">
        <div class="container service-detail-information-grid">
          <article class="service-detail-information-card">
            <span class="service-detail-information-icon" aria-hidden="true">◎</span>
            <h2>لمن هذه الخدمة؟</h2>
            <p>${escapeHTML(service.audience)}</p>
          </article>
          <article class="service-detail-information-card">
            <span class="service-detail-information-icon" aria-hidden="true">✓</span>
            <h2>ما الذي تتضمنه؟</h2>
            <ul>${features}</ul>
          </article>
        </div>
      </section>
      ${renderCtaBanner()}
    </article>`;
}
