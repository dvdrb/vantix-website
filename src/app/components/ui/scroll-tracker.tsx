"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

type Props = {
  sections?: string[];
  leftOffset?: string | number;
  segmentHeight?: number;
  onSectionChange?: (section: string) => void;
};

export const ScrollTrackerGlass: React.FC<Props> = ({
  sections: sectionsProp,
  leftOffset = "6",
  segmentHeight = 36,
  onSectionChange,
}) => {
  const [sections, setSections] = useState<string[]>([]);
  const ratiosRef = useRef<Record<string, number>>({});
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const findSections = () => {
      if (sectionsProp && sectionsProp.length) return sectionsProp;
      const els = Array.from(
        document.querySelectorAll<HTMLElement>("[data-scroll-id]")
      );
      return els.map((el) => el.dataset.scrollId!).filter(Boolean);
    };
    setSections(findSections());
  }, [sectionsProp]);

  useEffect(() => {
    if (!sections || sections.length === 0) return;

    ratiosRef.current = {};

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const target = entry.target as HTMLElement;
          const id = target.dataset.scrollId ?? target.id;
          ratiosRef.current[id] = entry.intersectionRatio;
        });

        // pick the element with largest ratio
        let bestId = sections[0];
        let bestRatio = -1;
        for (const id of sections) {
          const r = ratiosRef.current[id] ?? 0;
          if (r > bestRatio) {
            bestRatio = r;
            bestId = id;
          }
        }
        setActive(bestId);
        onSectionChange?.(bestId);
      },
      {
        root: null,
        rootMargin: "-40% 0px -40% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    sections.forEach((id) => {
      const el =
        document.getElementById(id) ||
        document.querySelector<HTMLElement>(`[data-scroll-id="${id}"]`);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  const scrollTo = (id: string) => {
    const el =
      document.getElementById(id) ||
      document.querySelector<HTMLElement>(`[data-scroll-id="${id}"]`);
    el?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const trackHeight = Math.max(120, sections.length * (segmentHeight + 6));
  const leftStyle =
    typeof leftOffset === "number"
      ? `${leftOffset}px`
      : /^[0-9]+$/.test(String(leftOffset))
      ? `calc(${leftOffset} * 0.25rem)`
      : String(leftOffset);

  if (!sections.length) return null;

  return (
    <div
      aria-hidden
      style={{ left: leftStyle }}
      className="fixed top-1/2 -translate-y-1/2 z-50"
    >
      {/* frosted glass track */}
      <div className="w-2 rounded-xl bg-white/20 dark:bg-gray-800/30 backdrop-blur-md shadow-lg">
        <div
          className="flex flex-col gap-2 items-stretch justify-center"
          style={{ height: trackHeight, width: 8 }}
        >
          {sections.map((id) => {
            const isActive = active === id;
            return (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                aria-label={`Scroll to ${id}`}
                className="w-full appearance-none"
                style={{ padding: 0 }}
              >
                <motion.div
                  initial={false}
                  animate={{
                    background: isActive
                      ? "linear-gradient(90deg,rgba(124,58,237,0.8),rgba(59,130,246,0.8),rgba(6,182,212,0.8))"
                      : "transparent",
                    scale: isActive ? 1.05 : 1,
                    boxShadow: isActive
                      ? "0 6px 16px rgba(59,130,246,0.2)"
                      : "none",
                    borderRadius: 6,
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  style={{
                    height: segmentHeight,
                    border: isActive
                      ? "none"
                      : "1px solid rgba(255,255,255,0.3)",
                    backgroundClip: "padding-box",
                    cursor: "pointer",
                  }}
                />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ScrollTrackerGlass;
