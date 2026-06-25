# 🌌 Portfolio of Dhruv Dinesh Patil

An interactive, premium, high-performance 3D portfolio showcasing academic standing, AI research projects, and accomplishments. Powered by **Next.js 15 (App Router)**, **React Three Fiber (Three.js)**, **Tailwind CSS**, and **Framer Motion**.

---

## ✨ Features & Aesthetic Choices

- **🌌 Immersive 3D Experience**: A interactive 3D particle landscape and floating elements powered by Three.js and `@react-three/fiber`.
- **✍️ Refined Typography**: Beautiful font hierarchy pairing **Space Grotesk** (for display/academic titles), **Inter** (for high-legibility body copy), and **JetBrains Mono** (for computational/syntax accents).
- **🔬 Premium Technical Layout**: Clean indicator badges, structured matrix layout, and micro-animations mirroring a state-of-the-art AI lab design.
- **📱 Fully Responsive & Fluid**: Optimized touch targets and adaptiveness on all screen sizes (mobile up to ultra-wide displays).
- **🤖 Built-in AI Chatbot**: Real-time interactive messaging node to learn more about Dhruv, built natively into the UI.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router, React 19)
- **3D Engine**: [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber/) & [@react-three/drei](https://github.com/pmndrs/drei)
- **Animations**: [Framer Motion](https://www.framer.com/motion/) (importing from `motion/react`)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with customized font variables
- **Iconography**: [Lucide React](https://lucide.dev/)

---

## 🚀 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (v18+ recommended) and `npm` installed.

### Installation

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
   Copy `.env.example` to `.env` or `.env.local` and configure your API keys (like `GEMINI_API_KEY` for the server-side chatbot proxy).
   ```bash
   cp .env.example .env.local
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. **Build for Production**:
   ```bash
   npm run build
   npm start
   ```

---

## 📁 Directory Structure

```text
├── app/                  # Next.js App Router (Layouts, Global Styles, Pages)
│   ├── api/              # Secure Server-Side Proxy API routes
│   ├── globals.css       # Tailwind entry styles & CSS custom rules
│   └── page.tsx          # Main entry page assembling the viewport
├── components/           # Reusable UI React Components
│   ├── ui/               # System primitive components
│   ├── sections/         # Beautiful custom page sections (Hero, About, Projects, etc.)
│   ├── Experience.tsx    # Three.js 3D scene elements & shaders
│   └── Chatbot.tsx       # Live conversational agent component
└── public/               # Static assets & document links
```

---

## 🤝 Let's Connect

- **Email**: [sujalpatil8657231278@gmail.com](mailto:sujalpatil8657231278@gmail.com)
- **GitHub**: [@DhruvPatil123](https://github.com/DhruvPatil123)
- **LinkedIn**: [Dhruv Patil](https://www.linkedin.com/in/dhruv-patil-3816043b7/)

---
*⚠️ Please verify critical deployment configurations independently before hosting on platforms like Vercel.*
