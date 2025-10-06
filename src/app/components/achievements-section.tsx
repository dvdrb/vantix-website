import Image from "next/image";
import vantixLogo from "../../assets/photos/vantix-logo.svg";

export default function AchievementSection() {
  return (
    <>
      <div
        id="achievements"
        data-scroll-id="achievements"
        className="flex-col md:mx-auto px-6 px-8 mx-7 py-5 md:py-8 flex justify-center items-center max-w-[820px] scroll-mt-20"
      >
        <div className="gap-10 flex items-center mb-20">
          <p className="m-0 text-2xl font-normal leading-normal text-black ">
            VANTIX
          </p>
          <Image src={vantixLogo} alt="Vantix logo" width={35} height={30} />
        </div>

        <div className="flex flex-col md:flex-row md:justify-between">
          <div className="flex flex-col gap-10">
            <p className=" m-0 text-black text-xl font-semibold leading-normal [text-shadow:0_4px_4px_rgba(0,0,0,0.25)]">
              Realizarile noastre:
            </p>
            <p className="m-0 [text-shadow:0_4px_4px_rgba(0,0,0,0.25)] text-black text-base mb-1 font-normal leading-5">
              Your Global Snapshot: Get a quick, clear overview of your entire
              operation.
            </p>
            <p className="m-0 [text-shadow:0_4px_4px_rgba(0,0,0,0.25)] text-black text-base font-normal leading-5">
              Your Global Snapshot: Get a quick, clear overview of your entire
              operation.
            </p>
          </div>
          <div className="flex flex-col gap-10 mt-11 md:mt-0">
            <p className=" m-0 text-black text-xl font-semibold leading-normal [text-shadow:0_4px_4px_rgba(0,0,0,0.25)]">
              Ce asteptari poti avea:
            </p>
            <p className="m-0 [text-shadow:0_4px_4px_rgba(0,0,0,0.25)] text-black text-base mb-1 font-normal leading-5">
              Your Global Snapshot: Get a quick, clear overview of your entire
              operation.
            </p>
            <p className="m-0 [text-shadow:0_4px_4px_rgba(0,0,0,0.25)] text-black text-base font-normal leading-5">
              Your Global Snapshot: Get a quick, clear overview of your entire
              operation.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
