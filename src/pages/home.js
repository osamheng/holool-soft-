import { escapeHTML, renderCtaBanner, renderProjectPreview } from "../components/layout.js";
import projectsData from "../data/projectsData.js";
import servicesData from "../data/servicesData.js";

function renderHeroServiceShowcase() {
  const slides = servicesData
    .map(
      (service, index) => `
        <a class="service-slide${index === 0 ? " is-active" : ""}" data-service-slide
          href="/services/${encodeURIComponent(service.id)}" aria-label="${escapeHTML(service.title)}"
          aria-hidden="${index !== 0}" tabindex="${index === 0 ? "0" : "-1"}">
          <img src="/assets/images/services/${escapeHTML(service.id)}.svg" alt=""
            ${index === 0 ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">
          <span class="service-slide-label">${escapeHTML(service.title)}</span>
        </a>`,
    )
    .join("");
  const controls = servicesData
    .map(
      (service, index) => `
        <button class="service-slide-control" type="button" data-service-slide-index="${index}"
          aria-label="عرض ${escapeHTML(service.title)}" aria-pressed="${index === 0}"></button>`,
    )
    .join("");

  return `
    <div class="hero-art service-showcase">
      ${slides}
      <div class="service-slide-controls" role="group" aria-label="التنقل بين الخدمات">
        <button class="service-slide-step" type="button" data-service-slide-step="-1"
          aria-label="الخدمة السابقة"><span aria-hidden="true">‹</span></button>
        ${controls}
        <button class="service-slide-step" type="button" data-service-slide-step="1"
          aria-label="الخدمة التالية"><span aria-hidden="true">›</span></button>
      </div>
    </div>`;
}

function renderHeroServiceCopy() {
  return servicesData
    .map(
      (service, index) => `
        <div class="hero-copy-slide${index === 0 ? " is-active" : ""}" data-service-copy
          aria-hidden="${index !== 0}" ${index !== 0 ? "inert" : ""}>
          <span class="eyebrow"><span></span> خدمات حلول سوفت</span>
          <h1>نحوّل فكرتك إلى<br><span>${escapeHTML(service.title)}</span></h1>
          <p>${escapeHTML(service.shortDescription)}</p>
          <div class="hero-actions">
            <a class="button button-primary" href="/contact?service=${encodeURIComponent(service.id)}">
              اطلب هذه الخدمة <span aria-hidden="true">↗</span>
            </a>
            <a class="button button-quiet" href="/services/${encodeURIComponent(service.id)}">
              تفاصيل الخدمة <span aria-hidden="true">←</span>
            </a>
          </div>
          <div class="hero-proof">
            <span class="proof-mark" aria-hidden="true">✓</span>
            <span>${escapeHTML(service.features[0])}</span>
          </div>
        </div>`,
    )
    .join("");
}

