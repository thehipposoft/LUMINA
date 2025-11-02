"use client";
import Hero3D9 from "@/components/Hero3D-9";

export default function AnimationsDemo() {
    return (
        <div className="hero-example-3-page">
            <div className="relative h-[90vh] overflow-hidden flex items-center justify-center hero-background flex-wrap">
                <h1 className="absolute lg:relative text-3xl lg:text-6xl top-8 lg:top-0 text-center p-6 z-10 w-full lg:w-[40%] text-white transition-all">
                    A <span className="font-bold transition-all">REVOLUTION</span> <br /> IN OLED TECHNOLOGY
                </h1>
                <div className="lg:p-10 w-full lg:w-[60%] h-full">
                    <div className="bg-black h-full lg:rounded-3xl overflow-hidden">
                        <Hero3D9 />
                    </div>
                </div>
            </div>
        </div>
    );
}
