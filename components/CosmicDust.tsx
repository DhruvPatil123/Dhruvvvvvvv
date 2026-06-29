"use client"

import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useScrollStore } from '@/store/useScrollStore'
import { useThemeStore } from '@/store/useThemeStore'

export default function CosmicDust() {
  const pointsRef = useRef<THREE.Points>(null)
  const materialRef = useRef<THREE.ShaderMaterial>(null)
  const colorAttribRef = useRef<THREE.BufferAttribute>(null)
  
  const scrollProgress = useScrollStore((state) => state.scrollProgress)
  const prevScrollRef = useRef(scrollProgress)
  const theme = useThemeStore((state) => state.theme)

  const count = 1000

  // Generate random data for positions, tiers, speeds, and random vectors
  const { positions, colorTiers, speeds, randoms } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const tiers = new Uint8Array(count)
    const spd = new Float32Array(count)
    const rnd = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      // Position - spread wide for beautiful cosmic layout
      pos[i * 3] = (Math.random() - 0.5) * 45
      pos[i * 3 + 1] = (Math.random() - 0.5) * 45
      pos[i * 3 + 2] = (Math.random() - 0.5) * 25 - 5 // shifted slightly back

      // Color Tier (0: Primary, 1: Secondary, 2: Spark, 3: White/Stars)
      const r = Math.random()
      if (r < 0.2) {
        tiers[i] = 0
      } else if (r < 0.4) {
        tiers[i] = 1
      } else if (r < 0.55) {
        tiers[i] = 2
      } else {
        tiers[i] = 3 // Mostly white, elegant twinkling stars
      }

      // Slower, graceful movement speeds (Point 5)
      spd[i] = 0.05 + Math.random() * 0.15

      // Random offsets for swaying/twinkling
      rnd[i * 3] = Math.random()
      rnd[i * 3 + 1] = Math.random()
      rnd[i * 3 + 2] = Math.random()
    }

    return {
      positions: pos,
      colorTiers: tiers,
      speeds: spd,
      randoms: rnd
    }
  }, [])

  // Create Float32Array to hold dynamic color data, initialized with cobalt colors
  const colors = useMemo(() => {
    const col = new Float32Array(count * 3)
    const colorA = new THREE.Color("#1a56db")
    const colorB = new THREE.Color("#2563eb")
    const colorC = new THREE.Color("#60a5fa")
    const colorD = new THREE.Color("#ffffff")

    for (let i = 0; i < count; i++) {
      const tier = colorTiers[i]
      let target = colorD
      if (tier === 0) target = colorA
      else if (tier === 1) target = colorB
      else if (tier === 2) target = colorC

      col[i * 3] = target.r
      col[i * 3 + 1] = target.g
      col[i * 3 + 2] = target.b
    }
    return col
  }, [colorTiers])

  // Create custom shader material
  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uScroll: { value: 0 },
        uScrollSpeed: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) }
      },
      vertexShader: `
        uniform float uTime;
        uniform float uScroll;
        uniform float uScrollSpeed;
        uniform vec2 uMouse;
        
        attribute vec3 color;
        attribute float aSpeed;
        attribute vec3 aRandom;
        
        varying vec3 vColor;
        varying float vDepth;
        varying float vSpeed;
        varying vec3 vRandom;
        
        void main() {
          vColor = color;
          vRandom = aRandom;
          
          vec3 pos = position;
          
          // 1. Slow, elegant organic floating sways (Point 5)
          float floatOffset = uTime * 0.15 * aSpeed;
          pos.x += sin(floatOffset + aRandom.x * 6.28) * 0.18;
          pos.y += cos(floatOffset + aRandom.y * 6.28) * 0.18;
          pos.z += sin(floatOffset + aRandom.z * 6.28) * 0.12;
          
          // 2. Slower, drift speed (Point 5)
          pos.y += uTime * 0.015 * aSpeed;
          
          // 3. Scroll influence
          pos.y -= uScroll * 14.0;
          pos.x += sin(uScroll * 3.14 + aRandom.x * 2.0) * uScrollSpeed * 2.5;
          
          // 4. Wrap around boundary bounds
          pos.x = mod(pos.x + 22.5, 45.0) - 22.5;
          pos.y = mod(pos.y + 22.5, 45.0) - 22.5;
          pos.z = mod(pos.z + 12.5, 25.0) - 12.5;
 
          // 5. Cinematic Mouse Parallax (Point 5)
          // Farther stars shift less, closer stars shift more based on depth
          float zDepth = (pos.z + 12.5) / 25.0; // 0 to 1
          pos.x += uMouse.x * 2.2 * zDepth;
          pos.y += uMouse.y * 1.6 * zDepth;
 
          // Calculate view space
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          float depth = -mvPosition.z;
          vDepth = depth;
          vSpeed = aSpeed;
 
          // 6. High-end Depth of Field computation
          float distToFocus = abs(depth - 6.0);
          float bokehFactor = 1.0 + (distToFocus * 0.4);
 
          // Base particle size (slightly increased for high glare contrast)
          float baseSize = 52.0;
          
          gl_PointSize = (baseSize * bokehFactor) / depth;
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform float uTime;
        varying vec3 vColor;
        varying float vDepth;
        varying float vSpeed;
        varying vec3 vRandom;
 
        void main() {
          // Circular coordinate from the center of the point
          vec2 center = gl_PointCoord - vec2(0.5);
          float dist = length(center);
 
          // Discard outside particles
          if (dist > 0.5) {
            discard;
          }
 
          // Compute blur based on depth focusing (Point 5)
          float distToFocus = abs(vDepth - 6.0);
          float blur = 0.15 + distToFocus * 0.09;
          if (vDepth < 2.0) {
            blur += (2.0 - vDepth) * 0.3;
          }
 
          // Smooth core and ambient halo
          float alpha = smoothstep(0.5, 0.5 - blur, dist);
          
          // Gentle, slow organic twinkling cycle (Point 5)
          float twinkle = sin(uTime * 1.5 + vRandom.x * 6.28) * 0.35 + 0.65;
          
          // Bright magical center core glow
          float core = smoothstep(0.18, 0.0, dist) * 0.7;
 
          // Combine core brightness with color map
          vec3 finalColor = vColor + vec3(core * 0.55);
 
          // Velocity based shining
          float velocityShine = 0.8 + vSpeed * 0.3;
 
          gl_FragColor = vec4(finalColor * velocityShine, alpha * 0.45 * twinkle);
        }
      `
    })
  }, [])

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    
    // Smooth transition of scroll and mouse coordinates
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = t
      materialRef.current.uniforms.uScroll.value = THREE.MathUtils.lerp(
        materialRef.current.uniforms.uScroll.value,
        scrollProgress,
        0.05
      )
      
      const scrollSpeed = Math.abs(scrollProgress - prevScrollRef.current)
      materialRef.current.uniforms.uScrollSpeed.value = THREE.MathUtils.lerp(
        materialRef.current.uniforms.uScrollSpeed.value,
        scrollSpeed,
        0.1
      )

      // Lerp mouse coordinates smoothly to avoid jitter
      const mouseUniform = materialRef.current.uniforms.uMouse.value
      mouseUniform.x = THREE.MathUtils.lerp(mouseUniform.x, state.pointer.x, 0.08)
      mouseUniform.y = THREE.MathUtils.lerp(mouseUniform.y, state.pointer.y, 0.08)
    }

    // Smoothly interpolate colors toward active theme
    if (colorAttribRef.current) {
      const arr = colorAttribRef.current.array as Float32Array
      
      let rA = 0.1, gA = 0.34, bA = 0.86 // Cobalt default
      let rB = 0.15, gB = 0.39, bB = 0.92
      let rC = 0.38, gC = 0.65, bC = 0.98
      let rD = 1.0, gD = 1.0, bD = 1.0

      if (theme === 'charcoal') {
        rA = 0.61; gA = 0.64; bA = 0.69
        rB = 0.29; gB = 0.33; bB = 0.39
        rC = 0.90; gC = 0.91; bC = 0.92
        rD = 0.61; gD = 0.64; bD = 0.69
      } else if (theme === 'emerald') {
        rA = 0.06; gA = 0.48; bA = 0.34
        rB = 0.06; gB = 0.73; bB = 0.51
        rC = 0.65; gC = 0.95; bC = 0.82
        rD = 1.0; gD = 1.0; bD = 1.0
      }

      for (let i = 0; i < count; i++) {
        const tier = colorTiers[i]
        let tr = rD, tg = gD, tb = bD
        if (tier === 0) { tr = rA; tg = gA; tb = bA; }
        else if (tier === 1) { tr = rB; tg = gB; tb = bB; }
        else if (tier === 2) { tr = rC; tg = gC; tb = bC; }

        arr[i * 3] += (tr - arr[i * 3]) * 0.08
        arr[i * 3 + 1] += (tg - arr[i * 3 + 1]) * 0.08
        arr[i * 3 + 2] += (tb - arr[i * 3 + 2]) * 0.08
      }
      colorAttribRef.current.needsUpdate = true
    }
    
    prevScrollRef.current = scrollProgress

    // Rotate points slightly for added depth
    if (pointsRef.current) {
      pointsRef.current.rotation.y = t * 0.008
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          ref={colorAttribRef}
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-aSpeed"
          count={speeds.length}
          array={speeds}
          itemSize={1}
        />
        <bufferAttribute
          attach="attributes-aRandom"
          count={randoms.length / 3}
          array={randoms}
          itemSize={3}
        />
      </bufferGeometry>
      <primitive ref={materialRef} object={shaderMaterial} attach="material" />
    </points>
  )
}
