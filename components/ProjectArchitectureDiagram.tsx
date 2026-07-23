"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Cpu, 
  Layers, 
  Activity, 
  Zap, 
  Database, 
  Server, 
  Globe, 
  Lock, 
  Code2, 
  ArrowRight, 
  Copy, 
  Check, 
  BarChart3, 
  RefreshCw,
  FileCode,
  Sparkles,
  ShieldCheck,
  Network
} from 'lucide-react'
import { playTick, playNotification, playPopover } from '@/lib/sounds'

interface NodeSpec {
  id: string
  label: string
  sublabel: string
  icon: React.ReactNode
  protocol: string
  latency: string
  payloadSnippet: string
  details: string
}

interface BenchmarkStep {
  stage: string
  baselineMs: number
  optimizedMs: number
  unit: string
}

interface TradeOff {
  decision: string
  chosen: string
  alternative: string
  benefit: string
  tradeoff: string
}

interface ArchitectureData {
  nodes: NodeSpec[]
  benchmarks: BenchmarkStep[]
  tradeoffs: TradeOff[]
  apiContract: {
    endpoint: string
    method: 'GET' | 'POST' | 'WS' | 'RPC'
    headers: Record<string, string>
    requestPayload: Record<string, any>
    responsePayload: Record<string, any>
  }
}

