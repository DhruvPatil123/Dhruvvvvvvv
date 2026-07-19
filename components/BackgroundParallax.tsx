"use client"

import React, { useEffect, useState, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { useScrollStore } from '@/store/useScrollStore'

const SECTION_BACKGROUNDS: { [key: string]: string } = {
  hero: '/renaissance_hero_bg.jpg',
  about: '/renaissance_portrait_mask.jpg',
  skills: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&q=80&w=1200', // Celestial Renaissance mural
  work: '/renaissance_library.jpg',
  achievements: 'https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?auto=format&fit=crop&q=80&w=1200', // Gold leaf fine art canvas
  credentials: 'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&q=80&w=1200', // Italian palazzo ceiling fresco
  experience: '/renaissance_tech.jpg',
  testimonials: 'https://images.unsplash.com/photo-1580136579312-94651dfd596d?auto=format&fit=crop&q=80&w=1200', // Classical botanical painting
  contact: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=1200', // Classic statue in dark gallery
}

export default function BackgroundParallax() {
  const activeSection = useScrollStore((state) => state.activeSection)
  const { scrollY } = useScroll()
  
  // Create slow continuous floating motions for elements
  const yBg = useTransform(scrollY, [0, 1000], [0, -100])
  const ySkateboard = useTransform(scrollY, [0, 1000], [50, -150])
  const yShoppingBag = useTransform(scrollY, [0, 1000], [-80, 120])
  const yVial = useTransform(scrollY, [0, 1000], [20, -180])
  const opacityHeroElements = useTransform(scrollY, [0, 500], [1, 0])

  return (
    <div className="fixed inset-0 w-screen h-screen -z-30 pointer-events-none select-none overflow-hidden bg-[#030303]">
      {/* Layer 1: Parallax active painting backdrop with high-end vibrancy and brightness */}
      <motion.div style={{ y: yBg }} className="absolute inset-0 w-full h-[115%]">
        {Object.entries(SECTION_BACKGROUNDS).map(([secId, imgSrc]) => {
          const isActive = activeSection === secId
          return (
            <div
              key={secId}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                isActive ? 'opacity-[0.52] scale-100 blur-none' : 'opacity-0 scale-[1.03] blur-sm'
              }`}
            >
              <Image
                src={imgSrc}
                alt={`${secId} background painting`}
                fill
                priority={secId === 'hero'}
                className="object-cover brightness-[1.25] saturate-[1.35] contrast-[1.1]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#030303]/85 via-transparent to-[#030303]/85" />
            </div>
          )
        })}
      </motion.div>

      {/* Layer 2: Subtle textured overlay across all layers */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff04_1px,transparent_1px)] [background-size:16px_16px] opacity-50 mix-blend-overlay" />

      {/* Layer 3: Curated Museum-Style Framed Artifacts - Blends modern assets elegantly */}
      <motion.div 
        style={{ opacity: opacityHeroElements }} 
        className="absolute inset-0 w-full h-full pointer-events-none hidden md:block"
      >
        {/* Floating Neon Pink Skateboard */}
        <motion.div
          style={{ y: ySkateboard }}
          animate={{
            y: [0, 12, -12, 0],
            rotate: [3, 5, 2, 3],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute left-[4%] lg:left-[12%] xl:left-[18%] top-[15%] md:top-[18%] w-40 md:w-56 border border-pink-500/20 bg-black/60 backdrop-blur-xl rounded-2xl p-3 shadow-[0_20px_50px_rgba(236,72,153,0.15)] flex flex-col gap-2 pointer-events-auto group hover:border-pink-500/40 transition-colors duration-500"
        >
          <div className="relative w-full h-24 md:h-36 overflow-hidden rounded-lg bg-[#050505]">
            <Image
              src="/pink_skateboard.jpg"
              alt="Floating Skateboard"
              fill
              className="object-contain brightness-[1.1] saturate-[1.2] group-hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
          <div className="flex flex-col gap-0.5 px-1">
            <span className="font-mono text-[8px] md:text-[9px] tracking-[0.2em] text-pink-400 font-bold">ARTIFACT_01 // SECURE_DECK</span>
            <span className="font-sans text-[10px] text-zinc-400 font-medium">Cognitive Skateboard</span>
          </div>
        </motion.div>

        {/* Floating Neon Pink Designer Shopping Bag */}
        <motion.div
          style={{ y: yShoppingBag }}
          animate={{
            y: [0, -15, 12, 0],
            rotate: [-3, -5, -2, -3],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute right-[4%] lg:right-[8%] top-[38%] md:top-[32%] w-40 md:w-56 border border-pink-500/20 bg-black/60 backdrop-blur-xl rounded-2xl p-3 shadow-[0_20px_50px_rgba(236,72,153,0.15)] flex flex-col gap-2 pointer-events-auto group hover:border-pink-500/40 transition-colors duration-500"
        >
          <div className="relative w-full h-24 md:h-36 overflow-hidden rounded-lg bg-[#050505]">
            <Image
              src="/pink_shopping_bag.jpg"
              alt="Floating Shopping Bag"
              fill
              className="object-contain brightness-[1.1] saturate-[1.2] group-hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
          <div className="flex flex-col gap-0.5 px-1">
            <span className="font-mono text-[8px] md:text-[9px] tracking-[0.2em] text-pink-400 font-bold">ARTIFACT_02 // NEON_VESSEL</span>
            <span className="font-sans text-[10px] text-zinc-400 font-medium">Designer Synthetic Bag</span>
          </div>
        </motion.div>

        {/* Floating Purple magic alchemy vial / flask */}
        <motion.div
          style={{ y: yVial }}
          animate={{
            y: [0, 10, -15, 0],
            rotate: [2, -2, 3, 2],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute left-[8%] lg:left-[18%] xl:left-[22%] bottom-[12%] md:bottom-[15%] w-36 md:w-48 border border-purple-500/20 bg-black/60 backdrop-blur-xl rounded-2xl p-3 shadow-[0_20px_50px_rgba(168,85,247,0.15)] flex flex-col gap-2 pointer-events-auto group hover:border-purple-500/40 transition-colors duration-500"
        >
          <div className="relative w-full h-20 md:h-28 overflow-hidden rounded-lg bg-[#050505]">
            <Image
              src="/purple_vial.jpg"
              alt="Floating Magic Vial"
              fill
              className="object-contain brightness-[1.1] saturate-[1.2] group-hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
          <div className="flex flex-col gap-0.5 px-1">
            <span className="font-mono text-[8px] md:text-[9px] tracking-[0.2em] text-purple-400 font-bold">ARTIFACT_03 // ALCHEMY_VESSEL</span>
            <span className="font-sans text-[10px] text-zinc-400 font-medium">Generative Core Elixir</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
