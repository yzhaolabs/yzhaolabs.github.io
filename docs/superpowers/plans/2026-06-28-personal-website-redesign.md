# Personal Website Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the current quant-oriented single-page portfolio as a concise bilingual personal website organised around cross-disciplinary problem solving and real research artifacts.

**Architecture:** Use two independent static Next.js root layouts: `/` for English and `/zh/` for Chinese. Both routes render the same server-component page structure from typed locale content, while a small client-only language link preserves the current section hash. Shared factual metadata and locale-specific copy remain separate so the two languages cannot silently drift or fall back into each other.

**Tech Stack:** Next.js 15 App Router, React 19, TypeScript, Tailwind CSS 4, `next/font`, `next/image`, Node's built-in test runner, Framer Motion only where existing motion remains justified.

---

## File Structure

### Create

- `src/app/(en)/layout.tsx` - English root document and metadata.
- `src/app/(en)/page.tsx` - English homepage entry.
- `src/app/zh/layout.tsx` - Chinese root document and metadata.
- `src/app/zh/page.tsx` - Chinese homepage entry.
- `src/app/fonts.ts` - shared Newsreader, Manrope, Noto Serif SC, Noto Sans SC, and JetBrains Mono setup.
- `src/content/shared.json` - language-neutral project IDs, dates, visual paths, and featured ordering.
- `src/content/en.json` - independently written English navigation and page copy.
- `src/content/zh.json` - independently written Chinese navigation and page copy.
- `src/content/types.ts` - typed page-content contract.
- `src/content/get-content.ts` - locale loader and typed lookup.
- `src/components/SitePage.tsx` - shared page composition.
- `src/components/Hero.tsx` - locale-driven hero and method statement.
- `src/components/QuestionMap.tsx` - four recurring questions.
- `src/components/FeaturedExplorations.tsx` - one lead plus two supporting projects.
- `src/components/ProjectVisual.tsx` - responsive visual, caption, and graceful fallback.
- `src/components/Archive.tsx` - compact project index with accessible disclosure panels.
- `src/components/Path.tsx` - combined education and work trajectory.
- `src/components/Contact.tsx` - concise contact block.
- `src/components/Navbar.tsx` - locale-driven section navigation.
- `src/components/LanguageLink.tsx` - hash-preserving locale switch.
- `src/components/Footer.tsx` - locale-driven compact footer.
- `src/lib/locale-links.mjs` - dependency-free locale URL helper testable by Node.
- `src/lib/locale-links.d.mts` - TypeScript declaration for the shared ESM helper.
- `scripts/content-schema.mjs` - build-time locale/content validation.
- `tests/content-schema.test.mjs` - parity, privacy, and copy-length tests.
- `tests/locale-links.test.mjs` - locale-switch URL tests.
- `public/work/mri-super-resolution.webp` - optimised lead-project visual.
- `public/work/antikythera-posterior.svg` - Antikythera posterior figure.
- `public/work/lora-dynamics.webp` - optimised time-series comparison.
- `public/work/medical-imaging.svg` - CT/PET or MRI-denoising archive visual.
- `public/work/autodiff.svg` - automatic-differentiation archive visual.
- `public/work/quantum-optics.webp` - selected optical/quantum simulation figure.

### Modify

- `package.json` - add content validation, Node tests, typecheck, and correct ESLint scripts.
- `src/app/globals.css` - replace the old nine-section design rules with the approved editorial-humanist system.
- `src/app/sitemap.ts` - include `/` and `/zh/` with language alternates.
- `src/app/robots.ts` - retain the public sitemap URL.
- `next.config.ts` - retain static export and explicit unoptimised image behaviour.

### Delete after replacements pass

- `src/app/layout.tsx`
- `src/app/page.tsx`
- `src/lib/LanguageProvider.tsx`
- `src/components/AnimateOnScroll.tsx`
- `src/components/Awards.tsx`
- `src/components/CredibilityStrip.tsx`
- `src/components/Education.tsx`
- `src/components/ExperienceTimeline.tsx`
- `src/components/Metrics.tsx`
- `src/components/ProjectCard.tsx`
- `src/components/ResearchFocus.tsx`
- `src/components/SectionHeader.tsx`
- `src/components/SelectedWork.tsx`
- `src/components/TechStack.tsx`
- `src/data/experience.ts`
- `src/data/profile.ts`
- `src/data/projects.ts`
- `src/data/skills.ts`
- `src/data/ui.ts`

