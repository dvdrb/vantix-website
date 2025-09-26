"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { useMobileDetection, useSwipeGesture } from "../../hooks/useMobileDetection";

interface MobileTiltCardProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}

export const MobileTiltCard = ({
  children,
  className = "",
  intensity = 15
}: MobileTiltCardProps) => {
  // Simplified - no more distracting tilt effects
  return <div className={className}>{children}</div>;
};

interface MobileParallaxProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

export const MobileParallax = ({
  children,
  speed = 0.5,
  className = ""
}: MobileParallaxProps) => {
  const { isMobile } = useMobileDetection();
  const [scrollY, setScrollY] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isMobile) return;

    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const scrolled = window.pageYOffset;
      const rate = scrolled * -speed;
      setScrollY(rate);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile, speed]);

  if (!isMobile) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        transform: `translateY(${scrollY}px)`,
      }}
    >
      {children}
    </motion.div>
  );
};

interface MobileSwipeCarouselProps {
  items: React.ReactNode[];
  className?: string;
  onItemChange?: (index: number) => void;
}

export const MobileSwipeCarousel = ({
  items,
  className = "",
  onItemChange
}: MobileSwipeCarouselProps) => {
  const { isMobile } = useMobileDetection();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragStart, setDragStart] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const nextItem = () => {
    const newIndex = (currentIndex + 1) % items.length;
    setCurrentIndex(newIndex);
    onItemChange?.(newIndex);
  };

  const prevItem = () => {
    const newIndex = (currentIndex - 1 + items.length) % items.length;
    setCurrentIndex(newIndex);
    onItemChange?.(newIndex);
  };

  useSwipeGesture(containerRef, (swipe) => {
    if (Math.abs(swipe.deltaX) > Math.abs(swipe.deltaY)) {
      if (swipe.direction === 'left') nextItem();
      if (swipe.direction === 'right') prevItem();
    }
  });

  if (!isMobile) {
    return (
      <div className={className}>
        {items[currentIndex]}
      </div>
    );
  }

  return (
    <div ref={containerRef} className={`${className} relative overflow-hidden`}>
      <motion.div
        className="flex"
        animate={{ x: `-${currentIndex * 100}%` }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragStart={(event, info) => setDragStart(info.point.x)}
        onDragEnd={(event, info) => {
          const threshold = 50;
          const deltaX = info.point.x - dragStart;

          if (deltaX > threshold && currentIndex > 0) {
            prevItem();
          } else if (deltaX < -threshold && currentIndex < items.length - 1) {
            nextItem();
          }
        }}
      >
        {items.map((item, index) => (
          <div key={index} className="w-full flex-shrink-0">
            {item}
          </div>
        ))}
      </motion.div>

      {/* Indicators */}
      <div className="flex justify-center space-x-2 mt-4">
        {items.map((_, index) => (
          <motion.div
            key={index}
            className={`w-2 h-2 rounded-full ${
              index === currentIndex ? 'bg-cyan-400' : 'bg-gray-600'
            }`}
            whileTap={{ scale: 0.8 }}
            onClick={() => {
              setCurrentIndex(index);
              onItemChange?.(index);
            }}
          />
        ))}
      </div>
    </div>
  );
};

interface MobilePullToRefreshProps {
  children: React.ReactNode;
  onRefresh?: () => Promise<void>;
  className?: string;
}

export const MobilePullToRefresh = ({
  children,
  onRefresh,
  className = ""
}: MobilePullToRefreshProps) => {
  const { isMobile } = useMobileDetection();
  const [pullDistance, setPullDistance] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const threshold = 100;

  useEffect(() => {
    if (!isMobile || !containerRef.current) return;

    let startY = 0;
    let currentY = 0;
    let isDragging = false;

    const handleTouchStart = (e: TouchEvent) => {
      if (window.scrollY === 0) {
        startY = e.touches[0].clientY;
        isDragging = true;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;

      currentY = e.touches[0].clientY;
      const distance = Math.max(0, currentY - startY);

      if (distance > 0) {
        e.preventDefault();
        setPullDistance(Math.min(distance, threshold * 1.5));
      }
    };

    const handleTouchEnd = async () => {
      if (!isDragging) return;
      isDragging = false;

      if (pullDistance >= threshold && onRefresh) {
        setIsRefreshing(true);
        try {
          await onRefresh();
        } catch (error) {
          console.error('Refresh failed:', error);
        }
        setIsRefreshing(false);
      }

      setPullDistance(0);
    };

    const container = containerRef.current;
    container.addEventListener('touchstart', handleTouchStart, { passive: false });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.addEventListener('touchend', handleTouchEnd);

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isMobile, pullDistance, onRefresh]);

  if (!isMobile) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={containerRef} className={`${className} relative`}>
      {/* Pull indicator */}
      <motion.div
        className="absolute top-0 left-0 right-0 flex items-center justify-center bg-cyan-500/10 backdrop-blur-sm"
        style={{
          height: pullDistance,
          opacity: pullDistance / threshold,
        }}
      >
        <motion.div
          animate={{ rotate: isRefreshing ? 360 : 0 }}
          transition={{ duration: 1, repeat: isRefreshing ? Infinity : 0 }}
          className="text-cyan-400"
        >
          {pullDistance >= threshold || isRefreshing ? '↻' : '↓'}
        </motion.div>
      </motion.div>

      <motion.div
        style={{ transform: `translateY(${pullDistance}px)` }}
      >
        {children}
      </motion.div>
    </div>
  );
};