import { Dispatch, FC, SetStateAction } from "react";
import { Button } from "./ui/Button";
import Image from "next/image";
import { CloseIcon, DscrvLogo, Logo, RightLogo, Twitter, VerifiedIcon, VotedCardLogo, XWhiteLogo } from "@/assets";
import Link from "next/link";

interface VotedCardProps {
  onClose: Dispatch<SetStateAction<boolean>>;
}

const VotedCard: FC<VotedCardProps> = ({ onClose }) => {
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" onClick={handleOverlayClick}>
      <div className="max-w-[559px] w-full flex flex-col gap-[23px] items-center bg-white rounded-[30px] px-[13px] pt-[13px] pb-[21px]">
        <div className="bg-primary w-full rounded-[30px] pt-[30px] pb-[23px] relative">
          <div className="flex flex-col items-center gap-[20px]">
            <div className="flex flex-col gap-[8px]">
              <span className="font-semibold text-[10px] leading-[15px] tracking-[10%] text-center text-white">
                POLL POWERED BY DAO VOTE
              </span>
              <span className="font-semibold text-[15px] leading-[22.5px] text-center text-white">
                DAO Vote Request Development Proposal
              </span>
            </div>

            <Image src={VotedCardLogo} alt="voted card logo" />
            <Image src={VerifiedIcon} alt="vote verified icon" />
          </div>
          {/* Fixed Images */}
          <Image src={CloseIcon} alt="close modal icon" className="absolute top-[6%] left-[4%] cursor-pointer" onClick={() => onClose(false)} />

          <div className="float">
            <Image src={Logo} width={138} height={86} alt="vote verified icon" className="absolute bottom-[20%] left-[2%]" />
            <Image
              src={RightLogo}
              width={152}
              height={88}
              alt="vote verified icon"
              className="absolute bottom-[10%] right-[2%]"
            />
          </div>
        </div>
        <div className="flex flex-col gap-[5px] items-center">
          <span className="font-semibold text-[20px] leading-[30px] text-primary">Share on</span>
          <div className="flex items-center gap-[10px]">
            <Link href={``}>
              <Button variant="secondary" size="icon" className="bg-primary hover:bg-current">
                <Image src={XWhiteLogo} alt="twitter logo" />
              </Button>{" "}
            </Link>
            <Link href={``}>
              <Button variant="secondary" size="icon" className="border-[2px] border-primary">
                <Image src={DscrvLogo} alt="twitter logo" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VotedCard;
