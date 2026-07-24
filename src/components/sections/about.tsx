'use client'

import { motion } from 'framer-motion'
import { Code2, Palette, Zap, Sparkles, MapPin, Coffee, Music, Cpu } from 'lucide-react'
import Reveal from '@/components/ui/reveal'
import dynamic from 'next/dynamic'

const PortraitCanvas = dynamic(
  () => import('@/components/threed/portrait-scene'),
  { ssr: false }
)

const strengths = [
  { icon: Code2, label: 'Clean Architecture', desc: 'Event-driven microservices with Kafka & RabbitMQ' },
  { icon: Palette, label: 'Cinematic UI', desc: 'Apple-level polish with Framer Motion & Three.js' },
  { icon: Zap, label: 'AI Integration', desc: 'Gemini AI, Ollama, and intelligent automation' },
  { icon: Sparkles, label: 'Full-Stack Mastery', desc: 'End-to-end delivery from database to deployment' },
]

const personalFacts = [
  { icon: MapPin, label: 'Based in', value: 'Sfax, Tunisia' },
  { icon: Cpu, label: 'Currently', value: 'Building with AI' },
  { icon: Coffee, label: 'Fueled by', value: 'Espresso & Lo-fi' },
  { icon: Music, label: 'On Rotation', value: 'Hans Zimmer Scores' },
]

