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
  ExternalLink,
  Menu
} from 'lucide-react'
import { downloadResume, ResumeFocus } from '@/lib/downloadResume'
import LeetCodeIcon from '../LeetCodeIcon'
import { useThemeStore } from '@/store/useThemeStore'
import { useRecruiterStore } from '@/store/useRecruiterStore'
import { useArtStyleStore, ART_PRESETS } from '@/store/useArtStyleStore'
import { playPopover, playAmbientPad, playTick } from '@/lib/sounds'
import HeroPortraitAsset from '../HeroPortraitAsset'
import EditorialBadge from '@/components/typography/EditorialBadge'

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

  const activeArtPreset = useArtStyleStore((state) => state.activePreset)
  const toggleArtDock = useArtStyleStore((state) => state.toggleDock)
  const artPresetInfo = ART_PRESETS[activeArtPreset]

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
    { id: 'art-lab', label: 'Art Lab', number: '04' },
    { id: 'credentials', label: 'Credentials', number: '05' },
    { id: 'contact', label: 'Contact', number: '06' },
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
        className="relative w-full max-w-[1440px] min-h-[92vh] sm:min-h-[94vh] rounded-[24px] xs:rounded-[28px] sm:rounded-[36px] border border-white/10 bg-black shadow-[0_30px_100px_rgba(0,0,0,1)] overflow-hidden flex flex-col justify-between p-4 xs:p-6 sm:p-8 md:p-10 lg:p-12 transition-all duration-700"
      >
        {/* Deep Royal Amethyst and Electric Cyan Ambient Bioluminescent Auras */}
        <div className="absolute -top-32 right-1/4 w-[550px] h-[550px] bg-purple-900/25 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 -right-24 w-[420px] h-[420px] bg-fuchsia-950/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-32 left-1/3 w-[500px] h-[500px] bg-cyan-950/20 rounded-full blur-[120px] pointer-events-none" />

        {/* Subtle Frame Corner Markers */}
        <div className="absolute top-4 left-4 font-mono text-[9px] text-zinc-600 pointer-events-none">+</div>
        <div className="absolute top-4 right-4 font-mono text-[9px] text-zinc-600 pointer-events-none">+</div>
        <div className="absolute bottom-4 left-4 font-mono text-[9px] text-zinc-600 pointer-events-none">+</div>
        <div className="absolute bottom-4 right-4 font-mono text-[9px] text-zinc-600 pointer-events-none">+</div>

        {/* 
          --------------------------------------------------------------------
          TOP ROW: High-Fashion Minimalist Bar
          Matching the reference top navigation:
          ☰ Menu  |  HOME · ABOUT · EXPERIENCE · RESEARCH · CONTACT  |  Actions
          --------------------------------------------------------------------
        */}
        <div className="relative z-30 w-full flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4 sm:pb-6">
          {/* Brand Wordmark & Menu Trigger */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleSmoothScroll('about')}
              title="Menu Navigation"
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-colors cursor-pointer"
            >
              <Menu className="w-4 h-4 text-white" />
            </button>
            <span className="font-sans text-xs sm:text-sm font-semibold tracking-tight text-white flex items-center gap-2">
              <span className="text-zinc-500 font-normal">©</span>
              <span className="font-bold tracking-normal">Dhruv Patil</span>
              <span className="text-zinc-600 hidden sm:inline">/</span>
              <span className="text-zinc-400 font-normal text-xs hidden sm:inline">AI Systems & Architecture</span>
            </span>
          </div>

          {/* Desktop Center Editorial Nav Links with Cyan Indicator */}
          <nav className="hidden lg:flex items-center gap-7 font-mono text-[11px] uppercase tracking-[0.22em] text-zinc-400">
            {[
              { id: 'hero', label: 'Home' },
              { id: 'about', label: 'About' },
              { id: 'skills', label: 'Experience' },
              { id: 'work', label: 'Projects' },
              { id: 'art-lab', label: 'Journal' },
              { id: 'contact', label: 'Contact' },
            ].map((item, i) => (
              <button
                key={item.id}
                onClick={() => handleSmoothScroll(item.id)}
                className="relative group py-1 hover:text-white transition-colors cursor-pointer"
              >
                <span>{item.label}</span>
                {i === 0 && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-cyan-400 shadow-[0_0_8px_#00f0ff]" />
                )}
              </button>
            ))}
          </nav>

          {/* Right Direct CTAs: 3D Art Mode, Recruiter View & Resume */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* 3D Generative Sculpture Preset Button */}
            <button
              onClick={() => {
                playPopover()
                toggleArtDock()
              }}
              title="Switch 3D Generative Sculpture Modes"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-950/40 hover:bg-purple-900/60 text-purple-200 hover:text-white border border-purple-500/30 hover:border-purple-400/60 font-mono text-[11px] uppercase tracking-wider transition-all duration-300 active:scale-95 cursor-pointer shadow-[0_0_15px_rgba(168,85,247,0.15)]"
            >
              <span className="text-sm">{artPresetInfo.icon}</span>
              <span className="hidden sm:inline font-bold text-white">{artPresetInfo.name}</span>
              <span className="sm:hidden font-bold text-white">3D</span>
            </button>

            {/* Recruiter Fast View Button */}
            <button
              onClick={() => {
                playPopover()
                openRecruiterView()
              }}
              className="px-3.5 sm:px-4 py-1.5 rounded-lg bg-white/10 hover:bg-white text-zinc-200 hover:text-black border border-white/15 hover:border-white font-mono text-[11px] uppercase tracking-wider font-semibold transition-all duration-300 active:scale-95 flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <Zap className="w-3.5 h-3.5 text-zinc-300 group-hover:text-black" />
              <span>30s View</span>
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
          MAIN CENTER: Direct Reference Translation
          Left: "A Deeper Kind of Intelligence" + Celestial Star & Outlined CTA
          Right: 3D Bioluminescent Centerpiece + Vertical Right Rail
          --------------------------------------------------------------------
        */}
        <div className="relative z-10 my-auto w-full py-8 sm:py-10 lg:py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* LEFT COLUMN (Col Span 7): High-Fashion Serif & Circular Explore CTA */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            
            {/* Category Kicker with 4-Point Star */}
            <div className="flex items-center gap-2.5 font-mono text-[10px] sm:text-xs uppercase tracking-[0.25em] text-zinc-400">
              <span className="text-purple-400 animate-pulse">✦</span>
              <span>A Space for Bolder Perspectives</span>
            </div>

            {/* Majestic Headline (Exact match to "A Deeper Kind of Beauty") */}
            <div className="relative">
              {/* Celestial decorative ring & crosshairs */}
              <div className="absolute -top-12 -left-8 w-44 h-44 rounded-full border border-cyan-400/20 pointer-events-none hidden sm:block" />
              <div className="absolute top-2 left-32 text-cyan-300 font-serif text-lg pointer-events-none animate-pulse">✦</div>
              <div className="absolute top-1/2 -right-4 text-purple-400 font-serif text-sm pointer-events-none">✦</div>

              <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] tracking-tight leading-[0.92] text-white select-none">
                <span className="font-light tracking-normal block text-white">
                  A Deeper
                </span>
                <span className="italic font-serif font-normal text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-purple-400 to-cyan-300">
                  Kind{" "}
                </span>
                <span className="italic font-serif text-3xl sm:text-4xl md:text-5xl text-zinc-400 font-light">
                  of{" "}
                </span>
                <span className="font-medium tracking-tight text-white block">
                  Intelligence
                </span>
              </h1>
            </div>

            {/* Sub-prose */}
            <p className="text-xs sm:text-sm font-sans uppercase tracking-[0.18em] text-zinc-400 max-w-lg leading-relaxed">
              Autonomous Multi-Agent Architectures, Generative Latent Spaces, and High-Performance Cloud Systems that reveal more than what meets the eye.
            </p>

            {/* Dynamic Typewriter Telemetry Feed */}
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-300/90 pt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span>{currentText}</span>
            </div>

            {/* Circular CTA with Trailing Arrow (Exact match to reference [EXPLORE] ───→) */}
            <div className="pt-4 flex items-center gap-6 sm:gap-8">
              <button
                onClick={() => {
                  playTick()
                  handleSmoothScroll('work')
                }}
                className="relative group w-24 h-24 sm:w-28 sm:h-28 rounded-full border border-cyan-400/50 hover:border-cyan-400 bg-black/80 hover:bg-cyan-950/40 text-white font-mono text-[11px] uppercase tracking-widest flex items-center justify-center transition-all duration-500 shadow-[0_0_25px_rgba(0,240,255,0.18)] hover:shadow-[0_0_40px_rgba(0,240,255,0.4)] cursor-pointer active:scale-95"
              >
                <div className="absolute inset-1 rounded-full border border-white/10 group-hover:border-white/20 transition-colors" />
                <span className="group-hover:scale-105 transition-transform font-bold text-white tracking-widest">
                  EXPLORE
                </span>
              </button>

              {/* Trailing Arrow */}
              <div className="flex items-center gap-1 text-cyan-400 group-hover:text-cyan-300 transition-colors">
                <span className="w-16 sm:w-28 h-[1px] bg-gradient-to-r from-cyan-400 via-cyan-400/60 to-transparent" />
                <ArrowRight className="w-4 h-4 text-cyan-400 shrink-0" />
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN (Col Span 5): Centerpiece Portrait & Vertical Rail */}
          <div className="lg:col-span-5 relative flex items-center justify-center lg:justify-end">
            {/* Ambient Amethyst Velvet Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[420px] h-[340px] sm:h-[420px] rounded-full bg-gradient-to-tr from-purple-950/50 via-purple-700/30 to-cyan-500/20 blur-[60px] pointer-events-none" />

            {/* Engineer Centerpiece Portrait Cutout */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="relative z-10 w-full max-w-[420px] flex items-center justify-center"
            >
              <HeroPortraitAsset className="scale-95 sm:scale-100" />
            </motion.div>

            {/* Far Right Vertical Rail (Direct reference translation: IDEAS / PEOPLE / PLACES / BEAUTY) */}
            <div className="hidden xl:flex flex-col items-center gap-5 text-zinc-500 font-mono text-[9px] tracking-[0.3em] uppercase [writing-mode:vertical-rl] select-none pl-6 border-l border-white/10">
              <span>IDEAS</span>
              <span className="w-1 h-1 rounded-full bg-purple-500/50" />
              <span>SYSTEMS</span>
              <span className="w-1 h-1 rounded-full bg-cyan-400/50" />
              <span>MODELS</span>
              <span className="w-1 h-1 rounded-full bg-purple-500/50" />
              <span>INTELLIGENCE</span>
            </div>
          </div>
        </div>

        {/* 
          --------------------------------------------------------------------
          BOTTOM ROW: 3 Editorial Chapters & Mini Thumbnail (Direct Reference)
          01 ── Curated Stories  |  02 ── Perspectives  |  03 ── Tomorrow  |  [IMG]
          --------------------------------------------------------------------
        */}
        <div className="relative z-30 w-full pt-5 sm:pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-center">
          
          {/* Chapter 01 */}
          <div 
            onClick={() => { playTick(); handleSmoothScroll('skills'); }}
            className="space-y-1 group cursor-pointer"
          >
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="italic font-serif text-purple-400 text-sm">01</span>
              <span className="w-6 h-[1px] bg-white/20 group-hover:w-10 group-hover:bg-cyan-400 transition-all" />
              <span className="font-semibold text-white uppercase tracking-wider text-[11px] group-hover:text-cyan-300 transition-colors">
                Curated Systems
              </span>
            </div>
            <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest pl-9">
              Autonomous Agents · {realStats.aiProjects} Deployments
            </p>
          </div>

          {/* Chapter 02 */}
          <div 
            onClick={() => { playTick(); handleSmoothScroll('work'); }}
            className="space-y-1 group cursor-pointer"
          >
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="italic font-serif text-purple-400 text-sm">02</span>
              <span className="w-6 h-[1px] bg-white/20 group-hover:w-10 group-hover:bg-cyan-400 transition-all" />
              <span className="font-semibold text-white uppercase tracking-wider text-[11px] group-hover:text-cyan-300 transition-colors">
                Latent Perspectives
              </span>
            </div>
            <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest pl-9">
              Multimodal RAG · {realStats.leetCodeSolved} Algorithms
            </p>
          </div>

          {/* Chapter 03 */}
          <div 
            onClick={() => { playTick(); handleSmoothScroll('art-lab'); }}
            className="space-y-1 group cursor-pointer"
          >
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="italic font-serif text-purple-400 text-sm">03</span>
              <span className="w-6 h-[1px] bg-white/20 group-hover:w-10 group-hover:bg-cyan-400 transition-all" />
              <span className="font-semibold text-white uppercase tracking-wider text-[11px] group-hover:text-cyan-300 transition-colors">
                Computational Art
              </span>
            </div>
            <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest pl-9">
              4K Wallpapers · WebGL Shaders
            </p>
          </div>

          {/* Chapter 04: Interactive Mini Preview Thumbnail Card with Reference Pagination Dots */}
          <div className="flex items-center justify-between sm:justify-end gap-3.5">
            <button
              onClick={() => {
                playPopover()
                toggleArtDock()
              }}
              title="Open 3D Generative Art Presets"
              className="relative rounded-lg overflow-hidden border border-purple-500/40 hover:border-cyan-400/60 p-1 bg-black/90 cursor-pointer group shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all"
            >
              <div className="w-20 h-10 rounded bg-gradient-to-r from-purple-950 via-purple-800 to-cyan-950 flex items-center justify-center relative overflow-hidden">
                <span className="text-xs group-hover:scale-110 transition-transform">{artPresetInfo.icon}</span>
                <div className="absolute inset-0 bg-cyan-400/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </button>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#00f0ff]" />
              <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
              <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
            </div>
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
