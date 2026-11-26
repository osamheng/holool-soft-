import { useEffect, useState } from "react";
import { Link } from "react-router";
import { getPublishedPosts } from "../lib/blogRepository";
import "./Blog.css";

function Blog() {
  const [activeCategory, setActiveCategory] = useState("الكل");
  const [loadState, setLoadState] = useState({
    status: "loading",
    posts: [],
    error: "",
  });

  useEffect(() => {
    let active = true;
    getPublishedPosts()
      .then((posts) => {
        if (active) setLoadState({ status: "loaded", posts, error: "" });
      })
      .catch((error) => {
        if (active) {
          setLoadState({ status: "error", posts: [], error: error.message });
        }
      });
    return () => {
      active = false;
    };
  }, []);

  const categories = [
    "الكل",
    ...new Set(loadState.posts.map((post) => post.category)),
  ];
  const posts =
    activeCategory === "الكل"
      ? loadState.posts
      : loadState.posts.filter((post) => post.category === activeCategory);

  return (
    <>
      <section className="page-hero blog-hero">
        <div className="container page-hero-content">
          <span className="section-kicker">مدونة حلول سوفت</span>
          <h1>
            معرفة تقنية <span>بلغة واضحة</span>
          </h1>
          <p>
            أفكار وتجارب عملية تساعدك على فهم التقنية واتخاذ قرارات أفضل
            لمشروعك الرقمي.
          </p>
          <Link className="blog-editor-access" to="/admin/login">
            دخول المحررين <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
      <section className="section blog-list-section">
        <div className="container">
          <div className="blog-list-heading">
            <div>
              <span className="section-kicker">من خبرتنا</span>
              <h2>مقالات وأفكار</h2>
            </div>
            <div
              className="blog-filters"
              role="group"
              aria-label="تصفية المقالات حسب التصنيف"
            >
              {categories.map((category) => (
                <button
                  type="button"
                  key={category}
                  className={`filter-button${activeCategory === category ? " active" : ""}`}
                  aria-pressed={activeCategory === category}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          {loadState.status === "loading" && (
            <p className="blog-state-message">جارٍ تحميل المقالات...</p>
          )}
          {loadState.status === "error" && (
            <div className="blog-state-message blog-state-error" role="alert">
              <p>تعذر تحميل المقالات حاليًا. تحقق من اتصال المدونة وحاول مجددًا.</p>
              <button
                className="button button-outline"
                type="button"
                onClick={() => window.location.reload()}
              >
                إعادة المحاولة
              </button>
            </div>
          )}
          {loadState.status === "loaded" && posts.length === 0 && (
            <p className="blog-state-message">لا توجد مقالات منشورة حاليًا.</p>
          )}
          {loadState.status === "loaded" && posts.length > 0 && (
            <div className="blog-grid">
              {posts.map((post, index) => (
              <article
                className={`blog-card${index === 0 ? " blog-card-featured" : ""}`}
                key={post.slug}
              >
                <Link
                  className="blog-card-link"
                  to={`/blog/${post.slug}`}
                  aria-label={`اقرأ المقال: ${post.title}`}
                >
                  <div className="blog-card-art" aria-hidden="true">
                    <span className="blog-card-mark">{post.icon}</span>
                    <span className="blog-card-category">{post.category}</span>
                    <span className="blog-card-index">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="blog-card-content">
                    <div className="blog-card-meta">
                      <time dateTime={post.publishedAt}>{post.publishedLabel}</time>
                      <span>{post.readingTime} قراءة</span>
                    </div>
                    <h2>{post.title}</h2>
                    <p>{post.excerpt}</p>
                    <span className="blog-read-link">
                      اقرأ المقال <span aria-hidden="true">←</span>
                    </span>
                  </div>
                </Link>
              </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default Blog;
