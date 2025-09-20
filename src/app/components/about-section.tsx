"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import AboutAdi from "../../assets/photos/about-adi.webp";
import AboutAlex from "../../assets/photos/about-alex.webp";
import Logo from "../../assets/photos/vantix-logo.svg";

const AboutSection = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [scrollY, setScrollY] = useState(0);

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Calculate logo position based on scroll
  const getLogoTransform = () => {
    if (!ref.current) return { y: 0, scale: 1, opacity: 0 };

    const rect = ref.current.getBoundingClientRect();
    const sectionTop = window.scrollY + rect.top;
    const sectionHeight = rect.height;
    const scrollProgress =
      (scrollY - sectionTop + window.innerHeight * 0.5) / sectionHeight;

    // Only show logo when section is in view
    if (scrollProgress < 0 || scrollProgress > 1.2) {
      return { y: 0, scale: 1, opacity: 0 };
    }

    const y = scrollProgress * 400; // Move down 400px as we scroll
    const scale = 0.8 + scrollProgress * 0.6; // Scale from 0.8 to 1.4
    const opacity =
      scrollProgress < 0.1
        ? 0
        : scrollProgress > 1
        ? Math.max(0, 1.2 - scrollProgress)
        : 1;

    return { y, scale, opacity };
  };

  const logoTransform = getLogoTransform();

  return (
    <section
      ref={ref}
      className="min-h-screen bg-black relative overflow-hidden py-20"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
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
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-8 min-h-screen">
        {/* Title */}
        <motion.div
          className="text-center pt-8 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-2xl md:text-4xl font-light text-white tracking-wider">
            Despre
          </h2>
        </motion.div>

        {/* Main 2x2 Grid Layout */}
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
                ease: [0.6, -0.05, 0.01, 0.99],
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
                ease: [0.6, -0.05, 0.01, 0.99],
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
                {/* Hover effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
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
                ease: [0.6, -0.05, 0.01, 0.99],
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
                {/* Hover effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
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
                ease: [0.6, -0.05, 0.01, 0.99],
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
      </div>

      {/* Scrolling Logo - Fixed position */}
      <div
        className="fixed left-1/2 top-32 z-30 pointer-events-none transition-all duration-100 ease-out"
        style={{
          transform: `translate(-50%, ${logoTransform.y}px) scale(${logoTransform.scale})`,
          opacity: logoTransform.opacity,
        }}
      >
        <motion.div
          className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24"
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <Image
            src={Logo}
            alt="Vantix Logo"
            width={96}
            height={96}
            className="w-full h-full object-contain filter drop-shadow-lg"
          />
        </motion.div>
      </div>

      {/* Static Center Logo (fallback) */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"
        initial={{ opacity: 0, rotate: -180, scale: 0.5 }}
        animate={
          isInView
            ? { opacity: 0.3, rotate: 0, scale: 1 }
            : { opacity: 0, rotate: -180, scale: 0.5 }
        }
        transition={{ duration: 1, ease: "easeOut", delay: 1.2 }}
      >
        <motion.div
          className="w-12 h-12 opacity-30"
          animate={{ rotate: [0, 90, 180, 270, 360] }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <Image
            src={Logo}
            alt="Vantix Logo Background"
            width={48}
            height={48}
            className="w-full h-full object-contain"
          />
        </motion.div>
      </motion.div>

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