Do not delete an old file until the new route builds without importing it.

---

### Task 1: Add dependency-free content and locale contract tests

**Files:**
- Modify: `package.json`
- Create: `scripts/content-schema.mjs`
- Create: `tests/content-schema.test.mjs`
- Create: `tests/locale-links.test.mjs`

- [ ] **Step 1: Add scripts that use only installed tooling**

Update the scripts block in `package.json`:

```json
{
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "npm run validate:content && next build",
    "start": "next start",
    "lint": "eslint .",
    "typecheck": "tsc --noEmit",
    "validate:content": "node scripts/content-schema.mjs",
    "test": "node --test tests/*.test.mjs"
  }
}
```

- [ ] **Step 2: Write failing content tests**

Create `tests/content-schema.test.mjs`:

```js
import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import {
  collectPrivacyViolations,
  validateLocaleParity,
  validateCopyLimits,
} from "../scripts/content-schema.mjs";

const readJson = async (path) =>
  JSON.parse(await readFile(new URL(path, import.meta.url), "utf8"));

test("English and Chinese content cover the same project IDs", async () => {
  const shared = await readJson("../src/content/shared.json");
  const en = await readJson("../src/content/en.json");
  const zh = await readJson("../src/content/zh.json");
  assert.deepEqual(validateLocaleParity(shared, en, zh), []);
});

test("public content contains no private report references", async () => {
  const en = await readJson("../src/content/en.json");
  const zh = await readJson("../src/content/zh.json");
  assert.deepEqual(collectPrivacyViolations({ en, zh }), []);
});

test("hero and archive copy stay within the approved limits", async () => {
  const en = await readJson("../src/content/en.json");
  const zh = await readJson("../src/content/zh.json");
  assert.deepEqual(validateCopyLimits(en, zh), []);
});
```

Create `tests/locale-links.test.mjs`:

```js
import test from "node:test";
import assert from "node:assert/strict";
import { buildLanguageHref } from "../src/lib/locale-links.mjs";

test("English work section maps to Chinese work section", () => {
  assert.equal(buildLanguageHref("zh", "#work"), "/zh/#work");
});

test("Chinese path section maps to English path section", () => {
  assert.equal(buildLanguageHref("en", "#path"), "/#path");
});

test("missing hashes do not create a trailing hash", () => {
  assert.equal(buildLanguageHref("zh", ""), "/zh/");
});
```

- [ ] **Step 3: Run tests to verify the contract is not implemented**

Run:

```powershell
npm test
```

Expected: FAIL because `scripts/content-schema.mjs`, locale JSON, and `src/lib/locale-links.mjs` do not exist.

- [ ] **Step 4: Implement the locale URL helper**

Create `src/lib/locale-links.mjs`:

```js
/**
 * @param {"en" | "zh"} targetLocale
 * @param {string} hash
 */
export function buildLanguageHref(targetLocale, hash) {
  const base = targetLocale === "zh" ? "/zh/" : "/";
  const safeHash = hash.startsWith("#") ? hash : "";
  return `${base}${safeHash}`;
}
```

Create `src/lib/locale-links.d.mts`:

```ts
export function buildLanguageHref(
  targetLocale: "en" | "zh",
  hash: string,
): string;
```

- [ ] **Step 5: Implement reusable schema checks**

Create `scripts/content-schema.mjs`:

