'use client'

import { useState, createContext, useContext } from 'react'
import SmoothScroll from './SmoothScroll'
import ApplyModal from './ApplyModal'

const ApplyContext = createContext<{ open: () => void }>({ open: () => {} })
export const useApply = () => useContext(ApplyContext)

export default function Providers({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <ApplyContext.Provider value={{ open: () => setIsOpen(true) }}>
      <SmoothScroll>
        {children}
        <ApplyModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </SmoothScroll>
    </ApplyContext.Provider>
  )
}
