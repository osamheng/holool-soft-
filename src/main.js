import "./index.css";
import "./App.css";
import "./pages/Blog.css";
import logoAsset from "./assets/logo.png";
import blogPosts from "./data/blogData.js";
import projectsData from "./data/projectsData.js";
import servicesData from "./data/servicesData.js";

const app = document.querySelector("#app");
const logo = logoAsset;
const links = [
  { name: "الرئيسية", path: "/" },
  { name: "من نحن", path: "/about" },
  { name: "خدماتنا", path: "/services" },
  { name: "أعمالنا", path: "/portfolio" },
  { name: "المدونة", path: "/blog" },
  { name: "تواصل معنا", path: "/contact" },
];
const pageMetadata = {
  "/": {
    title: "حلول سوفت | حلول تقنية تصنع مستقبل أعمالك",
    description:
      "حلول سوفت شركة برمجيات يمنية تقدم تصميم المواقع وتطوير التطبيقات والأنظمة والاستضافة.",
  },
  "/about": {
    title: "من نحن | حلول سوفت",
    description: "تعرف على قصة حلول سوفت ورؤيتها وقيمها وخبرات فريقها التقنية.",
  },
  "/services": {
    title: "خدماتنا | حلول سوفت",
    description:
      "استكشف خدمات تصميم المواقع وتطوير التطبيقات والأنظمة والاستضافة من حلول سوفت.",
  },
  "/portfolio": {
    title: "أعمالنا | حلول سوفت",
    description: "نماذج من أعمال حلول سوفت: QualiCup وموكا لاند وحكاية بُن.",
  },
  "/blog": {
    title: "المدونة | حلول سوفت",
    description:
      "مقالات وأفكار عملية من فريق حلول سوفت عن تطوير الويب والتقنية والأمان الرقمي.",
  },
  "/contact": {
    title: "تواصل معنا | حلول سوفت",
    description: "أرسل تفاصيل مشروعك إلى حلول سوفت وابدأ رحلتك الرقمية.",
  },
};

let activePortfolioFilter = "all";
let activeBlogCategory = "الكل";

