import { Metadata } from 'next';
import WhatWeDo from './WhatWeDo';

export const metadata: Metadata = {
    title: 'Lumina | What We Do',
    description: 'Learn about our innovative solutions and services.',
};

export default function WhatWeDoPage() {
    return (
        <WhatWeDo />
    );
}
