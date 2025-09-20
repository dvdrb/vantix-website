"use client";

import React, { useState } from "react";
import Laptop from "../../assets/photos/laptop.webp";
import Image from "next/image";

const DataSightHero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % 3); // Assuming 3 slides
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + 3) % 3);
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br mt-28 from-slate-800 via-slate-900 to-gray-900 relative overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at center, #1e293b 0%, #0f172a 50%, #000000 100%)",
      }}
    >
      {/* Decorative Images Placeholders */}
      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-64 h-96 opacity-50">
        {/* Left decorative image would go here */}
        <div className="w-full h-full bg-gradient-to-r from-transparent to-cyan-500/10 rounded-r-full"></div>
      </div>

      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-64 h-96 opacity-50">
        {/* Right decorative image would go here */}
        <div className="w-full h-full bg-gradient-to-l from-transparent to-cyan-500/10 rounded-l-full"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-8">
        <div className="max-w-4xl mx-auto">
          {/* Main Glass Container */}
          <div
            className="bg-gradient-to-br from-slate-800/30 via-slate-900/20 to-gray-900/30 backdrop-blur-md border border-slate-700/30 rounded-3xl p-12 shadow-2xl relative"
            style={{
              backdropFilter: "blur(15px) saturate(180%)",
              background:
                "linear-gradient(135deg, rgba(30, 41, 59, 0.3) 0%, rgba(15, 23, 42, 0.2) 50%, rgba(17, 24, 39, 0.3) 100%)",
            }}
          >
            {/* Subtle glow effect */}
            <div
              className="absolute inset-0 rounded-3xl opacity-10"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(100, 200, 255, 0.2) 0%, transparent 70%)",
                filter: "blur(2px)",
              }}
            />
            {/* Header */}
            <div className="text-center mb-8 relative z-10">
              <h1 className="text-5xl font-bold text-white mb-4 tracking-wide">
                DATASIGHT
              </h1>
              <p className="text-gray-300 text-lg">Solution</p>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-center gap-4 mb-8 relative z-10">
              <div className="relative">
                <button
                  className="border border-slate-600/50 rounded-full px-8 py-3 text-gray-200 hover:border-slate-500/70 transition-all duration-300 shadow-lg relative overflow-hidden"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(71, 85, 105, 0.4) 0%, rgba(51, 65, 85, 0.6) 100%)",
                    backdropFilter: "blur(10px) saturate(150%)",
                  }}
                >
                  <span className="relative z-10">Mai multe</span>
                  {/* Button gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-700/20 to-slate-600/20 rounded-full"></div>
                </button>
              </div>
              <div className="relative">
                <button
                  className="border border-cyan-500/60 text-cyan-300 hover:border-cyan-400 hover:text-cyan-200 transition-all duration-300 px-8 py-3 rounded-full font-medium relative overflow-hidden"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(34, 211, 238, 0.1) 0%, rgba(6, 182, 212, 0.2) 100%)",
                  }}
                >
                  <span className="relative z-10">Contacteaza-ne</span>
                  {/* Button gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-teal-500/10 rounded-full"></div>
                </button>
              </div>
            </div>

            {/* Divider Line */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-500/30 to-transparent mb-8 relative z-10"></div>

            {/* Highlights Section */}
            <div className="text-center mb-8 relative z-10">
              <h2 className="text-2xl text-gray-100 font-medium mb-8">
                Get the highlights.
              </h2>

              {/* Laptop Display Container */}
              <div className="relative">
                {/* Navigation Arrows */}
                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 text-white/60 hover:text-white transition-colors"
                >
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>

                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 text-white/60 hover:text-white transition-colors"
                >
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>

                {/* Laptop Mockup */}
                <div className="relative mx-auto max-w-2xl">
                  <Image src={Laptop} alt="Software layout" />

                  {/* Laptop Shadow */}
                  <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-3/4 h-8 bg-black/20 rounded-full blur-xl"></div>
                </div>

                {/* Slide Indicators */}
                <div className="flex justify-center mt-8 space-x-2">
                  {[0, 1, 2].map((slide) => (
                    <button
                      key={slide}
                      onClick={() => setCurrentSlide(slide)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        currentSlide === slide ? "bg-cyan-400" : "bg-white/30"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataSightHero;
