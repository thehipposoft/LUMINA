"use client";

import { useEffect, useRef} from "react";
import { gsap } from "gsap";
import { usePathname, useRouter } from "next/navigation";

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
}

export default function PageTransition({ children}: PageTransitionProps) {
    const router = useRouter();
    const overlayRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();
    const isTransitioning = useRef(false);
    const hasPlayedInitial = useRef(false);
    const previousPathname = useRef<string | null>(null)

  useEffect(() => {
    if (hasPlayedInitial.current && !isTransitioning.current) {
        return;
    }
    playEntryAnimation();
    hasPlayedInitial.current = true;
  }, [pathname]);

  const playEntryAnimation = () => {
    const isRouteChange = previousPathname.current !== null;

    const entryTL = gsap.timeline({
        onComplete: () => {
            isTransitioning.current = false;
            previousPathname.current = pathname;
        },
    })

    if (isRouteChange) {
        entryTL
            .set(overlayRef.current, {
                translateY: "100%",
                scale: 0.5,
                rotate: 38
            })
        entryTL
            .to(overlayRef.current, {
                translateY: "0%",
                scale: 1,
                rotate: 0,
                duration: 1,
                ease: "power2.inOut"
            })
    }

    entryTL.to(".page-content", {
        opacity: 1,
        duration: .5,
        ease: "power2.inOut"
    });

    entryTL.play();
  };

  useEffect(() => {
    const handleClick = (e: Event) => {
        const href = (e.currentTarget as HTMLAnchorElement).getAttribute("href")

        if(href) {
            const url = new URL(href, window.location.origin).pathname;
            if (url !== pathname && !isTransitioning.current) {
                isTransitioning.current = true;
                hasPlayedInitial.current = false;
                exitPage(url);
            }
        }
    };

    const links = document.querySelectorAll('a[href^="/"]')
    links.forEach(link => {
        link.addEventListener('click', handleClick)
    })

    return () => {
        links.forEach((link) => {
            link.removeEventListener("click", handleClick)
        });
    };
  }, [pathname]);

  const exitPage = (url: string) => {
    const exitTL = gsap.timeline({
        onComplete: () => {
            router.push(url)
        }
    });

    exitTL.to(".page-content", {
        opacity: 0,
        duration: 0.5,
    });

    exitTL.to(overlayRef.current, {
        translateY: "200%",
        rotate: -30,
        scale: 0.5,
        duration: 2,
    }, "-0.3");
    exitTL.play()
  }

  return (
    <>
    <div
      ref={overlayRef}
      className={`transition-overlay fixed top-0 left-0 -z-10 h-full w-full bg-brand-primary-transp`}
    >
      {children}
    </div>
    </>
  );
}


