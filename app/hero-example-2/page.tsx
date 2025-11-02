"use client";
import Hero3D9 from "@/components/Hero3D-9";

export default function AnimationsDemo() {
    return (
        <div className="p-6">
            <div className="relative min-h-screen overflow-hidden rounded-3xl mt-10 flex items-center hero-background">
                <h1 className="text-4xl font-bold text-center p-6 z-10">
                    A REVOLUTION <br /> IN OLED TECHNOLOGY
                </h1>
                <div className="w-full h-full">
                    <Hero3D9 />
                </div>
            </div>
        </div>
    );
}
