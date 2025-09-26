"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface PageLoaderProps {
  loading: boolean;
  children: React.ReactNode;
}

const PageLoader = ({ loading, children }: PageLoaderProps) => {
  const [isVisible, setIsVisible] = useState(loading);
  const [currentStep, setCurrentStep] = useState(0);
  const [particlePositions, setParticlePositions] = useState<Array<{left: number, top: number}>>([]);

  const loadingSteps = [
    "Initializing DataSight...",
    "Loading Analytics Engine...",
    "Connecting to Database...",
    "Preparing Dashboard...",
    "Ready!"
  ];

  useEffect(() => {
    // Generate particle positions on client side only
    const positions = Array.from({ length: 12 }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
    }));
    setParticlePositions(positions);
  }, []);

  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setCurrentStep(prev => {
          if (prev < loadingSteps.length - 1) {
            return prev + 1;
          }
          return prev;
        });
      }, 50);

      return () => clearInterval(interval);
    }
  }, [loading, loadingSteps.length]);

  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => setIsVisible(false), 100);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(true);
    }
  }, [loading]);

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, #000000 0%, #0a0a0a 50%, #111111 100%)"
            }}
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              scale: 1.1,
              transition: { duration: 0.15, ease: [0.76, 0, 0.24, 1] }
            }}
          >
            {/* Animated Background Particles */}
            <div className="absolute inset-0 overflow-hidden">
              {particlePositions.map((position, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-cyan-400/20 rounded-full"
                  style={{
                    left: `${position.left}%`,
                    top: `${position.top}%`,
                  }}
                  animate={{
                    y: [-20, 20, -20],
                    x: [-10, 10, -10],
                    opacity: [0.2, 0.8, 0.2],
                    scale: [0.5, 1.2, 0.5],
                  }}
                  transition={{
                    duration: 3 + (i % 3) * 0.5,
                    repeat: Infinity,
                    delay: (i % 4) * 0.5,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>

            <div className="relative text-center">
              {/* Main Logo Animation */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
              >
                <motion.h1
                  className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-wider"
                  animate={{
                    textShadow: [
                      "0 0 30px rgba(146, 232, 241, 0.4)",
                      "0 0 60px rgba(146, 232, 241, 0.7)",
                      "0 0 30px rgba(146, 232, 241, 0.4)"
                    ]
                  }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                >
                  VANTIX
                </motion.h1>

                {/* Rotating Ring */}
                <div className="relative mx-auto mb-8 w-32 h-32 flex items-center justify-center">
                  <motion.div
                    className="absolute inset-0 border-4 border-transparent border-t-cyan-400 border-r-cyan-400/50 rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  />
                  <motion.div
                    className="absolute inset-2 border-2 border-transparent border-b-blue-400 border-l-blue-400/50 rounded-full"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  />
                  <div className="w-4 h-4 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/50" />
                </div>

                {/* Dynamic Loading Text */}
                <motion.div
                  className="h-12 flex items-center justify-center"
                  key={currentStep}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.15 }}
                >
                  <p className="text-gray-300 text-lg font-light">
                    {loadingSteps[currentStep]}
                  </p>
                </motion.div>

                {/* Progress Dots */}
                <div className="flex justify-center space-x-2 mt-4">
                  {loadingSteps.map((_, index) => (
                    <motion.div
                      key={index}
                      className={`w-2 h-2 rounded-full ${
                        index <= currentStep ? 'bg-cyan-400' : 'bg-gray-600'
                      }`}
                      animate={{
                        scale: index === currentStep ? [1, 1.3, 1] : 1,
                      }}
                      transition={{
                        duration: 0.6,
                        repeat: index === currentStep ? Infinity : 0,
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Subtle Grid Background */}
            <div
              className="absolute inset-0 opacity-3"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(146, 232, 241, 0.05) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(146, 232, 241, 0.05) 1px, transparent 1px)
                `,
                backgroundSize: "40px 40px",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.15, ease: [0.76, 0, 0.24, 1] }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] }
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

export const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] }
  }
};

export default PageLoader;