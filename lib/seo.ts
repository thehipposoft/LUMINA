import type { Metadata } from "next";

export const siteConfig = {
    name: "LUMINA Technologies",
    shortName: "LUMINA",
    url: "https://lumina.molecularinterfaces.com",
    description:
        "A revolution in OLED technology focused on molecular surface engineering for brighter, more efficient displays.",
    ogImage: "/images/revolution-oled.png",
};

type BuildMetadataInput = {
    title: string;
    description: string;
    path: string;
    keywords?: string[];
    noIndex?: boolean;
};

export function absoluteUrl(path: string): string {
    if (!path) return siteConfig.url;
    if (path.startsWith("http://") || path.startsWith("https://")) return path;
    return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}

export function buildMetadata({
    title,
    description,
    path,
    keywords = [],
    noIndex = false,
}: BuildMetadataInput): Metadata {
    const url = absoluteUrl(path);

    return {
        title,
        description,
        keywords,
        alternates: {
            canonical: url,
        },
        openGraph: {
            title,
            description,
            url,
            siteName: siteConfig.name,
            type: "website",
            images: [
                {
                    url: absoluteUrl(siteConfig.ogImage),
                    width: 1200,
                    height: 630,
                    alt: `${siteConfig.name} preview image`,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [absoluteUrl(siteConfig.ogImage)],
        },
        robots: {
            index: !noIndex,
            follow: !noIndex,
            googleBot: {
                index: !noIndex,
                follow: !noIndex,
                "max-video-preview": -1,
                "max-image-preview": "large",
                "max-snippet": -1,
            },
        },
    };
}

type BuildWebPageSchemaInput = {
    name: string;
    description: string;
    path: string;
};

export function buildWebPageSchema({
    name,
    description,
    path,
}: BuildWebPageSchemaInput) {
    const url = absoluteUrl(path);

    return {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name,
        description,
        url,
        isPartOf: {
            "@type": "WebSite",
            name: siteConfig.name,
            url: siteConfig.url,
        },
        publisher: {
            "@type": "Organization",
            name: siteConfig.name,
            url: siteConfig.url,
        },
    };
}
