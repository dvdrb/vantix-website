"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, cubicBezier } from "framer-motion";
import Image from "next/image";
import AboutAdi from "../../assets/photos/about-adi.webp";
import AboutAlex from "../../assets/photos/about-alex.webp";
import Logo from "../../assets/photos/vantix-logo.svg";
import { useMobileDetection } from "../hooks/useMobileDetection";

const AboutSection = () => {
  const { isMobile } = useMobileDetection();
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  // Manual scroll-driven logo transform (robust across layout shifts)
  const [logoStyle, setLogoStyle] = useState({ y: 0, scale: 1, opacity: 0 });
  const [logoVisible, setLogoVisible] = useState(false);
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (!ref.current || typeof window === "undefined") return;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = ref.current!.getBoundingClientRect();
        const sectionTop = window.scrollY + rect.top;
        const sectionHeight = rect.height;
        const sectionBottom = sectionTop + sectionHeight;
        const viewTop = window.scrollY;
        const vh = window.innerHeight;
        const viewBottom = viewTop + vh;

        // If outside section, hide logo
        if (viewBottom <= sectionTop || viewTop >= sectionBottom) {
          setLogoVisible(false);
          setLogoStyle((s) =>
            s.opacity === 0 ? s : { y: 0, scale: 1, opacity: 0 }
          );
          return;
        }

        // Progress from 0 (section enters) to 1 (section leaves)
        const total = sectionHeight + vh; // span across full section + viewport
        const progress = Math.min(
          1,
          Math.max(0, (viewBottom - sectionTop) / total)
        );

        // Travel almost a full viewport (leave 96px margin top/bottom)
        const travel = Math.max(400, vh - 192);
        const y = progress * travel;
        const scale = 0.9 + progress * 0.5; // 0.9 -> 1.4
        // Fade near the top and bottom edges so it fades under adjacent sections
        const fadeEdge = 0.08; // 8% of progress at top/bottom
        let opacity = 1;
        if (progress < fadeEdge) {
          opacity = Math.max(0, progress / fadeEdge);
        } else if (progress > 1 - fadeEdge) {
          opacity = Math.max(0, (1 - progress) / fadeEdge);
        }

        setLogoVisible(true);
        setLogoStyle({ y, scale, opacity });
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={ref}
      className="min-h-screen bg-black relative overflow-hidden isolate py-24"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: cubicBezier(0.4, 0, 0.2, 1),
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: cubicBezier(0.4, 0, 0.2, 1),
          }}
        />
      </div>

      {/* Scrolling Logo - Fixed within viewport, visible only during this section */}
      <motion.div
        className="fixed left-1/2 top-24 -translate-x-1/2 z-0 pointer-events-none"
        style={{
          translateY: logoStyle.y,
          scale: logoStyle.scale,
          opacity: logoStyle.opacity,
          display: logoVisible ? "block" : "none",
          willChange: "transform, opacity",
        }}
      >
        <motion.div
          className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 8, repeat: Infinity, ease: (t: number) => t }}
        >
          <Image
            src={Logo}
            alt="Vantix Logo"
            width={96}
            height={96}
            className="w-full h-full object-contain filter drop-shadow-lg"
          />
        </motion.div>
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-8">
        {/* Title */}
        <motion.div
          className="text-center pt-8 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: cubicBezier(0.16, 1, 0.3, 1) }}
        >
          <h2 className="text-2xl md:text-4xl font-light text-white tracking-wider">
            Despre
          </h2>
        </motion.div>

        {/* Conditional Layout - Desktop 2x2 Grid vs Mobile Vertical Stack */}
        {isMobile ? (
          /* Mobile: Simple vertical stack of images */
          <div className="flex flex-col items-center gap-8 min-h-[75vh] justify-center">
            {/* Adrian Image */}
            <motion.div
              className="relative w-full max-w-sm aspect-[4/4]"
              initial={{ opacity: 0, y: 30 }}
              animate={
                isInView
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 30 }
              }
              transition={{
                duration: 0.8,
                ease: cubicBezier(0.6, -0.05, 0.01, 0.99),
                delay: 0.2,
              }}
            >
              <div className="relative w-full h-full group">
                <Image
                  src={AboutAdi}
                  alt="Adrian Hănțăscu - co-fondator vantix"
                  fill
                  className="object-cover rounded-3xl"
                />
              </div>
            </motion.div>

            {/* Alexandru Image */}
            <motion.div
              className="relative w-full max-w-sm aspect-[4/4]"
              initial={{ opacity: 0, y: 30 }}
              animate={
                isInView
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 30 }
              }
              transition={{
                duration: 0.8,
                ease: cubicBezier(0.6, -0.05, 0.01, 0.99),
                delay: 0.5,
              }}
            >
              <div className="relative w-full h-full group">
                <Image
                  src={AboutAlex}
                  alt="Alexandru Hănțăscu - co-fondator vantix"
                  fill
                  className="object-cover rounded-3xl"
                />
              </div>
            </motion.div>
          </div>
        ) : (
          /* Desktop: 2x2 Grid Layout */
          <div className="grid grid-cols-2 gap-12 min-h-[75vh]">
            {/* Top Left - VAN text */}
            <div className="flex items-center justify-start">
              <motion.h1
                className="text-[5rem] md:text-[7rem] lg:text-[9rem] xl:text-[10rem] font-bold text-white tracking-wider leading-none"
                initial={{ opacity: 0, x: -100, y: -50 }}
                animate={
                  isInView
                    ? { opacity: 1, x: 0, y: 0 }
                    : { opacity: 0, x: -100, y: -50 }
                }
                transition={{
                  duration: 1,
                  ease: cubicBezier(0.6, -0.05, 0.01, 0.99),
                  delay: 0.2,
                }}
                whileHover={{
                  scale: 1.05,
                  textShadow: "0 0 30px rgba(34, 211, 238, 0.5)",
                }}
              >
                VAN
              </motion.h1>
            </div>

            {/* Top Right - Adrian Image */}
            <div className="flex items-center justify-end">
              <motion.div
                className="relative w-full max-w-md aspect-[4/4]"
                initial={{ opacity: 0, x: 100, y: -50 }}
                animate={
                  isInView
                    ? { opacity: 1, x: 0, y: 0 }
                    : { opacity: 0, x: 100, y: -50 }
                }
                transition={{
                  duration: 0.8,
                  ease: cubicBezier(0.6, -0.05, 0.01, 0.99),
                  delay: 0.5,
                }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="relative w-full h-full group">
                  <Image
                    src={AboutAdi}
                    alt="Adrian Hănțăscu - co-fondator vantix"
                    fill
                    className="object-cover rounded-3xl"
                  />
                </div>
              </motion.div>
            </div>

            {/* Bottom Left - Alexandru Image */}
            <div className="flex items-center justify-start">
              <motion.div
                className="relative w-full max-w-md aspect-[4/4]"
                initial={{ opacity: 0, x: -100, y: 50 }}
                animate={
                  isInView
                    ? { opacity: 1, x: 0, y: 0 }
                    : { opacity: 0, x: -100, y: 50 }
                }
                transition={{
                  duration: 0.8,
                  ease: cubicBezier(0.6, -0.05, 0.01, 0.99),
                  delay: 0.8,
                }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="relative w-full h-full group">
                  <Image
                    src={AboutAlex}
                    alt="Alexandru Hănțăscu - co-fondator vantix"
                    fill
                    className="object-cover rounded-3xl"
                  />
                </div>
              </motion.div>
            </div>

            {/* Bottom Right - TIX text */}
            <div className="flex items-center justify-end">
              <motion.h1
                className="text-[5rem] md:text-[7rem] lg:text-[9rem] xl:text-[10rem] font-bold text-white tracking-wider leading-none"
                initial={{ opacity: 0, x: 100, y: 50 }}
                animate={
                  isInView
                    ? { opacity: 1, x: 0, y: 0 }
                    : { opacity: 0, x: 100, y: 50 }
                }
                transition={{
                  duration: 1,
                  ease: cubicBezier(0.6, -0.05, 0.01, 0.99),
                  delay: 0.4,
                }}
                whileHover={{
                  scale: 1.05,
                  textShadow: "0 0 30px rgba(34, 211, 238, 0.5)",
                }}
              >
                TIX
              </motion.h1>
            </div>
          </div>
        )}
      </div>

      {/* Removed static center fallback to avoid overlap */}

      {/* Subtle grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />
    </section>
  );
};

export default AboutSection;
