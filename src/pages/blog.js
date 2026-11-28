import { escapeHTML } from "../components/layout.js";
import blogPosts from "../data/blogData.js";

export function renderBlogPage(activeCategory = "الكل") {
  const categories = ["الكل", ...new Set(blogPosts.map((post) => post.category))];
  const filters = categories
    .map(
      (category) => `
        <button type="button" class="filter-button${activeCategory === category ? " active" : ""}"
          data-filter-kind="blog" data-filter="${escapeHTML(category)}" aria-pressed="${activeCategory === category}">
          ${escapeHTML(category)}
        </button>`,
    )
    .join("");
  const posts = blogPosts.filter(
    (post) => activeCategory === "الكل" || post.category === activeCategory,
  );
  const postCards = posts
    .map(
      (post, index) => `
        <article class="blog-card${index === 0 ? " blog-card-featured" : ""}">
          <a class="blog-card-link" href="/blog/${encodeURIComponent(post.slug)}" aria-label="اقرأ المقال: ${escapeHTML(post.title)}">
            <div class="blog-card-art" aria-hidden="true">
              <span class="blog-card-mark">${escapeHTML(post.icon)}</span>
              <span class="blog-card-category">${escapeHTML(post.category)}</span>
              <span class="blog-card-index">${String(index + 1).padStart(2, "0")}</span>
            </div>
            <div class="blog-card-content">
              <div class="blog-card-meta"><time datetime="${escapeHTML(post.publishedAt)}">${escapeHTML(post.publishedLabel)}</time><span>${escapeHTML(post.readingTime)} قراءة</span></div>
              <h2>${escapeHTML(post.title)}</h2><p>${escapeHTML(post.excerpt)}</p>
              <span class="blog-read-link">اقرأ المقال <span aria-hidden="true">←</span></span>
            </div>
          </a>
        </article>`,
    )
    .join("");

  return `
    <section class="page-hero blog-hero"><div class="container page-hero-content">
      <span class="section-kicker">مدونة حلول سوفت</span><h1>معرفة تقنية <span>بلغة واضحة</span></h1>
      <p>أفكار وتجارب عملية تساعدك على فهم التقنية واتخاذ قرارات أفضل لمشروعك الرقمي.</p>
    </div></section>
    <section class="section blog-list-section"><div class="container">
      <div class="blog-list-heading">
        <div><span class="section-kicker">من خبرتنا</span><h2>مقالات وأفكار</h2></div>
        <div class="blog-filters" role="group" aria-label="تصفية المقالات حسب التصنيف">${filters}</div>
      </div>
      ${posts.length ? `<div class="blog-grid">${postCards}</div>` : '<p class="blog-state-message">لا توجد مقالات منشورة حاليًا.</p>'}
    </div></section>`;
}
