import { Metadata } from 'next';
import WhatWeDo from './WhatWeDo';
import SeoJsonLd from '@/components/SeoJsonLd';
import { buildMetadata, buildWebPageSchema } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
    title: 'LUMINA | What We Do',
    description:
        'Learn how LUMINA designs molecular surface systems to improve performance in OLED and organic devices.',
    path: '/what-we-do',
    keywords: ['what we do', 'OLED materials', 'surface engineering'],
});

export default function WhatWeDoPage() {
    return (
        <>
            <SeoJsonLd
                data={buildWebPageSchema({
                    name: 'What We Do | LUMINA',
                    description:
                        'Learn how LUMINA designs molecular surface systems to improve performance in OLED and organic devices.',
                    path: '/what-we-do',
                })}
            />
            <WhatWeDo />
        </>
    );
}
