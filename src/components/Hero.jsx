import { Link } from "react-router";

function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-grid-pattern" aria-hidden="true" />
      <div className="container hero-layout">
        <div className="hero-copy">
          <span className="eyebrow"><span /> شريكك التقني من الفكرة إلى الإطلاق</span>
          <h1>
            نبني حلولًا رقمية
            <br />
            <span>تحرّك أعمالك للأمام</span>
          </h1>
          <p>
            في حلول سوفت، نحول أفكارك إلى مواقع ومنصات وأنظمة رقمية تساعد
            مشروعك على النمو بثقة.
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" to="/contact">
              ابدأ مشروعك <span aria-hidden="true">↗</span>
            </Link>
            <Link className="button button-quiet" to="/portfolio">
              تصفح أعمالنا <span aria-hidden="true">←</span>
            </Link>
          </div>
          <div className="hero-proof">
            <span className="proof-mark" aria-hidden="true">✓</span>
            <span>تخطيط واضح · تنفيذ متقن · دعم مستمر</span>
          </div>
        </div>
        <div className="hero-art" aria-label="رسم توضيحي لحلول تقنية مترابطة">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="hero-glow" />
          <div className="puzzle-piece piece-blue"><span>&lt;/&gt;</span></div>
          <div className="puzzle-piece piece-orange"><span>✦</span></div>
          <div className="puzzle-piece piece-white"><span>⌘</span></div>
          <div className="hero-code-card">
            <span className="code-caption">IDEAS INTO DIGITAL</span>
            <span className="code-main">
              {"{ "}
              <span>grow</span>
              {" }"}
            </span>
            <span className="code-status"><i /> كل شيء يبدأ بفكرة</span>
          </div>
          <span className="art-spark spark-one">✳</span>
          <span className="art-spark spark-two">✦</span>
        </div>
      </div>
      <div className="container hero-bottom">
        <span>منهجية تناسب هدفك</span>
        <span className="hero-bottom-line" />
        <span>تقنية تصنع أثرًا</span>
      </div>
    </section>
  );
}

export default Hero;
