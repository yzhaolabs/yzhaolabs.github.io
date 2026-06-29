import LanguageLink from "./LanguageLink";
import type { Locale } from "@/content/types";
export default function Footer({ name, locale, label }: { name: string; locale: Locale; label: string }) {
  return <footer className="site-footer section-shell"><span>© {new Date().getFullYear()} {name}</span><LanguageLink targetLocale={locale === "en" ? "zh" : "en"} label={label}/></footer>;
}
