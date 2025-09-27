"use client";

import React, { useEffect, useRef, useState } from "react";
import { animate, motion, useMotionValue } from "framer-motion";
import Image from "next/image";

// You'll need to add these images to your assets folder

import Achievement1 from "../../assets/photos/achievement-1.jpg";
import Achievement2 from "../../assets/photos/achievement-2.jpg";
import Achievement3 from "../../assets/photos/achievement-3.jpg";
import Achievement4 from "../../assets/photos/achievement-4.jpg";

const AchievementsSection = () => {
  const [currentSlide, setCurrentSlide] = useState(1); // Center card active
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const firstCardRef = useRef<HTMLDivElement | null>(null);
  const x = useMotionValue(0);

  const [layout, setLayout] = useState({
    containerW: 0,
    cardW: 0,
    gap: 0, // measured
  });
  const [paused, setPaused] = useState(false);
  const [dragging, setDragging] = useState(false);

  const achievements = [
    {
      id: 1,
      title: "Realizarile noastre vorbesc.",
      description:
        "Alex a lucrat timp de 4 ani la proiectul Project Ecrida, unde a lansat o imprimantă 3D în spațiu, în parteneriat cu Agenția Spațială Europeană.",
      image: Achievement1,
      placeholder: "Achievement 1",
    },
    {
      id: 2,
      title: "Realizarile noastre vorbesc.",
      description:
        "Alex Hantascu presented Project ECRIDA before an audience of inventors and innovators, showcasing our team’s work on 3D printing in microgravity using UV photopolymerization.",
      image: Achievement2,
      placeholder: "Achievement 2",
    },
    {
      id: 3,
      title: "Realizarile noastre vorbesc.",
      description:
        "Am avut plăcerea să prezentăm Camera Vantix pe scenă, în fața investitorilor și antreprenorilor. A fost o oportunitate de a arăta inovația produsului nostru și modul în care soluțiile Vantix pot transforma procesele prin automatizare, digitalizare și optimizarea activităților de administrare și raportare.",
      image: Achievement3,
      placeholder: "Achievement 3",
    },
    {
      id: 4,
      title: "Realizarile noastre vorbesc.",
      description:
        "La doar 17 ani, suceveanul Adrian Hănțăscu a câștigat multiple premii internaționale la robotică. Recent, împreună cu echipa națională, s-a întors de la Campionatul din Houston, SUA, unde robotul lor a obținut două distincții importante, grație talentului tinerilor și sprijinului companiilor care susțin excelența.",
      image: Achievement4,
      placeholder: "Achievement 4",
    },
  ];

  const clampIndex = (i: number) =>
    Math.max(0, Math.min(i, achievements.length - 1));

  // Cloned ends for seamless loop: [last, ...items, first]
  const toTrackIndex = (realIndex: number) => realIndex + 1; // shift by 1 for left clone

  const computeXForTrack = (trackIndex: number) => {
    const { containerW, cardW, gap } = layout;
    if (!containerW || !cardW) return 0;
    const centerOffset = (containerW - cardW) / 2;
    return -(trackIndex * (cardW + gap)) + centerOffset;
  };

  const animateToTrack = (
    trackIndex: number,
    opts?: { immediate?: boolean }
  ) => {
    const targetX = computeXForTrack(trackIndex);
    if (opts?.immediate) {
      x.set(targetX);
      return Promise.resolve();
    }
    const ctrls = animate(x, targetX, {
      type: "spring",
      stiffness: 260,
      damping: 30,
    });
    return ctrls?.finished ?? Promise.resolve();
  };

  const nextSlide = async () => {
    const last = achievements.length - 1;
    if (currentSlide === last) {
      await animateToTrack(last + 2); // right clone
      setCurrentSlide(0);
      await animateToTrack(1, { immediate: true });
    } else {
      const ni = currentSlide + 1;
      setCurrentSlide(ni);
      await animateToTrack(toTrackIndex(ni));
    }
  };

  const prevSlide = async () => {
    const last = achievements.length - 1;
    if (currentSlide === 0) {
      await animateToTrack(0); // left clone
      setCurrentSlide(last);
      await animateToTrack(last + 1, { immediate: true });
    } else {
      const pi = currentSlide - 1;
      setCurrentSlide(pi);
      await animateToTrack(toTrackIndex(pi));
    }
  };

  const goToSlide = async (index: number) => {
    const target = clampIndex(index);
    if (target === currentSlide) return;
    setCurrentSlide(target);
    await animateToTrack(toTrackIndex(target));
  };

  // Measure layout and keep in sync with resize
  useEffect(() => {
    const recalc = () => {
      const containerW = containerRef.current?.clientWidth || 0;
      const cardW = firstCardRef.current?.getBoundingClientRect().width || 0;
      let gap = 24; // fallback
      if (trackRef.current) {
        const cs = window.getComputedStyle(trackRef.current);
        const g = parseFloat(cs.gap || "0");
        if (!Number.isNaN(g)) gap = g;
      }
      setLayout({ containerW, cardW, gap });
    };
    recalc();
    window.addEventListener("resize", recalc);
    return () => window.removeEventListener("resize", recalc);
  }, []);

  // Snap to current slide when layout changes
  useEffect(() => {
    animateToTrack(toTrackIndex(currentSlide), { immediate: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [layout.containerW, layout.cardW, layout.gap]);

  // Autoplay with hover/drag pause
  useEffect(() => {
    if (paused || dragging) return;
    const id = setInterval(() => {
      nextSlide();
    }, 4000);
    return () => clearInterval(id);
  }, [paused, dragging, currentSlide, layout]);

  return (
    <section className="min-h-screen bg-black relative overflow-hidden py-20">
      {/* Top border line */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent opacity-50" />

      <div className="relative z-10 max-w-7xl mx-auto px-8 min-h-screen flex flex-col justify-between">
        {/* Main Title */}
        <motion.div
          className="text-center pt-16 mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal text-white tracking-wide leading-tight">
            Realizarile noastre
            <br />
            vorbesc.
          </h2>
        </motion.div>

        {/* Swiper */}
        <div className="flex-1 flex flex-col justify-center">
          <div
            ref={containerRef}
            className="relative w-full max-w-6xl mx-auto overflow-hidden"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <motion.div
              ref={trackRef}
              className="flex items-stretch gap-6 select-none cursor-grab active:cursor-grabbing"
              style={{ x }}
              drag="x"
              dragElastic={0.08}
              onDragStart={() => setDragging(true)}
              onDragEnd={(_, info) => {
                setDragging(false);
                const threshold = (layout.cardW + layout.gap) * 0.2;
                let next = currentSlide;
                if (info.offset.x < -threshold || info.velocity.x < -500)
                  next = currentSlide + 1;
                if (info.offset.x > threshold || info.velocity.x > 500)
                  next = currentSlide - 1;
                next = clampIndex(next);
                if (next > currentSlide) void nextSlide();
                else if (next < currentSlide) void prevSlide();
              }}
            >
              {[
                achievements[achievements.length - 1],
                ...achievements,
                achievements[0],
              ].map((achievement, mapIndex) => {
                const realIndex =
                  mapIndex === 0
                    ? achievements.length - 1
                    : mapIndex === achievements.length + 1
                    ? 0
                    : mapIndex - 1;
                const isActive = realIndex === currentSlide;
                return (
                  <div
                    key={`ach-${mapIndex}-${achievement.id}`}
                    ref={mapIndex === 1 ? firstCardRef : undefined}
                    className="shrink-0 w-[300px] sm:w-[320px] md:w-[360px] lg:w-[420px]"
                    onClick={() => goToSlide(realIndex)}
                  >
                    <motion.div
                      className="relative group"
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: realIndex * 0.05 }}
                      whileHover={{ scale: 1.02 }}
                      animate={{ scale: isActive ? 1 : 0.96 }}
                    >
                      {/* Liquid Glass Card */}
                      <div
                        className={`relative overflow-hidden transition-all duration-500 ${
                          isActive
                            ? "opacity-100"
                            : "opacity-40 grayscale brightness-50 blur-[1px]"
                        }`}
                        style={{
                          background: "rgba(30, 41, 59, 0.15)",
                          border: "1px solid rgba(146, 232, 241, 0.15)",
                          borderRadius: "32px",
                          backdropFilter:
                            "blur(20px) saturate(180%) brightness(110%)",
                          boxShadow: isActive
                            ? "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 30px rgba(146, 232, 241, 0.15)"
                            : "0 10px 25px -5px rgba(0, 0, 0, 0.3)",
                        }}
                      >
                        {/* Active shimmer highlight */}
                        <motion.div
                          className="pointer-events-none absolute inset-0 rounded-[32px]"
                          initial={false}
                          animate={{
                            opacity: isActive ? 1 : 0,
                          }}
                          transition={{ duration: 0.35 }}
                        >
                          <motion.div
                            className="absolute -inset-y-10 -left-1/2 w-2/3 rotate-[20deg]"
                            style={{
                              background:
                                "linear-gradient(110deg, transparent, rgba(255,255,255,0.08), transparent)",
                            }}
                            initial={false}
                            animate={{
                              x: isActive ? ["-50%", "170%"] : "-50%",
                            }}
                            transition={{ duration: 1.6, repeat: isActive ? Infinity : 0, repeatType: "loop" }}
                          />
                        </motion.div>
                        {/* Card Header */}
                        <div className="p-6 ">
                          <h3 className="text-white text-base lg:text-xl font-medium text-center">
                            {achievement.title}
                          </h3>
                        </div>

                        {/* Image Container */}
                        <div className="relative w-full h-64 mb-6 px-6">
                          <div className="relative w-full h-full bg-gradient-to-br from-slate-700/20 to-slate-800/30 rounded-2xl overflow-hidden">
                            <Image
                              src={achievement.image}
                              alt={achievement.title}
                              fill
                              className={
                                achievement.id === 4
                                  ? "object-cover object-top"
                                  : "object-cover "
                              }
                            />
                          </div>
                        </div>

                        {/* Enhanced glass overlay effect */}
                        <div
                          className="absolute inset-0 pointer-events-none"
                          style={{
                            borderRadius: "32px",
                            background:
                              "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 50%, rgba(146, 232, 241, 0.05) 100%)",
                          }}
                        />

                        {/* Active state glow */}
                        {isActive && (
                          <div className="absolute inset-0 rounded-[32px] bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-60" />
                        )}
                      </div>
                      {/* Liquid Glass Card */}
                      <div
                        className={`relative overflow-hidden transition-all duration-500 mt-4  ${
                          isActive
                            ? "opacity-100"
                            : "opacity-40 grayscale brightness-50 blur-[1px]"
                        }`}
                        style={{
                          background: "rgba(30, 41, 59, 0.15)",
                          border: "1px solid rgba(146, 232, 241, 0.15)",
                          borderRadius: "32px",
                          backdropFilter:
                            "blur(20px) saturate(180%) brightness(110%)",
                          boxShadow: isActive
                            ? "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 30px rgba(146, 232, 241, 0.15)"
                            : "0 10px 25px -5px rgba(0, 0, 0, 0.3)",
                        }}
                      >
                        {/* Description Text */}
                        <div className="px-6 py-6 flex justify-center items-center">
                          <p className="text-gray-300 text-center text-sm leading-relaxed">
                            {achievement.description}
                          </p>
                        </div>

                        {/* Enhanced glass overlay effect */}
                        <div
                          className="absolute inset-0 pointer-events-none"
                          style={{
                            borderRadius: "32px",
                            background:
                              "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 50%, rgba(146, 232, 241, 0.05) 100%)",
                          }}
                        />

                        {/* Active state glow */}
                        {isActive && (
                          <div className="absolute inset-0 rounded-[32px] bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-60" />
                        )}
                      </div>
                    </motion.div>
                  </div>
                );
              })}
            </motion.div>

            {/* Prev/Next controls */}
            <div className="pointer-events-none absolute inset-y-0 left-0 right-0 flex items-center justify-between px-2 sm:px-4">
              <button
                aria-label="Previous"
                onClick={prevSlide}
                className="pointer-events-auto w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white grid place-items-center backdrop-blur border border-white/15"
              >
                {/* Left chevron */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="w-4 h-4"
                >
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button
                aria-label="Next"
                onClick={nextSlide}
                className="pointer-events-auto w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white grid place-items-center backdrop-blur border border-white/15"
              >
                {/* Right chevron */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="w-4 h-4"
                >
                  <path d="M9 6l6 6-6 6" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Dots */}
        <motion.div
          className="flex justify-center space-x-3 pb-8 mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {achievements.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                index === currentSlide ? "bg-white" : "bg-gray-600"
              }`}
            />
          ))}
        </motion.div>
      </div>

      {/* Bottom border line */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent opacity-50" />

      {/* Background grid pattern */}
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

export default AchievementsSection;
