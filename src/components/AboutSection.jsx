import { Link } from "react-router";

function AboutSection() {
  return (
    <section className="section about-section">
      <div className="container about-layout">
        <div className="about-visual">
          <div className="about-mark-grid" aria-hidden="true">
            <span>&lt;/&gt;</span><span>✦</span><span>⌘</span><span>✓</span>
          </div>
          <div className="about-note">
            <span className="about-note-icon">✓</span>
            <span><strong>من الفكرة إلى التنفيذ</strong><small>شريكك في كل خطوة</small></span>
          </div>
          <span className="about-orbit" aria-hidden="true" />
        </div>
        <div className="about-copy">
          <span className="section-kicker">من نحن</span>
          <h2>نؤمن أن التقنية الجيدة تبدأ <span>بفهمك</span></h2>
          <p>
            حلول سوفت شركة برمجيات تعمل على تصميم وتطوير المنتجات الرقمية
            والأنظمة التي تستجيب لاحتياجات عملائنا. نجمع بين التفكير الواضح
            والتنفيذ المتقن لصناعة حلول قابلة للنمو.
          </p>
          <ul className="check-list">
            <li><span>✓</span> حلول مصممة على احتياج عملك</li>
            <li><span>✓</span> عناية بالتفاصيل وتجربة المستخدم</li>
            <li><span>✓</span> شراكة مستمرة تتجاوز الإطلاق</li>
          </ul>
          <Link to="/about" className="text-link">
            اكتشف قصتنا <span aria-hidden="true">←</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
