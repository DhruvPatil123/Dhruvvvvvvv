"use client"

import React, { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'
import { useScrollStore } from '@/store/useScrollStore'
import { useThemeStore } from '@/store/useThemeStore'
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
  
  // Outer wrapping placement group
  const monolithGroupRef = useRef<THREE.Group>(null)

  // Explicit refs for all 9 section groups for high-performance direct scaling animation
  const group0Ref = useRef<THREE.Group>(null)
  const group1Ref = useRef<THREE.Group>(null)
  const group2Ref = useRef<THREE.Group>(null)
  const group3Ref = useRef<THREE.Group>(null)
  const group4Ref = useRef<THREE.Group>(null)
  const group5Ref = useRef<THREE.Group>(null)
  const group6Ref = useRef<THREE.Group>(null)
  const group7Ref = useRef<THREE.Group>(null)
  const group8Ref = useRef<THREE.Group>(null)

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

    // Compute active section index based on scroll progress mapped over 9 sections
    const activeIndex = Math.min(8, Math.max(0, Math.round(scrollProgress * 8)))

    // Direct mutation of group scales for ultra-smooth rendering transitions
    const groupRefs = [group0Ref, group1Ref, group2Ref, group3Ref, group4Ref, group5Ref, group6Ref, group7Ref, group8Ref]
    groupRefs.forEach((ref, i) => {
      if (ref.current) {
        const targetScale = (i === activeIndex) ? 1.0 : 0.0
        const currentScale = ref.current.scale.x
        const nextScale = THREE.MathUtils.lerp(currentScale, targetScale, 0.12)
        ref.current.scale.set(nextScale, nextScale, nextScale)
        ref.current.visible = nextScale > 0.001
      }
    })

    // 2. Dynamic, responsive scroll positions alternating side-to-side to clear content text
    let targetX = 0
    let targetY = 0.2
    let targetZ = 0
    let targetScale = isMobile ? 0.6 : 1.1

    if (activeIndex === 0) {
      targetX = 0 // Hero: Center
    } else if (activeIndex === 1) {
      targetX = isMobile ? 0 : 2.0 // About: Right
    } else if (activeIndex === 2) {
      targetX = isMobile ? 0 : -2.0 // Skills: Left
    } else if (activeIndex === 3) {
      targetX = 0 // Work: Center
      targetScale = isMobile ? 0.52 : 0.9
    } else if (activeIndex === 4) {
      targetX = isMobile ? 0 : 2.0 // Credentials: Right
    } else if (activeIndex === 5) {
      targetX = isMobile ? 0 : -2.0 // Achievements: Left
    } else if (activeIndex === 6) {
      targetX = isMobile ? 0 : 2.0 // Experience/Timeline: Right
    } else if (activeIndex === 7) {
      targetX = isMobile ? 0 : -2.0 // Testimonials: Left
    } else if (activeIndex === 8) {
      targetX = 0 // Contact: Center
      targetScale = isMobile ? 0.55 : 0.95
    }

    // 3. Smooth group placement translation
    if (monolithGroupRef.current) {
      monolithGroupRef.current.position.x = THREE.MathUtils.lerp(monolithGroupRef.current.position.x, targetX, dynamicLerp)
      monolithGroupRef.current.position.y = THREE.MathUtils.lerp(monolithGroupRef.current.position.y, targetY, dynamicLerp)
      monolithGroupRef.current.position.z = THREE.MathUtils.lerp(monolithGroupRef.current.position.z, targetZ, dynamicLerp)

      const currentScale = THREE.MathUtils.lerp(monolithGroupRef.current.scale.x, targetScale, dynamicLerp)
      monolithGroupRef.current.scale.set(currentScale, currentScale, currentScale)
    }

    // 4. Subtle, tactile interactive rotation on the Monolith structure
    if (monolithRef.current) {
      const targetRotY = (t * 0.25) + state.pointer.x * 0.35
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

      {/* 2. Base Layer: Removed WireframeTerrain to prevent collision with static painting backgrounds */}

      {/* 4. Hero object wrapper and interactive float behaviors */}
      <Float speed={1.5} rotationIntensity={0.15} floatIntensity={0.4}>
        <group ref={monolithGroupRef}>
          
          {/* ==========================================
              ASSET 0: HERO (Glass Monolith) - REMOVED VISUALS
              ========================================== */}
          <group ref={group0Ref}>
            {/* Kept empty to satisfy refs and prevent runtime errors */}
          </group>

          {/* ==========================================
              ASSET 1: ABOUT (Sacred Polyhedron) - REMOVED VISUALS
              ========================================== */}
          <group ref={group1Ref}>
          </group>

          {/* ==========================================
              ASSET 2: SKILLS (Floating Constellation Matrix) - REMOVED VISUALS
              ========================================== */}
          <group ref={group2Ref}>
          </group>

          {/* ==========================================
              ASSET 3: WORK / PROJECTS (Holographic Torus Rings) - REMOVED VISUALS
              ========================================== */}
          <group ref={group3Ref}>
          </group>

          {/* ==========================================
              ASSET 4: CREDENTIALS (Octahedral Diamond Prism) - REMOVED VISUALS
              ========================================== */}
          <group ref={group4Ref}>
          </group>

          {/* ==========================================
              ASSET 5: ACHIEVEMENTS (Supernova Star Core) - REMOVED VISUALS
              ========================================== */}
          <group ref={group5Ref}>
          </group>

          {/* ==========================================
              ASSET 6: TIMELINE (Triple-Axis Gyroscope) - REMOVED VISUALS
              ========================================== */}
          <group ref={group6Ref}>
          </group>

          {/* ==========================================
              ASSET 7: TESTIMONIALS (Möbius Collaboration Knot) - REMOVED VISUALS
              ========================================== */}
          <group ref={group7Ref}>
          </group>

          {/* ==========================================
              ASSET 8: CONTACT (Signal Transmitter Hyper-Sphere) - REMOVED VISUALS
              ========================================== */}
          <group ref={group8Ref}>
          </group>

        </group>
      </Float>
    </group>
  )
}
