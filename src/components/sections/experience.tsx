'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { experiences } from '@/lib/data'
import Reveal from '@/components/ui/reveal'

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start center', 'end center'],
  })
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section id="experience" ref={sectionRef} className="relative px-6 py-32">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-white/60 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
            Experience
          </div>
          <h2 className="fluid-heading mb-4 font-display text-white">
            Professional<br />
            <span className="text-white/30 italic">Journey</span>
          </h2>
          <p className="fluid-body max-w-2xl text-white/40">
            Real-world experience building production-grade systems.
          </p>
        </Reveal>

        <div className="relative mt-16">
          <svg className="absolute left-8 top-0 h-full w-px max-md:left-4" viewBox="0 0 1 500" preserveAspectRatio="none">
            <motion.line
              x1="0" y1="0" x2="0" y2="500"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="1"
              style={{ pathLength }}
            />
            <motion.line
              x1="0" y1="0" x2="0" y2="500"
              stroke="url(#timelineGrad)"
              strokeWidth="1.5"
              style={{ pathLength }}
            />
            <defs>
              <linearGradient id="timelineGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>
            </defs>
          </svg>

          <div className="space-y-12 overflow-hidden">
            {experiences.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-15% 0px' }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className={`relative pl-20 max-md:pl-14 ${i % 2 === 1 ? 'lg:ml-24' : ''}`}
              >
                <div className="absolute left-[27px] top-1 h-4 w-4 rounded-full border-2 border-blue-400 bg-black shadow-[0_0_12px_rgba(99,102,241,0.3)] max-md:left-[11px]" />

                <div className="glass-hover rounded-2xl p-6">
                  <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-white">{exp.role}</h3>
                      <p className="text-sm text-white/50">
                        {exp.company} &middot; {exp.location}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/60">
                        {exp.type}
                      </span>
                      <span className="text-xs text-white/30">{exp.period}</span>
                    </div>
                  </div>

                  <ul className="space-y-3">
                    {exp.achievements.map((ach, j) => (
                      <motion.li
                        key={j}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + j * 0.1, ease: [0.16, 1, 0.3, 1] }}
                        className="flex gap-3 text-sm text-white/60"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                        {ach}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
