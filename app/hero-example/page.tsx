"use client";
import Hero3D8 from "@/components/Hero3D-8";

export default function AnimationsDemo() {
    return (
        <div>
            <div className="relative min-h-screen overflow-hidden">
                <div className="absolute inset-0 z-10 pointer-events-none flex justify-center top-8">
                   <h1 className="text-6xl text-center p-6 z-10 w-[60%] text-white transition-all">
                        A <span className="font-bold transition-all">REVOLUTION</span> <br /> IN OLED TECHNOLOGY
                    </h1>
                </div>
                <Hero3D8 />
            </div>
        </div>
    );
}
