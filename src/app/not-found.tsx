import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

export default function NotFound() {
  return (
    <div className="site-shell nf-shell">
      <header className="topbar">
        <Link className="monogram" href="/" aria-label="Back to home">RM<span>.</span></Link>
      </header>

      <main className="nf-main">
        <div className="nf-content">
          <p className="eyebrow">ERROR — 404 · Page not found</p>
          <h1 className="nf-title">Wrong turn,<br /><em>no page here.</em></h1>
          <p className="nf-copy">The address you&apos;re looking for doesn&apos;t exist on this site. Try one of these instead —</p>
          <div className="nf-ctas">
            <Link className="button button-dark" href="/">Back home</Link>
            <Link className="text-link" href="/#work">View selected work <ArrowUpRight size={16} /></Link>
          </div>
        </div>
      </main>

      <footer className="footer"><span>© {new Date().getFullYear()} Rami Maalej</span><span>Sfax, Tunisia</span></footer>
    </div>
  )
}
