"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export default function AnimatedText({ text, className = "", delay = 0 }: AnimatedTextProps) {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    const chars = textRef.current.querySelectorAll('.char');

    gsap.set(chars, { opacity: 0, y: 50 });

    gsap.to(chars, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.05,
      ease: "power3.out",
      delay,
    });
  }, [delay]);

  const splitText = text.split('').map((char, index) => (
    <span key={index} className="char inline-block">
      {char === ' ' ? '\u00A0' : char}
    </span>
  ));

  return (
    <div ref={textRef} className={className}>
      {splitText}
    </div>
  );
}