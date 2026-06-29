import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/lib/LanguageProvider";
import { Inter, Newsreader, JetBrains_Mono } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-newsreader",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "Zhao Yuanzhen — Quant Researcher",
  description:
    "Quantitative researcher focused on financial time series, market microstructure, and machine learning-driven alpha research. Cambridge Data-Intensive Science · UCL Theoretical Physics.",
  keywords: [
    "Zhao Yuanzhen",
    "Quantitative Research",
    "Market Microstructure",
    "Time Series",
    "Machine Learning",
    "Cambridge",
    "UCL",
    "LOB Forecasting",
    "Alpha Research",
  ],
  authors: [{ name: "Zhao Yuanzhen" }],
  creator: "Zhao Yuanzhen",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Zhao Yuanzhen — Quant Researcher",
    description:
      "Quantitative researcher focused on financial time series, market microstructure, and ML-driven alpha research.",
    siteName: "Zhao Yuanzhen",
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`scroll-smooth ${inter.variable} ${newsreader.variable} ${jetbrainsMono.variable}`}
    >
      <body className="antialiased relative" style={{ fontFamily: "var(--font-inter)" }}>
        {/* Subtle SVG Noise Overlay for premium 2026 editorial texture */}
        <div className="pointer-events-none fixed inset-0 z-[999] opacity-[0.035] mix-blend-multiply">
          <svg width="100%" height="100%">
            <filter id="noise">
              <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
            </filter>
            <rect width="100%" height="100%" filter="url(#noise)" />
          </svg>
        </div>

        <LanguageProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
