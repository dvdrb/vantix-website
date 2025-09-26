"use client";

import { useEffect, useState, useRef, RefObject } from "react";

interface ScrollTriggerOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
  offset?: number;
}

interface ScrollProgress {
  progress: number; // 0 to 1 based on element's position in viewport
  isVisible: boolean;
  direction: 'up' | 'down';
  velocity: number;
}

export const useScrollTrigger = (
  ref: RefObject<Element | null>,
  options: ScrollTriggerOptions = {}
): ScrollProgress => {
  const {
    threshold = 0.1,
    rootMargin = "0px",
    once = false,
    offset = 0
  } = options;

  const [scrollState, setScrollState] = useState<ScrollProgress>({
    progress: 0,
    isVisible: false,
    direction: 'down',
    velocity: 0
  });

  const lastScrollY = useRef(0);
  const lastTimestamp = useRef(Date.now());

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let hasTriggered = false;

    const calculateProgress = () => {
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const elementTop = rect.top;
      const elementHeight = rect.height;
      const windowHeight = window.innerHeight;

      // Calculate progress based on element position
      const enterPoint = windowHeight;
      const exitPoint = -elementHeight;
      const totalDistance = enterPoint - exitPoint;
      const currentPosition = enterPoint - elementTop;

      let progress = Math.max(0, Math.min(1, currentPosition / totalDistance));

      // Apply offset
      if (offset !== 0) {
        progress = Math.max(0, Math.min(1, progress + (offset / totalDistance)));
      }

      // Calculate scroll direction and velocity
      const currentScrollY = window.scrollY;
      const currentTime = Date.now();
      const direction: 'up' | 'down' = currentScrollY > lastScrollY.current ? 'down' : 'up';
      const velocity = Math.abs(currentScrollY - lastScrollY.current) / Math.max(1, currentTime - lastTimestamp.current);

      lastScrollY.current = currentScrollY;
      lastTimestamp.current = currentTime;

      return {
        progress,
        direction,
        velocity,
        isInView: rect.top < windowHeight && rect.bottom > 0
      };
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const isVisible = entry.isIntersecting;

          if (once && hasTriggered && !isVisible) return;
          if (once && isVisible) hasTriggered = true;

          const scrollData = calculateProgress();

          if (scrollData) {
            setScrollState({
              progress: scrollData.progress,
              isVisible,
              direction: scrollData.direction,
              velocity: scrollData.velocity
            });
          }
        });
      },
      {
        threshold,
        rootMargin
      }
    );

    const handleScroll = () => {
      if (once && hasTriggered) return;

      const scrollData = calculateProgress();

      if (scrollData) {
        setScrollState(prev => ({
          progress: scrollData.progress,
          isVisible: prev.isVisible,
          direction: scrollData.direction,
          velocity: scrollData.velocity
        }));
      }
    };

    observer.observe(element);
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    // Initial calculation
    handleScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [ref, threshold, rootMargin, once, offset]);

  return scrollState;
};

export const useParallax = (
  ref: RefObject<Element | null>,
  speed: number = 0.5
): { transform: string } => {
  const [transform, setTransform] = useState("translateY(0px)");

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const scrolled = window.pageYOffset;
      const parallax = scrolled * speed;

      setTransform(`translateY(${parallax}px)`);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, [ref, speed]);

  return { transform };
};

export const useScrollVelocity = (): number => {
  const [velocity, setVelocity] = useState(0);
  const lastScrollY = useRef(0);
  const lastTimestamp = useRef(Date.now());

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const currentTime = Date.now();

      const distance = Math.abs(currentScrollY - lastScrollY.current);
      const time = currentTime - lastTimestamp.current;
      const currentVelocity = distance / Math.max(time, 1);

      setVelocity(currentVelocity);

      lastScrollY.current = currentScrollY;
      lastTimestamp.current = currentTime;
    };

    let ticking = false;
    const scrollHandler = () => {
      if (!ticking) {
        requestAnimationFrame(handleScroll);
        ticking = true;
        setTimeout(() => { ticking = false; }, 16);
      }
    };

    window.addEventListener('scroll', scrollHandler, { passive: true });

    return () => window.removeEventListener('scroll', scrollHandler);
  }, []);

  return velocity;
};