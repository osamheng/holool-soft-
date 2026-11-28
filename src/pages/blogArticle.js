import { escapeHTML } from "../components/layout.js";
import blogPosts from "../data/blogData.js";

export function renderBlogArticlePage(slug) {
  const post = blogPosts.find((article) => article.slug === slug);
  if (!post) {
    return `
      <section class="page-hero blog-not-found"><div class="container page-hero-content">
        <span class="section-kicker">المدونة</span><h1>لم نعثر على هذا المقال</h1>
        <p>ربما تغير الرابط أو لم يعد المقال متاحًا.</p>
        <a class="button button-primary" href="/blog">العودة إلى المدونة</a>
      </div></section>`;
  }

  const sections = post.sections
    .map(
      (section) => `
        <section class="blog-article-section">
          ${section.heading ? `<h2>${escapeHTML(section.heading)}</h2>` : ""}
          ${section.paragraphs.map((paragraph) => `<p>${escapeHTML(paragraph)}</p>`).join("")}
          ${section.points ? `<ul>${section.points.map((point) => `<li>${escapeHTML(point)}</li>`).join("")}</ul>` : ""}
        </section>`,
    )
    .join("");

  return `
    <article class="blog-article">
      <header class="blog-article-header"><div class="container">
        <a class="blog-back-link" href="/blog"><span aria-hidden="true">→</span> العودة إلى المدونة</a>
        <span class="section-kicker">${escapeHTML(post.category)}</span>
        <h1>${escapeHTML(post.title)}</h1><p class="blog-article-excerpt">${escapeHTML(post.excerpt)}</p>
        <div class="blog-article-meta"><span>${escapeHTML(post.author)}</span><time datetime="${escapeHTML(post.publishedAt)}">${escapeHTML(post.publishedLabel)}</time><span>${escapeHTML(post.readingTime)} قراءة</span></div>
        <div class="blog-article-art" aria-hidden="true"><span>${escapeHTML(post.icon)}</span></div>
      </div></header>
      <div class="container blog-article-layout"><div class="blog-article-body">
        <p class="blog-article-intro">${escapeHTML(post.intro)}</p>${sections}
        <aside class="blog-article-cta"><div><strong>تعمل على فكرة رقمية؟</strong><p>تواصل مع فريق حلول سوفت لمناقشة احتياج مشروعك.</p></div>
          <a class="button button-primary" href="/contact">تواصل معنا <span aria-hidden="true">↗</span></a>
        </aside>
      </div></div>
    </article>`;
}
