"use client"

import React, { useEffect, useState } from 'react'

export default function CursorGlow() {
  const [position, setPosition] = useState({ x: -100, y: -100 })
  const [isHovered, setIsHovered] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Only enable on desktop pointer devices
    if (window.matchMedia('(pointer: coarse)').matches) return

    setIsVisible(true)

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })

      // Detect if hovering over clickable or card element
      const target = e.target as HTMLElement | null
      if (
        target &&
        (target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          target.closest('button') ||
          target.closest('a') ||
          target.closest('.group') ||
          target.getAttribute('role') === 'button')
      ) {
        setIsHovered(true)
      } else {
        setIsHovered(false)
      }
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    const handleMouseEnter = () => {
      setIsVisible(true)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [])

  if (!isVisible) return null

  return (
    <>
      {/* Primary Ambient Gradient Halo */}
      <div
        className="pointer-events-none fixed z-30 transition-transform duration-75 ease-out rounded-full -translate-x-1/2 -translate-y-1/2"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: isHovered ? '320px' : '220px',
          height: isHovered ? '320px' : '220px',
          background: isHovered
            ? 'radial-gradient(circle, rgba(0, 242, 255, 0.18) 0%, rgba(37, 99, 235, 0.08) 50%, rgba(0, 0, 0, 0) 70%)'
            : 'radial-gradient(circle, rgba(0, 242, 255, 0.1) 0%, rgba(37, 99, 235, 0.04) 50%, rgba(0, 0, 0, 0) 70%)',
          filter: 'blur(30px)',
        }}
      />

      {/* Tiny Precision Glowing Dot */}
      <div
        className={`pointer-events-none fixed z-40 rounded-full -translate-x-1/2 -translate-y-1/2 transition-all duration-150 ${
          isHovered
            ? 'w-4 h-4 bg-cyan-300 shadow-[0_0_15px_rgba(0,242,255,0.9)] opacity-90 scale-125'
            : 'w-2 h-2 bg-cyan-400 shadow-[0_0_8px_rgba(0,242,255,0.7)] opacity-60'
        }`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      />
    </>
  )
}
