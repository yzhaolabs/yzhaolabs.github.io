"use client";
import { buildLanguageHref } from "@/lib/locale-links.mjs";
import type { Locale } from "@/content/types";

export default function LanguageLink({ targetLocale, label, onNavigate }: { targetLocale: Locale; label: string; onNavigate?: () => void }) {
  return <a className="language-link" href={buildLanguageHref(targetLocale, "")} hrefLang={targetLocale === "zh" ? "zh-CN" : "en"} onClick={(event) => {
    event.preventDefault(); onNavigate?.(); window.location.assign(buildLanguageHref(targetLocale, window.location.hash));
  }}>{label}</a>;
}
