"use client"

import React, { useEffect } from 'react'
import dynamic from 'next/dynamic'
import Overlay from '@/components/Overlay'
import Footer from '@/components/Footer'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Skills from '@/components/sections/Skills'
import Projects from '@/components/sections/Projects'
import Credentials from '@/components/sections/Credentials'
import Achievements from '@/components/sections/Achievements'
import Timeline from '@/components/sections/Timeline'
import Testimonials from '@/components/sections/Testimonials'
import Contact from '@/components/sections/Contact'
import Chatbot from '@/components/Chatbot'
import { useScrollStore } from '@/store/useScrollStore'
import { useChatStore } from '@/store/useChatStore'

const Scene = dynamic(() => import('@/components/Scene'), { ssr: false })

export default function Home() {
  const setScrollProgress = useScrollStore((state) => state.setScrollProgress)
  const isChatOpen = useChatStore((state) => state.isOpen)
  const closeChat = useChatStore((state) => state.closeChat)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = Math.max(0, Math.min(1, scrollTop / scrollHeight))
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [setScrollProgress])

  return (
    <main className="relative w-full min-h-screen">
      {/* 3D Background */}
      <Scene />

      {/* Persistent Navigation */}
      <Overlay />

      {/* Content Layers */}
      <div className="relative z-10 w-full flex flex-col">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Credentials />
        <Achievements />
        <Timeline />
        <Testimonials />
        <Contact />
        <Footer />
      </div >

      {/* Chatbot Assistant */}
      <Chatbot isOpen={isChatOpen} onClose={closeChat} />
    </main>
  )
}
