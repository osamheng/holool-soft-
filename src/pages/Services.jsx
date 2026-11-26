import { Link } from "react-router";
import CtaBanner from "../components/CtaBanner";
import servicesData from "../data/servicesData";

function Services() {
  return (
    <>
      <section className="page-hero">
        <div className="container page-hero-content">
          <span className="section-kicker">خدماتنا</span>
          <h1>حلول تقنية تناسب <span>احتياجك</span></h1>
          <p>من موقعك الأول إلى منصتك المتكاملة، نساعدك في اختيار الحل المناسب وتنفيذه.</p>
        </div>
      </section>
      <section className="section detailed-services">
        <div className="container">
          {servicesData.map((service) => (
            <article className="detail-service" id={service.id} key={service.id}>
              <span className="detail-service-number">{service.number}</span>
              <div className="detail-service-content">
                <span className="service-icon">{service.icon}</span>
                <h2>{service.title}</h2>
                <p>{service.description}</p>
                <div className="service-detail-meta">
                  <div><h3>لمن هذه الخدمة؟</h3><p>{service.audience}</p></div>
                  <div>
                    <h3>ما الذي تتضمنه؟</h3>
                    <ul>{service.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
                  </div>
                </div>
                <Link
                  className="button button-primary"
                  to={`/contact?service=${encodeURIComponent(service.id)}`}
                >
                  اطلب هذه الخدمة <span aria-hidden="true">↗</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
      <CtaBanner />
    </>
  );
}

export default Services;
