"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const MobileCtaBar = () => {
  const [visible, setVisible] = useState(true);
  const [showByScroll, setShowByScroll] = useState(true);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Hide when footer/contact is in view to avoid overlap
    const contact = document.getElementById("contact");
    let observer: IntersectionObserver | null = null;
    if (contact) {
      observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (!entry) return;
          // Hide if contact is visible at least 10%
          setVisible(!entry.isIntersecting || entry.intersectionRatio < 0.1);
        },
        { threshold: [0, 0.1, 0.2, 0.5, 1] }
      );
      observer.observe(contact);
    }

    // Hide while the keyboard is up (focus on input/textarea)
    const onFocusIn = (e: Event) => {
      const t = e.target as HTMLElement;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA")) setTyping(true);
    };
    const onFocusOut = (e: Event) => {
      const t = e.target as HTMLElement;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA")) setTyping(false);
    };
    document.addEventListener("focusin", onFocusIn);
    document.addEventListener("focusout", onFocusOut);

    // Scroll direction based show/hide (show when scrolling up or near top)
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY;
      lastY = y;
      if (Math.abs(delta) < 6) return; // ignore tiny jitters
      if (delta > 0 && y > 100) {
        // scrolling down
        setShowByScroll(false);
      } else {
        // scrolling up or near top
        setShowByScroll(true);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      observer?.disconnect();
      document.removeEventListener("focusin", onFocusIn);
      document.removeEventListener("focusout", onFocusOut);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  // Only show on small screens via CSS (md:hidden)
  return (
    <motion.div
      className="md:hidden fixed left-0 right-0 z-[55]"
      style={{ bottom: "calc(env(safe-area-inset-bottom) + 12px)" }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: visible && !typing && showByScroll ? 1 : 0, y: visible && !typing && showByScroll ? 0 : 20 }}
      transition={{ duration: 0.25 }}
    >
      <div className="mx-auto max-w-md px-4">
        <div
          className="flex gap-3 items-center rounded-2xl border px-3 py-3 shadow-lg backdrop-blur-md"
          style={{
            background: "rgba(0,0,0,0.65)",
            borderColor: "rgba(146, 232, 241, 0.2)",
          }}
        >
          <a
            href="#contact"
            className="flex-1 inline-flex items-center justify-center rounded-xl border px-4 py-2 text-sm font-medium text-white"
            style={{ borderColor: "rgba(146,232,241,0.25)", background: "rgba(146,232,241,0.12)" }}
            onClick={(e) => {
              e.preventDefault();
              if (typeof window !== 'undefined') {
                window.dispatchEvent(new Event('open-contact'));
              }
            }}
          >
            Contacteaza-ne
          </a>
          <a
            href="tel:+40745306164"
            className="inline-flex items-center justify-center rounded-xl border px-4 py-2 text-sm font-medium text-cyan-100"
            style={{ borderColor: "rgba(146,232,241,0.25)" }}
            aria-label="Sună acum"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-300">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.11 5.9 2 2 0 0 1 4.11 4h3a2 2 0 0 1 2 1.72c.12.86.32 1.7.59 2.5a2 2 0 0 1-.45 2.11L8 11a16 16 0 0 0 6 6l.67-1.25a2 2 0 0 1 2.11-.45c.8.27 1.64.47 2.5.59A2 2 0 0 1 22 16.92z" />
            </svg>
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default MobileCtaBar;
