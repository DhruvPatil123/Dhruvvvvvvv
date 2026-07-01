"use client"

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Medal, Star, Flame, Trophy, Loader2 } from 'lucide-react'
import LeetCodeIcon from '../LeetCodeIcon'
import LeetcodeHeatmap from '../LeetcodeHeatmap'

const OTHER_ACHIEVEMENTS = [
  {
    title: 'Open Source Contributor',
    category: 'Community',
    icon: <Star className="w-6 h-6" />,
    description: '10+ active open-source contributions and repositories managed across diverse AI and Web ecosystems.',
    color: 'text-primary'
  },
  {
    title: 'Production Deployments',
    category: 'Engineering',
    icon: <Medal className="w-6 h-6" />,
    description: '6 production-ready cloud deployments actively hosting high-performance AI tools and web apps.',
    color: 'text-secondary'
  }
]

export default function Achievements() {
  const [leetcode, setLeetcode] = useState({
    username: 'Dhruv_Patil_18',
    ranking: 416077,
    streak: 12,
    solvedTotal: 850,
    solvedEasy: 320,
    solvedMedium: 430,
    solvedHard: 100,
    submissionCalendar: '',
    loading: true,
    source: 'local'
  })

  useEffect(() => {
    let active = true
    async function fetchStats() {
      try {
        const response = await fetch('/api/leetcode')
        if (!response.ok) throw new Error('API failed')
        const data = await response.json()
        if (active) {
          setLeetcode({
            username: data.username,
            ranking: data.ranking,
            streak: data.streak,
            solvedTotal: data.solvedTotal,
            solvedEasy: data.solvedEasy,
            solvedMedium: data.solvedMedium,
            solvedHard: data.solvedHard,
            submissionCalendar: data.submissionCalendar,
            loading: false,
            source: data.source || 'live'
          })
        }
      } catch (err) {
        console.warn('Failed to fetch live LeetCode stats, continuing with resilient default data:', err)
        if (active) {
          setLeetcode((prev) => ({ ...prev, loading: false }))
        }
      }
    }
    fetchStats()
    return () => {
      active = false
    }
  }, [])

  return (
    <section id="achievements" className="relative w-full min-h-[auto] md:min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-20 md:py-32 lg:py-48">
      <div className="max-w-6xl w-full text-center mb-16 md:mb-20 space-y-4">
        {/* Section Indicator */}
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary font-medium">
          [ 05 // BEYOND BENCHMARKS ]
        </span>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl lg:text-6xl font-display font-medium text-white tracking-tight"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-400 via-zinc-200 to-white">
            BEYOND
          </span>{" "}
          <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
            BENCHMARKS
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          viewport={{ once: true }}
          className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto font-sans leading-relaxed"
        >
          Quantifiable milestones and competitive standings that validate my engineering rigor.
        </motion.p>
      </div>

      <div className="max-w-5xl w-full space-y-6">
        {/* 1. Live LeetCode Telemetry Bento-Panel (Wide Screen) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="glass-effect p-6 sm:p-8 rounded-3xl border border-white/5 hover:border-primary/20 transition-all duration-300 relative overflow-hidden"
        >
          {/* Subtle background glow */}
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-orange-500/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-primary/5 rounded-full blur-3xl" />

          {/* Card Header with live indicator */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 border-b border-white/5 pb-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
                <LeetCodeIcon className="w-5 h-5" />
              </div>
              <div>
                <span className="text-orange-400 font-mono text-[9px] uppercase tracking-widest font-extrabold">
                  {"// "}Competitive Coding
                </span>
                <h3 className="text-xl font-display font-semibold text-white">LeetCode Live Status Sync</h3>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-white/[0.03] border border-white/5 px-3 py-1.5 rounded-full">
              <span className={`w-1.5 h-1.5 rounded-full ${leetcode.loading ? 'bg-orange-400 animate-pulse' : 'bg-emerald-400'}`} />
              <span className="text-[10px] font-mono text-gray-400 tracking-wider uppercase">
                {leetcode.loading ? 'Syncing Stats...' : `Live Sync: ${leetcode.username}`}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Column 1: Standing & Active Streak */}
            <div className="space-y-6">
              <div>
                <p className="text-xs font-mono text-gray-400 uppercase tracking-widest mb-1">Global Profile Rank</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
                    {leetcode.ranking.toLocaleString()}
                  </span>
                  <Trophy className="w-4 h-4 text-orange-400 shrink-0 self-center" />
                </div>
                <p className="text-[11px] font-sans text-gray-400 mt-1">
                  Active tier standing among global algorithmic problem solvers.
                </p>
              </div>

              <div className="bg-orange-500/[0.03] border border-orange-500/10 p-4 rounded-2xl flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-mono text-orange-400 uppercase tracking-wider font-semibold">Active Streak</p>
                  <p className="text-2xl font-display font-bold text-white mt-1">
                    {leetcode.streak} <span className="text-xs font-sans font-medium text-gray-400">Days</span>
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-400 animate-pulse">
                  <Flame className="w-5 h-5 fill-orange-400/20" />
                </div>
              </div>
            </div>

            {/* Column 2: Problem Solving Metrics */}
            <div className="space-y-4 flex flex-col justify-center">
              <div>
                <div className="flex justify-between items-baseline mb-1">
                  <p className="text-xs font-mono text-gray-400 uppercase tracking-widest">Total Problems Solved</p>
                  <span className="text-xl font-display font-bold text-white">{leetcode.solvedTotal}</span>
                </div>
                
                {/* Visual Segments */}
                <div className="h-2 w-full bg-white/[0.04] rounded-full overflow-hidden flex">
                  <div 
                    className="h-full bg-emerald-500 transition-all duration-1000" 
                    style={{ width: `${(leetcode.solvedEasy / leetcode.solvedTotal) * 100}%` }}
                  />
                  <div 
                    className="h-full bg-amber-500 transition-all duration-1000" 
                    style={{ width: `${(leetcode.solvedMedium / leetcode.solvedTotal) * 100}%` }}
                  />
                  <div 
                    className="h-full bg-rose-500 transition-all duration-1000" 
                    style={{ width: `${(leetcode.solvedHard / leetcode.solvedTotal) * 100}%` }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-2">
                <div className="bg-emerald-500/[0.04] border border-emerald-500/10 p-2.5 rounded-xl text-center">
                  <span className="text-[9px] font-mono text-emerald-400 uppercase tracking-wider font-semibold block">Easy</span>
                  <span className="text-lg font-display font-bold text-white mt-0.5 block">{leetcode.solvedEasy}</span>
                </div>
                <div className="bg-amber-500/[0.04] border border-amber-500/10 p-2.5 rounded-xl text-center">
                  <span className="text-[9px] font-mono text-amber-400 uppercase tracking-wider font-semibold block">Med</span>
                  <span className="text-lg font-display font-bold text-white mt-0.5 block">{leetcode.solvedMedium}</span>
                </div>
                <div className="bg-rose-500/[0.04] border border-rose-500/10 p-2.5 rounded-xl text-center">
                  <span className="text-[9px] font-mono text-rose-400 uppercase tracking-wider font-semibold block">Hard</span>
                  <span className="text-lg font-display font-bold text-white mt-0.5 block">{leetcode.solvedHard}</span>
                </div>
              </div>
            </div>

            {/* Column 3: Submission Contribution Calendar Heat-map */}
            <div className="flex flex-col justify-center">
              {leetcode.loading ? (
                <div className="h-28 w-full flex flex-col items-center justify-center gap-2">
                  <Loader2 className="w-5 h-5 text-gray-500 animate-spin" />
                  <span className="text-[10px] font-mono text-gray-500">Generating Heatmap...</span>
                </div>
              ) : (
                <LeetcodeHeatmap submissionCalendar={leetcode.submissionCalendar} />
              )}
            </div>
          </div>
        </motion.div>

        {/* 2. Smaller Milestones cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {OTHER_ACHIEVEMENTS.map((ach, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="glass-effect p-6 sm:p-8 rounded-3xl border border-white/5 hover:border-primary/20 transition-all duration-300 group relative overflow-hidden flex flex-col justify-between min-h-[220px]"
            >
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors" />

              <div>
                <div className={`w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/5 flex items-center justify-center mb-6 ${ach.color}`}>
                  {ach.icon}
                </div>
                <span className="text-secondary font-mono text-[9px] uppercase tracking-widest font-extrabold">
                  {"// "}{ach.category}
                </span>
                <h3 className="text-xl font-display font-medium text-white mt-1 mb-3">{ach.title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed font-sans">{ach.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
