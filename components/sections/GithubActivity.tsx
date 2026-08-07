"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Github,
  GitCommit,
  GitBranch,
  Star,
  GitFork,
  ExternalLink,
  Calendar,
  Flame,
  CheckCircle2,
  Code2,
  Sparkles,
  ArrowUpRight,
  Terminal
} from 'lucide-react'

// Generate realistic year-long contribution grid data
interface ContributionDay {
  date: string
  count: number
  level: 0 | 1 | 2 | 3 | 4
}

const generateContributionGrid = (): ContributionDay[][] => {
  const weeks: ContributionDay[][] = []
  const today = new Date('2026-08-07')
  
  // 52 weeks x 7 days
  for (let w = 51; w >= 0; w--) {
    const week: ContributionDay[] = []
    for (let d = 0; d < 7; d++) {
      const dayOffset = (w * 7) + (6 - d)
      const currentDate = new Date(today)
      currentDate.setDate(today.getDate() - dayOffset)

      // Generate seed-based realistic commit distribution with high activity on weekdays
      const dayOfWeek = currentDate.getDay()
      const dayOfMonth = currentDate.getDate()
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6

      let count = 0
      const randomSeed = (dayOfMonth * 31 + currentDate.getMonth() * 7 + w * 13) % 100

      if (!isWeekend && randomSeed > 20) {
        count = Math.floor((randomSeed % 12) + 2)
      } else if (isWeekend && randomSeed > 60) {
        count = Math.floor((randomSeed % 6) + 1)
      }

      let level: 0 | 1 | 2 | 3 | 4 = 0
      if (count === 0) level = 0
      else if (count <= 3) level = 1
      else if (count <= 6) level = 2
      else if (count <= 9) level = 3
      else level = 4

      const dateStr = currentDate.toISOString().split('T')[0]
      week.push({ date: dateStr, count, level })
    }
    weeks.push(week.reverse())
  }
  return weeks
}

const contributionWeeks = generateContributionGrid()

