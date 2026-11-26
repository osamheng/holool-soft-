import { Link } from "react-router";
import projectsData from "../data/projectsData";
import ProjectPreview from "./ProjectPreview";

function PortfolioSection() {
  return (
    <section className="section portfolio-section">
      <div className="container">
        <div className="section-heading">
          <div>
            <span className="section-kicker">أعمال مختارة</span>
            <h2>أفكار تحولت إلى <span>منتجات رقمية</span></h2>
          </div>
          <p>نماذج من منصات ومواقع شارك فريق حلول سوفت في تصميمها وتطويرها.</p>
        </div>
        <div className="portfolio-grid">
          {projectsData.map((project, index) => (
            <article className="portfolio-card" key={project.id}>
              <ProjectPreview project={project} />
              <div className="portfolio-info">
                <div className="project-card-meta">
                  <span>{project.categoryLabel}</span>
                  <span>0{index + 1}</span>
                </div>
                <h3>{project.name}</h3>
                <p>{project.description}</p>
                <a className="text-link" href={project.url} target="_blank" rel="noreferrer">
                  زيارة المشروع <span aria-hidden="true">↗</span>
                </a>
              </div>
            </article>
          ))}
        </div>
        <div className="section-more">
          <Link className="button button-outline" to="/portfolio">
            شاهد جميع الأعمال <span aria-hidden="true">←</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default PortfolioSection;
