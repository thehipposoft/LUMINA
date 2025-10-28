"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Carousel from "@/components/Carousel";
import Boxes from "@/components/Boxes";
import VideoComponent from "@/components/VideoComponent";

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
        <div className="max-w-screen flex flex-col justify-center min-h-[630px] relative">
            <div className="w-[85vw] mx-auto flex gap-4 relative z-10 ">
                <div className="relative w-10 z-10">
                    <Image src={'/images/vectors/angle.svg'} alt="Lumina Arrow" fill className="object-contain" />
                </div>
                <div className="bg-white/60 blur-3xl rounded-full absolute w-[400px] h-[300px] -left-12 top-0" />
                <div className="relative z-10">
                    <h1 className="text-black-text font-bold text-5xl">
                        FUTURE
                        <br />
                        FORWARD
                        <br />
                        INNOVATION
                    </h1>
                    <p className="text-xl text-black-text leading-relaxed">
                        {'Intelligent molecular synthesis'}
                    </p>
                </div>
            </div>
            <Image
                src={'/images/what-we-do/wedo.png'}
                alt="What we do banner image: Scientist"
                fill
                className="object-cover"
            />
        </div>
        {/* Content Sections */}
        <section className="content-sections py-20 w-[85vw] mx-auto fade-in">
            <div className="flex items-center justify-between gap-10">
                <div className="w-7/12 ">
                    <Carousel
                        slides={[

                            { image: '/images/what-we-do/wedo1.jpg', text: 'Through intelligent molecular synthesis, we transform how devices interact with light, matter, and energy.' },
                            { image: '/images/what-we-do/wedo2.jpg', text: 'The vapor deposition process used to construct OLEDs' },
                            { image: '/images/what-we-do/wedo3.jpg', text: 'Through intelligent molecular synthesis, we transform how devices interact with light, matter, and energy.' },
                        ]}
                    />
                </div>
                <div className="w-5/12 flex flex-col gap-3 pt-20 text-black-text">
                    <h2 className="text-4xl font-semibold">
                        What we do
                    </h2>
                    <h6 className="font-semibold text-2xl">
                        Innovating at the Molecular Level
                    </h6>
                    <p className="max-w-[440px]">
                        At Lumina Technologies, we design the chemistry that powers the future of optoelectronics.
                        Our team develops advanced surface solutions for OLED, microLED, and next-gen displays,
                        optimizing performance, efficiency, and durability.
                    </p>
                </div>
            </div>
        </section>

        <VideoComponent />
        <Boxes />
        <section className="content-sections w-[85vw] mx-auto py-20">
            <div className="flex justify-between gap-10">
                <div className="w-5/12 flex flex-col gap-2">
                    <h2 className="text-4xl font-semibold text-black-text">
                        Why
                    </h2>
                    <h6 className="text-xl font-semibold text-black-text">
                        A growing national technology
                    </h6>
                    <p className="text-sm pt-12">
                        In today&apos;s shifting global trade environment, tariffs on display materials and components are becoming a
                        serious concern for OEMs, panel makers, and system integrators. From rising costs to
                        supply chain delays, the impact is real—and growing.
                    </p>
                    <p className="text-sm">
                        At Lumina, weve designed our operations to avoid these risks entirely. By focusing on domestic production and a localized supply chain, we&apos;re able to offer our partners greater stability, predictability, and independence from international trade disruptions.
                    </p>
                    <p className="text-sm">
                        This isn&apos;t just a short-term advantage—it&apos;s a
                        long-term strategy to support a more resilient, responsive display ecosystem.
                    </p>
                    <p className="text-sm">
                        If you&apos;re reassessing your sourcing strategy or looking for partners who can deliver
                        cutting-edge materials without the tariff exposure, let&apos;s connect. We&apos;re helping move
                        the display industry forward—securely and sustainably.
                    </p>
                </div>
                <div className="w-7/12 ">
                    <Carousel
                        slides={[

                            { image: '/images/what-we-do/team.webp', text: "Lumina's Team" },
                            { image: '/images/what-we-do/wedo2.png', text: 'The vapor deposition process used to construct OLEDs' },
                            { image: '/images/what-we-do/wedo3.png', text: 'Through intelligent molecular synthesis, we transform how devices interact with light, matter, and energy.' },
                        ]}
                    />
                </div>
            </div>
            <div className="flex flex-col gap-4 pt-12">
                <h6 className="text-xl font-semibold text-black-text">
                    Founding sources
                </h6>
                <div className="flex gap-4">
                    <Image src={'/images/what-we-do/founding-1.svg'} alt="Foundig partners 1" width={320} height={60} />
                    <Image src={'/images/what-we-do/founding-2.svg'} alt="Foundig partners 1" width={160} height={60} />
                </div>
            </div>
        </section>
    </div>
  );
}

export default WhatWeDo;
