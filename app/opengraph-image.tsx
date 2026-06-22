import { ImageResponse } from 'next/og'

export const alt = 'Dhruv Dinesh Patil portfolio'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #050505 0%, #111827 52%, #25005f 100%)',
          color: 'white',
          padding: 72,
        }}
      >
        <div style={{ fontSize: 34, letterSpacing: 8, color: '#00f2ff', marginBottom: 28 }}>
          AI RESEARCHER · GENERATIVE MODEL ENGINEER
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', fontSize: 92, fontWeight: 900, lineHeight: 0.95 }}>
          <div style={{ display: 'flex' }}>DHRUV</div>
          <div style={{ display: 'flex' }}>DINESH PATIL</div>
        </div>
        <div style={{ fontSize: 34, color: '#d1d5db', marginTop: 32, maxWidth: 880 }}>
          LLMs, Agentic AI, RAG systems, and high-performance web engineering.
        </div>
      </div>
    ),
    size
  )
}
