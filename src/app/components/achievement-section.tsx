"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// You'll need to add these images to your assets folder

import Achievement1 from "../../assets/photos/achievement-1.webp";
import Achievement2 from "../../assets/photos/achievement-1.webp";
import Achievement3 from "../../assets/photos/achievement-1.webp";
import Achievement4 from "../../assets/photos/achievement-1.webp";
// import Achievement1 from "../../assets/photos/achievement-1.jpg";
// import Achievement2 from "../../assets/photos/achievement-2.jpg";
// import Achievement3 from "../../assets/photos/achievement-3.jpg";
// import Achievement4 from "../../assets/photos/achievement-4.jpg";

const AchievementsSection = () => {
  const [currentSlide, setCurrentSlide] = useState(1); // Start with middle card active

  const achievements = [
    {
      id: 1,
      title: "Realizarile noastre vorbesc.",
      description:
        "Multitask like a boss. Create documents and presentations and collaborate across apps and video conferences — and do it all at once. Microsoft 365, Slack, Zoom, Keynote, Omni Productivity Suite, and more.",
      image: Achievement1,
      placeholder: "Achievement 1",
    },
    {
      id: 2,
      title: "Realizarile noastre vorbesc.",
      description:
        "Multitask like a boss. Create documents and presentations and collaborate across apps and video conferences — and do it all at once. Microsoft 365, Slack, Zoom, Keynote, Omni Productivity Suite, and more.",
      image: Achievement2,
      placeholder: "Achievement 2",
    },
    {
      id: 3,
      title: "Realizarile noastre vorbesc.",
      description:
        "Multitask like a boss. Create documents and presentations and collaborate across apps and video conferences — and do it all at once. Microsoft 365, Slack, Zoom, Keynote, Omni Productivity Suite, and more.",
      image: Achievement3,
      placeholder: "Achievement 3",
    },
    {
      id: 4,
      title: "Realizarile noastre vorbesc.",
      description:
        "Multitask like a boss. Create documents and presentations and collaborate across apps and video conferences — and do it all at once. Microsoft 365, Slack, Zoom, Keynote, Omni Productivity Suite, and more.",
      image: Achievement4,
      placeholder: "Achievement 4",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % achievements.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + achievements.length) % achievements.length
    );
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

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

        {/* Cards Grid - 2 rows, 3 columns */}
        <div className="flex-1 flex flex-col justify-center space-y-12">
          {/* Top Row */}
          <div className="grid grid-cols-3 gap-8 max-w-6xl mx-auto w-full">
            {achievements.slice(0, 3).map((achievement, index) => {
              const isActive = index === currentSlide;

              return (
                <motion.div
                  key={achievement.id}
                  className="relative group cursor-pointer"
                  onClick={() => goToSlide(index)}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  {/* Liquid Glass Card */}
                  <div
                    className={`relative overflow-hidden transition-all duration-500 ${
                      isActive ? "" : "opacity-40"
                    }`}
                    style={{
                      border: "1px solid rgba(56, 115, 122, 0.32)",
                      borderRadius: "32px",
                      backdropFilter:
                        "blur(20px) saturate(180%) brightness(110%)",
                      boxShadow: isActive
                        ? "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 30px rgba(69, 120, 126, 0.29)"
                        : "0 10px 25px -5px rgba(0, 0, 0, 0.3)",
                    }}
                  >
                    {/* Card Header */}
                    <div className="p-8 pb-6">
                      <h3 className="text-white text-xl font-medium">
                        {achievement.title}
                      </h3>
                    </div>

                    {/* Image Container */}
                    <div className="relative w-full h-64 mb-6 px-8">
                      <div className="relative w-full h-full bg-gradient-to-br from-slate-700/20 to-slate-800/30 rounded-2xl overflow-hidden">
                        {/* Replace with actual images when available */}
                        <Image
                          src={achievement.image}
                          alt={achievement.title}
                          fill
                          className="object-cover"
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
                </motion.div>
              );
            })}
          </div>

          {/* Bottom Row */}
          <div className="grid grid-cols-3 gap-8 max-w-6xl mx-auto w-full">
            {[0, 1, 2].map((index) => {
              const achievementIndex =
                index < achievements.length
                  ? index
                  : index % achievements.length;
              const achievement = achievements[achievementIndex];
              const isActive = achievementIndex === currentSlide;

              return (
                <motion.div
                  key={`bottom-${achievementIndex}`}
                  className="relative group cursor-pointer"
                  onClick={() => goToSlide(achievementIndex)}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: (index + 3) * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  {/* Liquid Glass Card */}
                  <div
                    className={`relative overflow-hidden transition-all duration-500 ${
                      isActive ? "" : "opacity-40"
                    }`}
                    style={{
                      background: "rgba(30, 41, 59, 0.15)",
                      border: "1px solid rgba(146, 232, 241, 0.15)",
                      borderRadius: "32px",
                      backdropFilter:
                        "blur(20px) saturate(180%) brightness(110%)",
                      boxShadow: isActive
                        ? "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 30px rgba(146, 232, 241, 0.1)"
                        : "0 10px 25px -5px rgba(0, 0, 0, 0.3)",
                    }}
                  >
                    {/* Card Header */}
                    <div className="p-8 pb-4">
                      <h3 className="text-white text-center text-xl font-medium">
                        {achievement.title}
                      </h3>
                    </div>

                    {/* Description Text */}
                    <div className="px-8 pb-8">
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
              );
            })}
          </div>
        </div>

        {/* Carousel Dots */}
        <motion.div
          className="flex justify-center space-x-3 pb-8 mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {achievements.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-white"
                  : index === 1 // Second dot is gray
                  ? "bg-gray-400"
                  : "bg-gray-600"
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
