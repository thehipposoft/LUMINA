import LabPageComponent from '@/components/LabPageComponent'
import React from 'react'
import { Metadata } from 'next'
import SeoJsonLd from '@/components/SeoJsonLd'
import { buildMetadata, buildWebPageSchema } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'LUMINA | Lab',
  description: 'Explore the LUMINA lab where we reimagine the interface between light and matter.',
  path: '/lab',
  keywords: ['Lumina lab', 'light and matter', 'surface analysis'],
});


export default function LabPage() {
  return (
    <div>
        <SeoJsonLd
            data={buildWebPageSchema({
                name: 'LUMINA Lab',
                description:
                    'Explore the LUMINA lab where we reimagine the interface between light and matter.',
                path: '/lab',
            })}
        />
        <LabPageComponent />
    </div>
  )
}
