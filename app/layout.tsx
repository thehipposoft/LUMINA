import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import PersistentHeader from "../components/PersistentHeader";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/commons/SmoothScroll";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { ViewTransitions } from "next-view-transitions";
import SeoJsonLd from "@/components/SeoJsonLd";
import { buildMetadata, siteConfig } from "@/lib/seo";

const montserrat = Montserrat({
    variable: "--font-montserrat",
    subsets: ["latin"],
    weight: ["400", "600", "700"],
});

export const metadata: Metadata = buildMetadata({
    title: "LUMINA Technologies | OLED Revolution",
    description: siteConfig.description,
    path: "/",
    keywords: [
        "LUMINA Technologies",
        "OLED technology",
        "molecular interfaces",
        "surface engineering",
    ],
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const jsonLd = [
        {
            "@context": "https://schema.org",
            "@type": "Organization",
            name: siteConfig.name,
            url: siteConfig.url,
            address: {
                "@type": "PostalAddress",
                streetAddress: "1068 W Sheridan Rd.",
                addressLocality: "Chicago",
                addressRegion: "IL",
                postalCode: "60660",
                addressCountry: "US",
            },
        },
        {
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: siteConfig.name,
            url: siteConfig.url,
            description: siteConfig.description,
        },
    ];

    return (
        <ViewTransitions>
            <html lang="en">
                <GoogleAnalytics />
                <body className={`${montserrat.variable} antialiased`}>
                    <SeoJsonLd data={jsonLd} />
                    <SmoothScroll>
                        <PersistentHeader />
                        <main className="page-content">
                            {children}
                        </main>
                        <Footer />
                    </SmoothScroll>
                </body>
            </html>
        </ViewTransitions>
    );
}
