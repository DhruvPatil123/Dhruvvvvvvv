"use client"

import React, { useRef, useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Sparkles, 
  Download, 
  RefreshCw, 
  Copy, 
  Check, 
  Terminal, 
  Sliders, 
  Zap, 
  Eye, 
  Maximize2, 
  Cpu, 
  Waves, 
  Hash, 
  Palette,
  Play,
  Pause,
  Upload,
  Layers,
  ArrowRight
} from 'lucide-react'
import { playTick, playPopover, playNotification, playCryptoTick } from '@/lib/sounds'
import { useArtStyleStore } from '@/store/useArtStyleStore'
import EditorialBadge from '@/components/typography/EditorialBadge'
import FluidText from '@/components/typography/FluidText'

// ── Math Helpers for Flow Fields & Attractors ────────────────────────────────
function pseudoNoise(x: number, y: number, t: number): number {
  return (
    Math.sin(x * 0.005 + t * 0.5) * Math.cos(y * 0.005 + t * 0.4) +
    Math.sin(x * 0.012 - t * 0.3 + y * 0.008) * 0.5 +
    Math.cos(Math.sqrt(x * x + y * y) * 0.006 - t * 0.6) * 0.35
  )
}

export default function GenerativeArtLab() {
  const [activeTab, setActiveTab] = useState<'flowfield' | 'ascii' | 'wallpaper'>('flowfield')

  return (
    <section 
      id="art-lab" 
      className="relative w-full py-24 sm:py-32 px-4 sm:px-6 md:px-8 max-w-[1440px] mx-auto select-none"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/10">
        <div className="space-y-4">
          <EditorialBadge
            index="04"
            label="COMPUTATIONAL_STUDIO"
            coordinates="3840×2160_UHD"
            frequency="CANVAS_GLSL"
            variant="amethyst"
          />
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-light tracking-tight text-white">
            Generative <FluidText variant="amethyst" className="font-semibold text-white">Art Lab</FluidText>
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 max-w-2xl leading-relaxed">
            Interactive mathematical physics engines, real-time ASCII/CRT shaders, and procedural 4K wallpaper synthesis demonstrating the convergence of AI architecture and generative aesthetics.
          </p>
        </div>

        {/* Studio Switcher Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-xl bg-zinc-950/80 border border-white/10 backdrop-blur-xl">
          <button
            type="button"
            onClick={() => {
              playPopover()
              setActiveTab('flowfield')
            }}
            className={`px-3.5 py-2 rounded-lg font-mono text-xs font-semibold tracking-wider transition-all duration-300 flex items-center gap-2 cursor-pointer ${
              activeTab === 'flowfield'
                ? 'bg-white text-black shadow-md shadow-white/10 scale-[1.02]'
                : 'text-zinc-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Waves className="w-3.5 h-3.5" />
            <span>Flow & Attractor</span>
          </button>

          <button
            type="button"
            onClick={() => {
              playPopover()
              setActiveTab('ascii')
            }}
            className={`px-3.5 py-2 rounded-lg font-mono text-xs font-semibold tracking-wider transition-all duration-300 flex items-center gap-2 cursor-pointer ${
              activeTab === 'ascii'
                ? 'bg-white text-black shadow-md shadow-white/10 scale-[1.02]'
                : 'text-zinc-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>ASCII & Matrix CRT</span>
          </button>

          <button
            type="button"
            onClick={() => {
              playPopover()
              setActiveTab('wallpaper')
            }}
            className={`px-3.5 py-2 rounded-lg font-mono text-xs font-semibold tracking-wider transition-all duration-300 flex items-center gap-2 cursor-pointer ${
              activeTab === 'wallpaper'
                ? 'bg-white text-black shadow-md shadow-white/10 scale-[1.02]'
                : 'text-zinc-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>4K Wallpaper Lab</span>
          </button>
        </div>
      </div>

      {/* Main Studio Viewport */}
      <div className="pt-8">
        <AnimatePresence mode="wait">
          {activeTab === 'flowfield' && <FlowFieldStudio key="flowfield" />}
          {activeTab === 'ascii' && <AsciiMatrixStudio key="ascii" />}
          {activeTab === 'wallpaper' && <WallpaperLabStudio key="wallpaper" />}
        </AnimatePresence>
      </div>
    </section>
  )
}

const FLOW_PALETTES = {
  neon: ['#00f0ff', '#ff007f', '#7928ca', '#00ff88'],
  aurora: ['#00f5d4', '#00bbf9', '#9b5de5', '#52b788'],
  sunset: ['#ffb703', '#fb8500', '#f72585', '#7209b7'],
  monochrome: ['#ffffff', '#a1a1aa', '#71717a', '#d4d4d8'],
}

