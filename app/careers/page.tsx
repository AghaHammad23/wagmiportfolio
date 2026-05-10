import type { Metadata } from 'next'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CareersContent from './CareersContent'

export const metadata: Metadata = {
  title: 'Careers — WAGMI Media',
  description: 'Join the team that\'s built channels to 14 million subscribers. We\'re looking for obsessed creatives.',
}

export default function CareersPage() {
  return (
    <>
      <Navbar />
      <CareersContent />
      <Footer />
    </>
  )
}
