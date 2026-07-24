'use client'

import { useRef, useMemo, useState, useEffect } from 'react'

import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { navLinks } from '@/lib/data'
import { seededRandom } from '@/lib/utils'

/* ──────────────────────────────────────────────────────────────
   SECTION WARP — a 3D hyperspace transition between chapters.

   When the active section changes, a single 1.1s motion event
   plays: warp rings expand off-screen, a circular iris closes
   and reopens at the center, particles stretch into motion
   lines, the page blurs through focus, and a chapter stamp
   flashes. One committed aesthetic — cosmic monochrome warp.

   Components:
     • WarpScene     — three.js scene with rings + streaking
                       particles, driven by a 0..1 progress value.
     • IrisWipe      — black disc + thin white ring, CSS-animated
                       in sync with the 3D layer.
     • ChapterStamp  — top-center meta flash (Chapter 04 · …).
     • SectionWarp   — orchestrator + observer; sets a CSS
                       --warp-blur variable on <main> so the
                       underlying page receives pulled focus.

   Respects prefers-reduced-motion (simple 200ms opacity stamp).
   ────────────────────────────────────────────────────────────── */

const WARP_DURATION = 1.1 // seconds — kept in sync with the CSS keyframes below
const LOCK_MS = 1100

const sectionMeta: Record<string, { num: string; subtitle: string }> = {
  home:        { num: '00', subtitle: 'A Cosmic Introduction' },
  about:       { num: '01', subtitle: 'The Architect' },
  skills:      { num: '02', subtitle: 'The Toolkit' },
  experience:  { num: '03', subtitle: 'Field Engineering' },
  projects:    { num: '04', subtitle: 'Selected Works' },
  education:   { num: '05', subtitle: 'Foundation' },
  achievements:{ num: '06', subtitle: 'Milestones' },
  contact:     { num: '07', subtitle: 'Signal' },
}

// Easing — sharp in, gentle out, used for the warp progress.
const easeWarp = (t: number) => {
  // 0..0.4 accelerate, 0.4..0.6 plateau, 0.6..1 decelerate
  if (t < 0.4) return (t / 0.4) ** 2 * 0.85
  if (t < 0.6) return 0.85 + (t - 0.4) * 0.75
  const k = (t - 0.6) / 0.4
  return 1.0 - (1 - k) ** 2 * 0.15
}

/* ──────────────────────────────────────────────────────────────
   WARP RINGS — concentric thin tori that expand outward
   during the transition. Rendered with a custom shader that
   fades each ring as it moves and shifts color to a cool blue
   at the leading edge (the "blue shift" of relativistic motion).
   ────────────────────────────────────────────────────────────── */
