import { jsPDF } from 'jspdf'

export type ResumeTheme = 'charcoal' | 'emerald' | 'cobalt';

export function downloadResume(theme: ResumeTheme = 'charcoal') {
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

  // 1. Personal Info Block (Centered Header)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(22)
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2])
  doc.text('DHRUV PATIL', leftMargin, y)
  
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.setTextColor(bodyColor[0], bodyColor[1], bodyColor[2])
  doc.text('Nagpur, India  |  sujalpatil8657231278@gmail.com  |  +91 88578 41863', leftMargin, y + 5.5)
  doc.text('Portfolio: dhruvvvvvvv.vercel.app  |  GitHub: github.com/DhruvPatil123  |  LinkedIn: linkedin.com/in/dhruv-patil-3816043b7', leftMargin, y + 10.5)
  
  y += 18

  // 2. Professional Summary
  addSectionHeader('Professional Summary')
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9.5)
  doc.setTextColor(bodyColor[0], bodyColor[1], bodyColor[2])
  
  const summaryText = "A Bachelor of Technology candidate in Artificial Intelligence at JD College of Engineering and Management, graduating in August 2028. Recently completed an internship at Indo-German Tool Room, gaining foundational industry exposure. Skilled in programming languages such as Java, Python, and C++, with a keen interest in applying these technical skills to AI-driven solutions. Strong academic focus and practical experience in Artificial Intelligence, contributing to a solid understanding of programming and problem-solving methodologies."
  
  const splitSummary = doc.splitTextToSize(summaryText, contentWidth)
  doc.text(splitSummary, leftMargin, y)
  y += (splitSummary.length * 4.2) + 3

  // 3. Education
  addSectionHeader('Education')
  
  // - B.Tech
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(10.5)
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2])
  doc.text('Artificial Intelligence (B.Tech / B.E.)', leftMargin, y)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9.5)
  doc.text('Aug 2025 - May 2028', rightMargin - doc.getTextWidth('Aug 2025 - May 2028'), y)
  
  y += 4.5
  doc.setFont('helvetica', 'italic')
  doc.setFontSize(9)
  doc.setTextColor(bodyColor[0], bodyColor[1], bodyColor[2])
  doc.text('J D College of Engineering and Management, Nagpur  |  Scored: 8.76 CGPA', leftMargin, y)
  
  y += 4.5
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(8.5)
  doc.text('Core Projects & Applications:', leftMargin + 3, y)
  
  const btechProjects = [
    "EncryptX: Cryptographic utility for file encryption and decryption built in Java.",
    "Readme.ai: Automated project parser that generates dynamic high-quality developer readmes.",
    "TenderScan.ai: Natural Language Processing system that parses and classifies bidding tenders.",
    "AI Resume Builder: Custom application generating customized industry-level resumes with AI guidance.",
    "VisionCraft.ai: Comprehensive engine generating state-of-the-art text-to-image and 2K/4K cinematic video outputs."
  ]
  
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8.5)
  btechProjects.forEach(proj => {
    y += 3.8
    doc.text('• ' + proj, leftMargin + 6, y)
  })
  
  y += 7

  // - CS Diploma
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(10.5)
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2])
  doc.text('Computer Science (Diploma)', leftMargin, y)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9.5)
  doc.text('Jul 2022 - May 2025', rightMargin - doc.getTextWidth('Jul 2022 - May 2025'), y)
  
  y += 4.5
  doc.setFont('helvetica', 'italic')
  doc.setFontSize(9)
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
  doc.setFontSize(8.5)
  diplomaProjects.forEach(proj => {
    y += 3.8
    doc.text('• ' + proj, leftMargin + 6, y)
  })

  y += 7

  // - 10th Pass
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(10.5)
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2])
  doc.text('Secondary Education (10th Pass)', leftMargin, y)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9.5)
  doc.text('Graduated 2022', rightMargin - doc.getTextWidth('Graduated 2022'), y)
  
  y += 4.5
  doc.setFont('helvetica', 'italic')
  doc.setFontSize(9)
  doc.setTextColor(bodyColor[0], bodyColor[1], bodyColor[2])
  doc.text('Yugantar High School, Sadar, Nagpur  |  Score: 81.00%', leftMargin, y)
  
  y += 8

  // 4. Work Experience
  addSectionHeader('Professional Experience')
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(10.5)
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2])
  doc.text('Python Development Intern', leftMargin, y)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9.5)
  doc.text('May 2024 - Jun 2024', rightMargin - doc.getTextWidth('May 2024 - Jun 2024'), y)
  
  y += 4.5
  doc.setFont('helvetica', 'italic')
  doc.setFontSize(9)
  doc.setTextColor(bodyColor[0], bodyColor[1], bodyColor[2])
  doc.text('Indo-German Tool Room (IGTR), Nagpur, Maharashtra', leftMargin, y)
  
  y += 4.5
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  const expDesc = "Gained practical engineering experience in writing robust scripts in Python, constructing responsive web elements with HTML and CSS, and collaborating on real-world industrial software integrations."
  const splitExp = doc.splitTextToSize(expDesc, contentWidth - 4)
  doc.text(splitExp, leftMargin + 3, y)
  y += (splitExp.length * 4) + 6

  // 5. Technical Skills
  addSectionHeader('Core Expertise & Technical Skills')
  
  const skillGroups = [
    { label: "Languages", skills: "Python, Java, C++, C#, C, JavaScript, TypeScript, SQL" },
    { label: "Web Frameworks", skills: "React, Node.js, Express.js, Next.js, HTML, CSS, Tailwind, Bootstrap" },
    { label: "AI & Databases", skills: "Agentic AI, RAG, LLMs, AI/ML Projects, PostgreSQL, Firebase, JDBC" },
    { label: "Tools & Systems", skills: "Git, GitHub, Vercel, Cryptography, Cybersecurity, Software Testing" }
  ]
  
  skillGroups.forEach(group => {
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(9)
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2])
    doc.text(group.label + ': ', leftMargin, y)
    
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(9)
    doc.setTextColor(bodyColor[0], bodyColor[1], bodyColor[2])
    doc.text(group.skills, leftMargin + 38, y)
    y += 4.8
  })
  
  y += 4

  // 6. Certifications
  addSectionHeader('Certifications')
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(10.5)
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2])
  doc.text('Gen AI, Deep Learning & Language Models', leftMargin, y)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9.5)
  doc.text('Oct 2025 - Apr 2026', rightMargin - doc.getTextWidth('Oct 2025 - Apr 2026'), y)
  
  y += 4.5
  doc.setFont('helvetica', 'italic')
  doc.setFontSize(9)
  doc.setTextColor(bodyColor[0], bodyColor[1], bodyColor[2])
  doc.text('Eduskills Foundation  |  In-depth study of artificial neural networks, generative logic, and LLM orchestration', leftMargin, y)

  // Save the constructed resume PDF
  const formattedTheme = theme.charAt(0).toUpperCase() + theme.slice(1)
  doc.save(`Dhruv_Patil_Resume_${formattedTheme}.pdf`)
}
