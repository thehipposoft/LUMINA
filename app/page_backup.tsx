"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Hero              <div className="order-2 lg:order-1">
                <div className="bg-white rounded-3xl overflow-hidden shadow-xl">
                  <PlaceholderImage 
                    width={600}
                    height={400}
                    text="Team Working"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>/components/Hero3D";
import PastelRibbons3D from "../components/PastelRibbons3D";
import PlaceholderImage from "../components/PlaceholderImage";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animations
      const tl = gsap.timeline({ delay: 0.5 });

      tl.from(".nav-item", {
        opacity: 0,
        y: -20,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
      })
      .from(titleRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
      }, "-=0.3")
      .from(".hero-subtitle", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
      }, "-=0.5");

      // Scroll animations
      gsap.from(".section-card", {
        opacity: 0,
        y: 80,
        duration: 1,
        stagger: 0.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".sections-container",
          start: "top 70%",
          end: "bottom center",
        },
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-white overflow-hidden">
      {/* Navigation */}
      <header className="relative z-50 bg-white/90 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-sm transform rotate-45"></div>
              </div>
              <span className="nav-item text-xl font-bold text-gray-800">LUMINA</span>
              <span className="nav-item text-sm text-gray-600">TECHNOLOGIES</span>
            </div>

            <div className="hidden md:flex space-x-8">
              <a href="#" className="nav-item text-gray-700 hover:text-blue-600 transition-colors">What we do</a>
              <a href="#" className="nav-item text-gray-700 hover:text-blue-600 transition-colors">Blog</a>
              <a href="#" className="nav-item text-gray-700 hover:text-blue-600 transition-colors">LuminaLab</a>
              <a href="#" className="nav-item text-gray-700 hover:text-blue-600 transition-colors">Contact</a>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 overflow-hidden">
        {/* 3D Background */}
        <Hero3D />

        {/* Hero Content */}
        <div className="relative z-20 flex items-center justify-center min-h-screen px-6">
          <div className="text-center max-w-4xl">
            <h1
              ref={titleRef}
              className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
            >
              A <span className="font-black">REVOLUTION</span> in OLED technology.
            </h1>
          </div>
        </div>

        {/* Floating Info Card */}
        <div className="absolute bottom-10 right-10 bg-white rounded-2xl p-6 shadow-xl max-w-sm z-30">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1V8zm8 0a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1h-4a1 1 0 01-1-1V8zm0 4a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1h-4a1 1 0 01-1-1v-2z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Intelligent molecular synthesis</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <div className="sections-container">
        {/* Brighter Displays Section */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="section-card grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">Brighter displays</h2>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">A New Device Engineering</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Our primary focus is on the surface science, where most of the ground
                  breaking science occurs. Through a combination of MALDI XPS, PEMIHAS,
                  UV-vis, XRD, X-ray crystallography, and SEM we seize one the chemical
                  changes within a surface for improved device behavior.
                </p>
                <button className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition-colors">
                  Discover
                </button>
              </div>
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl p-8 flex items-center justify-center min-h-[400px]">
                <div className="w-48 h-32 bg-black rounded-2xl shadow-2xl transform rotate-12 flex items-center justify-center">
                  <div className="w-40 h-24 bg-white rounded-lg"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Innovative Solutions Section */}
        <section className="py-20 px-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="section-card grid lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="bg-white rounded-3xl overflow-hidden shadow-xl">
                  <Image
                    src="/api/placeholder/600/400"
                    alt="Team working"
                    width={600}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <h2 className="text-4xl font-bold text-gray-900 mb-6">Innovative Solutions</h2>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">A new generation of materials</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Operating at the intersection of chemistry, material science, and device
                  engineering, we design smart molecular systems that enhance the
                  performance of organic optoelectronic devices in applications ranging from
                  creating tailor-made technologies that unlock new possibilities in OLEDs,
                  OPVs, and beyond.
                </p>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  From our lab at Loyola University Chicago, we engineer surfaces at the
                  molecular level to solve real-world challenges — from improving adhesion
                  and charge injection to optimizing organic-inorganic interfaces with
                  precision. Our mission: to enable brighter, more efficient, and more reliable
                  devices by transforming how surfaces interact.
                </p>
                <button className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition-colors">
                  Discover
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Revolution in OLED Performance Section */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="section-card grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">Revolution in OLED performance</h2>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">We increase efficiency</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Through the synergism of our multidisciplinary team encompassing
                  chemical, engineering and the technological sense of business. Such
                  synergism allow integration to industries worldwide will lead to a new
                  recognition in the field of Nanotechnology. By pursuing such technological
                  developments Molecular Interfaces will increase efficiency of OLED and LED
                  electronics for consumer and corporate utilization.
                </p>
                <button className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition-colors">
                  Discover
                </button>
              </div>
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl p-8 flex items-center justify-center min-h-[400px]">
                <Image
                  src="/api/placeholder/400/300"
                  alt="OLED Device"
                  width={400}
                  height={300}
                  className="rounded-2xl shadow-xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* LuminaLAB Section */}
        <section className="relative py-20 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 overflow-hidden">
          {/* 3D Ribbons Background */}
          <PastelRibbons3D />

          <div className="relative z-10 text-center px-6">
            <div className="max-w-2xl mx-auto">
              <p className="text-lg text-gray-700 mb-4">We reimagine the interface between light and matter</p>
              <h2 className="text-5xl font-bold text-gray-900 mb-8">LuminaLAB.</h2>
              <button className="bg-blue-500 text-white px-8 py-3 rounded-full hover:bg-blue-600 transition-colors">
                Discover
              </button>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div>
                <div className="flex items-center space-x-4 mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1V8zm8 0a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1h-4a1 1 0 01-1-1V8zm0 4a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1h-4a1 1 0 01-1-1v-2z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-4xl font-bold text-gray-900">Contact us</h2>
                  </div>
                </div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Let&apos;s Create the Future Together</h3>
                <p className="text-gray-600 leading-relaxed">
                  Whether you&apos;re developing a next-generation device or
                  looking for research solutions, our team is ready to
                  collaborate. Contact us to explore how LUMINA can help
                  bring your vision to life.
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-xl p-8">
                <form className="space-y-6">
                  <div>
                    <input
                      type="text"
                      placeholder="Company / Name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                  </div>
                  <div>
                    <textarea
                      rows={4}
                      placeholder="Message"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors font-semibold"
                  >
                    Send
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <div className="w-4 h-4 bg-white rounded-sm transform rotate-45"></div>
                </div>
                <span className="text-xl font-bold text-gray-800">LUMINA</span>
                <span className="text-sm text-gray-600">TECHNOLOGIES</span>
              </div>
              <p className="text-sm text-gray-600 mb-4">© 2025 LUMINA TECHNOLOGIES. All Rights Reserved.</p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-4">What we do</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-blue-600">How</a></li>
                <li><a href="#" className="hover:text-blue-600">Why</a></li>
                <li><a href="#" className="hover:text-blue-600">Benefits</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-4">LuminaLab</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-blue-600">Lumi 1</a></li>
                <li><a href="#" className="hover:text-blue-600">Lumi 2</a></li>
                <li><a href="#" className="hover:text-blue-600">Lumi 3</a></li>
                <li><a href="#" className="hover:text-blue-600">Lumi 4</a></li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-500">
              Created by <span className="font-semibold">hipposoft</span> | All Right Reserved
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
