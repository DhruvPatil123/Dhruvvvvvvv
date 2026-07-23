import { create } from 'zustand'

export type ContrastLevel = 'subtle' | 'standard' | 'dramatic'

interface BackgroundSettingsState {
  bgOpacity: number
  contrastLevel: ContrastLevel
  parallaxIntensity: number
  isSettingsOpen: boolean
  setBgOpacity: (opacity: number) => void
  setContrastLevel: (level: ContrastLevel) => void
  setParallaxIntensity: (intensity: number) => void
  setIsSettingsOpen: (open: boolean) => void
}

export const useBackgroundSettingsStore = create<BackgroundSettingsState>((set) => ({
  bgOpacity: 0.85,
  contrastLevel: 'standard',
  parallaxIntensity: 1.0,
  isSettingsOpen: false,
  setBgOpacity: (bgOpacity) => set({ bgOpacity }),
  setContrastLevel: (contrastLevel) => set({ contrastLevel }),
  setParallaxIntensity: (parallaxIntensity) => set({ parallaxIntensity }),
  setIsSettingsOpen: (isSettingsOpen) => set({ isSettingsOpen }),
}))
