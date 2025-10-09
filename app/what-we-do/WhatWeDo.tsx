"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroBanner from "@/components/HeroBanner";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const WhatWeDo = () => {
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
        {/* Hero Section */}
        <HeroBanner
            title={
                <div className="flex gap-2">
                    <div>
                        SVG
                    </div>
                    <div>
                        <h1>
                            FUTURE
                            <br />
                            FORWARD
                            <br />
                            INNOVATION
                        </h1>
                        <p className="text-xl text-white/90 leading-relaxed">
                            {'intelligent molecular synthesis'}
                        </p>
                    </div>
                </div>
            }
        />

        {/* Content Sections */}
        <section className="content-sections p-20 fade-in">
            <div className="flex gap-10">
                <div className="w-7/12 bg-amber-300">
                    Carousel
                </div>
                <div className="w-5/12">
                    <h2>
                        What we do
                    </h2>
                    <h6>
                        Innovating at the Molecular Level
                    </h6>
                    <p>
                        At Lumina Technologies, we design the chemistry that powers the future of optoelectronics.
                        Our team develops advanced surface solutions for OLED, microLED, and next-gen displays,
                        optimizing performance, efficiency, and durability.
                    </p>
                </div>
            </div>
        </section>

        <section className="content-sections bg-black py-20 fade-in">
            <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div>
                    Video module
                </div>
                <div className="text-white">
                    <h3 className="text-4xl">
                        How
                    </h3>
                    <h2 className="text-2xl mb-2">
                        Design Solutions
                    </h2>
                    <p className="mb-2">
                        As an industry forerunner in OLED display manufacturing, we constantly seek innovative solutions to enhance brightness, transparency, and energy efficiency.
                    </p>
                    <p className="mb-2">
                        Lumina’s groundbreaking chemical technology has transformed our production process, allowing us to achieve thinner electrodes, brighter displays, and superior transparency—critical for next-generation applications like under-display cameras and AR/VR. Their technical support and expert guidance ensured a seamless integration into our pilot lines, setting the stage for mass production success. Lumina’s solution is not just an upgrade;
                    </p>
                    <p className="font-bold">
                        It’s a revolution in OLED performance.
                    </p>
                </div>
            </div>
        </section>

        <section className="container mx-auto py-10 grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div>col1</div>
            <div>col2</div>
            <div>col3</div>
        </section>

        <section className="content-sections p-20">
            <div className="flex gap-10">
                <div className="w-5/12">
                    <h2>
                        Why
                    </h2>
                    <h6>
                        A growing national technology
                    </h6>
                    <p>
                        In today’s shifting global trade environment, tariffs on display materials and components are becoming a
                        serious concern for OEMs, panel makers, and system integrators. From rising costs to
                        supply chain delays, the impact is real—and growing.
                    </p>
                    <p>
                        At Lumina, we’ve designed our operations to avoid these risks entirely.
                        By focusing on domestic production and a localized supply chain,
                        we’re able to offer our partners greater stability, predictability, and independence
                        from international trade disruptions.
                    </p>
                    <p>
                        {`This isn't just a short-term advantage—it’s a
                        long-term strategy to support a more resilient, responsive display ecosystem.`}
                    </p>
                    <p>
                        {`If you're reassessing your sourcing strategy or looking for partners who can deliver
                        cutting-edge materials without the tariff exposure, let’s connect. We're helping move
                        the display industry forward—securely and sustainably.`}
                    </p>
                </div>
                <div className="w-7/12 bg-amber-300">
                    Carousel
                </div>
            </div>
        </section>

        <section className="container mx-auto py-10">
            <div>
                sponsors/logos
            </div>
        </section>
    </div>
  );
}

export default WhatWeDo;