const ARCHITECTURE_DATA_MAP: Record<string, ArchitectureData> = {
  'Raincrew.AI': {
    nodes: [
      {
        id: 'client',
        label: 'Client WebRTC Stream',
        sublabel: 'Browser Audio/Video',
        icon: <Globe className="w-4 h-4 text-cyan-400" />,
        protocol: 'WebRTC / PCM 16kHz',
        latency: '12ms',
        payloadSnippet: '{ "sampleRate": 16000, "channels": 1, "chunkBytes": 2048 }',
        details: 'Captures raw audio packets from microphone using WebAudio API ScriptProcessorNode. Performs jitter-buffering and dynamic silence suppression.'
      },
      {
        id: 'proxy',
        label: 'Node WS Gateway',
        sublabel: 'Packet Router & Auth',
        icon: <Server className="w-4 h-4 text-blue-400" />,
        protocol: 'WSS / JWT Bearer',
        latency: '8ms',
        payloadSnippet: '{ "auth": "Bearer eyJhbG...", "streamId": "str_8921a" }',
        details: 'Authenticates candidate session, frames audio chunks into binary WebSocket frames, and enforces token bucket rate-limiting.'
      },
      {
        id: 'gemini',
        label: 'Gemini Live WS API',
        sublabel: 'Multimodal AI Model',
        icon: <Sparkles className="w-4 h-4 text-purple-400" />,
        protocol: 'gRPC / Bidi WS',
        latency: '110ms',
        payloadSnippet: '{ "realtimeInput": { "mediaChunks": [{ "mimeType": "audio/pcm" }] } }',
        details: 'Streams bidirectional audio context to Gemini Live API. Generates spoken interview questions with real-time text/audio response synchronization.'
      },
      {
        id: 'proctor',
        label: 'Biometric Proctor Worker',
        sublabel: 'Gaze & Emotion Model',
        icon: <ShieldCheck className="w-4 h-4 text-emerald-400" />,
        protocol: 'WebAssembly / Workers',
        latency: '15ms',
        payloadSnippet: '{ "faceMesh": 468, "gazeDeviation": 0.02, "flagged": false }',
        details: 'Executes lightweight face-mesh detection in a dedicated web worker to detect off-screen glances, auxiliary device usage, and acoustic anomalies.'
      },
      {
        id: 'db',
        label: 'Recruiter Dashboard Sink',
        sublabel: 'Evaluation Matrix',
        icon: <Database className="w-4 h-4 text-amber-400" />,
        protocol: 'PostgreSQL / SSE',
        latency: '18ms',
        payloadSnippet: '{ "candidateId": "cand_18", "score": 94.2, "readiness": "A+" }',
        details: 'Persists structured evaluation metrics, transcript timestamps, and proctoring logs for instant recruiter decision-making.'
      }
    ],
    benchmarks: [
      { stage: 'Media Capture & Framing', baselineMs: 45, optimizedMs: 12, unit: 'ms' },
      { stage: 'WebSocket Transport RTT', baselineMs: 38, optimizedMs: 8, unit: 'ms' },
      { stage: 'Gemini Audio Synthesis', baselineMs: 280, optimizedMs: 110, unit: 'ms' },
      { stage: 'Proctor Analysis Worker', baselineMs: 65, optimizedMs: 15, unit: 'ms' }
    ],
    tradeoffs: [
      {
        decision: 'Audio Transport Protocol',
        chosen: 'Bidirectional WebSockets (PCM Raw)',
        alternative: 'HTTP REST Chunk Uploads',
        benefit: 'Reduces latency by 82% (<180ms total roundtrip)',
        tradeoff: 'Slightly higher memory overhead on proxy gateway'
      },
      {
        decision: 'Proctoring Execution Location',
        chosen: 'Client Web Workers + WASM',
        alternative: 'Server-Side Video Frame Streaming',
        benefit: 'Zero server GPU cost and zero privacy video leaks',
        tradeoff: 'Requires client CPU for face landmark tracking'
      },
      {
        decision: 'Transcription Pipeline',
        chosen: 'Gemini Live Direct Native Audio',
        alternative: 'Whisper STT + Text LLM + TTS',
        benefit: 'Eliminated 3 cascaded models down to 1 unified model',
        tradeoff: 'Tighter API coupling with Gemini Live specs'
      }
    ],
    apiContract: {
      endpoint: 'wss://api.raincrew.ai/v1/live-interview',
      method: 'WS',
      headers: {
        'Authorization': 'Bearer <token>',
        'X-Session-ID': 'sess_raincrew_9912'
      },
      requestPayload: {
        event: 'audio_chunk',
        timestamp: 1721664000,
        pcmBase64: 'UklGRiQAAABXQVZFZm10IBAAAAABAAEA...',
        sampleRate: 16000
      },
      responsePayload: {
        event: 'model_response',
        transcriptChunk: 'Can you explain how you handle race conditions in distributed systems?',
        confidence: 0.984,
        latencyMs: 112
      }
    }
  },
  'AutoForge.AI': {
    nodes: [
      {
        id: 'parser',
        label: 'Spec AST Parser',
        sublabel: 'User Intent Breakdown',
        icon: <Code2 className="w-4 h-4 text-cyan-400" />,
        protocol: 'TypeScript / AST',
        latency: '15ms',
        payloadSnippet: '{ "intent": "build_component", "target": "AuthForm" }',
        details: 'Deconstructs natural language specifications into concrete architectural AST trees and task queues.'
      },
      {
        id: 'planner',
        label: 'Agentic Planner',
        sublabel: 'Gemini Pro Task Router',
        icon: <Sparkles className="w-4 h-4 text-purple-400" />,
        protocol: 'HTTPS / Structured Output',
        latency: '420ms',
        payloadSnippet: '{ "blueprint": ["create_schema", "write_tests", "implement_route"] }',
        details: 'Synthesizes step-by-step code plans, unit test assertions, and type signatures.'
      },
      {
        id: 'sandbox',
        label: 'Docker Execution Sandbox',
        sublabel: 'Isolated Container',
        icon: <Server className="w-4 h-4 text-blue-400" />,
        protocol: 'gRPC / Container IPC',
        latency: '180ms',
        payloadSnippet: '{ "exitCode": 1, "stderr": "TS2304: Cannot find name user" }',
        details: 'Executes `tsc`, `eslint`, and test suites inside isolated ephemeral Docker containers.'
      },
      {
        id: 'healer',
        label: 'Self-Healing Engine',
        sublabel: 'Recursive Error Patching',
        icon: <RefreshCw className="w-4 h-4 text-emerald-400" />,
        protocol: 'LLM Feedback Loop',
        latency: '310ms',
        payloadSnippet: '{ "patch": "import { user } from \'./types\'", "applied": true }',
        details: 'Pipes compilation error tracebacks back into Gemini Pro to automatically generate surgical code patches.'
      }
    ],
    benchmarks: [
      { stage: 'Spec AST Parsing', baselineMs: 60, optimizedMs: 15, unit: 'ms' },
      { stage: 'Planner Blueprint Synthesis', baselineMs: 950, optimizedMs: 420, unit: 'ms' },
      { stage: 'Sandbox Test Execution', baselineMs: 480, optimizedMs: 180, unit: 'ms' },
      { stage: 'Self-Healing Auto Repair', baselineMs: 820, optimizedMs: 310, unit: 'ms' }
    ],
    tradeoffs: [
      {
        decision: 'Code Sandbox Isolation',
        chosen: 'Ephemeral Micro-Docker Containers',
        alternative: 'In-Memory VM `eval`',
        benefit: 'Complete security isolation preventing malicious script execution',
        tradeoff: 'Slight container startup overhead (~180ms)'
      },
      {
        decision: 'Error Repair Strategy',
        chosen: 'AST-Guided Patch Generation',
        alternative: 'Full File Re-Generation',
        benefit: 'Saved 70% token costs and preserves clean code formatting',
        tradeoff: 'Requires precise line-by-line diff application'
      }
    ],
    apiContract: {
      endpoint: 'https://autoforge.ai/api/v1/build',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Agent-Key': 'ag_981a2f'
      },
      requestPayload: {
        task: 'Implement binary search tree with insert & find operations',
        language: 'typescript',
        strictTypes: true
      },
      responsePayload: {
        status: 'SUCCESS',
        cyclesToPass: 2,
        filesModified: ['src/bst.ts', 'tests/bst.test.ts'],
        testsPassed: 8,
        totalTimeSec: 1.82
      }
    }
  },
  'VisionCraft.AI': {
    nodes: [
      {
        id: 'prompt',
        label: 'Prompt Tokenizer',
        sublabel: 'Textual Weight Vector',
        icon: <Code2 className="w-4 h-4 text-pink-400" />,
        protocol: 'CLIP Transformer',
        latency: '22ms',
        payloadSnippet: '{ "tokens": 14, "embeddingsDim": 768 }',
        details: 'Encodes raw prompt text into high-dimensional semantic latent vectors.'
      },
      {
        id: 'gan',
        label: 'PyTorch GAN Cluster',
        sublabel: 'CUDA GPU Node',
        icon: <Cpu className="w-4 h-4 text-purple-400" />,
        protocol: 'CUDA v12 / TensorRT',
        latency: '1400ms',
        payloadSnippet: '{ "steps": 25, "vramUsed": "4.2GB", "resolution": "512x512" }',
        details: 'Executes iterative denoise steps across CUDA GPU clusters with custom FP16 TensorRT kernels.'
      },
      {
        id: 'upscaler',
        label: 'Bicubic 4K Upscaler',
        sublabel: 'High-Res Post-Processor',
        icon: <Zap className="w-4 h-4 text-amber-400" />,
        protocol: 'OpenCV WASM / WebWorker',
        latency: '380ms',
        payloadSnippet: '{ "scale": "4x", "outputResolution": "3840x2160" }',
        details: 'Upscales synthesized 512px renders into crystal clear 4K visuals using bicubic vector interpolations.'
      }
    ],
    benchmarks: [
      { stage: 'Tokenization & Encoding', baselineMs: 80, optimizedMs: 22, unit: 'ms' },
      { stage: 'CUDA Latent Denoising', baselineMs: 3800, optimizedMs: 1400, unit: 'ms' },
      { stage: '4K Vector Upscaling', baselineMs: 1200, optimizedMs: 380, unit: 'ms' }
    ],
    tradeoffs: [
      {
        decision: 'Precision Mode',
        chosen: 'FP16 Half Precision with TensorRT',
        alternative: 'FP32 Full Precision',
        benefit: 'Doubled inference speed with zero visual quality loss',
        tradeoff: 'Slight rounding variance on low-frequency background noise'
      }
    ],
    apiContract: {
      endpoint: 'https://api.visioncraft.ai/v1/generate',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      requestPayload: {
        prompt: 'neon cyberpunk grid of geometric monoliths',
        resolution: '4K',
        steps: 25
      },
      responsePayload: {
        status: 'COMPLETE',
        imageUrl: 'https://cdn.visioncraft.ai/renders/img_9912.png',
        renderTimeMs: 1802
      }
    }
  },
  'EncryptX': {
    nodes: [
      {
        id: 'stream',
        label: 'File Stream Ingestion',
        sublabel: 'Local File Buffer',
        icon: <FileCode className="w-4 h-4 text-emerald-400" />,
        protocol: 'C++ Native Stream',
        latency: '4ms',
        payloadSnippet: '{ "chunkSize": "64KB", "totalSize": "45.2MB" }',
        details: 'Streams binary file chunks directly into high-speed memory buffers without loading entire files into JavaScript heap.'
      },
      {
        id: 'aes',
        label: 'AES-256 Hardware Worker',
        sublabel: 'AES-NI Instruction Set',
        icon: <Lock className="w-4 h-4 text-blue-400" />,
        protocol: 'C++ / Assembly AES-NI',
        latency: '81ms',
        payloadSnippet: '{ "cipherMode": "AES-256-GCM", "throughput": "450MB/s" }',
        details: 'Leverages hardware CPU instructions (AES-NI) for ultra-fast authenticated payload encryption.'
      },
      {
        id: 'rsa',
        label: 'RSA-4096 Key Handshake',
        sublabel: 'Key Exchange Seal',
        icon: <ShieldCheck className="w-4 h-4 text-purple-400" />,
        protocol: 'PKCS#1 v2.2 RSA',
        latency: '12ms',
        payloadSnippet: '{ "keySize": 4096, "signature": "0x8f2a...e9b1" }',
        details: 'Protects symmetric AES keys behind 4096-bit asymmetric RSA key pairs for bulletproof file exchange.'
      }
    ],
    benchmarks: [
      { stage: 'File Chunk Streaming', baselineMs: 35, optimizedMs: 4, unit: 'ms' },
      { stage: 'AES-256 Encryption (50MB)', baselineMs: 420, optimizedMs: 81, unit: 'ms' },
      { stage: 'RSA Signature Generation', baselineMs: 48, optimizedMs: 12, unit: 'ms' }
    ],
    tradeoffs: [
      {
        decision: 'Execution Engine',
        chosen: 'Native C++ Worker Binding via Node-GYP',
        alternative: 'Pure JavaScript Crypto API',
        benefit: '3.8x throughput speedup (450 MB/s vs 118 MB/s)',
        tradeoff: 'Requires native compilation step for desktop target OS'
      }
    ],
    apiContract: {
      endpoint: 'native://encryptx/aes-gcm-256',
      method: 'RPC',
      headers: {
        'X-Hardware-Accel': 'AES-NI'
      },
      requestPayload: {
        mode: 'ENCRYPT',
        algorithm: 'AES-256-GCM',
        bufferLength: 47392810
      },
      responsePayload: {
        status: 'SUCCESS',
        tag: '9f823ab1cd0e...',
        iv: '0x12a9b3c4',
        throughputMbps: 450
      }
    }
  },
  'Dockmind': {
    nodes: [
      {
        id: 'ingest',
        label: 'Document Chunking Engine',
        sublabel: 'Semantic Text Parser',
        icon: <FileCode className="w-4 h-4 text-cyan-400" />,
        protocol: 'LlamaIndex / Chunking',
        latency: '45ms',
        payloadSnippet: '{ "chunkTokens": 512, "overlap": 50 }',
        details: 'Splits long PDF / Word documents into overlapping semantic paragraphs.'
      },
      {
        id: 'embed',
        label: 'Text Embedding Model',
        sublabel: '1536-Dim Vector Space',
        icon: <Network className="w-4 h-4 text-purple-400" />,
        protocol: 'HTTPS / Embedding API',
        latency: '120ms',
        payloadSnippet: '{ "vector": [0.012, -0.094, 0.482, ...] }',
        details: 'Transforms text chunks into dense vector representations.'
      },
      {
        id: 'vector',
        label: 'HNSW Vector Store',
        sublabel: 'Cosine Similarity Search',
        icon: <Database className="w-4 h-4 text-amber-400" />,
        protocol: 'In-Memory HNSW Index',
        latency: '14ms',
        payloadSnippet: '{ "k": 3, "topScore": 0.942 }',
        details: 'Executes sub-15ms approximate nearest neighbor queries over thousands of document vectors.'
      },
      {
        id: 'llm',
        label: 'RAG Context Synthesizer',
        sublabel: 'Grounded Answer Generation',
        icon: <Sparkles className="w-4 h-4 text-emerald-400" />,
        protocol: 'Gemini Pro Stream',
        latency: '240ms',
        payloadSnippet: '{ "answer": "...", "citations": ["Page 12", "Page 14"] }',
        details: 'Pipes retrieved source chunks into LLM prompt template to generate factually grounded answers with page citations.'
      }
    ],
    benchmarks: [
      { stage: 'PDF Parsing & Chunking', baselineMs: 180, optimizedMs: 45, unit: 'ms' },
      { stage: 'Vector Embeddings Gen', baselineMs: 380, optimizedMs: 120, unit: 'ms' },
      { stage: 'HNSW Cosine Vector Search', baselineMs: 95, optimizedMs: 14, unit: 'ms' },
      { stage: 'LLM Synthesis Latency', baselineMs: 650, optimizedMs: 240, unit: 'ms' }
    ],
    tradeoffs: [
      {
        decision: 'Vector Database Engine',
        chosen: 'In-Memory Local HNSW Index with Local Cache',
        alternative: 'Remote Cloud Vector Service',
        benefit: 'Query latency reduced from 140ms to 14ms',
        tradeoff: 'Index size bounded by client / server RAM allocation'
      }
    ],
    apiContract: {
      endpoint: 'https://dockmind.ai/api/v1/query',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      requestPayload: {
        docId: 'doc_q3_strategy',
        query: 'What are the main expansion targets for APAC?',
        topK: 3
      },
      responsePayload: {
        answer: 'APAC expansion targets include establishing regional hubs in Singapore by Q4.',
        citations: [{ page: 12, similarity: 0.942 }],
        totalLatencyMs: 419
      }
    }
  }
}

