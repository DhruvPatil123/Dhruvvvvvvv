"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'

interface HeroPortraitAssetProps {
  className?: string
  interactive?: boolean
}

export default function HeroPortraitAsset({ className = '', interactive = true }: HeroPortraitAssetProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div 
      className={`relative flex items-center justify-center select-none ${className}`}
      onMouseEnter={() => interactive && setIsHovered(true)}
      onMouseLeave={() => interactive && setIsHovered(false)}
    >
      {/* 
        1. Royal Amethyst & Electric Cyan Studio Vignette
        Provides photographic depth behind the silhouette matching the palette.
      */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[460px] md:w-[560px] h-[380px] sm:h-[520px] md:h-[620px] rounded-full pointer-events-none transition-all duration-700"
        style={{
          background: isHovered
            ? 'radial-gradient(circle at 50% 45%, rgba(168,85,247,0.22) 0%, rgba(0,240,255,0.1) 45%, rgba(0,0,0,0) 75%)'
            : 'radial-gradient(circle at 50% 45%, rgba(126,34,206,0.14) 0%, rgba(0,240,255,0.05) 45%, rgba(0,0,0,0) 75%)',
          filter: 'blur(50px)',
        }}
      />

      {/* 
        2. High-Contrast Monochrome Editorial Portrait Silhouette with Amethyst & Cyan Rim Light
        - Side profile of engineer looking right
        - Natural braided hair texture
        - Textured high-collar corduroy/pleated jacket in rich jet black obsidian
        - Royal Amethyst and Electric Cyan subtle rim lighting
      */}
      <motion.div 
        animate={{ scale: isHovered ? 1.02 : 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-[300px] xs:w-[350px] sm:w-[440px] md:w-[520px] lg:w-[580px] h-[380px] xs:h-[440px] sm:h-[540px] md:h-[620px] lg:h-[680px] flex items-end justify-center overflow-hidden"
      >
        <svg 
          viewBox="0 0 500 600" 
          className="w-full h-full object-contain filter drop-shadow-[0_20px_50px_rgba(0,0,0,0.95)]"
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Royal Amethyst & Electric Cyan rim highlight */}
            <linearGradient id="editorialRim" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#c084fc" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#7e22ce" stopOpacity="0.25" />
            </linearGradient>

            {/* Core body gradient: Ultra-deep matte obsidian with studio directional key light */}
            <linearGradient id="editorialBody" x1="30%" y1="0%" x2="70%" y2="100%">
              <stop offset="0%" stopColor="#1f2024" />
              <stop offset="30%" stopColor="#141518" />
              <stop offset="70%" stopColor="#0b0c0e" />
              <stop offset="100%" stopColor="#050506" />
            </linearGradient>

            {/* Specular jacket highlight gradient (pure grayscale) */}
            <linearGradient id="jacketShade" x1="0%" y1="20%" x2="100%" y2="90%">
              <stop offset="0%" stopColor="#2c2d33" stopOpacity="0.9" />
              <stop offset="40%" stopColor="#1c1d22" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#0c0d10" stopOpacity="0.98" />
            </linearGradient>

            {/* Base seamless bottom fadeout mask */}
            <linearGradient id="bottomFade" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="80%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0" />
            </linearGradient>

            <mask id="fadeMask">
              <rect x="0" y="0" width="500" height="600" fill="url(#bottomFade)" />
            </mask>
          </defs>

          <g mask="url(#fadeMask)">
            {/* Deep Ambient Base Shadow */}
            <path
              d="M 170 110 Q 230 40 330 65 Q 400 90 415 170 Q 425 240 375 300 Q 410 370 455 460 Q 480 520 490 600 L 110 600 Q 120 500 135 440 Q 155 350 170 280 Z"
              fill="#000000"
              opacity="0.9"
            />

            {/* Main Upper Torso & Structured Jacket (Matching reference corduroy/pleats) */}
            <path
              d="M 125 450 C 140 380 180 340 220 330 C 240 325 260 325 285 335 C 330 355 385 390 435 440 C 470 480 485 540 495 600 L 105 600 C 110 550 118 495 125 450 Z"
              fill="url(#editorialBody)"
              stroke="#27272a"
              strokeWidth="1.2"
            />

            {/* Fine Pleat & Fabric Texture Lines (Exact reproduction of reference jacket) */}
            <g opacity="0.3" stroke="rgba(255,255,255,0.3)" strokeWidth="1">
              <path d="M 155 460 Q 175 510 190 600" />
              <path d="M 170 458 Q 192 512 210 600" />
              <path d="M 185 455 Q 210 515 230 600" />
              <path d="M 200 452 Q 228 518 248 600" />
              <path d="M 215 450 Q 245 520 268 600" />
              <path d="M 232 450 Q 262 522 286 600" />
              <path d="M 248 450 Q 280 525 305 600" />
              <path d="M 266 452 Q 298 528 324 600" />
              <path d="M 285 455 Q 318 530 342 600" />
              <path d="M 305 460 Q 338 532 360 600" />
              <path d="M 325 465 Q 355 535 378 600" />
              <path d="M 346 472 Q 375 538 396 600" />
              <path d="M 368 480 Q 395 540 415 600" />
            </g>

            {/* High Structured Stand Collar */}
            <path
              d="M 215 330 C 225 305 245 285 270 280 C 295 285 315 305 325 330 C 295 342 245 342 215 330 Z"
              fill="url(#jacketShade)"
              stroke="#3f3f46"
              strokeWidth="1.2"
            />
            {/* Collar Clean Stitch Line (Monochrome) */}
            <path
              d="M 212 334 C 245 348 295 348 328 334"
              stroke="rgba(255,255,255,0.4)"
              strokeWidth="1"
              strokeDasharray="2 3"
            />

            {/* Neck & Jaw Profile in Natural Grayscale */}
            <path
              d="M 235 290 C 235 250 250 215 260 190 C 285 195 310 215 310 260 C 310 280 295 295 285 310 Z"
              fill="url(#editorialBody)"
            />

            {/* Head Silhouette in Sharp 3/4 Editorial Profile */}
            <path
              d="M 225 150 C 215 110 230 70 270 55 C 315 40 365 55 385 95 C 400 125 402 165 385 205 C 370 235 345 255 320 265 C 295 270 270 260 250 245 C 235 225 228 190 225 150 Z"
              fill="url(#editorialBody)"
            />

            {/* Natural Braided Hair Silhouette & Volume (Photographic Editorial Style) */}
            <g fill="#07080a" stroke="#121316" strokeWidth="1">
              <path d="M 230 140 C 210 120 205 95 225 75 C 245 55 275 45 300 45 C 330 45 355 55 375 75 C 385 85 390 100 392 115 C 375 105 355 100 330 102 C 300 105 270 120 250 142 Z" />
              {/* Back Cornrow / Braid Texture Locks */}
              <path d="M 210 85 Q 185 95 175 125 Q 168 150 178 175 Q 188 195 205 205 C 215 185 220 160 225 140 Z" fill="#0c0d10" />
              <path d="M 175 125 Q 155 140 150 168 Q 148 195 165 218 Q 180 235 200 240 C 208 220 212 195 210 170 Z" fill="#08090b" />
              <path d="M 150 170 Q 135 190 135 215 Q 138 240 158 258 C 175 250 188 235 195 215 Z" fill="#050607" />
              {/* Top Hair Highlights (Grayscale Hair Texture) */}
              <path d="M 260 55 Q 290 50 320 54" stroke="rgba(255,255,255,0.25)" strokeWidth="1" fill="none" />
              <path d="M 250 72 Q 285 64 325 68" stroke="rgba(255,255,255,0.2)" strokeWidth="1" fill="none" />
              <path d="M 240 90 Q 280 80 320 84" stroke="rgba(255,255,255,0.18)" strokeWidth="1" fill="none" />
            </g>

            {/* Profile Facial Ridge with Natural Studio Light (Grayscale, No Color) */}
            <path
              d="M 345 90 C 362 105 378 128 385 150 C 388 160 395 170 392 178 C 388 185 378 188 375 195 C 372 205 378 212 372 220 C 365 228 350 235 342 240 C 328 250 310 255 295 258"
              fill="none"
              stroke="url(#editorialRim)"
              strokeWidth="2.2"
              strokeLinecap="round"
            />

            {/* Silver Earring (Just like in the reference image) */}
            <g transform="translate(285, 185)">
              <path
                d="M 0 0 C 12 -5 20 5 18 20 C 16 32 6 38 -2 35 C -8 32 -10 20 -8 10 Z"
                fill="#18181b"
                stroke="#27272a"
                strokeWidth="1.2"
              />
              {/* Polished Silver Hoop Earring */}
              <circle cx="5" cy="24" r="5" fill="#f4f4f5" stroke="#71717a" strokeWidth="0.8" />
              <circle cx="5" cy="24" r="2.2" fill="#18181b" />
            </g>

            {/* Natural Specular Eye Rim (Photographic Catchlight) */}
            <circle cx="360" cy="155" r="1.5" fill="#ffffff" />
          </g>
        </svg>
      </motion.div>
    </div>
  )
}
