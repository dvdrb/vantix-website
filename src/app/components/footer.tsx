"use client";
import EnhancedForm from "./ui/enhanced-form";
import MobileForm from "./ui/mobile-form";
import { useMobileDetection } from "../hooks/useMobileDetection";

import { motion } from "framer-motion";

const Footer = () => {
  const { isMobile } = useMobileDetection();

  const handleFormSubmit = (data: Record<string, string>) => {
    console.log("Form submitted:", data);
    // Here you would typically send data to your API
  };
  return (
    <footer className="relative px-7 py-10">
      <div className="max-w-2xl mx-auto">
        {/* Liquid Glass Container (mirrors header style) */}
        <motion.div
          className="relative overflow-hidden rounded-[32px] p-7 shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20% 0px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Decorative overlay */}
          <div className="pointer-events-none absolute inset-0" />

          {/* Content */}
          <div className="relative z-10">
            {/* Contact Form Section */}
            <div id="contact" className="text-center mb-12">
              <h2 className="text-2xl font-semibold text-white mb-2">
                Contacteaza-ne
              </h2>
              <div className="text-lg text-gray-300 font-medium mb-8">
                VANTIX
              </div>

              {/* Enhanced Contact Form */}
              {isMobile ? (
                <MobileForm onSubmit={handleFormSubmit} className="mb-8" />
              ) : (
                <EnhancedForm onSubmit={handleFormSubmit} className="mb-8" />
              )}
            </div>

            {/* Contact Info inline (subtle internal glass) */}
            <div
              className="rounded-2xl p-8 mb-8 border"
              style={{
                background: "rgba(146, 232, 241, 0.04)",
                border: "1px solid rgba(146, 232, 241, 0.12)",
                backdropFilter: "blur(10px) saturate(150%)",
              }}
            >
              <div className="space-y-6">
                <div>
                  <h3 className="text-gray-300 text-sm mb-2">
                    Numar de Contact:
                  </h3>
                  <a
                    href="tel:+40745306164"
                    className="text-white text-lg hover:text-cyan-400 transition-colors duration-200 cursor-pointer underline-offset-4 hover:underline"
                  >
                    +40745306164
                  </a>
                </div>

                <div>
                  <h3 className="text-gray-300 text-sm mb-2">Email:</h3>
                  <a
                    href="mailto:contact@vantix.ro"
                    className="text-white hover:text-cyan-400 transition-colors duration-200 cursor-pointer underline-offset-4 hover:underline"
                  >
                    contact@vantix.ro
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* External glow */}
          <div
            className="absolute inset-0 -z-10"
            style={{
              borderRadius: "32px",
              background:
                "radial-gradient(ellipse at center, rgba(146, 232, 241, 0.25) 0%, transparent 70%)",
              filter: "blur(12px)",
              transform: "scale(1.06)",
            }}
          />
        </motion.div>

        {/* Copyright */}
        <div className="text-center ">
          <p className="text-gray-400 text-sm">
            ©2025 Soft & Mark all rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
