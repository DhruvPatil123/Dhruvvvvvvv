"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Download, Github, Twitter, Linkedin, Instagram } from 'lucide-react'
import { downloadResume } from '@/lib/downloadResume'
import LeetCodeIcon from '../LeetCodeIcon'

export default function Hero() {
  return (
    <section id="hero" className="relative w-full h-screen flex flex-col items-center justify-center px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-4xl space-y-8"
      >


        {/* Hero Title */}
        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-medium tracking-tighter text-white leading-[0.9] mb-4">
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-zinc-400 via-zinc-150 to-white">
            DHRUV
          </span> <br />
          <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-secondary animate-gradient">
            DINESH PATIL
          </span>
        </h1>

        {/* Refined Description */}
        <p className="text-gray-300 font-sans text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed max-w-xl md:max-w-2xl tracking-normal">
          B.Tech in Artificial Intelligence Researcher & Generative Model Engineer. <br />
          <span className="text-gray-400">Pioneering the intersection of autonomous agents, modern language workflows, and responsive 3D visualization.</span>
        </p>

        {/* Polished Calls to Action & Social Nodes */}
        <div className="flex flex-col sm:flex-row gap-5 justify-center items-center pt-4">
          <motion.a
            href="#work"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-auto bg-primary text-black font-mono text-xs uppercase tracking-widest px-8 py-4 rounded-full font-bold flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,242,255,0.25)] hover:shadow-[0_0_35px_rgba(0,242,255,0.45)] transition-all duration-300 group"
          >
            Explore Work
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
          </motion.a>
          
          <motion.button
            onClick={downloadResume}
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-auto glass-effect hover:bg-white/10 text-white font-mono text-xs uppercase tracking-widest px-8 py-4 rounded-full font-bold flex items-center justify-center gap-2 border border-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer"
          >
            Download CV
            <Download className="w-4 h-4 text-primary" />
          </motion.button>

          {/* Social Icons Dock */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex gap-3 mt-4 sm:mt-0"
          >
            <motion.a 
              href="https://github.com/DhruvPatil123" 
              target="_blank" 
              rel="noreferrer" 
              aria-label="GitHub" 
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="p-3.5 glass-effect rounded-full text-white hover:text-primary hover:border-primary/20 transition-all duration-300 border border-white/5"
            >
              <Github className="w-4.5 h-4.5" />
            </motion.a>
            <motion.a 
              href="https://x.com/DhruvPatil_18" 
              target="_blank" 
              rel="noreferrer" 
              aria-label="X / Twitter" 
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="p-3.5 glass-effect rounded-full text-white hover:text-primary hover:border-primary/20 transition-all duration-300 border border-white/5"
            >
              <Twitter className="w-4.5 h-4.5" />
            </motion.a>
            <motion.a 
              href="https://www.instagram.com/_dhruv.exe.18" 
              target="_blank" 
              rel="noreferrer" 
              aria-label="Instagram" 
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="p-3.5 glass-effect rounded-full text-white hover:text-primary hover:border-primary/20 transition-all duration-300 border border-white/5"
            >
              <Instagram className="w-4.5 h-4.5" />
            </motion.a>
            <motion.a 
              href="https://www.linkedin.com/in/dhruv-patil-3816043b7/" 
              target="_blank" 
              rel="noreferrer" 
              aria-label="LinkedIn" 
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="p-3.5 glass-effect rounded-full text-white hover:text-primary hover:border-primary/20 transition-all duration-300 border border-white/5"
            >
              <Linkedin className="w-4.5 h-4.5" />
            </motion.a>
            <motion.a 
              href="https://leetcode.com/u/Dhruv_Patil_18/" 
              target="_blank" 
              rel="noreferrer" 
              aria-label="LeetCode" 
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="p-3.5 glass-effect rounded-full text-white hover:text-primary hover:border-primary/20 transition-all duration-300 border border-white/5"
            >
              <LeetCodeIcon className="w-4.5 h-4.5" />
            </motion.a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
