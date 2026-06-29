"use client"

import React, { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'
import { useScrollStore } from '@/store/useScrollStore'
import { useThemeStore } from '@/store/useThemeStore'
import CosmicDust from './CosmicDust'
import WireframeTerrain from './WireframeTerrain'

// Custom camera controller for smooth cinematic drift and cursor parallax
function CameraController() {
  const { camera } = useThree()

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    const mouse = state.pointer

    // 1. Slow, elegant cinematic orbit
    const orbitRadius = 6.8
    const orbitSpeed = 0.04
    const angle = t * orbitSpeed

    // 2. Combine slow orbit with delicate mouse parallax
    const targetX = Math.sin(angle) * 1.2 + mouse.x * 0.9
    const targetY = Math.cos(angle * 1.3) * 0.35 + mouse.y * 0.7
    const targetZ = orbitRadius + Math.cos(angle) * 0.4 - Math.abs(mouse.x) * 0.3

    // Smooth lerp for ultra-premium camera motion
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.04)
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.04)
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.04)

    // Camera gently points towards the hero glass monolith center
    const lookTarget = new THREE.Vector3(0, 0.1, 0)
    camera.lookAt(lookTarget)
  })

  return null
}

export default function Experience() {
  const { size } = useThree()
  const isMobile = size.width < 768

  const monolithRef = useRef<THREE.Mesh>(null)
  const ribbonRef = useRef<THREE.Mesh>(null)
  const ribbon2Ref = useRef<THREE.Mesh>(null)
  const orbitRingRef = useRef<THREE.Mesh>(null)
  const monolithGroupRef = useRef<THREE.Group>(null)

  const scrollProgress = useScrollStore((state) => state.scrollProgress)
  const theme = useThemeStore((state) => state.theme)

  const lastScrollProgress = useRef(0)
  const scrollVelocity = useRef(0)

  // Reactive color management
  const themeColor = useMemo(() => new THREE.Color('#00f2ff'), [])
  const glassColor = useMemo(() => new THREE.Color('#e0f7fc'), [])

  useFrame((state) => {
    const t = state.clock.getElapsedTime()

    // Dynamic lerping rate to sync with scroll velocity on precision trackpad flicking
    const currentScroll = scrollProgress
    const deltaScroll = Math.abs(currentScroll - lastScrollProgress.current)
    lastScrollProgress.current = currentScroll

    // Smoothly interpolate the scroll velocity to prevent frame-rate spikes
    scrollVelocity.current = THREE.MathUtils.lerp(scrollVelocity.current, deltaScroll, 0.15)

    // Under high velocity (aggressive swipe/trackpad flick), scale up lerping factor up to 0.28
    // so the 3D monolith instantly catches up to the DOM content. At rest, stay at smooth 0.08.
    const velocityScale = THREE.MathUtils.clamp(scrollVelocity.current * 12.0, 0, 1)
    const dynamicLerp = THREE.MathUtils.lerp(0.08, 0.28, velocityScale)

    // 1. Interpolate active colors based on current theme
    let targetRibbonHex = '#00f2ff' // Cobalt
    let targetGlassHex = '#e0f7fc'

    if (theme === 'charcoal') {
      targetRibbonHex = '#ffffff'
      targetGlassHex = '#f1f5f9'
    } else if (theme === 'emerald') {
      targetRibbonHex = '#10b981'
      targetGlassHex = '#ecfdf5'
    }

    themeColor.lerp(new THREE.Color(targetRibbonHex), 0.05)
    glassColor.lerp(new THREE.Color(targetGlassHex), 0.05)

    // 2. Responsive scroll positions matching original layouts
    let targetX = 0
    let targetY = 0.2
    let targetZ = 0
    let targetScale = isMobile ? 0.65 : 1.15
    let targetRotationY = t * 0.25

    if (scrollProgress < 0.2) {
      // Hero: Centered
      targetX = 0
    } else if (scrollProgress < 0.4) {
      // About: Shifts to the right (leaves left clear for bio text)
      targetX = THREE.MathUtils.lerp(0, isMobile ? 0 : 2.0, (scrollProgress - 0.2) / 0.2)
      targetRotationY = t * 0.5
      targetScale = isMobile ? 0.6 : 1.1
    } else if (scrollProgress < 0.6) {
      // Projects: Shifts back to center, slightly larger
      targetX = THREE.MathUtils.lerp(isMobile ? 0 : 2.0, 0, (scrollProgress - 0.4) / 0.2)
      targetScale = THREE.MathUtils.lerp(isMobile ? 0.6 : 1.1, isMobile ? 0.75 : 1.4, (scrollProgress - 0.4) / 0.2)
    } else if (scrollProgress < 0.8) {
      // Timeline: Shifts to the left (leaves right clear for timeline)
      targetX = THREE.MathUtils.lerp(0, isMobile ? 0 : -2.0, (scrollProgress - 0.6) / 0.2)
      targetZ = THREE.MathUtils.lerp(0, 0.4, (scrollProgress - 0.6) / 0.2)
      targetScale = isMobile ? 0.6 : 1.1
    } else {
      // Contact: Back to center, focus view
      targetX = THREE.MathUtils.lerp(isMobile ? 0 : -2.0, 0, (scrollProgress - 0.8) / 0.2)
      targetZ = THREE.MathUtils.lerp(0.4, 0, (scrollProgress - 0.8) / 0.2)
      targetScale = THREE.MathUtils.lerp(isMobile ? 0.6 : 1.1, isMobile ? 0.7 : 1.25, (scrollProgress - 0.8) / 0.2)
    }

    // 3. Smooth group placement
    if (monolithGroupRef.current) {
      monolithGroupRef.current.position.x = THREE.MathUtils.lerp(monolithGroupRef.current.position.x, targetX, dynamicLerp)
      monolithGroupRef.current.position.y = THREE.MathUtils.lerp(monolithGroupRef.current.position.y, targetY, dynamicLerp)
      monolithGroupRef.current.position.z = THREE.MathUtils.lerp(monolithGroupRef.current.position.z, targetZ, dynamicLerp)

      const currentScale = THREE.MathUtils.lerp(monolithGroupRef.current.scale.x, targetScale, dynamicLerp)
      monolithGroupRef.current.scale.set(currentScale, currentScale, currentScale)
    }

    // 4. Subtle, tactile interactive rotation on the Monolith
    if (monolithRef.current) {
      const targetRotY = targetRotationY + state.pointer.x * 0.35
      const targetRotX = -state.pointer.y * 0.25
      monolithRef.current.rotation.y = THREE.MathUtils.lerp(monolithRef.current.rotation.y, targetRotY, dynamicLerp)
      monolithRef.current.rotation.x = THREE.MathUtils.lerp(monolithRef.current.rotation.x, targetRotX, dynamicLerp)
    }

    // 5. Spin the inner glowing ribbon and outer complimentary ribbon independently
    if (ribbonRef.current) {
      ribbonRef.current.rotation.y = -t * 0.75
      ribbonRef.current.rotation.z = t * 0.2
    }
    if (ribbon2Ref.current) {
      ribbon2Ref.current.rotation.y = t * 0.95
      ribbon2Ref.current.rotation.z = -t * 0.3
    }

    // 6. Spin the glowing satellite ring based on elapsed time and scroll velocity
    if (orbitRingRef.current) {
      orbitRingRef.current.rotation.z = t * 0.35 + scrollProgress * 3.14
    }
  })

  return (
    <group>
      {/* 1. Cinematic Camera Control */}
      <CameraController />

      {/* 2. Base: Infinite Wireframe Terrain */}
      <WireframeTerrain />

      {/* 3. Mid layer: Floating Particle Galaxy */}
      <CosmicDust />

      {/* 4. Hero object: Glass Monolith with glowing twisting ribbon inside */}
      <Float speed={1.5} rotationIntensity={0.15} floatIntensity={0.4}>
        <group ref={monolithGroupRef}>
          {/* Glass Monolith Shell */}
          <mesh ref={monolithRef}>
            <boxGeometry args={[1.3, 2.7, 0.32]} />
            <meshPhysicalMaterial
              transmission={0.98}
              thickness={2.2}
              roughness={0.02}
              clearcoat={1.0}
              clearcoatRoughness={0.0}
              ior={1.65}
              metalness={0.05}
              color={glassColor}
              attenuationColor={glassColor}
              attenuationDistance={1.2}
            />
          </mesh>

          {/* Twisting ribbon inside the glass container - Outer Helix */}
          <mesh ref={ribbonRef} scale={[0.55, 1.85, 0.55]}>
            <torusKnotGeometry args={[0.5, 0.038, 200, 16, 2, 9]} />
            <meshStandardMaterial
              color={themeColor}
              emissive={themeColor}
              emissiveIntensity={3.2}
              roughness={0.15}
              metalness={0.85}
            />
          </mesh>

          {/* Inner counter-rotating twisting ribbon - Inner Helix */}
          <mesh ref={ribbon2Ref} scale={[0.42, 1.45, 0.42]}>
            <torusKnotGeometry args={[0.5, 0.024, 180, 12, 3, 5]} />
            <meshStandardMaterial
              color={themeColor}
              emissive={themeColor}
              emissiveIntensity={2.5}
              roughness={0.2}
              metalness={0.9}
            />
          </mesh>

          {/* Tilted orbital ring wrapping the monolith planetary-style */}
          <mesh ref={orbitRingRef} rotation={[Math.PI / 3, 0, Math.PI / 6]}>
            <torusGeometry args={[1.52, 0.009, 16, 100]} />
            <meshStandardMaterial
              color={themeColor}
              emissive={themeColor}
              emissiveIntensity={4.5}
              transparent
              opacity={0.5}
            />
          </mesh>
        </group>
      </Float>
    </group>
  )
}
