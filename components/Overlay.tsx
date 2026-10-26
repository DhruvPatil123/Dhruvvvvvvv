"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useChatStore } from '@/store/useChatStore'
import { useRecruiterStore } from '@/store/useRecruiterStore'
import { Menu, X, Zap, FileText, Volume2, VolumeX } from 'lucide-react'
import { useScrollStore } from '@/store/useScrollStore'
import { useAudioStore } from '@/store/useAudioStore'
import { downloadResume } from '@/lib/downloadResume'
import { startAmbientDrone, stopAmbientDrone, playTick } from '@/lib/sounds'

export default function Overlay() {
  const openChat = useChatStore((state) => state.openChat)
  const openRecruiterView = useRecruiterStore((state) => state.openRecruiterView)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const activeSection = useScrollStore((state) => state.activeSection)
  const isPlayingAmbient = useAudioStore((state) => state.isPlayingAmbient)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 120)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Home', href: '#hero', id: 'hero' },
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Skills', href: '#skills', id: 'skills' },
    { name: 'Projects', href: '#work', id: 'work' },
    { name: 'Credentials', href: '#credentials', id: 'credentials' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ]

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 pointer-events-none flex justify-center pt-3 sm:pt-4 px-4 transition-all duration-500 ${
        isScrolled ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
      }`}
    >
      <div className="pointer-events-auto transition-all duration-300 rounded-full max-w-5xl w-full flex justify-between items-center bg-[#0c0d10]/90 backdrop-blur-2xl border border-white/10 px-5 sm:px-7 py-2.5 shadow-[0_15px_40px_rgba(0,0,0,0.85)]">
        {/* Logo */}
        <a 
          href="#hero"
          className="text-sm sm:text-base font-sans font-bold tracking-tight text-white hover:opacity-80 transition-opacity cursor-pointer flex items-center gap-2"
        >
          <span className="font-bold">Dhruv Patil</span>
          <span className="text-zinc-600 font-mono text-xs hidden sm:inline">/ AI Systems</span>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-1 bg-white/[0.04] p-1 rounded-full border border-white/5">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id
            return (
              <a
                key={link.name}
                href={link.href}
                className={`relative px-4 py-1.5 rounded-full font-mono text-[11px] uppercase tracking-wider transition-all duration-200 ${
                  isActive ? 'text-black font-semibold' : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavBg"
                    className="absolute inset-0 bg-white rounded-full shadow-sm"
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
          {/* Ambient Soundscape Quick Toggle */}
          <button
            onClick={() => {
              playTick()
              if (isPlayingAmbient) {
                stopAmbientDrone()
              } else {
                startAmbientDrone()
              }
            }}
            title={isPlayingAmbient ? "Pause Generative Ambient Drone" : "Start Generative Ambient Drone (F Major 9)"}
            className={`p-2 rounded-full border transition-all active:scale-95 duration-200 flex items-center justify-center cursor-pointer ${
              isPlayingAmbient
                ? "bg-cyan-500/20 text-cyan-400 border-cyan-400/40 shadow-[0_0_12px_rgba(0,240,255,0.3)]"
                : "bg-white/5 text-zinc-400 hover:text-white border-white/10"
            }`}
          >
            {isPlayingAmbient ? <Volume2 className="w-3.5 h-3.5 animate-pulse" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>

          {/* Resume Button */}
          <button
            onClick={() => downloadResume('charcoal', 'ai')}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-mono text-[11px] uppercase tracking-wider text-zinc-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all active:scale-95 cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5 text-zinc-400" />
            <span className="font-medium">Resume</span>
          </button>

          {/* 30-Second Recruiter View Toggle (Monochrome) */}
          <button
            onClick={openRecruiterView}
            className="px-3.5 sm:px-4 py-1.5 rounded-full font-mono text-[10px] uppercase tracking-wider text-white bg-white/10 hover:bg-white hover:text-black border border-white/15 transition-all active:scale-95 duration-200 flex items-center gap-1.5 cursor-pointer font-semibold shadow-sm"
          >
            <Zap className="w-3.5 h-3.5 text-zinc-300 group-hover:text-black" />
            <span className="hidden xl:inline">30s Recruiter View</span>
            <span className="xl:hidden">30s Mode</span>
          </button>

          <button 
            onClick={() => openChat()}
            className="hidden md:flex px-4 py-1.5 rounded-full font-mono text-[10px] uppercase tracking-widest text-zinc-300 hover:text-white bg-white/5 hover:bg-white/10 transition-all border border-white/10 active:scale-95 duration-200 cursor-pointer"
          >
            Inquire
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex lg:hidden p-2 rounded-full text-zinc-300 hover:text-white bg-white/5 border border-white/10 transition-all duration-200 active:scale-95 cursor-pointer"
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
            initial={{ opacity: 0, y: -15, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.96 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-18 left-4 right-4 p-5 rounded-2xl border border-white/10 flex flex-col gap-3 lg:hidden pointer-events-auto shadow-2xl z-40 bg-[#0e0f13]/95 backdrop-blur-2xl max-w-md mx-auto"
          >
            <button
              onClick={() => {
                setMobileMenuOpen(false)
                openRecruiterView()
              }}
              className="w-full py-3 rounded-xl bg-white text-black font-mono text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4 text-black" />
              <span>Open 30s Recruiter View</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false)
                downloadResume('charcoal', 'ai')
              }}
              className="w-full py-2.5 rounded-xl bg-white/5 border border-white/10 text-white font-mono text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2"
            >
              <FileText className="w-4 h-4 text-zinc-400" />
              <span>Download PDF Resume</span>
            </button>

            <div className="h-[1px] bg-white/10 my-1" />

            {navLinks.map((link, idx) => {
              const isActive = activeSection === link.id
              return (
                <motion.a
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.03 }}
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`font-mono text-xs uppercase tracking-widest py-2.5 px-3 rounded-lg transition-all duration-200 flex items-center justify-between ${
                    isActive 
                      ? 'bg-white text-black font-bold' 
                      : 'text-zinc-300 hover:text-white hover:bg-white/5'
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
