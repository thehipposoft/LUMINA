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
      // Set transform origins for proper animation
      gsap.set(".logo-layer-1, .logo-layer-2, .logo-layer-3", {
        transformOrigin: "center center",
      });

      // Continuous floating animations for each layer
      gsap.to(".logo-layer-1", {
        y: -3,
        rotation: 1,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
        delay: 0,
      });

      gsap.to(".logo-layer-2", {
        y: -2,
        rotation: -0.5,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
        delay: 0.5,
      });

      gsap.to(".logo-layer-3", {
        y: -1.5,
        rotation: 0.8,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
        delay: 1,
      });

      // Hover animation
      const handleMouseEnter = () => {
        gsap.to(".logo-layer-1", {
          y: -8,
          rotation: 5,
          duration: 0.6,
          ease: "power2.out",
        });
        gsap.to(".logo-layer-2", {
          y: -5,
          rotation: -3,
          duration: 0.6,
          ease: "power2.out",
          delay: 0.1,
        });
        gsap.to(".logo-layer-3", {
          y: -2,
          rotation: 2,
          duration: 0.6,
          ease: "power2.out",
          delay: 0.2,
        });
      };

      const handleMouseLeave = () => {
        gsap.to(".logo-layer-1, .logo-layer-2, .logo-layer-3", {
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
      height={size * (295.9 / 259)} // Maintain aspect ratio
      viewBox="0 0 259 295.9"
      className={`cursor-pointer ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <defs>
        <linearGradient id="luminaGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#35E3ED" />
          <stop offset="50%" stopColor="#007BFF" />
          <stop offset="100%" stopColor="#A044FF" />
        </linearGradient>
        <linearGradient id="luminaGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
           <stop offset="0%" stopColor="#35E3ED" />
          <stop offset="50%" stopColor="#007BFF" />
          <stop offset="100%" stopColor="#A044FF" />
        </linearGradient>
        <linearGradient id="luminaGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#35E3ED" />
          <stop offset="100%" stopColor="#007BFF" />
        </linearGradient>
      </defs>      {/* Layer 1 - Bottom/Base layer */}
      <g className="logo-layer-1">
        <path
          fill="url(#luminaGradient1)"
          fillRule="evenodd"
          d="M12.19,193l104.6-62a18.25,18.25,0,0,1,18.81.07l104.14,62.84-104.6,62a18.23,18.23,0,0,1-18.81-.08L12.19,193ZM259,175.68v-.85a19.5,19.5,0,0,0-9.63-16.91L139.58,93.67a19.33,19.33,0,0,0-19.4-.07L9.91,157A19.51,19.51,0,0,0,.14,173.84l0,7.11L0,212.09A19.5,19.5,0,0,0,9.63,229l109.79,64.25a19.33,19.33,0,0,0,19.4.07l110.27-63.4a19.51,19.51,0,0,0,9.77-16.84l.14-37.41Z"
        />
      </g>

      {/* Layer 2 - Middle layer */}
      <g className="logo-layer-2">
        <path
          fill="url(#luminaGradient2)"
          fillRule="evenodd"
          opacity="0.94"
          d="M258.78,127.5a16.18,16.18,0,0,0-8.61-14.43l-112-62.55a17.32,17.32,0,0,0-17.23,0L9,113.07a16.41,16.41,0,0,0,0,28.87l112,62.55a17.32,17.32,0,0,0,17.23,0l112-62.55A16.19,16.19,0,0,0,258.78,127.5Z"
        />
      </g>

      {/* Layer 3 - Top layer */}
      <g className="logo-layer-3">
        <path
          fill="url(#luminaGradient3)"
          fillRule="evenodd"
          opacity="0.94"
          d="M258.78,79.28a16.19,16.19,0,0,0-8.61-14.44l-112-62.55a17.37,17.37,0,0,0-17.23,0L9,64.84A16.41,16.41,0,0,0,9,93.71l112,62.55a17.32,17.32,0,0,0,17.23,0l112-62.55A16.18,16.18,0,0,0,258.78,79.28Z"
        />
      </g>
    </svg>
  );
}
