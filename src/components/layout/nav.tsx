'use client'

import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { navLinks } from '@/lib/data'

export default function Nav() {
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveSection(entry.target.id)
      })
    }, { threshold: 0.25, rootMargin: '-15% 0px' })
    document.querySelectorAll('section[id]').forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const scrollTo = (href: string) => {
    setIsMobileOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black">
      <nav className="mx-auto flex h-[72px] w-full max-w-7xl items-center justify-between px-6 lg:px-10" aria-label="Primary navigation">
        <button onClick={() => scrollTo('#home')} className="text-left" aria-label="Go to home">
          <span className="block text-sm font-semibold tracking-[0.22em] text-white">RAMI</span>
          <span className="mt-1 block font-mono text-[9px] tracking-[0.25em] text-white/45">MAALEJ</span>
        </button>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.slice(1, navLinks.length - 1).map((link) => {
            const isActive = activeSection === link.href.slice(1)
            return <button key={link.href} onClick={() => scrollTo(link.href)} className={`border-b pb-1 font-mono text-[10px] uppercase tracking-[0.18em] transition-colors ${isActive ? 'border-white text-white' : 'border-transparent text-white/45 hover:text-white'}`}>{link.label}</button>
          })}
        </div>

        <button onClick={() => scrollTo('#contact')} className="hidden border border-white bg-white px-4 py-2 text-xs font-medium text-black transition-colors hover:bg-black hover:text-white md:block">Let&apos;s talk <span aria-hidden>↗</span></button>
        <button onClick={() => setIsMobileOpen(!isMobileOpen)} className="flex h-9 w-9 items-center justify-center border border-white/20 text-white md:hidden" aria-label="Toggle menu">{isMobileOpen ? <X size={18} /> : <Menu size={18} />}</button>
      </nav>
      {isMobileOpen && <div className="border-t border-white/10 bg-black px-6 py-6 md:hidden"><div className="flex flex-col gap-5">{navLinks.map((link) => <button key={link.href} onClick={() => scrollTo(link.href)} className="text-left font-mono text-xs uppercase tracking-[0.18em] text-white/70 hover:text-white">{link.label}</button>)}</div></div>}
    </header>
  )
}
