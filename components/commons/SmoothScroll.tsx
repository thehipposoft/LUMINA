// lenis-provider.tsx
"use client";
import { ReactLenis } from "lenis/react";
import { FC, useRef } from "react";

type LenisScrollProviderProps = {
  children: React.ReactNode;
};
const SmoothScroll: FC<LenisScrollProviderProps> = ({ children }) => {
  const lenisRef = useRef(null);
  return <ReactLenis ref={lenisRef} root options={{ lerp: 0.1, duration: 2, smoothWheel: true }}>{children}</ReactLenis>;
};

export default SmoothScroll;
