"use client";

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useMobileDetection } from "../../hooks/useMobileDetection";

interface MobileHeroProps {
  children: React.ReactNode;
  className?: string;
}

export const MobileHeroSection = ({ children, className = "" }: MobileHeroProps) => {
  const { isMobile, orientation } = useMobileDetection();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    if (!isMobile) return;

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

  if (!isMobile) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={`${className} relative overflow-hidden`}
      style={{
        minHeight: orientation === 'portrait' ? '100vh' : '100vh',
      }}
    >
      {/* Simple static gradient background */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background: `
            radial-gradient(circle at 30% 40%, rgba(34, 211, 238, 0.15) 0%, transparent 60%),
            radial-gradient(circle at 70% 60%, rgba(59, 130, 246, 0.1) 0%, transparent 60%)
          `,
        }}
      />

      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};


interface MobileCardStackProps {
  cards: React.ReactNode[];
  className?: string;
}

export const MobileCardStack = ({ cards, className = "" }: MobileCardStackProps) => {
  const { isMobile } = useMobileDetection();
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  if (!isMobile) {
    return (
      <div className={className}>
        {cards.map((card, index) => (
          <div key={index} className="mb-4">
            {card}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div ref={containerRef} className={`${className} relative`}>
      <div className="relative h-96">
        {cards.map((card, index) => {
          const offset = index - currentIndex;
          const absOffset = Math.abs(offset);

          return (
            <motion.div
              key={index}
              className="absolute inset-0 cursor-pointer"
              style={{
                zIndex: cards.length - absOffset,
              }}
              animate={{
                scale: 1 - absOffset * 0.05,
                y: absOffset * 10,
                opacity: absOffset > 2 ? 0 : 1 - absOffset * 0.2,
                rotateZ: offset * 2,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onTap={() => {
                if (offset > 0) {
                  setCurrentIndex(Math.min(currentIndex + 1, cards.length - 1));
                } else if (offset < 0) {
                  setCurrentIndex(Math.max(currentIndex - 1, 0));
                }
              }}
            >
              {card}
            </motion.div>
          );
        })}
      </div>

      {/* Navigation dots */}
      <div className="flex justify-center space-x-2 mt-4">
        {cards.map((_, index) => (
          <motion.div
            key={index}
            className={`w-2 h-2 rounded-full cursor-pointer ${
              index === currentIndex ? 'bg-cyan-400' : 'bg-gray-600'
            }`}
            whileTap={{ scale: 0.8 }}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

interface MobileProgressProps {
  progress: number;
  label: string;
  color?: string;
  className?: string;
}

export const MobileProgressRing = ({
  progress,
  label,
  color = "#22d3ee",
  className = ""
}: MobileProgressProps) => {
  const { isMobile } = useMobileDetection();
  const radius = isMobile ? 60 : 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className={`${className} flex flex-col items-center`}>
      <div className="relative">
        <svg
          width={radius * 2 + 20}
          height={radius * 2 + 20}
          className="transform -rotate-90"
        >
          {/* Background circle */}
          <circle
            cx={radius + 10}
            cy={radius + 10}
            r={radius}
            stroke="rgba(255,255,255,0.1)"
            strokeWidth={isMobile ? 6 : 4}
            fill="transparent"
          />

          {/* Progress circle */}
          <motion.circle
            cx={radius + 10}
            cy={radius + 10}
            r={radius}
            stroke={color}
            strokeWidth={isMobile ? 6 : 4}
            fill="transparent"
            strokeLinecap="round"
            style={{
              strokeDasharray,
              strokeDashoffset,
            }}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </svg>

        {/* Percentage text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span
            className={`font-bold ${isMobile ? 'text-xl' : 'text-lg'} text-white`}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.3 }}
          >
            {Math.round(progress)}%
          </motion.span>
        </div>
      </div>

      {/* Label */}
      <motion.p
        className={`mt-2 text-gray-300 text-center ${isMobile ? 'text-sm' : 'text-xs'}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.3 }}
      >
        {label}
      </motion.p>
    </div>
  );
};

interface MobilePulseButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  pulseColor?: string;
  style?: React.CSSProperties;
}

export const MobilePulseButton = ({
  children,
  onClick,
  className = "",
  pulseColor = "rgba(34, 211, 238, 0.4)",
  style
}: MobilePulseButtonProps) => {
  const { isMobile } = useMobileDetection();

  if (!isMobile) {
    return (
      <button className={className} onClick={onClick} style={style}>
        {children}
      </button>
    );
  }

  return (
    <motion.button
      className={`${className} relative`}
      onClick={onClick}
      style={style}
      whileTap={{ scale: 0.95 }}
    >
      {/* Pulse animation */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{ background: pulseColor }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Button content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.button>
  );
};

interface MobileTypingEffectProps {
  text: string;
  className?: string;
  speed?: number;
}

export const MobileTypingEffect = ({
  text,
  className = "",
  speed = 50
}: MobileTypingEffectProps) => {
  const { isMobile } = useMobileDetection();
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!isMobile) {
      setDisplayText(text);
      return;
    }

    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(text.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, speed);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed, isMobile]);

  return (
    <span className={className}>
      {displayText}
      {isMobile && currentIndex < text.length && (
        <motion.span
          className="inline-block w-1 h-6 bg-cyan-400 ml-1"
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.8, repeat: Infinity }}
        />
      )}
    </span>
  );
};

interface MobileGlowCardProps {
  children: React.ReactNode;
  className?: string;
}

export const MobileGlowCard = ({
  children,
  className = ""
}: MobileGlowCardProps) => {
  // Simplified - no more distracting glow effects
  return (
    <div className={`${className} relative`}>
      {children}
    </div>
  );
};