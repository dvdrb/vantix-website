"use client";
import Image from "next/image";
import { useRef } from "react";
import { useScrollTrigger } from "../hooks/useScrollTrigger";
import { smoothScrollTo } from "../utils/smooth-scroll";

import laptopImg from "../../assets/photos/laptop.webp";

export default function HeroSection() {
  const mobileImgRef = useRef<HTMLDivElement | null>(null);
  const desktopImgRef = useRef<HTMLDivElement | null>(null);
  const mobileScroll = useScrollTrigger(mobileImgRef, { threshold: 0.01, once: false });
  const desktopScroll = useScrollTrigger(desktopImgRef, { threshold: 0.01, once: false });

  const handleScrollToSolution = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    const headerEl = document.querySelector("header") as HTMLElement | null;
    const offset = headerEl?.offsetHeight || 0;
    smoothScrollTo("solution", offset);
  };

  return (
    <>
      <div
        id="home"
        data-scroll-id="home"
        className="max-w-7xl mx-auto pt-16  flex justify-center  gap-8 items-center scroll-mt-20"
      >
        <div className="flex  flex-col items-center md:items-start gap-4 md:gap-11">
          <div className="text-3xl px-9 self-start ml-5 text-black font-extrabold leading-7 mt-7">
            <span className="text-black">Echipe greu de </span>
            <br />
            <span className="text-primary">monitorizat?</span>

            <br />
            <span>Dificultati in</span>
            <br />

            <span>respectarea</span>
            <br />
            <span className="text-primary">regulelor</span>
            <br />
            <span className="text-primary">de siguranta?</span>
          </div>
          <div className="md:py-11  w-full gap-6 py-4 flex flex-col items-center md:w-[243px]">
            <div className=" px-9 leading-normal px-2 w-[222px] text-black text-[40px] font-normal leading-normal text-right [text-shadow:0_2px_4px_rgba(0,0,0,0.25)]  border-r-[0.5px] border-black ">
              <p className="my-0">DATASIGHT</p>

              <p className="my-0 leading-normal text-2xl leading-normal font-normal">
                SOLUTION
              </p>
            </div>
            <div
              ref={mobileImgRef}
              className={`overflow-hidden w-full flex md:hidden items-center h-[280px] sm:h-[350px] reveal-left ${
                mobileScroll.isVisible ? "is-visible" : ""
              }`}
            >
              <Image
                src={laptopImg}
                alt="Half laptop "
                className="w-1/2 object-left h-1/2 object-contain  transform scale-150 -translate-x-1/3"
              />
              <div className="w-1/2 flex flex-col items-center gap-3">
                <h4 className="text-xl font-bold text-center text-black  leading-normal font-semibold text-xl [text-shadow:0_4px_4px_rgba(0,0,0,0.25)]">
                  Soluția la forța de munca ineficienta
                </h4>

                <a
                  href="#solution"
                  className="btn no-underline bg-primary border-0 [box-shadow:4px_4px_4px_0_rgba(0,0,0,0.25)] hover:bg-cyan-600 text-white font-normal py-[10px] px-6 rounded-xl transition-colors duration-300 shadow-lg text-sm"
                  onClick={handleScrollToSolution}
                >
                  Vezi mai multe
                </a>
              </div>
            </div>

            <div className=" px-9 flex-col justify-center  gap-3 hidden md:flex ">
              <p className=" my-0 self-end text-right font-semibold text-xl  leading-normal w-[174px] [text-shadow:0_4px_4px_rgba(0,0,0,0.25)]">
                {" "}
                Solutia la forta de munca ineficienta
              </p>
              <a
                href="#solution"
                className="btn no-underline font-normal text-sm leading-normal text-white py-[10px] px-6 bg-primary rounded-xl [box-shadow:4px_4px_4px_0_rgba(0,0,0,0.25)] h-10 border-0"
                onClick={handleScrollToSolution}
              >
                Vezi mai multe
              </a>
            </div>
          </div>
        </div>

        <div
          ref={desktopImgRef}
          className={`relative pr-9 w-[800px] [height:-webkit-fill-available] hidden md:block reveal-left ${
            desktopScroll.isVisible ? "is-visible" : ""
          }`}
        >
          <Image
            src={laptopImg}
            alt="Laptop software UI preview"
            fill
            priority
            sizes="(min-width: 1024px) 560px, (min-width: 768px) 50vw, 100vw"
            className="object-contain"
          />
        </div>
      </div>
    </>
  );
}
