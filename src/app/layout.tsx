import type { Metadata } from "next";
import { Cormorant_Garamond, Cinzel, Geist_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/layout/nav";
import Footer from "@/components/layout/footer";
import { ClientOverlays } from "@/components/layout/client-overlays";

// Old-money luxury serif — high contrast, editorial
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

// All-caps incised roman — coinage, heraldry, old money labels
const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rami Maalej | Full-Stack Developer & AI Architect",
  description:
    "Results-driven Full-Stack Developer and Computer Science graduate with expertise in React, Node.js, Flutter, Python, AI integration, and event-driven architecture. Building scalable systems and cinematic experiences.",
  keywords: [
    "Rami Maalej",
    "Full-Stack Developer",
    "React",
    "Node.js",
    "TypeScript",
    "AI",
    "Portfolio",
    "Tunisia",
  ],
  authors: [{ name: "Rami Maalej" }],
  openGraph: {
    title: "Rami Maalej | Full-Stack Developer & AI Architect",
    description: "Building scalable systems and cinematic digital experiences with React, Node.js, and AI.",
    siteName: "Rami Maalej Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rami Maalej | Full-Stack Developer & AI Architect",
    description: "Building scalable systems and cinematic digital experiences with React, Node.js, and AI.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${cinzel.variable} ${geistMono.variable}`}>
      <body className="bg-black text-white antialiased">
        <ClientOverlays>
          <Nav />
          <main className="overflow-x-hidden">{children}</main>
          <Footer />
        </ClientOverlays>
      </body>
    </html>
  );
}
