"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Brain, Code2, ShieldAlert, Cpu } from 'lucide-react'
import { useScrollStore } from '@/store/useScrollStore'

const SKILL_CATEGORIES = [
  {
    title: 'AI & Machine Learning',
    icon: <Brain className="w-5 h-5 text-primary" />,
    color: 'text-primary',
    borderHover: 'hover:border-primary/30',
    skills: ['PyTorch', 'TensorFlow', 'Hugging Face', 'LangChain', 'LlamaIndex', 'RAG', 'LLMs', 'Agentic Workflows', 'Computer Vision']
  },
  {
    title: 'Web Engineering',
    icon: <Code2 className="w-5 h-5 text-secondary" />,
    color: 'text-secondary',
    borderHover: 'hover:border-secondary/30',
    skills: ['React 19', 'Next.js', 'Node.js', 'TypeScript', 'FastAPI', 'PostgreSQL', 'Tailwind CSS', 'Firebase', 'WebSockets']
  },
  {
    title: 'Systems & Security',
    icon: <ShieldAlert className="w-5 h-5 text-white" />,
    color: 'text-white',
    borderHover: 'hover:border-zinc-500/30',
    skills: ['C++', 'Java (Advanced)', '.NET Core', 'C#', 'Cryptography', 'Software Testing', 'Git', 'Figma Prototyping']
  }
]

export default function Skills() {
  const setSkillsHovered = useScrollStore((state) => state.setSkillsHovered)

  return (
    <section id="skills" className="relative w-full min-h-screen flex flex-col items-center justify-center px-6 py-32 md:py-48 lg:py-64">
      <div className="max-w-6xl w-full text-center mb-20 space-y-4">
        {/* Section Indicator */}
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary font-medium">
          [ 02 // TECHNICAL MATRIX ]
        </span>
        
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl lg:text-6xl font-display font-medium text-white tracking-tight"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-400 via-zinc-200 to-white">
            TECHNICAL
          </span>{" "}
          <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
            MATRIX
          </span>
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          viewport={{ once: true }}
          className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto font-sans leading-relaxed"
        >
          A multidisciplinary stack focused on Generative AI research, high-performance
          web architectures, and secure system design.
        </motion.p>
      </div>

      {/* Bento Grid Container */}
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-auto">
        
        {/* Card 1: AI & Machine Learning (Large, Col Span 2) */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          onMouseEnter={() => setSkillsHovered(true)}
          onMouseLeave={() => setSkillsHovered(false)}
          className="glass-effect p-8 rounded-3xl border border-white/5 hover:border-primary/30 transition-all duration-300 group md:col-span-2 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center">
                {SKILL_CATEGORIES[0].icon}
              </div>
              <h3 className="text-sm font-mono font-bold text-primary uppercase tracking-widest">
                {SKILL_CATEGORIES[0].title}
              </h3>
            </div>
            
            <p className="text-gray-400 text-xs font-mono mb-8">
              {"// Core engineering block specializing in foundational & agentic LLM logic."}
            </p>

            <div className="flex flex-wrap gap-2.5">
              {SKILL_CATEGORIES[0].skills.map((skill) => (
                <div 
                  key={skill} 
                  className="px-3.5 py-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] text-gray-300 hover:text-white border border-white/5 hover:border-primary/20 transition-all duration-300 font-sans text-xs md:text-sm font-medium cursor-default flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:bg-primary transition-all duration-300 animate-pulse" />
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Card 2: Web Engineering (Vertical Stack, Col Span 1) */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          onMouseEnter={() => setSkillsHovered(true)}
          onMouseLeave={() => setSkillsHovered(false)}
          className="glass-effect p-8 rounded-3xl border border-white/5 hover:border-secondary/30 transition-all duration-300 group md:col-span-1 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center">
                {SKILL_CATEGORIES[1].icon}
              </div>
              <h3 className="text-sm font-mono font-bold text-secondary uppercase tracking-widest">
                {SKILL_CATEGORIES[1].title}
              </h3>
            </div>

            <p className="text-gray-400 text-xs font-mono mb-8">
              {"// Full-stack engineering with real-time reactive engines."}
            </p>

            <div className="flex flex-wrap gap-2.5">
              {SKILL_CATEGORIES[1].skills.map((skill) => (
                <div 
                  key={skill} 
                  className="px-3.5 py-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] text-gray-300 hover:text-white border border-white/5 hover:border-secondary/20 transition-all duration-300 font-sans text-xs md:text-sm font-medium cursor-default flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary/40 group-hover:bg-secondary transition-all duration-300" />
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Card 3: Systems & Security (Col Span 2) */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          onMouseEnter={() => setSkillsHovered(true)}
          onMouseLeave={() => setSkillsHovered(false)}
          className="glass-effect p-8 rounded-3xl border border-white/5 hover:border-zinc-500/30 transition-all duration-300 group md:col-span-2 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center">
                {SKILL_CATEGORIES[2].icon}
              </div>
              <h3 className="text-sm font-mono font-bold text-white uppercase tracking-widest">
                {SKILL_CATEGORIES[2].title}
              </h3>
            </div>

            <p className="text-gray-400 text-xs font-mono mb-8">
              {"// Lower-level languages, cryptographic verification, and tooling systems."}
            </p>

            <div className="flex flex-wrap gap-2.5">
              {SKILL_CATEGORIES[2].skills.map((skill) => (
                <div 
                  key={skill} 
                  className="px-3.5 py-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] text-gray-300 hover:text-white border border-white/5 hover:border-zinc-500/20 transition-all duration-300 font-sans text-xs md:text-sm font-medium cursor-default flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 group-hover:bg-white transition-all duration-300" />
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Card 4: Architecture Focus & System telemetry (Bento Metric, Col Span 1) */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          onMouseEnter={() => setSkillsHovered(true)}
          onMouseLeave={() => setSkillsHovered(false)}
          className="glass-effect p-8 rounded-3xl border border-white/5 hover:border-primary/20 transition-all duration-300 group md:col-span-1 flex flex-col justify-between relative overflow-hidden"
        >
          <div className="absolute -right-12 -bottom-12 w-32 h-32 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-all duration-500" />
          
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center">
                <Cpu className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-sm font-mono font-bold text-white uppercase tracking-widest">
                CORE MATRIX FOCUS
              </h3>
            </div>

            <div className="space-y-4 font-mono text-xs text-gray-400">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span>RAG COGNITION</span>
                <span className="text-primary font-bold">100% SECURE</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span>PARALLEL PROCESSING</span>
                <span className="text-secondary font-bold">OPTIMIZED</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span>AGENTIC AUTONOMY</span>
                <span className="text-white font-bold">STATEFUL</span>
              </div>
              <div className="flex justify-between">
                <span>UI FRAMEWORK</span>
                <span className="text-zinc-300">NEXT.JS AppRouter</span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">ENGINEERING STANDARDS</span>
            <span className="text-[10px] font-mono text-zinc-400 font-semibold uppercase">
              SECURE & HIGH-PERFORMANCE
            </span>
          </div>
        </motion.div>

      </div>
    </section>
  )
}