```js
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const projectRoot = new URL("../", import.meta.url);
const readJson = async (relativePath) =>
  JSON.parse(await readFile(new URL(relativePath, projectRoot), "utf8"));

const sorted = (values) => [...values].sort();
const words = (value) => value.trim().split(/\s+/u).filter(Boolean).length;
const chineseChars = (value) =>
  [...value].filter((char) => /\p{Script=Han}/u.test(char)).length;

export function validateLocaleParity(shared, en, zh) {
  const errors = [];
  const sharedIds = sorted(shared.projects.map((project) => project.id));
  for (const [locale, content] of [["en", en], ["zh", zh]]) {
    const localeIds = sorted(Object.keys(content.projects));
    if (JSON.stringify(localeIds) !== JSON.stringify(sharedIds)) {
      errors.push(`${locale} project IDs differ from shared project IDs`);
    }
    for (const id of shared.featuredIds) {
      if (!content.projects[id]?.question ||
          !content.projects[id]?.approach ||
          !content.projects[id]?.finding) {
        errors.push(`${locale}.${id} is missing featured-project copy`);
      }
    }
  }
  return errors;
}

export function collectPrivacyViolations(value) {
  const text = JSON.stringify(value);
  const rules = [
    [/[A-Z]:\\\\/u, "local Windows path"],
    [/yz929/iu, "student identifier"],
    [/gitlab\.developers\.cam\.ac\.uk/iu, "internal GitLab URL"],
    [/meeting minutes/iu, "group meeting minutes"],
    [/\.pdf(?:\"|')/iu, "public PDF link"],
  ];
  return rules
    .filter(([pattern]) => pattern.test(text))
    .map(([, label]) => label);
}

export function validateCopyLimits(en, zh) {
  const errors = [];
  if (words(en.hero.supporting) > 35) {
    errors.push("English hero supporting copy exceeds 35 words");
  }
  if (chineseChars(zh.hero.supporting) > 55) {
    errors.push("Chinese hero supporting copy exceeds 55 Han characters");
  }
  for (const [id, project] of Object.entries(en.projects)) {
    if (words(project.archiveSummary) > 24) {
      errors.push(`English archive summary ${id} exceeds 24 words`);
    }
  }
  for (const [id, project] of Object.entries(zh.projects)) {
    if (chineseChars(project.archiveSummary) > 42) {
      errors.push(`Chinese archive summary ${id} exceeds 42 Han characters`);
    }
  }
  return errors;
}

async function main() {
  const [shared, en, zh] = await Promise.all([
    readJson("src/content/shared.json"),
    readJson("src/content/en.json"),
    readJson("src/content/zh.json"),
  ]);
  const errors = [
    ...validateLocaleParity(shared, en, zh),
    ...collectPrivacyViolations({ en, zh }),
    ...validateCopyLimits(en, zh),
  ];
  if (errors.length > 0) {
    console.error(errors.join("\n"));
    process.exitCode = 1;
  } else {
    console.log("Content validation passed");
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  await main();
}
```

- [ ] **Step 6: Run the tests and confirm only missing content fails**

Run:

```powershell
npm test
```

Expected: locale-link tests PASS; content tests FAIL with missing `src/content/*.json`.

- [ ] **Step 7: Commit the contract**

Use a Lore commit:

```text
Protect the bilingual narrative from silent drift

The site needs independently written locales without allowing missing projects,
private report metadata, or oversized copy into the static export.

Constraint: No new testing dependency
Rejected: Runtime locale fallback | hides incomplete translations
Confidence: high
Scope-risk: narrow
Tested: Node locale-link tests
Not-tested: Content files do not exist yet
```

---

### Task 2: Create the shared project inventory and independent locale copy

**Files:**
- Create: `src/content/shared.json`
- Create: `src/content/en.json`
- Create: `src/content/zh.json`
- Create: `src/content/types.ts`
- Create: `src/content/get-content.ts`

- [ ] **Step 1: Create language-neutral project metadata**

Create `src/content/shared.json` with this shape and ordering:

```json
{
  "featuredIds": [
    "mri-super-resolution",
    "antikythera-calendar",
    "lora-dynamics"
  ],
  "projects": [
    {
      "id": "mri-super-resolution",
      "year": "2025",
      "questionId": "reconstruct",
      "visual": "/work/mri-super-resolution.webp",
      "featured": true
    },
    {
      "id": "antikythera-calendar",
      "year": "2025",
      "questionId": "infer",
      "visual": "/work/antikythera-posterior.svg",
      "featured": true
    },
    {
      "id": "lora-dynamics",
      "year": "2025",
      "questionId": "dynamics",
      "visual": "/work/lora-dynamics.webp",
      "featured": true
    },
    {
      "id": "medical-imaging",
      "year": "2025",
      "questionId": "reconstruct",
      "visual": "/work/medical-imaging.svg",
      "featured": false
    },
    {
      "id": "dual-autodiff",
      "year": "2024",
      "questionId": "dynamics",
      "visual": "/work/autodiff.svg",
      "featured": false
    },
    {
      "id": "statistical-estimation",
      "year": "2024",
      "questionId": "infer",
      "visual": null,
      "featured": false
    },
    {
      "id": "fluorescence-lifetimes",
      "year": "2024",
      "questionId": "invariants",
      "visual": null,
      "featured": false
    },
    {
      "id": "quantum-optics",
      "year": "2023",
      "questionId": "invariants",
      "visual": "/work/quantum-optics.webp",
      "featured": false
    },
    {
      "id": "lob-forecasting",
      "year": "2025",
      "questionId": "invariants",
      "visual": null,
      "featured": false
    },
    {
      "id": "futures-basis",
      "year": "2026",
      "questionId": "dynamics",
      "visual": null,
      "featured": false
    }
  ]
}
```

