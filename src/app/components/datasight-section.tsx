"use client";

import React, { useEffect, useState, useRef } from "react";
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
  const [currentSlide, setCurrentSlide] = useState(0); // Start with first slide: "Ce este Camera Vantix?"
  const [isHovering, setIsHovering] = useState(false);
  const [dragStartX, setDragStartX] = useState<number | null>(null);
  const autoplayRef = useRef<number | null>(null);
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

  // Tunables
  const AUTOPLAY_MS = 5200; // adjust to speed up/slow down auto-advance
  const DRAG_THRESHOLD = 45; // px required to change slide on drag

  // Autoplay with pause on hover or dragging
  useEffect(() => {
    if (isHovering) return;
    if (dragStartX !== null) return;
    if (autoplayRef.current) window.clearInterval(autoplayRef.current);
    autoplayRef.current = window.setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % laptops.length);
    }, AUTOPLAY_MS);
    return () => {
      if (autoplayRef.current) window.clearInterval(autoplayRef.current);
    };
  }, [isHovering, dragStartX, laptops.length]);

  // Keyboard navigation when section in view
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (!inView) return;
      if (e.key === "ArrowRight")
        setCurrentSlide((p) => (p + 1) % laptops.length);
      if (e.key === "ArrowLeft")
        setCurrentSlide((p) => (p - 1 + laptops.length) % laptops.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [laptops.length]);

  return (
    <section
      ref={sectionRef}
      id="datasight"
      className="min-h-screen bg-black relative overflow-hidden py-20"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
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
        <motion.div className="text-center mb-4 lg:mb-8" style={{ y: textY }}>
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

        {/* Realizarile noastre vorbesc
        <ScrollReveal
          delay={0.2}
          direction="up"
          distance={40}
          className="text-center  lg:mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-light text-white leading-tight">
            Realizarile noastre
            <br />
            vorbesc.
          </h2>
        </ScrollReveal> */}

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
            <div className="flex justify-center items-center px-6 md:px-16">
              <motion.div
                className="relative flex justify-center items-center space-x-6 md:space-x-8 w-full max-w-5xl cursor-grab active:cursor-grabbing"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragStart={(_, info) => setDragStartX(info.point.x)}
                onDragEnd={(_, info) => {
                  const delta = info.point.x - (dragStartX ?? info.point.x);
                  setDragStartX(null);
                  if (delta > DRAG_THRESHOLD) prevSlide();
                  else if (delta < -DRAG_THRESHOLD) nextSlide();
                }}
              >
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
                          !isCenter
                            ? { scale: 0.75, opacity: 0.5 }
                            : { rotateX: -6, rotateY: 6 }
                        }
                      >
                        {/* Soft glow behind active (center) slide */}
                        {isCenter && (
                          <div
                            className="absolute -inset-8 -z-10 rounded-full opacity-40 blur-2xl"
                            style={{
                              background:
                                "radial-gradient(ellipse at center, rgba(146, 232, 241, 0.35) 0%, transparent 70%)",
                            }}
                          />
                        )}
                        {/* Laptop Design */}
                        <div className="relative w-64 h-40 md:w-70 md:h-48">
                          <Image
                            src={slide.image}
                            alt={`DataSight ${slide.title}`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 256px, 320px"
                          />
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Slide Indicators (text on desktop) */}
        <motion.div
          className="hidden md:flex justify-center space-x-5 mb-8"
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

        {/* Mobile dots + autoplay progress */}
        <div className="md:hidden flex flex-col items-center mb-8">
          <div className="flex space-x-2 mb-2">
            {laptops.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  index === currentSlide
                    ? "bg-cyan-400 scale-110"
                    : "bg-gray-600"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          <div className="h-0.5 w-40 bg-white/10 overflow-hidden rounded">
            <motion.div
              key={currentSlide}
              className="h-full bg-gradient-to-r from-cyan-400 to-blue-500"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: AUTOPLAY_MS / 1000, ease: "linear" }}
            />
          </div>
        </div>

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
                <motion.div
                  key={laptops[currentSlide].id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                >
                  <h3 className="text-white text-lg md:text-2xl font-medium text-center mb-3">
                    {laptops[currentSlide].title}
                  </h3>
                  <p
                    className="text-gray-300 text-sm text-center lg:text-lg leading-relaxed"
                    dangerouslySetInnerHTML={{
                      __html: laptops[currentSlide].description,
                    }}
                  />
                </motion.div>
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
