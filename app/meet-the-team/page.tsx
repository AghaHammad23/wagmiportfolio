import type { Metadata } from 'next'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import TeamContent from './TeamContent'

export const metadata: Metadata = {
  title: 'Meet the Team — WAGMI Media',
  description: 'The people behind the content engine. Meet the strategists, editors, and creatives who make brands grow.',
}

export default function MeetTheTeamPage() {
  return (
    <>
      <TeamContent />
    </>
  )
}
