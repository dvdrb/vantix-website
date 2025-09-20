"use client";

import React, { useState } from "react";
import Laptop from "../../assets/photos/laptop.webp";
import Image from "next/image";
import LeftDecor from "../../assets/photos/extra-left.webp";
import RightDecor from "../../assets/photos/extra-right.webp";
import { useSpring, animated } from "@react-spring/web";

const DataSightHero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const cardSpring = useSpring({
    from: { opacity: 0, transform: "translateY(20px) scale(0.98)" },
    to: { opacity: 1, transform: "translateY(0px) scale(1)" },
    delay: 160,
    config: { tension: 220, friction: 20 },
  });
  const ctaLeftSpring = useSpring({
    from: { opacity: 0, transform: "translateY(16px) scale(0.98)" },
    to: { opacity: 1, transform: "translateY(0px) scale(1)" },
    delay: 260,
    config: { tension: 220, friction: 18 },
  });
  const ctaRightSpring = useSpring({
    from: { opacity: 0, transform: "translateY(16px) scale(0.98)" },
    to: { opacity: 1, transform: "translateY(0px) scale(1)" },
    delay: 320,
    config: { tension: 220, friction: 18 },
  });
  const leftDecorSpring = useSpring({
    from: { opacity: 0, y: 40, scale: 0.95, filter: "blur(2px)" },
    to: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
    delay: 120,
    config: { tension: 220, friction: 18 },
  });
  const rightDecorSpring = useSpring({
    from: { opacity: 0, y: 40, scale: 0.95, filter: "blur(2px)" },
    to: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
    delay: 260,
    config: { tension: 220, friction: 18 },
  });

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % 3); // Assuming 3 slides
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + 3) % 3);
  };

  return (
    <div className=" bg-black mt-28 relative justify-center items-end overflow-hidden  flex  ">
      {/* Decorative Images Placeholders */}

      {/* Left decorative image would go here */}
      <animated.div style={leftDecorSpring}>
        <Image
          src={LeftDecor}
          className="w-[60px] object-contain border-b border-white"
          alt="Left decoration "
        />
      </animated.div>

      {/* Main Content */}
      <div className="relative z-10  flex items-center justify-center px-8 border-b border-white">
        <div className="max-w-4xl mx-auto ">
          {/* Main Glass Container (match header, slightly darker) */}
          <animated.div style={cardSpring}>
            <div
              className="relative overflow-hidden mb-5   rounded-3xl px-32 pt-9 shadow-2xl shadow-cyan-500/20 border"
              style={{
                background: "rgba(146, 232, 241, 0.08)",
                border: "1px solid rgba(196, 213, 215, 0.18)",
                backdropFilter: "blur(20px) saturate(180%) brightness(108%)",
              }}
            >
              {/* Glass sheen overlay */}
              <div
                className="absolute inset-0 pointer-events-none rounded-3xl"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255, 255, 255, 0.09) 0%, transparent 50%, rgba(146, 232, 241, 0.04) 100%)",
                }}
              />
              {/* External glow behind card */}
              <div
                className="absolute inset-0 -z-10 opacity-30"
                style={{
                  background:
                    "radial-gradient(ellipse at center, rgba(146, 232, 241, 0.2) 0%, transparent 70%)",
                  filter: "blur(18px)",
                  transform: "scale(1.05)",
                }}
              />
              {/* Header */}
              <div className="text-center mt-6 mb-8 relative z-10">
                <h1 className=" text-white  leading-normal text-4xl font-medium  tracking-wide">
                  DATASIGHT
                </h1>
                <p className="text-gray-300 text-xl font-medium leading-normal text-white">
                  Solution
                </p>
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-center gap-4 mb-8 relative z-10">
                <animated.div className="relative" style={ctaLeftSpring}>
                  {/* External glow behind button (match header glow) */}
                  <div
                    className="absolute inset-0 -z-10 opacity-30 pointer-events-none"
                    style={{
                      borderRadius: "9999px",
                      background:
                        "radial-gradient(ellipse at center, rgba(146, 232, 241, 0.25) 0%, transparent 70%)",
                      filter: "blur(12px)",
                      transform: "scale(1.15)",
                    }}
                  />
                  <button
                    className="border rounded-lg  px-10 py-3 text-gray-100 transition-all duration-300 shadow-lg shadow-cyan-500/10 hover:shadow-2xl hover:shadow-cyan-500/20 relative overflow-hidden"
                    style={{
                      background: "rgba(146, 232, 241, 0.08)",
                      border: "1px solid rgba(146, 232, 241, 0.18)",
                      backdropFilter:
                        "blur(15px) saturate(150%) brightness(103%)",
                    }}
                  >
                    <span className="relative text-base font-medium leading-normal z-10">
                      Mai multe
                    </span>
                    {/* Button gradient overlay (same as header) */}
                    <div
                      className="absolute inset-0 rounded-lg pointer-events-none"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(255, 255, 255, 0.04) 0%, transparent 50%, rgba(146, 232, 241, 0.04) 100%)",
                      }}
                    />
                  </button>
                </animated.div>
                <animated.div className="relative" style={ctaRightSpring}>
                  <button
                    className="border border-[#156786] border-2 text-white hover:border-cyan-300 hover:text-cyan-300 transition-all duration-300 px-6 py-3 rounded-lg  relative overflow-hidden"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(0, 0, 1, 0.9) 0%, rgb(0, 0, 0) 100%)",
                    }}
                  >
                    <span className="relative z-10">Contacteaza-ne</span>
                    {/* Button gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-teal-500/10 rounded-full"></div>
                  </button>
                </animated.div>
              </div>

              {/* Divider Line */}
              <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-500/30 to-transparent mb-8 relative z-10"></div>

              {/* Highlights Section */}
              <div className="text-center relative z-10">
                <h2 className="text-3xl text-white leading-normal font-medium ">
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
                  <div className="relative mx-auto max-w-xl">
                    <Image src={Laptop} alt="Software layout" />

                    {/* Laptop Shadow */}
                    <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-3/4 h-8 bg-black/20 rounded-full blur-xl"></div>
                  </div>
                </div>
              </div>
            </div>
          </animated.div>
        </div>
      </div>

      {/* Right decorative image would go here */}
      <animated.div style={rightDecorSpring}>
        <Image
          src={RightDecor}
          className="w-[60px] object-contain border-b border-white"
          alt="Right decoration "
        />
      </animated.div>
    </div>
  );
};

export default DataSightHero;
