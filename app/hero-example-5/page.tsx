"use client";
import Hero3D6 from "@/components/Hero3D-wave";

export default function AnimationsDemo() {
    return (
        <div className="">
            <div className="relative h-[90vh] overflow-hidden flex items-center justify-center hero-background flex-wrap">
                <h1 className="absolute text-3xl lg:text-6xl top-12 lg:top-0 text-center p-6 z-10 w-full lg:w-[40%] text-white transition-all">
                    A <span className="font-bold transition-all">REVOLUTION</span> <br /> IN OLED TECHNOLOGY
                </h1>
                <div className="w-full h-full">
                    <div className="h-full rounded-3xl">
                        <Hero3D6 />
                    </div>
                </div>
            </div>
        </div>
    );
}
