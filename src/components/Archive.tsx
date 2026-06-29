import { sharedProjects } from "@/content/get-content";
import type { Locale, SiteContent } from "@/content/types";
export default function Archive({ locale, content }: { locale: Locale; content: SiteContent }) {
  return <section id="archive" className="content-section section-shell"><header className="section-heading"><p className="eyebrow">{content.sections.archive.label}</p><h2>{content.sections.archive.heading}</h2></header><div className="archive-list">{sharedProjects.map((project) => { const copy = content.projects[project.id]; return <details key={project.id}><summary><span className="archive-year">{project.year}</span><span className="archive-title">{copy.title}</span><span className="archive-domain">{project.questionId}</span><span aria-hidden="true">＋</span></summary><p>{copy.archiveSummary}</p><p className="archive-note">{locale === "en" ? "Details available on request; source reports remain private." : "更多细节可进一步交流；原始报告不公开发布。"}</p></details>; })}</div></section>;
}
