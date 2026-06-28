# Personal Website Narrative Redesign

Date: 2026-06-28

## Purpose

Reframe the site from a quant-research resume into a personal website about a cross-disciplinary problem solver. The site should show a consistent intellectual habit across physics, statistics, generative modelling, scientific computing, and markets:

> Define what is hidden, decide what the evidence can support, and build the smallest useful model that makes the structure visible.

The result should feel concise, personal, and recognisably Yuanzhen's rather than like a generic academic template.

## Goals

- Present Yuanzhen as a physicist, researcher, and builder who moves comfortably between domains.
- Use real research artifacts as visual evidence.
- Make the English and Chinese experiences independently well-written and concise.
- Reduce the number of competing sections and repeated claims.
- Preserve the existing warm editorial character while improving typographic precision and accessibility.
- Keep private or context-dependent academic material out of the public site.

## Non-goals

- Publishing full coursework reports or PDFs.
- Building a searchable academic publication system.
- Presenting every project with equal prominence.
- Turning the site into a quant-only recruiting page.
- Adding decorative 3D, neon, glass, or generic AI visuals.

## Narrative Direction

The homepage uses a "problem atlas" rather than academic disciplines or chronology.

### Hero

The hero retains the spacious editorial composition approved in the visual exploration. It contains:

- Name and compact role line.
- One memorable positioning statement.
- One short supporting paragraph.
- A restrained orbital or field-map visual connecting physics, imaging, systems, and markets.
- No metric or achievement strip.

English draft:

> I build models to see what data hides.

> Across physics, statistics, generative AI and markets, I use computation to make difficult structures visible.

Chinese draft:

> 用模型让数据中隐藏的结构显现。

> 从物理、统计到生成模型与金融市场，用计算方法理解复杂系统。

The two versions are written independently. They are not displayed together.

### Method Statement

The former mixed metric strip is removed. A short transition introduces the recurring method:

English:

> Across different domains, the method stays surprisingly consistent: define what is hidden, decide what the data can support, and build the smallest model that makes the structure visible.

Chinese:

> 问题各不相同，思路却一以贯之：从有限的数据中寻找隐藏结构，再用恰当的模型把它解释清楚。

Project-specific metrics remain inside the relevant project.

## Information Architecture

The homepage contains six sections:

1. **Hero** - identity, positioning, and method.
2. **Questions** - four recurring questions that connect the body of work.
3. **Selected Explorations** - one lead project and two supporting projects.
4. **Archive** - a compact index of additional work.
5. **Path** - education and professional experience in one trajectory.
6. **Contact** - short availability statement and contact links.

Separate Metrics, Awards, Technical Expertise, Education, and Experience sections are removed. Their useful content is redistributed into project evidence and the Path section.

## Four Recurring Questions

### 1. How do we reconstruct what cannot be directly seen?

- 3D brain MRI super-resolution.
- PET-CT reconstruction.
- MRI denoising and CT segmentation.

### 2. How certain can we be about a hidden mechanism?

- Antikythera calendar-ring inference.
- Hamiltonian Monte Carlo and model comparison.
- Parametric bootstrapping and sWeights.

### 3. How can models learn the dynamics of a system?

- LoRA fine-tuning for Lotka-Volterra forecasting.
- Neural representations of combined MNIST digits.
- Forward-mode automatic differentiation with dual numbers.

### 4. What remains invariant when a problem changes domains?

- Wave optics and quantum mechanics under the paraxial approximation.
- Time- and frequency-domain fluorescence lifetime measurements.
- Market microstructure and order-flow modelling.

## Selected Explorations

The approved hierarchy is one lead project plus two supporting projects.

### Lead: Recovering anatomy from sparse MRI slices

Visual:

- The existing reconstruction-quality comparison showing sparse input, InverseSR variants, cubic interpolation, and ground truth.

Story:

- **Question:** Can diagnostic detail be recovered from anisotropic 3D MRI without paired low- and high-resolution training data?
- **Approach:** Use a pre-trained 3D latent diffusion model as an anatomical prior and invert either the decoder latent or the full diffusion process.
- **Finding:** The approach restored sharper ventricular boundaries and fine hippocampal structure than cubic interpolation, including on an unseen dataset.

### Supporting: Finding a lunar calendar in fragmented geometry

Visual:

- The posterior distribution for the Antikythera calendar-ring hole count.

Story:

- **Question:** Did the damaged calendar ring encode a lunar or solar calendar?
- **Approach:** Compare isotropic and radial-tangential error models with frequentist estimation and Hamiltonian Monte Carlo.
- **Finding:** Both frameworks favoured approximately 354 holes; the anisotropic model produced a narrower interval and supported the lunar-calendar hypothesis.

### Supporting: Teaching a language model predator-prey dynamics

Visual:

- The existing forecast-comparison figure for held-out Lotka-Volterra trajectories.

Story:

- **Question:** Can a compact language model learn nonlinear multivariate dynamics under a strict compute budget?
- **Approach:** Apply numerical-to-text preprocessing and LoRA fine-tuning to Qwen2.5-0.5B-Instruct.
- **Finding:** Fine-tuning reduced amplitude instability and produced more stable held-out forecasts than the untrained baseline.

## Archive

The Archive is a compact index rather than another large-card grid. Each entry contains title, year, domain, and one concise line. It includes:

