"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Sparkles,
  GitBranch,
  Cpu,
  ShieldAlert,
  Zap,
  Play,
  CheckCircle2,
  Terminal,
  Activity,
  Layers,
  Code2,
  RefreshCw,
  ExternalLink,
  Github,
  FileText
} from 'lucide-react'
import { playTick, playNotification, playPopover } from '@/lib/sounds'

export default function FeaturedProject() {
  const [analyzing, setAnalyzing] = useState(false)
  const [analysisStep, setAnalysisStep] = useState(0)
  const [selectedRepo, setSelectedRepo] = useState('DhruvPatil123/Raincrew-ai')

  const steps = [
    { name: "Repository Parsing", detail: "AST extraction & dependency mapping...", status: "done" },
    { name: "Metric Trajectory", detail: "Predicting code churn & tech debt build-up...", status: "active" },
    { name: "Vulnerability Scan", detail: "Identifying security hotspots in dependencies...", status: "pending" },
    { name: "Refactoring Strategy", detail: "Synthesizing AI architectural recommendations...", status: "pending" }
  ]

  const handleRunAnalysis = () => {
    playPopover()
    setAnalyzing(true)
    setAnalysisStep(0)

    const timer1 = setTimeout(() => { setAnalysisStep(1); playTick() }, 800)
    const timer2 = setTimeout(() => { setAnalysisStep(2); playTick() }, 1800)
    const timer3 = setTimeout(() => { setAnalysisStep(3); playTick() }, 2800)
    const timer4 = setTimeout(() => {
      setAnalyzing(false)
      playNotification()
    }, 3800)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
      clearTimeout(timer4)
    }
  }

  return (
    <section id="featured-project" className="relative w-full min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-24 md:py-36 lg:py-48">
      <div className="max-w-6xl w-full space-y-16 sm:space-y-20">
        {/* Section Header */}
        <div className="text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 font-mono text-xs uppercase tracking-[0.2em] font-bold">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>FEATURED AI SHOWCASE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-semibold text-white tracking-tight">
            AI Software Evolution Predictor
          </h2>
          <p className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto font-sans leading-relaxed">
            An enterprise-grade AI engine that parses codebases, constructs dependency knowledge graphs, predicts technical debt trajectories, and synthesizes automated refactoring strategies.
          </p>
        </div>

        {/* Full-width Centerpiece Container */}
        <div className="p-6 md:p-10 rounded-3xl bg-black/80 border border-cyan-500/30 shadow-2xl space-y-10 relative overflow-hidden backdrop-blur-xl">
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

          {/* Architecture Flow Diagram (Point 11 Requirement) */}
          <div className="p-5 rounded-2xl bg-zinc-950/80 border border-cyan-500/30 space-y-3">
            <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
              <span className="font-mono text-xs uppercase tracking-widest text-cyan-400 font-bold flex items-center gap-2">
                <Layers className="w-4 h-4 text-cyan-400" /> System Architecture Pipeline
              </span>
              <span className="font-mono text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                END-TO-END AUTOMATED
              </span>
            </div>

            {/* Nodes Flow */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 pt-1 text-center font-mono">
              {[
                { step: "01", name: "Repository", detail: "AST & Git Logs", icon: <GitBranch className="w-4 h-4 text-cyan-400" /> },
                { step: "02", name: "Parser", detail: "Syntax Tree", icon: <Code2 className="w-4 h-4 text-primary" /> },
                { step: "03", name: "Knowledge Graph", detail: "Neo4j Clusters", icon: <Activity className="w-4 h-4 text-amber-400" /> },
                { step: "04", name: "LLM", detail: "Code Evaluation", icon: <Cpu className="w-4 h-4 text-purple-400" /> },
                { step: "05", name: "Recommendations", detail: "Refactor Patches", icon: <Zap className="w-4 h-4 text-emerald-400" /> },
                { step: "06", name: "Dashboard", detail: "Live Telemetry", icon: <Sparkles className="w-4 h-4 text-blue-400" /> }
              ].map((node, i) => (
                <div key={i} className="p-3 rounded-xl bg-white/5 border border-white/10 flex flex-col items-center gap-1 hover:border-cyan-400/50 transition-colors">
                  <div className="p-1.5 rounded-lg bg-black border border-white/10">
                    {node.icon}
                  </div>
                  <span className="text-[10px] text-zinc-500">{node.step}</span>
                  <span className="text-xs font-bold text-white leading-tight">{node.name}</span>
                  <span className="text-[9px] text-cyan-300 font-sans">{node.detail}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Grid Layout: Top Row Specs & Badges */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
            <div className="flex flex-wrap gap-2">
              {['React', 'Next.js', 'FastAPI', 'Python', 'LLM', 'RAG', 'Supabase', 'PyTorch'].map((tech) => (
                <span key={tech} className="px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 font-mono text-xs font-bold tracking-wide shadow-sm flex items-center gap-1.5 hover:border-cyan-400 transition-all">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  {tech}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-2.5">
              <a
                href="https://github.com/DhruvPatil123/Raincrew-ai"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-zinc-950 font-mono text-xs font-extrabold flex items-center gap-2 transition-all shadow-md shadow-cyan-400/20"
              >
                <ExternalLink className="w-4 h-4 shrink-0" />
                <span>Live Demo</span>
              </a>
              <a
                href="https://github.com/DhruvPatil123/Raincrew-ai"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-white/15 text-white font-mono text-xs font-bold flex items-center gap-2 transition-all"
              >
                <Github className="w-4 h-4 shrink-0" />
                <span>GitHub</span>
              </a>
              <button
                onClick={handleRunAnalysis}
                disabled={analyzing}
                className="px-4 py-2 rounded-xl bg-cyan-950/90 hover:bg-cyan-900 border border-cyan-500/50 text-cyan-300 font-mono text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-lg hover:border-cyan-400"
              >
                {analyzing ? <RefreshCw className="w-4 h-4 animate-spin text-cyan-400" /> : <FileText className="w-4 h-4 text-cyan-400" />}
                {analyzing ? 'Running Case Study...' : 'Case Study Simulation'}
              </button>
            </div>
          </div>

          {/* Interactive Simulation Dashboard & Architecture Flow */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Core Capability Modules (Col 5) */}
            <div className="lg:col-span-5 space-y-4">
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400">
                [ KEY ENGINE CAPABILITIES ]
              </h3>

              <div className="space-y-3">
                {[
                  {
                    title: "1. Repo Parsing & AST Mapping",
                    desc: "Extracts abstract syntax trees to build Neo4j knowledge graphs of class dependencies and call structures.",
                    icon: <GitBranch className="w-4 h-4 text-cyan-400" />
                  },
                  {
                    title: "2. Code Metric Trajectory",
                    desc: "Uses PyTorch models to forecast code churn, cyclomatic complexity spikes, and maintainability drops over time.",
                    icon: <Activity className="w-4 h-4 text-primary" />
                  },
                  {
                    title: "3. Vulnerability Heatmap",
                    desc: "Scans third-party packages and internal routines for CVE risks and memory safety hazards.",
                    icon: <ShieldAlert className="w-4 h-4 text-amber-400" />
                  },
                  {
                    title: "4. Automated Refactoring Strategy",
                    desc: "Generates step-by-step LLM pull request blueprints to safely decompose monolithic components.",
                    icon: <Zap className="w-4 h-4 text-emerald-400" />
                  }
                ].map((cap, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-400/40 transition-colors space-y-1">
                    <div className="flex items-center gap-2">
                      {cap.icon}
                      <h4 className="text-sm font-sans font-bold text-white">{cap.title}</h4>
                    </div>
                    <p className="text-xs text-gray-400 font-sans pl-6">{cap.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Live Interactive Node Diagram & Simulation Stream (Col 7) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400">
                  [ LIVE PIPELINE TELEMETRY ]
                </h3>
                <span className="text-[10px] font-mono text-gray-400 bg-white/5 px-2.5 py-1 rounded-md border border-white/10">
                  REPO: {selectedRepo}
                </span>
              </div>

              {/* Simulation Progress Node Flow */}
              <div className="p-6 rounded-2xl bg-zinc-950 border border-white/10 space-y-6">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  {[
                    { label: "ACCURACY", val: "99.4% AST", col: "text-emerald-400" },
                    { label: "RESPONSE TIME", val: "340ms Loop", col: "text-cyan-400" },
                    { label: "COST REDUCTION", val: "-45% Debt", col: "text-blue-400" },
                    { label: "PROCESSING SPEED", val: "1.2M Lines/s", col: "text-primary" }
                  ].map((m, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-white/5 border border-white/5">
                      <p className="text-[9px] font-mono text-gray-400 uppercase tracking-wider">{m.label}</p>
                      <p className={`text-base font-mono font-extrabold ${m.col} mt-1`}>{m.val}</p>
                    </div>
                  ))}
                </div>

                {/* Analysis Steps Pipeline */}
                <div className="space-y-3 pt-2">
                  <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Pipeline Execution Pipeline</p>
                  {steps.map((st, idx) => {
                    const isDone = analysisStep > idx
                    const isActive = analysisStep === idx && analyzing
                    return (
                      <div key={idx} className={`p-3 rounded-xl border transition-all flex items-center justify-between ${
                        isDone
                          ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-300'
                          : isActive
                          ? 'bg-cyan-950/40 border-cyan-400/50 text-cyan-300 animate-pulse'
                          : 'bg-white/5 border-white/5 text-gray-500'
                      }`}>
                        <div className="flex items-center gap-3">
                          <span className={`w-2 h-2 rounded-full ${isDone ? 'bg-emerald-400' : isActive ? 'bg-cyan-400 animate-ping' : 'bg-gray-600'}`} />
                          <div>
                            <p className="font-mono text-xs font-bold">{st.name}</p>
                            <p className="text-[10px] font-sans opacity-80">{st.detail}</p>
                          </div>
                        </div>
                        {isDone ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        ) : isActive ? (
                          <RefreshCw className="w-4 h-4 text-cyan-400 animate-spin" />
                        ) : (
                          <span className="text-[10px] font-mono text-gray-600">WAITING</span>
                        )}
                      </div>
                    )
                  })}
                </div>

                {/* Terminal Console Stream */}
                <div className="p-3 rounded-xl bg-black border border-white/10 font-mono text-xs text-cyan-300 space-y-1">
                  <div className="flex items-center gap-2 text-gray-500 text-[10px] border-b border-white/10 pb-1 mb-2">
                    <Terminal className="w-3 h-3 text-cyan-400" />
                    <span>ENGINE STREAM OUTPUT</span>
                  </div>
                  <p className="text-gray-400 text-[11px]">[Neo4j] Connected to boltz://graph.evolution.internal:7687</p>
                  <p className="text-cyan-400 text-[11px]">[PyTorch] Evaluated sequence window: 180 days across 45 commits</p>
                  <p className="text-emerald-400 text-[11px]">[Synthesizer] Generated structural patch: &quot;Isolate WebSocket Manager into micro-daemon&quot;</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
