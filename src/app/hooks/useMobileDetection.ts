"use client";

import { useEffect, useState } from "react";

interface MobileState {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  screenWidth: number;
  screenHeight: number;
  orientation: 'portrait' | 'landscape';
  isTouchDevice: boolean;
}

export const useMobileDetection = (): MobileState => {
  const [mobileState, setMobileState] = useState<MobileState>({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    screenWidth: 1200,
    screenHeight: 800,
    orientation: 'landscape',
    isTouchDevice: false
  });

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const isMobile = width < 768;
      const isTablet = width >= 768 && width < 1024;
      const isDesktop = width >= 1024;
      const orientation = width < height ? 'portrait' : 'landscape';
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

      setMobileState({
        isMobile,
        isTablet,
        isDesktop,
        screenWidth: width,
        screenHeight: height,
        orientation,
        isTouchDevice
      });
    };

    checkDevice();

    const handleResize = () => checkDevice();
    const handleOrientationChange = () => {
      // Delay to get accurate dimensions after orientation change
      setTimeout(checkDevice, 100);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleOrientationChange);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleOrientationChange);
    };
  }, []);

  return mobileState;
};

// Hook for mobile gestures
interface SwipeDirection {
  deltaX: number;
  deltaY: number;
  direction: 'left' | 'right' | 'up' | 'down' | null;
  velocity: number;
}

export const useSwipeGesture = (
  element: React.RefObject<HTMLElement | null>,
  onSwipe?: (swipe: SwipeDirection) => void,
  threshold: number = 50
) => {
  useEffect(() => {
    const el = element.current;
    if (!el) return;

    let startX = 0;
    let startY = 0;
    let startTime = 0;

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      startX = touch.clientX;
      startY = touch.clientY;
      startTime = Date.now();
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const touch = e.changedTouches[0];
      const deltaX = touch.clientX - startX;
      const deltaY = touch.clientY - startY;
      const deltaTime = Date.now() - startTime;
      const velocity = Math.sqrt(deltaX * deltaX + deltaY * deltaY) / deltaTime;

      let direction: 'left' | 'right' | 'up' | 'down' | null = null;

      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (Math.abs(deltaX) > threshold) {
          direction = deltaX > 0 ? 'right' : 'left';
        }
      } else {
        if (Math.abs(deltaY) > threshold) {
          direction = deltaY > 0 ? 'down' : 'up';
        }
      }

      if (direction && onSwipe) {
        onSwipe({ deltaX, deltaY, direction, velocity });
      }
    };

    el.addEventListener('touchstart', handleTouchStart, { passive: true });
    el.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      el.removeEventListener('touchstart', handleTouchStart);
      el.removeEventListener('touchend', handleTouchEnd);
    };
  }, [element, onSwipe, threshold]);
};