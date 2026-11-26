import { useState } from "react";
import CtaBanner from "../components/CtaBanner";
import projectsData from "../data/projectsData";
import ProjectPreview from "../components/ProjectPreview";

const filters = [
  { id: "all", label: "الكل" },
  { id: "systems", label: "منصات وأنظمة" },
  { id: "business", label: "مواقع تعريفية وتجارية" },
];

function Portfolio() {
  const [activeFilter, setActiveFilter] = useState("all");
  const projects = projectsData.filter(
    (project) => activeFilter === "all" || project.category === activeFilter,
  );

  return (
    <>
      <section className="page-hero">
        <div className="container page-hero-content">
          <span className="section-kicker">أعمالنا</span>
          <h1>مشاريع تعكس <span>ما نصنعه</span></h1>
          <p>منصات ومواقع رقمية لقطاعات مختلفة، صُممت لتقدم قيمة حقيقية لمستخدميها.</p>
        </div>
      </section>
      <section className="section portfolio-page">
        <div className="container">
          <div className="portfolio-filters" role="group" aria-label="تصفية المشاريع">
            {filters.map((filter) => (
              <button
                type="button"
                key={filter.id}
                className={activeFilter === filter.id ? "filter-button active" : "filter-button"}
                aria-pressed={activeFilter === filter.id}
                onClick={() => setActiveFilter(filter.id)}
              >
                {filter.label}
              </button>
            ))}
          </div>
          <div className="portfolio-grid portfolio-page-grid">
            {projects.map((project) => (
              <article className="portfolio-card" key={project.id}>
                <ProjectPreview project={project} />
                <div className="portfolio-info">
                  <div className="project-card-meta"><span>{project.categoryLabel}</span></div>
                  <h2>{project.name}</h2>
                  <p>{project.description}</p>
                  <div className="project-contribution">
                    <strong>مساهمة حلول سوفت</strong>
                    <span>{project.contribution}</span>
                  </div>
                  <a className="text-link" href={project.url} target="_blank" rel="noreferrer">
                    زيارة الموقع <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <CtaBanner />
    </>
  );
}

export default Portfolio;
