"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Carousel from "@/components/Carousel";
import Boxes from "@/components/Boxes";
import VideoComponent from "@/components/VideoComponent";
import { useGSAP } from "@gsap/react";
import Contact from "@/components/Contact/Contact";

const WhatWeDo = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline()
/*         tl.from(containerRef.current, {
            opacity: 0,
            delay: 0.5
        }) */
        tl.from(".title > *" ,{
            y: 100,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: "circ.out",
        })
        tl.from(".subtitle" ,{
            opacity: 0,
            duration: 1.1,
            ease: "power3.out",
        })
        gsap.from(".content-sections", {
            opacity: 0,
            y: 50,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ".content-sections",
                start: "top 60%",
                end: "bottom center",
            },
        });
        gsap.from(".conteiner-how", {
            scrollTrigger: {
                trigger: ".conteiner-how",
                start: "top 60%",
                end: "bottom center",
            },
            opacity: 0,
            y: 50,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out",
        });
    }, {scope: containerRef})

  return (
    <div ref={containerRef} className="min-h-screen bg-white">
        <div className="max-w-screen flex flex-col justify-center min-h-[630px] relative">
            <div className="w-[85vw] mx-auto flex gap-4 relative z-10 ">
                <div className="relative w-10 z-10">
                    <Image src={'/images/vectors/angle.svg'} alt="Lumina Arrow" fill className="object-contain" />
                </div>
                <div className="bg-white/60 blur-3xl rounded-full absolute w-[400px] h-[300px] -left-12 top-0" />
                <div className="relative z-10">
                    <div className="title text-black-text overflow-hidden  font-bold text-5xl lg:text-6xl">
                        <h1 className="">FUTURE</h1>
                    </div>
                    <div className="title text-black-text overflow-hidden  font-bold text-5xl lg:text-6xl">
                        <h1 className="">FORWARD</h1>
                    </div>
                    <div className="title text-black-text overflow-hidden  font-bold text-5xl lg:text-6xl">
                        <h1 className="">INNOVATION</h1>
                    </div>
                    <p className="text-xl subtitle text-black-text leading-relaxed">
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
        <section className="content-sections lg:py-20 pb-20 w-[85vw] xl:max-w-7xl mx-auto">
            <div className="flex lg:flex-row flex-col-reverse lg:items-center justify-between gap-10">
                <div className="">
                    <Carousel
                        slides={[

                            { image: '/images/what-we-do/wedo1.jpg', text: 'Through intelligent molecular synthesis, we transform how devices interact with light, matter, and energy.' },
                            { image: '/images/what-we-do/wedo2.jpg', text: 'The vapor deposition process used to construct OLEDs' },
                            { image: '/images/what-we-do/wedo3.jpg', text: 'Through intelligent molecular synthesis, we transform how devices interact with light, matter, and energy.' },
                        ]}
                    />
                </div>
                <div className="lg:w-5/12 flex flex-col gap-3 pt-20 text-black-text">
                    <h2 className="text-4xl font-semibold">
                        What we do
                    </h2>
                    <h6 className="font-semibold text-2xl">
                        Innovating at the Molecular Level
                    </h6>
                    <p className="lg:max-w-[440px]">
                        At Lumina, we have designed our operations to mitigate these risks entirely for our
                        company and our customers. By focusing on domestic production and a localized supply
                        chain, we´re able to offer our partners greater stability, predictability, and independence
                        from international trade disruptions.
                    </p>
                    <p className="lg:max-w-[440px]">
                        Founding Sources needs to be Funding Sources and a separate title for Collaboration Partners
                    </p>
                    <div className="flex justify-between pt-4">
                        <div className="flex flex-col gap-2">
                            <p className="font-semibold">Funding Sources</p>
                            <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-brand-primary"/>NSF PFI</div>
                            <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-brand-primary"/>NSF SBIR</div>
                            <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-brand-primary"/> Innovate Illinois</div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="font-semibold">Supporting Partners</p>
                            <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-brand-primary"/>Polsky Institute UChicago</div>
                            <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-brand-primary"/>Quinlan Business at Loyola<br/> University Chicago</div>
                            <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-brand-primary"/> Merck KGaA</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <VideoComponent />
        <Boxes />
        <section id="why" className="conteiner-how w-[85vw] xl:max-w-7xl mx-auto md:py-20 pt-12">
            <div className="flex lg:flex-row flex-col justify-between gap-10">
                <div className="lg:w-[500px] flex flex-col gap-2 ">
                    <h2 className="text-4xl font-semibold text-black-text">
                        Why
                    </h2>
                    <h6 className="text-xl font-semibold text-black-text">
                        A growing national technology
                    </h6>
                    <p className="text-sm lg:pt-12 pt-4">
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
                <div className="lg:w-7/12">
                    <Carousel
                        slides={[
                            { image: '/images/what-we-do/team.webp', text: "Lumina's Team" },
                            { image: '/images/what-we-do/team2.jpg', text: 'High-performance materials engineered for the demands of modern electronics.' },
                            { image: '/images/what-we-do/team3.jpg', text: 'High-performance materials engineered for the demands of modern electronics.' },
                            { image: '/images/what-we-do/team4.jpg', text: 'High-performance materials engineered for the demands of modern electronics.' },
                        ]}
                    />
                </div>
            </div>
            <div className="flex flex-col gap-4 pt-12">
                <h6 className="text-xl font-semibold text-black-text">
                    Founding sources
                </h6>
                <div className="flex md:flex-row flex-col gap-4">
                    <Image src={'/images/what-we-do/founding-1.svg'} alt="Foundig partners 1" width={320} height={60} />
                    <Image src={'/images/what-we-do/founding-2.svg'} alt="Foundig partners 1" width={160} height={60} />
                </div>
            </div>
        </section>
        <Contact />
    </div>
  );
}

export default WhatWeDo;
