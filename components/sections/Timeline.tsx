"use client"

import React from 'react'
import { motion } from 'framer-motion'

const EXPERIENCE = [
  {
    role: 'B.Tech in Artificial Intelligence',
    company: 'J.D. College of Engineering and Management',
    period: 'Aug 2025 - Present',
    description: 'Pursuing degree with a strong focus on NLP, LLMs, Generative AI, and Agentic workflows. Maintaining an outstanding academic standing with a CGPA of 8.76.',
    skills: ['GenAI', 'LLMs', 'Agentic AI']
  },

  {
    role: 'GenAI & Deep Learning Intern',
    company: 'EduSkills Foundation / AICTE',
    period: 'Jan 2026 - Mar 2026',
    description: 'Specialized in Generative Adversarial Networks, Deep Learning Architectures, and LLM Pipeline optimization.',
    skills: ['GANs', 'DL Pipelines', 'NLP']
  },
  {
    role: 'UI/UX Design & Web Prototyping Intern',
    company: 'EduSkills Foundation / AICTE',
    period: 'Apr 2026 - Jun 2026',
    description: 'Developed high-fidelity wireframes and functional digital prototypes, focusing on component atomization and responsive frameworks.',
    skills: ['Figma', 'Prototyping', 'UX Design']
  },
  {
    role: 'Enterprise Flask Backend Certified',
    company: 'L&T EduTech',
    period: 'May 2026',
    description: 'Mastered production SQL routing, RESTful architecture orchestration, and multi-threaded request processing using Flask.',
    skills: ['Flask', 'SQL', 'REST API']
  },
  {
    role: 'Diploma in Computer Science',
    company: 'NIT Polytechnic, Nagpur',
    period: '2022 - 2025',
    description: 'Built foundational expertise in DSA, OOPs, and Relational Databases. Completed with a score of 78%.',
    skills: ['DSA', 'OOPs', 'Databases']
  }
]

export default function Timeline() {
  return (
    <section id="experience" className="relative w-full min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-24 md:py-32 lg:py-40">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-16 md:mb-20 space-y-4">
        {/* Section Indicator */}
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary font-medium">
          [ 04 // DEVELOPMENT TRAJECTORY ]
        </span>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl lg:text-6xl font-display font-light text-white tracking-normal leading-tight"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-300 via-zinc-100 to-white italic font-light">
            Professional
          </span>{" "}
          <span className="font-normal text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-200 to-secondary animate-gradient">
            Trajectory
          </span>
        </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            viewport={{ once: true }}
            className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto font-sans leading-relaxed"
          >
            A chronological mapping of my academic pursuit and professional milestones in Artificial Intelligence.
          </motion.p>
        </div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-secondary to-transparent -translate-x-1/2" />

          <div className="space-y-12">
            {EXPERIENCE.map((exp, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.08 }}
                viewport={{ once: true }}
                className={`relative flex flex-col md:flex-row items-center ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Marker */}
                <div className="absolute left-0 md:left-1/2 top-0 w-4 h-4 rounded-full bg-black border-4 border-primary -translate-x-1/2 z-10 shadow-[0_0_12px_rgba(0,242,255,0.8)]" />

                <div className="w-full md:w-1/2 pl-8 md:pl-0 md:px-12">
                  <div className="glass-effect p-5 sm:p-6 rounded-3xl border border-white/5 hover:border-primary/20 transition-all duration-300">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-4">
                      <h3 className="text-lg md:text-xl font-display font-medium text-white">{exp.role}</h3>
                      <span className="text-gray-400 font-mono text-[10px] md:text-xs font-semibold whitespace-nowrap bg-white/[0.04] px-2.5 py-1 rounded-md border border-white/5">{exp.period}</span>
                    </div>
                    <p className="text-primary font-mono text-[11px] uppercase tracking-wider font-bold mb-3">{"// "}{exp.company}</p>
                    <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-6 font-sans">{exp.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {exp.skills.map(skill => (
                        <span key={skill} className="px-2.5 py-1 rounded-lg bg-white/[0.03] text-gray-300 font-mono text-[9px] uppercase tracking-widest border border-white/5">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
