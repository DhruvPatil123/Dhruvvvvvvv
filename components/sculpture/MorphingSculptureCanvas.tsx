"use client"

import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { useArtStyleStore, ArtPreset } from '@/store/useArtStyleStore'
import { useScrollStore } from '@/store/useScrollStore'

// ── Custom GLSL Vertex Shader ────────────────────────────────────────────────
const VERTEX_SHADER = `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uScroll;
  uniform float uScrollVelocity;
  uniform int uPreset;
  uniform float uIntensity;

  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec3 vWorldPosition;
  varying vec2 vUv;
  varying float vDisplacement;
  varying vec3 vEyeVector;

  // Classic Simplex 3D Noise Implementation
  vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}

  float snoise(vec3 v){
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);

    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);

    vec3 x1 = x0 - i1 + 1.0 * C.xxx;
    vec3 x2 = x0 - i2 + 2.0 * C.xxx;
    vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;

    i = mod(i, 289.0);
    vec4 p = permute(permute(permute(
               i.z + vec4(0.0, i1.z, i2.z, 1.0))
             + i.y + vec4(0.0, i1.y, i2.y, 1.0))
             + i.x + vec4(0.0, i1.x, i2.x, 1.0));

    float n_ = 0.142857142857;
    vec3  ns = n_ * D.wyz - D.xzx;

    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);

    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);

    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);

    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));

    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;

    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);

    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;

    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    vPosition = position;

    // Base noise frequency & speed parameters
    float time = uTime * 0.45;
    vec3 pos = position;

    // Interactive mouse displacement ripple
    float mouseDistance = length(pos.xy - uMouse * 2.2);
    float mouseRipple = sin(mouseDistance * 4.5 - uTime * 3.0) * exp(-mouseDistance * 0.8) * 0.35;

    // Preset-specific displacement waveforms
    float noiseVal = 0.0;
    float displacement = 0.0;

    if (uPreset == 0) {
      // 0: Cosmic Supernova - Harmonic breathing & plasma ripples
      float n1 = snoise(pos * 0.85 + vec3(time * 0.6));
      float n2 = snoise(pos * 1.8 - vec3(time * 0.9)) * 0.5;
      float pulse = sin(uTime * 1.2) * 0.15;
      displacement = (n1 + n2 + pulse + mouseRipple) * 0.55 * uIntensity;
    } else if (uPreset == 1) {
      // 1: Liquid Mercury - Molten surface tension waves
      float n = snoise(pos * 0.65 + vec3(sin(time * 0.7), cos(time * 0.5), time * 0.4));
      float wave = sin(pos.y * 3.0 + time * 2.0) * 0.18;
      displacement = (n * 0.45 + wave + mouseRipple * 1.3) * uIntensity;
    } else if (uPreset == 2) {
      // 2: Cyberpunk Wireframe - Stepped quantization / digital terraces
      float rawNoise = snoise(pos * 1.1 + vec3(time * 0.5));
      // Quantize noise into discrete digital contour levels
      float stepped = floor(rawNoise * 6.0) / 6.0;
      float scanSpike = sin(pos.y * 6.0 + uTime * 4.0) * 0.12;
      displacement = (stepped * 0.65 + scanSpike + mouseRipple * 0.8) * uIntensity;
    } else {
      // 3: Prismatic Glass - Geometric facets & subtle crystalline refraction
      float n1 = snoise(pos * 1.2 + vec3(time * 0.35));
      float facets = abs(sin(pos.x * 4.0) * cos(pos.z * 4.0)) * 0.22;
      displacement = (n1 * 0.35 + facets + mouseRipple * 0.6) * uIntensity;
    }

    // Add scroll velocity burst expansion
    displacement += uScrollVelocity * 0.25;

    vDisplacement = displacement;
    vec3 newPosition = position + normal * displacement;

    vec4 worldPos = modelMatrix * vec4(newPosition, 1.0);
    vWorldPosition = worldPos.xyz;
    vEyeVector = normalize(cameraPosition - worldPos.xyz);

    gl_Position = projectionMatrix * viewMatrix * worldPos;
  }
`

