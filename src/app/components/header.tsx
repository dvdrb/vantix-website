"use client";

import {
  Backdrop,
  Environment,
  MeshTransmissionMaterial,
  Text,
} from "@react-three/drei";
import type { ThreeElements } from "@react-three/fiber";
import { Canvas, useFrame } from "@react-three/fiber";
import { damp } from "maath/easing";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

// 3D Fluid Glass Sphere Component
type ScrollProps = { scrolled: boolean };

// Main 3D Scene Component
function FluidGlassScene({ scrolled }: ScrollProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 3], fov: 45 }}
      dpr={[1, 2]}
      style={{
        width: "200px",
        height: "60px",
        borderRadius: "124px",
        overflow: "hidden",
      }}
    >
      {/* Environment and Lighting */}
      <Environment preset="city" background={false} />
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.6} />
      <pointLight position={[-5, -5, -5]} intensity={0.3} color="#92e8f1" />
      {/* 3D Text */}
      VANTIX
    </Canvas>
  );
}

const GlassHeader = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Fixed Header */}
      <header className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
        <div
          className={`
              relative overflow-hidden transition-all duration-500 ease-out h-[84px] w-[194px]
              ${
                scrolled
                  ? "shadow-2xl shadow-cyan-500/20"
                  : "shadow-lg shadow-cyan-500/10"
              }
            `}
          style={{
            borderRadius: "124px",
            background: "rgba(146, 232, 241, 0.08)",
            border: "1px solid rgba(146, 232, 241, 0.18)",
            backdropFilter: scrolled
              ? "blur(20px) saturate(180%) brightness(108%)"
              : "blur(15px) saturate(150%) brightness(103%)",
          }}
        >
          {/* 3D Fluid Glass Scene */}
          <div className="absolute inset-0">
            <FluidGlassScene scrolled={scrolled} />
          </div>

          {/* Fallback content for when 3D doesn't load */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className={`
                  font-normal text-xl header leading-normal tracking-wide transition-all duration-300 relative z-10
                  ${
                    scrolled
                      ? "text-white opacity-100"
                      : "text-gray-100 opacity-100"
                  }
                `}
              style={{
                textShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
              }}
            >
              VANTIX
            </span>
          </div>

          {/* Enhanced glass overlay */}
          <div
            className="absolute inset-0"
            style={{
              borderRadius: "124px",
              background:
                "linear-gradient(135deg, rgba(255, 255, 255, 0.09) 0%, transparent 50%, rgba(146, 232, 241, 0.04) 100%)",
              pointerEvents: "none",
            }}
          />
        </div>

        {/* External glow effect */}
        <div
          className={`
              absolute inset-0 transition-opacity duration-500 -z-10
              ${scrolled ? "opacity-40" : "opacity-25"}
            `}
          style={{
            borderRadius: "124px",
            background:
              "radial-gradient(ellipse at center, rgba(146, 232, 241, 0.25) 0%, transparent 70%)",
            filter: "blur(12px)",
            transform: "scale(1.2)",
          }}
        />
      </header>
    </>
  );
};

export default GlassHeader;
