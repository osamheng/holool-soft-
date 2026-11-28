import { escapeHTML, renderCtaBanner, renderProjectPreview } from "../components/layout.js";
import projectsData from "../data/projectsData.js";
import servicesData from "../data/servicesData.js";

export function renderHomePage() {
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
          ${renderProjectPreview(project)}
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
    ${renderCtaBanner()}`;
}
