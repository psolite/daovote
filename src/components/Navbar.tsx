"use client"

import { Logo } from "@/assets";
import Image from "next/image";
import { FC } from "react";
import { Button } from "./ui/Button";
import { handleWalletConnect } from "./WalletAction";
import { useWallet } from "@solana/wallet-adapter-react";
import dynamic from "next/dynamic";
import useCanvasWallet from "@/app/providers/CanvasWalletProvider";

const WalletMultiButton = dynamic(
  () => import("@solana/wallet-adapter-react-ui").then((m) => m.WalletMultiButton),
  { ssr: false }
);

interface NavbarProps { }

const Navbar: FC<NavbarProps> = ({ }) => {
  const { publicKey, wallet } = useWallet()
  const { walletAddress, iframe, connectWallet, userInfo, walletIcon } = useCanvasWallet()
  // console.log(userInfo?.avatar)
  return (
    <nav className="bg-white fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto max-w-6xl w-full relative">
        <div className="flex items-center justify-end w-full h-[65px]">
          <Image src={Logo} alt="logo" className="absolute left-0 -bottom-[99%]" />
         <Button onClick={!publicKey ? handleWalletConnect : undefined}>{!publicKey ? "Connect Wallet" : publicKey.toBase58().slice(0, 4)}</Button>
         <WalletMultiButton style={{ display: "none" }}/>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
