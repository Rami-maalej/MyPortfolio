'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

/* ──────────────────────────────────────────────────────────────
   FLOATING CRYSTAL — a gem-cut octahedron with gold-tinted
   facets, rotating slowly, with mouse tracking parallax.
   Each face reflects different brightness to simulate gems.
   ────────────────────────────────────────────────────────────── */
function Crystal() {
  const groupRef = useRef<THREE.Group>(null!)
  const meshRef = useRef<THREE.Mesh>(null!)
  const { pointer } = useThree()

  const target = useRef({ x: 0, y: 0 })
  const current = useRef({ x: 0, y: 0 })

  // Gold-tinted faceted material
  const mat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#c9a84c',
    metalness: 0.9,
    roughness: 0.08,
    flatShading: true,
    envMapIntensity: 1.2,
  }), [])

  const wireMat = useMemo(() => new THREE.MeshBasicMaterial({
    color: '#e8d5a3',
    wireframe: true,
    transparent: true,
    opacity: 0.12,
  }), [])

  // Custom gem geometry — stretched + cut octahedron
  const gemGeom = useMemo(() => {
    const g = new THREE.OctahedronGeometry(1, 0)
    const pos = g.attributes.position
    const v = new THREE.Vector3()

    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i)
      // Stretch to diamond silhouette
      v.y *= 1.6
      if (v.y > 0) v.y *= 0.7 // Flatten crown
      if (v.y < 0) v.y *= 1.1 // Elongate pavilion
      // Add slight x/z faceting
      v.x *= 0.85 + Math.abs(v.y) * 0.08
      v.z *= 0.85 + Math.abs(v.y) * 0.08
      pos.setXYZ(i, v.x, v.y, v.z)
    }

    g.computeVertexNormals()
    return g
  }, [])

  useFrame((state) => {
    const t = state.clock.elapsedTime

    // Smooth mouse follow
    target.current.x = pointer.x * 0.3
    target.current.y = -pointer.y * 0.2
    current.current.x += (target.current.x - current.current.x) * 0.04
    current.current.y += (target.current.y - current.current.y) * 0.04

    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.4 + current.current.x
      groupRef.current.rotation.x = Math.sin(t * 0.3) * 0.15 + current.current.y
      groupRef.current.position.y = Math.sin(t * 0.7) * 0.08
    }
  })

  return (
    <group ref={groupRef}>
      {/* Main gem */}
      <mesh ref={meshRef} geometry={gemGeom} material={mat} />

      {/* Wireframe overlay */}
      <mesh geometry={gemGeom} material={wireMat} />

      {/* Inner glow core */}
      <mesh>
        <sphereGeometry args={[0.3, 8, 8]} />
        <meshBasicMaterial
          color="#e8d5a3"
          transparent
          opacity={0.12}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Point light inside gem for refraction illusion */}
      <pointLight color="#c9a84c" intensity={2} distance={3} decay={2} position={[0, 0, 0]} />
    </group>
  )
}

function CrystalOrbit() {
  const ringRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.z = state.clock.elapsedTime * 0.2
      ringRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.3 + 1.2
    }
  })

  return (
    <mesh ref={ringRef}>
      <torusGeometry args={[1.4, 0.005, 8, 128]} />
      <meshBasicMaterial
        color="#c9a84c"
        transparent
        opacity={0.25}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  )
}

export default function FloatingCrystal() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4], fov: 35 }}
      gl={{
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.2,
      }}
      dpr={[1, 1.5]}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.2} />
      <directionalLight position={[3, 4, 3]} intensity={2.5} color="#ffffff" />
      <directionalLight position={[-2, -1, 2]} intensity={1.2} color="#c9a84c" />
      <directionalLight position={[0, -3, -2]} intensity={0.8} color="#e8d5a3" />
      <Crystal />
      <CrystalOrbit />
    </Canvas>
  )
}
