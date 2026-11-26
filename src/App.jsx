import { Route, Routes, useLocation } from "react-router";
import { lazy, Suspense, useEffect } from "react";
import About from "./pages/About";
import Blog from "./pages/Blog";
import BlogArticle from "./pages/BlogArticle";
import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";
import Services from "./pages/Services";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import blogPosts from "./data/blogData";
import "./App.css";

const Contact = lazy(() => import("./pages/Contact"));

const pageMetadata = {
  "/": {
    title: "حلول سوفت | حلول تقنية تصنع مستقبل أعمالك",
    description:
      "حلول سوفت شركة برمجيات يمنية تقدم تصميم المواقع وتطوير التطبيقات والأنظمة والاستضافة.",
  },
  "/about": {
    title: "من نحن | حلول سوفت",
    description:
      "تعرف على قصة حلول سوفت ورؤيتها وقيمها وخبرات فريقها التقنية.",
  },
  "/services": {
    title: "خدماتنا | حلول سوفت",
    description:
      "استكشف خدمات تصميم المواقع وتطوير التطبيقات والأنظمة والاستضافة من حلول سوفت.",
  },
  "/portfolio": {
    title: "أعمالنا | حلول سوفت",
    description:
      "نماذج من أعمال حلول سوفت: QualiCup وموكا لاند وحكاية بُن.",
  },
  "/blog": {
    title: "المدونة | حلول سوفت",
    description:
      "مقالات وأفكار عملية من فريق حلول سوفت عن تطوير الويب والتقنية والأمان الرقمي.",
  },
  "/contact": {
    title: "تواصل معنا | حلول سوفت",
    description:
      "أرسل تفاصيل مشروعك إلى حلول سوفت وابدأ رحلتك الرقمية.",
  },
};

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    const articleSlug = pathname.startsWith("/blog/")
      ? pathname.slice("/blog/".length)
      : "";
    const article = blogPosts.find((post) => post.slug === articleSlug);
    const fallbackMetadata = pathname.startsWith("/blog/")
      ? pageMetadata["/blog"]
      : pageMetadata["/"];
    const metadata = article
      ? {
          title: `${article.title} | المدونة | حلول سوفت`,
          description: article.excerpt,
        }
      : pageMetadata[pathname] || fallbackMetadata;
    document.title = metadata.title;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", metadata.description);
  }, [pathname, hash]);

  return null;
}

function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogArticle />} />
          <Route
            path="/contact"
            element={
              <Suspense
                fallback={
                  <section className="page-hero">
                    <div className="container page-hero-content">
                      جارٍ تحميل نموذج التواصل...
                    </div>
                  </section>
                }
              >
                <Contact />
              </Suspense>
            }
          />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
