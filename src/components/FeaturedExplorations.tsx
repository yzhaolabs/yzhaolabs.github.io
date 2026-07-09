import ProjectVisual from "./ProjectVisual";
import { featuredIds, sharedProjects } from "@/content/get-content";
import type { SiteContent } from "@/content/types";

export default function FeaturedExplorations({ content }: { content: SiteContent }) {
  const projects = featuredIds.map((id) => ({
    metadata: sharedProjects.find((item) => item.id === id)!,
    copy: content.projects[id],
  }));
  const lead = projects[0];

  return (
    <section id="work" className="content-section section-shell">
      <header className="section-heading">
        <p className="eyebrow">{content.sections.work.label}</p>
        <h2>{content.sections.work.heading}</h2>
      </header>
      <article className={`featured-lead ${lead.metadata.visual ? "has-visual" : "no-visual"}`}>
        <ProjectVisual
          src={lead.metadata.visual}
          alt={lead.copy.alt ?? lead.copy.title}
          caption={lead.copy.caption}
          title={lead.copy.title}
          priority
        />
        <Story project={lead} />
      </article>
      <div className="supporting-grid">
        {projects.slice(1).map((project) => (
          <article
            className={`supporting-card ${project.metadata.visual ? "has-visual" : "no-visual"}`}
            key={project.metadata.id}
          >
            <ProjectVisual
              src={project.metadata.visual}
              alt={project.copy.alt ?? project.copy.title}
              caption={project.copy.caption}
              title={project.copy.title}
            />
            <Story project={project} />
          </article>
        ))}
      </div>
    </section>
  );
}

function Story({ project }: { project: { metadata: { year: string; questionId: string }; copy: SiteContent["projects"][string] } }) {
  return (
    <div className="project-story">
      <p className="project-meta">{project.metadata.year} · {project.metadata.questionId}</p>
      <h3>{project.copy.title}</h3>
      <dl>
        {[["Question", project.copy.question], ["Approach", project.copy.approach], ["Finding", project.copy.finding]].map(([label, value]) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
