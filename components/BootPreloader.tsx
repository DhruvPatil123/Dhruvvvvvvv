"use client"

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { playAmbientPad, playTick } from '@/lib/sounds'

const ScrambledText = ({ text, delay = 0, onComplete }: { text: string; delay?: number; onComplete?: () => void }) => {
  const [displayText, setDisplayText] = useState('')
  
  useEffect(() => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_@$#%*&!+='
    let currentIteration = 0
    const targetText = text
    
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayText(
          targetText
            .split('')
            .map((char, index) => {
              if (char === ' ') return ' '
              if (index < currentIteration) return targetText[index]
              return chars[Math.floor(Math.random() * chars.length)]
            })
            .join('')
        )
        
        currentIteration += 0.6
        if (currentIteration >= targetText.length) {
          setDisplayText(targetText)
          clearInterval(interval)
          if (onComplete) onComplete()
        }
      }, 25)
      
      return () => clearInterval(interval)
    }, delay)

    return () => clearTimeout(timeout)
  }, [text, delay, onComplete])

  return <span>{displayText}</span>
}

const BOOT_LOGS = [
  "INITIALIZING COGNITIVE ARCHITECTURE...",
  "LOADING RENAISSANCE ARTIFACT ASSETS...",
  "MAPPING VECTOR NEURAL GRAPHICS...",
  "ESTABLISHING CRYPTOGRAPHIC CORES...",
  "COMPILING AGENTIC CHAT INTERFACES...",
  "DHRUV PATIL SYSTEMS ONLINE. [READY]"
]

export default function BootPreloader() {
  const [isVisible, setIsVisible] = useState(false)
  const [progress, setProgress] = useState(0)
  const [activeLogIndex, setActiveLogIndex] = useState(0)
  const [logs, setLogs] = useState<string[]>([])

  useEffect(() => {
    // Session caching to run only on initial load
    const hasVisited = sessionStorage.getItem('has_visited_preloader')
    if (hasVisited === 'true') {
      setIsVisible(false)
      return
    }
    setIsVisible(true)
  }, [])

  useEffect(() => {
    if (!isVisible) return

    // Linear progress animation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        playTick()
        return prev + 1
      })
    }, 35)

    return () => clearInterval(interval)
  }, [isVisible])

  useEffect(() => {
    if (!isVisible) return
    if (activeLogIndex < BOOT_LOGS.length) {
      const timeout = setTimeout(() => {
        setLogs((prev) => [...prev, BOOT_LOGS[activeLogIndex]])
        setActiveLogIndex((prev) => prev + 1)
      }, activeLogIndex * 450)
      return () => clearTimeout(timeout)
    }
  }, [isVisible, activeLogIndex])

  const handleExit = () => {
    playAmbientPad()
    sessionStorage.setItem('has_visited_preloader', 'true')
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-0 bg-black z-[9999] flex flex-col justify-between p-8 md:p-16 font-mono select-none"
      >
        {/* Top bar indicators */}
        <div className="flex justify-between items-center text-xs text-primary/70 tracking-wider">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span>DHRUV_PATIL_OS v3.5.0</span>
          </div>
          <div>SYSTEM_CHECK: OK</div>
        </div>

        {/* Middle terminal outputs */}
        <div className="max-w-3xl w-full mx-auto flex flex-col gap-2.5 text-[11px] md:text-xs text-zinc-400">
          <div className="text-zinc-500 mb-2">{"// COMMENCING BOOT SEQUENCE INTERCEPT //"}</div>
          {logs.map((log, index) => (
            <div key={index} className="flex gap-2 items-center">
              <span className="text-primary/50">&gt;&gt;</span>
              <ScrambledText text={log} delay={0} />
            </div>
          ))}
        </div>

        {/* Bottom progress metrics */}
        <div className="max-w-3xl w-full mx-auto flex flex-col gap-4 text-xs">
          <div className="space-y-2">
            <div className="flex justify-between text-[11px] text-zinc-500 font-mono uppercase tracking-wider">
              <span>Cognitive Compilation</span>
              <span>{progress}%</span>
            </div>
            <div className="h-[2px] bg-white/10 w-full rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-primary to-secondary"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="flex justify-between items-center pt-2">
            <span className="text-[10px] text-zinc-600 uppercase tracking-widest animate-pulse">
              {progress < 100 ? "Syncing memory sectors..." : "Compile Complete."}
            </span>
            {progress === 100 && (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={handleExit}
                className="px-6 py-2.5 rounded-xl bg-primary text-black font-bold text-xs hover:bg-primary/90 transition-all duration-300 shadow-[0_0_20px_rgba(0,242,255,0.3)] cursor-pointer active:scale-95"
              >
                ENTER COGNITIVE CORES
              </motion.button>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
