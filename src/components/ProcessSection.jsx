const steps = [
  { number: "01", title: "التحليل والتخطيط", description: "نفهم أهدافك ونحوّل احتياجك إلى خطة واضحة ونطاق عمل محدد." },
  { number: "02", title: "التصميم وتجربة المستخدم", description: "نرسم تجربة سهلة وواجهات تعبّر عن علامتك وتخدم جمهورك." },
  { number: "03", title: "البرمجة والتطوير", description: "نبني الحل التقني ونراجع تفاصيله معك خلال مراحل التنفيذ." },
  { number: "04", title: "الاختبار والإطلاق", description: "نختبر المنتج ونجهزه للإطلاق، ثم نساندك في الخطوة التالية." },
];

function ProcessSection() {
  return (
    <section className="section process-section">
      <div className="container">
        <div className="section-heading">
          <div>
            <span className="section-kicker">طريقة العمل</span>
            <h2>خطوات واضحة. <span>نتائج أفضل.</span></h2>
          </div>
          <p>منهجية عمل منظمة تمنحك صورة واضحة عن المشروع في كل مرحلة.</p>
        </div>
        <ol className="process-grid">
          {steps.map((step) => (
            <li className="process-step" key={step.number}>
              <span className="process-number">{step.number}</span>
              <span className="process-line" aria-hidden="true" />
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default ProcessSection;
