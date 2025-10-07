"use client";
import Image from "next/image";
import { useRef, useEffect } from "react";
import vantixLogo from "../../assets/photos/vantix-logo.svg";

export default function ContactForm() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleTextareaInput = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    // Ensure correct height on mount (e.g., after hydration or with prefilled values)
    handleTextareaInput();

    // Auto-resize on input/paste
    textarea.addEventListener("input", handleTextareaInput);

    // Recalculate on viewport resize because wrapping can change scrollHeight
    const onResize = () => handleTextareaInput();
    window.addEventListener("resize", onResize);

    return () => {
      textarea.removeEventListener("input", handleTextareaInput);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div
      id="contact"
      data-scroll-id="contact"
      className="min-h-screen flex items-center justify-center px-6 md:px-8 py-5 md:py-8 scroll-mt-20"
    >
      <div className="w-full max-w-5xl">
        {/* Logo and Title */}
        <div className="flex items-center justify-center gap-6 mb-4">
          <h3 className="text-2xl text-black font-extralight">VANTIX</h3>
          <Image src={vantixLogo} alt="Vantix logo" width={35} height={30} />
        </div>

        <h4 className="text-2xl leading-normal text-black text-center mt-0 mb-10 font-normal text-black">
          Solicită un demo:
        </h4>

        <div className="flex items-center justify-center flex-col md:flex-row gap-0">
          {/* Form Section */}
          <form className="flex-1 flex flex-col max-w-[350px] gap-12 lg:pr-16">
            <div className="relative pt-4 min-w-[300px]">
              <input
                type="text"
                id="fullName"
                name="fullName"
                className="peer w-full bg-transparent border-b border-0 border-black pb-2 outline-none focus:border-[#2d7a9f] transition-colors text-base placeholder-transparent"
                placeholder="Numele dvs. complet"
                autoComplete="name"
                required
              />
              <label
                htmlFor="fullName"
                className="absolute left-0 top-0 text-gray-400 text-sm transition-all pointer-events-none
      peer-placeholder-shown:text-base peer-placeholder-shown:top-4
      peer-focus:top-0 peer-focus:text-sm peer-focus:text-[#2d7a9f]"
              >
                Numele dvs. complet
              </label>
            </div>

            <div className="relative pt-4 min-w-[300px]">
              <input
                type="email"
                id="email"
                name="email"
                className="peer w-full bg-transparent border-b border-0 border-black pb-2 outline-none focus:border-[#2d7a9f] transition-colors text-base placeholder-transparent"
                placeholder="Adresa de email"
                autoComplete="email"
                required
              />
              <label
                htmlFor="email"
                className="absolute left-0 top-0 text-gray-400 text-sm transition-all pointer-events-none
      peer-placeholder-shown:text-base peer-placeholder-shown:top-4
      peer-focus:top-0 peer-focus:text-sm peer-focus:text-[#2d7a9f]"
              >
                Adresa de email
              </label>
            </div>

            <div className="relative pt-4 min-w-[300px]">
              <input
                type="tel"
                id="phone"
                name="phone"
                className="peer w-full bg-transparent border-b border-0 border-black pb-2 outline-none focus:border-[#2d7a9f] transition-colors text-base placeholder-transparent"
                placeholder="Numarul de telefon (optional)"
                autoComplete="tel"
              />
              <label
                htmlFor="phone"
                className="absolute left-0 top-0 text-gray-400 text-sm transition-all pointer-events-none
      peer-placeholder-shown:text-base peer-placeholder-shown:top-4
      peer-focus:top-0 peer-focus:text-sm peer-focus:text-[#2d7a9f]"
              >
                Numarul de telefon (optional)
              </label>
            </div>

            <div className="relative pt-4 min-w-[300px]">
              <textarea
                ref={textareaRef}
                id="message"
                name="message"
                className="peer w-full bg-transparent border-0 border-b border-black  outline-none focus:border-[#2d7a9f] transition-colors text-base placeholder-transparent resize-none min-h-[20px] overflow-hidden"
                placeholder="Mesajul dvs. (optional)"
                rows={1}
              />
              <label
                htmlFor="message"
                className="absolute left-0 top-0 text-gray-400 text-sm transition-all pointer-events-none
      peer-placeholder-shown:text-base peer-placeholder-shown:top-4
      peer-focus:top-0 peer-focus:text-sm peer-focus:text-[#2d7a9f]"
              >
                Mesajul dvs. (optional)
              </label>
            </div>

            <div className="relative pt-4 min-w-[300px]">
              <input
                type="text"
                id="company"
                name="company"
                className="peer w-full bg-transparent border-b border-0 border-black pb-2 outline-none focus:border-[#2d7a9f] transition-colors text-base placeholder-transparent"
                placeholder="Compania dvs. (optional)"
                autoComplete="organization"
              />
              <label
                htmlFor="company"
                className="absolute left-0 top-0 text-gray-400 text-sm transition-all pointer-events-none
      peer-placeholder-shown:text-base peer-placeholder-shown:top-4
      peer-focus:top-0 peer-focus:text-sm peer-focus:text-[#2d7a9f]"
              >
                Compania dvs. (optional)
              </label>
            </div>

            <button
              type="submit"
              className="btn w-full bg-primary border-0 text-white py-4 px-6 rounded-xl text-[18px] font-normal mt-4"
            >
              Trimite mesaj
            </button>
          </form>
          {/* Contact Info Section */}
          <div className="flex flex-col w-full max-w-[300px] border-t md:border-0 border-black justify-center mt-12 lg:mt-0 lg:pl-4">
            <div className="space-y-4 md:border-l border-black lg:pl-4">
              <div>
                <p className="md:text-xl text-base mb-0 font-normal">Email:</p>
                <a
                  href="mailto:contact@vantix.ro"
                  className="md:text-xl text-base mt-0 no-underline hover:text-[#2d7a9f] hover:underline transition-all duration-200 text-black font-normal"
                >
                  contact@vantix.ro
                </a>
              </div>
              <div className="md:mt-6 mt-2">
                <p className="md:text-xl text-base mb-0 font-normal">
                  Numar de contact:
                </p>
                <a
                  href="tel:+40756066164"
                  className=" no-underline md:text-xl text-base mt-0 hover:text-[#2d7a9f] hover:underline transition-all duration-200 text-black font-normal"
                >
                  +40756066164
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
