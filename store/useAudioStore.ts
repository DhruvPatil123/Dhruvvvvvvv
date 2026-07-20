import { create } from 'zustand'

interface AudioState {
  isMuted: boolean
  isPlayingAmbient: boolean
  setIsMuted: (isMuted: boolean) => void
  setIsPlayingAmbient: (isPlayingAmbient: boolean) => void
}

export const useAudioStore = create<AudioState>((set) => ({
  isMuted: true, // default to muted
  isPlayingAmbient: false,
  setIsMuted: (isMuted) => set({ isMuted }),
  setIsPlayingAmbient: (isPlayingAmbient) => set({ isPlayingAmbient }),
}))
