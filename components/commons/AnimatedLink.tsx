'use client'
import React, { ReactNode } from "react";
import { useTransitionRouter } from "next-view-transitions";
import Link from "next/link";

type AnimatedLinkProps = {
  href: string;
  className?: string;
  children?: ReactNode;
  linkKey?: string | number; // renamed so React won’t complain
};

const pageAnimation = () => {
  document.documentElement.animate(
    [
      { opacity: 1, scale: 1, transform: "translateY(0)" },
      { opacity: 0.5, scale: 0.9, transform: "translateY(-100px)" },
    ],
    {
      duration: 1000,
      easing: "cubic-bezier(0.76, 0, 0.24, 1)",
      fill: "forwards",
      pseudoElement: "::view-transition-old(root)",
    }
  );

  document.documentElement.animate(
    [
      { transform: "translateY(100%)" },
      { transform: "translateY(0)" },
    ],
    {
      duration: 1000,
      easing: "cubic-bezier(0.76, 0, 0.24, 1)",
      fill: "forwards",
      pseudoElement: "::view-transition-new(root)",
    }
  );
};

const AnimatedLink = ({ href, className, children, linkKey }: AnimatedLinkProps) => {
  const router = useTransitionRouter();

  return (
    <Link
      key={linkKey}
      href={href}
      className={className}
        onClick={(e) => {
            e.preventDefault();
            window.scrollTo(0, 0);
            router.push(href, {
            onTransitionReady: pageAnimation,
            });
        }}
    >
      {children}
    </Link>
  );
};

export default AnimatedLink;
