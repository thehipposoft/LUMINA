"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import LuminaLogo from "./LuminaLogo";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const navigationItems = [
    { href: "/", label: "Home" },
    { href: "/what-we-do", label: "What we do" },
    { href: "/benefits", label: "Benefits" },
    { href: "/animations", label: "Blog" },
    { href: "/lab", label: "LuminaLab" },
];

const navigationSecondary = [
    { href: "/what-we-do", label: "What we do" },
    { href: "/benefits", label: "Benefits" },
    /* { href: "/blog", label: "Blog" }, */
    { href: "/lab", label: "LuminaLab" },
    { href: "/faqs", label: "FAQS" },
    { href: "/#contact", label: "Contact" },

];

export default function PersistentHeader({}) {
    const pathname = usePathname();
    const headerRef = useRef<HTMLElement>(null);

    useEffect(() => {
        // Animate header on mount
        const header = headerRef.current;
        if (!header) return;

        gsap.from(".nav-item", {
            //opacity: 0,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out",
            delay: 0.2,
        });
    }, []);


    useGSAP(() => {
        gsap.to('.menu', {
            scrollTrigger: {
                start: "0 top",
                end: "500 25%",
                scrub: 3,
            },
            width: "60vw",
            ease: 'sine.out'
        })
        gsap.to(headerRef.current, {
            scrollTrigger: {
                start: "0 top",
                end: "500 25%",
                scrub: 3,
            },
            width: "60vw",
            ease: 'sine.out',
            backgroundColor: "#FFFFFF80"
        })
    })

    return (
        <header
            style={{backgroundColor: "#FFFFFF"}}
            ref={headerRef}
            className={`${pathname === '/' ? "left-1/2 transform -translate-x-1/2 fixed" : "max-w-screen sticky border-0"}  top-0 z-50 bg-white/95 backdrop-blur-lg shadow-lg mx-auto rounded-b-2xl`}
        >
            <div className={`menu ${pathname === '/' ? "w-[85vw]" : " max-w-[85vw]"} px-6 mx-auto py-4`}>
                <nav className=" flex items-center justify-between gap-10">
                    <Link href="/" className="flex items-center gap-2 nav-item">
                        <LuminaLogo size={32} animated={true} />
                        <span className="text-xl font-bold text-black">LUMINA</span>
                        <span className="text-sm text-black/70">TECHNOLOGIES</span>
                    </Link>

                    <div className="hidden md:flex gap-8 relative">
                        {
                        pathname === '/' ?
                        navigationItems.map((item) => {
                            const isActive = pathname === item.href;

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`nav-item nav-link text-sm font-medium transition-all duration-300 hover:text-[#007BFF] text-black relative px-2 py-1 ${
                                        isActive
                                        ? 'font-semibold'
                                        : ''
                                    }`}
                                    >
                                    {item.label}
                                </Link>
                            );
                        })
                        :
                        navigationSecondary.map((item) => {
                            const isActive = pathname === item.href;

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`nav-item nav-link text-sm font-medium transition-all duration-300 hover:text-[#007BFF] text-black relative py-1 ${
                                        isActive
                                        ? 'font-semibold'
                                        : ''
                                    }`}
                                    >
                                    {item.label}
                                </Link>
                            );
                        })
                        }
                    </div>

                    {/* Mobile menu button */}
                    <button className="md:hidden nav-item text-black hover:text-brand-primary">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </nav>
            </div>
        </header>
    );
}
