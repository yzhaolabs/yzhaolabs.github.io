import en from "./en.json";
import zh from "./zh.json";
import shared from "./shared.json";
import type { Locale, SharedProject, SiteContent } from "./types";

const contentByLocale: Record<Locale, SiteContent> = {
  en: en as SiteContent,
  zh: zh as SiteContent,
};

export function getContent(locale: Locale): SiteContent {
  return contentByLocale[locale];
}

export const featuredIds = shared.featuredIds;
export const sharedProjects = shared.projects as SharedProject[];
