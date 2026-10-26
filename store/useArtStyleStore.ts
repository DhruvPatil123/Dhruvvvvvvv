import { create } from 'zustand'
import { playTick, playPopover, playAmbientPad } from '@/lib/sounds'

export type ArtPreset = 'cosmic' | 'chrome' | 'cyberpunk' | 'prismatic'

interface ArtPresetInfo {
  id: ArtPreset
  name: string
  subtitle: string
  icon: string
  color: string
  description: string
  paletteName: string
}

export const ART_PRESETS: Record<ArtPreset, ArtPresetInfo> = {
  cosmic: {
    id: 'cosmic',
    name: 'Royal Amethyst',
    subtitle: 'Amethyst Velvet & Electric Cyan Rim',
    icon: '🔮',
    color: '#a855f7',
    description: 'Bioluminescent quantum core radiating royal amethyst velvet plasma and electric cyan rim highlights.',
    paletteName: 'Royal Amethyst · Electric Cyan'
  },
  chrome: {
    id: 'chrome',
    name: 'Liquid Mercury',
    subtitle: 'High-Gloss Reflective Fluid',
    icon: '🪞',
    color: '#e2e8f0',
    description: 'Molten chrome surface with viscous fluid ripples and high-contrast anisotropic specular glints.',
    paletteName: 'Liquid Silver · Obsidian'
  },
  cyberpunk: {
    id: 'cyberpunk',
    name: 'Cyberpunk Wireframe',
    subtitle: 'Neon Grid & HUD Radar Vectors',
    icon: '⚡',
    color: '#00ff88',
    description: 'Stepped topological vector lattice with animated radar scanlines and telemetry coordinates.',
    paletteName: 'Neon Emerald · Laser Cyan'
  },
  prismatic: {
    id: 'prismatic',
    name: 'Prismatic Glass',
    subtitle: 'Refractive Chromatic Dispersion',
    icon: '💎',
    color: '#38bdf8',
    description: 'Translucent crystalline diamond facets with spectral RGB light dispersion and rainbow fresnel.',
    paletteName: 'RGB Dispersion · Rainbow Fresnel'
  }
}

interface ArtStyleState {
  activePreset: ArtPreset
  wireframe: boolean
  morphIntensity: number
  isAutoRotate: boolean
  isDockOpen: boolean
  isInteracting: boolean
  isGlobalMatrixActive: boolean
  globalMatrixMode: 'green' | 'amber' | 'cyan'
  setPreset: (preset: ArtPreset) => void
  toggleWireframe: () => void
  setMorphIntensity: (intensity: number) => void
  toggleAutoRotate: () => void
  toggleDock: () => void
  setIsInteracting: (interacting: boolean) => void
  toggleGlobalMatrix: () => void
  setGlobalMatrixMode: (mode: 'green' | 'amber' | 'cyan') => void
}

export const useArtStyleStore = create<ArtStyleState>((set) => ({
  activePreset: 'cosmic',
  wireframe: false,
  morphIntensity: 1.0,
  isAutoRotate: true,
  isDockOpen: true,
  isInteracting: false,
  isGlobalMatrixActive: false,
  globalMatrixMode: 'green',

  setPreset: (preset) => {
    try {
      playPopover()
      playAmbientPad()
    } catch (_) {}
    set({ activePreset: preset })
  },

  toggleWireframe: () => {
    try {
      playTick()
    } catch (_) {}
    set((state) => ({ wireframe: !state.wireframe }))
  },

  setMorphIntensity: (intensity) => set({ morphIntensity: intensity }),

  toggleAutoRotate: () => {
    try {
      playTick()
    } catch (_) {}
    set((state) => ({ isAutoRotate: !state.isAutoRotate }))
  },

  toggleDock: () => {
    try {
      playTick()
    } catch (_) {}
    set((state) => ({ isDockOpen: !state.isDockOpen }))
  },

  setIsInteracting: (interacting) => set({ isInteracting: interacting }),

  toggleGlobalMatrix: () => {
    try {
      playTick()
    } catch (_) {}
    set((state) => ({ isGlobalMatrixActive: !state.isGlobalMatrixActive }))
  },

  setGlobalMatrixMode: (mode) => {
    try {
      playTick()
    } catch (_) {}
    set({ globalMatrixMode: mode })
  },
}))
