"use client";

import Head from "next/head";
import { absoluteUrl, siteConfig } from "@/lib/seo";

type SeoHeadProps = {
    title: string;
    description: string;
    path: string;
    keywords?: string[];
    noIndex?: boolean;
};

export default function SeoHead({
    title,
    description,
    path,
    keywords = [],
    noIndex = false,
}: SeoHeadProps) {
    const url = absoluteUrl(path);
    const image = absoluteUrl(siteConfig.ogImage);
    const robots = noIndex ? "noindex, nofollow" : "index, follow";

    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content={description} />
            {keywords.length > 0 ? (
                <meta name="keywords" content={keywords.join(", ")} />
            ) : null}
            <meta name="robots" content={robots} />
            <link rel="canonical" href={url} />

            <meta property="og:type" content="website" />
            <meta property="og:site_name" content={siteConfig.name} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={url} />
            <meta property="og:image" content={image} />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />
        </Head>
    );
}
