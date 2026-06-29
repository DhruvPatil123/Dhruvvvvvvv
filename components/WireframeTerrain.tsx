"use client"

import React, { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useThemeStore } from '@/store/useThemeStore'
import { useScrollStore } from '@/store/useScrollStore'

export default function WireframeTerrain() {
  const meshRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<THREE.ShaderMaterial>(null)
  const theme = useThemeStore((state) => state.theme)
  const scrollProgress = useScrollStore((state) => state.scrollProgress)

  // Delayed mount fade-in animation (Point 12)
  const fadeInRef = useRef(0)
  useEffect(() => {
    const start = Date.now() + 600
    let animId: number
    const tick = () => {
      const now = Date.now()
      if (now > start) {
        const progress = Math.min(1, (now - start) / 1500)
        fadeInRef.current = progress
        if (progress >= 1) return
      }
      animId = requestAnimationFrame(tick)
    }
    animId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(animId)
  }, [])

  // Initialize mouse position off-screen
  const mouse3D = useMemo(() => new THREE.Vector3(0, -100, 0), [])
  const themeColor = useMemo(() => new THREE.Color('#00f2ff'), [])
  const lastPointer = useRef(new THREE.Vector2(0, 0))
  const lastActiveTime = useRef(-100)

  // Create custom shader material
  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      wireframe: true,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uMouse3D: { value: mouse3D },
        uColor: { value: themeColor },
        uScroll: { value: 0 },
        uFadeIn: { value: 0 },
      },
      vertexShader: `
        uniform float uTime;
        uniform vec3 uMouse3D;
        uniform float uScroll;
        varying vec3 vWorldPos;
        varying float vDistToMouse;

        void main() {
          vec3 pos = position;
          
          // Continuous scroll travel displacement (Point 9)
          float scrollOffset = uScroll * 15.0;
          
          // We calculate terrain waves (Flatter peaks as requested in Point 1)
          float wave = sin(pos.x * 0.12 + uTime * 0.4) * cos((pos.y - scrollOffset) * 0.12 + uTime * 0.4) * 0.22;
          wave += sin(pos.x * 0.35 - uTime * 0.7) * sin((pos.y - scrollOffset) * 0.35 + uTime * 0.5) * 0.08;
          
          // Apply wave displacement to local Z
          pos.z += wave;

          // Compute world-space position to calculate accurate interaction distance
          vec4 worldPos = modelMatrix * vec4(pos, 1.0);
          vWorldPos = worldPos.xyz;

          // Distance on the XZ plane (since mesh is rotated horizontally)
          float dist = distance(worldPos.xz, uMouse3D.xz);
          vDistToMouse = dist;

          // Localized cursor ripple & grid bending (Point 9)
          float ripple = 0.0;
          if (dist < 15.0) {
            float falloff = exp(-dist * 0.35);
            // Ripple waves
            ripple = sin(dist * 2.2 - uTime * 7.5) * falloff * 0.45;
            
            // Local physical grid bending/depression under cursor
            ripple -= exp(-dist * 0.15) * 0.3;
          }

          // Apply displacement
          pos.z += ripple;

          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        uniform float uFadeIn;
        varying vec3 vWorldPos;
        varying float vDistToMouse;

        void main() {
          // Circular boundary fade-out (atmospheric fog) to simulate an infinite landscape
          float distFromCenter = length(vWorldPos.xz);
          float alpha = smoothstep(28.0, 8.0, distFromCenter);

          // Elegant, micro-glow near the active cursor ripple (Reduced by 50% as requested in Point 1)
          vec3 finalColor = uColor;
          if (vDistToMouse < 15.0) {
            float rippleGlow = exp(-vDistToMouse * 0.35) * 0.22;
            finalColor += uColor * rippleGlow;
          }

          // Opacity is set to 35% (the optimal target for high contrast under glare, while remaining supportive)
          gl_FragColor = vec4(finalColor, alpha * 0.35 * uFadeIn);
        }
      `,
    })
  }, [mouse3D, themeColor])

  const tempV = new THREE.Vector3()

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    const currentPointer = state.pointer

    // 1. Detect active mouse/touch interaction (movement greater than noise threshold)
    const pointerMoved = Math.abs(currentPointer.x - lastPointer.current.x) > 0.001 || 
                         Math.abs(currentPointer.y - lastPointer.current.y) > 0.001

    if (pointerMoved) {
      lastPointer.current.copy(currentPointer)
      lastActiveTime.current = t
    }

    const timeSinceActive = t - lastActiveTime.current
    // Seamlessly blend: 1.0 (pure interactive), 0.0 (pure autonomous scan)
    // Starts fading out after 1.5 seconds of absolute static/inactivity
    const interactionWeight = THREE.MathUtils.clamp(1.0 - (timeSinceActive - 1.5) / 1.0, 0, 1)

    // Compute active pointer raycast on plane at y = -2.2
    state.raycaster.setFromCamera(currentPointer, state.camera)
    const floorPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 2.2)
    state.raycaster.ray.intersectPlane(floorPlane, tempV)

    // Compute autonomous scanning wave path (Lissajous curve on XZ floor)
    const autoX = Math.sin(t * 0.45) * 11.0
    const autoZ = Math.cos(t * 0.28) * 8.0
    const autoPos = new THREE.Vector3(autoX, -2.2, autoZ)

    // Blend targets smoothly
    const targetPos = new THREE.Vector3().lerpVectors(autoPos, tempV, interactionWeight)

    // Smoothly interpolate the final position
    mouse3D.lerp(targetPos, 0.08)

    // 2. Map active theme color smoothly
    let targetHex = '#00f2ff' // Cobalt default
    if (theme === 'charcoal') {
      targetHex = '#ffffff'
    } else if (theme === 'emerald') {
      targetHex = '#10b981'
    }
    const targetColor = new THREE.Color(targetHex)
    themeColor.lerp(targetColor, 0.05)

    // 3. Update uniforms
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = t
      materialRef.current.uniforms.uScroll.value = THREE.MathUtils.lerp(
        materialRef.current.uniforms.uScroll.value,
        scrollProgress,
        0.05
      )
      materialRef.current.uniforms.uFadeIn.value = fadeInRef.current
    }
  })

  return (
    <mesh
      ref={meshRef}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -2.2, 0]}
    >
      <planeGeometry args={[50, 50, 70, 70]} />
      <primitive ref={materialRef} object={shaderMaterial} attach="material" />
    </mesh>
  )
}
