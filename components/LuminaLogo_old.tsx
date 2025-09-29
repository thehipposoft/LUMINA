"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface LuminaLogoProps {
  size?: number;
  className?: string;
  animated?: boolean;
}

export default function LuminaLogo({
  size = 40,
  className = "",
  animated = true
}: LuminaLogoProps) {
  const logoRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!animated || !logoRef.current) return;

    const ctx = gsap.context(() => {
      // Initial setup - layers stacked
      gsap.set(".logo-layer", {
        transformOrigin: "center center",
      });

      // Subtle floating animation
      gsap.to(".logo-layer-1", {
        y: -2,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
        delay: 0,
      });

      gsap.to(".logo-layer-2", {
        y: -1.5,
        duration: 2.2,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
        delay: 0.2,
      });

      gsap.to(".logo-layer-3", {
        y: -1,
        duration: 2.4,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
        delay: 0.4,
      });

      gsap.to(".logo-layer-4", {
        y: -0.5,
        duration: 2.6,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
        delay: 0.6,
      });

      // Subtle rotation animation
      gsap.to(".logo-layer", {
        rotation: 1,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
        stagger: 0.1,
      });

      // Hover animation
      const handleMouseEnter = () => {
        gsap.to(".logo-layer-1", {
          y: -6,
          rotation: 3,
          duration: 0.6,
          ease: "power2.out",
        });
        gsap.to(".logo-layer-2", {
          y: -4,
          rotation: 2,
          duration: 0.6,
          ease: "power2.out",
          delay: 0.1,
        });
        gsap.to(".logo-layer-3", {
          y: -2,
          rotation: 1,
          duration: 0.6,
          ease: "power2.out",
          delay: 0.2,
        });
        gsap.to(".logo-layer-4", {
          y: 0,
          rotation: 0,
          duration: 0.6,
          ease: "power2.out",
          delay: 0.3,
        });
      };

      const handleMouseLeave = () => {
        gsap.to(".logo-layer", {
          y: 0,
          rotation: 0,
          duration: 0.8,
          ease: "elastic.out(1, 0.3)",
          stagger: 0.1,
        });
      };

      if (logoRef.current) {
        logoRef.current.addEventListener("mouseenter", handleMouseEnter);
        logoRef.current.addEventListener("mouseleave", handleMouseLeave);

        return () => {
          if (logoRef.current) {
            logoRef.current.removeEventListener("mouseenter", handleMouseEnter);
            logoRef.current.removeEventListener("mouseleave", handleMouseLeave);
          }
        };
      }

    }, logoRef);

    return () => ctx.revert();
  }, [animated]);

  return (
    <svg
      ref={logoRef}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={`cursor-pointer ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Gradient Definitions */}
      <defs>
        <linearGradient id="layer1Gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.8" />
        </linearGradient>

        <linearGradient id="layer2Gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#1D4ED8" stopOpacity="0.7" />
        </linearGradient>

        <linearGradient id="layer3Gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#0891B2" stopOpacity="0.6" />
        </linearGradient>

        <linearGradient id="layer4Gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10B981" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#059669" stopOpacity="0.5" />
        </linearGradient>

        {/* Shadow filters */}
        <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="rgba(0,0,0,0.15)"/>
        </filter>
      </defs>

      {/* Layer 4 - Bottom (Green/Teal) */}
      <path
        className="logo-layer logo-layer-4"
        d="M20 40 Q20 20 40 20 L60 20 Q80 20 80 40 L80 50 Q80 70 60 70 L40 70 Q20 70 20 50 Z"
        fill="url(#layer4Gradient)"
        filter="url(#shadow)"
      />

      {/* Layer 3 - Cyan */}
      <path
        className="logo-layer logo-layer-3"
        d="M15 35 Q15 15 35 15 L65 15 Q85 15 85 35 L85 45 Q85 65 65 65 L35 65 Q15 65 15 45 Z"
        fill="url(#layer3Gradient)"
        filter="url(#shadow)"
      />

      {/* Layer 2 - Blue */}
      <path
        className="logo-layer logo-layer-2"
        d="M10 30 Q10 10 30 10 L70 10 Q90 10 90 30 L90 40 Q90 60 70 60 L30 60 Q10 60 10 40 Z"
        fill="url(#layer2Gradient)"
        filter="url(#shadow)"
      />

      {/* Layer 1 - Top (Purple) */}
      <path
        className="logo-layer logo-layer-1"
        d="M5 25 Q5 5 25 5 L75 5 Q95 5 95 25 L95 35 Q95 55 75 55 L25 55 Q5 55 5 35 Z"
        fill="url(#layer1Gradient)"
        filter="url(#shadow)"
      />

      {/* White center shape */}
      <path
        className="logo-layer logo-center"
        d="M30 35 L50 25 L70 35 L70 45 L50 55 L30 45 Z"
        fill="white"
        filter="url(#shadow)"
      />
    </svg>
  );
}