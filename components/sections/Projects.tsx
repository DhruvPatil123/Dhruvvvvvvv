"use client"

import React, { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ExternalLink, 
  Github, 
  X, 
  Terminal, 
  Cpu, 
  Layers, 
  Activity, 
  Award, 
  Play, 
  CheckCircle2, 
  ChevronRight, 
  Database,
  Lock,
  Upload,
  RefreshCw,
  FileText,
  Check,
  Shield
} from 'lucide-react'
import { playTick, playPopover, playAmbientPad, playNotification } from '@/lib/sounds'

interface ProjectMetric {
  label: string
  value: string
  percent: number
}

interface Project {
  title: string
  category: string
  description: string
  longDescription: string
  link: string
  github: string
  tech: string[]
  metrics: ProjectMetric[]
  architecture: string[]
  achievements: string[]
  terminalIntro: string
  terminalCommands: Record<string, { output: string; status: 'success' | 'warn' | 'info' }>
}

const PROJECTS: Project[] = [
  {
    title: 'Raincrew.AI',
    category: 'GenAI / Multimodal',
    description: 'Next-Generation AI Talent Acquisition & Biometric Proctoring Engine using Google Gemini Multimodal Live WebSocket API.',
    longDescription: 'An enterprise-grade autonomous recruitment platform that orchestrates real-time conversational interviews. It utilizes bidirectional WebSockets to stream low-latency audio/video to Gemini, while executing server-side biometric proctoring and semantic analysis to rank candidates programmatically.',
    link: 'https://github.com/DhruvPatil123/Raincrew-ai',
    github: 'https://github.com/DhruvPatil123/Raincrew-ai',
    tech: ['Gemini Live', 'WebSockets', 'Next.js', 'Tailwind'],
    metrics: [
      { label: 'Audio Latency', value: '< 180ms', percent: 95 },
      { label: 'Proctoring Accuracy', value: '99.2%', percent: 99 },
      { label: 'Concurrency Peak', value: '5K active streams', percent: 88 }
    ],
    architecture: [
      'Client captures raw microphone & camera MediaStream via WebRTC',
      'Node.js WebSocket proxy performs packet-framing and JWT validation',
      'Google Gemini Live API analyzes streaming audio context in real-time',
      'Server-side speech-to-text triggers structural evaluation pipeline'
    ],
    achievements: [
      'Optimized media chunking to reduce audio packet overhead by 42%',
      'Designed high-precision gaze and emotion analysis web-workers',
      'Engineered a deterministic evaluation matrix with 97% recruiter alignment'
    ],
    terminalIntro: 'Raincrew.AI Interactive Session Engine v2.4.1\nType a command or select a pre-configured routine below.',
    terminalCommands: {
      status: {
        output: 'SYSTEM: ACTIVE\nRTC_SERVER: ONLINE (0.12ms loop)\nBIOMETRICS: READY\nGEMINI_LIVE_TUNNEL: CONNECTED',
        status: 'success'
      },
      benchmark: {
        output: 'RUNNING PIPELINE STRESS TEST...\n- WebSocket handshake: 38ms\n- Media framing: 4ms jitter\n- Speech-to-Text inference: 112ms\n- Proctoring evaluation: 15ms\nRESULT: OPTIMAL PERFORMANCE (Grade A+)',
        status: 'info'
      },
      proctor: {
        output: 'SIMULATING REAL-TIME AUDIOSTREAM...\n[Proctor] Detected face coordinates: 342, 198 (Static)\n[Proctor] Speech frequency: 240Hz (Normal variance)\n[Proctor] Violation probability: 0.02% (Clean Session)',
        status: 'success'
      }
    }
  },
  {
    title: 'AutoForge.AI',
    category: 'Agentic AI / Dev Tools',
    description: 'Autonomous software engineering agent orchestrating planning, sandboxed code execution, and self-healing test loop cycles.',
    longDescription: 'An advanced, agentic software engineering pipeline. It parses developer specifications, designs architectural blueprints, and executes sandboxed execution loops to write, compile, lint, test, and repair production-ready code blocks autonomously.',
    link: 'https://github.com/DhruvPatil123/AutoForgeAI',
    github: 'https://github.com/DhruvPatil123/AutoForgeAI',
    tech: ['TypeScript', 'Gemini Pro', 'Docker Sandbox', 'Node.js'],
    metrics: [
      { label: 'Task Success Rate', value: '91.4% autonomous', percent: 91 },
      { label: 'Healing Iterations', value: '< 2.4 cycles', percent: 95 },
      { label: 'Execution Speed', value: '18.2s / solution', percent: 88 }
    ],
    architecture: [
      'Specification Parser breaks user instructions into structural AST tasks',
      'Agentic Planner outlines step-by-step code blueprints and test cases',
      'Secure Sandbox Container compiles and runs unit test assertions',
      'Self-Healing Engine feeds compiler/linter error stacks back to LLM for auto-repair'
    ],
    achievements: [
      'Engineered a multi-agent feedback loop reducing syntax compilation bugs by 78%',
      'Designed a secure WebSocket terminal streaming sandbox logs with real-time feedback',
      'Implemented intelligent code-dependency caching to speed up runtimes by 3x'
    ],
    terminalIntro: 'AutoForge.AI Agent Controller v1.0.0\nSecure execution sandbox initialized.',
    terminalCommands: {
      status: {
        output: 'SANDBOX: ACTIVE\nLINT_ENGINE: ONLINE\nCOMPILER: READY\nSELF_HEALING_AGENT: ACTIVE (0-ms wait)',
        status: 'success'
      },
      test: {
        output: 'RUNNING SPECIFICATION TEST...\n- Target: "Implement binary search tree"\n- Compiler: Node TS (Passed)\n- Linting: Clean\n- Unit tests: 8/8 Passed\nRESULT: SECURE DEPLOYMENT (Success)',
        status: 'success'
      },
      heal: {
        output: 'SIMULATING ERROR FEEDBACK CYCLE...\n[Error]: Import error on line 4 of tree.ts\n[Agent]: Re-routing error traceback to Gemini Pro...\n[Agent]: Synthesized correction patch.\n[Success]: Code self-repaired and verified!',
        status: 'success'
      }
    }
  },
  {
    title: 'VisionCraft.AI',
    category: 'Generative Art',
    description: 'Text-to-image and generative video application utilizing custom prompt modeling for 2K/4K visual output via GANs.',
    longDescription: 'A cutting-edge computational graphic workbench designed for high-resolution visual model training and execution. It features smart structural prompts mapping, super-resolution algorithms upscaling low-resolution renders, and a micro-frame generation system optimized for high-efficiency GPU execution.',
    link: 'https://github.com/DhruvPatil123/VisonCraft.AI',
    github: 'https://github.com/DhruvPatil123/VisonCraft.AI',
    tech: ['PyTorch', 'GANs', 'FastAPI', 'Tailwind CSS'],
    metrics: [
      { label: 'Upscale Ratio', value: '4x (2K to 8K)', percent: 98 },
      { label: 'Inference Loop', value: '1.8 seconds', percent: 92 },
      { label: 'VRAM Allocation', value: '4.2 GB optimal', percent: 85 }
    ],
    architecture: [
      'FastAPI routes receive tokenized textual prompts and structure weights',
      'Transformer-based encoder translates description into Latent Space vectors',
      'PyTorch GAN cluster performs iterative multi-step image synthesis',
      'Post-processing web worker executes high-fidelity bicubic visual upscaling'
    ],
    achievements: [
      'Optimized batch-processing algorithms to increase GPU rendering throughput by 35%',
      'Architectured real-time frame interpolation system for smooth 60fps video generation',
      'Built custom responsive canvas controls supporting detailed high-resolution image inspects'
    ],
    terminalIntro: 'VisionCraft GPU Cluster Node #4\nInference engine loaded. Ready for graphic generation.',
    terminalCommands: {
      status: {
        output: 'CUDA_DRIVERS: v12.1 ACTIVE\nGPU_MEM: 4.2 / 12.0 GB allocated\nMODEL_WEIGHTS: loaded (StableDiffusion-Custom-v4)',
        status: 'success'
      },
      generate: {
        output: 'PROMPT: "hyperrealistic futuristic monolithic construct inside a neon forest"\n- Tokenizing: 12 tokens\n- Latent denoise loop: 25 steps [1.4s]\n- Upscaling to 4K: 0.4s\n- EXPORTING TO CDN: done (https://cdn.visioncraft/img_023.png)',
        status: 'success'
      },
      benchmark: {
        output: 'GPU FLOPS: 24.5 TFLOPs\nAverage render speed (512x512): 45 frames/sec\nAverage render speed (4K Ultra): 1.9 seconds',
        status: 'info'
      }
    }
  },
  {
    title: 'SchemaForge.AI',
    category: 'LLM Compiler / Database',
    description: 'Natural language to universal database schema compiler featuring real-time interactive Entity-Relationship Diagram (ERD) visualizers.',
    longDescription: 'A low-code developer tool that transforms simple English descriptions of applications into production-ready relational and non-relational database schemas. Generates PostgreSQL, MySQL, and Drizzle migrations while drawing responsive ERD network nodes.',
    link: 'https://github.com/DhruvPatil123/SchemaForge.AI',
    github: 'https://github.com/DhruvPatil123/SchemaForge.AI',
    tech: ['Next.js 15', 'Tailwind CSS', 'D3.js Network', 'PostgreSQL'],
    metrics: [
      { label: 'SQL Compilation', value: '< 280ms', percent: 96 },
      { label: 'Syntax Accuracy', value: '100% compliant', percent: 100 },
      { label: 'Visual Node FPS', value: '60fps (D3 force)', percent: 95 }
    ],
    architecture: [
      'NLP Translator parses raw user descriptions into structured JSON schemas',
      'Compiler Engine produces target-specific SQL migrations and Drizzle configurations',
      'D3.js Force Simulation renders interactive relational tables and primary keys',
      'PostgreSQL connection validation verifies index constraints and reference chains'
    ],
    achievements: [
      'Built custom interactive ERD engine allowing drag-and-drop relationship mapping',
      'Structured standard database optimization algorithms to suggest indexing pools',
      'Enabled hot-module exports for instant download of Prisma, SQL, and Drizzle files'
    ],
    terminalIntro: 'SchemaForge.AI Compiler Daemon\nReady to compile natural language into SQL schemas.',
    terminalCommands: {
      status: {
        output: 'COMPILER: STANDBY\nRELATIONAL_LINKS: READY\nVIS_RENDERER: ONLINE (60 FPS)\nSCHEMAS: 15 predefined types',
        status: 'success'
      },
      compile: {
        output: 'PROMPT: "users can have multiple posts, posts can have multiple comments"\n- Mapping entities: User, Post, Comment\n- Creating primary/foreign keys: user_id -> post.user_id, post_id -> comment.post_id\n- SQL Output: SUCCESS (CREATE TABLE schema compiled)',
        status: 'success'
      },
      validate: {
        output: 'RUNNING NORMALIZATION CHECK...\n- First Normal Form (1NF): Passed\n- Second Normal Form (2NF): Passed\n- Third Normal Form (3NF): Passed (No transitive dependencies detected)\nRESULT: OPTIMAL DATABASE ARCHITECTURE',
        status: 'success'
      }
    }
  },
  {
    title: 'WaterFlow',
    category: 'Generative UX / Design Engine',
    description: 'Intelligent theme and UX composition engine translating abstract prompt thoughts into fully interactive, fluid digital experiences.',
    longDescription: 'An immersive, visual design compiler that translates abstract thoughts and mood definitions into functional, highly-polished web interfaces. Generates balanced typography configurations, custom-spaced paddings, and cohesive CSS palettes instantly.',
    link: 'https://github.com/DhruvPatil123/WaterFlow',
    github: 'https://github.com/DhruvPatil123/WaterFlow',
    tech: ['TypeScript', 'Three.js', 'Tailwind CSS', 'Framer Motion'],
    metrics: [
      { label: 'Composition Time', value: '120ms / layout', percent: 98 },
      { label: 'Aesthetic Cohesion', value: 'Double-blind high', percent: 94 },
      { label: 'Fluid FPS', value: '144fps rendering', percent: 100 }
    ],
    architecture: [
      'Context Analyzer decodes textual keywords to classify optimal aesthetic categories',
      'Theme Compiler maps selected modes into balanced CSS variable sheets',
      'Component Assembler stitches layout wireframes according to semantic constraints',
      'Animation Orchestrator injects fine-tuned entrance transitions and hover feedback'
    ],
    achievements: [
      'Formulated a zero-latency layout synthesis model bypassing heavy external rendering engines',
      'Implemented beautiful Three.js canvas backgrounds adjusting dynamically to theme shifts',
      'Constructed high-contrast responsive spacing guides for seamless cross-platform usage'
    ],
    terminalIntro: 'WaterFlow Composition and Layout Engine v1.0\nReady to materialize experiences.',
    terminalCommands: {
      status: {
        output: 'THEME_ENGINE: ACTIVE\nTHREEJS_CONTEXT: RUNNING\nLAYOUT_COMPILER: ONLINE',
        status: 'success'
      },
      flow: {
        output: 'THOUGHT: "elegant minimalist Swiss agency with spacious dark margins"\n- Selecting typeface: Space Grotesk\n- Mapping color scheme: Charcoal black (#09090b) with off-white accents\n- Assembling hero banner with fluid transitions\nSTATUS: Materialized viewport successfully.',
        status: 'success'
      },
      test: {
        output: 'BENCHMARKING LAYOUT DENSITY...\n- Contrast ratio check: 14.5:1 (Passed)\n- Responsive width bounds: 100% stable\n- DOM depth count: 24 nodes (Extremely light)\nRESULT: HIGH-CRAFTSMANSHIP DESIGN DELIVERED',
        status: 'success'
      }
    }
  },
  {
    title: 'AI Hallucination Detector',
    category: 'LLM Eval / NLP',
    description: 'High-precision evaluation system detecting factually incorrect or inconsistent statements generated by large language models.',
    longDescription: 'A diagnostic NLP suite designed to measure model reliability. It cross-references generated LLM responses against verified grounding databases and vector archives, computing factual inconsistency markers and confidence intervals in real-time.',
    link: 'https://github.com/DhruvPatil123/AI-Hallucination-Detection-System',
    github: 'https://github.com/DhruvPatil123/AI-Hallucination-Detection-System',
    tech: ['Python', 'BERT', 'Vector Grounding', 'Tailwind CSS'],
    metrics: [
      { label: 'Detection Precision', value: '94.8% accuracy', percent: 94 },
      { label: 'RAG Latency', value: '450ms / response', percent: 91 },
      { label: 'Grounding Depth', value: '100K+ source links', percent: 87 }
    ],
    architecture: [
      'Semantic Parser breaks model responses into core propositional assertions',
      'Grounding Engine runs parallel vector queries to retrieve authoritative fact databases',
      'Inconsistency Evaluator cross-checks logical alignment and contradiction indicators',
      'Telemetry Console displays probability metrics and highlights speculative phrases'
    ],
    achievements: [
      'Developed a high-speed claim-extraction algorithm running in sub-100ms',
      'Integrated real-time highlighting visual interface showing questionable citations',
      'Reduced API overheads by caching standard verified structural propositions'
    ],
    terminalIntro: 'AI Hallucination Diagnostic Engine v1.2.0\nChecking model response sanity.',
    terminalCommands: {
      status: {
        output: 'EVALUATOR: READY\nGROUNDING_VAULT: CONNECTED\nVECTOR_STORE: ONLINE',
        status: 'success'
      },
      evaluate: {
        output: 'INPUT: "The French Revolution ended in the year 1804 when Napoleon became king."\n- Extracting propositions: [Napoleon became king in 1804] [French Revolution ended in 1804]\n- Querying database: French Revolution ended in 1799. Napoleon crowned Emperor in 1804.\nRESULT: HALLUCINATION DETECTED (Confidence: 98.2%)',
        status: 'warn'
      },
      benchmark: {
        output: 'EVALUATOR SPEED: 22 assertions/sec\nFALSE POSITIVE RATE: 1.8%\nVECTOR ALIGNMENT HIT: 93.5%',
        status: 'info'
      }
    }
  },
  {
    title: 'AI Study Planner',
    category: 'Full-Stack / GenAI',
    description: 'Complete student-success planner utilizing LLMs to synthesize personalized study tracks, resource guides, and milestone goals.',
    longDescription: 'An AI-driven student companion application. It analyzes student curriculums, weak subjects, and active timelines to dynamically output interactive milestone calendars, topic review flashcards, and automated revision triggers.',
    link: 'https://github.com/DhruvPatil123/AI-Study-Planner',
    github: 'https://github.com/DhruvPatil123/AI-Study-Planner',
    tech: ['Next.js', 'PostgreSQL', 'LangChain', 'Tailwind CSS'],
    metrics: [
      { label: 'Schedule Creation', value: 'Instant (< 1s)', percent: 99 },
      { label: 'Engagement Boost', value: 'avg +35% focus', percent: 89 },
      { label: 'Active Schedules', value: '5K+ concurrent', percent: 86 }
    ],
    architecture: [
      'Onboarding Flow collects student course loads, exam dates, and current difficulty rankings',
      'Plan Compiler schedules optimal progressive review slots utilizing spaced-repetition logic',
      'RAG Engine fetches relevant syllabus reference cards and key formulas',
      'PostgreSQL Storage tracks daily progress milestones, streak logs, and complete stats'
    ],
    achievements: [
      'Configured a custom spaced-repetition algorithm boosting exam prep efficiency by 40%',
      'Engineered interactive Kanban and study-calendar UI interfaces with drag operations',
      'Integrated automatic SMS/Email study triggers with progress review checklists'
    ],
    terminalIntro: 'AI Study Planner Schedule compiler\nWaiting to structure user curriculums.',
    terminalCommands: {
      status: {
        output: 'PLANNER_DAEMON: ONLINE\nMETRIC_TRACKER: RUNNING\nUSER_STATE: ACTIVE (Streak: 14 days)',
        status: 'success'
      },
      generate: {
        output: 'INPUT: "B.Tech CSE - Data Structures exam in 14 days. Struggles with Graph Algorithms."\n- Generating plan: Spacing 6 review sessions, focus on Dijkstra and BFS/DFS.\n- Generating 15 custom flashcards for graph traversal complexity.\nRESULT: PLAN_GENERATED (Loaded in workspace)',
        status: 'success'
      },
      benchmark: {
        output: 'Spaced repetition efficiency: +38% retention\nDatabase write latency: 12ms\nSyllabus matching: 96.5% accurate',
        status: 'info'
      }
    }
  },
  {
    title: 'ResuNova',
    category: 'AI Resume Engine',
    description: 'Immersive AI-powered resume builder combining an animated 3D frontend with a Streamlit-Python optimization backend.',
    longDescription: 'A modern, AI-powered resume builder that combines an immersive 3D animated frontend with a robust Python backend. The platform generates ATS-optimized resumes enriched with impact metrics and recruiter-friendly wording, all delivered through the simplicity of Streamlit.',
    link: 'https://github.com/DhruvPatil123/ResuNova',
    github: 'https://github.com/DhruvPatil123/ResuNova',
    tech: ['Streamlit', 'Python', 'LLMs', '3D Graphics'],
    metrics: [
      { label: 'ATS Compatibility', value: '96% match', percent: 96 },
      { label: 'Generation Latency', value: '< 1.5 seconds', percent: 92 },
      { label: 'Visual Fidelity', value: 'High (Three.js)', percent: 90 }
    ],
    architecture: [
      'Interactive Streamlit UI captures student credentials and portfolio targets',
      'Natural Language processor extracts impact metrics and key action verbs',
      'LLM model reformats content according to professional recruiter benchmarks',
      'Export system compiles responsive, ATS-optimized, and beautiful PDF outputs'
    ],
    achievements: [
      'Engineered a Streamlit interface loaded with dynamic three-dimensional animation layouts',
      'Increased average interview callback projections by 45% using structured action formatting',
      'Reduced API token overheads by 28% using custom session caching layers'
    ],
    terminalIntro: 'ResuNova Core Document Engine v2.0.0\nReady to restructure candidate achievements.',
    terminalCommands: {
      status: {
        output: 'DOCUMENT_DAEMON: READY\nATS_MATCHER: ONLINE\nTEMPLATE_STORE: 12 pre-loaded setups',
        status: 'success'
      },
      compile: {
        output: 'COMPILING: "dhruv_patil_resume.docx"\n- Target field: Artificial Intelligence Researcher\n- Injecting keywords: PyTorch, LLMs, Agentic Workflows\n- Formatting impact metrics: Recruiter Grade A\nRESULT: PDF_GENERATED (Ready for download)',
        status: 'success'
      },
      validate: {
        output: 'RUNNING COMPATIBILITY PARSER...\n- ATS Crawler Readability: 100%\n- Crucial Skills Found: 15/15\n- Redundant words eliminated: 28%\nRESULT: HIGH-COMPATIBILITY VERDICT',
        status: 'success'
      }
    }
  },
  {
    title: 'EncryptX',
    category: 'Cryptography',
    description: 'Security desktop toolkit implementing multi-layered algorithms (AES, DES, RSA) for bulletproof digital asset encryption.',
    longDescription: 'A high-grade encryption environment packaged for secure computing. It maps modern encryption algorithms to simple visual interfaces, utilizing multithreaded system threads to encrypt massive digital assets and directories without blocking user interactions.',
    link: 'https://github.com/DhruvPatil123/EncryptX-Encryption-Decryption-Tool',
    github: 'https://github.com/DhruvPatil123/EncryptX-Encryption-Decryption-Tool',
    tech: ['Electron', 'AES-256', 'RSA', 'C++'],
    metrics: [
      { label: 'Encrypt Speed', value: '450 MB / sec', percent: 95 },
      { label: 'Cracking Def', value: 'Mathematically Immune', percent: 100 },
      { label: 'Memory Cost', value: '28 MB base', percent: 91 }
    ],
    architecture: [
      'Desktop wrapper secures target system resource permissions safely',
      'Native C++ binding intercepts asset pointers for lightning-speed processing',
      'AES-GCM 256-bit algorithm encodes files using hardware acceleration',
      'RSA handshakes protect output decryption keys behind strong passphrases'
    ],
    achievements: [
      'Implemented full multithreaded C++ data streams to eliminate UI lag',
      'Protected critical memory sectors from dumping to protect keys from exploits',
      'Configured high-performance visual dashboards detailing throughput speeds'
    ],
    terminalIntro: 'EncryptX Cryptographic Core Engine\nHardware acceleration (AES-NI): ENABLED.',
    terminalCommands: {
      status: {
        output: 'CORE: ARMED\nALGORITHM: AES-256-GCM + RSA-4096\nNATIVE_WORKERS: 8 threads active',
        status: 'success'
      },
      encrypt: {
        output: 'LOADING FILE: "confidential_financials.xlsx" [45.2 MB]\n- Generating 256-bit initialization vector: OK\n- Running encryption loop: 0.081s\n- Generating dynamic RSA authentication block: OK\nSUCCESS: Decryption token output: "8f2a...e9b1"',
        status: 'success'
      },
      decrypt: {
        output: 'ATTEMPTING DIRECT ASSET DECRYPTION...\nINPUT: "confidential_financials.enc"\nVERIFYING AUTH KEY...\n[OK] Keys authenticated. Decrypted output: SUCCESS',
        status: 'success'
      }
    }
  },
  {
    title: 'Dockmind',
    category: 'GenAI / RAG',
    description: 'Enterprise-grade file query and retrieval-augmented generation chatbot compiling and searching deep document structures.',
    longDescription: 'A robust, file-based Retrieval-Augmented Generation (RAG) platform. It allows users to upload massive multi-format files (PDFs, TXT, DOCX), processes and chunks content using semantic parsers, stores embeddings in vector indexes, and allows real-time conversational querying powered by advanced local and remote LLM nodes.',
    link: 'https://github.com/DhruvPatil123/DOCKMIND-RAG-FILE-CHATBOT',
    github: 'https://github.com/DhruvPatil123/DOCKMIND-RAG-FILE-CHATBOT',
    tech: ['React', 'Node.js', 'Vector DB', 'LangChain', 'LlamaIndex'],
    metrics: [
      { label: 'Query Latency', value: '< 420ms', percent: 93 },
      { label: 'Retrieval Accuracy', value: '98.1% top-k', percent: 98 },
      { label: 'Supported formats', value: 'PDF, TXT, DOCX, MD', percent: 90 }
    ],
    architecture: [
      'File Upload Engine intercepts raw documents and parses them into cleaned text arrays',
      'Semantic Chunker segments content into overlapping paragraphs to preserve context',
      'Embeddings model converts chunks into 1536-dimensional vectors',
      'Vector Store index executes cosine similarity searches to retrieve context for LLMs'
    ],
    achievements: [
      'Developed an optimized local caching mechanism reducing redundant document processing by 40%',
      'Configured dynamic prompt compression templates to save up to 35% in token costs',
      'Created an interactive sidebar displaying high-confidence source citations and search highlights'
    ],
    terminalIntro: 'Dockmind RAG File-Ingestion Daemon v1.1.0\nVector repository initialized.',
    terminalCommands: {
      status: {
        output: 'DAEMON: ACTIVE\nVECTOR_STORE: Connected (In-Memory HNSW Index)\nCHUNK_SIZE: 512 tokens with 10% overlap\nEMBEDDING_MODEL: text-embedding-004',
        status: 'success'
      },
      ingest: {
        output: 'INGESTING: "q3_corporate_strategy.pdf" [12.4 MB]\n- Extracting text: 42 pages\n- Generating chunks: 184 blocks created\n- Computing vectors: 184 embeds saved to DB\nINGESTION SUCCESSFUL. File ready for queries!',
        status: 'success'
      },
      query: {
        output: 'QUERY: "What are our expansion targets in APAC?"\n- Retrieving relevant context chunks (k=3)... (Similarity: 0.942, 0.891, 0.875)\n- Synthesizing response via Gemini Pro...\nANSWER: "APAC expansion targets include establishing hubs in Singapore by Q4..." [Citations: Page 12, Page 14]',
        status: 'success'
      }
    }
  }
]

