"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Bot, Sparkles, Send, Terminal, Cpu, Zap, ArrowRight } from 'lucide-react'
import { useChatStore } from '@/store/useChatStore'

export default function Playground() {
  const { openChat, setPendingPrompt } = useChatStore()
  const [customPrompt, setCustomPrompt] = useState('')

  const samplePrompts = [
    { label: "⚡ Strongest Backend Stack", query: "What is Dhruv's strongest backend stack?" },
    { label: "🤖 AI/RAG Architecture", query: "Explain how Dhruv builds RAG and Gemini Multimodal Live API applications." },
    { label: "🛠️ C++ & Docker Projects", query: "Which projects showcase C++ and Docker sandboxing?" },
    { label: "🏆 LeetCode & Achievements", query: "What are Dhruv's LeetCode ranks and competitive achievements?" },
  ]

  const handleRunPrompt = (query: string, label?: string) => {
    setPendingPrompt(query, label || query)
    openChat()
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!customPrompt.trim()) return
    handleRunPrompt(customPrompt.trim(), customPrompt.trim())
    setCustomPrompt('')
  }

  return (
    <section id="playground" className="relative w-full py-28 md:py-36 lg:py-48 px-4 sm:px-6 flex flex-col items-center justify-center">
      <div className="max-w-5xl w-full">
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-20 space-y-6">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary font-medium">
            [ 07 // INTERACTIVE AI ENGINE ]
          </span>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-display font-light text-white"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-300 via-zinc-100 to-white italic">
              AI
            </span>{" "}
            <span className="font-normal text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-200 to-secondary animate-gradient">
              Playground & RAG Bot
            </span>
          </motion.h2>

          <p className="text-gray-300 text-base max-w-xl mx-auto font-sans">
            Query Dhruv&apos;s personal AI assistant powered by a RAG knowledge base. Ask about architecture, stack choices, or career milestones.
          </p>
        </div>

        {/* Playground Interactive Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="glass-effect p-6 sm:p-10 rounded-3xl border border-white/10 relative overflow-hidden bg-black/60 shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />

          {/* Top Status Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 border-b border-white/10 pb-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/30 flex items-center justify-center text-primary">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-display font-bold text-white">Ask My AI</h3>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-[9px] uppercase font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Live RAG
                  </span>
                </div>
                <p className="text-xs text-gray-400 font-mono">Model: Gemini Flash 3.5 & Portfolio Knowledge Index</p>
              </div>
            </div>

            <button
              onClick={() => openChat()}
              className="px-4 py-2 rounded-xl bg-primary text-black font-mono text-xs uppercase tracking-wider font-bold hover:bg-primary/90 transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(0,242,255,0.25)] cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Launch Full Chatbot</span>
            </button>
          </div>

          {/* Suggested Prompts Grid */}
          <div className="space-y-4 mb-8">
            <p className="text-xs font-mono uppercase tracking-widest text-gray-400 font-bold flex items-center gap-2">
              <Terminal className="w-4 h-4 text-primary" />
              <span>Sample RAG Queries</span>
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {samplePrompts.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleRunPrompt(item.query, item.label)}
                  className="p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 hover:border-primary/30 text-left transition-all group flex items-center justify-between cursor-pointer"
                >
                  <div className="space-y-1">
                    <span className="text-xs font-mono font-bold text-primary block">{item.label}</span>
                    <span className="text-xs text-gray-300 font-sans line-clamp-1">{item.query}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0 ml-2" />
                </button>
              ))}
            </div>
          </div>

          {/* Inline Prompt Input Form */}
          <form onSubmit={handleSubmit} className="relative">
            <div className="flex items-center gap-2 bg-zinc-900/90 border border-white/15 rounded-2xl p-2 focus-within:border-primary transition-all">
              <Cpu className="w-5 h-5 text-gray-400 ml-3 shrink-0" />
              <input
                type="text"
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                placeholder="Ask anything about Dhruv's projects, experience, or skills..."
                className="flex-1 bg-transparent text-white text-sm outline-none px-2 placeholder:text-gray-500"
              />
              <button
                type="submit"
                disabled={!customPrompt.trim()}
                className={`px-5 py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all ${
                  customPrompt.trim()
                    ? 'bg-primary text-black hover:scale-102 cursor-pointer shadow-[0_0_12px_rgba(0,242,255,0.3)]'
                    : 'bg-white/5 text-gray-600 cursor-not-allowed'
                }`}
              >
                <span>Ask AI</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  )
}
