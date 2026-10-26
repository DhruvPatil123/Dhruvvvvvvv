"use client"

import React from 'react'

interface FluidTextProps {
  children: React.ReactNode
  variant?: 'liquid' | 'chrome' | 'amethyst'
  className?: string
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'span' | 'div'
}

export default function FluidText({
  children,
  variant = 'amethyst',
  className = '',
  as: Component = 'span',
}: FluidTextProps) {
  const gradientClass = 
    variant === 'amethyst' 
      ? 'text-fluid-amethyst' 
      : variant === 'liquid' 
      ? 'text-fluid-liquid' 
      : 'text-fluid-chrome'

  return (
    <Component className={`inline-block font-sans font-black ${gradientClass} ${className}`}>
      {children}
    </Component>
  )
}
