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
          <div className="label-cinzel mb-5 inline-flex items-center gap-3 text-white/30">
            <span className="gold-dot" />
            Experience
          </div>
          <h2 className="fluid-heading mb-6 text-white">
            Professional<br />
            <span className="italic" style={{ color: 'transparent', WebkitTextStroke: '1px rgba(255,255,255,0.2)' }}>
              Journey
            </span>
          </h2>
          <p className="fluid-body max-w-xl text-white/35">
            Real-world experience building production-grade systems.
          </p>
        </Reveal>

        <div className="relative mt-20">
          {/* Animated timeline line — gold gradient */}
          <svg className="absolute left-8 top-0 h-full w-px max-md:left-4" viewBox="0 0 1 500" preserveAspectRatio="none">
            <motion.line
              x1="0" y1="0" x2="0" y2="500"
              stroke="rgba(201,168,76,0.12)"
              strokeWidth="1"
              style={{ pathLength }}
            />
            <motion.line
              x1="0" y1="0" x2="0" y2="500"
              stroke="url(#timelineGradGold)"
              strokeWidth="1.5"
              style={{ pathLength }}
            />
            <defs>
              <linearGradient id="timelineGradGold" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#c9a84c" />
                <stop offset="100%" stopColor="#e8d5a3" stopOpacity="0.4" />
              </linearGradient>
            </defs>
          </svg>

          <div className="space-y-14 overflow-hidden">
            {experiences.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-15% 0px' }}
                transition={{ duration: 0.9, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className={`relative pl-20 max-md:pl-14 ${i % 2 === 1 ? 'lg:ml-20' : ''}`}
              >
                {/* Gold timeline dot */}
                <div
                  className="absolute left-[27px] top-2 h-4 w-4 rounded-full border-2 max-md:left-[11px]"
                  style={{
                    borderColor: '#c9a84c',
                    background: '#000',
                    boxShadow: '0 0 12px rgba(201,168,76,0.4), 0 0 24px rgba(201,168,76,0.15)',
                  }}
                />

                <motion.div
                  whileHover={{ y: -4, rotateX: 2 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                  className="glass-hover rounded-2xl p-7"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(1.3rem, 1.5vw, 1.7rem)', color: 'white', fontWeight: 500 }}>
                        {exp.role}
                      </h3>
                      <p style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.1rem', color: 'rgba(255,255,255,0.45)' }}>
                        {exp.company} &middot; {exp.location}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <span className="rounded-full px-3 py-1 label-cinzel" style={{ background: 'rgba(201,168,76,0.08)', color: 'rgba(201,168,76,0.7)', border: '1px solid rgba(201,168,76,0.15)' }}>
                        {exp.type}
                      </span>
                      <span className="label-cinzel text-white/25">{exp.period}</span>
                    </div>
                  </div>

                  <ul className="space-y-3">
                    {exp.achievements.map((ach, j) => (
                      <motion.li
                        key={j}
                        initial={{ opacity: 0, x: -16 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + j * 0.1, ease: [0.16, 1, 0.3, 1] }}
                        className="flex gap-3"
                        style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.05rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}
                      >
                        <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full flex-shrink-0" style={{ background: 'rgba(201,168,76,0.7)' }} />
                        {ach}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
