"use client"

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePerformanceStore } from '@/store/usePerformanceStore'
import { Cpu, X, Zap } from 'lucide-react'
import { playNotification, playTick } from '@/lib/sounds'

export default function FpsMonitor() {
  const { performanceMode, setPerformanceMode } = usePerformanceStore()
  const [showBanner, setShowBanner] = useState(false)
  const [hasBeenDismissed, setHasBeenDismissed] = useState(false)
  const [currentFps, setCurrentFps] = useState(60)

  useEffect(() => {
    if (performanceMode || hasBeenDismissed) return

    let frames = 0
    let lastTime = performance.now()
    let consecutiveLowFps = 0
    let animId: number

    const checkFps = () => {
      const now = performance.now()
      frames++

      if (now >= lastTime + 1000) {
        const fps = Math.round((frames * 1000) / (now - lastTime))
        setCurrentFps(fps)

        if (fps < 30) {
          consecutiveLowFps++
          if (consecutiveLowFps >= 3) {
            setShowBanner(true)
            playNotification() // Play a clean mechanical notification chime
          }
        } else {
          consecutiveLowFps = 0
        }

        frames = 0
        lastTime = now
      }

      animId = requestAnimationFrame(checkFps)
    }

    animId = requestAnimationFrame(checkFps)

    return () => {
      cancelAnimationFrame(animId)
    }
  }, [performanceMode, hasBeenDismissed])

  return (
    <AnimatePresence>
      {showBanner && !performanceMode && !hasBeenDismissed && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className="fixed bottom-24 left-6 right-6 md:left-6 md:right-auto md:w-[400px] bg-zinc-950/90 border border-amber-500/30 backdrop-blur-md rounded-2xl p-4 shadow-[0_12px_40px_rgba(0,0,0,0.6),0_0_30px_rgba(245,158,11,0.1)] z-[950] space-y-3 font-sans"
        >
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Cpu className="w-5 h-5 animate-pulse" />
            </div>
            <div className="flex-1 space-y-1">
              <h4 className="text-white font-semibold text-sm flex items-center gap-2">
                Performance Optimization
                <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-[9px] font-mono text-amber-300 tracking-wider">
                  {currentFps} FPS DETECTED
                </span>
              </h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Minor rendering lag detected. Enable **Performance Mode** to limit particle density and disable the 3D depth background.
              </p>
            </div>
            <button
              onClick={() => {
                playTick()
                setShowBanner(false)
                setHasBeenDismissed(true)
              }}
              className="text-gray-400 hover:text-white transition-colors cursor-pointer p-0.5 rounded-lg hover:bg-white/5"
              aria-label="Dismiss banner"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex gap-2 justify-end pt-1">
            <button
              onClick={() => {
                playTick()
                setShowBanner(false)
                setHasBeenDismissed(true)
              }}
              className="px-3 py-1.5 rounded-xl border border-white/10 hover:border-white/20 text-xs font-mono text-gray-400 hover:text-white transition-all cursor-pointer"
            >
              KEEP ORIGINAL
            </button>
            <button
              onClick={() => {
                playTick()
                setPerformanceMode(true)
                setShowBanner(false)
              }}
              className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-mono font-semibold transition-all flex items-center gap-1.5 shadow-[0_0_15px_rgba(245,158,11,0.2)] hover:shadow-[0_0_20px_rgba(245,158,11,0.4)] cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5" />
              ENABLE PERFORMANCE
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
