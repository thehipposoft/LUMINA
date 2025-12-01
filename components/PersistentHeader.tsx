"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import LuminaLogo from "./LuminaLogo";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import MobileMenu from "./MobileMenu";
import { useTransitionRouter } from "next-view-transitions";
import AnimatedLink from "./commons/AnimatedLink";

gsap.registerPlugin(ScrollTrigger);

const navigationItems = [
    { href: "/", label: "Home" },
    { href: "/what-we-do", label: "What we do" },
    { href: "/benefits", label: "Benefits" },
    { href: "/blog", label: "Blog" },
    { href: "/lab", label: "LuminaLab" },
    { href: "/faqs", label: "FAQS" },
];

const navigationSecondary = [
    { href: "/what-we-do", label: "What we do" },
    { href: "/benefits", label: "Benefits" },
    { href: "/blog", label: "Blog" },
    { href: "/lab", label: "LuminaLab" },
    { href: "/faqs", label: "FAQS" },
    { href: "/#contact", label: "Contact" },
];

const pageAnimation = () => {
    document.documentElement.animate(
        [
            {
                opacity: 1,
                scale: 1,
                transform: "translateY(0)",
            },
            {
                opacity: 0.5,
                scale: 0.9,
                transform: "translateY(-100px)",
            },
        ],
        {
            duration: 1000,
            easing: "cubic-bezier(0.76, 0, 0.24, 1)",
            fill: "forwards",
            pseudoElement: "::view-transition-old(root)",
        }
    );

    document.documentElement.animate(
        [
            {
                transform: "translateY(100%)",
            },
            {
                transform: "translateY(0)",
            },
        ],
        {
            duration: 1000,
            easing: "cubic-bezier(0.76, 0, 0.24, 1)",
            fill: "forwards",
            pseudoElement: "::view-transition-new(root)",
        }
    );
};


