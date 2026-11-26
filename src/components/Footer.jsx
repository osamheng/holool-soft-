import { Link } from "react-router";
import logo from "../assets/logo.png";

const footerLinks = [
  { label: "الرئيسية", path: "/" },
  { label: "من نحن", path: "/about" },
  { label: "الخدمات", path: "/services" },
  { label: "الأعمال", path: "/portfolio" },
  { label: "المدونة", path: "/blog" },
  { label: "تواصل معنا", path: "/contact" },
];

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <div className="footer-about">
          <Link to="/" className="footer-brand" aria-label="حلول سوفت">
            <img src={logo} alt="حلول سوفت Hulool Soft" />
          </Link>
          <p>
            نطوّر حلولًا رقمية عملية تساعد أعمالك على النمو وتمنح أفكارك طريقًا
            واضحًا إلى التنفيذ.
          </p>
          <Link className="footer-email" to="/contact">
            لنتحدث عن مشروعك <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <div className="footer-column">
          <h2>روابط سريعة</h2>
          <nav aria-label="روابط التذييل">
            {footerLinks.map((link) => (
              <Link key={link.path} to={link.path}>
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="footer-column footer-contact">
          <h2>ابدأ من هنا</h2>
          <p>أرسل تفاصيل احتياجك وسنساعدك في اختيار الحل التقني المناسب.</p>
          <Link className="footer-contact-link" to="/contact">
            نموذج طلب خدمة <span aria-hidden="true">←</span>
          </Link>
          <span className="footer-location">اليمن · نعمل معك أينما كنت</span>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} حلول سوفت. جميع الحقوق محفوظة.</span>
        <span>صُنع بعناية في حلول سوفت</span>
      </div>
    </footer>
  );
}

export default Footer;