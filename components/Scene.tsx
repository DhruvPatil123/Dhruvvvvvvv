"use client"

import React, { Suspense, Component, ReactNode, useEffect, useState, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera, Environment } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import { useThemeStore } from '@/store/useThemeStore'
import { useScrollStore } from '@/store/useScrollStore'
import Experience from './Experience'

// Robust Error Boundary to isolate 3D failures and prevent site-wide blank screen crashes
interface ErrorBoundaryProps {
  children: ReactNode
  fallback: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

class SceneErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.warn("3D Canvas error caught gracefully:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback
    }
    return this.props.children
  }
}

export default function Scene() {
  const theme = useThemeStore((state) => state.theme)
  const setIsCanvasVisible = useScrollStore((state) => state.setIsCanvasVisible)
  const [webglSupported, setWebglSupported] = useState<boolean | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Premium, atmospheric colors tailored for each active theme
  const fogColor = theme === 'charcoal' ? '#140e0a' : theme === 'emerald' ? '#03140f' : '#010612'
  const fallbackBg = theme === 'charcoal' 
    ? 'from-[#140e0a] to-[#060403]' 
    : theme === 'emerald' 
    ? 'from-[#03140f] to-[#010503]' 
    : 'from-[#010612] to-[#000206]'

  const pointLightColor = theme === 'charcoal' ? '#ffaa44' : theme === 'emerald' ? '#10b981' : '#00f2ff'
  const directionalLightColor = theme === 'charcoal' ? '#d4a373' : theme === 'emerald' ? '#34d399' : '#7000ff'

  useEffect(() => {
    // Detect WebGL capability safely in the client browser context
    try {
      const canvas = document.createElement('canvas')
      const supportsWebGL = !!(
        window.WebGLRenderingContext && 
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
      )
      setWebglSupported(supportsWebGL)
    } catch (e) {
      setWebglSupported(false)
    }
  }, [])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let isIntersecting = true

    const updateVisibility = () => {
      // Pause if the container is scrolled completely out of view, or if the browser tab is hidden
      setIsCanvasVisible(isIntersecting && !document.hidden)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        isIntersecting = entry.isIntersecting
        updateVisibility()
      },
      { threshold: 0.01 }
    )

    observer.observe(container)

    const handleVisibilityChange = () => {
      updateVisibility()
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      observer.unobserve(container)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [setIsCanvasVisible])

  // Render a clean, premium static backdrop during detection or as a safe WebGL fallback
  const fallbackStaticBackdrop = (
    <div className={`fixed top-0 left-0 w-screen h-screen -z-10 bg-gradient-to-b ${fallbackBg}`}>
      {/* Abstract light orb to simulate three.js lighting on fallback */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] rounded-full bg-[#00f2ff]/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-[50vw] h-[50vw] max-w-[500px] max-h-[500px] rounded-full bg-[#7000ff]/3 blur-[100px] pointer-events-none" />
    </div>
  )

  if (webglSupported === null) {
    return fallbackStaticBackdrop
  }

  if (!webglSupported) {
    return fallbackStaticBackdrop
  }

  return (
    <SceneErrorBoundary fallback={fallbackStaticBackdrop}>
      <div ref={containerRef} className="fixed top-0 left-0 w-screen h-screen -z-10 bg-transparent pointer-events-none">
        <Canvas
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          camera={{ position: [0, 0, 5], fov: 75 }}
        >
          <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={75} />

          {/* Dynamic Volumetric Depth Fog (Point 10) */}
          <fog attach="fog" args={[fogColor, 4.2, 11.5]} />

          <ambientLight intensity={0.4} />
          <spotLight position={[10, 20, 10]} angle={0.15} penumbra={1} intensity={2} castShadow />
          <pointLight position={[-10, -10, -10]} intensity={0.5} />
          <pointLight position={[0, 0, 3]} intensity={1.5} color={pointLightColor} />
          <directionalLight position={[0, 5, 5]} intensity={1.5} color={directionalLightColor} />

          <Suspense fallback={null}>
            <Environment preset="city" />
            <Experience />
          </Suspense>

          <EffectComposer>
            <Bloom
              intensity={1.2}
              luminanceThreshold={0.15}
              mipmapBlur
              luminanceSmoothing={0.95}
            />
            {/* Deepened vignette to isolate and focus visual energy into the center (Point 13) */}
            <Vignette eskil={false} offset={0.2} darkness={1.25} />
          </EffectComposer>
        </Canvas>
      </div>
    </SceneErrorBoundary>
  )
}
