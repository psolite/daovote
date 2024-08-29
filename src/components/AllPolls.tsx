"use client";

import Image from "next/image";
import { FC, useState } from "react";
import { Input } from "./ui/Input";
import { ArrowIcon, Left, Right, FingerPrintIcon, GreenIcon, DownloadIcon, CopyIcon } from "@/assets";

interface AllPollsProps {}

const AllPolls: FC<AllPollsProps> = ({}) => {
  // const [text, setText] = useState('')
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset the copied state after 2 seconds
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <section className="pt-[122px] pb-[107px] relative">
      <div className="container mx-auto w-full">
        <div className="flex justify-center">
          <div className="flex flex-col gap-[22px]">
            <div className="w-[520px] bg-red-500 card pt-[19px]">
              <h3 className="font-extrabold text-[25px] leading-[37.5px] text-white text-center mb-2">Previous Polls</h3>

              <div className="flex flex-col gap-4 sm:gap-6 md:gap-8">
                <div className="flex items-center">
                  <Image src={GreenIcon} alt="green" />
                  {/* <Input className="w-[389px]" type="text" /> */}
                  <div className="w">
                    <span className="">hey</span>
                    <Image src={CopyIcon} alt="copy" onClick={() => copyToClipboard("hey")} />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium text-[10px] leading-[15px] text-white">Voters</span>
                    <span className="font-medium text-[10px] leading-[15px] text-white">Address</span>
                  </div>
                  <Image src={DownloadIcon} width={18} height={18} alt="download" />
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
