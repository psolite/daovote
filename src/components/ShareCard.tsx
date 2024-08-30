// components/ShareCard.tsx
import { VotedCardLogo, VerifiedIcon, CloseIcon, Logo, RightLogo, XWhiteLogo } from "@/assets";
import React, { FC } from "react";
import { Button } from "./ui/Button";
import Image from "next/image";
import Modal from 'react-modal';

// Set the app element to avoid accessibility warnings or errors
if (typeof window !== 'undefined') {
  Modal.setAppElement('body'); // Ensure this targets the correct app element
}

interface ShareCardProps {
  isOpen: boolean;
  onRequestClose: () => void;
  message: string;
}

const ShareCard: FC<ShareCardProps> = ({ isOpen, onRequestClose, message }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Transaction Successful"
      className="modal" // Ensure these classes are styled in your global CSS or using Tailwind
      overlayClassName="overlay"
    >
      <div className="max-w-[559px] flex flex-col gap-[23px] items-center bg-white rounded-[30px] px-[13px] pt-[13px] pb-[21px]">
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

          {/* Close Icon */}
          <Image
            src={CloseIcon}
            alt="close modal icon"
            className="absolute top-[6%] left-[4%] cursor-pointer"
            onClick={onRequestClose} // Close the modal when clicked
          />

          <div className="float">
            <Image
              src={Logo}
              width={138}
              height={86}
              alt="vote verified icon"
              className="absolute bottom-[20%] left-[2%] float"
            />
            <Image
              src={RightLogo}
              width={152}
              height={88}
              alt="vote verified icon"
              className="absolute bottom-[10%] right-[2%] float"
            />
          </div>
        </div>
        <Button variant="vote" size="vote">
          Share on <Image src={XWhiteLogo} alt="twitter logo" className="ml-2" />
        </Button>
      </div>
    </Modal>
  );
};

export default ShareCard;
