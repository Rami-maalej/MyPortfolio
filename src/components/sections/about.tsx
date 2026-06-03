'use client'

import { motion } from 'framer-motion'
import { personalInfo } from '@/lib/data'
import { Code2, Palette, Zap, Sparkles } from 'lucide-react'
import Reveal from '@/components/ui/reveal'

const strengths = [
  { icon: Code2, label: 'Clean Architecture', desc: 'Event-driven microservices with Kafka & RabbitMQ' },
  { icon: Palette, label: 'Cinematic UI', desc: 'Apple-level polish with Framer Motion & Tailwind' },
  { icon: Zap, label: 'AI Integration', desc: 'Gemini AI, Ollama, and intelligent automation' },
  { icon: Sparkles, label: 'Full-Stack Mastery', desc: 'End-to-end delivery from database to deployment' },
]

function SectionSeparator() {
  return (
    <svg className="mx-auto h-px w-full max-w-6xl" viewBox="0 0 1200 1" preserveAspectRatio="none">
      <motion.line
        x1="0" y1="0" x2="1200" y2="0"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth="1"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
      />
    </svg>
  )
}

function StaggerReveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <Reveal delay={delay}>
      {children}
    </Reveal>
  )
}

export default function About() {
  return (
    <>
      <SectionSeparator />
      <section id="about" className="relative px-6 py-32">
        <div className="mx-auto max-w-7xl">
          <StaggerReveal>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-white/60 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
              About
            </div>
            <h2 className="fluid-heading mb-4 font-display text-white">
              The Developer<br />
              <span className="text-white/30 italic">Behind The Code</span>
            </h2>
            <p className="fluid-body max-w-2xl text-white/40" style={{ fontFeatureSettings: '"kern" 1, "liga" 1, "calt" 1' }}>
              {personalInfo.brandStatement}
            </p>
          </StaggerReveal>

          <div className="mt-16 grid gap-8 lg:grid-cols-2">
            <StaggerReveal delay={0.1}>
              <div className="glass-hover rounded-2xl p-8">
                <h3 className="mb-4 text-xl font-semibold text-white">Who I Am</h3>
                <p className="fluid-body text-white/60" style={{ fontFeatureSettings: '"kern" 1, "liga" 1, "calt" 1' }}>
                  {personalInfo.summary}
                </p>
                <div className="mt-8 grid grid-cols-2 gap-4 border-t border-white/10 pt-6">
                  {[
                    { label: 'Based in', value: 'Sfax, Tunisia' },
                    { label: 'Role', value: 'Full-Stack Developer' },
                    { label: 'Focus', value: 'Web & Mobile' },
                    { label: 'Passion', value: 'AI & Architecture' },
                  ].map((item) => (
                    <div key={item.label}>
                      <p className="fluid-small text-white/30">{item.label}</p>
                      <p className="text-sm font-medium text-white/80">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </StaggerReveal>

            <div className="grid grid-cols-2 gap-4">
              {strengths.map((s, i) => (
                <StaggerReveal key={s.label} delay={0.2 + i * 0.1}>
                  <div className="glass-hover group rounded-2xl p-6">
                    <s.icon className="mb-3 h-6 w-6 text-blue-400 transition-transform duration-500 group-hover:scale-110" />
                    <h4 className="mb-1 text-sm font-semibold text-white">{s.label}</h4>
                    <p className="fluid-small text-white/40">{s.desc}</p>
                  </div>
                </StaggerReveal>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
