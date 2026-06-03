'use client'

import { education, certifications } from '@/lib/data'
import { GraduationCap, Award } from 'lucide-react'
import Reveal from '@/components/ui/reveal'

function StaggerReveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <Reveal delay={delay}>
      {children}
    </Reveal>
  )
}

export default function Education() {
  return (
    <section id="education" className="relative px-6 py-32">
      <div className="mx-auto max-w-7xl">
        <StaggerReveal>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-white/60 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
            Education
          </div>
          <h2 className="fluid-heading mb-4 font-display text-white">
            Academic<br />
            <span className="text-white/30 italic">Foundation</span>
          </h2>
          <p className="fluid-body max-w-2xl text-white/40">
            Formal education and professional certifications that built my expertise.
          </p>
        </StaggerReveal>

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          <div>
            <StaggerReveal delay={0.1}>
              <div className="mb-6 flex items-center gap-3">
                <GraduationCap size={24} className="text-blue-400" />
                <h3 className="text-lg font-semibold text-white">Education</h3>
              </div>
            </StaggerReveal>
            <div className="space-y-4">
              {education.map((edu, i) => (
                <StaggerReveal key={i} delay={0.2 + i * 0.1}>
                  <div className="glass-hover rounded-2xl p-6">
                    <h4 className="font-medium text-white">{edu.degree}</h4>
                    <p className="mt-1 text-sm text-white/50">{edu.institution}</p>
                    <div className="mt-2 flex items-center gap-2 text-xs text-white/30">
                      <span>{edu.location}</span>
                      {edu.period && (
                        <>
                          <span>&middot;</span>
                          <span>{edu.period}</span>
                        </>
                      )}
                    </div>
                  </div>
                </StaggerReveal>
              ))}
            </div>
          </div>

          <div>
            <StaggerReveal delay={0.1}>
              <div className="mb-6 flex items-center gap-3">
                <Award size={24} className="text-purple-400" />
                <h3 className="text-lg font-semibold text-white">Certifications</h3>
              </div>
            </StaggerReveal>
            <div className="space-y-4">
              {certifications.map((cert, i) => (
                <StaggerReveal key={i} delay={0.2 + i * 0.1}>
                  <div className="glass-hover rounded-2xl p-6">
                    <h4 className="font-medium text-white">{cert.name}</h4>
                    <p className="mt-1 text-sm text-white/50">{cert.issuer}</p>
                  </div>
                </StaggerReveal>
              ))}
              <StaggerReveal delay={0.4}>
                <div className="glass-hover rounded-2xl p-6">
                  <h4 className="font-medium text-white">Languages</h4>
                  <div className="mt-3 space-y-2">
                    {[
                      { lang: 'Arabic', level: 'Native' },
                      { lang: 'French', level: 'Professional (B2)' },
                      { lang: 'English', level: 'Professional (B2)' },
                    ].map((l) => (
                      <div key={l.lang} className="flex items-center justify-between">
                        <span className="text-sm text-white/60">{l.lang}</span>
                        <span className="text-xs text-white/30">{l.level}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </StaggerReveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
