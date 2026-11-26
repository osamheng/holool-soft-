import { useState } from "react";
import { useSearchParams } from "react-router";
import PhoneInput, {
  getCountryCallingCode,
  isValidPhoneNumber,
} from "react-phone-number-input";
import flags from "react-phone-number-input/flags";
import arabicCountryLabels from "react-phone-number-input/locale/ar.json";
import "react-phone-number-input/style.css";
import servicesData from "../data/servicesData";

function Contact() {
  const [searchParams] = useSearchParams();
  const requestedService = searchParams.get("service");
  const initialService = servicesData.some((service) => service.id === requestedService)
    ? requestedService
    : "";
  const [service, setService] = useState(initialService);
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("YE");
  const [phoneError, setPhoneError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    if (!phone || !isValidPhoneNumber(phone)) {
      setPhoneError("أدخل رقمًا صحيحًا بحسب الدولة المختارة.");
      return;
    }

    const formData = new FormData(event.currentTarget);
    const selectedService = servicesData.find((item) => item.id === service);
    const message = [
      "طلب خدمة جديد - حلول سوفت",
      `الاسم: ${formData.get("name")}`,
      `الهاتف / واتساب: ${phone}`,
      `البريد الإلكتروني: ${formData.get("email")}`,
      `الخدمة: ${selectedService?.title || "غير محددة"}`,
      `تفاصيل المشروع: ${formData.get("details")}`,
    ].join("\n");
    window.location.assign(
      `https://wa.me/967771351576?text=${encodeURIComponent(message)}`,
    );
  }

  return (
    <>
      <section className="page-hero">
        <div className="container page-hero-content">
          <span className="section-kicker">تواصل معنا</span>
          <h1>كل مشروع يبدأ <span>بحديث</span></h1>
          <p>أخبرنا عن فكرتك، وسنجهز لك رسالة طلب خدمة ترسلها مباشرة إلى واتساب حلول سوفت.</p>
        </div>
      </section>
      <section className="section contact-section">
        <div className="container contact-layout">
          <aside className="contact-aside">
            <span className="section-kicker">لنتواصل</span>
            <h2>شاركنا ما تريد <span>إنجازه</span></h2>
            <p>
              املأ النموذج بمعلوماتك وتفاصيل المشروع. سنجهز رسالة واتساب
              بمعلوماتك وتفتح محادثة مباشرة مع حلول سوفت لمراجعتها وإرسالها.
            </p>
            <div className="contact-info-card">
              <span className="contact-info-icon">↗</span>
              <div>
                <strong>التواصل عبر واتساب</strong>
                <span>بعد تعبئة النموذج، ستفتح محادثة حلول سوفت مع تفاصيل طلبك.</span>
              </div>
            </div>
            <p className="contact-note">
              بيانات الهاتف والبريد والعنوان الرسمي وساعات العمل غير متوفرة
              ضمن الملفات المرفقة، لذلك لم نضف معلومات غير مؤكدة.
            </p>
          </aside>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-heading">
              <h2>طلب خدمة</h2>
              <span>جميع الحقول مطلوبة</span>
            </div>
            <div className="form-grid">
              <label>
                الاسم الكامل
                <input name="name" type="text" autoComplete="name" placeholder="الاسم الذي نتواصل به" required minLength={2} />
              </label>
              <label className="form-full">
                الهاتف / واتساب
                <div
                  className={`phone-number-control${phoneError ? " has-error" : ""}`}
                  dir="ltr"
                >
                  <PhoneInput
                    key={country}
                    defaultCountry={country}
                    flags={flags}
                    labels={arabicCountryLabels}
                    addInternationalOption={false}
                    international={false}
                    limitMaxLength
                    value={phone}
                    onChange={(value) => {
                      setPhone(value || "");
                      setPhoneError("");
                    }}
                    onCountryChange={(selectedCountry) => {
                      setCountry(selectedCountry || "YE");
                      setPhone("");
                      setPhoneError("");
                    }}
                    countrySelectProps={{ "aria-label": "اختر الدولة" }}
                    autoComplete="tel"
                    aria-label="رقم الهاتف"
                    aria-invalid={Boolean(phoneError)}
                    aria-describedby={phoneError ? "phone-error" : undefined}
                  />
                  <span className="phone-country-calling-code" aria-live="polite">
                    +{getCountryCallingCode(country)}
                  </span>
                </div>
                {phoneError && (
                  <span
                    className="phone-number-error"
                    id="phone-error"
                    role="alert"
                  >
                    {phoneError}
                  </span>
                )}
              </label>
              <label className="form-full">
                البريد الإلكتروني
                <input name="email" type="email" autoComplete="email" placeholder="name@example.com" required />
              </label>
              <label className="form-full">
                نوع الخدمة
                <select name="service" value={service} onChange={(event) => setService(event.target.value)} required>
                  <option value="" disabled>اختر الخدمة المطلوبة</option>
                  {servicesData.map((item) => <option value={item.id} key={item.id}>{item.title}</option>)}
                </select>
              </label>
              <label className="form-full">
                تفاصيل المشروع
                <textarea name="details" rows="5" placeholder="ما الفكرة أو التحدي الذي تريد العمل عليه؟" required minLength={10} />
              </label>
            </div>
            <button type="submit" className="button button-primary form-submit">
              تجهيز رسالة واتساب <span aria-hidden="true">↗</span>
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

export default Contact;
