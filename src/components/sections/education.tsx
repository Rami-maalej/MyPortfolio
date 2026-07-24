'use client'

import { motion } from 'framer-motion'
import { education, certifications } from '@/lib/data'
import { GraduationCap, Award } from 'lucide-react'
import Reveal from '@/components/ui/reveal'

export default function Education() {
  return (
    <section id="education" className="relative px-6 py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="label-cinzel mb-5 inline-flex items-center gap-3 text-white/30">
            <span className="gold-dot" />
            Education
          </div>
          <h2 className="fluid-heading mb-6 text-white">
            Academic<br />
            <span className="italic" style={{ color: 'transparent', WebkitTextStroke: '1px rgba(255,255,255,0.2)' }}>
              Foundation
            </span>
          </h2>
          <p className="fluid-body max-w-xl text-white/35">
            Formal education and professional certifications that built my expertise.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          {/* Education */}
          <div>
            <Reveal delay={0.1}>
              <div className="mb-7 flex items-center gap-3">
                <GraduationCap size={22} style={{ color: 'rgba(201,168,76,0.7)' }} />
                <h3 style={{ fontFamily: 'var(--font-cinzel)', fontSize: '0.7rem', letterSpacing: '0.25em', color: 'rgba(255,255,255,0.5)' }}>
                  Degrees
                </h3>
              </div>
            </Reveal>
            <div className="space-y-4">
              {education.map((edu, i) => (
                <Reveal key={i} delay={0.2 + i * 0.1}>
                  <motion.div
                    whileHover={{ y: -3, rotateX: 2 }}
                    transition={{ type: 'spring', stiffness: 280, damping: 20 }}
                    className="glass-hover rounded-2xl p-7"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <h4 style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.3rem', color: 'white', fontWeight: 500 }}>
                      {edu.degree}
                    </h4>
                    <p style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.05rem', color: 'rgba(255,255,255,0.45)', marginTop: '4px' }}>
                      {edu.institution}
                    </p>
                    <div className="mt-3 flex items-center gap-2 label-cinzel text-white/25">
                      <span>{edu.location}</span>
                      {edu.period && (
                        <>
                          <span style={{ color: 'rgba(201,168,76,0.3)' }}>·</span>
                          <span>{edu.period}</span>
                        </>
                      )}
                    </div>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Certifications & Languages */}
          <div>
            <Reveal delay={0.1}>
              <div className="mb-7 flex items-center gap-3">
                <Award size={22} style={{ color: 'rgba(201,168,76,0.7)' }} />
                <h3 style={{ fontFamily: 'var(--font-cinzel)', fontSize: '0.7rem', letterSpacing: '0.25em', color: 'rgba(255,255,255,0.5)' }}>
                  Certifications
                </h3>
              </div>
            </Reveal>
            <div className="space-y-4">
              {certifications.map((cert, i) => (
                <Reveal key={i} delay={0.2 + i * 0.1}>
                  <motion.div
                    whileHover={{ y: -3 }}
                    transition={{ type: 'spring', stiffness: 280, damping: 20 }}
                    className="glass-hover rounded-2xl p-7"
                  >
                    <h4 style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.3rem', color: 'white', fontWeight: 500 }}>
                      {cert.name}
                    </h4>
                    <p style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.05rem', color: 'rgba(201,168,76,0.5)', marginTop: '4px' }}>
                      {cert.issuer}
                    </p>
                  </motion.div>
                </Reveal>
              ))}

              {/* Languages */}
              <Reveal delay={0.4}>
                <motion.div
                  whileHover={{ y: -3 }}
                  transition={{ type: 'spring', stiffness: 280, damping: 20 }}
                  className="glass-hover rounded-2xl p-7"
                >
                  <h4 style={{ fontFamily: 'var(--font-cinzel)', fontSize: '0.7rem', letterSpacing: '0.25em', color: 'rgba(255,255,255,0.4)', marginBottom: '16px' }}>
                    Languages
                  </h4>
                  <div className="space-y-3">
                    {[
                      { lang: 'Arabic', level: 'Native' },
                      { lang: 'French', level: 'Professional · B2' },
                      { lang: 'English', level: 'Professional · B2' },
                    ].map((l) => (
                      <div key={l.lang} className="flex items-center justify-between">
                        <span style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.1rem', color: 'rgba(255,255,255,0.6)' }}>
                          {l.lang}
                        </span>
                        <span className="label-cinzel text-white/25">{l.level}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
