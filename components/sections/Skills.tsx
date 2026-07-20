"use client"

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Brain, Code2, ShieldAlert, Cpu, Play, RefreshCw, Terminal, Sliders, Layers, Activity, Sparkles, CheckCircle2 } from 'lucide-react'
import { useScrollStore } from '@/store/useScrollStore'
import { playTick, playNotification, playPopover } from '@/lib/sounds'

const SKILL_CATEGORIES = [
  {
    title: 'AI & Machine Learning',
    icon: <Brain className="w-5 h-5 text-primary" />,
    color: 'text-primary',
    borderHover: 'hover:border-primary/30',
    skills: ['PyTorch', 'TensorFlow', 'Hugging Face', 'LangChain', 'LlamaIndex', 'RAG', 'LLMs', 'Agentic Workflows', 'Computer Vision']
  },
  {
    title: 'Web Engineering',
    icon: <Code2 className="w-5 h-5 text-secondary" />,
    color: 'text-secondary',
    borderHover: 'hover:border-secondary/30',
    skills: ['React 19', 'Next.js', 'Node.js', 'TypeScript', 'FastAPI', 'PostgreSQL', 'Tailwind CSS', 'Firebase', 'WebSockets']
  },
  {
    title: 'Systems & Security',
    icon: <ShieldAlert className="w-5 h-5 text-white" />,
    color: 'text-white',
    borderHover: 'hover:border-zinc-500/30',
    skills: ['C++', 'Java (Advanced)', '.NET Core', 'C#', 'Cryptography', 'Software Testing', 'Git', 'Figma Prototyping']
  }
]

type PresetId = 'rag' | 'agent' | 'attention'

interface LogEntry {
  text: string
  type: 'info' | 'warn' | 'success'
  delay: number
}

interface WorkflowPreset {
  name: string
  subtitle: string
  description: string
  metrics: { label: string; value: string; unit: string }[]
  activeNodes: string[]
  logs: LogEntry[]
}

