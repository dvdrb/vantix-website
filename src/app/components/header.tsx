"use client";

import Image from "next/image";
import { useState } from "react";
import Logo from "../../assets/photos/vantix-logo.svg";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-lg z-50 border-b border-gray-200/50">
        <nav className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Image src={Logo} alt="Vantix logo" width={35} height={30} />
            <h1 className="font-nromal text-2xl text-black">VANTIX</h1>
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#"
                className="text-gray-700 hover:text-cyan-600 transition-colors font-medium"
              >
                Home
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-cyan-600 transition-colors font-medium"
              >
                Features
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-cyan-600 transition-colors font-medium"
              >
                About
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-cyan-600 transition-colors font-medium"
              >
                Contact
              </a>
              <button className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-6 py-2.5 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                Get Started
              </button>
            </div>

            {/* Hamburger Menu Button */}
            <button
              className="md:hidden relative w-10 h-10 flex items-center justify-center focus:outline-none group"
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
                    mobileMenuOpen
                      ? "opacity-0 scale-0"
                      : "opacity-100 scale-100"
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
        </nav>

        {/* Modern Mobile Menu Dropdown */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ease-out ${
            mobileMenuOpen ? "max-h-screen" : "max-h-0"
          }`}
        >
          <div className="bg-white/95 backdrop-blur-xl border-t border-gray-200/50">
            {/* Navigation Links */}
            <nav className="px-6 py-6">
              <div className="space-y-1">
                <a
                  href="#"
                  className="flex items-center space-x-4 px-4 py-4 rounded-xl text-gray-700 hover:bg-gradient-to-r hover:from-cyan-50 hover:to-blue-50 hover:text-cyan-600 transition-all duration-300 group"
                >
                  <span className="w-2 h-2 rounded-full bg-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  <span className="text-lg font-medium">Home</span>
                  <svg
                    className="w-5 h-5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </a>
                <a
                  href="#"
                  className="flex items-center space-x-4 px-4 py-4 rounded-xl text-gray-700 hover:bg-gradient-to-r hover:from-cyan-50 hover:to-blue-50 hover:text-cyan-600 transition-all duration-300 group"
                >
                  <span className="w-2 h-2 rounded-full bg-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  <span className="text-lg font-medium">Features</span>
                  <svg
                    className="w-5 h-5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </a>
                <a
                  href="#"
                  className="flex items-center space-x-4 px-4 py-4 rounded-xl text-gray-700 hover:bg-gradient-to-r hover:from-cyan-50 hover:to-blue-50 hover:text-cyan-600 transition-all duration-300 group"
                >
                  <span className="w-2 h-2 rounded-full bg-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  <span className="text-lg font-medium">About</span>
                  <svg
                    className="w-5 h-5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </a>
                <a
                  href="#"
                  className="flex items-center space-x-4 px-4 py-4 rounded-xl text-gray-700 hover:bg-gradient-to-r hover:from-cyan-50 hover:to-blue-50 hover:text-cyan-600 transition-all duration-300 group"
                >
                  <span className="w-2 h-2 rounded-full bg-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  <span className="text-lg font-medium">Contact</span>
                  <svg
                    className="w-5 h-5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </a>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Spacer to prevent content from going under fixed header */}
      <div className="h-20"></div>
    </>
  );
}
