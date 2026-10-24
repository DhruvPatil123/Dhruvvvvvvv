"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Mail, Phone, Globe, Zap, Copy, Check, ExternalLink } from 'lucide-react'
import { useRecruiterStore } from '@/store/useRecruiterStore'
import { PORTFOLIO_DATA } from '@/lib/portfolioData'

const CONTACT_EMAIL = PORTFOLIO_DATA.email

type ContactResponse = {
  error?: string
  simulated?: boolean
}

export default function Contact() {
  const [copied, setCopied] = useState(false)
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [feedback, setFeedback] = useState('')
  const openRecruiterView = useRecruiterStore((state) => state.openRecruiterView)

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(CONTACT_EMAIL)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

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
        setFeedback('Message logged. For instant replies, feel free to also reach out directly via email!')
      } else {
        setFeedback('Message delivered to Dhruv successfully.')
      }
      setTimeout(() => {
        setStatus('idle')
        setFeedback('')
      }, 7000)
    } catch (error) {
      setStatus('error')
      setFeedback(error instanceof Error ? error.message : 'Unable to send message')
    }
  }

  return (
    <section id="contact" className="relative w-full min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-24 md:py-32 lg:py-40">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Left Column: Contact Channels & Recruiter Trigger */}
        <div className="lg:col-span-5 space-y-6">
          {/* Section Indicator */}
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-400 font-semibold">
            [ 09 // CONTACT & INQUIRIES ]
          </span>

          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-display font-light text-white tracking-normal leading-tight"
          >
            <span className="text-zinc-400 italic font-serif">
              Let&apos;s
            </span>{" "}
            <span className="font-semibold text-white">
              Connect
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-gray-300 text-base leading-relaxed font-sans"
          >
            Whether you&apos;re looking to collaborate on an AI research project, recruit for an engineering role, or discuss agentic architectures, my inbox is always open.
          </motion.p>

          <div className="space-y-4 pt-2">
            {/* Direct Email with Quick Copy */}
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all flex items-center justify-between group">
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-primary shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-gray-400 font-mono text-[10px] uppercase tracking-wider font-semibold">Email</p>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="text-white hover:text-primary transition-colors text-sm font-medium truncate block"
                  >
                    {CONTACT_EMAIL}
                  </a>
                </div>
              </div>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="px-3 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/10 border border-white/10 text-xs font-mono text-gray-300 hover:text-white flex items-center gap-1.5 transition-all cursor-pointer shrink-0"
                title="Copy email to clipboard"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            {/* Phone */}
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center gap-3.5 group">
              <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-primary shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <p className="text-gray-400 font-mono text-[10px] uppercase tracking-wider font-semibold">Phone</p>
                <a
                  href={`tel:${PORTFOLIO_DATA.phone.replace(/\s+/g, '')}`}
                  className="text-white hover:text-primary transition-colors text-sm font-medium"
                >
                  {PORTFOLIO_DATA.phone}
                </a>
              </div>
            </div>

            {/* Location */}
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center gap-3.5 group">
              <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-primary shrink-0">
                <Globe className="w-4 h-4" />
              </div>
              <div>
                <p className="text-gray-400 font-mono text-[10px] uppercase tracking-wider font-semibold">Location</p>
                <p className="text-white text-sm font-medium">{PORTFOLIO_DATA.location}</p>
              </div>
            </div>

            {/* Social Links Row */}
            <div className="pt-2 flex flex-wrap gap-2">
              <a
                href={PORTFOLIO_DATA.socials.github}
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-2 rounded-xl bg-white/[0.03] hover:bg-white/10 border border-white/10 text-xs font-mono text-gray-300 hover:text-white flex items-center gap-1.5 transition-all"
              >
                <span>GitHub</span>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>
              <a
                href={PORTFOLIO_DATA.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-2 rounded-xl bg-white/[0.03] hover:bg-white/10 border border-white/10 text-xs font-mono text-gray-300 hover:text-white flex items-center gap-1.5 transition-all"
              >
                <span>LinkedIn</span>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>
              <a
                href={PORTFOLIO_DATA.socials.leetcode}
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-2 rounded-xl bg-white/[0.03] hover:bg-white/10 border border-white/10 text-xs font-mono text-gray-300 hover:text-white flex items-center gap-1.5 transition-all"
              >
                <span>LeetCode</span>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>
            </div>

            {/* Recruiter View Callout */}
            <div className="pt-2">
              <button
                type="button"
                onClick={openRecruiterView}
                className="w-full p-4 rounded-2xl bg-cyan-950/30 hover:bg-cyan-900/40 border border-cyan-500/30 hover:border-cyan-400/50 text-cyan-300 font-mono text-xs uppercase tracking-wider font-semibold flex items-center justify-between transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <Zap className="w-4 h-4 text-cyan-400" />
                  <span>Recruiter Shortlist (30s Executive Summary)</span>
                </div>
                <span className="text-cyan-400 group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Clean Direct Message Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="lg:col-span-7"
        >
          <div className="glass-effect p-6 sm:p-8 md:p-10 rounded-3xl border border-white/10 bg-black/40 shadow-2xl">
            <div className="mb-6 pb-4 border-b border-white/10 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-display font-medium text-white">Send a Message</h3>
                <p className="text-xs text-gray-400 font-mono mt-0.5">Direct transmission to Dhruv</p>
              </div>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" title="Available for opportunities" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-gray-400 font-mono text-[10px] uppercase tracking-widest font-semibold ml-1">
                    Your Name
                  </label>
                  <input
                    required
                    name="name"
                    type="text"
                    placeholder="Jane Doe"
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all font-sans text-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-gray-400 font-mono text-[10px] uppercase tracking-widest font-semibold ml-1">
                    Your Email
                  </label>
                  <input
                    required
                    name="email"
                    type="email"
                    placeholder="jane@company.com"
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all font-sans text-sm"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-gray-400 font-mono text-[10px] uppercase tracking-widest font-semibold ml-1">
                  Message
                </label>
                <textarea
                  required
                  name="message"
                  rows={5}
                  placeholder="Tell me about your team, project, or collaboration idea..."
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all font-sans text-sm resize-none"
                />
              </div>

              <motion.button
                disabled={status === 'sending'}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className={`w-full py-3.5 rounded-xl font-mono text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  status === 'success'
                    ? 'bg-emerald-500 text-white'
                    : status === 'error'
                    ? 'bg-red-500 text-white'
                    : 'bg-primary text-black hover:bg-primary/90'
                }`}
              >
                {status === 'idle' && (
                  <>
                    <span>Send Message</span>
                    <Send className="w-3.5 h-3.5" />
                  </>
                )}
                {status === 'sending' && <span>Sending Transmission...</span>}
                {status === 'success' && <span>Message Sent Successfully</span>}
                {status === 'error' && <span>Error Sending — Try Again</span>}
              </motion.button>

              {feedback && (
                <p className={`text-xs font-mono text-center pt-1 ${status === 'error' ? 'text-red-400' : 'text-emerald-400'}`}>
                  {"// "}{feedback}
                </p>
              )}
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
