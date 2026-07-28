"use client"

import React, { useEffect } from 'react'

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    let lenis: any = null

    async function initLenis() {
      if (typeof window === 'undefined') return

      try {
        const gsapModule = await import('gsap')
        const gsap: any = gsapModule.default || gsapModule
        const scrollTriggerModule = await import('gsap/ScrollTrigger')
        const ScrollTrigger: any = scrollTriggerModule.ScrollTrigger || scrollTriggerModule.default

        gsap.registerPlugin(ScrollTrigger)
        const LenisModule = await import('lenis')
        const Lenis: any = LenisModule.default || LenisModule

        lenis = new Lenis({
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
        })

        const handleScroll = () => {
          ScrollTrigger.update()
        }

        lenis.on('scroll', handleScroll)

        const updateTicker = (time: number) => {
          lenis?.raf(time * 1000)
        }

        gsap.ticker.add(updateTicker)
        gsap.ticker.lagSmoothing(0)

        return () => {
          lenis?.off('scroll', handleScroll)
          gsap.ticker.remove(updateTicker)
        }
      } catch (err) {
        console.warn('Lenis smooth scroll failed to initialize:', err)
      }
    }

    const cleanupPromise = initLenis()

    return () => {
      cleanupPromise.then((cleanup) => {
        if (typeof cleanup === 'function') cleanup()
        if (lenis) {
          lenis.destroy()
        }
      })
    }
  }, [])

  return <>{children}</>
}


