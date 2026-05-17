import { Metadata } from "next";
import Benefits from "./Benefits";
import SeoJsonLd from "@/components/SeoJsonLd";
import { buildMetadata, buildWebPageSchema } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
    title: "LUMINA | Benefits",
    description:
        "Discover how LUMINA's molecular surface solutions improve OLED brightness, stability, and efficiency.",
    path: "/benefits",
    keywords: ["OLED benefits", "surface chemistry", "display efficiency"],
});

export default function BenefitsPage() {
    return (
        <>
            <SeoJsonLd
                data={buildWebPageSchema({
                    name: "LUMINA Benefits",
                    description:
                        "Discover how LUMINA's molecular surface solutions improve OLED brightness, stability, and efficiency.",
                    path: "/benefits",
                })}
            />
            <Benefits />
        </>
    );
}
