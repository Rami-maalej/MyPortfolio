'use client'

import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { skills } from '@/lib/data'
import { Code2, Server, Database, Languages, Wrench, Cloud } from 'lucide-react'
import Reveal from '@/components/ui/reveal'

const categories = [
  { key: 'frontend' as const, label: 'Frontend', icon: Code2 },
  { key: 'backend' as const, label: 'Backend', icon: Server },
  { key: 'database' as const, label: 'Databases', icon: Database },
  { key: 'languages' as const, label: 'Languages', icon: Languages },
  { key: 'tools' as const, label: 'Tools', icon: Wrench },
  { key: 'ai-cloud' as const, label: 'AI & Cloud', icon: Cloud },
]

function SkillCard({ name, level, index }: { name: string; level: number; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -20
    const px = ((e.clientX - rect.left) / rect.width) * 100
    const py = ((e.clientY - rect.top) / rect.height) * 100
    cardRef.current.style.transform = `perspective(600px) rotateX(${y}deg) rotateY(${x}deg) translateZ(6px)`
    cardRef.current.style.setProperty('--mouse-x', `${px}%`)
    cardRef.current.style.setProperty('--mouse-y', `${py}%`)
  }, [])

  const handleMouseLeave = useCallback(() => {
    if (!cardRef.current) return
    cardRef.current.style.transform = 'perspective(600px) rotateX(0deg) rotateY(0deg) translateZ(0px)'
  }, [])

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, ease: [0.16, 1, 0.3, 1], duration: 0.6 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="glass-hover relative overflow-hidden rounded-2xl p-6 transition-shadow duration-300"
      style={{
        background: `radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(201,168,76,0.06) 0%, transparent 60%)`,
        transformStyle: 'preserve-3d',
        willChange: 'transform',
      }}
    >
      <div className="mb-4 flex items-center justify-between">
        <span className="text-white" style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.2rem', fontWeight: 500 }}>
          {name}
        </span>
        <span className="label-cinzel" style={{ color: 'rgba(201,168,76,0.6)' }}>{level}%</span>
      </div>
      <div className="h-px overflow-hidden rounded-full" style={{ background: 'rgba(255,255,255,0.07)' }}>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
          className="h-full rounded-full"
          style={{
            background: 'linear-gradient(90deg, rgba(201,168,76,0.6), rgba(232,213,163,0.9))',
            boxShadow: '0 0 8px rgba(201,168,76,0.3)',
          }}
        />
      </div>
    </motion.div>
  )
}

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<string>('frontend')
  const filtered = skills.filter((s) => s.category === activeCategory)

  return (
    <section id="skills" className="relative px-6 py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="label-cinzel mb-5 inline-flex items-center gap-3 text-white/30">
            <span className="gold-dot" />
            Skills
          </div>
          <h2 className="fluid-heading mb-6 text-white">
            Technical<br />
            <span className="italic" style={{ color: 'transparent', WebkitTextStroke: '1px rgba(255,255,255,0.2)' }}>
              Arsenal
            </span>
          </h2>
          <p className="fluid-body max-w-xl text-white/35">
            A comprehensive toolkit honed through real-world projects and continuous learning.
          </p>
        </Reveal>

        {/* Category filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="mb-12 mt-14 flex flex-wrap justify-center gap-3"
        >
          {categories.map((cat) => {
            const Icon = cat.icon
            const isActive = activeCategory === cat.key
            return (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 transition-all duration-500"
                style={{
                  fontFamily: 'var(--font-cinzel)',
                  fontSize: '0.6rem',
                  letterSpacing: '0.2em',
                  ...(isActive
                    ? {
                        background: 'linear-gradient(135deg, #c9a84c, #e8d5a3)',
                        color: '#000',
                        boxShadow: '0 4px 20px rgba(201,168,76,0.3)',
                      }
                    : {
                        background: 'rgba(255,255,255,0.04)',
                        color: 'rgba(255,255,255,0.45)',
                        border: '1px solid rgba(255,255,255,0.08)',
                      }),
                }}
                data-cursor="link"
              >
                <Icon size={14} />
                {cat.label}
              </button>
            )
          })}
        </motion.div>

        {/* Skills grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {filtered.map((skill, i) => (
              <SkillCard key={skill.name} name={skill.name} level={skill.level} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
