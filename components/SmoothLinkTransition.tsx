"use client";

import { useEffect } from "react";
import { gsap } from "gsap";

export default function SmoothLinkTransition() {
  useEffect(() => {
    // Handle all link clicks for smooth transitions
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a[href^="/"]') as HTMLAnchorElement;

      if (!link || target.closest('.no-transition')) return;

      const href = link.getAttribute('href');
      if (!href || href === window.location.pathname) return;

      e.preventDefault();

      // Create exit animation
      const pageContent = document.querySelector('.page-transition');
      if (pageContent) {
        gsap.to(pageContent, {
          opacity: 0,
          y: -20,
          scale: 0.98,
          duration: 0.4,
          ease: "power3.in",
          onComplete: () => {
            // Navigate after animation
            window.location.href = href;
          }
        });
      } else {
        window.location.href = href;
      }
    };

    document.addEventListener('click', handleLinkClick);

    return () => {
      document.removeEventListener('click', handleLinkClick);
    };
  }, []);

  return null;
}