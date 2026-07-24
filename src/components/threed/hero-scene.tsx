'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { seededRandom } from '@/lib/utils'

/* ──────────────────────────────────────────────────────────────
   INTERACTIVE PARTICLE FIELD — 12,000 monochrome particles
   arranged on a flat plane in the XY of the camera. The
   particles are the hero: they form flowing wave patterns,
   respond to the mouse (repulsion + swirl), and pulse with
   sound-like rhythms. No planets, no rings — just a
   responsive, living, monochrome field.
   ────────────────────────────────────────────────────────────── */
function InteractiveField() {
  const mesh = useRef<THREE.Points>(null!)
  const { pointer, viewport, size } = useThree()
  const isMobile = size.width < 768

  // Smaller, faster on mobile; still plenty dense on desktop.
  const count = isMobile ? 6500 : 14000

  const { positions, basePositions, colors, sizes } = useMemo(() => {
    const r = seededRandom(42)
    const pos = new Float32Array(count * 3)
    const bas = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    const siz = new Float32Array(count)

    // Distribute particles on a slightly thick disc that fills the
    // camera frustum. Aspect-aware so the field is always full.
    const w = 16 // world width
    const h = 9  // world height
    for (let i = 0; i < count; i++) {
      // 85% in a "main field", 15% scattered far for depth
      const far = r() < 0.15
      const x = (r() - 0.5) * w * (far ? 1.6 : 1)
      const y = (r() - 0.5) * h * (far ? 1.6 : 1)
      const z = far ? -4 - r() * 6 : (r() - 0.5) * 1.5

      pos[i * 3]     = x
      pos[i * 3 + 1] = y
      pos[i * 3 + 2] = z
      bas[i * 3]     = x
      bas[i * 3 + 1] = y
      bas[i * 3 + 2] = z

      // Brightness: most particles dim, some bright sparkles
      let b = 0.4 + r() * 0.4
      if (r() < 0.04) b = 1.0 + r() * 0.4
      if (far) b *= 0.5
      col[i * 3]     = b
      col[i * 3 + 1] = b
      col[i * 3 + 2] = b

      siz[i] = r() < 0.04 ? 0.05 + r() * 0.04 : 0.018 + r() * 0.022
    }
    return { positions: pos, basePositions: bas, colors: col, sizes: siz }
  }, [count])

  // velocity buffer + reused vectors (zero per-frame allocs)
  const velocities = useRef(new Float32Array(count * 3))
  const mouse3D = useRef(new THREE.Vector3(9999, 9999, 0))
  const mouseTarget = useRef(new THREE.Vector3(9999, 9999, 0))
  const mouseActive = useRef(0)

  useFrame((state) => {
    if (!mesh.current) return
    const posAttr = mesh.current.geometry.getAttribute('position')
    if (!posAttr) return
    const pos = posAttr.array as Float32Array
    const vel = velocities.current
    const t = state.clock.elapsedTime

    // ── Update mouse target in world space (smooth) ──
    if (!isMobile) {
      const ndc = new THREE.Vector3(pointer.x, pointer.y, 0.4)
      ndc.unproject(state.camera)
      const dir = ndc.sub(state.camera.position).normalize()
      const dist = -state.camera.position.z / dir.z
      mouseTarget.current
        .copy(state.camera.position)
        .add(dir.multiplyScalar(dist))
      mouseActive.current = Math.min(1, mouseActive.current + 0.06)
    } else {
      // Mobile: drive a slow figure-8 so the field stays alive
      const mx = Math.sin(t * 0.4) * 3.5
      const my = Math.sin(t * 0.8) * 2.0
      mouseTarget.current.set(mx, my, 0)
      mouseActive.current = 1
    }
    mouse3D.current.lerp(mouseTarget.current, 0.12)

    // ── Per-particle update ──
    const mx = mouse3D.current.x
    const my = mouse3D.current.y
    const mz = mouse3D.current.z
    const mouseInfluence = 2.2 * mouseActive.current
    const mouseRadius = 2.2
    const mouseRadiusSq = mouseRadius * mouseRadius

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      const bx = basePositions[i3]
      const by = basePositions[i3 + 1]
      const bz = basePositions[i3 + 2]

      // Flow field: two perpendicular sine waves that drift in time.
      // This makes the whole field "breathe" and sweep left-to-right
      // even when the mouse is idle.
      const wave =
        Math.sin(bx * 0.45 + t * 0.7) * 0.45 +
        Math.cos(by * 0.6 - t * 0.55) * 0.35 +
        Math.sin((bx + by) * 0.3 + t * 0.4) * 0.25

      // Spring back to base, biased by the flow field
      vel[i3]     += (bx + wave - pos[i3])     * 0.045
      vel[i3 + 1] += (by + wave * 0.5 - pos[i3 + 1]) * 0.045
      vel[i3 + 2] += (bz - pos[i3 + 2]) * 0.04

      // Mouse repulsion (3D distance)
      const dx = pos[i3]     - mx
      const dy = pos[i3 + 1] - my
      const dz = pos[i3 + 2] - mz
      const distSq = dx * dx + dy * dy + dz * dz

      if (distSq < mouseRadiusSq && distSq > 0.0001) {
        const distVal = Math.sqrt(distSq)
        const falloff = (1 - distVal / mouseRadius) // 0..1
        const strength = falloff * falloff * mouseInfluence
        // Push outward
        vel[i3]     += (dx / distVal) * strength
        vel[i3 + 1] += (dy / distVal) * strength
        vel[i3 + 2] += (dz / distVal) * strength * 0.5
      }

      // Damping — keeps things stable
      vel[i3]     *= 0.86
      vel[i3 + 1] *= 0.86
      vel[i3 + 2] *= 0.86

      pos[i3]     += vel[i3]
      pos[i3 + 1] += vel[i3 + 1]
      pos[i3 + 2] += vel[i3 + 2]
    }

    posAttr.needsUpdate = true

    // Subtle group-level sway (NOT pointer-driven)
    if (mesh.current) {
      mesh.current.rotation.z = Math.sin(t * 0.1) * 0.02
    }
  })

  return (
    <points ref={mesh} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute
          args={[positions, 3]}
          attach="attributes-position"
          count={count}
          itemSize={3}
        />
        <bufferAttribute
          args={[colors, 3]}
          attach="attributes-color"
          count={count}
          itemSize={3}
        />
        <bufferAttribute
          args={[sizes, 1]}
          attach="attributes-size"
          count={count}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={isMobile ? 0.035 : 0.028}
        sizeAttenuation
        vertexColors
        transparent
        opacity={0.9}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

/* ──────────────────────────────────────────────────────────────
   AMBIENT GRID — a single thin wireframe plane far in the
   back. Adds structure, gives the void a horizon line. Static.
   ────────────────────────────────────────────────────────────── */
function HorizonGrid() {
  const ref = useRef<THREE.LineSegments>(null!)
  const geom = useMemo(() => {
    const g = new THREE.WireframeGeometry(new THREE.PlaneGeometry(40, 40, 40, 40))
    return g
  }, [])
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.z = state.clock.elapsedTime * 0.01
    }
  })
  return (
    <lineSegments ref={ref} position={[0, 0, -8]} geometry={geom}>
      <lineBasicMaterial
        color="#ffffff"
        transparent
        opacity={0.06}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </lineSegments>
  )
}

