'use client'

import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { navLinks } from '@/lib/data'
import { Menu, X } from 'lucide-react'

/* ──────────────────────────────────────────────────────────────
   3D LOGO MARK — a rotating wireframe icosahedron, rendered
   inline as SVG so it animates crisply with framer-motion.
   ────────────────────────────────────────────────────────────── */
function LogoMark({ spinning = true }: { spinning?: boolean }) {
  return (
    <div className="relative h-9 w-9" style={{ perspective: '600px' }}>
      <motion.div
        className="absolute inset-0"
        style={{ transformStyle: 'preserve-3d' }}
        animate={
          spinning
            ? { rotateX: [0, 360], rotateY: [0, 360] }
            : { rotateX: 0, rotateY: 0 }
        }
        transition={
          spinning
            ? { duration: 14, ease: 'linear', repeat: Infinity }
            : { duration: 0.6 }
        }
      >
        <svg viewBox="0 0 40 40" className="h-full w-full">
          {/* outer wireframe icosahedron-ish outline */}
          <g
            fill="none"
            stroke="white"
            strokeWidth="0.7"
            strokeLinejoin="round"
          >
            <polygon points="20,2 37,12 37,28 20,38 3,28 3,12" />
            <polygon points="20,2 20,38" />
            <polygon points="3,12 37,28" />
            <polygon points="37,12 3,28" />
            <line x1="20" y1="2" x2="3" y2="28" />
            <line x1="20" y1="2" x2="37" y2="28" />
            <line x1="20" y1="38" x2="3" y2="12" />
            <line x1="20" y1="38" x2="37" y2="12" />
          </g>
          {/* inner core dot */}
          <circle cx="20" cy="20" r="1.6" fill="white" />
        </svg>
      </motion.div>
      {/* glow halo */}
      <div className="pointer-events-none absolute inset-0 rounded-full"
           style={{ boxShadow: '0 0 24px rgba(255,255,255,0.18)' }} />
    </div>
  )
}

/* ──────────────────────────────────────────────────────────────
   TILT LINK — each nav link has a 3D tilt on hover, and a
   small orbiting ring around the active one.
   ────────────────────────────────────────────────────────────── */
function NavLink3D({
  label,
  isActive,
  onClick,
}: {
  label: string
  isActive: boolean
  onClick: () => void
}) {
  const ref = useRef<HTMLButtonElement>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), {
    stiffness: 220,
    damping: 18,
  })
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), {
    stiffness: 220,
    damping: 18,
  })

  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const r = ref.current.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }
  const handleLeave = () => {
    mx.set(0)
    my.set(0)
  }

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onClick={onClick}
      style={{
        rotateX: rx,
        rotateY: ry,
        transformStyle: 'preserve-3d',
        fontFamily: 'var(--font-cinzel)',
        fontSize: '0.58rem',
        letterSpacing: '0.18em',
      }}
      className="group relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300"
      data-cursor="link"
    >
      <span
        className="relative z-10 transition-colors duration-300"
        style={{ color: isActive ? '#fff' : 'rgba(255,255,255,0.55)' }}
      >
        {label}
      </span>

      {/* active background pill — physical "lit" tile */}
      {isActive && (
        <motion.span
          layoutId="nav-active"
          className="absolute inset-0 -z-0 rounded-full"
          style={{
            background:
              'linear-gradient(180deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.08) 100%)',
            boxShadow:
              'inset 0 1px 0 rgba(255,255,255,0.25), inset 0 -1px 0 rgba(0,0,0,0.4), 0 8px 24px rgba(0,0,0,0.4)',
            transform: 'translateZ(0.1px)',
          }}
          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
        />
      )}

      {/* active 3D ring orbiting under the link */}
      {isActive && (
        <motion.span
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-full -translate-x-1/2"
          style={{ transformStyle: 'preserve-3d' }}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <motion.span
            className="block h-[14px] w-[14px] rounded-full border border-white/70"
            style={{
              boxShadow: '0 0 12px rgba(255,255,255,0.6)',
              borderTopColor: 'transparent',
            }}
            animate={{ rotateZ: 360 }}
            transition={{ duration: 3, ease: 'linear', repeat: Infinity }}
          />
        </motion.span>
      )}

      {/* hover underline sweep */}
      <span
        aria-hidden
        className="absolute bottom-1 left-1/2 h-px w-0 -translate-x-1/2 bg-white/40 transition-all duration-500 group-hover:w-2/3"
      />
    </motion.button>
  )
}

