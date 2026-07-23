"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar as CalendarIcon, Clock, Globe, User, Mail, Building, CheckCircle2, Video, ArrowRight, Sparkles, X } from 'lucide-react'

type TopicOption = {
  id: string
  title: string
  duration: string
  desc: string
  icon: string
}

const TOPICS: TopicOption[] = [
  { id: 'recruiter', title: '15-Min Recruiter Intro', duration: '15 min', desc: 'Quick alignment on roles, compensation & technical fit', icon: '⚡' },
  { id: 'architecture', title: 'AI & Agentic Tech Discussion', duration: '30 min', desc: 'Deep dive into LLMs, multi-agent frameworks & system design', icon: '🤖' },
  { id: 'fulltime', title: 'Full-Time / Lead Engineer Role', duration: '30 min', desc: 'Detailed discussion for high-impact software engineering positions', icon: '💼' },
  { id: 'chat', title: 'Technical Coffee Chat', duration: '20 min', desc: 'Casual networking & technical collaboration exchange', icon: '☕' },
]

const TIMEZONES = [
  { label: 'IST (UTC+5:30) - Nagpur / India Standard Time', value: 'IST' },
  { label: 'EST (UTC-5:00) - New York / Eastern Time', value: 'EST' },
  { label: 'PST (UTC-8:00) - San Francisco / Pacific Time', value: 'PST' },
  { label: 'GMT (UTC+0:00) - London / Greenwich Mean Time', value: 'GMT' },
]

const TIME_SLOTS = [
  '09:30 AM', '11:00 AM', '01:30 PM', '03:00 PM', '04:30 PM', '06:00 PM', '07:30 PM', '09:00 PM'
]

// Generate dates for the next 12 days starting from tomorrow
function getAvailableDates() {
  const dates = []
  const today = new Date()
  
  for (let i = 1; i <= 12; i++) {
    const d = new Date(today)
    d.setDate(today.getDate() + i)
    // Exclude Sundays if desired, or keep all
    const dayOfWeek = d.toLocaleDateString('en-US', { weekday: 'short' })
    const month = d.toLocaleDateString('en-US', { month: 'short' })
    const dateNum = d.getDate()
    const fullISO = d.toISOString().split('T')[0]
    
    dates.push({
      fullISO,
      dayOfWeek,
      month,
      dateNum,
      isWeekend: dayOfWeek === 'Sat' || dayOfWeek === 'Sun'
    })
  }
  return dates
}

interface MeetingSchedulerProps {
  onClose?: () => void
  isModal?: boolean
}

export default function MeetingScheduler({ onClose, isModal = false }: MeetingSchedulerProps) {
  const availableDates = getAvailableDates()
  
  const [selectedTopic, setSelectedTopic] = useState<string>('recruiter')
  const [selectedDate, setSelectedDate] = useState<string>(availableDates[0].fullISO)
  const [selectedTime, setSelectedTime] = useState<string>('11:00 AM')
  const [timezone, setTimezone] = useState<string>('IST')
  
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [notes, setNotes] = useState('')

  const [bookingState, setBookingState] = useState<'idle' | 'booking' | 'confirmed'>('idle')

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setBookingState('booking')
    
    setTimeout(() => {
      setBookingState('confirmed')
    }, 1000)
  }

  const activeTopicObj = TOPICS.find(t => t.id === selectedTopic) || TOPICS[0]
  const activeDateObj = availableDates.find(d => d.fullISO === selectedDate) || availableDates[0]

  const downloadICS = () => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Dhruv Patil Portfolio Scheduler//EN
