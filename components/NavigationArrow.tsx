"use client";

import React from "react";

interface NavigationArrowProps {
  className?: string;
  size?: number;
}

export default function NavigationArrow({ className = "", size = 20 }: NavigationArrowProps) {
  return (
    <svg
      width={size}
      height={size * 2.4}
      viewBox="0 0 24 58"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`navigation-arrow ${className}`}
    >
      <defs>
        <linearGradient id="arrowGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#A044FF" />
          <stop offset="30%" stopColor="#007BFF" />
          <stop offset="70%" stopColor="#35E3ED" />
          <stop offset="100%" stopColor="#35E3ED" />
        </linearGradient>
      </defs>
      <path
        d="M3 8
           Q3 3 8 3
           L16 3
           Q21 3 21 8
           L21 45
           Q21 50 18 53
           L12 58
           Q12 58 12 58
           L6 53
           Q3 50 3 45
           Z"
        fill="url(#arrowGradient)"
        className="arrow-shape"
      />
    </svg>
  );
}