- [ ] **Step 2: Write English content**

Create `src/content/en.json`. Use the approved hero copy exactly and populate all project IDs from `shared.json`. Required top-level keys:

```json
{
  "locale": "en",
  "meta": {
    "title": "Yuanzhen Zhao — Physicist, Researcher, Builder",
    "description": "Cross-disciplinary work in physics, statistics, generative modelling, scientific computing, and markets."
  },
  "nav": {
    "questions": "Questions",
    "work": "Work",
    "archive": "Archive",
    "path": "Path",
    "contact": "Contact",
    "language": "中文"
  },
  "hero": {
    "kicker": "Physicist · Researcher · Builder",
    "heading": "I build models to see what data hides.",
    "supporting": "Across physics, statistics, generative AI and markets, I use computation to make difficult structures visible.",
    "methodLabel": "A recurring habit",
    "method": "Across different domains, the method stays surprisingly consistent: define what is hidden, decide what the data can support, and build the smallest model that makes the structure visible."
  }
}
```

Add `questions`, `sections`, `projects`, `path`, `contact`, and `footer` using the exact English wording in the approved spec. Every project requires `title` and `archiveSummary`; the three featured projects additionally require `question`, `approach`, `finding`, `caption`, and `alt`.

- [ ] **Step 3: Write Chinese content independently**

Create `src/content/zh.json`. Use these approved strings verbatim:

```json
{
  "locale": "zh",
  "meta": {
    "title": "赵元祯 — 物理、研究与计算",
    "description": "横跨物理、统计、生成模型、科学计算与金融市场的研究与实践。"
  },
  "nav": {
    "questions": "问题",
    "work": "作品",
    "archive": "索引",
    "path": "经历",
    "contact": "联系",
    "language": "EN"
  },
  "hero": {
    "kicker": "物理 · 研究 · 构建",
    "heading": "用模型让数据中隐藏的结构显现。",
    "supporting": "从物理、统计到生成模型与金融市场，用计算方法理解复杂系统。",
    "methodLabel": "一以贯之",
    "method": "问题各不相同，思路却一以贯之：从有限的数据中寻找隐藏结构，再用恰当的模型把它解释清楚。"
  }
}
```

Write concise Chinese project copy from the findings in the spec rather than translating English sentence-by-sentence. Keep technical terms such as LoRA, HMC, MRI, LOB, and Qwen when they are clearer than forced translations.

- [ ] **Step 4: Add the TypeScript content contract**

Create `src/content/types.ts`:

```ts
export type Locale = "en" | "zh";
export type QuestionId = "reconstruct" | "infer" | "dynamics" | "invariants";

export interface SharedProject {
  id: string;
  year: string;
  questionId: QuestionId;
  visual: string | null;
  featured: boolean;
}

export interface ProjectCopy {
  title: string;
  archiveSummary: string;
  question?: string;
  approach?: string;
  finding?: string;
  caption?: string;
  alt?: string;
}

export interface SiteContent {
  locale: Locale;
  meta: { title: string; description: string };
  nav: Record<"questions" | "work" | "archive" | "path" | "contact" | "language", string>;
  hero: {
    kicker: string;
    heading: string;
    supporting: string;
    methodLabel: string;
    method: string;
  };
  questions: Array<{ id: QuestionId; title: string; description: string }>;
  sections: Record<string, { label: string; heading: string }>;
  projects: Record<string, ProjectCopy>;
  path: Array<{
    period: string;
    title: string;
    subtitle: string;
    summary: string;
  }>;
  contact: { heading: string; body: string; email: string; github: string; linkedin: string };
  footer: string;
}
```