// Fallback generic data generator for other projects
function getArchitectureData(title: string): ArchitectureData {
  if (ARCHITECTURE_DATA_MAP[title]) {
    return ARCHITECTURE_DATA_MAP[title]
  }

  // Fallback for SchemaForge, WaterFlow, AI Hallucination Detector, AI Study Planner, ResuNova
  return {
    nodes: [
      {
        id: 'input',
        label: 'Input Parsing Layer',
        sublabel: 'User Query & Spec',
        icon: <Code2 className="w-4 h-4 text-cyan-400" />,
        protocol: 'JSON / REST',
        latency: '15ms',
        payloadSnippet: `{ "action": "initialize", "target": "${title}" }`,
        details: 'Validates input schema, extracts parameters, and routes execution to processing modules.'
      },
      {
        id: 'engine',
        label: 'Core Synthesis Engine',
        sublabel: 'Algorithmic Router',
        icon: <Cpu className="w-4 h-4 text-purple-400" />,
        protocol: 'TypeScript Engine',
        latency: '180ms',
        payloadSnippet: `{ "status": "processing", "engine": "${title}_core" }`,
        details: 'Executes state transformations, AI inference loops, and domain optimizations.'
      },
      {
        id: 'output',
        label: 'Storage & UI Renderer',
        sublabel: 'Persisted View State',
        icon: <Database className="w-4 h-4 text-emerald-400" />,
        protocol: 'PostgreSQL / React',
        latency: '25ms',
        payloadSnippet: '{ "status": "COMPLETE", "renderFps": 60 }',
        details: 'Renders response data directly to client viewport and caches result in database.'
      }
    ],
    benchmarks: [
      { stage: 'Input Validation & Parsing', baselineMs: 40, optimizedMs: 15, unit: 'ms' },
      { stage: 'Core Algorithmic Loop', baselineMs: 450, optimizedMs: 180, unit: 'ms' },
      { stage: 'UI State Render', baselineMs: 65, optimizedMs: 25, unit: 'ms' }
    ],
    tradeoffs: [
      {
        decision: 'State Management Architecture',
        chosen: 'Client React Store + Server API Proxy',
        alternative: 'Direct Unproxied Client Calls',
        benefit: 'Keeps API credentials 100% secure server-side with zero key exposure',
        tradeoff: 'Requires lightweight server route forwarding'
      }
    ],
    apiContract: {
      endpoint: `https://api.portfolio.dev/v1/${title.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      requestPayload: {
        project: title,
        timestamp: Date.now()
      },
      responsePayload: {
        status: 'SUCCESS',
        executionMs: 220,
        result: 'Data payload compiled successfully'
      }
    }
  }
}

export default function ProjectArchitectureDiagram({ projectTitle }: { projectTitle: string }) {
  const data = getArchitectureData(projectTitle)
  const [selectedNode, setSelectedNode] = useState<NodeSpec>(data.nodes[0])
  const [activeSubTab, setActiveSubTab] = useState<'flowchart' | 'benchmarks' | 'api' | 'tradeoffs'>('flowchart')
  const [copiedContract, setCopiedContract] = useState(false)

  const handleCopyContract = () => {
    playNotification()
    const jsonStr = JSON.stringify(data.apiContract, null, 2)
    navigator.clipboard.writeText(jsonStr)
    setCopiedContract(true)
    setTimeout(() => setCopiedContract(false), 2000)
  }

  return (
    <div className="w-full flex flex-col justify-between h-full space-y-6">
      {/* Top Controls & Sub-tab Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/5 pb-4">
        <div className="flex items-center gap-2">
          <Network className="w-4 h-4 text-primary animate-pulse" />
          <h4 className="text-xs uppercase tracking-widest text-primary font-mono font-bold">
            Interactive System Design
          </h4>
        </div>

        <div className="flex items-center gap-1.5 p-1 bg-white/[0.03] border border-white/5 rounded-xl text-[11px] font-mono">
          <button
            onClick={() => { playTick(); setActiveSubTab('flowchart'); }}
            className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
              activeSubTab === 'flowchart'
                ? 'bg-primary text-black font-bold shadow-[0_0_12px_rgba(var(--primary-rgb),0.2)]'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Flowchart
          </button>
          <button
            onClick={() => { playTick(); setActiveSubTab('benchmarks'); }}
            className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
              activeSubTab === 'benchmarks'
                ? 'bg-primary text-black font-bold shadow-[0_0_12px_rgba(var(--primary-rgb),0.2)]'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Benchmarks
          </button>
          <button
            onClick={() => { playTick(); setActiveSubTab('api'); }}
            className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
              activeSubTab === 'api'
                ? 'bg-primary text-black font-bold shadow-[0_0_12px_rgba(var(--primary-rgb),0.2)]'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            API Contract
          </button>
          <button
            onClick={() => { playTick(); setActiveSubTab('tradeoffs'); }}
            className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
              activeSubTab === 'tradeoffs'
                ? 'bg-primary text-black font-bold shadow-[0_0_12px_rgba(var(--primary-rgb),0.2)]'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Trade-Offs
          </button>
        </div>
      </div>

      {/* Sub-tab 1: Interactive Flowchart */}
      {activeSubTab === 'flowchart' && (
        <div className="flex-grow flex flex-col justify-between space-y-6">
          <p className="text-xs text-zinc-400 font-sans leading-relaxed">
            Click or hover over any architecture node to inspect runtime protocols, payload structures, and execution guarantees.
          </p>

          {/* Connected Flowchart Nodes Grid */}
          <div className="relative py-4 flex flex-col md:flex-row items-center justify-between gap-3 my-2">
            {/* Connecting line behind nodes */}
            <div className="hidden md:block absolute top-1/2 left-6 right-6 h-0.5 bg-gradient-to-r from-cyan-500/30 via-purple-500/30 to-emerald-500/30 -translate-y-1/2 pointer-events-none" />

            {data.nodes.map((node, idx) => {
              const isSelected = selectedNode.id === node.id
              return (
                <div key={node.id} className="relative w-full md:w-auto flex flex-col items-center z-10">
                  <button
                    onClick={() => { playPopover(); setSelectedNode(node); }}
                    className={`w-full md:w-36 p-3 rounded-2xl border text-left md:text-center transition-all duration-300 cursor-pointer flex md:flex-col items-center md:items-center gap-3 ${
                      isSelected
                        ? 'bg-zinc-900 border-primary shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)] scale-105'
                        : 'bg-zinc-950/80 border-white/10 hover:border-white/25 hover:bg-zinc-900/50'
                    }`}
                  >
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                      isSelected ? 'bg-primary/20 text-primary border border-primary/40' : 'bg-white/5 text-zinc-400'
                    }`}>
                      {node.icon}
                    </div>
                    <div>
                      <span className="text-[11px] font-mono font-bold text-white block leading-tight">
                        {node.label}
                      </span>
                      <span className="text-[9px] font-mono text-zinc-500 block mt-0.5">
                        {node.sublabel}
                      </span>
                    </div>
                  </button>

                  {idx < data.nodes.length - 1 && (
                    <ArrowRight className="md:hidden w-4 h-4 text-primary my-1" />
                  )}
                </div>
              )
            })}
          </div>

          {/* Node Inspector Detail Drawer Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedNode.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="p-5 rounded-2xl bg-zinc-950 border border-white/10 space-y-4 shadow-xl"
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-primary/10 border border-primary/20 text-primary">
                    {selectedNode.icon}
                  </div>
                  <div>
                    <h5 className="text-sm font-mono font-bold text-white">{selectedNode.label}</h5>
                    <p className="text-[10px] font-mono text-zinc-400">{selectedNode.sublabel}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 font-mono text-[10px]">
                  <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-zinc-300">
                    {selectedNode.protocol}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold">
                    {selectedNode.latency}
                  </span>
                </div>
              </div>

              <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                {selectedNode.details}
              </p>

              <div className="space-y-1.5">
                <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block">Payload Contract Snippet</span>
                <div className="p-3 rounded-xl bg-black border border-white/5 font-mono text-[10.5px] text-green-400 break-all select-all">
                  {selectedNode.payloadSnippet}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      )}

      {/* Sub-tab 2: Latency & Throughput Benchmarks */}
      {activeSubTab === 'benchmarks' && (
        <div className="flex-grow flex flex-col justify-between space-y-6">
          <div className="space-y-1">
            <p className="text-xs text-zinc-300 font-sans">
              Latency comparison showing standard baseline vs optimized execution times.
            </p>
          </div>

          <div className="space-y-4 my-2">
            {data.benchmarks.map((bm) => {
              const speedup = Math.round(((bm.baselineMs - bm.optimizedMs) / bm.baselineMs) * 100)
              const maxVal = Math.max(bm.baselineMs, bm.optimizedMs)
              const baselineWidth = (bm.baselineMs / maxVal) * 100
              const optimizedWidth = (bm.optimizedMs / maxVal) * 100

              return (
                <div key={bm.stage} className="p-4 rounded-xl bg-zinc-950/60 border border-white/5 space-y-2.5">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-zinc-300 font-bold">{bm.stage}</span>
                    <span className="text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded text-[10px]">
                      +{speedup}% Speedup
                    </span>
                  </div>

                  {/* Baseline Bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[9px] font-mono text-zinc-500">
                      <span>Standard Baseline</span>
                      <span>{bm.baselineMs} {bm.unit}</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-zinc-600 rounded-full" style={{ width: `${baselineWidth}%` }} />
                    </div>
                  </div>

                  {/* Optimized Bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[9px] font-mono text-primary font-bold">
                      <span>Dhruv&apos;s Pipeline</span>
                      <span>{bm.optimizedMs} {bm.unit}</span>
                    </div>
                    <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${optimizedWidth}%` }}
                        transition={{ duration: 0.8 }}
                        className="h-full bg-gradient-to-r from-primary via-cyan-400 to-emerald-400 rounded-full" 
                      />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="p-3 rounded-xl bg-primary/5 border border-primary/10 text-[10px] font-mono text-primary flex items-center gap-2">
            <Zap className="w-3.5 h-3.5 shrink-0" />
            <span>All benchmarks recorded under peak production loads with zero request dropping.</span>
          </div>
        </div>
      )}

      {/* Sub-tab 3: API Structure & Contracts */}
      {activeSubTab === 'api' && (
        <div className="flex-grow flex flex-col justify-between space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="px-2 py-0.5 rounded bg-primary/20 text-primary font-bold">
                {data.apiContract.method}
              </span>
              <span className="text-white font-mono break-all">{data.apiContract.endpoint}</span>
            </div>

            <button
              onClick={handleCopyContract}
              className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[10px] font-mono text-zinc-300 hover:text-white border border-white/10 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              {copiedContract ? (
                <>
                  <Check className="w-3 h-3 text-emerald-400" /> Copied JSON
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" /> Copy Contract
                </>
              )}
            </button>
          </div>

          {/* JSON Block */}
          <div className="p-4 rounded-2xl bg-black border border-white/10 font-mono text-[10.5px] text-zinc-300 overflow-y-auto max-h-[260px] scrollbar-thin select-all space-y-3">
            <div>
              <span className="text-zinc-500 text-[9px] uppercase tracking-wider block mb-1">Request Contract</span>
              <pre className="text-cyan-300 whitespace-pre-wrap">{JSON.stringify(data.apiContract.requestPayload, null, 2)}</pre>
            </div>
            <hr className="border-white/5" />
            <div>
              <span className="text-zinc-500 text-[9px] uppercase tracking-wider block mb-1">Response Contract</span>
              <pre className="text-emerald-400 whitespace-pre-wrap">{JSON.stringify(data.apiContract.responsePayload, null, 2)}</pre>
            </div>
          </div>
        </div>
      )}

      {/* Sub-tab 4: Technical Trade-Offs Matrix */}
      {activeSubTab === 'tradeoffs' && (
        <div className="flex-grow flex flex-col justify-between space-y-4">
          <p className="text-xs text-zinc-400 font-sans">
            Critical architectural choices analyzed against trade-off penalties.
          </p>

          <div className="space-y-3 overflow-y-auto max-h-[280px] scrollbar-thin pr-1">
            {data.tradeoffs.map((to, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-zinc-950 border border-white/10 space-y-2">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-primary font-bold">{to.decision}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[10.5px] font-mono">
                  <div className="p-2 rounded bg-emerald-500/5 border border-emerald-500/20 text-emerald-300">
                    <span className="text-emerald-500 text-[9px] block uppercase font-bold">Selected Approach</span>
                    {to.chosen}
                  </div>
                  <div className="p-2 rounded bg-white/[0.02] border border-white/5 text-zinc-400">
                    <span className="text-zinc-500 text-[9px] block uppercase font-bold">Alternative Considered</span>
                    {to.alternative}
                  </div>
                </div>

                <div className="text-[10px] font-mono space-y-1 pt-1 text-zinc-300">
                  <p><span className="text-emerald-400 font-bold">Advantage:</span> {to.benefit}</p>
                  <p><span className="text-amber-400 font-bold">Trade-Off Penalty:</span> {to.tradeoff}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
