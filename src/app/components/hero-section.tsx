"use client";

import React, { useEffect, useRef, useState } from "react";
import Laptop from "../../assets/photos/laptop.webp";
import Image from "next/image";
import Decor1 from "../../assets/photos/decor-1.webp";
import Decor2 from "../../assets/photos/decor-2.webp";
import Decor3 from "../../assets/photos/decor-3.webp";
import Decor4 from "../../assets/photos/decor-4.webp";
import Decor5 from "../../assets/photos/decor-5.webp";
import Decor6 from "../../assets/photos/decor-6.webp";

import { useSpring, useSprings, animated } from "@react-spring/web";

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
  const leftImages = [Decor1, Decor2, Decor3] as const;
  const rightImages = [Decor4, Decor5, Decor6] as const;
  const [leftSprings, leftApi] = useSprings(leftImages.length, () => ({
    opacity: 0,
    y: 40,
    scale: 0.95,
    filter: "blur(2px)",
  }));
  const [rightSprings, rightApi] = useSprings(rightImages.length, () => ({
    opacity: 0,
    y: 40,
    scale: 0.95,
    filter: "blur(2px)",
  }));

  // Trigger decor animations on viewport enter
  const sectionRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof window === "undefined") return;
    const base = 200;
    const step = 180;
    const config = { tension: 170, friction: 24 } as const;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          leftApi.start((i) => ({
            to: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
            delay: base + i * step,
            config,
          }));
          rightApi.start((i) => ({
            to: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
            delay: base + leftImages.length * step + i * step,
            config,
          }));
        } else {
          // Reset when out of view so it can replay on re-enter
          leftApi.start(() => ({
            opacity: 0,
            y: 40,
            scale: 0.95,
            filter: "blur(2px)",
            delay: 0,
          }));
          rightApi.start(() => ({
            opacity: 0,
            y: 40,
            scale: 0.95,
            filter: "blur(2px)",
            delay: 0,
          }));
        }
      },
      { root: null, threshold: 0.25, rootMargin: "0px 0px -10% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [leftApi, rightApi, leftImages.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % 3); // Assuming 3 slides
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + 3) % 3);
  };

  return (
    <div
      ref={sectionRef}
      className=" bg-black  mt-28 relative justify-center z-10 items-end overflow-hidden  flex  "
    >
      {/* Decorative Images Placeholders */}

      {/* Left decorative image would go here */}
      <div className="flex items-end ">
        {leftImages.map((img, i) => (
          <animated.div key={`left-${i}`} style={leftSprings[i]}>
            <Image
              src={img}
              className="w-[30px] h-fit object-contain border-b border-white"
              alt={`Left decoration ${i + 1}`}
            />
          </animated.div>
        ))}
      </div>

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
                    className="group relative overflow-hidden inline-flex items-center justify-center rounded-lg border-2 border-[#156786] px-6 py-3 text-white transition-all duration-400 ease-out hover:-translate-y-0.5 hover:shadow-lg hover:shadow-cyan-400/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(0, 0, 0, 0.92) 0%, rgba(0, 0, 0, 1) 100%)",
                    }}
                  >
                    {/* Static subtle inner glow */}
                    <div
                      className="pointer-events-none absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background:
                          "radial-gradient(ellipse at center, rgba(255,255,255,0.08) 0%, transparent 60%)",
                      }}
                    />
                    {/* Moving shine */}
                    <span className="pointer-events-none absolute -inset-y-8 left-[-140%] w-2/3 rotate-12 bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 transition-all duration-700 ease-out group-hover:translate-x-[240%] group-hover:opacity-100" />
                    {/* Border + text color transition */}
                    <span className="relative z-10 font-medium tracking-wide transition-colors duration-300 group-hover:text-cyan-200">
                      Contacteaza-ne
                    </span>
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
                <div className="relative my-6">
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

                  <div className="relative mx-auto max-w-xl ">
                    {/* Glow behind laptop */}
                    <div
                      className="pointer-events-none absolute -inset-14 -z-10 opacity-60"
                      style={{
                        background:
                          "radial-gradient(ellipse at center, rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0.18) 30%, transparent 70%)",
                        filter: "blur(28px)",
                        transform: "scale(1.05)",
                      }}
                    />

                    <Image
                      className="h-[300px] object-contain"
                      src={Laptop}
                      alt="Software layout"
                    />

                    {/* Laptop Shadow */}
                    <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-3/4 h-8 bg-black/25 rounded-full blur-xl"></div>
                  </div>
                </div>
              </div>
            </div>
          </animated.div>
        </div>
      </div>

      {/* Right decorative image would go here */}
      <div className="flex items-end ">
        {rightImages.map((img, i) => (
          <animated.div key={`right-${i}`} style={rightSprings[i]}>
            <Image
              src={img}
              className="w-[30px] h-fit object-contain border-b border-white"
              alt={`Right decoration ${i + 1}`}
            />
          </animated.div>
        ))}
      </div>
    </div>
  );
};

export default DataSightHero;
