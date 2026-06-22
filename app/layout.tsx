import './globals.css'
import type { Metadata } from 'next'
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-sans',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://dhruvvvvvv.vercel.app'),
  title: {
    default: 'Dhruv Dinesh Patil | AI Researcher & Generative Model Engineer',
    template: '%s | Dhruv Dinesh Patil',
  },
  description: 'High-end 3D portfolio for Dhruv Dinesh Patil, an AI researcher focused on LLMs, Agentic AI, RAG systems, and high-performance web engineering.',
  keywords: [
    'Dhruv Dinesh Patil',
    'AI researcher',
    'Generative AI engineer',
    'LLM developer',
    'Agentic AI',
    'RAG systems',
    'Next.js portfolio',
  ],
  authors: [{ name: 'Dhruv Dinesh Patil' }],
  creator: 'Dhruv Dinesh Patil',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Dhruv Dinesh Patil | AI Researcher & Generative Model Engineer',
    description: 'Explore Dhruv Patil\'s AI, LLM, RAG, and high-performance web engineering portfolio.',
    url: '/',
    siteName: 'Dhruv Dinesh Patil Portfolio',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dhruv Dinesh Patil | AI Researcher & Generative Model Engineer',
    description: 'AI, LLM, RAG, and high-performance web engineering portfolio.',
    creator: '@DhruvPatil_18',
  },
  category: 'portfolio',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased text-white select-none">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
