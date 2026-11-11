import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { blogPosts } from "@/lib/blog"
import { siteUrl } from "@/lib/data"
import { notFound } from "next/navigation"

const ogImage = "/og-image.png"

interface Props {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = blogPosts.find((p) => p.slug === slug)
  if (!post) return {}
  return {
    title: `${post.title} — Rami Maalej Blog`,
    description: post.excerpt,
    keywords: [post.title, "Rami Maalej", ...post.tags],
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      url: `${siteUrl}/blog/${post.slug}`,
      title: post.title,
      description: post.excerpt,
      publishedTime: post.date,
      locale: "en_US",
      images: [{ url: ogImage, width: 1200, height: 630, alt: post.title }],
    },
  }
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params
  const post = blogPosts.find((p) => p.slug === slug)
  if (!post) notFound()

  return (
    <div className="site-shell blog-shell">
      <header className="topbar">
        <Link className="monogram" href="/" aria-label="Back to home">RM<span>.</span></Link>
        <nav className="nav-links" aria-label="Main navigation">
          <Link href="/blog" className="blog-nav-link">Blog</Link>
        </nav>
      </header>

      <main className="blog-main blog-article-main">
        <Link href="/blog" className="blog-back"><ArrowLeft size={15} /> All articles</Link>
        <p className="eyebrow">{post.tags.join(" · ")}</p>
        <h1 className="blog-title">{post.title}</h1>
        <p className="blog-meta">{post.date} · {post.readTime}</p>

        <article className="blog-article">
          {post.content.map((section, i) => (
            <section key={i}>
              {section.heading && <h2>{section.heading}</h2>}
              {section.paragraphs.map((paragraph, j) => <p key={j}>{paragraph}</p>)}
            </section>
          ))}
        </article>

        <div className="blog-author">
          <p className="modal-sub">About the author</p>
          <p>Rami Maalej is a full-stack developer in Sfax, Tunisia, building web, mobile, and AI-powered systems — <Link href="/">see his work</Link>.</p>
        </div>
      </main>

      <footer className="footer"><span>© {new Date().getFullYear()} Rami Maalej</span><span>Sfax, Tunisia</span></footer>
    </div>
  )
}
