"use client"

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { playTick } from '@/lib/sounds'
import { useScrollStore } from '@/store/useScrollStore'

const SECTIONS = [
  { id: 'hero', label: 'Cognitive Core', plain: 'Home', roman: 'I' },
  { id: 'about', label: 'Origin & Intent', plain: 'Profile', roman: 'II' },
  { id: 'skills', label: 'Synaptic Stack', plain: 'Skills', roman: 'III' },
  { id: 'work', label: 'Cognitive Works', plain: 'Projects', roman: 'IV' },
  { id: 'credentials', label: 'Intellectual Basis', plain: 'Education', roman: 'V' },
  { id: 'achievements', label: 'Benchmarks & Stats', plain: 'Metrics', roman: 'VI' },
  { id: 'experience', label: 'Trajectory', plain: 'Career', roman: 'VII' },
  { id: 'testimonials', label: 'Collaborations', plain: 'Reviews', roman: 'VIII' },
  { id: 'contact', label: 'Channels', plain: 'Contact', roman: 'IX' },
]

export default function RomanSidebar() {
  const activeSection = useScrollStore((state) => state.activeSection)

  const handleNavClick = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      playTick()
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col space-y-8 select-none pointer-events-none w-52 text-left">
      {/* Title block like "The Renaissance Edition" */}
      <div className="pointer-events-auto flex flex-col space-y-1 pl-2">
        <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-secondary font-bold">The</span>
        <span className="font-display font-medium text-lg uppercase tracking-wider text-white leading-none">Cognitive</span>
        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-primary/80">Edition</span>
        <div className="h-[1px] w-12 bg-white/10 mt-3" />
      </div>

      {/* List items */}
      <div className="pointer-events-auto flex flex-col space-y-2 font-mono text-[10px] uppercase tracking-widest">
        {SECTIONS.map((sec) => {
          const isActive = activeSection === sec.id
          return (
            <button
              key={sec.id}
              onClick={() => handleNavClick(sec.id)}
              onMouseEnter={() => playTick()}
              className="group flex items-center justify-between py-1 px-2 rounded-lg transition-all duration-300 hover:bg-white/[0.03] text-left cursor-pointer pointer-events-auto"
            >
              <div className="flex flex-col pr-2">
                <span
                  className={`transition-all duration-300 truncate max-w-[140px] font-sans text-[11px] font-medium leading-snug ${
                    isActive
                      ? 'text-primary font-bold translate-x-1'
                      : 'text-zinc-400 group-hover:text-zinc-200'
                  }`}
                >
                  {sec.label}
                </span>
                <span 
                  className={`font-mono text-[8px] tracking-wider mt-0.5 leading-none transition-all duration-300 ${
                    isActive ? 'text-secondary/90 font-bold translate-x-1' : 'text-zinc-600 group-hover:text-zinc-400'
                  }`}
                >
                  ↳ {sec.plain}
                </span>
              </div>
              <span
                className={`font-sans text-xs transition-all duration-300 ${
                  isActive
                    ? 'text-secondary font-extrabold scale-110'
                    : 'text-zinc-600 group-hover:text-zinc-400'
                }`}
              >
                {sec.roman}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
