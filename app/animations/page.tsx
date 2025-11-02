"use client";

import Hero3D from "@/components/Hero3D";
import Hero3D1 from "@/components/Hero3D-1";
import Hero3D2 from "@/components/Hero3D-2";
import Hero3D6 from "@/components/Hero3D-6";
import Hero3D8 from "@/components/Hero3D-8";
import Hero3D9 from "@/components/Hero3D-9";

export default function AnimationsDemo() {
    return (
        <div>
            <div className="relative min-h-screen overflow-hidden rounded-3xl hidden">
                <Hero3D />
            </div>
            <div className="relative min-h-screen overflow-hidden rounded-3xl mt-10 hidden">
                <Hero3D1 />
            </div>
            <div className="relative min-h-screen overflow-hidden rounded-3xl mt-10 hidden">
                <Hero3D8 />
            </div>
            <div className="relative min-h-screen overflow-hidden rounded-3xl mt-10 flex items-center hero-background">
                <h1 className="text-4xl font-bold text-center p-6 z-10">
                    A REVOLUTION IN OLED TECHNOLOGY
                </h1>
                <div className="w-full">
                    <Hero3D9 />
                </div>
            </div>

            <div className="relative min-h-screen overflow-hidden rounded-3xl mt-10 hidden">
                <Hero3D2 />
            </div>
            <div className="relative min-h-screen overflow-hidden rounded-3xl mt-10 hidden">
                <Hero3D6 />
            </div>
        </div>
    );
}
