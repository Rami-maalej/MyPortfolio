'use client'

import { useEffect } from 'react'

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    let lenis: { raf: (t: number) => void; destroy: () => void } | null = null

    const init = async () => {
      const LenisMod = await import('lenis')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const Lenis = LenisMod.default as any
      lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
      }) as { raf: (t: number) => void; destroy: () => void }

      const raf = (time: number) => {
        lenis?.raf(time)
        requestAnimationFrame(raf)
      }
      requestAnimationFrame(raf)
    }

    init()

    return () => {
      lenis?.destroy()
    }
  }, [])

  return <>{children}</>
}
