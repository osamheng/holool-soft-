import { Link, useParams } from "react-router";
import blogPosts from "../data/blogData";
import "./Blog.css";

function BlogArticle() {
  const { slug } = useParams();
  const post = blogPosts.find((article) => article.slug === slug);

  if (!post) {
    return (
      <section className="page-hero blog-not-found">
        <div className="container page-hero-content">
          <span className="section-kicker">المدونة</span>
          <h1>لم نعثر على هذا المقال</h1>
          <p>ربما تغير الرابط أو لم يعد المقال متاحًا.</p>
          <Link className="button button-primary" to="/blog">
            العودة إلى المدونة
          </Link>
        </div>
      </section>
    );
  }

  return (
    <article className="blog-article">
      <header className="blog-article-header">
        <div className="container">
          <Link className="blog-back-link" to="/blog">
            <span aria-hidden="true">→</span> العودة إلى المدونة
          </Link>
          <span className="section-kicker">{post.category}</span>
          <h1>{post.title}</h1>
          <p className="blog-article-excerpt">{post.excerpt}</p>
          <div className="blog-article-meta">
            <span>{post.author}</span>
            <time dateTime={post.publishedAt}>{post.publishedLabel}</time>
            <span>{post.readingTime} قراءة</span>
          </div>
          <div className="blog-article-art" aria-hidden="true">
            <span>{post.icon}</span>
          </div>
        </div>
      </header>
      <div className="container blog-article-layout">
        <div className="blog-article-body">
          <p className="blog-article-intro">{post.intro}</p>
          {post.sections.map((section) => (
            <section className="blog-article-section" key={section.heading}>
              {section.heading && <h2>{section.heading}</h2>}
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {section.points && (
                <ul>
                  {section.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
          <aside className="blog-article-cta">
            <div>
              <strong>تعمل على فكرة رقمية؟</strong>
              <p>تواصل مع فريق حلول سوفت لمناقشة احتياج مشروعك.</p>
            </div>
            <Link className="button button-primary" to="/contact">
              تواصل معنا <span aria-hidden="true">↗</span>
            </Link>
          </aside>
        </div>
      </div>
    </article>
  );
}

export default BlogArticle;
