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

const skills = ["React", "Next.js", "Node.js", "TypeScript", "Python", "Flutter", "PostgreSQL", "Intégration IA"]
const experience = [
  { period: "2026", role: "Développeur Full-Stack stagiaire · PFE", company: "Syberno", detail: "Plateforme de gestion scolaire avec React, Node.js, MySQL, Kafka et RabbitMQ." },
  { period: "2025", role: "Développeur Full-Stack stagiaire", company: "Syberno", detail: "Système de gestion de magasin et de caisse avec suivi d'inventaire, facturation et analyses en temps réel." },
]

const frenchProjects: Project[] = projects.map((project) => {
  const translated: Partial<Project> = {}
  if (project.title === "Linguvo") {
    translated.description = "Plateforme d'apprentissage des langues pilotée par l'IA"
    translated.highlights = [
      "Plateforme full-stack utilisant Google Gemini AI pour générer des histoires et des exercices personnalisés pour les niveaux A1 à C2",
      "Algorithme de mise en relation avec locuteurs natifs et notifications en temps réel via Supabase pour un échange linguistique fluide",
      "Éléments gamifiés intégrés — suivi d'XP, missions interactives et cours structurés — avec un engagement utilisateur mesurable",
    ]
  } else if (project.title === "SuperVib") {
    translated.description = "IDE pour développeurs propulsé par l'IA"
    translated.highlights = [
      "IDE intelligent avec assistance IA en temps réel et génération de code automatisée",
      "Débogage intelligent propulsé par Ollama pour une productivité accrue des développeurs",
      "Interface épurée et personnalisable avec gestion de projet intégrée",
    ]
  } else if (project.title === "Gamafa") {
    translated.description = "Application mobile multi-jeux"
    translated.highlights = [
      "Arcade hors ligne de 30 jeux — de Wordle, Sudoku et échecs à Pac-Man — avec une navigation fluide et une interface cartoon réactive",
      "Performance entièrement locale, sans aucune dépendance à Internet",
      "Optimisé pour une expérience multi-appareils sans couture sur Android",
    ]
  } else if (project.title === "Invo") {
    translated.description = "Application de gestion d'inventaire"
    translated.highlights = [
      "Application mobile d'inventaire avec scan de code-barres et synchronisation Firebase en temps réel",
      "Authentification Google OAuth sécurisée pour la gestion des utilisateurs",
      "Interface intuitive de gestion de stock avec mises à jour en temps réel",
    ]
  } else if (project.title === "School Management System") {
    translated.description = "Plateforme éducative d'entreprise"
    translated.highlights = [
      "Architecture du système gérant plus de 500 enregistrements d'étudiants, d'enseignants et de notes",
      "Microservices orientés événements via Apache Kafka et RabbitMQ, réduisant la latence de traitement",
      "RBAC et authentification JWT pour des workflows multi-rôles",
    ]
  } else if (project.title === "Retail Management & POS System") {
    translated.description = "Plateforme de point de vente et d'inventaire"
    translated.highlights = [
      "Système avec suivi d'inventaire en temps réel et facturation automatisée",
      "Analyses de ventes intégrées avec ApexCharts pour des décisions fondées sur les données",
      "ORM Sequelize pour une gestion robuste des produits, commandes et retours",
    ]
  } else if (project.title === "anchor") {
    translated.description = "Protocolo de compétences orienté action pour les assistants de codage IA"
    translated.highlights = [
      "Compétence conçue pour forcer les assistants IA à répondre d'abord et à passer à l'action au lieu d'enfouir l'intention",
      "Protocole portable installable dans les écosystèmes Claude, Cursor, Gemini, Codex, Qwen et OpenCode",
      "Règles de réponse strictes — réponses directes, exécution en un coup, remplissage minimal — validées sur plusieurs environnements",
    ]
  } else if (project.title === "Budgetly") {
    translated.description = "Application de suivi des finances personnelles"
    translated.highlights = [
      "Gestionnaire de dépenses hors ligne prioritaire, stockant toutes les données localement avec Hive — sans comptes ni cloud",
      "Analyses de dépenses visualisées avec fl_chart et vues géolocalisées via flutter_map",
      "État global géré avec Riverpod sur une interface multi-plateforme propre — mobile, web et bureau",
    ]
  } else if (project.title === "Bullwize") {
    translated.description = "Générateur de factures gratuit pour freelances"
    translated.highlights = [
      "Plateforme de facturation complète avec factures personnalisées, lignes multi-devises, taxes et remises, suivi Brouillon → Envoyé → Payé",
      "Rappels automatiques de retards de paiement et liens de facture publics pour que les clients consultent sans créer de compte",
      "Configuration Docker Compose en une commande avec migrations automatiques, données de démo et génération PDF côté serveur",
    ]
  } else if (project.title === "pkgmap") {
    translated.description = "CLI d'inventaire des paquets Linux — publié sur PyPI"
    translated.highlights = [
      "Analyse les paquets installés sur RPM, DNF, Pacman, DEB, Flatpak, Snap, AppImage, pipx et npm avec la taille disque par paquet",
      "Rapports colorés dans le terminal regroupés par famille de paquets et export JSON / CSV",
      "Flux de désinstallation interactive par numéro ; empaqueté et publié sur PyPI",
    ]
  } else if (project.title === "Quizverse") {
    translated.description = "Jeu de quiz multijoueur 3D en LAN"
    translated.highlights = [
      "Quiz multijoueur en LAN avec salon d'accueil, connexion par code PIN + QR et synchronisation des joueurs en direct via Socket.IO",
      "Visuels 3D avec Three.js / @react-three/fiber, état du jeu validé par zod et persistance sqlite",
    ]
  } else if (project.title === "Trayock") {
    translated.description = "Verrouillage clavier/souris au niveau noyau pour Linux"
    translated.highlights = [
      "Verrouille clavier et souris au niveau noyau via des réservations evdev exclusives — résistant aux contournements qui neutralisent les raccourcis X11",
      "Icône cadenas dans la barre système avec empaquetage Makefile et combinaison Ctrl+Alt+Shift+L en sortie d'urgence",
    ]
  }
  return { ...project, ...translated }
})

