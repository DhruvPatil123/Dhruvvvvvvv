"use client"

import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import Experience from './Experience'

export default function Scene() {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen -z-10 bg-[#050505]">
      <Canvas
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, 5], fov: 75 }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={75} />

        <color attach="background" args={['#050505']} />

        <ambientLight intensity={0.4} />
        <spotLight position={[10, 20, 10]} angle={0.15} penumbra={1} intensity={2} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        <pointLight position={[0, 0, 3]} intensity={1.5} color="#00f2ff" />
        <directionalLight position={[0, 5, 5]} intensity={1.5} color="#7000ff" />

        <Suspense fallback={null}>
          <Environment preset="city" />
          <Experience />
        </Suspense>

        <EffectComposer>
          <Bloom
            intensity={1.5}
            luminanceThreshold={0.1}
            mipmapBlur
            luminanceSmoothing={0.9}
          />
          <Vignette eskil={false} offset={0.1} darkness={1.1} />
        </EffectComposer>

        <OrbitControls
          enablePan={false}
          enableZoom={false}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  )
}


