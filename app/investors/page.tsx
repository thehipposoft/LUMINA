import React from 'react'
import Boxes from '@/components/Boxes'
import Contact from '@/components/Contact/Contact'
import InvestorsVideo from '@/components/InvestorsVideo'
import type { Metadata } from 'next'
import SeoJsonLd from '@/components/SeoJsonLd'
import { buildMetadata, buildWebPageSchema } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'LUMINA | Investors',
  description:
    'Explore the LUMINA investor page for growth vision, technology value, and partnership opportunities.',
  path: '/investors',
  keywords: ['Lumina investors', 'OLED investment', 'technology partnership'],
});

export default function InvestorsPage() {
  return (
    <div>
        <SeoJsonLd
          data={buildWebPageSchema({
            name: 'LUMINA Investors',
            description:
              'Explore the LUMINA investor page for growth vision, technology value, and partnership opportunities.',
            path: '/investors',
          })}
        />
        <InvestorsVideo />
        <Boxes />
        <Contact />
    </div>
  )
}
