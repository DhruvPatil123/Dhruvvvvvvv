"use client"

import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Volume2, VolumeX, Zap } from 'lucide-react'
import { useAudioStore } from '@/store/useAudioStore'
import { usePerformanceStore } from '@/store/usePerformanceStore'
import { startAmbientDrone, setAmbientDroneVolume, playTick } from '@/lib/sounds'

export default function AudioDock() {
  const { isMuted, setIsMuted } = useAudioStore()
  const { performanceMode, setPerformanceMode } = usePerformanceStore()

  const handleToggleMute = () => {
    if (isMuted) {
      // Unmute: Initialize and set volume to elegant level (0.12)
      startAmbientDrone()
      setAmbientDroneVolume(0.12)
      setIsMuted(false)
    } else {
      // Mute: Fade to 0
      setAmbientDroneVolume(0)
      setIsMuted(true)
    }
  }

  const handleTogglePerformance = () => {
    playTick()
    setPerformanceMode(!performanceMode)
  }

  return (
    <div className="fixed bottom-6 right-6 z-[990] pointer-events-auto">
      <div className="glass-effect border border-white/10 rounded-2xl p-2 bg-black/40 backdrop-blur-xl flex items-center gap-2 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
        <button
          onClick={handleToggleMute}
          className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-white hover:text-primary transition-all duration-300 active:scale-90 cursor-pointer"
          aria-label={isMuted ? "Unmute Ambient Drone" : "Mute Ambient Drone"}
        >
          {isMuted ? (
            <VolumeX className="w-4 h-4 text-zinc-400" />
          ) : (
            <Volume2 className="w-4 h-4 text-primary animate-pulse" />
          )}
        </button>

        <button
          onClick={handleTogglePerformance}
          className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 active:scale-90 cursor-pointer border ${
            performanceMode 
              ? "bg-amber-500/20 border-amber-500/40 text-amber-400 hover:bg-amber-500/30" 
              : "bg-white/5 border-transparent hover:bg-white/10 text-zinc-400 hover:text-white"
          }`}
          aria-label={performanceMode ? "Disable Performance Mode" : "Enable Performance Mode"}
          title={performanceMode ? "Disable Performance Mode" : "Enable Performance Mode"}
        >
          <Zap className={`w-4 h-4 ${performanceMode ? "text-amber-400" : "text-zinc-400 opacity-60"}`} />
        </button>

        {/* Live SVG Visualizer Bars */}
        <div className="flex items-center gap-[3px] px-1.5 h-6 w-9 justify-center">
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="w-[3px] bg-primary rounded-full"
              animate={isMuted ? {
                height: "3px"
              } : {
                height: ["3px", "16px", "8px", "18px", "4px", "3px"][i % 6] ? ["3px", "18px", "6px", "14px", "3px"] : ["3px", "12px", "4px"]
              }}
              transition={{
                duration: isMuted ? 0.3 : 0.6 + (i * 0.12),
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
              style={{
                transformOrigin: 'bottom',
                backgroundColor: isMuted ? 'rgb(113, 113, 122)' : 'rgba(0, 242, 255, 1)'
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
