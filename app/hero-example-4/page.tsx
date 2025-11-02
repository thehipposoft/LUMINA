"use client";
import Hero3D9 from "@/components/Hero3D-9";

export default function AnimationsDemo() {
    return (
        <div className="">
            <div className="relative h-[90vh] overflow-hidden flex items-center bg-black flex-wrap">
                <h1 className="absolute lg:relative text-3xl lg:text-6xl top-12 lg:top-0 text-center p-6 z-10 w-full lg:w-[40%] text-white transition-all">
                    A <span className="font-bold transition-all">REVOLUTION</span> <br /> IN OLED TECHNOLOGY
                </h1>
                <div className="lg:p-10 w-full lg:w-[60%] h-full">
                    <div className="h-full rounded-3xl">
                        <Hero3D9 />
                    </div>
                </div>
            </div>
        </div>
    );
}
