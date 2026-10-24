"use client"

import React, { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { 
  ArrowRight, 
  Download, 
  Github, 
  Linkedin, 
  Sparkles, 
  Cpu, 
  Layers, 
  FileText, 
  ChevronDown, 
  Twitter, 
  Mail, 
  Zap, 
  Terminal,
  ExternalLink
} from 'lucide-react'
import { downloadResume, ResumeFocus } from '@/lib/downloadResume'
import LeetCodeIcon from '../LeetCodeIcon'
import { useThemeStore } from '@/store/useThemeStore'
import { useRecruiterStore } from '@/store/useRecruiterStore'
import { playPopover, playAmbientPad, playTick } from '@/lib/sounds'
import HeroPortraitAsset from '../HeroPortraitAsset'

const TYPING_TITLES = [
  "Autonomous Multi-Agent Systems & Evaluation",
  "Production RAG Architectures & Vector Search",
  "High-Performance Full-Stack & Systems Engineering",
  "Distributed Cloud Infrastructure & Microservices"
]

export default function Hero() {
  const [showThemes, setShowThemes] = useState(false)
  const [selectedFocus, setSelectedFocus] = useState<ResumeFocus>('ai')
  const themeSelectorRef = useRef<HTMLDivElement>(null)
  const currentTheme = useThemeStore((state) => state.theme)
  const openRecruiterView = useRecruiterStore((state) => state.openRecruiterView)

  // Typewriter effect state
  const [titleIndex, setTitleIndex] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  // Real data state fetched from APIs
  const [realStats, setRealStats] = useState({
    aiProjects: '12+',
    leetCodeSolved: '472+',
    githubContribs: '500+',
    certifications: '15+',
  })

  useEffect(() => {
    let isMounted = true
    // Fetch real LeetCode stats
    fetch('/api/leetcode')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (isMounted && data && typeof data.solvedTotal === 'number' && data.solvedTotal > 0) {
          setRealStats((prev) => ({
            ...prev,
            leetCodeSolved: `${data.solvedTotal}+`,
          }))
        }
      })
      .catch(() => {})

    // Fetch real GitHub stats
    fetch('/api/github')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (isMounted && data) {
          if (typeof data.totalContributions === 'number' && data.totalContributions > 0) {
            setRealStats((prev) => ({
              ...prev,
              githubContribs: `${data.totalContributions}+`,
            }))
          }
        }
      })
      .catch(() => {})

    return () => {
      isMounted = false
    }
  }, [])

  useEffect(() => {
    const targetTitle = TYPING_TITLES[titleIndex]
    const typingSpeed = isDeleting ? 25 : 55

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setCurrentText(targetTitle.substring(0, currentText.length + 1))
        if (currentText.length === targetTitle.length) {
          setTimeout(() => setIsDeleting(true), 2400)
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

  const handleSmoothScroll = (targetId: string) => {
    playTick()
    const target = document.getElementById(targetId)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const socialLinks = [
    {
      name: 'GitHub',
      href: 'https://github.com/DhruvPatil123',
      icon: <Github className="w-4 h-4" />,
      label: 'GitHub Repositories'
    },
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/in/dhruv-patil-3816043b7/',
      icon: <Linkedin className="w-4 h-4" />,
      label: 'LinkedIn Profile'
    },
    {
      name: 'LeetCode',
      href: 'https://leetcode.com/u/patildhruv942/',
      icon: <LeetCodeIcon className="w-4 h-4 text-white" />,
      label: '472+ LeetCode Solutions'
    },
    {
      name: 'Twitter',
      href: 'https://twitter.com',
      icon: <Twitter className="w-4 h-4" />,
      label: 'Engineering Log'
    },
    {
      name: 'Email',
      href: 'mailto:patildhruv942@gmail.com',
      icon: <Mail className="w-4 h-4" />,
      label: 'Direct Inquiry'
    }
  ]

  const navAnchors = [
    { id: 'about', label: 'About', number: '01' },
    { id: 'featured-project', label: 'Showcase', number: '02' },
    { id: 'work', label: 'Projects', number: '03' },
    { id: 'credentials', label: 'Credentials', number: '04' },
    { id: 'contact', label: 'Contact', number: '05' },
  ]

  return (
    <section 
      id="hero" 
      className="relative w-full min-h-screen flex items-center justify-center p-2.5 xs:p-3 sm:p-5 md:p-6 lg:p-8 select-none overflow-hidden"
    >
      {/* 
        ======================================================================
        THE FRAMED EDITORIAL POSTER (Pure Monochrome Reference Design)
        Inspired directly by the high-contrast Alex Graham reference poster.
        Clean geometry, crisp hairline border, zero neon/cyan color gradients.
        ======================================================================
      */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-[1440px] min-h-[92vh] sm:min-h-[94vh] rounded-[24px] xs:rounded-[28px] sm:rounded-[36px] border border-white/15 bg-[#0a0b0e] shadow-[0_30px_90px_rgba(0,0,0,0.95)] overflow-hidden flex flex-col justify-between p-4 xs:p-6 sm:p-8 md:p-10 lg:p-12 transition-all duration-700"
      >
        {/* Subtle Frame Corner Markers */}
        <div className="absolute top-4 left-4 font-mono text-[9px] text-zinc-600 pointer-events-none">+</div>
        <div className="absolute top-4 right-4 font-mono text-[9px] text-zinc-600 pointer-events-none">+</div>
        <div className="absolute bottom-4 left-4 font-mono text-[9px] text-zinc-600 pointer-events-none">+</div>
        <div className="absolute bottom-4 right-4 font-mono text-[9px] text-zinc-600 pointer-events-none">+</div>

        {/* 
          --------------------------------------------------------------------
          TOP ROW: In-Frame Editorial Header & Navigation
          --------------------------------------------------------------------
        */}
        <div className="relative z-30 w-full flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4 sm:pb-6">
          {/* Brand Wordmark (Single clean typography line, matching reference) */}
          <div className="flex items-center gap-3">
            <span className="font-sans text-xs sm:text-sm font-semibold tracking-tight text-white flex items-center gap-2">
              <span className="text-zinc-500 font-normal">©</span>
              <span className="font-bold tracking-normal">Dhruv Patil</span>
              <span className="text-zinc-600">/</span>
              <span className="text-zinc-400 font-normal text-xs">AI Systems & Architecture</span>
            </span>
          </div>

          {/* Desktop Center Editorial Nav Links */}
          <nav className="hidden lg:flex items-center gap-7 font-mono text-xs text-zinc-400">
            {navAnchors.map((anchor) => (
              <button
                key={anchor.id}
                onClick={() => handleSmoothScroll(anchor.id)}
                className="group flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
              >
                <span className="text-[10px] text-zinc-600 group-hover:text-zinc-300 transition-colors">
                  {anchor.number}
                </span>
                <span className="tracking-wider uppercase">{anchor.label}</span>
              </button>
            ))}
          </nav>

          {/* Right Direct CTAs: Recruiter View & Resume */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Recruiter Fast View Button (Clean monochrome styling) */}
            <button
              onClick={() => {
                playPopover()
                openRecruiterView()
              }}
              className="px-3.5 sm:px-4 py-1.5 rounded-lg bg-white/10 hover:bg-white text-zinc-200 hover:text-black border border-white/15 hover:border-white font-mono text-[11px] uppercase tracking-wider font-semibold transition-all duration-300 active:scale-95 flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <Zap className="w-3.5 h-3.5 text-zinc-300 group-hover:text-black" />
              <span>30s Recruiter View</span>
            </button>

            {/* Quick CV Download */}
            <button
              onClick={() => {
                playPopover()
                downloadResume('charcoal', 'ai')
              }}
              className="px-3 sm:px-3.5 py-1.5 rounded-lg bg-transparent hover:bg-white/10 text-zinc-300 hover:text-white border border-white/15 font-mono text-[11px] uppercase tracking-wider transition-all duration-300 active:scale-95 flex items-center gap-1.5 cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-zinc-400" />
              <span>CV [PDF]</span>
            </button>
          </div>
        </div>

        {/* 
          --------------------------------------------------------------------
          CENTER CANVAS: Massive Editorial Typography & Monochrome Portrait
          Recreating the Alex Graham poster layout:
          "DHRUV" on the left, "PATIL" on the right, with the subject in center,
          and knockout typography where text intersects dark cloth.
          --------------------------------------------------------------------
        */}
        <div className="relative z-10 my-auto w-full py-6 sm:py-8 lg:py-12 flex flex-col items-center justify-center min-h-[460px] sm:min-h-[520px] lg:min-h-[580px]">
          
          {/* Layer 1: Background Giant Editorial Headline ("DHRUV PATIL") */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none z-0">
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.1 }}
              className="w-full text-center"
            >
              <h1 className="w-full font-sans font-black uppercase tracking-[-0.05em] leading-[0.84] text-white/[0.18] sm:text-white/[0.22] text-[15vw] sm:text-[13vw] lg:text-[12vw] whitespace-nowrap">
                DHRUV PATIL
              </h1>
            </motion.div>
          </div>

          {/* Layer 2: Centerpiece Monochrome Engineer Portrait Cutout */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full flex items-center justify-center"
          >
            <HeroPortraitAsset className="scale-95 sm:scale-100 lg:scale-105" />
          </motion.div>

          {/* Layer 3: Foreground High-Contrast Knockout Text (Recreating the "G" in the Alex Graham reference) */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-20 mix-blend-screen opacity-90 hidden sm:flex">
            <h2 className="w-full text-center font-sans font-black uppercase tracking-[-0.05em] leading-[0.84] text-white/30 text-[15vw] sm:text-[13vw] lg:text-[12vw] whitespace-nowrap">
              DHRUV PATIL
            </h2>
          </div>

          {/* Dynamic Floating Subtitle Typing Terminal Banner */}
          <motion.div 
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="relative z-30 mt-4 sm:mt-6 font-mono max-w-xl w-full px-3 text-center"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.8)] backdrop-blur-md">
              <Terminal className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
              <p className="text-xs sm:text-sm text-zinc-200 font-medium tracking-wide">
                <span>{currentText}</span>
                <span className="inline-block w-1.5 h-3.5 ml-1 bg-white animate-pulse align-middle" />
              </p>
            </div>
          </motion.div>
        </div>

        {/* 
          --------------------------------------------------------------------
          BOTTOM ROW: Left Vertical Socials, Center Metrics, Right Editorial Titles
          --------------------------------------------------------------------
        */}
        <div className="relative z-30 w-full pt-4 sm:pt-6 border-t border-white/10 flex flex-col md:flex-row items-center md:items-end justify-between gap-6">
          
          {/* BOTTOM LEFT: Vertical Social Icons Rail (Exactly like reference left rail) */}
          <div className="flex items-center md:items-start gap-4">
            <div className="flex md:flex-col items-center gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => playTick()}
                  title={social.label}
                  className="p-2 rounded-lg bg-white/[0.04] hover:bg-white/15 text-zinc-400 hover:text-white border border-white/10 hover:border-white/30 transition-all duration-200 active:scale-95 flex items-center justify-center cursor-pointer"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>

            <div className="hidden lg:block border-l border-white/10 pl-3 py-1 font-mono text-[9px] uppercase tracking-widest text-zinc-500 leading-relaxed">
              <span>LOCATION: PUNE, INDIA</span>
              <br />
              <span className="text-zinc-400">STACK: AI & DISTRIBUTED SYSTEMS</span>
            </div>
          </div>

          {/* BOTTOM CENTER: Live Credibility Stats Strip & Role Customizer */}
          <div className="flex flex-col items-center gap-3 w-full max-w-md">
            {/* Quick Live Numbers Dock (Monochrome) */}
            <div className="grid grid-cols-4 gap-2 w-full p-2 rounded-xl bg-zinc-950/80 border border-white/10 backdrop-blur-xl">
              <div className="text-center p-1.5 rounded-lg bg-white/[0.02] border border-white/5">
                <span className="block text-base sm:text-lg font-mono font-bold tabular-nums text-white">
                  {realStats.aiProjects}
                </span>
                <span className="block text-[8px] sm:text-[9px] font-mono uppercase tracking-wider text-zinc-400">
                  AI Apps
                </span>
              </div>

              <div className="text-center p-1.5 rounded-lg bg-white/[0.02] border border-white/5">
                <span className="block text-base sm:text-lg font-mono font-bold tabular-nums text-white">
                  {realStats.leetCodeSolved}
                </span>
                <span className="block text-[8px] sm:text-[9px] font-mono uppercase tracking-wider text-zinc-400">
                  LeetCode
                </span>
              </div>

              <div className="text-center p-1.5 rounded-lg bg-white/[0.02] border border-white/5">
                <span className="block text-base sm:text-lg font-mono font-bold tabular-nums text-white">
                  {realStats.githubContribs}
                </span>
                <span className="block text-[8px] sm:text-[9px] font-mono uppercase tracking-wider text-zinc-400">
                  GitHub
                </span>
              </div>

              <div className="text-center p-1.5 rounded-lg bg-white/[0.02] border border-white/5">
                <span className="block text-base sm:text-lg font-mono font-bold tabular-nums text-white">
                  {realStats.certifications}
                </span>
                <span className="block text-[8px] sm:text-[9px] font-mono uppercase tracking-wider text-zinc-400">
                  Certs
                </span>
              </div>
            </div>

            {/* Resume Role Customizer Trigger */}
            <div className="relative" ref={themeSelectorRef}>
              <button
                onClick={() => {
                  setShowThemes(!showThemes)
                  playPopover()
                }}
                className="group text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-400 hover:text-white transition-colors duration-300 cursor-pointer flex items-center gap-1.5"
              >
                <Download className="w-3 h-3 text-zinc-500 group-hover:text-white transition-colors" />
                <span>Customize Target Resume Track</span>
              </button>

              <AnimatePresence>
                {showThemes && (
                  <motion.div
                    initial={{ opacity: 0, y: 12, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 12, scale: 0.98 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="absolute z-50 bottom-full mb-3 left-1/2 -translate-x-1/2 w-80 bg-zinc-950/95 border border-white/15 rounded-xl p-4 shadow-[0_20px_50px_rgba(0,0,0,0.9)] backdrop-blur-2xl space-y-3 text-left"
                  >
                    <div className="border-b border-white/10 pb-2">
                      <p className="text-white text-xs font-mono uppercase tracking-wider font-bold mb-0.5 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-zinc-300" /> Tailored Resume Track
                      </p>
                      <p className="text-zinc-400 text-[10px] font-mono">Select target role focus prior to generating dynamic PDF.</p>
                    </div>

                    <div className="space-y-1.5">
                      <button
                        onClick={() => { playTick(); setSelectedFocus('ai'); }}
                        className={`w-full p-2.5 rounded-lg text-left border transition-all cursor-pointer flex items-center gap-2.5 ${
                          selectedFocus === 'ai'
                            ? 'bg-white/10 border-white text-white'
                            : 'bg-white/[0.02] border-white/10 text-zinc-400 hover:text-white hover:border-white/20'
                        }`}
                      >
                        <Cpu className={`w-4 h-4 shrink-0 ${selectedFocus === 'ai' ? 'text-white' : 'text-zinc-500'}`} />
                        <div>
                          <p className="text-xs font-bold font-mono text-zinc-200">AI Engineering & LLMs</p>
                          <p className="text-[9px] text-zinc-400 font-mono">Agentic AI, RAG, PyTorch, Gemini</p>
                        </div>
                      </button>

                      <button
                        onClick={() => { playTick(); setSelectedFocus('fullstack'); }}
                        className={`w-full p-2.5 rounded-lg text-left border transition-all cursor-pointer flex items-center gap-2.5 ${
                          selectedFocus === 'fullstack'
                            ? 'bg-white/10 border-white text-white'
                            : 'bg-white/[0.02] border-white/10 text-zinc-400 hover:text-white hover:border-white/20'
                        }`}
                      >
                        <Layers className={`w-4 h-4 shrink-0 ${selectedFocus === 'fullstack' ? 'text-white' : 'text-zinc-500'}`} />
                        <div>
                          <p className="text-xs font-bold font-mono text-zinc-200">Full-Stack & Cloud Architecture</p>
                          <p className="text-[9px] text-zinc-400 font-mono">Next.js 15, PostgreSQL, Docker, APIs</p>
                        </div>
                      </button>
                    </div>

                    <button
                      onClick={() => {
                        playAmbientPad()
                        downloadResume(currentTheme, selectedFocus)
                        setShowThemes(false)
                      }}
                      className="w-full py-2.5 px-4 rounded-lg bg-white hover:bg-zinc-200 text-black font-mono font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                    >
                      <Download className="w-3.5 h-3.5" /> Download Tailored PDF
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* BOTTOM RIGHT: Editorial Identity Titles (Matching reference "Web Designer / Art Director") */}
          <div className="text-center md:text-right space-y-1">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-light text-zinc-400 leading-tight tracking-tight">
              AI Engineer
            </h2>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-white leading-tight tracking-tight">
              Systems Architect
            </h3>
            <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-zinc-400 pt-0.5">
              LLMs · Autonomous Agents · Cloud Systems
            </p>
          </div>
        </div>

        {/* Floating Minimal Scroll Down Anchor at very bottom */}
        <div className="w-full flex justify-center pt-2">
          <button
            onClick={() => handleSmoothScroll('about')}
            className="flex items-center gap-1.5 text-zinc-500 hover:text-white transition-colors font-mono text-[9px] uppercase tracking-[0.25em] cursor-pointer"
            aria-label="Scroll to content"
          >
            <span>Scroll</span>
            <ChevronDown className="w-3.5 h-3.5 text-zinc-400 animate-bounce" />
          </button>
        </div>
      </motion.div>
    </section>
  )
}
