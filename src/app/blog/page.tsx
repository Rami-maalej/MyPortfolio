import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { blogPosts } from "@/lib/blog"
import { siteUrl } from "@/lib/data"

const ogImage = "/og-image.png"

export const metadata: Metadata = {
  title: "Blog — Rami Maalej",
  description:
    "Articles by Rami Maalej, full-stack developer: event-driven architecture with Kafka and RabbitMQ, AI integration with Google Gemini, and Linux systems programming.",
  alternates: { canonical: "/blog" },
    openGraph: {
    type: "website",
    url: `${siteUrl}/blog`,
    title: "Blog — Rami Maalej",
    description: "Articles on full-stack development, event-driven architecture, AI integration, and Linux systems.",
    locale: "en_US",
    images: [{ url: ogImage, width: 1200, height: 630, alt: "Blog — Rami Maalej" }],
  },
}

export default function BlogIndex() {
  return (
    <div className="site-shell blog-shell">
      <header className="topbar">
        <Link className="monogram" href="/" aria-label="Back to home">RM<span>.</span></Link>
        <nav className="nav-links" aria-label="Main navigation">
          {["Work", "Experience", "Contact"].map((item) => <Link key={item} href={`/#${item.toLowerCase()}`} className="blog-nav-link">{item}</Link>)}
        </nav>
      </header>

      <main className="blog-main">
        <p className="eyebrow">Articles &amp; engineering notes</p>
        <h1 className="blog-title">Writing about<br /><em>what I build.</em></h1>
        <p className="blog-intro">Deep dives into the systems behind my projects — event-driven architecture, AI integration, and the Linux plumbing underneath.</p>

        <div className="blog-list">
          {blogPosts.map((post, index) => (
            <Link className="blog-item" href={`/blog/${post.slug}`} key={post.slug}>
              <div className="blog-item-top">
                <span className="blog-number">{String(index + 1).padStart(2, "0")}</span>
                <span className="blog-tag">{post.tags[0]}</span>
              </div>
              <h2>{post.title}</h2>
              <p>{post.excerpt}</p>
              <div className="blog-item-bottom">
                <span>{post.date} · {post.readTime}</span>
                <span className="blog-read">Read article <ArrowUpRight size={16} /></span>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <footer className="footer"><span>© {new Date().getFullYear()} Rami Maalej</span><span>Sfax, Tunisia</span></footer>
    </div>
  )
}
