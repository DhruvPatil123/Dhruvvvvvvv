"use client"

import React, { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Terminal, X, Zap } from 'lucide-react'
import { useArtStyleStore } from '@/store/useArtStyleStore'
import { playTick, playNotification } from '@/lib/sounds'

export default function GlobalMatrixOverlay() {
  const isGlobalMatrixActive = useArtStyleStore((state) => state.isGlobalMatrixActive)
  const globalMatrixMode = useArtStyleStore((state) => state.globalMatrixMode)
  const toggleGlobalMatrix = useArtStyleStore((state) => state.toggleGlobalMatrix)
  const setGlobalMatrixMode = useArtStyleStore((state) => state.setGlobalMatrixMode)

  const canvasRef = useRef<HTMLCanvasElement>(null)

  const modeColors = {
    green: { color: '#00ff66', glow: 'rgba(0, 255, 102, 0.45)', bg: 'rgba(0, 255, 102, 0.03)' },
    amber: { color: '#ffb000', glow: 'rgba(255, 176, 0, 0.45)', bg: 'rgba(255, 176, 0, 0.03)' },
    cyan: { color: '#00f0ff', glow: 'rgba(0, 240, 255, 0.45)', bg: 'rgba(0, 240, 255, 0.03)' },
  }

  const currentTheme = modeColors[globalMatrixMode]

  useEffect(() => {
    if (!isGlobalMatrixActive) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)
    let animId: number

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)

    // Matrix Rain Columns Setup
    const fontSize = 16
    const columns = Math.floor(width / fontSize)
    const drops: number[] = Array.from({ length: columns }, () => Math.floor(Math.random() * -50))
    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノ0123456789ABCDEF'

    let frame = 0
    const render = () => {
      frame++
      // Subtle trail fade
      ctx.fillStyle = 'rgba(0, 0, 0, 0.08)'
      ctx.fillRect(0, 0, width, height)

      ctx.font = `${fontSize}px monospace`

      for (let i = 0; i < drops.length; i++) {
        // Stream predominantly on the lateral margins to leave center content readable
        const isMargin = i < columns * 0.18 || i > columns * 0.82
        const alpha = isMargin ? 0.75 : 0.12

        const char = chars[Math.floor(Math.random() * chars.length)]
        const x = i * fontSize
        const y = drops[i] * fontSize

        ctx.fillStyle = currentTheme.color
        ctx.globalAlpha = alpha
        ctx.fillText(char, x, y)

        if (y > height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }

      ctx.globalAlpha = 1.0

      // Cathode horizontal scanlines
      ctx.fillStyle = 'rgba(0, 0, 0, 0.25)'
      for (let y = 0; y < height; y += 4) {
        ctx.fillRect(0, y, width, 1)
      }

      animId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animId)
    }
  }, [isGlobalMatrixActive, currentTheme.color])

  return (
    <AnimatePresence>
      {isGlobalMatrixActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-50 pointer-events-none select-none overflow-hidden"
        >
          {/* Matrix Rain Canvas */}
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

          {/* CRT Curved Screen & Vignette Overlay */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              boxShadow: `inset 0 0 100px rgba(0,0,0,0.9), inset 0 0 40px ${currentTheme.glow}`,
              backgroundColor: currentTheme.bg,
            }}
          />

          {/* Floating HUD Controller (Pointer Events Enabled) */}
          <div className="absolute top-5 left-1/2 -translate-x-1/2 pointer-events-auto">
            <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-black/90 border border-white/20 backdrop-blur-xl shadow-[0_15px_40px_rgba(0,0,0,0.9)] font-mono text-xs text-white">
              <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: currentTheme.color }} />
              <span className="font-bold tracking-wider uppercase flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5" style={{ color: currentTheme.color }} />
                GLOBAL CRT MATRIX
              </span>

              {/* Mode Toggles */}
              <div className="flex items-center gap-1 bg-white/10 p-0.5 rounded-md">
                {(['green', 'amber', 'cyan'] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => {
                      playTick()
                      setGlobalMatrixMode(m)
                    }}
                    className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold transition-colors cursor-pointer ${
                      globalMatrixMode === m ? 'bg-white text-black' : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>

              {/* Close Button */}
              <button
                onClick={() => {
                  playNotification()
                  toggleGlobalMatrix()
                }}
                className="p-1 rounded-full hover:bg-white/20 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                title="Exit Global Matrix Filter"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
