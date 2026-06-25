"use client"

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, Bot, User, Sparkles } from 'lucide-react'

interface Message {
  id: number
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
}

// ── Portfolio Knowledge Base ──────────────────────────────────────────
const PORTFOLIO_DATA = {
  name: 'Dhruv Dinesh Patil',
  role: 'AI Researcher & Generative Model Engineer',
  location: 'Nagpur, Maharashtra, India',
  email: 'sujalpatil8657231278@gmail.com',
  phone: '+91 8857841863',
  cgpa: '8.76',
  leetcodeRank: '1,254,070',
  resumeUrl: '/dhruv-patil-resume.pdf',

  socials: {
    github: 'https://github.com/DhruvPatil123',
    twitter: 'https://x.com/DhruvPatil_18',
    linkedin: 'https://www.linkedin.com/in/dhruv-patil-3816043b7/',
    instagram: 'https://www.instagram.com/_dhruv.exe.18',
    leetcode: 'https://leetcode.com/u/Dhruv_Patil_18/',
  },

  skills: {
    ai: ['PyTorch', 'TensorFlow', 'Hugging Face', 'LangChain', 'LlamaIndex', 'RAG', 'LLMs', 'Agentic Workflows', 'Computer Vision'],
    web: ['React 19', 'Next.js', 'Node.js', 'TypeScript', 'FastAPI', 'PostgreSQL', 'Tailwind CSS', 'Firebase', 'WebSockets'],
    systems: ['C++', 'Java (Advanced)', '.NET Core', 'C#', 'Cryptography', 'Software Testing', 'Git', 'Figma Prototyping'],
  },

  education: [
    { degree: 'B.Tech — Artificial Intelligence', institution: 'J.D. College of Engineering and Management, Nagpur', year: '2025 - 2028', cgpa: '8.76' },
    { degree: 'Diploma — Computer Science', institution: 'NIT Polytechnic, Nagpur', year: '2022 - 2025', score: '78%' },
    { degree: 'Secondary Education (10th)', institution: 'Yugantar High School, Nagpur', year: '2022', score: '81%' },
  ],

  projects: [
    { name: 'Raincrew.AI', desc: 'AI Talent Acquisition & Biometric Proctoring Engine using Google Gemini Multimodal Live WebSocket API', category: 'GenAI / Multimodal' },
    { name: 'Language Translation Tool', desc: 'Multilingual translation dashboard with dual-layer caching and performance telemetry', category: 'NLP' },
    { name: 'VisionCraft.AI', desc: 'Text-to-image and generative video app using GANs for 2K/4K output', category: 'Generative Art' },
    { name: 'AI Resume Builder', desc: 'ATS-optimizer using LLMs to rewrite resumes based on job requirements', category: 'LLM' },
    { name: 'TenderScan.AI', desc: 'NLP-based tender classification for government bids', category: 'NLP Classifier' },
    { name: 'Readme.AI', desc: 'Auto-generates professional README.md files via GitHub API', category: 'Dev Tooling' },
    { name: 'UnoUI', desc: 'Zero-code landing page creator with visual module-based layout', category: 'Low-Code' },
    { name: 'EncryptX', desc: 'Multi-layered encryption toolkit (AES, DES, RSA)', category: 'Cryptography' },
    { name: 'Flappy Bird', desc: 'Game recreation with custom collision-matrix calculations', category: 'Game Dev' },
  ],

  certifications: [
    'Generative AI, Deep Learning & LLMs — EduSkills / AICTE',
    'Professional UI/UX Design & Web Prototyping — EduSkills / AICTE',
    'Enhancing Soft Skills & Personality — NPTEL (IIT Kanpur)',
    'Full-Stack Flask Development Mastery — L&T EduTech',
  ],
}

