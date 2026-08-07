"use client"

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Cpu, Code2 } from 'lucide-react'

export default function CustomPreloader() {
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Check session storage to avoid repeating full preloader on rapid reloads if preferred,
    // or run a smooth 1.2s initialization sequence
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => setLoading(false), 300)
          return 100
        }
        return prev + Math.floor(Math.random() * 20) + 10
      })
    }, 100)

    return () => clearInterval(interval)
  }, [])

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-zinc-950 text-white select-none overflow-hidden"
        >
          {/* Subtle Ambient Radial Backlight */}
          <div className="absolute w-[500px] h-[500px] bg-cyan-500/15 rounded-full blur-[140px] pointer-events-none" />

          <div className="relative flex flex-col items-center space-y-6 z-10 px-4">
            {/* Logo Emblem with Rotating Neural Ring */}
            <div className="relative flex items-center justify-center">
              {/* Spinning Outer Ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                className="w-24 h-24 rounded-full border-2 border-dashed border-cyan-500/40"
              />

              {/* Counter-Spinning Inner Ring */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                className="absolute w-20 h-20 rounded-full border border-cyan-400/30 border-t-cyan-400"
              />

              {/* Logo Core Badge */}
              <div className="absolute w-14 h-14 rounded-2xl bg-zinc-900 border border-cyan-400/60 shadow-[0_0_30px_rgba(0,242,255,0.4)] flex items-center justify-center text-cyan-300 font-mono font-bold text-lg tracking-wider">
                DP
              </div>
            </div>

            {/* Name & Title */}
            <div className="text-center space-y-1">
              <h2 className="text-xl sm:text-2xl font-display font-bold tracking-tight text-white flex items-center gap-2 justify-center">
                <span>Dhruv Patil</span>
                <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
              </h2>
              <p className="text-xs font-mono text-cyan-400/90 uppercase tracking-widest">
                AI Engineering & Multi-Agent Architect
              </p>
            </div>

            {/* Progress Bar & Status indicator */}
            <div className="w-64 space-y-2">
              <div className="flex justify-between items-center text-[10px] font-mono text-gray-300 uppercase tracking-wider">
                <span className="flex items-center gap-1">
                  <Cpu className="w-3 h-3 text-cyan-400" /> Initializing Systems...
                </span>
                <span className="text-cyan-400 font-bold">{Math.min(progress, 100)}%</span>
              </div>

              <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden border border-white/5">
                <motion.div
                  className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 rounded-full shadow-[0_0_10px_rgba(0,242,255,0.8)]"
                  style={{ width: `${Math.min(progress, 100)}%` }}
                  transition={{ ease: 'easeOut' }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
