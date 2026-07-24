'use client'

import { useEffect, useRef, useState } from 'react'

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const mousePos = useRef({ x: 0, y: 0 })
  const dotPos = useRef({ x: 0, y: 0 })
  const rafId = useRef<number>(0)
  const isHovering = useRef(false)
  const dotScale = useRef(1)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const animate = () => {
      const lerp = (a: number, b: number) => a + (b - a) * 0.15
      dotPos.current.x = lerp(dotPos.current.x, mousePos.current.x)
      dotPos.current.y = lerp(dotPos.current.y, mousePos.current.y)

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${dotPos.current.x - 6}px, ${dotPos.current.y - 6}px) scale(${dotScale.current})`
      }

      rafId.current = requestAnimationFrame(animate)
    }

    rafId.current = requestAnimationFrame(animate)

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY }
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const link = target.closest('a, button, [data-cursor="link"]')
      isHovering.current = !!link
      dotScale.current = link ? 2.5 : 1
      if (dotRef.current) {
        dotRef.current.style.mixBlendMode = link ? 'normal' : 'difference'
        dotRef.current.style.background = link ? 'rgba(255,255,255,0.15)' : '#ffffff'
        dotRef.current.style.backdropFilter = link ? 'blur(4px)' : 'none'
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseover', handleMouseOver)
    document.body.style.cursor = 'none'

    return () => {
      cancelAnimationFrame(rafId.current)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseover', handleMouseOver)
      document.body.style.cursor = ''
    }
  }, [])

  if (!mounted) return null

  return (
    <div
      ref={dotRef}
      className="pointer-events-none fixed z-[9999]"
      style={{
        width: 12,
        height: 12,
        borderRadius: '50%',
        background: '#ffffff',
        mixBlendMode: 'difference',
        boxShadow: '0 0 12px rgba(255,255,255,0.15)',
        willChange: 'transform',
        transition: 'background 0.2s ease, backdrop-filter 0.2s ease, width 0.2s ease, height 0.2s ease',
      }}
    />
  )
}
