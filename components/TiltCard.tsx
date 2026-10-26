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
  enableHolographic?: boolean
  enableBlueprint?: boolean
}

export default function TiltCard({
  children,
  className = '',
  onClick,
  onKeyDown,
  role = 'button',
  tabIndex = 0,
  ariaLabel,
  enableHolographic = true,
  enableBlueprint = true,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const [foilAngle, setFoilAngle] = useState(135)
  const [coords, setCoords] = useState({ x: 0, y: 0, px: 0.5, py: 0.5 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top

    const px = Math.max(0, Math.min(1, mouseX / width))
    const py = Math.max(0, Math.min(1, mouseY / height))

    // Calculate rotation angles (max +/- 12 deg for tangible 3D depth)
    const rY = (px - 0.5) * 14
    const rX = -(py - 0.5) * 14

    // Dynamic foil reflection angle based on mouse vector from center
    const angle = Math.atan2(mouseY - height * 0.5, mouseX - width * 0.5) * (180 / Math.PI) + 180

    setRotateX(rX)
    setRotateY(rY)
    setFoilAngle(angle)
    setCoords({ x: mouseX, y: mouseY, px, py })
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
      {/* 1. Iridescent "Oil-Slick" Holographic Foil Sheen */}
      {enableHolographic && isHovered && (
        <>
          {/* Prismatic rainbow dispersion sheen */}
          <div
            className="pointer-events-none absolute inset-0 rounded-3xl opacity-35 z-20 mix-blend-color-dodge transition-opacity duration-300"
            style={{
              background: `linear-gradient(${foilAngle}deg, transparent 15%, rgba(255, 0, 128, 0.22) 32%, rgba(0, 245, 212, 0.28) 48%, rgba(255, 230, 0, 0.25) 65%, transparent 85%)`,
              transform: 'translateZ(14px)',
            }}
          />

          {/* Radial Specular Glint catching the cursor point light */}
          <div
            className="pointer-events-none absolute inset-0 rounded-3xl opacity-45 z-20 mix-blend-screen transition-opacity duration-200"
            style={{
              background: `radial-gradient(circle 280px at ${coords.x}px ${coords.y}px, rgba(255, 255, 255, 0.35), rgba(0, 240, 255, 0.15) 35%, transparent 65%)`,
              transform: 'translateZ(16px)',
            }}
          />
        </>
      )}

      {/* 2. Architectural Blueprint & Golden Ratio Overlays */}
      {enableBlueprint && isHovered && (
        <div 
          className="pointer-events-none absolute inset-0 rounded-3xl z-10 overflow-hidden opacity-90 transition-opacity duration-300"
          style={{ transform: 'translateZ(8px)' }}
        >
          {/* Hairline Technical Grid */}
          <div 
            className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(to_right,#00f0ff_1px,transparent_1px),linear-gradient(to_bottom,#00f0ff_1px,transparent_1px)] bg-[size:16px_16px]"
          />

          {/* Golden Ratio Blueprint Watermark in Top Right */}
          <div className="absolute top-3 right-3 font-mono text-[8px] tracking-widest text-cyan-400/50 uppercase select-none flex items-center gap-1.5">
            <span>Φ: 1.618</span>
            <span className="text-zinc-600">/</span>
            <span>[{Math.round(coords.x)}, {Math.round(coords.y)}]</span>
          </div>

          {/* Technical Corner Crosshairs */}
          <div className="absolute top-2 left-2 font-mono text-[10px] text-cyan-400/50 leading-none select-none">+</div>
          <div className="absolute bottom-2 left-2 font-mono text-[10px] text-cyan-400/50 leading-none select-none">+</div>
          <div className="absolute bottom-2 right-2 font-mono text-[10px] text-cyan-400/50 leading-none select-none">+</div>
        </div>
      )}

      <div style={{ transform: 'translateZ(0px)' }}>{children}</div>
    </div>
  )
}
