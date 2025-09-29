"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
}

export default function PageTransition({ children, className = "" }: PageTransitionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Initial state - hidden
    gsap.set(container, {
      opacity: 0,
      y: 30,
      scale: 0.98
    });

    // Animate in
    const tl = gsap.timeline();
    tl.to(container, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      ease: "power3.out"
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`page-transition ${className}`}
    >
      {children}
    </div>
  );
}