- Medical Imaging Toolkit - PET-CT reconstruction, MRI denoising, segmentation, and radiomics.
- Dual Autodiff - a tested, documented, Cythonised forward-mode automatic-differentiation package.
- Statistical Estimation - sampling, extended likelihood, bootstrapping, and sWeights.
- Fluorescence Lifetimes - simulation and comparison of TCSPC and phase fluorimetry.
- Quantum Insights into Optical Phenomena - numerical links between paraxial wave optics and the Schrödinger equation.
- Limit Order Book Forecasting - multi-horizon prediction and CPU inference.
- Index Futures Basis Dynamics - transaction-cost-aware hedge allocation and roll analysis.

Archive entries may open an inline detail panel, but they do not link to full PDFs in the first release.

## Path

Path combines education and applied work into one concise trajectory:

- UCL BSc in Theoretical Physics.
- Cambridge MPhil in Data Intensive Science.
- Research in medical imaging, statistics, scientific computing, and machine learning.
- Applied quantitative research in market microstructure, factors, and futures basis dynamics.

Awards and rankings appear only when they materially explain a project or milestone.

## Bilingual Architecture

- `/` serves the English site.
- `/zh` serves the Chinese site.
- Both routes are statically rendered.
- The language switch links between equivalent routes and preserves the current section hash.
- Each route sets its own `lang`, title, description, Open Graph metadata, sitemap entry, and canonical/alternate language links.
- Locale selection does not depend on `localStorage`, preventing an English-to-Chinese hydration flash.
- Shared project IDs, dates, images, and structural metadata remain language-neutral.
- English and Chinese copy live in separate locale content modules and are edited independently.

### Copy Limits

- Hero heading: one sentence.
- Hero supporting copy: no more than roughly 35 English words or 55 Chinese characters.
- Featured-project question: one sentence.
- Featured-project method and finding: no more than two short sentences each.
- Archive description: one line.
- Section descriptions: omitted unless they add information not present in the heading.

## Typography

Approved direction: Editorial Humanist.

- English display: Newsreader.
- Chinese display: Noto Serif SC.
- English body and interface: Manrope.
- Chinese body and interface: Noto Sans SC.
- Serif is reserved for display headings and selected pull statements.
- Body copy, labels, metadata, buttons, and navigation use sans serif.
- Monospace appears only for indices, years, and compact technical metadata.
- English and Chinese never appear together in the same content block, except the language-toggle label.

The existing warm ivory, near-black, and terracotta palette is retained. Texture remains subtle and must not reduce contrast.

## Visual Asset Treatment

- Use only figures created for the supplied projects.
- Crop figures to their meaningful region and export web-optimised versions.
- Preserve axis labels and annotations when they are necessary to understand the evidence.
- Add a concise caption and descriptive alt text in each language.
- Avoid screenshots of report pages when a clean source figure exists.
- Do not fabricate charts or numerical results.
- Clinical images must remain de-identified.

## Components

- `LocalePage` - assembles the route from locale content.
- `Hero` - positioning statement, method, and field-map visual.
- `QuestionMap` - four recurring questions and their project connections.
- `FeaturedExplorations` - one lead and two supporting project stories.
- `ProjectVisual` - responsive image, caption, and fallback.
- `Archive` - compact project index with optional inline detail.
- `Path` - combined education and work trajectory.
- `Contact` - concise availability and external links.
- `LanguageLink` - maps equivalent routes and preserves section hashes.

Components consume typed content and do not contain language-specific prose.

## Content Model

Shared project records contain:

- Stable project ID.
- Year.
- Domain and question ID.
- Visual asset path.
- Optional factual metrics.
- External link metadata when publishable.

Locale records contain:

- Title.
- Question.
- Approach.
- Finding.
- Caption and alt text.
- Archive summary.

A build-time validator checks that both locales contain every required project ID and section.

## Interaction and Motion

- Motion supports orientation rather than decoration.
- Hero field-map movement is subtle and stops under reduced-motion preferences.
- Project visuals use opacity or border transitions; hover must not shift layout.
- Archive detail panels support pointer and keyboard input.
- Navigation highlights only sections that exist in the navigation model.
- No continuously moving technology marquee.
- All focus states remain visible.

## Privacy and Publication Rules

Do not publish:

- Full coursework or thesis PDFs.
- Student identifiers.
- Group-member names or meeting minutes.
- Internal GitLab URLs.
- Local filesystem paths.
- Private datasets, credentials, or unpublished implementation details.

Public copy is distilled from the supplied work and uses only claims supported by the reports.

## Failure and Fallback Behaviour

- Missing optional visuals fall back to a typographic project card without leaving an empty frame.
- Missing locale content fails the build rather than silently falling back to the other language.
- External links are omitted when no public URL is available.
- Images use explicit dimensions and responsive sizing to prevent layout shift.

## Verification

Before completion:

- Run lint, TypeScript checks, and a production build.
- Validate locale parity and metadata for `/` and `/zh`.
- Inspect desktop, tablet, and mobile layouts.
- Verify English and Chinese line breaks independently.
- Verify navigation, hash preservation, archive interaction, and language switching.
- Check keyboard focus order and visible focus states.
- Test reduced-motion behaviour.
- Confirm no horizontal overflow and no console errors.
- Confirm no private report metadata or local paths appear in generated HTML.

## Acceptance Criteria

- The first viewport communicates "cross-disciplinary problem solver" without relying on quant credentials.
- The homepage contains no mixed metric strip.
- Real project artifacts appear in all three featured explorations.
- English and Chinese are separate, concise, statically rendered experiences.
- No full report is publicly downloadable.
- The site is materially shorter than the current nine-section version.
- The Archive preserves breadth without competing with the three featured explorations.
- The visual language remains warm and editorial while feeling specific to the work.
