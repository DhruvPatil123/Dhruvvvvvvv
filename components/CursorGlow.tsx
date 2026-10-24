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
      {/* Subtle, whisper-soft neutral ambient vignette (Monochrome, no color gradient) */}
      <div
        className="pointer-events-none fixed z-30 transition-transform duration-75 ease-out rounded-full -translate-x-1/2 -translate-y-1/2"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: isHovered ? '260px' : '180px',
          height: isHovered ? '260px' : '180px',
          background: isHovered
            ? 'radial-gradient(circle, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 50%, rgba(0, 0, 0, 0) 70%)'
            : 'radial-gradient(circle, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.005) 50%, rgba(0, 0, 0, 0) 70%)',
          filter: 'blur(25px)',
        }}
      />
    </>
  )
}
