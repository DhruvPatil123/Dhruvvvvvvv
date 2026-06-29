"use client"

import React from 'react'
import { motion } from 'framer-motion'

export default function About() {
  return (
    <section id="about" className="relative w-full min-h-[auto] md:min-h-screen flex items-center justify-center px-4 sm:px-6 py-20 md:py-32 lg:py-48">
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

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium text-white tracking-tight leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-400 via-zinc-200 to-white">
              RESEARCHING
            </span>{" "}
            <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              INTELLIGENCE
            </span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-400 via-zinc-200 to-white">
              BUILDING COGNITION
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
              <p className="text-white font-display font-semibold text-2xl md:text-3xl tracking-tight">463,894</p>
              <p className="text-gray-400 font-mono text-[10px] md:text-xs uppercase tracking-wider font-semibold mt-1">LeetCode Global Rank</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="glass-effect p-6 sm:p-8 md:p-12 rounded-3xl border border-white/5 relative overflow-hidden group"
        >
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/15 rounded-full blur-3xl group-hover:bg-primary/25 transition-colors duration-500" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-secondary/15 rounded-full blur-3xl group-hover:bg-secondary/25 transition-colors duration-500" />

          <h3 className="text-xl md:text-2xl font-display font-medium text-white mb-6 flex items-center gap-2">
            <span className="text-secondary font-mono">[//]</span> Guided Mission
          </h3>
          
          <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-8 font-sans">
            From architecting multimodal live-websocket engines to building autonomous
            AI agents, I strive to push the boundaries of what Generative AI can achieve
            in terms of full autonomy, low latency, and real-time interaction.
          </p>

          <h4 className="text-xs font-mono uppercase tracking-widest text-gray-500 mb-4 font-bold">
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
        </motion.div>
      </div>
    </section>
  )
}