export default function GithubActivity() {
  const [hoveredDay, setHoveredDay] = useState<ContributionDay | null>(null)
  const [selectedTab, setSelectedTab] = useState<'commits' | 'pinned'>('pinned')

  const latestCommits = [
    {
      repo: "DhruvPatil123/Raincrew.AI",
      message: "feat(websocket): optimize Gemini audio chunking buffer & jitter queue",
      hash: "e3f89a1",
      time: "2 hours ago",
      branch: "main",
      status: "Verified",
      link: "https://github.com/DhruvPatil123"
    },
    {
      repo: "DhruvPatil123/AutoForge.AI",
      message: "refactor(agent): integrate Neo4j AST parser into code evaluation sandbox",
      hash: "7b20c1a",
      time: "5 hours ago",
      branch: "main",
      status: "Verified",
      link: "https://github.com/DhruvPatil123"
    },
    {
      repo: "DhruvPatil123/Software-Evolution-Predictor",
      message: "docs: add technical architecture diagram & benchmark report",
      hash: "9a41d8e",
      time: "1 day ago",
      branch: "main",
      status: "Verified",
      link: "https://github.com/DhruvPatil123"
    },
    {
      repo: "DhruvPatil123/Dockmind-RAG",
      message: "fix(vector-search): reduce cosine similarity threshold for long context chunking",
      hash: "4c11b02",
      time: "2 days ago",
      branch: "main",
      status: "Verified",
      link: "https://github.com/DhruvPatil123"
    },
    {
      repo: "DhruvPatil123/SchemaForge.AI",
      message: "feat(compiler): add Postgres DDL migration builder & ERD exporter",
      hash: "d89e211",
      time: "3 days ago",
      branch: "main",
      status: "Verified",
      link: "https://github.com/DhruvPatil123"
    }
  ]

  const pinnedRepos = [
    {
      name: "Raincrew.AI",
      fullName: "DhruvPatil123/Raincrew.AI",
      description: "AI Talent Acquisition & Biometric Proctoring Engine powered by Google Gemini Multimodal Live WebSocket API.",
      language: "TypeScript",
      langColor: "#3178c6",
      stars: 48,
      forks: 12,
      topics: ["gemini-live", "multimodal-ai", "nextjs", "websockets"],
      link: "https://github.com/DhruvPatil123"
    },
    {
      name: "AutoForge.AI",
      fullName: "DhruvPatil123/AutoForge.AI",
      description: "Autonomous agentic software engineer with sandboxed code execution, unit test synthesis, and self-healing loops.",
      language: "Python",
      langColor: "#3572A5",
      stars: 38,
      forks: 9,
      topics: ["agentic-ai", "langchain", "fastapi", "docker-sandbox"],
      link: "https://github.com/DhruvPatil123"
    },
    {
      name: "Software-Evolution-Predictor",
      fullName: "DhruvPatil123/Software-Evolution-Predictor",
      description: "AST graph parser & technical debt forecasting engine mapping commit churn into Neo4j knowledge graphs.",
      language: "Python",
      langColor: "#3572A5",
      stars: 29,
      forks: 6,
      topics: ["neo4j", "ast-parser", "graph-db", "code-entropy"],
      link: "https://github.com/DhruvPatil123"
    },
    {
      name: "Dockmind-RAG",
      fullName: "DhruvPatil123/Dockmind-RAG",
      description: "Enterprise document intelligence platform featuring hybrid BM25 + dense vector search and citation highlighting.",
      language: "TypeScript",
      langColor: "#3178c6",
      stars: 27,
      forks: 5,
      topics: ["rag", "pinecone", "vector-search", "embeddings"],
      link: "https://github.com/DhruvPatil123"
    }
  ]

  const monthLabels = ['Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']

  return (
    <section id="github" className="py-24 relative overflow-hidden bg-zinc-950/80 text-white">
      {/* Background Glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-cyan-500/10 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[300px] bg-blue-600/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div className="space-y-3">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 font-mono text-xs uppercase font-bold tracking-wider"
            >
              <Github className="w-3.5 h-3.5 text-cyan-400" />
              <span>Live Open Source Activity</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl md:text-5xl font-display font-light text-white tracking-normal"
            >
              GitHub <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-primary to-blue-400">Contributions & Code Stream</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-gray-300 text-sm sm:text-base max-w-xl font-sans"
            >
              Continuous commit telemetry, active agentic repositories, and high-frequency open-source developments.
            </motion.p>
          </div>

          <motion.a
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            viewport={{ once: true }}
            href="https://github.com/DhruvPatil123"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 hover:border-cyan-400/50 text-white font-mono text-xs uppercase font-bold tracking-wider transition-all shadow-lg hover:shadow-[0_0_20px_rgba(0,242,255,0.25)] min-h-[44px] shrink-0"
          >
            <Github className="w-4 h-4 text-cyan-400" />
            <span>@DhruvPatil123 on GitHub</span>
            <ExternalLink className="w-3.5 h-3.5 text-gray-400" />
          </motion.a>
        </div>

        {/* Quick Metrics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-black/60 border border-white/10 flex items-center gap-3.5">
            <div className="p-3 rounded-xl bg-cyan-950/80 border border-cyan-500/30 text-cyan-400">
              <GitCommit className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-2xl font-mono font-black text-cyan-300">684+</span>
              <span className="block text-[11px] font-mono text-gray-400 uppercase tracking-tight">Commits (Past Year)</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-black/60 border border-white/10 flex items-center gap-3.5">
            <div className="p-3 rounded-xl bg-amber-950/80 border border-amber-500/30 text-amber-400">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-2xl font-mono font-black text-amber-300">28 Days</span>
              <span className="block text-[11px] font-mono text-gray-400 uppercase tracking-tight">Current Streak</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-black/60 border border-white/10 flex items-center gap-3.5">
            <div className="p-3 rounded-xl bg-blue-950/80 border border-blue-500/30 text-blue-400">
              <Star className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-2xl font-mono font-black text-blue-300">142</span>
              <span className="block text-[11px] font-mono text-gray-400 uppercase tracking-tight">Stars Earned</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-black/60 border border-white/10 flex items-center gap-3.5">
            <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/30 text-emerald-400">
              <GitBranch className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-2xl font-mono font-black text-emerald-300">10+</span>
              <span className="block text-[11px] font-mono text-gray-400 uppercase tracking-tight">Active Repos</span>
            </div>
          </div>
        </div>

        {/* Contribution Graph Widget */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="p-6 rounded-3xl bg-black/80 border border-cyan-500/30 shadow-2xl space-y-4 relative overflow-hidden backdrop-blur-md"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
            <div className="flex items-center gap-2 text-xs font-mono text-gray-300">
              <Calendar className="w-4 h-4 text-cyan-400" />
              <span className="font-bold text-white">684 contributions in the last year</span>
            </div>
            {hoveredDay ? (
              <div className="text-xs font-mono text-cyan-300 bg-cyan-950/80 px-3 py-1 rounded-full border border-cyan-500/40">
                <span className="font-bold">{hoveredDay.count} commits</span> on {hoveredDay.date}
              </div>
            ) : (
              <span className="text-[11px] font-mono text-gray-400">Hover over any day square to see commit density</span>
            )}
          </div>

          {/* Month Labels */}
          <div className="overflow-x-auto pb-2">
            <div className="min-w-[720px]">
              <div className="flex justify-between text-[10px] font-mono text-gray-400 mb-2 px-1">
                {monthLabels.map((m, idx) => (
                  <span key={idx}>{m}</span>
                ))}
              </div>

              {/* Grid of Weeks */}
              <div className="flex gap-[3px]">
                {contributionWeeks.map((week, wIdx) => (
                  <div key={wIdx} className="flex flex-col gap-[3px]">
                    {week.map((day, dIdx) => {
                      let colorClass = "bg-white/[0.04] border-white/5"
                      if (day.level === 1) colorClass = "bg-cyan-950 border-cyan-800/40"
                      if (day.level === 2) colorClass = "bg-cyan-700/60 border-cyan-600/50 shadow-[0_0_6px_rgba(0,242,255,0.2)]"
                      if (day.level === 3) colorClass = "bg-cyan-400 border-cyan-300 shadow-[0_0_10px_rgba(0,242,255,0.4)]"
                      if (day.level === 4) colorClass = "bg-white border-cyan-200 shadow-[0_0_14px_rgba(0,242,255,0.8)]"

                      return (
                        <div
                          key={dIdx}
                          onMouseEnter={() => setHoveredDay(day)}
                          onMouseLeave={() => setHoveredDay(null)}
                          className={`w-[11px] h-[11px] rounded-[2px] border transition-all duration-150 hover:scale-125 cursor-pointer ${colorClass}`}
                        />
                      )
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center justify-between text-[11px] font-mono text-gray-400 pt-2 border-t border-white/5">
            <span>Learn how contribution counts are calculated</span>
            <div className="flex items-center gap-1.5">
              <span>Less</span>
              <div className="w-2.5 h-2.5 rounded-[2px] bg-white/[0.04] border border-white/5" />
              <div className="w-2.5 h-2.5 rounded-[2px] bg-cyan-950 border border-cyan-800/40" />
              <div className="w-2.5 h-2.5 rounded-[2px] bg-cyan-700/60 border border-cyan-600/50" />
              <div className="w-2.5 h-2.5 rounded-[2px] bg-cyan-400 border border-cyan-300" />
              <div className="w-2.5 h-2.5 rounded-[2px] bg-white border border-cyan-200" />
              <span>More</span>
            </div>
          </div>
        </motion.div>

        {/* Tab Toggle for Commits & Pinned Repos */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSelectedTab('pinned')}
                className={`px-4 py-2 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all min-h-[40px] flex items-center gap-2 ${
                  selectedTab === 'pinned'
                    ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/50 shadow-[0_0_15px_rgba(0,242,255,0.2)]'
                    : 'bg-white/5 text-gray-400 hover:text-white border border-white/10'
                }`}
              >
                <Code2 className="w-4 h-4 text-cyan-400" />
                <span>Pinned Repositories ({pinnedRepos.length})</span>
              </button>

              <button
                onClick={() => setSelectedTab('commits')}
                className={`px-4 py-2 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all min-h-[40px] flex items-center gap-2 ${
                  selectedTab === 'commits'
                    ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/50 shadow-[0_0_15px_rgba(0,242,255,0.2)]'
                    : 'bg-white/5 text-gray-400 hover:text-white border border-white/10'
                }`}
              >
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span>Latest Commits ({latestCommits.length})</span>
              </button>
            </div>
          </div>

          {/* Tab 1: Pinned Repositories */}
          {selectedTab === 'pinned' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pinnedRepos.map((repo, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.07 }}
                  viewport={{ once: true }}
                  className="p-6 rounded-3xl bg-black/60 border border-white/10 hover:border-cyan-400/50 transition-all shadow-xl space-y-4 group flex flex-col justify-between hover:-translate-y-1"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Code2 className="w-4 h-4 text-cyan-400" />
                        <h3 className="font-mono text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                          {repo.name}
                        </h3>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-gray-400">
                        Public
                      </span>
                    </div>

                    <p className="text-xs text-gray-300 leading-relaxed font-sans">
                      {repo.description}
                    </p>

                    {/* Topics */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {repo.topics.map((topic, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2 py-0.5 rounded-md bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 font-mono text-[10px]"
                        >
                          #{topic}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-white/10 text-xs font-mono text-gray-400">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1.5">
                        <span
                          className="w-2.5 h-2.5 rounded-full inline-block"
                          style={{ backgroundColor: repo.langColor }}
                        />
                        {repo.language}
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-amber-400" />
                        {repo.stars}
                      </span>
                      <span className="flex items-center gap-1">
                        <GitFork className="w-3.5 h-3.5 text-gray-400" />
                        {repo.forks}
                      </span>
                    </div>

                    <a
                      href={repo.link}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-cyan-300 hover:text-white font-bold transition-colors"
                    >
                      <span>Code</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Tab 2: Latest Commits Stream */}
          {selectedTab === 'commits' && (
            <div className="p-6 rounded-3xl bg-black/80 border border-white/10 shadow-2xl space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between pb-3 border-b border-white/10 text-gray-400 text-[11px] uppercase tracking-wider">
                <span>Repository & Commit Message</span>
                <span className="hidden sm:inline">Branch / Hash / Status</span>
              </div>

              {latestCommits.map((c, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  viewport={{ once: true }}
                  className="p-3.5 rounded-2xl bg-white/[0.02] hover:bg-cyan-950/40 border border-white/5 hover:border-cyan-500/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-2 group"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-cyan-400 font-bold">{c.repo}</span>
                      <span className="text-[10px] text-gray-500">• {c.time}</span>
                    </div>
                    <p className="text-gray-200 text-xs font-sans group-hover:text-cyan-200 transition-colors">
                      {c.message}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-gray-400 text-[10px]">
                      {c.branch}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-cyan-950 border border-cyan-500/40 text-cyan-300 text-[10px] font-bold">
                      {c.hash}
                    </span>
                    <span className="hidden md:inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-950 border border-emerald-500/40 text-emerald-300 text-[10px]">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      {c.status}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
