import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import PersistentHeader from "../components/PersistentHeader";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/commons/SmoothScroll";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { ViewTransitions } from "next-view-transitions";

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
        <ViewTransitions>
            <html lang="en">
                <GoogleAnalytics />
                <body className={`${montserrat.variable} antialiased`}>
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
