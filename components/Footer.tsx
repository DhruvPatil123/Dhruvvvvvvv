"use client"

import React from 'react'
import { Github, Twitter, Linkedin, Instagram } from 'lucide-react'
import LeetCodeIcon from './LeetCodeIcon'

export default function Footer() {
  const socialLinks = [
    { name: 'GitHub', href: 'https://github.com/DhruvPatil123', icon: <Github className="w-5 h-5" /> },
    { name: 'X / Twitter', href: 'https://x.com/DhruvPatil_18', icon: <Twitter className="w-5 h-5" /> },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/in/dhruv-patil-3816043b7/', icon: <Linkedin className="w-5 h-5" /> },
    { name: 'Instagram', href: 'https://www.instagram.com/_dhruv.exe.18', icon: <Instagram className="w-5 h-5" /> },
    { name: 'LeetCode', href: 'https://leetcode.com/u/Dhruv_Patil_18/', icon: <LeetCodeIcon className="w-5 h-5" /> },
  ]

  return (
    <footer className="relative w-full py-16 px-6 border-t border-white/10 bg-black/80 backdrop-blur-xl text-gray-400 font-sans">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start gap-10">
        
        {/* Brand & Stack Info */}
        <div className="text-center md:text-left space-y-3 max-w-sm">
          <div className="text-2xl font-display font-extrabold tracking-tight text-white">
            DHRUV <span className="text-cyan-400">PATIL</span>
          </div>
          <p className="text-xs text-gray-400 leading-relaxed font-sans">
            AI Research Engineer & Full-Stack Developer specializing in Agentic AI systems, Gemini Live WebSockets, and high-performance Web Platforms.
          </p>
          <div className="pt-2 text-xs font-mono text-cyan-300">
            Built using React • Next.js • Three.js • Framer Motion • Tailwind CSS
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col items-center md:items-start space-y-2">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400">Navigation</span>
          <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 text-xs font-mono text-gray-300 text-center md:text-left">
            <a href="#hero" className="hover:text-cyan-300 transition-colors">01. Hero Section</a>
            <a href="#about" className="hover:text-cyan-300 transition-colors">02. About Me</a>
            <a href="#skills" className="hover:text-cyan-300 transition-colors">03. Technical Matrix</a>
            <a href="#featured-project" className="hover:text-cyan-300 transition-colors">04. Featured AI Showcase</a>
            <a href="#work" className="hover:text-cyan-300 transition-colors">05. Projects</a>
            <a href="#contact" className="hover:text-cyan-300 transition-colors">06. Contact</a>
          </div>
        </div>

        {/* Social Accounts */}
        <div className="flex flex-col items-center md:items-end space-y-4">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400">Connect Online</span>
          <div className="flex flex-wrap gap-3">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-2xl bg-white/5 hover:bg-cyan-500 hover:text-black border border-white/10 text-white transition-all hover:scale-105"
                title={link.name}
              >
                {link.icon}
              </a>
            ))}
          </div>
          <p className="text-[11px] font-mono text-gray-500">© 2026 Dhruv Patil. All rights reserved.</p>
        </div>

      </div>
    </footer>
  )
}
