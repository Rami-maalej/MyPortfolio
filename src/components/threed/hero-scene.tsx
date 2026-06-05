'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { rand } from '@/lib/utils'

function organicNoise(x: number, y: number, z: number): number {
  let val = 0
  val += Math.sin(x * 1.2 + y * 0.8 + z * 1.5) * 0.5
  val += Math.sin(x * 2.5 + y * 2.1 + z * 1.8) * 0.25
  val += Math.sin(x * 4.1 + y * 3.7 + z * 3.3) * 0.125
  val += Math.sin(x * 6.3 + y * 5.9 + z * 5.7) * 0.0625
  return val / (0.5 + 0.25 + 0.125 + 0.0625)
}

function generateParticles(count: number) {
  const pos = new Float32Array(count * 3)
  const base = new Float32Array(count * 3)
  const cols = new Float32Array(count * 3)

  for (let i = 0; i < count; i++) {
    const theta = rand(0, Math.PI * 2)
    const phi = Math.acos(rand(-1, 1))
    const baseR = rand(1.8, 2.4)

    const nx = Math.sin(phi) * Math.cos(theta)
    const ny = Math.sin(phi) * Math.sin(theta)
    const nz = Math.cos(phi)

    const noise = organicNoise(nx * 2, ny * 2, nz * 2) * 1.0
    const r = baseR + noise * 0.6

    const x = r * nx
    const y = r * ny * 0.85
    const z = r * nz

    pos[i * 3] = x
    pos[i * 3 + 1] = y
    pos[i * 3 + 2] = z
    base[i * 3] = x
    base[i * 3 + 1] = y
    base[i * 3 + 2] = z

    const depthNorm = (z + 3) / 6
    const brightness = 0.3 + depthNorm * 0.7
    cols[i * 3] = brightness
    cols[i * 3 + 1] = brightness
    cols[i * 3 + 2] = brightness
  }

  return { positions: pos, basePositions: base, colors: cols }
}

function ParticleDispersion() {
  const mesh = useRef<THREE.Points>(null!)
  const { pointer, viewport, size } = useThree()

  const isMobile = size.width < 768
  const count = isMobile ? 5000 : 12000
  const { positions, basePositions, colors } = useMemo(() => generateParticles(count), [count])
  const velocities = useRef(new Float32Array(count * 3))
  const targetRotation = useRef({ x: 0, y: 0 })
  const currentRotation = useRef({ x: 0, y: 0 })
  const mouse3D = useRef(new THREE.Vector3())

  useFrame((state) => {
    if (!mesh.current) return

    const posAttr = mesh.current.geometry.getAttribute('position')
    if (!posAttr) return
    const pos = posAttr.array as Float32Array
    const vel = velocities.current

    const time = state.clock.elapsedTime

    let mouseWorld: THREE.Vector3 | null = null
    if (!isMobile) {
      const ndc = new THREE.Vector3(pointer.x, pointer.y, 0.5)
      ndc.unproject(state.camera)
      const dir = ndc.sub(state.camera.position).normalize()
      const dist = -state.camera.position.z / dir.z
      mouseWorld = state.camera.position.clone().add(dir.multiplyScalar(dist))
      mouse3D.current.copy(mouseWorld)
    }

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      const bx = basePositions[i3]
      const by = basePositions[i3 + 1]
      const bz = basePositions[i3 + 2]

      const breathe = Math.sin(time * 0.4 + i * 0.002) * 0.03

      vel[i3] += (bx - pos[i3]) * 0.06
      vel[i3 + 1] += (by - pos[i3 + 1]) * 0.06
      vel[i3 + 2] += (bz - pos[i3 + 2]) * 0.06

      if (!isMobile && mouseWorld) {
        const dx = pos[i3] - mouseWorld.x
        const dy = pos[i3 + 1] - mouseWorld.y
        const dz = pos[i3 + 2] - mouseWorld.z
        const distSq = dx * dx + dy * dy + dz * dz
        const maxDist = 150 / viewport.width

        if (distSq < maxDist * maxDist && distSq > 0.001) {
          const distVal = Math.sqrt(distSq)
          const strength = ((maxDist - distVal) / maxDist) * 2.5
          const norm = strength / distVal
          vel[i3] += dx * norm * 0.4
          vel[i3 + 1] += dy * norm * 0.4
          vel[i3 + 2] += dz * norm * 0.4
        }
      }

      vel[i3] *= 0.9
      vel[i3 + 1] *= 0.9
      vel[i3 + 2] *= 0.9

      pos[i3] += vel[i3]
      pos[i3 + 1] += vel[i3 + 1] + breathe
      pos[i3 + 2] += vel[i3 + 2]
    }

    posAttr.needsUpdate = true

    if (!isMobile) {
      targetRotation.current.y = pointer.x * 0.18
      targetRotation.current.x = pointer.y * 0.12
    } else {
      targetRotation.current.y = time * 0.04
      targetRotation.current.x = 0
    }
    currentRotation.current.x += (targetRotation.current.x - currentRotation.current.x) * 0.03
    currentRotation.current.y += (targetRotation.current.y - currentRotation.current.y) * 0.03

    mesh.current.rotation.x = currentRotation.current.x
    mesh.current.rotation.y = currentRotation.current.y
  })

  return (
    <points ref={mesh} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute args={[positions, 3]} attach="attributes-position" count={count} itemSize={3} />
        <bufferAttribute args={[colors, 3]} attach="attributes-color" count={count} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={isMobile ? 0.1 : 0.075}
        sizeAttenuation
        vertexColors
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={isMobile ? 0.7 : 0.85}
      />
    </points>
  )
}

export default function HeroScene() {
  return (
    <div className="pointer-events-none absolute inset-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 65 }}
        gl={{ alpha: false, antialias: true, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
        style={{ background: '#000000' }}
      >
        <color args={['#000000']} attach="background" />
        <ParticleDispersion />
      </Canvas>
    </div>
  )
}
