"use client";
import { useState } from "react";
import LanguageLink from "./LanguageLink";
import type { Locale, SiteContent } from "@/content/types";

export default function Navbar({ locale, content }: { locale: Locale; content: SiteContent["nav"] }) {
  const [open, setOpen] = useState(false); const close = () => setOpen(false);
  const links = [["questions", content.questions], ["work", content.work], ["archive", content.archive], ["path", content.path], ["contact", content.contact]];
  return <header className="site-header"><a className="wordmark" href="#top" onClick={close}>YZ</a><button className="menu-button" type="button" aria-expanded={open} aria-controls="site-navigation" onClick={() => setOpen(!open)}>{open ? "Close" : "Menu"}</button><nav id="site-navigation" className={open ? "site-nav is-open" : "site-nav"} aria-label="Primary navigation">{links.map(([id, label]) => <a key={id} href={`#${id}`} onClick={close}>{label}</a>)}<LanguageLink targetLocale={locale === "en" ? "zh" : "en"} label={content.language} onNavigate={close} /></nav></header>;
}
