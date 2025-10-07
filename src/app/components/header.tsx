"use client";

import Image from "next/image";
import {
  MouseEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import Logo from "../../assets/photos/vantix-logo.svg";
import { smoothScrollTo } from "../utils/smooth-scroll";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);
  const barRef = useRef<HTMLDivElement | null>(null);
  const [spacerHeight, setSpacerHeight] = useState(0);

  const handleNavClick = useCallback(
    (e: MouseEvent<HTMLAnchorElement>, id: string) => {
      e.preventDefault();
      const headerEl = document.querySelector("header");
      const offset = (headerEl as HTMLElement)?.offsetHeight || 0;
      smoothScrollTo(id, offset);
      setMobileMenuOpen(false);
    },
    []
  );

  useEffect(() => {
    const onScroll = () => setHasScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Keep spacer in sync with header's visible bar height (not dropdown)
  useEffect(() => {
    const updateSpacer = () => {
      const el = barRef.current;
      if (el) setSpacerHeight(el.offsetHeight);
    };
    updateSpacer();
    window.addEventListener("resize", updateSpacer);
    // Recalculate when menu toggles since layout can slightly change
    return () => window.removeEventListener("resize", updateSpacer);
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        ref={headerRef}
        className={`sticky md:fixed top-0 left-0 right-0 z-50 w-full transition-colors duration-300 bg-[rgba(245,245,245,0.9)] ${
          hasScrolled ? "md:backdrop-blur-md shadow-sm border-b border-gray-200/60" : ""
        }`}
      >
        {/* Header bar (measured for spacer) */}
        <div ref={barRef}>
        <nav className="hidden lg:block max-w-7xl mx-auto px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Image src={Logo} alt="Vantix logo" width={52} height={45} />
              <h1 className="font-extralight text-4xl leading-normal text-black">
                VANTIX
              </h1>
            </div>

            {/* Desktop Navigation */}

            <a
              href="#about"
              className="text-black/90 hover:text-black text-base font-medium no-underline"
              onClick={(e) => handleNavClick(e, "about")}
            >
              Despre Noi
            </a>
            <a
              href="#about"
              className="text-black/90 hover:text-black text-base font-medium no-underline"
              onClick={(e) => handleNavClick(e, "about")}
            >
              Echipa Vantix
            </a>
            <a
              href="#contact"
              className="text-black/90 hover:text-black text-base font-medium no-underline"
              onClick={(e) => handleNavClick(e, "contact")}
            >
              Contacteaza-ne
            </a>
            <a
              href="#solution"
              className="text-black hover:text-black text-lg leading-tight font-medium no-underline"
              onClick={(e) => handleNavClick(e, "solution")}
            >
              DATASIGHT <br /> SOLUTION
            </a>

            {/* Hamburger Menu Button */}
          </div>
        </nav>
        <div className="lg:hidden py-5 px-6 flex justify-between items-center">
          <Image src={Logo} alt="Vantix logo" width={35} height={30} />
          <h1 className="font-extralight text-2xl leading-normal text-black">
            VANTIX
          </h1>
          <button
            className="btn-ghost relative w-9 h-9 flex items-center border-0 bg-transparent justify-center focus:outline-none group"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span
                className={`block h-0.5 w-full bg-cyan-600 transition-all duration-300 origin-center ${
                  mobileMenuOpen ? "rotate-45 translate-y-2" : ""
                }`}
              ></span>
              <span
                className={`block h-0.5 w-full bg-cyan-600 transition-all duration-300 ${
                  mobileMenuOpen ? "opacity-0 scale-0" : "opacity-100 scale-100"
                }`}
              ></span>
              <span
                className={`block h-0.5 w-full bg-cyan-600 transition-all duration-300 origin-center ${
                  mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              ></span>
            </div>
          </button>
        </div>

        </div>

        {/* Modern Mobile Menu Dropdown */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ease-out ${
            mobileMenuOpen ? "max-h-screen" : "max-h-0"
          }`}
        >
          <div className="white-bg backdrop-blur-xl border-t border-gray-200/50">
            {/* Navigation Links */}
            <nav className="px-4 py-6">
              <div className="space-y-1">
                <a
                  href="#about"
                  className="flex items-center space-x-4 px-4 py-4 rounded-xl text-gray-700 hover:bg-gradient-to-r hover:from-cyan-50 hover:to-blue-50 hover:text-cyan-600 transition-all duration-300 group no-underline"
                  onClick={(e) => handleNavClick(e, "about")}
                >
                  <span className="text-lg font-medium">Despre Noi</span>
                </a>
                <a
                  href="#about"
                  className="flex items-center space-x-4 px-4 py-4 rounded-xl text-gray-700 hover:bg-gradient-to-r hover:from-cyan-50 hover:to-blue-50 hover:text-cyan-600 transition-all duration-300 group no-underline"
                  onClick={(e) => handleNavClick(e, "about")}
                >
                  <span className="text-lg font-medium">Echipa Vantix</span>
                </a>
                <a
                  href="#contact"
                  className="flex items-center space-x-4 px-4 py-4 rounded-xl text-gray-700 hover:bg-gradient-to-r hover:from-cyan-50 hover:to-blue-50 hover:text-cyan-600 transition-all duration-300 group no-underline"
                  onClick={(e) => handleNavClick(e, "contact")}
                >
                  <span className="text-lg font-medium">Contacteaza-ne</span>
                </a>
                <a
                  href="#solution"
                  className="flex items-center space-x-4 px-4 py-4 rounded-xl text-gray-700 hover:bg-gradient-to-r hover:from-cyan-50 hover:to-blue-50 hover:text-cyan-600 transition-all duration-300 group no-underline"
                  onClick={(e) => handleNavClick(e, "solution")}
                >
                  <span className="text-lg font-medium">
                    DATASIGHT SOLUTION
                  </span>
                </a>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Spacer only for desktop where header is fixed */}
      <div className="hidden md:block" style={{ height: spacerHeight }} />
    </>
  );
}
