"use client"

import React, { useRef } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'

const PROJECTS = [
  {
    title: 'Raincrew.AI',
    category: 'GenAI / Multimodal',
    description: 'Next-Generation AI Talent Acquisition & Biometric Proctoring Engine using Google Gemini Multimodal Live WebSocket API and real-time oral interview metrics.',
    link: 'https://github.com/DhruvPatil123/Raincrew-ai',
    github: 'https://github.com/DhruvPatil123/Raincrew-ai',
    tech: ['Gemini Live', 'WebSockets', 'Next.js', 'Tailwind']
  },
  {
    title: 'Language Translation Tool',
    category: 'NLP / Dashboard',
    description: 'High-performance multilingual translation dashboard featuring real-time dual-layer caching and visual performance telemetry logs.',
    link: 'https://github.com/DhruvPatil123/Language-Translation-Tool',
    github: 'https://github.com/DhruvPatil123/Language-Translation-Tool',
    tech: ['React', 'Node.js', 'Redis Caching', 'Telemetry']
  },
  {
    title: 'VisionCraft.AI',
    category: 'Generative Art',
    description: 'Text-to-image and generative video application utilizing custom prompt modeling for 2K/4K visual output via GANs.',
    link: 'https://github.com/DhruvPatil123/VisonCraft.AI',
    github: 'https://github.com/DhruvPatil123/VisonCraft.AI',
    tech: ['PyTorch', 'GANs', 'FastAPI', 'Tailwind CSS']
  },
  {
    title: 'AI Resume Builder',
    category: 'LLM Optimizer',
    description: 'Automated ATS-optimizer leveraging LLMs to organically rewrite and format professional resumes based on job requirements.',
    link: 'https://github.com/DhruvPatil123/ai-resume-builder',
    github: 'https://github.com/DhruvPatil123/ai-resume-builder',
    tech: ['LangChain', 'OpenAI API', 'Next.js', 'PostgreSQL']
  },
  {
    title: 'TenderScan.AI',
    category: 'NLP Classifier',
    description: 'Automated tender classification architecture using NLP to categorize and prioritize government bids across regional domains.',
    link: 'https://github.com/DhruvPatil123/TenderScan.Ai',
    github: 'https://github.com/DhruvPatil123/TenderScan.Ai',
    tech: ['Python', 'Scikit-Learn', 'FastAPI', 'BERT']
  },
  {
    title: 'Readme.AI',
    category: 'Dev Tooling',
    description: 'Interactive terminal generator that automatically creates high-fidelity professional README.md files via GitHub API.',
    link: 'https://github.com/DhruvPatil123/Readme.AI',
    github: 'https://github.com/DhruvPatil123/Readme.AI',
    tech: ['GitHub API', 'Node.js', 'React', 'Commander']
  },
  {
    title: 'UnoUI',
    category: 'Low-Code Platform',
    description: 'Zero-code modern landing page creator using visual module-based layout components rendering fluid HTML dynamically.',
    link: 'https://github.com/DhruvPatil123/UnoUI',
    github: 'https://github.com/DhruvPatil123/UnoUI',
    tech: ['HTML5', 'TypeScript', 'Tailwind CSS', 'React']
  },
  {
    title: 'EncryptX',
    category: 'Cryptography',
    description: 'Security desktop toolkit implementing multi-layered algorithms (AES, DES, RSA) for bulletproof digital asset encryption.',
    link: 'https://github.com/DhruvPatil123/EncryptX-Encryption-Decryption-Tool',
    github: 'https://github.com/DhruvPatil123/EncryptX-Encryption-Decryption-Tool',
    tech: ['Electron', 'AES-256', 'RSA', 'C++']
  },
  {
    title: 'Flappy Bird',
    category: 'Game Dev',
    description: 'Classic recreation focusing on custom collision-matrix calculations and smooth coordinate delta updates.',
    link: 'https://github.com/DhruvPatil123/Flappy-Bird-game-',
    github: 'https://github.com/DhruvPatil123/Flappy-Bird-game-',
    tech: ['HTML5 Canvas', 'Vanilla JS', 'Physics Engine']
  }
]

