"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useChatStore } from '@/store/useChatStore'
import { useRecruiterStore } from '@/store/useRecruiterStore'
import { Menu, X, Zap } from 'lucide-react'
import { useScrollStore } from '@/store/useScrollStore'

export default function Overlay() {
  const openChat = useChatStore((state) => state.openChat)
  const openRecruiterView = useRecruiterStore((state) => state.openRecruiterView)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const activeSection = useScrollStore((state) => state.activeSection)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Work', href: '#work' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ]

  return (
    <nav className="fixed top-0 left-0 w-full z-50 pointer-events-none">
      <div className={`w-full transition-all duration-300 ${
        isScrolled 
          ? 'bg-black/70 backdrop-blur-md border-b border-white/5 py-4 px-6 md:px-8' 
          : 'py-6 md:py-8 px-6 md:px-8'
      }`}>
        <div className="flex justify-between items-center w-full max-w-7xl mx-auto pointer-events-auto">
          <div className="text-2xl font-display font-light tracking-wide text-white hover:opacity-80 transition-opacity cursor-pointer">
            Dhruv<span className="text-primary italic font-serif">.</span>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* 30-Second Recruiter View Toggle */}
            <button
              onClick={openRecruiterView}
              className="relative group overflow-hidden px-3.5 sm:px-4 py-2 rounded-full font-mono text-[10px] uppercase tracking-wider text-cyan-300 bg-cyan-950/40 hover:bg-cyan-500/20 border border-cyan-500/40 hover:border-cyan-400 transition-all shadow-[0_0_15px_rgba(0,242,255,0.15)] hover:shadow-[0_0_25px_rgba(0,242,255,0.3)] active:scale-95 duration-300 flex items-center gap-1.5 cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span className="font-bold">30s Recruiter View</span>
            </button>

            <button 
              onClick={openChat}
              className="glass-effect px-4 sm:px-5.5 py-2 rounded-full font-mono text-[10px] uppercase tracking-widest text-white hover:text-primary hover:bg-white/[0.08] hover:border-primary/20 transition-all border border-white/5 active:scale-95 duration-300 cursor-pointer"
            >
              Let&apos;s Talk
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex md:hidden glass-effect p-2 rounded-full text-white hover:text-primary border border-white/5 transition-all duration-300 active:scale-95 cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-22 left-6 right-6 p-6 rounded-2xl glass-effect border border-white/10 flex flex-col gap-3 md:hidden pointer-events-auto shadow-2xl z-40 bg-black/80 backdrop-blur-xl"
          >
            <button
              onClick={() => {
                setMobileMenuOpen(false)
                openRecruiterView()
              }}
              className="w-full py-3 rounded-xl bg-cyan-950/60 border border-cyan-500/50 text-cyan-300 font-mono text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4 text-cyan-400" />
              <span>⚡ Open 30s Recruiter Mode</span>
            </button>

            {navLinks.map((link, idx) => {
              const isActive = activeSection === link.href.slice(1)
              return (
                <motion.a
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.04 }}
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`font-mono text-xs uppercase tracking-widest py-2.5 border-b border-white/5 last:border-0 transition-all duration-300 ${
                    isActive 
                      ? 'text-primary font-medium pl-2' 
                      : 'text-gray-300 hover:text-primary'
                  }`}
                >
                  {"// "}{link.name}
                </motion.a>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
