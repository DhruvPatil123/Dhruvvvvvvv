"use client"

import React, { useEffect, useRef } from 'react'

export default function DarkGridAndParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize, { passive: true })

    // Minimal, subtle floating dust/stardust particles in monochrome
    const PARTICLE_COUNT = 24
    interface Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      opacity: number
    }

    const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.5 + 0.6,
      speedX: (Math.random() - 0.5) * 0.2,
      speedY: (Math.random() - 0.5) * 0.2 - 0.08,
      opacity: Math.random() * 0.35 + 0.1,
    }))

    let time = 0

    const render = () => {
      time += 0.01
      ctx.clearRect(0, 0, width, height)

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.x += p.speedX
        p.y += p.speedY

        if (p.x < -10) p.x = width + 10
        if (p.x > width + 10) p.x = -10
        if (p.y < -10) p.y = height + 10
        if (p.y > height + 10) p.y = -10

        const alpha = p.opacity * (0.7 + 0.3 * Math.sin(time + i))

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`
        ctx.fill()
      }

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <div className="fixed inset-0 w-full h-full -z-40 pointer-events-none select-none overflow-hidden bg-[#07080a]">
      {/* 1. Deep Matte Obsidian Base Canvas */}
      <div className="absolute inset-0 bg-[#07080a]" />

      {/* 2. Delicate Architectural Hairline Grid (Monochrome, ~3% opacity) */}
      <div 
        className="absolute inset-0 w-full h-full opacity-[0.035] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" 
        style={{
          maskImage: 'radial-gradient(ellipse at center, black 35%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 35%, transparent 80%)'
        }}
      />

      {/* 3. Subtle Monochromatic Stardust Particle Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* 4. Soft Vignette Edge Shading */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,rgba(5,6,8,0.7)_100%)] pointer-events-none" />
    </div>
  )
}
