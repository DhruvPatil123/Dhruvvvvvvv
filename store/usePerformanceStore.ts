import { create } from 'zustand'

interface PerformanceState {
  performanceMode: boolean
  setPerformanceMode: (mode: boolean) => void
}

export const usePerformanceStore = create<PerformanceState>((set) => ({
  performanceMode: false,
  setPerformanceMode: (performanceMode) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('performance-mode', String(performanceMode))
    }
    set({ performanceMode })
  },
}))

