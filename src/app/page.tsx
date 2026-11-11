"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import Link from "next/link"
import { ArrowDownRight, ArrowUpRight, Check, Code2, Mail, Menu, Users, X } from "lucide-react"
import { projects } from "@/lib/data"
import type { Project } from "@/types"

const HeroObject = dynamic(() => import("@/components/threed/hero-object"), { ssr: false })

const profile = {
  name: "Rami Maalej",
  github: "https://github.com/Rami-maalej",
  linkedin: "https://linkedin.com/in/rami-maalej-70203425b",
  email: "rami.maalej.2002@gmail.com",
}

const skills = ["React", "Next.js", "Node.js", "TypeScript", "Python", "Flutter", "PostgreSQL", "AI integration"]
const experience = [
  { period: "2026", role: "Full-Stack Developer Intern · PFE", company: "Syberno", detail: "School management platform with React, Node.js, MySQL, Kafka and RabbitMQ." },
  { period: "2025", role: "Full-Stack Developer Intern", company: "Syberno", detail: "Retail management and POS system with real-time inventory, invoicing and analytics." },
]

export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [selected, setSelected] = useState<Project | null>(null)

  useEffect(() => {
    if (!selected) return
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setSelected(null) }
    document.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = "" }
  }, [selected])

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
          <Link className="blog-nav-link" href="/blog">Blog</Link>
        </nav>
        <div className="topbar-actions">
          <button className="menu-button" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">{mobileOpen ? <X size={20} /> : <Menu size={20} />}</button>
        </div>
      </header>

      <main id="top">
        <section className="hero section-frame">
          <div className="hero-object" aria-hidden="true"><HeroObject /></div>
          <div className="hero-copy">
            <p className="eyebrow">Full-stack developer · Tunisia</p>
            <h1>Building digital<br /><em>systems</em> that matter. <span className="sr-only">Rami Maalej, Full-Stack Developer</span></h1>
            <p className="hero-intro">I design and engineer thoughtful products from first idea to final deployment — where robust architecture meets precise, human-centered interfaces.</p>
            <div className="hero-ctas"><button className="button button-dark" onClick={() => navigate("work")}>View selected work <ArrowDownRight size={17} /></button><a className="text-link" href={`mailto:${profile.email}`}>Start a conversation <ArrowUpRight size={16} /></a></div>
          </div>
        </section>

        <section id="about" className="section-frame split-section">
          <div className="section-content about-grid"><div><h2>Engineer by trade.<br /><em>Curious by nature.</em></h2></div><div className="body-copy"><p>I&apos;m Rami, a full-stack developer and computer science graduate focused on building scalable web and mobile applications.</p><p>My work moves between product thinking, clean code and real-world systems: event-driven architecture, AI integrations, authentication, data and everything in between.</p><div className="stat-row"><div><strong>10+</strong><span>Technologies</span></div><div><strong>{projects.length}</strong><span>Shipped projects</span></div><div><strong>∞</strong><span>Questions asked</span></div></div></div></div>
        </section>

        <section id="work" className="section-frame work-section">
          <div className="section-heading"><div><h2>Selected projects,<br /><em>built end to end.</em></h2></div><a className="round-link" href={profile.github} target="_blank" rel="noreferrer" aria-label="Open GitHub"><Code2 size={21} /></a></div>
          <div className="work-toolbar"><p>Every major build, from full-stack platforms to AI tools and system utilities.</p></div>
          <div className="repo-grid">{projects.map((project, index) => <article className="repo-card" key={project.title} role="button" tabIndex={0} aria-haspopup="dialog" onClick={() => setSelected(project)} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setSelected(project) } }}><div className="repo-top"><span className="repo-number">{String(index + 1).padStart(2, "0")}</span><span className="repo-language">{project.tech[0]}</span></div><h3>{project.title}</h3><p>{project.description}</p><div className="repo-tags">{project.tech.slice(1, 6).map((item) => <span key={item}>{item}</span>)}</div><div className="repo-bottom"><span>Shipped {project.date}</span><div><span className="repo-view" aria-hidden="true">Details</span><Code2 size={16} /></div></div></article>)}</div>
        </section>

        {selected && (
          <div className="modal-overlay" role="dialog" aria-modal="true" aria-label={`${selected.title} details`} onClick={() => setSelected(null)}>
            <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
              <div className="modal-top"><span className="modal-date">Shipped {selected.date}</span><button className="modal-close" onClick={() => setSelected(null)} aria-label="Close details" autoFocus><X size={20} /></button></div>
              <h3>{selected.title}</h3>
              <p className="modal-desc">{selected.description}</p>
              <p className="modal-sub">Key highlights</p>
              <ul className="modal-list">{selected.highlights.map((h) => <li key={h}>{h}</li>)}</ul>
              <p className="modal-sub">Tech stack</p>
              <div className="modal-tags">{selected.tech.map((item) => <span key={item}>{item}</span>)}</div>
              <div className="modal-links"><a href={profile.github} target="_blank" rel="noreferrer">View on GitHub <Code2 size={15} /></a><a href={`mailto:${profile.email}`}>Ask about it <Mail size={15} /></a></div>
            </div>
          </div>
        )}

        <section id="experience" className="section-frame split-section experience-section"><div className="section-content"><h2>Learning through<br /><em>shipping.</em></h2><div className="timeline">{experience.map((item) => <div className="timeline-item" key={item.period}><span>{item.period}</span><div><h3>{item.role}</h3><strong>{item.company}</strong><p>{item.detail}</p></div></div>)}</div><div className="skill-cloud">{skills.map((skill) => <span key={skill}><Check size={13} />{skill}</span>)}</div></div></section>

        <section id="contact" className="contact-section section-frame"><div className="contact-main"><p className="eyebrow">Have a project in mind?</p><h2>Let&apos;s make<br /><em>something useful.</em></h2><a className="email-link" href={`mailto:${profile.email}`}>{profile.email}<ArrowUpRight size={20} /></a></div><div className="socials"><a href={profile.github} target="_blank" rel="noreferrer"><Code2 size={17} /> GitHub</a><a href={profile.linkedin} target="_blank" rel="noreferrer"><Users size={17} /> LinkedIn</a><a href={`mailto:${profile.email}`}><Mail size={17} /> Email</a></div></section>
      </main>
      <footer className="footer"><span>© {new Date().getFullYear()} Rami Maalej</span><span>Sfax, Tunisia</span></footer>
    </div>
  )
}
