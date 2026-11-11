import type { Metadata } from "next"
import { Geist_Mono, Inter } from "next/font/google"
import "./globals.css"
import { siteUrl } from "@/lib/data"

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" })
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], display: "swap" })

const ogImage = "/og-image.png"
const ogTitle = "Rami Maalej — Full-Stack Developer"
const ogDescription =
  "Rami Maalej is a full-stack developer from Sfax, Tunisia building scalable web, mobile, and AI-powered applications with React, Node.js, Flutter, and Python."

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Rami Maalej — Full-Stack Developer",
  description: ogDescription,
  keywords: [
    "Rami Maalej",
    "Rami Maalej portfolio",
    "Full-Stack Developer",
    "Full-Stack Developer Tunisia",
    "Web Developer Sfax",
    "React Developer",
    "Node.js Developer",
    "Flutter Developer",
    "Python Developer",
    "AI Integration",
  ],
  authors: [{ name: "Rami Maalej", url: siteUrl }],
  creator: "Rami Maalej",
  publisher: "Rami Maalej",
  category: "technology",
  alternates: {
    canonical: "/",
    languages: { "en": siteUrl, "fr": `${siteUrl}/fr` },
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Rami Maalej — Portfolio",
    title: ogTitle,
    description: ogDescription,
    locale: "en_US",
    images: [{ url: ogImage, width: 1200, height: 630, alt: ogTitle }],
  },
  twitter: {
    card: "summary_large_image",
    title: ogTitle,
    description: ogDescription,
    images: [ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Rami Maalej",
  url: siteUrl,
  email: "mailto:rami.maalej.2002@gmail.com",
  jobTitle: "Full-Stack Developer",
  address: { "@type": "PostalAddress", addressLocality: "Sfax", addressCountry: "TN" },
  sameAs: [
    "https://github.com/Rami-maalej",
    "https://linkedin.com/in/rami-maalej-70203425b",
  ],
  knowsAbout: ["React", "Node.js", "Flutter", "Python", "AI Integration", "Full-Stack Development"],
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`${inter.variable} ${geistMono.variable}`}>
    <body>
      {children}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </body>
  </html>
}