const PRESETS: Record<PresetId, WorkflowPreset> = {
  rag: {
    name: 'Multi-Doc RAG Query',
    subtitle: 'RETRIEVAL AUGMENTED GENERATION PIPELINE',
    description: 'Traces the vector search embedding space. Submits queries to high-dimensional indexes, filters chunks using dynamic cosine similarity benchmarks, and injects context securely.',
    metrics: [
      { label: 'COSINE SIMILARITY', value: '0.892', unit: 'SIM' },
      { label: 'RETRIEVED CHUNKS', value: '3', unit: 'DOCS' },
      { label: 'CONTEXT TOKENS', value: '1,420', unit: 'TKN' }
    ],
    activeNodes: ['prompt', 'router', 'rag', 'synthesizer'],
    logs: [
      { text: 'Embedding query vector via text-embedding-3-small...', type: 'info', delay: 100 },
      { text: 'Querying Pinecone / pgvector cluster with cosine similarity metric...', type: 'info', delay: 600 },
      { text: 'Success: Retrieved 3 parent chunks. Context compression factor: 4.2x', type: 'success', delay: 1200 },
      { text: 'Synthesizing contextual prompt block. Injecting system instructions...', type: 'info', delay: 1800 },
      { text: 'Authoritative RAG response output delivered in 1.12s.', type: 'success', delay: 2400 }
    ]
  },
  agent: {
    name: 'Self-Reflection Agent',
    subtitle: 'CRITIC-EVALUATOR RECURSIVE ROUTE',
    description: 'Runs a stateful auto-correction cycle. If the validator node flags logical inconsistencies or missing data, the agent autonomously triggers a feedback loop to refine output.',
    metrics: [
      { label: 'AGENTIC STEPS', value: '4', unit: 'HOPS' },
      { label: 'CRITIC SCORE', value: '98', unit: '%' },
      { label: 'CORRECTION CYCLE', value: '1', unit: 'LOOP' }
    ],
    activeNodes: ['prompt', 'router', 'critic', 'router', 'synthesizer'],
    logs: [
      { text: 'Initiating global goal decomposition. Formulated 2 sub-tasks...', type: 'info', delay: 100 },
      { text: 'Drafting response using Llama-3.1-70B. Calling Evaluation critic...', type: 'info', delay: 700 },
      { text: 'Validation Failure: Critic detected gap: "Temporal constraint Q3 unresolved".', type: 'warn', delay: 1300 },
      { text: 'Correction: Reformulating plan. Querying external web APIs...', type: 'info', delay: 1900 },
      { text: 'Re-evaluating refined synthesis. Score: 98% (Passed 90% threshold).', type: 'success', delay: 2600 },
      { text: 'Success: Stateful agentic response compiled.', type: 'success', delay: 3100 }
    ]
  },
  attention: {
    name: 'Neural Attention Matrix',
    subtitle: 'MULTI-HEAD SCALED DOT-PRODUCT ATTENTION',
    description: 'Visualizes neural activation across query-key-value vectors. Highlights transformer weights mapping semantic tokens to contextual references.',
    metrics: [
      { label: 'ACTIVE HEADS', value: '8', unit: 'HEADS' },
      { label: 'MAX ATTN WEIGHT', value: '0.942', unit: 'PROB' },
      { label: 'SPARSITY COEFFICIENT', value: '0.12', unit: 'S_IDX' },
    ],
    activeNodes: ['prompt', 'router', 'attention', 'synthesizer'],
    logs: [
      { text: 'Tokenizing input text sequence...', type: 'info', delay: 100 },
      { text: 'Calculating Query-Key-Value projection matrices...', type: 'info', delay: 600 },
      { text: 'Softmax attention complete. Key associations localized on core token.', type: 'success', delay: 1200 },
      { text: 'Routing weighted tensor values through MLP feedforward layers...', type: 'info', delay: 1800 },
      { text: 'Successfully predicted high-probability vocabulary vector.', type: 'success', delay: 2400 }
    ]
  }
}

