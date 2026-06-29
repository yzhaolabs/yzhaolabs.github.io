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
  meta: {
    title: string;
    description: string;
  };
  nav: Record<
    "questions" | "work" | "archive" | "path" | "contact" | "language",
    string
  >;
  hero: {
    kicker: string;
    heading: string;
    supporting: string;
    methodLabel: string;
    method: string;
  };
  questions: Array<{
    id: QuestionId;
    title: string;
    description: string;
  }>;
  sections: Record<string, {
    label: string;
    heading: string;
  }>;
  projects: Record<string, ProjectCopy>;
  path: Array<{
    period: string;
    title: string;
    subtitle: string;
    summary: string;
  }>;
  contact: {
    heading: string;
    body: string;
    email: string;
    github: string;
    linkedin: string;
  };
  footer: string;
}
