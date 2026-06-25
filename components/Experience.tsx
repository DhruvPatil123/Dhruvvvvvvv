"use client"

import React, { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { MeshDistortMaterial, MeshWobbleMaterial, Sphere, TorusKnot, Float } from '@react-three/drei'
import * as THREE from 'three'
import { useScrollStore } from '@/store/useScrollStore'
import CosmicDust from './CosmicDust'

export default function Experience() {
  const { size } = useThree()
  const isMobile = size.width < 768

  const coreRef = useRef<any>(null)
  const ring1Ref = useRef<any>(null)
  const ring2Ref = useRef<any>(null)
  const ring3Ref = useRef<any>(null)
  const distortMaterialRef = useRef<any>(null)
  const innerCoreMatRef = useRef<any>(null)

  const scrollProgress = useScrollStore((state) => state.scrollProgress)
  const prevScrollRef = useRef(scrollProgress)
  const scrollSpeedRef = useRef(0)

  // Pre-calculate segments for custom Majestic Orbital Rings
  const ring2Segments = useMemo(() => {
    const count = 30
    const radius = 2.4
    const segments = []
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2
      segments.push({
        position: [Math.cos(angle) * radius, Math.sin(angle) * radius, 0] as [number, number, number],
        rotation: [0, 0, angle] as [number, number, number]
      })
    }
    return segments
  }, [])

  const ring3Segments = useMemo(() => {
    const count = 16
    const radius = 1.8
    const segments = []
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2
      segments.push({
        position: [Math.cos(angle) * radius, Math.sin(angle) * radius, 0] as [number, number, number]
      })
    }
    return segments
  }, [])

  useFrame((state) => {
    const t = state.clock.getElapsedTime()

    // 1. Calculate Scroll Speed (Velocity)
    const currentScroll = scrollProgress
    const scrollDiff = Math.abs(currentScroll - prevScrollRef.current)
    prevScrollRef.current = currentScroll
    
    // Smoothly interpolate scroll speed to avoid jitter
    scrollSpeedRef.current = THREE.MathUtils.lerp(scrollSpeedRef.current, scrollDiff * 14.0, 0.08)

    // TARGETS BASED ON SCROLL PROGRESS
    // 0% (Hero) -> 20% (About) -> 40% (Projects) -> 60% (Timeline) -> 80% (Testimonials) -> 100% (Contact)

    let targetX = 0
    let targetY = 0
    let targetZ = 0
    let targetScale = isMobile ? 0.6 : 1.1
    let targetRotationY = t * 0.3
    let targetColor = new THREE.Color('#00f2ff')

    if (scrollProgress < 0.2) {
      // Hero
      targetX = 0
      targetScale = isMobile ? 0.6 : 1.1
    } else if (scrollProgress < 0.4) {
      // About
      targetX = THREE.MathUtils.lerp(0, isMobile ? 0 : 2, (scrollProgress - 0.2) / 0.2)
      targetRotationY = t * 0.8
      targetColor.set('#7000ff')
      targetScale = isMobile ? 0.55 : 1.1
    } else if (scrollProgress < 0.6) {
      // Projects
      targetX = THREE.MathUtils.lerp(isMobile ? 0 : 2, 0, (scrollProgress - 0.4) / 0.2)
      targetScale = THREE.MathUtils.lerp(isMobile ? 0.55 : 1.1, isMobile ? 0.75 : 1.5, (scrollProgress - 0.4) / 0.2)
      targetColor.set('#ffffff')
    } else if (scrollProgress < 0.8) {
      // Timeline
      targetX = THREE.MathUtils.lerp(0, isMobile ? 0 : -2, (scrollProgress - 0.6) / 0.2)
      targetZ = THREE.MathUtils.lerp(0, 0.5, (scrollProgress - 0.6) / 0.2)
      targetScale = isMobile ? 0.55 : 1.1
      targetColor.set('#00f2ff')
    } else {
      // Contact
      targetX = THREE.MathUtils.lerp(isMobile ? 0 : -2, 0, (scrollProgress - 0.8) / 0.2)
      targetZ = THREE.MathUtils.lerp(0.5, 0, (scrollProgress - 0.8) / 0.2)
      targetScale = THREE.MathUtils.lerp(isMobile ? 0.55 : 1.1, isMobile ? 0.65 : 1.3, (scrollProgress - 0.8) / 0.2)
      targetColor.set('#ffcc00')
    }

    // 2. Pulse / Heartbeat Rhythm calculation
    // Elegant double peak sequence: "Lup-Dup" heartbeat
    const beatTime = (t * 2.8) % (Math.PI * 2)
    const heartbeatPulse = Math.pow(Math.sin(beatTime), 8) + 0.35 * Math.pow(Math.sin(beatTime + 0.3), 12)

    // Base rhythm scale pulsing (amplified slightly under rapid scroll speed)
    const rhythmPulse = heartbeatPulse * (0.04 + scrollSpeedRef.current * 0.08)

    // 3. Physical Volume-Conserving Squash & Stretch under fast transitions
    // Stretch along the moving (vertical) dimension, compress along others to keep volume visually equal
    const stretchY = 1.0 + scrollSpeedRef.current * 0.35
    const squashXZ = 1.0 / Math.sqrt(stretchY)

    if (coreRef.current) {
      coreRef.current.position.x = THREE.MathUtils.lerp(coreRef.current.position.x, targetX, 0.08)
      coreRef.current.position.z = THREE.MathUtils.lerp(coreRef.current.position.z, targetZ, 0.08)
      
      const currentScaleX = THREE.MathUtils.lerp(coreRef.current.scale.x, targetScale, 0.08)
      
      // Apply Squash and Stretch dynamically
      coreRef.current.scale.set(
        (currentScaleX + rhythmPulse) * squashXZ,
        (currentScaleX + rhythmPulse) * stretchY,
        (currentScaleX + rhythmPulse) * squashXZ
      )
      
      coreRef.current.rotation.y = THREE.MathUtils.lerp(coreRef.current.rotation.y, targetRotationY, 0.08)
    }

    // 4. Dynamic distort & speed reaction based on scrolling velocity
    if (distortMaterialRef.current) {
      distortMaterialRef.current.color.lerp(targetColor, 0.05)
      distortMaterialRef.current.emissive.lerp(targetColor, 0.05)
      
      // Speed and distortion intensify during scroll transitions (glowing ripples)
      distortMaterialRef.current.distort = THREE.MathUtils.lerp(distortMaterialRef.current.distort, 0.45 + scrollSpeedRef.current * 0.35, 0.1)
      distortMaterialRef.current.speed = THREE.MathUtils.lerp(distortMaterialRef.current.speed, 2.5 + scrollSpeedRef.current * 2.5, 0.1)
    }

    // 5. Heartbeat pulsing on the inner emissive core
    if (innerCoreMatRef.current) {
      const scrollGlowMultiplier = 1.0 + scrollSpeedRef.current * 3.0
      innerCoreMatRef.current.emissiveIntensity = (1.5 + heartbeatPulse * 2.2) * scrollGlowMultiplier
    }

    if (ring1Ref.current) {
      // Rotation gets faster when scrolling!
      const scrollRingSpeed = 1.0 + scrollSpeedRef.current * 2.5
      ring1Ref.current.rotation.z += (0.003 * scrollRingSpeed)
      ring1Ref.current.rotation.x = Math.PI / 2.2 + Math.sin(t * 0.15) * 0.12
      ring1Ref.current.rotation.y = Math.cos(t * 0.1) * 0.08
    }

    if (ring2Ref.current) {
      const scrollRingSpeed2 = 1.0 + scrollSpeedRef.current * 2.5
      ring2Ref.current.rotation.z -= (0.0055 * scrollRingSpeed2)
      ring2Ref.current.rotation.x = Math.PI / 2.6 + Math.cos(t * 0.22) * 0.15
      ring2Ref.current.rotation.y = Math.sin(t * 0.18) * 0.12
    }

    if (ring3Ref.current) {
      const scrollRingSpeed3 = 1.0 + scrollSpeedRef.current * 3.5
      ring3Ref.current.rotation.z += (0.0125 * scrollRingSpeed3)
      ring3Ref.current.rotation.x = -Math.PI / 2.8 + Math.sin(t * 0.35) * 0.22
      ring3Ref.current.rotation.y = Math.cos(t * 0.28) * 0.18
    }
  })

  return (
    <group>
      {/* Background Cosmic Dust Nebula */}
      <CosmicDust />

      {/* Central Core Composition */}
      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        <group ref={coreRef}>
          {/* Main Distorted Knot */}
          <TorusKnot args={[1, 0.33, 256, 64]} scale={1.1}>
            <MeshDistortMaterial
              ref={distortMaterialRef}
              color="#00f2ff"
              speed={2.5}
              distort={0.45}
              transmission={1.0}
              thickness={1.5}
              roughness={0.05}
              metalness={0.05}
              clearcoat={1.0}
              clearcoatRoughness={0.05}
              ior={1.6}
              iridescence={1.0}
              iridescenceIOR={1.8}
              iridescenceThicknessRange={[100, 800]}
              envMapIntensity={2.5}
              emissive="#00f2ff"
              emissiveIntensity={0.1}
            />
          </TorusKnot>

          {/* Inner Glowing Sphere */}
          <Sphere args={[0.4, 32, 32]}>
            <meshStandardMaterial
              ref={innerCoreMatRef}
              color="#7000ff"
              emissive="#7000ff"
              emissiveIntensity={2}
              metalness={1}
              roughness={0}
            />
          </Sphere>
        </group>
      </Float>

      {/* Majestic Orbital Rings */}
      {/* 1. Sleek Continuous Neon Cyan Ring */}
      <group ref={ring1Ref}>
        <mesh>
          <torusGeometry args={[2.9, 0.012, 16, 120]} />
          <meshStandardMaterial
            color="#00f2ff"
            emissive="#00f2ff"
            emissiveIntensity={1.8}
            roughness={0}
            metalness={0.9}
          />
        </mesh>
      </group>

      {/* 2. Middle Segmented Astronautical Indigo Dashboard-Ring */}
      <group ref={ring2Ref}>
        {ring2Segments.map((seg, idx) => (
          <mesh key={idx} position={seg.position} rotation={seg.rotation}>
            <boxGeometry args={[0.22, 0.015, 0.015]} />
            <meshStandardMaterial
              color="#a855f7"
              emissive="#7000ff"
              emissiveIntensity={2.5}
              roughness={0.1}
              metalness={0.8}
            />
          </mesh>
        ))}
      </group>

      {/* 3. Inner Dotted Fast Golden Particle Halo */}
      <group ref={ring3Ref}>
        {ring3Segments.map((seg, idx) => (
          <mesh key={idx} position={seg.position}>
            <sphereGeometry args={[0.028, 12, 12]} />
            <meshStandardMaterial
              color="#ffcc00"
              emissive="#eab308"
              emissiveIntensity={3.0}
              roughness={0}
              metalness={1.0}
            />
          </mesh>
        ))}
      </group>

      {/* Dynamic Accents */}
      <Float speed={3} position={[3, 2, -2]} rotationIntensity={2}>
        <Sphere args={[0.2, 32, 32]}>
          <MeshWobbleMaterial color="#7000ff" factor={1} speed={2} />
        </Sphere>
      </Float>

      <Float speed={2} position={[-3, -1, 1]} rotationIntensity={1}>
        <Sphere args={[0.15, 32, 32]}>
          <MeshWobbleMaterial color="#ffffff" factor={1} speed={1.5} />
        </Sphere>
      </Float>

      <Float speed={4} position={[1, -3, -2]} rotationIntensity={1.5}>
        <Sphere args={[0.1, 32, 32]}>
          <MeshWobbleMaterial color="#00f2ff" factor={1} speed={3} />
        </Sphere>
      </Float>
    </group>
  )
}
