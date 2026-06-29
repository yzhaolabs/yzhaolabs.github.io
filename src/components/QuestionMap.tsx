import type { SiteContent } from "@/content/types";
export default function QuestionMap({ content, section }: { content: SiteContent["questions"]; section: { label: string; heading: string } }) {
  return <section id="questions" className="content-section section-shell"><header className="section-heading"><p className="eyebrow">{section.label}</p><h2>{section.heading}</h2></header><ol className="question-grid">{content.map((question, index) => <li key={question.id} data-question={question.id}><a href="#work"><span className="question-index">{String(index + 1).padStart(2, "0")}</span><h3>{question.title}</h3><p>{question.description}</p></a></li>)}</ol></section>;
}
