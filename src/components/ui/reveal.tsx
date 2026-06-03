'use client'

import { motion } from 'framer-motion'

export default function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ scale: 0.92, filter: 'blur(4px)', opacity: 0, y: 20 }}
      whileInView={{ scale: 1, filter: 'blur(0px)', opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
