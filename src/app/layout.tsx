import type { Metadata } from "next"
import { Geist_Mono, Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" })
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], display: "swap" })

export const metadata: Metadata = {
  title: "Rami Maalej — Full-Stack Developer",
  description: "Portfolio of Rami Maalej, a full-stack developer building thoughtful digital systems with React, Node.js, AI and Flutter.",
  keywords: ["Rami Maalej", "Full-Stack Developer", "React", "Node.js", "AI", "Portfolio"],
  authors: [{ name: "Rami Maalej" }],
  openGraph: { title: "Rami Maalej — Full-Stack Developer", description: "Building digital systems that matter.", type: "website" },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`${inter.variable} ${geistMono.variable}`}><body>{children}</body></html>
}
