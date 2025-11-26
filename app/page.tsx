"use client";
import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PastelRibbons3D from "../components/PastelRibbons3D";
import Image from "next/image";
import Contact from "@/components/Contact/Contact";
import CustomButton from "@/components/commons/CustomButton";

const DynamicScene = dynamic(() => import("../components/Scene"), {
    ssr: false
});

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
    const containerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const heroRef = useRef<HTMLDivElement>(null);

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
                    start: "top 55%",
                    end: "bottom center",
                },
            });
            gsap.from(".section-two", {
                opacity: 0,
                y: 80,
                duration: 1,
                stagger: 0.3,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".sections-containertwo",
                    start: "top 55%",
                    end: "bottom center",
                },
            });
            gsap.from(".section-three", {
                opacity: 0,
                y: 80,
                duration: 1,
                stagger: 0.3,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".sections-containerthree",
                    start: "top 55%",
                    end: "bottom center",
                },
            });
            gsap.from(".lab-text", {
                opacity: 0,
                y: 80,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".lab-container",
                    start: "top 50%",
                    end: "bottom center",
                },
            });

        }, containerRef);

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

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="bg-white">
            <div
                ref={heroRef}
                className="relative min-h-screen overflow-hidden bg-black"
            >
                <div className="absolute inset-0 z-10 pointer-events-none flex justify-center top-[16%]">
                    <h1 className="text-3xl lg:text-6xl text-center p-6 z-10 lg:w-[60%] text-white transition-all">
                        A <span className="font-bold transition-all">REVOLUTION</span> <br /> IN OLED TECHNOLOGY
                    </h1>
                </div>
                <div className="relative top-[7rem]">
                    <DynamicScene />
                    <div className="absolute lg:hidden bottom-[14rem] left-1/2 transform -translate-x-1/2 z-10">
                        <CustomButton href="#brighter-displays" text="Discover"/>
                    </div>
                </div>
            </div>
            <div className="sections-container" id="brighter-displays">
                <section className="py-20 px-6">
                    <div className="max-w-7xl mx-auto">
                        <div className="section-card grid lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-4xl font-bold text-[#151f25] mb-6">Brighter displays</h2>
                                <h3 className="text-xl font-semibold text-[#151f25] mb-4">A New Device Engineering</h3>
                                <p className="text-[#151f25]/70 mb-6 leading-relaxed">
                                    Our primary focus is on the surface science, where most of the
                                    ground breaking science occurs. Through a combination of variety of
                                    surface analysis techniques. We seize one the chemical changes within
                                    a surface for improved device behavior.
                                </p>
                                <div className="flex items-center gap-10">
                                    <CustomButton href="/benefits" text="Discover"/>
                                </div>
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
                <section className="py-20 px-6 bg-gray-50 sections-containertwo">
                    <div className="max-w-7xl mx-auto">
                        <div className="section-two grid lg:grid-cols-2 gap-12 items-center">
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
                                    Operating at the intersection of chemistry, material science, and device engineering, we design
                                    smart molecular systems that enhance the performance of organic optoelectronic devices in
                                    applications ranging from creating tailor-made technologies that unlock new possibilities in
                                    OLED Displays, Solar Applications, and beyond.
                                </p>
                                <p className="text-[#151f25]/70 mb-6 leading-relaxed">
                                    From our lab at Loyola University Chicago, we engineer surfaces at the molecular level to solve
                                    real-world challenges — from improving adhesion and charge injection to optimizing organic-
                                    inorganic interfaces with precision. Our mission: to enable brighter, more efficient, and more
                                    reliable devices by transforming how surfaces interact.
                                </p>
                                <CustomButton href="/benefits#material" text="Discover" />
                            </div>
                        </div>
                    </div>
                </section>
                <section className="py-20 px-6 sections-containerthree">
                    <div className="max-w-7xl mx-auto">
                        <div className="section-three grid lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-4xl font-bold text-gray-900 mb-6">Revolution in OLED performance</h2>
                                <h3 className="text-xl font-semibold text-gray-800 mb-4">We increase efficiency</h3>
                                <p className="text-gray-600 mb-6 leading-relaxed">
                                    The synergism of our multidisciplinary team encompasses chemistry, engineering  and the technological sense of business. Such synergism allow integration to industries worldwide will lead to a new recognition in the field of display technology. By pursuing such technological developments Lumina will increase efficiency of OLED displays for consumer and corporate utilization.
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
                <section className="lab-container relative py-20 lg:min-h-[450px] min-h-[550px] overflow-hidden">
                    <PastelRibbons3D />
                    <div className="relative z-10 px-6">
                        <div className="lab-text text-right flex flex-col items-end lg:w-1/2 pt-12">
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