export default function PersistentHeader({}) {
    const pathname = usePathname();
    const headerRef = useRef<HTMLElement>(null);
    const [openMenu, setOpenMenu] = useState(false);
    const mm = gsap.matchMedia();
    const router = useTransitionRouter();

    const handleOpenMenu = () => {
        setOpenMenu(!openMenu)
    }

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

        //Add class on scroll
        const handleScroll = () => {
            if (window.scrollY > 50) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    useGSAP(() => {
        mm.add("(min-width: 1300px)", () => {
            gsap.to('.menu', {
                scrollTrigger: {
                    start: "0 top",
                    end: "500 25%",
                    scrub: 3,
                },
                width: "60vw",
                ease: 'sine.out',
                color: "#000000"
            })
            gsap.to('.secondary-menu', {
                scrollTrigger: {
                    start: "0 top",
                    end: "500 25%",
                    scrub: 3,
                },
                marginLeft: "4px",
                marginRight: "4px",
            })
            gsap.to(headerRef.current, {
                scrollTrigger: {
                    start: "0 top",
                    end: "500 25%",
                    scrub: 3,
                },
                width: "60vw",
                ease: 'sine.out',
                backgroundColor: "#FFFFFF80",
                color: "#000000"
            })
        })
        mm.add("(max-width: 1300px)", () => {
            gsap.to(headerRef.current, {
                scrollTrigger: {
                    start: "0 top",
                    end: "500 25%",
                    scrub: 3,
                },
                ease: 'sine.out',
                backgroundColor: "#FFFFFF60"
            })
        })
        mm.add("(max-width: 1300px)", () => {
            gsap.to(".logo-text", {
                scrollTrigger: {
                    start: "0 top",
                    end: "500 25%",
                    scrub: 3,
                },
                ease: 'sine.out',
                color: "#000000"
            })
        })
    })

    return (
        <header
            ref={headerRef}
            className={`lg:w-auto w-full ${pathname === '/' ? "home-page left-1/2 transform -translate-x-1/2 fixed text-white" : "max-w-screen fixed lg:sticky border-0 bg-white/95 text-black"} top-0 z-50  backdrop-blur-lg shadow-lg mx-auto rounded-b-2xl`}
        >
            <div className={`menu ${pathname === '/' ? "md:w-[85vw]" : "w-[95vw] lg:max-w-[85vw]"} px-6 mx-auto py-4`}>
                <nav className="relative z-20 flex items-center justify-between gap-10">
                    {pathname === '/' ?
                    <AnimatedLink href="/" className={`flex items-center gap-2 nav-item`}>
                        <LuminaLogo size={32} animated={true} />
                        <span className={`duration-700 neon-text logo-text ${openMenu ? "text-white" : "text-inherit"} text-xl font-bold `}>
                            LUMINA
                        </span>
                        <span className={`duration-700 logo-text ${openMenu ? "text-white" : "text-inherit"} text-sm`}>
                            TECHNOLOGIES
                        </span>
                    </AnimatedLink>
                    :
                    <AnimatedLink href="/" className={`flex items-center gap-2`}>
                        <LuminaLogo size={32} animated={true} />
                        <span className={`duration-700 neon-text  ${openMenu ? "text-white" : "text-black"} text-xl font-bold `}>
                            LUMINA
                        </span>
                        <span className={`duration-700  ${openMenu ? "text-white" : "text-black"} text-sm`}>
                            TECHNOLOGIES
                        </span>
                    </AnimatedLink>
                    }

                    <div className="hidden lg:flex relative secondary-menu w-xl justify-between">
                        {
                        pathname === '/' ?
                        navigationItems.map((item, index) => {
                            const isActive = pathname === item.href;

                            return (
                                <AnimatedLink
                                    key={index}
                                    href={item.href}
                                    children={item.label}
                                    className={`nav-item nav-link text-sm font-medium transition-all duration-300 hover:text-brand-primary text-black relative px-2 py-1 ${
                                        isActive
                                        ? 'font-semibold'
                                        : ''
                                    }`}
                                 />
                               /*  <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={(e) => {

                                        e.preventDefault();
                                        router.push(item.href, {
                                            onTransitionReady: pageAnimation,
                                        });

                                    }}
                                    className={`nav-item nav-link text-sm font-medium transition-all duration-300 hover:text-brand-primary text-black relative px-2 py-1 ${
                                        isActive
                                        ? 'font-semibold'
                                        : ''
                                    }`}
                                    >
                                    {item.label}
                                </Link> */
                            );
                        })
                        :
                        navigationSecondary.map((item, index) => {
                            const isActive = pathname === item.href;

                            return (
                                <AnimatedLink
                                    key={index}
                                    href={item.href}
                                    children={item.label}
                                    className={`nav-item nav-link text-sm font-medium transition-all duration-300 hover:text-brand-primary text-black relative px-2 py-1 ${
                                        isActive
                                        ? 'font-semibold'
                                        : ''
                                    }`}
                                 />
                              /*   <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={(e) => {

                                        e.preventDefault();
                                        router.push(item.href, {
                                            onTransitionReady: pageAnimation,
                                        });

                                    }}
                                    className={`nav-item nav-link text-sm font-medium transition-all duration-300 hover:text-brand-primary text-black relative py-1 ${
                                        isActive
                                        ? 'font-semibold'
                                        : ''
                                    }`}
                                    >
                                    {item.label}
                                </Link> */
                            );
                        })
                        }
                    </div>
                    <button
                        onClick={handleOpenMenu}
                        className="lg:hidden nav-item text-black hover:text-brand-primary">
                        <svg width="35" height="35" viewBox="0 0 30 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect className={`duration-700 origin-left ${openMenu ? 'rotate-45 fill-white -translate-y-[6px]' : ''}`} width="30" height="2.75" rx="1.375" fill="#151f27"/>
                            <rect className={`duration-700 ${openMenu ? 'opacity-0' : ''}`} y="6.125" width="30" height="2.75" rx="1.375" fill="#151f27"/>
                            <rect className={`duration-700 origin-left ${openMenu ? '-rotate-45 fill-white translate-y-[6px]' : ''}`} y="12.25" width="30" height="2.75" rx="1.375" fill="#151f27"/>
                        </svg>
                    </button>
                </nav>
                <MobileMenu openMenu={openMenu} handleOpenMenu={handleOpenMenu} />
            </div>
        </header>
    );
}
