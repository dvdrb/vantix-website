"use client";

import { motion, useScroll } from "framer-motion";
import { useEffect, useState } from "react";

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setEnabled(!mq.matches);
    update();
    mq.addEventListener?.('change', update);
    return () => mq.removeEventListener?.('change', update);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] pointer-events-none">
      <div className="h-[3px] w-full bg-white/5" />
      <motion.div
        className="h-[3px] -mt-[3px] bg-gradient-to-r from-cyan-400 to-blue-500 origin-left"
        style={{ scaleX: enabled ? scrollYProgress : 0 }}
      />
    </div>
  );
};

export default ScrollProgress;

