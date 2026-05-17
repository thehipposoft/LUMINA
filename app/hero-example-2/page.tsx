"use client";
import dynamic from "next/dynamic";
import SeoHead from "@/components/SeoHead";
import SeoJsonLd from "@/components/SeoJsonLd";
import { buildWebPageSchema } from "@/lib/seo";

const DynamicScene = dynamic(() => import("../../components/Scene"), {
    ssr: false
});

export default function AnimationsDemo() {
    return (
        <div className="p-6 min-h-screen bg-black">
            <SeoHead
                title="LUMINA | Hero Example 2"
                description="Internal hero prototype variation 2 for LUMINA 3D animation testing."
                path="/hero-example-2"
                noIndex
            />
            <SeoJsonLd
                data={buildWebPageSchema({
                    name: "LUMINA Hero Example 2",
                    description: "Internal hero prototype variation 2 for LUMINA 3D animation testing.",
                    path: "/hero-example-2",
                })}
            />
            <DynamicScene />
        </div>
    );
}
