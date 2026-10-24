"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRecruiterStore } from '@/store/useRecruiterStore'
import { downloadResume } from '@/lib/downloadResume'
import { 
  X, Download, Mail, Github, Linkedin, Code, Sparkles, 
  CheckCircle2, ArrowUpRight, Zap, Trophy, Briefcase, GraduationCap, 
  ExternalLink, Layers, Globe, Copy, Check, Phone
} from 'lucide-react'
import { playParchmentOpen } from '@/lib/sounds'
import { PORTFOLIO_DATA } from '@/lib/portfolioData'

export default function RecruiterViewModal() {
  const isOpen = useRecruiterStore((state) => state.isOpen)
  const openRecruiterView = useRecruiterStore((state) => state.openRecruiterView)
  const closeRecruiterView = useRecruiterStore((state) => state.closeRecruiterView)
  
  const [copiedEmail, setCopiedEmail] = useState(false)
  const [copiedSummary, setCopiedSummary] = useState(false)
  const [liveStats, setLiveStats] = useState({
    github: '1,005+',
    leetcode: '472 Solved',
    rank: '#226,317',
    loading: true
  })

  // Deep linking check: support ?view=recruiter
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search)
      if (urlParams.get('view') === 'recruiter') {
        openRecruiterView()
      }
    }
  }, [openRecruiterView])

  useEffect(() => {
    // Esc key support to close modal
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeRecruiterView()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, closeRecruiterView])

  // Fetch live stats dynamically for recruiter view
  useEffect(() => {
    if (!isOpen) return
    playParchmentOpen()
    async function loadStats() {
      try {
        const [ghRes, lcRes] = await Promise.all([
          fetch('/api/github').then(r => r.json()).catch(() => null),
          fetch('/api/leetcode').then(r => r.json()).catch(() => null)
        ])
        setLiveStats({
          github: ghRes?.totalContributions ? `${ghRes.totalContributions.toLocaleString()}+` : '1,005+',
          leetcode: lcRes?.solvedTotal ? `${lcRes.solvedTotal} Solved` : '472 Solved',
          rank: lcRes?.ranking ? `#${lcRes.ranking.toLocaleString()}` : '#226,317',
          loading: false
        })
      } catch {
        setLiveStats(prev => ({ ...prev, loading: false }))
      }
    }
    loadStats()
  }, [isOpen])

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText(PORTFOLIO_DATA.email)
    setCopiedEmail(true)
    setTimeout(() => setCopiedEmail(false), 2000)
  }

  const copySummaryToClipboard = () => {
    const summary = `**Dhruv Dinesh Patil — AI Researcher & Generative Model Engineer**
Email: ${PORTFOLIO_DATA.email} | Phone: ${PORTFOLIO_DATA.phone} | Location: ${PORTFOLIO_DATA.location}
Education: B.Tech in Artificial Intelligence (CGPA 8.76), JD College of Engineering & Management, Nagpur
Core Stack: Python, PyTorch, LLMs, RAG, Agentic AI, Next.js, FastAPI, PostgreSQL, Docker, C++
Key Projects:
- Raincrew.AI: AI Talent Acquisition with Google Gemini Multimodal Live WebSocket API & WebRTC
- AutoForge.AI: Autonomous engineering agent with sandboxed self-healing code test loops
- Software Evolution Predictor: AST parsing into Neo4j graphs forecasting technical debt & refactoring risks
- Dockmind: Enterprise RAG document indexing & vector citation search
Portfolio: https://dhruvvvvvvv.vercel.app | GitHub: ${PORTFOLIO_DATA.socials.github} | LeetCode: ${PORTFOLIO_DATA.socials.leetcode}`

    navigator.clipboard.writeText(summary)
    setCopiedSummary(true)
    setTimeout(() => setCopiedSummary(false), 2500)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-2xl" data-lenis-prevent data-lenis-prevent-wheel data-lenis-prevent-touch>
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 15 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-5xl bg-zinc-950 border border-white/15 rounded-2xl shadow-[0_25px_80px_rgba(0,0,0,0.95)] overflow-hidden flex flex-col max-h-[92vh] text-white my-auto relative backdrop-blur-2xl"
            data-lenis-prevent
          >
            {/* Top Announcement Bar */}
            <div className="bg-zinc-900/90 px-6 py-2 border-b border-white/10 flex items-center justify-between font-mono text-[11px] text-zinc-300">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span className="font-bold tracking-wider uppercase text-cyan-300">[ 30-SEC RECRUITER FAST DOSSIER ]</span>
              </div>
              <div className="flex items-center gap-4 hidden sm:flex text-zinc-400">
                <span>Nagpur, India (Remote / Relocation)</span>
                <span className="text-emerald-400 font-semibold">{'//'} Immediate Availability</span>
              </div>
            </div>

            {/* Modal Header */}
            <div className="p-6 sm:p-7 border-b border-white/10 bg-white/[0.01] flex flex-col md:flex-row md:items-center justify-between gap-5">
              <div className="space-y-1">
                <div className="flex items-center gap-3 flex-wrap">
                  <h2 className="text-2xl sm:text-3xl font-display font-medium text-white tracking-tight">
                    Dhruv Patil
                  </h2>
                  <span className="px-2.5 py-1 rounded-md bg-zinc-900 border border-cyan-500/30 text-cyan-300 font-mono text-xs font-semibold">
                    {'//'} AI & FULL STACK ARCHITECT
                  </span>
                </div>
                <p className="text-zinc-400 text-xs sm:text-sm font-sans max-w-2xl leading-relaxed">
                  Specialized in production LLM workflows, autonomous agent loops, high-performance C++ pipelines, and scalable Next.js systems.
                </p>
              </div>

              {/* Close Button & Actions */}
              <div className="flex items-center gap-3 self-end md:self-center">
                <button
                  onClick={closeRecruiterView}
                  className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-850 text-zinc-400 hover:text-white transition-all border border-white/10 cursor-pointer"
                  title="Exit Recruiter View (Esc)"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6 sm:p-7 overflow-y-auto space-y-6 flex-1 scrollbar-thin" data-lenis-prevent data-lenis-prevent-wheel data-lenis-prevent-touch>
              {/* One-Click Executive Action Bar */}
                  <div className="space-y-3 bg-zinc-950 border border-white/10 p-4 rounded-xl">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono uppercase tracking-wider text-cyan-300 font-bold flex items-center gap-1.5">
                        <Download className="w-3.5 h-3.5 text-cyan-400" /> {'//'} DOWNLOAD TAILORED CV [PDF]:
                      </span>
                      <span className="text-[10px] text-zinc-500 font-mono">Select target role:</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <button
                        onClick={() => downloadResume('charcoal', 'ai')}
                        className="p-3 rounded-lg bg-zinc-900/90 hover:bg-zinc-850 border border-cyan-500/30 hover:border-cyan-400/60 text-white font-mono text-xs text-left transition-all flex items-center gap-2 cursor-pointer group active:scale-95"
                      >
                        <Zap className="w-4 h-4 text-cyan-400 shrink-0 group-hover:scale-110 transition-transform" />
                        <div>
                          <p className="font-bold text-cyan-300">AI & LLM Focus</p>
                          <p className="text-[9px] text-zinc-400 leading-none mt-0.5">Agentic AI, RAG, PyTorch</p>
                        </div>
                      </button>

                      <button
                        onClick={() => downloadResume('emerald', 'fullstack')}
                        className="p-3 rounded-lg bg-zinc-900/90 hover:bg-zinc-850 border border-emerald-500/30 hover:border-emerald-400/60 text-white font-mono text-xs text-left transition-all flex items-center gap-2 cursor-pointer group active:scale-95"
                      >
                        <Layers className="w-4 h-4 text-emerald-400 shrink-0 group-hover:scale-110 transition-transform" />
                        <div>
                          <p className="font-bold text-emerald-300">Full-Stack & Cloud</p>
                          <p className="text-[9px] text-zinc-400 leading-none mt-0.5">Next.js 15, SQL, Docker</p>
                        </div>
                      </button>

                      <button
                        onClick={() => downloadResume('cobalt', 'standard')}
                        className="p-3 rounded-lg bg-zinc-900/90 hover:bg-zinc-850 border border-blue-500/30 hover:border-blue-400/60 text-white font-mono text-xs text-left transition-all flex items-center gap-2 cursor-pointer group active:scale-95"
                      >
                        <GraduationCap className="w-4 h-4 text-blue-400 shrink-0 group-hover:scale-110 transition-transform" />
                        <div>
                          <p className="font-bold text-blue-300">Standard Resume</p>
                          <p className="text-[9px] text-zinc-400 leading-none mt-0.5">Comprehensive B.Tech CV</p>
                        </div>
                      </button>
                    </div>

                    <div className="flex justify-between items-center pt-2.5 border-t border-white/5 flex-wrap gap-2">
                      <a
                        href={`mailto:${PORTFOLIO_DATA.email}`}
                        className="px-3.5 py-2 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-zinc-950 font-mono font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-md active:scale-95 cursor-pointer"
                      >
                        <Mail className="w-3.5 h-3.5" /> Email Dhruv Directly {'//'}
                      </a>

                      <div className="flex gap-2 flex-wrap justify-end">
                        <button
                          onClick={copySummaryToClipboard}
                          className="px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-850 border border-cyan-500/40 text-cyan-300 font-mono text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer shadow-sm"
                          title="Copy a 30-second markdown briefing to paste into ATS or Slack"
                        >
                          {copiedSummary ? <Check className="w-3.5 h-3.5 text-cyan-300" /> : <Copy className="w-3.5 h-3.5 text-cyan-400" />}
                          <span>{copiedSummary ? 'Summary Copied!' : 'Copy 30s ATS Summary'}</span>
                        </button>

                        <button
                          onClick={copyEmailToClipboard}
                          className="px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-850 border border-white/10 text-zinc-300 hover:text-white font-mono text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer"
                        >
                          {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Mail className="w-3.5 h-3.5 text-cyan-400" />}
                          <span>{copiedEmail ? 'Copied!' : 'Copy Email'}</span>
                        </button>

                        <a
                          href="https://github.com/DhruvPatil123"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-850 border border-white/10 text-zinc-300 hover:text-white font-mono text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 active:scale-95"
                        >
                          <Github className="w-3.5 h-3.5" />
                          <span>GitHub</span>
                          <ExternalLink className="w-3 h-3 text-zinc-500" />
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Metrics Row */}
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                    <div className="p-3 rounded-xl bg-zinc-900/60 border border-white/10 space-y-1">
                      <div className="flex items-center justify-between text-zinc-400 text-[10px] font-mono">
                        <span>AI Projects</span>
                        <Zap className="w-3.5 h-3.5 text-cyan-400" />
                      </div>
                      <p className="text-xl font-mono font-bold tabular-nums text-cyan-300">12+</p>
                      <p className="text-[9px] text-zinc-400 font-mono">LLMs & Agents</p>
                    </div>

                    <div className="p-3 rounded-xl bg-zinc-900/60 border border-white/10 space-y-1">
                      <div className="flex items-center justify-between text-zinc-400 text-[10px] font-mono">
                        <span>LeetCode</span>
                        <Code className="w-3.5 h-3.5 text-secondary" />
                      </div>
                      <p className="text-xl font-mono font-bold tabular-nums text-white">{liveStats.leetcode}</p>
                      <p className="text-[9px] text-zinc-400 font-mono">{liveStats.rank}</p>
                    </div>

                    <div className="p-3 rounded-xl bg-zinc-900/60 border border-white/10 space-y-1">
                      <div className="flex items-center justify-between text-zinc-400 text-[10px] font-mono">
                        <span>GitHub Commits</span>
                        <Briefcase className="w-3.5 h-3.5 text-emerald-400" />
                      </div>
                      <p className="text-xl font-mono font-bold tabular-nums text-emerald-300">{liveStats.github}</p>
                      <p className="text-[9px] text-emerald-400/80 font-mono">Active Repository</p>
                    </div>

                    <div className="p-3 rounded-xl bg-zinc-900/60 border border-white/10 space-y-1">
                      <div className="flex items-center justify-between text-zinc-400 text-[10px] font-mono">
                        <span>Certifications</span>
                        <Trophy className="w-3.5 h-3.5 text-amber-400" />
                      </div>
                      <p className="text-xl font-mono font-bold tabular-nums text-amber-300">15+</p>
                      <p className="text-[9px] text-amber-400/80 font-mono">AI & Cloud Stack</p>
                    </div>

                    <div className="p-3 rounded-xl bg-zinc-900/60 border border-white/10 space-y-1 col-span-2 sm:col-span-1">
                      <div className="flex items-center justify-between text-zinc-400 text-[10px] font-mono">
                        <span>Experience</span>
                        <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                      </div>
                      <p className="text-xl font-mono font-bold tabular-nums text-purple-300">2+ Roles</p>
                      <p className="text-[9px] text-purple-400/80 font-mono">Industry Software</p>
                    </div>
                  </div>

                  {/* Core Technical Matrix */}
                  <div className="space-y-3">
                    <h3 className="text-xs font-mono uppercase tracking-widest text-primary font-bold flex items-center gap-2">
                      <Layers className="w-4 h-4" /> Core Technical Skill Matrix
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {/* AI & Agentic */}
                      <div className="p-4 rounded-xl bg-zinc-950/80 border border-white/10 space-y-2">
                        <div className="flex items-center justify-between border-b border-white/5 pb-2">
                          <span className="font-mono font-semibold text-xs text-white uppercase tracking-wider">{'//'} Generative AI & Agentic Systems</span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-zinc-900 border border-cyan-500/30 text-cyan-300 font-semibold">EXPERT</span>
                        </div>
                        <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                          Multi-Agent Architecture, Gemini Live Multimodal WebSocket API, LangChain, LlamaIndex, RAG Optimization, Function Calling, Vector Databases (Pinecone, Faiss, Chroma).
                        </p>
                      </div>

                      {/* Full-Stack Cloud */}
                      <div className="p-4 rounded-xl bg-zinc-950/80 border border-white/10 space-y-2">
                        <div className="flex items-center justify-between border-b border-white/5 pb-2">
                          <span className="font-mono font-semibold text-xs text-white uppercase tracking-wider">{'//'} Full-Stack Cloud & Web</span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-zinc-900 border border-emerald-500/30 text-emerald-300 font-semibold">PRODUCTION</span>
                        </div>
                        <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                          Next.js 15 (App Router), React 19, TypeScript, Node.js, Express, Tailwind CSS, PostgreSQL, Firebase Auth & Firestore, REST APIs, WebSockets.
                        </p>
                      </div>

                      {/* Systems & C++ */}
                      <div className="p-4 rounded-xl bg-zinc-950/80 border border-white/10 space-y-2">
                        <div className="flex items-center justify-between border-b border-white/5 pb-2">
                          <span className="font-mono font-semibold text-xs text-white uppercase tracking-wider">{'//'} Systems & Algorithms</span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-zinc-900 border border-amber-500/30 text-amber-300 font-semibold">ADVANCED</span>
                        </div>
                        <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                          C++20, Memory Optimization, Multithreading, Python, Data Structures & Algorithms (470+ LeetCode Solved), System Architecture Design.
                        </p>
                      </div>

                      {/* DevOps & Infra */}
                      <div className="p-4 rounded-xl bg-zinc-950/80 border border-white/10 space-y-2">
                        <div className="flex items-center justify-between border-b border-white/5 pb-2">
                          <span className="font-mono font-semibold text-xs text-white uppercase tracking-wider">{'//'} DevOps & Cloud Infra</span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-zinc-900 border border-purple-500/30 text-purple-300 font-semibold">PROFICIENT</span>
                        </div>
                        <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                          Docker, Kubernetes, GitHub Actions CI/CD pipelines, Cloud Run, Linux Administration, Performance Profiling, Vercel deployments.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* High-Impact Experience Highlights */}
                  <div className="space-y-3">
                    <h3 className="text-xs font-mono uppercase tracking-widest text-cyan-300 font-bold flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-cyan-400" /> {'//'} CAREER & PRODUCTION HIGHLIGHTS
                    </h3>

                    <div className="space-y-2.5">
                      <div className="p-4 rounded-xl bg-zinc-950/80 border border-white/10 space-y-2">
                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <div>
                            <span className="font-mono font-bold text-sm text-white">Generative AI & Agentic Systems Developer</span>
                            <span className="text-xs text-zinc-400 font-mono ml-2">@ Freelance / Open Source Collaborations</span>
                          </div>
                          <span className="font-mono text-xs text-cyan-400 font-semibold">[ 2024 — PRESENT ]</span>
                        </div>
                        <ul className="list-disc list-inside text-xs text-zinc-300 space-y-1.5 font-sans leading-relaxed">
                          <li>Architected multi-agent reasoning loops reducing structured data extraction errors by <strong className="text-white">38%</strong>.</li>
                          <li>Integrated Gemini 2.0 multi-modal tool calling capabilities with instant fallback mechanisms for zero-downtime reliability.</li>
                          <li>Engineered high-performance React & Next.js frontend interfaces handling <strong className="text-white">1,000+ live contributions</strong> seamlessly.</li>
                        </ul>
                      </div>

                      <div className="p-4 rounded-xl bg-zinc-950/80 border border-white/10 space-y-2">
                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <div>
                            <span className="font-mono font-bold text-sm text-white">Full-Stack & Systems Engineering Research</span>
                            <span className="text-xs text-zinc-400 font-mono ml-2">@ Academic & Technical Research</span>
                          </div>
                          <span className="font-mono text-xs text-emerald-400 font-semibold">[ 2023 — PRESENT ]</span>
                        </div>
                        <ul className="list-disc list-inside text-xs text-zinc-300 space-y-1.5 font-sans leading-relaxed">
                          <li>Built custom algorithmic C++ engines and Dockerized server environments with sub-10ms response times.</li>
                          <li>Maintained an active <strong className="text-white">470+ LeetCode problem-solving record</strong> across complex graphs, dynamic programming, and system optimization.</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Direct Contact Footer inside Recruiter View */}
                  <div className="p-5 rounded-xl bg-zinc-950 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                      <h4 className="font-mono font-bold text-sm text-white uppercase tracking-wider">{'//'} Ready to collaborate or schedule an interview?</h4>
                      <p className="text-xs text-zinc-400 font-sans mt-0.5">
                        Email: <strong className="text-cyan-300 font-mono">{PORTFOLIO_DATA.email}</strong> | Phone: <strong className="text-white font-mono">{PORTFOLIO_DATA.phone}</strong>
                      </p>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <a
                        href={`mailto:${PORTFOLIO_DATA.email}`}
                        className="px-4 py-2 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-zinc-950 font-mono font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md inline-flex items-center gap-1.5"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span>Send Email {'//'}</span>
                      </a>
                      <a
                        href="https://linkedin.com/in/dhruv-patil-3816043b7"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-850 text-zinc-300 hover:text-white transition-all border border-white/10"
                        title="LinkedIn Profile"
                      >
                        <Linkedin className="w-4 h-4 text-blue-400" />
                      </a>
                    </div>
                  </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
