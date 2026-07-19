"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Award, GraduationCap, CheckCircle2 } from 'lucide-react'

const EDUCATION = [
  {
    degree: 'B.Tech — Artificial Intelligence',
    institution: 'J.D. College of Engineering and Management, Nagpur',
    year: '2025 - 2028',
    details: 'Specializing in NLP, Large Language Models (LLMs), Generative AI, and Agentic workflows. CGPA: 8.76 ⭐'
  },
  {
    degree: 'Diploma — Computer Science',
    institution: 'NIT Polytechnic, Nagpur-Mahurzari',
    year: '2022 - 2025',
    details: 'Foundational studies in DSA, OOPs, and Relational Databases. Score: 78%.'
  },
  {
    degree: 'Secondary Education (10th Grade)',
    institution: 'Yugantar High School, Sadar, Nagpur',
    year: 'Completed 2022',
    details: 'High-performance scores in Mathematics, Physics, Chemistry, and Computer Applications. Score: 81%.'
  }
]

const CERTIFICATIONS = [
  {
    name: 'Generative AI, Deep Learning & LLMs',
    issuer: 'EduSkills Foundation / AICTE',
    date: 'Mar 2026'
  },
  {
    name: 'Professional UI/UX Design & Web Prototyping',
    issuer: 'EduSkills Foundation / AICTE',
    date: 'Jun 2026'
  },
  {
    name: 'Enhancing Soft Skills & Personality',
    issuer: 'NPTEL (IIT Kanpur)',
    date: 'Apr 2026'
  },
  {
    name: 'Full-Stack Flask Development Mastery',
    issuer: 'L&T EduTech',
    date: 'May 2026'
  }
]

export default function Credentials() {
  return (
    <section id="credentials" className="relative w-full min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-24 md:py-32 lg:py-40">
      <div className="max-w-6xl w-full text-center mb-16 md:mb-20 space-y-4">
        {/* Section Indicator */}
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary font-medium">
          [ 06 // INTELLECTUAL BASIS ]
        </span>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl lg:text-6xl font-display font-light text-white tracking-normal leading-tight"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-300 via-zinc-100 to-white italic font-light">
            Academic
          </span>{" "}
          <span className="font-normal text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-200 to-secondary animate-gradient">
            Credentials
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          viewport={{ once: true }}
          className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto font-sans leading-relaxed"
        >
          A foundation of rigorous studies and continuous skill acquisitions driving my pursuit of AI research.
        </motion.p>
      </div>

      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Education */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <div className="flex items-center gap-3 text-primary mb-8">
            <GraduationCap className="w-5 h-5" />
            <h3 className="text-sm font-mono font-bold text-white uppercase tracking-widest">Education</h3>
          </div>
          {EDUCATION.map((edu, idx) => (
            <div key={idx} className="glass-effect p-5 sm:p-6 rounded-2xl border border-white/5 hover:border-primary/20 transition-all duration-300 group">
              <div className="flex justify-between items-start mb-4">
                <h4 className="text-lg md:text-xl font-display font-medium text-white">{edu.degree}</h4>
                <span className="text-gray-400 font-mono text-[10px] md:text-xs font-semibold bg-white/[0.04] px-2 py-0.5 rounded border border-white/5">{edu.year}</span>
              </div>
              <p className="text-primary font-mono text-[11px] uppercase tracking-wider font-bold mb-2">{"// "}{edu.institution}</p>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed font-sans">{edu.details}</p>
            </div>
          ))}
        </motion.div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <div className="flex items-center gap-3 text-secondary mb-8">
            <Award className="w-5 h-5" />
            <h3 className="text-sm font-mono font-bold text-white uppercase tracking-widest">Certifications</h3>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {CERTIFICATIONS.map((cert, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.01 }}
                className="glass-effect p-4 rounded-xl border border-white/5 flex items-center justify-between group hover:border-secondary/30 transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <CheckCircle2 className="w-4 h-4 text-secondary shrink-0" />
                  <div>
                    <h4 className="text-white font-display font-medium text-sm md:text-base group-hover:text-secondary transition-colors">{cert.name}</h4>
                    <p className="text-gray-400 font-sans text-xs mt-0.5">{cert.issuer}</p>
                  </div>
                </div>
                <span className="text-gray-400 font-mono text-[10px] whitespace-nowrap bg-white/[0.04] px-2 py-0.5 rounded border border-white/5">{cert.date}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
