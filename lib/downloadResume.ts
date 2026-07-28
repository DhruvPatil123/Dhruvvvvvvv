export type ResumeTheme = 'charcoal' | 'emerald' | 'cobalt';
export type ResumeFocus = 'ai' | 'fullstack' | 'standard';

export async function downloadResume(
  theme: ResumeTheme = 'charcoal',
  focus: ResumeFocus = 'standard'
) {
  const { jsPDF } = await import('jspdf')
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  })
  
  // Color palette definition based on chosen theme
  const primaryColor = [17, 24, 39]     // Deep charcoal
  const bodyColor = [55, 65, 81]        // Elegant slate-gray
  const dividerColor = [229, 231, 235]   // Light gray line
  
  let accentColor = [26, 86, 219]      // Default Royal Cobalt
  if (theme === 'charcoal') {
    accentColor = [75, 85, 99]         // Slate Charcoal
  } else if (theme === 'emerald') {
    accentColor = [16, 122, 87]        // Emerald Green
  } else if (theme === 'cobalt') {
    accentColor = [26, 86, 219]        // Royal Cobalt
  }
  
  let y = 18
  const leftMargin = 18
  const rightMargin = 192
  const contentWidth = rightMargin - leftMargin

  // Header separator function
  const addSectionHeader = (title: string) => {
    y += 3
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(10.5)
    doc.setTextColor(accentColor[0], accentColor[1], accentColor[2])
    doc.text(title.toUpperCase(), leftMargin, y)
    
    y += 2
    doc.setDrawColor(dividerColor[0], dividerColor[1], dividerColor[2])
    doc.setLineWidth(0.3)
    doc.line(leftMargin, y, rightMargin, y)
    y += 5
  }

  // 1. Personal Info Block (Centered Header with Tailored Subtitle)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(20)
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2])
  
  let headerTitle = 'DHRUV PATIL'
  if (focus === 'ai') {
    headerTitle = 'DHRUV PATIL — AI & LLM Specialist'
  } else if (focus === 'fullstack') {
    headerTitle = 'DHRUV PATIL — Full-Stack & Cloud Architect'
  }
  
  doc.text(headerTitle, leftMargin, y)
  
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8.5)
  doc.setTextColor(bodyColor[0], bodyColor[1], bodyColor[2])
  doc.text('Nagpur, India  |  sujalpatil8657231278@gmail.com  |  +91 88578 41863', leftMargin, y + 5)
  doc.text('Portfolio: dhruvvvvvvv.vercel.app  |  GitHub: github.com/DhruvPatil123  |  LinkedIn: linkedin.com/in/dhruv-patil-3816043b7', leftMargin, y + 9.5)
  
  y += 17

  // 2. Tailored Professional Summary
  addSectionHeader('Professional Summary')
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.setTextColor(bodyColor[0], bodyColor[1], bodyColor[2])
  
  let summaryText = "A Bachelor of Technology candidate in Artificial Intelligence at JD College of Engineering and Management, graduating in August 2028. Recently completed an internship at Indo-German Tool Room, gaining foundational industry exposure. Skilled in programming languages such as Java, Python, and C++, with a keen interest in applying these technical skills to AI-driven solutions. Strong academic focus and practical experience in Artificial Intelligence, contributing to a solid understanding of programming and problem-solving methodologies."

  if (focus === 'ai') {
    summaryText = "B.Tech candidate in Artificial Intelligence specializing in Generative AI, Multi-Agent Orchestration, RAG Architectures, and Fine-Tuning. Proficient in PyTorch, Python, Gemini 2.0 tool calling, vector databases, and autonomous AI agents. Architect of production engines including VisionCraft.ai (Text-to-Video generation), TenderScan.ai (NLP contract intelligence), and DockMind (RAG File Search)."
  } else if (focus === 'fullstack') {
    summaryText = "Full-Stack Developer & Cloud Systems Specialist with expertise in Next.js 15, React 19, TypeScript, Node.js, and cloud database architectures. Skilled in building high-throughput web applications, REST/GraphQL APIs, microservices, Dockerized deployments, and robust web security tools like EncryptX, SchemaForge.AI, and AutoForge.AI."
  }
  
  const splitSummary = doc.splitTextToSize(summaryText, contentWidth)
  doc.text(splitSummary, leftMargin, y)
  y += (splitSummary.length * 4) + 3

  // 3. Education
  addSectionHeader('Education')
  
  // - B.Tech
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(10)
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2])
  doc.text('Artificial Intelligence (B.Tech / B.E.)', leftMargin, y)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.text('Aug 2025 - May 2028', rightMargin - doc.getTextWidth('Aug 2025 - May 2028'), y)
  
  y += 4.5
  doc.setFont('helvetica', 'italic')
  doc.setFontSize(8.5)
  doc.setTextColor(bodyColor[0], bodyColor[1], bodyColor[2])
  doc.text('J D College of Engineering and Management, Nagpur  |  Scored: 8.76 CGPA', leftMargin, y)
  
  y += 4.5
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(8.5)
  doc.text('Highlighted Core Projects & Applications:', leftMargin + 3, y)
  
  let btechProjects = [
    "EncryptX: Cryptographic utility for file encryption and decryption built in Java.",
    "Readme.ai: Automated project parser that generates dynamic high-quality developer readmes.",
    "TenderScan.ai: Natural Language Processing system that parses and classifies bidding tenders.",
    "AI Resume Builder: Custom application generating customized industry-level resumes with AI guidance.",
    "VisionCraft.ai: Comprehensive engine generating state-of-the-art text-to-image and 2K/4K cinematic video outputs."
  ]

  if (focus === 'ai') {
    btechProjects = [
      "VisionCraft.ai: Multimodal engine generating 2K/4K cinematic video and text-to-image outputs.",
      "TenderScan.ai: NLP system parsing, indexing, and classifying complex bidding tenders.",
      "DockMind: RAG document chatbot utilizing vector embeddings and context chunking.",
      "Raincrew.ai: Multi-agent AI feedback loop framework reducing software syntax bugs by 78%.",
      "Readme.ai: Automated repository parser producing technical AI-curated documentation."
    ]
  } else if (focus === 'fullstack') {
    btechProjects = [
      "AutoForge.AI: Autonomous full-stack application builder with real-time UI code preview.",
      "SchemaForge.AI: Natural language relational SQL database schema compiler & ERD visualizer.",
      "EncryptX: Hardware-accelerated AES-256 cryptographic utility for multi-file encryption.",
      "WaterFlow: High-throughput telemetry dashboard tracking hydraulic flow analytics.",
      "ResuNova: Next.js 15 AI-powered career resume generator with real-time ATS scoring."
    ]
  }
  
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8.2)
  btechProjects.forEach(proj => {
    y += 3.6
    doc.text('• ' + proj, leftMargin + 6, y)
  })
  
  y += 6.5

  // - CS Diploma
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(10)
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2])
  doc.text('Computer Science (Diploma)', leftMargin, y)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.text('Jul 2022 - May 2025', rightMargin - doc.getTextWidth('Jul 2022 - May 2025'), y)
  
  y += 4.5
  doc.setFont('helvetica', 'italic')
  doc.setFontSize(8.5)
  doc.setTextColor(bodyColor[0], bodyColor[1], bodyColor[2])
  doc.text('NIT Polytechnic, Nagpur-Mahurzari, Nagpur, Maharashtra', leftMargin, y)
  
  y += 4.5
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(8.5)
  doc.text('Key Projects:', leftMargin + 3, y)
  
  const diplomaProjects = [
    "Jarvis: Voice-controlled interactive customized personal assistant using modern API layers.",
    "Flappy Bird: Dynamic game application mimicking authentic physics and touch-based interactions."
  ]
  
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8.2)
  diplomaProjects.forEach(proj => {
    y += 3.6
    doc.text('• ' + proj, leftMargin + 6, y)
  })

  y += 6.5

  // - 10th Pass
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(10)
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2])
  doc.text('Secondary Education (10th Pass)', leftMargin, y)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.text('Graduated 2022', rightMargin - doc.getTextWidth('Graduated 2022'), y)
  
  y += 4.5
  doc.setFont('helvetica', 'italic')
  doc.setFontSize(8.5)
  doc.setTextColor(bodyColor[0], bodyColor[1], bodyColor[2])
  doc.text('Yugantar High School, Sadar, Nagpur  |  Score: 81.00%', leftMargin, y)
  
  y += 7.5

  // 4. Work Experience
  addSectionHeader('Professional Experience')
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(10)
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2])
  doc.text('Python & Systems Intern', leftMargin, y)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.text('May 2024 - Jun 2024', rightMargin - doc.getTextWidth('May 2024 - Jun 2024'), y)
  
  y += 4.5
  doc.setFont('helvetica', 'italic')
  doc.setFontSize(8.5)
  doc.setTextColor(bodyColor[0], bodyColor[1], bodyColor[2])
  doc.text('Indo-German Tool Room (IGTR), Nagpur, Maharashtra', leftMargin, y)
  
  y += 4.5
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8.5)
  const expDesc = focus === 'ai'
    ? "Engineered Python automation scripts and data ingestion pipelines, integrating NLP classification logic and web dashboard components for industrial software applications."
    : focus === 'fullstack'
    ? "Constructed full-stack web modules using HTML, CSS, JavaScript, and Python backends. Collaborated on database query optimizations and production deployment workflows."
    : "Gained practical engineering experience in writing robust scripts in Python, constructing responsive web elements with HTML and CSS, and collaborating on real-world industrial software integrations."
    
  const splitExp = doc.splitTextToSize(expDesc, contentWidth - 4)
  doc.text(splitExp, leftMargin + 3, y)
  y += (splitExp.length * 3.8) + 5.5

  // 5. Technical Skills
  addSectionHeader('Core Expertise & Technical Skills')
  
  let skillGroups = [
    { label: "AI & Analytics", skills: "Python, LLM, RAG, Agentic AI, PyTorch, TensorFlow, Vector DBs" },
    { label: "Web & Cloud", skills: "React 19, Next.js 15, Node.js, TypeScript, Java, PostgreSQL, Supabase" },
    { label: "DevOps & Systems", skills: "Docker, Kubernetes, GitHub Actions CI/CD, Git, C++, Linux" }
  ]

  if (focus === 'ai') {
    skillGroups = [
      { label: "AI / LLM & Agents", skills: "Gemini 2.0 API, RAG, Agentic Loops, LangChain, LlamaIndex, PyTorch, Vector DBs" },
      { label: "Data & Core ML", skills: "Python, Pandas, NumPy, OpenCV, Computer Vision, Prompt Engineering, Fine-Tuning" },
      { label: "Full-Stack Infra", skills: "Next.js, FastAPI, Node.js, TypeScript, Docker, Vercel, C++, Git" }
    ]
  } else if (focus === 'fullstack') {
    skillGroups = [
      { label: "Frontend Engineering", skills: "Next.js 15, React 19, TypeScript, Tailwind CSS v4, Framer Motion, Redux" },
      { label: "Backend & Databases", skills: "Node.js, Express, PostgreSQL, Drizzle ORM, Supabase, Firebase, WebSockets" },
      { label: "DevOps & Security", skills: "Docker, Kubernetes, GitHub Actions, Cloud Run, Linux, AES-256 Encryption, C++" }
    ]
  }
  
  skillGroups.forEach(group => {
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(8.5)
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2])
    doc.text(group.label + ': ', leftMargin, y)
    
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8.5)
    doc.setTextColor(bodyColor[0], bodyColor[1], bodyColor[2])
    doc.text(group.skills, leftMargin + 38, y)
    y += 4.5
  })
  
  y += 3.5

  // 6. Certifications
  addSectionHeader('Certifications')
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(10)
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2])
  doc.text('Gen AI, Deep Learning & Language Models', leftMargin, y)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.text('Oct 2025 - Apr 2026', rightMargin - doc.getTextWidth('Oct 2025 - Apr 2026'), y)
  
  y += 4.5
  doc.setFont('helvetica', 'italic')
  doc.setFontSize(8.5)
  doc.setTextColor(bodyColor[0], bodyColor[1], bodyColor[2])
  doc.text('Eduskills Foundation  |  In-depth study of artificial neural networks, generative logic, and LLM orchestration', leftMargin, y)

  // Save the constructed resume PDF with focus name
  const formattedTheme = theme.charAt(0).toUpperCase() + theme.slice(1)
  const focusLabel = focus === 'ai' ? 'AI_LLM_Focus' : focus === 'fullstack' ? 'FullStack_Focus' : 'Standard'
  doc.save(`Dhruv_Patil_Resume_${focusLabel}_${formattedTheme}.pdf`)
}

