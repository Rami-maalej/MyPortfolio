'use client'

import { useRef, useMemo, useCallback } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import ParticleScene from '@/components/threed/hero-scene'

function MagneticButton({ children, href }: { children: React.ReactNode; href: string }) {
  const ref = useRef<HTMLAnchorElement>(null)

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    const dist = Math.sqrt(x * x + y * y)
    if (dist > 60) return
    const strength = (60 - dist) / 60
    ref.current.style.transform = `translate(${x * strength * 0.3}px, ${y * strength * 0.3}px)`
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
      className="inline-block transition-transform duration-200 ease-out"
      data-cursor="link"
    >
      {children}
    </a>
  )
}

function WordReveal({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <span className="inline-block overflow-hidden">
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          initial={{ y: '100%', rotateX: -40 }}
          animate={{ y: 0, rotateX: 0 }}
          transition={{ duration: 0.6, delay: delay + i * 0.03, ease: [0.16, 1, 0.3, 1] }}
          className="inline-block"
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
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.8])
  const heroBlur = useTransform(scrollYProgress, [0, 0.8], [0, 6])

  const nameLetters = useMemo(() => 'Rami Maalej'.split(''), [])

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6"
    >
      <div className="pointer-events-none absolute inset-0">
        <ParticleScene />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        style={{ scale: heroScale, filter: heroBlur }}
        className="relative z-10 mx-auto max-w-5xl text-center"
      >
        <h1 className="fluid-heading mb-4 text-white">
          {nameLetters.map((char, i) => (
            <WordReveal key={i} text={char} delay={0.5 + i * 0.04} />
          ))}
        </h1>

        <div className="mb-10 overflow-hidden">
          <motion.p
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 1.2 }}
            className="fluid-subheading font-display text-white/40 italic"
          >
            Full-Stack Developer & AI Architect
          </motion.p>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 1.4 }}
          className="fluid-body mx-auto mb-12 max-w-xl text-white/40"
          style={{ fontFeatureSettings: '"kern" 1, "liga" 1, "calt" 1' }}
        >
          Crafting scalable systems and cinematic digital experiences with React, Node.js, and AI.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 1.6 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <MagneticButton href="#projects">
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-medium text-black transition-all duration-300 hover:shadow-2xl hover:shadow-white/20">
              View My Work
            </span>
          </MagneticButton>
          <MagneticButton href="#contact">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 py-4 text-sm font-medium text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/10">
              Get In Touch
            </span>
          </MagneticButton>
        </motion.div>
      </motion.div>
    </section>
  )
}
