import type { Metadata } from 'next'
import { Bricolage_Grotesque, Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import Providers from './components/Providers'
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"

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

export const metadata: Metadata = {
  title: 'WAGMI',
  description:
    'Scripts. Editing. Strategy. Distribution. We run the entire operation — so you stop creating content that gets views and start creating content that gets paid.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${bricolage.variable} ${jakarta.variable}`}>
      <body style={{ fontFamily: 'var(--font-jakarta), sans-serif' }}>
        <Providers>
          {children}
        </Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
