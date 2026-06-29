import type { Metadata } from "next";
import "../globals.css";
import { getContent } from "@/content/get-content";

const content = getContent("zh");
export const metadata: Metadata = {
  metadataBase: new URL("https://yzhaolabs.github.io"), title: content.meta.title, description: content.meta.description,
  alternates: { canonical: "/zh/", languages: { en: "/", "zh-CN": "/zh/" } },
  openGraph: { type: "website", locale: "zh_CN", title: content.meta.title, description: content.meta.description, url: "/zh/" },
};
export default function ChineseLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
