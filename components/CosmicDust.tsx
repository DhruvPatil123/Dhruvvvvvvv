"use client"

import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useScrollStore } from '@/store/useScrollStore'

export default function CosmicDust() {
  const pointsRef = useRef<THREE.Points>(null)
  const materialRef = useRef<THREE.ShaderMaterial>(null)
  
  const scrollProgress = useScrollStore((state) => state.scrollProgress)
  const prevScrollRef = useRef(scrollProgress)

  const count = 1200

  // Generate random data for positions, colors, speeds, and random vectors
  const { positions, colors, speeds, randoms } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    const spd = new Float32Array(count)
    const rnd = new Float32Array(count * 3)

    const colorTeal = new THREE.Color("#00f2ff")
    const colorPurple = new THREE.Color("#7000ff")
    const colorGold = new THREE.Color("#ffcc00")
    const colorWhite = new THREE.Color("#ffffff")

    for (let i = 0; i < count; i++) {
      // Position
      pos[i * 3] = (Math.random() - 0.5) * 30
      pos[i * 3 + 1] = (Math.random() - 0.5) * 30
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20 - 5 // shifted slightly back

      // Theme Colors mapping (teal, purple, gold, white)
      const r = Math.random()
      let finalColor = colorWhite
      if (r < 0.4) {
        finalColor = colorTeal
      } else if (r < 0.75) {
        finalColor = colorPurple
      } else if (r < 0.9) {
        finalColor = colorGold
      }
      
      col[i * 3] = finalColor.r
      col[i * 3 + 1] = finalColor.g
      col[i * 3 + 2] = finalColor.b

      // Speeds
      spd[i] = 0.2 + Math.random() * 0.8

      // Random offsets for swaying
      rnd[i * 3] = Math.random()
      rnd[i * 3 + 1] = Math.random()
      rnd[i * 3 + 2] = Math.random()
    }

    return {
      positions: pos,
      colors: col,
      speeds: spd,
      randoms: rnd
    }
  }, [])

  // Create custom shader material
  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uScroll: { value: 0 },
        uScrollSpeed: { value: 0 }
      },
      vertexShader: `
        uniform float uTime;
        uniform float uScroll;
        uniform float uScrollSpeed;
        
        attribute vec3 color;
        attribute float aSpeed;
        attribute vec3 aRandom;
        
        varying vec3 vColor;
        varying float vDepth;
        varying float vSpeed;

        void main() {
          vec3 pos = position;

          // 1. Gentle swaying movement amplified by aRandom and aSpeed
          float swayTime = uTime * aSpeed * 0.7;
          pos.x += sin(swayTime + aRandom.x * 6.28) * 0.4;
          pos.y += cos(swayTime * 0.8 + aRandom.y * 6.28) * 0.4;
          pos.z += sin(swayTime * 1.2 + aRandom.z * 6.28) * 0.2;

          // 2. Continuous cosmic upward drift
          pos.y += uTime * 0.15;

          // 3. Dynamic reaction to scrolling
          pos.y -= uScroll * 12.0;

          // 4. Wrap around a cube of 30x30x20
          pos.x = mod(pos.x + 15.0, 30.0) - 15.0;
          pos.y = mod(pos.y + 15.0, 30.0) - 15.0;
          pos.z = mod(pos.z + 10.0, 20.0) - 10.0;

          // Calculate view space
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          float depth = -mvPosition.z;
          vDepth = depth;
          vSpeed = aSpeed;

          // 5. High-end Depth of Field computation
          // Sweet spot focus is at Z = 5 (the center model area)
          float distToFocus = abs(depth - 5.0);
          
          // Outer blur / close bokeh
          float bokehFactor = 1.0 + (distToFocus * 0.35);

          // Base particle size
          float baseSize = 48.0;
          
          gl_PointSize = (baseSize * bokehFactor) / depth;
          gl_Position = projectionMatrix * mvPosition;
          vColor = color;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vDepth;
        varying float vSpeed;

        void main() {
          // Circular coordinate from the center of the point
          vec2 center = gl_PointCoord - vec2(0.5);
          float dist = length(center);

          // Discard outside particles
          if (dist > 0.5) {
            discard;
          }

          // Compute blur based on depth focusing
          float distToFocus = abs(vDepth - 5.0);
          
          // Blur gets softer as distance is further from focal point (z-depth = 5)
          // Also dynamic blur for very close particles (Z < 1.5)
          float blur = 0.12 + distToFocus * 0.08;
          if (vDepth < 2.0) {
            blur += (2.0 - vDepth) * 0.25;
          }

          // Smooth core and ambient halo
          float alpha = smoothstep(0.5, 0.5 - blur, dist);
          
          // Bright magical center core glow
          float core = smoothstep(0.18, 0.0, dist) * 0.65;

          // Combine core brightness with color map
          vec3 finalColor = vColor + vec3(core * 0.5);

          // Make faster particles shine slightly more
          float velocityShine = 0.7 + vSpeed * 0.4;

          gl_FragColor = vec4(finalColor * velocityShine, alpha * 0.5);
        }
      `
    })
  }, [])

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    
    // Smooth transition of scroll
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
    }
    
    prevScrollRef.current = scrollProgress

    // Rotate points slightly for added depth
    if (pointsRef.current) {
      pointsRef.current.rotation.y = t * 0.015
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
