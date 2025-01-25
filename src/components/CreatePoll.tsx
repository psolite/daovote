"use client";

import { FC } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import useCanvasWallet from "@/app/providers/CanvasWalletProvider";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
import { options } from "@/constants";
import Image from "next/image";
import { AddIcon, ArrowIcon, FingerPrintIcon, Left, Right } from "@/assets";
import { useState } from "react";
import ShareCard from "./ShareCard";
import { PollTx } from "./PollTx";
import Link from "next/link";
import { handleWalletConnect } from "./WalletAction";
import type { Provider } from '@reown/appkit-adapter-solana/react';
import { useAppKitAccount, useAppKitProvider } from "@reown/appkit/react";
import { PublicKey, Transaction } from "@solana/web3.js";
import { connection } from "@/lib/connection";



interface CreatePollProps { }

const CreatePoll = () => {
  const [isShareCardVisible, setIsShareCardVisible] = useState(false);
  const [shareCardData, setShareCardData] = useState<any>();
  // const { connection } = useConnection();
  // const { publicKey, sendTransaction } = useWallet();
  const { walletAddress, signTransaction, connectWallet, iframe } = useCanvasWallet();
  const [loading, setLoading] = useState<boolean>(false)
  const { address } = useAppKitAccount();
  const { walletProvider } = useAppKitProvider<Provider>('solana');

  const Schema = yup.object().shape({
    title: yup.string().required("Title is required"),
    description: yup.string().required("Description is required"),
    options: yup.string().required("options is required"),
    duration: yup.number().positive("Duration must be positive").required("Duration is required"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(Schema),
    defaultValues: {
      title: '',
      description: '',
      options: '',
      duration: undefined
    }
  });


  const submitForm = async (data: any) => {
    if (!address) return;
    const Hooks = {
      connection,
      pubKey: new PublicKey(address),
      walletAddress,
    }
    try {
      setLoading(true)
      // console.log(data)
      const tx = await PollTx(Hooks, data);

      let trxSign;
      if (tx?.transaction && tx?.transaction instanceof Transaction) {
        if (walletAddress) {
          trxSign = await signTransaction(tx.transaction);
        } else {
          trxSign = await walletProvider.sendTransaction(tx.transaction, connection, { signers: [] });
          // await connection.confirmTransaction(trxSign, 'confirmed');
          const confirmation = await connection.confirmTransaction(trxSign, 'confirmed');
          console.log('Transaction confirmed:', confirmation);
        }
      console.log(
        `View on explorer: https://solana.fm/tx/${trxSign}?cluster`
      );

        setShareCardData(tx)
        setIsShareCardVisible(true);
      } else {
        alert("An error occurred while submitting the form.");
      }

    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while submitting the form.");
    } finally {
      setLoading(false)
    }
  };

  const onSubmit = handleSubmit((data) => {
    submitForm(data);
    console.log("Form submitted with data:", data);
  });

  const handleCloseShareCard = () => {
    setIsShareCardVisible(false);
    reset(); // Reset the form when closing the ShareCard
  };

  return (
    <section className="pt-[122px] pb-[107px] relative">
      <div className="container mx-auto w-full px-4 sm:px-6 md:px-8">
        <div className="flex justify-center">
          <div className="w-full max-w-[492px]">
            <div className="card px-4 sm:px-[28.5px] pt-[35px] pb-[17px]">
              <h3 className="font-extrabold text-[18px] leading-[27px] md:text-[25px] md:leading-[37.5px] text-white text-center mb-2">Create a Poll - Devnet</h3>
              <form onSubmit={onSubmit}>
                <div className="flex flex-col items-center gap-4 sm:gap-6 md:gap-8 w-full">
                  <div className="flex flex-col gap-[5px] w-full">
                    <p className="font-semibold text-[15px] leading-[22.5px] md:text-[18px] md:leading-[27px] text-white pl-[26px]">Title*</p>
                    <Input
                      className="w-full"
                      type="text"
                      placeholder="eg. DAO Request for Development Proposal"
                      {...register("title")}
                    />
                    {errors.title && <p className="text-red-500 text-xs italic">{errors.title.message}</p>}
                  </div>

                  <div className="flex flex-col gap-[5px] w-full">
                    <p className="font-semibold text-[18px] leading-[27px] text-white pl-[26px]">Description*</p>

                    <textarea
                      placeholder="eg. This proposal suggests the development of a decentralized voting platform designed to facilitate transparent ...."
                      {...register("description")}
                      className="min-h-[111px] w-full rounded-[20px] px-[26px] pt-[17px]"
                    />
                    {errors.description && <p className="text-red-500 text-xs italic">{errors.description.message}</p>}
                  </div>

                  <div className="flex flex-col gap-[5px] w-full">
                    <p className="font-semibold text-[18px] leading-[27px] text-white pl-[26px]">Options*</p>
                    <Input className="w-full" type="text" placeholder="eg. Solana" {...register("options")} />
                    {errors.options && <p className="text-red-500 text-xs italic">{errors.options.message}</p>}
                    {/* <ul className="flex items-center justify-center gap-[7px]">
                      {options.map((item, index) => (
                        <div key={index} className="flex items-center gap-[7px] px-[8px] rounded-[8px] border text-white">
                          <span className="">{item}</span>
                          <Image src={AddIcon} alt="add icon" />
                        </div>
                      ))}
                    </ul> */}
                  </div>

                  <div className="flex flex-col gap-[5px] w-full">
                    <p className="font-semibold text-[18px] leading-[27px] text-white pl-[26px]">Duration*</p>
                    <Input className="w-full" type="number" placeholder="How many hours? eg. 48" {...register("duration")} />
                    {errors.duration && <p className="text-red-500 text-xs italic">{errors.duration.message}</p>}
                  </div>
                  <div className="flex flex-col gap-2">
                    {loading ?
                      <Button variant="outline" disabled={true} size="lg">
                        Loading...
                      </Button>
                      : (
                        address || walletAddress ?

                          <Button variant="outline" size="lg" type="submit">
                            Submit
                          </Button>
                          :
                          (iframe ? <Button variant="outline" size="lg" onClick={connectWallet}>Create</Button>
                            :
                            <Button variant="outline" onClick={handleWalletConnect} size="lg">
                              Create
                            </Button>
                          ))

                    }

                    <span className="text-[13px] leading-[19.5px] italic text-center text-white">Fee: 0.01 Sol</span>
                  </div>
                </div>
              </form>
            </div>
            <div className="flex items-center gap-[5px]">
              <span className="font-semibold text-[10px] leading-[15px] md:text-[20px] md:leading-[30px] text-white">View your previous poll</span>
              <Link href={`${process.env.NEXT_PUBLIC_URL}/all`} >
                <Image src={ArrowIcon} alt="arrow icon" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Styling Images */}
      <Image src={Left} alt="voting box image" className="hidden lg:block absolute top-[30%] left-0" />
      <Image src={Right} alt="voting box image" className="hidden lg:block absolute top-[40%] right-0" />
      <Image
        src={FingerPrintIcon}
        alt="fingerprint icon"
        className="hidden lg:block absolute bottom-[10%] left-[20%] rotate-left"
      />
      <Image
        src={FingerPrintIcon}
        alt="fingerprint icon"
        className="block absolute -bottom-[1%] -right-[1%] rotate-right"
      />
      {isShareCardVisible && (
        <div className="fixed inset-0 bg-primary/80 bg-opacity-50 flex items-center justify-center z-50">
          <ShareCard onClose={handleCloseShareCard} data={shareCardData} />
        </div>
      )}
    </section>
  );
};

export default CreatePoll;