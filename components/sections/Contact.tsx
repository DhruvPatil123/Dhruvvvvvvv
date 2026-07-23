"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Mail, Phone, Globe, Calendar, MessageSquare, Zap } from 'lucide-react'
import MeetingScheduler from '@/components/MeetingScheduler'
import { useRecruiterStore } from '@/store/useRecruiterStore'

const CONTACT_EMAIL = 'sujalpatil8657231278@gmail.com'

type ContactResponse = {
  error?: string
  simulated?: boolean
}

export default function Contact() {
  const [activeTab, setActiveTab] = useState<'message' | 'schedule'>('message')
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [feedback, setFeedback] = useState('')
  const openRecruiterView = useRecruiterStore((state) => state.openRecruiterView)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    const name = formData.get('name')
    const email = formData.get('email')
    const message = formData.get('message')

    if (typeof name !== 'string' || typeof email !== 'string' || typeof message !== 'string') {
      return
    }

    setStatus('sending')
    setFeedback('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      })

      let data: ContactResponse = {}
      const contentType = response.headers.get('content-type')
      if (contentType && contentType.includes('application/json')) {
        data = await response.json() as ContactResponse
      } else {
        const text = await response.text()
        console.error('Non-JSON response received:', text)
      }

      if (!response.ok) {
        throw new Error(data.error ?? 'Unable to send message. Please try again.')
      }

      form.reset()
      setStatus('success')
      if (data.simulated) {
        setFeedback('Message simulated! To receive actual emails, configure RESEND_API_KEY in the AI Studio Settings.')
      } else {
        setFeedback('Message sent to Dhruv successfully.')
      }
      setTimeout(() => {
        setStatus('idle')
        setFeedback('')
      }, 8000)
    } catch (error) {
      setStatus('error')
      setFeedback(error instanceof Error ? error.message : 'Unable to send message')
    }
  }

  return (
    <section id="contact" className="relative w-full min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-24 md:py-32 lg:py-40">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div className="space-y-6">
          {/* Section Indicator */}
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary font-medium">
            [ 08 // CONTACT & CHANNELS ]
          </span>

          <motion.h2
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-display font-light text-white tracking-normal leading-tight"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-300 via-zinc-100 to-white italic font-light">
              Let&apos;s
            </span>{" "}
            <span className="font-normal text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-200 to-secondary animate-gradient">
              Connect
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            viewport={{ once: true }}
            className="text-gray-300 text-base md:text-lg leading-relaxed font-sans"
          >
            Whether you&apos;re looking to collaborate on an AI research venture, hire a
            dedicated Generative Model Engineer, or simply talk about agentic behaviors,
            my inbox is always open.
          </motion.p>

          <div className="space-y-6 pt-6">
            <div className="flex items-center gap-4 text-white group">
              <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/5 flex items-center justify-center group-hover:text-primary group-hover:border-primary/20 transition-all duration-300">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="text-gray-550 font-mono text-[10px] uppercase tracking-widest font-bold">Email Me</p>
                <p className="text-base md:text-lg font-display font-medium mt-0.5">{CONTACT_EMAIL}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-white group">
              <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/5 flex items-center justify-center group-hover:text-primary group-hover:border-primary/20 transition-all duration-300">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p className="text-gray-550 font-mono text-[10px] uppercase tracking-widest font-bold">Call Me</p>
                <p className="text-base md:text-lg font-display font-medium mt-0.5">+91 8857841863</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-white group">
              <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/5 flex items-center justify-center group-hover:text-primary group-hover:border-primary/20 transition-all duration-300">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <p className="text-gray-550 font-mono text-[10px] uppercase tracking-widest font-bold">Location</p>
                <p className="text-base md:text-lg font-display font-medium mt-0.5">Nagpur, Maharashtra, India</p>
              </div>
            </div>

            {/* Recruiter View Callout Badge */}
            <div className="pt-4">
              <button
                onClick={openRecruiterView}
                className="w-full p-4 rounded-2xl bg-cyan-950/40 hover:bg-cyan-900/30 border border-cyan-500/30 text-cyan-300 font-mono text-xs uppercase tracking-wider font-bold flex items-center justify-between transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-cyan-400" />
                  <span>In a hurry? Open 30s Recruiter Brief</span>
                </div>
                <span className="text-cyan-400 group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          {/* Tab Selection Controls */}
          <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-white/[0.03] border border-white/10 font-mono text-xs">
            <button
              onClick={() => setActiveTab('message')}
              className={`flex-1 py-3 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === 'message'
                  ? 'bg-primary text-black font-bold shadow-lg'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Direct Message</span>
            </button>
            <button
              onClick={() => setActiveTab('schedule')}
              className={`flex-1 py-3 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === 'schedule'
                  ? 'bg-secondary text-black font-bold shadow-lg'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>Interactive Call Scheduler</span>
            </button>
          </div>

          {/* Form or Scheduler */}
          {activeTab === 'schedule' ? (
            <MeetingScheduler />
          ) : (
            <div className="glass-effect p-6 sm:p-8 md:p-12 rounded-3xl border border-white/5">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-gray-400 font-mono text-[10px] uppercase tracking-widest font-bold ml-1">Name</label>
                    <input
                      required
                      name="name"
                      type="text"
                      placeholder="Your Name"
                      className="w-full bg-white/[0.03] border border-white/5 rounded-xl px-4 py-3.5 text-white outline-none focus:border-primary focus:ring-1 focus:ring-primary/25 focus:shadow-[0_0_15px_rgba(0,242,255,0.12)] transition-all duration-300 font-sans text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-gray-400 font-mono text-[10px] uppercase tracking-widest font-bold ml-1">Email</label>
                    <input
                      required
                      name="email"
                      type="email"
                      placeholder="your@email.com"
                      className="w-full bg-white/[0.03] border border-white/5 rounded-xl px-4 py-3.5 text-white outline-none focus:border-primary focus:ring-1 focus:ring-primary/25 focus:shadow-[0_0_15px_rgba(0,242,255,0.12)] transition-all duration-300 font-sans text-sm"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-gray-400 font-mono text-[10px] uppercase tracking-widest font-bold ml-1">Message</label>
                  <textarea
                    required
                    name="message"
                    rows={4}
                    placeholder="How can we collaborate?"
                    className="w-full bg-white/[0.03] border border-white/5 rounded-xl px-4 py-3.5 text-white outline-none focus:border-primary focus:ring-1 focus:ring-primary/25 focus:shadow-[0_0_15px_rgba(0,242,255,0.12)] transition-all duration-300 font-sans text-sm resize-none"
                  />
                </div>
                <motion.button
                  disabled={status === 'sending'}
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.985 }}
                  className={`w-full py-4 rounded-xl font-mono text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer ${
                    status === 'success'
                    ? 'bg-green-500 text-white'
                    : status === 'error'
                    ? 'bg-red-500 text-white'
                    : 'bg-primary text-black hover:bg-primary/80 hover:shadow-[0_0_20px_rgba(0,242,255,0.35)]'
                  }`}
                >
                  {status === 'idle' && <>Send Message <Send className="w-3.5 h-3.5" /></>}
                  {status === 'sending' && <span>Sending...</span>}
                  {status === 'success' && <span>Message Sent</span>}
                  {status === 'error' && <span>Try Again</span>}
                </motion.button>
                {feedback && (
                  <p className={`text-xs font-mono text-center mt-2 ${status === 'error' ? 'text-red-300' : 'text-green-350'}`}>
                    {"// "}{feedback}
                  </p>
                )}
              </form>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
