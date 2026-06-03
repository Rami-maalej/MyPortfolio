import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import Nav from "@/components/layout/nav";
import Footer from "@/components/layout/footer";
import Cursor from "@/components/ui/cursor";
import SmoothScroll from "@/components/layout/smooth-scroll";
import IntroSequence from "@/components/layout/intro-sequence";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
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
    description:
      "Building scalable systems and cinematic digital experiences with React, Node.js, and AI.",
    siteName: "Rami Maalej Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rami Maalej | Full-Stack Developer & AI Architect",
    description:
      "Building scalable systems and cinematic digital experiences with React, Node.js, and AI.",
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
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable}`}>
      <body className="bg-black text-white antialiased">
          <IntroSequence />
          <Cursor />
          <SmoothScroll>
            <Nav />
            <main className="overflow-x-hidden">{children}</main>
            <Footer />
          </SmoothScroll>
      </body>
    </html>
  );
}
