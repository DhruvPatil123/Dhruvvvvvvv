import { create } from 'zustand'

interface RecruiterStore {
  isOpen: boolean
  openRecruiterView: () => void
  closeRecruiterView: () => void
  toggleRecruiterView: () => void
}

export const useRecruiterStore = create<RecruiterStore>((set) => ({
  isOpen: false,
  openRecruiterView: () => set({ isOpen: true }),
  closeRecruiterView: () => set({ isOpen: false }),
  toggleRecruiterView: () => set((state) => ({ isOpen: !state.isOpen })),
}))