// ── Custom GLSL Fragment Shader ──────────────────────────────────────────────
const FRAGMENT_SHADER = `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uScroll;
  uniform int uPreset;
  uniform float uWireframe;

  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec3 vWorldPosition;
  varying vec2 vUv;
  varying float vDisplacement;
  varying vec3 vEyeVector;

  void main() {
    vec3 N = normalize(vNormal);
    vec3 V = normalize(vEyeVector);

    // Fresnel rim calculation
    float fresnel = pow(1.0 - max(dot(N, V), 0.0), 3.0);
    float fresnelSoft = pow(1.0 - max(dot(N, V), 0.0), 1.8);

    vec3 finalColor = vec3(0.0);
    float finalAlpha = 1.0;

    // ─────────────────────────────────────────────────────────────────────────
    // Preset 0: 🌌 Royal Amethyst & Electric Cyan Bloom
    // Pitch jet black void, deep royal amethyst plasma & electric cyan rim glow
    // ─────────────────────────────────────────────────────────────────────────
    if (uPreset == 0) {
      vec3 deepVoid = vec3(0.01, 0.005, 0.02);
      vec3 royalAmethyst = vec3(0.49, 0.13, 0.85);
      vec3 electricCyan = vec3(0.0, 0.94, 1.0);
      vec3 luminousLavender = vec3(0.85, 0.72, 1.0);

      float t = sin(vDisplacement * 3.5 + uTime * 0.8) * 0.5 + 0.5;
      vec3 plasma = mix(deepVoid, royalAmethyst, smoothstep(0.1, 0.7, t));
      plasma = mix(plasma, electricCyan, smoothstep(0.45, 0.95, vDisplacement + 0.5));

      // Bioluminescent electric cyan rim highlight (matching user reference)
      vec3 rim = mix(royalAmethyst, electricCyan, fresnel);
      finalColor = plasma + rim * fresnelSoft * 2.2 + electricCyan * (fresnel * 1.5) + luminousLavender * (t * 0.2);
      finalAlpha = 0.95;
    }
    // ─────────────────────────────────────────────────────────────────────────
    // Preset 1: 🪞 Liquid Mercury / Chrome
    // High-gloss liquid silver, molten ripples & sharp anisotropic glints
    // ─────────────────────────────────────────────────────────────────────────
    else if (uPreset == 1) {
      vec3 moltenObsidian = vec3(0.06, 0.07, 0.09);
      vec3 liquidSilver = vec3(0.88, 0.92, 0.98);
      vec3 chromeHighlight = vec3(1.0, 1.0, 1.0);

      // Specular directional light glint
      vec3 lightDir = normalize(vec3(0.5, 1.0, 0.8));
      vec3 H = normalize(lightDir + V);
      float spec = pow(max(dot(N, H), 0.0), 64.0);

      // Liquid reflection wave sheen
      float waveSheen = sin(vWorldPosition.y * 6.0 + uTime * 3.0) * 0.5 + 0.5;
      vec3 baseChrome = mix(moltenObsidian, liquidSilver, fresnelSoft * 0.85 + 0.15);

      finalColor = baseChrome + chromeHighlight * (spec * 1.6 + fresnel * 1.2) + liquidSilver * (waveSheen * 0.15);
      finalAlpha = 0.95;
    }
    // ─────────────────────────────────────────────────────────────────────────
    // Preset 2: ⚡ Cyberpunk Wireframe Topography
    // Neon emerald & electric cyan with radar scanlines and HUD targeting
    // ─────────────────────────────────────────────────────────────────────────
    else if (uPreset == 2) {
      vec3 darkMatrix = vec3(0.01, 0.03, 0.03);
      vec3 cyberEmerald = vec3(0.0, 1.0, 0.53);
      vec3 laserCyan = vec3(0.0, 0.85, 1.0);
      vec3 amberTarget = vec3(1.0, 0.72, 0.1);

      // Scanning radar pulse along Y-axis
      float scanline = sin(vWorldPosition.y * 14.0 - uTime * 5.0);
      float isScanning = smoothstep(0.85, 0.98, scanline);

      // Stepped contour color banding
      float contour = sin(vDisplacement * 18.0) * 0.5 + 0.5;
      vec3 neonGlow = mix(cyberEmerald, laserCyan, contour);

      finalColor = darkMatrix + neonGlow * (fresnelSoft * 1.4 + 0.25) + amberTarget * isScanning * 1.8;
      finalAlpha = 0.88;
    }
    // ─────────────────────────────────────────────────────────────────────────
    // Preset 3: 💎 Holographic Prismatic Glass
    // Refractive chromatic dispersion splitting white light into rainbow facets
    // ─────────────────────────────────────────────────────────────────────────
    else {
      // Chromatic dispersion indices
      vec3 refractR = refract(-V, N, 0.72);
      vec3 refractG = refract(-V, N, 0.75);
      vec3 refractB = refract(-V, N, 0.78);

      // Rainbow spectral color wheel based on view angle and normal
      float angle = dot(N, V);
      vec3 rainbow = 0.5 + 0.5 * cos(6.28318 * (angle * 1.8 + vec3(0.0, 0.33, 0.67) + uTime * 0.1));

      vec3 glassCore = vec3(0.04, 0.08, 0.14);
      vec3 dispersion = rainbow * (fresnelSoft * 1.6);
      vec3 diamondGlint = vec3(1.0) * pow(max(dot(N, vec3(0.0, 0.0, 1.0)), 0.0), 32.0);

      finalColor = glassCore + dispersion + diamondGlint * 1.2;
      finalAlpha = 0.90;
    }

    // Optional user wireframe accent
    if (uWireframe > 0.5) {
      finalColor += vec3(0.4, 0.4, 0.5) * 0.5;
    }

    gl_FragColor = vec4(finalColor, finalAlpha);
  }
`

