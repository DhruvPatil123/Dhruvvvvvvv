"use client"

import React from 'react'
import { motion } from 'framer-motion'

const TITLE_PREFIXES = new Set(['dr.', 'prof.'])

const getInitials = (name: string) => {
  const nameParts = name
    .split(' ')
    .filter((part) => !TITLE_PREFIXES.has(part.toLowerCase()))

  const initials = nameParts.length > 1
    ? [nameParts[0], nameParts[nameParts.length - 1]]
    : nameParts

  return initials.map((part) => part[0]).join('')
}

const TESTIMONIALS = [
  {
    name: 'Dr. Aris Vance',
    role: 'AI Internship Coordinator at EduSkills Foundation',
    content: "Dhruv's work during his GenAI internship was outstanding. He integrated Gemini Multimodal APIs and built robust proctoring models that exceeded our expectations."
  },
  {
    name: 'Elena Rostova',
    role: 'Lead Designer & VisionCraft.AI Collaborator',
    content: "Collaborating with Dhruv on VisionCraft.AI was an amazing experience. His ability to translate complex GAN structures into a fluid, user-friendly interface is rare for a student engineer."
  },
  {
    name: 'Prof. Rajesh Mehta',
    role: 'Department of AI, JDCOEM',
    content: "Dhruv demonstrates a strong research mindset in Agentic AI and RAG systems. His project TenderScan.AI showed remarkable natural language processing classification performance."
  }
]

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative w-full min-h-[auto] md:min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-20 md:py-32 lg:py-48">
      <div className="max-w-6xl w-full text-center mb-16 md:mb-20 space-y-4">
        {/* Section Indicator */}
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary font-medium">
          [ 07 // COLLABORATIONS ]
        </span>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl lg:text-6xl font-display font-medium text-white tracking-tight"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-400 via-zinc-200 to-white">
            COLLABORATORS
          </span>{" "}
          <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
            & MENTORS
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          viewport={{ once: true }}
          className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto font-sans leading-relaxed"
        >
          Feedback and professional endorsements from academic advisors, project collaborators, and industry mentors.
        </motion.p>
      </div>

      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-3 gap-8">
        {TESTIMONIALS.map((t, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            viewport={{ once: true }}
            className="glass-effect p-6 sm:p-8 rounded-3xl border border-white/5 hover:border-secondary/30 transition-all duration-300 relative flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-secondary/10 text-secondary border border-secondary/20 flex items-center justify-center font-display font-bold shrink-0 text-sm">
                  {getInitials(t.name)}
                </div>
                <div className="text-left">
                  <h4 className="text-white font-display font-medium text-base">{t.name}</h4>
                  <p className="text-gray-400 font-mono text-[10px] mt-0.5">{"// "}{t.role}</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed font-sans italic opacity-90">
                &ldquo;{t.content}&rdquo;
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
