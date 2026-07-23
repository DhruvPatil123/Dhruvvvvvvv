/**
 * Micro-Acoustic Interaction Sounds
 * Highly-curated, synthesized high-fidelity UI sounds using Web Audio API.
 * Synthesizing sounds locally guarantees zero network latency, absolute reliability,
 * and eliminates the need for hosting/loading heavy static audio assets.
 */

import { useAudioStore } from '@/store/useAudioStore'

let audioCtx: AudioContext | null = null
let currentPan = 0 // Stereo panning state updated via cursor tracking (-1.0 left to 1.0 right)

if (typeof window !== 'undefined') {
  window.addEventListener('mousemove', (e) => {
    // Map mouse X position to a stereo panning range [-1.0, 1.0]
    const x = e.clientX / window.innerWidth
    currentPan = (x * 2) - 1
  })

  // Gracefully suspend sound context when tab is hidden, and resume when user returns
  document.addEventListener('visibilitychange', () => {
    if (!audioCtx) return
    if (document.hidden) {
      if (audioCtx.state === 'running') {
        audioCtx.suspend().catch(() => {})
      }
    } else {
      if (audioCtx.state === 'suspended') {
        audioCtx.resume().catch(() => {})
      }
    }
  })
}

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext
    if (AudioContextClass) {
      audioCtx = new AudioContextClass()
    }
  }
  // Resume context if suspended by browser security/interaction policy
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume()
  }
  return audioCtx
}

function checkIsMuted(): boolean {
  return useAudioStore.getState().isMuted
}

/**
 * Play a high-fidelity retro-modern mechanical keyboard / mouse click.
 * Very fast, dry, high-pitched transient with exponential decay.
 * Panned dynamically depending on cursor coordinates.
 */
export function playTick() {
  if (checkIsMuted()) return
  const ctx = getAudioContext()
  if (!ctx) return

  try {
    const now = ctx.currentTime
    const panner = ctx.createStereoPanner ? ctx.createStereoPanner() : null
    if (panner) {
      panner.pan.setValueAtTime(currentPan, now)
      panner.connect(ctx.destination)
    }
    
    // Create oscillator for the keypress transient
    const osc = ctx.createOscillator()
    const gainNode = ctx.createGain()
    
    osc.type = 'triangle'
    // Quick downward frequency sweep mimicking mechanical tactile spring tension release
    osc.frequency.setValueAtTime(1600, now)
    osc.frequency.exponentialRampToValueAtTime(350, now + 0.04)
    
    // Fast high-end transient boost
    gainNode.gain.setValueAtTime(0.06, now)
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.04)
    
    osc.connect(gainNode)
    if (panner) {
      gainNode.connect(panner)
    } else {
      gainNode.connect(ctx.destination)
    }
    
    osc.start(now)
    osc.stop(now + 0.05)

    // Add an ultra-short secondary metallic click to make it feel tactile
    const clickOsc = ctx.createOscillator()
    const clickGain = ctx.createGain()
    clickOsc.type = 'sine'
    clickOsc.frequency.setValueAtTime(3200, now)
    clickGain.gain.setValueAtTime(0.02, now)
    clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.01)

    clickOsc.connect(clickGain)
    if (panner) {
      clickGain.connect(panner)
    } else {
      clickGain.connect(ctx.destination)
    }

    clickOsc.start(now)
    clickOsc.stop(now + 0.015)
  } catch (error) {
    console.warn('Audio playback failed', error)
  }
}

/**
 * Play a warm, elegant soft-slide popover sound.
 * Lower frequency, smooth decay, feels like opening a modern, padded physical compartment.
 * Panned dynamically depending on cursor coordinates.
 */
export function playPopover() {
  if (checkIsMuted()) return
  const ctx = getAudioContext()
  if (!ctx) return

  try {
    const now = ctx.currentTime
    const panner = ctx.createStereoPanner ? ctx.createStereoPanner() : null
    if (panner) {
      panner.pan.setValueAtTime(currentPan, now)
      panner.connect(ctx.destination)
    }

    const osc = ctx.createOscillator()
    const gainNode = ctx.createGain()

    osc.type = 'sine'
    // Gentle warm frequency sweep
    osc.frequency.setValueAtTime(220, now)
    osc.frequency.exponentialRampToValueAtTime(440, now + 0.08)

    // Smooth soft volume curve
    gainNode.gain.setValueAtTime(0.08, now)
    gainNode.gain.linearRampToValueAtTime(0.12, now + 0.02)
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.15)

    osc.connect(gainNode)
    if (panner) {
      gainNode.connect(panner)
    } else {
      gainNode.connect(ctx.destination)
    }

    osc.start(now)
    osc.stop(now + 0.16)
  } catch (error) {
    console.warn('Audio playback failed', error)
  }
}

/**
 * Play a tactile Renaissance Parchment Rustle sound effect.
 * Synthesizes soft paper friction with filtered white noise and lowpass sweep.
 * Triggers on modal/drawer open.
 */