function WarpRings({ count = 5 }: { count?: number }) {
  const group = useRef<THREE.Group>(null!)
  const baseProgress = useRef(0)

  // Expose imperative progress so the parent scene can drive us.
  useEffect(() => {
    const handler = (e: Event) => {
      const p = (e as CustomEvent<number>).detail
      baseProgress.current = p
    }
    window.addEventListener('rm-warp-progress', handler as EventListener)
    return () => window.removeEventListener('rm-warp-progress', handler as EventListener)
  }, [])

  const rings = useMemo(() => {
    return new Array(count).fill(0).map((_, i) => {
      const startT = i * 0.12 // staggered launch
      return { startT, baseRadius: 0.6 + i * 0.05 }
    })
  }, [count])

  useFrame((state) => {
    if (!group.current) return
    const p = baseProgress.current
    for (let i = 0; i < group.current.children.length; i++) {
      const child = group.current.children[i] as THREE.Mesh
      const r = rings[i]
      const local = THREE.MathUtils.clamp((p - r.startT) / 0.55, 0, 1)
      const eased = easeWarp(local)
      const radius = r.baseRadius + eased * 3.4
      child.scale.set(radius, radius, 1)
      const mat = child.material as THREE.MeshBasicMaterial
      // Fade: in quickly, out as it expands
      const opacity =
        local <= 0
          ? 0
          : local < 0.15
          ? local / 0.15
          : 1 - Math.pow((local - 0.15) / 0.85, 1.6)
      mat.opacity = 0.55 * Math.max(0, opacity)
      // Subtle Z-rotation for life
      child.rotation.z = state.clock.elapsedTime * 0.2 * (i % 2 === 0 ? 1 : -1)
    }
  })

  return (
    <group ref={group}>
      {rings.map((r, i) => (
        <mesh key={i} position={[0, 0, -0.2 - i * 0.001]}>
          <torusGeometry args={[1, 0.004, 8, 128]} />
          <meshBasicMaterial
            color={i % 2 === 0 ? '#ffffff' : '#bcd4ff'}
            transparent
            opacity={0}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  )
}

/* ──────────────────────────────────────────────────────────────
   STREAKING PARTICLES — monochrome points that stretch along
   Z during the transition. We push a normalized progress 0..1
   to the GLSL uniforms; the vertex shader elongates each
   point's screen-space position by `progress * 4.0` so they
   read as motion lines.
   ────────────────────────────────────────────────────────────── */
const STREAK_VERTEX = /* glsl */ `
  uniform float uProgress;
  uniform float uTime;
  attribute float aSeed;
  varying float vBrightness;

  void main() {
    vec3 pos = position;
    // Push the particle along -Z proportional to its seed (so each
    // particle gets a different "speed" — parallax warp)
    float speed = 0.4 + aSeed * 1.6;
    pos.z += uProgress * speed * 6.0;

    // Standard projection
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    // Stretch toward camera: when in motion, the closer the particle
    // is to the near plane, the longer its streak.
    float stretch = 1.0 + uProgress * 12.0 * (1.0 - clamp(-pos.z / 6.0, 0.0, 1.0));
    gl_PointSize = (1.0 + aSeed * 1.2) * stretch * (220.0 / -mvPosition.z);

    // Brightness: starts dim, hot at peak (uProgress ~0.5), then dims
    float bell = 1.0 - abs(uProgress - 0.45) * 2.2;
    vBrightness = clamp(bell, 0.0, 1.0);
  }
`

const STREAK_FRAGMENT = /* glsl */ `
  uniform float uProgress;
  varying float vBrightness;

  void main() {
    // Soft round point with hot core
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    if (d > 0.5) discard;
    float core = smoothstep(0.5, 0.0, d);
    float hot  = smoothstep(0.18, 0.0, d);

    // Slight blue shift at peak
    vec3 color = mix(vec3(1.0), vec3(0.78, 0.86, 1.0), vBrightness * 0.7);
    float alpha = core * (0.25 + vBrightness * 0.85) + hot * vBrightness * 0.6;
    gl_FragColor = vec4(color, alpha);
  }
`

function StreakingParticles({ count = 700 }: { count?: number }) {
  const points = useRef<THREE.Points>(null!)
  const matRef = useRef<THREE.ShaderMaterial>(null!)
  const baseProgress = useRef(0)

  useEffect(() => {
    const handler = (e: Event) => {
      baseProgress.current = (e as CustomEvent<number>).detail
      if (matRef.current) {
        matRef.current.uniforms.uProgress.value = baseProgress.current
      }
    }
    window.addEventListener('rm-warp-progress', handler as EventListener)
    return () => window.removeEventListener('rm-warp-progress', handler as EventListener)
  }, [])

  const geometry = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const seeds = new Float32Array(count)
    const r = seededRandom(0x5a1e) // deterministic warp field
    for (let i = 0; i < count; i++) {
      // Distribute around a torus-ish shell so the field has depth
      const radius = 0.4 + r() * 1.6
      const theta = r() * Math.PI * 2
      const phi = (r() - 0.5) * 0.9
      positions[i * 3]     = Math.cos(theta) * radius
      positions[i * 3 + 1] = Math.sin(phi) * radius * 0.6
      positions[i * 3 + 2] = -r() * 4.0
      seeds[i] = r()
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    g.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1))
    return g
  }, [count])

  const uniforms = useMemo(
    () => ({
      uProgress: { value: 0 },
      uTime: { value: 0 },
    }),
    []
  )

  useFrame((state) => {
    if (matRef.current) {
      matRef.current.uniforms.uTime.value = state.clock.elapsedTime
    }
  })

  return (
    <points ref={points} geometry={geometry} frustumCulled={false}>
      <shaderMaterial
        ref={matRef}
        vertexShader={STREAK_VERTEX}
        fragmentShader={STREAK_FRAGMENT}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

/* ──────────────────────────────────────────────────────────────
   RING-BURST — a single thin ring that expands from the center
   in sync with the iris close, then dissipates. Reads as the
   "shockwave" of the jump.
   ────────────────────────────────────────────────────────────── */
function RingBurst() {
  const mesh = useRef<THREE.Mesh>(null!)
  const matRef = useRef<THREE.MeshBasicMaterial>(null!)
  const baseProgress = useRef(0)

  useEffect(() => {
    const handler = (e: Event) => {
      baseProgress.current = (e as CustomEvent<number>).detail
    }
    window.addEventListener('rm-warp-progress', handler as EventListener)
    return () => window.removeEventListener('rm-warp-progress', handler as EventListener)
  }, [])

  useFrame(() => {
    if (!mesh.current || !matRef.current) return
    const p = baseProgress.current
    // Active only during 0.2..0.55 of the transition
    const local = THREE.MathUtils.clamp((p - 0.18) / 0.45, 0, 1)
    const eased = 1 - Math.pow(1 - local, 2.5)
    const scale = 0.05 + eased * 0.7
    mesh.current.scale.set(scale, scale, 1)
    matRef.current.opacity =
      local <= 0 ? 0 : (1 - local) * 0.8
  })

  return (
    <mesh ref={mesh} position={[0, 0, 0.05]}>
      <torusGeometry args={[1, 0.008, 12, 256]} />
      <meshBasicMaterial
        ref={matRef}
        color="#ffffff"
        transparent
        opacity={0}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  )
}

/* ──────────────────────────────────────────────────────────────
   WARP SCENE — top-level Canvas content
   ────────────────────────────────────────────────────────────── */
function WarpScene() {
  return (
    <>
      <WarpRings count={6} />
      <StreakingParticles count={700} />
      <RingBurst />
    </>
  )
}

/* ──────────────────────────────────────────────────────────────
   IRIS WIPE — black disc that grows from center to cover the
   screen, then shrinks. CSS-driven for perfect sync with the
   3D layer and zero JS latency.
   ────────────────────────────────────────────────────────────── */
function IrisWipe({ active }: { active: boolean }) {
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key="iris-black"
          aria-hidden
          initial={{ clipPath: 'circle(0% at 50% 50%)' }}
          animate={{
            clipPath: [
              'circle(0% at 50% 50%)',
              'circle(0% at 50% 50%)',   // hold while rings build
              'circle(62% at 50% 50%)',  // peak close
              'circle(62% at 50% 50%)',  // hold for stamp
              'circle(0% at 50% 50%)',   // reopen
            ],
          }}
          exit={{ opacity: 0 }}
          transition={{
            duration: WARP_DURATION,
            times: [0, 0.18, 0.45, 0.6, 1],
            ease: [0.65, 0, 0.35, 1],
          }}
          className="pointer-events-none fixed inset-0 z-[58] bg-black"
        />
      )}
    </AnimatePresence>
  )
}

