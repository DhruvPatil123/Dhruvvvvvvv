import { create } from 'zustand'

interface PerformanceState {
  performanceMode: boolean
  setPerformanceMode: (mode: boolean) => void
  togglePerformanceMode: () => void
}

const getInitialPerformanceMode = (): boolean => {
  if (typeof window === 'undefined') return false
  const saved = localStorage.getItem('performance-mode')
  if (saved !== null) {
    return saved === 'true'
  }
  // Auto-enable Eco Mode for touch screens and mobile viewports
  return window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768
}

export const usePerformanceStore = create<PerformanceState>((set) => ({
  performanceMode: false,
  setPerformanceMode: (performanceMode) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('performance-mode', String(performanceMode))
    }
    set({ performanceMode })
  },
  togglePerformanceMode: () => {
    set((state) => {
      const next = !state.performanceMode
      if (typeof window !== 'undefined') {
        localStorage.setItem('performance-mode', String(next))
      }
      return { performanceMode: next }
    })
  },
}))

// Client-side initialization
if (typeof window !== 'undefined') {
  const initial = getInitialPerformanceMode()
  if (initial) {
    usePerformanceStore.setState({ performanceMode: true })
  }
}
