# 🌌 Dhruv Dinesh Patil | Interactive 3D Portfolio

An immersive, premium, high-performance 3D portfolio showcasing academic standing, AI research projects, and interactive engineering capabilities. Built using **Next.js 15 (App Router)**, **React Three Fiber (Three.js)**, **Tailwind CSS**, and **Framer Motion**.

---

## ✨ Features & Interactive Core

### 1. 🎨 Interactive Project Playgrounds & Sandboxes
For top-tier projects, visitors can interact with fully functional mini-sandboxes directly inside their inspect modals:
- **VisionCraft.AI (Procedural Art Synthesizer)**: Enter custom visual prompts (e.g., *neon cyberpunk monolith*, *emerald forest vortex*) and watch the AI simulator compile custom-hashed seeds to render dynamic, responsive procedural vector (SVG) graphics in real time.
- **EncryptX (AES-256 Binary Stream Pipeline)**: Drag and drop any small `.txt` file directly onto the container, or click to load a mock system secrets stream. Watch live binary matrix grids ripple, transition through structural cryptographic pipeline stages (SubBytes, ShiftRows, MixColumns, AddRoundKey), and toggle encryption states in real time.

### 2. 🎵 Real-Time Stereo Panning & Interactive Soundscapes
The site features a custom high-fidelity audio engine (`/lib/sounds.ts`) with stereo panning dynamically tied to cursor coordinates:
- **Cursor-Tracked Panning**: Mouse X-coordinate movement dynamically shifts audio balance between `-1.0` (far left) and `1.0` (far right).
- **Tactile Sound Effects**: Includes ultra-short mechanical key click transients, smooth popover slide sounds, and pristine electronic crystal chimes.
- **Cinematic Ambient Pad Swell**: Interactive elements evoke a luxurious, cinematic F Major 9 chord synthesized dynamically with warm analog-drift lowpass filters and organic, multi-second stereo decay.

### 3. 📄 Themeable Dynamic Resume Downloads
The resume downloading module integrates on-the-fly customizable styles:
- **Theme Selection**: Visitors can choose between three distinctive visual signatures: **Charcoal Obsidian**, **Emerald Aurora**, and **Cobalt Abyssal**.
- **Dynamic Download**: Generates a high-quality stylized PDF conforming instantly to the selected theme's signature color palette.

### 4. 🤖 Secure Server-Side Gemini Chatbot Node
- An intelligent conversational AI chatbot integrated directly into the layout.
- Powered by a secure, server-side Next.js route proxying the Gemini API to safeguard sensitive API secrets while offering high-speed real-time responses.

### 5. 🪐 Immersive 3D Canvas Atmosphere
- A beautiful, fluid particle landscape powered by `@react-three/fiber` and `@react-three/drei`.
- Elegant camera drifts and micro-interactions creating high-contrast depth behind a minimal, editorial layout.

### 6. 📊 Live-Synchronized LeetCode Dashboard
- Fully automated frontend-to-backend pipeline integration fetching real-time LeetCode statistics.
- Dynamic fallback layers querying resilient API proxies (Vercel & Render) or direct GraphQL queries to automatically display current global rank (now **370,720**), streaks, and exact problem difficulties solved.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 15+ (App Router, React 19)
- **3D Graphics**: `@react-three/fiber` & `@react-three/drei` (Three.js wrapper)
- **Animations**: Framer Motion (imported from `motion/react` for buttery-smooth entries and transitions)
- **Audio Synthesizer**: Web Audio API (procedural oscillator generation, stereo panner nodes, and custom resonance filter chains)
- **Styling**: Tailwind CSS (fully responsive, touch-friendly density layouts)
- **Icons**: Lucide React

---

## 🚀 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (v18+ recommended) and `npm` installed.

### Installation & Run

1. **Clone the repository**:
   ```bash
   git clone https://github.com/DhruvPatil123/rebuilt-3d-site.git
   cd rebuilt-3d-site
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up Environment Variables**:
   Create a `.env.local` file at the root and input your private server-side key (never prefix with `NEXT_PUBLIC_`):
   ```env
   GEMINI_API_KEY=your_google_gemini_api_key_here
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

5. **Build for Production**:
   ```bash
   npm run build
   npm start
   ```

---

## 📁 Directory Structure

```text
├── app/                  # Next.js App Router (Layouts, Global Styles, Pages)
│   ├── api/              # Secure Server-Side Proxy API routes (Gemini Agent)
│   ├── globals.css       # Tailwind entry styles & CSS custom rules
│   └── page.tsx          # Main entry page assembling the viewport
├── components/           # Reusable UI React Components
│   ├── ui/               # System primitive components
│   ├── sections/         # Beautiful custom page sections (Hero, About, Projects, etc.)
│   ├── Experience.tsx    # Three.js 3D particle scene elements
│   └── Chatbot.tsx       # Live conversational agent component
├── lib/                  # Utility libraries
│   ├── sounds.ts         # Web Audio API engine & stereo cursor panning logic
│   └── downloadResume.ts # Contextual theme-based PDF generation logic
└── public/               # Static assets & resume document templates
```

---

## 🤝 Let's Connect

- **Email**: [sujalpatil8657231278@gmail.com](mailto:sujalpatil8657231278@gmail.com)
- **GitHub**: [@DhruvPatil123](https://github.com/DhruvPatil123)
- **LinkedIn**: [Dhruv Patil](https://www.linkedin.com/in/dhruv-patil-3816043b7/)
- **LeetCode**: [Dhruv_Patil_18](https://leetcode.com/u/Dhruv_Patil_18/) (Global Rank: **370,720** | **360+** solved challenges)

---
*⚠️ Please independently verify critical deployment configurations and keys before hosting on hosting platforms.*
