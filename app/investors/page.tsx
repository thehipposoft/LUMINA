import React from 'react'
import Boxes from '@/components/Boxes'
import Contact from '@/components/Contact/Contact'
import InvestorsVideo from '@/components/InvestorsVideo'

export default function InvestorsPage() {
  return (
    <div>
        <InvestorsVideo />
        <Boxes />
        <Contact />
    </div>
  )
}
