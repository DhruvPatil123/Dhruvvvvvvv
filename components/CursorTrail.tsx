"use client"

import React, { useEffect, useRef } from 'react'
import { useThemeStore } from '@/store/useThemeStore'
import { usePerformanceStore } from '@/store/usePerformanceStore'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  alpha: number
  decay: number
  orbitalOffset: number
  orbitalSpeed: number
}

export default function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const theme = useThemeStore((state) => state.theme)
  const performanceMode = usePerformanceStore((state) => state.performanceMode)
  
  // Track cursor position with smooth interpolation (lerping)
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, isMoving: false, lastSpawnTime: 0 })
  const particlesRef = useRef<Particle[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    handleResize()
    window.addEventListener('resize', handleResize)

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = e.clientX
      mouseRef.current.targetY = e.clientY
      mouseRef.current.isMoving = true
    }
    window.addEventListener('mousemove', handleMouseMove)

    // Dynamic color matching based on current active state theme
    const getThemeColor = (alpha: number) => {
      switch (theme) {
        case 'cobalt':
          return `rgba(0, 242, 255, ${alpha})`
        case 'emerald':
          return `rgba(16, 185, 129, ${alpha})`
        case 'charcoal':
        default:
          return `rgba(241, 245, 249, ${alpha})`
      }
    }

    const spawnParticle = (x: number, y: number, isBurst = false) => {
      const angle = Math.random() * Math.PI * 2
      const speed = isBurst ? Math.random() * 3.5 + 1.2 : Math.random() * 0.8 + 0.1
      
      const particle: Particle = {
        x,
        y,
        vx: Math.cos(angle) * speed + (isBurst ? 0 : (Math.random() - 0.5) * 0.2),
        vy: Math.sin(angle) * speed + (isBurst ? 0 : (Math.random() - 0.5) * 0.2) - (isBurst ? 0 : 0.15), // light upwards drift
        size: Math.random() * 2 + (isBurst ? 1.5 : 0.8),
        alpha: 1.0,
        decay: isBurst ? Math.random() * 0.025 + 0.015 : Math.random() * 0.02 + 0.012,
        orbitalOffset: Math.random() * Math.PI * 2,
        orbitalSpeed: (Math.random() - 0.5) * 0.06
      }
      particlesRef.current.push(particle)
    }

    // Capture-phase hovers globally
    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target &&
        (target.tagName === 'BUTTON' ||
         target.tagName === 'A' ||
         target.getAttribute('role') === 'button' ||
         target.classList.contains('cursor-pointer'))
      ) {
        const rect = target.getBoundingClientRect()
        const burstX = rect.left + rect.width / 2
        const burstY = rect.top + rect.height / 2
        const burstCount = performanceMode ? 4 : 12
        for (let i = 0; i < burstCount; i++) {
          spawnParticle(burstX, burstY, true)
        }
      }
    }
    window.addEventListener('mouseover', handleMouseEnter, true)

    let animationFrameId: number

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Interpolated lerping
      const mouse = mouseRef.current
      const dx = mouse.targetX - mouse.x
      const dy = mouse.targetY - mouse.y
      mouse.x += dx * 0.15
      mouse.y += dy * 0.15

      // Spawn active trail particles
      const now = performance.now()
      const spawnInterval = performanceMode ? 75 : 25
      if (mouse.isMoving && now - mouse.lastSpawnTime > spawnInterval) {
        spawnParticle(mouse.x, mouse.y)
        mouse.lastSpawnTime = now
      }

      // Render each active particle
      const particles = particlesRef.current
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        
        // Custom orbital drift physics
        p.orbitalOffset += p.orbitalSpeed
        const driftX = Math.cos(p.orbitalOffset) * 0.15
        const driftY = Math.sin(p.orbitalOffset) * 0.15

        p.x += p.vx + driftX
        p.y += p.vy + driftY
        p.alpha -= p.decay

        if (p.alpha <= 0) {
          particles.splice(i, 1)
          continue
        }

        // Draw particle with glow
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = getThemeColor(p.alpha)
        ctx.shadowColor = getThemeColor(p.alpha * 0.8)
        ctx.shadowBlur = p.size * 3
        ctx.fill()
        
        // Reset canvas context shadow state
        ctx.shadowBlur = 0
      }

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseover', handleMouseEnter, true)
      cancelAnimationFrame(animationFrameId)
    }
  }, [theme, performanceMode])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-screen h-screen pointer-events-none z-30"
      style={{ mixBlendMode: 'screen' }}
    />
  )
}
