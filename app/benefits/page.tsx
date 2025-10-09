import { Metadata } from "next";
import Benefits from "./Benefits";

export const metadata: Metadata = {
    title: 'Lumina | Benefits',
    description: 'Discover the benefits of our innovative solutions and services.',
};

export default function BenefitsPage() {
    return (
        <Benefits />
    );
}
