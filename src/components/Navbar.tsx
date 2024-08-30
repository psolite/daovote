"use client"

import { Logo } from "@/assets";
import Image from "next/image";
import { FC } from "react";
import { Button } from "./ui/Button";
import { handleWalletConnect } from "./WalletAction";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import useCanvasWallet from "@/app/providers/CanvasWalletProvider";

interface NavbarProps { }

const Navbar: FC<NavbarProps> = ({ }) => {
  const { publicKey, wallet } = useWallet()
  const { walletAddress, iframe, connectWallet, userInfo, walletIcon } = useCanvasWallet()
  console.log(userInfo?.avatar)
  return (
    <nav className="bg-white fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto max-w-[1200px] w-full relative">
        <div className="flex items-center justify-end w-full h-[65px]">
          <Image src={Logo} alt="logo" className="absolute left-0 -bottom-[99%]" />
         
          <>
            {iframe ?
              (walletAddress ? <Button>
                <Image
                  src={userInfo?.avatar || walletIcon || ''}
                  alt={'wallet'}
                  height={15}
                  width={15}
                  className="mr-2"
                />
                ({userInfo?.username} || {walletAddress.slice(0, 3)}...{walletAddress.slice(-3)})
              </Button>

                :
                <Button className="dark:bg-primary dark:text-white" onClick={connectWallet}>Connect Wallet</Button>
              )


              :
              <Button className="dark:bg-primary dark:text-white" onClick={handleWalletConnect}>
                {!publicKey ? "Connect" :
                  <div className="flex">
                    <Image
                      src={wallet?.adapter.icon || ''}
                      alt={wallet?.adapter.name || ''}
                      height={15}
                      width={15}
                      className="mr-5 "
                    />
                    {publicKey.toBase58().slice(0, 3)}...{publicKey.toBase58().slice(-3)}

                  </div>
                }
              </Button>
            }
            <WalletMultiButton style={{ display: "none" }} />
          </>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
