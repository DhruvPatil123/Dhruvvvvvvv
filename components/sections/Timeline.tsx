"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  GraduationCap,
  Briefcase,
  Code2,
  Trophy,
  Award,
  Sparkles,
  Calendar,
  Building2,
  ExternalLink,
  ChevronRight
} from 'lucide-react'

export type TimelineCategory = 'education' | 'internship' | 'project' | 'hackathon' | 'certification'

export interface TimelineItem {
  id: string
  title: string
  subtitle: string
  category: TimelineCategory
  period: string
  description: string
  highlights: string[]
  skills: string[]
  badgeText: string
  icon: React.ElementType
  color: string
}

const TIMELINE_DATA: TimelineItem[] = [
  {
    id: 'btech-ai',
    title: 'B.Tech in Artificial Intelligence',
    subtitle: 'J.D. College of Engineering & Management',
    category: 'education',
    period: 'Aug 2025 - Present',
    description: 'Pursuing degree with an outstanding 8.76 CGPA score. Deep emphasis on Large Language Models, Generative Adversarial Networks, RAG systems, and Agentic Orchestration frameworks.',
    highlights: ['Current CGPA: 8.76 / 10.0', 'Lead AI Student Researcher', 'Specialization in LLM Fine-Tuning & Multi-Agent Workflows'],
    skills: ['GenAI', 'LLMs', 'Agentic AI', 'PyTorch', 'Next.js'],
    badgeText: 'B.Tech Degree',
    icon: GraduationCap,
    color: 'from-cyan-500 to-blue-500'
  },
  {
    id: 'raincrew-ai',
    title: 'Raincrew.AI — Multimodal Hiring Engine',
    subtitle: 'Flagship AI Project',
    category: 'project',
    period: 'Jun 2026',
    description: 'Engineered a real-time AI talent acquisition platform utilizing Gemini Multimodal Live WebSocket API for bi-directional audio proctoring and automated candidate evaluation.',
    highlights: ['Gemini Multimodal Live API', 'Real-time WebSocket Audio Stream', 'Biometric Proctoring Engine'],
    skills: ['Gemini API', 'WebSockets', 'Next.js', 'Tailwind CSS'],
    badgeText: 'Flagship Project',
    icon: Code2,
    color: 'from-blue-500 to-indigo-500'
  },
  {
    id: 'genai-intern',
    title: 'GenAI & Deep Learning Intern',
    subtitle: 'EduSkills Foundation / AICTE',
    category: 'internship',
    period: 'Jan 2026 - Mar 2026',
    description: 'Spearheaded research into Generative Adversarial Networks (GANs), Transformer encoder optimization, and multi-tenant RAG retrieval pipelines.',
    highlights: ['Optimized model inferencing velocity by 32%', 'Constructed custom GAN text-to-image pipeline', 'Evaluated 100+ prompt embedding strategies'],
    skills: ['GANs', 'Deep Learning', 'PyTorch', 'RAG'],
    badgeText: 'AICTE Internship',
    icon: Briefcase,
    color: 'from-emerald-500 to-teal-500'
  },
  {
    id: 'autoforge-agent',
    title: 'AutoForge.AI — Autonomous Code Agent',
    subtitle: 'Agentic AI System',
    category: 'project',
    period: 'Nov 2025',
    description: 'Developed an autonomous software engineering agent capable of parsing natural language requirements, executing code inside sandboxed Docker containers, and running self-healing test cycles.',
    highlights: ['Sandboxed Execution Engine', 'Self-Healing Unit Test Loops', 'LangChain & FastAPI Backend'],
    skills: ['Agentic Workflows', 'Python', 'FastAPI', 'Docker'],
    badgeText: 'Agentic AI Project',
    icon: Code2,
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'ai-hackathon',
    title: 'National AI Agents Hackathon Winner',
    subtitle: 'Top 3 National Finalist',
    category: 'hackathon',
    period: 'Dec 2025',
    description: 'Built and pitched an autonomous multi-agent healthcare routing pipeline in under 36 hours. Recognized for model efficiency, sandboxed execution safety, and execution clarity.',
    highlights: ['Top 3 out of 180+ competing teams', '36-hour sprint prototype', 'Awarded Best Technical Architecture'],
    skills: ['Multi-Agent Systems', 'FastAPI', 'LLM Routing', 'Prompt Engineering'],
    badgeText: 'Hackathon Award',
    icon: Trophy,
    color: 'from-amber-400 to-orange-500'
  },
  {
    id: 'uiux-intern',
    title: 'UI/UX Design & Web Prototyping Intern',
    subtitle: 'EduSkills Foundation / AICTE',
    category: 'internship',
    period: 'Apr 2026 - Jun 2026',
    description: 'Designed responsive component atomic design systems, glassmorphism UI specs, and micro-interaction prototypes for scalable web portals.',
    highlights: ['Built 40+ reusable atomic components', 'Designed high-contrast dark theme UI system', 'Accelerated design-to-code velocity by 40%'],
    skills: ['Figma', 'Prototyping', 'Design Systems', 'Tailwind CSS'],
    badgeText: 'UI/UX Internship',
    icon: Briefcase,
    color: 'from-pink-500 to-rose-500'
  },
  {
    id: 'flask-cert',
    title: 'Enterprise Flask Backend Certified',
    subtitle: 'L&T EduTech',
    category: 'certification',
    period: 'May 2026',
    description: 'Mastered production SQL routing, RESTful architecture orchestration, multi-threaded request processing, and API security using Flask.',
    highlights: ['Certified in Enterprise Flask Systems', 'SQL Database Performance Tuning', 'RESTful API Security Standards'],
    skills: ['Flask', 'SQL', 'REST API', 'Backend Security'],
    badgeText: 'L&T Certification',
    icon: Award,
    color: 'from-indigo-500 to-cyan-500'
  },
  {
    id: 'software-predictor',
    title: 'Software Evolution Predictor',
    subtitle: 'AI Research Tool',
    category: 'project',
    period: 'Sep 2025',
    description: 'Constructed an AST code parsing graph engine in Python mapping git commit churn into Neo4j knowledge graphs to forecast technical debt trajectories.',
    highlights: ['Abstract Syntax Tree (AST) Parser', 'Neo4j Knowledge Graph', 'Technical Debt Forecasting'],
    skills: ['Python', 'Neo4j', 'AST', 'Git Telemetry'],
    badgeText: 'Research Project',
    icon: Code2,
    color: 'from-cyan-400 to-teal-500'
  },
  {
    id: 'polytechnic-diploma',
    title: 'Diploma in Computer Science',
    subtitle: 'NIT Polytechnic, Nagpur',
    category: 'education',
    period: 'Aug 2022 - Jun 2025',
    description: 'Completed 3-year diploma foundation with a 78% aggregate score. Built core mastery in Data Structures & Algorithms, Object-Oriented Programming, and Relational Database Systems.',
    highlights: ['78% Distinction Score', 'Head of Student Technical Committee', 'Lead Developer on Capstone Database Project'],
    skills: ['DSA', 'C++', 'Java', 'SQL', 'OOPs'],
    badgeText: 'Polytechnic Diploma',
    icon: GraduationCap,
    color: 'from-blue-600 to-cyan-600'
  }
]

