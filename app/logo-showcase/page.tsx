"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import LuminaLogo from "../../components/LuminaLogo";

export default function LogoShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".logo-showcase-item", {
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        delay: 0.5,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-[#007BFF] via-[#35E3ED] to-[#A044FF]">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Logo Showcase
          </h1>
          <p className="text-xl text-blue-100 leading-relaxed">
            Interactive SVG logo with GSAP animations
          </p>
        </div>
      </section>

      {/* Logo Variations */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
            Logo Variations & Animations
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {/* Standard Animated */}
            <div className="logo-showcase-item text-center">
              <div className="bg-white rounded-2xl shadow-xl p-8 mb-4 flex items-center justify-center h-48">
                <LuminaLogo size={80} animated={true} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Standard Animated</h3>
              <p className="text-gray-600">
                Subtle floating animation with hover effects. Perfect for navigation bars.
              </p>
            </div>

            {/* Large Static */}
            <div className="logo-showcase-item text-center">
              <div className="bg-gray-50 rounded-2xl shadow-xl p-8 mb-4 flex items-center justify-center h-48">
                <LuminaLogo size={120} animated={false} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Large Static</h3>
              <p className="text-gray-600">
                Static version for footers and print materials. Clean and professional.
              </p>
            </div>

            {/* Small Animated */}
            <div className="logo-showcase-item text-center">
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl shadow-xl p-8 mb-4 flex items-center justify-center h-48">
                <LuminaLogo size={50} animated={true} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Compact Animated</h3>
              <p className="text-gray-600">
                Smaller version with subtle animations. Great for mobile interfaces.
              </p>
            </div>

            {/* Hero Size */}
            <div className="logo-showcase-item text-center md:col-span-2 lg:col-span-3">
              <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 rounded-2xl shadow-xl p-12 mb-4 flex items-center justify-center min-h-[300px]">
                <LuminaLogo size={200} animated={true} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Hero Size</h3>
              <p className="text-gray-600">
                Large format with enhanced animations. Perfect for hero sections and splash screens.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Details */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-6">
            Technical Features
          </h2>
          <div className="text-center mb-12">
            <p className="text-lg text-gray-600 mb-4">
              Built using the original LUMINA SVG design with precise gradients and geometric shapes
            </p>
            <div className="inline-block bg-gradient-to-r from-[#35E3ED] via-[#007BFF] to-[#A044FF] text-white px-4 py-2 rounded-full text-sm font-semibold">
              Authentic LUMINA Design
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">SVG-Based</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <span>Infinitely scalable without quality loss</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <span>Small file size for fast loading</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <span>Customizable colors via CSS/props</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <span>Accessibility-friendly</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">GSAP Animations</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <span>Smooth 60fps animations</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <span>Staggered layer movements</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <span>Interactive hover effects</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <span>Performance optimized</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Code Example */}
          <div className="mt-12 bg-gray-900 rounded-2xl p-8 text-white">
            <h3 className="text-xl font-bold mb-4">Usage Example</h3>
            <pre className="text-sm text-gray-300 overflow-x-auto">
{`// Basic usage
<LuminaLogo size={40} animated={true} />

// Custom styling
<LuminaLogo
  size={80}
  animated={true}
  className="hover:scale-110 transition-transform"
/>

// Static version
<LuminaLogo size={32} animated={false} />`}
            </pre>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <LuminaLogo size={32} animated={false} />
              <span className="text-xl font-bold text-gray-800">LUMINA</span>
              <span className="text-sm text-gray-600">TECHNOLOGIES</span>
            </div>
            <p className="text-sm text-gray-500">
              Created by <span className="font-semibold">hipposoft</span> | All Right Reserved
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}