function ProjectCard({ project, idx }: { project: typeof PROJECTS[0]; idx: number }) {
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    cardRef.current.style.setProperty('--x', `${x}px`)
    cardRef.current.style.setProperty('--y', `${y}px`)
  }

  const handleTouch = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const touch = e.touches[0]
    if (!touch) return
    const x = touch.clientX - rect.left
    const y = touch.clientY - rect.top
    cardRef.current.style.setProperty('--x', `${x}px`)
    cardRef.current.style.setProperty('--y', `${y}px`)
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onTouchStart={handleTouch}
      onTouchMove={handleTouch}
      initial={{ opacity: 0, y: 40, rotateX: 8 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.8, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true }}
      className="group relative rounded-3xl overflow-hidden border border-white/5 glass-effect p-6 md:p-10 flex flex-col justify-between gap-6 hover:border-white/20 active:border-white/20 transition-all duration-500 cursor-pointer"
      style={{ perspective: '1000px' }}
    >
      {/* Point 2: Faint radial background light centered on card (opacity 8%) instead of excessive glow */}
      <div 
        className="absolute inset-0 opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle 280px at center, rgba(var(--primary-rgb), 0.08), transparent 70%)`
        }}
      />

      {/* Point 8: Cursor tracking lighting gradient (light follows cursor at opacity 12%) */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(circle 260px at var(--x, 0px) var(--y, 0px), rgba(var(--primary-rgb), 0.12), transparent 45%)`
        }}
      />

      {/* Small subtle light sweep on hover */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none bg-gradient-to-r from-transparent via-white/[0.03] to-transparent" />

      {/* Point 11: High-fidelity informative structured layout */}
      <div className="relative z-10 space-y-4">
        {/* Category Header */}
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          <span className="text-secondary font-mono text-[10.5px] uppercase tracking-[0.25em] font-extrabold">
            {project.category}
          </span>
        </div>

        {/* Title (Point 6: 38px size on desktop) */}
        <h3 className="text-2xl md:text-[38px] font-display font-medium text-white tracking-tight leading-tight group-hover:text-primary transition-colors duration-300">
          {project.title}
        </h3>

        {/* Description (Point 6: 17px size, line-height 1.7) */}
        <p className="text-gray-300 text-sm md:text-[17px] leading-[1.7] font-sans">
          {project.description}
        </p>

        {/* Tech Stack Chips (Point 11) */}
        <div className="flex flex-wrap gap-2 pt-2">
          {project.tech.map((tech) => (
            <span 
              key={tech} 
              className="px-3 py-1 rounded-full bg-white/[0.03] border border-white/5 text-gray-400 font-mono text-[10px] tracking-wider uppercase"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Separator & Footer Action Buttons (Point 11, Point 7) */}
      <div className="relative z-10 space-y-5">
        <hr className="border-white/5 w-full" />
        
        <div className="flex flex-wrap gap-4">
          {/* Launch Button (Point 7: White background, subtle hover shadow glow, arrow slides on hover) */}
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group/btn flex items-center gap-2 px-6 py-3.5 rounded-full bg-white text-black font-mono text-xs uppercase tracking-widest font-bold transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.35)] hover:bg-white/95"
          >
            Launch <ExternalLink className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" />
          </a>

          {/* Code Button (Point 7: Transparent, primary-RGB themed border and text, hover fills with theme color and shifts text to black) */}
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group/btn flex items-center gap-2 px-6 py-3.5 rounded-full bg-transparent text-primary hover:text-black hover:bg-primary transition-all duration-300 border border-primary/40 font-mono text-xs uppercase tracking-widest font-bold"
          >
            <Github className="w-3.5 h-3.5" /> Code
          </a>
        </div>
      </div>
    </motion.div>
  )
}

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
          <ProjectCard key={project.title} project={project} idx={idx} />
        ))}
      </div>
    </section>
  )
}
