"use client"

import React, { useState, useEffect, useRef, useCallback } from 'react'

interface BaffleTextProps {
  text: string
  className?: string
  revealSpeed?: number
  scrambleOnMount?: boolean
  triggerOnHover?: boolean
  as?: 'span' | 'h2' | 'h3' | 'h4' | 'p' | 'div'
}

const DEFAULT_GLYPHS = '01XØ§∆∑∏√∂λΩ⚡Ψ⌘ABCDEF'

export default function BaffleText({
  text,
  className = '',
  revealSpeed = 35,
  scrambleOnMount = false,
  triggerOnHover = true,
  as: Component = 'span',
}: BaffleTextProps) {
  const [displayText, setDisplayText] = useState(text)
  const [isScrambling, setIsScrambling] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const isRunningRef = useRef(false)

  const scramble = useCallback(() => {
    if (isRunningRef.current) return
    isRunningRef.current = true
    setIsScrambling(true)

    const length = text.length
    let iteration = 0
    const totalIterations = length + 8

    if (timerRef.current) clearInterval(timerRef.current)

    timerRef.current = setInterval(() => {
      iteration++
      const revealedCount = Math.max(0, iteration - 8)

      const scrambled = text
        .split('')
        .map((char, index) => {
          if (char === ' ') return ' '
          if (index < revealedCount) {
            return text[index]
          }
          return DEFAULT_GLYPHS[Math.floor(Math.random() * DEFAULT_GLYPHS.length)]
        })
        .join('')

      setDisplayText(scrambled)

      if (iteration >= totalIterations) {
        if (timerRef.current) clearInterval(timerRef.current)
        setDisplayText(text)
        setIsScrambling(false)
        isRunningRef.current = false
      }
    }, revealSpeed)
  }, [text, revealSpeed])

  useEffect(() => {
    if (scrambleOnMount) {
      scramble()
    } else {
      setDisplayText(text)
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [text, scrambleOnMount, scramble])

  const handleMouseEnter = () => {
    if (triggerOnHover) {
      scramble()
    }
  }

  return (
    <Component
      onMouseEnter={handleMouseEnter}
      className={`inline-block transition-colors duration-200 ${
        isScrambling ? 'font-mono select-none drop-shadow-[0_0_8px_rgba(0,240,255,0.6)]' : ''
      } ${className}`}
      style={
        isScrambling
          ? {
              textShadow: '1.2px 0 rgba(255, 0, 128, 0.8), -1.2px 0 rgba(0, 240, 255, 0.8)',
            }
          : undefined
      }
    >
      {displayText}
    </Component>
  )
}