- [ ] **Step 5: Add the typed loader**

Create `src/content/get-content.ts`:

```ts
import en from "./en.json";
import zh from "./zh.json";
import shared from "./shared.json";
import type { Locale, SharedProject, SiteContent } from "./types";

const contentByLocale = {
  en: en as SiteContent,
  zh: zh as SiteContent,
};

export function getContent(locale: Locale): SiteContent {
  return contentByLocale[locale];
}

export const featuredIds = shared.featuredIds;
export const sharedProjects = shared.projects as SharedProject[];
```

- [ ] **Step 6: Run content tests**

Run:

```powershell
npm test
npm run validate:content
npm run typecheck
```

Expected: all tests PASS, validation prints `Content validation passed`, and TypeScript exits 0.

- [ ] **Step 7: Commit the content model**

Commit with a Lore message recording the independent-locale constraint and the rejection of runtime fallback.

---

### Task 3: Prepare real research visuals

**Files:**
- Create: `public/work/mri-super-resolution.webp`
- Create: `public/work/antikythera-posterior.svg`
- Create: `public/work/lora-dynamics.webp`
- Create: `public/work/medical-imaging.svg`
- Create: `public/work/autodiff.svg`
- Create: `public/work/quantum-optics.webp`

- [ ] **Step 1: Copy the approved source figures**

Use the user-supplied originals:

- MRI: `quality-comparison.png`
- Antikythera: `posterior_rt_N.svg`
- LoRA dynamics: `model_comparison.png`
- Medical imaging: `ct_reconstructions.svg`
- Autodiff: `autodiff.png`
- Quantum optics: render the cleanest result page or extract its original result figure

Copy, do not move, the originals.

- [ ] **Step 2: Optimise raster assets**

Use the already available local `sharp` runtime to:

- Convert MRI to WebP, maximum width 1600, quality 86.
- Convert LoRA comparison to WebP, maximum width 1600, quality 84.
- Convert the selected quantum-optics figure to WebP, maximum width 1400, quality 86.

Do not crop away legends, comparison labels, axes, or red diagnostic boxes.

- [ ] **Step 3: Inspect all six outputs**

Verify:

- Text remains readable at desktop size.
- The MRI comparison retains all five columns and both slice conditions.
- The Antikythera plot retains the 354 and 365 reference lines.
- No student ID, group name, local path, or report header is visible.

- [ ] **Step 4: Commit only the web-ready assets**

The commit must record that source reports remain outside the public site.

---

### Task 4: Create independent static English and Chinese root documents

**Files:**
- Create: `src/app/fonts.ts`
- Create: `src/app/(en)/layout.tsx`
- Create: `src/app/(en)/page.tsx`
- Create: `src/app/zh/layout.tsx`
- Create: `src/app/zh/page.tsx`
- Create: `src/components/SitePage.tsx`
- Delete after pass: `src/app/layout.tsx`
- Delete after pass: `src/app/page.tsx`

- [ ] **Step 1: Configure approved fonts**

Create `src/app/fonts.ts` with `Newsreader`, `Manrope`, `Noto_Serif_SC`, `Noto_Sans_SC`, and `JetBrains_Mono`, each using `display: "swap"` and CSS variables.

- [ ] **Step 2: Create the English root layout**

`src/app/(en)/layout.tsx` must:

- Import `../globals.css`.
- Render `<html lang="en">`.
- Apply all font variables.
- Export English metadata with canonical `/` and alternate `/zh/`.
- Render only `{children}` inside `<body>`.

- [ ] **Step 3: Create the Chinese root layout**

`src/app/zh/layout.tsx` must:

- Import `../globals.css`.
- Render `<html lang="zh-CN">`.
- Apply all font variables.
- Export Chinese metadata with canonical `/zh/` and alternate `/`.

- [ ] **Step 4: Add route entries**

Both route pages render:

```tsx
import SitePage from "@/components/SitePage";

export default function Page() {
  return <SitePage locale="en" />;
}
```

Use `locale="zh"` in `src/app/zh/page.tsx`.

- [ ] **Step 5: Add the shared composition**