export function playParchmentOpen() {
  if (checkIsMuted()) return
  const ctx = getAudioContext()
  if (!ctx) return

  try {
    const now = ctx.currentTime
    const duration = 0.28
    const bufferSize = ctx.sampleRate * duration
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
    const data = buffer.getChannelData(0)

    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1
    }

    const noise = ctx.createBufferSource()
    noise.buffer = buffer

    const filter = ctx.createBiquadFilter()
    filter.type = 'bandpass'
    filter.frequency.setValueAtTime(400, now)
    filter.frequency.exponentialRampToValueAtTime(1400, now + 0.15)
    filter.frequency.exponentialRampToValueAtTime(250, now + duration)
    filter.Q.setValueAtTime(1.8, now)

    const gain = ctx.createGain()
    gain.gain.setValueAtTime(0.001, now)
    gain.gain.linearRampToValueAtTime(0.08, now + 0.04)
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration)

    const panner = ctx.createStereoPanner ? ctx.createStereoPanner() : null
    if (panner) {
      panner.pan.setValueAtTime(currentPan * 0.3, now)
      filter.connect(panner)
      panner.connect(ctx.destination)
    } else {
      filter.connect(ctx.destination)
    }

    noise.connect(filter)
    filter.connect(gain)

    noise.start(now)
    noise.stop(now + duration)
  } catch (error) {
    console.warn('Parchment sound failed', error)
  }
}

/**
 * Play a delicate Renaissance Quill Click / Scratch sound effect.
 * Synthesizes a wood pen tap on textured paper.
 * Triggers on button clicks or selection controls.
 */
export function playQuillClick() {
  if (checkIsMuted()) return
  const ctx = getAudioContext()
  if (!ctx) return

  try {
    const now = ctx.currentTime
    const osc = ctx.createOscillator()
    const gainNode = ctx.createGain()

    osc.type = 'sine'
    osc.frequency.setValueAtTime(950, now)
    osc.frequency.exponentialRampToValueAtTime(320, now + 0.025)

    gainNode.gain.setValueAtTime(0.04, now)
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.03)

    const panner = ctx.createStereoPanner ? ctx.createStereoPanner() : null
    if (panner) {
      panner.pan.setValueAtTime(currentPan, now)
      gainNode.connect(panner)
      panner.connect(ctx.destination)
    } else {
      gainNode.connect(ctx.destination)
    }

    osc.connect(gainNode)
    osc.start(now)
    osc.stop(now + 0.035)
  } catch (error) {
    console.warn('Quill click failed', error)
  }
}

/**
 * Play a pristine, ambient electronic chime/notification.
 * Double tap of high-frequency crystal resonance, perfect for chatbot responses.
 */
export function playNotification() {
  if (checkIsMuted()) return
  const ctx = getAudioContext()
  if (!ctx) return

  try {
    const now = ctx.currentTime
    const panner = ctx.createStereoPanner ? ctx.createStereoPanner() : null
    if (panner) {
      panner.pan.setValueAtTime(currentPan, now)
      panner.connect(ctx.destination)
    }
    
    const osc1 = ctx.createOscillator()
    const gain1 = ctx.createGain()
    osc1.type = 'sine'
    osc1.frequency.setValueAtTime(880, now) // A5
    osc1.frequency.exponentialRampToValueAtTime(1046.5, now + 0.15) // C6
    
    gain1.gain.setValueAtTime(0.0, now)
    gain1.gain.linearRampToValueAtTime(0.05, now + 0.03)
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.35)
    
    osc1.connect(gain1)
    if (panner) {
      gain1.connect(panner)
    } else {
      gain1.connect(ctx.destination)
    }
    
    osc1.start(now)
    osc1.stop(now + 0.4)

    const delay = 0.08
    const osc2 = ctx.createOscillator()
    const gain2 = ctx.createGain()
    osc2.type = 'sine'
    osc2.frequency.setValueAtTime(1318.5, now + delay) // E6
    osc2.frequency.exponentialRampToValueAtTime(1568, now + delay + 0.2) // G6
    
    gain2.gain.setValueAtTime(0.0, now + delay)
    gain2.gain.linearRampToValueAtTime(0.04, now + delay + 0.03)
    gain2.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.4)
    
    osc2.connect(gain2)
    if (panner) {
      gain2.connect(panner)
    } else {
      gain2.connect(ctx.destination)
    }
    
    osc2.start(now + delay)
    osc2.stop(now + delay + 0.45)
  } catch (error) {
    console.warn('Audio playback failed', error)
  }
}

/**
 * Play a luxurious, cinematic soft ambient wave pad.
 */
