"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import LuminaLogo from "./LuminaLogo";
import NavigationArrow from "./NavigationArrow";

const navigationItems = [
    { href: "/", label: "Home" },
    { href: "/what-we-do", label: "What we do" },
    { href: "/animations", label: "Blog" },
    { href: "/logo-showcase", label: "LuminaLab" },
];

export default function PersistentHeader() {
    const pathname = usePathname();
    const headerRef = useRef<HTMLElement>(null);
    const arrowRef = useRef<HTMLDivElement>(null);

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

    useEffect(() => {
            // Animate arrow position when pathname changes
            const arrow = arrowRef.current;
            if (!arrow) return;

            const activeIndex = navigationItems.findIndex(item => item.href === pathname);
                if (activeIndex === -1) {
                // Hide arrow if no matching page
                gsap.to(arrow, {
                    //opacity: 0,
                    duration: 0.3,
                    ease: "power2.out"
                });
                return;
            }

            // Show arrow and position it
            gsap.to(arrow, {
                //opacity: 1,
                duration: 0.3,
                ease: "power2.out"
            });

            // Calculate position based on active nav item
            const navItems = document.querySelectorAll('.nav-link');
            const activeNavItem = navItems[activeIndex] as HTMLElement;

            if (activeNavItem) {
                const headerRect = headerRef.current?.getBoundingClientRect();
                const itemRect = activeNavItem.getBoundingClientRect();

                if (headerRect) {
                    const leftPosition = itemRect.left - headerRect.left + (itemRect.width / 2) - 12; // Center the arrow

                    gsap.to(arrow, {
                    x: leftPosition,
                    duration: 0.8,
                    ease: "power3.out"
                    });
                }
            }
    }, [pathname]);

    return (
        <header
            ref={headerRef}
            className="fixed top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm mx-auto left-1/2 transform -translate-x-1/2 rounded-b-2xl"
        >
            <div className="w-max mx-auto px-6 py-4">
                <nav className="flex items-center justify-between gap-10">
                    <Link href="/" className="flex items-center space-x-2 nav-item">
                        <LuminaLogo size={32} animated={true} />
                        <span className="text-xl font-bold text-black">LUMINA</span>
                        <span className="text-sm text-black/70">TECHNOLOGIES</span>
                    </Link>

                    <div className="hidden md:flex space-x-8 relative">
                        {/* Navigation Arrow */}
                        <div
                            ref={arrowRef}
                            className="absolute -bottom-7 left-0 opacity-0 z-10"
                            style={{ transform: 'translateX(0px)' }}
                            >
                            <NavigationArrow size={16} />
                        </div>

                        {navigationItems.map((item) => {
                            const isActive = pathname === item.href;

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`nav-item nav-link text-sm font-medium transition-all duration-300 hover:text-[#007BFF] relative px-2 py-1 ${
                                        isActive
                                        ? 'font-semibold'
                                        : ''
                                    }`}
                                    >
                                    {item.label}
                                </Link>
                            );
                        })}
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
