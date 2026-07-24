'use client'

import { useRef, useMemo, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

/* ──────────────────────────────────────────────────────────────
   FACETED HEAD — single unified low-poly mesh

   Built from a deformed IcosahedronGeometry, with eyes placed
   inside the carved sockets. flatShading + wireframe overlay
   give the technical-drawing look.
   ────────────────────────────────────────────────────────────── */

function FacetHead() {
  // ALL hooks called unconditionally, in stable order
  const groupRef = useRef<THREE.Group>(null!)
  const headRef = useRef<THREE.Group>(null!)
  const target = useRef({ x: 0, y: 0 })
  const current = useRef({ x: 0, y: 0 })

  const { pointer, size } = useThree()
  const isMobile = size.width < 768

  // 4 material memos
  const matSkin = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#e8e8e8',
        roughness: 0.55,
        metalness: 0.05,
        flatShading: true,
      }),
    []
  )
  const matEyeWhite = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#f5f5f5',
        roughness: 0.4,
        metalness: 0.0,
        flatShading: true,
      }),
    []
  )
  const matPupil = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#0a0a0a',
        roughness: 0.3,
        metalness: 0.5,
        flatShading: true,
      }),
    []
  )
  const matWire = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color: '#ffffff',
        transparent: true,
        opacity: 0.55,
      }),
    []
  )

  // Build the head geometry
  const headGeom = useMemo(() => {
    const geom = new THREE.IcosahedronGeometry(1, 1)
    const pos = geom.attributes.position
    const v = new THREE.Vector3()

    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i)

      // 1) Stretch vertically for head proportion
      v.y *= 1.25
      // 2) Slight z-stretch for front-back depth
      v.z *= 1.05

      // 3) Flatten the back of the skull
      if (v.z < 0) v.z *= 0.7

      // 4) Carve eye sockets on the front
      if (v.z > 0.4 && v.y > -0.1 && v.y < 0.4) {
        const ey = v.y - 0.15
        const distL = Math.hypot(v.x + 0.28, ey * 1.5)
        const distR = Math.hypot(v.x - 0.28, ey * 1.5)
        const dist = Math.min(distL, distR)
        if (dist < 0.25 && v.z > 0.5) {
          v.z -= (0.25 - dist) * 0.35
          v.y += (0.25 - dist) * 0.05
        }
      }

      // 5) Nose ridge
      if (v.z > 0.5 && Math.abs(v.x) < 0.15 && v.y > -0.2 && v.y < 0.25) {
        v.z += 0.18
        v.y *= 0.95
      }

      // 6) Brow ridge
      if (v.z > 0.5 && v.y > 0.35 && v.y < 0.55 && Math.abs(v.x) < 0.5) {
        v.z += 0.06
      }

      // 7) Mouth valley
      if (v.z > 0.4 && Math.abs(v.y + 0.4) < 0.1 && Math.abs(v.x) < 0.35) {
        v.z -= 0.08
        v.x *= 1.05
      }

      // 8) Lips (slight forward push at the mouth line)
      if (v.z > 0.4 && Math.abs(v.y + 0.42) < 0.05 && Math.abs(v.x) < 0.3) {
        v.z += 0.04
      }

      // 9) Chin
      if (v.z > 0.3 && v.y < -0.7 && v.y > -1.0 && Math.abs(v.x) < 0.3) {
        v.z += 0.06
        v.x *= 0.95
      }

      // 10) Cheekbones
      if (v.z > 0.3 && v.y > 0.0 && v.y < 0.25 && Math.abs(v.x) > 0.4) {
        v.x *= 1.05
        v.z += 0.03
      }

      // 11) Taper to neck at the bottom
      if (v.y < -0.95) {
        const t = Math.max(0, (v.y + 0.95) / -0.45 + 1)
        v.x *= 0.4 + 0.6 * t
        v.z *= 0.5 + 0.5 * t
      }

      pos.setXYZ(i, v.x, v.y, v.z)
    }

    geom.computeVertexNormals()
    return geom
  }, [])

  // Wireframe overlay (built from the same geometry)
  const headWire = useMemo(
    () => new THREE.LineSegments(new THREE.EdgesGeometry(headGeom, 1), matWire),
    [headGeom, matWire]
  )

  useFrame((state) => {
    const t = state.clock.elapsedTime

    if (!isMobile) {
      target.current.x = pointer.x * 0.4
      target.current.y = -pointer.y * 0.25
    } else {
      target.current.x = Math.sin(t * 0.25) * 0.25
      target.current.y = Math.cos(t * 0.2) * 0.15
    }
    current.current.x += (target.current.x - current.current.x) * 0.05
    current.current.y += (target.current.y - current.current.y) * 0.05

    if (headRef.current) {
      headRef.current.rotation.y = current.current.x
      headRef.current.rotation.x = current.current.y
      const breath = 1 + Math.sin(t * 0.7) * 0.008
      headRef.current.scale.set(breath, breath, breath)
      headRef.current.position.y = Math.sin(t * 0.6) * 0.02
    }
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.015
    }
  })

  return (
    <group ref={groupRef}>
      <group ref={headRef}>
        <mesh geometry={headGeom} material={matSkin} />
        <primitive object={headWire} />

        {/* LEFT EYE */}
        <group position={[-0.28, 0.16, 0.78]}>
          <mesh material={matEyeWhite}>
            <sphereGeometry args={[0.07, 12, 12]} />
          </mesh>
          <mesh material={matPupil} position={[0, 0, 0.05]}>
            <sphereGeometry args={[0.035, 10, 10]} />
          </mesh>
        </group>

        {/* RIGHT EYE */}
        <group position={[0.28, 0.16, 0.78]}>
          <mesh material={matEyeWhite}>
            <sphereGeometry args={[0.07, 12, 12]} />
          </mesh>
          <mesh material={matPupil} position={[0, 0, 0.05]}>
            <sphereGeometry args={[0.035, 10, 10]} />
          </mesh>
        </group>
      </group>
    </group>
  )
}

