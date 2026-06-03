'use client'

import { achievements } from '@/lib/data'
import Reveal from '@/components/ui/reveal'

function StaggerReveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <Reveal delay={delay}>
      {children}
    </Reveal>
  )
}

export default function Achievements() {
  return (
    <section id="achievements" className="relative px-6 py-32">
      <div className="mx-auto max-w-7xl">
        <StaggerReveal>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-white/60 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
            Achievements
          </div>
          <h2 className="fluid-heading mb-4 font-display text-white">
            Key<br />
            <span className="text-white/30 italic">Milestones</span>
          </h2>
          <p className="fluid-body max-w-2xl text-white/40">
            Impactful contributions that define my career trajectory.
          </p>
        </StaggerReveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {achievements.map((achievement, i) => (
            <StaggerReveal key={achievement.title} delay={0.2 + i * 0.1}>
              <div className="glass-hover group rounded-2xl p-6 text-center">
                <div className="mb-4 text-4xl transition-transform duration-500 group-hover:scale-110">
                  {achievement.icon}
                </div>
                <h3 className="mb-2 text-sm font-semibold text-white">{achievement.title}</h3>
                <p className="fluid-small text-white/50">{achievement.description}</p>
              </div>
            </StaggerReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
