/**
 * Micro-Acoustic Interaction Sounds
 * Highly-curated, synthesized high-fidelity UI sounds using Web Audio API.
 * Synthesizing sounds locally guarantees zero network latency, absolute reliability,
 * and eliminates the need for hosting/loading heavy static audio assets.
 */

let audioCtx: AudioContext | null = null
let currentPan = 0 // Stereo panning state updated via cursor tracking (-1.0 left to 1.0 right)

if (typeof window !== 'undefined') {
  window.addEventListener('mousemove', (e) => {
    // Map mouse X position to a stereo panning range [-1.0, 1.0]
    const x = e.clientX / window.innerWidth
    currentPan = (x * 2) - 1
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

/**
 * Play a high-fidelity retro-modern mechanical keyboard / mouse click.
 * Very fast, dry, high-pitched transient with exponential decay.
 * Panned dynamically depending on cursor coordinates.
 */
export function playTick() {
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
    // Fail silently to prevent interrupting UI flow
    console.warn('Audio playback failed', error)
  }
}

/**
 * Play a warm, elegant soft-slide popover sound.
 * Lower frequency, smooth decay, feels like opening a modern, padded physical compartment.
 * Panned dynamically depending on cursor coordinates.
 */
export function playPopover() {
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
 * Play a pristine, ambient electronic chime/notification.
 * Double tap of high-frequency crystal resonance, perfect for chatbot responses.
 * Panned dynamically depending on cursor coordinates.
 */
export function playNotification() {
  const ctx = getAudioContext()
  if (!ctx) return

  try {
    const now = ctx.currentTime
    const panner = ctx.createStereoPanner ? ctx.createStereoPanner() : null
    if (panner) {
      panner.pan.setValueAtTime(currentPan, now)
      panner.connect(ctx.destination)
    }
    
    // First chime (lower root)
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

    // Second chime (higher harmonic, slightly delayed for double-tap feeling)
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
 * Beautifully synthesizes an F Major 9 chord with deep warm analog-like drift, 
 * lowpass filtered to preserve standard ear-friendly frequencies.
 * High-value interactions evoke a spacious spatial environment.
 */
export function playAmbientPad() {
  const ctx = getAudioContext()
  if (!ctx) return

  try {
    const now = ctx.currentTime
    const duration = 4.5

    // F Major 9 Chord: F2 (deep bass foundation), C3 (solid fifth), A3 (warm third), E4 (celestial seventh), G4 (sweet ninth)
    const chordFreqs = [87.31, 130.81, 220.00, 329.63, 392.00]

    // Master swell and fade-out gain stage
    const masterGain = ctx.createGain()
    masterGain.gain.setValueAtTime(0.0, now)
    // Smooth 1.2s fade-in swell (attack)
    masterGain.gain.linearRampToValueAtTime(0.07, now + 1.2)
    // 1.0s organic sustain phase
    masterGain.gain.setValueAtTime(0.07, now + 2.2)
    // 2.3s graceful exponential decay (release)
    masterGain.gain.exponentialRampToValueAtTime(0.001, now + duration)

    // Connect spatial panning
    const panner = ctx.createStereoPanner ? ctx.createStereoPanner() : null
    if (panner) {
      // Slow stereo pan shift during swell
      panner.pan.setValueAtTime(currentPan * 0.4, now)
      panner.pan.linearRampToValueAtTime(currentPan, now + 2.5)
      masterGain.connect(panner)
      panner.connect(ctx.destination)
    } else {
      masterGain.connect(ctx.destination)
    }

    // Warm, low-pass filter to block harsh harmonic high-ends
    const filter = ctx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.setValueAtTime(650, now) // warm, round filter envelope
    filter.Q.setValueAtTime(1.0, now)
    filter.connect(masterGain)

    // Generate individual oscillators with subtle chorus detune
    chordFreqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator()
      const oscGain = ctx.createGain()

      // Alternating waveforms for layered analog complexity (sine for pure fundamental, triangle for warmth)
      osc.type = idx % 2 === 0 ? 'sine' : 'triangle'
      osc.frequency.setValueAtTime(freq, now)

      // Dynamic frequency drift (chorus/vibrato emulation)
      const driftAmount = idx % 2 === 0 ? 0.8 : -1.2
      osc.frequency.linearRampToValueAtTime(freq + driftAmount, now + duration)

      // Balance amplitudes (deeper notes get slightly more weight, triangle waves are quieter)
      let relativeVolume = 0.22
      if (idx === 0) relativeVolume = 0.35 // warm deep root bass boost
      if (osc.type === 'triangle') relativeVolume *= 0.4 // damp harsh triangle harmonics

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

