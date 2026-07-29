"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Download, FileText, ExternalLink, CheckCircle2, Sparkles, Eye } from 'lucide-react'

export default function Resume() {
  const [showPreview, setShowPreview] = useState(false)

  const highlights = [
    { title: 'AI Engineering Focus', desc: 'Specialized in LLMs, RAG, Multimodal Live WebSockets, PyTorch & Agentic Workflows' },
    { title: 'Academic Standing', desc: 'B.Tech in Artificial Intelligence with an outstanding 8.76 CGPA' },
    { title: 'Competitive Excellence', desc: 'LeetCode Top 8% Rank (370,720 global standing) with 360+ problems solved' },
    { title: 'Industry Certifications', desc: 'AICTE / EduSkills GenAI Intern certified, L&T Enterprise Flask Backend certified' },
  ]

  return (
    <section id="resume" className="relative w-full py-24 md:py-32 px-4 sm:px-6 flex flex-col items-center justify-center">
      <div className="max-w-5xl w-full">
        {/* Section Header */}
        <div className="text-center mb-12 space-y-4">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary font-medium">
            [ 08 // CAREER HIGHLIGHTS ]
          </span>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-display font-light text-white"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-300 via-zinc-100 to-white italic">
              Curriculum
            </span>{" "}
            <span className="font-normal text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-200 to-secondary animate-gradient">
              Vitae & Resume
            </span>
          </motion.h2>

          <p className="text-gray-300 text-base max-w-xl mx-auto font-sans">
            Download my complete professional resume or explore key qualifications at a glance.
          </p>
        </div>

        {/* Resume Card Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="glass-effect p-6 sm:p-10 rounded-3xl border border-white/10 relative overflow-hidden bg-black/60 shadow-2xl space-y-8"
        >
          {/* Header Action Row */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-display font-bold text-white">Dhruv Patil — Resume</h3>
                <p className="text-xs text-gray-400 font-mono">Updated 2026 • AI Engineer & Full Stack Developer</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-mono text-xs uppercase tracking-wider font-semibold transition-all flex items-center gap-2 cursor-pointer"
              >
                <Eye className="w-4 h-4 text-cyan-400" />
                <span>{showPreview ? 'Hide Preview' : 'Preview Resume'}</span>
              </button>

              <a
                href="/dhruv-patil-resume.pdf"
                download="Dhruv_Patil_Resume.pdf"
                className="px-5 py-2.5 rounded-xl bg-primary text-black font-mono text-xs uppercase tracking-wider font-bold hover:bg-primary/90 transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(0,242,255,0.3)] cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download PDF</span>
              </a>
            </div>
          </div>

          {/* Key Highlights Grid */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-primary font-bold flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              <span>Key Profile Highlights</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {highlights.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 flex items-start gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-sm font-display font-semibold text-white">{item.title}</h5>
                    <p className="text-xs text-gray-300 font-sans mt-0.5 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Inline Resume PDF Preview Box */}
          {showPreview && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="pt-4 border-t border-white/10"
            >
              <div className="w-full h-[600px] rounded-2xl overflow-hidden border border-white/10 bg-zinc-900">
                <iframe
                  src="/dhruv-patil-resume.pdf"
                  title="Dhruv Patil Resume PDF Preview"
                  className="w-full h-full"
                />
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
