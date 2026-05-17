import { Metadata } from "next";
import PresentationVideo from "./PresentationVideo";
import SeoJsonLd from "@/components/SeoJsonLd";
import { buildMetadata, buildWebPageSchema } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
    title: "LUMINA | Presentation Video",
    description: "Watch the LUMINA presentation video about OLED innovation and molecular interfaces.",
    path: "/presentation-video",
    keywords: ["Lumina video", "OLED presentation", "technology overview"],
});

export default function PresentationVideoPage() {
    return (
        <>
            <SeoJsonLd
                data={buildWebPageSchema({
                    name: "LUMINA Presentation Video",
                    description:
                        "Watch the LUMINA presentation video about OLED innovation and molecular interfaces.",
                    path: "/presentation-video",
                })}
            />
            <PresentationVideo />
        </>
    );
}
