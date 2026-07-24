'use client'

import { socialLinks } from '@/lib/data'
import { Mail } from 'lucide-react'

const GitHubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
)

const LinkedInIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
)

const iconMap: Record<string, React.ReactNode> = {
  mail: <Mail size={18} />,
  linkedin: <LinkedInIcon />,
  github: <GitHubIcon />,
}

export default function Footer() {
  return (
    <footer className="px-6 py-14" style={{ borderTop: '1px solid rgba(201,168,76,0.1)' }}>
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">
        <div className="flex flex-col items-center gap-1 md:items-start">
          <span style={{ fontFamily: 'var(--font-cinzel)', fontSize: '0.85rem', letterSpacing: '0.2em', color: 'rgba(201,168,76,0.6)' }}>
            RAMI MAALEJ
          </span>
          <span style={{ fontFamily: 'var(--font-cinzel)', fontSize: '0.55rem', letterSpacing: '0.3em', color: 'rgba(255,255,255,0.2)' }}>
            &copy; {new Date().getFullYear()} · Full-Stack Developer & AI Architect
          </span>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="/Rami_Maalej_CV.pdf"
            download
            className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 transition-all duration-300"
            style={{
              fontFamily: 'var(--font-cinzel)',
              fontSize: '0.58rem',
              letterSpacing: '0.2em',
              border: '1px solid rgba(201,168,76,0.2)',
              color: 'rgba(201,168,76,0.7)',
              background: 'rgba(201,168,76,0.04)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(201,168,76,0.5)'
              e.currentTarget.style.color = 'rgba(201,168,76,1)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(201,168,76,0.2)'
              e.currentTarget.style.color = 'rgba(201,168,76,0.7)'
            }}
            data-cursor="link"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download CV
          </a>
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300"
              style={{ border: '1px solid rgba(201,168,76,0.15)', color: 'rgba(255,255,255,0.35)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(201,168,76,0.4)'
                e.currentTarget.style.color = 'rgba(201,168,76,0.9)'
                e.currentTarget.style.boxShadow = '0 0 16px rgba(201,168,76,0.15)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(201,168,76,0.15)'
                e.currentTarget.style.color = 'rgba(255,255,255,0.35)'
                e.currentTarget.style.boxShadow = 'none'
              }}
              data-cursor="link"
            >
              {iconMap[link.icon]}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
