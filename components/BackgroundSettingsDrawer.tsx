"use client"

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sliders, X, Eye, Sparkles, Volume2, VolumeX, Sun, Feather, RefreshCw, Check } from 'lucide-react'
import { useBackgroundSettingsStore, ContrastLevel } from '@/store/useBackgroundSettingsStore'
import { useAudioStore } from '@/store/useAudioStore'
import { playTick, playParchmentOpen, playQuillClick, startAmbientDrone, setAmbientDroneVolume } from '@/lib/sounds'

export default function BackgroundSettingsDrawer() {
  const {
    bgOpacity,
    contrastLevel,
    parallaxIntensity,
    isSettingsOpen,
    setBgOpacity,
    setContrastLevel,
    setParallaxIntensity,
    setIsSettingsOpen,
  } = useBackgroundSettingsStore()

  const { isMuted, setIsMuted } = useAudioStore()

  const handleClose = () => {
    playParchmentOpen()
    setIsSettingsOpen(false)
  }

  const handleToggleMute = () => {
    if (isMuted) {
      startAmbientDrone()
      setAmbientDroneVolume(0.12)
      setIsMuted(false)
      setTimeout(() => playParchmentOpen(), 50)
    } else {
      setAmbientDroneVolume(0)
      setIsMuted(true)
    }
  }

  const handleReset = () => {
    playQuillClick()
    setBgOpacity(0.65)
    setContrastLevel('standard')
    setParallaxIntensity(1.0)
  }

  return (
    <AnimatePresence>
      {isSettingsOpen && (
        <div className="fixed inset-0 z-[995] flex justify-end pointer-events-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
          />

          {/* Drawer Content */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="relative w-full max-w-md h-full bg-zinc-950 border-l border-white/10 shadow-2xl p-6 sm:p-8 flex flex-col justify-between overflow-y-auto scrollbar-thin z-10"
          >
            <div className="space-y-6">
              {/* Header */}
              <div className="flex justify-between items-center pb-4 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-primary/10 border border-primary/20 text-primary">
                    <Sliders className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-mono text-sm uppercase tracking-wider font-bold text-white">
                      Aesthetics & Environment
                    </h3>
                    <p className="font-sans text-[11px] text-zinc-400">
                      Renaissance background canvas & acoustics
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleClose}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-all cursor-pointer"
                  aria-label="Close settings"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* 1. Background Opacity */}
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
                <div className="flex justify-between items-center font-mono text-xs">
                  <span className="text-zinc-200 font-bold flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5 text-cyan-400" /> Canvas Opacity
                  </span>
                  <span className="text-primary font-bold">{Math.round(bgOpacity * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0.2"
                  max="1.0"
                  step="0.05"
                  value={bgOpacity}
                  onChange={(e) => {
                    playTick()
                    setBgOpacity(parseFloat(e.target.value))
                  }}
                  className="w-full accent-primary cursor-pointer h-1.5 bg-zinc-800 rounded-lg"
                />
                <p className="text-[10.5px] text-zinc-400 font-sans leading-relaxed">
                  Adjust the luminosity of the Renaissance masterpiece painting backdrops.
                </p>
              </div>

              {/* 2. Chiaroscuro Contrast Level */}
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
                <div className="flex justify-between items-center font-mono text-xs">
                  <span className="text-zinc-200 font-bold flex items-center gap-1.5">
                    <Sun className="w-3.5 h-3.5 text-amber-400" /> Chiaroscuro Contrast
                  </span>
                  <span className="text-amber-400 font-bold uppercase text-[10px]">{contrastLevel}</span>
                </div>

                <div className="grid grid-cols-3 gap-2 font-mono text-[11px]">
                  {(['subtle', 'standard', 'dramatic'] as ContrastLevel[]).map((level) => {
                    const isSelected = contrastLevel === level
                    return (
                      <button
                        key={level}
                        onClick={() => {
                          playQuillClick()
                          setContrastLevel(level)
                        }}
                        className={`py-2 px-2 rounded-xl capitalize font-bold border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-amber-500/20 border-amber-500 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.2)]'
                            : 'bg-black/40 border-white/10 text-zinc-400 hover:text-white hover:border-white/20'
                        }`}
                      >
                        {level}
                      </button>
                    )
                  })}
                </div>
                <p className="text-[10.5px] text-zinc-400 font-sans leading-relaxed">
                  Controls classical Renaissance light and shadow depth balancing across all artwork frames.
                </p>
              </div>

              {/* 3. Parallax Motion Intensity */}
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
                <div className="flex justify-between items-center font-mono text-xs">
                  <span className="text-zinc-200 font-bold flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-purple-400" /> Parallax Depth Motion
                  </span>
                  <span className="text-purple-400 font-bold">{Math.round(parallaxIntensity * 100)}%</span>
                </div>

                <div className="grid grid-cols-3 gap-2 font-mono text-[11px]">
                  {[
                    { label: 'Off (0%)', val: 0.0 },
                    { label: 'Subtle (50%)', val: 0.5 },
                    { label: 'Full (100%)', val: 1.0 },
                  ].map((opt) => {
                    const isSelected = parallaxIntensity === opt.val
                    return (
                      <button
                        key={opt.val}
                        onClick={() => {
                          playTick()
                          setParallaxIntensity(opt.val)
                        }}
                        className={`py-2 px-1.5 rounded-xl font-bold border transition-all cursor-pointer text-center ${
                          isSelected
                            ? 'bg-purple-500/20 border-purple-500 text-purple-300 shadow-[0_0_12px_rgba(168,85,247,0.2)]'
                            : 'bg-black/40 border-white/10 text-zinc-400 hover:text-white hover:border-white/20'
                        }`}
                      >
                        {opt.label}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* 4. Renaissance Audio & Soundscape Controls */}
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
                <div className="flex justify-between items-center font-mono text-xs">
                  <span className="text-zinc-200 font-bold flex items-center gap-1.5">
                    <Feather className="w-3.5 h-3.5 text-emerald-400" /> Tactile Renaissance Soundscape
                  </span>
                  <button
                    onClick={handleToggleMute}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold transition-all cursor-pointer flex items-center gap-1 ${
                      isMuted 
                        ? 'bg-zinc-800 text-zinc-400 hover:text-white' 
                        : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    }`}
                  >
                    {isMuted ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
                    <span>{isMuted ? 'Muted' : 'Sound ON'}</span>
                  </button>
                </div>

                <p className="text-[10.5px] text-zinc-400 font-sans leading-relaxed">
                  Synthesizes real-time parchment paper rustles, feather quill clicks, and lowpass analog ambient drones using the Web Audio API.
                </p>

                {/* Sound effect previews */}
                <div className="grid grid-cols-2 gap-2 font-mono text-[10px] pt-1">
                  <button
                    onClick={() => playParchmentOpen()}
                    className="p-2 rounded-xl bg-black/60 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Feather className="w-3 h-3 text-amber-400" />
                    <span>Parchment Rustle</span>
                  </button>
                  <button
                    onClick={() => playQuillClick()}
                    className="p-2 rounded-xl bg-black/60 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Sparkles className="w-3 h-3 text-primary" />
                    <span>Quill Click</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-white/10 flex items-center justify-between font-mono text-xs">
              <button
                onClick={handleReset}
                className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white border border-white/10 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset Defaults</span>
              </button>

              <button
                onClick={handleClose}
                className="px-5 py-2.5 rounded-xl bg-primary text-black font-bold shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)] hover:opacity-90 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>Apply & Close</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
