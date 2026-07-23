"use client"

import React from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { useScrollStore } from '@/store/useScrollStore'
import { useBackgroundSettingsStore } from '@/store/useBackgroundSettingsStore'

const SECTION_BACKGROUNDS: { [key: string]: string } = {
  hero: '/renaissance_hero_bg.jpg', // Creation of Adam / Skate & Coffee Renaissance
  about: '/renaissance_ai_masterpiece.jpg', // Renaissance AI Scholar Masterpiece
  skills: '/renaissance_library.jpg', // Agentic / Library Catalog Mona Lisa
  work: '/renaissance_tech.jpg', // Operations / Holographic Globe Renaissance Council
  credentials: '/renaissance_astronomy.jpg', // Celestial Observatory & Golden Armillary Spheres
  achievements: '/renaissance_palazzo.jpg', // Italian Palazzo & Gold Leaf Fresco
  experience: '/renaissance_experience_atelier.jpg', // Leonardo Atelier Workshop & Drafting Blueprints
  testimonials: '/renaissance_testimonials_academy.jpg', // School of Athens Classical Academy
  contact: '/renaissance_contact_desk.jpg', // Renaissance Letter Writing Desk & Wax Seals
}

export default function BackgroundParallax() {
  const activeSection = useScrollStore((state) => state.activeSection)
  const { bgOpacity, contrastLevel, parallaxIntensity } = useBackgroundSettingsStore()
  const { scrollY } = useScroll()
  
  // Create slow continuous floating motions scaled by user-selected parallax intensity
  const yBg = useTransform(scrollY, [0, 1000], [0, -100 * parallaxIntensity])
  const ySkateboard = useTransform(scrollY, [0, 1000], [40 * parallaxIntensity, -120 * parallaxIntensity])
  const yShoppingBag = useTransform(scrollY, [0, 1000], [-60 * parallaxIntensity, 100 * parallaxIntensity])
  const yVial = useTransform(scrollY, [0, 1000], [10 * parallaxIntensity, -160 * parallaxIntensity])
  const opacityHeroElements = useTransform(scrollY, [0, 500], [1, 0])

  const contrastClass = {
    subtle: 'brightness-[1.05] saturate-[1.08] contrast-[0.92]',
    standard: 'brightness-[1.12] saturate-[1.22] contrast-[1.08]',
    dramatic: 'brightness-[1.22] saturate-[1.45] contrast-[1.38]',
  }[contrastLevel] || 'brightness-[1.12] saturate-[1.22] contrast-[1.08]'

  return (
    <div className="fixed inset-0 w-screen h-screen -z-30 pointer-events-none select-none overflow-hidden bg-[#030303]">
      {/* Layer 1: Parallax active painting backdrop with user-controlled vibrancy & opacity */}
      <motion.div style={{ y: yBg }} className="absolute inset-0 w-full h-[115%]">
        {Object.entries(SECTION_BACKGROUNDS).map(([secId, imgSrc]) => {
          const isActive = activeSection ? activeSection === secId : secId === 'hero'
          return (
            <div
              key={secId}
              style={{ opacity: isActive ? bgOpacity : 0 }}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                isActive ? 'scale-100 blur-none' : 'scale-[1.03] blur-sm'
              }`}
            >
              <Image
                src={imgSrc}
                alt={`${secId} background painting`}
                fill
                priority={secId === 'hero'}
                className={`object-cover transition-all duration-500 ${contrastClass}`}
                referrerPolicy="no-referrer"
              />
              {/* Subtle scrim layer preserving artwork clarity while maintaining text legibility */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#030303]/35 via-transparent to-[#030303]/50" />
            </div>
          )
        })}
      </motion.div>

      {/* Layer 2: Subtle textured overlay across all layers */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff04_1px,transparent_1px)] [background-size:16px_16px] opacity-30 mix-blend-overlay" />
      
      {/* Dynamic dark radial vignette guaranteeing high-contrast text readability */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(3,3,3,0.6)_100%)] z-10" />

      {/* Layer 3: Curated Museum-Style Framed Artifacts */}
      <motion.div 
        style={{ opacity: opacityHeroElements }} 
        className="absolute inset-0 w-full h-full pointer-events-none hidden md:block z-20"
      >
        {/* Artifact 1: Neural Graph */}
        <motion.div
          style={{ y: ySkateboard }}
          animate={{
            y: [0, 10, -10, 0],
            rotate: [2, 4, 1, 2],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute left-[3%] lg:left-[8%] xl:left-[12%] top-[14%] md:top-[16%] w-44 md:w-56 border border-primary/20 bg-black/80 backdrop-blur-xl rounded-2xl p-3 shadow-[0_15px_40px_rgba(var(--primary-rgb),0.12)] flex flex-col gap-2 pointer-events-auto group hover:border-primary/50 transition-all duration-500"
        >
          <div className="relative w-full h-24 md:h-32 overflow-hidden rounded-lg bg-[#050505] flex items-center justify-center p-3 border border-white/5">
            <svg className="w-full h-full" viewBox="0 0 100 60">
              <defs>
                <linearGradient id="neuralGlow" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(var(--primary-rgb), 0.8)" />
                  <stop offset="100%" stopColor="rgba(var(--secondary-rgb), 0.2)" />
                </linearGradient>
              </defs>
              <line x1="15" y1="30" x2="50" y2="15" stroke="url(#neuralGlow)" strokeWidth="0.5" className="animate-pulse" />
              <line x1="15" y1="30" x2="50" y2="45" stroke="url(#neuralGlow)" strokeWidth="0.5" />
              <line x1="15" y1="30" x2="50" y2="30" stroke="url(#neuralGlow)" strokeWidth="0.7" />
              <line x1="50" y1="15" x2="85" y2="30" stroke="url(#neuralGlow)" strokeWidth="0.5" />
              <line x1="50" y1="30" x2="85" y2="30" stroke="url(#neuralGlow)" strokeWidth="0.8" />
              <line x1="50" y1="45" x2="85" y2="30" stroke="url(#neuralGlow)" strokeWidth="0.5" />
              <circle cx="15" cy="30" r="3" fill="rgb(var(--primary-rgb))" className="animate-ping" style={{ animationDuration: '3s' }} />
              <circle cx="15" cy="30" r="3" fill="rgb(var(--primary-rgb))" />
              <circle cx="50" cy="15" r="3" fill="#ffffff" />
              <circle cx="50" cy="30" r="3.5" fill="rgb(var(--secondary-rgb))" />
              <circle cx="50" cy="45" r="3" fill="#ffffff" />
              <circle cx="85" cy="30" r="3.5" fill="rgb(var(--primary-rgb))" />
              <circle cx="85" cy="30" r="5" stroke="rgb(var(--primary-rgb))" strokeWidth="0.5" fill="none" className="animate-ping" style={{ animationDuration: '2s' }} />
            </svg>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
          <div className="flex flex-col gap-0.5 px-1">
            <span className="font-mono text-[8px] tracking-[0.2em] text-primary font-bold">ARTIFACT_01 // ARCH_NODE</span>
            <span className="font-sans text-[10px] text-zinc-400 font-medium">Neural Node Topology</span>
          </div>
        </motion.div>

        {/* Artifact 2: Terminal Snippet */}
        <motion.div
          style={{ y: yShoppingBag }}
          animate={{
            y: [0, -12, 10, 0],
            rotate: [-2, -4, -1, -2],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute right-[3%] lg:right-[6%] top-[34%] md:top-[30%] w-44 md:w-56 border border-primary/20 bg-black/80 backdrop-blur-xl rounded-2xl p-3 shadow-[0_15px_40px_rgba(var(--primary-rgb),0.12)] flex flex-col gap-2 pointer-events-auto group hover:border-primary/50 transition-all duration-500"
        >
          <div className="relative w-full h-24 md:h-32 overflow-hidden rounded-lg bg-[#050505] flex flex-col p-2.5 border border-white/5 font-mono text-[7px] leading-relaxed text-zinc-400">
            <div className="flex items-center gap-1 pb-1.5 border-b border-white/5 mb-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500/60" />
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500/60" />
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/60" />
              <span className="text-[6.5px] text-zinc-500 ml-1">transformer_core.ts</span>
            </div>
            <div className="space-y-1">
              <div className="text-primary font-bold">import <span className="text-white">{' { Agent } '}</span> from {'"scholar-ai"'}</div>
              <div>const engine = <span className="text-secondary">new</span> Agent({'{'}</div>
              <div className="pl-2">weights: {'"gemini-3.5-flash"'},</div>
              <div className="pl-2">attention: true,</div>
              <div className="pl-2">layers: 12</div>
              <div>{'})'}</div>
              <div className="text-emerald-400/80 mt-1 animate-pulse">&gt; Pipeline initialized. OK</div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
          </div>
          <div className="flex flex-col gap-0.5 px-1">
            <span className="font-mono text-[8px] tracking-[0.2em] text-primary font-bold">ARTIFACT_02 // SYSTEM_CORE</span>
            <span className="font-sans text-[10px] text-zinc-400 font-medium">Pipeline Execution Stack</span>
          </div>
        </motion.div>

        {/* Artifact 3: Knowledge Graph */}
        <motion.div
          style={{ y: yVial }}
          animate={{
            y: [0, 8, -12, 0],
            rotate: [1, -1, 2, 1],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute left-[5%] lg:left-[12%] xl:left-[16%] bottom-[10%] md:bottom-[12%] w-40 md:w-50 border border-primary/20 bg-black/80 backdrop-blur-xl rounded-2xl p-3 shadow-[0_15px_40px_rgba(var(--primary-rgb),0.12)] flex flex-col gap-2 pointer-events-auto group hover:border-primary/50 transition-all duration-500"
        >
          <div className="relative w-full h-20 md:h-26 overflow-hidden rounded-lg bg-[#050505] flex items-center justify-center p-2.5 border border-white/5">
            <svg className="w-full h-full" viewBox="0 0 100 60">
              <line x1="5" y1="55" x2="95" y2="55" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
              <line x1="5" y1="5" x2="5" y2="55" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
              <circle cx="30" cy="22" r="12" fill="rgba(var(--primary-rgb), 0.05)" stroke="rgba(var(--primary-rgb), 0.2)" strokeWidth="0.5" strokeDasharray="2 2" />
              <circle cx="70" cy="38" r="14" fill="rgba(var(--secondary-rgb), 0.05)" stroke="rgba(var(--secondary-rgb), 0.2)" strokeWidth="0.5" strokeDasharray="2 2" />
              <circle cx="26" cy="18" r="1.5" fill="rgb(var(--primary-rgb))" className="animate-pulse" />
              <circle cx="34" cy="26" r="1.5" fill="rgb(var(--primary-rgb))" />
              <circle cx="30" cy="20" r="1" fill="#ffffff" />
              <circle cx="22" cy="25" r="1.2" fill="rgb(var(--primary-rgb))" />
              <circle cx="65" cy="42" r="1.5" fill="rgb(var(--secondary-rgb))" />
              <circle cx="74" cy="34" r="1.5" fill="rgb(var(--secondary-rgb))" className="animate-pulse" />
              <circle cx="70" cy="38" r="1.2" fill="#ffffff" />
              <circle cx="78" cy="44" r="1" fill="rgb(var(--secondary-rgb))" />
            </svg>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
          <div className="flex flex-col gap-0.5 px-1">
            <span className="font-mono text-[8px] tracking-[0.2em] text-primary font-bold">ARTIFACT_03 // SEMANTIC_VEC</span>
            <span className="font-sans text-[10px] text-zinc-400 font-medium">Vector Clusters</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