export default function Skills() {
  const setSkillsHovered = useScrollStore((state) => state.setSkillsHovered)
  
  // Interactive Sandbox state
  const [activePreset, setActivePreset] = useState<PresetId>('rag')
  const [isPlaying, setIsPlaying] = useState(true)
  const [animationStep, setAnimationStep] = useState(0)
  const [visibleLogs, setVisibleLogs] = useState<string[]>([])
  
  // Custom interactive sliders (accessible, standard-compliant)
  const [temperature, setTemperature] = useState(0.2)
  const [chunkSize, setChunkSize] = useState(512)
  const [repetitionPenalty, setRepetitionPenalty] = useState(1.1)

  // Real-time dynamic calculation of metrics based on sandbox parameters
  const getDynamicMetrics = (presetId: PresetId) => {
    if (presetId === 'rag') {
      const baseLatency = 42
      const chunkFactor = chunkSize / 512
      const latency = Math.round(baseLatency * chunkFactor + temperature * 12)
      
      const baseSim = 0.884
      const sim = Math.min(0.999, Math.max(0.600, baseSim - temperature * 0.12 + (repetitionPenalty - 1.1) * 0.1)).toFixed(3)
      
      const chunks = Math.max(1, Math.round(4 * (512 / chunkSize)))
      
      return [
        { label: 'RETRIEVAL LATENCY', value: `${latency}`, unit: 'MS' },
        { label: 'COSINE SIMILARITY', value: `${sim}`, unit: 'SIM' },
        { label: 'CHUNKS LOADED', value: `${chunks}`, unit: 'CHUNKS' },
      ]
    } else if (presetId === 'agent') {
      const loops = Math.max(1, Math.round(3 + (temperature - 0.2) * 5))
      
      const baseConf = 94.1
      const conf = Math.min(99.9, Math.max(30.0, baseConf - (temperature * 25.0) + (repetitionPenalty - 1.1) * 8)).toFixed(1)
      
      const baseTime = 1.42
      const time = (baseTime * (chunkSize / 512) * (loops / 3) + temperature * 0.2).toFixed(2)
      
      return [
        { label: 'DECISION ITERATIONS', value: `${loops}`, unit: 'LOOPS' },
        { label: 'HEURISTIC CONFIDENCE', value: `${conf}`, unit: '% CONF' },
        { label: 'TOTAL RUNTIME', value: `${time}`, unit: 'SEC' },
      ]
    } else {
      const heads = Math.max(1, Math.round(8 * (1.2 - temperature)))
      
      const baseWeight = 0.942
      const weight = Math.min(1.000, Math.max(0.300, baseWeight - temperature * 0.25 + (repetitionPenalty - 1.1) * 0.08)).toFixed(3)
      
      const baseSparsity = 0.12
      const sparsity = Math.min(0.95, Math.max(0.01, baseSparsity + temperature * 0.35 - (chunkSize / 1024) * 0.1)).toFixed(2)
      
      return [
        { label: 'ACTIVE HEADS', value: `${heads}`, unit: 'HEADS' },
        { label: 'MAX ATTN WEIGHT', value: `${weight}`, unit: 'PROB' },
        { label: 'SPARSITY COEFFICIENT', value: `${sparsity}`, unit: 'S_IDX' },
      ]
    }
  }

  // Trigger active preset simulation loop
  useEffect(() => {
    if (!isPlaying) return

    // Reset logs & animation index when preset shifts
    setVisibleLogs([])
    setAnimationStep(0)

    const preset = PRESETS[activePreset]
    const timers: NodeJS.Timeout[] = []

    // Map logs to render staggeredly
    preset.logs.forEach((log) => {
      const t = setTimeout(() => {
        setVisibleLogs((prev) => {
          const newLogs = [...prev, `${log.type === 'warn' ? '⚠️' : log.type === 'success' ? '✔' : '⚙'} ${log.text}`]
          if (newLogs.length > 25) return newLogs.slice(newLogs.length - 25)
          return newLogs
        })
        setAnimationStep((prev) => prev + 1)
        if (log.type === 'success') {
          // Play a micro high-pitch mechanical hum sound for positive triggers
          playNotification()
        }
      }, log.delay)
      timers.push(t)
    })

    return () => {
      timers.forEach(clearTimeout)
    }
  }, [activePreset, isPlaying])

  // Real-time console logs when parameters are modified by the recruiter
  const isInitialMount = useRef(true)
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
      return
    }
    const logStr = `⚙ [PARAM_UPDATE] Pipeline re-indexed: Temp=${temperature.toFixed(2)} | ChunkSize=${chunkSize}t | RepPenalty=${repetitionPenalty.toFixed(2)}`
    setVisibleLogs((prev) => {
      const newLogs = [...prev, logStr]
      if (newLogs.length > 25) return newLogs.slice(newLogs.length - 25)
      return newLogs
    })
  }, [temperature, chunkSize, repetitionPenalty])

  const handlePresetChange = (preset: PresetId) => {
    playPopover()
    setActivePreset(preset)
  }

  return (
    <section id="skills" className="relative w-full min-h-screen flex flex-col items-center justify-center px-6 py-24 md:py-32 lg:py-40">
      <div className="max-w-6xl w-full text-center mb-20 space-y-4">
        {/* Section Indicator */}
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary font-medium">
          [ 02 // TECHNICAL MATRIX ]
        </span>
        
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl lg:text-6xl font-display font-light text-white tracking-normal leading-tight"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-300 via-zinc-100 to-white italic font-light">
            Technical
          </span>{" "}
          <span className="font-normal text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-200 to-secondary animate-gradient">
            Matrix
          </span>
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          viewport={{ once: true }}
          className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto font-sans leading-relaxed"
        >
          A multidisciplinary stack focused on Generative AI research, high-performance
          web architectures, and secure system design.
        </motion.p>
      </div>

      {/* Bento Grid Container */}
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-auto mb-20">
        
        {/* Card 1: AI & Machine Learning (Large, Col Span 2) */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          onMouseEnter={() => setSkillsHovered(true)}
          onMouseLeave={() => setSkillsHovered(false)}
          className="glass-effect p-8 rounded-3xl border border-white/5 hover:border-primary/30 transition-all duration-300 group md:col-span-2 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center">
                {SKILL_CATEGORIES[0].icon}
              </div>
              <h3 className="text-sm font-mono font-bold text-primary uppercase tracking-widest">
                {SKILL_CATEGORIES[0].title}
              </h3>
            </div>
            
            <p className="text-gray-400 text-xs font-mono mb-8">
              {"// Core engineering block specializing in foundational & agentic LLM logic."}
            </p>

            <div className="flex flex-wrap gap-2.5">
              {SKILL_CATEGORIES[0].skills.map((skill) => (
                <div 
                  key={skill} 
                  className="px-3.5 py-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] text-gray-300 hover:text-white border border-white/5 hover:border-primary/20 transition-all duration-300 font-sans text-xs md:text-sm font-medium cursor-default flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:bg-primary transition-all duration-300 animate-pulse" />
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Card 2: Web Engineering (Vertical Stack, Col Span 1) */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          onMouseEnter={() => setSkillsHovered(true)}
          onMouseLeave={() => setSkillsHovered(false)}
          className="glass-effect p-8 rounded-3xl border border-white/5 hover:border-secondary/30 transition-all duration-300 group md:col-span-1 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center">
                {SKILL_CATEGORIES[1].icon}
              </div>
              <h3 className="text-sm font-mono font-bold text-secondary uppercase tracking-widest">
                {SKILL_CATEGORIES[1].title}
              </h3>
            </div>

            <p className="text-gray-400 text-xs font-mono mb-8">
              {"// Full-stack engineering with real-time reactive engines."}
            </p>

            <div className="flex flex-wrap gap-2.5">
              {SKILL_CATEGORIES[1].skills.map((skill) => (
                <div 
                  key={skill} 
                  className="px-3.5 py-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] text-gray-300 hover:text-white border border-white/5 hover:border-secondary/20 transition-all duration-300 font-sans text-xs md:text-sm font-medium cursor-default flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary/40 group-hover:bg-secondary transition-all duration-300" />
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Card 3: Systems & Security (Col Span 2) */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          onMouseEnter={() => setSkillsHovered(true)}
          onMouseLeave={() => setSkillsHovered(false)}
          className="glass-effect p-8 rounded-3xl border border-white/5 hover:border-zinc-500/30 transition-all duration-300 group md:col-span-2 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center">
                {SKILL_CATEGORIES[2].icon}
              </div>
              <h3 className="text-sm font-mono font-bold text-white uppercase tracking-widest">
                {SKILL_CATEGORIES[2].title}
              </h3>
            </div>

            <p className="text-gray-400 text-xs font-mono mb-8">
              {"// Lower-level languages, cryptographic verification, and tooling systems."}
            </p>

            <div className="flex flex-wrap gap-2.5">
              {SKILL_CATEGORIES[2].skills.map((skill) => (
                <div 
                  key={skill} 
                  className="px-3.5 py-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] text-gray-300 hover:text-white border border-white/5 hover:border-zinc-500/20 transition-all duration-300 font-sans text-xs md:text-sm font-medium cursor-default flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 group-hover:bg-white transition-all duration-300" />
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Card 4: Architecture Focus & System telemetry (Bento Metric, Col Span 1) */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          onMouseEnter={() => setSkillsHovered(true)}
          onMouseLeave={() => setSkillsHovered(false)}
          className="glass-effect p-8 rounded-3xl border border-white/5 hover:border-primary/20 transition-all duration-300 group md:col-span-1 flex flex-col justify-between relative overflow-hidden"
        >
          <div className="absolute -right-12 -bottom-12 w-32 h-32 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-all duration-500" />
          
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center">
                <Cpu className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-sm font-mono font-bold text-white uppercase tracking-widest">
                CORE MATRIX FOCUS
              </h3>
            </div>

            <div className="space-y-4 font-mono text-xs text-gray-400">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span>RAG COGNITION</span>
                <span className="text-primary font-bold">100% SECURE</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span>PARALLEL PROCESSING</span>
                <span className="text-secondary font-bold">OPTIMIZED</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span>AGENTIC AUTONOMY</span>
                <span className="text-white font-bold">STATEFUL</span>
              </div>
              <div className="flex justify-between">
                <span>UI FRAMEWORK</span>
                <span className="text-zinc-300">NEXT.JS AppRouter</span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">ENGINEERING STANDARDS</span>
            <span className="text-[10px] font-mono text-zinc-400 font-semibold uppercase">
              SECURE & HIGH-PERFORMANCE
            </span>
          </div>
        </motion.div>

      </div>

      {/* NEW: STUNNING INTERACTIVE COGNITIVE CORE PLAYGROUND */}
      <div className="max-w-6xl w-full mt-10 space-y-10">
        <div className="text-center md:text-left space-y-3 max-w-2xl">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-secondary font-bold">
            [ 02.1 // EXPERIMENTAL BENCH ]
          </span>
          <h3 className="text-2xl md:text-3xl font-display font-light text-white leading-tight">
            Cognitive Pipeline <span className="font-normal text-secondary italic">Simulator</span>
          </h3>
          <p className="text-zinc-400 text-xs md:text-sm leading-relaxed font-sans">
            Trigger visual simulations of autonomous agent decision routing. Witness real-time key-value attention scoring, retrieval vector filtering, and recursive evaluation.
          </p>
        </div>

        {/* Simulator Workbench */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Controls Module (Col Span 4) */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-6 glass-effect p-6 md:p-8 rounded-3xl border border-white/5 bg-zinc-950/40 backdrop-blur-md">
            <div className="space-y-6">
              <div className="flex items-center gap-2 border-b border-white/5 pb-4">
                <Sliders className="w-4 h-4 text-secondary" />
                <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-white">Pipeline Parameters</h4>
              </div>

              {/* Slider 1: Temperature */}
              <div className="space-y-2">
                <div className="flex justify-between text-[11px] font-mono">
                  <span className="text-zinc-500">LLM TEMPERATURE</span>
                  <span className="text-secondary font-bold">{temperature.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={temperature}
                  onChange={(e) => {
                    playTick()
                    setTemperature(parseFloat(e.target.value))
                  }}
                  className="w-full accent-secondary h-1 bg-white/5 rounded-lg appearance-none cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-secondary/60 focus-visible:ring-offset-1 focus-visible:ring-offset-black"
                  aria-label="LLM Generation Temperature slider"
                />
                <p className="text-[9px] font-mono text-zinc-600 leading-none">Controls generation randomness and entropy.</p>
              </div>

              {/* Slider 2: Chunk Retrieval Size */}
              <div className="space-y-2">
                <div className="flex justify-between text-[11px] font-mono">
                  <span className="text-zinc-500">VECTOR CHUNK SIZE</span>
                  <span className="text-primary font-bold">{chunkSize} tokens</span>
                </div>
                <input
                  type="range"
                  min="128"
                  max="1024"
                  step="64"
                  value={chunkSize}
                  onChange={(e) => {
                    playTick()
                    setChunkSize(parseInt(e.target.value))
                  }}
                  className="w-full accent-primary h-1 bg-white/5 rounded-lg appearance-none cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary/60 focus-visible:ring-offset-1 focus-visible:ring-offset-black"
                  aria-label="Vector Database Chunk Size limit slider"
                />
                <p className="text-[9px] font-mono text-zinc-600 leading-none">Splits source texts into semantic retrieval envelopes.</p>
              </div>

              {/* Slider 3: Repetition Penalty */}
              <div className="space-y-2">
                <div className="flex justify-between text-[11px] font-mono">
                  <span className="text-zinc-500">REPETITION PENALTY</span>
                  <span className="text-white font-bold">{repetitionPenalty.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="1.0"
                  max="1.5"
                  step="0.05"
                  value={repetitionPenalty}
                  onChange={(e) => {
                    playTick()
                    setRepetitionPenalty(parseFloat(e.target.value))
                  }}
                  className="w-full accent-white h-1 bg-white/5 rounded-lg appearance-none cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/60 focus-visible:ring-offset-1 focus-visible:ring-offset-black"
                  aria-label="Repetition Penalty factor slider"
                />
                <p className="text-[9px] font-mono text-zinc-600 leading-none">Mitigates contextual loops in deep sequence completion.</p>
              </div>
            </div>

            {/* Presets Button selector */}
            <div className="space-y-3 pt-6 border-t border-white/5">
              <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Select Pipeline Blueprint</p>
              <div className="flex flex-col gap-2">
                {(Object.keys(PRESETS) as PresetId[]).map((pid) => (
                  <button
                    key={pid}
                    onClick={() => handlePresetChange(pid)}
                    className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 font-mono text-xs cursor-pointer border flex items-center justify-between ${
                      activePreset === pid
                        ? 'bg-secondary/10 border-secondary/30 text-white font-bold shadow-[0_0_15px_rgba(0,242,255,0.05)]'
                        : 'bg-transparent border-transparent hover:bg-white/[0.02] text-zinc-400 hover:text-white'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${activePreset === pid ? 'bg-secondary animate-pulse' : 'bg-zinc-600'}`} />
                      {PRESETS[pid].name}
                    </span>
                    <Sparkles className={`w-3.5 h-3.5 transition-transform duration-500 ${activePreset === pid ? 'text-secondary rotate-12 scale-110' : 'text-zinc-600 opacity-45'}`} />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Visual Simulation Module (Col Span 8) */}
          <div className="lg:col-span-8 flex flex-col justify-between bg-zinc-950/60 border border-white/5 rounded-3xl overflow-hidden relative min-h-[460px] md:min-h-auto">
            {/* Background grid texture */}
            <div className="absolute inset-0 bg-[radial-gradient(#1c1c1e_1px,transparent_1px)] [background-size:16px_16px] opacity-25 pointer-events-none" />

            {/* Top Bar Status */}
            <div className="relative z-10 flex items-center justify-between px-6 py-4 border-b border-white/5 bg-zinc-950/40 backdrop-blur-md">
              <div className="flex items-center gap-2.5">
                <Activity className="w-4 h-4 text-secondary animate-pulse" />
                <div>
                  <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">{PRESETS[activePreset].name}</h4>
                  <p className="text-[9px] font-mono text-zinc-500 leading-none">{PRESETS[activePreset].subtitle}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    playTick()
                    setIsPlaying(!isPlaying)
                  }}
                  className={`px-3 py-1.5 rounded-lg border text-[10px] font-mono tracking-wider transition-all duration-300 cursor-pointer flex items-center gap-1.5 ${
                    isPlaying 
                      ? 'bg-emerald-500/15 border-emerald-500/25 text-emerald-400' 
                      : 'bg-zinc-900 border-white/10 text-zinc-400 hover:text-white hover:border-white/25'
                  }`}
                >
                  <RefreshCw className={`w-3 h-3 ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '4s' }} />
                  {isPlaying ? 'SIMULATING' : 'PAUSED'}
                </button>
              </div>
            </div>

            {/* Middle Segment: SVG Routing Graph Canvas */}
            <div className="relative flex-1 p-6 flex flex-col items-center justify-center min-h-[220px]">
              
              {/* Description Paragraph overlay */}
              <p className="absolute top-4 left-6 right-6 text-[11px] text-zinc-400 leading-relaxed text-center font-sans max-w-xl mx-auto">
                {PRESETS[activePreset].description}
              </p>

              {/* Node Layout Graph */}
              <div className="relative w-full max-w-lg h-32 flex items-center justify-between mt-6">
                
                {/* SVG Connections Paths */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
                  {/* Default Routing Path */}
                  <path
                    d="M 20,64 L 140,64 L 260,64 L 380,64 L 480,64"
                    fill="none"
                    stroke="rgba(255,255,255,0.04)"
                    strokeWidth="2"
                  />
                  {activePreset === 'agent' && (
                    /* Double recursive loop visualizer for agents */
                    <path
                      d="M 140,64 Q 260,-20 380,64 Q 260,150 140,64"
                      fill="none"
                      stroke="rgba(0, 242, 255, 0.08)"
                      strokeWidth="2.5"
                      strokeDasharray="6 4"
                    />
                  )}

                  {/* Dynamic Glowing Routing Track */}
                  {isPlaying && (
                    <motion.path
                      key={activePreset}
                      d={activePreset === 'agent' 
                        ? "M 20,64 Q 140,64 260,64 T 380,64 Q 260,130 140,64 T 480,64"
                        : "M 20,64 L 140,64 L 260,64 L 380,64 L 480,64"
                      }
                      fill="none"
                      stroke="url(#glowGradient)"
                      strokeWidth="3"
                      strokeLinecap="round"
                      initial={{ strokeDasharray: "1000", strokeDashoffset: "1000" }}
                      animate={{ strokeDashoffset: "0" }}
                      transition={{ repeat: Infinity, duration: 4.5, ease: "linear" }}
                    />
                  )}

                  <defs>
                    <linearGradient id="glowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#00f2ff" stopOpacity="0.1" />
                      <stop offset="50%" stopColor="#00f2ff" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#d946ef" stopOpacity="0.2" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Node 1: Input Vector */}
                <div className="relative flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 border relative ${
                    PRESETS[activePreset].activeNodes.includes('prompt')
                      ? 'bg-zinc-900 border-secondary/50 shadow-[0_0_15px_rgba(0,242,255,0.25)] text-white'
                      : 'bg-zinc-950 border-white/5 text-zinc-600'
                  }`}>
                    <Terminal className="w-4 h-4" />
                    {PRESETS[activePreset].activeNodes.includes('prompt') && (
                      <span className="absolute -inset-1.5 rounded-full border border-secondary/20 animate-ping" />
                    )}
                  </div>
                  <span className="absolute -bottom-6 text-[9px] font-mono text-zinc-500 tracking-wider">INPUT</span>
                </div>

                {/* Node 2: Router Agent */}
                <div className="relative flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 border relative ${
                    PRESETS[activePreset].activeNodes.includes('router')
                      ? 'bg-zinc-900 border-primary/50 shadow-[0_0_15px_rgba(59,130,246,0.25)] text-white'
                      : 'bg-zinc-950 border-white/5 text-zinc-600'
                  }`}>
                    <Cpu className="w-4 h-4" />
                    {PRESETS[activePreset].activeNodes.includes('router') && animationStep >= 1 && (
                      <span className="absolute -inset-1.5 rounded-full border border-primary/20 animate-ping" />
                    )}
                  </div>
                  <span className="absolute -bottom-6 text-[9px] font-mono text-zinc-500 tracking-wider">ROUTER</span>
                </div>

                {/* Node 3: Custom Preset Node */}
                <div className="relative flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 border relative ${
                    (activePreset === 'rag' && animationStep >= 2) || (activePreset === 'agent' && animationStep >= 2) || (activePreset === 'attention' && animationStep >= 2)
                      ? 'bg-zinc-900 border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.25)] text-white'
                      : 'bg-zinc-950 border-white/5 text-zinc-600'
                  }`}>
                    {activePreset === 'rag' ? (
                      <Layers className="w-4 h-4" />
                    ) : activePreset === 'agent' ? (
                      <Brain className="w-4 h-4" />
                    ) : (
                      <Activity className="w-4 h-4" />
                    )}
                    {animationStep >= 2 && (
                      <span className="absolute -inset-1.5 rounded-full border border-amber-500/20 animate-ping" />
                    )}
                  </div>
                  <span className="absolute -bottom-6 text-[9px] font-mono text-zinc-500 tracking-wider">
                    {activePreset === 'rag' ? 'VEC_INDEX' : activePreset === 'agent' ? 'CRITIC' : 'ATTN_HEAD'}
                  </span>
                </div>

                {/* Node 4: Response Synthesis */}
                <div className="relative flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 border relative ${
                    PRESETS[activePreset].activeNodes.includes('synthesizer') && animationStep >= (activePreset === 'agent' ? 4 : 3)
                      ? 'bg-zinc-900 border-purple-500/50 shadow-[0_0_15px_rgba(217,70,239,0.25)] text-white'
                      : 'bg-zinc-950 border-white/5 text-zinc-600'
                  }`}>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    {animationStep >= (activePreset === 'agent' ? 4 : 3) && (
                      <span className="absolute -inset-1.5 rounded-full border border-purple-500/20 animate-ping" />
                    )}
                  </div>
                  <span className="absolute -bottom-6 text-[9px] font-mono text-zinc-500 tracking-wider">SYNTHESIS</span>
                </div>

              </div>
            </div>

            {/* Bottom Segment: Dynamic Terminal Logs Panel */}
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 border-t border-white/5 bg-zinc-950/80 backdrop-blur-md min-h-[160px]">
              
              {/* Telemetry Metrics Panel (Col Span 4) */}
              <div className="md:col-span-4 border-b md:border-b-0 md:border-r border-white/5 p-4 flex flex-col justify-center space-y-3.5">
                {getDynamicMetrics(activePreset).map((met, i) => (
                  <div key={i} className="flex justify-between items-center font-mono">
                    <span className="text-[9px] text-zinc-500 uppercase tracking-wider">{met.label}</span>
                    <span className="text-xs text-white font-bold tracking-tight">
                      {met.value} <span className="text-[8px] text-zinc-400 font-normal">{met.unit}</span>
                    </span>
                  </div>
                ))}
              </div>

              {/* Console Logs Panel (Col Span 8) */}
              <div className="md:col-span-8 p-4 font-mono text-[10px] leading-relaxed text-zinc-400 overflow-y-auto max-h-[150px] scrollbar-thin">
                <div className="flex items-center gap-1.5 text-[9px] text-zinc-500 uppercase tracking-widest mb-2 border-b border-white/5 pb-1">
                  <Terminal className="w-3 h-3 text-secondary" />
                  <span>Real-time Process Stream</span>
                </div>
                
                <div className="space-y-1.5 select-text">
                  <AnimatePresence>
                    {visibleLogs.map((log, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`font-mono text-[10.5px] ${
                          log.includes('✔') 
                            ? 'text-emerald-400 font-medium' 
                            : log.includes('⚠️') 
                              ? 'text-amber-400 font-medium' 
                              : 'text-zinc-300'
                        }`}
                      >
                        {log}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  
                  {isPlaying && visibleLogs.length < PRESETS[activePreset].logs.length && (
                    <div className="flex items-center gap-1.5 text-secondary text-[10px] animate-pulse">
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-ping" />
                      <span>Computing task vector state...</span>
                    </div>
                  )}
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  )
}
