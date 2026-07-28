"use client"

import React, { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Download, Github, Twitter, Linkedin, Instagram, Sparkles, Cpu, Layers, FileText } from 'lucide-react'
import { downloadResume, ResumeFocus, ResumeTheme } from '@/lib/downloadResume'
import LeetCodeIcon from '../LeetCodeIcon'
import { useThemeStore } from '@/store/useThemeStore'
import { useRecruiterStore } from '@/store/useRecruiterStore'
import { playPopover, playAmbientPad, playTick } from '@/lib/sounds'

export default function Hero() {
  const [showThemes, setShowThemes] = useState(false)
  const [selectedFocus, setSelectedFocus] = useState<ResumeFocus>('ai')
  const [mounted, setMounted] = useState(false)
  const themeSelectorRef = useRef<HTMLDivElement>(null)
  const currentTheme = useThemeStore((state) => state.theme)
  const setTheme = useThemeStore((state) => state.setTheme)

  const heroRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const badgeRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (themeSelectorRef.current && !themeSelectorRef.current.contains(event.target as Node)) {
        setShowThemes(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    setMounted(true)
    let b: any = null
    let split: any = null
    let ctx: any = null

    async function initAnimations() {
      if (typeof window === 'undefined') return

      try {
        const gsapModule = await import('gsap')
        const gsap: any = gsapModule.default || gsapModule
        const scrollTriggerModule = await import('gsap/ScrollTrigger')
        const ScrollTrigger: any = scrollTriggerModule.ScrollTrigger || scrollTriggerModule.default

        gsap.registerPlugin(ScrollTrigger)

        // 1. Scramble system status badge with baffle
        if (badgeRef.current) {
          try {
            const baffleModule = await import('baffle')
            const baffleFn = baffleModule.default || baffleModule
            if (typeof baffleFn === 'function' && badgeRef.current) {
              b = baffleFn(badgeRef.current, {
                characters: '░▒░ █▓▒░/█▒ <░▒ ▓/░> █▓',
                speed: 80
              })
              b.start()
              b.reveal(1200)
            }
          } catch (e) {
            console.warn('Baffle animation skipped:', e)
          }
        }

        // 2. SplitType text animations for Dhruv Dinesh Patil
        if (titleRef.current) {
          try {
            const splitModule = await import('split-type')
            const SplitTypeClass: any = splitModule.default || splitModule
            if (SplitTypeClass && titleRef.current) {
              split = new SplitTypeClass(titleRef.current, { types: 'chars,words' })
              
              gsap.set(split.chars, { opacity: 0, y: 50, rotateX: -45 })
              
              gsap.to(split.chars, {
                opacity: 1,
                y: 0,
                rotateX: 0,
                stagger: 0.02,
                duration: 1.4,
                ease: 'power4.out',
                delay: 0.1,
                onComplete: () => {
                  if (split) split.revert()
                }
              })
            }
          } catch (e) {
            console.warn('SplitType animation skipped:', e)
          }
        }

        // 3. Apply smooth scroll-triggered parallax fading to Hero content
        ctx = gsap.context(() => {
          gsap.timeline({
            scrollTrigger: {
              trigger: heroRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: true,
            }
          })
          .to(contentRef.current, {
            opacity: 0,
            y: -120,
            scale: 0.95,
            ease: 'none'
          })
        }, heroRef)
      } catch (err) {
        console.warn('Hero GSAP animations skipped:', err)
      }
    }

    initAnimations()

    return () => {
      if (b && typeof b.stop === 'function') b.stop()
      if (split && typeof split.revert === 'function') split.revert()
      if (ctx && typeof ctx.revert === 'function') ctx.revert()
    }
  }, [])

  return (
    <section 
      id="hero" 
      ref={heroRef}
      className="relative w-full h-screen flex flex-col items-center justify-center px-6 text-center select-none overflow-hidden"
      style={{
        background: 'radial-gradient(circle at center, rgba(6, 18, 31, 0.4) 0%, rgba(5, 5, 5, 0) 75%)'
      }}
    >
      <div
        ref={contentRef}
        className="hero-content max-w-4xl flex flex-col items-center justify-center space-y-12 md:space-y-16"
      >
        {/* Title and Tagline Group */}
        <div className="space-y-4 md:space-y-6">
          {/* SECURE TERMINAL STATUS BADGE (Baffle) */}
          <div className="flex items-center justify-center gap-2.5 mb-3 font-mono text-[10px] tracking-[0.4em] uppercase text-primary/95">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shadow-[0_0_10px_rgba(var(--primary-rgb),0.8)]" />
            <span ref={badgeRef} className="opacity-95 tracking-[0.35em]">SYSTEM_COGNITIVE_CORE: ONLINE</span>
          </div>

          {/* Hero Title with Cinematic Gradients & SplitType */}
          <h1 
            ref={titleRef}
            className="text-6xl sm:text-7xl md:text-8xl lg:text-[115px] font-display font-light tracking-wide text-white leading-[1.0] drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-zinc-100 via-zinc-300 to-white italic font-light">
              Dhruv
            </span> <br />
            <span className="font-normal tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-200 to-secondary animate-gradient pr-4">
              Dinesh Patil
            </span>
          </h1>

          {/* Subheading Tagline (Recruiter Suggested Clear Positioning) */}
          <div className="flex flex-col items-center justify-center gap-2 mt-2">
            <p className="font-mono text-sm sm:text-base md:text-lg uppercase tracking-[0.25em] text-secondary font-bold">
              AI Engineer <span className="text-primary/60 mx-1.5">•</span> Full-Stack Developer
            </p>
          </div>
        </div>

        {/* Refined Shorter Paragraph (Recruiter Suggested Goal) */}
        <p className="text-gray-200 font-sans text-lg sm:text-xl md:text-2xl font-light max-w-2xl mx-auto leading-relaxed tracking-wide glow-text-subtle">
          Building AI products that solve real-world problems.
        </p>

        {/* Action Buttons with 30s Recruiter View & Explore Work */}
        <div className="flex flex-col items-center pt-2 gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto">
            {/* Primary CTA: High-end glowing glass capsule */}
            <a
              href="#work"
              className="group active-tactile w-full sm:w-auto bg-primary text-black font-mono text-xs uppercase tracking-widest px-8 py-4 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-white transition-all duration-300 shadow-[0_0_30px_rgba(var(--primary-rgb),0.3)] hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] cursor-pointer"
            >
              Explore Work 
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
            </a>

            {/* 30-Second Recruiter Fast View Button */}
            <button
              onClick={() => {
                playPopover()
                useRecruiterStore.getState().openRecruiterView()
              }}
              className="group active-tactile w-full sm:w-auto bg-cyan-950/60 hover:bg-cyan-500/20 text-cyan-300 hover:text-white font-mono text-xs uppercase tracking-wider px-7 py-4 rounded-full font-bold flex items-center justify-center gap-2 border border-cyan-500/40 hover:border-cyan-400 transition-all duration-300 shadow-[0_0_20px_rgba(0,242,255,0.2)] hover:shadow-[0_0_30px_rgba(0,242,255,0.4)] cursor-pointer"
            >
              <span>⚡ 30s Recruiter View</span>
            </button>
          </div>
          
          {/* Tailored Resume Downloader & Theme Selector */}
          <div className="relative mt-4" ref={themeSelectorRef}>
            <button
              onClick={() => {
                setShowThemes(!showThemes)
                playPopover()
              }}
              className="group text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-400 hover:text-white transition-colors duration-300 cursor-pointer flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5 text-zinc-500 group-hover:text-primary transition-colors" />
              Tailored Resume Generator / Theme Selector
            </button>

            <AnimatePresence>
              {showThemes && (
                <motion.div
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 15, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className="absolute z-50 mt-3 left-1/2 -translate-x-1/2 w-80 glass-effect border border-white/10 rounded-2xl p-4 shadow-[0_10px_40px_rgba(0,0,0,0.7)] backdrop-blur-xl space-y-3.5 text-left"
                >
                  <div>
                    <p className="text-white text-xs font-mono uppercase tracking-wider font-bold mb-0.5 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-primary" /> Tailored Resume Generator
                    </p>
                    <p className="text-zinc-400 text-[10px] leading-relaxed">Select role focus area & visual style before downloading PDF.</p>
                  </div>

                  {/* Focus Area Picker */}
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-400 font-bold block">1. Focus Area:</span>
                    <div className="grid grid-cols-1 gap-1">
                      <button
                        onClick={() => { playTick(); setSelectedFocus('ai'); }}
                        className={`p-2 rounded-xl text-left border transition-all cursor-pointer flex items-center gap-2.5 ${
                          selectedFocus === 'ai'
                            ? 'bg-primary/15 border-primary text-white shadow-[0_0_12px_rgba(0,242,255,0.15)]'
                            : 'bg-white/5 border-white/5 text-zinc-400 hover:text-white'
                        }`}
                      >
                        <Cpu className={`w-4 h-4 shrink-0 ${selectedFocus === 'ai' ? 'text-primary' : 'text-zinc-500'}`} />
                        <div>
                          <p className="text-xs font-semibold font-sans">AI Engineering & LLMs</p>
                          <p className="text-[9px] text-zinc-400 font-mono">Agentic AI, RAG, PyTorch, Gemini</p>
                        </div>
                      </button>

                      <button
                        onClick={() => { playTick(); setSelectedFocus('fullstack'); }}
                        className={`p-2 rounded-xl text-left border transition-all cursor-pointer flex items-center gap-2.5 ${
                          selectedFocus === 'fullstack'
                            ? 'bg-emerald-500/15 border-emerald-500 text-white shadow-[0_0_12px_rgba(16,185,129,0.15)]'
                            : 'bg-white/5 border-white/5 text-zinc-400 hover:text-white'
                        }`}
                      >
                        <Layers className={`w-4 h-4 shrink-0 ${selectedFocus === 'fullstack' ? 'text-emerald-400' : 'text-zinc-500'}`} />
                        <div>
                          <p className="text-xs font-semibold font-sans">Full-Stack & Cloud Architecture</p>
                          <p className="text-[9px] text-zinc-400 font-mono">Next.js 15, PostgreSQL, Docker, APIs</p>
                        </div>
                      </button>

                      <button
                        onClick={() => { playTick(); setSelectedFocus('standard'); }}
                        className={`p-2 rounded-xl text-left border transition-all cursor-pointer flex items-center gap-2.5 ${
                          selectedFocus === 'standard'
                            ? 'bg-amber-500/15 border-amber-500 text-white shadow-[0_0_12px_rgba(245,158,11,0.15)]'
                            : 'bg-white/5 border-white/5 text-zinc-400 hover:text-white'
                        }`}
                      >
                        <FileText className={`w-4 h-4 shrink-0 ${selectedFocus === 'standard' ? 'text-amber-400' : 'text-zinc-500'}`} />
                        <div>
                          <p className="text-xs font-semibold font-sans">Standard Full Resume</p>
                          <p className="text-[9px] text-zinc-400 font-mono">Comprehensive B.Tech general overview</p>
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Theme Selector */}
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-400 font-bold block">2. Palette Theme:</span>
                    <div className="grid grid-cols-3 gap-1.5">
                      <button
                        onClick={() => { playAmbientPad(); setTheme('charcoal'); }}
                        className={`p-1.5 rounded-lg border text-center transition-all cursor-pointer ${
                          currentTheme === 'charcoal' ? 'bg-white/15 border-white text-white font-bold' : 'bg-white/5 border-white/5 text-zinc-400'
                        }`}
                      >
                        <span className="text-[10px] font-mono block">Charcoal</span>
                      </button>
                      <button
                        onClick={() => { playAmbientPad(); setTheme('emerald'); }}
                        className={`p-1.5 rounded-lg border text-center transition-all cursor-pointer ${
                          currentTheme === 'emerald' ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 font-bold' : 'bg-white/5 border-white/5 text-zinc-400'
                        }`}
                      >
                        <span className="text-[10px] font-mono block">Emerald</span>
                      </button>
                      <button
                        onClick={() => { playAmbientPad(); setTheme('cobalt'); }}
                        className={`p-1.5 rounded-lg border text-center transition-all cursor-pointer ${
                          currentTheme === 'cobalt' ? 'bg-blue-500/20 border-blue-400 text-blue-300 font-bold' : 'bg-white/5 border-white/5 text-zinc-400'
                        }`}
                      >
                        <span className="text-[10px] font-mono block">Cobalt</span>
                      </button>
                    </div>
                  </div>

                  {/* Download Action */}
                  <button
                    onClick={() => {
                      playAmbientPad()
                      downloadResume(currentTheme, selectedFocus)
                      setShowThemes(false)
                    }}
                    className="w-full py-2.5 px-4 rounded-xl bg-primary text-black font-mono font-bold text-xs uppercase tracking-wider hover:bg-white transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <Download className="w-3.5 h-3.5" /> Download Tailored PDF
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Minimal Social Icons Dock */}
        <div className="flex gap-4 pt-4">
          {[
            { href: "https://github.com/DhruvPatil123", icon: <Github className="w-4 h-4" />, label: "GitHub" },
            { href: "https://x.com/DhruvPatil_18", icon: <Twitter className="w-4 h-4" />, label: "X" },
            { href: "https://www.instagram.com/_dhruv.exe.18", icon: <Instagram className="w-4 h-4" />, label: "Instagram" },
            { href: "https://www.linkedin.com/in/dhruv-patil-3816043b7/", icon: <Linkedin className="w-4 h-4" />, label: "LinkedIn" },
            { href: "https://leetcode.com/u/Dhruv_Patil_18/", icon: <LeetCodeIcon className="w-4 h-4" />, label: "LeetCode" }
          ].map((soc, i) => (
            <a 
              key={i}
              href={soc.href} 
              target="_blank" 
              rel="noreferrer" 
              aria-label={soc.label}
              className="active-tactile w-9 h-9 flex items-center justify-center rounded-full text-white/50 hover:text-primary hover:bg-primary/5 border border-white/5 hover:border-primary/20 hover:shadow-[0_0_15px_rgba(0,242,255,0.2)] transition-all duration-300"
            >
              {soc.icon}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

