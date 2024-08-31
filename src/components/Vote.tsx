"use client";

import { ArrowIcon, FingerPrintIcon, Left, Right, VoteIcon } from "@/assets";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import { Button } from "./ui/Button";
import { HasVoted, vote } from "@/anchor/setup";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { handleWalletConnect } from "./WalletAction";
import useCanvasWallet from "@/app/providers/CanvasWalletProvider";
import VotedCard from "./VotedCard";
import Link from "next/link";
import { PublicKey } from "@solana/web3.js";

interface VoteProps {
  proposal: { title: string, description: string, options: string[] }
  countdown: { id: string; description: string; value: number; }[] | undefined
  closed: boolean
  proposalPDA: string
}

const Vote: FC<VoteProps> = ({ proposal, countdown = [], closed, proposalPDA }) => {
  const { connection } = useConnection();
  let { publicKey, sendTransaction } = useWallet()
  const { iframe, connectWallet, walletAddress, signTransaction } = useCanvasWallet()
  const [userHasVoted, setUserHasVoted] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [success, setSuccess] = useState<boolean>(false)

  useEffect(() => {
    const voted = async () => {

      if (walletAddress) {
        publicKey = new PublicKey(walletAddress);
      }
      if (!publicKey) { return }
      const userHasVoted = await HasVoted(proposalPDA, publicKey.toBase58())

      setUserHasVoted(userHasVoted)

    }
    voted()
  }, [publicKey,success])

  // Handler for button click animations
  const handleClick = (index: number) => async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      setLoading(true)
      if (!publicKey) { return }
      const transaction = await vote(proposalPDA, publicKey?.toBase58(), index)

      let trxSignature;
      let confirmation;
      if (walletAddress) {
        trxSignature = await signTransaction(transaction);
        if (trxSignature) {
          setSuccess(true)
        }
      } else {
        trxSignature = await sendTransaction(transaction, connection, { signers: [] });
        confirmation = await connection.confirmTransaction(trxSignature, 'confirmed');
        console.log('Transaction confirmed:', confirmation);
        if (confirmation.value.err === null) {
          setSuccess(true)
        }
      }
      // Remove the class after animation duration (e.g., 300ms)
      console.log(`Vote transaction sent: ${trxSignature}`);
    } catch {
      alert("Transaction Error")
    } finally {
      setLoading(false)
    }
  };


  return (
    <section className="pt-[122px] pb-[107px] relative">
      <div className="container mx-auto w-full">
        <div className="flex justify-center items-center">
          <div className="flex flex-col gap-[22px]">
            <div className="flex items-center gap-[13px] justify-center">
              {countdown.map(({ id, description, value }) => (
                <div key={id} className="flex flex-col gap-3">
                  <span className="font-medium text-[10px] leading-[15px] tracking-[13%] text-center text-white">
                    {description}
                  </span>
                  <div className="flex items-center justify-center min-w-[38px] h-8 rounded-[10px] bg-white">
                    <span className="text-[13px] leading-[13px] text-center text-primary font-publicPixel">{value}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="max-w-[492px] card pt-10 pb-9 px-[37.5px]">
              <h3 className="font-extrabold text-[18px] leading-[27px] text-white mb-2">{proposal.title}</h3>

              <div className="flex flex-col pb-[13px]">
                <span className="font-medium text-[10px] mb-[2px] leading-[15px] tracking-[13%] text-white">DISCRIPTION</span>
                <p className="font-medium text-[15px] leading-[22.5px] text-white max-w-[417px] mb-[15px]">{proposal.description}
                </p>
                <p className="font-medium text-[15px] leading-[22.5px] text-secondary max-w-[417px] mb-[15px]">{userHasVoted ? "You have voted in this poll" : ""}
                </p>
                <Image src={VoteIcon} alt="votes" />
              </div>

              <div className="flex flex-col gap-[14px]">
                {
                  proposal.options.map((option, index) => (
                    <Button key={index} variant="secondary" disabled={closed || userHasVoted} onClick={!publicKey ? (iframe ? connectWallet : handleWalletConnect) : handleClick(index)} size="full">
                      {option}
                    </Button>
                  ))
                }

              </div>
            </div>
            <div className="flex items-center gap-[5px]">
              <span className="font-semibold text-[20px] leading-[30px] text-white">View Result</span>
              <Link href={`${process.env.NEXT_PUBLIC_URL}/vote/${proposalPDA}/result`} >
                <Image src={ArrowIcon} alt="arrow icon" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Styling Images */}
      <Image src={Left} width={300} alt="voting box image" className="hidden lg:block absolute top-[35%] -left-[1.5%]" />
      <Image src={Left} width={400} alt="voting box image" className="hidden lg:block absolute top-[55%] -left-[2.5%]" />

      <Image src={Right} width={200} alt="voting box image" className="hidden lg:block absolute top-[30%] right-0" />
      <Image src={Right} width={200} alt="voting box image" className="hidden lg:block absolute top-[55%] -right-[2%]" />

      <Image
        src={FingerPrintIcon}
        alt="fingerprint icon"
        width={37}
        height={37}
        className="hidden lg:block absolute top-[25%] right-[36%] rotate-left"
      />
      <Image
        src={FingerPrintIcon}
        alt="fingerprint icon"
        className="hidden lg:block absolute -bottom-[1%] -right-[1%] rotate-right"
      />

      {/* Voted Modal */}

      {success && (
        <div className="fixed inset-0 bg-primary/80 bg-opacity-50 flex items-center justify-center z-50">
          <VotedCard onClose={setSuccess} />
        </div>
      )}
    </section>
  );
};

export default Vote;