export default function Timeline() {
  const [activeFilter, setActiveFilter] = useState<'all' | TimelineCategory>('all')

  const filteredItems = activeFilter === 'all'
    ? TIMELINE_DATA
    : TIMELINE_DATA.filter(item => item.category === activeFilter)

  const filterTabs = [
    { id: 'all', label: 'All Milestones', count: TIMELINE_DATA.length },
    { id: 'education', label: 'Polytechnic & B.Tech', count: TIMELINE_DATA.filter(i => i.category === 'education').length },
    { id: 'internship', label: 'Internships', count: TIMELINE_DATA.filter(i => i.category === 'internship').length },
    { id: 'project', label: 'AI Projects', count: TIMELINE_DATA.filter(i => i.category === 'project').length },
    { id: 'hackathon', label: 'Hackathons', count: TIMELINE_DATA.filter(i => i.category === 'hackathon').length },
    { id: 'certification', label: 'Certifications', count: TIMELINE_DATA.filter(i => i.category === 'certification').length },
  ]

  return (
    <section id="experience" className="relative w-full min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-24 md:py-36 bg-zinc-950/90 text-white overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-cyan-500/10 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-5xl w-full relative z-10 space-y-12">
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 font-mono text-xs uppercase font-bold tracking-wider"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Integrated Growth Story</span>
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-light tracking-normal leading-tight"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 via-white to-gray-300">
              Academic & Professional
            </span>{" "}
            <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-primary to-blue-400">
              Timeline
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-gray-300 text-sm sm:text-base md:text-lg font-sans leading-relaxed"
          >
            A cohesive chronological narrative linking Polytechnic, B.Tech in AI, hands-on internships, hackathon victories, certifications, and flagship AI systems.
          </motion.p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center justify-center flex-wrap gap-2 pt-2">
          {filterTabs.map((tab) => {
            const isActive = activeFilter === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id as any)}
                className={`px-3.5 sm:px-4 py-2 rounded-xl font-mono text-xs uppercase tracking-wider font-bold transition-all min-h-[40px] flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/60 shadow-[0_0_18px_rgba(0,242,255,0.3)] scale-105'
                    : 'bg-white/5 text-gray-400 hover:text-white border border-white/10 hover:border-white/20'
                }`}
              >
                <span>{tab.label}</span>
                <span className={`px-1.5 py-0.5 rounded-md text-[10px] ${isActive ? 'bg-cyan-900 text-cyan-200' : 'bg-white/10 text-gray-400'}`}>
                  {tab.count}
                </span>
              </button>
            )
          })}
        </div>

        {/* Timeline Visualization */}
        <div className="relative pt-6">
          {/* Central Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-10 bottom-10 w-0.5 bg-gradient-to-b from-cyan-500 via-blue-500 to-cyan-500/20 -translate-x-1/2 opacity-60" />

          <div className="space-y-12 sm:space-y-16">
            {filteredItems.map((item, idx) => {
              const IconComponent = item.icon
              const isEven = idx % 2 === 0

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  viewport={{ once: true }}
                  className={`relative flex flex-col md:flex-row items-start ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline Marker Node */}
                  <div className="absolute left-4 md:left-1/2 top-1.5 -translate-x-1/2 z-10 flex items-center justify-center">
                    <div className={`w-9 h-9 rounded-full bg-zinc-950 border-2 border-cyan-400 flex items-center justify-center shadow-[0_0_15px_rgba(0,242,255,0.6)] text-cyan-300`}>
                      <IconComponent className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Content Box */}
                  <div className="w-full md:w-1/2 pl-12 md:pl-0 md:px-8">
                    <div className="p-6 sm:p-7 rounded-3xl bg-black/70 border border-white/10 hover:border-cyan-500/40 transition-all duration-300 shadow-xl space-y-4 backdrop-blur-xl group hover:-translate-y-1">
                      {/* Top Meta Bar */}
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-mono text-[10px] font-bold uppercase tracking-wider bg-gradient-to-r ${item.color} text-white shadow-sm`}>
                          <IconComponent className="w-3 h-3" />
                          {item.badgeText}
                        </span>

                        <div className="flex items-center gap-1.5 text-xs font-mono text-gray-400">
                          <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                          <span>{item.period}</span>
                        </div>
                      </div>

                      {/* Titles */}
                      <div className="space-y-1">
                        <h3 className="text-lg sm:text-xl font-display font-semibold text-white group-hover:text-cyan-300 transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-xs sm:text-sm font-mono text-cyan-400 font-medium">
                          {item.subtitle}
                        </p>
                      </div>

                      {/* Description */}
                      <p className="text-gray-300 text-xs sm:text-sm leading-relaxed font-sans">
                        {item.description}
                      </p>

                      {/* Bullet Highlights */}
                      <ul className="space-y-1.5 pt-1">
                        {item.highlights.map((h, hIdx) => (
                          <li key={hIdx} className="flex items-start gap-2 text-xs text-gray-300 font-sans">
                            <ChevronRight className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Skills/Tags */}
                      <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/5">
                        {item.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-2.5 py-1 rounded-lg bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 font-mono text-[10px] uppercase font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
