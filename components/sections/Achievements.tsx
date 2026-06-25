"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Trophy, Medal, Star, Zap } from 'lucide-react'

const ACHIEVEMENTS = [

  {
    title: 'LeetCode Global Rank',
    category: 'Competitive Coding',
    icon: <Zap className="w-6 h-6" />,
    description: 'World Profile Rank: 707,446 with 850+ algorithmic challenges completed and solved.',
    color: 'text-blue-400'
  },
  {
    title: 'Open Source Contributor',
    category: 'Community',
    icon: <Star className="w-6 h-6" />,
    description: '10+ active open-source contributions and repositories managed across diverse AI and Web ecosystems.',
    color: 'text-primary'
  },
  {
    title: 'Production Deployments',
    category: 'Engineering',
    icon: <Medal className="w-6 h-6" />,
    description: '6 production-ready cloud deployments actively hosting high-performance AI tools and web apps.',
    color: 'text-secondary'
  }
]

export default function Achievements() {
  return (
    <section id="achievements" className="relative w-full min-h-[auto] md:min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-20 md:py-32 lg:py-48">
      <div className="max-w-6xl w-full text-center mb-16 md:mb-20 space-y-4">
        {/* Section Indicator */}
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary font-medium">
          [ 05 // BEYOND BENCHMARKS ]
        </span>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl lg:text-6xl font-display font-medium text-white tracking-tight"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-400 via-zinc-200 to-white">
            BEYOND
          </span>{" "}
          <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
            BENCHMARKS
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          viewport={{ once: true }}
          className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto font-sans leading-relaxed"
        >
          Quantifiable milestones and competitive standings that validate my engineering rigor.
        </motion.p>
      </div>

      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-3 gap-6">
        {ACHIEVEMENTS.map((ach, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            viewport={{ once: true }}
            className="glass-effect p-6 sm:p-8 rounded-3xl border border-white/5 hover:border-primary/20 transition-all duration-300 group relative overflow-hidden flex flex-col justify-between min-h-[250px]"
          >
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors" />

            <div>
              <div className={`w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/5 flex items-center justify-center mb-6 ${ach.color}`}>
                {ach.icon}
              </div>
              <span className="text-secondary font-mono text-[9px] uppercase tracking-widest font-extrabold">{"// "}{ach.category}</span>
              <h3 className="text-xl font-display font-medium text-white mt-1 mb-3">{ach.title}</h3>
              <p className="text-gray-300 text-sm leading-relaxed font-sans">{ach.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
