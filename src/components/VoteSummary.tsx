import { VoteIcon, Left, Right, FingerPrintIcon, VotedIcon } from "@/assets";
import { countdown, votes } from "@/constants";
import Image from "next/image";
import { FC } from "react";
import { Button } from "./ui/Button";

interface VoteSummaryProps {}

const VoteSummary: FC<VoteSummaryProps> = ({}) => {
  return (
    <section className="pt-[122px] pb-[107px] relative">
      <div className="container mx-auto w-full">
        <div className="flex justify-center items-center">
          <div className="flex flex-col items-center gap-[22px]">
            <div className="flex items-center gap-[13px] justify-center">
              {countdown.map(({ id, description, value }) => (
                <div key={id} className="flex flex-col gap-3">
                  <span className="font-medium text-[10px] leading-[15px] tracking-[13%] text-center text-white">
                    {description}
                  </span>
                  <div className="flex items-center justify-center min-w-[38px] h-8 rounded-[10px] bg-white">
                    <span className="text-[13px] leading-[13px] text-center text-primary font-publicPixel">{value}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="max-w-[492px] card pt-10 pb-9 px-[37.5px]">
              <h3 className="font-extrabold text-[18px] leading-[27px] text-white mb-2">DAO Vote Request Development Proposal</h3>

              <div className="flex flex-col pb-[13px]">
                <span className="font-medium text-[10px] mb-[2px] leading-[15px] tracking-[13%] text-white">DISCRIPTION</span>
                <p className="font-medium text-[15px] leading-[22.5px] text-white max-w-[417px] mb-[15px]">
                  This proposal suggests the development of a decentralized voting platform designed to facilitate transparent and
                  tamper-proof community decision-making. Utilizing blockchain technology, the platform will ensure that votes are
                  recorded securely and anonymously, preventing fraud and manipulation. The system will be user-friendly and
                  accessible, enabling community members to participate in governance and key decisions with confidence in the
                  integrity of the voting process.
                </p>
                <Image src={VoteIcon} alt="votes" />
              </div>

              <div className="flex flex-col gap-[14px]">
                {votes.map(({ id, percentage }) => (
                  <div key={id} className="w-[380px] border rounded-[13px] h-[44px] p-[5px]">
                    <div style={{ width: `${percentage}%` }} className={`rounded-[10px] bg-white h-full flex items-center`}>
                      <span className="ml-[11px] font-semibold text-[15px] leading-[22.5px] tracking-[13%] text-primary">
                        For
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <Image src={VotedIcon} alt="arrow icon" />
          </div>
        </div>
      </div>

      {/* Fixed Styling Images */}
      <Image src={Left} width={300} alt="voting box image" className="hidden lg:block absolute top-[35%] -left-[1.5%]" />
      <Image src={Left} width={400} alt="voting box image" className="hidden lg:block absolute top-[55%] -left-[2.5%]" />

      <Image src={Right} width={200} alt="voting box image" className="hidden lg:block absolute top-[30%] right-0" />
      <Image src={Right} width={200} alt="voting box image" className="hidden lg:block absolute top-[55%] -right-[2%]" />

      <Image
        src={FingerPrintIcon}
        alt="fingerprint icon"
        width={37}
        height={37}
        className="hidden lg:block absolute top-[25%] right-[36%] rotate-left"
      />
      <Image
        src={FingerPrintIcon}
        alt="fingerprint icon"
        className="hidden lg:block absolute -bottom-[1%] -right-[1%] rotate-right"
      />
    </section>
  );
};

export default VoteSummary;
