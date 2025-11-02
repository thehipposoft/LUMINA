"use client";
import { useRef } from "react";
import Hero3D8 from "@/components/Hero3D-8";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);


export default function AnimationsDemo() {
    const heroRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.to(heroRef.current, {
            scrollTrigger: {
                start: "0 top",
                end: "500 25%",
                scrub: 3,
            },
            ease: 'sine.out',
            margin: "2rem",
            borderRadius: "1.5rem",
        })
    })

    return (
        <div
            ref={heroRef}
            className="relative min-h-screen overflow-hidden bg-black"
        >
            <div className="absolute inset-0 z-10 pointer-events-none flex justify-center top-12 lg:top-8">
                <h1 className="text-3xl lg:text-6xl text-center p-6 z-10 lg:w-[60%] text-white transition-all">
                    A <span className="font-bold transition-all">REVOLUTION</span> <br /> IN OLED TECHNOLOGY
                </h1>
            </div>
            <Hero3D8 />
        </div>
    );
}
