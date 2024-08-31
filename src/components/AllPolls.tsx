"use client";

import Image from "next/image";
import { FC, useState } from "react";
import { ArrowIcon, Left, Right, FingerPrintIcon, GreenIcon, DownloadIcon, CopyIcon, GrayIcon } from "@/assets";
import { allPolls } from "@/constants";
import Link from "next/link";

interface AllPollsProps {}

const AllPolls: FC<AllPollsProps> = ({}) => {
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
          <div className="flex flex-col gap-[22px] w-full max-w-[520px]">
            <div className="w-full card pt-[19px] pb-[34px] h-[685px] overflow-y-auto overflow-x-hidden scrollbar-hide">
              <h3 className="font-extrabold text-[25px] leading-[37.5px] text-white text-center mb-2">Previous Polls</h3>
              <div className="flex flex-col gap-[11px] w-full">
                {allPolls.map(({ id, title, date, link, status }) => (
                  <div key={id} className="flex items-center gap-[9px] pl-[25px] pr-[14px]">
                    <Image src={status === "active" ? GreenIcon : GrayIcon} alt="green" />
                    <div className="h-[54px] w-full max-w-[389px] rounded-[20px] bg-white px-[21px] flex flex-col gap-[2px] pt-[6px]">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-[9px] italic leading-[13.5px] text-tertiary/70">{`TITLE: ${title}`}</span>
                        <span className="font-medium text-[9px] italic leading-[13.5px] text-tertiary/70">{date}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <Link href={link}>
                          <span
                            className={`font-medium text-[13px] italic leading-[19.5px] ${
                              status === "active" ? "text-red-500" : "text-tertiary"
                            }`}
                          >
                            {link.length > 30 ? link.substring(0, 43) + "..." : link}
                          </span>{" "}
                        </Link>
                        <Image src={CopyIcon} className="cursor-pointer" alt="copy" onClick={() => copyToClipboard(link)} />
                      </div>
                    </div>
                    {status === "active" ? (
                      ""
                    ) : (
                      <div className="flex items-center gap-[4px] flex-shrink-0">
                        <div className="flex flex-col">
                          <span className="font-medium text-[10px] leading-[15px] text-white">Voters</span>
                          <span className="font-medium text-[10px] leading-[15px] text-white">Address</span>
                        </div>
                        <Image src={DownloadIcon} className="cursor-pointer" width={18} height={18} alt="download" />
                      </div>
                    )}
                  </div>
                ))}
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
