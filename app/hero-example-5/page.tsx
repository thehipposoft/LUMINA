"use client";
import Hero3D6 from "@/components/Hero3D-wave";
import SeoHead from "@/components/SeoHead";
import SeoJsonLd from "@/components/SeoJsonLd";
import { buildWebPageSchema } from "@/lib/seo";

export default function AnimationsDemo() {
    return (
        <div className="">
            <SeoHead
                title="LUMINA | Hero Example 5"
                description="Internal hero prototype variation 5 for LUMINA 3D animation testing."
                path="/hero-example-5"
                noIndex
            />
            <SeoJsonLd
                data={buildWebPageSchema({
                    name: "LUMINA Hero Example 5",
                    description: "Internal hero prototype variation 5 for LUMINA 3D animation testing.",
                    path: "/hero-example-5",
                })}
            />
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
