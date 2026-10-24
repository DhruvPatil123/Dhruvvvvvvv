"use client"

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Code2, Cpu, Terminal, Flame, BookOpen, Layers, GitBranch, ArrowUpRight } from 'lucide-react'

export default function About() {
  const [ranking, setRanking] = useState<string>('370,720')

  useEffect(() => {
    let active = true
    async function fetchRank() {
      try {
        const response = await fetch('/api/leetcode', { cache: 'no-store' })
        if (!response.ok) throw new Error('API failed')
        const data = await response.json()
        if (active && typeof data.ranking === 'number') {
          setRanking(data.ranking.toLocaleString())
        }
      } catch (err) {
        console.warn('Failed to fetch dynamic LeetCode rank:', err)
      }
    }
    fetchRank()
    return () => {
      active = false
    }
  }, [])

  const pillarCards = [
    {
      title: "AI Engineer",
      icon: <Sparkles className="w-5 h-5 text-white" />,
      border: "hover:border-white/30",
      accent: "text-white",
      desc: "Specializes in Generative AI, LLMs, RAG architectures, prompt engineering, and agentic workflows.",
      bullets: ["Agentic Multi-Agent Workflows", "Vector Databases & Pinecone", "Gemini & OpenAI API Stacks"]
    },
    {
      title: "Research Enthusiast",
      icon: <BookOpen className="w-5 h-5 text-zinc-300" />,
      border: "hover:border-white/30",
      accent: "text-zinc-300",
      desc: "Investigates low-latency multimodal streaming, code churn prediction model architectures, and LLM evaluations.",
      bullets: ["Real-Time Biometric Streaming", "AST Code Analysis Knowledge Graphs", "Autonomous Self-Healing Pipelines"]
    },
    {
      title: "Full Stack Developer",
      icon: <Layers className="w-5 h-5 text-zinc-200" />,
      border: "hover:border-white/30",
      accent: "text-zinc-200",
      desc: "Engineers production-grade full-stack web applications with high frame rate 3D interfaces and real-time backends.",
      bullets: ["Next.js 15 & React 19", "FastAPI & Node.js Microservices", "Tailwind CSS & Framer Motion"]
    },
    {
      title: "Open Source Builder",
      icon: <GitBranch className="w-5 h-5 text-zinc-300" />,
      border: "hover:border-white/30",
      accent: "text-zinc-300",
      desc: "Actively ships public repositories, developer utilities, and reusable AI software templates.",
      bullets: ["500+ Public GitHub Commits", "Reusable Next.js + AI Boilerplates", "Community Developer Tooling"]
    }
  ]

  return (
    <section id="about" className="relative w-full min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-24 md:py-36 lg:py-44">
      <div className="max-w-6xl w-full space-y-16 sm:space-y-20">
        {/* Section Header */}
        <div className="text-center space-y-4">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-400 font-semibold">
            [ 01 // ORIGIN & INTENT ]
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-light text-white tracking-tight leading-tight">
            Who <span className="italic font-serif text-zinc-400">I Am</span> & <span className="font-semibold text-white">Core Pillars</span>
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg max-w-xl mx-auto font-sans leading-relaxed">
            AI Research Engineer & Full Stack Developer combining mathematical precision with production web engineering.
          </p>
        </div>

        {/* 4 Cards Grid as requested */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
          {pillarCards.map((card, idx) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              viewport={{ once: true }}
              className={`p-7 sm:p-8 rounded-3xl bg-black/70 border border-white/10 ${card.border} transition-all duration-300 shadow-xl space-y-6 group hover:-translate-y-1.5 flex flex-col justify-between backdrop-blur-xl`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform">
                    {card.icon}
                  </div>
                  <span className="font-mono text-[10px] text-gray-500 font-bold uppercase tracking-widest">0{idx + 1}</span>
                </div>

                <h3 className={`font-display text-xl font-bold ${card.accent}`}>
                  {card.title}
                </h3>

                <p className="text-xs text-gray-300 leading-relaxed font-sans">
                  {card.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-white/10 space-y-1.5">
                {card.bullets.map((bullet, bIdx) => (
                  <div key={bIdx} className="flex items-center gap-2 text-[11px] font-mono text-gray-400">
                    <span className={`w-1.5 h-1.5 rounded-full ${card.accent}`} />
                    <span className="truncate">{bullet}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Animated Statistics Bar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-cyan-950/40 via-zinc-950 to-blue-950/40 border border-cyan-500/30 shadow-2xl"
        >
          {[
            { value: "10+", label: "AI Projects", sub: "LLMs, RAG & Agents" },
            { value: "150+", label: "LeetCode Problems", sub: "Data Structures & DSA" },
            { value: "11", label: "Internships", sub: "Practical Software Roles" },
            { value: "15+", label: "Certifications", sub: "AI & Full Stack Skills" },
            { value: "2", label: "Hackathons", sub: "Competitive AI Events" }
          ].map((stat, i) => (
            <div key={i} className="text-center p-3 space-y-1 border-r last:border-0 border-white/10">
              <p className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-primary to-blue-300">
                {stat.value}
              </p>
              <p className="text-white font-mono text-xs font-bold uppercase tracking-wider">{stat.label}</p>
              <p className="text-[10px] text-gray-400 font-sans">{stat.sub}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