export default function Nav() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const navRef = useRef<HTMLDivElement>(null)

  // mouse position drives a global tilt on the whole pill
  const pillMx = useMotionValue(0)
  const pillMy = useMotionValue(0)
  const pillRx = useSpring(useTransform(pillMy, [-0.5, 0.5], [4, -4]), {
    stiffness: 120,
    damping: 18,
  })
  const pillRy = useSpring(useTransform(pillMx, [-0.5, 0.5], [-4, 4]), {
    stiffness: 120,
    damping: 18,
  })

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

  const handlePillMove = useCallback(
    (e: React.MouseEvent) => {
      if (!navRef.current) return
      const r = navRef.current.getBoundingClientRect()
      pillMx.set((e.clientX - r.left) / r.width - 0.5)
      pillMy.set((e.clientY - r.top) / r.height - 0.5)
    },
    [pillMx, pillMy]
  )
  const handlePillLeave = useCallback(() => {
    pillMx.set(0)
    pillMy.set(0)
  }, [pillMx, pillMy])

  const scrollTo = (href: string) => {
    setIsMobileOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  // Section-index for the rotating mini-compass under the logo
  const activeIndex = useMemo(
    () => Math.max(
      0,
      navLinks.findIndex((l) => l.href.slice(1) === activeSection)
    ),
    [activeSection]
  )

  return (
    <>
      <motion.nav
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className="fixed left-0 right-0 top-0 z-50 flex justify-center px-4 pt-4 sm:pt-6"
      >
        <motion.div
          ref={navRef}
          onMouseMove={handlePillMove}
          onMouseLeave={handlePillLeave}
          style={{
            rotateX: pillRx,
            rotateY: pillRy,
            transformStyle: 'preserve-3d',
          }}
          animate={{
            // The pill morphs as you scroll: thinner/transparent at top,
            // chunky glass card with bottom shadow once you scroll.
            paddingTop: isScrolled ? 8 : 12,
            paddingBottom: isScrolled ? 8 : 12,
            boxShadow: isScrolled
              ? '0 24px 60px -20px rgba(0,0,0,0.9), inset 0 1px 0 rgba(255,255,255,0.08)'
              : '0 0 0 rgba(0,0,0,0)',
          }}
          transition={{ type: 'spring', stiffness: 180, damping: 22 }}
          className="relative flex w-full max-w-5xl items-center justify-between gap-2 rounded-2xl border border-white/10 px-3 sm:px-5"
        >
          {/* layered backgrounds for 3D depth */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-2xl"
            style={{
              background:
                isScrolled
                  ? 'linear-gradient(180deg, rgba(15,15,20,0.85) 0%, rgba(5,5,10,0.92) 100%)'
                  : 'linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.1) 100%)',
              backdropFilter: 'blur(24px) saturate(160%)',
              WebkitBackdropFilter: 'blur(24px) saturate(160%)',
              transform: 'translateZ(-1px)',
            }}
          />
          {/* subtle top highlight line */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-3 top-0 h-px"
            style={{
              background:
                'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.25) 50%, transparent 100%)',
            }}
          />

          {/* logo block */}
          <button
            onClick={() => scrollTo('#home')}
            className="relative z-10 flex items-center gap-2 rounded-xl px-2 py-1"
            data-cursor="link"
          >
            <LogoMark />
            <div className="flex flex-col leading-none">
              <span style={{ fontFamily: 'var(--font-cinzel)', fontSize: '0.75rem', letterSpacing: '0.22em', color: 'white' }}>
                RAMI
              </span>
              <span style={{ fontFamily: 'var(--font-cinzel)', fontSize: '0.5rem', letterSpacing: '0.32em', color: 'rgba(201,168,76,0.5)', marginTop: '2px' }}>
                MAALEJ
              </span>
            </div>
            {/* mini compass under the logo showing position in nav */}
            <div className="ml-1 hidden h-8 w-8 sm:grid place-items-center lg:grid">
              <motion.div
                className="relative h-7 w-7 rounded-full border border-white/15"
                animate={{ rotate: -activeIndex * (360 / navLinks.length) }}
                transition={{ type: 'spring', stiffness: 110, damping: 14 }}
              >
                {navLinks.map((l, i) => {
                  const angle = (i / navLinks.length) * Math.PI * 2
                  const x = Math.cos(angle) * 11
                  const y = Math.sin(angle) * 11
                  return (
                    <span
                      key={l.href}
                      className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full"
                      style={{
                        background:
                          i === activeIndex ? '#fff' : 'rgba(255,255,255,0.25)',
                        transform: `translate(${x}px, ${y}px)`,
                        boxShadow:
                          i === activeIndex
                            ? '0 0 8px rgba(255,255,255,0.8)'
                            : 'none',
                      }}
                    />
                  )
                })}
                {/* center needle */}
                <motion.span
                  className="absolute left-1/2 top-1/2 h-[1px] w-3 origin-left"
                  style={{
                    background:
                      'linear-gradient(90deg, rgba(255,255,255,0.9), transparent)',
                    transform: 'translate(-50%, -50%)',
                  }}
                  animate={{ rotate: activeIndex * (360 / navLinks.length) }}
                  transition={{ type: 'spring', stiffness: 110, damping: 14 }}
                />
              </motion.div>
            </div>
          </button>

          {/* center links */}
          <div className="relative z-10 hidden items-center md:flex">
            {navLinks.slice(1, navLinks.length - 1).map((link) => (
              <NavLink3D
                key={link.href}
                label={link.label}
                isActive={activeSection === link.href.slice(1)}
                onClick={() => scrollTo(link.href)}
              />
            ))}
          </div>

          {/* right side: contact CTA */}
          <motion.button
            onClick={() => scrollTo('#contact')}
            data-cursor="link"
            whileHover={{ y: -2, rotateX: -8 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 320, damping: 18 }}
            className="relative z-10 hidden md:block"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <span
              className="relative inline-flex items-center gap-2 overflow-hidden rounded-full px-5 py-2 text-sm font-medium text-black"
              style={{
                background:
                  'linear-gradient(180deg, #ffffff 0%, #e6e6e6 100%)',
                boxShadow:
                  'inset 0 1px 0 rgba(255,255,255,0.9), inset 0 -1px 0 rgba(0,0,0,0.15), 0 8px 24px rgba(255,255,255,0.18)',
              }}
            >
              <span>Let&apos;s Talk</span>
              <motion.span
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              >
                →
              </motion.span>
            </span>
          </motion.button>

          {/* mobile menu button */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="relative z-50 ml-auto flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white md:hidden"
            aria-label="Menu"
            data-cursor="link"
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={isMobileOpen ? 'x' : 'm'}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {isMobileOpen ? <X size={18} /> : <Menu size={18} />}
              </motion.span>
            </AnimatePresence>
          </button>
        </motion.div>
      </motion.nav>

      {/* mobile fullscreen menu */}
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
                initial={{ opacity: 0, y: 20, rotateX: -20 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => scrollTo(link.href)}
                className="text-3xl font-medium text-white/80 transition-colors hover:text-white"
                data-cursor="link"
              >
                <span className="text-sm text-white/30 mr-3">
                  0{i + 1}
                </span>
                {link.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
