"use client"

import { Logo } from "@/assets";
import Image from "next/image";
import { FC } from "react";
import { Button } from "./ui/Button";
import { handleWalletConnect } from "./WalletAction";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

interface NavbarProps { }

const Navbar: FC<NavbarProps> = ({ }) => {
  const { publicKey, wallet } = useWallet()

  return (
    <nav className="bg-white fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto max-w-[1200px] w-full relative">
        <div className="flex items-center justify-end w-full h-[65px]">
          <Image src={Logo} alt="logo" className="absolute left-0 -bottom-[99%]" />

          <>
            <Button className="dark:bg-primary dark:text-white" onClick={handleWalletConnect}>
              {!publicKey ? "Connect" :
                <div className="flex">
                  <Image
                    src={wallet?.adapter.icon || ''}
                    alt={wallet?.adapter.name || ''}
                    height={20}
                    width={20}
                    className="mr-5 "
                  />
                  {publicKey.toBase58().slice(0, 4)}...{publicKey.toBase58().slice(-4)}

                </div>
              }
            </Button>
            <WalletMultiButton style={{ display: "none" }} />
          </>
          
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
