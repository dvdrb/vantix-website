import Image from "next/image";
import AdrianPhoto from "../../assets/photos/adi-photo.png";
import AlexPhoto from "../../assets/photos/alex-photo.png";
import RaduPhoto from "../../assets/photos/radu-photo.jpg";

export default function AboutUsSection() {
  return (
    <>
      <div id="about" data-scroll-id="about" className="flex flex-col md:flex-row px-9 items-center md:items-start gap-[90px]  mx-auto justify-center scroll-mt-20">
        <div className="flex flex-col ">
          <h4 className="text-2xl text-black [text-shadow:0_2px_4px_rgba(0,0,0,0.25)] font-normal leading-normal text-center mb-6 md:mb-[88px]">
            Founders
          </h4>
          <div className="mb-11 gap-2 flex items-start">
            <div>
              <p className="text-black  m-0 italic text-xl leading-5 font-light">
                Hănțăscu
                <br /> Alexandru
              </p>
              <p className="m-0 font-semibold text-[10px] leading-3 text-black">
                ↗
              </p>
            </div>

            <Image
              src={AlexPhoto}
              alt="Alexandru Hantascu"
              width={185}
              height={240}
              className="object-contain"
            />
          </div>
          <div className=" flex gap-2 items-start">
            <Image
              src={AdrianPhoto}
              alt="Alexandru Hantascu"
              width={185}
              height={240}
              className="object-contain"
            />
            <div>
              <p className="text-black text-right  m-0 italic text-xl leading-5 font-light">
                Hănțăscu
                <br /> Adrian
              </p>
              <p className="m-0 text-right font-semibold text-[10px] leading-3 text-black">
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
    </>
  );
}
