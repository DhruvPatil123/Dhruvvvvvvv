"use client"

import React from 'react'
import { motion } from 'framer-motion'

interface SectionSeparatorProps {
  label?: string
}

export default function SectionSeparator({ label }: SectionSeparatorProps) {
  return (
    <div className="relative w-full py-8 sm:py-10 md:py-12 flex items-center justify-center overflow-hidden pointer-events-none select-none">
      <div className="w-full max-w-5xl px-6 flex items-center justify-center gap-4">
        {/* Left Subtle Hairline */}
        <motion.div 
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-white/10 origin-right"
        />

        {/* Center Editorial Label */}
        {label ? (
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500 whitespace-nowrap px-3 select-none">
            {label}
          </div>
        ) : (
          <div className="w-1 h-1 rounded-full bg-white/20" />
        )}

        {/* Right Subtle Hairline */}
        <motion.div 
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="flex-1 h-[1px] bg-gradient-to-l from-transparent via-white/10 to-white/10 origin-left"
        />
      </div>
    </div>
  )
}
