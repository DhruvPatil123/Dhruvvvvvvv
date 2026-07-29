"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useChatStore } from '@/store/useChatStore'
import { useRecruiterStore } from '@/store/useRecruiterStore'
import { Menu, X, Zap, FileText } from 'lucide-react'
import { useScrollStore } from '@/store/useScrollStore'
import { downloadResume } from '@/lib/downloadResume'

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
    { name: 'Home', href: '#hero', id: 'hero' },
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Projects', href: '#work', id: 'work' },
    { name: 'Skills', href: '#skills', id: 'skills' },
    { name: 'Experience', href: '#experience', id: 'experience' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ]

  return (
    <nav className="fixed top-0 left-0 w-full z-50 pointer-events-none flex justify-center pt-3 sm:pt-5 px-4">
      <div className={`pointer-events-auto transition-all duration-500 rounded-full max-w-6xl w-full flex justify-between items-center ${
        isScrolled 
          ? 'bg-black/80 backdrop-blur-2xl border border-white/15 px-5 sm:px-7 py-2.5 shadow-[0_10px_30px_rgba(0,0,0,0.8)]' 
          : 'bg-black/40 backdrop-blur-md border border-white/10 px-6 sm:px-8 py-3 shadow-[0_4px_20px_rgba(0,0,0,0.5)]'
      }`}>
        {/* Logo */}
        <a 
          href="#hero"
          className="text-lg sm:text-xl font-display font-semibold tracking-tight text-white hover:opacity-80 transition-opacity cursor-pointer flex items-center gap-1.5"
        >
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(0,242,255,0.8)]" />
          <span>Dhruv</span>
          <span className="text-primary italic font-serif text-2xl">.</span>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-1.5 bg-white/[0.04] p-1 rounded-full border border-white/5">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id
            return (
              <a
                key={link.name}
                href={link.href}
                className={`relative px-4 py-1.5 rounded-full font-mono text-[11px] uppercase tracking-wider transition-all duration-300 ${
                  isActive ? 'text-black font-bold' : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavBg"
                    className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-primary rounded-full shadow-[0_0_15px_rgba(0,242,255,0.5)]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.name}</span>
              </a>
            )
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Resume Button */}
          <button
            onClick={() => downloadResume('charcoal', 'ai')}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-mono text-[11px] uppercase tracking-wider text-white hover:text-primary bg-white/5 hover:bg-white/10 border border-white/10 transition-all active:scale-95 cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-medium">Resume</span>
          </button>

          {/* 30-Second Recruiter View Toggle */}
          <button
            onClick={openRecruiterView}
            className="relative group overflow-hidden px-3.5 sm:px-4 py-1.5 rounded-full font-mono text-[10px] uppercase tracking-wider text-cyan-300 bg-cyan-950/60 hover:bg-cyan-500/20 border border-cyan-500/40 hover:border-cyan-400 transition-all shadow-[0_0_15px_rgba(0,242,255,0.2)] hover:shadow-[0_0_25px_rgba(0,242,255,0.4)] active:scale-95 duration-300 flex items-center gap-1.5 cursor-pointer"
          >
            <Zap className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span className="font-bold hidden xl:inline">30s Recruiter View</span>
            <span className="font-bold xl:hidden">30s Mode</span>
          </button>

          <button 
            onClick={() => openChat()}
            className="hidden md:flex glass-effect px-4 py-1.5 rounded-full font-mono text-[10px] uppercase tracking-widest text-white hover:text-primary hover:bg-white/[0.1] transition-all border border-white/10 active:scale-95 duration-300 cursor-pointer"
          >
            Contact
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex lg:hidden glass-effect p-2 rounded-full text-white hover:text-primary border border-white/10 transition-all duration-300 active:scale-95 cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-18 left-4 right-4 p-5 rounded-3xl glass-effect border border-white/15 flex flex-col gap-3 lg:hidden pointer-events-auto shadow-2xl z-40 bg-black/90 backdrop-blur-2xl max-w-md mx-auto"
          >
            <button
              onClick={() => {
                setMobileMenuOpen(false)
                openRecruiterView()
              }}
              className="w-full py-3 rounded-2xl bg-cyan-950/80 border border-cyan-500/60 text-cyan-300 font-mono text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,242,255,0.2)]"
            >
              <Zap className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span>⚡ Open 30s Recruiter View</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false)
                downloadResume('charcoal', 'ai')
              }}
              className="w-full py-2.5 rounded-2xl bg-white/10 border border-white/15 text-white font-mono text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2"
            >
              <FileText className="w-4 h-4 text-cyan-400" />
              <span>Download PDF Resume</span>
            </button>

            <div className="h-[1px] bg-white/10 my-1" />

            {navLinks.map((link, idx) => {
              const isActive = activeSection === link.id
              return (
                <motion.a
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.04 }}
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`font-mono text-xs uppercase tracking-widest py-2.5 px-3 rounded-xl transition-all duration-300 flex items-center justify-between ${
                    isActive 
                      ? 'bg-primary/15 text-cyan-300 font-bold border border-primary/30' 
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span>{link.name}</span>
                  <span className="text-[10px] text-zinc-500">0{idx + 1}</span>
                </motion.a>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

