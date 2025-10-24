'use client';
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

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
            <section className="container mx-auto py-20 flex gap-8 w-[85vw]">
                <div className="text-black-text md:w-[415px] flex flex-col gap-3">
                    <h3 className="text-4xl font-semibold ">
                        Brighter displays
                    </h3>
                    <h2 className="text-xl font-semibold mb-2">
                        A New Device Engineering
                    </h2>
                    <p className="mb-2 text-sm">
                        The displays on the next generation of Samsung phones have a weakness. Their under-display cameras don’t receive enough light because the OLED is not sufficiently transparent. The next generation of Apple watch has a problem. Its OLED displays weren’t bright enough.                    </p>
                    <p className="mb-2 text-sm">
                        The next generation of AR/VR is challenged by light output. Efficiency, light output, and transparency issues are a common theme throughout the OLED display market and one we’re poised to address.                    </p>
                    <p className="font-bold text-sm">
                        Our company has generated an idealized chemical that addresses multiple pain points within OLEDs and works cross-platform.
                    </p>
                </div>
                <div className="w-7/12 content-sections bg-amber-200">
                    Carousel
                </div>
            </section>

            <section className="w-screen relative">
                <Image src={'/images/vectors/angle.svg'} width={120} height={360} alt="Lumina Arrow" className=" w-20 absolute left-0" />
                <div className="flex flex-col w-[85vw] mx-auto">
                    <h4 className="font-semibold text-2xl">Our chemical can:</h4>
                    <div className="flex justify-between pt-8">
                        <div className="flex relative flex-col gap-4">
                            <div className="h-1.5 md:w-40 bg-secondary-bg absolute -right-3/5 top-1/4" />
                            <Image src={'/images/benefits/benefits-icon1.svg'} alt="Benefits Icon 1" width={130} height={80} />
                            <p className="w-[220px] text-sm">Allow metal electrodes on the organic materials in the OLED to be made thinner, increasing light output (brighter OLED)</p>
                        </div>
                        <div className="flex relative flex-col items-center  gap-4">
                            <div className="h-1.5 md:w-40 bg-secondary-bg absolute -right-3/5 top-1/4" />
                            <Image src={'/images/benefits/benefits-icon2.svg'} alt="Benefits Icon 1" width={100} height={80} />
                            <p className="w-[220px] text-sm">Thinner electrodes improve energy efficiency of the device (improved carbon footprint/ESG), </p>
                        </div>
                        <div className="flex relative flex-col items-center gap-4">
                            <div className="h-1.5 md:w-40 bg-secondary-bg absolute -right-3/5 top-1/4" />
                            <Image src={'/images/benefits/benefits-icon3.svg'} alt="Benefits Icon 1" width={100} height={80} />
                            <p className="w-[220px] text-sm">Lookthrough OLED applications gain higher transparency (better seeing)</p>
                        </div>
                        <div className="flex relative flex-col items-center gap-4">
                            <Image src={'/images/benefits/benefits-icon4.svg'} alt="Benefits Icon 1" width={100} height={80} />
                            <p className="w-[220px] text-sm">All OLEDs potentially gain a massive decrease in materials usage (lower cost). </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="container mx-auto py-20 flex gap-8">
                <div className="w-7/12 content-sections bg-amber-200">
                    Carousel
                </div>
                <div className="text-black-text md:w-[415px]  flex flex-col gap-3">
                    <h3 className="text-4xl font-semibold ">
                        Innovative Solutions
                    </h3>
                    <h2 className="text-xl font-semibold mb-2">
                        A new generation of materials
                    </h2>
                    <p className="mb-2 text-sm">
                        Molecular Interfaces have developed a unique chemical structure that contains exceptionally effective binders of metal, at a high density of binders, and created the only method by which these structures can be generated at the surface. </p>
                    <p className="mb-2 text-sm">
                        Our binder causes the metal to wet the surface effectively during deposition and allows exceptionally thin (~7 nm thickness) metal to be used. </p>
                    <p className=" text-sm">
                        The considerable reduction in the use of materials and, therefore, lower cost, is due to the high adhesion that confines the metal to the surface, limiting the amount of protective material needed for the underlying organic stack of materials.                    </p>
                </div>
            </section>

           <section className="container mx-auto py-20 flex gap-8 w-[85vw]">
                <div className="text-black-text md:w-[415px] flex flex-col gap-3">
                    <h3 className="text-4xl font-semibold ">
                        Revolution in OLED performance
                    </h3>
                    <h2 className="text-xl font-semibold mb-2">
                        We increase efficiency
                    </h2>
                    <p className="mb-2 text-sm">
                        Thanks to the usefulness of our “high light output” chemical, the OLED display manufacturers can create displays with greater transparency that enable higher resolution cameras (Samsung) or increase light output to make OLED displays viable in smart watches (Apple). </p>
                    <p className="mb-2 text-sm">
                        This allows them to remain relevant in a highly competitive ecosystem where alternative technologies (e.g., microLED) are attacking existing methods from within, while changes in form factors and function (foldable phones, under-screen cameras, etc.) are forcing rapid evolution from the outside, all with billions of dollars at stake ($44 billion per year).</p>
                </div>
                <div className="w-7/12 content-sections bg-amber-200">
                    Carousel
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
