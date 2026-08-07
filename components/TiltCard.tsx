"use client"

import React, { useRef, useState } from 'react'

interface TiltCardProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  onKeyDown?: (e: React.KeyboardEvent<HTMLDivElement>) => void
  role?: string
  tabIndex?: number
  ariaLabel?: string
}

export default function TiltCard({
  children,
  className = '',
  onClick,
  onKeyDown,
  role = 'button',
  tabIndex = 0,
  ariaLabel,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top

    // Calculate rotation angles (max +/- 8 deg)
    const rY = ((mouseX / width) - 0.5) * 12
    const rX = -((mouseY / height) - 0.5) * 12

    setRotateX(rX)
    setRotateY(rY)
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setRotateX(0)
    setRotateY(0)
  }

  const handleKeyDownInternal = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if ((e.key === 'Enter' || e.key === ' ') && onClick) {
      e.preventDefault()
      onClick()
    }
    if (onKeyDown) {
      onKeyDown(e)
    }
  }

  return (
    <div
      ref={cardRef}
      role={role}
      tabIndex={tabIndex}
      aria-label={ariaLabel}
      onClick={onClick}
      onKeyDown={handleKeyDownInternal}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative transition-all duration-200 ease-out cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-3xl ${className}`}
      style={{
        transform: isHovered
          ? `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Dynamic Ambient Glare Overlay */}
      {isHovered && (
        <div
          className="pointer-events-none absolute inset-0 rounded-3xl opacity-20 bg-gradient-to-tr from-transparent via-cyan-400/20 to-white/10 z-10 transition-opacity"
          style={{
            transform: 'translateZ(10px)',
          }}
        />
      )}

      <div style={{ transform: 'translateZ(0px)' }}>{children}</div>
    </div>
  )
}
