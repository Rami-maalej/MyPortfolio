'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { personalInfo } from '@/lib/data'
import { Send, Mail, MapPin, Phone, Check } from 'lucide-react'
import Reveal from '@/components/ui/reveal'

const chaosOffsets = (len: number) => {
  const arr: { x: number; y: number }[] = []
  for (let i = 0; i < len; i++) {
    arr.push({ x: (Math.random() - 0.5) * 8, y: (Math.random() - 0.5) * 8 })
  }
  return arr
}

function ChaosText({ text }: { text: string }) {
  const chars = text.split('')
  const [hovered, setHovered] = useState(false)
  const [offsets] = useState(chaosOffsets(chars.length))

  return (
    <span
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="inline-block"
    >
      {chars.map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          animate={hovered ? {
            x: [0, offsets[i].x, 0],
            y: [0, offsets[i].y, 0],
          } : {}}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  )
}

export default function Contact() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' })
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [submitState, setSubmitState] = useState<'idle' | 'loading' | 'success'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitState('loading')
    await new Promise((r) => setTimeout(r, 1500))
    const mailto = `mailto:${personalInfo.email}?subject=Portfolio Contact from ${formState.name}&body=${encodeURIComponent(formState.message)}`
    window.open(mailto)
    setSubmitState('success')
    setTimeout(() => setSubmitState('idle'), 3000)
  }

  return (
    <section id="contact" className="relative min-h-screen px-6 py-32">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-white/60 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
            Contact
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="fluid-heading font-display leading-[0.9] tracking-tighter text-white">
          Let&apos;s<br />
          Build<br />
          <span className="text-white/30 italic">Something</span>
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-8 lg:grid-cols-2 overflow-hidden">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-15% 0px' }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="glass-hover rounded-2xl p-8">
              <h3 className="mb-8 text-lg font-semibold text-white">
                Send a Message
              </h3>

              {submitState === 'success' ? (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex flex-col items-center justify-center py-12"
                >
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20">
                    <Check size={32} className="text-green-400" />
                  </div>
                  <p className="text-lg font-medium text-white">Message sent!</p>
                  <p className="mt-2 text-sm text-white/50">I&apos;ll get back to you soon.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  {(['name', 'email', 'message'] as const).map((field) => (
                    <div key={field} className="relative">
                      <input
                        type={field === 'email' ? 'email' : 'text'}
                        id={field}
                        required
                        value={formState[field]}
                        onChange={(e) => setFormState({ ...formState, [field]: e.target.value })}
                        onFocus={() => setFocusedField(field)}
                        onBlur={() => setFocusedField(null)}
                        className="peer w-full border-0 border-b border-white/20 bg-transparent px-0 py-3 text-sm text-white outline-none transition-all duration-300 focus:border-white/60"
                        placeholder=" "
                      />
                      <label
                        htmlFor={field}
                        className={`absolute left-0 text-sm transition-all duration-300 ${
                          focusedField === field || formState[field]
                            ? '-top-5 text-xs text-white/50'
                            : 'top-3 text-white/30'
                        }`}
                      >
                        {field.charAt(0).toUpperCase() + field.slice(1)}
                      </label>
                    </div>
                  ))}

                  <button
                    type="submit"
                    disabled={submitState === 'loading'}
                    className={`relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl px-6 py-3 text-sm font-medium text-black transition-all duration-500 ${
                      submitState === 'loading' ? 'bg-white/50' : 'bg-white hover:bg-white/90'
                    }`}
                    data-cursor="link"
                  >
                    <AnimatePresence mode="wait">
                      {submitState === 'loading' ? (
                        <motion.div
                          key="loading"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center gap-2"
                        >
                          <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Sending...
                        </motion.div>
                      ) : (
                        <motion.span
                          key="idle"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center gap-2"
                        >
                          <Send size={16} />
                          Send Message
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </button>
                </form>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-15% 0px' }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-4"
          >
            <div className="glass-hover flex items-center gap-4 rounded-2xl p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10">
                <Mail size={20} className="text-blue-400" />
              </div>
              <div>
                <p className="fluid-small text-white/30">Email</p>
                <a href={`mailto:${personalInfo.email}`} className="text-sm text-white/80 hover:text-white">
                  <ChaosText text={personalInfo.email} />
                </a>
              </div>
            </div>

            <div className="glass-hover flex items-center gap-4 rounded-2xl p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10">
                <Phone size={20} className="text-purple-400" />
              </div>
              <div>
                <p className="fluid-small text-white/30">Phone</p>
                <p className="text-sm text-white/80">{personalInfo.phone}</p>
              </div>
            </div>

            <div className="glass-hover flex items-center gap-4 rounded-2xl p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-500/10">
                <MapPin size={20} className="text-green-400" />
              </div>
              <div>
                <p className="fluid-small text-white/30">Location</p>
                <p className="text-sm text-white/80">{personalInfo.location}</p>
              </div>
            </div>

            <div className="glass-hover rounded-2xl p-6">
              <h4 className="mb-4 text-sm font-semibold text-white">Let&apos;s Connect</h4>
              <p className="fluid-small leading-relaxed text-white/50">
                Whether you have a project, collaboration idea, or just want to geek out about code — my inbox is always open.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
