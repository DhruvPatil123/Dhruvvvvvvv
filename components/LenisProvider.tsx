"use client"

import React, { useEffect, useRef } from 'react'
import { ReactLenis } from '@studio-freight/react-lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger)

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<any>(null)

  useEffect(() => {
    const lenis = lenisRef.current?.lenis

    if (lenis) {
      // Connect ScrollTrigger to Lenis' scroll events
      lenis.on('scroll', ScrollTrigger.update)
    }

    return () => {
      if (lenis) {
        lenis.off('scroll', ScrollTrigger.update)
      }
      // Clean up ScrollTrigger instances on unmount/reload
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <ReactLenis ref={lenisRef} root>
      {children}
    </ReactLenis>
  )
}