/* ──────────────────────────────────────────────────────────────
   CURSOR HALO — a soft white ring that follows the mouse in
   screen space, drawn in 3D at z=0. Pure visual feedback for
   the interaction. Hidden on mobile.
   ────────────────────────────────────────────────────────────── */
function CursorHalo() {
  const ring = useRef<THREE.Mesh>(null!)
  const inner = useRef<THREE.Mesh>(null!)
  const { pointer, size, camera } = useThree()
  const isMobile = size.width < 768

  const tmp = useMemo(() => new THREE.Vector3(), [])

  useFrame((state) => {
    if (isMobile) {
      if (ring.current) ring.current.visible = false
      if (inner.current) inner.current.visible = false
      return
    }
    // Convert NDC pointer to a point on z=0 plane
    tmp.set(pointer.x, pointer.y, 0.5)
    tmp.unproject(camera)
    const dir = tmp.sub(camera.position).normalize()
    const dist = -camera.position.z / dir.z
    const wx = camera.position.x + dir.x * dist
    const wy = camera.position.y + dir.y * dist

    if (ring.current) {
      ring.current.position.set(wx, wy, 0)
      ring.current.visible = true
      ring.current.scale.setScalar(0.9 + Math.sin(state.clock.elapsedTime * 2) * 0.05)
    }
    if (inner.current) {
      inner.current.position.set(wx, wy, 0)
      inner.current.visible = true
    }
  })

  return (
    <>
      <mesh ref={ring}>
        <ringGeometry args={[0.18, 0.22, 64]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.55}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      <mesh ref={inner}>
        <circleGeometry args={[0.06, 32]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.9}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </>
  )
}

/* ──────────────────────────────────────────────────────────────
   SCENE
   ────────────────────────────────────────────────────────────── */
function Scene() {
  return (
    <>
      <HorizonGrid />
      <InteractiveField />
      <CursorHalo />
    </>
  )
}

export default function HeroScene() {
  return (
    <div className="pointer-events-none absolute inset-0">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.0,
        }}
        dpr={[1, 1.5]}
        style={{ background: '#000000' }}
      >
        <Scene />
      </Canvas>
    </div>
  )
}
