"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'

const PROJECTS = [
  {
    title: 'Raincrew.AI',
    category: 'GenAI / Multimodal',
    description: 'Next-Generation AI Talent Acquisition & Biometric Proctoring Engine using Google Gemini Multimodal Live WebSocket API and real-time oral interview metrics.',
    link: 'https://github.com/DhruvPatil123/Raincrew-ai',
    github: 'https://github.com/DhruvPatil123/Raincrew-ai',
  },
  {
    title: 'Language Translation Tool',
    category: 'NLP / Dashboard',
    description: 'High-performance multilingual translation dashboard featuring real-time dual-layer caching and visual performance telemetry logs.',
    link: 'https://github.com/DhruvPatil123/Language-Translation-Tool',
    github: 'https://github.com/DhruvPatil123/Language-Translation-Tool',
  },
  {
    title: 'VisionCraft.AI',
    category: 'Generative Art',
    description: 'Text-to-image and generative video application utilizing custom prompt modeling for 2K/4K visual output via GANs.',
    link: 'https://github.com/DhruvPatil123/VisonCraft.AI',
    github: 'https://github.com/DhruvPatil123/VisonCraft.AI',
  },
  {
    title: 'AI Resume Builder',
    category: 'LLM Optimizer',
    description: 'Automated ATS-optimizer leveraging LLMs to organically rewrite and format professional resumes based on job requirements.',
    link: 'https://github.com/DhruvPatil123/ai-resume-builder',
    github: 'https://github.com/DhruvPatil123/ai-resume-builder',
  },
  {
    title: 'TenderScan.AI',
    category: 'NLP Classifier',
    description: 'Automated tender classification architecture using NLP to categorize and prioritize government bids across regional domains.',
    link: 'https://github.com/DhruvPatil123/TenderScan.Ai',
    github: 'https://github.com/DhruvPatil123/TenderScan.Ai',
  },
  {
    title: 'Readme.AI',
    category: 'Dev Tooling',
    description: 'Interactive terminal generator that automatically creates high-fidelity professional README.md files via GitHub API.',
    link: 'https://github.com/DhruvPatil123/Readme.AI',
    github: 'https://github.com/DhruvPatil123/Readme.AI',
  },
  {
    title: 'UnoUI',
    category: 'Low-Code Platform',
    description: 'Zero-code modern landing page creator using visual module-based layout components rendering fluid HTML dynamically.',
    link: 'https://github.com/DhruvPatil123/UnoUI',
    github: 'https://github.com/DhruvPatil123/UnoUI',
  },
  {
    title: 'EncryptX',
    category: 'Cryptography',
    description: 'Security desktop toolkit implementing multi-layered algorithms (AES, DES, RSA) for bulletproof digital asset encryption.',
    link: 'https://github.com/DhruvPatil123/EncryptX-Encryption-Decryption-Tool',
    github: 'https://github.com/DhruvPatil123/EncryptX-Encryption-Decryption-Tool',
  },
  {
    title: 'Flappy Bird',
    category: 'Game Dev',
    description: 'Classic recreation focusing on custom collision-matrix calculations and smooth coordinate delta updates.',
    link: 'https://github.com/DhruvPatil123/Flappy-Bird-game-',
    github: 'https://github.com/DhruvPatil123/Flappy-Bird-game-',
  }
]

export default function Projects() {
  return (
    <section id="work" className="relative w-full min-h-[auto] md:min-h-screen flex flex-col items-center py-20 md:py-32 lg:py-48 px-4 sm:px-6">
      <div className="max-w-6xl w-full text-center mb-16 md:mb-20 space-y-4">
        {/* Section Indicator */}
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary font-medium">
          [ 03 // COGNITIVE WORKS ]
        </span>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl lg:text-6xl font-display font-medium text-white tracking-tight"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-400 via-zinc-200 to-white">
            ENGINEERING
          </span>{" "}
          <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
            PORTFOLIO
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          viewport={{ once: true }}
          className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto font-sans leading-relaxed"
        >
          From autonomous agents to cryptographic toolkits—pushing the boundaries of what is possible with software.
        </motion.p>
      </div>

      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
        {PROJECTS.map((project, idx) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: idx * 0.08 }}
            viewport={{ once: true }}
            className="group relative rounded-3xl overflow-hidden border border-white/5 glass-effect p-6 md:p-10 flex flex-col justify-between gap-6 hover:border-primary/30 transition-all duration-500"
          >
            {/* Decorative glow blobs */}
            <div className="absolute -top-16 -right-16 w-48 h-48 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors duration-700 pointer-events-none" />
            <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-secondary/5 rounded-full blur-3xl group-hover:bg-secondary/15 transition-colors duration-700 pointer-events-none" />

            <div className="relative z-10 space-y-4">
              <span className="text-secondary font-mono text-[10px] uppercase tracking-widest font-bold">
                {"// "}{project.category}
              </span>
              <h3 className="text-2xl md:text-3xl font-display font-normal text-white tracking-tight group-hover:text-primary transition-colors duration-300">
                {project.title}
              </h3>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed font-sans">
                {project.description}
              </p>
            </div>

            <div className="relative z-10 flex flex-wrap gap-4 pt-2">
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-mono text-xs uppercase tracking-widest hover:bg-primary hover:text-black transition-colors duration-300"
              >
                Launch <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/[0.04] text-white font-mono text-xs uppercase tracking-widest hover:bg-white/[0.1] hover:text-primary transition-all duration-300 border border-white/5"
              >
                <Github className="w-3.5 h-3.5" /> Code
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
