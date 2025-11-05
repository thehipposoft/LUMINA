import LabPageComponent from '@/components/LabPageComponent'
import React from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Lumina | Lab',
    description: 'We reimagine the interface between light and matter',
};


export default function LabPage() {
  return (
    <div>
        <LabPageComponent />
    </div>
  )
}
