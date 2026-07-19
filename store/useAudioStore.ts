import { create } from 'zustand';

interface AudioState {
  isMuted: boolean;
  isPlayingAmbient: boolean;
  toggleMute: () => void;
  setMuted: (muted: boolean) => void;
  toggleAmbient: () => void;
  setAmbient: (playing: boolean) => void;
}

export const useAudioStore = create<AudioState>((set) => ({
  isMuted: false,
  isPlayingAmbient: false,
  toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),
  setMuted: (muted) => set({ isMuted: muted }),
  toggleAmbient: () => set((state) => ({ isPlayingAmbient: !state.isPlayingAmbient })),
  setAmbient: (playing) => set({ isPlayingAmbient: playing }),
}));
