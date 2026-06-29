import type { SiteContent } from "@/content/types";
export default function Path({ content, section }: { content: SiteContent["path"]; section: { label: string; heading: string } }) {
  return <section id="path" className="content-section section-shell"><header className="section-heading"><p className="eyebrow">{section.label}</p><h2>{section.heading}</h2></header><ol className="path-list">{content.map((item) => <li key={item.period + item.title}><p className="path-period">{item.period}</p><div><h3>{item.title}</h3><p className="path-subtitle">{item.subtitle}</p><p>{item.summary}</p></div></li>)}</ol></section>;
}
