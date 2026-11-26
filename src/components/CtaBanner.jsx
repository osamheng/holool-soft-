import { Link } from "react-router";

function CtaBanner() {
  return (
    <section className="cta-section">
      <div className="container cta-content">
        <div>
          <span className="cta-kicker">جاهز تبدأ؟</span>
          <h2>فكرتك القادمة تستحق أن ترى النور.</h2>
          <p>شاركنا احتياجك، ولنخطط معًا للحل الأنسب لمشروعك.</p>
        </div>
        <Link className="button button-light" to="/contact">
          ابدأ مشروعك <span aria-hidden="true">↗</span>
        </Link>
        <span className="cta-decoration" aria-hidden="true">✳</span>
      </div>
    </section>
  );
}

export default CtaBanner;
