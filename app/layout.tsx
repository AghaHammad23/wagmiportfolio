import type { Metadata } from 'next'
import { Bricolage_Grotesque, Plus_Jakarta_Sans, Orbitron, Anton } from 'next/font/google'
import './globals.css'
import Providers from './components/Providers'
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import Navbar from './components/Navbar'
import Footer from './components/Footer'

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700', '800'],
  variable: '--font-bricolage',
})

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-jakarta',
})

const anton = Anton({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-anton',
})

const orbitron = Orbitron({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-orbitron',
})

export const metadata: Metadata = {
  title: 'WAGMI',
  description:
    'Scripts, recording, editing, distribution, and weekly optimization — we run the entire content operation on 60 minutes of your time a week, so you stop creating content that gets views and start creating content that gets paid.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${bricolage.variable} ${jakarta.variable} ${orbitron.variable} ${anton.variable}`}>
      <body style={{ fontFamily: 'var(--font-jakarta), sans-serif' }}>
        <Providers>
                <Navbar />
          
          {children}
                <Footer />
          
        </Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
