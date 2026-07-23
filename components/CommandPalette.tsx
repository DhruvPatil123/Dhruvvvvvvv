"use client"

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Terminal, Navigation, Zap, Volume2, VolumeX, Download, ArrowRight, CornerDownLeft, Sparkles, Code2, Cpu, FolderGit2, Trophy, Mail, Calendar, Github, Sliders } from 'lucide-react'
import { playTick, playPopover, playNotification } from '@/lib/sounds'
import { usePerformanceStore } from '@/store/usePerformanceStore'
import { useAudioStore } from '@/store/useAudioStore'
import { useRecruiterStore } from '@/store/useRecruiterStore'
import { useProjectStore } from '@/store/useProjectStore'
import { useSkillsStore } from '@/store/useSkillsStore'
import { useBackgroundSettingsStore } from '@/store/useBackgroundSettingsStore'
import { downloadResume } from '@/lib/downloadResume'

interface CommandItem {
  id: string
  title: string
  subtitle: string
  category: 'navigation' | 'actions'
  icon: React.ReactNode
  action: () => void
}

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  const { performanceMode, setPerformanceMode } = usePerformanceStore()
  const { isMuted, setIsMuted } = useAudioStore()

  // 1. Keyboard shortcut listener (Ctrl+K / Cmd+K) and Esc to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        playPopover()
        setIsOpen((prev) => !prev)
        setSearch('')
        setSelectedIndex(0)
      } else if (e.key === 'Escape' && isOpen) {
        setIsOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  // Focus input when palette opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 50)
    }
  }, [isOpen])

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
    setIsOpen(false)
  }

  // Define commands list dynamically
  const commands: CommandItem[] = [
    // Navigation Commands
    {
      id: 'nav-hero',
      title: 'Go to Hero Section',
      subtitle: 'Introduction & Dynamic Taglines',
      category: 'navigation',
      icon: <Navigation className="w-4 h-4 text-primary" />,
      action: () => scrollToSection('hero'),
    },
    {
      id: 'nav-about',
      title: 'Go to About Section',
      subtitle: 'Academic CGPA, Origin & Intent',
      category: 'navigation',
      icon: <Navigation className="w-4 h-4 text-primary" />,
      action: () => scrollToSection('about'),
    },
    {
      id: 'nav-skills',
      title: 'Go to Skills Matrix',
      subtitle: 'AI, Web Engineering, Systems Stack',
      category: 'navigation',
      icon: <Navigation className="w-4 h-4 text-primary" />,
      action: () => scrollToSection('skills'),
    },
    {
      id: 'nav-projects',
      title: 'Go to Projects Showcase',
      subtitle: 'VisionCraft Sandbox, EncryptX, and Code',
      category: 'navigation',
      icon: <Navigation className="w-4 h-4 text-primary" />,
      action: () => scrollToSection('work'),
    },
    {
      id: 'nav-credentials',
      title: 'Go to Credentials & Education',
      subtitle: 'Degrees, Qualifications & Tech Focus',
      category: 'navigation',
      icon: <Navigation className="w-4 h-4 text-primary" />,
      action: () => scrollToSection('credentials'),
    },
    {
      id: 'nav-achievements',
      title: 'Go to Achievements & LeetCode',
      subtitle: 'Global ranking, Hackathons, certificates',
      category: 'navigation',
      icon: <Navigation className="w-4 h-4 text-primary" />,
      action: () => scrollToSection('achievements'),
    },
    {
      id: 'nav-timeline',
      title: 'Go to Journey Timeline',
      subtitle: 'Professional history & technical progression',
      category: 'navigation',
      icon: <Navigation className="w-4 h-4 text-primary" />,
      action: () => scrollToSection('experience'),
    },
    {
      id: 'nav-testimonials',
      title: 'Go to Testimonials',
      subtitle: 'Endorsements from peers & developers',
      category: 'navigation',
      icon: <Navigation className="w-4 h-4 text-primary" />,
      action: () => scrollToSection('testimonials'),
    },
    {
      id: 'nav-contact',
      title: 'Go to Contact / Signal Core',
      subtitle: 'Send safe direct messages securely',
      category: 'navigation',
      icon: <Navigation className="w-4 h-4 text-primary" />,
      action: () => scrollToSection('contact'),
    },
    // Action Commands
    {
      id: 'action-recruiter-view',
      title: '⚡ Open 30-Second Recruiter View',
      subtitle: 'Ultra-clean, high-density fast-scanning summary & metrics',
      category: 'actions',
      icon: <Sparkles className="w-4 h-4 text-cyan-400" />,
      action: () => {
        setIsOpen(false)
        useRecruiterStore.getState().openRecruiterView()
      },
    },
    {
      id: 'action-bg-settings',
      title: 'Customize Background & Aesthetics',
      subtitle: 'Adjust opacity, chiaroscuro contrast, parallax depth, and acoustics',
      category: 'actions',
      icon: <Sliders className="w-4 h-4 text-amber-400" />,
      action: () => {
        setIsOpen(false)
        useBackgroundSettingsStore.getState().setIsSettingsOpen(true)
      },
    },
    {
      id: 'action-view-leetcode',
      title: 'View LeetCode Stats & Profile',
      subtitle: 'Knight Rank, 500+ Solved, 2026 Rating 1948',
      category: 'actions',
      icon: <Trophy className="w-4 h-4 text-amber-400" />,
      action: () => {
        setIsOpen(false)
        scrollToSection('achievements')
      },
    },
    {
      id: 'action-view-github',
      title: 'View GitHub Profile',
      subtitle: 'github.com/Dhruv-Kotadiya',
      category: 'actions',
      icon: <Github className="w-4 h-4 text-purple-400" />,
      action: () => {
        setIsOpen(false)
        window.open('https://github.com/Dhruv-Kotadiya', '_blank', 'noopener,noreferrer')
      },
    },
    {
      id: 'action-contact',
      title: 'Contact Dhruv Kotadiya',
      subtitle: 'Send direct encrypted message or schedule meeting',
      category: 'actions',
      icon: <Mail className="w-4 h-4 text-emerald-400" />,
      action: () => {
        setIsOpen(false)
        scrollToSection('contact')
      },
    },
    // Project Search Commands
    {
      id: 'proj-raincrew',
      title: 'Case Study: Raincrew.AI',
      subtitle: 'Real-time AI Interviewer & Biometric Proctoring System',
      category: 'navigation',
      icon: <FolderGit2 className="w-4 h-4 text-cyan-400" />,
      action: () => {
        setIsOpen(false)
        scrollToSection('work')
        useProjectStore.getState().openProjectModal('Raincrew.AI')
      },
    },
    {
      id: 'proj-autoforge',
      title: 'Case Study: AutoForge.AI',
      subtitle: 'Autonomous Code Generation Agent & Self-Healing AST Engine',
      category: 'navigation',
      icon: <FolderGit2 className="w-4 h-4 text-purple-400" />,
      action: () => {
        setIsOpen(false)
        scrollToSection('work')
        useProjectStore.getState().openProjectModal('AutoForge.AI')
      },
    },
    {
      id: 'proj-visioncraft',
      title: 'Case Study: VisionCraft.AI',
      subtitle: 'Generative Neural Canvas with PyTorch GAN Cluster',
      category: 'navigation',
      icon: <FolderGit2 className="w-4 h-4 text-pink-400" />,
      action: () => {
        setIsOpen(false)
        scrollToSection('work')
        useProjectStore.getState().openProjectModal('VisionCraft.AI')
      },
    },
    {
      id: 'proj-schemaforge',
      title: 'Case Study: SchemaForge.AI',
      subtitle: 'LLM Database Schema Architecture & D3 Force Compiler',
      category: 'navigation',
      icon: <FolderGit2 className="w-4 h-4 text-blue-400" />,
      action: () => {
        setIsOpen(false)
        scrollToSection('work')
        useProjectStore.getState().openProjectModal('SchemaForge.AI')
      },
    },
    {
      id: 'proj-waterflow',
      title: 'Case Study: WaterFlow',
      subtitle: 'Generative UX Engine & Fluid Dynamic Theme Compiler',
      category: 'navigation',
      icon: <FolderGit2 className="w-4 h-4 text-teal-400" />,
      action: () => {
        setIsOpen(false)
        scrollToSection('work')
        useProjectStore.getState().openProjectModal('WaterFlow')
      },
    },
    {
      id: 'proj-hallucination',
      title: 'Case Study: AI Hallucination Detector',
      subtitle: 'NLP Vector RAG Verification & Claim Contradiction Matrix',
      category: 'navigation',
      icon: <FolderGit2 className="w-4 h-4 text-amber-400" />,
      action: () => {
        setIsOpen(false)
        scrollToSection('work')
        useProjectStore.getState().openProjectModal('AI Hallucination Detector')
      },
    },
    {
      id: 'proj-encryptx',
      title: 'Case Study: EncryptX',
      subtitle: 'High-Throughput Cryptographic File Encryption System',
      category: 'navigation',
      icon: <FolderGit2 className="w-4 h-4 text-emerald-400" />,
      action: () => {
        setIsOpen(false)
        scrollToSection('work')
        useProjectStore.getState().openProjectModal('EncryptX')
      },
    },
    {
      id: 'proj-dockmind',
      title: 'Case Study: Dockmind',
      subtitle: 'Vector Search Document Intelligence Engine with HNSW RAG',
      category: 'navigation',
      icon: <FolderGit2 className="w-4 h-4 text-indigo-400" />,
      action: () => {
        setIsOpen(false)
        scrollToSection('work')
        useProjectStore.getState().openProjectModal('Dockmind')
      },
    },
    {
      id: 'proj-studyplanner',
      title: 'Case Study: AI Study Planner',
      subtitle: 'Adaptive Spaced-Repetition Study Engine',
      category: 'navigation',
      icon: <FolderGit2 className="w-4 h-4 text-sky-400" />,
      action: () => {
        setIsOpen(false)
        scrollToSection('work')
        useProjectStore.getState().openProjectModal('AI Study Planner')
      },
    },
    {
      id: 'proj-resunova',
      title: 'Case Study: ResuNova',
      subtitle: 'AI Resume Optimization Engine',
      category: 'navigation',
      icon: <FolderGit2 className="w-4 h-4 text-rose-400" />,
      action: () => {
        setIsOpen(false)
        scrollToSection('work')
        useProjectStore.getState().openProjectModal('ResuNova')
      },
    },
    // Skills Filter Commands
    {
      id: 'skill-python',
      title: 'Skill Filter: Python & PyTorch',
      subtitle: 'Deep Learning, CUDA, Torch, Data Pipelines',
      category: 'actions',
      icon: <Code2 className="w-4 h-4 text-amber-400" />,
      action: () => {
        setIsOpen(false)
        scrollToSection('skills')
        useSkillsStore.getState().setSelectedSkill('Python')
      },
    },
    {
      id: 'skill-cpp',
      title: 'Skill Filter: C++ / Systems',
      subtitle: 'Memory Safety, Pointers, Hardware Acceleration, OOP',
      category: 'actions',
      icon: <Cpu className="w-4 h-4 text-blue-400" />,
      action: () => {
        setIsOpen(false)
        scrollToSection('skills')
        useSkillsStore.getState().setSelectedSkill('C++')
      },
    },
    {
      id: 'skill-nextjs',
      title: 'Skill Filter: Next.js & React',
      subtitle: 'Full-Stack App Router, Server Actions, Tailwind CSS',
      category: 'actions',
      icon: <Code2 className="w-4 h-4 text-cyan-400" />,
      action: () => {
        setIsOpen(false)
        scrollToSection('skills')
        useSkillsStore.getState().setSelectedSkill('Next.js')
      },
    },
    {
      id: 'skill-gemini',
      title: 'Skill Filter: Gemini API & Multimodal AI',
      subtitle: 'Live Audio WebSockets, Gemini Flash, Function Calling',
      category: 'actions',
      icon: <Sparkles className="w-4 h-4 text-purple-400" />,
      action: () => {
        setIsOpen(false)
        scrollToSection('skills')
        useSkillsStore.getState().setSelectedSkill('Gemini API')
      },
    },
    {
      id: 'skill-docker',
      title: 'Skill Filter: Docker & Microservices',
      subtitle: 'Containerization, IPC, CI/CD Pipelines, Kubernetes',
      category: 'actions',
      icon: <Cpu className="w-4 h-4 text-emerald-400" />,
      action: () => {
        setIsOpen(false)
        scrollToSection('skills')
        useSkillsStore.getState().setSelectedSkill('Docker')
      },
    },
    {
      id: 'action-perf',
      title: performanceMode ? 'Disable Performance Mode (Enable 3D)' : 'Enable Performance Mode (Lightweight)',
      subtitle: 'Turns off high-end canvas calculations to boost frames',
      category: 'actions',
      icon: <Zap className="w-4 h-4 text-amber-400" />,
      action: () => {
        setPerformanceMode(!performanceMode)
        playNotification()
        setIsOpen(false)
      },
    },
    {
      id: 'action-mute',
      title: isMuted ? 'Unmute Ambient Sound Pad' : 'Mute Ambient Sound Pad',
      subtitle: 'Toggle global audio feedback on and off',
      category: 'actions',
      icon: isMuted ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-zinc-400" />,
      action: () => {
        setIsMuted(!isMuted)
        playNotification()
        setIsOpen(false)
      },
    },
    {
      id: 'action-resume-charcoal',
      title: 'Download Resume (Classic Charcoal)',
      subtitle: 'Download PDF CV styled in elegant dark slate',
      category: 'actions',
      icon: <Download className="w-4 h-4 text-zinc-300" />,
      action: () => {
        downloadResume('charcoal')
        playNotification()
        setIsOpen(false)
      },
    },
    {
      id: 'action-resume-emerald',
      title: 'Download Resume (Emerald Tech)',
      subtitle: 'Download PDF CV styled in cyber green theme',
      category: 'actions',
      icon: <Download className="w-4 h-4 text-emerald-400" />,
      action: () => {
        downloadResume('emerald')
        playNotification()
        setIsOpen(false)
      },
    },
    {
      id: 'action-resume-cobalt',
      title: 'Download Resume (Royal Cobalt)',
      subtitle: 'Download PDF CV styled in classic deep blue',
      category: 'actions',
      icon: <Download className="w-4 h-4 text-blue-400" />,
      action: () => {
        downloadResume('cobalt')
        playNotification()
        setIsOpen(false)
      },
    }
  ]

  // Filter commands based on search
  const filteredCommands = commands.filter(
    (cmd) =>
      cmd.title.toLowerCase().includes(search.toLowerCase()) ||
      cmd.subtitle.toLowerCase().includes(search.toLowerCase())
  )

  // Ensure index boundary
  useEffect(() => {
    setSelectedIndex(0)
  }, [search])

  // Handle keyboard list navigation
  const handleListKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      playTick()
      setSelectedIndex((prev) => (prev + 1) % filteredCommands.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      playTick()
      setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length)
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (filteredCommands[selectedIndex]) {
        filteredCommands[selectedIndex].action()
      }
    }
  };

  // Scroll active item into view
  useEffect(() => {
    if (listRef.current) {
      const activeEl = listRef.current.children[selectedIndex] as HTMLElement
      if (activeEl) {
        activeEl.scrollIntoView({ block: 'nearest' })
      }
    }
  }, [selectedIndex])

  return (
    <>
      {/* Floating command prompt discoverability widget */}
      <button
        onClick={() => {
          playPopover()
          setIsOpen(true)
          setSearch('')
          setSelectedIndex(0)
        }}
        className="fixed bottom-6 left-6 z-[990] active-tactile glass-effect hover:bg-white/10 px-4 py-2.5 rounded-2xl flex items-center gap-2.5 text-zinc-400 hover:text-white border border-white/5 hover:border-white/20 transition-all duration-300 font-mono text-[11px] font-bold shadow-[0_8px_32px_rgba(0,0,0,0.45)] pointer-events-auto cursor-pointer"
        aria-label="Open Command Console"
        title="Or press Ctrl + K"
      >
        <Terminal className="w-4 h-4 text-primary animate-pulse" />
        <span>CONSOLE</span>
        <span className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-white/5 border border-white/5 text-[9px] text-zinc-500 font-bold ml-1">
          CTRL + K
        </span>
      </button>

      {/* Modal Dialog */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[9999] flex items-start justify-center pt-[12vh] px-4">
            {/* Dark blur glass backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0 bg-black/75 backdrop-blur-md"
              onClick={() => setIsOpen(false)}
            />

            {/* Console Container */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.97 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="relative w-full max-w-xl glass-effect border border-white/10 bg-zinc-950/90 rounded-3xl overflow-hidden shadow-[0_24px_70px_rgba(0,0,0,0.85)] flex flex-col max-h-[500px]"
            >
              {/* Top search input line */}
              <div className="flex items-center gap-3 px-5 py-4 border-b border-white/5 bg-zinc-950/40">
                <Search className="w-5 h-5 text-zinc-400 flex-shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Type a command or section..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={handleListKeyDown}
                  className="w-full bg-transparent text-white font-mono text-sm border-none outline-none focus:ring-0 placeholder-zinc-500"
                  aria-label="Search portfolio command line"
                />
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-2 py-1 rounded bg-white/5 hover:bg-white/10 text-zinc-500 hover:text-zinc-300 font-mono text-[9px] border border-white/5 transition-all"
                >
                  ESC
                </button>
              </div>

              {/* Suggestions stream */}
              <div
                ref={listRef}
                className="flex-grow overflow-y-auto p-3 space-y-1 scrollbar-thin select-none"
              >
                {filteredCommands.length > 0 ? (
                  filteredCommands.map((cmd, index) => {
                    const isSelected = index === selectedIndex
                    return (
                      <button
                        key={cmd.id}
                        onClick={() => {
                          playPopover()
                          cmd.action()
                        }}
                        onMouseEnter={() => setSelectedIndex(index)}
                        className={`w-full flex items-center justify-between p-3 rounded-2xl transition-all duration-200 text-left border cursor-pointer ${
                          isSelected
                            ? 'bg-white/5 border-white/15 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]'
                            : 'bg-transparent border-transparent'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                            isSelected ? 'bg-primary/10 text-primary border border-primary/20' : 'bg-white/[0.03] text-zinc-400 border border-transparent'
                          }`}>
                            {cmd.icon}
                          </div>
                          <div>
                            <p className={`text-xs font-mono font-bold tracking-wide transition-colors ${
                              isSelected ? 'text-white' : 'text-zinc-300'
                            }`}>
                              {cmd.title}
                            </p>
                            <p className="text-[10px] text-zinc-500 leading-none mt-1 font-mono">{cmd.subtitle}</p>
                          </div>
                        </div>

                        {isSelected && (
                          <div className="flex items-center gap-1 font-mono text-[9px] text-zinc-400 bg-white/5 border border-white/5 px-2 py-0.5 rounded">
                            <span>Execute</span>
                            <CornerDownLeft className="w-2.5 h-2.5 text-zinc-500" />
                          </div>
                        )}
                      </button>
                    )
                  })
                ) : (
                  <div className="py-12 text-center space-y-2">
                    <p className="text-sm font-mono text-zinc-500">No matching command found</p>
                    <p className="text-[10px] font-mono text-zinc-600">Try typing &quot;Go to&quot; or &quot;Resume&quot;</p>
                  </div>
                )}
              </div>

              {/* Console status footer */}
              <div className="flex justify-between items-center px-5 py-3 border-t border-white/5 bg-zinc-950/60 font-mono text-[9px] text-zinc-500">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>SESSION STABLE</span>
                </div>
                <div className="flex gap-4">
                  <span>↑↓ NAVIGATE</span>
                  <span>ENTER SELECT</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
