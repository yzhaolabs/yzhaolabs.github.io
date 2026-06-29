import Image from "next/image";
export default function ProjectVisual({ src, alt, caption, title, priority = false }: { src: string | null; alt: string; caption?: string; title: string; priority?: boolean }) {
  if (!src) return <div className="visual-fallback" role="img" aria-label={title}><span>{title}</span></div>;
  return <figure className="project-figure"><div className="project-image"><Image src={src} alt={alt} width={1600} height={1000} sizes="(min-width: 1024px) 56vw, 100vw" priority={priority} /></div>{caption ? <figcaption>{caption}</figcaption> : null}</figure>;
}
