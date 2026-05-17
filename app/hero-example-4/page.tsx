"use client";
import Hero3D9 from "@/components/Hero3D-9";
import SeoHead from "@/components/SeoHead";
import SeoJsonLd from "@/components/SeoJsonLd";
import { buildWebPageSchema } from "@/lib/seo";

export default function AnimationsDemo() {
    return (
        <div className="">
            <SeoHead
                title="LUMINA | Hero Example 4"
                description="Internal hero prototype variation 4 for LUMINA 3D animation testing."
                path="/hero-example-4"
                noIndex
            />
            <SeoJsonLd
                data={buildWebPageSchema({
                    name: "LUMINA Hero Example 4",
                    description: "Internal hero prototype variation 4 for LUMINA 3D animation testing.",
                    path: "/hero-example-4",
                })}
            />
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