export default function HomeFr() {
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
    <div className="site-shell" lang="fr">
      <header className="topbar">
        <button className="monogram" onClick={() => navigate("top")} aria-label="Retour en haut">RM<span>.</span></button>
        <nav className={mobileOpen ? "nav-links is-open" : "nav-links"} aria-label="Navigation principale">
          {([["À propos", "about"], ["Projets", "work"], ["Expérience", "experience"], ["Contact", "contact"]] as const).map(([label, id]) => <button key={label} onClick={() => navigate(id)}>{label}</button>)}
          <Link className="blog-nav-link" href="/blog">Blog</Link>
          <Link className="blog-nav-link" href="/" hrefLang="en">EN</Link>
        </nav>
        <div className="topbar-actions">
          <button className="menu-button" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Ouvrir le menu">{mobileOpen ? <X size={20} /> : <Menu size={20} />}</button>
        </div>
      </header>

      <main id="top">
        <section className="hero section-frame">
          <div className="hero-object" aria-hidden="true"><HeroObject /></div>
          <div className="hero-copy">
            <p className="eyebrow">Développeur full-stack · Tunisie</p>
            <h1>Concevoir des<br /><em>systèmes</em> utiles. <span className="sr-only">Rami Maalej, Développeur Full-Stack</span></h1>
            <p className="hero-intro">Je conçois et je construis des produits réfléchis, de l&apos;idée à la mise en production — là où l&apos;architecture robuste rencontre des interfaces précises, centrées utilisateur.</p>
            <div className="hero-ctas"><button className="button button-dark" onClick={() => navigate("work")}>Voir les projets <ArrowDownRight size={17} /></button><a className="text-link" href={`mailto:${profile.email}`}>Démarrer une conversation <ArrowUpRight size={16} /></a></div>
          </div>
        </section>

        <section id="about" className="section-frame split-section">
          <div className="section-content about-grid"><div><h2>Ingénieur de métier.<br /><em>Curieux de nature.</em></h2></div><div className="body-copy"><p>Je suis Rami, développeur full-stack diplômé en informatique, spécialisé dans les applications web et mobiles évolutives.</p><p>Mon travail se situe entre la conception produit, le code propre et les systèmes réels : architecture pilotée par les événements, intégrations IA, authentification, données et tout ce qui va avec.</p><div className="stat-row"><div><strong>10+</strong><span>Technologies</span></div><div><strong>{frenchProjects.length}</strong><span>Projets livrés</span></div><div><strong>∞</strong><span>Questions posées</span></div></div></div></div>
        </section>

        <section id="work" className="section-frame work-section">
          <div className="section-heading"><div><h2>Projets sélectionnés,<br /><em>construits de bout en bout.</em></h2></div><a className="round-link" href={profile.github} target="_blank" rel="noreferrer" aria-label="Ouvrir GitHub"><Code2 size={21} /></a></div>
          <div className="work-toolbar"><p>Chaque projet majeur, des plateformes full-stack aux outils IA et utilitaires système.</p></div>
          <div className="repo-grid">{frenchProjects.map((project, index) => <article className="repo-card" key={project.title} role="button" tabIndex={0} aria-haspopup="dialog" onClick={() => setSelected(project)} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setSelected(project) } }}><div className="repo-top"><span className="repo-number">{String(index + 1).padStart(2, "0")}</span><span className="repo-language">{project.tech[0]}</span></div><h3>{project.title}</h3><p>{project.description}</p><div className="repo-tags">{project.tech.slice(1, 6).map((item) => <span key={item}>{item}</span>)}</div><div className="repo-bottom"><span>Livré {project.date}</span><div><span className="repo-view" aria-hidden="true">Détails</span><Code2 size={16} /></div></div></article>)}</div>
        </section>

        {selected && (
          <div className="modal-overlay" role="dialog" aria-modal="true" aria-label={`Détails : ${selected.title}`} onClick={() => setSelected(null)}>
            <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
              <div className="modal-top"><span className="modal-date">Livré {selected.date}</span><button className="modal-close" onClick={() => setSelected(null)} aria-label="Fermer les détails" autoFocus><X size={20} /></button></div>
              <h3>{selected.title}</h3>
              <p className="modal-desc">{selected.description}</p>
              <p className="modal-sub">Points clés</p>
              <ul className="modal-list">{selected.highlights.map((h) => <li key={h}>{h}</li>)}</ul>
              <p className="modal-sub">Stack technique</p>
              <div className="modal-tags">{selected.tech.map((item) => <span key={item}>{item}</span>)}</div>
              <div className="modal-links"><a href={profile.github} target="_blank" rel="noreferrer">Voir sur GitHub <Code2 size={15} /></a><a href={`mailto:${profile.email}`}>Poser une question <Mail size={15} /></a></div>
            </div>
          </div>
        )}

        <section id="experience" className="section-frame split-section experience-section"><div className="section-content"><h2>Apprendre en<br /><em>livrant.</em></h2><div className="timeline">{experience.map((item) => <div className="timeline-item" key={item.period}><span>{item.period}</span><div><h3>{item.role}</h3><strong>{item.company}</strong><p>{item.detail}</p></div></div>)}</div><div className="skill-cloud">{skills.map((skill) => <span key={skill}><Check size={13} />{skill}</span>)}</div></div></section>

        <section id="contact" className="contact-section section-frame"><div className="contact-main"><p className="eyebrow">Un projet en tête ?</p><h2>Faisons<br /><em>quelque chose d&apos;utile.</em></h2><a className="email-link" href={`mailto:${profile.email}`}>{profile.email}<ArrowUpRight size={20} /></a></div><div className="socials"><a href={profile.github} target="_blank" rel="noreferrer"><Code2 size={17} /> GitHub</a><a href={profile.linkedin} target="_blank" rel="noreferrer"><Users size={17} /> LinkedIn</a><a href={`mailto:${profile.email}`}><Mail size={17} /> Email</a></div></section>
      </main>
      <footer className="footer"><span>© {new Date().getFullYear()} Rami Maalej</span><span>Sfax, Tunisie</span></footer>
    </div>
  )
}
