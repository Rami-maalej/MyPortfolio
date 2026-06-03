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

function SpecularCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    cardRef.current.style.setProperty('--mouse-x', `${x}%`)
    cardRef.current.style.setProperty('--mouse-y', `${y}%`)
  }, [])

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`glass-hover relative overflow-hidden rounded-2xl p-5 transition-all duration-300 ${className}`}
      style={{
        background: `radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.06) 0%, transparent 60%)`,
      }}
    >
      {children}
    </div>
  )
}

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<string>('frontend')
  const filtered = skills.filter((s) => s.category === activeCategory)

  return (
    <section id="skills" className="relative px-6 py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-white/60 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
            Skills
          </div>
          <h2 className="fluid-heading mb-4 font-display text-white">
            Technical<br />
            <span className="text-white/30 italic">Arsenal</span>
          </h2>
          <p className="fluid-body max-w-2xl text-white/40">
            A comprehensive toolkit honed through real-world projects and continuous learning.
          </p>
        </Reveal>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="mb-10 mt-12 flex flex-wrap justify-center gap-2"
        >
          {categories.map((cat) => {
            const Icon = cat.icon
            const isActive = activeCategory === cat.key
            return (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-500 ${
                  isActive
                    ? 'bg-white text-black shadow-lg'
                    : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white'
                }`}
                data-cursor="link"
              >
                <Icon size={16} />
                {cat.label}
              </button>
            )
          })}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {filtered.map((skill, i) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              >
                <SpecularCard>
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-sm font-medium text-white">{skill.name}</span>
                    <span className="fluid-small text-white/30">{skill.level}%</span>
                  </div>
                  <div className="h-1 overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                      className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                    />
                  </div>
                </SpecularCard>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
