"use client"

import { useEffect, useMemo, useState } from "react"
import { ArrowDownRight, ArrowUpRight, Check, Code2, ExternalLink, Mail, Menu, Users, X } from "lucide-react"

type Repo = {
  id: number
  name: string
  html_url: string
  homepage?: string | null
  description: string | null
  language: string | null
  topics: string[]
  stargazers_count: number
  forks_count: number
  updated_at: string
  archived: boolean
  fork: boolean
}

const profile = {
  name: "Rami Maalej",
  github: "https://github.com/Ramimaalej",
  linkedin: "https://linkedin.com/in/rami-maalej-70203425b",
  email: "rami.maalej.2002@gmail.com",
}

const skills = ["React", "Next.js", "Node.js", "TypeScript", "Python", "Flutter", "PostgreSQL", "AI integration"]
const experience = [
  { period: "2026", role: "Full-Stack Developer Intern · PFE", company: "Syberno", detail: "School management platform with React, Node.js, MySQL, Kafka and RabbitMQ." },
  { period: "2025", role: "Full-Stack Developer Intern", company: "Syberno", detail: "Retail management and POS system with real-time inventory, invoicing and analytics." },
]

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", { month: "short", year: "numeric" }).format(new Date(value))
}

export default function Home() {
  const [repos, setRepos] = useState<Repo[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState("All")
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    fetch("https://api.github.com/users/Ramimaalej/repos?per_page=100&sort=updated")
      .then((response) => response.ok ? response.json() : Promise.reject(new Error("GitHub unavailable")))
      .then((data: Repo[]) => setRepos(data.filter((repo) => !repo.fork && !repo.archived)))
      .catch(() => setRepos([]))
      .finally(() => setLoading(false))
  }, [])

  const languages = useMemo(() => ["All", ...Array.from(new Set(repos.map((repo) => repo.language).filter(Boolean) as string[]))], [repos])
  const visibleRepos = filter === "All" ? repos : repos.filter((repo) => repo.language === filter)

  const navigate = (id: string) => {
    setMobileOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="site-shell">
      <header className="topbar">
        <button className="monogram" onClick={() => navigate("top")} aria-label="Back to top">RM<span>.</span></button>
        <nav className={mobileOpen ? "nav-links is-open" : "nav-links"} aria-label="Main navigation">
          {["About", "Work", "Experience", "Contact"].map((item) => <button key={item} onClick={() => navigate(item.toLowerCase())}>{item}</button>)}
        </nav>
        <div className="topbar-actions">
          <a className="availability" href={`mailto:${profile.email}`}><i /> Available for work</a>
          <button className="menu-button" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">{mobileOpen ? <X size={20} /> : <Menu size={20} />}</button>
        </div>
      </header>

      <main id="top">
        <section className="hero section-frame">
          <div className="hero-kicker"><span>01</span><span>Portfolio / 2026</span><span className="rule" /></div>
          <div className="hero-copy">
            <p className="eyebrow">Full-stack developer · Tunisia</p>
            <h1>Building digital<br /><em>systems</em> that matter.</h1>
            <p className="hero-intro">I design and engineer thoughtful products from first idea to final deployment — where robust architecture meets precise, human-centered interfaces.</p>
            <div className="hero-ctas"><button className="button button-dark" onClick={() => navigate("work")}>View selected work <ArrowDownRight size={17} /></button><a className="text-link" href={`mailto:${profile.email}`}>Start a conversation <ArrowUpRight size={16} /></a></div>
          </div>
          <div className="hero-meta"><span>01 / 04</span><span>Scroll to explore</span><span>⌄</span></div>
        </section>

        <section id="about" className="section-frame split-section">
          <div className="section-index">02 / About</div>
          <div className="section-content about-grid"><div><h2>Engineer by trade.<br /><em>Curious by nature.</em></h2></div><div className="body-copy"><p>I&apos;m Rami, a full-stack developer and computer science graduate focused on building scalable web and mobile applications.</p><p>My work moves between product thinking, clean code and real-world systems: event-driven architecture, AI integrations, authentication, data and everything in between.</p><div className="stat-row"><div><strong>10+</strong><span>Technologies</span></div><div><strong>{repos.length || "—"}</strong><span>Public projects</span></div><div><strong>∞</strong><span>Questions asked</span></div></div></div></div>
        </section>

        <section id="work" className="section-frame work-section">
          <div className="section-heading"><div><div className="section-index">03 / Work</div><h2>Open source,<br /><em>open possibilities.</em></h2></div><a className="round-link" href={profile.github} target="_blank" rel="noreferrer" aria-label="Open GitHub"><Code2 size={21} /></a></div>
          <div className="work-toolbar"><p>Every public repository, pulled live from GitHub.</p><div className="filter-list">{languages.map((language) => <button className={filter === language ? "active" : ""} onClick={() => setFilter(language)} key={language}>{language}</button>)}</div></div>
          {loading ? <div className="project-state">Loading repositories<span className="loading-line" /></div> : visibleRepos.length === 0 ? <div className="project-state">No repositories found. <a href={profile.github}>Visit GitHub <ArrowUpRight size={15} /></a></div> : <div className="repo-grid">{visibleRepos.map((repo, index) => <article className="repo-card" key={repo.id}><div className="repo-top"><span className="repo-number">{String(index + 1).padStart(2, "0")}</span><span className="repo-language">{repo.language || "Open source"}</span></div><h3>{repo.name.replaceAll("-", " ")}</h3><p>{repo.description || "A work in progress exploring ideas, tools and better ways to build."}</p><div className="repo-tags">{repo.topics.slice(0, 3).map((topic) => <span key={topic}>{topic}</span>)}</div><div className="repo-bottom"><span>Updated {formatDate(repo.updated_at)}</span><div><a href={repo.html_url} target="_blank" rel="noreferrer" aria-label={`View ${repo.name} on GitHub`}><Code2 size={16} /></a>{repo.homepage && <a href={repo.homepage} target="_blank" rel="noreferrer" aria-label={`Visit ${repo.name} website`}><ExternalLink size={16} /></a>}</div></div></article>)}</div>}
        </section>

        <section id="experience" className="section-frame split-section experience-section"><div className="section-index">04 / Experience</div><div className="section-content"><h2>Learning through<br /><em>shipping.</em></h2><div className="timeline">{experience.map((item) => <div className="timeline-item" key={item.period}><span>{item.period}</span><div><h3>{item.role}</h3><strong>{item.company}</strong><p>{item.detail}</p></div></div>)}</div><div className="skill-cloud">{skills.map((skill) => <span key={skill}><Check size={13} />{skill}</span>)}</div></div></section>

        <section id="contact" className="contact-section section-frame"><div className="section-index">05 / Contact</div><div className="contact-main"><p className="eyebrow">Have a project in mind?</p><h2>Let&apos;s make<br /><em>something useful.</em></h2><a className="email-link" href={`mailto:${profile.email}`}>{profile.email}<ArrowUpRight size={20} /></a></div><div className="socials"><a href={profile.github} target="_blank" rel="noreferrer"><Code2 size={17} /> GitHub</a><a href={profile.linkedin} target="_blank" rel="noreferrer"><Users size={17} /> LinkedIn</a><a href={`mailto:${profile.email}`}><Mail size={17} /> Email</a></div></section>
      </main>
      <footer className="footer"><span>© {new Date().getFullYear()} Rami Maalej</span><span>Built with intention.</span><span>Sfax, Tunisia</span></footer>
    </div>
  )
}
