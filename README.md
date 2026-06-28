<div align="center">
  <a href="./README_cn.md">
    <img src="https://img.shields.io/badge/CN-中文-blue?style=for-the-badge&labelColor=gray" alt="中文" />
  </a>
</div>

<br />

# Joey Zhang — Personal Website

<p align="center">
  <strong>🎯 Quant Researcher · Portfolio & Research Site</strong>
  <br />
  Next.js 15 · Tailwind CSS v4 · Framer Motion · TypeScript
  <br />
  Static Export · Blazing Fast
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-15-black?logo=next.js" alt="Next.js 15" />
  <img src="https://img.shields.io/badge/Tailwind-v4-06B6D4?logo=tailwindcss" alt="Tailwind v4" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript" alt="TypeScript" />
</p>

---

## ✨ Features

- **🎨 Modern Design System** — Clean off-white + charcoal + Cambridge deep blue palette, polished Inter (sans-serif) & JetBrains Mono (monospace) typography, Framer Motion scroll animations.
- **⚡️ High Performance** — Next.js 15 with Turbopack, fully static HTML export, font subsetting via `next/font`, instant first paint.
- **🔍 SEO Optimized** — Structured metadata, JSON-LD `Person` structured data, auto-generated sitemap & robots.txt.
- **📄 Section-Driven SPA** — Single-page layout with IntersectionObserver-based active nav tracking and native smooth scrolling.
- **🛠 Data-Driven Content** — All content lives in TypeScript data files under `src/data/`; edit content without touching components.

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 22 or later (recommend manual install)

### Installation

```bash
git clone <repo-url>
cd <project-dir>
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🛠️ Site Content

All personal data lives in `src/data/` — change content, not code:

| File                     | What to Edit                                   |
| ------------------------ | ---------------------------------------------- |
| `src/data/profile.ts`    | Name, tagline, CTA text, contact info, metrics |
| `src/data/projects.ts`   | Project list, research focus areas             |
| `src/data/experience.ts` | Work experience, education, awards             |

**Example:** To update your name and bio on the homepage, just edit the `name` and `positioningLine` fields in `src/data/profile.ts`.

---

## 📦 Deployment

```bash
npm run build
```

Generates a static `out/` directory. Deploy to **Cloudflare Pages**, **GitHub Pages**, **Vercel**, or any static host.

---

## 📂 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout (fonts, metadata, nav, footer)
│   ├── page.tsx            # Home page (composes all sections)
│   ├── sitemap.ts          # Auto-generated sitemap.xml
│   ├── robots.ts           # Auto-generated robots.txt
│   └── globals.css         # Design system CSS variables & utilities
├── components/             # React section components
│   ├── AnimateOnScroll.tsx # Scroll-reveal animation (native IntersectionObserver)
│   ├── Navbar.tsx          # Fixed navbar (desktop + mobile hamburger)
│   ├── Hero.tsx            # Hero section (CTAs + Bento grid visualizations)
│   ├── Metrics.tsx         # Key metrics row
│   ├── ResearchFocus.tsx   # Research focus areas
│   ├── SelectedWork.tsx    # Selected projects showcase
│   ├── ExperienceTimeline.tsx # Work experience timeline
│   ├── TechStack.tsx       # Tech stack display
│   ├── Education.tsx       # Education cards
│   ├── Awards.tsx          # Awards & achievements
│   ├── Contact.tsx         # Contact info + CV download
│   ├── SectionHeader.tsx   # Section title component
│   ├── ProjectCard.tsx     # Project card
│   └── CredibilityStrip.tsx # Credibility badges
└── data/                   # Content data files
    ├── profile.ts
    ├── projects.ts
    └── experience.ts
```

---

## 📄 License

MIT
