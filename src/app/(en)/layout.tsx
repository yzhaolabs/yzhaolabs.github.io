import type { Metadata } from "next";
import "../globals.css";
import { getContent } from "@/content/get-content";

const content = getContent("en");
export const metadata: Metadata = {
  metadataBase: new URL("https://yzhaolabs.github.io"), title: content.meta.title, description: content.meta.description,
  alternates: { canonical: "/", languages: { en: "/", "zh-CN": "/zh/" } },
  openGraph: { type: "website", locale: "en_US", title: content.meta.title, description: content.meta.description, url: "/" },
};
export default function EnglishLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
