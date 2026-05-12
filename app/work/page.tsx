import type { Metadata } from 'next'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import WorkContent from './WorkContent'

export const metadata: Metadata = {
  title: 'Our Work — WAGMI Media',
  description: 'Real results for real brands. From zero to millions — see what the WAGMI content engine delivers.',
}

export default function WorkPage() {
  return (
    <>
      <WorkContent />
    </>
  )
}
