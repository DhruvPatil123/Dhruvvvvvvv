import { create } from 'zustand'

export interface ChatPrompt {
  query: string
  label?: string
}

interface ChatState {
  isOpen: boolean
  pendingPrompt: ChatPrompt | null
  openChat: (prompt?: ChatPrompt) => void
  closeChat: () => void
  toggleChat: () => void
  clearPendingPrompt: () => void
}

export const useChatStore = create<ChatState>((set) => ({
  isOpen: false,
  pendingPrompt: null,
  openChat: (prompt) => set({ isOpen: true, pendingPrompt: prompt || null }),
  closeChat: () => set({ isOpen: false }),
  toggleChat: () => set((state) => ({ isOpen: !state.isOpen })),
  clearPendingPrompt: () => set({ pendingPrompt: null }),
}))

