/**
 * Micro-Acoustic Interaction Sounds
 * Highly-curated, synthesized high-fidelity UI sounds using Web Audio API.
 * Synthesizing sounds locally guarantees zero network latency, absolute reliability,
 * and eliminates the need for hosting/loading heavy static audio assets.
 */

let audioCtx: AudioContext | null = null

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
 */
export function playTick() {
  const ctx = getAudioContext()
  if (!ctx) return

  try {
    const now = ctx.currentTime
    
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
    gainNode.connect(ctx.destination)
    
    osc.start(now)
    osc.stop(now + 0.05)

    // Add a ultra-short secondary metallic click to make it feel tactile
    const clickOsc = ctx.createOscillator()
    const clickGain = ctx.createGain()
    clickOsc.type = 'sine'
    clickOsc.frequency.setValueAtTime(3200, now)
    clickGain.gain.setValueAtTime(0.02, now)
    clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.01)

    clickOsc.connect(clickGain)
    clickGain.connect(ctx.destination)

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
 */
export function playPopover() {
  const ctx = getAudioContext()
  if (!ctx) return

  try {
    const now = ctx.currentTime
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
    gainNode.connect(ctx.destination)

    osc.start(now)
    osc.stop(now + 0.16)
  } catch (error) {
    console.warn('Audio playback failed', error)
  }
}

/**
 * Play a pristine, ambient electronic chime/notification.
 * Double tap of high-frequency crystal resonance, perfect for chatbot responses.
 */
export function playNotification() {
  const ctx = getAudioContext()
  if (!ctx) return

  try {
    const now = ctx.currentTime
    
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
    gain1.connect(ctx.destination)
    
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
    gain2.connect(ctx.destination)
    
    osc2.start(now + delay)
    osc2.stop(now + delay + 0.45)
  } catch (error) {
    console.warn('Audio playback failed', error)
  }
}
