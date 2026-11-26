function ProjectPreview({ project }) {
  return (
    <figure className="project-preview">
      <img src={project.screenshot} alt={project.screenshotAlt} loading="lazy" />
      <figcaption>{project.domain}</figcaption>
    </figure>
  );
}

export default ProjectPreview;
