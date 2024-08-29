import { Logo } from "@/assets";
import Image from "next/image";
import { FC } from "react";
import { Button } from "./ui/Button";

interface NavbarProps {}

const Navbar: FC<NavbarProps> = ({}) => {
  return (
    <nav className="bg-white fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto max-w-[1200px] w-full relative">
        <div className="flex items-center justify-end w-full h-[65px]">
          <Image src={Logo} alt="logo" className="absolute left-0 -bottom-[99%]" />
          <Button>Connect</Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
