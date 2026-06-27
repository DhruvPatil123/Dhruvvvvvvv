"use client"

import React from 'react'
import { Github, Twitter, Linkedin, Instagram, ExternalLink } from 'lucide-react'
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
    <footer className="relative w-full py-12 px-6 border-t border-white/10 bg-dark/50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-center md:text-left">
          <div className="text-xl font-bold tracking-tighter text-white mb-2">
            DHRUV <span className="text-primary">PATIL</span>
          </div >
          <p className="text-gray-500 text-sm">© 2026 | AI Researcher & Model Engineer</p>
        </div >

        <div className="flex flex-wrap justify-center gap-6">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-effect p-3 rounded-full text-white hover:text-primary transition-all hover:scale-110 group"
              title={link.name}
            >
              {link.icon}
            </a>
          ))}
        </div >

        <div className="flex gap-8 text-xs uppercase tracking-widest text-gray-500">
          <a href="#hero" className="hover:text-white transition-colors">Home</a>
          <a href="#about" className="hover:text-white transition-colors">About</a>
          <a href="#contact" className="hover:text-white transition-colors">Contact</a>
        </div >
      </div >
    </footer>
  )
}
