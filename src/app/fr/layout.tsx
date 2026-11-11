import type { Metadata } from "next"
import type { ReactNode } from "react"
import { siteUrl } from "@/lib/data"

const ogImage = "/og-image.png"
const ogTitle = "Rami Maalej — Développeur Full-Stack"
const ogDescription =
  "Rami Maalej est un développeur full-stack à Sfax, en Tunisie, créant des applications web, mobiles et IA évolutives avec React, Node.js, Flutter et Python."

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: ogTitle,
  description: ogDescription,
  keywords: [
    "Rami Maalej",
    "développeur full-stack Tunisie",
    "développeur web Sfax",
    "développeur React",
    "développeur Node.js",
    "développeur Flutter",
    "programmation Python",
    "intégration IA",
  ],
  authors: [{ name: "Rami Maalej", url: siteUrl }],
  creator: "Rami Maalej",
  publisher: "Rami Maalej",
  category: "technology",
  alternates: {
    canonical: "/fr",
    languages: { "en": siteUrl, "fr": `${siteUrl}/fr` },
  },
  openGraph: {
    type: "website",
    url: `${siteUrl}/fr`,
    siteName: "Rami Maalej — Portfolio",
    title: ogTitle,
    description: ogDescription,
    locale: "fr_FR",
    images: [{ url: ogImage, width: 1200, height: 630, alt: ogTitle }],
  },
}

export default function FrLayout({ children }: Readonly<{ children: ReactNode }>) {
  return children
}
