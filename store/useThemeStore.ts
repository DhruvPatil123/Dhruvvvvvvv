import { create } from 'zustand'

export type ResumeTheme = 'charcoal' | 'emerald' | 'cobalt'

interface ThemeState {
  theme: ResumeTheme
  setTheme: (theme: ResumeTheme) => void
}

export const useThemeStore = create<ThemeState>((set) => ({
  theme: 'cobalt', // Default to Cobalt
  setTheme: (theme) => set({ theme }),
}))
