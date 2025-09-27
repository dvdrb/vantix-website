"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 400);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.button
      aria-label="Back to top"
      onClick={scrollTop}
      className="fixed bottom-6 right-6 z-[60] rounded-full border text-white shadow-lg backdrop-blur-md px-3 py-3 md:px-4 md:py-4"
      style={{
        background: 'rgba(0,0,0,0.6)',
        borderColor: 'rgba(146, 232, 241, 0.25)'
      }}
      initial={{ opacity: 0, y: 10, scale: 0.9 }}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 10, scale: visible ? 1 : 0.9 }}
      transition={{ duration: 0.25 }}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="md:w-5 md:h-5 text-cyan-300">
        <path d="M12 19V5" />
        <path d="m5 12 7-7 7 7" />
      </svg>
    </motion.button>
  );
};

export default BackToTop;