// Map activePreset string to shader integer
const PRESET_INDEX_MAP: Record<ArtPreset, number> = {
  cosmic: 0,
  chrome: 1,
  cyberpunk: 2,
  prismatic: 3,
}

export default function MorphingSculptureCanvas() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const shaderMaterialRef = useRef<THREE.ShaderMaterial | null>(null)
  const particleMaterialRef = useRef<THREE.PointsMaterial | null>(null)
  const ringGroupRef = useRef<THREE.Group | null>(null)

  const activePreset = useArtStyleStore((state) => state.activePreset)
  const wireframe = useArtStyleStore((state) => state.wireframe)
  const morphIntensity = useArtStyleStore((state) => state.morphIntensity)
  const isAutoRotate = useArtStyleStore((state) => state.isAutoRotate)
  const setIsInteracting = useArtStyleStore((state) => state.setIsInteracting)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    let animationFrameId: number
    let isDisposed = false

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100)
    camera.position.set(0, 0, 7.2)

    // 2. Renderer Setup
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x000000, 0)

    // 3. Morphing Sculpture Geometry & Shader Material
    // Subdivided icosahedron for ultra-high vertex density and silky-smooth waves
    const sculptureGeometry = new THREE.IcosahedronGeometry(2.1, 56)

    const shaderMaterial = new THREE.ShaderMaterial({
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uScroll: { value: 0 },
        uScrollVelocity: { value: 0 },
        uPreset: { value: PRESET_INDEX_MAP[activePreset] },
        uIntensity: { value: morphIntensity },
        uWireframe: { value: wireframe ? 1.0 : 0.0 },
      },
      wireframe: wireframe,
      transparent: true,
      side: THREE.DoubleSide,
    })
    shaderMaterialRef.current = shaderMaterial

    const sculptureMesh = new THREE.Mesh(sculptureGeometry, shaderMaterial)
    scene.add(sculptureMesh)

    // 4. Auxiliary Stardust Particles (Orbital Satellite Cloud)
    const particleCount = 380
    const particleGeometry = new THREE.BufferGeometry()
    const positions = new Float32Array(particleCount * 3)
    const scales = new Float32Array(particleCount)
    const randomOffsets = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount; i++) {
      // Ring distribution around the sculpture
      const angle = Math.random() * Math.PI * 2
      const radius = 2.8 + Math.random() * 2.6
      const elevation = (Math.random() - 0.5) * 1.8

      positions[i * 3] = Math.cos(angle) * radius
      positions[i * 3 + 1] = elevation
      positions[i * 3 + 2] = Math.sin(angle) * radius

      scales[i] = Math.random() * 2.5 + 0.8
      randomOffsets[i * 3] = (Math.random() - 0.5) * 0.02
      randomOffsets[i * 3 + 1] = (Math.random() - 0.5) * 0.02
      randomOffsets[i * 3 + 2] = (Math.random() - 0.5) * 0.02
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    particleGeometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1))

    // Particle Material with dynamic preset coloring
    const particleMaterial = new THREE.PointsMaterial({
      size: 0.055,
      color: 0x9d4edd,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    })
    particleMaterialRef.current = particleMaterial

    const particles = new THREE.Points(particleGeometry, particleMaterial)
    particles.rotation.x = 0.42 // Tilted orbital plane
    scene.add(particles)

    // 5. Cyberpunk HUD Rings (Orbital radar reticles visible in Cyberpunk mode)
    const ringGroup = new THREE.Group()
    ringGroupRef.current = ringGroup

    const createReticleRing = (radius: number, colorHex: number) => {
      const ringGeo = new THREE.RingGeometry(radius, radius + 0.015, 64)
      const ringMat = new THREE.MeshBasicMaterial({
        color: colorHex,
        transparent: true,
        opacity: 0.35,
        side: THREE.DoubleSide,
      })
      return new THREE.Mesh(ringGeo, ringMat)
    }

    const ring1 = createReticleRing(3.2, 0x00ff88)
    const ring2 = createReticleRing(3.6, 0x00f0ff)
    ring2.rotation.x = Math.PI * 0.5

    ringGroup.add(ring1)
    ringGroup.add(ring2)
    ringGroup.visible = activePreset === 'cyberpunk'
    scene.add(ringGroup)

    // 6. Interactive State & Smooth Mouse Lerping
    let mouse = { x: 0, y: 0 }
    let targetMouse = { x: 0, y: 0 }
    let isDragging = false
    let previousPointerPosition = { x: 0, y: 0 }
    let manualRotation = { x: 0, y: 0 }
    let manualVelocity = { x: 0, y: 0 }

    let lastScroll = window.scrollY
    let scrollVelocity = 0

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY

      // Normalized coordinates [-1, 1]
      targetMouse.x = (clientX / window.innerWidth) * 2 - 1
      targetMouse.y = -(clientY / window.innerHeight) * 2 + 1

      if (isDragging) {
        const deltaX = clientX - previousPointerPosition.x
        const deltaY = clientY - previousPointerPosition.y

        manualVelocity.x = deltaX * 0.005
        manualVelocity.y = deltaY * 0.005

        manualRotation.y += manualVelocity.x
        manualRotation.x += manualVelocity.y

        previousPointerPosition = { x: clientX, y: clientY }
      }
    }

    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true
      setIsInteracting(true)
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY
      previousPointerPosition = { x: clientX, y: clientY }
    }

    const handlePointerUp = () => {
      isDragging = false
      setIsInteracting(false)
    }

    window.addEventListener('mousemove', handlePointerMove, { passive: true })
    window.addEventListener('touchmove', handlePointerMove, { passive: true })
    window.addEventListener('mouseup', handlePointerUp)
    window.addEventListener('touchend', handlePointerUp)

    // Canvas-specific pointer down for direct orbit rotation
    canvas.addEventListener('mousedown', handlePointerDown)
    canvas.addEventListener('touchstart', handlePointerDown, { passive: true })

    const handleResize = () => {
      if (!renderer || isDisposed) return
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    }

    window.addEventListener('resize', handleResize, { passive: true })

    // 7. Render Loop
    let clock = new THREE.Clock()

    const animate = () => {
      if (isDisposed) return

      const delta = clock.getDelta()
      const time = clock.getElapsedTime()

      // Calculate scroll velocity burst
      const currentScroll = window.scrollY
      const deltaScroll = Math.abs(currentScroll - lastScroll)
      scrollVelocity = THREE.MathUtils.lerp(scrollVelocity, deltaScroll * 0.015, 0.1)
      lastScroll = currentScroll

      // Smooth mouse lerp
      mouse.x = THREE.MathUtils.lerp(mouse.x, targetMouse.x, 0.08)
      mouse.y = THREE.MathUtils.lerp(mouse.y, targetMouse.y, 0.08)

      // Apply inertia to manual orbit rotation
      if (!isDragging) {
        manualRotation.x += manualVelocity.y
        manualRotation.y += manualVelocity.x
        manualVelocity.x *= 0.94
        manualVelocity.y *= 0.94
      }

      // Auto-rotation when not interacting
      const autoRotateMultiplier = isAutoRotate ? 1.0 : 0.0
      sculptureMesh.rotation.y = manualRotation.y + time * 0.22 * autoRotateMultiplier + mouse.x * 0.4
      sculptureMesh.rotation.x = manualRotation.x + Math.sin(time * 0.3) * 0.15 + mouse.y * 0.3
      sculptureMesh.rotation.z = Math.cos(time * 0.25) * 0.08

      // Rotate particle cloud & reticles
      particles.rotation.y = time * 0.12 + mouse.x * 0.2
      particles.rotation.z = Math.sin(time * 0.15) * 0.1
      ring1.rotation.z = -time * 0.35
      ring2.rotation.z = time * 0.25

      // Dynamic position based on scroll progress:
      // Shifts gently as user scrolls through sections
      const scrollYNorm = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight || 1)
      sculptureMesh.position.y = Math.sin(scrollYNorm * Math.PI * 2) * 0.45
      sculptureMesh.position.x = Math.cos(scrollYNorm * Math.PI) * 0.3

      // Update shader uniforms
      shaderMaterial.uniforms.uTime.value = time
      shaderMaterial.uniforms.uMouse.value.set(mouse.x, mouse.y)
      shaderMaterial.uniforms.uScroll.value = scrollYNorm
      shaderMaterial.uniforms.uScrollVelocity.value = scrollVelocity

      renderer.render(scene, camera)
      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    // 8. Cleanup
    return () => {
      isDisposed = true
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('mousemove', handlePointerMove)
      window.removeEventListener('touchmove', handlePointerMove)
      window.removeEventListener('mouseup', handlePointerUp)
      window.removeEventListener('touchend', handlePointerUp)
      window.removeEventListener('resize', handleResize)
      canvas.removeEventListener('mousedown', handlePointerDown)
      canvas.removeEventListener('touchstart', handlePointerDown)

      sculptureGeometry.dispose()
      shaderMaterial.dispose()
      particleGeometry.dispose()
      particleMaterial.dispose()
      renderer.dispose()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAutoRotate, setIsInteracting])

  // Sync state changes with the running shader without rebuilding the whole scene
  useEffect(() => {
    if (shaderMaterialRef.current) {
      shaderMaterialRef.current.uniforms.uPreset.value = PRESET_INDEX_MAP[activePreset]
      shaderMaterialRef.current.uniforms.uWireframe.value = wireframe ? 1.0 : 0.0
      shaderMaterialRef.current.uniforms.uIntensity.value = morphIntensity
      shaderMaterialRef.current.wireframe = wireframe
      shaderMaterialRef.current.needsUpdate = true
    }

    if (particleMaterialRef.current) {
      const particleColors: Record<ArtPreset, number> = {
        cosmic: 0x9d4edd,
        chrome: 0xdde2ea,
        cyberpunk: 0x00ff88,
        prismatic: 0x38bdf8,
      }
      particleMaterialRef.current.color.setHex(particleColors[activePreset])
    }

    if (ringGroupRef.current) {
      ringGroupRef.current.visible = activePreset === 'cyberpunk'
    }
  }, [activePreset, wireframe, morphIntensity])

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 w-full h-full -z-20 pointer-events-auto overflow-hidden select-none"
      title="Interactive 3D Generative Sculpture (Drag to rotate · Scroll to morph)"
    >
      {/* Three.js WebGL Interactive Canvas */}
      <canvas 
        ref={canvasRef} 
        className="w-full h-full block cursor-grab active:cursor-grabbing"
      />

      {/* Subtle depth vignette guaranteeing maximum typographic contrast */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,rgba(7,8,10,0.75)_95%)] pointer-events-none" />

      {/* Architectural subtle coordinate hud badge */}
      <div className="absolute top-5 right-6 hidden lg:flex items-center gap-2 font-mono text-[9px] text-zinc-500 uppercase tracking-widest pointer-events-none bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/5">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span>WEBGL_CORE // DISPERSION_SHADER: ACTIVE</span>
      </div>
    </div>
  )
}
