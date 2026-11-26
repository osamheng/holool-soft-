import { Link } from "react-router";
import CtaBanner from "../components/CtaBanner";

const values = [
  { icon: "◎", title: "فهم الاحتياج", text: "نبدأ بالاستماع وتحليل التحدي قبل اختيار التقنية." },
  { icon: "✳", title: "جودة التنفيذ", text: "نهتم بالتفاصيل، من وضوح الواجهة إلى استقرار المنتج." },
  { icon: "↗", title: "شراكة مستمرة", text: "نؤمن أن الإطلاق بداية التطوير، لا نهايته." },
];

const technologies = ["React", "Vite", "JavaScript", "Node.js", "HTML & CSS", "واجهات API"];

function About() {
  return (
    <>
      <section className="page-hero">
        <div className="container page-hero-content">
          <span className="section-kicker">من نحن</span>
          <h1>نبني التقنية التي <span>تخدم فكرتك</span></h1>
          <p>نساعد الشركات والمشاريع على تحويل أهدافها إلى منتجات رقمية عملية وقابلة للنمو.</p>
        </div>
      </section>
      <section className="section">
        <div className="container story-layout">
          <div className="story-heading">
            <span className="section-kicker">قصتنا</span>
            <h2>تقنية قريبة من <span>الناس والأعمال</span></h2>
          </div>
          <div className="story-copy">
            <p>
              حلول سوفت شركة برمجيات يمنية تعمل على تصميم وتطوير المواقع
              والتطبيقات والأنظمة. نؤمن أن الحل الرقمي الناجح لا يبدأ بالكود،
              بل بفهم العمل الذي يحتاج أن ينجح.
            </p>
            <p>
              لذلك نرافق عملاءنا في مراحل المشروع المختلفة: نخطط، نصمم،
              نطوّر، ونختبر، مع تركيز على تجربة واضحة وجودة يمكن البناء عليها.
            </p>
            <Link to="/contact" className="text-link">تحدث معنا عن مشروعك <span>←</span></Link>
          </div>
        </div>
      </section>
      <section className="section values-section">
        <div className="container">
          <div className="section-heading">
            <div><span className="section-kicker">ما نؤمن به</span><h2>قيم تقود <span>كل مشروع</span></h2></div>
          </div>
          <div className="values-grid">
            {values.map((value) => (
              <article className="value-card" key={value.title}>
                <span className="value-icon">{value.icon}</span>
                <h3>{value.title}</h3>
                <p>{value.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section technology-section">
        <div className="container technology-layout">
          <div>
            <span className="section-kicker">التقنيات والأدوات</span>
            <h2>نبني باختيارات تقنية <span>مدروسة</span></h2>
            <p>نختار الأدوات وفق طبيعة المنتج واحتياج العمل، مع قابلية للتطوير والصيانة.</p>
          </div>
          <div className="technology-list">
            {technologies.map((technology) => <span key={technology}>{technology}</span>)}
          </div>
        </div>
      </section>
      <CtaBanner />
    </>
  );
}

export default About;
