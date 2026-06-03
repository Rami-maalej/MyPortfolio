'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { rand } from '@/lib/utils'

function Particles({ count = 3000 }) {
  const mesh = useRef<THREE.Points>(null!)

  const [positions, colors, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    const siz = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      const r = rand(5, 20)
      const theta = rand(0, Math.PI * 2)
      const phi = Math.acos(rand(-1, 1))
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = r * Math.cos(phi)
      const c = new THREE.Color().setHSL(rand(0.6, 0.9), 0.8, rand(0.5, 0.8))
      col[i * 3] = c.r
      col[i * 3 + 1] = c.g
      col[i * 3 + 2] = c.b
      siz[i] = rand(0.02, 0.07)
    }
    return [pos, col, siz]
  }, [count])

  useFrame((state) => {
    if (!mesh.current) return
    const time = state.clock.elapsedTime
    const positions = mesh.current.geometry.attributes.position.array as Float32Array
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      const x = positions[i3]
      const y = positions[i3 + 1]
      const z = positions[i3 + 2]
      const speed = rand(0.1, 0.3)
      positions[i3] = x * Math.cos(speed * 0.01) + z * Math.sin(speed * 0.01)
      positions[i3 + 2] = -x * Math.sin(speed * 0.01) + z * Math.cos(speed * 0.01)
      positions[i3 + 1] = y + Math.sin(time + i) * 0.002
    }
    mesh.current.geometry.attributes.position.needsUpdate = true
    mesh.current.rotation.y = time * 0.02
    mesh.current.rotation.x = Math.sin(time * 0.01) * 0.1
    mesh.current.rotation.z = Math.cos(time * 0.015) * 0.05
  })

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute args={[positions, 3]} attach="attributes-position" count={count} itemSize={3} />
        <bufferAttribute args={[colors, 3]} attach="attributes-color" count={count} itemSize={3} />
        <bufferAttribute args={[sizes, 1]} attach="attributes-size" count={count} itemSize={1} />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

export default function ParticleField() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 12], fov: 60 }}>
        <Particles count={2500} />
      </Canvas>
    </div>
  )
}
