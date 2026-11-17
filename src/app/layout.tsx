import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/content";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
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
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="canonical" href={siteConfig.url} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Pawan Joshi",
              url: siteConfig.url,
              image: `${siteConfig.url}/avatar.jpg`,
              jobTitle: "Software Engineer",
              description: siteConfig.description,
              email: siteConfig.author.email,
              address: {
                "@type": "PostalAddress",
                addressLocality: "Dehradun",
                addressCountry: "IN",
              },
              sameAs: [
                siteConfig.links.github,
                siteConfig.links.linkedin,
                siteConfig.links.twitter,
                siteConfig.links.devto,
              ],
              knowsAbout: [
                "Autonomous AI Agents",
                "Cloud Infrastructure",
                "AWS",
                "LangGraph",
                "Software Engineering",
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Pawan Joshi",
              url: siteConfig.url,
              description: siteConfig.description,
              author: {
                "@type": "Person",
                name: "Pawan Joshi",
              },
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-neutral-950 text-neutral-100 selection:bg-neutral-800`}
      >
        <Nav />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
