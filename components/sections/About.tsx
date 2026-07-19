"use client"

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function About() {
  const [ranking, setRanking] = useState<string>('370,720')

  useEffect(() => {
    let active = true
    async function fetchRank() {
      try {
        const response = await fetch('/api/leetcode', { cache: 'no-store' })
        if (!response.ok) throw new Error('API failed')
        const data = await response.json()
        if (active && data.ranking) {
          setRanking(data.ranking.toLocaleString())
        }
      } catch (err) {
        console.warn('Failed to fetch dynamic LeetCode rank for About section:', err)
      }
    }
    fetchRank()
    return () => {
      active = false
    }
  }, [])

  return (
    <section id="about" className="relative w-full min-h-screen flex items-center justify-center px-4 sm:px-6 py-24 md:py-32 lg:py-40">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="space-y-6 md:space-y-8"
        >
          {/* Section Indicator */}
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary font-medium">
            [ 01 // ORIGIN & INTENT ]
          </span>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-light text-white tracking-normal leading-[1.1]">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-300 via-zinc-100 to-white italic font-light">
              Researching
            </span>{" "}
            <span className="font-normal text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-200 to-secondary animate-gradient">
              Intelligence
            </span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-300 via-zinc-100 to-white italic font-light">
              Building
            </span>{" "}
            <span className="font-normal text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-200 to-secondary animate-gradient">
              Cognition
            </span>
          </h2>
          
          <p className="text-gray-300 text-base md:text-lg leading-relaxed font-sans">
            I am an AI Researcher and Generative Model Engineer based in Nagpur, India.
            My work focuses on the intersection of Large Language Models (LLMs),
            autonomous agentic workflows, and Retrieval-Augmented Generation (RAG) to create
            cognitive systems that solve complex real-world problems.
          </p>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="glass-effect p-4 sm:p-6 rounded-2xl border-l-[3px] border-primary hover:bg-white/[0.08] transition-all duration-300">
              <p className="text-white font-display font-semibold text-2xl md:text-3xl tracking-tight">8.76</p>
              <p className="text-gray-400 font-mono text-[10px] md:text-xs uppercase tracking-wider font-semibold mt-1">CGPA Standing</p>
            </div>
            <div className="glass-effect p-4 sm:p-6 rounded-2xl border-l-[3px] border-secondary hover:bg-white/[0.08] transition-all duration-300">
              <p className="text-white font-display font-semibold text-2xl md:text-3xl tracking-tight">{ranking}</p>
              <p className="text-gray-400 font-mono text-[10px] md:text-xs uppercase tracking-wider font-semibold mt-1">LeetCode Global Rank</p>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-mono uppercase tracking-widest text-gray-500 font-bold">
              Core Toolkit Focus
            </h4>
            <div className="flex flex-wrap gap-2.5">
              {['GenAI', 'Agentic AI', 'PyTorch', 'RAG workflows', 'React 19 & Next.js', 'FastAPI & WebSockets'].map(skill => (
                <span 
                  key={skill} 
                  className="px-3.5 py-1.5 rounded-full bg-white/[0.04] text-white font-mono text-[11px] font-bold border border-white/5 hover:border-primary/20 transition-all duration-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="relative group rounded-3xl overflow-hidden border border-white/10 aspect-[4/5] max-w-md mx-auto w-full shadow-2xl bg-zinc-950"
        >
          {/* Renaissance Masterpiece */}
          <Image
            src="/renaissance_tech.jpg"
            alt="Renaissance Technology Masterpiece"
            fill
            className="object-cover opacity-80 group-hover:opacity-95 group-hover:scale-[1.02] transition-all duration-700 ease-out"
            referrerPolicy="no-referrer"
          />
          {/* Absolute tech overlays: corner brackets, glowing status indicator */}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent pointer-events-none" />
          
          {/* Sleek industrial crosshairs/cross marks */}
          <div className="absolute top-4 left-4 font-mono text-[8px] text-primary tracking-widest opacity-60">
            [SYS_GRID_02]
          </div>
          <div className="absolute top-4 right-4 font-mono text-[8px] text-zinc-500">
            W-1080px // H-1080px
          </div>
          
          {/* Guided Mission floating card at the bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 space-y-3 z-10 backdrop-blur-md bg-black/60 border-t border-white/5">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-secondary font-bold">Guided Mission</span>
            </div>
            <p className="text-gray-300 text-xs sm:text-sm leading-relaxed font-sans">
              From architecting multimodal live-websocket engines to building autonomous
              AI agents, I strive to push the boundaries of what Generative AI can achieve
              in terms of full autonomy and real-time interaction.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
