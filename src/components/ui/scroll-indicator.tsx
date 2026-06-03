'use client'

import { motion, useScroll, useSpring } from 'framer-motion'

export default function ScrollIndicator() {
  const { scrollYProgress } = useScroll()
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  return (
    <div className="scroll-indicator-dot">
      <div className="line" />
      <motion.div
        className="dot"
        style={{ scaleY }}
      />
      <div className="line" />
    </div>
  )
}
