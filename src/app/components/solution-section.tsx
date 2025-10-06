"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useScrollTrigger } from "../hooks/useScrollTrigger";
import laptopImg from "../../assets/photos/laptop.webp";
import CameraImg from "../../assets/photos/camera.png";

export default function SolutionSection() {
  const leftRef = useRef<HTMLDivElement | null>(null);
  const rightRef = useRef<HTMLDivElement | null>(null);

  // Compute header height to delay reveal until content is below fixed header
  const [headerOffset, setHeaderOffset] = useState(0);
  useEffect(() => {
    const measure = () => {
      const headerEl = document.querySelector("header") as HTMLElement | null;
      setHeaderOffset(headerEl?.offsetHeight || 0);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Top root margin pushes trigger down by header height + a small buffer
  const rootMargin = `-${Math.max(0, headerOffset + 12)}px 0px -10% 0px`;
  const leftScroll = useScrollTrigger(leftRef, { threshold: 0.15, rootMargin, once: false });
  const rightScroll = useScrollTrigger(rightRef, { threshold: 0.15, rootMargin, once: false });
  return (
    <>
      <div
        id="solution"
        data-scroll-id="solution"
        className="max-w-7xl mx-auto px-6 md:px-8 py-5 md:py-8 flex flex-col items-center justify-center gap-6 scroll-mt-20"
      >
        <div className="flex  flex-col justify-center items-center gap-10 w-[285px]">
          <div className="[text-shadow:0_2px_4px_rgba(0,0,0,0.25)] text-black text-[40px]  font-normal leading-normal">
            <p className="my-0 text-center">DATASIGHT</p>

            <p className="my-0 leading-normal text-center text-2xl leading-normal font-normal">
              SOLUTION
            </p>
          </div>
          <p className="m-0 text-sm leading-5 font-normal text-secondary">
            DataSight folosește imaginile de pe camerele de supraveghere pentru
            a analiza, prin AI, diferite activități stabilite de client și
            pentru a verifica respectarea normelor de siguranță, generând
            rapoarte zilnice.
          </p>
        </div>

        <div className="flex md:justify-between md:gap-16 md:flex-row flex-col gap-11 items-center w-full">
          <div
            ref={leftRef}
            className={`flex flex-col gap-13 w-[285px] order-1 reveal-left-desktop ${
              leftScroll.isVisible ? "is-visible" : ""
            }`}
          >
            <Image
              src={laptopImg}
              alt="Laptop image"
              className="object-contain"
              width={285}
              height={206}
            />
            <div className="flex flex-col">
              <div className="py-5 gap-7 flex items-center border-t text-black border-t-black">
                <p className="m-0 font-bold leading-5 text-[15px]">01</p>
                <p className="m-0 font-normal leading-4 text-sm">
                  Recunoaștere activități definite de client (vopsire, lucru
                  pardoseală, dezosare, decojire alimente etc.)
                </p>
              </div>
              <div className="py-5 gap-7 flex items-center border-t text-black border-t-black">
                <p className="m-0 font-bold leading-5 text-[15px]">02</p>
                <p className="m-0 font-normal leading-4 text-sm">
                  Determinarea respectării normelor de securitate și igienă
                  (purtarea echipamentului de protecție: cască, vestă, bonetă
                  etc.)
                </p>
              </div>
              <div className="py-5 gap-7 flex items-center border-t text-black border-t-black">
                <p className="m-0 font-bold leading-5 text-[15px]">03</p>
                <p className="m-0 font-normal leading-4 text-sm">
                  Centralizare date live sau la intervale de 12/24 ore
                </p>
              </div>
              <div className="py-5 gap-7 flex items-center border-t text-black border-t-black">
                <p className="m-0 font-bold leading-5 text-[15px]">04</p>
                <p className="m-0 font-normal leading-4 text-sm">
                  Generare raport zilnic, sub formă de text, către manager
                </p>
              </div>
            </div>
          </div>

          <div className="hidden md:flex flex-col items-center justify-center gap-6 w-[222px] order-3 md:order-2">
            <p className="m-0 text-lg font-normal [text-shadow:0_2px_4px_rgba(0,0,0,0.25)] text-center text-black leading-normal">
              Contacteaza-ne pentru mai multe detalii
            </p>
            <a href="#contact" className="no-underline btn">
              <span className="inline-flex px-6 py-3 bg-primary border-0 items-center justify-center text-white rounded-xl h-10 text-[14px] font-normal leading-5">
                Contacteaza-ne
              </span>
            </a>
          </div>
          <div
            ref={rightRef}
            className={`flex flex-col md:self-start gap-13 order-2 md:order-3 reveal-right-desktop ${
              rightScroll.isVisible ? "is-visible" : ""
            }`}
          >
            <Image
              src={CameraImg}
              alt="Camera image"
              className="object-contain"
              width={206}
              height={206}
            />
            <div className="flex flex-col">
              <div className="py-5 gap-7 flex items-center text-black border-t border-t-black">
                <p className="m-0 font-bold leading-5 text-[15px]">01</p>
                <p className="m-0 font-normal leading-4 text-sm">
                  ZOOM OPTIC 30X
                </p>
              </div>
              <div className="py-5 gap-7 flex items-center border-t text-black border-t-black">
                <p className="m-0 font-bold leading-5 text-[15px]">02</p>
                <p className="m-0 font-normal leading-4 text-sm">
                  REZISTENT LA APA, PRAF
                </p>
              </div>
              <div className="py-5 gap-7 flex items-center border-t text-black border-t-black">
                <p className="m-0 font-bold leading-5 text-[15px]">03</p>
                <p className="m-0 font-normal leading-4 text-sm">
                  CARCASĂ DIN ALUMINIU
                </p>
              </div>
              <div className="py-5 gap-7 flex items-center border-t text-black border-t-black">
                <p className="m-0 font-bold leading-5 text-[15px]">04</p>
                <p className="m-0 font-normal leading-4 text-sm">
                  PROCESARE AI
                </p>
              </div>
            </div>
            <div className="flex md:hidden flex-col items-center justify-center gap-6 w-[222px]">
              <p className="m-0 text-lg font-normal [text-shadow:0_2px_4px_rgba(0,0,0,0.25)] text-center text-black leading-normal">
                Contacteaza-ne pentru mai multe detalii
              </p>
              <a href="#contact" className="no-underline btn">
                <span className="inline-flex px-6 py-3 bg-primary border-0 items-center justify-center text-white rounded-xl h-10 text-[14px] font-normal leading-5">
                  Contacteaza-ne
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
      ;
    </>
  );
}
