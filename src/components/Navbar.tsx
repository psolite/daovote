import { Logo } from "@/assets";
import Image from "next/image";
import { FC } from "react";
import { Button } from "./ui/Button";

interface NavbarProps {}

const Navbar: FC<NavbarProps> = ({}) => {
  return (
    <section className="bg-white">
      <div className="container mx-auto max-w-[1100px] w-full relative">
        <div className="flex items-center justify-end w-full h-[65px]">
          <Image src={Logo} alt="logo" className="absolute left-0 -bottom-[80%]" />
          <Button>Connect</Button>
        </div>
      </div>
    </section>
  );
};

export default Navbar;
