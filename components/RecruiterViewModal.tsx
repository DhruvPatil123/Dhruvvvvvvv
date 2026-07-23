"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRecruiterStore } from '@/store/useRecruiterStore'
import { downloadResume } from '@/lib/downloadResume'
import MeetingScheduler from '@/components/MeetingScheduler'
import { 
  X, Download, Calendar, Mail, Github, Linkedin, Code, Sparkles, 
  CheckCircle2, ArrowUpRight, Zap, Trophy, Briefcase, GraduationCap, 
  ExternalLink, Layers, Globe, Copy, Check
} from 'lucide-react'
import { playParchmentOpen } from '@/lib/sounds'

export default function RecruiterViewModal() {
  const isOpen = useRecruiterStore((state) => state.isOpen)
  const closeRecruiterView = useRecruiterStore((state) => state.closeRecruiterView)
  
  const [activeTab, setActiveTab] = useState<'summary' | 'scheduler'>('summary')
  const [copiedEmail, setCopiedEmail] = useState(false)
  const [liveStats, setLiveStats] = useState({
    github: '1,005+',
    leetcode: '472 Solved',
    rank: '#226,317',
    loading: true
  })

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
    navigator.clipboard.writeText('sujalpatil8657231278@gmail.com')
    setCopiedEmail(true)
    setTimeout(() => setCopiedEmail(false), 2000)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-2xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-5xl bg-[#090a0f] border border-white/15 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] text-white my-auto relative"
          >
            {/* Top Announcement Bar */}
            <div className="bg-gradient-to-r from-cyan-950 via-blue-950 to-indigo-950 px-6 py-2.5 border-b border-cyan-500/30 flex items-center justify-between font-mono text-[11px] text-cyan-300">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span className="font-bold tracking-wider uppercase">⚡ 30-Second Recruiter Fast-Scanning View</span>
              </div>
              <div className="flex items-center gap-4 hidden sm:flex">
                <span>Nagpur, India (Open to Remote / Relocation)</span>
                <span className="text-emerald-400 font-bold">🟢 Available Immediately</span>
              </div>
            </div>

            {/* Modal Header */}
            <div className="p-6 sm:p-8 border-b border-white/10 bg-white/[0.02] flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-1.5">
                <div className="flex items-center gap-3 flex-wrap">
                  <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
                    Dhruv Patil
                  </h2>
                  <span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary font-mono text-xs font-semibold">
                    Generative AI & Agentic Systems Engineer
                  </span>
                </div>
                <p className="text-gray-300 text-sm font-sans max-w-2xl">
                  Specialized in building high-throughput agentic workflows, multi-agent LLM systems, C++ optimization, and full-stack cloud web applications.
                </p>
              </div>

              {/* Close & Tab switcher */}
              <div className="flex items-center gap-3 self-end md:self-center">
                <div className="bg-white/5 border border-white/10 p-1 rounded-xl flex items-center gap-1 font-mono text-xs">
                  <button
                    onClick={() => setActiveTab('summary')}
                    className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                      activeTab === 'summary'
                        ? 'bg-primary text-black font-bold shadow-md'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    Quick Brief
                  </button>
                  <button
                    onClick={() => setActiveTab('scheduler')}
                    className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                      activeTab === 'scheduler'
                        ? 'bg-secondary text-black font-bold shadow-md'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <Calendar className="w-3.5 h-3.5" /> Book Call
                  </button>
                </div>

                <button
                  onClick={closeRecruiterView}
                  className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-all border border-white/10 cursor-pointer"
                  title="Exit Recruiter View (Esc)"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-8 flex-1">
              {activeTab === 'scheduler' ? (
                <MeetingScheduler onClose={closeRecruiterView} isModal />
              ) : (
                <>
                  {/* One-Click Executive Action Bar */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    <button
                      onClick={() => downloadResume('charcoal')}
                      className="p-3.5 rounded-2xl bg-gradient-to-r from-primary to-cyan-400 text-black font-mono font-bold text-xs uppercase tracking-wider hover:opacity-95 transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,242,255,0.2)] active:scale-95 cursor-pointer"
                    >
                      <Download className="w-4 h-4" /> Download Resume (PDF)
                    </button>

                    <button
                      onClick={() => setActiveTab('scheduler')}
                      className="p-3.5 rounded-2xl bg-secondary text-black font-mono font-bold text-xs uppercase tracking-wider hover:bg-secondary/90 transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,180,0,0.2)] active:scale-95 cursor-pointer"
                    >
                      <Calendar className="w-4 h-4" /> Book 15-Min Intro Call
                    </button>

                    <button
                      onClick={copyEmailToClipboard}
                      className="p-3.5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 text-white font-mono text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
                    >
                      {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Mail className="w-4 h-4 text-primary" />}
                      <span>{copiedEmail ? 'Email Copied!' : 'Copy Email'}</span>
                    </button>

                    <a
                      href="https://github.com/DhruvPatil123"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-200 hover:text-white font-mono text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 active:scale-95"
                    >
                      <Github className="w-4 h-4" />
                      <span>GitHub Profile</span>
                      <ExternalLink className="w-3 h-3 text-gray-400" />
                    </a>
                  </div>

                  {/* Metrics Row */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
                      <div className="flex items-center justify-between text-gray-400 text-xs font-mono">
                        <span>GitHub Commits</span>
                        <Github className="w-4 h-4 text-primary" />
                      </div>
                      <p className="text-2xl font-mono font-bold text-white">{liveStats.github}</p>
                      <p className="text-[10px] text-emerald-400 font-mono">100% Verified Activity</p>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
                      <div className="flex items-center justify-between text-gray-400 text-xs font-mono">
                        <span>LeetCode Solved</span>
                        <Code className="w-4 h-4 text-secondary" />
                      </div>
                      <p className="text-2xl font-mono font-bold text-white">{liveStats.leetcode}</p>
                      <p className="text-[10px] text-gray-400 font-mono">Global Rank: {liveStats.rank}</p>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
                      <div className="flex items-center justify-between text-gray-400 text-xs font-mono">
                        <span>AI & Agent Repos</span>
                        <Zap className="w-4 h-4 text-cyan-400" />
                      </div>
                      <p className="text-2xl font-mono font-bold text-white">10+ Repos</p>
                      <p className="text-[10px] text-cyan-300 font-mono">LangChain / Gemini / C++</p>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
                      <div className="flex items-center justify-between text-gray-400 text-xs font-mono">
                        <span>Core Degree</span>
                        <GraduationCap className="w-4 h-4 text-indigo-400" />
                      </div>
                      <p className="text-base font-display font-bold text-white leading-tight mt-1">B.Tech Computer Tech</p>
                      <p className="text-[10px] text-gray-400 font-mono">Graduation: 2026</p>
                    </div>
                  </div>

                  {/* Core Technical Matrix */}
                  <div className="space-y-3">
                    <h3 className="text-xs font-mono uppercase tracking-widest text-primary font-bold flex items-center gap-2">
                      <Layers className="w-4 h-4" /> Core Technical Skill Matrix
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* AI & Agentic */}
                      <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2">
                        <div className="flex items-center justify-between border-b border-white/5 pb-2">
                          <span className="font-display font-semibold text-sm text-white">Generative AI & Agentic Systems</span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300">Expert</span>
                        </div>
                        <p className="text-xs text-gray-300 leading-relaxed font-sans">
                          Multi-Agent Architecture, Gemini 1.5/2.0 Tool Calling, LangChain, LlamaIndex, RAG Optimization, Function Calling, Prompt Engineering, Vector Databases (Pinecone, Faiss).
                        </p>
                      </div>

                      {/* Full-Stack Cloud */}
                      <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2">
                        <div className="flex items-center justify-between border-b border-white/5 pb-2">
                          <span className="font-display font-semibold text-sm text-white">Full-Stack Cloud & Web</span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">Production</span>
                        </div>
                        <p className="text-xs text-gray-300 leading-relaxed font-sans">
                          Next.js 15 (App Router), React 19, TypeScript, Node.js, Express, Tailwind CSS, PostgreSQL, Firebase Auth & Firestore, REST APIs, WebSockets.
                        </p>
                      </div>

                      {/* Systems & C++ */}
                      <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2">
                        <div className="flex items-center justify-between border-b border-white/5 pb-2">
                          <span className="font-display font-semibold text-sm text-white">Systems & High Performance</span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">Advanced</span>
                        </div>
                        <p className="text-xs text-gray-300 leading-relaxed font-sans">
                          C++20, Memory Optimization, Multithreading, Python, Data Structures & Algorithms (470+ LeetCode), System Architecture Design.
                        </p>
                      </div>

                      {/* DevOps & Infra */}
                      <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2">
                        <div className="flex items-center justify-between border-b border-white/5 pb-2">
                          <span className="font-display font-semibold text-sm text-white">DevOps & Cloud Infrastructure</span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-300">Proficient</span>
                        </div>
                        <p className="text-xs text-gray-300 leading-relaxed font-sans">
                          Docker, Kubernetes, GitHub Actions CI/CD pipelines, Cloud Run, Linux Administration, Performance Monitoring, Vercel deployments.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* High-Impact Experience Highlights */}
                  <div className="space-y-3">
                    <h3 className="text-xs font-mono uppercase tracking-widest text-primary font-bold flex items-center gap-2">
                      <Briefcase className="w-4 h-4" /> Career & High-Impact Experience
                    </h3>

                    <div className="space-y-3">
                      <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2">
                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <div>
                            <span className="font-display font-bold text-base text-white">Generative AI & Agentic Systems Developer</span>
                            <span className="text-xs text-gray-400 font-mono ml-2">@ Freelance / Open Source Collaborations</span>
                          </div>
                          <span className="font-mono text-xs text-primary font-medium">2024 — Present</span>
                        </div>
                        <ul className="list-disc list-inside text-xs text-gray-300 space-y-1.5 font-sans leading-relaxed">
                          <li>Architected multi-agent reasoning loops reducing structured data extraction errors by <strong className="text-white">38%</strong>.</li>
                          <li>Integrated Gemini 2.0 multi-modal tool calling capabilities with instant fallback mechanisms for zero-downtime reliability.</li>
                          <li>Engineered high-performance React & Next.js frontend interfaces handling <strong className="text-white">1,000+ live contributions</strong> seamlessly.</li>
                        </ul>
                      </div>

                      <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2">
                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <div>
                            <span className="font-display font-bold text-base text-white">Full-Stack & Systems Engineering Projects</span>
                            <span className="text-xs text-gray-400 font-mono ml-2">@ Academic & Technical Research</span>
                          </div>
                          <span className="font-mono text-xs text-secondary font-medium">2023 — Present</span>
                        </div>
                        <ul className="list-disc list-inside text-xs text-gray-300 space-y-1.5 font-sans leading-relaxed">
                          <li>Built custom algorithmic C++ engines and Dockerized server environments with sub-10ms response times.</li>
                          <li>Maintained an active <strong className="text-white">470+ LeetCode problem-solving record</strong> across complex graphs, dynamic programming, and system optimization.</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Direct Contact Footer inside Recruiter View */}
                  <div className="p-6 rounded-2xl bg-gradient-to-r from-primary/10 via-blue-900/10 to-secondary/10 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                      <h4 className="font-display font-bold text-lg text-white">Ready to connect or move forward?</h4>
                      <p className="text-xs text-gray-300 font-sans mt-0.5">
                        Direct Email: <strong className="text-primary font-mono">sujalpatil8657231278@gmail.com</strong> | Phone: <strong className="text-white font-mono">+91 88578 41863</strong>
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setActiveTab('scheduler')}
                        className="px-5 py-2.5 rounded-xl bg-primary text-black font-mono font-bold text-xs uppercase tracking-wider hover:bg-primary/90 transition-all cursor-pointer shadow-lg"
                      >
                        Book Call
                      </button>
                      <a
                        href="https://linkedin.com/in/dhruv-patil-3816043b7"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all border border-white/10"
                        title="LinkedIn Profile"
                      >
                        <Linkedin className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
