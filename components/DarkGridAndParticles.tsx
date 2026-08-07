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

    // Generate 32 floating particles
    const PARTICLE_COUNT = 32
    interface Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      opacity: number
      pulseSpeed: number
      color: string
    }

    const colors = [
      'rgba(168, 85, 247, ', // Purple
      'rgba(99, 102, 241, ', // Indigo
      'rgba(0, 242, 255, ',  // Cyan
      'rgba(192, 132, 252, ' // Soft Violet
    ]

    const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.2 + 0.8,
      speedX: (Math.random() - 0.5) * 0.35,
      speedY: (Math.random() - 0.5) * 0.35 - 0.15, // slight upward drift
      opacity: Math.random() * 0.5 + 0.2,
      pulseSpeed: Math.random() * 0.02 + 0.008,
      color: colors[Math.floor(Math.random() * colors.length)],
    }))

    let time = 0

    const render = () => {
      time += 0.015
      ctx.clearRect(0, 0, width, height)

      // Draw 30 floating particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.x += p.speedX
        p.y += p.speedY

        // Wrap edges gracefully
        if (p.x < -10) p.x = width + 10
        if (p.x > width + 10) p.x = -10
        if (p.y < -10) p.y = height + 10
        if (p.y > height + 10) p.y = -10

        // Oscillation in opacity
        const alpha = p.opacity * (0.6 + 0.4 * Math.sin(time + i))

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `${p.color}${alpha})`
        ctx.shadowBlur = p.size * 6
        ctx.shadowColor = `${p.color}0.8)`
        ctx.fill()
        ctx.shadowBlur = 0 // reset
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
    <div className="fixed inset-0 w-full h-full -z-40 pointer-events-none select-none overflow-hidden bg-[#050816]">
      {/* 1. Base Navy Color #050816 */}
      <div className="absolute inset-0 bg-[#050816]" />

      {/* 2. Subtle Purple & Cyan Radial Ambient Glows behind Hero & Top Section */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[1000px] h-[650px] bg-[radial-gradient(ellipse_at_center,rgba(147,51,234,0.18)_0%,rgba(79,70,229,0.12)_35%,rgba(0,242,255,0.05)_55%,rgba(5,8,22,0)_75%)] blur-[80px] rounded-full pointer-events-none animate-pulse" style={{ animationDuration: '8s' }} />

      <div className="absolute top-[40%] right-[-10%] w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(126,34,206,0.10)_0%,rgba(5,8,22,0)_70%)] blur-[100px] pointer-events-none" />

      {/* 3. Low-Opacity Animated Grid (5-10% opacity) */}
      <div 
        className="absolute inset-0 w-full h-full opacity-[0.07] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" 
        style={{
          maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 85%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 85%)'
        }}
      />

      {/* Grid Pulse Highlight Overlay */}
      <div 
        className="absolute inset-0 w-full h-full opacity-[0.05] bg-[linear-gradient(to_right,#a855f7_1px,transparent_1px),linear-gradient(to_bottom,#a855f7_1px,transparent_1px)] bg-[size:120px_120px] pointer-events-none animate-pulse" 
        style={{ animationDuration: '6s' }}
      />

      {/* 4. Tiny Moving Particle Canvas (20-40 particles) */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* Vignette Edge Shading */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(5,8,22,0.8)_100%)] pointer-events-none" />
    </div>
  )
}
