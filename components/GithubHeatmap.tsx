"use client"

import React, { useMemo, useState } from 'react'
import { useThemeStore } from '@/store/useThemeStore'

interface ContributionDay {
  date: string
  count: number
  level: number
}

interface GithubHeatmapProps {
  contributions: ContributionDay[]
}

export default function GithubHeatmap({ contributions }: GithubHeatmapProps) {
  const theme = useThemeStore((state) => state.theme)
  const [hoveredCell, setHoveredCell] = useState<{ dateStr: string; count: number; x: number; y: number } | null>(null)

  const formattedCalendar = useMemo(() => {
    const cal: Record<string, { count: number; level: number }> = {}
    if (!contributions || contributions.length === 0) return cal

    contributions.forEach((day) => {
      cal[day.date] = { count: day.count, level: day.level }
    })
    return cal
  }, [contributions])

  // Generate grid cells (18 columns x 7 rows = 126 days)
  const { cells, months } = useMemo(() => {
    const cols = 18
    const rows = 7
    const totalCells = cols * rows
    const today = new Date()
    const list = []
    
    // Go backwards to let the last cell be today
    for (let i = totalCells - 1; i >= 0; i--) {
      const d = new Date(today)
      d.setDate(today.getDate() - i)
      
      const yyyy = d.getFullYear()
      const mm = String(d.getMonth() + 1).padStart(2, '0')
      const dd = String(d.getDate()).padStart(2, '0')
      const yyyymmdd = `${yyyy}-${mm}-${dd}`

      const dayData = formattedCalendar[yyyymmdd] || { count: 0, level: 0 }
      list.push({
        date: d,
        yyyymmdd,
        count: dayData.count,
        level: dayData.level,
      })
    }

    // Identify month labels and their starting columns
    const monthLabels: { label: string; colIndex: number }[] = []
    let lastMonth = -1
    for (let col = 0; col < cols; col++) {
      const cellIndex = col * rows
      const cell = list[cellIndex]
      if (cell) {
        const m = cell.date.getMonth()
        if (m !== lastMonth) {
          const label = cell.date.toLocaleString('default', { month: 'short' })
          monthLabels.push({ label, colIndex: col })
          lastMonth = m
        }
      }
    }

    return { cells: list, months: monthLabels }
  }, [formattedCalendar])

  // Get color based on contribution level
  const getCellColor = (level: number) => {
    if (level === 0) return 'rgba(255, 255, 255, 0.03)'

    // Classic GitHub Green Palette
    if (level === 1) return '#0e4429' // Deep dark green
    if (level === 2) return '#006d32' // Medium dark green
    if (level === 3) return '#26a641' // Green
    return '#39d353' // Vibrant light green
  }

  // Dimensions of SVG grid
  const cellSize = 8
  const cellGap = 2
  const cols = 18
  const rows = 7
  const width = cols * (cellSize + cellGap) - cellGap
  const height = rows * (cellSize + cellGap) - cellGap

  return (
    <div className="relative mt-4 pt-4 border-t border-white/5 w-full">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">
          Contribution Calendar (Last 120 Days)
        </span>
        <div className="flex gap-1 items-center">
          <span className="text-[9px] font-mono text-gray-500">Less</span>
          <div className="w-2 h-2 rounded-sm" style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)' }} />
          <div className="w-2 h-2 rounded-sm" style={{ backgroundColor: getCellColor(1) }} />
          <div className="w-2 h-2 rounded-sm" style={{ backgroundColor: getCellColor(2) }} />
          <div className="w-2 h-2 rounded-sm" style={{ backgroundColor: getCellColor(3) }} />
          <div className="w-2 h-2 rounded-sm" style={{ backgroundColor: getCellColor(4) }} />
          <span className="text-[9px] font-mono text-gray-500">More</span>
        </div>
      </div>

      <div className="relative w-full overflow-x-auto no-scrollbar py-1">
        <svg
          width={width}
          height={height + 12}
          className="mx-auto block overflow-visible"
          viewBox={`0 0 ${width} ${height + 12}`}
        >
          {/* Month labels */}
          {months.map((m, idx) => {
            const x = m.colIndex * (cellSize + cellGap)
            return (
              <text
                key={idx}
                x={x}
                y={8}
                className="fill-gray-500 font-mono text-[7px]"
              >
                {m.label}
              </text>
            )
          })}

          {/* Heatmap cells */}
          {cells.map((cell, idx) => {
            const col = Math.floor(idx / rows)
            const row = idx % rows
            const x = col * (cellSize + cellGap)
            const y = row * (cellSize + cellGap) + 12

            const fillColor = getCellColor(cell.level)

            return (
              <rect
                key={idx}
                x={x}
                y={y}
                width={cellSize}
                height={cellSize}
                rx={1.5}
                ry={1.5}
                fill={fillColor}
                className="transition-all duration-200 cursor-crosshair hover:stroke-white/30 hover:stroke-1"
                onMouseEnter={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect()
                  const parentRect = e.currentTarget.parentElement?.getBoundingClientRect()
                  const left = rect.left - (parentRect?.left || 0)
                  const top = rect.top - (parentRect?.top || 0)

                  const displayDate = cell.date.toLocaleDateString('default', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })

                  setHoveredCell({
                    dateStr: displayDate,
                    count: cell.count,
                    x: left,
                    y: top - 28
                  })
                }}
                onMouseLeave={() => setHoveredCell(null)}
              />
            )
          })}
        </svg>

        {/* Hover Tooltip */}
        {hoveredCell && (
          <div
            className="absolute z-10 glass-effect border border-white/10 px-2 py-1 rounded text-[9px] font-mono text-white pointer-events-none transform -translate-x-1/2 flex flex-col items-center justify-center shadow-lg"
            style={{
              left: `${hoveredCell.x}px`,
              top: `${hoveredCell.y}px`,
            }}
          >
            <span className="font-semibold">{hoveredCell.count} contributions</span>
            <span className="text-gray-400">{hoveredCell.dateStr}</span>
          </div>
        )}
      </div>
    </div>
  )
}
