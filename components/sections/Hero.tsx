"use client"

import React, { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Download, Github, Linkedin, Sparkles, Cpu, Layers, FileText, ChevronDown } from 'lucide-react'
import { downloadResume, ResumeFocus } from '@/lib/downloadResume'
import LeetCodeIcon from '../LeetCodeIcon'
import { useThemeStore } from '@/store/useThemeStore'
import { useRecruiterStore } from '@/store/useRecruiterStore'
import { playPopover, playAmbientPad, playTick } from '@/lib/sounds'

const TYPING_TITLES = [
  "AI Engineer",
  "Full Stack Developer",
  "LLM Builder",
  "Open Source Contributor"
]

export default function Hero() {
  const [showThemes, setShowThemes] = useState(false)
  const [selectedFocus, setSelectedFocus] = useState<ResumeFocus>('ai')
  const themeSelectorRef = useRef<HTMLDivElement>(null)
  const currentTheme = useThemeStore((state) => state.theme)
  const setTheme = useThemeStore((state) => state.setTheme)

  // Typewriter effect state
  const [titleIndex, setTitleIndex] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const targetTitle = TYPING_TITLES[titleIndex]
    const typingSpeed = isDeleting ? 40 : 80

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setCurrentText(targetTitle.substring(0, currentText.length + 1))
        if (currentText.length === targetTitle.length) {
          setTimeout(() => setIsDeleting(true), 1800)
        }
      } else {
        setCurrentText(targetTitle.substring(0, currentText.length - 1))
        if (currentText.length === 0) {
          setIsDeleting(false)
          setTitleIndex((prev) => (prev + 1) % TYPING_TITLES.length)
        }
      }
    }, typingSpeed)

    return () => clearTimeout(timer)
  }, [currentText, isDeleting, titleIndex])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (themeSelectorRef.current && !themeSelectorRef.current.contains(event.target as Node)) {
        setShowThemes(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <section 
      id="hero" 
      className="relative w-full min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-20 text-center select-none overflow-hidden"
    >
      {/* Background Neural / Grid Glow Scrim */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,242,255,0.08)_0%,rgba(5,5,5,0)_70%)] pointer-events-none" />

      <div className="hero-content max-w-5xl w-full flex flex-col items-center justify-center space-y-8 md:space-y-10 relative z-10 my-auto">
        
        {/* 1. AI Engineer Glowing Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-500/40 text-cyan-300 shadow-[0_0_20px_rgba(0,242,255,0.25)] backdrop-blur-md"
        >
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span className="font-mono text-xs uppercase tracking-widest font-bold">
            AI Engineer & Full Stack Developer
          </span>
        </motion.div>

        {/* 2. Hero Title: Dhruv Patil */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="space-y-3"
        >
          <h1 className="text-4xl xs:text-5xl sm:text-7xl md:text-8xl lg:text-[100px] font-display font-light tracking-tight text-white leading-[1.0] drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]">
            <span className="text-white italic font-serif">Dhruv</span>{" "}
            <span className="font-semibold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-primary to-blue-400">
              Patil
            </span>
          </h1>

          {/* 3. Typing Animation Subtitle */}
          <div className="h-10 sm:h-12 flex items-center justify-center">
            <p className="font-mono text-lg sm:text-2xl md:text-3xl text-cyan-300 font-extrabold tracking-wider">
              {currentText}
              <span className="inline-block w-2.5 h-6 ml-1 bg-cyan-400 animate-pulse align-middle" />
            </p>
          </div>
        </motion.div>

        {/* 4. Short Description */}
        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-gray-200 font-sans text-base sm:text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed tracking-wide text-balance"
        >
          Building Intelligent Software Powered by AI & LLMs. <br className="hidden sm:inline" />
          I build AI applications, RAG systems, automation tools, and scalable web platforms.
        </motion.p>

        {/* 5. Main Buttons & Actions */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col items-center gap-5 w-full max-w-xl"
        >
          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 w-full">
            {/* View Projects */}
            <a
              href="#work"
              className="group active-tactile px-7 py-3.5 rounded-full font-mono text-xs uppercase tracking-widest font-bold bg-primary text-black hover:bg-white transition-all duration-300 shadow-[0_0_25px_rgba(0,242,255,0.4)] hover:shadow-[0_0_35px_rgba(255,255,255,0.6)] hover:scale-105 flex items-center gap-2 cursor-pointer"
            >
              <span>View Projects</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/DhruvPatil123"
              target="_blank"
              rel="noreferrer"
              className="group active-tactile px-5 py-3.5 rounded-full font-mono text-xs uppercase tracking-wider font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/15 hover:border-white/30 transition-all duration-300 hover:scale-105 flex items-center gap-2 cursor-pointer shadow-lg hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/dhruv-patil-3816043b7/"
              target="_blank"
              rel="noreferrer"
              className="group active-tactile px-5 py-3.5 rounded-full font-mono text-xs uppercase tracking-wider font-semibold bg-blue-950/60 hover:bg-blue-600 text-blue-200 hover:text-white border border-blue-500/40 hover:border-blue-400 transition-all duration-300 hover:scale-105 flex items-center gap-2 cursor-pointer shadow-lg hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]"
            >
              <Linkedin className="w-4 h-4" />
              <span>LinkedIn</span>
            </a>

            {/* Resume PDF Download */}
            <button
              onClick={() => {
                playPopover()
                downloadResume('charcoal', 'ai')
              }}
              className="group active-tactile px-5 py-3.5 rounded-full font-mono text-xs uppercase tracking-wider font-semibold bg-cyan-950/60 hover:bg-cyan-500/20 text-cyan-300 hover:text-white border border-cyan-500/40 hover:border-cyan-400 transition-all duration-300 hover:scale-105 flex items-center gap-2 cursor-pointer shadow-lg hover:shadow-[0_0_20px_rgba(0,242,255,0.3)]"
            >
              <FileText className="w-4 h-4 text-cyan-400" />
              <span>Resume</span>
            </button>
          </div>

          {/* 30s Recruiter Mode Banner Button */}
          <div className="pt-1">
            <button
              onClick={() => {
                playPopover()
                useRecruiterStore.getState().openRecruiterView()
              }}
              className="group px-6 py-2.5 rounded-full bg-gradient-to-r from-cyan-950 via-slate-900 to-indigo-950 border border-cyan-500/50 hover:border-cyan-400 text-cyan-300 font-mono text-xs uppercase tracking-wider font-bold flex items-center gap-2 shadow-[0_0_20px_rgba(0,242,255,0.2)] hover:shadow-[0_0_30px_rgba(0,242,255,0.4)] transition-all duration-300 hover:scale-105 cursor-pointer"
            >
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>⚡ Open 30-Second Recruiter Fast Summary</span>
            </button>
          </div>

          {/* Tailored Resume Focus & Theme Picker Popover */}
          <div className="relative pt-1" ref={themeSelectorRef}>
            <button
              onClick={() => {
                setShowThemes(!showThemes)
                playPopover()
              }}
              className="group text-[11px] font-mono uppercase tracking-widest text-zinc-400 hover:text-cyan-300 transition-colors duration-300 cursor-pointer flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5 text-zinc-500 group-hover:text-cyan-400 transition-colors" />
              <span>Customize Resume Role Focus / Palette Theme</span>
            </button>

            <AnimatePresence>
              {showThemes && (
                <motion.div
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 15, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className="absolute z-50 mt-3 left-1/2 -translate-x-1/2 w-80 glass-effect border border-white/15 rounded-2xl p-4 shadow-[0_10px_40px_rgba(0,0,0,0.8)] backdrop-blur-2xl space-y-3.5 text-left bg-black/90"
                >
                  <div>
                    <p className="text-white text-xs font-mono uppercase tracking-wider font-bold mb-0.5 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> Tailored Resume Builder
                    </p>
                    <p className="text-zinc-400 text-[10px] leading-relaxed">Select specialized role focus before downloading PDF.</p>
                  </div>

                  <div className="space-y-1.5 pt-1">
                    <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-400 font-bold block">1. Focus Area:</span>
                    <div className="grid grid-cols-1 gap-1">
                      <button
                        onClick={() => { playTick(); setSelectedFocus('ai'); }}
                        className={`p-2 rounded-xl text-left border transition-all cursor-pointer flex items-center gap-2.5 ${
                          selectedFocus === 'ai'
                            ? 'bg-primary/20 border-cyan-400 text-white shadow-[0_0_12px_rgba(0,242,255,0.2)]'
                            : 'bg-white/5 border-white/5 text-zinc-400 hover:text-white'
                        }`}
                      >
                        <Cpu className={`w-4 h-4 shrink-0 ${selectedFocus === 'ai' ? 'text-cyan-400' : 'text-zinc-500'}`} />
                        <div>
                          <p className="text-xs font-semibold font-sans">AI Engineering & LLMs</p>
                          <p className="text-[9px] text-zinc-400 font-mono">Agentic AI, RAG, PyTorch, Gemini</p>
                        </div>
                      </button>

                      <button
                        onClick={() => { playTick(); setSelectedFocus('fullstack'); }}
                        className={`p-2 rounded-xl text-left border transition-all cursor-pointer flex items-center gap-2.5 ${
                          selectedFocus === 'fullstack'
                            ? 'bg-emerald-500/20 border-emerald-400 text-white shadow-[0_0_12px_rgba(16,185,129,0.2)]'
                            : 'bg-white/5 border-white/5 text-zinc-400 hover:text-white'
                        }`}
                      >
                        <Layers className={`w-4 h-4 shrink-0 ${selectedFocus === 'fullstack' ? 'text-emerald-400' : 'text-zinc-500'}`} />
                        <div>
                          <p className="text-xs font-semibold font-sans">Full-Stack & Cloud Architecture</p>
                          <p className="text-[9px] text-zinc-400 font-mono">Next.js 15, PostgreSQL, Docker, APIs</p>
                        </div>
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      playAmbientPad()
                      downloadResume(currentTheme, selectedFocus)
                      setShowThemes(false)
                    }}
                    className="w-full py-2.5 px-4 rounded-xl bg-cyan-400 text-black font-mono font-bold text-xs uppercase tracking-wider hover:bg-white transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <Download className="w-3.5 h-3.5" /> Download Tailored PDF
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* 6. Scroll Indicator */}
      <motion.a
        href="#about"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ 
          opacity: { duration: 1, delay: 0.8 },
          y: { duration: 2, repeat: Infinity, ease: 'easeInOut' } 
        }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-zinc-400 hover:text-cyan-300 transition-colors cursor-pointer group z-20"
        aria-label="Scroll to About section"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] font-semibold text-zinc-400 group-hover:text-cyan-300">
          Scroll Down
        </span>
        <ChevronDown className="w-5 h-5 text-cyan-400 group-hover:scale-125 transition-transform" />
      </motion.a>
    </section>
  )
}


