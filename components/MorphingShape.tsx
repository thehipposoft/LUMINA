"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface MorphingShapeProps {
  size?: number;
  color?: string;
  className?: string;
}

export default function MorphingShape({
  size = 200,
  color = "#8B5CF6",
  className = ""
}: MorphingShapeProps) {
  const shapeRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (!shapeRef.current) return;

    const shapes = [
      "M50,50 Q100,25 150,50 Q125,100 100,150 Q50,125 25,100 Q25,75 50,50 Z",
      "M75,25 Q125,25 175,75 Q125,125 75,125 Q25,75 25,25 Q50,25 75,25 Z",
      "M100,25 Q150,50 150,100 Q150,150 100,150 Q50,150 25,125 Q25,75 50,50 Q75,25 100,25 Z",
      "M100,50 Q150,50 175,100 Q150,150 100,150 Q50,150 25,100 Q50,50 100,50 Z"
    ];

    const tl = gsap.timeline({ repeat: -1, yoyo: true });

    shapes.forEach((shape) => {
      tl.to(shapeRef.current, {
        attr: { d: shape },
        duration: 2,
        ease: "power2.inOut",
      });
    });

    // Add rotation animation
    gsap.to(shapeRef.current, {
      rotation: 360,
      duration: 20,
      repeat: -1,
      ease: "none",
      transformOrigin: "center center",
    });

  }, []);

  return (
    <div className={className}>
      <svg width={size} height={size} viewBox="0 0 200 200">
        <defs>
          <linearGradient id="morphGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity={0.8} />
            <stop offset="100%" stopColor={color} stopOpacity={0.3} />
          </linearGradient>
        </defs>
        <path
          ref={shapeRef}
          d="M50,50 Q100,25 150,50 Q125,100 100,150 Q50,125 25,100 Q25,75 50,50 Z"
          fill="url(#morphGradient)"
          stroke={color}
          strokeWidth="2"
        />
      </svg>
    </div>
  );
}