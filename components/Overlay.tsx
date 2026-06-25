"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useChatStore } from '@/store/useChatStore'
import { Menu, X } from 'lucide-react'

export default function Overlay() {
  const openChat = useChatStore((state) => state.openChat)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Work', href: '#work' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ]

  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex flex-col p-6 md:p-8 pointer-events-none">
      <div className="flex justify-between items-center w-full max-w-7xl mx-auto pointer-events-auto">
        <div className="text-xl font-display font-bold tracking-tight text-white hover:opacity-80 transition-opacity">
          DHRUV<span className="text-primary font-mono">_</span>
        </div>

        <div className="hidden md:flex gap-8 font-mono text-[10.5px] uppercase tracking-wider text-gray-400">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="hover:text-primary transition-all duration-300 cursor-pointer hover:-translate-y-0.5"
            >
              {"// "}{link.name}
            </a>
          ))}
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
            {navLinks.map((link, idx) => (
              <motion.a
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.04 }}
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-300 hover:text-primary font-mono text-xs uppercase tracking-widest py-2.5 border-b border-white/5 last:border-0"
              >
                {"// "}{link.name}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
