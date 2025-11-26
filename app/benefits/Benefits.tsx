'use client';
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Carousel from "@/components/Carousel";
import { useGSAP } from "@gsap/react";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const Benefits = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.from(".container", {
            opacity: 0,
            y: 50,
            delay: 1,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ".container",
                start: "top 60%",
            },
        })
        gsap.from(".container__two", {
            opacity: 0,
            y: 50,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ".container__two",
                start: "top 60%",
            },
        })
        gsap.from(".container_three", {
            opacity: 0,
            y: 50,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ".container_three",
                start: "top 60%",
            },
        })


        gsap.from(".vector", {
            scrollTrigger: {
                trigger: ".items-container",
                start: "top 60%",
            },
            opacity: 0,
            x: -100,
            duration: 1,
            ease: "power3.out",

        })
        gsap.from(".items > *", {
            scrollTrigger: {
                trigger: ".items-container",
                start: "top 60%",
            },
            opacity: 0,
            y: 25,
            delay: .5,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out",
        })

    }, {scope: containerRef})

    return (
        <div ref={containerRef} className="min-h-screen bg-white">
            <section className="container mx-auto pt-20 flex flex-col lg:flex-row gap-8 w-[85vw] xl:max-w-7xl justify-between">
                <div className="text-black-text md:w-[415px] pt-12 flex flex-col gap-3">
                    <h3 className="text-4xl font-semibold ">
                        Brighter displays
                    </h3>
                    <h2 className="text-xl font-semibold mb-2">
                        A New Device Engineering
                    </h2>
                    <p className="mb-2 text-sm">
                        The displays on the next generation of phones have a weakness. Their under-display cameras don’t receive enough light because the OLED is not sufficiently transparent. The next generation of watches have a problem. Their OLED displays weren’t bright enough.                    </p>
                    <p className="mb-2 text-sm">
                        The next generation of AR/VR is challenged by light output. Efficiency, light output, and transparency issues are a common theme throughout the OLED display market and one we’re poised to address.
                    </p>
                    <p className="font-bold text-sm">
                        Our company has generated an idealized chemical that addresses multiple pain points within OLEDs and works cross-platform.
                    </p>
                </div>
                <div className="">
                    <Carousel
                        slides={[

                            { image: '/images/benefits/benefits-1.jpg', text: 'Create brighter OLED displays with Lumina.' },
                            { image: '/images/benefits/benefits-2.jpg', text: 'Improve energy efficiency of devices.' },
                            { image: '/images/benefits/benefits-3.jpg', text: 'We create high-performance materials designed to meet the demands of modern electronics.' },
                        ]}
                    />
                </div>
            </section>

            <section className="items-container max-w-screen lg:py-28 relative flex items-center">
                <Image src={'/images/vectors/angle.svg'} width={120} height={360} alt="Lumina Arrow" className="md:w-20 w-16 absolute left-0 vector" />
                <div className="flex flex-col w-[85vw] xl:max-w-7xl mx-auto">
                    <h4 className="font-semibold text-3xl">Our chemical can:</h4>
                    <div className="flex flex-col lg:flex-row justify-between pt-8 items gap-8 md:gap-0">
                        <div className="flex relative flex-col items-center md:items-start gap-4">
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

            <section className="container__two lg:flex-row flex-col-reverse w-[85vw] xl:max-w-7xl mx-auto py-20 flex gap-8">
                <div className="lg:w-7/12">
                    <Carousel
                        slides={[

                            { image: '/images/benefits/benefits-4.jpg', text: 'Boost efficiency while reducing carbon footprint.' },
                            { image: '/images/benefits/benefits-5.jpg', text: 'Stronger interfaces, thinner electrodes, superior performance' },
                            { image: '/images/benefits/benefits-6.jpg', text: 'At Lumina, we reduce the use of materials and lower manufacturing costs.' },
                        ]}
                    />
                </div>
                <div className="text-black-text md:w-[415px] md:pt-12 text-justify flex flex-col gap-3">
                    <h3 className="text-4xl font-semibold ">
                        Innovative Solutions
                    </h3>
                    <h2 className="text-xl font-semibold mb-2">
                        A new generation of materials
                    </h2>
                    <p className="mb-2 text-sm">
                        Molecular Interfaces have developed a unique chemical structure that contains exceptionally effective binders of metal, at a high density of binders, and created the only method by which these structures can be generated at the surface.
                    </p>
                    <p className="mb-2 text-sm">
                        Our binder causes the metal to wet the surface effectively during deposition and allows exceptionally thin (~7 nm thickness) metal to be used.
                    </p>
                    <p className=" text-sm">
                        The considerable reduction in the use of materials and, therefore, lower cost, is due to the high adhesion that confines the metal to the surface, limiting the amount of protective material needed for the underlying organic stack of materials.
                    </p>
                </div>
            </section>

           <section className="container_three mx-auto md:py-20 pb-20 flex lg:flex-row flex-col justify-between gap-8 w-[85vw] xl:max-w-7xl">
                <div className="text-black-text md:w-[415px] md:pt-12 flex flex-col gap-3">
                    <h3 className="text-4xl font-semibold ">
                        Revolution in OLED performance
                    </h3>
                    <h2 className="text-xl font-semibold mb-2">
                        We increase efficiency
                    </h2>
                    <p className="mb-2 text-sm">
                        Thanks to the usefulness of our “high light output” chemical, the OLED display manufacturers can create displays with greater transparency that enable higher resolution cameras or increase light output to make OLED displays viable in smart watches.
                    </p>
                    <p className="mb-2 text-sm">
                        This allows them to remain relevant in a highly competitive ecosystem where alternative technologies (e.g., microLED) are attacking existing methods from within, while changes in form factors and function (foldable phones, under-screen cameras, etc.) are forcing rapid evolution from the outside, all with billions of dollars at stake ($44 billion per year).
                    </p>
                </div>
                <div className="lg:w-7/12">
                    <Carousel
                        slides={[

                            { image: '/images/benefits/benefits-7.jpg', text: "Let's create the device revolution together—sustainable chemistry is driving the future of displays." },
                            { image: '/images/benefits/benefits-8.jpg', text: "Let's create the device revolution together—sustainable chemistry is driving the future of displays." },
                            { image: '/images/benefits/benefits-9.jpg', text: 'Achieve higher transparency for under-display cameras.' },
                        ]}
                    />
                </div>
            </section>
        </div>
    );
};

export default Benefits;
