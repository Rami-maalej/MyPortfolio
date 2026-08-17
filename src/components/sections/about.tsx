'use client'

import { motion } from 'framer-motion'
import { Code2, Palette, Zap, Sparkles } from 'lucide-react'
import Reveal from '@/components/ui/reveal'

const strengths = [
  { icon: Code2, label: 'Clean Architecture', desc: 'Reliable APIs, clear data models and maintainable services.' },
  { icon: Palette, label: 'Clear Interfaces', desc: 'Simple, accessible interfaces that help people complete tasks.' },
  { icon: Zap, label: 'AI Integration', desc: 'Practical AI features that improve products and workflows.' },
  { icon: Sparkles, label: 'End-to-End Delivery', desc: 'From product idea and database design to deployment.' },
]

export default function About() {
  return (
    <>
      <div className="mx-auto max-w-6xl px-6"><div className="gold-line origin-left" /></div>

      <section id="about" className="relative px-6 py-32">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="label-cinzel mb-5 text-white/40">About</div>
            <h2 className="fluid-heading mb-6 text-white">The developer<br /><span className="italic text-white/70">behind the code.</span></h2>
            <p className="fluid-body max-w-xl text-white/55">I build useful digital products with clear interfaces, dependable architecture and a focus on real user needs.</p>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="mt-20 max-w-4xl border border-white/10 bg-black p-8 sm:p-12">
              <div className="mb-8 flex items-center gap-4"><span className="label-cinzel text-white/35">01 — Who I am</span><span className="h-px flex-1 bg-white/10" /></div>
              <h3 className="mb-7 text-4xl text-white sm:text-5xl" style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300 }}>Hi, I&apos;m Rami.</h3>
              <div className="space-y-5 text-white/65" style={{ fontSize: 'clamp(1.05rem, 0.5vw + 0.85rem, 1.25rem)', lineHeight: 1.75, fontFamily: 'var(--font-cormorant)' }}>
                <p>I&apos;m a <span className="font-medium text-white">full-stack developer</span> and computer science graduate based in Sfax, Tunisia. I create web and mobile applications that are reliable, fast and easy to use.</p>
                <p>I work with <span className="font-medium text-white">React, Next.js, Node.js, Flutter and AI tools</span>. My experience includes education platforms, retail systems, language-learning products and developer tools.</p>
                <p>I care about simple solutions, readable code and interfaces that communicate clearly. My goal is to turn complex requirements into products people can use with confidence.</p>
              </div>
            </div>
          </Reveal>

          <div className="mt-24">
            <Reveal delay={0.15}><div className="mb-10 flex items-end justify-between"><div><div className="label-cinzel mb-3 text-white/35">02 — What I do</div><h3 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(1.8rem, 2.5vw, 2.8rem)', color: 'white', fontWeight: 400 }}>How I contribute</h3></div><div className="hidden label-cinzel text-white/25 sm:block">04 core strengths</div></div></Reveal>
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">{strengths.map((s, i) => <Reveal key={s.label} delay={0.2 + i * 0.08}><motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }} className="glass-hover group h-full rounded-none border-white/10 p-6"><s.icon className="mb-4 h-5 w-5 text-white/65 transition-transform duration-300 group-hover:scale-110" /><h4 className="mb-2 text-white" style={{ fontFamily: 'var(--font-cinzel)', fontSize: '0.65rem', letterSpacing: '0.2em' }}>{s.label}</h4><p style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.05rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.6 }}>{s.desc}</p></motion.div></Reveal>)}</div>
          </div>
        </div>
      </section>
    </>
  )
}
