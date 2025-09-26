"use client";

import { motion, useTransform, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useScrollTrigger } from "../../hooks/useScrollTrigger";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  distance?: number;
  duration?: number;
  once?: boolean;
}

export const ScrollReveal = ({
  children,
  className = "",
  delay = 0,
  direction = "up",
  distance = 60,
  duration = 0.8,
  once = true
}: ScrollRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { progress, isVisible } = useScrollTrigger(ref, { once, threshold: 0.1 });

  const getInitialTransform = () => {
    switch (direction) {
      case "up": return { y: distance, x: 0 };
      case "down": return { y: -distance, x: 0 };
      case "left": return { y: 0, x: distance };
      case "right": return { y: 0, x: -distance };
      default: return { y: distance, x: 0 };
    }
  };

  const initial = getInitialTransform();

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, ...initial }}
      animate={isVisible ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...initial }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
    >
      {children}
    </motion.div>
  );
};

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
  once?: boolean;
}

export const SplitText = ({
  text,
  className = "",
  delay = 0,
  staggerDelay = 0.1,
  once = true
}: SplitTextProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { isVisible } = useScrollTrigger(ref, { once, threshold: 0.3 });

  const words = text.split(" ");

  return (
    <div ref={ref} className={className}>
      {words.map((word, index) => (
        <motion.span
          key={index}
          className="inline-block mr-2"
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{
            duration: 0.6,
            delay: delay + index * staggerDelay,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
};

interface ParallaxTextProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

export const ParallaxText = ({
  children,
  speed = 0.5,
  className = ""
}: ParallaxTextProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { progress } = useScrollTrigger(ref, { threshold: 0 });

  const y = useTransform(() => progress * -100 * speed);
  const springY = useSpring(y, { stiffness: 100, damping: 30 });

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ y: springY }}
    >
      {children}
    </motion.div>
  );
};

interface CounterProps {
  from: number;
  to: number;
  duration?: number;
  className?: string;
  suffix?: string;
  prefix?: string;
  once?: boolean;
}

export const AnimatedCounter = ({
  from,
  to,
  duration = 2,
  className = "",
  suffix = "",
  prefix = "",
  once = true
}: CounterProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const { isVisible } = useScrollTrigger(ref, { once, threshold: 0.5 });

  const [displayCount, setDisplayCount] = useState(from);

  useEffect(() => {
    if (isVisible) {
      const startTime = Date.now();
      const startValue = from;
      const endValue = to;
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / (duration * 1000), 1);
        const currentValue = startValue + (endValue - startValue) * progress;
        setDisplayCount(Math.round(currentValue));

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [isVisible, from, to, duration]);

  return (
    <motion.span ref={ref} className={className}>
      {prefix}
      <span>{displayCount}</span>
      {suffix}
    </motion.span>
  );
};

interface MorphingShapeProps {
  className?: string;
  color?: string;
  size?: number;
}

export const MorphingShape = ({
  className = "",
  color = "#92e8f1",
  size = 100
}: MorphingShapeProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { progress } = useScrollTrigger(ref, { threshold: 0 });

  const pathVariants = {
    variant1: "M40,40 Q60,20 80,40 T120,40 Q100,60 80,80 T40,80 Q20,60 40,40",
    variant2: "M40,20 Q80,40 120,20 Q100,80 60,100 T40,80 Q20,40 40,20",
    variant3: "M20,40 Q40,20 60,40 Q80,20 100,40 Q80,80 60,60 Q40,80 20,40"
  };

  const morphProgress = useTransform(() => {
    const p = progress;
    if (p < 0.33) return pathVariants.variant1;
    if (p < 0.66) return pathVariants.variant2;
    return pathVariants.variant3;
  });

  return (
    <div ref={ref} className={className}>
      <svg width={size} height={size} viewBox="0 0 120 120">
        <motion.path
          d={morphProgress}
          fill={color}
          fillOpacity={0.3}
          stroke={color}
          strokeWidth={2}
          strokeOpacity={0.6}
          animate={{
            rotate: progress * 360
          }}
          transition={{ duration: 0.1 }}
        />
      </svg>
    </div>
  );
};