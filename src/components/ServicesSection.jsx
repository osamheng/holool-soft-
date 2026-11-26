import { Link } from "react-router";
import servicesData from "../data/servicesData";

function ServicesSection() {
  return (
    <section className="section services-section" id="services">
      <div className="container">
        <div className="section-heading">
          <div>
            <span className="section-kicker">خدماتنا</span>
            <h2>كل ما يحتاجه مشروعك <span>رقميًا</span></h2>
          </div>
          <p>
            نختار التقنية المناسبة لاحتياجك، ونرافق مشروعك في كل خطوة من
            التخطيط حتى الإطلاق.
          </p>
        </div>
        <div className="services-grid">
          {servicesData.map((service) => (
            <article className="service-card" key={service.id}>
              <div className="service-card-top">
                <span className="service-icon" aria-hidden="true">{service.icon}</span>
                <span className="service-number">{service.number}</span>
              </div>
              <h3>{service.title}</h3>
              <p>{service.shortDescription}</p>
              <Link to={`/services#${service.id}`} className="text-link">
                اكتشف الخدمة <span aria-hidden="true">←</span>
              </Link>
            </article>
          ))}
        </div>
        <div className="section-more">
          <Link className="button button-outline" to="/services">
            استكشف جميع الخدمات <span aria-hidden="true">←</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default ServicesSection;
