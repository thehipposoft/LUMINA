import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: [
                    "/animations",
                    "/logo-showcase",
                    "/hero-example",
                    "/hero-example-2",
                    "/hero-example-3",
                    "/hero-example-4",
                    "/hero-example-5",
                    "/hero-example-6",
                ],
            },
        ],
        sitemap: absoluteUrl("/sitemap.xml"),
        host: absoluteUrl("/"),
    };
}
