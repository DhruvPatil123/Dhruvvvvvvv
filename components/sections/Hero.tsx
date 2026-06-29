"use client"

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Download, Github, Twitter, Linkedin, Instagram } from 'lucide-react'
import { downloadResume, ResumeTheme } from '@/lib/downloadResume'
import LeetCodeIcon from '../LeetCodeIcon'
import { useThemeStore } from '@/store/useThemeStore'
import { playTick, playPopover } from '@/lib/sounds'

export default function Hero() {
  const [showThemes, setShowThemes] = React.useState(false)
  const themeSelectorRef = React.useRef<HTMLDivElement>(null)
  const currentTheme = useThemeStore((state) => state.theme)
  const setTheme = useThemeStore((state) => state.setTheme)

  React.useEffect(() => {
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

  return (
    <section 
      id="hero" 
      className="relative w-full h-screen flex flex-col items-center justify-center px-6 text-center select-none overflow-hidden"
      style={{
        background: 'radial-gradient(circle at center, rgba(6, 18, 31, 0.4) 0%, rgba(5, 5, 5, 0) 75%)'
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-4xl flex flex-col items-center justify-center space-y-12 md:space-y-16"
      >
        {/* Title and Tagline Group */}
        <div className="space-y-4 md:space-y-6">
          {/* Hero Title with Cinematic Gradients */}
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[110px] font-display font-medium tracking-tighter text-white leading-[0.95] uppercase">
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-zinc-300 via-zinc-100 to-white">
              DHRUV
            </span> <br />
            <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-secondary animate-gradient">
              DINESH PATIL
            </span>
          </h1>

          {/* Subheading Tagline (Point 3) */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="flex items-center justify-center gap-2"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <p className="font-mono text-xs sm:text-sm uppercase tracking-[0.25em] text-secondary font-bold">
              AI Engineer • GenAI Developer
            </p>
          </motion.div>
        </div>

        {/* Refined Shorter Paragraph (Point 7: only 2 lines, high-readability) */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-gray-300/90 font-sans text-base md:text-lg max-w-2xl mx-auto leading-[1.7] tracking-normal"
        >
          Building AI-powered products, autonomous agents, and immersive web experiences with modern technologies.
        </motion.p>

        {/* Action Buttons with increased spacing (Point 8) */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-6 sm:gap-8 justify-center items-center pt-2"
        >
          {/* Explore Work: Glass effect with bright text and cyan arrow */}
          <motion.a
            href="#work"
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.98 }}
            className="group w-full sm:w-auto glass-effect hover:bg-white/10 text-white font-mono text-xs uppercase tracking-widest px-8 py-4 rounded-full font-bold flex items-center justify-center gap-2 border border-white/10 hover:border-white/25 transition-all duration-300 cursor-pointer"
          >
            Explore Work 
            <ArrowRight className="w-4 h-4 text-primary transition-transform duration-300 group-hover:translate-x-1.5" />
          </motion.a>
          
          {/* Download Resume: Glass effect with bright text and emerald/secondary download arrow */}
          <div className="relative w-full sm:w-auto" ref={themeSelectorRef}>
            <motion.button
              onClick={() => {
                setShowThemes(!showThemes)
                playPopover()
              }}
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.98 }}
              className="group w-full sm:w-auto glass-effect hover:bg-white/10 text-white font-mono text-xs uppercase tracking-widest px-8 py-4 rounded-full font-bold flex items-center justify-center gap-2 border border-white/10 hover:border-white/25 transition-all duration-300 cursor-pointer"
            >
              Get Resume 
              <Download className="w-4 h-4 text-secondary transition-transform duration-300 group-hover:translate-y-0.5" />
            </motion.button>

            <AnimatePresence>
              {showThemes && (
                <motion.div
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 15, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className="absolute z-50 mt-3 left-1/2 -translate-x-1/2 sm:left-auto sm:right-0 sm:translate-x-0 w-64 glass-effect border border-white/10 rounded-2xl p-4 shadow-[0_10px_40px_rgba(0,0,0,0.5)] backdrop-blur-xl space-y-3"
                >
                  <div className="text-left">
                    <p className="text-white text-xs font-mono uppercase tracking-wider font-bold mb-1">Select Resume Theme</p>
                    <p className="text-zinc-400 text-[10px] leading-relaxed">Choose an elegant, professional palette for your generated PDF CV.</p>
                  </div>
                  <div className="grid grid-cols-1 gap-1.5 pt-1">
                    <button
                      onClick={() => {
                        playTick()
                        setTheme('charcoal')
                        downloadResume('charcoal')
                        setShowThemes(false)
                      }}
                      className={`flex items-center gap-3 w-full p-2 rounded-xl transition-all text-left group cursor-pointer border ${
                        currentTheme === 'charcoal'
                          ? 'bg-white/10 border-white/20'
                          : 'bg-transparent border-transparent hover:bg-white/5 hover:border-white/5'
                      }`}
                    >
                      <span className={`w-3 h-3 rounded-full bg-zinc-600 border border-zinc-500 group-hover:scale-110 transition-transform ${currentTheme === 'charcoal' ? 'ring-2 ring-primary ring-offset-2 ring-offset-black' : ''}`} />
                      <div>
                        <p className={`text-xs font-semibold group-hover:text-white transition-colors ${currentTheme === 'charcoal' ? 'text-primary' : 'text-zinc-300'}`}>Classic Charcoal</p>
                        <p className="text-[9px] text-zinc-500 leading-none">Elegant dark slate accents</p>
                      </div>
                    </button>
                    <button
                      onClick={() => {
                        playTick()
                        setTheme('emerald')
                        downloadResume('emerald')
                        setShowThemes(false)
                      }}
                      className={`flex items-center gap-3 w-full p-2 rounded-xl transition-all text-left group cursor-pointer border ${
                        currentTheme === 'emerald'
                          ? 'bg-emerald-500/10 border-emerald-500/20'
                          : 'bg-transparent border-transparent hover:bg-white/5 hover:border-white/5'
                      }`}
                    >
                      <span className={`w-3 h-3 rounded-full bg-emerald-500 border border-emerald-400 group-hover:scale-110 transition-transform ${currentTheme === 'emerald' ? 'ring-2 ring-emerald-500 ring-offset-2 ring-offset-black' : ''}`} />
                      <div>
                        <p className={`text-xs font-semibold group-hover:text-emerald-300 transition-colors ${currentTheme === 'emerald' ? 'text-emerald-400 font-bold' : 'text-zinc-300'}`}>Emerald Tech</p>
                        <p className="text-[9px] text-zinc-500 leading-none">Sustainability & modern engineering</p>
                      </div>
                    </button>
                    <button
                      onClick={() => {
                        playTick()
                        setTheme('cobalt')
                        downloadResume('cobalt')
                        setShowThemes(false)
                      }}
                      className={`flex items-center gap-3 w-full p-2 rounded-xl transition-all text-left group cursor-pointer border ${
                        currentTheme === 'cobalt'
                          ? 'bg-blue-500/10 border-blue-500/20'
                          : 'bg-transparent border-transparent hover:bg-white/5 hover:border-white/5'
                      }`}
                    >
                      <span className={`w-3 h-3 rounded-full bg-blue-500 border border-blue-400 group-hover:scale-110 transition-transform ${currentTheme === 'cobalt' ? 'ring-2 ring-blue-500 ring-offset-2 ring-offset-black' : ''}`} />
                      <div>
                        <p className={`text-xs font-semibold group-hover:text-blue-300 transition-colors ${currentTheme === 'cobalt' ? 'text-blue-400 font-bold' : 'text-zinc-300'}`}>Royal Cobalt</p>
                        <p className="text-[9px] text-zinc-500 leading-none">Classic corporate & executive blue</p>
                      </div>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Minimal Social Icons Dock (Point 6: 36px icons, reduced opacity, glows only on hover) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1.0 }}
          className="flex gap-4 pt-4"
        >
          {[
            { href: "https://github.com/DhruvPatil123", icon: <Github className="w-4 h-4" />, label: "GitHub" },
            { href: "https://x.com/DhruvPatil_18", icon: <Twitter className="w-4 h-4" />, label: "X" },
            { href: "https://www.instagram.com/_dhruv.exe.18", icon: <Instagram className="w-4 h-4" />, label: "Instagram" },
            { href: "https://www.linkedin.com/in/dhruv-patil-3816043b7/", icon: <Linkedin className="w-4 h-4" />, label: "LinkedIn" },
            { href: "https://leetcode.com/u/Dhruv_Patil_18/", icon: <LeetCodeIcon className="w-4 h-4" />, label: "LeetCode" }
          ].map((soc, i) => (
            <motion.a 
              key={i}
              href={soc.href} 
              target="_blank" 
              rel="noreferrer" 
              aria-label={soc.label}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="w-9 h-9 flex items-center justify-center rounded-full text-white/50 hover:text-primary hover:bg-primary/5 border border-white/5 hover:border-primary/20 hover:shadow-[0_0_15px_rgba(0,242,255,0.2)] transition-all duration-300"
            >
              {soc.icon}
            </motion.a>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
