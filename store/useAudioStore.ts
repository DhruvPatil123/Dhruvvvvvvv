import { create } from 'zustand'

interface AudioState {
  isMuted: boolean
  isPlayingAmbient: boolean
  ambientVolume: number
  filterCutoff: number
  crystalChimesEnabled: boolean
  setIsMuted: (isMuted: boolean) => void
  setIsPlayingAmbient: (isPlayingAmbient: boolean) => void
  setAmbientVolume: (ambientVolume: number) => void
  setFilterCutoff: (filterCutoff: number) => void
  setCrystalChimesEnabled: (crystalChimesEnabled: boolean) => void
  toggleMute: () => void
  toggleAmbientDrone: () => void
  toggleCrystalChimes: () => void
}

export const useAudioStore = create<AudioState>((set, get) => ({
  isMuted: false, // default interaction sounds enabled
  isPlayingAmbient: false,
  ambientVolume: 0.22,
  filterCutoff: 380, // initial cutoff in Hz
  crystalChimesEnabled: true,

  setIsMuted: (isMuted) => set({ isMuted }),
  setIsPlayingAmbient: (isPlayingAmbient) => set({ isPlayingAmbient }),
  setAmbientVolume: (ambientVolume) => set({ ambientVolume }),
  setFilterCutoff: (filterCutoff) => set({ filterCutoff }),
  setCrystalChimesEnabled: (crystalChimesEnabled) => set({ crystalChimesEnabled }),

  toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),
  toggleAmbientDrone: () => set((state) => ({ isPlayingAmbient: !state.isPlayingAmbient })),
  toggleCrystalChimes: () => set((state) => ({ crystalChimesEnabled: !state.crystalChimesEnabled })),
}))
