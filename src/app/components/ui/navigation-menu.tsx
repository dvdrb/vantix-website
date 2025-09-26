"use client";

import { motion, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { smoothScrollTo } from "../../utils/smooth-scroll";

interface NavigationMenuProps {
  currentSection?: string;
}

const navigationItems = [
  { id: "hero", label: "Home" },
  { id: "about", label: "Despre" },
  { id: "achievements", label: "Realizari" },
  { id: "solutions", label: "Solutii" },
];

const NavigationMenu = ({ currentSection = "hero" }: NavigationMenuProps) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const mouseX = useSpring(0, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(0, { stiffness: 500, damping: 100 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const handleNavClick = (sectionId: string) => {
    smoothScrollTo(sectionId, 100);
    setIsOpen(false);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <div className="hidden md:block fixed top-1/2 right-8 -translate-y-1/2 z-50">
        <motion.nav
          className="relative"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <div
            className="relative flex flex-col space-y-4 p-4 rounded-2xl border"
            style={{
              background: "rgba(146, 232, 241, 0.08)",
              border: "1px solid rgba(146, 232, 241, 0.18)",
              backdropFilter: "blur(20px) saturate(180%) brightness(108%)",
            }}
          >
            {navigationItems.map((item, index) => {
              const isActive = currentSection === item.id;
              return (
                <NavigationItem
                  key={item.id}
                  item={item}
                  isActive={isActive}
                  index={index}
                  onHover={setHoveredItem}
                  onClick={handleNavClick}
                  mouseX={mouseX}
                  mouseY={mouseY}
                />
              );
            })}
          </div>
        </motion.nav>
      </div>

      {/* Mobile Navigation Toggle */}

      {/* Mobile Navigation Menu */}
      <motion.div
        className="md:hidden fixed inset-0 z-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: isOpen ? 1 : 0 }}
        style={{ pointerEvents: isOpen ? "auto" : "none" }}
      >
        <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center space-y-8">
            {navigationItems.map((item, index) => (
              <motion.button
                key={item.id}
                className="block text-2xl font-light text-white hover:text-cyan-400 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: isOpen ? 1 : 0,
                  y: isOpen ? 0 : 20,
                }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleNavClick(item.id)}
              >
                {item.label}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>
    </>
  );
};

interface NavigationItemProps {
  item: { id: string; label: string };
  isActive: boolean;
  index: number;
  onHover: (id: string | null) => void;
  onClick: (id: string) => void;
  mouseX: any;
  mouseY: any;
}

const NavigationItem = ({
  item,
  isActive,
  index,
  onHover,
  onClick,
  mouseX,
  mouseY,
}: NavigationItemProps) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [hovered, setHovered] = useState(false);

  const distance = useTransform(() => {
    if (!ref.current) return 0;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const x = mouseX.get();
    const y = mouseY.get();
    return Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
  });

  const magneticX = useTransform(distance, [0, 100], [0, 0]);
  const magneticY = useTransform(distance, [0, 100], [0, 0]);

  return (
    <motion.button
      ref={ref}
      className={`relative w-3 h-3 rounded-full transition-all duration-300 ${
        isActive ? "bg-white" : "bg-gray-500 hover:bg-gray-300"
      }`}
      style={{
        x: magneticX,
        y: magneticY,
      }}
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.9 }}
      onMouseEnter={() => {
        setHovered(true);
        onHover(item.id);
      }}
      onMouseLeave={() => {
        setHovered(false);
        onHover(null);
      }}
      onClick={() => onClick(item.id)}
    >
      {/* Tooltip */}
      <motion.div
        className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-3 py-1 rounded-lg text-sm font-medium text-white whitespace-nowrap"
        style={{
          background: "rgba(0, 0, 0, 0.8)",
          backdropFilter: "blur(10px)",
        }}
        initial={{ opacity: 0, x: 10 }}
        animate={{
          opacity: hovered ? 1 : 0,
          x: hovered ? 0 : 10,
        }}
        transition={{ duration: 0.2 }}
      >
        {item.label}
      </motion.div>

      {/* Active glow effect */}
      {isActive && (
        <div className="absolute inset-0 rounded-full bg-white/20 animate-pulse" />
      )}
    </motion.button>
  );
};

export default NavigationMenu;
