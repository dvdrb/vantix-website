"use client";

import React, { useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import Image from "next/image";

// You'll need to add laptop images to your assets folder
import Laptop1 from "../../assets/photos/laptop.webp";
import Software from "../../assets/photos/software-1.png";
import Software2 from "../../assets/photos/software-2.png";
import Camera from "../../assets/photos/camera.png";

import {
  ScrollReveal,
  SplitText,
  AnimatedCounter,
  MorphingShape,
} from "./ui/scroll-reveal";

const DataSightShowcase = () => {
  const [currentSlide, setCurrentSlide] = useState(1); // Start with middle laptop
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  const laptops = [
    {
      id: 1,
      title: "Ce este Camera Vantix?",
      image: Laptop1,
      placeholder: "Analytics Dashboard",
      description:
        "Camera Vantix este o soluție inteligentă de monitorizare care folosește AI pentru a urmări productivitatea angajaților și eficiența proceselor. Prin analiza datelor în timp real, Camera Vantix oferă informații valoroase pentru luarea deciziilor și optimizarea fluxurilor de lucru.",
    },
    {
      id: 2,
      title: "De ce să alegi Camera Vantix?",
      image: Camera,
      placeholder: "Main DataSight Interface",
      description:
        "- Monitorizare inteligentă a angajaților și a productivității. </br> - Automatizare a proceselor de colectare de date și raportare.  </br> - Reducerea erorilor umane și creșterea eficienței operaționale.  </br> - Tehnologie AI avansată pentru analiza comportamentului și performanței.",
    },
    {
      id: 3,
      title: "Impact și rezultate",
      image: Software,
      placeholder: "Reports & Statistics",
      description:
        "- Creșterea productivității și eficienței. </br> - Trasabilitate completă și raportare rapidă. </br> - Fluxuri de lucru mai inteligente și predictibile.",
    },
    {
      id: 4,
      title: "Serviciile noastre",
      image: Software2,
      placeholder: "Reports & Statistics",
      description:
        "Oferim automatizări hardware și software, implementare și training, consultanță pentru optimizarea proceselor și integrare completă cu sisteme și API-uri existente.",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % laptops.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + laptops.length) % laptops.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Get the three visible slides (previous, current, next)
  const getVisibleSlides = () => {
    const slides = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentSlide - 1 + i + laptops.length) % laptops.length;
      slides.push({ ...laptops[index], originalIndex: index, position: i });
    }
    return slides;
  };

  const visibleSlides = getVisibleSlides();

  return (
    <section
      ref={sectionRef}
      id="datasight"
      className="min-h-screen bg-black relative overflow-hidden py-20"
    >
      {/* Animated Background Elements */}
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{ y: backgroundY }}
      >
        <MorphingShape
          className="absolute top-20 left-10 opacity-30"
          color="#92e8f1"
          size={200}
        />
        <MorphingShape
          className="absolute bottom-20 right-10 opacity-20"
          color="#60a5fa"
          size={150}
        />
      </motion.div>

      {/* Top border line */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent opacity-50" />

      <div className="relative z-10 max-w-7xl mx-auto px-8 min-h-screen flex flex-col justify-center">
        {/* Header Section with Parallax */}
        <motion.div className="text-center mb-8" style={{ y: textY }}>
          {/* VANTIX subtitle */}
          <ScrollReveal delay={0.1} direction="down" distance={30}>
            <div className="text-gray-400 text-lg tracking-[0.2em] mb-2 font-light">
              VANTIX
            </div>
          </ScrollReveal>

          {/* DATASIGHT main title with split text animation */}
          <SplitText
            text="DATASIGHT"
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-wide mb-2"
            delay={0.3}
            staggerDelay={0.1}
          />

          {/* Solution subtitle */}
          <ScrollReveal delay={0.8} direction="up" distance={20}>
            <div className="text-gray-300 text-xl font-light">Solution</div>
          </ScrollReveal>
        </motion.div>

        {/* Realizarile noastre vorbesc */}
        <ScrollReveal
          delay={0.2}
          direction="up"
          distance={40}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-light text-white leading-tight">
            Realizarile noastre
            <br />
            vorbesc.
          </h2>
        </ScrollReveal>

        {/* Laptop Carousel */}
        <div className="flex-1 flex items-center justify-center mb-8">
          <div className="relative w-full">
            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 z-20 text-white/60 hover:text-white transition-colors duration-300"
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
                  strokeWidth={1.5}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 z-20 text-white/60 hover:text-white transition-colors duration-300"
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
                  strokeWidth={1.5}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            {/* Laptops Container */}
            <div className="flex justify-center items-center px-16">
              <div className="relative flex justify-center items-center space-x-8 w-full max-w-5xl">
                <AnimatePresence mode="wait">
                  {visibleSlides.map((slide, index) => {
                    const isCenter = index === 1;
                    const isLeft = index === 0;
                    const isRight = index === 2;

                    return (
                      <motion.div
                        key={`${slide.originalIndex}-${currentSlide}`}
                        className={`relative cursor-pointer ${
                          isCenter ? "z-10" : "z-0"
                        }`}
                        onClick={() =>
                          !isCenter && goToSlide(slide.originalIndex)
                        }
                        initial={{
                          opacity: 0,
                          scale: 0.6,
                          x: isLeft ? -200 : isRight ? 200 : 0,
                        }}
                        animate={{
                          opacity: isCenter ? 1 : 0.3,
                          scale: isCenter ? 1 : 0.7,
                          x: 0,
                          filter: isCenter ? "blur(0px)" : "blur(1px)",
                        }}
                        exit={{
                          opacity: 0,
                          scale: 0.6,
                          x: isLeft ? -200 : isRight ? 200 : 0,
                        }}
                        transition={{
                          duration: 0.6,
                          ease: [0.4, 0, 0.2, 1],
                        }}
                        whileHover={
                          !isCenter ? { scale: 0.75, opacity: 0.5 } : {}
                        }
                      >
                        {/* Laptop Design */}
                        <div className="relative w-70 h-48">
                          <Image
                            src={slide.image}
                            alt={`DataSight ${slide.title}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* Slide Indicators */}
        <motion.div
          className="flex justify-center space-x-5 mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {laptops.map((slide, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 text-xs md:text-sm ${
                index === currentSlide
                  ? "text-white font-medium"
                  : "text-gray-500 hover:text-gray-300"
              }`}
            >
              {slide.title}
            </button>
          ))}
        </motion.div>

        {/* Description Card */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div
            className="relative max-w-2xl p-8 rounded-3xl overflow-hidden"
            style={{
              background: "rgba(30, 41, 59, 0.15)",
              border: "1px solid rgba(146, 232, 241, 0.15)",
              backdropFilter: "blur(20px) saturate(180%) brightness(110%)",
              boxShadow:
                "0 25px 50px -12px rgba(0, 0, 0, 0.3), 0 0 20px rgba(146, 232, 241, 0.05)",
            }}
          >
            {/* Enhanced glass overlay */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 50%, rgba(146, 232, 241, 0.05) 100%)",
              }}
            />

            <div className="relative z-10">
              <AnimatePresence mode="wait">
                <motion.p
                  dangerouslySetInnerHTML={{
                    __html: laptops[currentSlide].description,
                  }}
                  key={laptops[currentSlide].id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                  className="text-gray-300 text-sm text-center lg:text-lg leading-relaxed"
                ></motion.p>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom border line */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent opacity-50" />
    </section>
  );
};

export default DataSightShowcase;