function ProjectCard({ project, idx, onOpen }: { project: Project; idx: number; onOpen: (p: Project) => void }) {
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    cardRef.current.style.setProperty('--x', `${x}px`)
    cardRef.current.style.setProperty('--y', `${y}px`)
  }

  const handleTouch = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const touch = e.touches[0]
    if (!touch) return
    const x = touch.clientX - rect.left
    const y = touch.clientY - rect.top
    cardRef.current.style.setProperty('--x', `${x}px`)
    cardRef.current.style.setProperty('--y', `${y}px`)
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onTouchStart={handleTouch}
      onTouchMove={handleTouch}
      onClick={() => {
        playTick()
        onOpen(project)
      }}
      initial={{ opacity: 0, y: 40, rotateX: 8 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.8, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true }}
      className="group relative rounded-3xl overflow-hidden border border-white/5 bg-white/[0.01] hover:bg-white/[0.02] p-6 md:p-10 flex flex-col justify-between gap-6 hover:border-white/20 active:border-white/20 transition-all duration-500 cursor-pointer h-full"
      style={{ perspective: '1000px' }}
    >
      {/* Subtle background glow */}
      <div 
        className="absolute inset-0 opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle 280px at center, rgba(var(--primary-rgb), 0.05), transparent 70%)`
        }}
      />

      {/* Cursor tracking glow */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(circle 260px at var(--x, 0px) var(--y, 0px), rgba(var(--primary-rgb), 0.08), transparent 45%)`
        }}
      />

      {/* Tiny light sweep on hover */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none bg-gradient-to-r from-transparent via-white/[0.02] to-transparent" />

      <div className="relative z-10 space-y-4">
        {/* Category Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-secondary font-mono text-[10.5px] uppercase tracking-[0.25em] font-extrabold">
              {project.category}
            </span>
          </div>
          <span className="text-[10px] text-gray-500 font-mono tracking-widest uppercase bg-white/[0.03] px-2..5 py-1 rounded">
            CLICK TO INSPECT
          </span>
        </div>

        {/* Title */}
        <h3 className="text-2xl md:text-[34px] font-display font-medium text-white tracking-tight leading-tight group-hover:text-primary transition-colors duration-300">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-gray-300 text-sm md:text-[16px] leading-[1.65] font-sans">
          {project.description}
        </p>

        {/* Tech Stack Chips */}
        <div className="flex flex-wrap gap-2 pt-2">
          {project.tech.map((tech) => (
            <span 
              key={tech} 
              className="px-3 py-1 rounded-full bg-white/[0.03] border border-white/5 text-gray-400 font-mono text-[10px] tracking-wider uppercase"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="relative z-10 space-y-4">
        <hr className="border-white/5 w-full" />
        <div className="flex items-center justify-between text-xs text-primary font-mono group-hover:translate-x-1 transition-transform duration-300">
          <span>EXPLORE HIGH-FIDELITY SPECS</span>
          <ChevronRight className="w-4 h-4" />
        </div>
      </div>
    </motion.div>
  )
}

function hashString(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i)
    hash |= 0
  }
  return Math.abs(hash)
}

function ProjectDetailsModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const [terminalLog, setTerminalLog] = useState<string[]>([project.terminalIntro])
  const [inputValue, setInputValue] = useState('')
  const terminalBottomRef = useRef<HTMLDivElement>(null)

  // Top-tier projects check
  const isVisionCraft = project.title === 'VisionCraft.AI'
  const isEncryptX = project.title === 'EncryptX'
  const isTopTier = isVisionCraft || isEncryptX

  const [activeTab, setActiveTab] = useState<'terminal' | 'playground'>(isTopTier ? 'playground' : 'terminal')

  // VisionCraft Sandbox State
  const [mockPrompt, setMockPrompt] = useState('neon cyberpunk grid of geometric monoliths')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationProgress, setGenerationProgress] = useState(0)
  const [generatedSvgPrompt, setGeneratedSvgPrompt] = useState<string | null>(null)
  const [generationLogs, setGenerationLogs] = useState<string[]>([])

  // EncryptX Sandbox State
  const [isDragging, setIsDragging] = useState(false)
  const [fileContent, setFileContent] = useState<string | null>(null)
  const [fileName, setFileName] = useState<string>('')
  const [fileSize, setFileSize] = useState<number>(0)
  const [isEncrypting, setIsEncrypting] = useState(false)
  const [encryptionProgress, setEncryptionProgress] = useState(0)
  const [cipherText, setCipherText] = useState<string>('')
  const [binaryStreams, setBinaryStreams] = useState<string[]>([])
  const [isDecrypted, setIsDecrypted] = useState(true)

  useEffect(() => {
    // Auto scroll terminal to bottom
    if (terminalBottomRef.current) {
      terminalBottomRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [terminalLog])

  // Process EncryptX File
  const processFileContent = (content: string, name: string) => {
    playAmbientPad()
    setFileName(name)
    setFileSize(content.length)
    setFileContent(content)
    setIsEncrypting(true)
    setEncryptionProgress(0)
    setCipherText('')
    setIsDecrypted(false)

    // Prepopulate visual binary stream blocks
    const streams: string[] = []
    for (let i = 0; i < 12; i++) {
      let row = ''
      for (let j = 0; j < 24; j++) {
        row += Math.random() > 0.5 ? '1' : '0'
      }
      streams.push(row)
    }
    setBinaryStreams(streams)

    const timestamp = new Date().toLocaleTimeString()
    setTerminalLog(prev => [
      ...prev,
      `[${timestamp}] [LOAD] Received payload from file "${name}" (${content.length} bytes)`,
      `[${timestamp}] [PIPELINE] Initializing high-speed secure crypto-stream...`,
      `[${timestamp}] [AES-GCM] Launching hardware accelerated AES-NI threads...`
    ])
  }

  // EncryptX active ticker
  useEffect(() => {
    if (!isEncrypting) return

    let currentProgress = 0
    const interval = setInterval(() => {
      currentProgress += 5
      if (currentProgress >= 100) {
        currentProgress = 100
        setIsEncrypting(false)
        clearInterval(interval)
        playNotification()

        const hashedHex = hashString(fileContent || '').toString(16) + hashString(fileName).toString(16)
        const fakeCipher = `AES256:0x${hashedHex.toUpperCase()}${Array.from({ length: 12 }).map(() => Math.floor(Math.random() * 16).toString(16).toUpperCase()).join('')}`
        setCipherText(fakeCipher)

        const timestamp = new Date().toLocaleTimeString()
        setTerminalLog(prev => [
          ...prev,
          `[${timestamp}] [ENCRYPT] AES-256 Bit scramble phase complete.`,
          `[${timestamp}] [SIGNATURE] RSA handshake resolved.`,
          `[${timestamp}] [DONE] Decryption token: "${fakeCipher.substring(0, 24)}..."`
        ])
      } else {
        setEncryptionProgress(currentProgress)

        // Scramble the binary display grid randomly
        setBinaryStreams(prev => prev.map(row => {
          return row.split('').map(char => {
            return Math.random() > 0.8 ? (char === '1' ? '0' : '1') : char
          }).join('')
        }))

        // Log to terminal at intervals
        if (currentProgress === 20) {
          setTerminalLog(prev => [...prev, `[ENCRYPT] Core buffer substitution active... [${currentProgress}%]`])
        } else if (currentProgress === 50) {
          setTerminalLog(prev => [...prev, `[ENCRYPT] Transposing bit matrix arrays... [${currentProgress}%]`])
        } else if (currentProgress === 80) {
          setTerminalLog(prev => [...prev, `[ENCRYPT] Injecting custom RSA signature seal... [${currentProgress}%]`])
        }
      }
    }, 100)

    return () => clearInterval(interval)
  }, [isEncrypting, fileContent, fileName])

  // VisionCraft Synthesize Loop
  const handleSynthesize = () => {
    if (!mockPrompt.trim()) return

    playAmbientPad()
    setIsGenerating(true)
    setGenerationProgress(0)
    setGeneratedSvgPrompt(null)
    setGenerationLogs(["Initializing custom SD-GAN model weights..."])

    let progress = 0
    const interval = setInterval(() => {
      progress += 4
      if (progress >= 100) {
        progress = 100
        setIsGenerating(false)
        setGeneratedSvgPrompt(mockPrompt)
        clearInterval(interval)
        playNotification()
        
        setGenerationLogs(prev => [...prev, "Bicubic scaling and vector registration complete.", "Done! Vector graphic registered successfully."])
        
        const timestamp = new Date().toLocaleTimeString()
        setTerminalLog(prev => [
          ...prev,
          `[${timestamp}] [SYNTHESIS] Requested prompt: "${mockPrompt}"`,
          `[${timestamp}] [SYNTHESIS] Computed latent seed: 0x${hashString(mockPrompt).toString(16).toUpperCase()}`,
          `[${timestamp}] [SYNTHESIS] Grid output generated successfully.`
        ])
      } else {
        setGenerationProgress(progress)

        // Inject simulated AI compilation logs
        if (progress === 16) {
          setGenerationLogs(prev => [...prev, "Tokenizing textual query terms...", "Computed structural weights matrix."])
        } else if (progress === 44) {
          setGenerationLogs(prev => [...prev, "Latent denoise iteration: Step 8/25...", "Sampling latent seed vectors..."])
        } else if (progress === 72) {
          setGenerationLogs(prev => [...prev, "Synthesizing vector math pathways...", "Resolving color geometry gradients..."])
        }
      }
    }, 120)
  }

  // Drag and Drop Handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    if (isEncryptX) {
      setIsDragging(true)
    }
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    if (!isEncryptX) return

    const file = e.dataTransfer.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const text = event.target?.result as string || ''
        processFileContent(text, file.name)
      }
      reader.readAsText(file)
    }
  }

  const runCommand = (cmd: string) => {
    const cleanCmd = cmd.trim().toLowerCase()
    if (!cleanCmd) return

    playTick()
    const newLogs = [...terminalLog, `> ${cmd}`]

    if (cleanCmd === 'clear') {
      setTerminalLog([])
      setInputValue('')
      return
    }

    if (cleanCmd === 'help') {
      const commandsList = Object.keys(project.terminalCommands).concat(['clear', 'help']).join(', ')
      newLogs.push(`AVAILABLE COMMANDS: ${commandsList}`)
    } else if (project.terminalCommands[cleanCmd]) {
      newLogs.push(project.terminalCommands[cleanCmd].output)
    } else {
      newLogs.push(`Command not found: "${cmd}". Type "help" for a list of valid options.`)
    }

    setTerminalLog(newLogs)
    setInputValue('')
  }

  // Prevent scroll propagation to main page
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  // Procedural SVG renderer
  const renderProceduralVector = (prompt: string) => {
    const seed = hashString(prompt || "abstract")
    const lowercasePrompt = (prompt || "").toLowerCase()
    
    let primaryColor = "#38bdf8"
    let secondaryColor = "#ec4899"
    let themeType = "cosmic"

    if (lowercasePrompt.includes("neon") || lowercasePrompt.includes("cyberpunk") || lowercasePrompt.includes("synthwave")) {
      primaryColor = "#f43f5e"
      secondaryColor = "#a855f7"
      themeType = "neon"
    } else if (lowercasePrompt.includes("forest") || lowercasePrompt.includes("green") || lowercasePrompt.includes("emerald") || lowercasePrompt.includes("nature")) {
      primaryColor = "#10b981"
      secondaryColor = "#06b6d4"
      themeType = "forest"
    } else if (lowercasePrompt.includes("monolith") || lowercasePrompt.includes("dark") || lowercasePrompt.includes("minimal")) {
      primaryColor = "#f59e0b"
      secondaryColor = "#64748b"
      themeType = "monolith"
    } else if (lowercasePrompt.includes("cobalt") || lowercasePrompt.includes("vortex") || lowercasePrompt.includes("blue") || lowercasePrompt.includes("ocean")) {
      primaryColor = "#3b82f6"
      secondaryColor = "#06b6d4"
      themeType = "cobalt"
    } else {
      const hues = [190, 260, 310, 150, 35]
      const chosenHue = hues[seed % hues.length]
      primaryColor = `hsl(${chosenHue}, 90%, 65%)`
      secondaryColor = `hsl(${(chosenHue + 130) % 360}, 90%, 55%)`
    }

    const points: {x: number; y: number; r: number}[] = []
    for (let i = 0; i < 12; i++) {
      const angle = ((seed + i * 31) % 360) * (Math.PI / 180)
      const distance = 40 + ((seed * (i + 1)) % 90)
      const x = 200 + Math.cos(angle) * distance
      const y = 200 + Math.sin(angle) * distance
      const r = 2.5 + ((seed + i * 11) % 6)
      points.push({ x, y, r })
    }

    return (
      <div className="relative w-full aspect-square rounded-2xl overflow-hidden border border-white/5 bg-zinc-950/40 p-4 flex items-center justify-center">
        <svg viewBox="0 0 400 400" className="w-full h-full max-w-[340px] max-h-[340px] drop-shadow-[0_0_15px_rgba(255,255,255,0.03)]">
          <defs>
            <radialGradient id={`bgGlow-${seed}`} cx="50%" cy="50%" r="70%">
              <stop offset="0%" stopColor={primaryColor} stopOpacity="0.2" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </radialGradient>
            <linearGradient id={`grad-${seed}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={primaryColor} />
              <stop offset="100%" stopColor={secondaryColor} />
            </linearGradient>
            <filter id="glowFilter" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Ambient background glow */}
          <circle cx="200" cy="200" r="170" fill={`url(#bgGlow-${seed})`} />

          {/* High tech grid coordinates */}
          <g opacity="0.08" stroke="white" strokeWidth="0.5">
            <line x1="20" y1="200" x2="380" y2="200" />
            <line x1="200" y1="20" x2="200" y2="380" />
            <circle cx="200" cy="200" r="60" fill="none" />
            <circle cx="200" cy="200" r="120" fill="none" />
            {Array.from({ length: 9 }).map((_, i) => (
              <React.Fragment key={i}>
                <line x1={40 + i * 40} y1="20" x2={40 + i * 40} y2="380" />
                <line x1="20" y1={40 + i * 40} x2="380" y2={40 + i * 40} />
              </React.Fragment>
            ))}
          </g>

          {themeType === "neon" && (
            <g>
              <circle cx="200" cy="200" r="105" fill="none" stroke={`url(#grad-${seed})`} strokeWidth="3" strokeDasharray="120 50" className="animate-spin" style={{ transformOrigin: 'center', animationDuration: '18s' }} />
              <circle cx="200" cy="200" r="75" fill="none" stroke={secondaryColor} strokeWidth="1.5" strokeDasharray="50 15" className="animate-spin" style={{ transformOrigin: 'center', animationDuration: '9s', animationDirection: 'reverse' }} />
              <polygon points="200,110 280,240 120,240" fill="none" stroke={primaryColor} strokeWidth="2.5" opacity="0.7" />
              <polygon points="200,290 280,160 120,160" fill="none" stroke={secondaryColor} strokeWidth="1" opacity="0.5" />
              <circle cx="200" cy="200" r="12" fill={`url(#grad-${seed})`} filter="url(#glowFilter)" className="animate-pulse" />
            </g>
          )}

          {themeType === "forest" && (
            <g>
              {Array.from({ length: 6 }).map((_, i) => {
                const rotateAngle = i * 60 + (seed % 30)
                return (
                  <path
                    key={i}
                    d="M 200,200 C 235,145 255,145 200,75 C 145,145 165,145 200,200"
                    fill="none"
                    stroke={`url(#grad-${seed})`}
                    strokeWidth="2"
                    transform={`rotate(${rotateAngle} 200 200)`}
                    opacity="0.85"
                  />
                )
              })}
              <circle cx="200" cy="200" r="55" fill="none" stroke={primaryColor} strokeWidth="1.25" strokeDasharray="5 5" />
              <circle cx="200" cy="200" r="7" fill={secondaryColor} />
            </g>
          )}

          {themeType === "monolith" && (
            <g>
              <g transform="translate(145, 95)">
                <rect x="20" y="30" width="70" height="150" fill="rgba(0,0,0,0.75)" stroke={`url(#grad-${seed})`} strokeWidth="3" />
                <rect x="30" y="40" width="50" height="130" fill="#09090b" stroke={secondaryColor} strokeWidth="1" />
                <line x1="30" y1="85" x2="80" y2="85" stroke={primaryColor} strokeWidth="1.5" opacity="0.8" />
                <line x1="30" y1="125" x2="80" y2="125" stroke={primaryColor} strokeWidth="1.5" opacity="0.8" />
              </g>
              <ellipse cx="200" cy="200" rx="140" ry="45" fill="none" stroke="white" strokeWidth="0.5" opacity="0.3" transform="rotate(-10 200 200)" />
              <ellipse cx="200" cy="200" rx="140" ry="45" fill="none" stroke="white" strokeWidth="0.5" opacity="0.3" transform="rotate(30 200 200)" />
            </g>
          )}

          {themeType === "cobalt" && (
            <g>
              {Array.from({ length: 6 }).map((_, i) => {
                const r = 50 + i * 22
                return (
                  <circle
                    key={i}
                    cx="200"
                    cy="200"
                    r={r}
                    fill="none"
                    stroke={`url(#grad-${seed})`}
                    strokeWidth="1.25"
                    strokeDasharray={`${r / 2} ${r / 3}`}
                    className="animate-spin"
                    style={{ transformOrigin: 'center', animationDuration: `${10 + i * 2.5}s`, animationDirection: i % 2 === 0 ? 'normal' : 'reverse' }}
                  />
                )
              })}
              <polygon points="200,140 218,180 260,200 218,220 200,260 182,220 140,200 182,180" fill={`url(#grad-${seed})`} opacity="0.95" />
            </g>
          )}

          {themeType === "cosmic" && (
            <g>
              {points.map((p, idx) => (
                <React.Fragment key={idx}>
                  {points.slice(idx + 1, idx + 4).map((other, oidx) => (
                    <line
                      key={oidx}
                      x1={p.x}
                      y1={p.y}
                      x2={other.x}
                      y2={other.y}
                      stroke={`url(#grad-${seed})`}
                      strokeWidth="0.75"
                      opacity="0.4"
                    />
                  ))}
                  <circle cx={p.x} cy={p.y} r={p.r} fill={`url(#grad-${seed})`} className="animate-pulse" style={{ animationDelay: `${idx * 0.1}s` }} />
                  <circle cx={p.x} cy={p.y} r={p.r + 3.5} fill="none" stroke={primaryColor} strokeWidth="0.5" opacity="0.25" />
                </React.Fragment>
              ))}
              <circle cx="200" cy="200" r="115" fill="none" stroke="white" strokeWidth="0.5" strokeDasharray="4 12" opacity="0.15" />
            </g>
          )}

          {/* Prompt banner bottom */}
          <g opacity="0.75">
            <rect x="20" y="340" width="360" height="40" rx="6" fill="#09090b" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
            <text x="32" y="364" fill="#a1a1aa" fontFamily="monospace" fontSize="8.5" letterSpacing="0.5">
              PROMPT: &quot;{prompt.substring(0, 36)}{prompt.length > 36 ? '...' : ''}&quot;
            </text>
          </g>
        </svg>

        {/* Floating badge */}
        <div className="absolute top-4 right-4 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full text-[9px] text-emerald-400 font-mono flex items-center gap-1.5 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          VECTOR RESOLVED
        </div>
      </div>
    )
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="w-full max-w-5xl h-[85vh] bg-zinc-950 border border-white/10 rounded-3xl overflow-hidden flex flex-col md:flex-row relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          onClick={() => { playTick(); onClose(); }}
          className="absolute top-6 right-6 z-20 p-2 rounded-full bg-white/5 hover:bg-white/15 text-gray-400 hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: Technical Data & Specifications */}
        <div className="w-full md:w-1/2 p-6 md:p-10 overflow-y-auto border-r border-white/5 space-y-8 scrollbar-thin">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary" />
              <span className="text-secondary font-mono text-xs uppercase tracking-widest font-extrabold">
                {project.category}
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-medium text-white tracking-tight">
              {project.title}
            </h2>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed font-sans">
              {project.longDescription}
            </p>
          </div>

          {/* Key Engineering Metrics */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-widest text-primary font-mono font-bold flex items-center gap-2">
              <Activity className="w-4 h-4 text-primary" /> Key Performance Metrics
            </h4>
            <div className="grid grid-cols-1 gap-4">
              {project.metrics.map((metric) => (
                <div key={metric.label} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-400 font-sans">{metric.label}</span>
                    <span className="text-white font-mono font-bold">{metric.value}</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${metric.percent}%` }}
                      transition={{ duration: 1, delay: 0.3 }}
                      className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* System Architecture Workflow */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-widest text-primary font-mono font-bold flex items-center gap-2">
              <Layers className="w-4 h-4 text-primary" /> System Flow Architecture
            </h4>
            <div className="relative border-l border-white/10 pl-4 ml-2 space-y-4">
              {project.architecture.map((step, sIdx) => (
                <div key={sIdx} className="relative">
                  <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-primary border-2 border-zinc-950" />
                  <p className="text-xs text-gray-400 font-mono">STEP 0{sIdx + 1}</p>
                  <p className="text-sm text-gray-300 font-sans">{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Breakthroughs */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-widest text-primary font-mono font-bold flex items-center gap-2">
              <Award className="w-4 h-4 text-primary" /> Technical Core Achievements
            </h4>
            <ul className="space-y-3">
              {project.achievements.map((achievement, aIdx) => (
                <li key={aIdx} className="flex gap-3 text-sm text-gray-300 font-sans">
                  <CheckCircle2 className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                  <span>{achievement}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Call to Actions */}
          <div className="flex flex-wrap gap-4 pt-4">
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playAmbientPad()}
              className="flex items-center gap-2 px-6 py-3.5 rounded-full bg-white text-black font-mono text-xs uppercase tracking-widest font-bold transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.35)] hover:bg-white/95"
            >
              Launch Platform <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3.5 rounded-full bg-transparent text-primary hover:text-black hover:bg-primary transition-all duration-300 border border-primary/40 font-mono text-xs uppercase tracking-widest font-bold"
            >
              <Github className="w-3.5 h-3.5" /> Inspect Code
            </a>
          </div>
        </div>

        {/* Right Side: Interactive Shell Console / Playground Bento */}
        <div 
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className="w-full md:w-1/2 p-6 md:p-10 bg-black flex flex-col justify-between h-full relative overflow-y-auto scrollbar-thin"
        >
          {/* Header & Tab Selector for top tier projects */}
          <div className="space-y-4 pb-4 border-b border-white/5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-primary" />
                <span className="text-gray-400 font-mono text-xs">DYNAMIC INTEGRATION HUB</span>
              </div>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
              </span>
            </div>

            {isTopTier && (
              <div className="flex gap-2 p-1 bg-white/[0.03] border border-white/5 rounded-xl">
                <button
                  onClick={() => { playTick(); setActiveTab('playground'); }}
                  className={`flex-1 py-2 px-3 rounded-lg text-xs font-mono uppercase tracking-wider font-bold transition-all ${
                    activeTab === 'playground'
                      ? 'bg-primary text-black shadow-[0_0_15px_rgba(255,255,255,0.15)]'
                      : 'text-gray-400 hover:text-white hover:bg-white/[0.02]'
                  }`}
                >
                  Playground Bento
                </button>
                <button
                  onClick={() => { playTick(); setActiveTab('terminal'); }}
                  className={`flex-1 py-2 px-3 rounded-lg text-xs font-mono uppercase tracking-wider font-bold transition-all ${
                    activeTab === 'terminal'
                      ? 'bg-primary text-black shadow-[0_0_15px_rgba(255,255,255,0.15)]'
                      : 'text-gray-400 hover:text-white hover:bg-white/[0.02]'
                  }`}
                >
                  Terminal Shell
                </button>
              </div>
            )}
          </div>

          {/* Tab Content */}
          <div className="flex-grow my-4 flex flex-col justify-between relative min-h-[350px]">
            {activeTab === 'terminal' ? (
              <>
                {/* Drag and Drop Overlay for Terminal drop */}
                {isDragging && isEncryptX && (
                  <div className="absolute inset-0 bg-primary/10 border-2 border-dashed border-primary rounded-2xl flex flex-col items-center justify-center gap-3 backdrop-blur-sm z-30 pointer-events-none animate-pulse">
                    <Upload className="w-10 h-10 text-primary" />
                    <p className="text-sm font-mono text-white tracking-widest text-center px-4">
                      DROP TEXT FILE TO COMMENCE ENCRYPTION
                    </p>
                  </div>
                )}

                {/* Shell Logs Output */}
                <div className="flex-grow overflow-y-auto max-h-[300px] md:max-h-[350px] font-mono text-xs text-green-400/90 leading-relaxed space-y-3 scrollbar-thin scrollbar-track-transparent">
                  {terminalLog.map((log, lIdx) => (
                    <div key={lIdx} className="whitespace-pre-line font-mono break-all">
                      {log}
                    </div>
                  ))}
                  <div ref={terminalBottomRef} />
                </div>

                {/* Quick actions & Input area */}
                <div className="space-y-4 pt-4 border-t border-white/5">
                  <div className="flex flex-wrap gap-2 items-center">
                    <span className="text-[10px] text-gray-500 uppercase font-mono tracking-wider">Quick actions:</span>
                    {Object.keys(project.terminalCommands).map((cmd) => (
                      <button
                        key={cmd}
                        onClick={() => runCommand(cmd)}
                        className="px-2.5 py-1 rounded bg-white/[0.03] border border-white/5 hover:border-primary/40 text-[11px] text-gray-300 hover:text-primary font-mono transition-all"
                      >
                        {cmd}
                      </button>
                    ))}
                    <button
                      onClick={() => runCommand('clear')}
                      className="px-2.5 py-1 rounded bg-white/[0.03] border border-white/5 hover:border-rose-500/40 text-[11px] text-gray-300 hover:text-rose-400 font-mono transition-all"
                    >
                      clear
                    </button>
                  </div>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault()
                      runCommand(inputValue)
                    }}
                    className="flex items-center gap-2 bg-white/[0.03] border border-white/10 rounded-xl p-3 focus-within:border-primary/50 transition-colors"
                  >
                    <span className="text-primary font-mono text-xs font-bold">$</span>
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Type help or another action command..."
                      className="bg-transparent border-none outline-none flex-grow text-white font-mono text-xs placeholder:text-gray-600 focus:ring-0"
                    />
                    <button
                      type="submit"
                      className="p-1 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 hover:text-white transition-all"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                    </button>
                  </form>
                </div>
              </>
            ) : (
              /* Playground Bento View */
              <div className="flex-grow flex flex-col justify-between h-full space-y-6">
                
                {/* 1. VisionCraft.AI Playground */}
                {isVisionCraft && (
                  <div className="space-y-4 flex flex-col justify-between h-full">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Cpu className="w-4 h-4 text-primary animate-pulse" />
                        <h4 className="text-xs uppercase tracking-widest text-primary font-mono font-bold">
                          Procedural Art Synthesizer
                        </h4>
                      </div>
                      <p className="text-xs text-gray-400 font-sans">
                        Type an abstract prompt below to feed high-dimensional Latent GAN grids. The generator computes custom seed hashes to structure dynamic SVG layouts.
                      </p>
                    </div>

                    {/* Main Art Showcase Area */}
                    <div className="flex-grow flex items-center justify-center p-2">
                      {isGenerating ? (
                        <div className="w-full aspect-square max-w-[340px] rounded-2xl border border-white/5 bg-zinc-950/50 flex flex-col items-center justify-center p-6 space-y-4 shadow-inner">
                          <RefreshCw className="w-10 h-10 text-primary animate-spin" />
                          <div className="w-full max-w-[200px] h-1.5 bg-white/5 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-primary rounded-full transition-all duration-100" 
                              style={{ width: `${generationProgress}%` }}
                            />
                          </div>
                          <span className="text-xs font-mono text-white">{generationProgress}%</span>
                          <div className="w-full h-16 overflow-y-auto font-mono text-[9px] text-gray-400 space-y-1 scrollbar-none text-center">
                            {generationLogs.map((log, idx) => (
                              <div key={idx} className="animate-fade-in">{log}</div>
                            ))}
                          </div>
                        </div>
                      ) : generatedSvgPrompt ? (
                        renderProceduralVector(generatedSvgPrompt)
                      ) : (
                        <div className="w-full aspect-square max-w-[340px] rounded-2xl border border-dashed border-white/10 bg-zinc-950/20 flex flex-col items-center justify-center p-8 text-center space-y-3">
                          <Cpu className="w-8 h-8 text-gray-500" />
                          <span className="text-xs font-mono text-gray-400 tracking-wide uppercase">
                            Workspace Empty
                          </span>
                          <p className="text-[11px] text-gray-500 max-w-[240px]">
                            Input a mock visual prompt below to compile custom procedural vector graphics in real time.
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Inputs & Quick Prompt Options */}
                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-1.5 items-center">
                        <span className="text-[9px] text-gray-500 uppercase font-mono tracking-wider mr-1">Inspirations:</span>
                        {[
                          "neon cyberpunk monolith",
                          "emerald forest vortex",
                          "cobalt orbit paths",
                          "abstract geometry constellation"
                        ].map((prompt) => (
                          <button
                            key={prompt}
                            onClick={() => { playTick(); setMockPrompt(prompt); }}
                            className="px-2 py-0.5 rounded-md bg-white/[0.02] border border-white/5 hover:border-primary/40 text-[10px] text-gray-400 hover:text-primary font-mono transition-all"
                          >
                            {prompt}
                          </button>
                        ))}
                      </div>

                      <div className="flex items-center gap-2 bg-white/[0.03] border border-white/10 rounded-xl p-3 focus-within:border-primary/50 transition-colors">
                        <input
                          type="text"
                          value={mockPrompt}
                          onChange={(e) => setMockPrompt(e.target.value)}
                          placeholder="Type artwork seed (e.g. Neon Cyberpunk Helix)..."
                          className="bg-transparent border-none outline-none flex-grow text-white font-mono text-xs placeholder:text-gray-600 focus:ring-0"
                          disabled={isGenerating}
                        />
                        <button
                          onClick={handleSynthesize}
                          disabled={isGenerating || !mockPrompt.trim()}
                          className="px-4 py-1.5 rounded-lg bg-primary text-black font-mono text-xs font-bold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                          Synthesize
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. EncryptX Playground */}
                {isEncryptX && (
                  <div className="space-y-4 flex flex-col justify-between h-full">
                    {/* File Drop & Drag Overlay */}
                    {isDragging && (
                      <div className="absolute inset-0 bg-primary/15 border-2 border-dashed border-primary rounded-3xl flex flex-col items-center justify-center gap-3 backdrop-blur-sm z-30 pointer-events-none animate-pulse">
                        <Upload className="w-12 h-12 text-primary" />
                        <p className="text-sm font-mono text-white tracking-widest text-center px-4">
                          RELEASE TO INJECT FILE STREAM
                        </p>
                      </div>
                    )}

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4 text-primary animate-pulse" />
                        <h4 className="text-xs uppercase tracking-widest text-primary font-mono font-bold">
                          AES-256 Binary Stream Pipeline
                        </h4>
                      </div>
                      <p className="text-xs text-gray-400 font-sans">
                        Drag and drop any small text file (.txt) directly onto this container, upload via click, or use our pre-configured buffer simulator to inspect active hardware-accelerated streams.
                      </p>
                    </div>

                    {/* Upload / Simulation Container */}
                    {!fileContent ? (
                      <div 
                        onClick={() => {
                          const input = document.getElementById('file-upload-input');
                          if (input) input.click();
                        }}
                        className="flex-grow flex flex-col items-center justify-center p-8 border border-dashed border-white/10 hover:border-primary/40 rounded-2xl bg-zinc-950/20 hover:bg-zinc-950/40 cursor-pointer transition-all text-center space-y-4"
                      >
                        <input 
                          type="file" 
                          id="file-upload-input" 
                          className="hidden" 
                          accept=".txt"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onload = (event) => {
                                const text = event.target?.result as string || '';
                                processFileContent(text, file.name);
                              };
                              reader.readAsText(file);
                            }
                          }}
                        />
                        <Upload className="w-8 h-8 text-gray-500 animate-bounce" />
                        <div>
                          <span className="text-xs font-mono text-gray-300 tracking-wide block uppercase">
                            DRAG &amp; DROP TXT FILE HERE
                          </span>
                          <span className="text-[10px] text-gray-500 block mt-1">
                            Or click to upload from local disk
                          </span>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            processFileContent(
                              "SECURE_DB_CREDS=9f823ab1cd0e\nAPI_GATEWAY_TOKEN=0x7e8b2a5c9f1d43\nADMIN_PASSPHRASE=bulletproof_crypto_key", 
                              "database_secrets.txt"
                            );
                          }}
                          className="px-3 py-1.5 rounded bg-white/5 border border-white/10 hover:border-primary/40 text-[10px] text-gray-400 hover:text-primary font-mono transition-all"
                        >
                          Simulate Sample Text File
                        </button>
                      </div>
                    ) : (
                      /* Active Binary Pipeline Stream Visuals */
                      <div className="flex-grow flex flex-col justify-between space-y-4">
                        <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2">
                            <FileText className="w-3.5 h-3.5 text-primary" />
                            <span className="text-white font-mono">{fileName}</span>
                          </div>
                          <span className="text-gray-500 font-mono text-[10px]">{fileSize} bytes</span>
                        </div>

                        {/* Interactive Node Path */}
                        <div className="grid grid-cols-4 gap-1.5 py-1">
                          {[
                            { name: "SubBytes", step: "0-25%", desc: "Substitute state" },
                            { name: "ShiftRows", step: "25-50%", desc: "Left-shift arrays" },
                            { name: "MixColumns", step: "50-75%", desc: "Linear mix" },
                            { name: "AddRoundKey", step: "75-100%", desc: "XOR cipher key" }
                          ].map((node, nIdx) => {
                            const isNodeActive = isEncrypting && (
                              (nIdx === 0 && encryptionProgress <= 25) ||
                              (nIdx === 1 && encryptionProgress > 25 && encryptionProgress <= 50) ||
                              (nIdx === 2 && encryptionProgress > 50 && encryptionProgress <= 75) ||
                              (nIdx === 3 && encryptionProgress > 75)
                            )
                            const isNodePassed = encryptionProgress > (nIdx + 1) * 25 || !isEncrypting
                            return (
                              <div 
                                key={node.name}
                                className={`p-2 rounded-lg border text-center transition-all ${
                                  isNodeActive 
                                    ? 'bg-primary/10 border-primary shadow-[0_0_12px_rgba(var(--primary-rgb),0.25)]' 
                                    : isNodePassed && !isEncrypting
                                      ? 'bg-emerald-500/5 border-emerald-500/20'
                                      : 'bg-white/[0.01] border-white/5'
                                }`}
                              >
                                <div className={`text-[10px] font-mono font-bold uppercase ${isNodeActive ? 'text-primary' : isNodePassed && !isEncrypting ? 'text-emerald-400' : 'text-gray-500'}`}>
                                  {node.name}
                                </div>
                                <div className="text-[8px] text-gray-600 font-mono mt-0.5">{node.desc}</div>
                              </div>
                            )
                          })}
                        </div>

                        {/* Binary Matrix Streaming Grid */}
                        <div className="relative h-20 overflow-hidden rounded-xl border border-white/5 bg-zinc-950/40 p-2 font-mono text-[9px] text-green-500/70 select-none">
                          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-zinc-950/10 to-zinc-950/90 pointer-events-none z-10" />
                          <div className="space-y-0.5 animate-pulse">
                            {binaryStreams.map((row, rIdx) => (
                              <div key={rIdx} className="text-center font-mono tracking-widest leading-none break-all opacity-75">
                                {row}
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Scrambled Ciphertext output or loading block */}
                        <div className="p-4 rounded-xl border border-white/5 bg-zinc-950/50 space-y-2">
                          <div className="flex justify-between items-center text-[10px] font-mono">
                            <span className="text-gray-400 uppercase tracking-wider">CRYPTOGRAPHIC BUFFER</span>
                            <span className="text-primary font-bold">{isEncrypting ? `${encryptionProgress}% SCRAMBLING` : "LOCKED"}</span>
                          </div>

                          {isEncrypting ? (
                            <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-primary rounded-full transition-all duration-100" 
                                style={{ width: `${encryptionProgress}%` }}
                              />
                            </div>
                          ) : (
                            <div className="space-y-3">
                              <div className="p-2.5 rounded bg-black border border-white/5 text-[10.5px] font-mono text-zinc-300 break-all select-all flex justify-between items-center">
                                <span className="font-mono text-gray-300">
                                  {isDecrypted ? fileContent?.substring(0, 42) + (fileContent && fileContent.length > 42 ? "..." : "") : cipherText}
                                </span>
                                {isDecrypted ? (
                                  <span className="text-[8px] uppercase tracking-wider font-bold bg-gray-500/10 text-gray-400 px-1.5 py-0.5 rounded">
                                    PLAINTEXT
                                  </span>
                                ) : (
                                  <span className="text-[8px] uppercase tracking-wider font-bold bg-primary/10 text-primary px-1.5 py-0.5 rounded animate-pulse">
                                    ENCRYPTED
                                  </span>
                                )}
                              </div>

                              <div className="flex gap-2">
                                <button
                                  onClick={() => {
                                    playTick()
                                    setIsDecrypted(!isDecrypted)
                                    playNotification()
                                  }}
                                  className="flex-1 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[11px] font-mono text-white border border-white/10 transition-all flex items-center justify-center gap-1.5"
                                >
                                  {isDecrypted ? (
                                    <>
                                      <Lock className="w-3 h-3" /> Encrypt Stream
                                    </>
                                  ) : (
                                    <>
                                      <Shield className="w-3 h-3" /> Decrypt Payload
                                    </>
                                  )}
                                </button>

                                <button
                                  onClick={() => {
                                    playTick()
                                    setFileContent(null)
                                    setCipherText('')
                                    setFileName('')
                                  }}
                                  className="py-1.5 px-3 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-[11px] font-mono text-rose-400 border border-rose-500/20 transition-all"
                                >
                                  Clear
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  return (
    <section id="work" className="relative w-full min-h-[auto] md:min-h-screen flex flex-col items-center py-20 md:py-32 lg:py-48 px-4 sm:px-6">
      <div className="max-w-6xl w-full text-center mb-16 md:mb-20 space-y-4">
        {/* Section Indicator */}
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary font-medium">
          [ 03 // COGNITIVE WORKS ]
        </span>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl lg:text-6xl font-display font-medium text-white tracking-tight"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-400 via-zinc-200 to-white">
            ENGINEERING
          </span>{" "}
          <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
            PORTFOLIO
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          viewport={{ once: true }}
          className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto font-sans leading-relaxed"
        >
          From autonomous agents to cryptographic toolkits—pushing the boundaries of what is possible with software.
        </motion.p>
      </div>

      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
        {PROJECTS.map((project, idx) => (
          <ProjectCard 
            key={project.title} 
            project={project} 
            idx={idx} 
            onOpen={(p) => {
              playAmbientPad()
              setSelectedProject(p)
            }}
          />
        ))}
      </div>

      {/* High-Fidelity Specifications Slide-In Panel / Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectDetailsModal 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
        )}
      </AnimatePresence>
    </section>
  )
}