// ── Intent Matching ──────────────────────────────────────────────────
function generateResponse(input: string): string {
  const q = input.toLowerCase().trim()

  // Greetings
  if (/^(hi|hello|hey|yo|sup|what'?s? up|howdy|hola)/i.test(q)) {
    return `Hey there! 👋 I'm Dhruv's portfolio assistant. I can help with **skills**, **projects**, **education**, **certifications**, **resume**, or **contact info**. What would you like to know?`
  }

  // Name / Who
  if (/who (is|are)|your name|about (you|dhruv|him)|tell me about|introduce/i.test(q)) {
    return `**${PORTFOLIO_DATA.name}** is an AI Researcher & Generative Model Engineer based in ${PORTFOLIO_DATA.location}. He's pursuing a B.Tech in Artificial Intelligence with a CGPA of ${PORTFOLIO_DATA.cgpa}, specializing in LLMs, Agentic AI, and RAG systems. 🚀`
  }

  // Skills
  if (/skill|tech|stack|what (can|does) (he|dhruv) (do|know|use)|expertise|proficien/i.test(q)) {
    return `Dhruv's technical arsenal spans three domains:\n\n🤖 **AI & ML:** ${PORTFOLIO_DATA.skills.ai.join(', ')}\n\n🌐 **Web Engineering:** ${PORTFOLIO_DATA.skills.web.join(', ')}\n\n⚙️ **Systems & Security:** ${PORTFOLIO_DATA.skills.systems.join(', ')}`
  }

  // AI-specific skills
  if (/\b(ai|machine learning|ml|deep learning|llm|gpt|genai|generative|agentic|rag|nlp|computer vision|pytorch|tensorflow|langchain|hugging)/i.test(q)) {
    return `In AI & ML, Dhruv works with:\n\n${PORTFOLIO_DATA.skills.ai.map(s => `• ${s}`).join('\n')}\n\nHis focus areas are **LLMs, Agentic Workflows, and RAG** for building autonomous AI systems. 🧠`
  }

  // Web skills
  if (/\b(web|react|next|node|frontend|backend|fullstack|full-stack|typescript|fastapi|api)/i.test(q)) {
    return `For web engineering, Dhruv uses:\n\n${PORTFOLIO_DATA.skills.web.map(s => `• ${s}`).join('\n')}\n\nHe builds high-performance web apps with React 19, Next.js, and FastAPI backends. 💻`
  }

  // Projects (general)
  if (/project|work|portfolio|built|created|developed|made/i.test(q)) {
    const projectList = PORTFOLIO_DATA.projects.map(p => `• **${p.name}** _(${p.category})_ — ${p.desc}`).join('\n')
    return `Dhruv has built ${PORTFOLIO_DATA.projects.length} notable projects:\n\n${projectList}\n\nAsk about any specific project for more details! 🔥`
  }

  // Specific project queries
  if (/raincrew/i.test(q)) return `🎯 **Raincrew.AI** is Dhruv's flagship project — a next-gen AI Talent Acquisition & Biometric Proctoring Engine using Google Gemini Multimodal Live WebSocket API with real-time oral interview metrics. It's in the GenAI / Multimodal space.`
  if (/visioncraft/i.test(q)) return `🎨 **VisionCraft.AI** is a text-to-image and generative video application using custom prompt modeling via GANs to produce 2K/4K visual output.`
  if (/tenderscan/i.test(q)) return `📋 **TenderScan.AI** uses NLP to automatically classify and prioritize government tender bids across regional domains.`
  if (/resume.builder/i.test(q)) return `📄 **AI Resume Builder** is an ATS-optimizer that uses LLMs to organically rewrite and format professional resumes based on specific job requirements.`
  if (/encrypt/i.test(q)) return `🔐 **EncryptX** is a security desktop toolkit implementing multi-layered encryption algorithms including AES, DES, and RSA.`
  if (/readme/i.test(q)) return `📝 **Readme.AI** is an interactive terminal tool that auto-generates high-fidelity professional README.md files via the GitHub API.`
  if (/uno\s?ui/i.test(q)) return `🧩 **UnoUI** is a zero-code landing page creator using visual module-based layout components that render fluid HTML dynamically.`
  if (/flappy/i.test(q)) return `🐦 **Flappy Bird** — a classic game recreation focusing on custom collision-matrix calculations and smooth coordinate delta updates.`
  if (/translat/i.test(q)) return `🌍 **Language Translation Tool** — a high-performance multilingual translation dashboard featuring real-time dual-layer caching and visual performance telemetry.`

  if (/resume|cv|download|profile/i.test(q)) {
    return `You can download Dhruv's resume from the hero section or open it directly here:\n\n${PORTFOLIO_DATA.resumeUrl}\n\nIt highlights his AI research focus, web stack, education, and selected projects.`
  }

  if (/hire|recruit|candidate|fit|strength|why dhruv/i.test(q)) {
    return `Dhruv is strongest for roles that need **AI prototyping plus production web execution**. His portfolio combines LLM/RAG systems, multimodal GenAI projects, TypeScript/Next.js interfaces, and solid fundamentals from C++, Java, and software testing.`
  }

  // Education
  if (/educat|college|university|degree|school|diploma|study|cgpa|gpa|academic/i.test(q)) {
    const eduList = PORTFOLIO_DATA.education.map(e => `🎓 **${e.degree}**\n   ${e.institution} _(${e.year})_`).join('\n\n')
    return `Dhruv's academic background:\n\n${eduList}\n\nCurrent CGPA: **${PORTFOLIO_DATA.cgpa}** ⭐`
  }

  // Certifications
  if (/certif|course|training|credential/i.test(q)) {
    const certList = PORTFOLIO_DATA.certifications.map(c => `✅ ${c}`).join('\n')
    return `Dhruv holds these certifications:\n\n${certList}`
  }

  // Contact
  if (/contact|email|mail|phone|call|reach|hire|connect|talk/i.test(q)) {
    return `You can reach Dhruv through:\n\n📧 **Email:** ${PORTFOLIO_DATA.email}\n📱 **Phone:** ${PORTFOLIO_DATA.phone}\n📍 **Location:** ${PORTFOLIO_DATA.location}\n\nOr connect on social media — links are in the footer! 🤝`
  }

  // Social links
  if (/social|github|twitter|linkedin|instagram|leetcode/i.test(q)) {
    return `Dhruv's social profiles:\n\n🐙 **GitHub:** ${PORTFOLIO_DATA.socials.github}\n🐦 **Twitter/X:** ${PORTFOLIO_DATA.socials.twitter}\n💼 **LinkedIn:** ${PORTFOLIO_DATA.socials.linkedin}\n📸 **Instagram:** ${PORTFOLIO_DATA.socials.instagram}\n💡 **LeetCode:** ${PORTFOLIO_DATA.socials.leetcode}`
  }

  // LeetCode
  if (/leetcode|competitive|coding|rank/i.test(q)) {
    return `Dhruv's LeetCode profile:\n\n🏆 **Global Rank:** ${PORTFOLIO_DATA.leetcodeRank}\n🔗 **Profile:** ${PORTFOLIO_DATA.socials.leetcode}\n\nHe has solved 850+ algorithmic challenges! 💪`
  }

  // Location
  if (/where|location|city|country|based/i.test(q)) {
    return `Dhruv is based in **${PORTFOLIO_DATA.location}** 📍`
  }

  // Experience / internships
  if (/experience|intern|job|work history|career/i.test(q)) {
    return `Dhruv's professional experience includes:\n\n💼 **GenAI & Deep Learning Intern** — EduSkills Foundation / AICTE (Jan–Mar 2026)\nSpecialized in GANs, Deep Learning architectures, and LLM pipeline optimization.\n\n🎨 **UI/UX Design & Web Prototyping Intern** — EduSkills Foundation / AICTE (Apr–Jun 2026)\nDeveloped high-fidelity wireframes and functional digital prototypes.\n\n🛠️ **Enterprise Flask Backend Certified** — L&T EduTech (May 2026)\nMastered production SQL routing, RESTful architecture, and multi-threaded processing.`
  }

  // Thanks
  if (/thank|thanks|thx|appreciate/i.test(q)) {
    return `You're welcome! 😊 If you'd like to work with Dhruv or have any more questions, feel free to ask or drop him an email at **${PORTFOLIO_DATA.email}**!`
  }

  // Goodbye
  if (/bye|goodbye|see you|later|cya/i.test(q)) {
    return `Goodbye! 👋 Thanks for visiting Dhruv's portfolio. Don't hesitate to reach out if you need anything!`
  }

  // Fallback
  return `Great question! I can help you with info about Dhruv's:\n\n• **Skills** — AI/ML, Web, Systems\n• **Projects** — 9 notable builds\n• **Education** — Academic background\n• **Certifications** — Professional credentials\n• **Contact** — How to reach Dhruv\n• **Experience** — Internships & career\n\nTry asking about any of these! 💡`
}

// ── Chatbot Component ────────────────────────────────────────────────
interface ChatbotProps {
  isOpen: boolean
  onClose: () => void
}

export default function Chatbot({ isOpen, onClose }: ChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setMessages([
      {
        id: 0,
        text: "Hey! 👋 I'm Dhruv's portfolio assistant. Ask me anything about his **skills**, **projects**, **education**, or **contact info**!",
        sender: 'bot',
        timestamp: new Date(),
      },
    ])
  }, [])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [isOpen])

  const handleSend = async () => {
    const trimmed = input.trim()
    if (!trimmed) return

    const userMsg: Message = {
      id: Date.now(),
      text: trimmed,
      sender: 'user',
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setIsTyping(true)

    // Simulate typing delay
    const delay = Math.min(800 + trimmed.length * 15, 2000)
    await new Promise((res) => setTimeout(res, delay))

    const botResponse = generateResponse(trimmed)
    const botMsg: Message = {
      id: Date.now() + 1,
      text: botResponse,
      sender: 'bot',
      timestamp: new Date(),
    }

    setIsTyping(false)
    setMessages((prev) => [...prev, botMsg])
  }

  const sendPrompt = (prompt: string) => {
    const userMsg: Message = {
      id: Date.now(),
      text: prompt,
      sender: 'user',
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setIsTyping(true)

    setTimeout(() => {
      const botResponse = generateResponse(prompt)
      setIsTyping(false)
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, text: botResponse, sender: 'bot', timestamp: new Date() },
      ])
    }, 700)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  // Simple markdown-like rendering for bold text
  const renderText = (text: string) => {
    const parts = text.split(/(\*\*[^*]+\*\*)/g)
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={i} className="text-white font-bold">
            {part.slice(2, -2)}
          </strong>
        )
      }
      // Handle line breaks
      return part.split('\n').map((line, j) => (
        <React.Fragment key={`${i}-${j}`}>
          {j > 0 && <br />}
          {line}
        </React.Fragment>
      ))
    })
  }

  const quickQuestions = [
    'Best AI projects?',
    'Download resume',
    'Why hire Dhruv?',
    'How to contact?',
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[998]"
          />

          {/* Chat Panel */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-4 left-4 right-4 md:left-auto md:right-8 md:bottom-8 md:w-[440px] h-[520px] md:h-[600px] max-h-[85vh] z-[999] flex flex-col rounded-3xl overflow-hidden border border-white/15"
            style={{
              background: 'linear-gradient(145deg, rgba(10,10,10,0.95), rgba(20,20,30,0.95))',
              backdropFilter: 'blur(24px)',
              boxShadow: '0 0 60px rgba(0,242,255,0.08), 0 25px 50px rgba(0,0,0,0.5)',
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-dark" />
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-dark" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm">Portfolio Assistant</h3>
                  <p className="text-green-400 text-[10px] uppercase tracking-widest font-medium">Online</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-thin">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex gap-2.5 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div
                    className={`w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0 mt-1 ${
                      msg.sender === 'bot'
                        ? 'bg-gradient-to-br from-primary/20 to-secondary/20 text-primary'
                        : 'bg-white/10 text-white'
                    }`}
                  >
                    {msg.sender === 'bot' ? <Bot className="w-3.5 h-3.5" /> : <User className="w-3.5 h-3.5" />}
                  </div>
                  <div
                    className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                      msg.sender === 'bot'
                        ? 'bg-white/5 text-gray-300 rounded-tl-md border border-white/5'
                        : 'bg-gradient-to-r from-primary to-primary/80 text-dark font-medium rounded-tr-md'
                    }`}
                  >
                    {renderText(msg.text)}
                  </div>
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-2.5"
                >
                  <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-primary flex-shrink-0 mt-1">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                  <div className="bg-white/5 border border-white/5 px-4 py-3 rounded-2xl rounded-tl-md">
                    <div className="flex gap-1.5">
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Questions (show only when few messages) */}
            {messages.length <= 2 && (
              <div className="px-4 pb-2 flex flex-wrap gap-2">
                {quickQuestions.map((q) => (
                  <button
                    key={q}
                    onClick={() => sendPrompt(q)}
                    className="px-3 py-1.5 rounded-full text-[11px] font-medium bg-white/5 text-gray-400 hover:text-primary hover:bg-primary/10 border border-white/5 hover:border-primary/30 transition-all"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="px-4 pb-4 pt-2">
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-2xl px-4 py-2 focus-within:border-primary/50 transition-colors">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about Dhruv..."
                  className="flex-1 bg-transparent text-white text-sm outline-none placeholder:text-gray-600"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${
                    input.trim()
                      ? 'bg-primary text-dark hover:scale-105'
                      : 'bg-white/5 text-gray-600'
                  }`}
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
