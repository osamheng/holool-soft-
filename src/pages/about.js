import { renderCtaBanner, renderPageHero } from "../components/layout.js";

const values = [
  { icon: "◎", title: "فهم الاحتياج", text: "نبدأ بالاستماع وتحليل التحدي قبل اختيار التقنية." },
  { icon: "✳", title: "جودة التنفيذ", text: "نهتم بالتفاصيل، من وضوح الواجهة إلى استقرار المنتج." },
  { icon: "↗", title: "شراكة مستمرة", text: "نؤمن أن الإطلاق بداية التطوير، لا نهايته." },
];

const technologies = [
  "JavaScript",
  "HTML & CSS",
  "Node.js",
  "واجهات API",
  "قواعد البيانات",
  "تصميم متجاوب",
];

export function renderAboutPage() {
  const valueCards = values
    .map(
      (value) => `
        <article class="value-card"><span class="value-icon">${value.icon}</span>
          <h3>${value.title}</h3><p>${value.text}</p>
        </article>`,
    )
    .join("");
  const technologyTags = technologies
    .map((technology) => `<span>${technology}</span>`)
    .join("");

  return `
    ${renderPageHero("من نحن", 'نبني التقنية التي <span>تخدم فكرتك</span>', "نساعد الشركات والمشاريع على تحويل أهدافها إلى منتجات رقمية عملية وقابلة للنمو.")}
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
      <div class="values-grid">${valueCards}</div>
    </div></section>
    <section class="section technology-section"><div class="container technology-layout">
      <div><span class="section-kicker">التقنيات والأدوات</span><h2>نبني باختيارات تقنية <span>مدروسة</span></h2><p>نختار الأدوات وفق طبيعة المنتج واحتياج العمل، مع قابلية للتطوير والصيانة.</p></div>
      <div class="technology-list">${technologyTags}</div>
    </div></section>
    ${renderCtaBanner()}`;
}