// =============================================================================
// STUDIO 1: Flow Field & Lorenz Attractor Simulator
// =============================================================================
function FlowFieldStudio() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [algorithm, setAlgorithm] = useState<'curl' | 'lorenz' | 'vortex' | 'turing'>('curl')
  const [palette, setPalette] = useState<'neon' | 'aurora' | 'sunset' | 'monochrome'>('neon')
  const [particleCount, setParticleCount] = useState<number>(650)
  const [speed, setSpeed] = useState<number>(1.5)
  const [trailDecay, setTrailDecay] = useState<number>(0.06)
  const [isRunning, setIsRunning] = useState<boolean>(true)
  const mouseRef = useRef<{ x: number; y: number; isDown: boolean }>({ x: 0, y: 0, isDown: false })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = (canvas.width = canvas.parentElement?.clientWidth || 900)
    let height = (canvas.height = 540)
    let animId: number
    let time = 0

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return
      width = canvas.width = canvas.parentElement.clientWidth
      height = canvas.height = 540
      ctx.fillStyle = '#06070a'
      ctx.fillRect(0, 0, width, height)
    }

    window.addEventListener('resize', handleResize)

    // Clear background initially
    ctx.fillStyle = '#06070a'
    ctx.fillRect(0, 0, width, height)

    // Particle Setup
    interface Particle {
      x: number
      y: number
      vx: number
      vy: number
      color: string
      life: number
      maxLife: number
      // Lorenz 3D coordinates
      lx?: number
      ly?: number
      lz?: number
    }

    const currentPalette = FLOW_PALETTES[palette]

    const createParticle = (): Particle => {
      const color = currentPalette[Math.floor(Math.random() * currentPalette.length)]
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: 0,
        vy: 0,
        color,
        life: 0,
        maxLife: Math.random() * 220 + 80,
        lx: (Math.random() - 0.5) * 20,
        ly: (Math.random() - 0.5) * 20,
        lz: 20 + Math.random() * 10,
      }
    }

    const particles: Particle[] = Array.from({ length: particleCount }, createParticle)

    // Lorenz Attractor constants
    const sigma = 10
    const rho = 28
    const beta = 8 / 3
    const dt = 0.007

    const render = () => {
      time += 0.008

      // Semi-transparent fade to create silky smooth trails
      ctx.fillStyle = `rgba(6, 7, 10, ${trailDecay})`
      ctx.fillRect(0, 0, width, height)

      const mouse = mouseRef.current

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.life++

        if (p.life > p.maxLife || p.x < 0 || p.x > width || p.y < 0 || p.y > height) {
          Object.assign(p, createParticle())
        }

        const prevX = p.x
        const prevY = p.y

        if (algorithm === 'curl') {
          // Perlin Vector Curl Field
          const angle = pseudoNoise(p.x, p.y, time) * Math.PI * 3.5
          p.vx = Math.cos(angle) * speed
          p.vy = Math.sin(angle) * speed

          // Mouse attraction/repulsion on drag
          if (mouse.isDown) {
            const dx = mouse.x - p.x
            const dy = mouse.y - p.y
            const dist = Math.sqrt(dx * dx + dy * dy)
            if (dist < 220 && dist > 1) {
              p.vx += (dx / dist) * 3.5
              p.vy += (dy / dist) * 3.5
            }
          }
        } else if (algorithm === 'lorenz') {
          // Differential Equations: dx = s*(y-x), dy = x*(r-z)-y, dz = x*y - b*z
          const lx = p.lx || 1
          const ly = p.ly || 1
          const lz = p.lz || 20

          const dx = sigma * (ly - lx) * dt
          const dy = (lx * (rho - lz) - ly) * dt
          const dz = (lx * ly - beta * lz) * dt

          p.lx = lx + dx * speed
          p.ly = ly + dy * speed
          p.lz = lz + dz * speed

          // Project 3D Lorenz to 2D Screen Space
          const scale = 11.5
          p.x = width * 0.5 + p.lx * scale
          p.y = height * 0.75 - p.lz * scale
        } else if (algorithm === 'turing') {
          // Reaction-Diffusion Turing Morphogenetic Pattern
          const angle = Math.sin(p.x * 0.015 + time * 1.5) * Math.cos(p.y * 0.015 + time * 1.2) * Math.PI * 4.0
          p.vx = Math.cos(angle) * speed
          p.vy = Math.sin(angle) * speed

          if (mouse.isDown) {
            const dx = mouse.x - p.x
            const dy = mouse.y - p.y
            const dist = Math.sqrt(dx * dx + dy * dy)
            if (dist < 200 && dist > 1) {
              p.vx += (dx / dist) * 2.8
              p.vy += (dy / dist) * 2.8
            }
          }
        } else {
          // Vortex Wavefield
          const centerX = mouse.isDown ? mouse.x : width * 0.5
          const centerY = mouse.isDown ? mouse.y : height * 0.5
          const dx = p.x - centerX
          const dy = p.y - centerY
          const dist = Math.sqrt(dx * dx + dy * dy) + 1
          const angle = Math.atan2(dy, dx) + Math.PI / 2 + Math.sin(time + dist * 0.02) * 0.4

          p.vx = Math.cos(angle) * speed * 1.8 - (dx / dist) * 0.5
          p.vy = Math.sin(angle) * speed * 1.8 - (dy / dist) * 0.5
        }

        p.x += p.vx
        p.y += p.vy

        // Draw trail stroke
        ctx.beginPath()
        ctx.moveTo(prevX, prevY)
        ctx.lineTo(p.x, p.y)
        ctx.strokeStyle = p.color
        ctx.lineWidth = 1.3
        ctx.stroke()
      }

      if (isRunning) {
        animId = requestAnimationFrame(render)
      }
    }

    render()

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animId)
    }
  }, [algorithm, palette, particleCount, speed, trailDecay, isRunning])

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      isDown: true,
    }
  }

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    mouseRef.current.x = e.clientX - rect.left
    mouseRef.current.y = e.clientY - rect.top
  }

  const handlePointerUp = () => {
    mouseRef.current.isDown = false
  }

  const clearCanvas = () => {
    playTick()
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (ctx) {
      ctx.fillStyle = '#06070a'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className="grid grid-cols-1 lg:grid-cols-4 gap-6"
    >
      {/* Interactive Canvas Viewport */}
      <div className="lg:col-span-3 rounded-2xl bg-[#06070a] border border-white/15 overflow-hidden shadow-2xl relative flex flex-col">
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-black/60 font-mono text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-zinc-300 font-semibold uppercase">
              {algorithm === 'curl' ? 'PERLIN_CURL_VECTOR_FIELD' : algorithm === 'lorenz' ? 'LORENZ_3D_STRANGE_ATTRACTOR' : 'QUANTUM_VORTEX_ENGINE'}
            </span>
          </div>
          <span className="text-zinc-500 hidden sm:inline text-[11px]">
            DRAG MOUSE TO BEND STREAMLINES
          </span>
        </div>

        <div className="relative w-full h-[540px] cursor-crosshair">
          <canvas
            ref={canvasRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            className="w-full h-full block"
          />

          {/* Canvas Floating Corner Coordinates HUD */}
          <div className="absolute bottom-4 left-4 font-mono text-[10px] text-zinc-500 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/5 pointer-events-none flex items-center gap-3">
            <span>DT: 0.007s</span>
            <span>·</span>
            <span>VECTORS: {particleCount}</span>
            <span>·</span>
            <span>FPS: 60</span>
          </div>
        </div>
      </div>

      {/* Control Studio Controls Panel */}
      <div className="lg:col-span-1 rounded-2xl bg-zinc-950/80 border border-white/15 p-5 flex flex-col justify-between gap-6 backdrop-blur-xl">
        <div className="space-y-5">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <span className="font-mono text-xs uppercase tracking-wider text-white font-bold flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-cyan-400" />
              PHYSICS CONTROLS
            </span>
            <button
              onClick={() => setIsRunning(!isRunning)}
              className="p-1 rounded bg-white/10 hover:bg-white text-zinc-300 hover:text-black font-mono text-[10px] uppercase transition-colors"
            >
              {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Algorithm Type */}
          <div className="space-y-2">
            <span className="font-mono text-[11px] text-zinc-400 uppercase tracking-wider block">
              Vector Algorithm
            </span>
            <div className="grid grid-cols-1 gap-1.5">
              {[
                { id: 'curl', label: 'Perlin Curl Noise' },
                { id: 'lorenz', label: 'Lorenz Attractor' },
                { id: 'vortex', label: 'Quantum Vortex' },
                { id: 'turing', label: 'Reaction-Diffusion' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    playTick()
                    setAlgorithm(item.id as any)
                  }}
                  className={`px-3 py-2 rounded-lg font-mono text-xs text-left transition-all cursor-pointer flex items-center justify-between ${
                    algorithm === item.id
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                      : 'bg-white/5 text-zinc-400 border border-white/5 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <span>{item.label}</span>
                  {algorithm === item.id && <Zap className="w-3 h-3 text-cyan-400" />}
                </button>
              ))}
            </div>
          </div>

          {/* Palette Selector */}
          <div className="space-y-2">
            <span className="font-mono text-[11px] text-zinc-400 uppercase tracking-wider block">
              Color Palette
            </span>
            <div className="grid grid-cols-2 gap-1.5">
              {[
                { id: 'neon', label: 'Cyber Neon' },
                { id: 'aurora', label: 'Aurora Teal' },
                { id: 'sunset', label: 'Sunset Gold' },
                { id: 'monochrome', label: 'Silver Ink' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    playTick()
                    setPalette(item.id as any)
                  }}
                  className={`px-2.5 py-1.5 rounded-lg font-mono text-[11px] text-center transition-all cursor-pointer ${
                    palette === item.id
                      ? 'bg-white text-black font-bold'
                      : 'bg-white/5 text-zinc-400 border border-white/5 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Particle Density */}
          <div className="space-y-1.5">
            <div className="flex justify-between font-mono text-[11px] text-zinc-400">
              <span>Particle Density</span>
              <span className="text-white">{particleCount}</span>
            </div>
            <input
              type="range"
              min={200}
              max={1200}
              step={50}
              value={particleCount}
              onChange={(e) => setParticleCount(Number(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer"
            />
          </div>

          {/* Velocity Speed */}
          <div className="space-y-1.5">
            <div className="flex justify-between font-mono text-[11px] text-zinc-400">
              <span>Vector Velocity</span>
              <span className="text-white">{speed}x</span>
            </div>
            <input
              type="range"
              min={0.5}
              max={3.0}
              step={0.1}
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 pt-2 border-t border-white/10">
          <button
            type="button"
            onClick={clearCanvas}
            className="w-full py-2 rounded-lg bg-white/5 hover:bg-white/15 text-zinc-300 hover:text-white border border-white/10 font-mono text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Clear Trace</span>
          </button>
        </div>
      </div>
    </motion.div>
  )
}

// =============================================================================
// STUDIO 2: Real-Time ASCII & Matrix CRT Shader Filter
// =============================================================================
const ASCII_SAMPLES = [
  { name: 'Raincrew.AI', role: 'Gemini Multimodal Live', seed: 'raincrew' },
  { name: 'AutoForge.AI', role: 'Autonomous Agentic Loop', seed: 'autoforge' },
  { name: 'VisionCraft.AI', role: 'GAN Procedural Synthesis', seed: 'visioncraft' },
  { name: 'Predictor.AI', role: 'AST Neo4j Knowledge Graph', seed: 'ast' },
]

const ASCII_THEMES = {
  green: { primary: '#00ff66', glow: 'rgba(0, 255, 102, 0.4)', bg: '#030a04' },
  amber: { primary: '#ffb000', glow: 'rgba(255, 176, 0, 0.4)', bg: '#0c0702' },
  cyan: { primary: '#00f0ff', glow: 'rgba(0, 240, 255, 0.4)', bg: '#02090c' },
  silver: { primary: '#ffffff', glow: 'rgba(255, 255, 255, 0.3)', bg: '#080808' },
}

function AsciiMatrixStudio() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [filterMode, setFilterMode] = useState<'matrix' | 'ascii' | 'halftone'>('matrix')
  const [colorTheme, setColorTheme] = useState<'green' | 'amber' | 'cyan' | 'silver'>('green')
  const [cellSize, setCellSize] = useState<number>(7)
  const [selectedSample, setSelectedSample] = useState<number>(0)
  const [copied, setCopied] = useState<boolean>(false)

  const isGlobalMatrixActive = useArtStyleStore((state) => state.isGlobalMatrixActive)
  const toggleGlobalMatrix = useArtStyleStore((state) => state.toggleGlobalMatrix)

  // Draw procedural synthetic visual graphic on offscreen canvas to process into ASCII
  const renderFilter = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const width = (canvas.width = canvas.parentElement?.clientWidth || 800)
    const height = (canvas.height = 540)

    const theme = ASCII_THEMES[colorTheme]

    // Create offscreen buffer
    const offCanvas = document.createElement('canvas')
    offCanvas.width = width
    offCanvas.height = height
    const offCtx = offCanvas.getContext('2d')
    if (!offCtx) return

    // Draw rich graphical composition to be ASCII/Matrix-ified
    const sample = ASCII_SAMPLES[selectedSample]
    offCtx.fillStyle = '#0a0a14'
    offCtx.fillRect(0, 0, width, height)

    // Render concentric geometric rings & grid typography
    offCtx.strokeStyle = '#ffffff'
    offCtx.lineWidth = 4
    offCtx.beginPath()
    offCtx.arc(width * 0.5, height * 0.45, 140, 0, Math.PI * 2)
    offCtx.stroke()

    offCtx.lineWidth = 1.5
    offCtx.beginPath()
    offCtx.arc(width * 0.5, height * 0.45, 200, 0, Math.PI * 2)
    offCtx.stroke()

    // Inner geometric crosshairs
    offCtx.beginPath()
    offCtx.moveTo(width * 0.5 - 180, height * 0.45)
    offCtx.lineTo(width * 0.5 + 180, height * 0.45)
    offCtx.moveTo(width * 0.5, height * 0.45 - 180)
    offCtx.lineTo(width * 0.5, height * 0.45 + 180)
    offCtx.stroke()

    // Title typography
    offCtx.fillStyle = '#ffffff'
    offCtx.font = 'bold 38px monospace'
    offCtx.textAlign = 'center'
    offCtx.fillText(sample.name.toUpperCase(), width * 0.5, height * 0.42)

    offCtx.font = '16px monospace'
    offCtx.fillText(sample.role.toUpperCase(), width * 0.5, height * 0.50)

    // Read pixel data
    const imgData = offCtx.getImageData(0, 0, width, height)
    const pixels = imgData.data

    // Clear output canvas with theme background
    ctx.fillStyle = theme.bg
    ctx.fillRect(0, 0, width, height)

    // Matrix characters: Katakana + hex + alphanumeric
    const matrixChars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホ0123456789ABCDEF'
    const asciiRamp = '@%#*+=-:. '

    ctx.font = `${cellSize}px monospace`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'

    // Rasterize into ASCII / Matrix blocks
    for (let y = 0; y < height; y += cellSize) {
      for (let x = 0; x < width; x += cellSize) {
        const idx = (y * width + x) * 4
        const r = pixels[idx]
        const g = pixels[idx + 1]
        const b = pixels[idx + 2]
        const brightness = (r * 0.299 + g * 0.587 + b * 0.114) / 255

        if (brightness < 0.05) continue

        if (filterMode === 'matrix') {
          const char = matrixChars[Math.floor(Math.random() * matrixChars.length)]
          ctx.fillStyle = theme.primary
          ctx.globalAlpha = Math.min(1, brightness * 1.5)
          ctx.fillText(char, x + cellSize * 0.5, y + cellSize * 0.5)
        } else if (filterMode === 'ascii') {
          const rampIdx = Math.floor((1 - brightness) * (asciiRamp.length - 1))
          const char = asciiRamp[rampIdx]
          ctx.fillStyle = theme.primary
          ctx.globalAlpha = brightness
          ctx.fillText(char, x + cellSize * 0.5, y + cellSize * 0.5)
        } else {
          // Halftone Dots
          const radius = (cellSize * 0.5) * brightness
          ctx.fillStyle = theme.primary
          ctx.globalAlpha = brightness * 0.9
          ctx.beginPath()
          ctx.arc(x + cellSize * 0.5, y + cellSize * 0.5, radius, 0, Math.PI * 2)
          ctx.fill()
        }
      }
    }

    ctx.globalAlpha = 1.0

    // Cathode CRT Scanline Overlay
    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)'
    for (let y = 0; y < height; y += 3) {
      ctx.fillRect(0, y, width, 1)
    }
  }, [cellSize, colorTheme, filterMode, selectedSample])

  useEffect(() => {
    renderFilter()
    window.addEventListener('resize', renderFilter)
    return () => window.removeEventListener('resize', renderFilter)
  }, [renderFilter])

  const copyAsciiText = () => {
    playNotification()
    const sample = ASCII_SAMPLES[selectedSample]
    const textArt = `
+-------------------------------------------------------+
|  DHRUV PATIL // REAL-TIME ASCII ARCHITECTURE MATRIX  |
|  PROJECT: ${sample.name.padEnd(43)} |
|  SYSTEM:  ${sample.role.padEnd(43)} |
|  MODE:    ${filterMode.toUpperCase().padEnd(43)} |
|  STATUS:  COMPILED & VERIFIED IN ASCII MATRIX          |
+-------------------------------------------------------+
`
    navigator.clipboard.writeText(textArt).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className="grid grid-cols-1 lg:grid-cols-4 gap-6"
    >
      {/* ASCII Output Canvas */}
      <div className="lg:col-span-3 rounded-2xl bg-black border border-white/15 overflow-hidden shadow-2xl relative flex flex-col">
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-zinc-950/80 font-mono text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-zinc-300 font-semibold uppercase">
              CRT_RASTER_MATRIX // 60HZ SCANLINES
            </span>
          </div>
          <span className="text-zinc-500 font-mono text-[11px]">
            ALGORITHM: {filterMode.toUpperCase()}
          </span>
        </div>

        <div className="relative w-full h-[540px] flex items-center justify-center bg-black">
          <canvas ref={canvasRef} className="w-full h-full block" />
        </div>
      </div>

      {/* ASCII Controls Panel */}
      <div className="lg:col-span-1 rounded-2xl bg-zinc-950/80 border border-white/15 p-5 flex flex-col justify-between gap-6 backdrop-blur-xl">
        <div className="space-y-5">
          <div className="border-b border-white/10 pb-3">
            <span className="font-mono text-xs uppercase tracking-wider text-white font-bold flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-emerald-400" />
              SHADER CONTROLS
            </span>
          </div>

          {/* Project Source */}
          <div className="space-y-2">
            <span className="font-mono text-[11px] text-zinc-400 uppercase tracking-wider block">
              Vector Asset Source
            </span>
            <div className="grid grid-cols-1 gap-1.5">
              {ASCII_SAMPLES.map((s, idx) => (
                <button
                  key={s.name}
                  onClick={() => {
                    playCryptoTick()
                    setSelectedSample(idx)
                  }}
                  className={`px-3 py-2 rounded-lg font-mono text-xs text-left transition-all cursor-pointer flex items-center justify-between ${
                    selectedSample === idx
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold'
                      : 'bg-white/5 text-zinc-400 border border-white/5 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <span>{s.name}</span>
                  <span className="text-[10px] text-zinc-500">{s.seed}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Filter Mode */}
          <div className="space-y-2">
            <span className="font-mono text-[11px] text-zinc-400 uppercase tracking-wider block">
              Filter Shader
            </span>
            <div className="grid grid-cols-3 gap-1">
              {[
                { id: 'matrix', label: 'Matrix' },
                { id: 'ascii', label: 'ASCII' },
                { id: 'halftone', label: 'Dots' },
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => {
                    playTick()
                    setFilterMode(m.id as any)
                  }}
                  className={`px-2 py-1.5 rounded-lg font-mono text-[11px] text-center transition-all cursor-pointer ${
                    filterMode === m.id
                      ? 'bg-white text-black font-bold'
                      : 'bg-white/5 text-zinc-400 hover:text-white'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          {/* Phosphor Glow Color */}
          <div className="space-y-2">
            <span className="font-mono text-[11px] text-zinc-400 uppercase tracking-wider block">
              Phosphor Color
            </span>
            <div className="grid grid-cols-2 gap-1.5">
              {[
                { id: 'green', label: 'Phosphor Green' },
                { id: 'amber', label: 'Retro Amber' },
                { id: 'cyan', label: 'Glitch Cyan' },
                { id: 'silver', label: 'Mono Silver' },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    playTick()
                    setColorTheme(t.id as any)
                  }}
                  className={`px-2.5 py-1.5 rounded-lg font-mono text-[11px] text-center transition-all cursor-pointer ${
                    colorTheme === t.id
                      ? 'bg-white text-black font-bold'
                      : 'bg-white/5 text-zinc-400 hover:text-white'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Raster Grid Size */}
          <div className="space-y-1.5">
            <div className="flex justify-between font-mono text-[11px] text-zinc-400">
              <span>Cell Density</span>
              <span className="text-white">{cellSize}px</span>
            </div>
            <input
              type="range"
              min={4}
              max={14}
              step={1}
              value={cellSize}
              onChange={(e) => setCellSize(Number(e.target.value))}
              className="w-full accent-emerald-400 cursor-pointer"
            />
          </div>
        </div>

        {/* Actions: Toggle Global Site CRT & Copy ASCII Button */}
        <div className="pt-2 border-t border-white/10 space-y-2">
          <button
            type="button"
            onClick={toggleGlobalMatrix}
            className={`w-full py-2.5 rounded-lg border font-mono text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer font-bold ${
              isGlobalMatrixActive
                ? 'bg-emerald-400 text-black border-emerald-300 shadow-md shadow-emerald-500/30'
                : 'bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border-emerald-500/40'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{isGlobalMatrixActive ? 'Disable Site CRT Mode' : 'Activate Site Matrix CRT'}</span>
          </button>

          <button
            type="button"
            onClick={copyAsciiText}
            className="w-full py-2.5 rounded-lg bg-white/5 hover:bg-white/15 text-zinc-300 hover:text-white border border-white/10 font-mono text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied ASCII!' : 'Copy ASCII Text'}</span>
          </button>
        </div>
      </div>
    </motion.div>
  )
}

// =============================================================================
// STUDIO 3: 4K Computational Art Wallpaper Exporter
// =============================================================================
const WALLPAPER_PALETTES = {
  supernova: { name: 'Cosmic Supernova', colors: ['#0f051d', '#581c87', '#9333ea', '#38bdf8', '#ff007f'] },
  chrome: { name: 'Liquid Mercury', colors: ['#090a0f', '#334155', '#94a3b8', '#e2e8f0', '#ffffff'] },
  cyberpunk: { name: 'Cyberpunk Wireframe', colors: ['#02120d', '#064e3b', '#00ff88', '#00f0ff', '#ffb000'] },
  prismatic: { name: 'Prismatic Diamond', colors: ['#030712', '#1e293b', '#38bdf8', '#f43f5e', '#a855f7'] },
}

function WallpaperLabStudio() {
  const previewCanvasRef = useRef<HTMLCanvasElement>(null)
  const [chaos, setChaos] = useState<number>(1.2)
  const [chromaticAberration, setChromaticAberration] = useState<number>(12)
  const [luminescence, setLuminescence] = useState<number>(1.0)
  const [palette, setPalette] = useState<'supernova' | 'chrome' | 'cyberpunk' | 'prismatic'>('supernova')
  const [isExporting, setIsExporting] = useState<boolean>(false)

  const renderWallpaperToCanvas = useCallback((
    canvas: HTMLCanvasElement, 
    renderWidth: number, 
    renderHeight: number, 
    is4K: boolean = false
  ) => {
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = renderWidth
    canvas.height = renderHeight

    const currentPalette = WALLPAPER_PALETTES[palette]

    // Fill deep cosmic gradient background
    const bgGrad = ctx.createLinearGradient(0, 0, renderWidth, renderHeight)
    bgGrad.addColorStop(0, currentPalette.colors[0])
    bgGrad.addColorStop(0.5, currentPalette.colors[1])
    bgGrad.addColorStop(1, currentPalette.colors[0])
    ctx.fillStyle = bgGrad
    ctx.fillRect(0, 0, renderWidth, renderHeight)

    // Render Procedural Waveforms with Chromatic Aberration
    const steps = is4K ? 180 : 90
    const waveCount = 8

    ctx.globalCompositeOperation = 'screen'

    for (let w = 0; w < waveCount; w++) {
      const colorIndex = (w % (currentPalette.colors.length - 2)) + 2
      const strokeColor = currentPalette.colors[colorIndex]

      // RGB Chromatic Shift Passes
      const rgbPasses = [
        { color: strokeColor, offsetX: -chromaticAberration * (is4K ? 2.5 : 1) },
        { color: currentPalette.colors[(colorIndex + 1) % currentPalette.colors.length], offsetX: 0 },
        { color: strokeColor, offsetX: chromaticAberration * (is4K ? 2.5 : 1) },
      ]

      rgbPasses.forEach((pass) => {
        ctx.beginPath()
        ctx.strokeStyle = pass.color
        ctx.lineWidth = (is4K ? 4.5 : 2.0) * luminescence
        ctx.globalAlpha = 0.65 * luminescence

        for (let i = 0; i <= steps; i++) {
          const t = i / steps
          const x = t * renderWidth + pass.offsetX

          const freq = chaos * 0.003
          const yBase = renderHeight * 0.5 + Math.sin(w * 1.2 + t * 4.0) * (renderHeight * 0.15)
          const ripple = Math.sin(t * 12.0 * chaos + w) * (renderHeight * 0.1) * luminescence
          const y = yBase + ripple

          if (i === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.stroke()
      })
    }

    // Render 3D Computational Wireframe Sphere Centerpiece
    const sphereRadius = Math.min(renderWidth, renderHeight) * 0.26
    const centerX = renderWidth * 0.5
    const centerY = renderHeight * 0.46
    const ringCount = 20

    ctx.save()
    ctx.translate(centerX, centerY)

    for (let r = 0; r < ringCount; r++) {
      const phi = (r / ringCount) * Math.PI - Math.PI / 2
      const radiusAtY = sphereRadius * Math.cos(phi)
      const ringY = sphereRadius * Math.sin(phi)

      ctx.beginPath()
      const ringColor = currentPalette.colors[(r % (currentPalette.colors.length - 1)) + 1]
      ctx.strokeStyle = ringColor
      ctx.lineWidth = (is4K ? 3.0 : 1.2) * luminescence
      ctx.globalAlpha = (is4K ? 0.75 : 0.6) * luminescence

      // Elliptical ring with 3D tilt
      const tilt = 0.35
      const rx = radiusAtY + Math.sin(r * 0.8 * chaos) * (is4K ? 36 : 10)
      const ry = radiusAtY * tilt + Math.cos(r * 0.8 * chaos) * (is4K ? 18 : 5)
      ctx.ellipse(0, ringY * (1 - tilt * 0.5), Math.max(1, rx), Math.max(1, ry), 0.22, 0, Math.PI * 2)
      ctx.stroke()
    }

    ctx.restore()
    ctx.globalCompositeOperation = 'source-over'

    // Minimalist Editorial Watermark in 4K Corner
    const fontSize = is4K ? 34 : 12
    ctx.font = `700 ${fontSize}px monospace`
    ctx.fillStyle = 'rgba(255, 255, 255, 0.85)'
    ctx.textAlign = 'right'
    ctx.fillText('© DHRUV PATIL // RESEARCH ARCHITECT', renderWidth - (is4K ? 90 : 25), renderHeight - (is4K ? 110 : 35))

    ctx.font = `500 ${fontSize * 0.75}px monospace`
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)'
    ctx.fillText(
      `${currentPalette.name.toUpperCase()} · ${is4K ? '3840×2160 4K UHD' : 'PREVIEW'} · CHAOS: ${chaos.toFixed(1)}`, 
      renderWidth - (is4K ? 90 : 25), 
      renderHeight - (is4K ? 70 : 20)
    )
  }, [chaos, chromaticAberration, luminescence, palette])

  // Update live preview
  useEffect(() => {
    const canvas = previewCanvasRef.current
    if (!canvas) return
    const width = canvas.parentElement?.clientWidth || 800
    const height = 540
    renderWallpaperToCanvas(canvas, width, height, false)
  }, [renderWallpaperToCanvas])

  // Export native 4K UHD PNG
  const export4KWallpaper = () => {
    playNotification()
    setIsExporting(true)

    setTimeout(() => {
      const exportCanvas = document.createElement('canvas')
      renderWallpaperToCanvas(exportCanvas, 3840, 2160, true)

      exportCanvas.toBlob((blob) => {
        if (!blob) {
          setIsExporting(false)
          return
        }
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `DhruvPatil-GenerativeArt-4K-${palette}.png`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
        setIsExporting(false)
      }, 'image/png')
    }, 150)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className="grid grid-cols-1 lg:grid-cols-4 gap-6"
    >
      {/* 4K Live Preview Viewport */}
      <div className="lg:col-span-3 rounded-2xl bg-black border border-white/15 overflow-hidden shadow-2xl relative flex flex-col">
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-zinc-950/80 font-mono text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
            <span className="text-zinc-300 font-semibold uppercase">
              PROCEDURAL_WALLPAPER_ENGINE // 16:9 4K UHD
            </span>
          </div>
          <span className="text-zinc-500 font-mono text-[11px]">
            NATIVE RENDERING AT 3840×2160
          </span>
        </div>

        <div className="relative w-full h-[540px] flex items-center justify-center bg-black">
          <canvas ref={previewCanvasRef} className="w-full h-full block" />
        </div>
      </div>

      {/* Wallpaper Controls Panel */}
      <div className="lg:col-span-1 rounded-2xl bg-zinc-950/80 border border-white/15 p-5 flex flex-col justify-between gap-6 backdrop-blur-xl">
        <div className="space-y-5">
          <div className="border-b border-white/10 pb-3">
            <span className="font-mono text-xs uppercase tracking-wider text-white font-bold flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-violet-400" />
              ART PARAMETERS
            </span>
          </div>

          {/* Palette Selection */}
          <div className="space-y-2">
            <span className="font-mono text-[11px] text-zinc-400 uppercase tracking-wider block">
              Color Palette
            </span>
            <div className="grid grid-cols-1 gap-1.5">
              {[
                { id: 'supernova', label: 'Cosmic Supernova' },
                { id: 'chrome', label: 'Liquid Mercury' },
                { id: 'cyberpunk', label: 'Cyberpunk Grid' },
                { id: 'prismatic', label: 'Prismatic Diamond' },
              ].map((p) => (
                <button
                  key={p.id}
                  onClick={() => {
                    playTick()
                    setPalette(p.id as any)
                  }}
                  className={`px-3 py-2 rounded-lg font-mono text-xs text-left transition-all cursor-pointer flex items-center justify-between ${
                    palette === p.id
                      ? 'bg-violet-500/20 text-violet-300 border border-violet-500/40 font-bold'
                      : 'bg-white/5 text-zinc-400 border border-white/5 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <span>{p.label}</span>
                  {palette === p.id && <Sparkles className="w-3 h-3 text-violet-400" />}
                </button>
              ))}
            </div>
          </div>

          {/* Chaos / Frequency */}
          <div className="space-y-1.5">
            <div className="flex justify-between font-mono text-[11px] text-zinc-400">
              <span>Chaos Frequency</span>
              <span className="text-white">{chaos.toFixed(1)}</span>
            </div>
            <input
              type="range"
              min={0.3}
              max={3.0}
              step={0.1}
              value={chaos}
              onChange={(e) => setChaos(Number(e.target.value))}
              className="w-full accent-violet-400 cursor-pointer"
            />
          </div>

          {/* Chromatic Aberration */}
          <div className="space-y-1.5">
            <div className="flex justify-between font-mono text-[11px] text-zinc-400">
              <span>RGB Aberration</span>
              <span className="text-white">{chromaticAberration}px</span>
            </div>
            <input
              type="range"
              min={0}
              max={28}
              step={2}
              value={chromaticAberration}
              onChange={(e) => setChromaticAberration(Number(e.target.value))}
              className="w-full accent-violet-400 cursor-pointer"
            />
          </div>

          {/* Luminescence */}
          <div className="space-y-1.5">
            <div className="flex justify-between font-mono text-[11px] text-zinc-400">
              <span>Luminescence Glow</span>
              <span className="text-white">{luminescence.toFixed(1)}x</span>
            </div>
            <input
              type="range"
              min={0.5}
              max={2.0}
              step={0.1}
              value={luminescence}
              onChange={(e) => setLuminescence(Number(e.target.value))}
              className="w-full accent-violet-400 cursor-pointer"
            />
          </div>
        </div>

        {/* 4K Download Button */}
        <div className="pt-2 border-t border-white/10">
          <button
            type="button"
            disabled={isExporting}
            onClick={export4KWallpaper}
            className="w-full py-3 rounded-xl bg-white hover:bg-zinc-200 text-black font-mono text-xs uppercase tracking-wider font-bold transition-all shadow-lg shadow-white/10 flex items-center justify-center gap-2 cursor-pointer active:scale-95 disabled:opacity-50"
          >
            {isExporting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
            <span>{isExporting ? 'Synthesizing 4K...' : 'Download 4K Wallpaper'}</span>
          </button>
        </div>
      </div>
    </motion.div>
  )
}