/* ──────────────────────────────────────────────────────────────
   IRIS RING — thin white line on the leading edge of the iris.
   Rendered as a `box-shadow: inset 0 0 0 1px white` disc.
   ────────────────────────────────────────────────────────────── */
function IrisRing({ active }: { active: boolean }) {
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key="iris-ring"
          aria-hidden
          initial={{ clipPath: 'circle(0% at 50% 50%)' }}
          animate={{
            clipPath: [
              'circle(0% at 50% 50%)',
              'circle(0% at 50% 50%)',
              'circle(62% at 50% 50%)',
              'circle(62% at 50% 50%)',
              'circle(0% at 50% 50%)',
            ],
          }}
          exit={{ opacity: 0 }}
          transition={{
            duration: WARP_DURATION,
            times: [0, 0.18, 0.45, 0.6, 1],
            ease: [0.65, 0, 0.35, 1],
          }}
          className="pointer-events-none fixed inset-0 z-[59]"
          style={{
            boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.55)',
            background:
              'radial-gradient(circle at 50% 50%, transparent calc(50% - 1px), rgba(255,255,255,0.6) calc(50% - 1px), rgba(255,255,255,0.6) 50%, transparent calc(50% + 1px))',
          }}
        />
      )}
    </AnimatePresence>
  )
}

