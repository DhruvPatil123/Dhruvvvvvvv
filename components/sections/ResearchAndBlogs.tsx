"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { BookOpen, FileText, ArrowUpRight, Sparkles, Award, Clock, Calendar, Tag } from 'lucide-react'

export default function ResearchAndBlogs() {
  const research = [
    {
      title: "Multimodal Real-Time Biometric Analysis via Gemini Live",
      field: "Generative AI / System Latency",
      journal: "AI Engineering & Agentic Workflows Journal",
      date: "2026",
      summary: "Explores bidirectional WebSockets streaming audio and visual MediaStreams for low-latency candidate evaluation with 99.2% proctoring precision.",
      link: "https://github.com/DhruvPatil123/Raincrew-ai"
    },
    {
      title: "Autonomous Multi-Agent Architectures for Self-Healing Software",
      field: "Software Mechanics / LLMs",
      journal: "Autonomous Software Engineering Review",
      date: "2026",
      summary: "Presents a closed-loop critic evaluator framework capable of self-debugging compilation errors with a 91.4% success rate.",
      link: "https://github.com/DhruvPatil123/AutoForgeAI"
    }
  ]

  const blogs = [
    {
      title: "Building Production RAG Engines with Vector Search & Pinecone",
      readTime: "6 min read",
      publishDate: "Jul 28, 2026",
      category: "Vector Databases",
      tags: ["RAG", "Pinecone", "LangChain", "Vector Search"],
      summary: "A practical engineering guide to chunking strategies, cosine similarity thresholds, context compression factors, and hybrid BM25 + dense retrieval.",
      link: "https://github.com/DhruvPatil123"
    },
    {
      title: "Fine-Tuning LLMs for Real-Time Code Execution Sandboxes",
      readTime: "8 min read",
      publishDate: "Jul 12, 2026",
      category: "LLM Mechanics",
      tags: ["LLM", "Docker", "FastAPI", "Sandboxing"],
      summary: "How to insulate gVisor and Docker execution containers while streaming real-time stdout logs and system biometrics to Next.js clients.",
      link: "https://github.com/DhruvPatil123"
    },
    {
      title: "The Architecture of AI Software Evolution Prediction",
      readTime: "10 min read",
      publishDate: "Jun 22, 2026",
      category: "Knowledge Graphs",
      tags: ["Neo4j", "AST", "Graph DB", "AI Agents"],
      summary: "Mapping Abstract Syntax Trees into Neo4j knowledge graph nodes to forecast technical debt trajectories and automated refactoring risks.",
      link: "https://github.com/DhruvPatil123"
    },
    {
      title: "Optimizing Gemini Live Audio Streaming via WebSockets",
      readTime: "7 min read",
      publishDate: "May 19, 2026",
      category: "Real-time AI",
      tags: ["Gemini Live", "WebSockets", "PCM Audio", "Next.js"],
      summary: "Deep dive into bi-directional PCM audio chunking, acoustic jitter buffers, and backpressure management for conversational voice agents.",
      link: "https://github.com/DhruvPatil123"
    }
  ]

  return (
    <section id="research" className="relative w-full min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-28 md:py-36 lg:py-48">
      <div className="max-w-6xl w-full space-y-20 sm:space-y-24">
        
        {/* Research Papers Header & Grid */}
        <div className="space-y-10">
          <div className="text-center space-y-5">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-cyan-400 font-bold px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40">
              [ ACADEMIC PUBLICATIONS & RESEARCH ]
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-light text-white tracking-tight leading-tight">
              Research <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Papers & Preprints</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
            {research.map((paper, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.07 }}
                viewport={{ once: true }}
                className="p-6 rounded-3xl bg-black/60 border border-white/10 hover:border-cyan-400/50 transition-all shadow-xl space-y-4 group hover:-translate-y-1"
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-cyan-400" />
                    <span className="text-xs font-mono text-cyan-300 uppercase font-bold">{paper.field}</span>
                  </div>
                  <span className="text-[10px] font-mono text-gray-400 bg-white/5 px-2.5 py-1 rounded-md border border-white/10 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-cyan-400" />
                    {paper.date}
                  </span>
                </div>

                <h3 className="text-xl font-display font-semibold text-white group-hover:text-cyan-300 transition-colors">
                  {paper.title}
                </h3>
                <p className="text-xs text-gray-400 font-mono italic">
                  Published in: {paper.journal}
                </p>
                <p className="text-xs text-gray-300 font-sans leading-relaxed">
                  {paper.summary}
                </p>

                <a
                  href={paper.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:text-cyan-300 font-bold pt-2"
                >
                  <span>Read Paper Abstract</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Technical Articles & Blogs Header & Grid */}
        <div className="space-y-8 pt-8">
          <div className="text-center space-y-3">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary font-bold px-3 py-1 rounded-full bg-primary/10 border border-primary/30">
              [ TECHNICAL WRITING & ARTICLES ]
            </span>
            <h3 className="text-3xl sm:text-4xl font-display font-light text-white tracking-tight">
              Engineering <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-200 to-cyan-300">Blogs & Tutorials</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {blogs.map((blog, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.07 }}
                viewport={{ once: true }}
                className="p-6 rounded-3xl bg-black/60 border border-white/10 hover:border-cyan-400/50 transition-all shadow-xl space-y-4 group hover:-translate-y-1 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Category, Date & Read Time Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono pb-2 border-b border-white/10">
                    <span className="text-cyan-400 font-bold px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/40">
                      {blog.category}
                    </span>
                    <div className="flex items-center gap-3 text-gray-400 text-[11px]">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-cyan-400" />
                        {blog.publishDate}
                      </span>
                      <span className="flex items-center gap-1 text-cyan-300">
                        <Clock className="w-3 h-3 text-cyan-400" />
                        {blog.readTime}
                      </span>
                    </div>
                  </div>

                  {/* Blog Title & Summary */}
                  <div className="space-y-2">
                    <h4 className="text-lg font-display font-semibold text-white group-hover:text-cyan-300 transition-colors">
                      {blog.title}
                    </h4>
                    <p className="text-xs text-gray-300 font-sans leading-relaxed">
                      {blog.summary}
                    </p>
                  </div>

                  {/* Tags Badges */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {blog.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-gray-300 font-mono text-[10px] flex items-center gap-1"
                      >
                        <Tag className="w-2.5 h-2.5 text-cyan-400" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <a
                  href={blog.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-between w-full px-4 py-2.5 rounded-xl bg-cyan-950/60 hover:bg-cyan-900/80 border border-cyan-500/30 text-xs font-mono text-cyan-300 hover:text-white font-bold transition-all mt-4"
                >
                  <span>Read Article</span>
                  <ArrowUpRight className="w-4 h-4 text-cyan-400" />
                </a>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}

