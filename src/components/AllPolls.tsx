import Image from "next/image";
import { FC } from "react";
import { Input } from "./ui/Input";
import { ArrowIcon, Left, Right, FingerPrintIcon } from "@/assets";

interface AllPollsProps {}

const AllPolls: FC<AllPollsProps> = ({}) => {
  return (
    <section className="pt-[122px] pb-[107px] relative">
      <div className="container mx-auto w-full">
        <div className="flex justify-center">
          <div className="flex flex-col gap-[22px]">
            <div className="max-w-[520px] card px-[28.5px] pt-[35px] pb-[17px]">
              <h3 className="font-extrabold text-[25px] leading-[37.5px] text-white text-center mb-2">Previous Polls</h3>

              <div className="flex flex-col items-center gap-4 sm:gap-6 md:gap-8">
                <div className="flex flex-col gap-[5px] flex-wrap">
                  <p className="font-semibold text-[18px] leading-[27px] text-white pl-[26px]">Title*</p>
                  <Input className="w-[389px]" type="text" placeholder="eg. DAO Request for Development Proposal " />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-[5px]">
              <span className="font-semibold text-[20px] leading-[30px] text-white">Create a Poll</span>
              <Image src={ArrowIcon} alt="arrow icon" />
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Styling Images */}
      <Image src={Left} alt="voting box image" className="hidden lg:block absolute top-[30%] left-0" />
      <Image src={Right} alt="voting box image" className="hidden lg:block absolute top-[40%] right-0" />
      <Image
        src={FingerPrintIcon}
        alt="fingerprint icon"
        className="hidden lg:block absolute bottom-[10%] left-[20%] rotate-left"
      />
      <Image
        src={FingerPrintIcon}
        alt="fingerprint icon"
        className="hidden lg:block absolute -bottom-[1%] -right-[1%] rotate-right"
      />
    </section>
  );
};

export default AllPolls;
