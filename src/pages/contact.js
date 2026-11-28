import { renderPageHero } from "../components/layout.js";
import servicesData from "../data/servicesData.js";

export function renderContactPage(search = window.location.search) {
  const requestedService = new URLSearchParams(search).get("service");
  const selectedService = servicesData.some((service) => service.id === requestedService)
    ? requestedService
    : "";
  const options = servicesData
    .map(
      (service) => `
        <option value="${service.id}"${service.id === selectedService ? " selected" : ""}>
          ${service.title}
        </option>`,
    )
    .join("");

  return `
    ${renderPageHero("تواصل معنا", 'كل مشروع يبدأ <span>بحديث</span>', "أخبرنا عن فكرتك، وسنجهز لك رسالة طلب خدمة ترسلها مباشرة إلى واتساب حلول سوفت.")}
    <section class="section contact-section"><div class="container contact-layout">
      <aside class="contact-aside">
        <span class="section-kicker">لنتواصل</span><h2>شاركنا ما تريد <span>إنجازه</span></h2>
        <p>املأ النموذج بمعلوماتك وتفاصيل المشروع. سنجهز رسالة واتساب بمعلوماتك وتفتح محادثة مباشرة مع حلول سوفت لمراجعتها وإرسالها.</p>
        <div class="contact-info-card"><span class="contact-info-icon">↗</span><div><strong>التواصل عبر واتساب</strong><span>بعد تعبئة النموذج، ستفتح محادثة حلول سوفت مع تفاصيل طلبك.</span></div></div>
        <p class="contact-note">بيانات الهاتف والبريد والعنوان الرسمي وساعات العمل غير متوفرة ضمن الملفات المرفقة، لذلك لم نضف معلومات غير مؤكدة.</p>
      </aside>
      <form class="contact-form" id="contact-form">
        <div class="form-heading"><h2>طلب خدمة</h2><span>جميع الحقول مطلوبة</span></div>
        <div class="form-grid">
          <label>الاسم الكامل<input name="name" type="text" autocomplete="name" placeholder="الاسم الذي نتواصل به" required minlength="2"></label>
          <label class="form-full">الهاتف / واتساب
            <input name="phone" type="tel" dir="ltr" autocomplete="tel" placeholder="+967771351576"
              pattern="\\+?[1-9][0-9]{7,14}" title="أدخل الرقم مع رمز الدولة، مثل +967771351576" required>
          </label>
          <label class="form-full">البريد الإلكتروني<input name="email" type="email" autocomplete="email" placeholder="name@example.com" required></label>
          <label class="form-full">نوع الخدمة
            <select name="service" required><option value="" disabled${selectedService ? "" : " selected"}>اختر الخدمة المطلوبة</option>${options}</select>
          </label>
          <label class="form-full">تفاصيل المشروع<textarea name="details" rows="5" placeholder="ما الفكرة أو التحدي الذي تريد العمل عليه؟" required minlength="10"></textarea></label>
        </div>
        <button type="submit" class="button button-primary form-submit">تجهيز رسالة واتساب <span aria-hidden="true">↗</span></button>
      </form>
    </div></section>`;
}
