'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { type ReactNode } from 'react'

interface RevealProps {
  children: ReactNode
  delay?: number
  className?: string
  /** Distance (px) the content travels on entry */
  y?: number
  /** Intensity of the entry blur (px). Keep small to avoid looking broken. */
  blur?: number
  /** Perspective rotation on the z-axis (deg). 0 disables. */
  rotateX?: number
}

/**
 * A subtle on-scroll reveal: tiny lift, no blur, no rotation
 * by default. Wraps framer-motion's whileInView with sensible
 * defaults for production content.
 */
export default function Reveal({
  children,
  delay = 0,
  className = '',
  y = 20,
  blur = 0,
  rotateX = 0,
}: RevealProps) {
  const reduced = useReducedMotion()
  return (
    <motion.div
      initial={
        reduced
          ? { opacity: 0 }
          : blur > 0
            ? { opacity: 0, y, filter: `blur(${blur}px)`, rotateX }
            : { opacity: 0, y, rotateX }
      }
      whileInView={
        reduced
          ? { opacity: 1 }
          : blur > 0
            ? { opacity: 1, y: 0, filter: 'blur(0px)', rotateX: 0 }
            : { opacity: 1, y: 0, rotateX: 0 }
      }
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{
        transformStyle: 'preserve-3d',
        transformOrigin: 'center bottom',
        willChange: 'opacity, transform',
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