function escapeHTML(value) {
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

function header(pathname) {
  const navLinks = links
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
          <img src="${logo}" alt="حلول سوفت Hulool Soft">
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

function footer() {
  const footerLinks = links
    .map(({ name, path }) => `<a href="${path}">${name}</a>`)
    .join("");

  return `
    <footer class="site-footer">
      <div class="container footer-main">
        <div class="footer-about">
          <a href="/" class="footer-brand" aria-label="حلول سوفت">
            <img src="${logo}" alt="حلول سوفت Hulool Soft">
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

function pageHero(kicker, title, description) {
  return `
    <section class="page-hero">
      <div class="container page-hero-content">
        <span class="section-kicker">${kicker}</span>
        <h1>${title}</h1>
        <p>${description}</p>
      </div>
    </section>`;
}

function ctaBanner() {
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

function projectPreview(project) {
  return `
    <figure class="project-preview">
      <img src="${project.screenshot}" alt="${escapeHTML(project.screenshotAlt)}" loading="lazy">
      <figcaption>${escapeHTML(project.domain)}</figcaption>
    </figure>`;
}

function homePage() {
  const serviceCards = servicesData
    .map(
      (service) => `
        <article class="service-card">
          <div class="service-card-top">
            <span class="service-icon" aria-hidden="true">${escapeHTML(service.icon)}</span>
            <span class="service-number">${escapeHTML(service.number)}</span>
          </div>
          <h3>${escapeHTML(service.title)}</h3>
          <p>${escapeHTML(service.shortDescription)}</p>
          <a href="/services#${escapeHTML(service.id)}" class="text-link">اكتشف الخدمة <span aria-hidden="true">←</span></a>
        </article>`,
    )
    .join("");

  const process = [
    ["01", "التحليل والتخطيط", "نفهم أهدافك ونحوّل احتياجك إلى خطة واضحة ونطاق عمل محدد."],
    ["02", "التصميم وتجربة المستخدم", "نرسم تجربة سهلة وواجهات تعبّر عن علامتك وتخدم جمهورك."],
    ["03", "البرمجة والتطوير", "نبني الحل التقني ونراجع تفاصيله معك خلال مراحل التنفيذ."],
    ["04", "الاختبار والإطلاق", "نختبر المنتج ونجهزه للإطلاق، ثم نساندك في الخطوة التالية."],
  ]
    .map(
      ([number, title, description]) => `
        <li class="process-step">
          <span class="process-number">${number}</span>
          <span class="process-line" aria-hidden="true"></span>
          <h3>${title}</h3><p>${description}</p>
        </li>`,
    )
    .join("");

  const projects = projectsData
    .map(
      (project, index) => `
        <article class="portfolio-card">
          ${projectPreview(project)}
          <div class="portfolio-info">
            <div class="project-card-meta"><span>${escapeHTML(project.categoryLabel)}</span><span>0${index + 1}</span></div>
            <h3>${escapeHTML(project.name)}</h3>
            <p>${escapeHTML(project.description)}</p>
            <a class="text-link" href="${project.url}" target="_blank" rel="noreferrer">زيارة المشروع <span aria-hidden="true">↗</span></a>
          </div>
        </article>`,
    )
    .join("");

  return `
    <section class="hero-section">
      <div class="hero-grid-pattern" aria-hidden="true"></div>
      <div class="container hero-layout">
        <div class="hero-copy">
          <span class="eyebrow"><span></span> شريكك التقني من الفكرة إلى الإطلاق</span>
          <h1>نبني حلولًا رقمية<br><span>تحرّك أعمالك للأمام</span></h1>
          <p>في حلول سوفت، نحول أفكارك إلى مواقع ومنصات وأنظمة رقمية تساعد مشروعك على النمو بثقة.</p>
          <div class="hero-actions">
            <a class="button button-primary" href="/contact">ابدأ مشروعك <span aria-hidden="true">↗</span></a>
            <a class="button button-quiet" href="/portfolio">تصفح أعمالنا <span aria-hidden="true">←</span></a>
          </div>
          <div class="hero-proof"><span class="proof-mark" aria-hidden="true">✓</span><span>تخطيط واضح · تنفيذ متقن · دعم مستمر</span></div>
        </div>
        <div class="hero-art" aria-label="رسم توضيحي لحلول تقنية مترابطة">
          <div class="orbit orbit-one"></div><div class="orbit orbit-two"></div><div class="hero-glow"></div>
          <div class="puzzle-piece piece-blue"><span>&lt;/&gt;</span></div>
          <div class="puzzle-piece piece-orange"><span>✦</span></div>
          <div class="puzzle-piece piece-white"><span>⌘</span></div>
          <div class="hero-code-card">
            <span class="code-caption">IDEAS INTO DIGITAL</span>
            <span class="code-main">{ <span>grow</span> }</span>
            <span class="code-status"><i></i> كل شيء يبدأ بفكرة</span>
          </div>
          <span class="art-spark spark-one">✳</span><span class="art-spark spark-two">✦</span>
        </div>
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
          <div class="about-mark-grid" aria-hidden="true"><span>&lt;/&gt;</span><span>✦</span><span>⌘</span><span>✓</span></div>
          <div class="about-note"><span class="about-note-icon">✓</span><span><strong>من الفكرة إلى التنفيذ</strong><small>شريكك في كل خطوة</small></span></div>
          <span class="about-orbit" aria-hidden="true"></span>
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
    ${ctaBanner()}`;
}

function aboutPage() {
  const values = [
    { icon: "◎", title: "فهم الاحتياج", text: "نبدأ بالاستماع وتحليل التحدي قبل اختيار التقنية." },
    { icon: "✳", title: "جودة التنفيذ", text: "نهتم بالتفاصيل، من وضوح الواجهة إلى استقرار المنتج." },
    { icon: "↗", title: "شراكة مستمرة", text: "نؤمن أن الإطلاق بداية التطوير، لا نهايته." },
  ]
    .map(
      (value) => `
        <article class="value-card"><span class="value-icon">${value.icon}</span>
          <h3>${value.title}</h3><p>${value.text}</p>
        </article>`,
    )
    .join("");
  const technologies = ["JavaScript", "HTML & CSS", "Node.js", "واجهات API", "قواعد البيانات", "تصميم متجاوب"]
    .map((technology) => `<span>${technology}</span>`)
    .join("");

  return `
    ${pageHero("من نحن", 'نبني التقنية التي <span>تخدم فكرتك</span>', "نساعد الشركات والمشاريع على تحويل أهدافها إلى منتجات رقمية عملية وقابلة للنمو.")}
    <section class="section"><div class="container story-layout">
      <div class="story-heading"><span class="section-kicker">قصتنا</span><h2>تقنية قريبة من <span>الناس والأعمال</span></h2></div>
      <div class="story-copy">
        <p>حلول سوفت شركة برمجيات يمنية تعمل على تصميم وتطوير المواقع والتطبيقات والأنظمة. نؤمن أن الحل الرقمي الناجح لا يبدأ بالكود، بل بفهم العمل الذي يحتاج أن ينجح.</p>
        <p>لذلك نرافق عملاءنا في مراحل المشروع المختلفة: نخطط، نصمم، نطوّر، ونختبر، مع تركيز على تجربة واضحة وجودة يمكن البناء عليها.</p>
        <a href="/contact" class="text-link">تحدث معنا عن مشروعك <span>←</span></a>
      </div>
    </div></section>
    <section class="section values-section"><div class="container">
      <div class="section-heading"><div><span class="section-kicker">ما نؤمن به</span><h2>قيم تقود <span>كل مشروع</span></h2></div></div>
      <div class="values-grid">${values}</div>
    </div></section>
    <section class="section technology-section"><div class="container technology-layout">
      <div><span class="section-kicker">التقنيات والأدوات</span><h2>نبني باختيارات تقنية <span>مدروسة</span></h2><p>نختار الأدوات وفق طبيعة المنتج واحتياج العمل، مع قابلية للتطوير والصيانة.</p></div>
      <div class="technology-list">${technologies}</div>
    </div></section>
    ${ctaBanner()}`;
}

function servicesPage() {
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
    ${pageHero("خدماتنا", 'حلول تقنية تناسب <span>احتياجك</span>', "من موقعك الأول إلى منصتك المتكاملة، نساعدك في اختيار الحل المناسب وتنفيذه.")}
    <section class="section detailed-services"><div class="container">${services}</div></section>
    ${ctaBanner()}`;
}

function portfolioPage() {
  const filters = [
    { id: "all", label: "الكل" },
    { id: "systems", label: "منصات وأنظمة" },
    { id: "business", label: "مواقع تعريفية وتجارية" },
  ]
    .map(
      ({ id, label }) => `
        <button type="button" class="filter-button${activePortfolioFilter === id ? " active" : ""}"
          data-filter-kind="portfolio" data-filter="${id}" aria-pressed="${activePortfolioFilter === id}">
          ${label}
        </button>`,
    )
    .join("");
  const projects = projectsData
    .filter((project) => activePortfolioFilter === "all" || project.category === activePortfolioFilter)
    .map(
      (project) => `
        <article class="portfolio-card">
          ${projectPreview(project)}
          <div class="portfolio-info">
            <div class="project-card-meta"><span>${escapeHTML(project.categoryLabel)}</span></div>
            <h2>${escapeHTML(project.name)}</h2><p>${escapeHTML(project.description)}</p>
            <div class="project-contribution"><strong>مساهمة حلول سوفت</strong><span>${escapeHTML(project.contribution)}</span></div>
            <a class="text-link" href="${project.url}" target="_blank" rel="noreferrer">زيارة الموقع <span aria-hidden="true">↗</span></a>
          </div>
        </article>`,
    )
    .join("");

  return `
    ${pageHero("أعمالنا", 'مشاريع تعكس <span>ما نصنعه</span>', "منصات ومواقع رقمية لقطاعات مختلفة، صُممت لتقدم قيمة حقيقية لمستخدميها.")}
    <section class="section portfolio-page"><div class="container">
      <div class="portfolio-filters" role="group" aria-label="تصفية المشاريع">${filters}</div>
      <div class="portfolio-grid portfolio-page-grid">${projects}</div>
    </div></section>
    ${ctaBanner()}`;
}

function blogPage() {
  const categories = ["الكل", ...new Set(blogPosts.map((post) => post.category))];
  const filters = categories
    .map(
      (category) => `
        <button type="button" class="filter-button${activeBlogCategory === category ? " active" : ""}"
          data-filter-kind="blog" data-filter="${escapeHTML(category)}" aria-pressed="${activeBlogCategory === category}">
          ${escapeHTML(category)}
        </button>`,
    )
    .join("");
  const posts = blogPosts.filter(
    (post) => activeBlogCategory === "الكل" || post.category === activeBlogCategory,
  );
  const postCards = posts
    .map(
      (post, index) => `
        <article class="blog-card${index === 0 ? " blog-card-featured" : ""}">
          <a class="blog-card-link" href="/blog/${encodeURIComponent(post.slug)}" aria-label="اقرأ المقال: ${escapeHTML(post.title)}">
            <div class="blog-card-art" aria-hidden="true">
              <span class="blog-card-mark">${escapeHTML(post.icon)}</span>
              <span class="blog-card-category">${escapeHTML(post.category)}</span>
              <span class="blog-card-index">${String(index + 1).padStart(2, "0")}</span>
            </div>
            <div class="blog-card-content">
              <div class="blog-card-meta"><time datetime="${escapeHTML(post.publishedAt)}">${escapeHTML(post.publishedLabel)}</time><span>${escapeHTML(post.readingTime)} قراءة</span></div>
              <h2>${escapeHTML(post.title)}</h2><p>${escapeHTML(post.excerpt)}</p>
              <span class="blog-read-link">اقرأ المقال <span aria-hidden="true">←</span></span>
            </div>
          </a>
        </article>`,
    )
    .join("");

  return `
    <section class="page-hero blog-hero"><div class="container page-hero-content">
      <span class="section-kicker">مدونة حلول سوفت</span><h1>معرفة تقنية <span>بلغة واضحة</span></h1>
      <p>أفكار وتجارب عملية تساعدك على فهم التقنية واتخاذ قرارات أفضل لمشروعك الرقمي.</p>
    </div></section>
    <section class="section blog-list-section"><div class="container">
      <div class="blog-list-heading">
        <div><span class="section-kicker">من خبرتنا</span><h2>مقالات وأفكار</h2></div>
        <div class="blog-filters" role="group" aria-label="تصفية المقالات حسب التصنيف">${filters}</div>
      </div>
      ${posts.length ? `<div class="blog-grid">${postCards}</div>` : '<p class="blog-state-message">لا توجد مقالات منشورة حاليًا.</p>'}
    </div></section>`;
}

function blogArticlePage(slug) {
  const post = blogPosts.find((article) => article.slug === slug);
  if (!post) {
    return `
      <section class="page-hero blog-not-found"><div class="container page-hero-content">
        <span class="section-kicker">المدونة</span><h1>لم نعثر على هذا المقال</h1>
        <p>ربما تغير الرابط أو لم يعد المقال متاحًا.</p>
        <a class="button button-primary" href="/blog">العودة إلى المدونة</a>
      </div></section>`;
  }

  const sections = post.sections
    .map(
      (section) => `
        <section class="blog-article-section">
          ${section.heading ? `<h2>${escapeHTML(section.heading)}</h2>` : ""}
          ${section.paragraphs.map((paragraph) => `<p>${escapeHTML(paragraph)}</p>`).join("")}
          ${section.points ? `<ul>${section.points.map((point) => `<li>${escapeHTML(point)}</li>`).join("")}</ul>` : ""}
        </section>`,
    )
    .join("");

  return `
    <article class="blog-article">
      <header class="blog-article-header"><div class="container">
        <a class="blog-back-link" href="/blog"><span aria-hidden="true">→</span> العودة إلى المدونة</a>
        <span class="section-kicker">${escapeHTML(post.category)}</span>
        <h1>${escapeHTML(post.title)}</h1><p class="blog-article-excerpt">${escapeHTML(post.excerpt)}</p>
        <div class="blog-article-meta"><span>${escapeHTML(post.author)}</span><time datetime="${escapeHTML(post.publishedAt)}">${escapeHTML(post.publishedLabel)}</time><span>${escapeHTML(post.readingTime)} قراءة</span></div>
        <div class="blog-article-art" aria-hidden="true"><span>${escapeHTML(post.icon)}</span></div>
      </div></header>
      <div class="container blog-article-layout"><div class="blog-article-body">
        <p class="blog-article-intro">${escapeHTML(post.intro)}</p>${sections}
        <aside class="blog-article-cta"><div><strong>تعمل على فكرة رقمية؟</strong><p>تواصل مع فريق حلول سوفت لمناقشة احتياج مشروعك.</p></div>
          <a class="button button-primary" href="/contact">تواصل معنا <span aria-hidden="true">↗</span></a>
        </aside>
      </div></div>
    </article>`;
}

function contactPage() {
  const requestedService = new URLSearchParams(window.location.search).get("service");
  const selectedService = servicesData.some((service) => service.id === requestedService)
    ? requestedService
    : "";
  const options = servicesData
    .map(
      (service) => `
        <option value="${escapeHTML(service.id)}"${service.id === selectedService ? " selected" : ""}>
          ${escapeHTML(service.title)}
        </option>`,
    )
    .join("");

  return `
    ${pageHero("تواصل معنا", 'كل مشروع يبدأ <span>بحديث</span>', "أخبرنا عن فكرتك، وسنجهز لك رسالة طلب خدمة ترسلها مباشرة إلى واتساب حلول سوفت.")}
    <section class="section contact-section"><div class="container contact-layout">
      <aside class="contact-aside">
        <span class="section-kicker">لنتواصل</span><h2>شاركنا ما تريد <span>إنجازه</span></h2>
        <p>املأ النموذج بمعلوماتك وتفاصيل المشروع. سنجهز رسالة واتساب بمعلوماتك وتفتح محادثة مباشرة مع حلول سوفت لمراجعتها وإرسالها.</p>
        <div class="contact-info-card"><span class="contact-info-icon">↗</span><div><strong>التواصل عبر واتساب</strong><span>بعد تعبئة النموذج، ستفتح محادثة حلول سوفت مع تفاصيل طلبك.</span></div></div>
        <p class="contact-note">بيانات الهاتف والبريد والعنوان الرسمي وساعات العمل غير متوفرة ضمن الملفات المرفقة، لذلك لم نضف معلومات غير مؤكدة.</p>
      </aside>
      <form class="contact-form" id="contact-form">
        <div class="form-heading"><h2>طلب خدمة</h2><span>جميع الحقول مطلوبة</span></div>
        <div class="form-grid">
          <label>الاسم الكامل<input name="name" type="text" autocomplete="name" placeholder="الاسم الذي نتواصل به" required minlength="2"></label>
          <label class="form-full">الهاتف / واتساب
            <input name="phone" type="tel" dir="ltr" autocomplete="tel" placeholder="+967771351576"
              pattern="\\+?[1-9][0-9]{7,14}" title="أدخل الرقم مع رمز الدولة، مثل +967771351576" required>
          </label>
          <label class="form-full">البريد الإلكتروني<input name="email" type="email" autocomplete="email" placeholder="name@example.com" required></label>
          <label class="form-full">نوع الخدمة
            <select name="service" required><option value="" disabled${selectedService ? "" : " selected"}>اختر الخدمة المطلوبة</option>${options}</select>
          </label>
          <label class="form-full">تفاصيل المشروع<textarea name="details" rows="5" placeholder="ما الفكرة أو التحدي الذي تريد العمل عليه؟" required minlength="10"></textarea></label>
        </div>
        <button type="submit" class="button button-primary form-submit">تجهيز رسالة واتساب <span aria-hidden="true">↗</span></button>
      </form>
    </div></section>`;
}

function renderPage(pathname) {
  if (pathname === "/") return homePage();
  if (pathname === "/about") return aboutPage();
  if (pathname === "/services") return servicesPage();
  if (pathname === "/portfolio") return portfolioPage();
  if (pathname === "/blog") return blogPage();
  if (pathname.startsWith("/blog/")) {
    return blogArticlePage(pathname.slice("/blog/".length));
  }
  if (pathname === "/contact") return contactPage();
  return `
    <section class="page-hero"><div class="container page-hero-content">
      <span class="section-kicker">404</span><h1>الصفحة غير موجودة</h1>
      <p>الرابط الذي طلبته غير متاح. يمكنك العودة إلى الصفحة الرئيسية.</p>
      <a class="button button-primary" href="/">العودة للرئيسية</a>
    </div></section>`;
}

function updateMetadata(pathname) {
  const article = pathname.startsWith("/blog/")
    ? blogPosts.find(
        (post) => encodeURIComponent(post.slug) === pathname.slice("/blog/".length),
      )
    : null;
  const metadata = article
    ? {
        title: `${article.title} | المدونة | حلول سوفت`,
        description: article.excerpt,
      }
    : pageMetadata[pathname] || pageMetadata["/"];
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
  app.innerHTML = `${header(pathname)}<main>${renderPage(pathname)}</main>${footer()}`;
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
