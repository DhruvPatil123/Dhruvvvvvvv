"use client"

import React from 'react'

interface KineticMarqueeProps {
  items?: string[]
  reverse?: boolean
  className?: string
  variant?: 'outline' | 'solid' | 'accent'
}

const DEFAULT_ITEMS_ROW1 = [
  "AI RESEARCH",
  "GENERATIVE MODELS",
  "LATENT SPACE ARCHITECTURE",
  "RECURSIVE AGENTS",
  "MULTI-MODAL LIVE API",
  "DIFFUSION & GANS",
  "HIGH-PERFORMANCE FULL-STACK",
  "RAG VECTOR PIPELINES",
]

const DEFAULT_ITEMS_ROW2 = [
  "472+ LEETCODE SOLVED",
  "AST KNOWLEDGE GRAPHS",
  "SUB-40MS WEBSOCKETS",
  "NEURAL CODE GENERATION",
  "SELF-HEALING QA AGENTS",
  "DISTRIBUTED MICROSERVICES",
  "ZERO-LATENCY STREAMING",
]

export default function KineticMarquee({
  items = DEFAULT_ITEMS_ROW1,
  reverse = false,
  className = '',
  variant = 'outline',
}: KineticMarqueeProps) {
  // Duplicate array 3 times to ensure infinite smooth seamless looping
  const repeatedItems = [...items, ...items, ...items, ...items]

  return (
    <div 
      className={`relative w-full overflow-hidden select-none py-3.5 sm:py-5 border-y border-white/10 bg-black/40 backdrop-blur-md pointer-events-auto group ${className}`}
    >
      {/* Edge gradient mask for smooth fade into viewport edges */}
      <div className="absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-[#07080a] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-[#07080a] to-transparent z-10 pointer-events-none" />

      {/* Marquee Track */}
      <div className={reverse ? 'animate-marquee-infinite-reverse' : 'animate-marquee-infinite'}>
        {repeatedItems.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center shrink-0 pr-8 sm:pr-14 transition-colors duration-300"
          >
            <span
              className={`font-sans font-black tracking-[-0.04em] uppercase text-2xl sm:text-4xl md:text-5xl lg:text-6xl transition-all duration-300 ${
                variant === 'outline'
                  ? 'text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.22)] group-hover:[-webkit-text-stroke:1px_rgba(0,240,255,0.6)] group-hover:text-white/10'
                  : variant === 'accent'
                  ? 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-violet-400 to-pink-400 opacity-80 group-hover:opacity-100'
                  : 'text-zinc-300 group-hover:text-white'
              }`}
            >
              {item}
            </span>

            {/* Architectural Separator Glyph */}
            <span className="font-mono text-xs sm:text-sm text-zinc-600 pl-8 sm:pl-14 select-none flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/60" />
              <span>{'//'}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export { DEFAULT_ITEMS_ROW1, DEFAULT_ITEMS_ROW2 }
