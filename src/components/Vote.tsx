import { FingerPrintIcon, Left, Right, VoteIcon } from "@/assets";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import { Button } from "./ui/Button";
import { HasVoted, vote } from "@/anchor/setup";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { handleWalletConnect } from "./WalletAction";

interface VoteProps {
  proposal: { title: string, description: string, options: string[] }
  countdown: { id: string; description: string; value: number; }[] | undefined
  closed: boolean
  proposalPDA: string
}

const Vote: FC<VoteProps> = ({ proposal, countdown = [], closed, proposalPDA }) => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet()
  const [userHasVoted, setuUserHasVoted] = useState<boolean>()

  useEffect(() => {
    const voted = async () => {
      if (!publicKey) { return }
      const userHasVoted = await HasVoted(proposalPDA, publicKey.toBase58())
      setuUserHasVoted(userHasVoted)
    }
    voted()
  }, [publicKey])

  // Handler for button click animations
  const handleClick = (index: number) => async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!publicKey) { return }
    const transaction = await vote(proposalPDA, publicKey?.toBase58(), index)

    const trxSignature = await sendTransaction(transaction, connection, { signers: [] });
    // Remove the class after animation duration (e.g., 300ms)
    console.log(`Vote transaction sent: ${trxSignature}`);
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
                <p className="font-medium text-[15px] leading-[22.5px] text-secondary max-w-[417px] mb-[15px]">{userHasVoted ? "You have voted in the poll" : ""}
                </p>
                <Image src={VoteIcon} alt="votes" />
              </div>

              <div className="flex flex-col gap-[14px]">
                {!publicKey ?
                  <Button variant="secondary" onClick={handleWalletConnect} size="full">
                    Connect wallet
                  </Button>
                  : proposal.options.map((option, index) => (
                    <Button key={index} variant="secondary" disabled={closed || userHasVoted} onClick={handleClick(index)} size="full">
                      {option}
                    </Button>
                  ))
                }

              </div>
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
    </section>
  );
};

export default Vote;
