'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { navLinks } from '@/lib/data'
import { Menu, X } from 'lucide-react'

export default function Nav() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, left: 0 })
  const navRef = useRef<HTMLDivElement>(null)

  const updateIndicator = useCallback(() => {
    if (!navRef.current) return
    const activeLink = navRef.current.querySelector(`[data-section="${activeSection}"]`) as HTMLElement | null
    if (activeLink) {
      const { offsetLeft, offsetWidth } = activeLink
      setIndicatorStyle({ width: offsetWidth, left: offsetLeft })
    }
  }, [activeSection])

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.2, rootMargin: '-15% 0px' }
    )

    window.addEventListener('scroll', handleScroll, { passive: true })
    document.querySelectorAll('section[id]').forEach((section) => observer.observe(section))

    return () => {
      window.removeEventListener('scroll', handleScroll)
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    updateIndicator()
    window.addEventListener('resize', updateIndicator)
    return () => window.removeEventListener('resize', updateIndicator)
  }, [updateIndicator])

  const scrollTo = (href: string) => {
    setIsMobileOpen(false)
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-700 ${
          isScrolled ? 'border-b border-white/5 bg-black/80 backdrop-blur-2xl' : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <button
            onClick={() => scrollTo('#home')}
            className="relative text-lg font-bold tracking-tight text-white"
          >
            RM<span className="text-blue-400">.</span>
          </button>

          <div ref={navRef} className="relative hidden items-center md:flex">
            <motion.div
              className="absolute bottom-0 h-8 rounded-full bg-white/10"
              animate={indicatorStyle}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{ borderRadius: '9999px' }}
            />
            {navLinks.map((link) => (
              <button
                key={link.href}
                data-section={link.href.slice(1)}
                onClick={() => scrollTo(link.href)}
                className="relative z-10 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300"
                style={{
                  color: activeSection === link.href.slice(1) ? '#fff' : 'rgba(255,255,255,0.5)',
                }}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo('#contact')}
              className="relative z-10 ml-4 rounded-full bg-white px-5 py-2 text-sm font-medium text-black transition-all duration-300 hover:bg-white/90"
            >
              Let&apos;s Talk
            </button>
          </div>

          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="relative z-50 text-white md:hidden"
            aria-label="Menu"
          >
            {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-6 bg-black/95 backdrop-blur-xl"
          >
            {navLinks.map((link, i) => (
              <motion.button
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => scrollTo(link.href)}
                className="text-2xl font-medium text-white/80 transition-colors hover:text-white"
              >
                {link.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
