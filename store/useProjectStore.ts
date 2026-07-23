import { create } from 'zustand'

interface ProjectStore {
  selectedProjectTitle: string | null
  openProjectModal: (title: string) => void
  closeProjectModal: () => void
}

export const useProjectStore = create<ProjectStore>((set) => ({
  selectedProjectTitle: null,
  openProjectModal: (title: string) => set({ selectedProjectTitle: title }),
  closeProjectModal: () => set({ selectedProjectTitle: null }),
}))
