"use client"

import React from 'react'

interface EditorialBadgeProps {
  index?: string | number
  label: string
  coordinates?: string
  frequency?: string
  status?: string
  className?: string
  variant?: 'cyan' | 'violet' | 'emerald' | 'amber' | 'neutral' | 'amethyst'
}

export default function EditorialBadge({
  index,
  label,
  coordinates = "LAT: 21.1458° N",
  frequency = "RENDER_FREQ: 60Hz",
  status = "ONLINE",
  className = '',
  variant = 'cyan',
}: EditorialBadgeProps) {
  const dotColor = {
    cyan: 'bg-cyan-400',
    violet: 'bg-violet-400',
    amethyst: 'bg-purple-500',
    emerald: 'bg-emerald-400',
    amber: 'bg-amber-400',
    neutral: 'bg-white',
  }[variant]

  const labelColor = {
    cyan: 'text-cyan-300',
    violet: 'text-violet-300',
    amethyst: 'text-purple-300',
    emerald: 'text-emerald-300',
    amber: 'text-amber-300',
    neutral: 'text-zinc-200',
  }[variant]

  return (
    <div 
      className={`inline-flex flex-wrap items-center gap-2 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.2em] select-none ${className}`}
      aria-label={`Section identifier: ${label}`}
    >
      {/* Precision bracket prefix */}
      <span className="text-zinc-600 font-bold">[</span>

      {/* Index */}
      {index !== undefined && (
        <>
          <span className="text-zinc-400 font-bold">
            {typeof index === 'number' ? String(index).padStart(2, '0') : index}
          </span>
          <span className="text-zinc-600">{'//'}</span>
        </>
      )}

      {/* Pulsing Status Dot */}
      <span className="flex items-center gap-1.5">
        <span className={`w-1.5 h-1.5 rounded-full ${dotColor} animate-pulse`} />
        <span className={`font-bold ${labelColor}`}>{label}</span>
      </span>

      {/* Telemetry separator */}
      <span className="text-zinc-700 hidden sm:inline">·</span>

      {/* Coordinates */}
      {coordinates && (
        <span className="text-zinc-500 hidden sm:inline">
          {coordinates}
        </span>
      )}

      {/* Telemetry separator */}
      {frequency && (
        <>
          <span className="text-zinc-700 hidden md:inline">·</span>
          <span className="text-zinc-500 hidden md:inline">
            {frequency}
          </span>
        </>
      )}

      {/* Precision bracket suffix */}
      <span className="text-zinc-600 font-bold">]</span>
    </div>
  )
}