export default function About() {
  return (
    <>
      {/* Gold separator line */}
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="gold-line origin-left"
        />
      </div>

      <section id="about" className="relative px-6 py-32">
        <div className="mx-auto max-w-7xl">

          {/* Section header */}
          <Reveal>
            <div className="label-cinzel mb-5 inline-flex items-center gap-3 text-white/30">
              <span className="gold-dot" />
              About
            </div>
            <h2 className="fluid-heading mb-6 text-white">
              The Developer<br />
              <span className="italic" style={{ color: 'transparent', WebkitTextStroke: '1px rgba(255,255,255,0.2)' }}>
                Behind The Code
              </span>
            </h2>
            <p className="fluid-body max-w-xl text-white/35">
              Bridging elegant design and robust engineering to create digital experiences that inspire and perform.
            </p>
          </Reveal>

          {/* WHO I AM */}
          <Reveal delay={0.12}>
            <div className="mt-20 grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
              {/* Left: narrative */}
              <div className="glass-hover relative overflow-hidden rounded-2xl p-8 sm:p-12">
                {/* Corner ornament */}
                <div className="pointer-events-none absolute right-6 top-6 opacity-20">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <path d="M16 2 L30 16 L16 30 L2 16 Z" stroke="#c9a84c" strokeWidth="0.8" />
                    <path d="M16 8 L24 16 L16 24 L8 16 Z" stroke="#c9a84c" strokeWidth="0.6" />
                    <circle cx="16" cy="16" r="2" fill="#c9a84c" />
                  </svg>
                </div>

                <div className="mb-6 flex items-center gap-3">
                  <span className="label-cinzel text-white/30">01 — Who I Am</span>
                  <span className="h-px flex-1 bg-white/8" />
                </div>

                <h3 className="mb-6 text-4xl text-white sm:text-5xl" style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300 }}>
                  Hi, I&apos;m Rami.
                </h3>

                <div className="space-y-5 text-white/55" style={{ fontSize: 'clamp(1.1rem, 0.6vw + 0.85rem, 1.35rem)', lineHeight: 1.8, fontFamily: 'var(--font-cormorant)' }}>
                  <p>
                    I&apos;m a <span className="text-white font-medium">Full-Stack Developer</span> and
                    Computer Science graduate based in Sfax, Tunisia. I build
                    scalable web and mobile applications where clean architecture
                    meets cinematic interface design.
                  </p>
                  <p>
                    My work spans <span className="text-white font-medium">React, Node.js, Flutter, and AI</span>.
                    I&apos;ve shipped production systems handling 500+ student
                    records, language-learning platforms powered by Google Gemini,
                    and custom IDEs with on-device AI code generation.
                  </p>
                  <p>
                    What drives me is the <span className="text-white font-medium">craft</span> — the
                    perfect transition, the API that documents itself, the schema
                    that scales without drama. I care about the architecture <em>and</em> the animation curve.
                  </p>
                </div>

                {/* Gold signature */}
                <div className="mt-10 flex items-center gap-4 border-t pt-8" style={{ borderColor: 'rgba(201,168,76,0.12)' }}>
                  <span style={{ fontFamily: 'var(--font-cormorant)', fontSize: '2rem', fontStyle: 'italic', color: 'rgba(201,168,76,0.5)' }}>
                    — Rami M.
                  </span>
                  <span className="h-px flex-1" style={{ background: 'rgba(201,168,76,0.15)' }} />
                  <span className="label-cinzel text-white/20">2026 · TN</span>
                </div>
              </div>

              {/* Right: portrait + facts */}
              <div className="flex flex-col gap-6">
                <div className="glass-hover relative aspect-[4/5] overflow-hidden rounded-2xl">
                  <div className="absolute inset-0">
                    <PortraitCanvas />
                  </div>
                  <div className="pointer-events-none absolute left-4 top-4 z-10 flex items-center gap-2 rounded-full border px-3 py-1 backdrop-blur-md"
                    style={{ borderColor: 'rgba(201,168,76,0.25)', background: 'rgba(0,0,0,0.6)' }}>
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/60 opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
                    </span>
                    <span className="label-cinzel text-white/60">Available for work</span>
                  </div>
                  <div className="pointer-events-none absolute bottom-4 right-4 z-10 label-cinzel text-white/25 flex items-center gap-2">
                    <span>Live</span>
                    <span className="h-px w-5" style={{ background: 'rgba(201,168,76,0.3)' }} />
                    <span>3D</span>
                  </div>
                </div>

                {/* Personal facts */}
                <div className="glass-hover rounded-2xl p-6">
                  <div className="label-cinzel mb-5 text-white/30">At a Glance</div>
                  <div className="grid grid-cols-2 gap-5">
                    {personalFacts.map((f) => (
                      <div key={f.label} className="flex items-start gap-3">
                        <f.icon className="mt-0.5 h-4 w-4 shrink-0" style={{ color: 'rgba(201,168,76,0.5)' }} />
                        <div className="min-w-0">
                          <p className="label-cinzel text-white/25 mb-1">{f.label}</p>
                          <p className="truncate text-white/70" style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1rem' }}>
                            {f.value}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* WHAT I DO — strengths grid */}
          <div className="mt-24">
            <Reveal delay={0.15}>
              <div className="mb-10 flex items-end justify-between">
                <div>
                  <div className="label-cinzel mb-3 text-white/30">02 — What I Do</div>
                  <h3 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(1.8rem, 2.5vw, 2.8rem)', color: 'white', fontWeight: 400 }}>
                    Four Pillars
                  </h3>
                </div>
                <div className="hidden label-cinzel text-white/20 sm:block">04 core strengths</div>
              </div>
            </Reveal>

            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {strengths.map((s, i) => (
                <Reveal key={s.label} delay={0.2 + i * 0.08}>
                  <motion.div
                    whileHover={{ y: -6, rotateX: 4, rotateY: -4 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="glass-hover group h-full rounded-2xl p-6"
                    style={{ transformStyle: 'preserve-3d', transformOrigin: 'center bottom' }}
                  >
                    <s.icon className="mb-4 h-5 w-5 transition-all duration-500 group-hover:scale-110"
                      style={{ color: 'rgba(201,168,76,0.6)' }} />
                    <h4 className="mb-2 text-white" style={{ fontFamily: 'var(--font-cinzel)', fontSize: '0.65rem', letterSpacing: '0.2em' }}>
                      {s.label}
                    </h4>
                    <p style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.05rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.6 }}>
                      {s.desc}
                    </p>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
