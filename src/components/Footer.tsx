import { Check, DscrvLogo, Twitter } from "@/assets";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

interface FooterProps {}

const Footer: FC<FooterProps> = ({}) => {
  return (
    <section className="bg-white">
      <div className="container mx-auto max-w-6xl w-full">
        <div className="flex items-center justify-between h-[65px]">
          <Image src={Check} alt="check icon" />
          <span className="text-[15px] md:text-[30px] leading-[22.5px] md:leading-[45px] font-extrabold text-secondary">DAO VOTING POLL</span>
          <div className="flex items-center gap-[6px]">
            <Link href="https://x.com">
              <Image src={Twitter} alt="twitter icon" />
            </Link>
            <Link href="https://x.com">
              <Image src={DscrvLogo} alt="dccrv icon" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
