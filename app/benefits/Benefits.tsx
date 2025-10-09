'use client';
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const Benefits = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".fade-in", {
                opacity: 0,
                y: 50,
                duration: 1,
                stagger: 0.2,
                ease: "power3.out",
                scrollTrigger: {
                trigger: ".content-sections",
                start: "top 70%",
                end: "bottom center",
                },
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="min-h-screen bg-white">
            <section className="container mx-auto py-20 flex gap-8">
                <div className="w-5/12">

                </div>
                <div className="w-7/12 content-sections bg-amber-200">
                    Carousel
                </div>
            </section>

            <section>
                Our chemical can:
            </section>

            <section className="container mx-auto py-20 flex gap-8">
                <div className="w-5/12">

                </div>
                <div className="w-7/12 content-sections bg-amber-200">
                    Carousel
                </div>
            </section>

            <section className="container mx-auto py-20 flex gap-8">
                <div className="w-7/12 content-sections bg-amber-200">
                    Carousel
                </div>
                <div className="w-5/12">

                </div>
            </section>

             <section className="container mx-auto py-20 flex gap-8">
                <div className="w-5/12">

                </div>
                <div className="w-7/12 content-sections bg-amber-200">
                    Carousel
                </div>
            </section>
        </div>
    );
};

export default Benefits;
