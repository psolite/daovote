import { Check, Twitter } from "@/assets";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

interface FooterProps {}

const Footer: FC<FooterProps> = ({}) => {
  return (
    <section className="bg-white">
      <div className="container mx-auto max-w-[1100px] w-full">
        <div className="flex items-center justify-between h-[65px]">
          <Image src={Check} alt="check icon" />
          <span className="text">DAO VOTING POLL</span>
          <Link href="x.com">
            <Image src={Twitter} alt="twitter icon" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Footer;
