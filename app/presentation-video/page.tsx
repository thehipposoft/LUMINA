import { Metadata } from "next";
import PresentationVideo from "./PresentationVideo";

export const metadata: Metadata = {
    title: "Presentation Video",
    description: "Watch our presentation video",
};

export default function PresentationVideoPage() {
    return (
        <PresentationVideo />
    );
}
