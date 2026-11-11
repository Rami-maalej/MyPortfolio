"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import type { Group, Mesh } from "three"

function Icosahedron() {
  const mesh = useRef<Mesh>(null)
  const reduced = useRef<boolean | null>(null)
  useFrame((state, delta) => {
    if (!mesh.current) return
    reduced.current ??= window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduced.current) return
    mesh.current.rotation.x += delta * 0.16
    mesh.current.rotation.y += delta * 0.22
    mesh.current.position.x = state.pointer.x * 0.25
    mesh.current.position.y = state.pointer.y * 0.18
  })
  return (
    <mesh ref={mesh} scale={1.55}>
      <icosahedronGeometry args={[1, 0]} />
      <meshBasicMaterial color="#f5f5f2" wireframe transparent opacity={0.45} />
    </mesh>
  )
}

function OrbitSatellite() {
  const group = useRef<Group>(null)
  const reduced = useRef<boolean | null>(null)
  useFrame((state, delta) => {
    if (!group.current) return
    reduced.current ??= window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduced.current) return
    group.current.rotation.z += delta * 0.45
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.35
  })
  return (
    <group ref={group}>
      <mesh position={[2.3, 0, 0]}>
        <octahedronGeometry args={[0.13, 0]} />
        <meshBasicMaterial color="#8d8d88" wireframe transparent opacity={0.85} />
      </mesh>
    </group>
  )
}

export default function HeroObject() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 4], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <Icosahedron />
      <OrbitSatellite />
    </Canvas>
  )
}
