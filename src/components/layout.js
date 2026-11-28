export const navigationLinks = [
  { name: "الرئيسية", path: "/" },
  { name: "من نحن", path: "/about" },
  { name: "خدماتنا", path: "/services" },
  { name: "أعمالنا", path: "/portfolio" },
  { name: "المدونة", path: "/blog" },
  { name: "تواصل معنا", path: "/contact" },
];

export function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (character) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[character];
  });
}

export function renderHeader(pathname) {
  const navLinks = navigationLinks
    .map(({ name, path }) => {
      const active =
        path === pathname ||
        (path === "/blog" && pathname.startsWith("/blog/"));
      return `<a class="nav-link${active ? " active" : ""}" href="${path}"${
        active ? ' aria-current="page"' : ""
      }>${name}</a>`;
    })
    .join("");

  return `
    <header class="site-header">
      <div class="container navbar">
        <a class="brand" href="/" aria-label="حلول سوفت - الرئيسية">
          <img src="/assets/images/logo.png" alt="حلول سوفت Hulool Soft">
        </a>
        <button class="menu-toggle" type="button" aria-label="فتح القائمة"
          aria-expanded="false" aria-controls="primary-navigation">
          <span></span><span></span><span></span>
        </button>
        <nav id="primary-navigation" class="nav-links" aria-label="التنقل الرئيسي">
          ${navLinks}
          <a class="button button-primary nav-cta" href="/contact">
            اطلب خدمة <span aria-hidden="true">↗</span>
          </a>
        </nav>
      </div>
    </header>`;
}

export function renderFooter() {
  const footerLinks = navigationLinks
    .map(({ name, path }) => `<a href="${path}">${name}</a>`)
    .join("");

  return `
    <footer class="site-footer">
      <div class="container footer-main">
        <div class="footer-about">
          <a href="/" class="footer-brand" aria-label="حلول سوفت">
            <img src="/assets/images/logo.png" alt="حلول سوفت Hulool Soft">
          </a>
          <p>نطوّر حلولًا رقمية عملية تساعد أعمالك على النمو وتمنح أفكارك طريقًا واضحًا إلى التنفيذ.</p>
          <a class="footer-email" href="/contact">لنتحدث عن مشروعك <span aria-hidden="true">↗</span></a>
        </div>
        <div class="footer-column">
          <h2>روابط سريعة</h2>
          <nav aria-label="روابط التذييل">${footerLinks}</nav>
        </div>
        <div class="footer-column footer-contact">
          <h2>ابدأ من هنا</h2>
          <p>أرسل تفاصيل احتياجك وسنساعدك في اختيار الحل التقني المناسب.</p>
          <a class="footer-contact-link" href="/contact">نموذج طلب خدمة <span aria-hidden="true">←</span></a>
          <span class="footer-location">اليمن · نعمل معك أينما كنت</span>
        </div>
      </div>
      <div class="container footer-bottom">
        <span>© ${new Date().getFullYear()} حلول سوفت. جميع الحقوق محفوظة.</span>
        <span>صُنع بعناية في حلول سوفت</span>
      </div>
    </footer>`;
}

export function renderPageHero(kicker, title, description) {
  return `
    <section class="page-hero">
      <div class="container page-hero-content">
        <span class="section-kicker">${kicker}</span>
        <h1>${title}</h1>
        <p>${description}</p>
      </div>
    </section>`;
}

export function renderCtaBanner() {
  return `
    <section class="cta-section">
      <div class="container cta-content">
        <div>
          <span class="cta-kicker">جاهز تبدأ؟</span>
          <h2>فكرتك القادمة تستحق أن ترى النور.</h2>
          <p>شاركنا احتياجك، ولنخطط معًا للحل الأنسب لمشروعك.</p>
        </div>
        <a class="button button-light" href="/contact">ابدأ مشروعك <span aria-hidden="true">↗</span></a>
        <span class="cta-decoration" aria-hidden="true">✳</span>
      </div>
    </section>`;
}

export function renderProjectPreview(project) {
  return `
    <figure class="project-preview">
      <img src="${project.screenshot}" alt="${escapeHTML(project.screenshotAlt)}" loading="lazy">
      <figcaption>${escapeHTML(project.domain)}</figcaption>
    </figure>`;
}
