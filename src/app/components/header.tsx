"use client";

import { useEffect, useRef, useState } from "react";

// Magnetic cursor hook
function useMagneticCursor(
  ref: React.RefObject<HTMLElement | null>,
  intensity = 0.3
) {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      const distance = Math.sqrt(x * x + y * y);
      const maxDistance = Math.max(rect.width, rect.height);

      if (distance < maxDistance) {
        const factor = (maxDistance - distance) / maxDistance;
        element.style.transform = `translate(${x * intensity * factor}px, ${
          y * intensity * factor
        }px)`;
      }
    };

    const handleMouseLeave = () => {
      element.style.transform = "translate(0, 0)";
    };

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [ref, intensity]);
}

const GlassHeader = () => {
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  useMagneticCursor(headerRef, 0.2);

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
          ref={headerRef}
          className={`
              relative overflow-hidden transition-all duration-500 ease-out h-[84px] w-[194px] cursor-pointer
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
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          {/* Fallback content for when 3D doesn't load */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className={`
                  font-normal text-2xl header leading-normal tracking-wide transition-all duration-300 relative z-10
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
