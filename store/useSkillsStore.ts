import { create } from 'zustand'

interface SkillsStore {
  selectedSkill: string | null
  setSelectedSkill: (skill: string | null) => void
}

export const useSkillsStore = create<SkillsStore>((set) => ({
  selectedSkill: null,
  setSelectedSkill: (skill: string | null) => set({ selectedSkill: skill }),
}))
