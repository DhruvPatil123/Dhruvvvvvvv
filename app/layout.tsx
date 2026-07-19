import './globals.css'
import type { Metadata } from 'next'
import { Inter, Cormorant_Garamond, JetBrains_Mono } from 'next/font/google'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-sans',
})

const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
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
    description: 'High-end 3D portfolio for Dhruv Dinesh Patil, an AI researcher focused on LLMs, Agentic AI, RAG systems, and high-performance web engineering.',
    url: 'https://dhruvvvvvv.vercel.app',
    siteName: 'Dhruv Dinesh Patil Portfolio',
    locale: 'en_US',
    type: 'profile',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Dhruv Dinesh Patil | AI Researcher & Generative Model Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dhruv Dinesh Patil | AI Researcher & Generative Model Engineer',
    description: 'High-end 3D portfolio for Dhruv Dinesh Patil, an AI researcher focused on LLMs, Agentic AI, RAG systems, and high-performance web engineering.',
    creator: '@DhruvPatil_18',
    images: ['/opengraph-image'],
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
    <html lang="en" className={`${inter.variable} ${cormorantGaramond.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased text-white select-none">
        {children}
      </body>
    </html>
  )
}
