import { create } from 'zustand'

export type ResumeTheme = 'charcoal' | 'emerald' | 'cobalt'

interface ThemeState {
  theme: ResumeTheme
  setTheme: (theme: ResumeTheme) => void
}

export const useThemeStore = create<ThemeState>((set) => ({
  theme: 'charcoal', // Default to charcoal
  setTheme: (theme) => set({ theme }),
}))
