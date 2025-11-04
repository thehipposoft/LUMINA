"use client";

import { createContext, useContext, useState, useEffect, useRef, ReactNode } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";

// 1. Definición de la interfaz para el Contexto
interface TransitionContextValue {
  isTransitioning: boolean;
}

// 2. 💡 DEFINICIÓN DE TRANSITIONCONTEXT
const TransitionContext = createContext<TransitionContextValue>({
  isTransitioning: false
});

// 3. Hook para usar el contexto (optional, but good practice)
export const useTransition = () => useContext(TransitionContext);

// 4. Componente Principal
export default function TransitionProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // CLAVE: Referencia para rastrear si ya se montó
  const isMounted = useRef(false);

  useEffect(() => {
    // --- GUARDIÁN DEL MONTAJE INICIAL ---
    // Si NO se ha montado, marcamos que ya se montó y SALIMOS (ignoramos la primera carga)
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }
    // ------------------------------------

    // Si ya estamos en medio de una transición, no hacemos nada
    if (isTransitioning) return;

    const currentContent = containerRef.current;
    if (!currentContent) return;

    // Marcar que la transición ha comenzado
    setIsTransitioning(true);

    // Animación de SALIDA
    const tl = gsap.timeline({
      onComplete: () => {
        // Cuando la salida termina, restablecer el estado
        setIsTransitioning(false);
      }
    });

    tl.to(currentContent, {
      opacity: 0,
      y: -30,
      scale: 0.98,
      duration: 0.5,
      ease: "power2.in"
    });

    return () => {
      tl.kill();
    };

  }, [pathname]);

  return (
    <TransitionContext.Provider value={{ isTransitioning }}>
      <div ref={containerRef}>{children}</div>
    </TransitionContext.Provider>
  );
}
