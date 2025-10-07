"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import { useScrollTrigger } from "../hooks/useScrollTrigger";
import AdrianPhoto from "../../assets/photos/adi-photo.png";
import AlexPhoto from "../../assets/photos/alex-photo.png";
import RaduPhoto from "../../assets/photos/radu-photo.jpg";

export default function AboutUsSection() {
  const founderLeftRef = useRef<HTMLDivElement | null>(null);
  const founderRightRef = useRef<HTMLDivElement | null>(null);
  const leftVis = useScrollTrigger(founderLeftRef, {
    threshold: 0.1,
    once: false,
  });
  const rightVis = useScrollTrigger(founderRightRef, {
    threshold: 0.1,
    once: false,
  });

  const [alexandruModalOpen, setAlexandruModalOpen] = useState(false);
  const [adrianModalOpen, setAdrianModalOpen] = useState(false);

  return (
    <>
      <div
        id="about"
        data-scroll-id="about"
        className="flex flex-col md:flex-row max-w-7xl mx-auto px-6 md:px-8 py-5 md:py-8 items-center md:items-start gap-[90px] justify-center scroll-mt-20"
      >
        <div className="flex flex-col ">
          <h4 className="text-2xl text-black [text-shadow:0_2px_4px_rgba(0,0,0,0.25)] font-normal leading-normal text-center mb-6 md:mb-[88px]">
            Founders
          </h4>

          {/* Alexandru Founder Card - Clickable */}
          <div
            ref={founderLeftRef}
            className={`mb-11 gap-2 flex items-start cursor-pointer group reveal-left ${
              leftVis.isVisible ? "is-visible" : ""
            }`}
            onClick={() => setAlexandruModalOpen(true)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setAlexandruModalOpen(true);
              }
            }}
          >
            <div className="transition-transform group-hover:scale-105">
              <p className="text-black m-0 italic text-xl leading-5 font-light">
                Hănțăscu
                <br /> Alexandru
              </p>
              <p className="m-0 font-semibold text-[10px] leading-3 text-black group-hover:text-primary transition-colors">
                ↗
              </p>
            </div>

            <Image
              src={AlexPhoto}
              alt="Alexandru Hantascu"
              width={185}
              height={240}
              className="object-contain transition-transform group-hover:scale-105"
            />
          </div>

          {/* Adrian Founder Card - Clickable */}
          <div
            ref={founderRightRef}
            className={`flex gap-2 items-start cursor-pointer group reveal-right ${
              rightVis.isVisible ? "is-visible" : ""
            }`}
            onClick={() => setAdrianModalOpen(true)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setAdrianModalOpen(true);
              }
            }}
          >
            <Image
              src={AdrianPhoto}
              alt="Adrian Hantascu"
              width={185}
              height={240}
              className="object-contain transition-transform group-hover:scale-105"
            />
            <div className="transition-transform group-hover:scale-105">
              <p className="text-black text-right m-0 italic text-xl leading-5 font-light">
                Hănțăscu
                <br /> Adrian
              </p>
              <p className="m-0 text-right font-semibold text-[10px] leading-3 text-black group-hover:text-primary transition-colors">
                ↗
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col ">
          <h4 className="text-2xl text-black [text-shadow:0_2px_4px_rgba(0,0,0,0.25)] font-normal leading-normal text-center mb-6 md:mb-[88px]">
            Board of Advisors
          </h4>
          <div className="flex justify-between items-center">
            <div className="flex flex-col w-[184px] ">
              <p className=" mt-0 text-sm mb-2 font-normal leading-normal text-black">
                Radu Predescu
                <br />
                <span className="text-primary">Director Executiv</span>
              </p>
              <p className="m-0 leading-5 text-sm text-secondary">
                Radu Predescu este Director Executiv al diviziei Autonom Lease,
                cu peste 29 de ani de experiență, implicat anterior în
                management vânzări și operațional.
              </p>
            </div>

            <Image
              src={RaduPhoto}
              alt="Radu Predescu"
              height={110}
              width={100}
              className="object-contain rounded-lg ms-2"
            />
          </div>
        </div>
      </div>

      {/* Alexandru Modal */}
      {alexandruModalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4  backdrop-blur-sm animate-fadeIn"
          onClick={() => setAlexandruModalOpen(false)}
        >
          <div
            className="bg-modal rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative p-6 md:p-8">
              {/* Close Button */}
              <button
                onClick={() => setAlexandruModalOpen(false)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                aria-label="Close modal"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {/* Content */}
              <div className="flex px-4 py-5 flex-col md:flex-row gap-6 md:gap-8">
                <div className="flex-shrink-0 mx-auto md:mx-0">
                  <Image
                    src={AlexPhoto}
                    alt="Alexandru Hantascu"
                    width={185}
                    height={240}
                    className="object-contain rounded-lg"
                  />
                </div>
                <div className="flex-1 flex flex-col gap-6">
                  <h3 className="leading-5 italic text-xl font-light italic text-black mb-2">
                    Hănțăscu Alexandru
                  </h3>

                  <div className=" text-black text-xl font-normal leading-5">
                    <p>
                      25 de ani, a lansat o imprimantă 3D în spațiu la bordul
                      unei rachete in parteneriat cu Agentia Spatiala Europena.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Adrian Modal */}
      {adrianModalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4  backdrop-blur-sm animate-fadeIn"
          onClick={() => setAlexandruModalOpen(false)}
        >
          <div
            className="bg-modal rounded-2xl max-w-90vw w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative p-6 md:p-8">
              {/* Close Button */}
              <button
                onClick={() => setAlexandruModalOpen(false)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                aria-label="Close modal"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {/* Content */}
              <div className="flex px-4 py-5 flex-col md:flex-row gap-6 md:gap-8">
                <div className="flex-shrink-0 mx-auto md:mx-0">
                  <Image
                    src={AdrianPhoto}
                    alt="Adrian Hantascu"
                    width={185}
                    height={240}
                    className="object-contain rounded-lg"
                  />
                </div>
                <div className="flex-1 flex flex-col gap-6">
                  <h3 className="leading-5 italic text-xl font-light italic text-black mb-2">
                    Hănțăscu Adrian
                  </h3>

                  <div className=" text-black text-xl font-normal leading-5">
                    <p>
                      20 de ani, fost olimpic internațional la inventică, a
                      reprezentat România la campionate mondiale și
                      internaționale de robotică.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