export function playAmbientPad() {
  if (checkIsMuted()) return
  const ctx = getAudioContext()
  if (!ctx) return

  try {
    const now = ctx.currentTime
    const duration = 4.5
    const chordFreqs = [87.31, 130.81, 220.00, 329.63, 392.00]

    const masterGain = ctx.createGain()
    masterGain.gain.setValueAtTime(0.0, now)
    masterGain.gain.linearRampToValueAtTime(0.07, now + 1.2)
    masterGain.gain.setValueAtTime(0.07, now + 2.2)
    masterGain.gain.exponentialRampToValueAtTime(0.001, now + duration)

    const panner = ctx.createStereoPanner ? ctx.createStereoPanner() : null
    if (panner) {
      panner.pan.setValueAtTime(currentPan * 0.4, now)
      panner.pan.linearRampToValueAtTime(currentPan, now + 2.5)
      masterGain.connect(panner)
      panner.connect(ctx.destination)
    } else {
      masterGain.connect(ctx.destination)
    }

    const filter = ctx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.setValueAtTime(650, now)
    filter.Q.setValueAtTime(1.0, now)
    filter.connect(masterGain)

    chordFreqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator()
      const oscGain = ctx.createGain()

      osc.type = idx % 2 === 0 ? 'sine' : 'triangle'
      osc.frequency.setValueAtTime(freq, now)

      const driftAmount = idx % 2 === 0 ? 0.8 : -1.2
      osc.frequency.linearRampToValueAtTime(freq + driftAmount, now + duration)

      let relativeVolume = 0.22
      if (idx === 0) relativeVolume = 0.35
      if (osc.type === 'triangle') relativeVolume *= 0.4

      oscGain.gain.setValueAtTime(relativeVolume, now)

      osc.connect(oscGain)
      oscGain.connect(filter)

      osc.start(now)
      osc.stop(now + duration)
    })
  } catch (error) {
    console.warn('Ambient pad synthesis failed', error)
  }
}

let ambientDroneOscillators: OscillatorNode[] = []
let ambientDroneGainNode: GainNode | null = null
let ambientDronePanNode: StereoPannerNode | null = null

export function startAmbientDrone() {
  const ctx = getAudioContext()
  if (!ctx) return

  if (ambientDroneGainNode) return

  try {
    const now = ctx.currentTime

    ambientDroneGainNode = ctx.createGain()
    ambientDroneGainNode.gain.setValueAtTime(0, now)

    ambientDronePanNode = ctx.createStereoPanner ? ctx.createStereoPanner() : null
    
    const filter = ctx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.setValueAtTime(550, now)
    filter.Q.setValueAtTime(1.0, now)

    filter.connect(ambientDroneGainNode)

    if (ambientDronePanNode) {
      ambientDroneGainNode.connect(ambientDronePanNode)
      ambientDronePanNode.connect(ctx.destination)
    } else {
      ambientDroneGainNode.connect(ctx.destination)
    }

    const chordFreqs = [87.31, 130.81, 220.00, 329.63, 392.00]

    chordFreqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator()
      const oscGain = ctx.createGain()

      osc.type = idx % 2 === 0 ? 'sine' : 'triangle'
      osc.frequency.setValueAtTime(freq, now)

      let relativeVolume = 0.12
      if (idx === 0) relativeVolume = 0.22
      if (osc.type === 'triangle') relativeVolume *= 0.25

      oscGain.gain.setValueAtTime(relativeVolume, now)

      osc.connect(oscGain)
      oscGain.connect(filter)

      osc.start(now)
      ambientDroneOscillators.push(osc)
    })

    if (typeof window !== 'undefined') {
      window.addEventListener('mousemove', (e) => {
        if (ambientDronePanNode && ctx.state !== 'closed') {
          const x = e.clientX / window.innerWidth
          const panVal = (x * 2) - 1
          try {
            ambientDronePanNode.pan.setTargetAtTime(panVal, ctx.currentTime, 0.1)
          } catch (_) {}
        }
      })
    }
  } catch (error) {
    console.warn('Ambient drone initialization failed', error)
  }
}

export function setAmbientDroneVolume(volume: number) {
  const ctx = getAudioContext()
  if (!ctx || !ambientDroneGainNode) return
  const now = ctx.currentTime
  try {
    ambientDroneGainNode.gain.cancelScheduledValues(now)
    ambientDroneGainNode.gain.setValueAtTime(ambientDroneGainNode.gain.value, now)
    ambientDroneGainNode.gain.linearRampToValueAtTime(volume, now + 0.5)
  } catch (_) {}
}

export function playCryptoTick() {
  if (checkIsMuted()) return
  const ctx = getAudioContext()
  if (!ctx) return

  try {
    const now = ctx.currentTime
    const osc = ctx.createOscillator()
    const gainNode = ctx.createGain()

    osc.type = 'square'
    osc.frequency.setValueAtTime(2200, now)

    gainNode.gain.setValueAtTime(0.015, now)
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.012)

    osc.connect(gainNode)
    gainNode.connect(ctx.destination)

    osc.start(now)
    osc.stop(now + 0.015)
  } catch (_) {}
}
