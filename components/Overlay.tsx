"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useChatStore } from '@/store/useChatStore'
import { Menu, X } from 'lucide-react'

export default function Overlay() {
  const openChat = useChatStore((state) => state.openChat)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<string>('')

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Work', href: '#work' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ]

  useEffect(() => {
    const sectionIds = ['about', 'skills', 'work', 'experience', 'contact']
    
    // Find all the elements
    const elements = sectionIds
      .map(id => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    if (elements.length === 0) return

    const observerOptions = {
      root: null,
      rootMargin: '-28% 0px -52% 0px', // Focused band in the upper-middle region
      threshold: 0.05,
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)
    elements.forEach(el => observer.observe(el))

    // Handle initial state and scrolling back to top (reset when in hero section)
    const handleScroll = () => {
      if (window.scrollY < 200) {
        setActiveSection('')
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex flex-col p-6 md:p-8 pointer-events-none">
      <div className="flex justify-between items-center w-full max-w-7xl mx-auto pointer-events-auto">
        <div className="text-xl font-display font-bold tracking-tight text-white hover:opacity-80 transition-opacity">
          DHRUV<span className="text-primary font-mono">_</span>
        </div>

        {/* Cinematic Navigation Links (Point 9) */}
        <div className="hidden md:flex gap-10 font-mono text-[15px] uppercase tracking-[0.12em]">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.slice(1)
            return (
              <a
                key={link.name}
                href={link.href}
                className={`relative py-1 cursor-pointer transition-all duration-300 hover:text-primary hover:opacity-100 group ${
                  isActive 
                    ? 'text-primary opacity-100 scale-105 font-medium' 
                    : 'text-white/60 opacity-80'
                }`}
              >
                {"// "}{link.name}
              </a>
            )
          })}
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={openChat}
            className="glass-effect px-4 sm:px-5.5 py-2 rounded-full font-mono text-[10px] uppercase tracking-widest text-white hover:text-primary hover:bg-white/[0.08] hover:border-primary/20 transition-all border border-white/5 active:scale-95 duration-300"
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

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-22 left-6 right-6 p-6 rounded-2xl glass-effect border border-white/10 flex flex-col gap-3 md:hidden pointer-events-auto shadow-2xl z-40 bg-black/80 backdrop-blur-xl"
          >
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