/* ──────────────────────────────────────────────────────────────
   VIGNETTE PULSE — radial darkening that pulses once.
   ────────────────────────────────────────────────────────────── */
function VignettePulse({ activeKey }: { activeKey: number }) {
  return (
    <AnimatePresence>
      {activeKey > 0 && (
        <motion.div
          key={`pulse-${activeKey}`}
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.55, 0] }}
          exit={{ opacity: 0 }}
          transition={{ duration: WARP_DURATION, times: [0, 0.4, 1] }}
          className="pointer-events-none fixed inset-0 z-[57]"
          style={{
            background:
              'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.85) 100%)',
          }}
        />
      )}
    </AnimatePresence>
  )
}

/* ──────────────────────────────────────────────────────────────
   CHAPTER STAMP — top-center meta flash
   ────────────────────────────────────────────────────────────── */
function ChapterStamp({
  active,
  meta,
  label,
}: {
  active: boolean
  meta: { num: string; subtitle: string } | null
  label: string | undefined
}) {
  return (
    <AnimatePresence>
      {active && meta && label && (
        <motion.div
          key={`stamp-${meta.num}`}
          initial={{ opacity: 0, y: -10, letterSpacing: '0.5em' }}
          animate={{
            opacity: [0, 1, 1, 0],
            y: [0, 0, 0, -6],
            letterSpacing: ['0.5em', '0.32em', '0.32em', '0.32em'],
          }}
          exit={{ opacity: 0 }}
          transition={{
            duration: WARP_DURATION,
            times: [0, 0.35, 0.65, 1],
            ease: [0.16, 1, 0.3, 1],
          }}
          className="pointer-events-none fixed left-1/2 top-24 z-[60] -translate-x-1/2 text-center"
        >
          <div className="font-mono text-[10px] uppercase text-white/60">
            Chapter {meta.num} · {meta.subtitle}
          </div>
          <div className="mt-1 font-display text-2xl text-white sm:text-3xl">
            {label}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ──────────────────────────────────────────────────────────────
   CANVAS WRAPPER — fixed full-viewport canvas with a
   click-through pointer-events-none. The 3D layer lives
   behind the iris/ring/stamp so the warp is "in the room",
   not the foreground.
   ────────────────────────────────────────────────────────────── */
function WarpCanvas({ activeKey }: { activeKey: number }) {
  return (
    <AnimatePresence>
      {activeKey > 0 && (
        <motion.div
          key={`canvas-${activeKey}`}
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="pointer-events-none fixed inset-0 z-[56]"
        >
          <Canvas
            camera={{ position: [0, 0, 1.6], fov: 50 }}
            gl={{
              alpha: true,
              antialias: true,
              powerPreference: 'high-performance',
            }}
            dpr={[1, 1.5]}
            style={{ background: 'transparent' }}
          >
            <WarpScene />
          </Canvas>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ──────────────────────────────────────────────────────────────
   PROGRESS DRIVER — listens for activation, animates a
   normalized 0..1 value over WARP_DURATION seconds, and
   dispatches it on every frame as a window CustomEvent so the
   3D layer can read it without prop-drilling.
   ────────────────────────────────────────────────────────────── */
function useProgressDriver(activeKey: number) {
  useEffect(() => {
    if (activeKey === 0) return
    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      const elapsed = (now - start) / 1000
      const t = Math.min(1, elapsed / WARP_DURATION)
      window.dispatchEvent(new CustomEvent('rm-warp-progress', { detail: t }))
      if (t < 1) {
        raf = requestAnimationFrame(tick)
      }
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [activeKey])
}

/* ──────────────────────────────────────────────────────────────
   PULSE-FREE PEAK — small cool-blue tint at the peak of the
   jump. Subtle but anchors the "relativistic shift".
   ────────────────────────────────────────────────────────────── */
function BlueShiftFlash({ activeKey }: { activeKey: number }) {
  return (
    <AnimatePresence>
      {activeKey > 0 && (
        <motion.div
          key={`shift-${activeKey}`}
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.35, 0] }}
          exit={{ opacity: 0 }}
          transition={{ duration: WARP_DURATION, times: [0, 0.45, 1] }}
          className="pointer-events-none fixed inset-0 z-[55]"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(180, 210, 255, 0.18) 0%, transparent 60%)',
            mixBlendMode: 'screen',
          }}
        />
      )}
    </AnimatePresence>
  )
}

/* ──────────────────────────────────────────────────────────────
   ORCHESTRATOR
   ────────────────────────────────────────────────────────────── */
export default function SectionWarp() {
  const [mounted, setMounted] = useState(false)
  const [active, setActive] = useState<{ key: number; id: string } | null>(null)
  const lastSection = useRef<string>('home')
  const lockUntil = useRef(0)
  const prefersReduced = useReducedMotion()

  useEffect(() => setMounted(true), [])

  // Main pulled-focus blur via CSS variable
  useEffect(() => {
    if (!mounted || prefersReduced) return
    let raf = 0
    const start = performance.now()
    const main = document.querySelector('main') as HTMLElement | null
    if (!main) return

    const tick = (now: number) => {
      const elapsed = (now - start) / 1000
      const t = Math.min(1, elapsed / WARP_DURATION)
      // Bell curve peaking at 0.5
      const bell = 1 - Math.abs(t - 0.5) * 2
      const blur = Math.max(0, bell) * 14
      main.style.setProperty('--warp-blur', `${blur}px`)
      if (t < 1) {
        raf = requestAnimationFrame(tick)
      } else {
        main.style.setProperty('--warp-blur', '0px')
      }
    }

    if (active) {
      raf = requestAnimationFrame(tick)
      return () => {
        cancelAnimationFrame(raf)
        main.style.setProperty('--warp-blur', '0px')
      }
    }
  }, [active, mounted, prefersReduced])

  // Section observer
  useEffect(() => {
    if (prefersReduced) return

    const observer = new IntersectionObserver(
      (entries) => {
        let best: IntersectionObserverEntry | null = null
        for (const e of entries) {
          if (!best || e.intersectionRatio > best.intersectionRatio) best = e
        }
        if (!best || !best.isIntersecting) return
        const id = (best.target as HTMLElement).id
        if (!id || id === lastSection.current) return
        const now = performance.now()
        if (now < lockUntil.current) {
          lastSection.current = id
          return
        }
        lastSection.current = id
        lockUntil.current = performance.now() + LOCK_MS
        setActive({ key: Date.now(), id })
        window.setTimeout(() => {
          setActive((cur) => (cur && cur.id === id ? null : cur))
        }, LOCK_MS + 50)
      },
      { threshold: [0.35, 0.6], rootMargin: '-25% 0px' }
    )

    document.querySelectorAll('section[id]').forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [prefersReduced])

  useProgressDriver(active?.key ?? 0)

  if (prefersReduced) return null
  if (!mounted) return null

  const meta = active ? sectionMeta[active.id] : null
  const label = active ? navLinks.find((l) => l.href.slice(1) === active.id)?.label : undefined
  const activeKey = active?.key ?? 0

  return (
    <>
      <WarpCanvas activeKey={activeKey} />
      <BlueShiftFlash activeKey={activeKey} />
      <VignettePulse activeKey={activeKey} />
      <IrisWipe active={!!active} />
      <IrisRing active={!!active} />
      <ChapterStamp active={!!active} meta={meta ?? null} label={label} />
    </>
  )
}