BEGIN:VEVENT
SUMMARY:${activeTopicObj.title} with Dhruv Patil
DESCRIPTION:Meeting regarding ${activeTopicObj.desc}. Notes: ${notes || 'N/A'}
LOCATION:Google Meet (https://meet.google.com/dhr-uvp-ai)
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.setAttribute('download', `Dhruv_Patil_Meeting_${selectedDate}.ics`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className={`w-full ${isModal ? 'max-w-3xl mx-auto' : ''}`}>
      {bookingState === 'confirmed' ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-8 sm:p-10 rounded-3xl glass-effect border border-emerald-500/30 bg-gradient-to-b from-emerald-950/20 via-black/80 to-black text-center space-y-6 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -z-10 pointer-events-none" />
          
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-[0_0_25px_rgba(16,185,129,0.25)]">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-emerald-400 font-bold">
              [ APPOINTMENT CONFIRMED ]
            </span>
            <h3 className="text-2xl sm:text-3xl font-display font-medium text-white">
              Meeting Booked with Dhruv Patil
            </h3>
            <p className="text-gray-300 text-sm max-w-md mx-auto font-sans">
              A calendar invitation & confirmation email have been logged for <span className="text-white font-semibold">{email || 'your email'}</span>.
            </p>
          </div>

          {/* Meeting Details Card */}
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 text-left max-w-lg mx-auto space-y-3 font-sans">
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <span className="text-xs text-gray-400 font-mono uppercase tracking-wider">Topic</span>
              <span className="text-sm text-white font-medium flex items-center gap-1.5">
                <span>{activeTopicObj.icon}</span> {activeTopicObj.title} ({activeTopicObj.duration})
              </span>
            </div>
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <span className="text-xs text-gray-400 font-mono uppercase tracking-wider">Date & Time</span>
              <span className="text-sm text-primary font-mono font-medium">
                {activeDateObj.dayOfWeek}, {activeDateObj.month} {activeDateObj.dateNum} @ {selectedTime} ({timezone})
              </span>
            </div>
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <span className="text-xs text-gray-400 font-mono uppercase tracking-wider">Platform</span>
              <span className="text-sm text-emerald-400 font-mono flex items-center gap-1.5">
                <Video className="w-4 h-4" /> Google Meet Video Call
              </span>
            </div>
            {company && (
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400 font-mono uppercase tracking-wider">Company</span>
                <span className="text-sm text-gray-200 font-medium">{company}</span>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={downloadICS}
              className="px-6 py-3 rounded-xl bg-primary text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-primary/90 transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(0,242,255,0.25)] active:scale-95 cursor-pointer"
            >
              <CalendarIcon className="w-4 h-4" /> Download .ICS Invite
            </button>
            <button
              onClick={() => setBookingState('idle')}
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-mono text-xs uppercase tracking-wider border border-white/10 transition-all cursor-pointer"
            >
              Book Another Slot
            </button>
            {onClose && (
              <button
                onClick={onClose}
                className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 font-mono text-xs uppercase tracking-wider border border-white/5 transition-all cursor-pointer"
              >
                Close
              </button>
            )}
          </div>
        </motion.div>
      ) : (
        <form onSubmit={handleBookingSubmit} className="glass-effect p-6 sm:p-8 md:p-10 rounded-3xl border border-white/10 space-y-8 relative overflow-hidden bg-black/60 backdrop-blur-xl">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary font-mono text-[10px] uppercase tracking-widest font-bold flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 animate-pulse" /> Direct Recruiter & Leader Scheduler
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-display font-medium text-white tracking-normal">
                Schedule a Call with Dhruv
              </h3>
              <p className="text-gray-400 text-sm mt-1 font-sans">
                Select a call purpose, pick an open date & time slot, and lock in a 1-on-1 meeting instantly.
              </p>
            </div>
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* 1. Topic Selection */}
          <div className="space-y-3">
            <label className="text-xs font-mono uppercase tracking-widest text-primary font-bold flex items-center gap-2">
              <span>Step 1:</span> Choose Meeting Purpose
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {TOPICS.map((topic) => {
                const isSelected = selectedTopic === topic.id
                return (
                  <button
                    type="button"
                    key={topic.id}
                    onClick={() => setSelectedTopic(topic.id)}
                    className={`p-4 rounded-2xl border text-left transition-all duration-300 relative cursor-pointer ${
                      isSelected
                        ? 'bg-primary/10 border-primary shadow-[0_0_20px_rgba(0,242,255,0.15)] text-white'
                        : 'bg-white/[0.02] border-white/5 hover:border-white/20 text-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xl">{topic.icon}</span>
                      <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-gray-300">
                        {topic.duration}
                      </span>
                    </div>
                    <p className="font-display font-medium text-sm text-white mt-2">{topic.title}</p>
                    <p className="text-xs text-gray-400 mt-1 line-clamp-2">{topic.desc}</p>
                  </button>
                )
              })}
            </div>
          </div>

          {/* 2. Date Picker */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono uppercase tracking-widest text-primary font-bold flex items-center gap-2">
                <span>Step 2:</span> Select Date
              </label>
              <span className="text-xs text-gray-400 font-mono flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 text-primary" /> Timezone:
              </span>
            </div>

            {/* Timezone Switcher */}
            <select
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2 text-xs text-white font-mono outline-none focus:border-primary transition-all cursor-pointer mb-2"
            >
              {TIMEZONES.map(tz => (
                <option key={tz.value} value={tz.value} className="bg-zinc-900 text-white">
                  {tz.label}
                </option>
              ))}
            </select>

            {/* Date Scroll Grid */}
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
              {availableDates.map((d) => {
                const isSelected = selectedDate === d.fullISO
                return (
                  <button
                    type="button"
                    key={d.fullISO}
                    onClick={() => setSelectedDate(d.fullISO)}
                    className={`p-2.5 sm:p-3 rounded-2xl border text-center transition-all duration-300 cursor-pointer ${
                      isSelected
                        ? 'bg-primary border-primary text-black font-bold shadow-[0_0_15px_rgba(0,242,255,0.3)] scale-105'
                        : 'bg-white/[0.03] border-white/5 hover:bg-white/[0.07] text-gray-300'
                    }`}
                  >
                    <p className={`font-mono text-[10px] uppercase tracking-wider ${isSelected ? 'text-black' : 'text-gray-400'}`}>
                      {d.dayOfWeek}
                    </p>
                    <p className="text-base sm:text-lg font-display font-bold leading-none my-1">
                      {d.dateNum}
                    </p>
                    <p className={`font-mono text-[9px] uppercase ${isSelected ? 'text-black/80' : 'text-gray-500'}`}>
                      {d.month}
                    </p>
                  </button>
                )
              })}
            </div>
          </div>

          {/* 3. Time Slot Picker */}
          <div className="space-y-3">
            <label className="text-xs font-mono uppercase tracking-widest text-primary font-bold flex items-center gap-2">
              <span>Step 3:</span> Choose Time Slot ({timezone})
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {TIME_SLOTS.map((slot) => {
                const isSelected = selectedTime === slot
                return (
                  <button
                    type="button"
                    key={slot}
                    onClick={() => setSelectedTime(slot)}
                    className={`py-2.5 px-3 rounded-xl border font-mono text-xs transition-all duration-300 cursor-pointer flex items-center justify-center gap-1.5 ${
                      isSelected
                        ? 'bg-secondary text-black font-bold border-secondary shadow-[0_0_15px_rgba(255,180,0,0.3)]'
                        : 'bg-white/[0.03] border-white/5 text-gray-300 hover:border-white/20'
                    }`}
                  >
                    <Clock className="w-3.5 h-3.5" />
                    {slot}
                  </button>
                )
              })}
            </div>
          </div>

          {/* 4. Attendee Details Form */}
          <div className="space-y-4 pt-2 border-t border-white/5">
            <label className="text-xs font-mono uppercase tracking-widest text-primary font-bold block">
              Step 4: Your Details
            </label>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase text-gray-400 tracking-wider flex items-center gap-1">
                  <User className="w-3 h-3 text-primary" /> Full Name *
                </span>
                <input
                  required
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Sarah Jenkins"
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-primary transition-all font-sans"
                />
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase text-gray-400 tracking-wider flex items-center gap-1">
                  <Mail className="w-3 h-3 text-primary" /> Work Email *
                </span>
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. s.jenkins@company.com"
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-primary transition-all font-sans"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase text-gray-400 tracking-wider flex items-center gap-1">
                  <Building className="w-3 h-3 text-primary" /> Company / Organization
                </span>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="e.g. AI Innovations Inc."
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-primary transition-all font-sans"
                />
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase text-gray-400 tracking-wider flex items-center gap-1">
                  Notes / Role Link
                </span>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Discussing Staff Generative AI Engineer Role"
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-primary transition-all font-sans"
                />
              </div>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={bookingState === 'booking'}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-primary via-cyan-400 to-secondary text-black font-mono font-bold text-xs uppercase tracking-widest hover:opacity-95 transition-all shadow-[0_0_25px_rgba(0,242,255,0.25)] flex items-center justify-center gap-2 active:scale-[0.99] cursor-pointer"
          >
            {bookingState === 'booking' ? (
              <span>Securing Slot...</span>
            ) : (
              <>
                <span>Confirm & Reserve Call Slot ({selectedTime} {timezone})</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      )}
    </div>
  )
}