Create `src/components/SitePage.tsx` as a server component that loads content and renders:

```tsx
<Navbar locale={locale} content={content.nav} />
<main>
  <Hero locale={locale} content={content.hero} />
  <QuestionMap content={content.questions} section={content.sections.questions} />
  <FeaturedExplorations locale={locale} content={content} />
  <Archive locale={locale} content={content} />
  <Path content={content.path} section={content.sections.path} />
  <Contact content={content.contact} section={content.sections.contact} />
</main>
<Footer content={content.footer} />
```

- [ ] **Step 6: Remove the old single root only after both routes compile**

Run `npm run typecheck`. Delete `src/app/layout.tsx` and `src/app/page.tsx` only when the multiple-root-layout structure compiles.

- [ ] **Step 7: Run a production build**

Run:

```powershell
npm run build
```

Expected: static HTML exists for `/index.html` and `/zh/index.html`.

---

### Task 5: Build the hero, question map, navigation, and locale switching

**Files:**
- Create: `src/components/Hero.tsx`
- Create: `src/components/QuestionMap.tsx`
- Create: `src/components/Navbar.tsx`
- Create: `src/components/LanguageLink.tsx`
- Modify: `src/app/globals.css`

- [ ] **Step 1: Implement hash-preserving language switching**

`LanguageLink.tsx` is the only client component required for locale switching. It must use the tested `buildLanguageHref` helper, keep a real fallback `href`, and replace the target with the current `window.location.hash` on click.

- [ ] **Step 2: Implement the server-rendered hero**

Render:

- Kicker.
- One locale-specific heading.
- One supporting sentence.
- Two compact anchors: Work and Contact.
- A decorative field map marked `aria-hidden="true"`.
- The approved method statement below the first viewport.

Do not render metrics, credential tags, or both languages.

- [ ] **Step 3: Implement the four-question map**

Use a semantic ordered list. Each item links to `#work` and exposes its question ID as `data-question`. Keep descriptions to one line on desktop and natural wrapping on mobile.

- [ ] **Step 4: Implement navigation**

Navigation contains only Questions, Work, Archive, Path, and Contact. Use anchor links rather than JavaScript `scrollIntoView`. The mobile menu must close after navigation and keep visible focus styling.

- [ ] **Step 5: Add the editorial-humanist CSS**

Define:

- Warm ivory background, near-black text, terracotta accent.
- Newsreader/Noto Serif SC display families selected by document language.
- Manrope/Noto Sans SC interface and body families.
- Maximum text width of 68 characters.
- `text-wrap: balance` for display headings and `text-wrap: pretty` for body copy.
- Mobile-first container padding at 24px, 48px at tablet, and 80px at desktop.
- Hero heading clamp that does not exceed 72px.

- [ ] **Step 6: Verify**

Run:

```powershell
npm test
npm run typecheck
npm run lint
```

Expected: all commands exit 0.

---

### Task 6: Build real-evidence featured explorations

**Files:**
- Create: `src/components/ProjectVisual.tsx`
- Create: `src/components/FeaturedExplorations.tsx`
- Modify: `src/app/globals.css`

- [ ] **Step 1: Implement visual fallback**

`ProjectVisual` accepts `src`, `alt`, `caption`, and `priority`. When `src` is null it renders a typographic panel with the project title; it never renders an empty image frame.

- [ ] **Step 2: Implement approved hierarchy**

`FeaturedExplorations` must:

- Resolve the three `featuredIds` against shared project metadata and locale copy.
- Render MRI first in a large dark split panel.
- Render Antikythera and LoRA as two equal supporting cards.
- Show question, approach, and finding.
- Keep technology metadata secondary.

- [ ] **Step 3: Add responsive image treatment**

At desktop:

- MRI uses a 58/42 visual-copy split.
- Supporting cards use a two-column grid.

At mobile:

- All cards stack.
- Figure captions remain visible.
- Axis text remains legible without horizontal scrolling.

- [ ] **Step 4: Build and inspect**

Run `npm run build`, then inspect `/` and `/zh/` at 390×844 and 1440×900.

Expected: no clipping, mixed-language content, or layout shift.

---

### Task 7: Build Archive, Path, Contact, and footer

