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
- Dynamic fallback layers querying resilient API proxies (Vercel & Render) or direct GraphQL queries to automatically display current global rank, streaks, and exact problem difficulties solved.

### 7. 🎨 Atmospheric Contrast & Monospace Accents
- **Breathable Layouts**: Maximized negative space (`py-32 md:py-48 lg:py-64`) between distinct sections like the Timeline, About, Skills, and Projects for a deliberate, spacious, and high-end editorial feel.
- **Consistent Typographic Contrasts**: Paired elegant, modern display headers with meticulous `font-mono` (JetBrains Mono) accents applied consistently to all precise data elements—including dates, stats, file badges, and ranking metrics.

### 8. ⚡ Premium Transitions & Tactile Interactive Feedback
- **Cubic-Bezier Motion**: Card hovers and buttons feature custom-tuned fluid motion transitions (`cubic-bezier(0.16, 1, 0.3, 1)`) for high-fidelity responses.
- **Tactile Active Clicks**: Added immediate tactile micro-scale-down feedback (`active:scale-[0.98]`) on buttons to deliver satisfying, physical responses to user actions.

### 9. 📱 Rich Open Graph (OG) Social Optimization
- Fully configured Open Graph and Twitter Card tags in Next.js metadata structures.
- Generates beautiful, customized social cards with precise descriptions, roles, and high-fidelity preview images when shared on LinkedIn, Twitter/X, or GitHub.

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







# Portfolio Fix Instructions

ROLE: You are implementing fixes on an existing AI/ML engineering portfolio website ("The Cognitive Edition" — Renaissance oil-painting backgrounds with neon 3D "artifact" thumbnails as the core design motif). Preserve this visual theme throughout. Do not redesign, restyle, or restructure anything that isn't explicitly listed below.

## Critical rules (apply to every phase)
- Never invent, guess, or auto-generate a name, date, statistic, link, or testimonial. If the correct value isn't unambiguous in the existing codebase, STOP and ask the user instead of picking one yourself.
- Never delete a project, section, or testimonial without flagging it first and getting explicit confirmation.
- After each phase, report back: which file(s) changed, what changed, and anything skipped pending user input.

## Phase 0 — Identity consistency (fix first; blocks everything else)
The site currently displays several different name variants across different sections (nav/logo, hero, footer), plus a contact-form email address that doesn't match any of them.
ACTION:
1. Search the codebase (case-insensitive) for every name variant and every email address used anywhere — components, metadata, config files, image alt text.
2. List every file and line where any variant appears. Do not edit anything yet.
3. Ask the user which single name and which email are the correct ones to use everywhere.
4. Once confirmed, replace every instance — including the page `<title>`, meta tags, and alt text — with the confirmed name and email.

## Phase 1 — Contradictory dates
The same degree entry (same institution, same CGPA) appears in two different sections with two different start dates.
ACTION: Locate both instances. Ask the user which date is correct. Make both sections match exactly once confirmed.

## Phase 2 — Unverified testimonial
At least one testimonial references a named project that does not exist anywhere in the current project grid.
ACTION:
1. Flag the specific mismatch to the user.
2. Ask whether to add a project card for the missing project, or edit the testimonial to reference an existing one.
3. List every testimonial author's name, role, and company found in the codebase, and ask the user to confirm each is a real person who consented to being quoted. Do not generate new testimonials to fill any gap.

## Phase 3 — Copy calibration (ask before finalizing exact wording)
- Check any self-title implying an established professional role against the user's actual current status (e.g., still completing a degree) — ask for accurate wording rather than assuming.
- Replace absolute marketing superlatives about security or scale (e.g., claims of total security or enterprise-grade capability) with a specific, true, technical detail already documented in that project's code or README. If no such detail exists, ask the user for it rather than softening the claim into vaguer marketing language.
- For any headline statistic shown without context (e.g., a raw leaderboard rank), add context that makes it meaningful — a percentile, or pairing it with a more interpretable stat that's already available — rather than presenting a large number in isolation.

## Phase 4 — Layout and technical bugs
1. Find and fix any place where fixed/sticky navigation visually overlaps scrolling body text. This should never happen at any viewport width.
2. Find any UI elements (e.g., tech-stack tags) that render illegible by default (blurred or low-contrast). Confirm whether that's an intentional hover/reveal state; if not, make them legible by default.
3. Check whether any dev-tool or builder UI elements (e.g., a code-editor toggle) are visible in the current build, and exclude them from production if so.
4. Audit text-over-image contrast across every section that uses a painting/photo background. Add a scrim, gradient, or semi-opaque panel behind text anywhere it sits on a busy or low-contrast region, targeting WCAG AA contrast.

## Phase 5 — Prove-it upgrades (only after Phases 0–4 are confirmed and resolved)
1. Expand the 2–3 strongest projects (ask the user which, if not obvious) into short case studies: problem → architecture/approach → one real trade-off decision → outcome → one planned improvement. Use only facts already present in the codebase (comments, READMEs, existing descriptions). Mark any genuinely missing metric as `[NEEDS REAL NUMBER]` — never fabricate one.
2. Add a live-demo link and a repo link to each project card if either already exists anywhere in the project data; otherwise insert an `[ADD LINK]` placeholder rather than a fake URL.
3. Link each testimonial author to a real profile URL if one already exists in the data; otherwise insert `[ADD LINK]`.

## Phase 6 — Mobile and performance
1. Verify the layout at common breakpoints (~375px, ~768px, ~1024px+). Fixed sidebar navigation and floating/parallax decorative elements are the highest-risk pieces — make sure they collapse into a working mobile layout with no overlap.
2. Check the file sizes of background/painting images. Compress or convert to a modern format (WebP/AVIF) if they're oversized.
3. Report performance and accessibility audit scores (e.g., Lighthouse) before and after changes.

## Phase 7 — Fast path for time-pressed reviewers
Add one persistent way to reach a condensed view of the essentials — name, title, tech stack, 2–3 one-line project summaries, and contact info — such as a "Quick View" toggle or a linked one-page resume, so a reviewer isn't required to scroll through the full themed experience to find the basics.

## Stop-and-ask checkpoints
Do not proceed past these without explicit user confirmation: Phase 0 (confirmed name and email), Phase 1 (confirmed date), Phase 2 (testimonial decision plus confirmation that authors are real), Phase 3 (exact replacement wording). All other phases may proceed automatically once those four are locked in.