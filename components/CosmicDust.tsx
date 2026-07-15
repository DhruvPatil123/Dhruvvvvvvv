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
  const skillsHovered = useScrollStore((state) => state.skillsHovered)
  const isCanvasVisible = useScrollStore((state) => state.isCanvasVisible)
  const prevScrollRef = useRef(scrollProgress)
  const theme = useThemeStore((state) => state.theme)
  const mousePhysics = useRef({ x: 0, y: 0, vx: 0, vy: 0 })

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

      // Slower, graceful movement speeds
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
        uMouse: { value: new THREE.Vector2(0, 0) },
        uSkillsHover: { value: 0 }
      },
      vertexShader: `
        uniform float uTime;
        uniform float uScroll;
        uniform float uScrollSpeed;
        uniform vec2 uMouse;
        uniform float uSkillsHover;
        
        attribute vec3 color;
        attribute float aSpeed;
        attribute vec3 aRandom;
        
        varying vec3 vColor;
        varying float vDepth;
        varying float vSpeed;
        varying vec3 vRandom;
        varying float vSkillsHover;
        
        void main() {
          vColor = color;
          vRandom = aRandom;
          vSkillsHover = uSkillsHover;
          
          // 1. Calculate Orbiting Ring positions (slow orbiting cosmic dust ring centered on hero)
          float angle = aRandom.x * 6.28318;
          // Radius varies per particle to form a thick, beautiful ring structure
          float ringRadius = 3.2 + aRandom.y * 3.8; 
          
          // Speed up when uSkillsHover is active!
          float speedMultiplier = 1.0 + uSkillsHover * 4.5;
          float currentAngle = angle + uTime * 0.12 * speedMultiplier * (0.6 + aSpeed * 0.4);
          
          vec3 ringPos;
          ringPos.x = sin(currentAngle) * ringRadius;
          ringPos.y = cos(currentAngle) * ringRadius * 0.85 + 0.2; // ellipse slightly centered
          ringPos.z = (aRandom.z - 0.5) * 2.0 - 0.5; // slight depth spread

          // Slow organic floating sways
          float floatOffset = uTime * 0.15 * aSpeed;
          ringPos.x += sin(floatOffset + aRandom.x * 6.28) * 0.18;
          ringPos.y += cos(floatOffset + aRandom.y * 6.28) * 0.18;
          ringPos.z += sin(floatOffset + aRandom.z * 6.28) * 0.12;

          // Scroll influence and boundary wrapping for Ring
          vec3 activeRing = ringPos;
          activeRing.y -= uScroll * 15.0;
          activeRing.x += sin(uScroll * 3.14 + aRandom.x * 2.0) * uScrollSpeed * 2.5;

          activeRing.x = mod(activeRing.x + 22.5, 45.0) - 22.5;
          activeRing.y = mod(activeRing.y + 22.5, 45.0) - 22.5;
          activeRing.z = mod(activeRing.z + 12.5, 25.0) - 12.5;

          // 2. Calculate Geometric Grid positions (technical matrix bento grid layout)
          float cols = 40.0;
          float rows = 25.0;
          
          float colIndex = floor(aRandom.x * cols);
          float rowIndex = floor(aRandom.y * rows);
          
          vec3 gridPos;
          gridPos.x = (colIndex / cols - 0.5) * 16.0; // Spanned across width 16
          gridPos.y = (rowIndex / rows - 0.5) * 10.0 + 0.2; // Spanned across height 10
          gridPos.z = -1.5 + sin(colIndex * 0.4 + rowIndex * 0.4 + uTime * 2.5) * 0.12; // wave ripple across the grid!

          // 3. Morph smoothly based on hover uniform
          vec3 pos = mix(activeRing, gridPos, uSkillsHover);
 
          // 4. Cinematic Mouse Parallax & Dynamic Drift
          float zDepth = (pos.z + 12.5) / 25.0; // 0 to 1
          
          // Classic parallax shift (moves with camera)
          pos.x += uMouse.x * 2.2 * zDepth;
          pos.y += uMouse.y * 1.6 * zDepth;

          // Interactive radial drift (particles gently drift away from cursor)
          // Scale normalized uMouse [-1, 1] to approximate 3D world space coordinates
          vec2 mouseWorld = uMouse * vec2(10.0, 6.0);
          vec2 directionToMouse = pos.xy - mouseWorld;
          float distToMouse = length(directionToMouse);
          
          if (distToMouse < 12.0) {
            // Smoothly interpolate repulsion force
            float force = smoothstep(12.0, 0.0, distToMouse);
            // Gentle drift away from cursor (cosmic wind) with lag and organic scaling
            pos.xy += normalize(directionToMouse) * force * 0.75 * (0.3 + aSpeed * 0.7);
          }

          // Calculate view space
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          float depth = -mvPosition.z;
          vDepth = depth;
          vSpeed = aSpeed;

          // High-end Depth of Field computation
          float distToFocus = abs(depth - 6.0);
          float bokehFactor = 1.0 + (distToFocus * 0.4);

          // Base particle size (slightly increased for high glare contrast)
          float baseSize = 52.0;
          
          // Make grid particles slightly smaller, sharper and tech-like
          float finalBaseSize = mix(baseSize, 35.0, uSkillsHover);
          
          gl_PointSize = (finalBaseSize * bokehFactor) / depth;
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform float uTime;
        varying vec3 vColor;
        varying float vDepth;
        varying float vSpeed;
        varying vec3 vRandom;
        varying float vSkillsHover;

        void main() {
          // Circular coordinate from the center of the point
          vec2 center = gl_PointCoord - vec2(0.5);
          float dist = length(center);

          // Discard outside particles
          if (dist > 0.5) {
            discard;
          }

          // Compute blur based on depth focusing
          float distToFocus = abs(vDepth - 6.0);
          float blur = 0.15 + distToFocus * 0.09;
          if (vDepth < 2.0) {
            blur += (2.0 - vDepth) * 0.3;
          }

          // Make the grid particles sharper on skills hover
          float finalBlur = mix(blur, 0.05, vSkillsHover);

          // Smooth core and ambient halo
          float alpha = smoothstep(0.5, 0.5 - finalBlur, dist);
          
          // Twinkling speeds up or stabilizes based on grid transition
          float twinkleSpeed = mix(1.5, 3.5, vSkillsHover);
          float twinkle = sin(uTime * twinkleSpeed + vRandom.x * 6.28) * 0.35 + 0.65;
          
          // Grid particles twinkle in a digital circuit/wave-like way
          if (vSkillsHover > 0.5) {
            twinkle = sin(uTime * 3.5 + (vRandom.x + vRandom.y) * 3.14) * 0.4 + 0.6;
          }
          
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
    if (!isCanvasVisible) return
    const t = state.clock.getElapsedTime()
    
    // Smooth transition of scroll, mouse, and hover coordinates
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

      // Lerp skills hover uniform smoothly (dynamic acceleration/deceleration)
      materialRef.current.uniforms.uSkillsHover.value = THREE.MathUtils.lerp(
        materialRef.current.uniforms.uSkillsHover.value,
        skillsHovered ? 1.0 : 0.0,
        0.06
      )

      // Spring-damping mouse physics for smooth lag transition
      const phys = mousePhysics.current
      const targetX = state.pointer.x
      const targetY = state.pointer.y

      const ax = (targetX - phys.x) * 0.035
      const ay = (targetY - phys.y) * 0.035

      phys.vx = (phys.vx + ax) * 0.88
      phys.vy = (phys.vy + ay) * 0.88

      phys.x += phys.vx
      phys.y += phys.vy

      const mouseUniform = materialRef.current.uniforms.uMouse.value
      mouseUniform.x = phys.x
      mouseUniform.y = phys.y
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

    // Rotate points slightly for added depth (only rotate when not in full grid state to keep grid aligned)
    if (pointsRef.current) {
      const targetRotationY = t * 0.015 * (1.0 - (materialRef.current?.uniforms.uSkillsHover.value || 0));
      pointsRef.current.rotation.y = THREE.MathUtils.lerp(pointsRef.current.rotation.y, targetRotationY, 0.08)
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
