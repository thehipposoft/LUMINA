"use client";
import dynamic from "next/dynamic";

const DynamicScene = dynamic(() => import("./Scene"), {
    ssr: false
});

export default function AnimationsDemo() {
    return (
        <div className="p-6 min-h-screen bg-black">
            <DynamicScene />
        </div>
    );
}
