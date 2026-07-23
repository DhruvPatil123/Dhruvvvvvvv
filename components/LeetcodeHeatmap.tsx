"use client"

import React, { useMemo, useState } from 'react'
import { useThemeStore } from '@/store/useThemeStore'

interface LeetcodeHeatmapProps {
  submissionCalendar: string
}

export default function LeetcodeHeatmap({ submissionCalendar }: LeetcodeHeatmapProps) {
  const theme = useThemeStore((state) => state.theme)
  const [hoveredCell, setHoveredCell] = useState<{ dateStr: string; count: number; x: number; y: number } | null>(null)

  const formattedCalendar = useMemo(() => {
    const cal: Record<string, number> = {}
    if (!submissionCalendar) return cal

    try {
      const parsed = JSON.parse(submissionCalendar)
      Object.entries(parsed).forEach(([timestampStr, count]) => {
        // LeetCode timestamps are in seconds
        const date = new Date(parseInt(timestampStr) * 1000)
        if (isNaN(date.getTime())) return

        // Format to YYYY-MM-DD
        const yyyy = date.getFullYear()
        const mm = String(date.getMonth() + 1).padStart(2, '0')
        const dd = String(date.getDate()).padStart(2, '0')
        const yyyymmdd = `${yyyy}-${mm}-${dd}`
        
        cal[yyyymmdd] = (cal[yyyymmdd] || 0) + (count as number)
      })
    } catch (e) {
      console.error("Failed to parse LeetCode submission calendar:", e)
    }
    return cal
  }, [submissionCalendar])

  // Generate grid cells (18 columns x 7 rows = 126 days, aligned Sun-Sat)
  const { cells, months } = useMemo(() => {
    const cols = 18
    const rows = 7
    const today = new Date()
    const todayDayOfWeek = today.getDay() // 0 = Sun, 1 = Mon, ..., 6 = Sat

    // Find Sunday of current week
    const currentSunday = new Date(today)
    currentSunday.setDate(today.getDate() - todayDayOfWeek)

    // Start date is 17 weeks before currentSunday (total 18 columns)
    const startDate = new Date(currentSunday)
    startDate.setDate(currentSunday.getDate() - 17 * 7)

    const list: {
      col: number
      row: number
      date: Date
      yyyymmdd: string
      count: number
      isFuture: boolean
    }[] = []

    const monthLabels: { label: string; colIndex: number }[] = []
    let lastMonth = -1

    for (let c = 0; c < cols; c++) {
      const colFirstDay = new Date(startDate)
      colFirstDay.setDate(startDate.getDate() + c * 7)

      const monthNum = colFirstDay.getMonth()
      if (monthNum !== lastMonth) {
        const label = colFirstDay.toLocaleString('default', { month: 'short' })
        monthLabels.push({ label, colIndex: c })
        lastMonth = monthNum
      }

      for (let r = 0; r < rows; r++) {
        const d = new Date(startDate)
        d.setDate(startDate.getDate() + (c * 7 + r))

        const yyyy = d.getFullYear()
        const mm = String(d.getMonth() + 1).padStart(2, '0')
        const dd = String(d.getDate()).padStart(2, '0')
        const yyyymmdd = `${yyyy}-${mm}-${dd}`

        const isFuture = d > today
        const count = isFuture ? 0 : (formattedCalendar[yyyymmdd] || 0)

        list.push({
          col: c,
          row: r,
          date: d,
          yyyymmdd,
          count,
          isFuture
        })
      }
    }

    return { cells: list, months: monthLabels }
  }, [formattedCalendar])

  // Get color based on submission count and theme
  const getCellColor = (count: number) => {
    if (count === 0) return 'rgba(255, 255, 255, 0.03)'

    if (theme === 'charcoal') {
      if (count === 1) return 'rgba(156, 163, 175, 0.25)'
      if (count === 2) return 'rgba(156, 163, 175, 0.55)'
      if (count <= 4) return 'rgba(243, 244, 246, 0.8)'
      return '#ffffff'
    } else if (theme === 'emerald') {
      if (count === 1) return 'rgba(16, 185, 129, 0.25)'
      if (count === 2) return 'rgba(16, 185, 129, 0.55)'
      if (count <= 4) return 'rgba(52, 211, 153, 0.8)'
      return '#34d399'
    } else {
      // default: cobalt
      if (count === 1) return 'rgba(37, 99, 235, 0.25)'
      if (count === 2) return 'rgba(37, 99, 235, 0.55)'
      if (count <= 4) return 'rgba(96, 165, 250, 0.8)'
      return '#60a5fa'
    }
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
          Activity Heatmap (Last 120 Days)
        </span>
        <div className="flex gap-1 items-center">
          <span className="text-[9px] font-mono text-gray-500">Less</span>
          <div className="w-2 h-2 rounded-sm" style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)' }} />
          <div className="w-2 h-2 rounded-sm" style={{ backgroundColor: getCellColor(1) }} />
          <div className="w-2 h-2 rounded-sm" style={{ backgroundColor: getCellColor(2) }} />
          <div className="w-2 h-2 rounded-sm" style={{ backgroundColor: getCellColor(3) }} />
          <div className="w-2 h-2 rounded-sm" style={{ backgroundColor: getCellColor(5) }} />
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
            const x = cell.col * (cellSize + cellGap)
            const y = cell.row * (cellSize + cellGap) + 12

            if (cell.isFuture) {
              return (
                <rect
                  key={idx}
                  x={x}
                  y={y}
                  width={cellSize}
                  height={cellSize}
                  rx={1.5}
                  ry={1.5}
                  fill="transparent"
                />
              )
            }

            const fillColor = getCellColor(cell.count)

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

                  // Format display date: "Jul 1, 2026"
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
            <span className="font-semibold">{hoveredCell.count} submissions</span>
            <span className="text-gray-400">{hoveredCell.dateStr}</span>
          </div>
        )}
      </div>
    </div>
  )
}
