"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Volume2, 
  VolumeX, 
  Sparkles, 
  ChevronUp, 
  ChevronDown, 
  Sliders, 
  Radio, 
  Headphones, 
  Music, 
  Play, 
  Pause,
  Waves
} from 'lucide-react'
import { useAudioStore } from '@/store/useAudioStore'
import { 
  startAmbientDrone, 
  stopAmbientDrone, 
  setAmbientDroneVolume, 
  playGlassChime,
  playTick,
  playPopover
} from '@/lib/sounds'

const CHORD_NOTES = [
  { label: 'F1', freq: '43Hz', name: 'Sub Root' },
  { label: 'F2', freq: '87Hz', name: 'Bass' },
  { label: 'C3', freq: '131Hz', name: 'Fifth' },
  { label: 'A3', freq: '220Hz', name: 'Major 3rd' },
  { label: 'E4', freq: '330Hz', name: 'Major 7th' },
  { label: 'G4', freq: '392Hz', name: '9th' },
  { label: 'C5', freq: '523Hz', name: 'Air Shimmer' }
]

export default function AmbientSoundscapeDock() {
  const [isOpen, setIsOpen] = useState(false)
  const isPlayingAmbient = useAudioStore((state) => state.isPlayingAmbient)
  const ambientVolume = useAudioStore((state) => state.ambientVolume)
  const filterCutoff = useAudioStore((state) => state.filterCutoff)
  const crystalChimesEnabled = useAudioStore((state) => state.crystalChimesEnabled)
  const toggleCrystalChimes = useAudioStore((state) => state.toggleCrystalChimes)
  const setAmbientVolumeState = useAudioStore((state) => state.setAmbientVolume)

  const handleToggleDrone = () => {
    playTick()
    if (isPlayingAmbient) {
      stopAmbientDrone()
    } else {
      startAmbientDrone(ambientVolume)
    }
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value)
    setAmbientVolumeState(val)
    setAmbientDroneVolume(val)
  }

  const handleTestChime = (e: React.MouseEvent) => {
    playGlassChime({ event: e })
  }

  return (
    <aside 
      aria-label="Generative Ambient Soundscape Controller"
      className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-40 select-none flex flex-col items-start pointer-events-auto"
    >
      <AnimatePresence mode="wait">
        {isOpen ? (
          <motion.div
            key="expanded-sound-dock"
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="w-[320px] xs:w-[350px] sm:w-[370px] rounded-2xl bg-black/90 backdrop-blur-2xl border border-white/15 p-4 shadow-[0_25px_60px_rgba(0,0,0,0.95)] flex flex-col gap-3 font-sans text-white"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
              <div className="flex items-center gap-2">
                <span 
                  className={`w-2 h-2 rounded-full ${
                    isPlayingAmbient ? 'bg-cyan-400 animate-ping' : 'bg-zinc-600'
                  }`} 
                />
                <span className="font-mono text-[10px] sm:text-xs font-bold tracking-widest uppercase text-white">
                  SONIC ART // GENERATIVE DRONE
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => {
                    playPopover()
                    setIsOpen(false)
                  }}
                  title="Minimize Soundscape Panel"
                  className="p-1.5 rounded-md bg-white/5 hover:bg-white/15 text-zinc-400 hover:text-white border border-white/10 transition-colors cursor-pointer"
                >
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Subtitle & Style */}
            <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400">
              <span className="text-zinc-300">Eno-Style Analog Pad</span>
              <span className="px-1.5 py-0.5 rounded bg-white/5 text-cyan-300 border border-white/10">
                F Major 9
              </span>
            </div>

            {/* Interactive Audio Waveform / Visualizer */}
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 space-y-2">
              <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400">
                <span className="flex items-center gap-1.5">
                  <Waves className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Harmonic Spectrum</span>
                </span>
                <span className="text-cyan-400 font-bold">
                  {isPlayingAmbient ? 'SYNTHESIZING' : 'STANDBY'}
                </span>
              </div>

              {/* 7 Note Harmonics Bars */}
              <div className="flex items-end justify-between gap-1.5 h-12 pt-1">
                {CHORD_NOTES.map((note, idx) => {
                  const heights = [35, 60, 48, 75, 90, 65, 45]
                  const animDuration = 1.2 + idx * 0.25
                  return (
                    <div key={note.label} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                      <div className="w-full bg-white/10 rounded-t overflow-hidden h-full flex items-end">
                        <div 
                          className={`w-full transition-all duration-300 rounded-t ${
                            isPlayingAmbient 
                              ? 'bg-gradient-to-t from-cyan-500 via-violet-400 to-pink-400 animate-pulse'
                              : 'bg-zinc-700'
                          }`}
                          style={{
                            height: isPlayingAmbient ? `${heights[idx]}%` : '15%',
                            animationDuration: `${animDuration}s`
                          }}
                        />
                      </div>
                      <span className="text-[9px] font-mono text-zinc-500">{note.label}</span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Dynamic Scroll Filter Cutoff Readout */}
            <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/10 flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-[10px] font-mono">
                <span className="text-zinc-400">DYNAMIC FILTER CUTOFF</span>
                <span className="text-cyan-300 font-bold tracking-wider">{filterCutoff} Hz</span>
              </div>
              {/* Frequency bar */}
              <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-cyan-400 to-violet-400 h-full transition-all duration-150 rounded-full"
                  style={{
                    width: `${Math.min(100, Math.max(5, ((filterCutoff - 360) / (1950 - 360)) * 100))}%`
                  }}
                />
              </div>
              <span className="text-[9px] font-mono text-zinc-500 flex items-center justify-between">
                <span>360Hz (Warm Introspective)</span>
                <span>1950Hz (Resonant Bloom)</span>
              </span>
            </div>

            {/* Master Drone Toggle & Volume Control */}
            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={handleToggleDrone}
                className={`flex-1 py-2 px-3 rounded-xl font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer border ${
                  isPlayingAmbient
                    ? 'bg-cyan-500 text-black border-cyan-400 shadow-[0_0_20px_rgba(0,240,255,0.4)]'
                    : 'bg-white/10 hover:bg-white/15 text-white border-white/20'
                }`}
              >
                {isPlayingAmbient ? (
                  <>
                    <Pause className="w-3.5 h-3.5" />
                    <span>Mute Ambient</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5" />
                    <span>Start Ambient Drone</span>
                  </>
                )}
              </button>

              {/* Volume Slider */}
              <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-xl px-2.5 py-2">
                <Volume2 className="w-3.5 h-3.5 text-zinc-400" />
                <input 
                  type="range"
                  min="0.05"
                  max="0.45"
                  step="0.01"
                  value={ambientVolume}
                  onChange={handleVolumeChange}
                  className="w-16 accent-cyan-400 cursor-pointer h-1"
                  title="Drone Volume"
                />
              </div>
            </div>

            {/* Glass & Crystal Chimes Section */}
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-[11px]">
              <div className="flex items-center gap-2">
                <Headphones className="w-3.5 h-3.5 text-pink-400" />
                <div className="flex flex-col">
                  <span className="font-mono text-[10px] text-white font-bold">CRYSTAL CHIMES</span>
                  <span className="text-[9px] text-zinc-400">Spatialized across headphones</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleTestChime}
                  title="Audition Crystal Chime"
                  className="px-2 py-1 rounded-md bg-white/5 hover:bg-white/15 text-[10px] font-mono text-zinc-300 border border-white/10 transition-colors cursor-pointer"
                >
                  Audition
                </button>
                <button
                  type="button"
                  onClick={() => {
                    playTick()
                    toggleCrystalChimes()
                  }}
                  className={`w-8 h-4 rounded-full transition-colors relative p-0.5 cursor-pointer ${
                    crystalChimesEnabled ? 'bg-cyan-500' : 'bg-zinc-700'
                  }`}
                >
                  <div 
                    className={`w-3 h-3 rounded-full bg-white transition-transform ${
                      crystalChimesEnabled ? 'translate-x-4' : 'translate-x-0'
                    }`} 
                  />
                </button>
              </div>
            </div>

            {/* Footer Hint */}
            <div className="text-[9px] font-mono text-zinc-500 text-center pt-0.5">
              <span>Scroll to modulate filter resonance · Mouse moves stereo pan</span>
            </div>
          </motion.div>
        ) : (
          <motion.button
            key="collapsed-sound-dock"
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            onClick={() => {
              playPopover()
              setIsOpen(true)
            }}
            className={`flex items-center gap-2.5 px-3.5 py-2 rounded-full border shadow-[0_15px_35px_rgba(0,0,0,0.8)] backdrop-blur-xl transition-all duration-300 active:scale-95 cursor-pointer group ${
              isPlayingAmbient 
                ? 'bg-black/95 text-cyan-300 border-cyan-400/50 shadow-[0_0_20px_rgba(0,240,255,0.2)]' 
                : 'bg-black/90 hover:bg-black text-white border-white/20 hover:border-white/40'
            }`}
          >
            <div className="flex items-center gap-1">
              {isPlayingAmbient ? (
                <div className="flex items-end gap-0.5 h-3 w-3">
                  <span className="w-0.5 bg-cyan-400 h-full animate-pulse" />
                  <span className="w-0.5 bg-cyan-400 h-2/3 animate-pulse" style={{ animationDelay: '0.2s' }} />
                  <span className="w-0.5 bg-cyan-400 h-4/5 animate-pulse" style={{ animationDelay: '0.4s' }} />
                </div>
              ) : (
                <Music className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white" />
              )}
            </div>

            <div className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider">
              <span className={`font-bold ${isPlayingAmbient ? 'text-cyan-300' : 'text-white'}`}>
                {isPlayingAmbient ? 'SONIC ART' : 'AMBIENT DRONE'}
              </span>
              <span className="text-zinc-500">·</span>
              <span className="text-zinc-400 group-hover:text-zinc-200">
                {isPlayingAmbient ? `${filterCutoff}Hz` : 'FΔ9'}
              </span>
            </div>

            <ChevronUp className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white" />
          </motion.button>
        )}
      </AnimatePresence>
    </aside>
  )
}
