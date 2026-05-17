import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
    const now = new Date();

    return [
        {
            url: absoluteUrl("/"),
            lastModified: now,
            changeFrequency: "weekly",
            priority: 1,
        },
        {
            url: absoluteUrl("/benefits"),
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.9,
        },
        {
            url: absoluteUrl("/what-we-do"),
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.9,
        },
        {
            url: absoluteUrl("/lab"),
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: absoluteUrl("/investors"),
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: absoluteUrl("/blog"),
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.7,
        },
        {
            url: absoluteUrl("/faqs"),
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.7,
        },
        {
            url: absoluteUrl("/presentation-video"),
            lastModified: now,
            changeFrequency: "yearly",
            priority: 0.6,
        },
    ];
}
