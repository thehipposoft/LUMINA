"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";
import AnimatedText from "../../components/AnimatedText";
import MorphingShape from "../../components/MorphingShape";

// Register plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, TextPlugin);
}

export default function AnimationsDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const magneticRef = useRef<HTMLDivElement>(null);
  const typewriterRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Magnetic effect
      if (magneticRef.current) {
        const magnetic = magneticRef.current;

        const handleMouseMove = (e: MouseEvent) => {
          const { left, top, width, height } = magnetic.getBoundingClientRect();
          const x = (e.clientX - left - width / 2) * 0.3;
          const y = (e.clientY - top - height / 2) * 0.3;

          gsap.to(magnetic, {
            x,
            y,
            duration: 0.3,
            ease: "power2.out",
          });
        };

        const handleMouseLeave = () => {
          gsap.to(magnetic, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: "elastic.out(1, 0.3)",
          });
        };

        magnetic.addEventListener("mousemove", handleMouseMove);
        magnetic.addEventListener("mouseleave", handleMouseLeave);

        return () => {
          magnetic.removeEventListener("mousemove", handleMouseMove);
          magnetic.removeEventListener("mouseleave", handleMouseLeave);
        };
      }
    }, containerRef);

    // Typewriter effect
    if (typewriterRef.current) {
      gsap.to(typewriterRef.current, {
        duration: 3,
        text: "This text appears like a typewriter...",
        ease: "none",
        delay: 1,
      });
    }

    // Scroll-triggered card animations
    gsap.from(".scroll-card", {
      opacity: 0,
      y: 50,
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".scroll-cards-container",
        start: "top 80%",
        end: "bottom 20%",
      },
    });

    // Create floating particles
    if (particlesRef.current) {
      const particles = [];
      for (let i = 0; i < 20; i++) {
        const particle = document.createElement("div");
        particle.className = "absolute w-2 h-2 bg-purple-500 rounded-full opacity-60";
        particle.style.left = Math.random() * 100 + "%";
        particle.style.top = Math.random() * 100 + "%";
        particlesRef.current.appendChild(particle);
        particles.push(particle);

        gsap.to(particle, {
          x: (Math.random() - 0.5) * 200,
          y: (Math.random() - 0.5) * 200,
          duration: Math.random() * 3 + 2,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut",
          delay: Math.random() * 2,
        });
      }
    }

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#151f25] text-white overflow-hidden">
      {/* Header */}
      <header className="p-8 text-center">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-[#35E3ED] to-[#A044FF] bg-clip-text text-transparent">
          GSAP Animation Showcase
        </h1>
        <p className="text-white/70 text-lg">
          Explore the power of GSAP with React and Next.js
        </p>
      </header>

      {/* Animated Text Section */}
      <section className="py-16 text-center">
        <h2 className="text-3xl font-bold mb-8">Animated Text</h2>
        <AnimatedText
          text="Each letter animates individually!"
          className="text-2xl font-semibold text-purple-300"
          delay={0.5}
        />
      </section>

      {/* Morphing Shape Section */}
      <section className="py-16 text-center">
        <h2 className="text-3xl font-bold mb-8">Morphing SVG</h2>
        <div className="flex justify-center">
          <MorphingShape size={250} color="#A855F7" />
        </div>
      </section>

      {/* Magnetic Effect Section */}
      <section className="py-16 text-center">
        <h2 className="text-3xl font-bold mb-8">Magnetic Effect</h2>
        <div
          ref={magneticRef}
          className="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg cursor-pointer font-semibold transform transition-all duration-300 hover:scale-105"
        >
          Hover over me!
        </div>
      </section>

      {/* Typewriter Effect Section */}
      <section className="py-16 text-center">
        <h2 className="text-3xl font-bold mb-8">Typewriter Effect</h2>
        <div
          ref={typewriterRef}
          className="text-xl text-green-400 font-mono"
        >
          {/* Text will be animated in */}
        </div>
      </section>

      {/* Scroll-triggered Animations */}
      <section className="py-16 px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Scroll Animations</h2>
        <div className="scroll-cards-container grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className="scroll-card p-6 bg-gradient-to-br from-purple-900/50 to-pink-900/50 backdrop-blur-sm rounded-xl border border-purple-500/20"
              data-scroll-trigger
            >
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4">
                <span className="text-white font-bold">{item}</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Animation Card {item}</h3>
              <p className="text-gray-300">
                This card animates when it enters the viewport using ScrollTrigger.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Floating Particles Background */}
      <div ref={particlesRef} className="fixed inset-0 pointer-events-none z-0" />

      {/* Footer */}
      <footer className="py-12 text-center text-gray-400 border-t border-gray-800">
        <p>Built with React, Next.js, and GSAP ✨</p>
        <div className="mt-4">
          <Link
            href="/"
            className="text-purple-400 hover:text-purple-300 transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </footer>
    </div>
  );
}