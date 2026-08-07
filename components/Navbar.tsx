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
      setIsScrolled(window.scrollY > 40)
    }
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
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 transition-all duration-300 pointer-events-none">
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={`pointer-events-auto transition-all duration-300 flex items-center justify-between w-full max-w-5xl rounded-full border border-white/10 bg-black/70 backdrop-blur-xl shadow-2xl ${
          isScrolled ? 'py-2 px-5 max-w-4xl bg-black/85 border-cyan-500/30' : 'py-3.5 px-7'
        }`}
      >
        {/* Logo */}
        <a
          href="#hero"
          onClick={() => handleNavClick('hero')}
          className="flex items-center gap-2 group text-white font-display font-semibold tracking-tight text-lg sm:text-xl cursor-pointer"
        >
          <div className="w-7 h-7 rounded-full bg-cyan-500/20 border border-cyan-400/50 flex items-center justify-center text-cyan-400 text-xs font-mono font-bold group-hover:scale-110 transition-transform">
            DP
          </div>
          <span>Dhruv <span className="text-cyan-400 font-extrabold">Patil</span></span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 font-mono text-xs">
          {navItems.map((item) => {
            const isActive = activeSection === item.id
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                aria-current={isActive ? 'page' : undefined}
                className={`relative px-3.5 py-1.5 rounded-full transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black ${
                  isActive ? 'text-cyan-200 font-extrabold shadow-[0_0_15px_rgba(0,242,255,0.3)]' : 'text-gray-300 hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeNavTab"
                    className="absolute inset-0 rounded-full bg-cyan-500/25 border border-cyan-400/80 shadow-[inset_0_0_12px_rgba(0,242,255,0.4)]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(0,242,255,1)] animate-pulse" />}
                  {item.label}
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
            className="px-4 py-1.5 rounded-full bg-cyan-500 hover:bg-cyan-400 text-black font-mono text-xs font-extrabold transition-all shadow-[0_0_15px_rgba(0,242,255,0.3)] hover:scale-105"
          >
            Let&apos;s Talk
          </a>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => {
            playPopover()
            setMobileMenuOpen(!mobileMenuOpen)
          }}
          className="md:hidden p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5 text-cyan-400" /> : <Menu className="w-5 h-5" />}
        </button>
      </motion.div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-auto absolute top-16 left-4 right-4 bg-zinc-950/95 border border-white/15 rounded-3xl p-6 shadow-2xl backdrop-blur-2xl md:hidden space-y-4"
          >
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <span className="font-mono text-xs uppercase text-cyan-400 font-bold tracking-widest">[ MENU NAVIGATION ]</span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1 rounded-full bg-white/10 text-gray-400"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex flex-col space-y-2 font-mono text-sm">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-left px-4 py-2.5 rounded-2xl transition-all cursor-pointer ${
                    activeSection === item.id
                      ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40'
                      : 'text-gray-300 hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="pt-2 border-t border-white/10">
              <a
                href="#contact"
                onClick={() => handleNavClick('contact')}
                className="w-full py-3 rounded-2xl bg-cyan-500 text-black font-mono font-bold text-center block"
              >
                Let&apos;s Build Something Amazing
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
