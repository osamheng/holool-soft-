import {
  escapeHTML,
  renderCtaBanner,
  renderPageHero,
  renderProjectPreview,
} from "../components/layout.js";
import projectsData from "../data/projectsData.js";

const filters = [
  { id: "all", label: "الكل" },
  { id: "systems", label: "منصات وأنظمة" },
  { id: "business", label: "مواقع تعريفية وتجارية" },
];

export function renderPortfolioPage(activeFilter = "all") {
  const filterButtons = filters
    .map(
      ({ id, label }) => `
        <button type="button" class="filter-button${activeFilter === id ? " active" : ""}"
          data-filter-kind="portfolio" data-filter="${id}" aria-pressed="${activeFilter === id}">
          ${label}
        </button>`,
    )
    .join("");
  const projects = projectsData
    .filter((project) => activeFilter === "all" || project.category === activeFilter)
    .map(
      (project) => `
        <article class="portfolio-card">
          ${renderProjectPreview(project)}
          <div class="portfolio-info">
            <div class="project-card-meta"><span>${escapeHTML(project.categoryLabel)}</span></div>
            <h2>${escapeHTML(project.name)}</h2><p>${escapeHTML(project.description)}</p>
            <div class="project-contribution"><strong>مساهمة حلول سوفت</strong><span>${escapeHTML(project.contribution)}</span></div>
            <a class="text-link" href="${project.url}" target="_blank" rel="noreferrer">زيارة الموقع <span aria-hidden="true">↗</span></a>
          </div>
        </article>`,
    )
    .join("");

  return `
    ${renderPageHero("أعمالنا", 'مشاريع تعكس <span>ما نصنعه</span>', "منصات ومواقع رقمية لقطاعات مختلفة، صُممت لتقدم قيمة حقيقية لمستخدميها.")}
    <section class="section portfolio-page"><div class="container">
      <div class="portfolio-filters" role="group" aria-label="تصفية المشاريع">${filterButtons}</div>
      <div class="portfolio-grid portfolio-page-grid">${projects}</div>
    </div></section>
    ${renderCtaBanner()}`;
}
