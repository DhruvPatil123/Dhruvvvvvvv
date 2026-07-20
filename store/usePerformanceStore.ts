import { create } from 'zustand'

interface PerformanceState {
  performanceMode: boolean
  setPerformanceMode: (mode: boolean) => void
}

export const usePerformanceStore = create<PerformanceState>((set) => {
  // Safe window check for SSR/Next.js
  const initialMode = typeof window !== 'undefined' 
    ? localStorage.getItem('performance-mode') === 'true'
    : false

  return {
    performanceMode: initialMode,
    setPerformanceMode: (performanceMode) => {
      if (typeof window !== 'undefined') {
        localStorage.setItem('performance-mode', String(performanceMode))
      }
      set({ performanceMode })
    },
  }
})
