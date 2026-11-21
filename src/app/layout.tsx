import type { Metadata, Viewport } from "next";
import "./globals.css";
import { siteConfig } from "@/lib/content";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { PointerEffects } from "@/components/PointerEffects";
import { ScrollReveal } from "@/components/ScrollReveal";
import { RouteProgress } from "@/components/RouteProgress";
import { JsonLd } from "@/components/JsonLd";
import { organizationSchemas, personSchema, websiteSchema } from "@/lib/seo";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f5f7" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s — Pawan Joshi`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.author.name, url: siteConfig.url }],
  creator: siteConfig.author.name,
  alternates: {
    canonical: "/",
    types: { "application/rss+xml": [{ url: "/feed.xml", title: "Pawan Joshi — Writing" }] },
  },
  applicationName: "Pawan Joshi",
  appleWebApp: { capable: true, title: "Pawan Joshi", statusBarStyle: "black-translucent" },
  formatDetection: { telephone: false, email: false, address: false },
  category: "technology",
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    other: process.env.BING_SITE_VERIFICATION ? { "msvalidate.01": process.env.BING_SITE_VERIFICATION } : undefined,
  },
  openGraph: {
    type: "profile",
    firstName: "Pawan",
    lastName: "Joshi",
    username: "pwnjoshi",
    locale: "en_IN",
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    creator: "@pwnjoshidev",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// Runs before first paint so the saved (or system) theme applies without a flash.
const themeScript = `(function(){var d=document.documentElement,m=window.matchMedia("(prefers-color-scheme: dark)");function saved(){try{return localStorage.getItem("theme")}catch(e){return null}}function set(){var t=saved();if(t!=="light"&&t!=="dark"){t=m.matches?"dark":"light"}d.dataset.theme=t}set();m.addEventListener("change",function(){var t=saved();if(t!=="light"&&t!=="dark")set()})})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <JsonLd nodes={[personSchema(), websiteSchema(), ...organizationSchemas()]} />
      </head>
      <body suppressHydrationWarning>
        <RouteProgress />
        <PointerEffects />
        <ScrollReveal />
        <Nav />
        <main id="main-content" className="site-main" tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
