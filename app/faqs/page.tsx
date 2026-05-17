import React from 'react'
import Faqs from '@/components/Faqs'
import type { Metadata } from 'next'
import SeoJsonLd from '@/components/SeoJsonLd'
import { buildMetadata, buildWebPageSchema } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'LUMINA | FAQs',
  description:
    'Find answers to common questions about LUMINA technology, OLED interface engineering, and collaboration opportunities.',
  path: '/faqs',
  keywords: ['Lumina FAQs', 'OLED questions', 'technology collaboration'],
});

export default function FaqsPage() {
  return (
    <div>
        <SeoJsonLd
          data={buildWebPageSchema({
            name: 'LUMINA FAQs',
            description:
              'Find answers to common questions about LUMINA technology, OLED interface engineering, and collaboration opportunities.',
            path: '/faqs',
          })}
        />
        <Faqs />
    </div>
  )
}
