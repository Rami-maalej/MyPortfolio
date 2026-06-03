'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { projects } from '@/lib/data'
import { ExternalLink, ChevronRight } from 'lucide-react'
import Reveal from '@/components/ui/reveal'

export default function Projects() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  return (
    <section id="projects" className="relative px-6 py-32">
      <div className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none overflow-hidden opacity-[0.02]">
        <div className="flex animate-marquee gap-12 text-8xl font-bold uppercase tracking-tighter text-white whitespace-nowrap w-max">
          {[...projects, ...projects].map((p, i) => (
            <span key={i}>{p.title}</span>
          ))}
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl">
        <Reveal>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-white/60 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
            Projects
          </div>
          <h2 className="fluid-heading mb-4 font-display text-white">
            Featured<br />
            <span className="text-white/30 italic">Work</span>
          </h2>
          <p className="fluid-body max-w-2xl text-white/40">
            Real projects that showcase my ability to deliver end-to-end solutions.
          </p>
        </Reveal>

        <div className="mt-16 columns-1 gap-6 md:columns-2 lg:columns-3">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-15% 0px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={`mb-6 break-inside-avoid ${i === 0 || i === 3 ? 'md:col-span-2' : ''}`}
            >
              <div className="group relative cursor-pointer overflow-hidden rounded-2xl">
                <div
                  className={`absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-700 group-hover:opacity-20 ${project.gradient}`}
                />
                <div
                  className="glass-hover relative p-6 transition-all duration-500"
                  style={{
                    clipPath: activeIndex === i ? 'inset(0)' : 'inset(0)',
                  }}
                >
                  <div className="mb-4 flex items-center justify-between">
                    <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/50">
                      {project.date}
                    </span>
                    <ExternalLink size={16} className="text-white/30 transition-colors group-hover:text-white" />
                  </div>

                  <h3 className="mb-1 text-lg font-semibold text-white">{project.title}</h3>
                  <p className="mb-4 text-sm text-white/50">{project.description}</p>

                  <div className="mb-4 flex flex-wrap gap-2">
                    {project.tech.map((t, ti) => (
                      <motion.span
                        key={t}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + ti * 0.05, ease: [0.16, 1, 0.3, 1] }}
                        className="rounded-full bg-white/5 px-2.5 py-1 text-xs text-white/40"
                      >
                        {t}
                      </motion.span>
                    ))}
                  </div>

                  <button
                    onClick={() => setActiveIndex(activeIndex === i ? null : i)}
                    className="inline-flex items-center gap-1 text-xs font-medium text-blue-400 transition-colors hover:text-blue-300"
                    data-cursor="link"
                  >
                    {activeIndex === i ? 'Show less' : 'Show details'}
                    <ChevronRight
                      size={14}
                      className={`transition-transform duration-300 ${activeIndex === i ? 'rotate-90' : ''}`}
                    />
                  </button>

                  <AnimatePresence>
                    {activeIndex === i && (
                      <motion.ul
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="mt-4 space-y-2 overflow-hidden border-t border-white/10 pt-4"
                      >
                        {project.highlights.map((h, j) => (
                          <li key={j} className="flex gap-2 text-xs text-white/50">
                            <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-blue-400" />
                            {h}
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
