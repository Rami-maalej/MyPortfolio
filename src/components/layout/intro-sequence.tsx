'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const STORAGE_KEY = 'rm_intro_seen'
const INTRO_DURATION_MS = 1100

export default function IntroSequence() {
  // Mount gate: only render the intro after hydration. The server
  // renders nothing, the client renders nothing on first paint,
  // then on the first effect tick we mark mounted and animate in.
  const [mounted, setMounted] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Skip intro on subsequent visits within the same session
    let alreadySeen = false
    try {
      alreadySeen = sessionStorage.getItem(STORAGE_KEY) === '1'
      if (!alreadySeen) sessionStorage.setItem(STORAGE_KEY, '1')
    } catch {
      // sessionStorage unavailable — still show intro
    }

    if (alreadySeen) return

    setIsVisible(true)
    document.body.style.overflow = 'hidden'

    const t1 = setTimeout(() => setIsVisible(false), INTRO_DURATION_MS)
    const t2 = setTimeout(() => {
      document.body.style.overflow = ''
    }, INTRO_DURATION_MS + 700)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      document.body.style.overflow = ''
    }
  }, [])

  if (!mounted) return null

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="intro"
          initial={{ clipPath: 'inset(0 0 0 0)' }}
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black"
        >
          <motion.span
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-7xl tracking-tighter text-white sm:text-9xl"
          >
            RM<span className="text-blue-400">.</span>
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
