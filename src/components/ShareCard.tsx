import { VotedCardLogo, VerifiedIcon, CloseIcon, Logo, RightLogo, DscrvLogo, Twitter, CopyIcon, FingerPrintIcon, XWhiteLogo } from "@/assets";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { Button } from "./ui/Button";
import Image from "next/image";
import Link from "next/link";

interface ShareCardProps {
  onClose: Dispatch<SetStateAction<boolean>>;
  data: any 
}

const ShareCard: FC<ShareCardProps> = ({ onClose, data }) => {
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

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose(false);
    }
  };


  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" onClick={handleOverlayClick}>
      <div className="max-w-[559px] w-full flex flex-col gap-[23px] items-center bg-primary rounded-[30px] border px-[13px] pt-[13px] pb-[21px]">
        <div className="border-x-[5px] border-b-[12px] border-white w-full rounded-[30px] pt-[62px] pb-[18px] relative">
          <div className="flex flex-col items-center gap-[37px]">
            <span className="font-semibold text-[25px] leading-[37.5px] text-white">Share Poll Link</span>
            <div className="h-[54px] w-full max-w-[389px] rounded-[20px] bg-white px-[21px] flex flex-col gap-[2px] pt-[6px]">
              <span className="font-medium text-[9px] italic leading-[13.5px] text-tertiary/70">
                TITLE: CHOOSE THE BEST COMMUNITY PROJECT
              </span>
              <div className="flex items-center justify-between">
                <Link href={``}>
                  <span
                    className={`font-medium text-[13px] italic leading-[19.5px]
                                text-tertiary`}
                  >
                    {`${process.env.NEXT_PUBLIC_URL}/vote/${data.proposalString}`.substring(0, 40) + "..." }
                  </span>{" "}
                </Link>
                <Image src={CopyIcon} className="cursor-pointer" alt="copy" onClick={() => copyToClipboard(`${process.env.NEXT_PUBLIC_URL}/vote/${data.proposalString}`)}/>
              </div>
            </div>
          </div>

          {/* close icon */}
          <Image
            src={CloseIcon}
            alt="close modal icon"
            className="absolute top-[6%] left-[4%] cursor-pointer"
            onClick={() => onClose(false)}
          />
          <Image src={Logo} width={168} height={96} alt="vote verified icon" className="absolute top-[12%] left-[5%] float" />
          <Image src={FingerPrintIcon} alt="fingerprint icon" className="hidden lg:block absolute top-[20%] right-[14%]" />
        </div>
        <div className="flex flex-col gap-[5px] items-center">
          <span className="font-semibold text-[20px] leading-[30px] text-white">Share on</span>
          <div className="flex items-center gap-[10px]">
            <Link href={`https://twitter.com/intent/tweet?url=${process.env.NEXT_PUBLIC_URL}/vote/${data.proposalString}`}>
              <Button variant="secondary" size="icon">
                <Image src={Twitter} alt="twitter logo" />
              </Button>{" "}
            </Link>
            <Link href={`https://dscvr.one/`}>
              <Button variant="secondary" size="icon">
                <Image src={DscrvLogo} alt="twitter logo" />
              </Button>
            </Link>
          </div>
        </div>
        <Button variant="vote" size="vote">
          Share on <Image src={XWhiteLogo} alt="twitter logo" className="ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default ShareCard;
