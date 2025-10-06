import Image from "next/image";
import vantixLogo from "../../assets/photos/vantix-logo.svg";

export default function ContactForm() {
  return (
    <div id="contact" data-scroll-id="contact" className="min-h-screen  flex items-center justify-center px-6 py-16 scroll-mt-20">
      <div className="w-full max-w-5xl">
        {/* Logo and Title */}
        <div className="flex items-center justify-center gap-6 mb-6">
          <h3 className="text-2xl text-black ffont-extralight ">VANTIX</h3>
          <Image src={vantixLogo} alt="Vantix logo" width={35} height={30} />
        </div>

        <h4 className="text-2xl leading-normal text-black text-center mb-20 font-normal text-black">
          Solicită un demo:
        </h4>

        <div className="flex items-center justify-center flex-col md:flex-row  gap-0">
          {/* Form Section */}
          <div className="flex-1 flex flex-col max-w-[350px] gap-12 lg:pr-16">
            <div className="relative pt-4">
              <input
                type="text"
                id="fullName"
                className="peer w-full bg-transparent border-b border-0 border-black pb-2 outline-none focus:border-[#2d7a9f] transition-colors text-base placeholder-transparent"
                placeholder="Numele dvs. complet"
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

            <div className="relative pt-4">
              <input
                type="email"
                id="email"
                className="peer w-full bg-transparent border-b border-0 border-black pb-2 outline-none focus:border-[#2d7a9f] transition-colors text-base placeholder-transparent"
                placeholder="Adresa de email"
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

            <div className="relative pt-4">
              <input
                type="tel"
                id="phone"
                className="peer w-full bg-transparent border-b border-0 border-black pb-2 outline-none focus:border-[#2d7a9f] transition-colors text-base placeholder-transparent"
                placeholder="Numarul de telefon (optional)"
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

            <div className="relative pt-4">
              <input
                type="text"
                id="message"
                className="peer w-full bg-transparent border-0 border-b border-black pb-2 outline-none focus:border-[#2d7a9f] transition-colors text-base placeholder-transparent"
                placeholder="Mesajul dvs. (optional)"
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

            <div className="relative pt-4">
              <input
                type="text"
                id="company"
                className="peer w-full bg-transparent border-b border-0 border-black pb-2 outline-none focus:border-[#2d7a9f] transition-colors text-base placeholder-transparent"
                placeholder="Compania dvs. (optional)"
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

            <button className="w-full bg-primary border-0 text-white py-4 px-6 rounded-xl text-[18px] font-normal mt-8 w-fit">
              Trimite mesaj
            </button>
          </div>
          {/* Contact Info Section */}
          <div className="flex flex-col border-t md:border-0 border-black justify-center mt-12 lg:mt-0 lg:pl-4">
            <div className="space-y-4 md:border-l border-black pl-4">
              <div>
                <p className="text-xl mb-0 font-normal">Email:</p>
                <a
                  href="mailto:contact@vantix.ro"
                  className="text-xl mt-0 no-underline hover:text-[#2d7a9f] hover:underline transition-all duration-200 text-black font-normal"
                >
                  contact@vantix.ro
                </a>
              </div>
              <div className="mt-6">
                <p className="text-xl mb-0 font-normal">Numar de contact:</p>
                <a
                  href="tel:+40756066164"
                  className=" no-underline text-xl mt-0 hover:text-[#2d7a9f] hover:underline transition-all duration-200 text-black font-normal"
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
