"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PastelRibbons3D from "../components/PastelRibbons3D";
import Image from "next/image";
import Banner from "@/components/Banner";
import Contact from "@/components/Contact";
import Scene from "@/components/Banner3d/Scene";
import CustomButton from "@/components/commons/CustomButton";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
    const containerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Hero animations
            const tl = gsap.timeline({ delay: 0.5 });

            tl.from(".nav-item", {
                opacity: 0,
                y: -20,
                duration: 0.6,
                stagger: 0.1,
                ease: "power3.out",
            })
            .from(titleRef.current, {
                opacity: 0,
                y: 50,
                duration: 1,
                ease: "power3.out",
            }, "-=0.3")
            .from(".hero-subtitle", {
                opacity: 0,
                y: 30,
                duration: 0.8,
                ease: "power3.out",
            }, "-=0.5");

            // Scroll animations
            gsap.from(".section-card", {
                opacity: 0,
                y: 80,
                duration: 1,
                stagger: 0.3,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".sections-container",
                    start: "top 70%",
                    end: "bottom center",
                },
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className=" bg-white ">
            <div className="h-screen relative">
                <Scene />
            </div>
            <Banner />
            {/* <section className="p-4">
                <div className="relative min-h-screen bg-gradient-to-br bg-brand-primary overflow-hidden rounded-3xl">
                    <Hero3D />

                    <div className="relative z-20 flex items-center justify-center min-h-screen px-6 pointer-events-none">
                        <div className="text-center max-w-4xl">
                            <h1
                                ref={titleRef}
                                className="text-5xl md:text-7xl font-bold text-white"
                            >
                                A <span className="font-black">REVOLUTION</span> in OLED technology.
                            </h1>
                        </div>
                    </div>

                    <div className="hidden absolute bottom-0 right-0 bg-white rounded-2xl p-6 shadow-xl max-w-sm z-30">
                        <div className="flex items-center space-x-3">
                            <ArrowRight size={20} />
                            <div>
                                <h3 className="font-bold text-gray-900">
                                    Intelligent molecular synthesis
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>
            </section> */}

            {/* Content Sections */}
            <div className="sections-container">
                {/* Brighter Displays Section */}
                <section className="py-20 px-6">
                    <div className="max-w-7xl mx-auto">
                        <div className="section-card grid lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-4xl font-bold text-[#151f25] mb-6">Brighter displays</h2>
                                <h3 className="text-xl font-semibold text-[#151f25] mb-4">A New Device Engineering</h3>
                                <p className="text-[#151f25]/70 mb-6 leading-relaxed">
                                Our primary focus is on the surface science, where most of the ground
                                breaking science occurs. Through a combination of MALDI XPS, PEMIHAS,
                                UV-vis, XRD, X-ray crystallography, and SEM we seize one the chemical
                                changes within a surface for improved device behavior.
                                </p>
                                <CustomButton href="/benefits" text="Discover"/>
                            </div>
                            <Image
                                src="/images/brighter-display.png"
                                alt="Brighter Display"
                                width={605}
                                height={550}
                                className="w-full h-full object-cover max-w-[605px]"
                            />
                        </div>
                    </div>
                </section>

                {/* Innovative Solutions Section */}
                <section className="py-20 px-6 bg-gray-50">
                    <div className="max-w-7xl mx-auto">
                        <div className="section-card grid lg:grid-cols-2 gap-12 items-center">
                            <div className="order-2 lg:order-1">
                                <div className="bg-white rounded-3xl overflow-hidden shadow-xl">
                                <Image
                                    src="/images/innovative-solutions.png"
                                    alt="Innovative Solutions"
                                    width={600}
                                    height={400}
                                    className="w-full h-full object-cover"
                                />
                                </div>
                            </div>
                            <div className="order-1 lg:order-2">
                                <h2 className="text-4xl font-bold text-[#151f25] mb-6">Innovative Solutions</h2>
                                <h3 className="text-xl font-semibold text-[#151f25] mb-4">A new generation of materials</h3>
                                <p className="text-[#151f25]/70 mb-4 leading-relaxed">
                                    Operating at the intersection of chemistry, material science, and device
                                    engineering, we design smart molecular systems that enhance the
                                    performance of organic optoelectronic devices in applications ranging from
                                    creating tailor-made technologies that unlock new possibilities in OLEDs,
                                    OPVs, and beyond.
                                </p>
                                <p className="text-[#151f25]/70 mb-6 leading-relaxed">
                                    From our lab at Loyola University Chicago, we engineer surfaces at the
                                    molecular level to solve real-world challenges — from improving adhesion
                                    and charge injection to optimizing organic-inorganic interfaces with
                                    precision. Our mission: to enable brighter, more efficient, and more reliable
                                    devices by transforming how surfaces interact.
                                </p>
                                <CustomButton href="/benefits#material" text="Discover" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Revolution in OLED Performance Section */}
                <section className="py-20 px-6">
                    <div className="max-w-7xl mx-auto">
                        <div className="section-card grid lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-4xl font-bold text-gray-900 mb-6">Revolution in OLED performance</h2>
                                <h3 className="text-xl font-semibold text-gray-800 mb-4">We increase efficiency</h3>
                                <p className="text-gray-600 mb-6 leading-relaxed">
                                    Through the synergism of our multidisciplinary team encompassing
                                    chemical, engineering and the technological sense of business. Such
                                    synergism allow integration to industries worldwide will lead to a new
                                    recognition in the field of Nanotechnology. By pursuing such technological
                                    developments Molecular Interfaces will increase efficiency of OLED and LED
                                    electronics for consumer and corporate utilization.
                                </p>
                                <CustomButton href="/benefits" text="Discover" />
                            </div>

                            <Image
                                src="/images/revolution-oled.png"
                                alt="OLED Device"
                                width={600}
                                height={400}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </section>

                <section id="luminalab" className="relative py-20 bg-gradient-to-br from-[#35E3ED]/10 via-[#007BFF]/10 to-[#A044FF]/10 overflow-hidden">
                    <PastelRibbons3D />
                    <div className="relative z-10 px-6">
                        <div className="text-right flex flex-col items-end lg:w-1/2">
                            <p className="text-lg text-right">
                                We reimagine the interface between <span className="font-semibold">light and matter</span>
                            </p>
                            <h2 className="text-3xl mb-8 text-right">
                                Lumina <span className="font-semibold">LAB.</span>
                            </h2>
                            <CustomButton href="/lab" text="Discover" />
                        </div>
                    </div>
                </section>
                <Contact />
            </div>
        </div>
    );
}
