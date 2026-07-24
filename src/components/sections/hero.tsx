'use client'

import { useRef, useMemo, useCallback } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import dynamic from 'next/dynamic'

const ParticleScene = dynamic(() => import('@/components/threed/hero-scene'), { ssr: false })
const FloatingCrystal = dynamic(() => import('@/components/threed/floating-crystal'), { ssr: false })

function MagneticButton({ children, href }: { children: React.ReactNode; href: string }) {
  const ref = useRef<HTMLAnchorElement>(null)

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    const dist = Math.sqrt(x * x + y * y)
    if (dist > 80) return
    const strength = (80 - dist) / 80
    ref.current.style.transform = `translate(${x * strength * 0.35}px, ${y * strength * 0.35}px)`
  }, [])

  const handleMouseLeave = useCallback(() => {
    if (!ref.current) return
    ref.current.style.transform = 'translate(0, 0)'
  }, [])

  return (
    <a
      ref={ref}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-block transition-transform duration-300 ease-out"
      data-cursor="link"
    >
      {children}
    </a>
  )
}

function LetterReveal({ text, delay = 0, className = '' }: { text: string; delay?: number; className?: string }) {
  return (
    <span className={`inline-block ${className}`}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          initial={{ y: '110%', opacity: 0, rotateX: -60 }}
          animate={{ y: 0, opacity: 1, rotateX: 0 }}
          transition={{
            duration: 0.9,
            delay: delay + i * 0.04,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="inline-block"
          style={{ transformOrigin: 'bottom center', transformStyle: 'preserve-3d' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  )
}

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.85])
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -80])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  const crystalY = useTransform(scrollYProgress, [0, 1], [0, 120])

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6"
    >
      {/* Particle background */}
      <div className="absolute inset-0 z-0">
        <ParticleScene />
      </div>

      {/* Floating 3D crystal — top right, parallax on scroll */}
      <motion.div
        style={{ y: crystalY }}
        className="pointer-events-none absolute right-[5vw] top-[15vh] z-[2] hidden h-[280px] w-[280px] lg:block opacity-70"
      >
        <FloatingCrystal />
      </motion.div>

      {/* Gold rule lines — decorative frame */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-none absolute left-0 right-0 top-1/4 h-px origin-left"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.08), transparent)' }}
      />
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-none absolute left-0 right-0 bottom-1/4 h-px origin-right"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.06), transparent)' }}
      />

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
        style={{ scale: heroScale, y: heroY, opacity: heroOpacity }}
        className="relative z-10 mx-auto max-w-6xl text-center"
      >
        {/* Eyebrow — Cinzel label */}
        <motion.div
          initial={{ opacity: 0, letterSpacing: '0.8em' }}
          animate={{ opacity: 1, letterSpacing: '0.45em' }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          className="label-cinzel mb-8 inline-flex items-center gap-4 text-white/35"
        >
          <span className="gold-line w-10 inline-block" style={{ height: '1px' }} />
          <span>Full-Stack Developer &amp; AI Architect</span>
          <span className="gold-line w-10 inline-block" style={{ height: '1px' }} />
        </motion.div>

        {/* Main name — giant Cormorant */}
        <div className="overflow-hidden mb-1">
          <h1
            className="fluid-heading"
            style={{
              transformStyle: 'preserve-3d',
              textShadow: '0 0 60px rgba(255,255,255,0.06), 0 0 120px rgba(201,168,76,0.04)',
            }}
          >
            <LetterReveal text="Rami" delay={0.5} />
          </h1>
        </div>
        <div className="overflow-hidden mb-4">
          <h1
            className="fluid-heading gold-text"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <LetterReveal text="Maalej" delay={0.72} />
          </h1>
        </div>

        {/* Tagline */}
        <div className="mb-8 overflow-hidden">
          <motion.p
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 1.4 }}
            className="fluid-subheading text-white/50 mx-auto max-w-2xl"
          >
            Building scalable systems &amp; cinematic digital experiences
          </motion.p>
        </div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 1.6 }}
          className="fluid-body mx-auto mb-14 max-w-lg text-white/40"
        >
          At the intersection of code, cosmos &amp; intelligence.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 1.8 }}
          className="flex flex-wrap items-center justify-center gap-5"
        >
          <MagneticButton href="#projects">
            <span
              className="inline-flex items-center gap-3 rounded-full px-9 py-4 text-sm font-medium text-black transition-all duration-500 hover:shadow-2xl"
              style={{
                background: 'linear-gradient(135deg, #e8d5a3 0%, #c9a84c 50%, #e8d5a3 100%)',
                backgroundSize: '200% auto',
                fontFamily: 'var(--font-cinzel)',
                letterSpacing: '0.18em',
                fontSize: '0.7rem',
                boxShadow: '0 8px 32px rgba(201,168,76,0.25)',
              }}
            >
              View My Work
            </span>
          </MagneticButton>
          <MagneticButton href="#contact">
            <span
              className="inline-flex items-center gap-3 rounded-full border px-9 py-4 text-sm font-medium text-white/80 backdrop-blur-sm transition-all duration-500 hover:border-[rgba(201,168,76,0.4)] hover:text-white"
              style={{
                borderColor: 'rgba(201,168,76,0.2)',
                background: 'rgba(201,168,76,0.04)',
                fontFamily: 'var(--font-cinzel)',
                letterSpacing: '0.18em',
                fontSize: '0.7rem',
              }}
            >
              Get In Touch
            </span>
          </MagneticButton>
        </motion.div>

        {/* Bottom meta */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.2 }}
          className="label-cinzel mt-16 flex items-center justify-center gap-6 text-white/20"
        >
          <span>Sfax, Tunisia</span>
          <span className="gold-dot inline-block" />
          <span>14.7424° N, 10.7453° E</span>
          <span className="gold-dot inline-block" />
          <span>2026</span>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="label-cinzel text-white/20">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="h-8 w-px"
          style={{ background: 'linear-gradient(to bottom, rgba(201,168,76,0.4), transparent)' }}
        />
      </motion.div>
    </section>
  )
}