**Files:**
- Create: `src/components/Archive.tsx`
- Create: `src/components/Path.tsx`
- Create: `src/components/Contact.tsx`
- Create: `src/components/Footer.tsx`
- Modify: `src/app/globals.css`

- [ ] **Step 1: Implement Archive with native disclosures**

Use `<details>` and `<summary>` for optional expansion. This provides keyboard behaviour without extra state. The summary row includes year, title, domain/question, and a one-line description. Do not expose PDF links.

- [ ] **Step 2: Implement Path**

Render one vertical trajectory containing:

- `UCL BSc in Theoretical Physics`.
- Cambridge MPhil in Data Intensive Science.
- Applied research entries already present in the current data.

Chinese copy uses the exact degree names appropriate to Chinese, not mixed English prose.

- [ ] **Step 3: Implement Contact**

Keep one short paragraph and three links: email, GitHub, LinkedIn. Remove the generic "built with Next.js" promotional line.

- [ ] **Step 4: Implement the footer**

Render current year, name, and locale switch only. Use server-rendered locale copy.

- [ ] **Step 5: Verify keyboard behaviour**

Tab through navigation, archive disclosures, contact links, and locale switch. Every interactive element must show a visible focus ring.

---

### Task 8: Remove the resume-era sections and repair metadata

**Files:**
- Delete: old components and data files listed in File Structure.
- Modify: `src/app/sitemap.ts`
- Modify: `src/app/robots.ts`

- [ ] **Step 1: Prove old modules are unused**

Run:

```powershell
rg "LanguageProvider|Metrics|ResearchFocus|SelectedWork|ExperienceTimeline|TechStack|Education|Awards|CredibilityStrip" src
```

Expected: matches exist only in the files scheduled for deletion.

- [ ] **Step 2: Delete unused modules**

Delete only the files listed in the Delete section. Preserve unrelated user changes.

- [ ] **Step 3: Update sitemap**

Return two entries for `/` and `/zh/`, each with language alternates:

```ts
alternates: {
  languages: {
    en: baseUrl,
    "zh-CN": `${baseUrl}/zh/`,
  },
}
```

- [ ] **Step 4: Verify the static export contains no private strings**

Run:

```powershell
npm run build
rg -n "yz929|gitlab\\.developers|[A-Z]:\\\\|\\.pdf" out
```

Expected: build passes and `rg` returns no matches from page content.

- [ ] **Step 5: Commit the deletion and metadata repair**

Record in the Lore commit that breadth moved to Archive and old resume sections were deliberately removed.

---

### Task 9: Accessibility, motion, and final visual QA

**Files:**
- Modify: `src/app/globals.css`
- Modify only if defects are found: new components from Tasks 5-7

- [ ] **Step 1: Add reduced-motion behaviour**

Add:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    scroll-behavior: auto !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

- [ ] **Step 2: Run automated verification**

Run sequentially:

```powershell
npm test
npm run validate:content
npm run typecheck
npm run lint
npm run build
```

Expected: every command exits 0.

- [ ] **Step 3: Inspect browser viewports**

Use the in-app browser at:

- 390×844
- 768×1024
- 1440×900

Check both `/` and `/zh/`.

- [ ] **Step 4: Verify interactions**

- Navigation anchors land on the correct section.
- Language switching preserves `#questions`, `#work`, `#archive`, `#path`, and `#contact`.
- Archive disclosures open by mouse and keyboard.
- Reduced-motion removes decorative movement.
- No console errors or warnings remain.

- [ ] **Step 5: Run a privacy and content audit**

Inspect generated HTML and public asset filenames. Confirm:

- No report PDFs.
- No student IDs.
- No group-member names.
- No internal URLs.
- No local paths.
- No unsupported quantitative claims.

- [ ] **Step 6: Final commit**

Use a Lore commit whose `Tested:` trailers list tests, validation, typecheck, lint, production build, and browser viewports. State any remaining untested deployment behaviour honestly.

---

## Plan Self-Review

- Every approved spec section maps to a task.
- English and Chinese are separate root documents with independent content.
- The approved Chinese hero and method wording are explicit.
- The project hierarchy is one lead plus two supporting stories.
- Full reports remain private.
- No new dependency is introduced.
- Automated checks cover locale parity, privacy strings, copy limits, locale links, types, lint, and production export.
- Visual QA covers both locales and all target viewports.
