import { renderAboutPage } from "./about.js";
import { renderBlogPage } from "./blog.js";
import { renderBlogArticlePage } from "./blogArticle.js";
import { renderContactPage } from "./contact.js";
import { renderHomePage } from "./home.js";
import { renderPortfolioPage } from "./portfolio.js";
import { renderServicesPage } from "./services.js";
import blogPosts from "../data/blogData.js";

export const pageMetadata = {
  "/": {
    title: "حلول سوفت | حلول تقنية تصنع مستقبل أعمالك",
    description:
      "حلول سوفت شركة برمجيات يمنية تقدم تصميم المواقع وتطوير التطبيقات والأنظمة والاستضافة.",
  },
  "/about": {
    title: "من نحن | حلول سوفت",
    description: "تعرف على قصة حلول سوفت ورؤيتها وقيمها وخبرات فريقها التقنية.",
  },
  "/services": {
    title: "خدماتنا | حلول سوفت",
    description:
      "استكشف خدمات تصميم المواقع وتطوير التطبيقات والأنظمة والاستضافة من حلول سوفت.",
  },
  "/portfolio": {
    title: "أعمالنا | حلول سوفت",
    description: "نماذج من أعمال حلول سوفت: QualiCup وموكا لاند وحكاية بُن.",
  },
  "/blog": {
    title: "المدونة | حلول سوفت",
    description:
      "مقالات وأفكار عملية من فريق حلول سوفت عن تطوير الويب والتقنية والأمان الرقمي.",
  },
  "/contact": {
    title: "تواصل معنا | حلول سوفت",
    description: "أرسل تفاصيل مشروعك إلى حلول سوفت وابدأ رحلتك الرقمية.",
  },
};

export function renderPage(pathname, { portfolioFilter, blogCategory } = {}) {
  if (pathname === "/") return renderHomePage();
  if (pathname === "/about") return renderAboutPage();
  if (pathname === "/services") return renderServicesPage();
  if (pathname === "/portfolio") return renderPortfolioPage(portfolioFilter);
  if (pathname === "/blog") return renderBlogPage(blogCategory);
  if (pathname.startsWith("/blog/")) {
    return renderBlogArticlePage(pathname.slice("/blog/".length));
  }
  if (pathname === "/contact") return renderContactPage();
  return `
    <section class="page-hero"><div class="container page-hero-content">
      <span class="section-kicker">404</span><h1>الصفحة غير موجودة</h1>
      <p>الرابط الذي طلبته غير متاح. يمكنك العودة إلى الصفحة الرئيسية.</p>
      <a class="button button-primary" href="/">العودة للرئيسية</a>
    </div></section>`;
}

export function getPageMetadata(pathname) {
  const article = pathname.startsWith("/blog/")
    ? blogPosts.find(
        (post) => encodeURIComponent(post.slug) === pathname.slice("/blog/".length),
      )
    : null;

  if (article) {
    return {
      title: `${article.title} | المدونة | حلول سوفت`,
      description: article.excerpt,
    };
  }

  return pageMetadata[pathname] || pageMetadata["/"];
}
