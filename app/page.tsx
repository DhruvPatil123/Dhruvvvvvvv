"use client"

import React, { useEffect } from 'react'
import dynamic from 'next/dynamic'
import Overlay from '@/components/Overlay'
import RomanSidebar from '@/components/RomanSidebar'
import BackgroundParallax from '@/components/BackgroundParallax'

const Scene = dynamic(() => import('@/components/Scene'), { ssr: false })
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
import LenisProvider from '@/components/LenisProvider'
import { useScrollStore } from '@/store/useScrollStore'
import { useChatStore } from '@/store/useChatStore'
import { useThemeStore } from '@/store/useThemeStore'

// Interactive overlays and preludes
import CursorTrail from '@/components/CursorTrail'
import AudioDock from '@/components/AudioDock'
import BootPreloader from '@/components/BootPreloader'
import FpsMonitor from '@/components/FpsMonitor'
import CommandPalette from '@/components/CommandPalette'
import RecruiterViewModal from '@/components/RecruiterViewModal'
import BackgroundSettingsDrawer from '@/components/BackgroundSettingsDrawer'


export default function Home() {
  const setScrollProgress = useScrollStore((state) => state.setScrollProgress)
  const setActiveSection = useScrollStore((state) => state.setActiveSection)
  const isChatOpen = useChatStore((state) => state.isOpen)
  const closeChat = useChatStore((state) => state.closeChat)
  const theme = useThemeStore((state) => state.theme)

  useEffect(() => {
    // Prevent the browser from automatically jumping to a hash section or restoring previous scroll position on reload
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
    window.scrollTo(0, 0)
  }, [])

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

  useEffect(() => {
    const sectionIds = ['hero', 'about', 'skills', 'work', 'credentials', 'achievements', 'experience', 'testimonials', 'contact']

    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3

      let active = 'hero'
      for (const id of sectionIds) {
        const el = document.getElementById(id)
        if (el) {
          const top = el.offsetTop
          const bottom = top + el.offsetHeight
          if (scrollPosition >= top && scrollPosition < bottom) {
            active = id
            break
          }
        }
      }

      // Handle edge cases
      if (window.scrollY < 100) {
        active = 'hero'
      } else if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 120) {
        active = 'contact'
      }

      setActiveSection(active)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    // Run once initially with a small delay to ensure elements are mounted
    const timer = setTimeout(handleScroll, 100)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(timer)
    }
  }, [setActiveSection])

  useEffect(() => {
    // Sync class list with current theme
    document.documentElement.classList.remove('theme-charcoal', 'theme-emerald', 'theme-cobalt')
    document.documentElement.classList.add(`theme-${theme}`)
  }, [theme])

  return (
    <LenisProvider>
      <main className="relative w-full min-h-screen">
        {/* Cinematic Preloader */}
        <BootPreloader />

        {/* Dynamic Cursor Stardust Trail */}
        <CursorTrail />

        {/* Ambient Drone controller */}
        <AudioDock />

        {/* Lightweight Telemetry FPS Monitor */}
        <FpsMonitor />

        {/* Dynamic Interactive Command Console */}
        <CommandPalette />

        {/* 30-Second Recruiter Fast View Overlay */}
        <RecruiterViewModal />

        {/* Environment & Aesthetics Settings Drawer */}
        <BackgroundSettingsDrawer />

        {/* 3D Background Scene */}
        <Scene />

        {/* Persistent Navigation */}
        <BackgroundParallax />
        <Overlay />
        <RomanSidebar />


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
    </LenisProvider>
  )
}
