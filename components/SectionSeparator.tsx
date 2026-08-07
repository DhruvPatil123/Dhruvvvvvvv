"use client"

import React from 'react'
import { motion } from 'framer-motion'

export default function SectionSeparator() {
  return (
    <div className="relative w-full py-16 sm:py-20 md:py-24 flex items-center justify-center overflow-hidden pointer-events-none select-none">
      <div className="w-full max-w-7xl px-6 flex items-center justify-center gap-4">
        <motion.div 
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/30 to-primary/60 origin-right"
        />
        <motion.div 
          initial={{ scale: 0, rotate: -45 }}
          whileInView={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="w-2.5 h-2.5 rotate-45 border border-primary bg-cyan-950/80 shadow-[0_0_12px_rgba(0,242,255,0.8)]"
        />
        <motion.div 
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="flex-1 h-[1px] bg-gradient-to-l from-transparent via-cyan-500/30 to-primary/60 origin-left"
        />
      </div>
    </div>
  )
}
