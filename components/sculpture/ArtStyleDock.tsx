"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Sparkles, 
  RotateCw, 
  Grid, 
  ChevronDown, 
  ChevronUp, 
  Layers, 
  Sliders, 
  Maximize2,
  Activity
} from 'lucide-react'
import { useArtStyleStore, ART_PRESETS, ArtPreset } from '@/store/useArtStyleStore'
import { playTick, playPopover, playGlassChime } from '@/lib/sounds'

export default function ArtStyleDock() {
  const activePreset = useArtStyleStore((state) => state.activePreset)
  const wireframe = useArtStyleStore((state) => state.wireframe)
  const isAutoRotate = useArtStyleStore((state) => state.isAutoRotate)
  const isDockOpen = useArtStyleStore((state) => state.isDockOpen)
  const setPreset = useArtStyleStore((state) => state.setPreset)
  const toggleWireframe = useArtStyleStore((state) => state.toggleWireframe)
  const toggleAutoRotate = useArtStyleStore((state) => state.toggleAutoRotate)
  const toggleDock = useArtStyleStore((state) => state.toggleDock)

  const currentInfo = ART_PRESETS[activePreset]

  const presetList: ArtPreset[] = ['cosmic', 'chrome', 'cyberpunk', 'prismatic']

  return (
    <aside 
      aria-label="3D Generative Art Presets"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 select-none flex flex-col items-end pointer-events-auto"
    >
      <AnimatePresence mode="wait">
        {isDockOpen ? (
          <motion.div
            key="expanded-dock"
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="w-[320px] xs:w-[350px] sm:w-[380px] rounded-2xl bg-black/85 backdrop-blur-2xl border border-white/15 p-3.5 sm:p-4 shadow-[0_25px_60px_rgba(0,0,0,0.95)] flex flex-col gap-3 font-sans"
          >
            {/* Dock Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: currentInfo.color }} />
                <span className="font-mono text-[10px] sm:text-xs font-bold tracking-widest uppercase text-white">
                  3D SCULPTURE // {currentInfo.id.toUpperCase()}
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                {/* Auto Rotate Toggle */}
                <button
                  type="button"
                  onClick={toggleAutoRotate}
                  title={isAutoRotate ? "Pause Auto-Rotation" : "Enable Auto-Rotation"}
                  className={`p-1.5 rounded-md border text-[11px] font-mono transition-all duration-200 cursor-pointer ${
                    isAutoRotate 
                      ? "bg-white/15 text-white border-white/30" 
                      : "bg-white/5 text-zinc-400 border-white/10 hover:text-white"
                  }`}
                >
                  <RotateCw className={`w-3.5 h-3.5 ${isAutoRotate ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
                </button>

                {/* Wireframe Lattice Toggle */}
                <button
                  type="button"
                  onClick={toggleWireframe}
                  title="Toggle Wireframe Triangulation"
                  className={`p-1.5 rounded-md border text-[11px] font-mono transition-all duration-200 cursor-pointer ${
                    wireframe 
                      ? "bg-white/20 text-white border-white/40 shadow-sm" 
                      : "bg-white/5 text-zinc-400 border-white/10 hover:text-white"
                  }`}
                >
                  <Grid className="w-3.5 h-3.5" />
                </button>

                {/* Collapse Dock */}
                <button
                  type="button"
                  onClick={toggleDock}
                  title="Minimize Art Dock"
                  className="p-1.5 rounded-md bg-white/5 hover:bg-white/15 text-zinc-400 hover:text-white border border-white/10 transition-colors cursor-pointer"
                >
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Presets Grid */}
            <div className="grid grid-cols-2 gap-2">
              {presetList.map((presetKey) => {
                const info = ART_PRESETS[presetKey]
                const isActive = activePreset === presetKey

                return (
                  <button
                    key={presetKey}
                    type="button"
                    onClick={(e) => {
                      playGlassChime({ event: e, freqIndex: presetList.indexOf(presetKey) + 2 })
                      setPreset(presetKey)
                    }}
                    className={`relative p-2.5 rounded-xl border text-left transition-all duration-300 flex flex-col gap-1 cursor-pointer group ${
                      isActive 
                        ? "bg-white/15 border-white/40 shadow-[0_0_20px_rgba(255,255,255,0.08)] scale-[1.02]" 
                        : "bg-white/[0.03] hover:bg-white/[0.08] border-white/10 hover:border-white/20"
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="text-base">{info.icon}</span>
                      {isActive && (
                        <span 
                          className="w-1.5 h-1.5 rounded-full" 
                          style={{ backgroundColor: info.color }} 
                        />
                      )}
                    </div>

                    <div className="flex flex-col">
                      <span className={`text-xs font-semibold tracking-tight ${isActive ? 'text-white' : 'text-zinc-200 group-hover:text-white'}`}>
                        {info.name}
                      </span>
                      <span className="text-[9px] font-mono text-zinc-400 truncate">
                        {info.paletteName}
                      </span>
                    </div>
                  </button>
                )
              })}
            </div>

            {/* Active Preset Description & Palette */}
            <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/10 flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase text-zinc-400 font-medium">
                  {currentInfo.subtitle}
                </span>
                <span className="text-[9px] font-mono text-zinc-500">
                  {wireframe ? 'WIREFRAME_ON' : 'SHADED'}
                </span>
              </div>
              <p className="text-[11px] text-zinc-300 leading-snug">
                {currentInfo.description}
              </p>
            </div>

            {/* Interaction Hint Footer */}
            <div className="flex items-center justify-between text-[9px] font-mono text-zinc-400 pt-1">
              <span className="flex items-center gap-1 text-zinc-400">
                <Activity className="w-3 h-3 text-emerald-400" />
                <span>Drag 3D to orbit · Scroll to ripple</span>
              </span>
              <button 
                type="button"
                onClick={toggleDock}
                className="text-zinc-400 hover:text-white underline cursor-pointer"
              >
                Hide
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.button
            key="collapsed-dock"
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            onClick={toggleDock}
            className="flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-black/90 hover:bg-black text-white border border-white/20 hover:border-white/40 shadow-[0_15px_35px_rgba(0,0,0,0.8)] backdrop-blur-xl transition-all duration-300 active:scale-95 cursor-pointer group"
          >
            <span className="text-sm">{currentInfo.icon}</span>
            <div className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider">
              <span className="font-bold text-white">{currentInfo.name}</span>
              <span className="text-zinc-500">·</span>
              <span className="text-zinc-400 group-hover:text-zinc-200">3D Modes</span>
            </div>
            <ChevronUp className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white" />
          </motion.button>
        )}
      </AnimatePresence>
    </aside>
  )
}
