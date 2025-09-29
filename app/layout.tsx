import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import PersistentHeader from "../components/PersistentHeader";
import PageTransition from "../components/PageTransition";
import SmoothLinkTransition from "../components/SmoothLinkTransition";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <PersistentHeader />
        <PageTransition>
          {children}
        </PageTransition>
        <SmoothLinkTransition />
      </body>
    </html>
  );
}
