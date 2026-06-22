"use client"

import React from 'react'
import { motion } from 'framer-motion'

const SKILL_CATEGORIES = [
  {
    title: 'AI & Machine Learning',
    color: 'text-primary',
    skills: ['PyTorch', 'TensorFlow', 'Hugging Face', 'LangChain', 'LlamaIndex', 'RAG', 'LLMs', 'Agentic Workflows', 'Computer Vision']
  },
  {
    title: 'Web Engineering',
    color: 'text-secondary',
    skills: ['React 19', 'Next.js', 'Node.js', 'TypeScript', 'FastAPI', 'PostgreSQL', 'Tailwind CSS', 'Firebase', 'WebSockets']
  },
  {
    title: 'Systems & Security',
    color: 'text-white',
    skills: ['C++', 'Java (Advanced)', '.NET Core', 'C#', 'Cryptography', 'Software Testing', 'Git', 'Figma Prototyping']
  }
]

export default function Skills() {
  return (
    <section id="skills" className="relative w-full min-h-screen flex flex-col items-center justify-center px-6 py-24">
      <div className="max-w-6xl w-full text-center mb-20 space-y-4">
        {/* Section Indicator */}
        <span className="font-mono text-xs uppercase tracking-widest text-primary font-bold">
          [ 02 // TECHNICAL MATRIX ]
        </span>
        
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl lg:text-6xl font-display font-light text-white tracking-tight"
        >
          TECHNICAL <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">MATRIX</span>
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

      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-3 gap-8">
        {SKILL_CATEGORIES.map((cat, index) => (
          <motion.div
            key={cat.title}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="glass-effect p-8 rounded-3xl border border-white/5 hover:border-primary/30 transition-all duration-300 group"
          >
            <h3 className={`text-xs font-mono font-bold mb-8 ${cat.color} uppercase tracking-widest flex items-center gap-2`}>
              <span className="opacity-50">&gt;_</span> {cat.title}
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {cat.skills.map((skill) => (
                <div 
                  key={skill} 
                  className="px-3.5 py-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] text-gray-300 hover:text-white border border-white/5 hover:border-primary/20 transition-all duration-300 font-sans text-xs md:text-sm font-medium cursor-default flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-500 group-hover:bg-primary transition-all duration-300" />
                  {skill}
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