export function renderHomePage() {
  const serviceCards = servicesData
    .map(
      (service) => `
        <article class="service-card">
          <div class="service-card-top">
            <span class="service-icon" aria-hidden="true">${escapeHTML(service.icon)}</span>
          </div>
          <h3>${escapeHTML(service.title)}</h3>
          <p>${escapeHTML(service.shortDescription)}</p>
          <a href="/services/${encodeURIComponent(service.id)}" class="text-link">اكتشف الخدمة <span aria-hidden="true">←</span></a>
        </article>`,
    )
    .join("");

  const process = [
    ["التحليل والتخطيط", "نفهم أهدافك ونحوّل احتياجك إلى خطة واضحة ونطاق عمل محدد."],
    ["التصميم وتجربة المستخدم", "نرسم تجربة سهلة وواجهات تعبّر عن علامتك وتخدم جمهورك."],
    ["البرمجة والتطوير", "نبني الحل التقني ونراجع تفاصيله معك خلال مراحل التنفيذ."],
    ["الاختبار والإطلاق", "نختبر المنتج ونجهزه للإطلاق، ثم نساندك في الخطوة التالية."],
  ]
    .map(
      ([title, description]) => `
        <li class="process-step">
          <span class="process-line" aria-hidden="true"></span>
          <h3>${title}</h3><p>${description}</p>
        </li>`,
    )
    .join("");

  const projects = projectsData
    .map(
      (project) => `
        <article class="portfolio-card">
          ${renderProjectPreview(project)}
          <div class="portfolio-info">
            <div class="project-card-meta"><span>${escapeHTML(project.categoryLabel)}</span></div>
            <h3>${escapeHTML(project.name)}</h3>
            <p>${escapeHTML(project.description)}</p>
            <a class="text-link" href="${project.url}" target="_blank" rel="noreferrer">زيارة المشروع <span aria-hidden="true">↗</span></a>
          </div>
        </article>`,
    )
    .join("");
  const heroServiceCopy = renderHeroServiceCopy();
  const heroServiceShowcase = renderHeroServiceShowcase();

  return `
    <section class="hero-section">
      <div class="hero-grid-pattern" aria-hidden="true"></div>
      <div class="container hero-layout" data-service-showcase role="region" aria-label="خدمات حلول سوفت">
        <div class="hero-copy">
          ${heroServiceCopy}
        </div>
        ${heroServiceShowcase}
      </div>
      <div class="container hero-bottom"><span>منهجية تناسب هدفك</span><span class="hero-bottom-line"></span><span>تقنية تصنع أثرًا</span></div>
    </section>
    <section class="section services-section" id="services">
      <div class="container">
        <div class="section-heading">
          <div><span class="section-kicker">خدماتنا</span><h2>كل ما يحتاجه مشروعك <span>رقميًا</span></h2></div>
          <p>نختار التقنية المناسبة لاحتياجك، ونرافق مشروعك في كل خطوة من التخطيط حتى الإطلاق.</p>
        </div>
        <div class="services-grid">${serviceCards}</div>
        <div class="section-more"><a class="button button-outline" href="/services">استكشف جميع الخدمات <span aria-hidden="true">←</span></a></div>
      </div>
    </section>
    <section class="section about-section">
      <div class="container about-layout">
        <div class="about-visual">
          <img class="about-illustration" src="/assets/images/about/understanding-needs.svg"
            alt="" aria-hidden="true" loading="lazy" decoding="async">
        </div>
        <div class="about-copy">
          <span class="section-kicker">من نحن</span>
          <h2>نؤمن أن التقنية الجيدة تبدأ <span>بفهمك</span></h2>
          <p>حلول سوفت شركة برمجيات تعمل على تصميم وتطوير المنتجات الرقمية والأنظمة التي تستجيب لاحتياجات عملائنا. نجمع بين التفكير الواضح والتنفيذ المتقن لصناعة حلول قابلة للنمو.</p>
          <ul class="check-list"><li><span>✓</span> حلول مصممة على احتياج عملك</li><li><span>✓</span> عناية بالتفاصيل وتجربة المستخدم</li><li><span>✓</span> شراكة مستمرة تتجاوز الإطلاق</li></ul>
          <a href="/about" class="text-link">اكتشف قصتنا <span aria-hidden="true">←</span></a>
        </div>
      </div>
    </section>
    <section class="section process-section">
      <div class="container">
        <div class="section-heading">
          <div><span class="section-kicker">طريقة العمل</span><h2>خطوات واضحة. <span>نتائج أفضل.</span></h2></div>
          <p>منهجية عمل منظمة تمنحك صورة واضحة عن المشروع في كل مرحلة.</p>
        </div>
        <ol class="process-grid">${process}</ol>
      </div>
    </section>
    <section class="section portfolio-section">
      <div class="container">
        <div class="section-heading">
          <div><span class="section-kicker">أعمال مختارة</span><h2>أفكار تحولت إلى <span>منتجات رقمية</span></h2></div>
          <p>نماذج من منصات ومواقع شارك فريق حلول سوفت في تصميمها وتطويرها.</p>
        </div>
        <div class="portfolio-grid">${projects}</div>
        <div class="section-more"><a class="button button-outline" href="/portfolio">شاهد جميع الأعمال <span aria-hidden="true">←</span></a></div>
      </div>
    </section>
    ${renderCtaBanner()}`;
}
