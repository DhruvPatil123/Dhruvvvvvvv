"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { useChatStore } from '@/store/useChatStore'

export default function Overlay() {
  const openChat = useChatStore((state) => state.openChat)
  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Work', href: '#work' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ]

  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center p-6 md:p-8 pointer-events-none">
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

        <button 
          onClick={openChat}
          className="glass-effect px-5.5 py-2 rounded-full font-mono text-[10px] uppercase tracking-widest text-white hover:text-primary hover:bg-white/[0.08] hover:border-primary/20 transition-all border border-white/5 active:scale-95 duration-300"
        >
          Let&apos;s Talk
        </button>
      </div>
    </nav>
  )
}
