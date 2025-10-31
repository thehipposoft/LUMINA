import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import PersistentHeader from "../components/PersistentHeader";
import PageTransition from "../components/PageTransition";
import SmoothLinkTransition from "../components/SmoothLinkTransition";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/commons/SmoothScroll";

const montserrat = Montserrat({
    variable: "--font-montserrat",
    subsets: ["latin"],
    weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
    title: "LUMINA Technologies - OLED Revolution",
    description: "A revolution in OLED technology. Advanced display solutions and cutting-edge innovations.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${montserrat.variable} antialiased`}>
                <SmoothScroll>
                    <PersistentHeader />
                    <PageTransition>
                        {children}
                        <Footer />
                    </PageTransition>
                    <SmoothLinkTransition />
                </SmoothScroll>
            </body>
        </html>
    );
}
