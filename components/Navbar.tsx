"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sparkles, FileText, ExternalLink } from 'lucide-react'
import { playTick, playPopover } from '@/lib/sounds'
import { useScrollStore } from '@/store/useScrollStore'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const activeSection = useScrollStore((state) => state.activeSection)

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'featured-project', label: 'Showcase' },
    { id: 'work', label: 'Projects' },
    { id: 'credentials', label: 'Experience' },
    { id: 'research', label: 'Research' },
    { id: 'contact', label: 'Contact' }
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (id: string) => {
    playTick()
    setMobileMenuOpen(false)
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 transition-all duration-500 pointer-events-none ${
        isScrolled ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
      }`}
    >
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="pointer-events-auto transition-all duration-300 flex items-center justify-between w-full max-w-4xl rounded-2xl border border-white/10 bg-[#0c0d10]/90 backdrop-blur-2xl shadow-[0_15px_40px_rgba(0,0,0,0.85)] py-2 px-5 hover:border-white/20"
      >
        {/* Logo */}
        <a
          href="#hero"
          onClick={() => handleNavClick('hero')}
          className="flex items-center gap-2.5 group text-white font-mono tracking-tight text-sm sm:text-base cursor-pointer"
        >
          <div className="w-7 h-7 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-white text-xs font-mono font-bold transition-all">
            DP
          </div>
          <span className="font-semibold tracking-wide">
            Dhruv Patil
          </span>
          <span className="hidden lg:inline text-[10px] text-zinc-500 font-mono tracking-widest uppercase">
            / AI Systems
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 font-mono text-xs">
          {navItems.map((item, index) => {
            const isActive = activeSection === item.id
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                aria-current={isActive ? 'page' : undefined}
                className={`relative px-3 py-1.5 rounded-lg transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-purple-400/40 ${
                  isActive ? 'text-white font-bold' : 'text-zinc-400 hover:text-white hover:bg-white/[0.03]'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeNavTab"
                    className="absolute inset-0 rounded-lg bg-purple-950/40 border border-purple-500/30 shadow-[0_0_12px_rgba(168,85,247,0.2)]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  <span className={`text-[10px] ${isActive ? 'text-cyan-400 font-mono' : 'text-zinc-600'}`}>
                    0{index + 1}
                  </span>
                  <span>{item.label}</span>
                </span>
              </button>
            )
          })}
        </nav>

        {/* Right CTA Button */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href="#contact"
            onClick={() => handleNavClick('contact')}
            className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-purple-900/40 to-cyan-950/40 hover:from-purple-800/60 hover:to-cyan-900/60 text-purple-200 hover:text-white border border-purple-500/30 hover:border-cyan-400/50 font-mono text-xs font-semibold transition-all shadow-sm"
          >
            Contact
          </a>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => {
            playPopover()
            setMobileMenuOpen(!mobileMenuOpen)
          }}
          className="md:hidden p-2 rounded-lg bg-white/5 text-zinc-300 hover:text-white hover:bg-white/10 border border-white/10 transition-colors cursor-pointer"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5 text-cyan-400" /> : <Menu className="w-5 h-5" />}
        </button>
      </motion.div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-auto absolute top-16 left-4 right-4 bg-zinc-950/95 border border-white/15 rounded-2xl p-5 shadow-2xl backdrop-blur-2xl md:hidden space-y-3"
          >
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <span className="font-mono text-xs uppercase text-cyan-400 font-bold tracking-widest">[ 00 {'//'} NAVIGATION ]</span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1 rounded-lg bg-white/5 text-zinc-400 hover:text-white border border-white/10"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex flex-col space-y-1.5 font-mono text-sm">
              {navItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-left px-3.5 py-2 rounded-xl transition-all cursor-pointer flex items-center justify-between ${
                    activeSection === item.id
                      ? 'bg-cyan-500/15 text-cyan-300 font-bold border border-cyan-500/40'
                      : 'text-zinc-300 hover:bg-white/5'
                  }`}
                >
                  <span>{item.label}</span>
                  <span className="text-[11px] text-zinc-500 font-mono">[0{index + 1}]</span>
                </button>
              ))}
            </div>

            <div className="pt-2 border-t border-white/10">
              <a
                href="#contact"
                onClick={() => handleNavClick('contact')}
                className="w-full py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-mono font-bold text-center text-xs uppercase tracking-wider block transition-colors"
              >
                Contact Dhruv Patil {'//'}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
