"use client";

import Hero3D from "@/components/Hero3D";
import Hero3D1 from "@/components/Hero3D-1";
import Hero3D2 from "@/components/Hero3D-2";
import Hero3D3 from "@/components/Hero3D-3";
import Hero3D4 from "@/components/Hero3D-4";
import Hero3D5 from "@/components/Hero3D-5";
import Hero3D6 from "@/components/Hero3D-6";

export default function AnimationsDemo() {
    return (
        <div>
            <div className="relative min-h-screen overflow-hidden rounded-3xl">
                <Hero3D />
            </div>
            <div className="relative min-h-screen overflow-hidden rounded-3xl mt-10">
                <Hero3D1 />
            </div>
            <div className="relative min-h-screen overflow-hidden rounded-3xl mt-10">
                <Hero3D2 />
            </div>
            <div className="relative min-h-screen overflow-hidden rounded-3xl mt-10">
                <Hero3D4 />
            </div>
            <div className="relative min-h-screen overflow-hidden rounded-3xl mt-10">
                <Hero3D5 />
            </div>
            <div className="relative min-h-screen overflow-hidden rounded-3xl mt-10">
                <Hero3D6 />
            </div>
        </div>
    );
}
