import type { SiteContent } from "@/content/types";
export default function Contact({ content, label }: { content: SiteContent["contact"]; label: string }) {
  return <section id="contact" className="contact-section section-shell"><p className="eyebrow">{label}</p><h2>{content.heading}</h2><p>{content.body}</p><div className="contact-links"><a href={content.email}>Email</a><a href={content.github} target="_blank" rel="noreferrer">GitHub</a><a href={content.linkedin} target="_blank" rel="noreferrer">LinkedIn</a></div></section>;
}