/* ──────────────────────────────────────────────────────────────
   CONSTELLATION DOTS
   ────────────────────────────────────────────────────────────── */
function Constellation({ count = 80 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null!)

  const data = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const base = new Float32Array(count * 3)
    const sizes = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      const radius = 1.8 + Math.random() * 0.5
      const theta = Math.random() * Math.PI * 2
      const y = (Math.random() - 0.5) * 2.4
      const x = radius * Math.cos(theta)
      const z = radius * Math.sin(theta)
      positions[i * 3]     = x
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = z
      base[i * 3]          = x
      base[i * 3 + 1]      = y
      base[i * 3 + 2]      = z
      sizes[i] = 0.01 + Math.random() * 0.025
    }
    return { positions, base, sizes }
  }, [count])

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime
    const pos = ref.current.geometry.getAttribute('position').array as Float32Array
    const { base } = data
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      const r = Math.sqrt(base[i3] ** 2 + base[i3 + 2] ** 2)
      const baseTheta = Math.atan2(base[i3 + 2], base[i3])
      const speed = 0.05 + (i % 4) * 0.02
      const theta = baseTheta + t * speed
      pos[i3]     = r * Math.cos(theta)
      pos[i3 + 1] = base[i3 + 1] + Math.sin(t * 0.4 + i) * 0.05
      pos[i3 + 2] = r * Math.sin(theta)
    }
    ref.current.geometry.getAttribute('position').needsUpdate = true
  })

  return (
    <points ref={ref} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute
          args={[data.positions, 3]}
          attach="attributes-position"
          count={count}
          itemSize={3}
        />
        <bufferAttribute
          args={[data.sizes, 1]}
          attach="attributes-size"
          count={count}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        sizeAttenuation
        color="#ffffff"
        transparent
        opacity={0.9}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

/* ──────────────────────────────────────────────────────────────
   SCENE — no postprocessing (postprocessing adds ~100KB and
   triggers the THREE.Clock deprecation warning)
   ────────────────────────────────────────────────────────────── */
function PortraitScene() {
  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight position={[2.5, 3, 3]} intensity={1.0} color="#ffffff" />
      <directionalLight position={[-2, 1, 1.5]} intensity={0.4} color="#ffffff" />
      <directionalLight position={[0, 0.5, -3]} intensity={0.5} color="#ffffff" />

      <FacetHead />
      <Constellation count={80} />
    </>
  )
}

/* ──────────────────────────────────────────────────────────────
   WRAPPER
   ────────────────────────────────────────────────────────────── */
export default function PortraitCanvas() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/30">
          Loading · 3D
        </div>
      </div>
    )
  }

  return (
    <Canvas
      camera={{ position: [0, 0.1, 3.0], fov: 38 }}
      gl={{
        antialias: true,
        powerPreference: 'high-performance',
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.0,
      }}
      dpr={[1, 1.5]}
      style={{ background: 'transparent' }}
    >
      <PortraitScene />
    </Canvas>
  )
}
