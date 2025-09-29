"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LuminaLogo from "../../components/LuminaLogo";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function WhatWeDo() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".fade-in", {
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".content-sections",
          start: "top 70%",
          end: "bottom center",
        },
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
            What we do
          </h1>
          <p className="text-xl text-white/90 leading-relaxed">
            We engineer molecular interfaces to revolutionize OLED technology
          </p>
        </div>
      </section>

      {/* Content Sections */}
      <div className="content-sections py-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* How Section */}
          <section className="fade-in mb-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-[#151f25] mb-4">How</h2>
              <div className="w-24 h-1 bg-[#007BFF] mx-auto"></div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-2xl shadow-xl">
                <div className="w-16 h-16 bg-gradient-to-br from-[#007BFF] to-[#A044FF] rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-[#151f25] mb-4">Surface Science Research</h3>
                <p className="text-[#151f25]/70 leading-relaxed">
                  We focus on surface science where most groundbreaking discoveries occur,
                  using advanced techniques like MALDI XPS, PEMIHAS, UV-vis, and XRD.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-xl">
                <div className="w-16 h-16 bg-gradient-to-br from-[#35E3ED] to-[#007BFF] rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-[#151f25] mb-4">Molecular Engineering</h3>
                <p className="text-[#151f25]/70 leading-relaxed">
                  We design smart molecular systems that enhance the performance of
                  organic optoelectronic devices in OLED and OPV applications.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-xl">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-red-500 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Device Optimization</h3>
                <p className="text-gray-600 leading-relaxed">
                  We engineer surfaces at the molecular level to improve adhesion,
                  charge injection, and optimize organic-inorganic interfaces.
                </p>
              </div>
            </div>
          </section>

          {/* Why Section */}
          <section className="fade-in mb-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Why</h2>
              <div className="w-24 h-1 bg-blue-500 mx-auto"></div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-12">
              <div className="max-w-4xl mx-auto text-center">
                <h3 className="text-3xl font-bold text-gray-900 mb-8">
                  The Future of Display Technology Demands Innovation
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed mb-8">
                  Current OLED technology faces limitations in efficiency, brightness, and longevity.
                  These challenges require breakthrough solutions at the molecular level. Our research
                  addresses these fundamental issues by reimagining how light and matter interact.
                </p>
                <div className="grid md:grid-cols-3 gap-8 text-center">
                  <div>
                    <div className="text-4xl font-bold text-blue-600 mb-2">50%</div>
                    <p className="text-gray-700">Efficiency Improvement</p>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-green-600 mb-2">3x</div>
                    <p className="text-gray-700">Brightness Enhancement</p>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-purple-600 mb-2">2x</div>
                    <p className="text-gray-700">Device Longevity</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Benefits Section */}
          <section className="fade-in">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Benefits</h2>
              <div className="w-24 h-1 bg-blue-500 mx-auto"></div>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">For Industry</h3>
                <ul className="space-y-4">
                  <li className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mt-1">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Reduced Manufacturing Costs</h4>
                      <p className="text-gray-600">More efficient processes lead to significant cost savings in production</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mt-1">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Enhanced Product Performance</h4>
                      <p className="text-gray-600">Superior display quality and longer-lasting devices</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mt-1">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Competitive Advantage</h4>
                      <p className="text-gray-600">Stay ahead with next-generation technology</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">For Consumers</h3>
                <ul className="space-y-4">
                  <li className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Brighter, More Vivid Displays</h4>
                      <p className="text-gray-600">Enhanced visual experience with improved brightness and color accuracy</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Longer Device Lifespan</h4>
                      <p className="text-gray-600">Devices that last longer and maintain performance over time</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Energy Efficiency</h4>
                      <p className="text-gray-600">Lower power consumption and extended battery life</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Technology?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Let&apos;s discuss how LUMINA can help you achieve breakthrough results
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-full hover:bg-gray-100 transition-colors font-semibold text-lg">
            Get in Touch
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <LuminaLogo size={32} animated={false} />
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