'use client'

import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { projects } from '@/lib/data'
import { ExternalLink, ChevronRight } from 'lucide-react'
import Reveal from '@/components/ui/reveal'

function ProjectCard({ project, index, isActive, onToggle }: {
  project: typeof projects[0]
  index: number
  isActive: boolean
  onToggle: () => void
}) {
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -16
    cardRef.current.style.transform = `perspective(800px) rotateX(${y}deg) rotateY(${x}deg) translateZ(8px)`
  }, [])

  const handleMouseLeave = useCallback(() => {
    if (!cardRef.current) return
    cardRef.current.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateZ(0px)'
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-15% 0px' }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="mb-6 break-inside-avoid"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="group relative cursor-pointer overflow-hidden rounded-2xl transition-shadow duration-500"
        style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
      >
        {/* Gradient overlay on hover */}
        <div
          className={`absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-15 bg-gradient-to-br ${project.gradient}`}
        />

        {/* Gold edge glow on hover */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ boxShadow: 'inset 0 0 0 1px rgba(201,168,76,0.15)' }}
        />

        <div className="glass-hover relative p-7">
          {/* Header */}
          <div className="mb-5 flex items-start justify-between gap-3">
            <span
              className="rounded-full px-3 py-1 label-cinzel"
              style={{ background: 'rgba(201,168,76,0.07)', color: 'rgba(201,168,76,0.6)', border: '1px solid rgba(201,168,76,0.12)' }}
            >
              {project.date}
            </span>
            <ExternalLink
              size={15}
              className="transition-colors duration-300"
              style={{ color: 'rgba(255,255,255,0.25)' }}
            />
          </div>

          <h3
            className="mb-2 text-white"
            style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(1.3rem, 1.5vw, 1.8rem)', fontWeight: 500 }}
          >
            {project.title}
          </h3>
          <p
            className="mb-5"
            style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.05rem', color: 'rgba(255,255,255,0.42)', lineHeight: 1.6 }}
          >
            {project.description}
          </p>

          {/* Tech tags */}
          <div className="mb-5 flex flex-wrap gap-2">
            {project.tech.map((t, ti) => (
              <motion.span
                key={t}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + ti * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-full px-3 py-1 label-cinzel text-white/35"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', fontSize: '0.55rem' }}
              >
                {t}
              </motion.span>
            ))}
          </div>

          {/* Expand button */}
          <button
            onClick={onToggle}
            className="inline-flex items-center gap-1 label-cinzel transition-colors hover:opacity-100"
            style={{ color: 'rgba(201,168,76,0.6)', fontSize: '0.6rem' }}
            data-cursor="link"
          >
            {isActive ? 'Show less' : 'Show details'}
            <ChevronRight
              size={12}
              className={`transition-transform duration-300 ${isActive ? 'rotate-90' : ''}`}
            />
          </button>

          {/* Expandable highlights */}
          <AnimatePresence>
            {isActive && (
              <motion.ul
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="mt-5 space-y-3 overflow-hidden border-t pt-5"
                style={{ borderColor: 'rgba(201,168,76,0.1)' }}
              >
                {project.highlights.map((h, j) => (
                  <li
                    key={j}
                    className="flex gap-3"
                    style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.7 }}
                  >
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full flex-shrink-0" style={{ background: 'rgba(201,168,76,0.6)' }} />
                    {h}
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  return (
    <section id="projects" className="relative px-6 py-32">
      {/* Background marquee watermark */}
      <div className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none overflow-hidden opacity-[0.015]">
        <div className="flex animate-marquee gap-12 text-8xl font-bold uppercase tracking-tighter text-white whitespace-nowrap w-max"
          style={{ fontFamily: 'var(--font-cinzel)' }}>
          {[...projects, ...projects].map((p, i) => (
            <span key={i}>{p.title}</span>
          ))}
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl">
        <Reveal>
          <div className="label-cinzel mb-5 inline-flex items-center gap-3 text-white/30">
            <span className="gold-dot" />
            Projects
          </div>
          <h2 className="fluid-heading mb-6 text-white">
            Featured<br />
            <span className="italic" style={{ color: 'transparent', WebkitTextStroke: '1px rgba(255,255,255,0.2)' }}>
              Work
            </span>
          </h2>
          <p className="fluid-body max-w-xl text-white/35">
            Real projects that showcase my ability to deliver end-to-end solutions.
          </p>
        </Reveal>

        <div className="mt-16 columns-1 gap-6 md:columns-2 lg:columns-3">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={i}
              isActive={activeIndex === i}
              onToggle={() => setActiveIndex(activeIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
